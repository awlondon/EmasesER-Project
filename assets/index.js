// index.js — main entry point for EmasesER-Project frontend

import { initApp } from './appCore.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    const root = document.getElementById('root');
    if (!root) {
      throw new Error("Missing #root container in index.html");
    }

    // Initialize main app logic
    initApp(root);
  } catch (err) {
    console.error("Failed to initialize app:", err);
  }
});
