import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import styles from './azkar.module.scss';

import { getLocalContent } from '@/lib/local-content';

type AzkarItem = {
  id: number;
  category: string;
  text: string;
  description?: string;
  count?: number;
  reference?: string;
};

type Props = {
  items: AzkarItem[];
  source: {
    title: string;
    path: string;
    verificationStatus: 'pending';
  };
};

const AzkarPage: NextPage<Props> = ({ items, source }) => (
  <>
    <Head>
      <title>الأذكار | فلك</title>
      <meta
        name="description"
        content="أذكار مرتبة مع عدد التكرار والمرجع ضمن منصة فلك المجانية."
      />
    </Head>
    <main className={styles.page}>
      <header className={styles.header}>
        <p>فلك — معرفة مجانية موثقة</p>
        <h1>الأذكار</h1>
        <span>المصدر: {source.title}</span>
      </header>
      <section className={styles.list} aria-label="قائمة الأذكار">
        {items.map((item) => (
          <article className={styles.card} key={item.id}>
            <p className={styles.category}>{item.category}</p>
            <p className={styles.text}>{item.text}</p>
            {item.description && <p className={styles.description}>{item.description}</p>}
            <footer>
              {item.count ? <span>التكرار: {item.count}</span> : null}
              {item.reference ? <span>المرجع: {item.reference}</span> : null}
            </footer>
          </article>
        ))}
      </section>
      <p className={styles.notice}>
        حالة التحقق الحالية للمصدر: {source.verificationStatus}. راجع المرجع قبل اعتماد أي معلومة
        شرعية.
      </p>
    </main>
  </>
);

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const content = await getLocalContent('azkar', { limit: 50 });
  return {
    props: {
      items: content.items,
      source: content.source,
    },
  };
};

export default AzkarPage;
