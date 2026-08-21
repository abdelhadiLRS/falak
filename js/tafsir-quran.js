/* js/tafsir-quran.js - Comparative Tafsir Logic */

document.addEventListener('DOMContentLoaded', async function () {
  let tafsirs = [];
  try {
    const res = await fetch('data/tafsir.json');
    if (res.ok) {
      tafsirs = await res.json();
    }
  } catch (e) {
    console.warn('Could not load tafsir data', e);
  }

  const container = document.getElementById('tafsir-comparison-container');
  if (!container) return;

  function renderTafsir() {
    if (tafsirs.length === 0) {
      container.innerHTML = `
        <div class="card" style="text-align:center; padding:2rem;">
          <h3>تفسير سورة الفاتحة — الآية ١</h3>
          <p class="quran-text" style="color:var(--accent-color);">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</p>
          <div class="grid-cols-3" style="margin-top:1.5rem;">
            <div class="card" style="background:var(--bg-primary);">
              <h4 style="color:var(--accent-gold); margin-top:0;">تفسير ابن كثير</h4>
              <p>افتتاح كتاب الله العزيز بالبسملة للتبرك بجميع أسماء الله الحسنى والتوسل برحمته الواسعة.</p>
            </div>
            <div class="card" style="background:var(--bg-primary);">
              <h4 style="color:var(--accent-color); margin-top:0;">تفسير السعدي</h4>
              <p>أبتدئ قراءتي بكل اسم لله تعالى، لأن لفظ (اسم) مفرد مضاف فيعم جميع الأسماء الحسنى.</p>
            </div>
            <div class="card" style="background:var(--bg-primary);">
              <h4 style="color:var(--accent-gold); margin-top:0;">تفسير الطبري</h4>
              <p>القول في تأويل بسم الله الرحمن الرحيم: الاستعانة والتبرك والثناء على الله جل جلاله.</p>
            </div>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = tafsirs.map(t => `
      <div class="card" style="margin-bottom:1.5rem;">
        <h3 style="margin-top:0;">سورة ${t.surah} — الآية ${t.ayah}</h3>
        <div class="grid-cols-3" style="margin-top:1rem;">
          <div class="card" style="background:var(--bg-primary);">
            <h4 style="color:var(--accent-gold); margin-top:0;">تفسير ابن كثير</h4>
            <p>${t.ibnKathir}</p>
          </div>
          <div class="card" style="background:var(--bg-primary);">
            <h4 style="color:var(--accent-color); margin-top:0;">تفسير السعدي</h4>
            <p>${t.saadi}</p>
          </div>
          <div class="card" style="background:var(--bg-primary);">
            <h4 style="color:var(--accent-gold); margin-top:0;">تفسير الطبري</h4>
            <p>${t.tabari}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderTafsir();
});
