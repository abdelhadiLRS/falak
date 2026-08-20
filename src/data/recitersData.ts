import { Reciter } from '../types';

export const RECITERS_LIST: Reciter[] = [
  {
    id: 'ar.alafasy',
    nameArabic: 'مشاري بن راشد العفاسي',
    nameEnglish: 'Mishary Rashid Alafasy',
    style: 'مرتل - جودة عالية',
    serverUrl: 'https://server8.mp3quran.net/afs/',
    format: 'mp3',
    bitrate: '128kbps'
  },
  {
    id: 'ar.abdulbasit',
    nameArabic: 'عبد الباسط عبد الصمد',
    nameEnglish: 'Abdul Basit Abdul Samad',
    style: 'مرتل - رواية حفص عن عاصم',
    serverUrl: 'https://server7.mp3quran.net/basit/',
    format: 'mp3',
    bitrate: '128kbps'
  },
  {
    id: 'ar.abdulbasit.mujawwad',
    nameArabic: 'عبد الباسط عبد الصمد (مجود)',
    nameEnglish: 'Abdul Basit Abdul Samad (Mujawwad)',
    style: 'مجود فخم',
    serverUrl: 'https://server7.mp3quran.net/basit/Almusshaf-Al-Mojawwad/',
    format: 'mp3',
    bitrate: '128kbps'
  },
  {
    id: 'ar.husary',
    nameArabic: 'محمود خليل الحصري',
    nameEnglish: 'Mahmoud Khalil Al-Husary',
    style: 'مرتل - معلم الإتقان',
    serverUrl: 'https://server13.mp3quran.net/husr/',
    format: 'mp3',
    bitrate: '128kbps'
  },
  {
    id: 'ar.minshawi',
    nameArabic: 'محمد صديق المنشاوي',
    nameEnglish: 'Mohamed Siddiq Al-Minshawi',
    style: 'مرتل خاشع',
    serverUrl: 'https://server10.mp3quran.net/minsh/',
    format: 'mp3',
    bitrate: '128kbps'
  },
  {
    id: 'ar.ghamidi',
    nameArabic: 'سعد الغامدي',
    nameEnglish: 'Saad Al-Ghamdi',
    style: 'مرتل هادئ',
    serverUrl: 'https://server7.mp3quran.net/s_gmd/',
    format: 'mp3',
    bitrate: '128kbps'
  },
  {
    id: 'ar.maher',
    nameArabic: 'ماهر المعيقلي',
    nameEnglish: 'Maher Al-Muaiqly',
    style: 'الحرم المكي الشريف',
    serverUrl: 'https://server12.mp3quran.net/maher/',
    format: 'mp3',
    bitrate: '128kbps'
  },
  {
    id: 'ar.sudais',
    nameArabic: 'عبد الرحمن السديس',
    nameEnglish: 'Abdur-Rahman As-Sudais',
    style: 'إمام الحرم المكي',
    serverUrl: 'https://server11.mp3quran.net/sds/',
    format: 'mp3',
    bitrate: '128kbps'
  },
  {
    id: 'ar.shuraym',
    nameArabic: 'سعود الشريم',
    nameEnglish: 'Saud Ash-Shuraim',
    style: 'الحرم المكي',
    serverUrl: 'https://server7.mp3quran.net/shur/',
    format: 'mp3',
    bitrate: '128kbps'
  },
  {
    id: 'ar.dosari',
    nameArabic: 'ياسر الدوسري',
    nameEnglish: 'Yasser Al-Dosari',
    style: 'صوت ندي خاشع',
    serverUrl: 'https://server11.mp3quran.net/yasser/',
    format: 'mp3',
    bitrate: '128kbps'
  },
  {
    id: 'ar.ajamy',
    nameArabic: 'أحمد بن علي العجمي',
    nameEnglish: 'Ahmed Al-Ajmi',
    style: 'مرتل متدفق',
    serverUrl: 'https://server10.mp3quran.net/ajm/',
    format: 'mp3',
    bitrate: '128kbps'
  },
  {
    id: 'ar.hudhaify',
    nameArabic: 'علي بن عبد الرحمن الحذيفي',
    nameEnglish: 'Ali Al-Hudhaify',
    style: 'الحرم النبوي الشريف',
    serverUrl: 'https://server9.mp3quran.net/hthfi/',
    format: 'mp3',
    bitrate: '128kbps'
  },
  {
    id: 'ar.qatami',
    nameArabic: 'ناصر القطامي',
    nameEnglish: 'Nasser Al-Qatami',
    style: 'تلاوة حجازية ونجدية عذبة',
    serverUrl: 'https://server6.mp3quran.net/qtm/',
    format: 'mp3',
    bitrate: '128kbps'
  },
  {
    id: 'ar.banna',
    nameArabic: 'محمود علي البنا',
    nameEnglish: 'Mahmoud Ali Al-Banna',
    style: 'من عمالقة التلاوة المصرية',
    serverUrl: 'https://server8.mp3quran.net/bna/',
    format: 'mp3',
    bitrate: '128kbps'
  },
  {
    id: 'ar.juhany',
    nameArabic: 'عبد الله عواد الجهني',
    nameEnglish: 'Abdullah Awad Al-Juhany',
    style: 'إمام المسجد الحرام',
    serverUrl: 'https://server13.mp3quran.net/jhn/',
    format: 'mp3',
    bitrate: '128kbps'
  },
  {
    id: 'ar.muhsin',
    nameArabic: 'عبد المحسن القاسم',
    nameEnglish: 'Abdul Mohsen Al-Qasim',
    style: 'إمام المسجد النبوي',
    serverUrl: 'https://server8.mp3quran.net/qasm/',
    format: 'mp3',
    bitrate: '128kbps'
  }
];

export function getSurahAudioUrl(reciterServerUrl: string, surahId: number): string {
  const padded = surahId.toString().padStart(3, '0');
  const base = reciterServerUrl.endsWith('/') ? reciterServerUrl : `${reciterServerUrl}/`;
  return `${base}${padded}.mp3`;
}

export function getVerseAudioUrl(reciterId: string, surahId: number, ayahNumber: number): string {
  // Uses EveryAyah CDN format for single ayah playback
  // e.g. https://everyayah.com/data/Alafasy_128kbps/001001.mp3
  const sPadded = surahId.toString().padStart(3, '0');
  const aPadded = ayahNumber.toString().padStart(3, '0');
  return `https://everyayah.com/data/Alafasy_128kbps/${sPadded}${aPadded}.mp3`;
}

export const RECITERS = RECITERS_LIST;
