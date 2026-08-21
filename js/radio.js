/* js/radio.js - Live Quran Radio Player Logic */

document.addEventListener('DOMContentLoaded', async function () {
  let radios = [];
  try {
    const res = await fetch('data/mp3quran.json');
    if (res.ok) {
      const data = await res.json();
      radios = data.radios || [];
    }
  } catch (e) {
    console.warn('Could not load radios', e);
  }

  const container = document.getElementById('radio-list-container');

  function renderRadios(list) {
    if (!container) return;

    container.innerHTML = list.map(r => `
      <div class="card" style="display:flex; align-items:center; justify-content:space-between; padding:1.25rem;">
        <div style="display:flex; align-items:center; gap:1rem;">
          <div class="logo-icon">📻</div>
          <div>
            <h3 style="margin:0 0 0.25rem 0; font-size:1.1rem;">${r.name}</h3>
            <span class="badge badge-emerald">بث مباشر 24/7</span>
          </div>
        </div>
        <button class="btn btn-primary" onclick="playRadio('${r.url}', '${r.name}')">
          ▶ تشغيل البث
        </button>
      </div>
    `).join('');
  }

  renderRadios(radios);

  window.playRadio = function (url, name) {
    window.FalakMain.playAudio(url, name, 'بث مباشر عالي الجودة');
  };
});
