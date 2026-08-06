import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import styles from './library.module.scss';

import { getLocalCollectionCatalog } from '@/lib/local-content';

const LibraryPage: NextPage = () => {
  const collections = getLocalCollectionCatalog();

  return (
    <>
      <Head>
        <title>المكتبة الإسلامية | فلك</title>
        <meta
          name="description"
          content="استكشف مجموعات القرآن والحديث والتفسير والفقه والأذكار في مكتبة فلك المجانية."
        />
      </Head>
      <main className={styles.page}>
        <header className={styles.header}>
          <p>فلك — مكتبة إسلامية مجانية</p>
          <h1>المكتبة والمصادر</h1>
          <span>تصفح المحتوى حسب المجال، مع إبقاء كل مجموعة مرتبطة بمصدرها.</span>
        </header>
        <section className={styles.grid} aria-label="مجموعات المحتوى">
          {collections.map((collection) => (
            <article className={styles.card} key={collection.id}>
              <p className={styles.status}>حالة المصدر: {collection.source.verificationStatus}</p>
              <h2>{collection.title}</h2>
              <p>{collection.description}</p>
              <div className={styles.actions}>
                <Link href={`/api/content/${collection.id}`}>استعراض البيانات</Link>
                <Link href={`/api/content/${collection.id}?limit=10`}>عينة</Link>
              </div>
            </article>
          ))}
        </section>
        <p className={styles.assetLink}>
          <Link href="/api/assets">فهرس الصور والأيقونات والوسائط المحلية</Link>
        </p>
        <p className={styles.notice}>
          بعض المجموعات تحتاج مراجعة الترخيص والمصدر قبل اعتبارها منشورة علميًا. لا تُعد حالة
          «pending» توثيقًا نهائيًا.
        </p>
      </main>
    </>
  );
};

export default LibraryPage;
