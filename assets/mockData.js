// Mock data and network stubs for offline operation
console.log('mock fetch initialized');
export const mockUser = { id: 1, name: 'Local User' };

function mockResponse(data) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

// Override fetch to return local data for any remote endpoint
const originalFetch = window.fetch;
window.fetch = async function(input, init) {
  const url = typeof input === 'string' ? input : input.url;
  if (/^https?:/i.test(url)) {
    if (url.includes('login')) {
      return mockResponse({ user: mockUser });
    }
    return mockResponse({});
  }
  return originalFetch(input, init);
};

// Minimal XMLHttpRequest stub
const OriginalXHR = window.XMLHttpRequest;
window.XMLHttpRequest = function() {
  this.readyState = 0;
  this.status = 200;
  this.responseText = '';
  this.onreadystatechange = null;
  this.onload = null;
  this.open = (method, url) => {
    this._url = url;
  };
  this.send = () => {
    const data = this._url && this._url.includes('login') ? { user: mockUser } : {};
    this.responseText = JSON.stringify(data);
    this.readyState = 4;
    this.onload && this.onload();
    this.onreadystatechange && this.onreadystatechange();
  };
};

// Expose dummy login helper
export function mockLogin() {
  console.log('mockLogin invoked');
  return Promise.resolve({ user: mockUser });
}
window.mockLogin = mockLogin;
