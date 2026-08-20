import React, { useState } from 'react';
import {
  FileText,
  Search,
  BookOpen,
  Layers,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Filter
} from 'lucide-react';
import { TAFSIR_ENTRIES, TAFSIR_SCHOLARS } from '../../data/tafsirData';
import { getAllSurahs } from '../../data/quranData';

export const TafsirComparisonModule: React.FC = () => {
  const [selectedSurahId, setSelectedSurahId] = useState<number>(1);
  const [selectedAyahNumber, setSelectedAyahNumber] = useState<number>(1);
  const [scholarA, setScholarA] = useState<string>('ibn-kathir');
  const [scholarB, setScholarB] = useState<string>('saadi');
  const [searchWord, setSearchWord] = useState('');

  const surahs = getAllSurahs();
  const currentSurah = surahs.find(s => s.id === selectedSurahId) || surahs[0];

  const scholarAData = TAFSIR_SCHOLARS.find(s => s.id === scholarA);
  const scholarBData = TAFSIR_SCHOLARS.find(s => s.id === scholarB);

  const tafsirA = TAFSIR_ENTRIES.find(
    t => t.surahNumber === selectedSurahId && t.ayahNumber === selectedAyahNumber && t.scholarId === scholarA
  ) || {
    text: `تفسير ${scholarAData?.nameArabic}: يوضح المعاني الإيمانية والدلائل الشرعية للآية الكريمة، مستنبطاً من سياق الآيات ومأثور الصحابة والتابعين رضي الله عنهم.`,
    themes: ['التدبر', 'الهداية']
  };

  const tafsirB = TAFSIR_ENTRIES.find(
    t => t.surahNumber === selectedSurahId && t.ayahNumber === selectedAyahNumber && t.scholarId === scholarB
  ) || {
    text: `تفسير ${scholarBData?.nameArabic}: يركز على تيسير المعنى واستخلاص الفوائد التربوية والعقدية المستفادة من النظم القرآني البديع.`,
    themes: ['التزكية', 'الفوائد']
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-800 via-indigo-800 to-blue-950 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-500/30 text-xs font-semibold text-blue-200">
          <Layers className="w-3.5 h-3.5" />
          <span>مقارنة مناهج المفسرين ومدارس التأويل</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-arabic-heading">
          موسوعة التفاسير المقارنة وأسباب النزول
        </h1>
        <p className="text-xs sm:text-sm text-blue-100/90 max-w-2xl leading-relaxed">
          قارن بين تفسير المأثور (ابن كثير، الطبري)، وتفسير المعاني والفوائد (السعدي، التفسير الميسر)، والأحكام الفقهية (القرطبي) جنباً إلى جنب في شاشة واحدة.
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        
        {/* Surah Picker */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">السورة:</span>
          <select
            value={selectedSurahId}
            onChange={(e) => {
              setSelectedSurahId(Number(e.target.value));
              setSelectedAyahNumber(1);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white outline-none"
          >
            {surahs.map((s) => (
              <option key={s.id} value={s.id}>
                {s.id}. سورة {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Ayah Picker */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">رقم الآية:</span>
          <select
            value={selectedAyahNumber}
            onChange={(e) => setSelectedAyahNumber(Number(e.target.value))}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white outline-none"
          >
            {Array.from({ length: currentSurah.numberOfAyahs }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                الآية {num}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Ayah Jump Buttons */}
        <div className="flex items-center gap-1">
          <button
            disabled={selectedAyahNumber <= 1}
            onClick={() => setSelectedAyahNumber(p => p - 1)}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 disabled:opacity-40"
          >
            الآية السابقة
          </button>
          <button
            disabled={selectedAyahNumber >= currentSurah.numberOfAyahs}
            onClick={() => setSelectedAyahNumber(p => p + 1)}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 disabled:opacity-40"
          >
            الآية التالية
          </button>
        </div>
      </div>

      {/* Selected Ayah Banner */}
      <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-slate-900 border border-amber-200/70 dark:border-slate-800 text-center space-y-2">
        <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
          [سورة {currentSurah.name}: الآية {selectedAyahNumber}]
        </span>
        <p className="text-2xl font-quran text-slate-900 dark:text-white leading-loose">
          ﴿ {selectedSurahId === 1 && selectedAyahNumber === 1
            ? 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ'
            : selectedSurahId === 1 && selectedAyahNumber === 2
            ? 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ'
            : selectedSurahId === 1 && selectedAyahNumber === 5
            ? 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ'
            : selectedSurahId === 112
            ? 'قُلْ هُوَ اللَّهُ أَحَدٌ'
            : `الآية رقم ${selectedAyahNumber} من سورة ${currentSurah.name}`} ﴾
        </p>
      </div>

      {/* Side-by-Side Comparison Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Scholar A Column */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <select
                  value={scholarA}
                  onChange={(e) => setScholarA(e.target.value)}
                  className="font-bold text-sm bg-transparent border-none text-slate-900 dark:text-white outline-none cursor-pointer"
                >
                  {TAFSIR_SCHOLARS.map(s => (
                    <option key={s.id} value={s.id}>{s.nameArabic} ({s.era})</option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400">{scholarAData?.methodology}</p>
              </div>
            </div>
          </div>

          <div className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-3 font-sans">
            <p>{tafsirA.text}</p>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
            {tafsirA.themes?.map((t, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[11px]">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Scholar B Column */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <div>
                <select
                  value={scholarB}
                  onChange={(e) => setScholarB(e.target.value)}
                  className="font-bold text-sm bg-transparent border-none text-slate-900 dark:text-white outline-none cursor-pointer"
                >
                  {TAFSIR_SCHOLARS.map(s => (
                    <option key={s.id} value={s.id}>{s.nameArabic} ({s.era})</option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400">{scholarBData?.methodology}</p>
              </div>
            </div>
          </div>

          <div className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-3 font-sans">
            <p>{tafsirB.text}</p>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
            {tafsirB.themes?.map((t, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px]">
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
