# فَلَك (Falak) — منصة القرآن الكريم والعلوم الإسلامية

منصة **فَلَك (Falak)** هي موقع إسلامي هجين وخفيف ومستقل تماماً لتعليم القرآن الكريم، التفاسير المقارنة، الحديث الشريف، الأذكار، والتراجم، مبنية بـ HTML5 و Vanilla JS المباشرة بدون أي تعقيد أو خوادم ثقيلة.

---

## 🌟 مميزات منصة فلك
- **13 صفحة مستقيمة وعصرية (HTML Pages):**
  - `index.html`: لوحة التحكم (آية اليوم، الأذكار، المسبحة الإلكترونية، الخريطة).
  - `quran.html`: المصحف الشريف الشامل مع القراء والتفسير المباشر.
  - `prayer-times.html`: مواقيت الصلاة الحية والقبلة وتحديد الموقع.
  - `calendar.html`: التقويم الهجري والميلادي والقرآني والأحداث الإسلامية.
  - `tafsir-quran.html`: التفسير المقارن (ابن كثير، السعدي، الطبري).
  - `tafsir-hadith.html`: موسوعة الحديث الشريف والتخريج وصحة الحديث.
  - `dreams.html`: معجم تفسير الأحلام مرتب ألفبائياً مع البحث الفوري.
  - `radio.html`: مشغل البث المباشر لإذاعات القرآن الكريم العالمية.
  - `library.html`: المكتبة الإسلامية والكتب التفاعلية.
  - `ramadan.html`: تحدي رمضان والبرامج الإيمانية وتتبع الطاعات.
  - `settings.html`: مركز الإعدادات (اللغات، الثيمات، الذاكرة).
  - `about.html`: عن منصة فلك والرؤية السامية.
  - `developers.html`: دليل المطورين والودجات المضمنة (Embed Widgets).

- **ميزات Vanilla JS بـ 100%:**
  - **محرك اللغات (i18n.js):** دعم 20+ لغة عالمية مع توجيه تلقائي للـ RTL/LTR.
  - **المشغل الصوتي الموحد (main.js):** الاستماع للقرآن وإذاعات البث المباشر.
  - **تحديد الموقع والقبلة (prayer-times.js):** باستخدام `navigator.geolocation`.
  - **تخزين المحلي (localStorage):** حفظ التفضيلات والتقدم دون حاجة لقواعد بيانات خارجية.

---

## 🚀 كيفية التشغيل والفتح المباشر

### 1. الفتح المباشر في المتصفح (File System)
يمكنك فتح أي ملف HTML مثل `index.html` في متصفحك مباشرة دون الحاجة لتركيب Node.js أو npm.

### 2. تشغيل عبر خادم محلي (Local HTTP Server)
```bash
# استخدام Python
python3 -m http.server 8000

# أو استخدام Node server
npm start
```

تفتح المنصة فوراً على الرابط: `http://localhost:8000` أو `http://localhost:3000`.

---

## 📁 هيكل مجلدات المشروع
```text
.
├── index.html
├── quran.html
├── prayer-times.html
├── calendar.html
├── tafsir-quran.html
├── tafsir-hadith.html
├── dreams.html
├── radio.html
├── library.html
├── ramadan.html
├── settings.html
├── about.html
├── developers.html
│
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── themes.css
│
├── js/
│   ├── main.js
│   ├── navigation.js
│   ├── i18n.js
│   ├── workspace.js
│   ├── quran.js
│   ├── prayer-times.js
│   ├── calendar.js
│   ├── tafsir-quran.js
│   ├── tafsir-hadith.js
│   ├── dreams.js
│   ├── radio.js
│   ├── library.js
│   ├── ramadan.js
│   └── settings.js
│
├── data/
│   ├── languages/ (ar.json, en.json, fr.json, ...)
│   ├── adhkar.json
│   ├── quranic-calendar.json
│   ├── mp3quran.json
│   ├── ayah_of_the_day.json
│   ├── dreams.json
│   ├── hadith.json
│   ├── tafsir.json
│   └── library.json
│
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## ⚖️ الترخيص والأهداف
مشروع **فلك** مفتوح المصدر مجاني ومتاح لوجه الله تعالى لخدمة أمة الإسلام والعلوم الدعوية والتعليمية.
