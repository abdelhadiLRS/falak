import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './library.module.scss';

const LessonsPage = () => {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`/api/lessons?search=${encodeURIComponent(search)}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setLessons(res.data.items || []);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search]);

  return (
    <>
      <Head>
        <title>الدروس والمحاضرات والبودكاست | فلك</title>
        <meta name="description" content="استمع وشاهد المئات من الدروس والمحاضرات والملفات الصوتية والمرئية الإسلامية." />
      </Head>
      <div className={styles.pageContainer} style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>الدروس والمحاضرات والبودكاست</h1>
          <p style={{ color: '#a0aec0' }}>محاضرات مرئية وصوتية متكاملة لطلب العلم الشرعي ونشر الهداية والوعي</p>
        </header>

        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="ابحث عن درس أو محاضرة بالاسم، الشيخ، أو التصنيف..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: '1px solid #4a5568',
              backgroundColor: '#2d3748',
              color: 'white',
              width: '100%',
              maxWidth: '600px',
              fontSize: '1rem',
              outline: 'none',
            }}
          />
        </div>

        {loading ? (
          <p style={{ textAlign: 'center' }}>جاري التحميل...</p>
        ) : lessons.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#2d3748', borderRadius: '12px' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>لا توجد دروس أو محاضرات مطابقة للبحث حالياً.</p>
            <p style={{ color: '#a0aec0' }}>بإمكان المشرفين إضافة ورفع مواد تعليمية وبودكاست إسلامي جديد عبر لوحة التحكم.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {lessons.map((lesson) => (
              <article
                key={lesson.id}
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#2d3748',
                  borderRadius: '12px',
                  border: '1px solid #4a5568',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ backgroundColor: '#2b6cb0', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem' }}>
                      {lesson.category}
                    </span>
                    <span style={{ color: '#ecc94b', fontSize: '0.9rem' }}>
                      الشيخ: {lesson.teacher}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.25rem', color: '#ecc94b', marginBottom: '1rem', direction: 'rtl', textAlign: 'right' }}>
                    {lesson.title}
                  </h2>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#cbd5e0', marginBottom: '1.5rem', direction: 'rtl', textAlign: 'right' }}>
                    {lesson.description || 'لا يوجد وصف متاح لهذا الدرس حالياً.'}
                  </p>
                </div>
                <div style={{ borderTop: '1px solid #4a5568', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {lesson.videoUrl && (
                    <a
                      href={lesson.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '0.5rem',
                        backgroundColor: '#e53e3e',
                        color: 'white',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        textAlign: 'center',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                      }}
                    >
                      مشاهدة الفيديو 📺
                    </a>
                  )}
                  {lesson.audioUrl && (
                    <a
                      href={lesson.audioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '0.5rem',
                        backgroundColor: '#319795',
                        color: 'white',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        textAlign: 'center',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                      }}
                    >
                      استماع للملف الصوتي 🎙️
                    </a>
                  )}
                  {lesson.pdfUrl && (
                    <a
                      href={lesson.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '0.5rem',
                        backgroundColor: '#4a5568',
                        color: 'white',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        textAlign: 'center',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                      }}
                    >
                      تحميل ملف الملخص PDF 📄
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default LessonsPage;
