/* js/main.js - Global Utilities, Toast UI, Audio Player & Storage */

window.FalakMain = (function () {
  let audioEl = null;

  function initAudioPlayer() {
    let container = document.getElementById('audio-player-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'audio-player-container';
      document.body.appendChild(container);
    }

    container.innerHTML = `
      <div class="audio-player-bar" id="audio-player-bar">
        <div class="player-info">
          <div class="logo-icon" style="width:32px; height:32px; font-size:1rem;">🔊</div>
          <div>
            <div id="player-title" style="font-weight:700; font-size:0.95rem;">منصة فلك للصوتيات</div>
            <div id="player-subtitle" style="font-size:0.8rem; color:var(--text-muted);">اختر سورة أو إذاعة للاستماع</div>
          </div>
        </div>

        <div class="player-controls">
          <button class="btn-icon" id="player-btn-prev">⏭</button>
          <button class="btn-icon" id="player-btn-play" style="background-color:var(--accent-color); color:#fff; width:44px; height:44px;">▶</button>
          <button class="btn-icon" id="player-btn-next">⏮</button>
        </div>

        <div class="player-extra">
          <span style="font-size:0.85rem;" id="player-time">00:00</span>
          <input type="range" id="player-volume" min="0" max="1" step="0.05" value="0.8" style="width:80px; accent-color:var(--accent-color);" />
        </div>
      </div>
      <audio id="falak-global-audio" style="display:none;"></audio>
    `;

    audioEl = document.getElementById('falak-global-audio');
    const playBtn = document.getElementById('player-btn-play');
    const volumeInput = document.getElementById('player-volume');
    const timeDisplay = document.getElementById('player-time');

    if (playBtn) {
      playBtn.addEventListener('click', function () {
        if (!audioEl.src) return;
        if (audioEl.paused) {
          audioEl.play();
          playBtn.textContent = '⏸';
        } else {
          audioEl.pause();
          playBtn.textContent = '▶';
        }
      });
    }

    if (volumeInput) {
      volumeInput.addEventListener('input', function (e) {
        if (audioEl) audioEl.volume = parseFloat(e.target.value);
      });
    }

    if (audioEl) {
      audioEl.addEventListener('timeupdate', function () {
        const current = formatTime(audioEl.currentTime);
        const duration = formatTime(audioEl.duration || 0);
        if (timeDisplay) timeDisplay.textContent = `${current} / ${duration}`;
      });

      audioEl.addEventListener('ended', function () {
        if (playBtn) playBtn.textContent = '▶';
      });
    }
  }

  function playAudio(url, title, subtitle) {
    if (!audioEl) initAudioPlayer();
    audioEl.src = url;
    audioEl.play().catch(err => console.warn('Audio play error:', err));

    const playBtn = document.getElementById('player-btn-play');
    const titleEl = document.getElementById('player-title');
    const subtitleEl = document.getElementById('player-subtitle');

    if (playBtn) playBtn.textContent = '⏸';
    if (titleEl) titleEl.textContent = title || 'تلاوة سورة';
    if (subtitleEl) subtitleEl.textContent = subtitle || 'منصة فلك';

    showToast(`جاري تشغيل: ${title}`);
  }

  function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function showToast(msg) {
    let toast = document.getElementById('falak-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'falak-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 95px;
        inset-inline-start: 20px;
        background-color: var(--bg-card);
        color: var(--text-primary);
        border: 1px solid var(--accent-color);
        padding: 0.75rem 1.25rem;
        border-radius: 12px;
        box-shadow: var(--shadow-lg);
        z-index: 200;
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(10px);
        font-weight: 600;
        font-size: 0.9rem;
      `;
      document.body.appendChild(toast);
    }

    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
    }, 3000);
  }

  function getFavorites(type) {
    const data = JSON.parse(localStorage.getItem('falak_favorites') || '{}');
    return type ? (data[type] || []) : data;
  }

  function toggleFavorite(type, item) {
    const data = getFavorites();
    if (!data[type]) data[type] = [];

    const index = data[type].findIndex(x => x.id === item.id);
    if (index >= 0) {
      data[type].splice(index, 1);
      showToast('تمت الإزالة من المفضلة');
    } else {
      data[type].push(item);
      showToast('تمت الإضافة إلى المفضلة ⭐');
    }

    localStorage.setItem('falak_favorites', JSON.stringify(data));
  }

  return {
    init: function () {
      initAudioPlayer();
    },
    playAudio: playAudio,
    showToast: showToast,
    getFavorites: getFavorites,
    toggleFavorite: toggleFavorite
  };
})();

document.addEventListener('DOMContentLoaded', function () {
  window.FalakMain.init();
});
