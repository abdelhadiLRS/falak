import { useEffect, useState } from 'react';
import Head from 'next/head';

import styles from './prayer-times.module.scss';

const PRAYERS = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

const PrayerTimesPage = () => {
  const [timings, setTimings] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      async ({ coords }) => {
        const response = await fetch(
          `/api/prayer-times?latitude=${coords.latitude}&longitude=${coords.longitude}`,
        );
        if (!response.ok) {
          setError('تعذر تحميل مواقيت الصلاة');
          return;
        }
        const payload = await response.json();
        setTimings(payload.data?.timings || null);
      },
      () => setError('اسمح للموقع بالوصول إلى موقعك لحساب المواقيت'),
    );
  }, []);

  return (
    <>
      <Head>
        <title>مواقيت الصلاة | فلك</title>
      </Head>
      <main className={styles.page}>
        <p>فلك — مواقيت مجانية حسب موقعك</p>
        <h1>مواقيت الصلاة</h1>
        {timings ? (
          <section className={styles.grid}>
            {PRAYERS.map((prayer) => (
              <div className={styles.card} key={prayer}>
                <span>{prayer}</span>
                <strong>{timings[prayer]}</strong>
              </div>
            ))}
          </section>
        ) : (
          <p>{error || 'جارٍ تحميل المواقيت...'}</p>
        )}
      </main>
    </>
  );
};

export default PrayerTimesPage;
