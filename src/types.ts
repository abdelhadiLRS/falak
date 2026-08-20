export type ActiveTab =
  | 'home'
  | 'quran'
  | 'tafsir'
  | 'tajweed'
  | 'memorization'
  | 'hadith'
  | 'seerah'
  | 'fiqh'
  | 'azkar'
  | 'divine-names'
  | 'ai-assistant'
  | 'community'
  | 'workspace'
  | 'prayer-qibla'
  | 'developers'
  | 'admin';

export type QuranReadingMode = 'surah' | 'page' | 'ayah' | 'word-by-word' | 'tajweed-mode';

export interface SurahMeta {
  id: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
  revelationOrder: number;
  juzStart: number;
  pageStart: number;
  wordsCount?: number;
  lettersCount?: number;
  summary: string;
  themes: string[];
  virtues?: string;
  reasonForNaming?: string;
}

export interface Ayah {
  id: number;
  surahNumber: number;
  numberInSurah: number;
  juz: number;
  page: number;
  hizbQuarter: number;
  textUthmani: string;
  textSimple: string;
  sajda?: boolean;
  words?: WordAnalysis[];
  tajweedParts?: { text: string; rule?: string }[];
  translationEn?: string;
  translationFr?: string;
  translationUr?: string;
  tafsirSummary?: string;
}

export interface WordAnalysis {
  id: number;
  arabic: string;
  transliteration: string;
  translation: string;
  root?: string;
  grammarType?: string;
}

export interface Reciter {
  id: string;
  nameArabic: string;
  nameEnglish: string;
  style: string;
  serverUrl: string;
  subfolder?: string;
  format: 'mp3';
  bitrate: string;
}

export interface TafsirEntry {
  id: string;
  bookName: string;
  author: string;
  era: string;
  methodology: string;
  text: string;
  source: string;
  license: string;
}

export interface TajweedRule {
  id: string;
  name: string;
  category: 'noon-sakina' | 'meem-sakina' | 'mudood' | 'qalqalah' | 'ahkam-laam-raa' | 'makharij';
  arabicName: string;
  colorClass: string;
  definition: string;
  detailedExplanation: string;
  letters: string[];
  examples: {
    ayahText: string;
    targetWord: string;
    surahName: string;
    ayahNumber: number;
    audioUrl?: string;
  }[];
  mistakesToAvoid: string[];
}

export interface MemorizationPlan {
  id: string;
  title: string;
  description: string;
  type: 'juz-amma' | 'baqarah' | 'custom' | 'one-year' | 'two-year' | 'kids';
  totalAyahs: number;
  targetDays: number;
  dailyVerses: number;
  dailyReviewVerses: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface UserMemorizationRecord {
  surahId: number;
  ayahNumber: number;
  status: 'new' | 'learning' | 'reviewing' | 'mastered';
  lastReviewedDate?: string;
  nextReviewDate?: string;
  repetitionCount: number;
  accuracyScore: number;
  notes?: string;
}

export interface HadithItem {
  id: number;
  collection: string;
  collectionArabic: string;
  hadithNumber: number;
  chapterArabic: string;
  narrator: string;
  textArabic: string;
  textEnglish?: string;
  grade: 'صحيح' | 'حسن' | 'متفق عليه';
  explanation: string;
  benefits: string[];
  reference: string;
  topics: string[];
}

export interface SeerahMilestone {
  id: string;
  yearHijriOrAd: string;
  era: 'pre-prophethood' | 'meccan-era' | 'migration' | 'medinan-era' | 'farewell-hajj';
  title: string;
  subtitle: string;
  description: string;
  location: string;
  keyEvents: string[];
  keyFigures: string[];
  lessons: string[];
  relatedQuranAyah?: string;
}

export interface FiqhTopic {
  id: string;
  category: 'طهارة' | 'صلاة' | 'زكاة' | 'صيام' | 'حج وعمرة' | 'معاملات' | 'أسرة';
  title: string;
  question: string;
  summaryAnswer: string;
  madhabOpinions: {
    madhab: 'الحنفي' | 'المالكي' | 'الشافعي' | 'الحنبلي' | 'إجماع / جمهور';
    opinion: string;
    proof: string;
  }[];
  primarySources: string[];
}

export interface ZikrItem {
  id: string;
  category: 'morning' | 'evening' | 'sleep' | 'post-prayer' | 'wake-up' | 'quran-duaa' | 'ruqyah';
  categoryArabic: string;
  text: string;
  count: number;
  virtue: string;
  reference: string;
  audioText?: string;
}

export interface DivineName {
  id: number;
  nameArabic: string;
  transliteration: string;
  meaning: string;
  detailedReflection: string;
  quranOccurrencesCount: number;
  sampleAyah: {
    surah: string;
    ayahNumber: number;
    text: string;
  };
  duaFormula: string;
}

export interface Bookmark {
  id: string;
  surahId: number;
  surahName: string;
  ayahNumber: number;
  page: number;
  createdDate: string;
  note?: string;
  color?: string;
}

export interface StudentNote {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  surahRef?: string;
  hadithRef?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PrayerTimeData {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  qiyam: string;
  city: string;
  country: string;
  hijriDate: {
    day: number;
    monthName: string;
    year: number;
    formatted: string;
  };
  gregorianDate: string;
}

export interface CertificateData {
  id: string;
  studentName: string;
  courseTitle: string;
  completionDate: string;
  grade: string;
  verificationCode: string;
  instructorName: string;
}
