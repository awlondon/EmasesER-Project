export function initApp(root) {
  root.innerHTML = `
    <main style="padding: 2rem; font-family: sans-serif;">
      <h1>🧠 AGI Debug Panel</h1>
      <textarea id="userInput" rows="4" style="width: 100%;" placeholder="Type a prompt..."></textarea>
      <button id="submitPrompt">Send</button>
      <pre id="responseOutput" style="background: #111; color: #0f0; padding: 1rem; margin-top: 1rem;"></pre>
    </main>
  `;

  document.getElementById("submitPrompt").addEventListener("click", async () => {
    const input = document.getElementById("userInput").value;
    const response = await fakeAGI(input); // or hook to actual model endpoint
    document.getElementById("responseOutput").textContent = response;
  });
}

async function fakeAGI(prompt) {
  return `🔄 Simulated response to: "${prompt}"`;
}
