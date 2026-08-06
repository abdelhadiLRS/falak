import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './library.module.scss';

const ArticlesPage = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`/api/articles?search=${encodeURIComponent(search)}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setArticles(res.data.items || []);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search]);

  return (
    <>
      <Head>
        <title>المقالات الإسلامية والدعوية | فلك</title>
        <meta name="description" content="اقرأ مئات المقالات الفقهية والدعوية والتربوية والاجتماعية المكتوبة بدقة وموثوقية." />
      </Head>
      <div className={styles.pageContainer} style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>المقالات والمباحث الإسلامية</h1>
          <p style={{ color: '#a0aec0' }}>مقالات علمية ودعوية وفقهية تهدف لنشر الوعي والمعرفة الشرعية الصحيحة</p>
        </header>

        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="ابحث عن مقال بالعنوان أو الكاتب أو المحتوى..."
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
        ) : articles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#2d3748', borderRadius: '12px' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>لا توجد مقالات مطابقة للبحث حالياً.</p>
            <p style={{ color: '#a0aec0' }}>بإمكان المشرفين إضافة ونشر مقالات جديدة وموثوقة عبر لوحة التحكم.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {articles.map((article) => (
              <article
                key={article.id}
                style={{
                  padding: '2rem',
                  backgroundColor: '#2d3748',
                  borderRadius: '12px',
                  border: '1px solid #4a5568',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ backgroundColor: '#2b6cb0', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem' }}>
                    التصنيف: {article.category}
                  </span>
                  <span style={{ color: '#cbd5e0', fontSize: '0.9rem' }}>
                    الكاتب: {article.author}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.5rem', color: '#ecc94b', marginBottom: '1rem', direction: 'rtl', textAlign: 'right' }}>
                  {article.title}
                </h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#cbd5e0', direction: 'rtl', textAlign: 'justify' }}>
                  {article.content}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ArticlesPage;
