import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  BookOpen,
  BookCheck,
  Compass,
  Shield,
  Sun,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ActiveTab } from '../types';
import { getAllSurahs } from '../data/quranData';
import { HADITHS_LIST } from '../data/hadithData';
import { SEERAH_TIMELINE } from '../data/seerahData';
import { FIQH_TOPICS } from '../data/fiqhData';
import { AZKAR_ITEMS } from '../data/azkarData';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (tab: ActiveTab, payload?: any) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult
}) => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'quran' | 'hadith' | 'fiqh' | 'seerah' | 'azkar'>('all');

  const allSurahs = useMemo(() => getAllSurahs(), []);

  const searchResults = useMemo(() => {
    if (!query || query.trim().length < 2) return [];
    const q = query.trim().toLowerCase();

    const results: {
      type: 'quran' | 'hadith' | 'fiqh' | 'seerah' | 'azkar';
      title: string;
      subtitle: string;
      snippet: string;
      tab: ActiveTab;
      payload?: any;
    }[] = [];

    // Quran search
    if (selectedFilter === 'all' || selectedFilter === 'quran') {
      allSurahs.forEach((s) => {
        if (
          s.name.includes(q) ||
          s.englishName.toLowerCase().includes(q) ||
          s.summary.includes(q) ||
          s.themes.some(t => t.includes(q))
        ) {
          results.push({
            type: 'quran',
            title: `سورة ${s.name} (${s.englishName})`,
            subtitle: `${s.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} - ${s.numberOfAyahs} آية`,
            snippet: s.summary,
            tab: 'quran',
            payload: { surahId: s.id }
          });
        }
      });
    }

    // Hadith search
    if (selectedFilter === 'all' || selectedFilter === 'hadith') {
      HADITHS_LIST.forEach((h) => {
        if (
          h.textArabic.includes(q) ||
          h.chapterArabic.includes(q) ||
          h.explanation.includes(q) ||
          h.topics.some(t => t.includes(q))
        ) {
          results.push({
            type: 'hadith',
            title: `${h.collectionArabic} (حديث ${h.hadithNumber})`,
            subtitle: `راوي الحديث: ${h.narrator} | الدرجة: ${h.grade}`,
            snippet: h.textArabic.slice(0, 140) + '...',
            tab: 'hadith',
            payload: { hadithId: h.id }
          });
        }
      });
    }

    // Fiqh search
    if (selectedFilter === 'all' || selectedFilter === 'fiqh') {
      FIQH_TOPICS.forEach((f) => {
        if (
          f.title.includes(q) ||
          f.question.includes(q) ||
          f.summaryAnswer.includes(q)
        ) {
          results.push({
            type: 'fiqh',
            title: f.title,
            subtitle: `باب ${f.category} - مقارنة المذاهب الأربعة`,
            snippet: f.summaryAnswer,
            tab: 'fiqh',
            payload: { topicId: f.id }
          });
        }
      });
    }

    // Seerah search
    if (selectedFilter === 'all' || selectedFilter === 'seerah') {
      SEERAH_TIMELINE.forEach((s) => {
        if (
          s.title.includes(q) ||
          s.description.includes(q) ||
          s.keyEvents.some(k => k.includes(q))
        ) {
          results.push({
            type: 'seerah',
            title: s.title,
            subtitle: `${s.yearHijriOrAd} - ${s.location}`,
            snippet: s.description.slice(0, 140) + '...',
            tab: 'seerah',
            payload: { milestoneId: s.id }
          });
        }
      });
    }

    // Azkar search
    if (selectedFilter === 'all' || selectedFilter === 'azkar') {
      AZKAR_ITEMS.forEach((a) => {
        if (a.text.includes(q) || a.virtue.includes(q) || a.categoryArabic.includes(q)) {
          results.push({
            type: 'azkar',
            title: a.categoryArabic,
            subtitle: `العدد: ${a.count} مرات | ${a.reference}`,
            snippet: a.text.slice(0, 130) + '...',
            tab: 'azkar',
            payload: { zikrId: a.id }
          });
        }
      });
    }

    return results.slice(0, 20);
  }, [query, selectedFilter, allSurahs]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden max-h-[85vh]">
        
        {/* Search Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <input
            type="text"
            placeholder="ابحث في القرآن، التفاسير، الأحاديث، الفقه، السيرة، والأذكار..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-500 hover:bg-slate-200"
          >
            إغلاق (Esc)
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200/60 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'quran', label: 'القرآن الكريم' },
            { id: 'hadith', label: 'الحديث الشريف' },
            { id: 'fiqh', label: 'الفقه المقارن' },
            { id: 'seerah', label: 'السيرة النبوية' },
            { id: 'azkar', label: 'الأذكار والأدعية' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as any)}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                selectedFilter === tab.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 border border-slate-200 dark:border-slate-700/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1">
          {query.trim().length < 2 ? (
            <div className="py-12 text-center text-slate-400 space-y-3">
              <Sparkles className="w-8 h-8 text-emerald-500 mx-auto opacity-60" />
              <p className="text-sm font-medium">اكتب كلمة أو موضوعاً للبحث الفوري الموحد في فلك</p>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                <span onClick={() => setQuery('الكهف')} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer hover:bg-emerald-50 hover:text-emerald-700">سورة الكهف</span>
                <span onClick={() => setQuery('النية')} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer hover:bg-emerald-50 hover:text-emerald-700">إنما الأعمال بالنيات</span>
                <span onClick={() => setQuery('الوضوء')} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer hover:bg-emerald-50 hover:text-emerald-700">نواقض الوضوء</span>
                <span onClick={() => setQuery('بدر')} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer hover:bg-emerald-50 hover:text-emerald-700">غزوة بدر</span>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              لم يتم العثور على نتائج مطابقة لـ "{query}". جرب البحث بكلمة أو جذر آخر.
            </div>
          ) : (
            searchResults.map((res, idx) => {
              const icons = {
                quran: BookOpen,
                hadith: BookCheck,
                fiqh: Shield,
                seerah: Compass,
                azkar: Sun
              };
              const Icon = icons[res.type];
              return (
                <div
                  key={idx}
                  onClick={() => {
                    onSelectResult(res.tab, res.payload);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-emerald-500 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 cursor-pointer transition-all flex items-start justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 font-arabic-heading">
                        {res.title}
                      </h4>
                      <span className="text-[11px] text-slate-400">
                        {res.subtitle}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {res.snippet}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:-translate-x-1 transition-all shrink-0 mt-2" />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
