import React, { useState } from 'react';
import {
  Heart,
  Search,
  BookOpen,
  Sparkles,
  Copy,
  Check,
  ChevronDown
} from 'lucide-react';
import { DIVINE_NAMES } from '../../data/divineNamesData';
import { DivineName } from '../../types';

export const DivineNamesModule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedName, setSelectedName] = useState<DivineName>(DIVINE_NAMES[0]);
  const [copiedNameId, setCopiedNameId] = useState<number | null>(null);

  const filteredNames = DIVINE_NAMES.filter(
    n => n.nameArabic.includes(searchQuery) ||
         n.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
         n.meaning.includes(searchQuery)
  );

  const handleCopyDua = (name: DivineName) => {
    navigator.clipboard.writeText(name.duaFormula);
    setCopiedNameId(name.id);
    setTimeout(() => setCopiedNameId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-800 via-red-800 to-rose-950 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-900/60 border border-rose-500/30 text-xs font-semibold text-rose-200">
          <Heart className="w-3.5 h-3.5" />
          <span>﴿ وَلِلَّهِ ٱلْأَسْمَآءُ ٱلْحُسْنَىٰ فَٱدْعُوهُ بِهَا ﴾ [الأعراف: 180]</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-arabic-heading">
          موسوعة أسماء الله الحسنى ومعانيها وتأملاتها
        </h1>
        <p className="text-xs sm:text-sm text-rose-100/90 max-w-2xl leading-relaxed">
          تعرف على معاني أسماء الله وجلالها، ومرات تكرارها في التنزيل الحكيم، وصيغ التوسل والدعاء المأثور بها.
        </p>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute right-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="ابحث في أسماء الله الحسنى ومعانيها..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none"
          />
        </div>
        <span className="text-xs text-slate-400 font-semibold">
          عرض {filteredNames.length} اسماً
        </span>
      </div>

      {/* Names Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredNames.map((name) => {
          const isSelected = selectedName.id === name.id;
          return (
            <div
              key={name.id}
              onClick={() => setSelectedName(name)}
              className={`p-4 rounded-2xl text-center cursor-pointer transition-all border space-y-1 ${
                isSelected
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 shadow-md scale-105'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-rose-300'
              }`}
            >
              <span className="text-xs text-slate-400 font-mono block">#{name.id}</span>
              <h3 className="text-xl font-bold font-arabic-heading text-slate-900 dark:text-white">
                {name.nameArabic}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{name.transliteration}</p>
            </div>
          );
        })}
      </div>

      {/* Selected Name Deep Dive Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 flex items-center justify-center font-bold text-2xl font-arabic-heading shadow-md">
              {selectedName.nameArabic}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-arabic-heading">
                اسم الله: {selectedName.nameArabic} ({selectedName.transliteration})
              </h2>
              <span className="text-xs text-slate-500">
                ورد في القرآن الكريم: {selectedName.quranOccurrencesCount} مرة
              </span>
            </div>
          </div>
        </div>

        {/* Meaning & Reflection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <span className="font-bold text-xs text-rose-700 dark:text-rose-400 font-arabic-heading block">
              المعنى والدلالة اللغوية والشرعية:
            </span>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedName.meaning}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <span className="font-bold text-xs text-rose-700 dark:text-rose-400 font-arabic-heading block">
              التأمل الروحي وأثر الاسم على العبد:
            </span>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedName.detailedReflection}
            </p>
          </div>
        </div>

        {/* Quran Sample Ayah */}
        {selectedName.sampleAyah && (
          <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-center space-y-2">
            <span className="text-xs font-bold text-amber-800 dark:text-amber-300 block">
              موضع من كتاب الله العزيز (سورة {selectedName.sampleAyah.surah}):
            </span>
            <p className="text-xl font-quran text-slate-900 dark:text-white leading-loose">
              ﴿ {selectedName.sampleAyah.text} ﴾
            </p>
          </div>
        )}

        {/* Dua Formula */}
        <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-bold text-rose-800 dark:text-rose-300 block">
              صيغة الدعاء والتوسل بالاسم:
            </span>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              « {selectedName.duaFormula} »
            </p>
          </div>

          <button
            onClick={() => handleCopyDua(selectedName)}
            className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 shadow-md flex items-center gap-1.5 shrink-0"
          >
            {copiedNameId === selectedName.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedNameId === selectedName.id ? 'تم النسخ' : 'نسخ الدعاء'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
