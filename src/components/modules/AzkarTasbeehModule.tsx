import React, { useState } from 'react';
import {
  Sun,
  Moon,
  RotateCcw,
  Sparkles,
  Check,
  Flame,
  Volume2,
  Copy,
  Plus
} from 'lucide-react';
import { AZKAR_CATEGORIES, AZKAR_ITEMS } from '../../data/azkarData';
import { StorageService } from '../../services/storageService';

export const AzkarTasbeehModule: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('morning');
  const [activeTab, setActiveTab] = useState<'hisn' | 'tasbeeh'>('hisn');
  const [zikrCounts, setZikrCounts] = useState<Record<string, number>>({});
  const [tasbeehCount, setTasbeehCount] = useState<number>(0);
  const [tasbeehTotal, setTasbeehTotal] = useState<number>(() => StorageService.getTasbeehCounts().total || 0);
  const [tasbeehTarget, setTasbeehTarget] = useState<number>(33);

  const filteredAzkar = AZKAR_ITEMS.filter(a => a.category === selectedCategory);

  const handleDecrementZikr = (id: string, maxCount: number) => {
    const current = zikrCounts[id] ?? maxCount;
    if (current > 0) {
      const next = current - 1;
      setZikrCounts(prev => ({ ...prev, [id]: next }));
    }
  };

  const handleIncrementTasbeeh = () => {
    const nextCount = tasbeehCount + 1;
    const nextTotal = tasbeehTotal + 1;
    setTasbeehCount(nextCount);
    setTasbeehTotal(nextTotal);
    StorageService.saveTasbeehCount(nextTotal, nextCount);
  };

  const resetTasbeeh = () => {
    setTasbeehCount(0);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-700 via-yellow-700 to-amber-900 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-500/30 text-xs font-semibold text-amber-200">
          <Sun className="w-3.5 h-3.5" />
          <span>أذكار اليوم والليلة والمسبحة الذكية</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-arabic-heading">
          حصن المسلم والأذكار والمسبحة الإلكترونية
        </h1>
        <p className="text-xs sm:text-sm text-amber-100/90 max-w-2xl leading-relaxed">
          أذكار الصباح والمساء وأدعية القرآن الكريم مع عدادات تفاعلية ذكية ومسبحة إلكترونية لحفظ ورد التسبيح والاستغفار.
        </p>
      </div>

      {/* Main Switcher: Hisn al-Muslim vs Smart Tasbeeh */}
      <div className="flex items-center justify-center">
        <div className="p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex gap-2">
          <button
            onClick={() => setActiveTab('hisn')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'hisn'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            حصن المسلم والأذكار المأثورة
          </button>
          <button
            onClick={() => setActiveTab('tasbeeh')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'tasbeeh'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            المسبحة الرقمية الذكية
          </button>
        </div>
      </div>

      {activeTab === 'hisn' ? (
        <div className="space-y-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {AZKAR_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl font-bold transition-all shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Azkar List */}
          <div className="space-y-4">
            {filteredAzkar.map((zikr) => {
              const remaining = zikrCounts[zikr.id] ?? zikr.count;
              const isCompleted = remaining === 0;
              return (
                <div
                  key={zikr.id}
                  className={`p-6 rounded-3xl border transition-all shadow-xs space-y-4 ${
                    isCompleted
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 text-xs text-slate-500">
                    <span className="font-semibold text-amber-700 dark:text-amber-400">
                      {zikr.categoryArabic}
                    </span>
                    <span>{zikr.reference}</span>
                  </div>

                  <p className="text-lg sm:text-xl font-arabic-heading text-slate-900 dark:text-white leading-loose text-center py-2">
                    {zikr.text}
                  </p>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    <span className="font-bold text-slate-700 dark:text-slate-200 block font-arabic-heading">
                      الفضل والبركة:
                    </span>
                    <p className="leading-relaxed">{zikr.virtue}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => handleDecrementZikr(zikr.id, zikr.count)}
                      disabled={isCompleted}
                      className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 shadow-md ${
                        isCompleted
                          ? 'bg-emerald-600 text-white cursor-default'
                          : 'bg-amber-600 text-white hover:bg-amber-700 active:scale-95'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <Check className="w-5 h-5" />
                          <span>تم الذكر بحمد الله</span>
                        </>
                      ) : (
                        <>
                          <span>كرر ({remaining} متبقي)</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setZikrCounts(prev => ({ ...prev, [zikr.id]: zikr.count }))}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700"
                      title="إعادة ضبط العداد"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        
        /* Smart Digital Tasbeeh Screen */
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-6">
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white font-arabic-heading">
              المسبحة الإلكترونية الذكية
            </h3>
            <p className="text-xs text-slate-500">اختر الورد واضغط على الدائرة للتسبيح</p>
          </div>

          {/* Quick Dhikr Formula Selector */}
          <div className="flex flex-wrap justify-center gap-1.5 text-xs">
            {['سُبْحَانَ اللَّهِ', 'الْحَمْدُ لِلَّهِ', 'اللَّهُ أَكْبَرُ', 'أَسْتَغْفِرُ اللَّهَ', 'لا حَوْلَ وَلا قُوَّةَ إِلا بِاللَّهِ'].map((dh, idx) => (
              <span key={idx} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                {dh}
              </span>
            ))}
          </div>

          {/* Giant Counter Circle Button */}
          <div className="py-6">
            <button
              onClick={handleIncrementTasbeeh}
              className="w-48 h-48 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-500 text-white flex flex-col items-center justify-center mx-auto shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border-8 border-amber-100 dark:border-amber-950"
            >
              <span className="text-5xl font-extrabold font-mono tracking-tight">{tasbeehCount}</span>
              <span className="text-xs font-semibold text-amber-100 mt-1">تسبيحة</span>
            </button>
          </div>

          {/* Stats & Reset */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl text-xs text-slate-600 dark:text-slate-300">
            <div>
              <span className="text-slate-400 block text-[10px]">مجموع التسبيح الكلي</span>
              <span className="font-bold font-mono text-sm">{tasbeehTotal}</span>
            </div>
            <button
              onClick={resetTasbeeh}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 font-semibold hover:bg-slate-300 text-slate-700 dark:text-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>تصفير الدورة</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
