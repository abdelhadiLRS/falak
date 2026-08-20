import { Bookmark, StudentNote, UserMemorizationRecord } from '../types';

const STORAGE_KEYS = {
  BOOKMARKS: 'falak_bookmarks_v1',
  NOTES: 'falak_notes_v1',
  MEMORIZATION: 'falak_memorization_v1',
  READING_POSITION: 'falak_last_read_v1',
  KHATMA: 'falak_khatma_progress_v1',
  SETTINGS: 'falak_user_settings_v1',
  TASBEEH_COUNT: 'falak_tasbeeh_count_v1'
};

export interface UserSettings {
  theme: 'light' | 'dark' | 'paper';
  quranFontSize: number;
  quranFontFamily: string;
  showTajweedColors: boolean;
  showWordByWord: boolean;
  activeReciterId: string;
  audioPlaybackSpeed: number;
  autoScroll: boolean;
  language: 'ar' | 'en' | 'fr' | 'ur';
}

export const DEFAULT_SETTINGS: UserSettings = {
  theme: 'light',
  quranFontSize: 28,
  quranFontFamily: 'font-quran',
  showTajweedColors: true,
  showWordByWord: false,
  activeReciterId: 'ar.alafasy',
  audioPlaybackSpeed: 1,
  autoScroll: true,
  language: 'ar'
};

export const StorageService = {
  getBookmarks(): Bookmark[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [
        {
          id: 'bm-1',
          surahId: 1,
          surahName: 'الفاتحة',
          ayahNumber: 1,
          page: 1,
          createdDate: new Date().toISOString().split('T')[0],
          note: 'استفتاح القرآن الكريم'
        },
        {
          id: 'bm-2',
          surahId: 18,
          surahName: 'الكهف',
          ayahNumber: 1,
          page: 293,
          createdDate: new Date().toISOString().split('T')[0],
          note: 'ورد يوم الجمعة'
        }
      ];
    } catch {
      return [];
    }
  },

  saveBookmark(bookmark: Bookmark): void {
    const list = this.getBookmarks().filter(b => b.id !== bookmark.id);
    list.unshift(bookmark);
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
  },

  removeBookmark(id: string): void {
    const list = this.getBookmarks().filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
  },

  getNotes(): StudentNote[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTES);
      return data ? JSON.parse(data) : [
        {
          id: 'note-1',
          title: 'لطائف سورة الفاتحة والإخلاص',
          content: 'تقديم الاستعانة بعد العبادة في (إياك نعبد وإياك نستعين) يشير إلى أن الإنسان لا يستطيع طاعة الله إلا بمعونته وتوفيقه سبحانه.',
          category: 'تدبر قرآني',
          tags: ['الفاتحة', 'التوحيد', 'ابن القيم'],
          surahRef: 'الفاتحة: 5',
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0]
        }
      ];
    } catch {
      return [];
    }
  },

  saveNote(note: StudentNote): void {
    const list = this.getNotes().filter(n => n.id !== note.id);
    list.unshift(note);
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(list));
  },

  deleteNote(id: string): void {
    const list = this.getNotes().filter(n => n.id !== id);
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(list));
  },

  getMemorizationRecords(): Record<string, UserMemorizationRecord> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MEMORIZATION);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  saveMemorizationRecord(record: UserMemorizationRecord): void {
    const records = this.getMemorizationRecords();
    const key = `${record.surahId}:${record.ayahNumber}`;
    records[key] = record;
    localStorage.setItem(STORAGE_KEYS.MEMORIZATION, JSON.stringify(records));
  },

  getLastReadingPosition(): { surahId: number; ayahNumber: number; page: number } {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.READING_POSITION);
      return data ? JSON.parse(data) : { surahId: 1, ayahNumber: 1, page: 1 };
    } catch {
      return { surahId: 1, ayahNumber: 1, page: 1 };
    }
  },

  saveLastReadingPosition(surahId: number, ayahNumber: number, page: number): void {
    localStorage.setItem(
      STORAGE_KEYS.READING_POSITION,
      JSON.stringify({ surahId, ayahNumber, page, timestamp: Date.now() })
    );
  },

  getSettings(): UserSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: Partial<UserSettings>): UserSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    return updated;
  },

  getTasbeehCounts(): Record<string, number> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TASBEEH_COUNT);
      return data ? JSON.parse(data) : { total: 100, today: 33 };
    } catch {
      return { total: 0, today: 0 };
    }
  },

  saveTasbeehCount(total: number, today: number): void {
    localStorage.setItem(STORAGE_KEYS.TASBEEH_COUNT, JSON.stringify({ total, today, lastUpdated: new Date().toDateString() }));
  }
};
