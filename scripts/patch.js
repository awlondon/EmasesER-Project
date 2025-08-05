// ==UserScript==
// @name         Sesame Anti-Telemetry Patch
// @match        *://app.sesame.com/*
// @run-at       document-start
// ==/UserScript==

(() => {
  const noop = () => {};

  // Disable Sentry early
  window.Sentry = new Proxy({}, {
    get: () => noop,
    set: () => true,
  });

  // Disable global error reporting
  window.onerror = noop;
  window.onunhandledrejection = noop;
  window.addEventListener('error', e => e.stopImmediatePropagation(), true);
  window.addEventListener('unhandledrejection', e => e.stopImmediatePropagation(), true);

  // Block Sentry debug IDs
  window._sentryDebugIds = {};
  window._sentryDebugIdIdentifier = "";

  // Spoof user agent
  Object.defineProperty(navigator, 'userAgent', {
    get: () => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 FakeAGI",
    configurable: true
  });

  // Remove network fingerprinting
  try {
    Object.defineProperty(navigator, 'connection', {
      get: () => undefined,
      configurable: true
    });
  } catch {}

  // Stub performance API
  Object.defineProperty(window, 'performance', {
    get: () => ({
      now: () => 42,
      mark: noop,
      measure: noop,
      getEntriesByType: () => [],
      timing: {},
    }),
    configurable: true
  });
})();
