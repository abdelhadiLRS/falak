import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import styles from './library.module.scss';
import Link from '@/components/dls/Link/Link';

const HadithsPage = () => {
  const { t } = useTranslation('common');
  const [hadiths, setHadiths] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`/api/hadiths?search=${encodeURIComponent(search)}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setHadiths(res.data.items || []);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search]);

  return (
    <>
      <Head>
        <title>الأحاديث النبوية الشريفة | فلك</title>
        <meta name="description" content="تصفح وابحث في كتب الأحاديث النبوية الشريفة والسنّة النبوية المطهرة." />
      </Head>
      <div className={styles.pageContainer} style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>الأحاديث النبوية الشريفة</h1>
          <p style={{ color: '#a0aec0' }}>البحث في كتب الحديث والأبواب والراوي مع درجة صحة الحديث وتخريجه</p>
        </header>

        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="ابحث عن حديث (مثال: إنما الأعمال بالنيات)..."
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
        ) : hadiths.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#2d3748', borderRadius: '12px' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>لا توجد أحاديث مطابقة للبحث حالياً.</p>
            <p style={{ color: '#a0aec0' }}>يمكنك إضافة أحاديث جديدة من خلال لوحة التحكم الخاصة بالإدارة.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {hadiths.map((hadith) => (
              <article
                key={hadith.id}
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#2d3748',
                  borderRadius: '12px',
                  border: '1px solid #4a5568',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ backgroundColor: '#319795', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem' }}>
                    {hadith.bookName}
                  </span>
                  <span style={{ color: '#ecc94b', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    الدرجة: {hadith.grade}
                  </span>
                </div>
                <p style={{ fontSize: '1.25rem', lineHeight: '2', marginBottom: '1rem', textAlign: 'right', direction: 'rtl' }}>
                  {hadith.hadithText}
                </p>
                <div style={{ borderTop: '1px solid #4a5568', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#cbd5e0', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span>الراوي: {hadith.narrator}</span>
                  <span>التخريج: {hadith.reference || 'غير متوفر'}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HadithsPage;
