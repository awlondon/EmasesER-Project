(function(){
  const defaultState = { darkMode: false, experimentalGlyph: '' };

  function parseHash() {
    const params = new URLSearchParams(window.location.hash.slice(1));
    return {
      darkMode: params.get('darkMode') === 'true',
      experimentalGlyph: params.get('glyph') || ''
    };
  }

  const state = Object.assign({}, defaultState, parseHash());

  function syncState() {
    window.appState = { ...state };
    render();
  }

  function render() {
    // apply dark mode
    if (state.darkMode) {
      document.body.style.background = '#222';
      document.body.style.color = '#eee';
    } else {
      document.body.style.background = '';
      document.body.style.color = '';
    }

    // display glyph
    let glyph = document.getElementById('experimental-glyph');
    if (!glyph) {
      glyph = document.createElement('div');
      glyph.id = 'experimental-glyph';
      glyph.style.fontSize = '40px';
      glyph.style.marginTop = '10px';
      document.body.appendChild(glyph);
    }
    glyph.textContent = state.experimentalGlyph;

    // update panel controls
    darkToggle.checked = state.darkMode;
    glyphInput.value = state.experimentalGlyph;
  }

  // developer panel UI
  const panel = document.createElement('div');
  panel.id = 'developer-panel';
  panel.style.position = 'fixed';
  panel.style.bottom = '10px';
  panel.style.right = '10px';
  panel.style.padding = '10px';
  panel.style.background = '#fff';
  panel.style.border = '1px solid #ccc';
  panel.style.fontFamily = 'sans-serif';
  panel.style.zIndex = '10000';
  panel.innerHTML = `
    <strong>Developer Panel</strong><br>
    <label><input type="checkbox" id="toggle-darkMode"> darkMode</label><br>
    <label>glyph <input type="text" id="input-glyph" style="width:40px"></label>
  `;
  document.body.appendChild(panel);

  const darkToggle = panel.querySelector('#toggle-darkMode');
  const glyphInput = panel.querySelector('#input-glyph');

  darkToggle.addEventListener('change', e => {
    state.darkMode = e.target.checked;
    syncState();
  });

  glyphInput.addEventListener('input', e => {
    state.experimentalGlyph = e.target.value;
    syncState();
  });

  window.addEventListener('hashchange', () => {
    Object.assign(state, parseHash());
    syncState();
  });

  syncState();
})();
