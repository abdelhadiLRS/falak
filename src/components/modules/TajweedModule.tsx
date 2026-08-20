import React, { useState } from 'react';
import {
  Volume2,
  BookOpen,
  Award,
  Sparkles,
  Play,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Check,
  ChevronLeft
} from 'lucide-react';
import { TAJWEED_RULES, TAJWEED_CATEGORIES, TajweedRuleData } from '../../data/tajweedRules';

export const TajweedModule: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('noon-sakinah');
  const [selectedRule, setSelectedRule] = useState<TajweedRuleData>(TAJWEED_RULES[0]);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);

  const filteredRules = TAJWEED_RULES.filter(r => r.category === selectedCategory);

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-700 via-orange-700 to-amber-900 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-500/30 text-xs font-semibold text-amber-200">
          <Volume2 className="w-3.5 h-3.5" />
          <span>أكاديمية الإتقان الصوتي والتلاوة المتقنة</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-arabic-heading">
          أكاديمية علم التجويد ومخارج الحروف
        </h1>
        <p className="text-xs sm:text-sm text-amber-100/90 max-w-2xl leading-relaxed">
          تعلم أصول وأحكام التلاوة برواية حفص عن عاصم، مدعمة بالشواهد من متن تحفة الأطفال والجزرية، والأمثلة القرآنية التطبيقية الملونة.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {TAJWEED_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              const firstRule = TAJWEED_RULES.find(r => r.category === cat.id);
              if (firstRule) setSelectedRule(firstRule);
            }}
            className={`px-4 py-2 rounded-xl font-bold transition-all shrink-0 ${
              selectedCategory === cat.id
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Rules Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="font-bold text-xs text-slate-500 uppercase px-2 font-arabic-heading">
            أحكام القسم المختار
          </h3>
          <div className="space-y-1.5">
            {filteredRules.map((rule) => {
              const isSelected = selectedRule.id === rule.id;
              return (
                <div
                  key={rule.id}
                  onClick={() => setSelectedRule(rule)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border flex items-center justify-between group ${
                    isSelected
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-900 dark:text-amber-200 shadow-xs font-semibold'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: rule.colorCode }}
                    />
                    <div>
                      <h4 className="font-bold text-sm font-arabic-heading">{rule.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">حروف الحكم: {rule.letters.join('، ')}</p>
                    </div>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Rule Deep-Dive & Interactive Examples (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          
          {/* Rule Title & Definition */}
          <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div className="flex items-center justify-between">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs"
                style={{ backgroundColor: selectedRule.colorCode }}
              >
                {selectedRule.categoryArabic}
              </span>
              <span className="text-xs text-slate-400 font-mono">اللون المعتمد في المصحف</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-arabic-heading">
              {selectedRule.name}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedRule.definition}
            </p>
          </div>

          {/* Letters & How to execute */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300">حروف الحكم:</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedRule.letters.map((l, idx) => (
                  <span
                    key={idx}
                    className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-sm text-slate-900 dark:text-white shadow-2xs font-quran"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300">طريقة النطق الصحيح:</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedRule.howToApply}
              </p>
            </div>
          </div>

          {/* Classical Poetic Evidence (الشاهد الشعري) */}
          {selectedRule.poeticEvidence && (
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-center space-y-1.5">
              <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400 block">
                الشاهد من متن تحفة الأطفال / الجزرية:
              </span>
              <p className="text-base font-quran text-amber-900 dark:text-amber-200 font-bold leading-relaxed">
                « {selectedRule.poeticEvidence} »
              </p>
            </div>
          )}

          {/* Interactive Examples */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white font-arabic-heading flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>أمثلة تطبيقية من القرآن الكريم</span>
            </h4>

            <div className="space-y-2.5">
              {selectedRule.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <p className="text-lg font-quran text-slate-900 dark:text-white">
                      ﴿ {ex.ayahText} ﴾
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        {ex.surah}
                      </span>
                      <span>•</span>
                      <span>موضع التطبيق: {ex.highlightWord}</span>
                    </div>
                  </div>

                  <div className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {ex.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
