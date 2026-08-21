/* js/navigation.js - Dynamic Navigation Header, Sidebar, and Footer */

window.FalakNav = (function () {
  const menuItems = [
    { href: "index.html", icon: "❖", key: "nav_workspace", text: "لوحة التحكم" },
    { href: "quran.html", icon: "📖", key: "nav_quran", text: "المصحف الشريف" },
    { href: "prayer-times.html", icon: "🕌", key: "nav_prayer_times", text: "مواقيت الصلاة" },
    { href: "calendar.html", icon: "📅", key: "nav_calendar", text: "التقويم الهجري" },
    { href: "tafsir-quran.html", icon: "📚", key: "nav_tafsir_quran", text: "التفسير المقارن" },
    { href: "tafsir-hadith.html", icon: "📜", key: "nav_tafsir_hadith", text: "موسوعة الحديث" },
    { href: "dreams.html", icon: "🌙", key: "nav_dreams", text: "تفسير الأحلام" },
    { href: "radio.html", icon: "📻", key: "nav_radio", text: "إذاعات القرآن" },
    { href: "library.html", icon: "🏛️", key: "nav_library", text: "المكتبة الإسلامية" },
    { href: "ramadan.html", icon: "✨", key: "nav_ramadan", text: "تحدي رمضان" },
    { href: "settings.html", icon: "⚙️", key: "nav_settings", text: "الإعدادات" },
    { href: "about.html", icon: "ℹ️", key: "nav_about", text: "عن فلك" },
    { href: "developers.html", icon: "💻", key: "nav_developers", text: "للمطورين" }
  ];

  function renderSidebar() {
    const container = document.getElementById('app-sidebar-container');
    if (!container) return;

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    const menuHtml = menuItems.map(item => {
      const isActive = currentPath === item.href || (currentPath === '' && item.href === 'index.html');
      return `
        <li class="menu-item ${isActive ? 'active' : ''}">
          <a href="${item.href}">
            <span class="menu-icon">${item.icon}</span>
            <span data-i18n="${item.key}">${item.text}</span>
          </a>
        </li>
      `;
    }).join('');

    container.innerHTML = `
      <aside class="app-sidebar" id="app-sidebar">
        <div class="sidebar-header">
          <div class="logo-icon">ف</div>
          <div>
            <div class="brand-title">فَلَك | Falak</div>
            <div style="font-size:0.75rem; color:var(--text-muted)">الموسوعة الإسلامية</div>
          </div>
        </div>
        <ul class="sidebar-menu">
          ${menuHtml}
        </ul>
      </aside>
    `;
  }

  function renderHeader() {
    const container = document.getElementById('app-header-container');
    if (!container) return;

    const currentLang = window.FalakI18n ? window.FalakI18n.getLang() : 'ar';
    const currentTheme = localStorage.getItem('falak_theme') || 'light';

    container.innerHTML = `
      <header class="app-header">
        <div style="display:flex; align-items:center; gap:1rem;">
          <button class="btn-icon mobile-only" id="sidebar-toggle" title="القائمة">☰</button>
          <div class="header-search">
            <input type="text" id="global-search-input" data-i18n-placeholder="search_placeholder" placeholder="ابحث في فلك..." />
          </div>
        </div>

        <div class="header-actions">
          <select id="lang-select" class="btn btn-secondary" style="padding:0.4rem 0.8rem; border-radius:10px;">
            <option value="ar" ${currentLang === 'ar' ? 'selected' : ''}>العربية</option>
            <option value="en" ${currentLang === 'en' ? 'selected' : ''}>English</option>
            <option value="fr" ${currentLang === 'fr' ? 'selected' : ''}>Français</option>
            <option value="tr" ${currentLang === 'tr' ? 'selected' : ''}>Türkçe</option>
            <option value="ur" ${currentLang === 'ur' ? 'selected' : ''}>اردو</option>
            <option value="id" ${currentLang === 'id' ? 'selected' : ''}>Bahasa Indonesia</option>
            <option value="es" ${currentLang === 'es' ? 'selected' : ''}>Español</option>
            <option value="ru" ${currentLang === 'ru' ? 'selected' : ''}>Русский</option>
            <option value="de" ${currentLang === 'de' ? 'selected' : ''}>Deutsch</option>
            <option value="zh" ${currentLang === 'zh' ? 'selected' : ''}>中文</option>
          </select>

          <button class="btn-icon" id="theme-toggle" title="تبديل المظهر">
            ${currentTheme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>
    `;

    // Event listeners
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
      langSelect.addEventListener('change', function (e) {
        if (window.FalakI18n) window.FalakI18n.setLang(e.target.value);
      });
    }

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('falak_theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
      });
    }

    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', function () {
        const sidebar = document.getElementById('app-sidebar');
        if (sidebar) sidebar.classList.toggle('open');
      });
    }
  }

  function renderFooter() {
    const container = document.getElementById('app-footer-container');
    if (!container) return;

    container.innerHTML = `
      <footer class="app-footer">
        <p data-i18n="footer_text">منصة فلك — مشروع إسلامي مفتوح المصدر لوجه الله تعالى</p>
        <p style="font-size:0.8rem;" data-i18n="all_rights_reserved">جميع الحقوق متاحة للاستخدام والتطوير الدعوي</p>
      </footer>
    `;
  }

  function applySavedTheme() {
    const savedTheme = localStorage.getItem('falak_theme') ||
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  return {
    init: function () {
      applySavedTheme();
      renderSidebar();
      renderHeader();
      renderFooter();
    }
  };
})();

document.addEventListener('DOMContentLoaded', function () {
  window.FalakNav.init();
});
