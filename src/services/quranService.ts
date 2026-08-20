import { Ayah, SurahMeta } from '../types';
import { getAllSurahs, SAMPLE_VERSES_DATA } from '../data/quranData';

export const QuranService = {
  getSurahsList(): SurahMeta[] {
    return getAllSurahs();
  },

  getSurahById(id: number): SurahMeta | undefined {
    return getAllSurahs().find(s => s.id === id);
  },

  async getSurahAyahs(surahId: number): Promise<Ayah[]> {
    // Check if pre-seeded in local sample verses
    if (SAMPLE_VERSES_DATA[surahId] && SAMPLE_VERSES_DATA[surahId].length > 0) {
      return SAMPLE_VERSES_DATA[surahId];
    }

    // Check localStorage cache
    const cacheKey = `falak_surah_ayahs_${surahId}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {
      // ignore
    }

    // Fetch from Al-Quran API for complete coverage of all 114 Surahs
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahId}/editions/quran-uthmani,en.sahih,fr.hamidullah,ur.jalandhry`);
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length >= 1) {
          const uthmaniEdition = json.data[0];
          const enEdition = json.data[1];
          const frEdition = json.data[2];
          const urEdition = json.data[3];

          const ayahs: Ayah[] = uthmaniEdition.ayahs.map((a: any, idx: number) => {
            return {
              id: a.number,
              surahNumber: surahId,
              numberInSurah: a.numberInSurah,
              juz: a.juz,
              page: a.page,
              hizbQuarter: a.hizbQuarter,
              sajda: typeof a.sajda === 'boolean' ? a.sajda : false,
              textUthmani: a.text,
              textSimple: a.text.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, ''),
              translationEn: enEdition?.ayahs[idx]?.text || '',
              translationFr: frEdition?.ayahs[idx]?.text || '',
              translationUr: urEdition?.ayahs[idx]?.text || '',
              words: a.text.split(' ').map((w: string, wIdx: number) => ({
                id: wIdx + 1,
                arabic: w,
                transliteration: '',
                translation: ''
              }))
            };
          });

          // Cache in localStorage
          try {
            localStorage.setItem(cacheKey, JSON.stringify(ayahs));
          } catch {
            // cache full ignore
          }

          return ayahs;
        }
      }
    } catch (e) {
      console.warn('Network fetch error for Quran API, generating fallback ayahs', e);
    }

    // Fallback generated verses if offline
    const surah = this.getSurahById(surahId);
    const count = surah?.numberOfAyahs || 7;
    const fallback: Ayah[] = Array.from({ length: count }, (_, i) => {
      const ayahNum = i + 1;
      return {
        id: (surahId * 1000) + ayahNum,
        surahNumber: surahId,
        numberInSurah: ayahNum,
        juz: surah?.juzStart || 1,
        page: surah?.pageStart || 1,
        hizbQuarter: 1,
        textUthmani: ayahNum === 1 && surahId !== 9 && surahId !== 1
          ? `بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ - آية ${ayahNum} من سورة ${surah?.name || ''}`
          : `آية ${ayahNum} من سورة ${surah?.name || ''} المباركة بحمد الله وتوفيقه.`,
        textSimple: `آية ${ayahNum} من سورة ${surah?.name || ''}`,
        translationEn: `Verse ${ayahNum} of Surah ${surah?.englishName || ''}.`,
        words: [
          { id: 1, arabic: 'آية', transliteration: 'Ayah', translation: 'Verse' },
          { id: 2, arabic: `${ayahNum}`, transliteration: `${ayahNum}`, translation: `${ayahNum}` }
        ]
      };
    });
    return fallback;
  },

  searchQuran(query: string, surahs: SurahMeta[]): { surah: SurahMeta; matchReason: string }[] {
    if (!query || query.trim() === '') return [];
    const clean = query.trim().toLowerCase();
    return surahs.filter(s =>
      s.name.includes(clean) ||
      s.englishName.toLowerCase().includes(clean) ||
      s.englishNameTranslation.toLowerCase().includes(clean) ||
      s.summary.includes(clean) ||
      s.themes.some(t => t.includes(clean))
    ).map(surah => ({
      surah,
      matchReason: surah.name.includes(clean) ? 'اسم السورة' : 'موضوع أو ملخص السورة'
    }));
  }
};
