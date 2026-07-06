window.initFinale = function () {
  const root = document.getElementById('finale-root');
  if (!root) return;

  root.innerHTML = `
    <div class="glass-panel finale-card">
      <h2>Forever with you, ${CONFIG.nickname || 'love'}</h2>
      <p class="section-copy">You are my favorite person, my favorite smile, and my favorite forever.</p>
      <div class="chat-card">
        <div class="chat-log" id="chat-log"></div>
        <input id="chat-input" placeholder="Send a sweet message" />
        <div class="button-row">
          <button class="secondary-btn" id="chat-send">Send</button>
        </div>
      </div>
      <div class="voice-card">
        <h3>Voice note</h3>
        <audio controls preload="metadata">
          <source src="${CONFIG.voiceNotes[0] || 'assets/music/voice1.mp3'}" type="audio/mpeg" />
        </audio>
      </div>
      <div class="hidden-message">${CONFIG.myName || 'Your love'} loves you more than words can say.</div>
      <div class="button-row">
        <button class="primary-btn" onclick="launchConfetti(180)">Celebrate</button>
      </div>
    </div>
  `;

  const chatLog = document.getElementById('chat-log');
  const input = document.getElementById('chat-input');
  const send = document.getElementById('chat-send');

  function appendMessage(text, mine = false) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble${mine ? ' mine' : ''}`;
    bubble.textContent = text;
    chatLog.appendChild(bubble);
  }

  appendMessage(`Happy Birthday, ${CONFIG.girlName}!`);
  appendMessage('I am so lucky to love you.', true);

  send.addEventListener('click', () => {
    const value = input.value.trim();
    if (!value) return;
    appendMessage(value, true);
    input.value = '';
    setTimeout(() => appendMessage('That made my heart glow.'), 250);
  });
};
