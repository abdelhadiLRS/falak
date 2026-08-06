import { promises } from 'fs';
import path from 'path';

export type QuranAyah = {
  chapter: number;
  numberInSurah: number;
  text: string;
  translations: Record<string, string>;
};

export type QuranSearchResult = QuranAyah & {
  score: number;
  matchedWords: string[];
};

export type QuranSearchResponse = {
  query: string;
  searchWords: string[];
  results: QuranSearchResult[];
  source: {
    id: string;
    title: string;
    path: string;
    verificationStatus: 'pending';
  };
};

type RawAyah = {
  number?: unknown;
  text?: unknown;
  [language: string]: unknown;
};

const QURAN_DATA_DIRECTORY = path.join(process.cwd(), 'db', 'Quraan_json-master');
const QURAN_SOURCE = {
  id: 'quraan-json-master',
  title: 'Local Quran dataset (Quraan_json-master)',
  path: 'db/Quraan_json-master',
  verificationStatus: 'pending' as const,
};

let quranCache: QuranAyah[] | undefined;
let quranLoadPromise: Promise<QuranAyah[]> | undefined;

const ARABIC_DIACRITICS = /[\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06ed]/g;
const ARABIC_VARIANTS = /[إأٱآ]/g;

function normalizeArabic(value: string): string {
  return value
    .normalize('NFKC')
    .replace(ARABIC_DIACRITICS, '')
    .replace(ARABIC_VARIANTS, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLocaleLowerCase();
}

function getSearchWords(query: string): string[] {
  return Array.from(new Set(normalizeArabic(query).split(' ').filter((word) => word.length > 1)));
}

function parseChapter(chapter: number, raw: unknown): QuranAyah[] {
  if (!Array.isArray(raw)) {
    throw new Error(`Invalid Quran chapter payload for chapter ${chapter}`);
  }

  return raw.map((item, index) => {
    if (!item || typeof item !== 'object') {
      throw new Error(`Invalid Quran ayah at ${chapter}:${index + 1}`);
    }

    const ayah = item as RawAyah;
    const text = String(ayah.text || '').trim();
    if (!text) {
      throw new Error(`Missing Quran text at ${chapter}:${index + 1}`);
    }

    const translations = Object.fromEntries(
      Object.entries(ayah)
        .filter(([key, value]) => key !== 'number' && key !== 'text' && typeof value === 'string')
        .map(([key, value]) => [key, String(value)]),
    );

    return {
      chapter,
      numberInSurah: Number(ayah.number || index + 1),
      text,
      translations,
    };
  });
}

async function loadLocalQuran(): Promise<QuranAyah[]> {
  const chapters = await Promise.all(
    Array.from({ length: 114 }, (_, index) => index + 1).map(async (chapter) => {
      const filePath = path.join(QURAN_DATA_DIRECTORY, `${chapter}.json`);
      const content = await fsPromises.fsPromises.promises.fs.promises.fsPromises.fsPromises.promises.promises.readFile(filePath, 'utf8');
      return parseChapter(chapter, JSON.parse(content) as unknown);
    }),
  );

  return chapters.flat();
}

export async function loadQuranAyahs(): Promise<QuranAyah[]> {
  if (quranCache) return quranCache;
  if (!quranLoadPromise) {
    quranLoadPromise = loadLocalQuran().then((ayahs) => {
      quranCache = ayahs;
      return ayahs;
    });
  }
  return quranLoadPromise;
}

export function searchQuranText(
  ayahs: QuranAyah[],
  query: string,
  limit = 10,
): QuranSearchResponse {
  const searchWords = getSearchWords(query);
  const results = ayahs
    .map((ayah) => {
      const normalizedText = normalizeArabic(ayah.text);
      const matchedWords = searchWords.filter((word) => normalizedText.includes(word));
      if (!matchedWords.length) return null;

      return {
        ...ayah,
        score: matchedWords.length / searchWords.length,
        matchedWords,
      };
    })
    .filter((result): result is QuranSearchResult => result !== null)
    .sort((a, b) => b.score - a.score || a.chapter - b.chapter || a.numberInSurah - b.numberInSurah)
    .slice(0, Math.max(1, Math.min(limit, 50)));

  return {
    query: query.trim(),
    searchWords,
    results,
    source: QURAN_SOURCE,
  };
}
