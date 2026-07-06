window.initConstellation = function () {
  const root = document.getElementById('constellation-root');
  if (!root) return;

  root.innerHTML = `
    <div class="glass-panel">
      <h2 class="section-title">Written in the stars</h2>
      <svg class="constellation-svg" viewBox="0 0 700 260" role="img" aria-label="Constellation for ${CONFIG.girlName}">
        <path d="M120 100 L220 60 L320 110 L420 90 L540 140" stroke="#8e63e8" stroke-width="2" fill="none" stroke-dasharray="8 8"></path>
        <circle cx="120" cy="100" r="5" fill="#ff5e93"></circle>
        <circle cx="220" cy="60" r="5" fill="#ff5e93"></circle>
        <circle cx="320" cy="110" r="5" fill="#ff5e93"></circle>
        <circle cx="420" cy="90" r="5" fill="#ff5e93"></circle>
        <circle cx="540" cy="140" r="5" fill="#ff5e93"></circle>
        <path d="M340 190 C 330 160, 310 150, 290 150 C 260 150, 250 175, 260 195 C 270 215, 320 225, 340 190 Z" fill="#ff8fb5"></path>
      </svg>
      <p class="section-copy">${CONFIG.girlName}, you are the brightest star in my sky.</p>
      <div class="button-row">
        <button class="primary-btn" onclick="window.goToScene(3)">Into the garden</button>
      </div>
    </div>
  `;
};
