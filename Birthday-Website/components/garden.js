window.initGarden = function () {
  const root = document.getElementById('garden-root');
  if (!root) return;

  root.innerHTML = `
    <div class="glass-panel">
      <h2 class="section-title">The memory garden</h2>
      <p class="section-copy">Each flower opens with a memory.</p>
      <div class="garden-grid">
        ${MEMORIES.map((memory, index) => `
          <div class="flower-card" data-heart-trigger onclick="this.classList.toggle('open')">
            <img src="${memory.image}" alt="${memory.title}" loading="lazy" />
            <h3>${memory.title}</h3>
            <p class="card-copy">${memory.quote}</p>
            <p class="card-copy">${memory.memory}</p>
          </div>
        `).join('')}
      </div>
      <div class="button-row">
        <button class="primary-btn" onclick="window.goToScene(4)">See the gallery</button>
      </div>
    </div>
  `;
};
