window.initEnvelope = function () {
  const root = document.getElementById('envelope-root');
  if (!root) return;
  root.innerHTML = `
    <div class="glass-panel hero-card">
      <div class="envelope-box">
        <div class="envelope" id="envelope" role="button" tabindex="0">
          <div class="envelope-body"></div>
          <div class="envelope-flap"></div>
          <div class="envelope-seal">💌</div>
          <div class="envelope-label">For ${CONFIG.girlName || 'You'} ❤️</div>
        </div>
      </div>
      <h1>Happy Birthday, ${CONFIG.nickname || 'Love'}</h1>
      <p class="script">My heart is yours</p>
      <p class="subtext">Tap the envelope and let the story begin.</p>
      <div class="letter-note" id="letter-note">
        Today is not just another day, ${CONFIG.nickname || 'love'}...<br /><br />
        Today the world feels softer because you were born.
      </div>
      <div class="button-row">
        <button class="primary-btn" onclick="window.goToScene(1)">Begin the story</button>
      </div>
    </div>
  `;

  const envelope = document.getElementById('envelope');
  const note = document.getElementById('letter-note');
  envelope.addEventListener('click', () => {
    envelope.classList.add('open');
    note.classList.add('show');
    launchConfetti(40);
  });
};
