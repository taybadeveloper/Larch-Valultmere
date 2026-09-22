# ==========================================================================
# Larch Vaultmere - local dev server (clean URLs, same as Vercel)
#
# Serves the site at http://localhost:8000 with Vercel's cleanUrls behavior:
#   /              -> index.html          (homepage)
#   /about-us      -> about-us.html       (clean URL)
#   /about-us.html -> 308 redirect to /about-us
#
# Usage:  powershell -ExecutionPolicy Bypass -File serve.ps1
#         (or right-click the file -> "Run with PowerShell")
#         Add -NoBrowser to skip opening the browser.
# Stop:   Ctrl+C or close the window.
# ==========================================================================

param([switch]$NoBrowser)

$root = $PSScriptRoot
$port = 8000
$base = "http://localhost:$port"

$types = @{
  '.html' = 'text/html; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.js'   = 'application/javascript; charset=utf-8'
  '.svg'  = 'image/svg+xml'
  '.webp' = 'image/webp'
  '.png'  = 'image/png'
  '.ico'  = 'image/x-icon'
  '.json' = 'application/json; charset=utf-8'
}

$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $port)
$listener.Start()

Write-Host ""
Write-Host "  Larch Vaultmere dev server running:" -ForegroundColor Green
Write-Host "  $base  (clean URLs, same behavior as Vercel)" -ForegroundColor Cyan
Write-Host "  Press Ctrl+C to stop." -ForegroundColor DarkGray
Write-Host ""

# Open the site in the default browser
if (-not $NoBrowser) {
  try { Start-Process $base } catch { }
}

while ($true) {
  if (-not $listener.Pending()) { Start-Sleep -Milliseconds 60; continue }
  try {
    $client = $listener.AcceptTcpClient()
  } catch { break }

  try {
    $stream = $client.GetStream()
    # Don't block forever on speculative connections (browsers open those)
    $client.ReceiveTimeout = 5000

    # Read until the header terminator (or a 5s deadline)
    $reqBytes = New-Object System.Collections.Generic.List[byte]
    $deadline = [DateTime]::UtcNow.AddSeconds(5)
    $headerDone = $false
    while (-not $headerDone -and [DateTime]::UtcNow -lt $deadline) {
      $chunk = New-Object byte[] 16384
      $n = $stream.Read($chunk, 0, 16384)
      if ($n -le 0) { break }
      for ($i = 0; $i -lt $n; $i++) { $reqBytes.Add($chunk[$i]) }
      $soFar = [System.Text.Encoding]::ASCII.GetString($reqBytes.ToArray())
      if ($soFar.Contains("`r`n`r`n")) { $headerDone = $true }
    }
    $req = [System.Text.Encoding]::ASCII.GetString($reqBytes.ToArray())
    $requestLine = ($req -split "`r`n")[0]
    $rawPath = ($requestLine -split ' ')[1]

    $status = 404
    $statusText = 'Not Found'
    $body = [byte[]]@()
    $headers = @()

    if ($rawPath) {
      $path = [System.Uri]::UnescapeDataString(($rawPath -replace '\?.*$', ''))

      if ($path -eq '/') {
        # Homepage: serve index.html directly
        $file = Join-Path $root 'index.html'
        if (Test-Path $file) {
          $status = 200; $statusText = 'OK'
          $body = [System.IO.File]::ReadAllBytes($file)
          $headers += 'Content-Type: text/html; charset=utf-8'
        }
      } elseif ($path -match '\.html$') {
        # cleanUrls: old .html URL -> 308 to the clean URL
        $clean = $path -replace '^/index\.html$', '/' -replace '\.html$', ''
        $status = 308; $statusText = 'Permanent Redirect'
        $headers += "Location: $clean"
      } else {
        $file = Join-Path $root ($path.TrimStart('/') -replace '/', '\')
        if (-not $path.Contains('.')) { $file += '.html' }
        if (Test-Path -LiteralPath $file -PathType Leaf) {
          $status = 200; $statusText = 'OK'
          $body = [System.IO.File]::ReadAllBytes($file)
          $ext = [System.IO.Path]::GetExtension($file).ToLower()
          $ct = if ($types.ContainsKey($ext)) { $types[$ext] } else { 'text/html; charset=utf-8' }
          $headers += "Content-Type: $ct"
        }
      }
    }

    $head = "HTTP/1.1 $status $statusText`r`n"
    $head += "Server: larch-vaultmere-dev`r`n"
    $head += "Connection: close`r`n"
    $head += "Cache-Control: no-store`r`n"
    foreach ($h in $headers) { $head += "$h`r`n" }
    $head += "Content-Length: $($body.Length)`r`n`r`n"
    $headBytes = [System.Text.Encoding]::ASCII.GetBytes($head)
    $stream.Write($headBytes, 0, $headBytes.Length)
    if ($body.Length -gt 0) { $stream.Write($body, 0, $body.Length) }
    $stream.Flush()
  } catch {
    # Ignore per-request errors (broken connections etc.) and keep serving
  } finally {
    try { $client.Close() } catch { }
  }
}
