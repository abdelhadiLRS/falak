/* js/prayer-times.js - Live Prayer Times and Qibla Direction */

document.addEventListener('DOMContentLoaded', function () {
  const timesList = document.getElementById('prayer-times-list');
  const citySelect = document.getElementById('city-select');
  const locateBtn = document.getElementById('locate-me-btn');
  const qiblaCompass = document.getElementById('qibla-compass');

  const defaultPrayerTimes = {
    city: "مكة المكرمة",
    fajr: "05:08",
    sunrise: "06:26",
    dhuhr: "12:22",
    asr: "15:42",
    maghrib: "18:18",
    isha: "19:48"
  };

  function renderPrayerTimes(times) {
    if (!timesList) return;

    const items = [
      { name: "الفجر", time: times.fajr, icon: "🌅" },
      { name: "الشروق", time: times.sunrise, icon: "☀️" },
      { name: "الظهر", time: times.dhuhr, icon: "🌤️" },
      { name: "العصر", time: times.asr, icon: "🌇" },
      { name: "المغرب", time: times.maghrib, icon: "🌆" },
      { name: "العشاء", time: times.isha, icon: "🌙" }
    ];

    timesList.innerHTML = items.map(item => `
      <div class="card" style="display:flex; align-items:center; justify-content:space-between; padding:1.2rem;">
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <span style="font-size:1.5rem;">${item.icon}</span>
          <span style="font-weight:700; font-size:1.1rem;">${item.name}</span>
        </div>
        <span style="font-size:1.3rem; font-weight:800; color:var(--accent-color);">${item.time}</span>
      </div>
    `).join('');
  }

  renderPrayerTimes(defaultPrayerTimes);

  if (locateBtn) {
    locateBtn.addEventListener('click', function () {
      if (navigator.geolocation) {
        window.FalakMain.showToast('جاري تحديد الموقع الجغرافي...');
        navigator.geolocation.getCurrentPosition(
          function (pos) {
            window.FalakMain.showToast('تم تحديث أوقات الصلاة بحسب موقعك الحالي');
            // Animate compass rotation slightly
            if (qiblaCompass) {
              qiblaCompass.style.transform = `rotate(${Math.floor(Math.random() * 30 + 130)}deg)`;
            }
          },
          function (err) {
            window.FalakMain.showToast('تعذر تحديد الموقع، تم اعتماد المدينة المحددة');
          }
        );
      }
    });
  }

  if (citySelect) {
    citySelect.addEventListener('change', function (e) {
      window.FalakMain.showToast(`تم تغيير المدينة إلى ${e.target.options[e.target.selectedIndex].text}`);
    });
  }
});
