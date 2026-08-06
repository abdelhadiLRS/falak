import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './library.module.scss';

const BooksPage = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`/api/books?search=${encodeURIComponent(search)}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setBooks(res.data.items || []);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search]);

  return (
    <>
      <Head>
        <title>مكتبة الكتب الإسلامية | فلك</title>
        <meta name="description" content="تصفح وتحميل أفضل الكتب الإسلامية الموثوقة بصيغة PDF ومختلف الصيغ الإلكترونية." />
      </Head>
      <div className={styles.pageContainer} style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>المكتبة الإسلامية الرقمية</h1>
          <p style={{ color: '#a0aec0' }}>تصفح وتحميل وقراءة أمهات الكتب والمصنفات الإسلامية مجاناً ومباشرة</p>
        </header>

        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="ابحث عن كتاب بالاسم، المؤلف، أو التصنيف..."
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
        ) : books.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#2d3748', borderRadius: '12px' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>لا توجد كتب مطابقة للبحث حالياً.</p>
            <p style={{ color: '#a0aec0' }}>يمكنك رفع وإضافة كتب جديدة عبر لوحة التحكم الخاصة بالإدارة.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {books.map((book) => (
              <article
                key={book.id}
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
                  {book.coverUrl && (
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }}
                    />
                  )}
                  <h2 style={{ fontSize: '1.25rem', color: '#ecc94b', marginBottom: '0.5rem', direction: 'rtl', textAlign: 'right' }}>
                    {book.title}
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: '#a0aec0', marginBottom: '1rem', direction: 'rtl', textAlign: 'right' }}>
                    المؤلف: {book.author}
                  </p>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#cbd5e0', marginBottom: '1rem', direction: 'rtl', textAlign: 'right' }}>
                    {book.description || 'لا يوجد وصف متاح.'}
                  </p>
                </div>
                <div style={{ borderTop: '1px solid #4a5568', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: '#cbd5e0' }}>{book.pages} صفحة</span>
                  <a
                    href={book.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#319795',
                      color: 'white',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                    }}
                  >
                    قراءة / تحميل
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BooksPage;
