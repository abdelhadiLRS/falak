import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  Users,
  BookOpen,
  Award,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { SEERAH_TIMELINE } from '../../data/seerahData';
import { SeerahMilestone } from '../../types';

export const SeerahTimelineModule: React.FC = () => {
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [activeMilestone, setActiveMilestone] = useState<SeerahMilestone>(SEERAH_TIMELINE[0]);

  const filteredMilestones = SEERAH_TIMELINE.filter(
    m => selectedEra === 'all' || m.era === selectedEra
  );

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-800 via-teal-800 to-cyan-950 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-500/30 text-xs font-semibold text-cyan-200">
          <Compass className="w-3.5 h-3.5" />
          <span>السيرة النبوية العطرة على صاحبها أفضل الصلاة والسلام</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-arabic-heading">
          الخط الزمني الشامل للسيرة النبوية وأطلس الغزوات
        </h1>
        <p className="text-xs sm:text-sm text-cyan-100/90 max-w-2xl leading-relaxed">
          محطات فارقة في حياة النبي ﷺ من المولد الشريف في مكة إلى إرساء معالم الدولة بالمدينة وحجة الوداع، مع استخلاص الدروس والربط بالآيات القرآنية.
        </p>
      </div>

      {/* Era Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'all', label: 'كامل السيرة النبوية' },
          { id: 'pre-prophethood', label: 'ما قبل البعثة' },
          { id: 'meccan-era', label: 'العهد المكي (13 سنة)' },
          { id: 'migration', label: 'الهجرة النبوية' },
          { id: 'medinan-era', label: 'العهد المدني وبناء الدولة' },
          { id: 'farewell-hajj', label: 'حجة الوداع والوفاة' }
        ].map((era) => (
          <button
            key={era.id}
            onClick={() => setSelectedEra(era.id)}
            className={`px-4 py-2 rounded-xl font-bold transition-all shrink-0 ${
              selectedEra === era.id
                ? 'bg-cyan-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {era.label}
          </button>
        ))}
      </div>

      {/* Timeline Layout */}
      <div className="relative border-r-2 border-cyan-500/30 mr-4 sm:mr-8 space-y-8 pr-6 sm:pr-10">
        {filteredMilestones.map((m, idx) => (
          <div
            key={m.id}
            onClick={() => setActiveMilestone(m)}
            className="relative group cursor-pointer"
          >
            {/* Timeline Node Point */}
            <div className="absolute -right-[31px] sm:-right-[47px] top-6 w-5 h-5 rounded-full bg-cyan-600 border-4 border-white dark:border-slate-900 group-hover:scale-125 transition-transform shadow-md" />

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 shadow-xs space-y-4 transition-all">
              
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-bold text-xs">
                    {m.yearHijriOrAd}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                    <span>{m.location}</span>
                  </div>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-arabic-heading group-hover:text-cyan-600 transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs text-cyan-700 dark:text-cyan-400 font-semibold mt-0.5">
                  {m.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {m.description}
              </p>

              {/* Key Events List */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">أبرز الأحداث والوقائع:</span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 dark:text-slate-400">
                  {m.keyEvents.map((ev, eIdx) => (
                    <li key={eIdx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lessons & Quran Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                {m.lessons && (
                  <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-1">
                    <span className="font-bold text-amber-800 dark:text-amber-300 block">الدروس والعبر التربوية:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-600 dark:text-slate-400">
                      {m.lessons.map((les, lIdx) => (
                        <li key={lIdx}>{les}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {m.relatedQuranAyah && (
                  <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-1 text-center flex flex-col justify-center">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 block">شاهد من القرآن الكريم:</span>
                    <p className="font-quran text-slate-900 dark:text-white text-sm">
                      {m.relatedQuranAyah}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
