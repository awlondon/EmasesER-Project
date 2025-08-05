import React, { useState } from 'react';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  async function handleSubmit() {
    try {
      const res = await fetch('/api/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse(`Error: ${err}`);
    }
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🧠 AGI Debug Panel</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        style={{ width: '100%' }}
        placeholder="Type a prompt..."
      />
      <button onClick={handleSubmit}>Send</button>
      <pre
        style={{
          background: '#111',
          color: '#0f0',
          padding: '1rem',
          marginTop: '1rem',
        }}
      >
        {response}
      </pre>
    </main>
  );
}
