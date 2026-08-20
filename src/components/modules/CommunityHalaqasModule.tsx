import React, { useState } from 'react';
import {
  Users,
  Award,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Plus,
  MessageCircle,
  Share2,
  ShieldCheck,
  Check
} from 'lucide-react';

interface Halaqa {
  id: string;
  name: string;
  category: string;
  leader: string;
  membersCount: number;
  maxMembers: number;
  currentSurah: string;
  meetingTime: string;
  isJoined: boolean;
}

export const CommunityHalaqasModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'halaqas' | 'khatma'>('halaqas');

  const [halaqas, setHalaqas] = useState<Halaqa[]>([
    {
      id: 'h-1',
      name: 'حلقة فلك المركزية لإتقان جزء عم',
      category: 'حفظ وتجويد',
      leader: 'الشيخ د. عبد الرحمن المنشاوي',
      membersCount: 24,
      maxMembers: 30,
      currentSurah: 'سورة النبأ والنازعات',
      meetingTime: 'يومياً بعد صلاة الفجر',
      isJoined: true
    },
    {
      id: 'h-2',
      name: 'مجلس مدارسة صحيح البخاري',
      category: 'حديث نبوي',
      leader: 'أ. د. محمد بن عبد الله',
      membersCount: 42,
      maxMembers: 50,
      currentSurah: 'كتاب الإيمان وبدء الوحي',
      meetingTime: 'كل إثنين وخميس بعد العصر',
      isJoined: false
    },
    {
      id: 'h-3',
      name: 'منتدى التدبر القرآني وسورة الكهف',
      category: 'تدبر وتفسير',
      leader: 'د. عائشة الأنصاري',
      membersCount: 18,
      maxMembers: 25,
      currentSurah: 'سورة الكهف والقصص القرآني',
      meetingTime: 'كل جمعة قبل العصر',
      isJoined: false
    }
  ]);

  // Shared Khatma state (30 Ajza')
  const [khatmaAjza, setKhatmaAjza] = useState(
    Array.from({ length: 30 }, (_, i) => ({
      juzNumber: i + 1,
      readerName: i < 18 ? `قارئ متطوع ${i + 1}` : null,
      isCompleted: i < 12
    }))
  );

  const toggleJoinHalaqa = (id: string) => {
    setHalaqas(prev =>
      prev.map(h => {
        if (h.id === id) {
          const joined = !h.isJoined;
          return {
            ...h,
            isJoined: joined,
            membersCount: joined ? h.membersCount + 1 : h.membersCount - 1
          };
        }
        return h;
      })
    );
  };

  const handleClaimJuz = (juzNum: number) => {
    setKhatmaAjza(prev =>
      prev.map(j =>
        j.juzNumber === juzNum
          ? { ...j, readerName: j.readerName ? null : 'طالب علم فلك' }
          : j
      )
    );
  };

  const completedAjzaCount = khatmaAjza.filter(j => j.isCompleted).length;
  const claimedAjzaCount = khatmaAjza.filter(j => j.readerName !== null).length;

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-800 via-emerald-800 to-teal-950 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/60 border border-teal-500/30 text-xs font-semibold text-teal-200">
          <Users className="w-3.5 h-3.5" />
          <span>المجتمع القرآني وحلقات التدارس والتنافس الإيماني</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-arabic-heading">
          الحلقات القرآنية الافتراضية والختمة التشاركية
        </h1>
        <p className="text-xs sm:text-sm text-teal-100/90 max-w-2xl leading-relaxed">
          انضم إلى حلقات التحفيظ والمدارسة الجماعية بإشراف معلمين مجازين، وشارك في الختمة القرآنية الشهرية لمنصة فلك.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center">
        <div className="p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex gap-2">
          <button
            onClick={() => setActiveTab('halaqas')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'halaqas'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            حلقات التدارس والتحفيظ
          </button>
          <button
            onClick={() => setActiveTab('khatma')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'khatma'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            الختمة التشاركية العامة ({claimedAjzaCount}/30 جزء)
          </button>
        </div>
      </div>

      {activeTab === 'halaqas' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {halaqas.map((h) => (
            <div
              key={h.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                    {h.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {h.membersCount}/{h.maxMembers} عضواً
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-arabic-heading">
                  {h.name}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <p className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>المشرف: {h.leader}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                    <span>المنهج الحالي: {h.currentSurah}</span>
                  </p>
                  <p className="text-slate-400">الموعد: {h.meetingTime}</p>
                </div>
              </div>

              <button
                onClick={() => toggleJoinHalaqa(h.id)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 ${
                  h.isJoined
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {h.isJoined ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>أنت منضم للحلقة (دخول القاعة)</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>الانضمام إلى الحلقة</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      ) : (
        
        /* Shared Khatma Screen */
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white font-arabic-heading">
                ختمة شهر شعبان 1447هـ التشاركية
              </h3>
              <p className="text-xs text-slate-500">اختر جزءاً لتلاوته وشارك في إتمام الختمة المباركة</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-emerald-600 font-mono">
                {claimedAjzaCount} من 30 جزء محجوز
              </span>
            </div>
          </div>

          {/* 30 Ajza' Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {khatmaAjza.map((j) => {
              const isClaimed = j.readerName !== null;
              return (
                <div
                  key={j.juzNumber}
                  className={`p-4 rounded-2xl border text-center transition-all space-y-2 ${
                    j.isCompleted
                      ? 'bg-emerald-100/70 dark:bg-emerald-950/60 border-emerald-400'
                      : isClaimed
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 dark:text-white font-arabic-heading block">
                    الجزء {j.juzNumber}
                  </span>

                  <p className="text-[11px] text-slate-500 truncate">
                    {j.isCompleted ? 'مكتمل بحمد الله' : isClaimed ? j.readerName : 'متاح للحجز'}
                  </p>

                  {!j.isCompleted && (
                    <button
                      onClick={() => handleClaimJuz(j.juzNumber)}
                      className={`w-full py-1 rounded-lg text-[10px] font-bold ${
                        isClaimed
                          ? 'bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {isClaimed ? 'إلغاء حجزي' : 'احجز الجزء'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
