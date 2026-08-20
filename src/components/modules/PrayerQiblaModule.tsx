import React, { useState } from 'react';
import {
  CalendarDays,
  Compass,
  MapPin,
  Clock,
  Sun,
  Moon,
  ChevronDown,
  Navigation
} from 'lucide-react';
import { MAJOR_CITIES, ISLAMIC_EVENTS, PrayerService } from '../../services/prayerService';

export const PrayerQiblaModule: React.FC = () => {
  const [selectedCityName, setSelectedCityName] = useState('مكة المكرمة');
  const selectedCity = MAJOR_CITIES.find(c => c.name === selectedCityName) || MAJOR_CITIES[0];

  const prayerData = PrayerService.getPrayerTimes(selectedCity.name);
  const qiblaAngle = PrayerService.calculateQiblaAngle(selectedCity.lat, selectedCity.lng);

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-semibold text-emerald-200">
          <Compass className="w-3.5 h-3.5" />
          <span>حساب المواقيت والقبلة والتقويم الهجري</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-arabic-heading">
          مواقيت الصلاة، بوصلة القبلة، والتقويم الهجري
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
          مواقيت دقيقة للصلوات الخمس في كبرى العواصم والمدن الإسلامية، وتحديد دقيق لزاوية اتجاه القبلة نحو الكعبة المشرفة بمكة المكرمة.
        </p>
      </div>

      {/* City Picker Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">المدينة الحالية:</span>
          <select
            value={selectedCityName}
            onChange={(e) => setSelectedCityName(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white outline-none"
          >
            {MAJOR_CITIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} ({c.country})
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          {prayerData.hijriDate.formatted} - {prayerData.gregorianDate}
        </div>
      </div>

      {/* Prayer Times Grid & Qibla Compass */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Prayers Cards (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white font-arabic-heading flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            <span>مواقيت الصلاة اليوم في {selectedCity.name}</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { name: 'الفجر', time: prayerData.fajr, icon: Moon, bg: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300' },
              { name: 'الشروق', time: prayerData.sunrise, icon: Sun, bg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300' },
              { name: 'الظهر', time: prayerData.dhuhr, icon: Sun, bg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300' },
              { name: 'العصر', time: prayerData.asr, icon: Sun, bg: 'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300' },
              { name: 'المغرب', time: prayerData.maghrib, icon: Moon, bg: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300' },
              { name: 'العشاء', time: prayerData.isha, icon: Moon, bg: 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300' },
            ].map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 ${p.bg} space-y-1`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs font-arabic-heading">{p.name}</span>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-2xl font-bold font-mono block">{p.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Qibla Compass Visualizer (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center justify-center text-center space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-slate-900 dark:text-white font-arabic-heading">
              بوصلة اتجاه القبلة الشريفة
            </h3>
            <p className="text-xs text-slate-500">زاوية الانحراف عن الشمال الحقيقي</p>
          </div>

          {/* Compass Dial */}
          <div className="relative w-48 h-48 rounded-full border-4 border-slate-200 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-800/40 shadow-inner">
            <div className="absolute top-2 text-[10px] font-bold text-slate-400">شمال (N)</div>
            <div className="absolute bottom-2 text-[10px] font-bold text-slate-400">جنوب (S)</div>
            <div className="absolute right-2 text-[10px] font-bold text-slate-400">شرق (E)</div>
            <div className="absolute left-2 text-[10px] font-bold text-slate-400">غرب (W)</div>

            {/* Needle */}
            <div
              className="w-1 h-36 bg-gradient-to-t from-transparent via-emerald-500 to-emerald-600 rounded-full transition-transform duration-700 ease-out relative flex justify-center"
              style={{ transform: `rotate(${qiblaAngle}deg)` }}
            >
              <div className="absolute -top-3 text-emerald-600">
                <Navigation className="w-5 h-5 fill-emerald-600" />
              </div>
            </div>

            <div className="w-4 h-4 rounded-full bg-slate-900 dark:bg-white z-10 shadow-md" />
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-xs font-bold text-emerald-800 dark:text-emerald-200">
            زاوية القبلة من {selectedCity.name}: {qiblaAngle}° درجة
          </div>
        </div>
      </div>

      {/* Islamic Events Calendar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white font-arabic-heading flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-emerald-600" />
          <span>أبرز المناسبات والأيام المباركة في التقويم الهجري</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {ISLAMIC_EVENTS.map((ev, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white font-arabic-heading">
                  {ev.name}
                </h4>
                <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                  {ev.hijriDay} {ev.hijriMonth}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {ev.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
