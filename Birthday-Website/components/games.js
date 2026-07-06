window.initGames = function () {
  const root = document.getElementById('games-root');
  if (!root) return;

  root.innerHTML = `
    <div class="glass-panel">
      <h2 class="section-title">A little treasure game</h2>
      <p class="section-copy">Drag the heart to the target and collect a sweet surprise.</p>
      <div class="game-field" id="game-field">
        <div class="target" id="target" style="right: 20px; bottom: 24px;">💗</div>
        <div class="player" id="player" style="left: 20px; top: 24px;">💖</div>
        <div class="blast-overlay hidden" id="blast-overlay" aria-hidden="true">
          <div class="blast-card">
            <div class="blast-hearts">💖💗💝💘💞</div>
            <h3>Love you motee...</h3>
            <p>You found the sweetest surprise! 💕✨</p>
          </div>
        </div>
      </div>
      <div class="button-row">
        <button class="primary-btn" onclick="window.goToScene(8)">Countdown to your day</button>
      </div>
    </div>
  `;

  const field = document.getElementById('game-field');
  const player = document.getElementById('player');
  const target = document.getElementById('target');
  const blastOverlay = document.getElementById('blast-overlay');
  let dragging = false;
  let completed = false;

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function setPlayerPosition(clientX, clientY) {
    const rect = field.getBoundingClientRect();
    const x = clamp(clientX - rect.left - 24, 0, rect.width - 48);
    const y = clamp(clientY - rect.top - 24, 0, rect.height - 48);
    player.style.left = `${x}px`;
    player.style.top = `${y}px`;
    return { x, y };
  }

  function checkTarget({ x, y }) {
    if (completed) return;
    const targetBounds = target.getBoundingClientRect();
    const playerBounds = player.getBoundingClientRect();
    const overlapX = Math.abs(targetBounds.left - playerBounds.left) < 56;
    const overlapY = Math.abs(targetBounds.top - playerBounds.top) < 56;

    if (overlapX && overlapY) {
      completed = true;
      player.textContent = '💞';
      target.textContent = '✨';
      blastOverlay.classList.remove('hidden');
      blastOverlay.classList.add('show');
      launchConfetti(90);
      showToast('You reached the target!');
    }
  }

  player.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    dragging = true;
    player.setPointerCapture(event.pointerId);
    checkTarget(setPlayerPosition(event.clientX, event.clientY));
  });

  document.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    checkTarget(setPlayerPosition(event.clientX, event.clientY));
  });

  const stopDragging = () => {
    dragging = false;
  };

  document.addEventListener('pointerup', stopDragging);
  document.addEventListener('pointercancel', stopDragging);
};
