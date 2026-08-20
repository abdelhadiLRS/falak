import React, { useState } from 'react';
import {
  Shield,
  Search,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Layers,
  ChevronDown,
  Info
} from 'lucide-react';
import { FIQH_TOPICS } from '../../data/fiqhData';
import { FiqhTopic } from '../../types';

export const FiqhEncyclopediaModule: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTopic, setActiveTopic] = useState<FiqhTopic>(FIQH_TOPICS[0]);

  const categories = [
    { id: 'all', label: 'جميع الأبواب' },
    { id: 'طهارة', label: 'كتاب الطهارة' },
    { id: 'صلاة', label: 'كتاب الصلاة' },
    { id: 'زكاة', label: 'كتاب الزكاة' },
    { id: 'صيام', label: 'كتاب الصيام' },
  ];

  const filteredTopics = FIQH_TOPICS.filter((t) => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      t.title.includes(searchQuery) ||
      t.question.includes(searchQuery) ||
      t.summaryAnswer.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-semibold text-emerald-200">
          <Shield className="w-3.5 h-3.5" />
          <span>موسوعة الفقه الإسلامي المقارن وأدلة المذاهب</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-arabic-heading">
          موسوعة الفقه المقارن وقرارات المجامع الفقهية
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
          استعراض علمي دقيق للمسائل الفقهية بين المذاهب الأربعة (الأحناف، المالكية، الشافعية، الحنابلة) مع إيراد الأدلة ومصادر التراث المعتمدة.
        </p>
      </div>

      {/* Category Pills & Search */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-2 rounded-xl font-bold transition-colors shrink-0 ${
                selectedCategory === c.id
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="ابحث في المسائل الفقهية..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-3 pr-9 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none"
          />
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-6">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5"
          >
            {/* Header */}
            <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                  باب {topic.category}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-arabic-heading">
                {topic.title}
              </h2>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                السؤال المطروح: {topic.question}
              </p>
              <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
                <span className="font-bold block mb-1">خلاصة الحكم الشرعي:</span>
                {topic.summaryAnswer}
              </div>
            </div>

            {/* 4 Madhabs Comparison Grid */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-slate-500 uppercase font-arabic-heading">
                تفصيل أقوال وأدلة الفقهاء
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topic.madhabOpinions.map((op, oIdx) => (
                  <div
                    key={oIdx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 font-arabic-heading text-sm">
                        المذهب {op.madhab}
                      </span>
                    </div>

                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {op.opinion}
                    </p>

                    {op.proof && (
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-slate-500 space-y-0.5">
                        <span className="font-semibold text-[11px] block">الدليل والتعليل:</span>
                        <p className="italic">{op.proof}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Source References */}
            {topic.primarySources && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-semibold text-slate-500">أمهات المصادر المعتمدة:</span>
                {topic.primarySources.map((src, sIdx) => (
                  <span key={sIdx} className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {src}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
