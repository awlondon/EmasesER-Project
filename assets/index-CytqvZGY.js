const createSession = () => ({ sid: "dummy", timestamp: 0, errors: 0, status: "ok" });
if (typeof globalThis !== "undefined") {
  globalThis.createSession = createSession;
  if (globalThis.Sentry) {
    const hub = globalThis.Sentry.getCurrentHub && globalThis.Sentry.getCurrentHub();
    if (hub) {
      hub.startSession = createSession;
      const scope = hub.getScope && hub.getScope();
      if (scope) {
        scope.addBreadcrumb = () => {};
      }
    }
  }
}
