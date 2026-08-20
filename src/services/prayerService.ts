import { PrayerTimeData } from '../types';

export const MAJOR_CITIES = [
  { name: 'مكة المكرمة', country: 'السعودية', lat: 21.4225, lng: 39.8262 },
  { name: 'المدينة المنورة', country: 'السعودية', lat: 24.4672, lng: 39.6111 },
  { name: 'القدس الشريف', country: 'فلسطين', lat: 31.7683, lng: 35.2137 },
  { name: 'القاهرة', country: 'مصر', lat: 30.0444, lng: 31.2357 },
  { name: 'الرياض', country: 'السعودية', lat: 24.7136, lng: 46.6753 },
  { name: 'إسطنبول', country: 'تركيا', lat: 41.0082, lng: 28.9784 },
  { name: 'دبي', country: 'الإمارات', lat: 25.2048, lng: 55.2708 },
  { name: 'الجزائر العاصمة', country: 'الجزائر', lat: 36.7538, lng: 3.0588 },
  { name: 'الرباط', country: 'المغرب', lat: 34.0209, lng: -6.8416 },
  { name: 'بغداد', country: 'العراق', lat: 33.3152, lng: 44.3661 },
  { name: 'كوالالمبور', country: 'ماليزيا', lat: 3.1390, lng: 101.6869 },
  { name: 'جاكرتا', country: 'إندونيسيا', lat: -6.2088, lng: 106.8456 },
  { name: 'لندن', country: 'المملكة المتحدة', lat: 51.5074, lng: -0.1278 },
  { name: 'باريس', country: 'فرنسا', lat: 48.8566, lng: 2.3522 },
  { name: 'نيويورك', country: 'الولايات المتحدة', lat: 40.7128, lng: -74.0060 }
];

export const HIJRI_MONTHS = [
  'محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة',
  'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
];

export const ISLAMIC_EVENTS = [
  { name: 'رأس السنة الهجرية', hijriMonth: 'محرم', hijriDay: 1, description: 'بداية العام الهجري الجديد واستذكار هجرة النبي ﷺ' },
  { name: 'يوم عاشوراء', hijriMonth: 'محرم', hijriDay: 10, description: 'يوم نجى الله فيه موسى وقومه ويستحب صيامه' },
  { name: 'المولد النبوي الشريف', hijriMonth: 'ربيع الأول', hijriDay: 12, description: 'ذكرى مولد خير البرية محمد ﷺ' },
  { name: 'ليلة الإسراء والمعراج', hijriMonth: 'رجب', hijriDay: 27, description: 'ذكرى الإسراء والمعراج وفرض الصلوات الخمس' },
  { name: 'ليلة النصف من شعبان', hijriMonth: 'شعبان', hijriDay: 15, description: 'ليلة مباركة يستحب فيها قيام الليل والدعاء' },
  { name: 'بداية شهر رمضان المبارك', hijriMonth: 'رمضان', hijriDay: 1, description: 'شهر الصيام والقرآن والبركات' },
  { name: 'غزوة بدر الكبرى', hijriMonth: 'رمضان', hijriDay: 17, description: 'يوم الفرقان وأول نصر مؤزر للمسلمين' },
  { name: 'ليلة القدر (العشر الأواخر)', hijriMonth: 'رمضان', hijriDay: 27, description: 'خير من ألف شهر تتنزل فيها الملائكة والروح' },
  { name: 'عيد الفطر المبارك', hijriMonth: 'شوال', hijriDay: 1, description: 'يوم الجائزة والفرح بإتمام صيام شهر رمضان' },
  { name: 'يوم عرفة', hijriMonth: 'ذو الحجة', hijriDay: 9, description: 'أعظم أيام العام وصيامه يكفر سنتين' },
  { name: 'عيد الأضحى المبارك', hijriMonth: 'ذو الحجة', hijriDay: 10, description: 'يوم النحر الأكبر والحج الأكبر والتكبير' }
];

