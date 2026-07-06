/* =========================================================
   Global app bootstrapping and shared interactions
   ========================================================= */

// Global error handling
window.addEventListener('error', (event) => {
  console.error('Runtime error:', event.message, event.filename, event.lineno);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

const CONFIG = window.CONFIG || {};
const MEMORIES = window.MEMORIES || [];
const REASONS = window.REASONS || [];
const TIMELINE = window.TIMELINE || [];
const MESSAGES = window.MESSAGES || [];

const scenes = Array.from(document.querySelectorAll('.scene'));
const sceneNav = document.getElementById('scene-nav');
const backBtn = document.getElementById('back-btn');
const loadingScreen = document.getElementById('loading-screen');
const passwordScreen = document.getElementById('password-screen');
const passwordInput = document.getElementById('password-input');
const passwordBtn = document.getElementById('password-btn');
const passwordName = document.getElementById('password-name');
const musicToggle = document.getElementById('music-toggle');
const music = document.getElementById('bg-music');
const moon = document.getElementById('moon');
const butterflies = document.getElementById('butterflies');
const starsLayer = document.getElementById('stars-layer');
const cursorDot = document.getElementById('cursor-dot');
const nightLayer = document.getElementById('night-layer');

let currentScene = 0;
let maxVisited = 0;
let nightMode = false;
let secretUnlocked = false;
const easterEggs = new Set();

const heroName = CONFIG.girlName || 'Suhani';
const nickname = CONFIG.nickname || 'Mote';
passwordName.textContent = heroName;

function initNavigation() {
  scenes.forEach((scene, index) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to scene ${index + 1}`);
    dot.addEventListener('click', () => {
      if (index <= maxVisited) {
        goToScene(index);
      }
    });
    sceneNav.appendChild(dot);
  });

  function updateNav() {
    Array.from(sceneNav.children).forEach((dot, index) => {
      dot.classList.toggle('active', index === currentScene);
    });
    backBtn.style.opacity = currentScene > 0 ? '1' : '0.4';
  }

  updateNav();
  window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      const next = Math.min(scenes.length - 1, currentScene + 1);
      goToScene(next);
    }
    if (event.key === 'ArrowLeft') {
      const prev = Math.max(0, currentScene - 1);
      goToScene(prev);
    }
    if (event.key.toLowerCase() === 'h' && !easterEggs.has('press-h')) {
      unlockEasterEgg('press-h', 'A little secret shimmered into view.');
    }
    if (event.key.toLowerCase() === 'l' && event.ctrlKey) {
      unlockEasterEgg('ctrl-l', 'Love is the secret password.');
    }
  });

  backBtn.addEventListener('click', () => {
    if (currentScene > 0) {
      goToScene(currentScene - 1);
    }
  });

  function goToScene(index) {
    if (index < 0 || index >= scenes.length || index === currentScene) return;
    scenes[currentScene].classList.remove('active');
    currentScene = index;
    maxVisited = Math.max(maxVisited, index);
    scenes[currentScene].classList.add('active');
    updateNav();
  }

  window.goToScene = goToScene;
}

function initAmbientEffects() {
  const clouds = ['☁️', '☁️', '☁️'];
  clouds.forEach((icon, index) => {
    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    cloud.textContent = icon;
    cloud.style.left = `${8 + index * 24}%`;
    cloud.style.top = `${12 + index * 10}%`;
    cloud.style.fontSize = `${1.2 + index * 0.15}rem`;
    document.getElementById('clouds').appendChild(cloud);
  });

  for (let i = 0; i < 80; i += 1) {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.opacity = `${0.4 + Math.random() * 0.6}`;
    starsLayer.appendChild(star);
  }

  for (let i = 0; i < 8; i += 1) {
    const butterfly = document.createElement('span');
    butterfly.className = 'butterfly';
    butterfly.textContent = ['🦋', '🦋', '🌸'][i % 3];
    butterfly.style.left = `${Math.random() * 100}%`;
    butterfly.style.top = `${Math.random() * 80}%`;
    butterfly.style.animationDuration = `${10 + Math.random() * 12}s`;
    butterflies.appendChild(butterfly);
  }

  document.addEventListener('mousemove', (event) => {
    cursorDot.style.left = `${event.clientX}px`;
    cursorDot.style.top = `${event.clientY}px`;
  });
}

function initPasswordScreen() {
  const correctPassword = (CONFIG.password || 'LOVE2026').trim();
  const handleUnlock = () => {
    const value = passwordInput.value.trim();
    if (value === correctPassword) {
      passwordScreen.classList.add('hidden');
      secretUnlocked = true;
      setTimeout(() => {
        try {
          passwordScreen.remove();
        } catch (e) {}
      }, 600);
      unlockEasterEgg('password', 'The hidden door opened for you.');
      launchConfetti(80);
    } else {
      passwordInput.value = '';
      showToast('Not quite. The heart is still waiting.');
    }
  };
  passwordBtn.addEventListener('click', handleUnlock);
  passwordInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') handleUnlock();
  });
  passwordInput.focus();
}

function initMusic() {
  const trackSource = music.currentSrc || music.getAttribute('src') || music.querySelector('source')?.getAttribute('src') || '';

  function toggleMusic() {
    if (!trackSource) {
      showToast('A song will be added in assets/music soon.');
      return;
    }

    try {
      if (music.paused) {
        music.load();
        const playPromise = music.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            showToast('The browser blocked autoplay. Click again to play the track.');
          });
        }
        musicToggle.textContent = '♫';
      } else {
        music.pause();
        musicToggle.textContent = '♪';
      }
    } catch (error) {
      showToast('Unable to play the track. Please try again.');
    }
  }

  musicToggle.addEventListener('click', toggleMusic);
  music.addEventListener('ended', () => {
    try {
      music.currentTime = 0;
      music.play().catch(() => {});
    } catch (error) {}
  });
  
  music.addEventListener('error', () => {
    console.warn('Audio file failed to load:', trackSource);
  });
}

function initEasterEggs() {
  moon.addEventListener('dblclick', () => {
    nightMode = !nightMode;
    nightLayer.style.background = nightMode ? 'rgba(24, 17, 42, 0.28)' : 'transparent';
    unlockEasterEgg('moon', 'Moonlight mode awakened.');
  });

  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('star')) {
      unlockEasterEgg('star-click', 'The stars twinkled back.');
    }
  });

  document.addEventListener('touchstart', (event) => {
    const target = event.target;
    if (target.classList.contains('flower-card')) {
      unlockEasterEgg('flower-tap', 'A flower bloomed for you.');
    }
  }, { passive: true });

  document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'l' && event.key.length === 1) {
      const typed = `${event.key.toLowerCase()}${event.key.toLowerCase()}`;
      if (typed.includes('love')) {
        unlockEasterEgg('type-love', 'Love unlocked a hidden whisper.');
      }
    }
  });

  document.addEventListener('click', (event) => {
    if (event.target.id === 'cake') {
      unlockEasterEgg('cake-click', 'You lit the candles of memory.');
    }
  });

  const heartTriggers = document.querySelectorAll('[data-heart-trigger]');
  heartTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      unlockEasterEgg('heart-trigger', 'Heart mode was activated.');
    });
  });
}

function unlockEasterEgg(key, message) {
  if (easterEggs.has(key)) return;
  easterEggs.add(key);
  showToast(message);
  if (key === 'password') {
    document.body.classList.add('celebrate');
  }
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 250);
  }, 2200);
}

function launchConfetti(count = 120) {
  if (typeof confetti === 'function') {
    confetti({ particleCount: count, spread: 80, origin: { y: 0.6 } });
  }
}

function initLoader() {
  const timeout = setTimeout(() => {
    try {
      if (loadingScreen && loadingScreen.parentElement) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
          if (loadingScreen.parentElement) {
            loadingScreen.remove();
          }
        }, 600);
      }
    } catch (error) {
      console.warn('Error hiding loading screen:', error);
    }
  }, 900);

  // Fallback in case of slow loading
  const maxWait = setTimeout(() => {
    clearTimeout(timeout);
    try {
      if (loadingScreen && loadingScreen.parentElement) {
        loadingScreen.classList.add('hidden');
      }
    } catch (error) {}
  }, 3000);
}

function initApp() {
  try {
    initLoader();
  } catch (error) {
    console.warn('Loader initialization failed:', error);
  }
  
  try {
    initNavigation();
  } catch (error) {
    console.warn('Navigation initialization failed:', error);
  }
  
  try {
    initAmbientEffects();
  } catch (error) {
    console.warn('Ambient effects initialization failed:', error);
  }
  
  try {
    initPasswordScreen();
  } catch (error) {
    console.warn('Password screen initialization failed:', error);
  }
  
  try {
    initMusic();
  } catch (error) {
    console.warn('Music initialization failed:', error);
  }
  
  try {
    initEasterEggs();
  } catch (error) {
    console.warn('Easter eggs initialization failed:', error);
  }

  // Initialize components safely
  const components = [
    'initEnvelope',
    'initStorybook',
    'initConstellation',
    'initGarden',
    'initGallery',
    'initTimeline',
    'initReasons',
    'initGames',
    'initCountdown',
    'initFinale'
  ];

  components.forEach((componentName) => {
    try {
      if (typeof window[componentName] === 'function') {
        window[componentName]();
      }
    } catch (error) {
      console.warn(`Component ${componentName} initialization failed:`, error);
    }
  });
}

window.addEventListener('DOMContentLoaded', initApp);
