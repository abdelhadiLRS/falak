import React, { useState } from 'react';
import {
  BookCheck,
  Search,
  Copy,
  Check,
  Share2,
  Bookmark,
  Sparkles,
  ShieldCheck,
  Info,
  Filter
} from 'lucide-react';
import { HADITH_COLLECTIONS, HADITHS_LIST } from '../../data/hadithData';
import { HadithItem } from '../../types';

export const HadithModule: React.FC = () => {
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedHadithId, setCopiedHadithId] = useState<number | null>(null);

  const filteredHadiths = HADITHS_LIST.filter((h) => {
    const matchesCollection = selectedCollection === 'all' || h.collection === selectedCollection;
    const matchesSearch =
      !searchQuery ||
      h.textArabic.includes(searchQuery) ||
      h.narrator.includes(searchQuery) ||
      h.explanation.includes(searchQuery) ||
      h.topics.some(t => t.includes(searchQuery));
    return matchesCollection && matchesSearch;
  });

  const handleCopyHadith = (hadith: HadithItem) => {
    const text = `${hadith.textArabic}\n\n[الراوي: ${hadith.narrator} | المصدر: ${hadith.reference} | الدرجة: ${hadith.grade}]`;
    navigator.clipboard.writeText(text);
    setCopiedHadithId(hadith.id);
    setTimeout(() => setCopiedHadithId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-800 via-pink-800 to-rose-950 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-900/60 border border-rose-500/30 text-xs font-semibold text-rose-200">
          <BookCheck className="w-3.5 h-3.5" />
          <span>موسوعة السنة النبوية المطهرة والتخريج العلمي</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-arabic-heading">
          جامع الأحاديث النبوية والشروح والفوائد
        </h1>
        <p className="text-xs sm:text-sm text-rose-100/90 max-w-2xl leading-relaxed">
          تصفح أصح كتب السنة (صحيح البخاري، صحيح مسلم، رياض الصالحين، الأربعون النووية، سنن أبي داود والترمذي) مع بيان درجة الحديث وشروحات الأئمة.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute right-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="ابحث في نص الحديث، الراوي، الموضوع، أو الشرح..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white border-none outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            onClick={() => setSelectedCollection('all')}
            className={`px-3 py-2 rounded-xl font-bold transition-colors shrink-0 ${
              selectedCollection === 'all'
                ? 'bg-rose-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            جميع المصادر ({HADITHS_LIST.length})
          </button>
          {HADITH_COLLECTIONS.map((col) => (
            <button
              key={col.id}
              onClick={() => setSelectedCollection(col.id)}
              className={`px-3 py-2 rounded-xl font-bold transition-colors shrink-0 ${
                selectedCollection === col.id
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {col.name}
            </button>
          ))}
        </div>
      </div>

      {/* Hadith Cards List */}
      <div className="space-y-4">
        {filteredHadiths.map((hadith) => (
          <div
            key={hadith.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-900 shadow-xs space-y-4 transition-all"
          >
            {/* Top Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 font-bold">
                  {hadith.collectionArabic} (حديث {hadith.hadithNumber})
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{hadith.grade}</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyHadith(hadith)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 text-xs"
                >
                  {copiedHadithId === hadith.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedHadithId === hadith.id ? 'تم النسخ' : 'نسخ الحديث'}</span>
                </button>
              </div>
            </div>

            {/* Hadith Chapter & Narrator */}
            <div className="text-xs text-slate-500 space-y-0.5">
              <p className="font-semibold text-slate-700 dark:text-slate-300">{hadith.chapterArabic}</p>
              <p>عن {hadith.narrator}</p>
            </div>

            {/* Matn (Hadith Arabic Text) */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
              <p className="text-lg sm:text-xl font-arabic-heading text-slate-900 dark:text-white leading-loose">
                {hadith.textArabic}
              </p>
            </div>

            {/* English Translation if available */}
            {hadith.textEnglish && (
              <div className="text-xs text-slate-600 dark:text-slate-400 italic font-sans leading-relaxed">
                "{hadith.textEnglish}"
              </div>
            )}

            {/* Explanation & Benefits */}
            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-2 text-xs">
              <span className="font-bold text-amber-900 dark:text-amber-300 block font-arabic-heading">
                الشرح والبيان:
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {hadith.explanation}
              </p>

              {hadith.benefits && (
                <div className="pt-2 border-t border-amber-200/60 dark:border-amber-900/40 space-y-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">الفوائد المستنبطة:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600 dark:text-slate-400">
                    {hadith.benefits.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Reference & Topics Tags */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-slate-400">
              <span>{hadith.reference}</span>
              <div className="flex gap-1.5">
                {hadith.topics.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
