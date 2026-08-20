import React from 'react';
import {
  Home,
  BookOpen,
  FileText,
  Volume2,
  BookmarkCheck,
  BookCheck,
  Compass,
  Sparkles,
  Users,
  Code2,
  BarChart3,
  Flame,
  Sun,
  Shield,
  Heart,
  CalendarDays,
  GraduationCap
} from 'lucide-react';
import { ActiveTab } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isOpenMobile: boolean;
  closeMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpenMobile,
  closeMobile
}) => {
  const navSections = [
    {
      groupTitle: 'المنظومة القرآنية',
      items: [
        { id: 'home' as ActiveTab, label: 'الرئيسية', icon: Home },
        { id: 'quran' as ActiveTab, label: 'القرآن الكريم', icon: BookOpen, badge: '114 سورة' },
        { id: 'tafsir' as ActiveTab, label: 'التفاسير والترجمات', icon: FileText, badge: '6 تفاسير' },
        { id: 'tajweed' as ActiveTab, label: 'أكاديمية التجويد', icon: Volume2 },
        { id: 'memorization' as ActiveTab, label: 'نظام الحفظ الذكي (SRS)', icon: BookmarkCheck, badge: 'تفاعلي' },
      ]
    },
    {
      groupTitle: 'الموسوعة والعلوم الشرعية',
      items: [
        { id: 'hadith' as ActiveTab, label: 'الحديث الشريف', icon: BookCheck, badge: 'كتب السنة' },
        { id: 'seerah' as ActiveTab, label: 'السيرة النبوية', icon: Compass, badge: 'خط زمني' },
        { id: 'fiqh' as ActiveTab, label: 'الفقه المقارن', icon: Shield, badge: 'المذاهب الـ4' },
        { id: 'azkar' as ActiveTab, label: 'الأذكار والمسابح', icon: Sun },
        { id: 'divine-names' as ActiveTab, label: 'أسماء الله الحسنى', icon: Heart, badge: '99 اسماً' },
      ]
    },
    {
      groupTitle: 'الذكاء والتعلم والمجتمع',
      items: [
        { id: 'ai-assistant' as ActiveTab, label: 'مساعد فلك الذكي', icon: Sparkles, badge: 'Gemini' },
        { id: 'workspace' as ActiveTab, label: 'مساحة طالب العلم', icon: GraduationCap },
        { id: 'community' as ActiveTab, label: 'الحلقات والمجتمع', icon: Users },
      ]
    },
    {
      groupTitle: 'الأدوات والمطورين',
      items: [
        { id: 'prayer-qibla' as ActiveTab, label: 'مواقيت الصلاة والقبلة', icon: CalendarDays },
        { id: 'developers' as ActiveTab, label: 'واجهات API المفتوحة', icon: Code2, badge: 'REST' },
        { id: 'admin' as ActiveTab, label: 'لوحة الإدارة والمراقبة', icon: BarChart3 },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={closeMobile}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-16 right-0 z-40 h-[calc(100vh-4rem)] w-68 shrink-0 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out overflow-y-auto flex flex-col justify-between ${
          isOpenMobile ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-3.5 space-y-6">
          {navSections.map((sec, secIdx) => (
            <div key={secIdx} className="space-y-1">
              <h3 className="px-3 text-[11px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase font-arabic-heading">
                {sec.groupTitle}
              </h3>
              <div className="mt-1 space-y-0.5">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        closeMobile();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all group ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70'
                      }`}
                      id={`sidebar-link-${item.id}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                            isActive
                              ? 'text-white'
                              : 'text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info & License */}
        <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 text-center">
          <div className="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
            <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-300">
              مشروع فلك (Falak)
            </p>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400/90 mt-0.5">
              منصة وقفية مجانية ومفتوحة المصدر
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
