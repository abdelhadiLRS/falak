import { useState } from 'react';
import Head from 'next/head';

import styles from './audio.module.scss';

const RECITERS = [
  ['ar.alafasy', 'مشاري راشد العفاسي'],
  ['ar.abdulbasitmurattal', 'عبد الباسط عبد الصمد'],
  ['ar.abdurrahmaansudais', 'عبد الرحمن السديس'],
  ['ar.husary', 'محمود خليل الحصري'],
  ['ar.minshawi', 'محمد صديق المنشاوي'],
];

const AudioPage = () => {
  const [reciter, setReciter] = useState(RECITERS[0][0]);
  const [surah, setSurah] = useState('1');
  const [ayah, setAyah] = useState('1');
  const [scope, setScope] = useState('surah');
  const [audioUrls, setAudioUrls] = useState<string[]>([]);

  const loadAudio = async () => {
    const response = await fetch(
      `/api/quran-audio?scope=${scope}&surah=${surah}&ayah=${ayah}&reciter=${reciter}`,
    );
    if (!response.ok) return;
    const payload = await response.json();
    const ayahs = payload.data?.ayahs || (payload.data ? [payload.data] : []);
    setAudioUrls(ayahs.map((item: { audio?: string }) => item.audio).filter(Boolean).slice(0, 100));
  };

  return (
    <>
      <Head>
        <title>تلاوة القرآن | فلك</title>
      </Head>
      <main className={styles.page}>
        <p>فلك — استماع مجاني</p>
        <h1>تلاوة القرآن الكريم</h1>
        <div className={styles.controls}>
          <label>
            نوع التلاوة
            <select value={scope} onChange={(event) => setScope(event.target.value)}>
              <option value="verse">آية منفردة</option>
              <option value="surah">سورة كاملة</option>
              <option value="full">المصحف كاملًا</option>
            </select>
          </label>
          <label>
            القارئ
            <select value={reciter} onChange={(event) => setReciter(event.target.value)}>
              {RECITERS.map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label>
            رقم السورة
            <input min="1" max="114" value={surah} onChange={(event) => setSurah(event.target.value)} />
          </label>
          {scope === 'verse' && (
            <label>
              رقم الآية
              <input min="1" value={ayah} onChange={(event) => setAyah(event.target.value)} />
            </label>
          )}
          <button type="button" onClick={loadAudio}>
            تشغيل السورة
          </button>
        </div>
        {audioUrls.map((audioUrl, index) => (
          <div className={styles.track} key={audioUrl}>
            <span>{scope === 'verse' ? `الآية ${ayah}` : `المقطع ${index + 1}`}</span>
            <audio controls autoPlay={index === 0} src={audioUrl} />
          </div>
        ))}
        <p className={styles.note}>يمكن استخدام API نفسه للتلاوة بآية أو بالمصحف كاملًا.</p>
      </main>
    </>
  );
};

export default AudioPage;
