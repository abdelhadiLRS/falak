import React, { useState } from 'react';
import {
  GraduationCap,
  Bookmark,
  FileText,
  Plus,
  Trash2,
  Edit3,
  Check,
  Save,
  Tag,
  Search,
  BookOpen
} from 'lucide-react';
import { StudentNote, Bookmark as BookmarkType } from '../../types';
import { StorageService } from '../../services/storageService';

export const StudentWorkspaceModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notes' | 'bookmarks'>('notes');
  const [notes, setNotes] = useState<StudentNote[]>(() => StorageService.getNotes());
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>(() => StorageService.getBookmarks());
  const [searchQuery, setSearchQuery] = useState('');

  // New note state
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState('تدبر قرآني');
  const [newNoteSurahRef, setNewNoteSurahRef] = useState('');

  const handleSaveNewNote = () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;

    const note: StudentNote = {
      id: `note-${Date.now()}`,
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      category: newNoteCategory,
      tags: [newNoteCategory],
      surahRef: newNoteSurahRef.trim() || undefined,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    StorageService.saveNote(note);
    setNotes(StorageService.getNotes());
    setIsAddingNote(false);
    setNewNoteTitle('');
    setNewNoteContent('');
    setNewNoteSurahRef('');
  };

  const handleDeleteNote = (id: string) => {
    StorageService.deleteNote(id);
    setNotes(StorageService.getNotes());
  };

  const handleDeleteBookmark = (id: string) => {
    StorageService.removeBookmark(id);
    setBookmarks(StorageService.getBookmarks());
  };

  const filteredNotes = notes.filter(n =>
    n.title.includes(searchQuery) ||
    n.content.includes(searchQuery) ||
    n.category.includes(searchQuery)
  );

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-xs font-semibold text-emerald-200">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>مساحة التعلم الذاتي وتدوين اللطائف والفوائد</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-arabic-heading">
          دفتر طالب العلم والمحفوظات المرجعية
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
          احتفظ بلطائفك وتأملاتك القرآنية، والعلامات المرجعية للسور والآيات، ونسق رحلتك العلمية في مكان واحد آمن.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'notes'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            دفتر الملاحظات والتدبر ({notes.length})
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'bookmarks'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            العلامات المرجعية المحفوظة ({bookmarks.length})
          </button>
        </div>

        {activeTab === 'notes' && (
          <button
            onClick={() => setIsAddingNote(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>تدوين فائدة جديدة</span>
          </button>
        )}
      </div>

      {activeTab === 'notes' ? (
        <div className="space-y-4">
          {/* New Note Form */}
          {isAddingNote && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-500 shadow-xl space-y-4 animate-fade-in">
              <h3 className="font-bold text-base text-slate-900 dark:text-white font-arabic-heading">
                إضافة لطيفة أو مسألة علمية
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="عنوان الفائدة (مثال: من هدايات سورة الإخلاص)"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none"
                />
                <input
                  type="text"
                  placeholder="المرجع القرآني أو الحديثي (مثال: الإخلاص: 1-4)"
                  value={newNoteSurahRef}
                  onChange={(e) => setNewNoteSurahRef(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>

              <textarea
                placeholder="اكتب خلاصة تدبرك أو الفائدة المستنبطة من كتب أهل العلم..."
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none leading-relaxed"
              />

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => setIsAddingNote(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleSaveNewNote}
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ في الدفتر</span>
                </button>
              </div>
            </div>
          )}

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                      {note.category}
                    </span>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                      title="حذف الفائدة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white font-arabic-heading">
                    {note.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {note.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  {note.surahRef && (
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                      المرجع: {note.surahRef}
                    </span>
                  )}
                  <span>تاريخ التدوين: {note.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        
        /* Bookmarks List */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {bookmarks.map((bm) => (
            <div
              key={bm.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white font-arabic-heading">
                    سورة {bm.surahName}
                  </span>
                  <button
                    onClick={() => handleDeleteBookmark(bm.id)}
                    className="text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-500">
                  الآية {bm.ayahNumber} • الصفحة {bm.page}
                </p>
                {bm.note && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic pt-1">
                    "{bm.note}"
                  </p>
                )}
              </div>

              <span className="text-[10px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 block">
                حُفظ في {bm.createdDate}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
