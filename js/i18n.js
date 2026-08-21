/* js/i18n.js - Multilingual & Direction Engine for Falak */

window.FalakI18n = (function () {
  let currentLang = localStorage.getItem('falak_lang') || 'ar';
  let translations = {};

  const rtlLanguages = ['ar', 'ur', 'fa', 'ps', 'he'];

  async function loadLanguage(lang) {
    currentLang = lang || currentLang;
    localStorage.setItem('falak_lang', currentLang);

    try {
      const response = await fetch(`data/languages/${currentLang}.json`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      translations = await response.json();
    } catch (err) {
      console.warn(`Could not load translations for ${currentLang}, falling back to ar`, err);
      if (currentLang !== 'ar') {
        return loadLanguage('ar');
      }
    }

    applyTranslations();
    applyDirection();
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[key]) {
        el.setAttribute('placeholder', translations[key]);
      }
    });
  }

  function applyDirection() {
    const isRtl = rtlLanguages.includes(currentLang);
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);
  }

  function t(key, fallback = '') {
    return translations[key] || fallback || key;
  }

  function getLang() {
    return currentLang;
  }

  return {
    init: function () {
      loadLanguage(currentLang);
    },
    setLang: function (lang) {
      loadLanguage(lang);
    },
    t: t,
    getLang: getLang
  };
})();

document.addEventListener('DOMContentLoaded', function () {
  window.FalakI18n.init();
});
