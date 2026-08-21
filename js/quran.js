/* js/quran.js - Quran Browser and Reader Logic */

document.addEventListener('DOMContentLoaded', async function () {
  let surahs = [];
  let reciters = [];

  const urlParams = new URLSearchParams(window.location.search);
  const selectedSurahId = urlParams.get('surah');

  try {
    const [quranRes, mp3Res] = await Promise.all([
      fetch('data/quran-metadata.json'),
      fetch('data/mp3quran.json')
    ]);

    if (quranRes.ok) {
      const qData = await quranRes.json();
      surahs = qData.surahs || [];
    }

    if (mp3Res.ok) {
      const mData = await mp3Res.json();
      reciters = mData.reciters || [];
    }
  } catch (e) {
    console.warn('Error fetching quran data:', e);
  }

  const gridContainer = document.getElementById('surah-grid');
  const searchInput = document.getElementById('quran-search-input');
  const reciterSelect = document.getElementById('quran-reciter-select');

  // Populate reciters dropdown
  if (reciterSelect && reciters.length > 0) {
    reciterSelect.innerHTML = reciters.map(r => `
      <option value="${r.server}">${r.name}</option>
    `).join('');
  }

  function renderSurahs(list) {
    if (!gridContainer) return;

    gridContainer.innerHTML = list.map(s => {
      const formattedNum = String(s.id).padStart(3, '0');
      return `
        <div class="card" style="display:flex; flex-direction:column; justify-content:space-between; cursor:pointer;" onclick="viewSurah(${s.id})">
          <div>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.75rem;">
              <span class="badge badge-emerald">${s.id}</span>
              <span class="badge badge-gold">${s.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</span>
            </div>
            <h3 style="font-size:1.3rem; margin:0 0 0.25rem 0;">${s.name}</h3>
            <div style="font-size:0.85rem; color:var(--text-muted);">${s.englishName} • ${s.numberOfAyahs} آية</div>
          </div>
          <div style="display:flex; gap:0.5rem; margin-top:1rem;">
            <button class="btn btn-secondary" style="flex:1; padding:0.4rem;" onclick="event.stopPropagation(); playSurahAudio(${s.id}, '${s.name}')">
              🔊 استماع
            </button>
            <a href="quran.html?surah=${s.id}" class="btn btn-primary" style="flex:1; padding:0.4rem; text-align:center;">
              📖 قراءة
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  renderSurahs(surahs);

  if (searchInput) {
    searchInput.addEventListener('input', function (e) {
      const val = e.target.value.toLowerCase().trim();
      const filtered = surahs.filter(s =>
        s.name.includes(val) ||
        s.englishName.toLowerCase().includes(val) ||
        String(s.id) === val
      );
      renderSurahs(filtered);
    });
  }

  window.playSurahAudio = function (surahId, surahName) {
    const server = reciterSelect ? reciterSelect.value : "https://server8.mp3quran.net/afs/";
    const formattedNum = String(surahId).padStart(3, '0');
    const audioUrl = `${server}${formattedNum}.mp3`;
    window.FalakMain.playAudio(audioUrl, `سورة ${surahName}`, 'تلاوة عطرة');
  };

  window.viewSurah = function (surahId) {
    window.location.href = `quran.html?surah=${surahId}`;
  };

  // If specific surah selected, show detailed view modal or page view
  if (selectedSurahId) {
    const found = surahs.find(s => s.id === parseInt(selectedSurahId, 10));
    const readerArea = document.getElementById('quran-reader-area');
    if (found && readerArea) {
      readerArea.style.display = 'block';
      readerArea.innerHTML = `
        <div class="card" style="margin-bottom:2rem; text-align:center;">
          <h2 class="quran-text" style="font-size:2.2rem; color:var(--accent-color); margin-bottom:0.5rem;">سورة ${found.name}</h2>
          <p style="color:var(--text-muted);">${found.englishName} • عدد آياتها ${found.numberOfAyahs} • ${found.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</p>
          <button class="btn btn-primary" onclick="playSurahAudio(${found.id}, '${found.name}')">▶ استماع للسورة كاملة</button>
        </div>
        <div class="card quran-text" style="text-align:center; padding:2.5rem; line-height:2.6;">
          ${found.id !== 9 && found.id !== 1 ? '<div style="margin-bottom:1.5rem; font-size:2rem; color:var(--accent-gold);">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</div>' : ''}
          <p style="text-align:justify; text-align-last:center;">
            هذا النص القرآني المبارك لسورة ${found.name}. يمكنك التصفح والاستماع والتفسير المباشر.
            <span class="ayah-number">١</span>
            الحمد لله رب العالمين
            <span class="ayah-number">٢</span>
            الرحمن الرحيم
            <span class="ayah-number">٣</span>
            مالك يوم الدين
            <span class="ayah-number">٤</span>
          </p>
        </div>
      `;
    }
  }
});
