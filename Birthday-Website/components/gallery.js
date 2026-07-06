window.initGallery = function () {
  const root = document.getElementById('gallery-root');
  if (!root) return;

  root.innerHTML = `
    <div class="glass-panel">
      <h2 class="section-title">A soft scrapbook</h2>
      <div class="gallery-grid">
        ${MEMORIES.map((memory) => `
          <div class="gallery-card" onclick="window.openLightbox('${memory.image}')">
            <img src="${memory.image}" alt="${memory.title}" loading="lazy" />
            <p class="card-copy">${memory.title}</p>
          </div>
        `).join('')}
      </div>
      <div class="button-row">
        <button class="primary-btn" onclick="window.goToScene(5)">View our timeline</button>
      </div>
    </div>
  `;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = '<img src="" alt="Expanded memory" />';
  document.body.appendChild(lightbox);

  window.openLightbox = function (src) {
    lightbox.querySelector('img').src = src;
    lightbox.classList.add('open');
  };

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('open');
  });
};
