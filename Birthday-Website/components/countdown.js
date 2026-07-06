window.initCountdown = function () {
  const root = document.getElementById('countdown-root');
  if (!root) return;

  root.innerHTML = `
    <div class="glass-panel">
      <h2 class="section-title">Birthday countdown</h2>
      <p class="section-copy">Your special day is almost here.</p>
      <div class="count-grid" id="count-grid"></div>
      <div class="button-row">
        <button class="primary-btn" onclick="window.goToScene(9)">The finale</button>
      </div>
    </div>
  `;

  const countGrid = document.getElementById('count-grid');
  const targetDate = new Date((window.CONFIG && window.CONFIG.birthday) || '2026-07-07T00:00:00');
  function render() {
    const now = new Date();
    const diff = Math.max(0, targetDate - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    countGrid.innerHTML = `
      <div class="count-card"><strong>${days}</strong><span>Days</span></div>
      <div class="count-card"><strong>${hours}</strong><span>Hours</span></div>
      <div class="count-card"><strong>${minutes}</strong><span>Minutes</span></div>
      <div class="count-card"><strong>${seconds}</strong><span>Seconds</span></div>
    `;
  }

  render();
  setInterval(render, 1000);
};
