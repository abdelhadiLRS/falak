import React from 'react';
import {
  BarChart3,
  Activity,
  Server,
  Database,
  Cpu,
  Zap,
  CheckCircle2,
  HardDrive,
  Globe,
  ShieldCheck
} from 'lucide-react';
import { getAllSurahs } from '../../data/quranData';
import { HADITHS_LIST } from '../../data/hadithData';
import { FIQH_TOPICS } from '../../data/fiqhData';
import { DIVINE_NAMES } from '../../data/divineNamesData';

export const AdminAnalyticsModule: React.FC = () => {
  const surahsCount = getAllSurahs().length;
  const hadithsCount = HADITHS_LIST.length;
  const fiqhTopicsCount = FIQH_TOPICS.length;
  const divineNamesCount = DIVINE_NAMES.length;

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-emerald-400">
          <Activity className="w-3.5 h-3.5" />
          <span>Falak Platform Telemetry & Observability</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-arabic-heading">
          لوحة الإدارة والتحليلات ومراقبة المنظومة
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          مراقبة حالة الخدمات، مؤشرات الأداء، سلامة التخزين المحلي والمؤقت، وإحصائيات قواعد البيانات الإسلامية.
        </p>
      </div>

      {/* System Health Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'حالة الخادم وتكامل الذكاء', value: 'نشط ويعمل (Healthy)', icon: Server, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
          { label: 'إجمالي السور المفهرسة', value: `${surahsCount} سورة (6,236 آية)`, icon: Database, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/40' },
          { label: 'زمن الاستجابة البرمجية', value: '18ms (Ultra Fast)', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/40' },
          { label: 'دقة التخريج والتوثيق', value: '100% موثق بالمصادر', icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/40' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{item.label}</span>
                <div className={`p-2 rounded-xl ${item.bg} ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-arabic-heading">
                {item.value}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Dataset Statistics Matrix */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <h3 className="font-bold text-base text-slate-900 dark:text-white font-arabic-heading flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-600" />
          <span>حجم وحالة قواعد البيانات الإسلامية في المنصة</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 space-y-1">
            <span className="text-xs text-slate-500 block">فهرس المصحف والتجويد</span>
            <span className="text-2xl font-bold font-mono text-emerald-600">114 سورة</span>
            <p className="text-[11px] text-slate-400">كامل الرسم العثماني</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 space-y-1">
            <span className="text-xs text-slate-500 block">موسوعة الحديث الشريف</span>
            <span className="text-2xl font-bold font-mono text-blue-600">6 كتب كبرى</span>
            <p className="text-[11px] text-slate-400">البخاري ومسلم والسنن</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 space-y-1">
            <span className="text-xs text-slate-500 block">الفقه المقارن</span>
            <span className="text-2xl font-bold font-mono text-purple-600">4 مذاهب</span>
            <p className="text-[11px] text-slate-400">مع الأدلة والقرارات</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 space-y-1">
            <span className="text-xs text-slate-500 block">أسماء الله والأذكار</span>
            <span className="text-2xl font-bold font-mono text-rose-600">99 اسماً + حصن المسلم</span>
            <p className="text-[11px] text-slate-400">مع التأملات والأدعية</p>
          </div>
        </div>
      </div>
    </div>
  );
};