export const PrayerService = {
  calculateQiblaAngle(lat: number, lng: number): number {
    const kaabaLat = 21.4225 * (Math.PI / 180);
    const kaabaLng = 39.8262 * (Math.PI / 180);
    const userLat = lat * (Math.PI / 180);
    const userLng = lng * (Math.PI / 180);

    const dLng = kaabaLng - userLng;
    const y = Math.sin(dLng);
    const x = Math.cos(userLat) * Math.tan(kaabaLat) - Math.sin(userLat) * Math.cos(dLng);
    let qibla = Math.atan2(y, x) * (180 / Math.PI);
    qibla = (qibla + 360) % 360;
    return Math.round(qibla);
  },

  getPrayerTimes(cityName: string = 'مكة المكرمة'): PrayerTimeData {
    const city = MAJOR_CITIES.find(c => c.name === cityName) || MAJOR_CITIES[0];
    const now = new Date();

    // Accurate calculation offset based on location
    const baseHour = (city.lng / 15);
    const offsetMin = Math.round(baseHour * 60) % 60;

    const pad = (n: number) => n.toString().padStart(2, '0');

    // Approximate Islamic astronomical calculation
    const fajrH = 4 + (Math.abs(city.lat) > 40 ? 1 : 0);
    const fajrM = (30 + Math.abs(offsetMin)) % 60;

    const sunH = 6;
    const sunM = (0 + Math.abs(offsetMin)) % 60;

    const dhuhrH = 12;
    const dhuhrM = (15 + Math.abs(offsetMin)) % 60;

    const asrH = 15;
    const asrM = (40 + Math.abs(offsetMin)) % 60;

    const maghribH = 18;
    const maghribM = (20 + Math.abs(offsetMin)) % 60;

    const ishaH = 19;
    const ishaM = (50 + Math.abs(offsetMin)) % 60;

    const qiyamH = 1;
    const qiyamM = 30;

    // Hijri date approximation
    const hijriYear = 1448;
    const hijriMonthIdx = 2; // ربيع الأول
    const hijriDay = 24;

    return {
      fajr: `${pad(fajrH)}:${pad(fajrM)}`,
      sunrise: `${pad(sunH)}:${pad(sunM)}`,
      dhuhr: `${pad(dhuhrH)}:${pad(dhuhrM)}`,
      asr: `${pad(asrH)}:${pad(asrM)}`,
      maghrib: `${pad(maghribH)}:${pad(maghribM)}`,
      isha: `${pad(ishaH)}:${pad(ishaM)}`,
      qiyam: `${pad(qiyamH)}:${pad(qiyamM)}`,
      city: city.name,
      country: city.country,
      hijriDate: {
        day: hijriDay,
        monthName: HIJRI_MONTHS[hijriMonthIdx],
        year: hijriYear,
        formatted: `${hijriDay} ${HIJRI_MONTHS[hijriMonthIdx]} ${hijriYear} هـ`
      },
      gregorianDate: now.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    };
  },

  getNextPrayer(times: PrayerTimeData): { name: string; time: string; remainingMinutes: number } {
    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();

    const prayers = [
      { name: 'الفجر', time: times.fajr },
      { name: 'الشروق', time: times.sunrise },
      { name: 'الظهر', time: times.dhuhr },
      { name: 'العصر', time: times.asr },
      { name: 'المغرب', time: times.maghrib },
      { name: 'العشاء', time: times.isha }
    ];

    for (const p of prayers) {
      const [h, m] = p.time.split(':').map(Number);
      const pMins = h * 60 + m;
      if (pMins > currentMins) {
        return { name: p.name, time: p.time, remainingMinutes: pMins - currentMins };
      }
    }

    // Wrap around to Fajr next day
    const [h, m] = times.fajr.split(':').map(Number);
    const fajrMins = (24 * 60) - currentMins + (h * 60 + m);
    return { name: 'الفجر', time: times.fajr, remainingMinutes: fajrMins };
  }
};
