import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './library.module.scss';

const FatwasPage = () => {
  const [fatwas, setFatwas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`/api/fatwas?search=${encodeURIComponent(search)}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setFatwas(res.data.items || []);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search]);

  return (
    <>
      <Head>
        <title>الفتاوى الشرعية | فلك</title>
        <meta name="description" content="البحث والاستعراض في الفتاوى الفقهية والشرعية الموثوقة." />
      </Head>
      <div className={styles.pageContainer} style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>الفتاوى الشرعية</h1>
          <p style={{ color: '#a0aec0' }}>البحث الفوري في الفتاوى والمسائل الفقهية الموثوقة الصادرة عن كبار العلماء والمفتين</p>
        </header>

        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="ابحث عن فتوى أو مسألة فقهية..."
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
        ) : fatwas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#2d3748', borderRadius: '12px' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>لا توجد فتاوى مطابقة للبحث حالياً.</p>
            <p style={{ color: '#a0aec0' }}>يمكن للمشرفين والعلماء إضافة فتاوى جديدة من لوحة التحكم.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {fatwas.map((fatwa) => (
              <article
                key={fatwa.id}
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#2d3748',
                  borderRadius: '12px',
                  border: '1px solid #4a5568',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ backgroundColor: '#2b6cb0', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem' }}>
                    التصنيف: {fatwa.category}
                  </span>
                  <span style={{ color: '#ecc94b', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    المفتي: {fatwa.mufti}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.25rem', color: '#ecc94b', marginBottom: '1rem', textAlign: 'right', direction: 'rtl' }}>
                  السؤال: {fatwa.question}
                </h2>
                <div style={{ borderTop: '1px solid #4a5568', paddingTop: '1rem', textAlign: 'right', direction: 'rtl' }}>
                  <h3 style={{ fontSize: '1.1rem', color: '#319795', marginBottom: '0.5rem' }}>الإجابة:</h3>
                  <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#cbd5e0' }}>{fatwa.answer}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FatwasPage;
