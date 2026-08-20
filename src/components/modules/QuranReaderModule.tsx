import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Search,
  ChevronDown,
  Volume2,
  Bookmark,
  BookmarkCheck,
  Share2,
  Copy,
  Check,
  FileText,
  Sliders,
  Type,
  Maximize2,
  Minimize2,
  Sparkles,
  Info,
  Layers,
  ArrowRight,
  ArrowLeft,
  X,
  Play,
  RotateCcw
} from 'lucide-react';
import { Ayah, SurahMeta } from '../../types';
import { QuranService } from '../../services/quranService';
import { StorageService, UserSettings } from '../../services/storageService';
import { TAFSIR_ENTRIES, TAFSIR_SCHOLARS } from '../../data/tafsirData';

interface QuranReaderModuleProps {
  activeSurahId: number;
  onSelectSurah: (id: number) => void;
  surahs: SurahMeta[];
  userSettings: UserSettings;
  updateSettings: (settings: Partial<UserSettings>) => void;
  onPlayAyahAudio?: (surahId: number, ayahNumber: number) => void;
}

export const QuranReaderModule: React.FC<QuranReaderModuleProps> = ({
  activeSurahId,
  onSelectSurah,
  surahs,
  userSettings,
  updateSettings,
  onPlayAyahAudio
}) => {
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [readingMode, setReadingMode] = useState<'standard' | 'mushaf' | 'wordByWord' | 'tajweed'>('standard');
  const [activeAyahForTafsir, setActiveAyahForTafsir] = useState<Ayah | null>(null);
  const [activeTafsirScholar, setActiveTafsirScholar] = useState<string>('ibn-kathir');
  const [surahSearchQuery, setSurahSearchQuery] = useState('');
  const [isSurahDropdownOpen, setIsSurahDropdownOpen] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [copiedAyahId, setCopiedAyahId] = useState<number | null>(null);
  const [bookmarkedAyahNumbers, setBookmarkedAyahNumbers] = useState<number[]>([]);
  const [selectedWord, setSelectedWord] = useState<{ arabic: string; transliteration: string; translation: string } | null>(null);

  const currentSurah = surahs.find(s => s.id === activeSurahId) || surahs[0];

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    QuranService.getSurahAyahs(activeSurahId).then((data) => {
      if (isMounted) {
        setAyahs(data);
        setLoading(false);
      }
    });

    // Update last read position in persistent storage
    StorageService.saveLastReadingPosition(activeSurahId, 1, currentSurah?.pageStart || 1);

    // Refresh bookmarks state for current surah
    const bms = StorageService.getBookmarks()
      .filter(b => b.surahId === activeSurahId)
      .map(b => b.ayahNumber);
    setBookmarkedAyahNumbers(bms);

    return () => {
      isMounted = false;
    };
  }, [activeSurahId]);

  const toggleBookmark = (ayahNumber: number) => {
    const isBookmarked = bookmarkedAyahNumbers.includes(ayahNumber);
    if (isBookmarked) {
      const bm = StorageService.getBookmarks().find(b => b.surahId === activeSurahId && b.ayahNumber === ayahNumber);
      if (bm) StorageService.removeBookmark(bm.id);
      setBookmarkedAyahNumbers(prev => prev.filter(n => n !== ayahNumber));
    } else {
      StorageService.saveBookmark({
        id: `bm-${activeSurahId}-${ayahNumber}-${Date.now()}`,
        surahId: activeSurahId,
        surahName: currentSurah.name,
        ayahNumber,
        page: currentSurah.pageStart,
        createdDate: new Date().toISOString().split('T')[0],
        note: `حفظ مرجعي من سورة ${currentSurah.name}`
      });
      setBookmarkedAyahNumbers(prev => [...prev, ayahNumber]);
    }
  };

  const handleCopyAyah = (ayah: Ayah) => {
    const textToCopy = `﴿ ${ayah.textUthmani} ﴾ [سورة ${currentSurah.name}: ${ayah.numberInSurah}]`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAyahId(ayah.id);
    setTimeout(() => setCopiedAyahId(null), 2000);
  };

  const filteredSurahs = surahs.filter(s =>
    s.name.includes(surahSearchQuery) ||
    s.id.toString() === surahSearchQuery ||
    s.englishName.toLowerCase().includes(surahSearchQuery.toLowerCase())
  );

  // Helper for Tajweed coloring rules
  const renderTajweedText = (text: string) => {
    // Replace common Tajweed rule indicators with styled classes
    const parts = text.split(/([نْ|مْ|ّ|ـٰ|ۧ|ۘ|ۚ|ۖ|ۗ])/g);
    return parts.map((part, idx) => {
      if (part === 'نْ' || part === 'مْ') {
        return <span key={idx} className="text-amber-600 dark:text-amber-400 font-bold">{part}</span>;
      }
      if (part === 'ّ') {
        return <span key={idx} className="text-purple-600 dark:text-purple-400">{part}</span>;
      }
      if (part === 'ـٰ' || part === 'ۧ') {
        return <span key={idx} className="text-teal-600 dark:text-teal-400">{part}</span>;
      }
      return <span key={idx}>{part}</span>;
    });
  };

  const activeTafsirContent = TAFSIR_ENTRIES.find(
    t => t.surahNumber === activeSurahId &&
         (activeAyahForTafsir ? t.ayahNumber === activeAyahForTafsir.numberInSurah : true) &&
         t.scholarId === activeTafsirScholar
  ) || {
    text: `تفسير الآية الكريمة من سورة ${currentSurah.name}: تتناول الآيات بيان هدايات القرآن الكريم ودعوة العباد إلى عبادة الله وحده واستشعار عظمته وتدبر معاني كلامه الحكيم.`,
    themes: ['الهداية', 'التوحيد', 'الاستقامة']
  };

  return (
    <div className="space-y-6 pb-24">
      
      {/* Top Quran Navigation & Toolbar */}
      <div className="sticky top-16 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3">
        
        {/* Surah Dropdown Picker */}
        <div className="relative">
          <button
            onClick={() => setIsSurahDropdownOpen(!isSurahDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200 font-bold text-sm hover:bg-emerald-100 transition-all font-arabic-heading"
          >
            <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-xs flex items-center justify-center font-mono">
              {currentSurah.id}
            </span>
            <span>سورة {currentSurah.name}</span>
            <ChevronDown className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          </button>

          {/* Dropdown Menu */}
          {isSurahDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-72 max-h-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden flex flex-col animate-fade-in">
              <div className="p-3 border-b border-slate-200 dark:border-slate-800">
                <div className="relative">
                  <Search className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="ابحث باسم السورة أو رقمها..."
                    value={surahSearchQuery}
                    onChange={(e) => setSurahSearchQuery(e.target.value)}
                    className="w-full pl-3 pr-9 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white border-none outline-none"
                    autoFocus
                  />
                </div>
              </div>

              <div className="overflow-y-auto p-2 space-y-1 flex-1">
                {filteredSurahs.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      onSelectSurah(s.id);
                      setIsSurahDropdownOpen(false);
                    }}
                    className={`p-2.5 rounded-xl flex items-center justify-between cursor-pointer text-xs transition-colors ${
                      s.id === activeSurahId
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-md text-[10px] flex items-center justify-center font-mono ${
                        s.id === activeSurahId ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700'
                      }`}>
                        {s.id}
                      </span>
                      <span className="font-bold font-arabic-heading">{s.name}</span>
                    </div>
                    <span className="opacity-70 text-[11px]">{s.numberOfAyahs} آية</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reading Modes Selector */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs">
          {[
            { id: 'standard', label: 'الآيات المتتابعة' },
            { id: 'mushaf', label: 'صفحة المصحف' },
            { id: 'wordByWord', label: 'كلمة بكلمة' },
            { id: 'tajweed', label: 'التجويد الملون' }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setReadingMode(mode.id as any)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                readingMode === mode.id
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Quick Toolbar (Font Size, Prev/Next Surah) */}
        <div className="flex items-center gap-2">
          {/* Previous Surah */}
          <button
            disabled={activeSurahId <= 1}
            onClick={() => onSelectSurah(activeSurahId - 1)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
            title="السورة السابقة"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Next Surah */}
          <button
            disabled={activeSurahId >= 114}
            onClick={() => onSelectSurah(activeSurahId + 1)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
            title="السورة التالية"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Typography Settings Drawer Button */}
          <button
            onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            title="إعدادات الخط والرسم"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Typography Customization Drawer */}
      {showSettingsDrawer && (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
            <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-emerald-600" />
              <span>تخصيص العرض والخط القرآني</span>
            </h4>
            <button
              onClick={() => setShowSettingsDrawer(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Font Size */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>حجم خط القرآن</span>
                <span className="font-mono">{userSettings.quranFontSize}px</span>
              </div>
              <input
                type="range"
                min={20}
                max={44}
                step={2}
                value={userSettings.quranFontSize}
                onChange={(e) => updateSettings({ quranFontSize: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Font Family */}
            <div className="space-y-1.5">
              <span className="text-xs text-slate-600 dark:text-slate-400 block">نوع الخط</span>
              <div className="flex gap-2">
                {[
                  { id: 'font-quran', label: 'الخط العثماني (أميري)' },
                  { id: 'font-scheherazade', label: 'خط شهرزاد' },
                  { id: 'font-arabic-heading', label: 'خط تجوال' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => updateSettings({ quranFontFamily: f.id })}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border transition-colors ${
                      userSettings.quranFontFamily === f.id
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Surah Header Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white text-center shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-islamic-pattern opacity-10" />
        <div className="relative z-10 space-y-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-200">
            {currentSurah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} • {currentSurah.numberOfAyahs} آية • الجزء {currentSurah.juzStart}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-arabic-heading tracking-wide">
            سورة {currentSurah.name}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed opacity-90">
            {currentSurah.summary}
          </p>

          {/* Basmalah (unless Surah At-Tawbah 9 or Al-Fatihah 1 which has it as verse 1) */}
          {activeSurahId !== 9 && activeSurahId !== 1 && (
            <div className="pt-4">
              <p className="text-2xl sm:text-3xl font-quran text-amber-200 tracking-wider">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Verses Render Area */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-slate-500">جاري تحميل آيات سورة {currentSurah.name}...</p>
        </div>
      ) : readingMode === 'mushaf' ? (
        
        /* Mushaf Page Continuous Flow Mode */
        <div className="p-8 sm:p-12 rounded-3xl bg-amber-50/40 dark:bg-slate-900 border border-amber-200/60 dark:border-slate-800 shadow-sm leading-loose text-justify font-quran">
          <div className="max-w-3xl mx-auto text-slate-900 dark:text-slate-100 leading-[3rem]" style={{ fontSize: `${userSettings.quranFontSize}px` }}>
            {ayahs.map((ayah) => (
              <span key={ayah.id} className="inline relative group cursor-pointer hover:text-emerald-700 dark:hover:text-emerald-300">
                <span>{ayah.textUthmani} </span>
                <span 
                  onClick={() => setActiveAyahForTafsir(ayah)}
                  className="inline-flex items-center justify-center w-8 h-8 mx-1.5 rounded-full border border-emerald-600/40 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold align-middle hover:scale-110 transition-transform"
                  title={`آية ${ayah.numberInSurah} - انقر للتفسير`}
                >
                  {ayah.numberInSurah}
                </span>
              </span>
            ))}
          </div>
        </div>

      ) : (

        /* Standard & Word-by-Word & Tajweed List Mode */
        <div className="space-y-4">
          {ayahs.map((ayah) => {
            const isBookmarked = bookmarkedAyahNumbers.includes(ayah.numberInSurah);
            return (
              <div
                key={ayah.id}
                id={`ayah-${ayah.numberInSurah}`}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-all shadow-xs space-y-4 group"
              >
                {/* Ayah Top Meta & Actions Bar */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center font-mono">
                      {ayah.numberInSurah}
                    </span>
                    <span>سورة {currentSurah.name} : آية {ayah.numberInSurah}</span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span>جزء {ayah.juz} • صفحة {ayah.page}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    {/* Play Ayah Audio */}
                    <button
                      onClick={() => onPlayAyahAudio?.(activeSurahId, ayah.numberInSurah)}
                      className="p-2 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 transition-colors"
                      title="استماع لتلاوة هذه الآية"
                    >
                      <Play className="w-4 h-4 fill-current" />
                    </button>

                    {/* Bookmark */}
                    <button
                      onClick={() => toggleBookmark(ayah.numberInSurah)}
                      className={`p-2 rounded-lg transition-colors ${
                        isBookmarked
                          ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/60'
                          : 'text-slate-500 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                      title={isBookmarked ? 'إزالة من العلامات المرجعية' : 'إضافة إلى العلامات المرجعية'}
                    >
                      {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-amber-500" /> : <Bookmark className="w-4 h-4" />}
                    </button>

                    {/* Copy */}
                    <button
                      onClick={() => handleCopyAyah(ayah)}
                      className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="نسخ الآية"
                    >
                      {copiedAyahId === ayah.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>

                    {/* View Tafsir */}
                    <button
                      onClick={() => setActiveAyahForTafsir(ayah)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold text-xs border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>التفسير</span>
                    </button>
                  </div>
                </div>

                {/* Ayah Text Display */}
                {readingMode === 'wordByWord' ? (
                  <div className="flex flex-wrap gap-3 items-center justify-start py-2">
                    {ayah.words.map((w, wIdx) => (
                      <div
                        key={wIdx}
                        onClick={() => setSelectedWord(w)}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 hover:border-emerald-500 hover:bg-emerald-50/50 cursor-pointer transition-all text-center space-y-1"
                      >
                        <span className="text-xl font-quran text-slate-900 dark:text-white block font-bold">
                          {w.arabic}
                        </span>
                        {w.transliteration && (
                          <span className="text-[10px] text-slate-500 block font-mono">
                            {w.transliteration}
                          </span>
                        )}
                        {w.translation && (
                          <span className="text-[11px] text-emerald-700 dark:text-emerald-300 block font-medium">
                            {w.translation}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-2">
                    <p
                      className={`leading-relaxed text-slate-900 dark:text-slate-100 ${userSettings.quranFontFamily}`}
                      style={{ fontSize: `${userSettings.quranFontSize}px` }}
                    >
                      {readingMode === 'tajweed' ? renderTajweedText(ayah.textUthmani) : ayah.textUthmani}
                    </p>
                  </div>
                )}

                {/* English / Urdu Translation if available */}
                {ayah.translationEn && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                    <span className="font-semibold text-slate-500 block mb-0.5">Sahih International:</span>
                    <p>{ayah.translationEn}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tafsir Side-Drawer / Modal */}
      {activeAyahForTafsir && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            
            {/* Tafsir Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white font-arabic-heading">
                  تفسير الآية ({activeAyahForTafsir.numberInSurah}) من سورة {currentSurah.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveAyahForTafsir(null)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Ayah Snippet */}
            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/30 border-b border-emerald-100 dark:border-emerald-900/40 text-center">
              <p className="text-xl font-quran text-slate-900 dark:text-white leading-loose">
                ﴿ {activeAyahForTafsir.textUthmani} ﴾
              </p>
            </div>

            {/* Scholar Selector Tabs */}
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200/60 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs">
              {TAFSIR_SCHOLARS.map((scholar) => (
                <button
                  key={scholar.id}
                  onClick={() => setActiveTafsirScholar(scholar.id)}
                  className={`px-3 py-1 rounded-lg font-medium transition-all shrink-0 ${
                    activeTafsirScholar === scholar.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {scholar.nameArabic}
                </button>
              ))}
            </div>

            {/* Tafsir Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-3 font-sans">
                <p>{activeTafsirContent.text}</p>
              </div>

              {activeTafsirContent.themes && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
                  <span className="text-xs font-bold text-slate-500">الموضوعات الرئيسية:</span>
                  {activeTafsirContent.themes.map((theme, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs">
                      {theme}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
