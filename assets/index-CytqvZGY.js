
// Local service worker registration for offline caching
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => {
    regs.forEach(reg => reg.unregister());
    navigator.serviceWorker.register('/service-worker.js');
  }).catch(console.error);
}
