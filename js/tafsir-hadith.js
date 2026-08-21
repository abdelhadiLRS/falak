/* js/tafsir-hadith.js - Hadith Encyclopedia Logic */

document.addEventListener('DOMContentLoaded', async function () {
  let hadiths = [];
  try {
    const res = await fetch('data/hadith.json');
    if (res.ok) {
      hadiths = await res.json();
    }
  } catch (e) {
    console.warn('Could not load hadith data', e);
  }

  const container = document.getElementById('hadith-list-container');
  const searchInput = document.getElementById('hadith-search-input');

  function renderHadiths(list) {
    if (!container) return;

    if (list.length === 0) {
      container.innerHTML = `<div class="card" style="text-align:center;">لم يتم العثور على أحاديث تطابق البحث</div>`;
      return;
    }

    container.innerHTML = list.map(h => `
      <div class="card" style="margin-bottom:1.5rem;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem;">
          <span class="badge badge-gold">${h.book} — حديث رقم ${h.number}</span>
          <span class="badge badge-emerald">${h.grade}</span>
        </div>
        <div class="quran-text" style="font-size:1.3rem; margin-bottom:1rem; line-height:2.2;">
          "${h.arabicText}"
        </div>
        <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.75rem;">
          <strong>الراوي:</strong> ${h.narrator}
        </div>
        <div style="padding:1rem; background-color:var(--bg-primary); border-radius:10px; font-size:0.95rem;">
          <strong>الشرح والتدبر:</strong> ${h.explanation}
        </div>
      </div>
    `).join('');
  }

  renderHadiths(hadiths);

  if (searchInput) {
    searchInput.addEventListener('input', function (e) {
      const q = e.target.value.toLowerCase().trim();
      const filtered = hadiths.filter(h =>
        h.arabicText.includes(q) ||
        h.narrator.includes(q) ||
        h.book.includes(q) ||
        h.explanation.includes(q)
      );
      renderHadiths(filtered);
    });
  }
});
