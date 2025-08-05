// ==UserScript==
// @name         Sesame Anti-Telemetry Patch
// @match        *://app.sesame.com/*
// @run-at       document-start
// ==/UserScript==

(() => {
  const noop = () => {};

  // Proxy-block Sentry
  window.Sentry = new Proxy({}, {
    get: () => noop,
    set: () => true,
  });

  // Global safety hooks
  window.onerror = noop;
  window.onunhandledrejection = noop;

  // Remove debug IDs and breadcrumb tracking
  window._sentryDebugIds = {};
  window._sentryDebugIdIdentifier = "";

  // Optional spoofing
  Object.defineProperty(navigator, 'userAgent', {
    get: () => "DummyBrowser/7.77"
  });

  // Optional fingerprinting countermeasure
  Object.defineProperty(window, 'performance', {
    get: () => ({ now: () => 0, timing: {} })
  });
})();
