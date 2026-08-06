import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './library.module.scss';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'hadiths' | 'books' | 'articles' | 'fatwas' | 'lessons'>('hadiths');
  const [hadiths, setHadiths] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [fatwas, setFatwas] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);

  // Form states
  const [hadithForm, setHadithForm] = useState({ bookName: '', chapterName: '', hadithText: '', narrator: '', grade: 'صحيح', reference: '' });
  const [bookForm, setBookForm] = useState({ title: '', author: '', category: '', language: 'العربية', pages: '', publishYear: '', publisher: '', fileUrl: '', coverUrl: '', description: '' });
  const [articleForm, setArticleForm] = useState({ title: '', content: '', category: 'عامة', author: '' });
  const [fatwaForm, setFatwaForm] = useState({ question: '', answer: '', mufti: '', category: '' });
  const [lessonForm, setLessonForm] = useState({ title: '', category: '', teacher: '', videoUrl: '', audioUrl: '', pdfUrl: '', description: '' });

  const fetchTabContent = () => {
    fetch(`/api/${activeTab}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          if (activeTab === 'hadiths') setHadiths(res.data.items || []);
          if (activeTab === 'books') setBooks(res.data.items || []);
          if (activeTab === 'articles') setArticles(res.data.items || []);
          if (activeTab === 'fatwas') setFatwas(res.data.items || []);
          if (activeTab === 'lessons') setLessons(res.data.items || []);
        }
      });
  };

  useEffect(() => {
    fetchTabContent();
  }, [activeTab]);

  const handleSubmit = async (e: React.FormEvent, endpoint: string, body: any, setForm: any, initialForm: any) => {
    e.preventDefault();
    const res = await fetch(`/api/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.success) {
      alert('تمت الإضافة بنجاح!');
      setForm(initialForm);
      fetchTabContent();
    } else {
      alert('حدث خطأ: ' + data.error);
    }
  };

  return (
    <>
      <Head>
        <title>لوحة التحكم والإشراف | فلك</title>
      </Head>
      <div className={styles.pageContainer} style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>لوحة التحكم والإشراف والمحتوى</h1>
          <p style={{ color: '#a0aec0' }}>إدارة القرآن الكريم، التفاسير، الأحاديث، الكتب، المقالات، الفتاوى والدروس</p>
        </header>

        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', marginBottom: '2rem', paddingBottom: '0.5rem', justifyContent: 'center' }}>
          {(['hadiths', 'books', 'articles', 'fatwas', 'lessons'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeTab === tab ? '#319795' : '#2d3748',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            >
              {tab === 'hadiths' && 'إدارة الأحاديث 🎙️'}
              {tab === 'books' && 'إدارة الكتب 📚'}
              {tab === 'articles' && 'إدارة المقالات 📄'}
              {tab === 'fatwas' && 'إدارة الفتاوى ⚖️'}
              {tab === 'lessons' && 'إدارة الدروس 📺'}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Add form */}
          <section style={{ backgroundColor: '#2d3748', padding: '1.5rem', borderRadius: '12px', border: '1px solid #4a5568' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#ecc94b', marginBottom: '1.5rem', textAlign: 'right' }}>إضافة مادة جديدة</h2>

            {activeTab === 'hadiths' && (
              <form onSubmit={(e) => handleSubmit(e, 'hadiths', hadithForm, setHadithForm, { bookName: '', chapterName: '', hadithText: '', narrator: '', grade: 'صحيح', reference: '' })} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', direction: 'rtl' }}>
                <input type="text" placeholder="اسم كتاب الحديث (مثال: صحيح البخاري)" value={hadithForm.bookName} onChange={(e) => setHadithForm({ ...hadithForm, bookName: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <input type="text" placeholder="الباب أو الفصل" value={hadithForm.chapterName} onChange={(e) => setHadithForm({ ...hadithForm, chapterName: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <textarea placeholder="نص الحديث الشريف..." value={hadithForm.hadithText} onChange={(e) => setHadithForm({ ...hadithForm, hadithText: e.target.value })} required rows={4} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <input type="text" placeholder="الراوي" value={hadithForm.narrator} onChange={(e) => setHadithForm({ ...hadithForm, narrator: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <input type="text" placeholder="درجة الحديث (صحيح، حسن، إلخ)" value={hadithForm.grade} onChange={(e) => setHadithForm({ ...hadithForm, grade: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <input type="text" placeholder="التخريج والمصدر" value={hadithForm.reference} onChange={(e) => setHadithForm({ ...hadithForm, reference: e.target.value })} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <button type="submit" style={{ padding: '0.75rem', borderRadius: '6px', border: 'none', backgroundColor: '#319795', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>حفظ ومشاركة</button>
              </form>
            )}

            {activeTab === 'books' && (
              <form onSubmit={(e) => handleSubmit(e, 'books', bookForm, setBookForm, { title: '', author: '', category: '', language: 'العربية', pages: '', publishYear: '', publisher: '', fileUrl: '', coverUrl: '', description: '' })} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', direction: 'rtl' }}>
                <input type="text" placeholder="عنوان الكتاب" value={bookForm.title} onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <input type="text" placeholder="المؤلف" value={bookForm.author} onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <input type="text" placeholder="التصنيف (مثال: عقيدة، فقه، سيرة)" value={bookForm.category} onChange={(e) => setBookForm({ ...bookForm, category: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <input type="number" placeholder="عدد الصفحات" value={bookForm.pages} onChange={(e) => setBookForm({ ...bookForm, pages: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <input type="number" placeholder="سنة النشر" value={bookForm.publishYear} onChange={(e) => setBookForm({ ...bookForm, publishYear: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <input type="text" placeholder="دار النشر" value={bookForm.publisher} onChange={(e) => setBookForm({ ...bookForm, publisher: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <input type="text" placeholder="رابط الملف الإلكتروني (PDF)" value={bookForm.fileUrl} onChange={(e) => setBookForm({ ...bookForm, fileUrl: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <input type="text" placeholder="رابط صورة الغلاف" value={bookForm.coverUrl} onChange={(e) => setBookForm({ ...bookForm, coverUrl: e.target.value })} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <textarea placeholder="وصف قصير عن الكتاب..." value={bookForm.description} onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })} rows={3} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <button type="submit" style={{ padding: '0.75rem', borderRadius: '6px', border: 'none', backgroundColor: '#319795', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>حفظ ومشاركة</button>
              </form>
            )}

            {activeTab === 'articles' && (
              <form onSubmit={(e) => handleSubmit(e, 'articles', articleForm, setArticleForm, { title: '', content: '', category: 'عامة', author: '' })} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', direction: 'rtl' }}>
                <input type="text" placeholder="عنوان المقال" value={articleForm.title} onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <input type="text" placeholder="الكاتب" value={articleForm.author} onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <input type="text" placeholder="التصنيف (مثال: دعوية، تربوية)" value={articleForm.category} onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <textarea placeholder="محتوى المقال كاملاً..." value={articleForm.content} onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })} required rows={6} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <button type="submit" style={{ padding: '0.75rem', borderRadius: '6px', border: 'none', backgroundColor: '#319795', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>حفظ ونشر</button>
              </form>
            )}

            {activeTab === 'fatwas' && (
              <form onSubmit={(e) => handleSubmit(e, 'fatwas', fatwaForm, setFatwaForm, { question: '', answer: '', mufti: '', category: '' })} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', direction: 'rtl' }}>
                <textarea placeholder="السؤال المطروح..." value={fatwaForm.question} onChange={(e) => setFatwaForm({ ...fatwaForm, question: e.target.value })} required rows={3} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <textarea placeholder="إجابة المفتي بالتفصيل..." value={fatwaForm.answer} onChange={(e) => setFatwaForm({ ...fatwaForm, answer: e.target.value })} required rows={5} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <input type="text" placeholder="اسم الشيخ المفتي" value={fatwaForm.mufti} onChange={(e) => setFatwaForm({ ...fatwaForm, mufti: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <input type="text" placeholder="التصنيف (مثال: عبادات، معاملات)" value={fatwaForm.category} onChange={(e) => setFatwaForm({ ...fatwaForm, category: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <button type="submit" style={{ padding: '0.75rem', borderRadius: '6px', border: 'none', backgroundColor: '#319795', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>حفظ ونشر الفتوى</button>
              </form>
            )}

            {activeTab === 'lessons' && (
              <form onSubmit={(e) => handleSubmit(e, 'lessons', lessonForm, setLessonForm, { title: '', category: '', teacher: '', videoUrl: '', audioUrl: '', pdfUrl: '', description: '' })} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', direction: 'rtl' }}>
                <input type="text" placeholder="عنوان الدرس أو المحاضرة" value={lessonForm.title} onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <input type="text" placeholder="المدرس / الشيخ" value={lessonForm.teacher} onChange={(e) => setLessonForm({ ...lessonForm, teacher: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <input type="text" placeholder="التصنيف (مثال: فقه السيرة، التفسير)" value={lessonForm.category} onChange={(e) => setLessonForm({ ...lessonForm, category: e.target.value })} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <input type="text" placeholder="رابط الفيديو (YouTube)" value={lessonForm.videoUrl} onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <input type="text" placeholder="رابط الملف الصوتي (MP3)" value={lessonForm.audioUrl} onChange={(e) => setLessonForm({ ...lessonForm, audioUrl: e.target.value })} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <input type="text" placeholder="رابط ملخص الدرس (PDF)" value={lessonForm.pdfUrl} onChange={(e) => setLessonForm({ ...lessonForm, pdfUrl: e.target.value })} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <textarea placeholder="وصف وتفاصيل الدرس..." value={lessonForm.description} onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })} rows={3} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #4a5568', backgroundColor: '#1a202c', color: 'white' }} />
                <button type="submit" style={{ padding: '0.75rem', borderRadius: '6px', border: 'none', backgroundColor: '#319795', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>حفظ ومشاركة الدرس</button>
              </form>
            )}
          </section>

          {/* List and manage items */}
          <section style={{ backgroundColor: '#2d3748', padding: '1.5rem', borderRadius: '12px', border: '1px solid #4a5568', overflowY: 'auto', maxHeight: '600px' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#ecc94b', marginBottom: '1.5rem', textAlign: 'right' }}>المواد المضافة حالياً</h2>

            {activeTab === 'hadiths' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {hadiths.map((h) => (
                  <div key={h.id} style={{ padding: '1rem', backgroundColor: '#1a202c', borderRadius: '8px', textAlign: 'right', direction: 'rtl' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#319795' }}>{h.narrator}</h3>
                    <p style={{ fontSize: '0.95rem', margin: '0.5rem 0' }}>{h.hadithText}</p>
                    <span style={{ fontSize: '0.8rem', color: '#ecc94b' }}>الدرجة: {h.grade}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'books' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {books.map((b) => (
                  <div key={b.id} style={{ padding: '1rem', backgroundColor: '#1a202c', borderRadius: '8px', textAlign: 'right', direction: 'rtl' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#319795' }}>{b.title}</h3>
                    <p style={{ fontSize: '0.95rem', margin: '0.5rem 0' }}>الكاتب: {b.author}</p>
                    <span style={{ fontSize: '0.8rem', color: '#ecc94b' }}>التصنيف: {b.category}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'articles' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {articles.map((a) => (
                  <div key={a.id} style={{ padding: '1rem', backgroundColor: '#1a202c', borderRadius: '8px', textAlign: 'right', direction: 'rtl' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#319795' }}>{a.title}</h3>
                    <p style={{ fontSize: '0.95rem', margin: '0.5rem 0' }}>الكاتب: {a.author}</p>
                    <span style={{ fontSize: '0.8rem', color: '#ecc94b' }}>التصنيف: {a.category}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'fatwas' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {fatwas.map((f) => (
                  <div key={f.id} style={{ padding: '1rem', backgroundColor: '#1a202c', borderRadius: '8px', textAlign: 'right', direction: 'rtl' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#319795' }}>السؤال: {f.question}</h3>
                    <p style={{ fontSize: '0.95rem', margin: '0.5rem 0' }}>المفتي: {f.mufti}</p>
                    <span style={{ fontSize: '0.8rem', color: '#ecc94b' }}>التصنيف: {f.category}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'lessons' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {lessons.map((l) => (
                  <div key={l.id} style={{ padding: '1rem', backgroundColor: '#1a202c', borderRadius: '8px', textAlign: 'right', direction: 'rtl' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#319795' }}>{l.title}</h3>
                    <p style={{ fontSize: '0.95rem', margin: '0.5rem 0' }}>الشيخ: {l.teacher}</p>
                    <span style={{ fontSize: '0.8rem', color: '#ecc94b' }}>التصنيف: {l.category}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
