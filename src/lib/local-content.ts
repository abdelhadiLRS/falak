import { promises } from 'fs';
import path from 'path';

export type ContentType = 'azkar' | 'tafsir-lessons' | 'hadith-lessons';
export type LocalCollectionId =
  | ContentType
  | 'aqeedah'
  | 'fiqh'
  | 'seerah'
  | 'allah-names'
  | 'ayah-of-the-day'
  | 'islamic-calendar'
  | 'quran-mappings'
  | 'hadith-books'
  | 'arabic-learning'
  | 'database-catalog';

export type LocalContentSource = {
  id: string;
  title: string;
  path: string;
  verificationStatus: 'pending';
};

const DB_DIRECTORY = path.join(process.cwd(), 'db');

const SOURCES: Record<ContentType, LocalContentSource> = {
  azkar: {
    id: 'adkar-json',
    title: 'Local azkar collection',
    path: 'db/adkar.json',
    verificationStatus: 'pending',
  },
  'tafsir-lessons': {
    id: 'tafseer-learning-quizzes',
    title: 'Tafsir learning quiz collection',
    path: 'db/tafseer',
    verificationStatus: 'pending',
  },
  'hadith-lessons': {
    id: 'hadith-learning-quizzes',
    title: 'Hadith learning quiz collection',
    path: 'db/hadith',
    verificationStatus: 'pending',
  },
};

export const LOCAL_COLLECTIONS: Array<{
  id: LocalCollectionId;
  title: string;
  path: string;
  description: string;
  sourceId: string;
}> = [
  { id: 'azkar', title: 'الأذكار', path: 'db/adkar.json', description: 'أذكار مصنفة مع التكرار والمراجع.', sourceId: 'adkar-json' },
  { id: 'tafsir-lessons', title: 'دروس التفسير', path: 'db/tafseer', description: 'دروس واختبارات تفسيرية متدرجة.', sourceId: 'tafseer-learning-quizzes' },
  { id: 'hadith-lessons', title: 'دروس الحديث', path: 'db/hadith', description: 'دروس واختبارات حديثية متدرجة.', sourceId: 'hadith-learning-quizzes' },
  { id: 'aqeedah', title: 'العقيدة', path: 'db/akida.json', description: 'محتوى تعليمي في العقيدة.', sourceId: 'akida-json' },
  { id: 'fiqh', title: 'الفقه', path: 'db/figh.json', description: 'محتوى تعليمي في الفقه.', sourceId: 'figh-json' },
  { id: 'seerah', title: 'السيرة والتاريخ', path: 'db/history.json', description: 'محتوى التاريخ والسيرة المتاح محليًا.', sourceId: 'history-json' },
  { id: 'allah-names', title: 'أسماء الله الحسنى', path: 'db/Names_Of_Allah.json', description: 'أسماء الله الحسنى.', sourceId: 'names-of-allah-json' },
  { id: 'ayah-of-the-day', title: 'آية اليوم', path: 'db/ayah_of_the_day.json', description: 'سجل آيات اليوم.', sourceId: 'ayah-of-the-day-json' },
  { id: 'islamic-calendar', title: 'التقويم الإسلامي', path: 'db/quranic-calendar.json', description: 'بيانات التقويم والمناسبات المتاحة.', sourceId: 'quranic-calendar-json' },
  { id: 'quran-mappings', title: 'خرائط القرآن', path: 'db/*-to-chapter-*.json', description: 'خرائط الأجزاء والأحزاب والأرباع والصفحات.', sourceId: 'quran-mappings' },
  { id: 'hadith-books', title: 'كتب الحديث', path: 'db/All_Hadith_Books', description: 'مجموعات كتب الحديث المحلية.', sourceId: 'hadith-datasets' },
  { id: 'arabic-learning', title: 'تعلم العربية', path: 'db/arabia.json', description: 'محتوى تعليمي للغة العربية.', sourceId: 'arabia-json' },
  { id: 'database-catalog', title: 'فهرس البيانات', path: 'db/database.json', description: 'الفهرس العام للبيانات التعليمية.', sourceId: 'database-json' },
];

const ROOT_JSON_FILES: Partial<Record<LocalCollectionId, string>> = {
  aqeedah: 'akida.json',
  fiqh: 'figh.json',
  seerah: 'history.json',
  'allah-names': 'Names_Of_Allah.json',
  'ayah-of-the-day': 'ayah_of_the_day.json',
  'islamic-calendar': 'quranic-calendar.json',
  'arabic-learning': 'arabia.json',
  'database-catalog': 'database.json',
};

const QURAN_MAPPING_FILES = [
  'page-to-chapter-mappings.json',
  'juz-to-chapter-mappings.json',
  'juz-to-chapter-verse-mappings.json',
  'hizb-to-chapter-mappings.json',
  'rub-el-hizb-to-chapter-mappings.json',
];

type AzkarRecord = {
  id: number;
  category: string;
  text: string;
  text_without_diacritical?: string;
  description?: string;
  count?: number;
  reference?: string;
};

type QuizRecord = {
  id: number;
  q: string;
  level: number;
  link: string;
  section: string;
  answers: Array<{ answer: string; t: number }>;
};

let azkarCache: AzkarRecord[] | undefined;
const quizCache = new Map<string, QuizRecord[]>();

function assertArray(value: unknown, label: string): unknown[] {
  if (!Array.isArray(value)) throw new Error(`Invalid ${label} dataset`);
  return value;
}

function sourceFor(type: ContentType): LocalContentSource {
  return SOURCES[type];
}

