window.initStorybook = function () {
  const root = document.getElementById('storybook-root');
  if (!root) return;
  const pages = [
    `Eight years ago, I met someone who changed everything without even trying.`,
    `Somewhere between small talk and long conversations, you became home.`,
    `You make ordinary days feel like a story worth reading twice.`,
    `And even now, I still feel lucky every time I see your smile.`
  ];
  let index = 0;

  root.innerHTML = `
    <div class="glass-panel">
      <h2 class="section-title">A little story, just for you</h2>
      <div class="storybook-grid">
        <div class="story-page" id="story-page"></div>
      </div>
      <div class="story-controls">
        <button class="secondary-btn" id="prev-page">←</button>
        <div class="dots" id="story-dots"></div>
        <button class="secondary-btn" id="next-page">→</button>
      </div>
      <div class="button-row">
        <button class="primary-btn" onclick="window.goToScene(2)">Read the stars</button>
      </div>
    </div>
  `;

  const storyPage = document.getElementById('story-page');
  const dots = document.getElementById('story-dots');
  const prev = document.getElementById('prev-page');
  const next = document.getElementById('next-page');

  pages.forEach((_, dotIndex) => {
    const dot = document.createElement('span');
    dot.className = dotIndex === 0 ? 'active' : '';
    dots.appendChild(dot);
  });

  function render() {
    storyPage.textContent = pages[index];
    Array.from(dots.children).forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === index);
    });
    prev.disabled = index === 0;
    next.disabled = index === pages.length - 1;
  }

  prev.addEventListener('click', () => {
    if (index > 0) {
      index -= 1;
      render();
    }
  });
  next.addEventListener('click', () => {
    if (index < pages.length - 1) {
      index += 1;
      render();
    }
  });
  render();
};
