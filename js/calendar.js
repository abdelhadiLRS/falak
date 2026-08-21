/* js/calendar.js - Hijri Calendar & Events */

document.addEventListener('DOMContentLoaded', async function () {
  const eventsContainer = document.getElementById('calendar-events-list');
  const todayHijriEl = document.getElementById('today-hijri');
  const todayGregorianEl = document.getElementById('today-gregorian');

  // Format dates
  const today = new Date();
  if (todayGregorianEl) {
    todayGregorianEl.textContent = today.toLocaleDateString('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  if (todayHijriEl) {
    // Hijri date approximation
    try {
      const hijriFormatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      todayHijriEl.textContent = hijriFormatter.format(today);
    } catch (e) {
      todayHijriEl.textContent = "١٤٤٦ هجرية";
    }
  }

  try {
    const res = await fetch('data/quranic-calendar.json');
    if (res.ok) {
      const data = await res.json();
      const events = data.events || [];

      if (eventsContainer) {
        eventsContainer.innerHTML = events.map(ev => `
          <div class="card" style="display:flex; flex-direction:column; gap:0.5rem;">
            <div style="display:flex; align-items:center; justify-content:space-between;">
              <span class="badge badge-gold">اليوم ${ev.hijriDay}</span>
              <span class="badge badge-emerald">الشهر ${ev.hijriMonth}</span>
            </div>
            <h3 style="margin:0.25rem 0; font-size:1.15rem; color:var(--text-primary);">${ev.name}</h3>
            <p style="margin:0; font-size:0.9rem; color:var(--text-muted);">${ev.description}</p>
          </div>
        `).join('');
      }
    }
  } catch (e) {
    console.warn('Could not load quranic calendar', e);
  }
});
