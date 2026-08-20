import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { QuickSearchModal } from './components/QuickSearchModal';

// Modules
import { HomeModule } from './components/modules/HomeModule';
import { QuranReaderModule } from './components/modules/QuranReaderModule';
import { TafsirComparisonModule } from './components/modules/TafsirComparisonModule';
import { TajweedModule } from './components/modules/TajweedModule';
import { MemorizationModule } from './components/modules/MemorizationModule';
import { HadithModule } from './components/modules/HadithModule';
import { SeerahTimelineModule } from './components/modules/SeerahTimelineModule';
import { FiqhEncyclopediaModule } from './components/modules/FiqhEncyclopediaModule';
import { AzkarTasbeehModule } from './components/modules/AzkarTasbeehModule';
import { DivineNamesModule } from './components/modules/DivineNamesModule';
import { AiAssistantModule } from './components/modules/AiAssistantModule';
import { StudentWorkspaceModule } from './components/modules/StudentWorkspaceModule';
import { PrayerQiblaModule } from './components/modules/PrayerQiblaModule';
import { CommunityHalaqasModule } from './components/modules/CommunityHalaqasModule';
import { DevelopersApiModule } from './components/modules/DevelopersApiModule';
import { AdminAnalyticsModule } from './components/modules/AdminAnalyticsModule';

import { getAllSurahs } from './data/quranData';
import { RECITERS_LIST } from './data/recitersData';
import { ActiveTab, SurahMeta } from './types';
import { StorageService, UserSettings, DEFAULT_SETTINGS } from './services/storageService';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  
  // User settings and theme
  const [userSettings, setUserSettings] = useState<UserSettings>(() => {
    const saved = StorageService.getSettings();
    return saved || DEFAULT_SETTINGS;
  });

  const allSurahs: SurahMeta[] = useMemo(() => getAllSurahs(), []);
  const [activeSurahId, setActiveSurahId] = useState<number>(1);
  const [playingAyahNumber, setPlayingAyahNumber] = useState<number>(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const currentSurah = useMemo(() => {
    return allSurahs.find(s => s.id === activeSurahId) || allSurahs[0];
  }, [allSurahs, activeSurahId]);

  // Sync settings helper
  const handleUpdateSettings = (partial: Partial<UserSettings>) => {
    const updated = StorageService.saveSettings(partial);
    setUserSettings(updated);
  };

  // Sync dark mode class
  useEffect(() => {
    if (userSettings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [userSettings.theme]);

  // Global Keyboard Shortcut for Search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectSurah = (surahId: number) => {
    setActiveSurahId(surahId);
    setActiveTab('quran');
  };

  const handlePlayAyah = (surahNum: number, ayahNum: number) => {
    setActiveSurahId(surahNum);
    setPlayingAyahNumber(ayahNum);
    setIsPlayingAudio(true);
  };

  const handleNextAyah = () => {
    if (playingAyahNumber < currentSurah.numberOfAyahs) {
      setPlayingAyahNumber(prev => prev + 1);
    } else if (activeSurahId < 114) {
      setActiveSurahId(prev => prev + 1);
      setPlayingAyahNumber(1);
    }
  };

  const handlePrevAyah = () => {
    if (playingAyahNumber > 1) {
      setPlayingAyahNumber(prev => prev - 1);
    } else if (activeSurahId > 1) {
      const prevSurah = allSurahs.find(s => s.id === activeSurahId - 1);
      setActiveSurahId(prev => prev - 1);
      setPlayingAyahNumber(prevSurah ? prevSurah.numberOfAyahs : 1);
    }
  };

  const handleNextSurah = () => {
    if (activeSurahId < 114) {
      setActiveSurahId(prev => prev + 1);
      setPlayingAyahNumber(1);
    }
  };

  const handlePrevSurah = () => {
    if (activeSurahId > 1) {
      setActiveSurahId(prev => prev - 1);
      setPlayingAyahNumber(1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openSearch={() => setIsSearchOpen(true)}
        userSettings={userSettings}
        updateSettings={handleUpdateSettings}
        isPlayingAudio={isPlayingAudio}
        activeSurahName={currentSurah?.name}
        activeAyahNumber={playingAyahNumber}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Responsive Multi-Module Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setIsSidebarOpen(false);
          }}
          isOpenMobile={isSidebarOpen}
          closeMobile={() => setIsSidebarOpen(false)}
        />

        {/* Dynamic Main Content Container */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full">
          {activeTab === 'home' && (
            <HomeModule
              setActiveTab={setActiveTab}
              onSelectSurah={handleSelectSurah}
              surahs={allSurahs}
            />
          )}

          {activeTab === 'quran' && (
            <QuranReaderModule
              activeSurahId={activeSurahId}
              onSelectSurah={setActiveSurahId}
              surahs={allSurahs}
              userSettings={userSettings}
              updateSettings={handleUpdateSettings}
              onPlayAyahAudio={handlePlayAyah}
            />
          )}

          {activeTab === 'tafsir' && <TafsirComparisonModule />}

          {activeTab === 'tajweed' && <TajweedModule />}

          {activeTab === 'memorization' && <MemorizationModule />}

          {activeTab === 'hadith' && <HadithModule />}

          {activeTab === 'seerah' && <SeerahTimelineModule />}

          {activeTab === 'fiqh' && <FiqhEncyclopediaModule />}

          {activeTab === 'azkar' && <AzkarTasbeehModule />}

          {activeTab === 'divine-names' && <DivineNamesModule />}

          {activeTab === 'ai-assistant' && <AiAssistantModule />}

          {activeTab === 'workspace' && <StudentWorkspaceModule />}

          {activeTab === 'prayer-qibla' && <PrayerQiblaModule />}

          {activeTab === 'community' && <CommunityHalaqasModule />}

          {activeTab === 'developers' && <DevelopersApiModule />}

          {activeTab === 'admin' && <AdminAnalyticsModule />}
        </main>
      </div>

      {/* Floating Global Audio Player Bar */}
      <AudioPlayerBar
        currentSurahId={activeSurahId}
        currentSurahName={currentSurah?.name || 'الفاتحة'}
        currentAyahNumber={playingAyahNumber}
        totalAyahsInSurah={currentSurah?.numberOfAyahs || 7}
        onNextSurah={handleNextSurah}
        onPrevSurah={handlePrevSurah}
        onNextAyah={handleNextAyah}
        onPrevAyah={handlePrevAyah}
        activeReciterId={userSettings.activeReciterId || 'ar.alafasy'}
        onChangeReciter={(reciterId) => handleUpdateSettings({ activeReciterId: reciterId })}
        playbackSpeed={userSettings.audioPlaybackSpeed || 1}
        onChangePlaybackSpeed={(speed) => handleUpdateSettings({ audioPlaybackSpeed: speed })}
      />

      {/* Quick Spotlight Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={(tab, payload) => {
          if (payload?.surahId) {
            setActiveSurahId(payload.surahId);
          }
          setActiveTab(tab);
          setIsSearchOpen(false);
        }}
      />
    </div>
  );
}
