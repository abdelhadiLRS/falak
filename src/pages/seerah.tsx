import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './library.module.scss';

const SeerahPage = () => {
  const [timeline, setTimeline] = useState<any[]>([
    { id: 1, yearHijri: -53, title: 'الميلاد الشريف', description: 'ولد النبي محمد ﷺ في مكة المكرمة في عام الفيل، يتيم الأب، وتوفيت أمه آمنة بنت وهب وهو في السادسة من عمره.' },
    { id: 2, yearHijri: -13, title: 'بعثته ونزول الوحي', description: 'نزل الوحي على الرسول ﷺ في غار حراء وهو في الأربعين من عمره، وبدأت الدعوة السرية ثم الجهرية بالإسلام.' },
    { id: 3, yearHijri: 1, title: 'الهجرة النبوية المباركة', description: 'هاجر النبي ﷺ والمسلمون من مكة إلى المدينة المنورة (يثرِب)، حيث أسس المسجد النبوي ودستور المدينة وبناء الدولة الإسلامية.' },
    { id: 4, yearHijri: 2, title: 'غزوة بدر الكبرى', description: 'أول معركة حاسمة بين المسلمين وقريش، انتصر فيها المسلمون رغم قلة عددهم وعتادهم بتأييد من الله عز وجل.' },
    { id: 5, yearHijri: 8, title: 'فتح مكة المكرمة', description: 'دخل الرسول ﷺ والمسلمون مكة فاتحين تائبين منتصرين، وهدموا الأصنام حول الكعبة معلناً التسامح والعفو العام.' },
    { id: 6, yearHijri: 11, title: 'الوفاة الشريفة والرفيق الأعلى', description: 'توفي الرسول ﷺ في المدينة المنورة بعد إتمام الرسالة ونزول كامل القرآن الكريم، ودفن في حجرة السيدة عائشة رضي الله عنها.' }
  ]);

  return (
    <>
      <Head>
        <title>السيرة النبوية المطهرة | فلك</title>
        <meta name="description" content="استكشف أحداث وغزوات وشخصيات السيرة النبوية الشريفة عبر خط زمني متكامل تفاعلي." />
      </Head>
      <div className={styles.pageContainer} style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>السيرة النبوية العطرة</h1>
          <p style={{ color: '#a0aec0' }}>خط زمني تفاعلي يستعرض أهم الأحداث والدروس والمواقف من ميلاد خير البرية ﷺ إلى وفاته</p>
        </header>

        <div style={{ position: 'relative', borderLeft: '4px solid #319795', marginLeft: '2rem', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {timeline.map((event) => (
            <div key={event.id} style={{ position: 'relative' }}>
              {/* Timeline dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '-calc(2rem + 10px)',
                  top: '0.25rem',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#319795',
                  border: '4px solid #1a202c',
                  zIndex: 2,
                }}
              />
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#2d3748',
                  borderRadius: '12px',
                  border: '1px solid #4a5568',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h2 style={{ fontSize: '1.4rem', color: '#ecc94b', margin: 0 }}>{event.title}</h2>
                  <span style={{ backgroundColor: '#2b6cb0', padding: '0.25rem 0.75rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    {event.yearHijri < 0 ? `${Math.abs(event.yearHijri)} سنة قبل الهجرة` : `${event.yearHijri} هجرية`}
                  </span>
                </div>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#e2e8f0', margin: 0, textAlign: 'justify', direction: 'rtl' }}>
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SeerahPage;
