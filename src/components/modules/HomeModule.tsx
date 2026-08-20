import React, { useState } from 'react';
import {
  BookOpen,
  BookmarkCheck,
  Volume2,
  FileText,
  Compass,
  Sparkles,
  Shield,
  Sun,
  Heart,
  Calendar,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Award,
  Play,
  Copy,
  Check,
  Share2,
  Clock
} from 'lucide-react';
import { ActiveTab, SurahMeta } from '../../types';
import { PrayerService } from '../../services/prayerService';
import { StorageService } from '../../services/storageService';

interface HomeModuleProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectSurah: (surahId: number) => void;
  surahs: SurahMeta[];
}

export const HomeModule: React.FC<HomeModuleProps> = ({
  setActiveTab,
  onSelectSurah,
  surahs
}) => {
  const [copied, setCopied] = useState(false);
  const prayerTimes = PrayerService.getPrayerTimes();
  const nextPrayer = PrayerService.getNextPrayer(prayerTimes);
  const lastRead = StorageService.getLastReadingPosition();
  const bookmarks = StorageService.getBookmarks();
  const memorizationRecords = StorageService.getMemorizationRecords();

  const masteredCount = Object.values(memorizationRecords).filter(r => r.status === 'mastered').length;

  const handleCopyAyah = () => {
    navigator.clipboard.writeText('﴿ إِنَّ هَـٰذَا ٱلْقُرْءَانَ يَهْدِى لِلَّتِى هِىَ أَقْوَمُ وَيُبَشِّرُ ٱلْمُؤْمِنِينَ ٱلَّذِينَ يَعْمَلُونَ ٱلصَّـٰلِحَـٰتِ أَنَّ لَهُمْ أَجْرًا كَبِيرًا ﴾ [الإسراء: 9]');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickModules = [
    { id: 'quran' as ActiveTab, title: 'القرآن الكريم', desc: 'تلاوة، تدبر، ورسم عثماني', icon: BookOpen, color: 'from-emerald-600 to-teal-700' },
    { id: 'tafsir' as ActiveTab, title: 'التفاسير المقارنة', desc: 'ابن كثير، السعدي، والقرطبي', icon: FileText, color: 'from-blue-600 to-indigo-700' },
    { id: 'tajweed' as ActiveTab, title: 'أكاديمية التجويد', desc: 'أحكام التلاوة والأمثلة الصوتية', icon: Volume2, color: 'from-amber-600 to-orange-700' },
    { id: 'memorization' as ActiveTab, title: 'نظام الحفظ (SRS)', desc: 'خطط حفظ ومراجعة ذكية', icon: BookmarkCheck, color: 'from-purple-600 to-violet-700' },
    { id: 'hadith' as ActiveTab, title: 'الحديث الشريف', desc: 'صحيح البخاري ومسلم والسنن', icon: Shield, color: 'from-rose-600 to-pink-700' },
    { id: 'seerah' as ActiveTab, title: 'السيرة النبوية', desc: 'خط زمني تفاعلي وأطلس السيرة', icon: Compass, color: 'from-cyan-600 to-blue-700' },
    { id: 'fiqh' as ActiveTab, title: 'الفقه المقارن', desc: 'موسوعة أحكام المذاهب الـ4', icon: Shield, color: 'from-emerald-700 to-green-800' },
    { id: 'azkar' as ActiveTab, title: 'الأذكار والمسابح', desc: 'حصن المسلم ومسبحة إلكترونية', icon: Sun, color: 'from-amber-500 to-yellow-600' },
    { id: 'divine-names' as ActiveTab, title: 'أسماء الله الحسنى', desc: 'معانٍ عميقة وتأملات عملية', icon: Heart, color: 'from-rose-500 to-red-600' },
    { id: 'ai-assistant' as ActiveTab, title: 'مساعد فلك الذكي', desc: 'بحث دلالي وتوليد اختبارات', icon: Sparkles, color: 'from-teal-600 to-emerald-600' },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 text-white p-6 sm:p-8 shadow-xl shadow-emerald-950/15 border border-emerald-600/40">
        <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
        <div className="absolute right-0 top-0 w-96 h-96 bg-islamic-pattern opacity-15 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-xs font-semibold text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>مرحباً بك في منصة فلك الإسلامية العالمية</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-arabic-heading tracking-tight text-white leading-snug">
              ﴿ وَكُلٌّ فِي فَلَكٍ يَسْبَحُونَ ﴾
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
              رحلتك الشاملة لتعلم القرآن الكريم، فهم علومه وتفاسيره، إتقان تجويده، والنهل من السيرة النبوية والحديث والفقه، بدقة علمية موثقة وتقنيات ذكية متطورة.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  onSelectSurah(lastRead.surahId || 1);
                  setActiveTab('quran');
                }}
                className="px-5 py-2.5 rounded-xl bg-white text-emerald-900 font-bold text-sm hover:bg-emerald-50 transition-all shadow-md flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-emerald-900" />
                <span>متابعة القراءة (سورة {surahs.find(s => s.id === lastRead.surahId)?.name || 'الفاتحة'})</span>
              </button>

              <button
                onClick={() => setActiveTab('memorization')}
                className="px-4 py-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900/80 border border-emerald-500/40 text-white font-medium text-sm transition-all flex items-center gap-2"
              >
                <BookmarkCheck className="w-4 h-4 text-emerald-300" />
                <span>خطة الحفظ اليومية</span>
              </button>
            </div>
          </div>

          {/* Quick Prayer Summary Card */}
          <div className="lg:col-span-4 bg-emerald-950/50 backdrop-blur-md rounded-2xl p-5 border border-emerald-500/30 text-white space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-700/50 pb-3">
              <div>
                <span className="text-xs text-emerald-300">الصلاة القادمة</span>
                <h3 className="text-xl font-bold font-arabic-heading">{nextPrayer.name} ({nextPrayer.time})</h3>
              </div>
              <div className="text-left">
                <span className="text-[11px] text-emerald-300 block">المتبقي</span>
                <span className="text-sm font-bold text-amber-300 font-mono">
                  {Math.floor(nextPrayer.remainingMinutes / 60)} س {nextPrayer.remainingMinutes % 60} د
                </span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
              {[
                { name: 'الفجر', time: prayerTimes.fajr },
                { name: 'الظهر', time: prayerTimes.dhuhr },
                { name: 'العصر', time: prayerTimes.asr },
                { name: 'المغرب', time: prayerTimes.maghrib },
                { name: 'العشاء', time: prayerTimes.isha }
              ].map((p, idx) => (
                <div key={idx} className="p-1.5 rounded-lg bg-emerald-900/40 border border-emerald-700/30">
                  <span className="text-[10px] text-emerald-300 block">{p.name}</span>
                  <span className="font-semibold text-[11px]">{p.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Daily Verse & Reflection of the Day */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Ayah of the Day */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                <BookOpen className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-base text-slate-900 dark:text-white font-arabic-heading">
                آية اليوم وتدبرها
              </h3>
            </div>
            <button
              onClick={handleCopyAyah}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-emerald-600 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'تم النسخ' : 'نسخ الآية'}</span>
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-center space-y-3">
            <p className="text-xl sm:text-2xl text-slate-900 dark:text-slate-100 font-quran leading-loose">
              ﴿ إِنَّ هَـٰذَا ٱلْقُرْءَانَ يَهْدِى لِلَّتِى هِىَ أَقْوَمُ وَيُبَشِّرُ ٱلْمُؤْمِنِينَ ٱلَّذِينَ يَعْمَلُونَ ٱلصَّـٰلِحَـٰتِ أَنَّ لَهُمْ أَجْرًا كَبِيرًا ﴾
            </p>
            <p className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
              [سورة الإسراء: الآية 9]
            </p>
          </div>

          <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl">
            <span className="font-bold text-slate-800 dark:text-slate-200 block text-sm font-arabic-heading">
              من هدايات الآية الكريمة (تفسير ابن كثير والسعدي):
            </span>
            <p className="leading-relaxed">
              يمدح الله تعالى كتابه العزيز بأنه يرشد ويهدي لأعدل المسالك وأقوم العقائد والأخلاق والتشريعات؛ فمن استمسك به سعد في دنياه وفاز في آخرته بأعظم الأجر.
            </p>
          </div>
        </div>

        {/* Daily Hadith Card */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                <Shield className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-base text-slate-900 dark:text-white font-arabic-heading">
                حديث اليوم الشريف
              </h3>
            </div>

            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed font-arabic-heading">
              «خَيْرُكُمْ مَنْ تَعَلَّمَ القُرْآنَ وَعَلَّمَهُ»
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              راوي الحديث: عثمان بن عفان رضي الله عنه | المصدر: صحيح البخاري (5027)
            </p>

            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2.5">
              فضل عظيم لمن جمع بين تلقي القرآن وفهمه وتدبره، ثم نشره وتعليمه للناس ابتغاء مرضاة الله.
            </div>
          </div>

          <button
            onClick={() => setActiveTab('hadith')}
            className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>تصفح موسوعة الحديث الكاملة</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Ecosystem Modules Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-arabic-heading">
              أقسام منظومة فلك
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              استكشف منظومة المعرفة والعلوم الإسلامية المتكاملة
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {quickModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                onClick={() => setActiveTab(mod.id)}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md cursor-pointer transition-all group relative overflow-hidden"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mod.color} text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors font-arabic-heading">
                  {mod.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {mod.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Surahs Quick Navigator */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white font-arabic-heading">
              فهرس سور القرآن الكريم (114 سورة)
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('quran')}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>عرض المصحف الكامل</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {surahs.slice(0, 18).map((surah) => (
            <div
              key={surah.id}
              onClick={() => {
                onSelectSurah(surah.id);
                setActiveTab('quran');
              }}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200/70 dark:border-slate-700/60 hover:border-emerald-400 cursor-pointer transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-center">
                  {surah.id}
                </span>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 font-arabic-heading">
                    {surah.name}
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    {surah.numberOfAyahs} آية
                  </span>
                </div>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-700">
                {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
