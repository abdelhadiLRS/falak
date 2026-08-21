/* js/dreams.js - Dreams Dictionary Logic */

document.addEventListener('DOMContentLoaded', async function () {
  let dreams = [];
  try {
    const res = await fetch('data/dreams.json');
    if (res.ok) {
      dreams = await res.json();
    }
  } catch (e) {
    console.warn('Could not load dreams dictionary', e);
  }

  const container = document.getElementById('dreams-list-container');
  const searchInput = document.getElementById('dreams-search-input');
  const lettersNav = document.getElementById('dreams-letters-nav');

  const alphabet = ["أ", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "هـ", "و", "ي"];

  if (lettersNav) {
    lettersNav.innerHTML = alphabet.map(l => `
      <button class="btn btn-secondary" style="padding:0.4rem 0.75rem; border-radius:8px;" onclick="filterByLetter('${l}')">${l}</button>
    `).join('');
  }

  function renderDreams(list) {
    if (!container) return;

    if (list.length === 0) {
      container.innerHTML = `<div class="card" style="text-align:center;">لم يتم العثور على تفسيرات تطابق البحث</div>`;
      return;
    }

    container.innerHTML = list.map(d => `
      <div class="card" style="margin-bottom:1rem;">
        <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.5rem;">
          <span class="badge badge-gold" style="font-size:1rem;">حرف ${d.letter}</span>
          <h3 style="margin:0; font-size:1.25rem; color:var(--accent-color);">${d.keyword}</h3>
        </div>
        <p style="margin:0; color:var(--text-primary); font-size:1.05rem; line-height:1.7;">${d.meaning}</p>
      </div>
    `).join('');
  }

  renderDreams(dreams);

  window.filterByLetter = function (letter) {
    const filtered = dreams.filter(d => d.letter === letter);
    renderDreams(filtered);
  };

  if (searchInput) {
    searchInput.addEventListener('input', function (e) {
      const q = e.target.value.toLowerCase().trim();
      const filtered = dreams.filter(d =>
        d.keyword.includes(q) || d.meaning.includes(q)
      );
      renderDreams(filtered);
    });
  }
});
