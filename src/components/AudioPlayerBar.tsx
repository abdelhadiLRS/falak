import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Gauge,
  Clock,
  User,
  X,
  Maximize2,
  Minimize2,
  ListMusic
} from 'lucide-react';
import { Reciter } from '../types';
import { RECITERS_LIST, getSurahAudioUrl } from '../data/recitersData';

interface AudioPlayerBarProps {
  currentSurahId: number;
  currentSurahName: string;
  currentAyahNumber?: number;
  totalAyahsInSurah?: number;
  onNextSurah?: () => void;
  onPrevSurah?: () => void;
  onNextAyah?: () => void;
  onPrevAyah?: () => void;
  activeReciterId: string;
  onChangeReciter: (reciterId: string) => void;
  playbackSpeed: number;
  onChangePlaybackSpeed: (speed: number) => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentSurahId,
  currentSurahName,
  currentAyahNumber = 1,
  totalAyahsInSurah = 7,
  onNextSurah,
  onPrevSurah,
  onNextAyah,
  onPrevAyah,
  activeReciterId,
  onChangeReciter,
  playbackSpeed,
  onChangePlaybackSpeed
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'single' | 'continuous'>('continuous');
  const [showRecitersModal, setShowRecitersModal] = useState(false);
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number | null>(null);
  const [sleepTimerRemaining, setSleepTimerRemaining] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const activeReciter = RECITERS_LIST.find(r => r.id === activeReciterId) || RECITERS_LIST[0];
  const audioSourceUrl = getSurahAudioUrl(activeReciter.serverUrl, currentSurahId);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Sleep timer handler
  useEffect(() => {
    if (!sleepTimerMinutes) {
      setSleepTimerRemaining(null);
      return;
    }
    setSleepTimerRemaining(sleepTimerMinutes * 60);
    const interval = setInterval(() => {
      setSleepTimerRemaining((prev) => {
        if (!prev || prev <= 1) {
          if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
          }
          setSleepTimerMinutes(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [sleepTimerMinutes]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const handleEnded = () => {
    if (repeatMode === 'single') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else if (repeatMode === 'continuous' && onNextSurah) {
      onNextSurah();
    } else {
      setIsPlaying(false);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-xl px-4 py-2.5 transition-all">
        <audio
          ref={audioRef}
          src={audioSourceUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onLoadedMetadata={handleTimeUpdate}
        />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-6">
          
          {/* Left Info: Surah & Reciter */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowRecitersModal(true)}
                className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center hover:bg-emerald-200 transition-colors border border-emerald-200 dark:border-emerald-800/60"
                title="تغيير القارئ"
              >
                <User className="w-5 h-5" />
              </button>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white font-arabic-heading">
                  سورة {currentSurahName}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activeReciter.nameArabic}
                </p>
              </div>
            </div>

            {/* Mobile Play Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 shadow-md"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white mr-0.5" />}
              </button>
            </div>
          </div>

          {/* Center: Controls & Timeline */}
          <div className="flex-1 w-full max-w-2xl flex flex-col items-center gap-1.5">
            {/* Buttons Row */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  if (repeatMode === 'off') setRepeatMode('continuous');
                  else if (repeatMode === 'continuous') setRepeatMode('single');
                  else setRepeatMode('off');
                }}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  repeatMode !== 'off'
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title={`وضع التكرار: ${repeatMode === 'single' ? 'تكرار السورة' : repeatMode === 'continuous' ? 'تشغيل متواصل' : 'إيقاف'}`}
              >
                <Repeat className="w-4 h-4" />
                {repeatMode === 'single' && <span className="text-[9px] font-bold">1</span>}
              </button>

              <button
                onClick={onPrevSurah}
                className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="السورة السابقة"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              <button
                onClick={togglePlay}
                className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 hover:scale-105 transition-all shadow-md shadow-emerald-600/30"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white mr-0.5" />}
              </button>

              <button
                onClick={onNextSurah}
                className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="السورة التالية"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              {/* Speed Selector */}
              <div className="relative group">
                <button
                  onClick={() => {
                    const speeds = [0.75, 1, 1.25, 1.5];
                    const idx = speeds.indexOf(playbackSpeed);
                    const next = speeds[(idx + 1) % speeds.length];
                    onChangePlaybackSpeed(next);
                  }}
                  className="px-2 py-1 rounded text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                  title="تغيير سرعة التلاوة"
                >
                  {playbackSpeed}x
                </button>
              </div>
            </div>

            {/* Slider bar */}
            <div className="w-full flex items-center gap-3 text-xs text-slate-500 font-mono">
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right Tools: Sleep Timer & Volume */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Sleep Timer */}
            <button
              onClick={() => {
                const timers = [null, 15, 30, 60];
                const currentIdx = timers.indexOf(sleepTimerMinutes);
                const next = timers[(currentIdx + 1) % timers.length];
                setSleepTimerMinutes(next);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition-colors ${
                sleepTimerMinutes
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300'
                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="مؤقت النوم"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{sleepTimerRemaining ? `${Math.ceil(sleepTimerRemaining / 60)} د` : 'مؤقت'}</span>
            </button>

            {/* Volume */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  setIsMuted(false);
                }}
                className="w-20 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reciters Selection Modal */}
      {showRecitersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full max-h-[80vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white font-arabic-heading">
                  اختيار القارئ المفضل ({RECITERS_LIST.length} قارئ)
                </h3>
              </div>
              <button
                onClick={() => setShowRecitersModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-2">
              {RECITERS_LIST.map((reciter) => {
                const isSelected = reciter.id === activeReciterId;
                return (
                  <div
                    key={reciter.id}
                    onClick={() => {
                      onChangeReciter(reciter.id);
                      setShowRecitersModal(false);
                    }}
                    className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold font-arabic-heading">{reciter.nameArabic}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{reciter.style} - {reciter.nameEnglish}</p>
                    </div>
                    {isSelected && (
                      <span className="text-xs px-2.5 py-1 bg-emerald-600 text-white rounded-lg font-medium">
                        المختار
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
