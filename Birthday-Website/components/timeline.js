window.initTimeline = function () {
  const root = document.getElementById('timeline-root');
  if (!root) return;

  const startDate = new Date('2019-12-14T00:00:00');

  root.innerHTML = `
    <div class="glass-panel">
      <h2 class="section-title">Our timeline</h2>
      <p class="section-copy">Since 14 December 2019, every moment has been counting.</p>
      <div class="timeline-grid timeline-counter-grid" id="timeline-counter-grid"></div>
      <div class="button-row">
        <button class="primary-btn" onclick="window.goToScene(6)">Continue to reasons</button>
      </div>
    </div>
  `;

  const grid = document.getElementById('timeline-counter-grid');

  function renderCounter() {
    const now = new Date();
    const diff = Math.max(0, now - startDate);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    grid.innerHTML = `
      <div class="timeline-card counter-card">
        <h3>${days}</h3>
        <p class="card-copy"><strong>Days</strong></p>
      </div>
      <div class="timeline-card counter-card">
        <h3>${hours}</h3>
        <p class="card-copy"><strong>Hours</strong></p>
      </div>
      <div class="timeline-card counter-card">
        <h3>${minutes}</h3>
        <p class="card-copy"><strong>Minutes</strong></p>
      </div>
      <div class="timeline-card counter-card">
        <h3>${seconds}</h3>
        <p class="card-copy"><strong>Seconds</strong></p>
      </div>
    `;
  }

  renderCounter();
  setInterval(renderCounter, 1000);
};
