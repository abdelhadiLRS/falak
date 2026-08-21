/* js/settings.js - Settings Center Logic */

document.addEventListener('DOMContentLoaded', function () {
  const themeSelect = document.getElementById('setting-theme');
  const langSelect = document.getElementById('setting-lang');
  const clearDataBtn = document.getElementById('setting-clear-data');

  if (themeSelect) {
    const currentTheme = localStorage.getItem('falak_theme') || 'light';
    themeSelect.value = currentTheme;
    themeSelect.addEventListener('change', function (e) {
      const val = e.target.value;
      document.documentElement.setAttribute('data-theme', val);
      localStorage.setItem('falak_theme', val);
      window.FalakMain.showToast('تم تحديث الثيم');
    });
  }

  if (langSelect) {
    const currentLang = localStorage.getItem('falak_lang') || 'ar';
    langSelect.value = currentLang;
    langSelect.addEventListener('change', function (e) {
      if (window.FalakI18n) {
        window.FalakI18n.setLang(e.target.value);
        window.FalakMain.showToast('تم تغيير اللغة');
      }
    });
  }

  if (clearDataBtn) {
    clearDataBtn.addEventListener('click', function () {
      if (confirm('هل أنت تأكد من مسح جميع البيانات المحلية والذاكرة المؤقتة؟')) {
        localStorage.clear();
        window.FalakMain.showToast('تم مسح البيانات بنجاح');
        setTimeout(() => location.reload(), 1000);
      }
    });
  }
});
