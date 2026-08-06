import { useEffect, useState } from 'react';
import Head from 'next/head';

import styles from './qibla.module.scss';

type Result = { bearing: number; latitude: number; longitude: number };

const QiblaPage = () => {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('المتصفح لا يدعم تحديد الموقع');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const response = await fetch(
          `/api/qibla?latitude=${coords.latitude}&longitude=${coords.longitude}`,
        );
        if (!response.ok) {
          setError('تعذر حساب اتجاه القبلة');
          return;
        }
        setResult(await response.json());
      },
      () => setError('اسمح للموقع بالوصول إلى موقعك لحساب القبلة'),
    );
  }, []);

  return (
    <>
      <Head>
        <title>اتجاه القبلة | فلك</title>
      </Head>
      <main className={styles.page}>
        <p>فلك — أدوات مجانية</p>
        <h1>اتجاه القبلة</h1>
        {result ? (
          <section className={styles.card}>
            <div className={styles.compass} style={{ transform: `rotate(${result.bearing}deg)` }}>
              ↑
            </div>
            <strong>{result.bearing}° من الشمال</strong>
            <span>
              الموقع: {result.latitude.toFixed(3)}, {result.longitude.toFixed(3)}
            </span>
          </section>
        ) : (
          <p>{error || 'جارٍ تحديد موقعك وحساب الاتجاه...'}</p>
        )}
      </main>
    </>
  );
};

export default QiblaPage;
