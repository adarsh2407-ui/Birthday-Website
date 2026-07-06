window.initReasons = function () {
  const root = document.getElementById('reasons-root');
  if (!root) return;

  root.innerHTML = `
    <div class="glass-panel">
      <h2 class="section-title">The Reasons I love you</h2>
      <div class="reasons-grid">
        ${REASONS.map((reason) => `
          <div class="reason-card">${reason}</div>
        `).join('')}
      </div>
      <div class="button-row">
        <button class="primary-btn" onclick="window.goToScene(7)">Play a little game</button>
      </div>
    </div>
  `;
};
