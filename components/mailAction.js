/* Posts form leads to the backend mail endpoint (homeMailAction.php).
   The endpoint expects JSON: { firstName, lastName, email, phone } with the
   phone as digits only, and answers { status: "success" | "error", message }. */

const ENDPOINT = "https://meridianc-au.com/homeMailAction.php";

export async function submitLead({ firstName, lastName, email, phone }) {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone: String(phone || "").replace(/\D/g, ""),
      }),
    });

    let data = null;
    try {
      data = await res.json();
    } catch {
      /* non-JSON response */
    }

    if (data && data.status === "success") return { ok: true };
    if (res.ok && !data) return { ok: true };
    return {
      ok: false,
      message:
        (data && data.message) ||
        "Something went wrong on the server — please try again.",
    };
  } catch {
    return {
      ok: false,
      message: "Network error — please check your connection and try again.",
    };
  }
}
