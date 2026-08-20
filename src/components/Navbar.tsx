import React, { useState, useEffect } from 'react';
import {
  Menu,
  Compass,
  Search,
  Moon,
  Sun,
  BookOpen,
  Volume2,
  Clock,
  Sparkles,
  Layers,
  Globe,
  Bell,
  CheckCircle2
} from 'lucide-react';
import { ActiveTab } from '../types';
import { PrayerService } from '../services/prayerService';
import { StorageService, UserSettings, DEFAULT_SETTINGS } from '../services/storageService';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  openSearch: () => void;
  userSettings?: UserSettings;
  updateSettings?: (settings: Partial<UserSettings>) => void;
  isPlayingAudio?: boolean;
  activeSurahName?: string;
  activeAyahNumber?: number;
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openSearch,
  userSettings,
  updateSettings,
  isPlayingAudio = false,
  activeSurahName,
  activeAyahNumber,
  onToggleSidebar
}) => {
  const currentSettings = userSettings || StorageService.getSettings() || DEFAULT_SETTINGS;
  const [prayerData, setPrayerData] = useState(() => PrayerService.getPrayerTimes());
  const [nextPrayer, setNextPrayer] = useState(() => PrayerService.getNextPrayer(PrayerService.getPrayerTimes()));

  useEffect(() => {
    const timer = setInterval(() => {
      const p = PrayerService.getPrayerTimes();
      setPrayerData(p);
      setNextPrayer(PrayerService.getNextPrayer(p));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    const currentTheme = currentSettings.theme || 'light';
    const next = currentTheme === 'dark' ? 'light' : currentTheme === 'light' ? 'paper' : 'dark';
    if (updateSettings) {
      updateSettings({ theme: next });
    } else {
      StorageService.saveSettings({ theme: next });
    }
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-2 -mr-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden transition-colors"
              title="القائمة"
              id="mobile-menu-toggle-btn"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="brand-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <span className="font-bold text-xl tracking-wider font-arabic-heading">ف</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight font-arabic-heading">
                  فَـلَـك
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800/60">
                  FALAK
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                المنظومة الإسلامية العالمية لعلوم القرآن
              </p>
            </div>
          </div>
        </div>

        {/* Center: Live Hijri Date & Next Prayer Pill */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/90 text-xs text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/60">
            <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-medium">{prayerData.hijriDate.formatted}</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
              الصلاة القادمة: {nextPrayer.name} ({nextPrayer.time})
            </span>
          </div>

          {isPlayingAudio && activeSurahName && (
            <div 
              onClick={() => setActiveTab('quran')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 cursor-pointer animate-pulse"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>يتلو الآن: سورة {activeSurahName} (آية {activeAyahNumber || 1})</span>
            </div>
          )}
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2">
          {/* Omni Search Button */}
          <button
            onClick={openSearch}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm transition-all border border-slate-200/60 dark:border-slate-700/60"
            title="بحث شامل (Ctrl + K)"
            id="nav-search-button"
          >
            <Search className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">بحث في المنصة...</span>
            <kbd className="hidden md:inline-block text-[10px] bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* AI Assistant Quick Pill */}
          <button
            onClick={() => setActiveTab('ai-assistant')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              activeTab === 'ai-assistant'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100'
            }`}
            id="nav-ai-button"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>مساعد فلك</span>
          </button>

          {/* Theme Toggle (Light / Dark / Paper) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="تغيير المظهر (فاتح / داكن / ورقي)"
            id="theme-toggle-button"
          >
            {currentSettings.theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : currentSettings.theme === 'paper' ? (
              <Layers className="w-4 h-4 text-amber-700" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
