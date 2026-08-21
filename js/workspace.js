/* js/workspace.js - Workspace / Dashboard Logic */

document.addEventListener('DOMContentLoaded', async function () {
  // 1. Fetch Ayah of the Day
  try {
    const res = await fetch('data/ayah_of_the_day.json');
    if (res.ok) {
      const data = await res.json();
      const textEl = document.getElementById('daily-ayah-text');
      const metaEl = document.getElementById('daily-ayah-meta');
      const reflectionEl = document.getElementById('daily-ayah-reflection');

      if (textEl) textEl.textContent = data.text;
      if (metaEl) metaEl.textContent = `سورة ${data.surah} - الآية ${data.ayahNumber}`;
      if (reflectionEl) reflectionEl.textContent = data.reflection;
    }
  } catch (e) {
    console.warn('Could not load daily ayah', e);
  }

  // 2. Tasbeeh Counter Logic
  let tasbeehCount = parseInt(localStorage.getItem('falak_tasbeeh_count') || '0', 10);
  const countEl = document.getElementById('tasbeeh-count');
  const incrementBtn = document.getElementById('tasbeeh-increment');
  const resetBtn = document.getElementById('tasbeeh-reset');

  function updateTasbeehDisplay() {
    if (countEl) countEl.textContent = tasbeehCount;
  }

  updateTasbeehDisplay();

  if (incrementBtn) {
    incrementBtn.addEventListener('click', function () {
      tasbeehCount++;
      localStorage.setItem('falak_tasbeeh_count', tasbeehCount);
      updateTasbeehDisplay();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      tasbeehCount = 0;
      localStorage.setItem('falak_tasbeeh_count', 0);
      updateTasbeehDisplay();
    });
  }

  // 3. Load Adhkar Preview
  try {
    const res = await fetch('data/adhkar.json');
    if (res.ok) {
      const adhkar = await res.json();
      const container = document.getElementById('quick-adhkar-list');
      if (container && Array.isArray(adhkar)) {
        container.innerHTML = adhkar.slice(0, 3).map(item => `
          <div style="padding:1rem; border-bottom:1px solid var(--border-color);">
            <div style="font-weight:700; color:var(--accent-color); font-size:0.85rem; margin-bottom:0.25rem;">${item.categoryArabic}</div>
            <div class="quran-text" style="font-size:1.1rem; line-height:1.8;">${item.text}</div>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.4rem;">${item.reference}</div>
          </div>
        `).join('');
      }
    }
  } catch (e) {
    console.warn('Could not load adhkar', e);
  }
});
