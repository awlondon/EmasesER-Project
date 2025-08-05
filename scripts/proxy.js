(() => {
  const originalFetch = window.fetch;
  window.fetch = function (url, options) {
    try {
      const target = typeof url === 'string' ? url : url && url.url;
      if (target && target.startsWith('/api/')) {
        url = typeof url === 'string'
          ? 'https://app.sesame.com' + url
          : new Request('https://app.sesame.com' + url.url, url);
      }
    } catch (err) {
      console.error('Proxy fetch error:', err);
    }
    return originalFetch.call(this, url, options);
  };
})();
