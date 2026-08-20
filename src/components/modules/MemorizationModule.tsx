import React, { useState } from 'react';
import {
  BookmarkCheck,
  Calendar,
  Flame,
  Award,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Eye,
  EyeOff,
  Check,
  Download,
  Plus,
  Play
} from 'lucide-react';
import { StorageService } from '../../services/storageService';
import { SAMPLE_VERSES_DATA } from '../../data/quranData';

export const MemorizationModule: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<'juz-amma' | 'kahf' | 'mulk' | 'baqarah'>('mulk');
  const [hiddenWordIndices, setHiddenWordIndices] = useState<number[]>([1, 3, 5]);
  const [showAllWords, setShowAllWords] = useState(false);
  const [studentName, setStudentName] = useState('طالب علم فلك');
  const [showCertificate, setShowCertificate] = useState(false);
  const [dailyGoalAyahs, setDailyGoalAyahs] = useState(5);
  const [completedToday, setCompletedToday] = useState(3);
  const [streakDays, setStreakDays] = useState(14);

  // Sample verse for interactive memorization practice (Surah Al-Mulk: 1)
  const samplePracticeWords = [
    { text: 'تَبَٰرَكَ', hidden: false },
    { text: 'ٱلَّذِى', hidden: true },
    { text: 'بِيَدِهِ', hidden: false },
    { text: 'ٱلْمُلْكُ', hidden: true },
    { text: 'وَهُوَ', hidden: false },
    { text: 'عَلَىٰ', hidden: true },
    { text: 'كُلِّ', hidden: false },
    { text: 'شَىْءٍۢ', hidden: false },
    { text: 'قَدِيرٌ', hidden: true }
  ];

  const [interactiveWords, setInteractiveWords] = useState(samplePracticeWords);

  const toggleWordVisibility = (idx: number) => {
    setInteractiveWords(prev =>
      prev.map((w, i) => (i === idx ? { ...w, hidden: !w.hidden } : w))
    );
  };

  const handleMarkMemorized = () => {
    if (completedToday < dailyGoalAyahs) {
      setCompletedToday(c => c + 1);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-800 via-violet-800 to-purple-950 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-xs font-semibold text-purple-200">
          <BookmarkCheck className="w-3.5 h-3.5" />
          <span>نظام التكرار المتباعد الذكي (Spaced Repetition System)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-arabic-heading">
          نظام الحفظ والمراجعة القرآنية المتقنة
        </h1>
        <p className="text-xs sm:text-sm text-purple-100/90 max-w-2xl leading-relaxed">
          خطط منهجية للحفظ، واختبارات تفاعلية لإخفاء الكلمات واختبار الذاكرة، مع شهادات إنجاز رقمية موثقة.
        </p>
      </div>

      {/* Progress & Streak Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Daily Goal Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>الورد اليومي للحفظ</span>
            <span className="font-bold text-emerald-600 font-mono">{completedToday} / {dailyGoalAyahs} آيات</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all"
              style={{ width: `${(completedToday / dailyGoalAyahs) * 100}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">باقي {Math.max(0, dailyGoalAyahs - completedToday)} آيات لإتمام ورد اليوم</p>
        </div>

        {/* Streak Counter Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 flex items-center justify-center">
            <Flame className="w-6 h-6 fill-amber-500 text-amber-500" />
          </div>
          <div>
            <span className="text-xs text-slate-500">سلسلة الالتزام المتواصل</span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-mono">{streakDays} يوماً</h3>
            <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">ما شاء الله، واصل الثبات!</p>
          </div>
        </div>

        {/* Total Mastered Ayahs */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500">الآيات المتقنة في فلك</span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-mono">148 آية</h3>
            <button
              onClick={() => setShowCertificate(true)}
              className="text-[11px] text-purple-700 dark:text-purple-400 font-bold hover:underline"
            >
              عرض شهادة الإتقان الرقمية
            </button>
          </div>
        </div>
      </div>

      {/* Tracks Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'mulk', label: 'سورة الملك (المنجية - 30 آية)' },
          { id: 'juz-amma', label: 'جزء عم كامل (37 سورة)' },
          { id: 'kahf', label: 'سورة الكهف (110 آيات)' },
          { id: 'baqarah', label: 'سورة البقرة (فسطاط القرآن)' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTrack(t.id as any)}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all shrink-0 ${
              activeTrack === t.id
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Interactive Recitation & Word-Hiding Simulator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
              تمرين التسميع الذاتي (سورة الملك: الآية 1)
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-arabic-heading">
              اضغط على الكلمات المغطاة لاختبار حفظك واستحضار الآية
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const anyHidden = interactiveWords.some(w => w.hidden);
                setInteractiveWords(prev => prev.map(w => ({ ...w, hidden: !anyHidden })));
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 flex items-center gap-1.5"
            >
              {interactiveWords.some(w => w.hidden) ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span>{interactiveWords.some(w => w.hidden) ? 'كشف الكل' : 'إخفاء الكل'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Words Board */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 flex flex-wrap gap-3 sm:gap-4 items-center justify-center">
          {interactiveWords.map((word, idx) => (
            <button
              key={idx}
              onClick={() => toggleWordVisibility(idx)}
              className={`px-4 py-3 rounded-2xl text-2xl sm:text-3xl font-quran transition-all shadow-xs select-none ${
                word.hidden
                  ? 'bg-purple-200 dark:bg-purple-950/80 text-transparent border border-dashed border-purple-400 hover:border-purple-600 min-w-[70px] cursor-pointer'
                  : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700'
              }`}
              title={word.hidden ? 'انقر لكشف الكلمة' : 'انقر لإخفاء الكلمة'}
            >
              {word.hidden ? '••••' : word.text}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-500">
            انقر على أي بطاقة لتغطية الكلمة أو إظهارها حسب مستوى تمكنك.
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setInteractiveWords(samplePracticeWords);
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة الضبط</span>
            </button>

            <button
              onClick={handleMarkMemorized}
              className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-md flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>أتقنت هذه الآية (+1 في الورد)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Verifiable Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-8 shadow-2xl border-4 border-amber-400 space-y-6 text-center relative overflow-hidden">
            <div className="space-y-2">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-md">
                <Award className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block font-arabic-heading">
                منصة فلك الإسلامية المفتوحة
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-arabic-heading">
                شهادة إتقان وضبط قرآني
              </h2>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50/60 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 space-y-3">
              <p className="text-xs text-slate-500">يشهد القائمون على منصة فلك بأن المتدرب:</p>
              <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 font-arabic-heading">
                {studentName}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                قد أتم بنجاح واقتدار مسار حفظ ومراجعة سورة الملك برواية حفص عن عاصم، واجتاز معايير الضبط والتسميع الذكي.
              </p>
              <div className="pt-2 flex justify-between text-[11px] text-slate-400 border-t border-amber-200/60 dark:border-slate-700">
                <span>تاريخ المنح: {new Date().toLocaleDateString('ar-EG')}</span>
                <span>رمز التوثيق: FLK-QRN-2026-9821</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowCertificate(false)}
                className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              >
                إغلاق
              </button>
              <button
                onClick={() => alert('تم تنزيل شهادة الإتقان الرقمية بنجاح')}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-md flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>تحميل الشهادة (PDF / صورة)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
