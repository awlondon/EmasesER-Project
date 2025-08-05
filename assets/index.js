// index.js — main entry point for EmasesER-Project frontend

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './appCore.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    const container = document.getElementById('root');
    if (!container) {
      throw new Error("Missing #root container in index.html");
    }

    const root = createRoot(container);
    root.render(<App />);
  } catch (err) {
    console.error("Failed to initialize app:", err);
  }
});