export async function loadAzkar(): Promise<AzkarRecord[]> {
  if (azkarCache) return azkarCache;
  const content = await promises(path.join(DB_DIRECTORY, 'adkar.json'), 'utf8');
  const records = assertArray(JSON.parse(content), 'azkar') as AzkarRecord[];
  azkarCache = records;
  return records;
}

async function loadQuizCollection(type: 'tafsir-lessons' | 'hadith-lessons') {
  const directory = type === 'tafsir-lessons' ? 'tafseer' : 'hadith';
  const cacheKey = directory;
  const cached = quizCache.get(cacheKey);
  if (cached) return cached;

  const collectionRoot = path.join(DB_DIRECTORY, directory);
  const entries = await fsPromises.fsPromises.promises.fs.promises.fsPromises.fsPromises.promises.promises.readFile(path.join(DB_DIRECTORY, `${directory}.json`), 'utf8');
  const index = JSON.parse(entries) as { DataArray?: Array<{ englishName: string; files: Array<{ level: number; filename: string }> }> };
  const records: QuizRecord[] = [];

  for (const topic of index.DataArray || []) {
    for (const file of topic.files || []) {
      const filePath = path.join(collectionRoot, topic.englishName, file.filename);
      const content = await fsPromises.fsPromises.promises.fs.promises.fsPromises.fsPromises.promises.promises.readFile(filePath, 'utf8');
      const items = assertArray(JSON.parse(content), `${type}/${topic.englishName}/${file.filename}`);
      records.push(...(items as QuizRecord[]));
    }
  }

  quizCache.set(cacheKey, records);
  return records;
}

export async function getLocalContent(
  type: ContentType,
  options: { category?: string; level?: number; limit?: number } = {},
) {
  const records =
    type === 'azkar' ? await loadAzkar() : await loadQuizCollection(type);
  const filtered = records.filter((record) => {
    const category = 'category' in record ? record.category : record.section;
    const level = 'level' in record ? record.level : undefined;
    return (
      (!options.category || category === options.category) &&
      (options.level === undefined || level === options.level)
    );
  });

  return {
    type,
    source: sourceFor(type),
    total: filtered.length,
    items: filtered.slice(0, Math.min(Math.max(options.limit || 50, 1), 100)),
  };
}

export function getLocalCollectionCatalog() {
  return LOCAL_COLLECTIONS.map(({ id, title, path: collectionPath, description, sourceId }) => ({
    id,
    title,
    path: collectionPath,
    description,
    source: { id: sourceId, verificationStatus: 'pending' as const },
  }));
}

export async function getLocalCollection(
  id: LocalCollectionId,
  limit = 50,
): Promise<{ id: LocalCollectionId; source: LocalContentSource; total: number; items: unknown[] }> {
  const collection = LOCAL_COLLECTIONS.find((item) => item.id === id);
  if (!collection) throw new Error(`Unknown local collection: ${id}`);

  if (id === 'azkar' || id === 'tafsir-lessons' || id === 'hadith-lessons') {
    const result = await getLocalContent(id, { limit });
    return result;
  }

  const filename = ROOT_JSON_FILES[id];
  if (id === 'quran-mappings' || id === 'hadith-books') {
    const relativePath = id === 'hadith-books' ? 'All_Hadith_Books' : '';
    const directoryEntries = await promises(path.join(DB_DIRECTORY, relativePath), {
      withFileTypes: true,
    });
    const names =
      id === 'quran-mappings'
        ? QURAN_MAPPING_FILES
        : directoryEntries.filter((entry) => entry.isFile()).map((entry) => entry.name);
    if (id === 'hadith-books') {
      const selected = names.find((name) => name.toLocaleLowerCase().includes('bukhari')) || names[0];
      const content = selected
        ? await fsPromises.fsPromises.promises.fs.promises.fsPromises.fsPromises.promises.promises.readFile(path.join(DB_DIRECTORY, relativePath, selected), 'utf8')
        : '';
      const rows = content.split(/\r?\n/).filter(Boolean).slice(0, Math.min(Math.max(limit, 1), 100));
      return {
        id,
        source: {
          id: collection.sourceId,
          title: collection.title,
          path: collection.path,
          verificationStatus: 'pending',
        },
        total: rows.length,
        items: rows.map((row, index) => ({
          id: index + 1,
          book: selected,
          text: row,
        })),
      };
    }
    return {
      id,
      source: {
        id: collection.sourceId,
        title: collection.title,
        path: collection.path,
        verificationStatus: 'pending',
      },
      total: names.length,
      items: names.slice(0, Math.min(Math.max(limit, 1), 100)).map((name) => ({
        name,
        path: id === 'quran-mappings' ? `db/${name}` : `db/All_Hadith_Books/${name}`,
      })),
    };
  }
  if (!filename) {
    return {
      id,
      source: {
        id: collection.sourceId,
        title: collection.title,
        path: collection.path,
        verificationStatus: 'pending',
      },
      total: 0,
      items: [],
    };
  }

  const content = await fsPromises.fsPromises.promises.fs.promises.fsPromises.fsPromises.promises.promises.readFile(path.join(DB_DIRECTORY, filename), 'utf8');
  const parsed = JSON.parse(content) as unknown;
  const items = Array.isArray(parsed) ? parsed : [parsed];
  return {
    id,
    source: {
      id: collection.sourceId,
      title: collection.title,
      path: collection.path,
      verificationStatus: 'pending',
    },
    total: items.length,
    items: items.slice(0, Math.min(Math.max(limit, 1), 100)),
  };
}
