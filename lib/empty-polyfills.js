// Replaces Next's built-in legacy polyfill module (see next.config.mjs).
// Browsers in our browserslist (chrome >= 100, firefox >= 100, safari >= 15.4)
// support trimStart/trimEnd, flat/flatMap, fromEntries, at, hasOwn natively,
// so Next's conditional polyfills are dead weight on every page load.
export {};
