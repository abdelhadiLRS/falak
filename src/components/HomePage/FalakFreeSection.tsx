import useTranslation from 'next-translate/useTranslation';

import styles from './FalakFreeSection.module.scss';

import Button, {
  ButtonShape,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '@/components/dls/Button/Button';

type Copy = {
  eyebrow: string;
  title: string;
  description: string;
  sourceNote: string;
  explore: string;
};

const COPY: Record<string, Copy> = {
  ar: {
    eyebrow: 'فلك — معرفة متاحة للجميع',
    title: 'تعلّم القرآن وعلومه مجانًا',
    description:
      'اقرأ، استمع، ابحث، وتعلّم من محتوى موثّق، دون اشتراك إجباري أو حواجز أمام المعرفة.',
    sourceNote: 'نوضح مصدر كل مادة وترخيص استخدامها كلما توفر.',
    explore: 'ابدأ رحلتك',
  },
  en: {
    eyebrow: 'Falak — knowledge for everyone',
    title: 'Learn the Quran and its sciences for free',
    description:
      'Read, listen, search, and learn from attributed content without mandatory subscriptions or barriers to knowledge.',
    sourceNote: 'We identify the source and usage terms for every collection whenever available.',
    explore: 'Start learning',
  },
};

const FREE_RESOURCES = [
  { key: 'noble-quran', href: '/1', label: { ar: 'القرآن الكريم', en: 'The Quran' } },
  { key: 'tafsir.title', href: '/1/1/tafsirs', label: { ar: 'التفسير', en: 'Tafsir' } },
  { key: 'tajweed', href: '/search?query=%D8%AA%D8%AC%D9%88%D9%8A%D8%AF', label: { ar: 'التجويد', en: 'Tajweed' } },
  { key: 'azkar', href: '/azkar', label: { ar: 'الأذكار', en: 'Azkar' } },
  { key: 'library', href: '/library', label: { ar: 'المكتبة', en: 'Library' } },
  { key: 'qibla', href: '/qibla', label: { ar: 'القبلة', en: 'Qibla' } },
  { key: 'prayer-times', href: '/prayer-times', label: { ar: 'مواقيت الصلاة', en: 'Prayer times' } },
  { key: 'audio', href: '/audio', label: { ar: 'التلاوة الصوتية', en: 'Audio recitation' } },
];

const FalakFreeSection = () => {
  const { lang } = useTranslation('common');
  const copy = COPY[lang] || COPY.en;

  return (
    <section className={styles.section} aria-labelledby="falak-free-title">
      <div className={styles.content}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h2 id="falak-free-title">{copy.title}</h2>
        <p className={styles.description}>{copy.description}</p>
        <p className={styles.sourceNote}>{copy.sourceNote}</p>
        <Button
          href="/search"
          size={ButtonSize.Medium}
          type={ButtonType.Primary}
          variant={ButtonVariant.Accent}
          shape={ButtonShape.Rounded}
        >
          {copy.explore}
        </Button>
      </div>

      <div className={styles.resources} aria-label={copy.title}>
        {FREE_RESOURCES.map((resource) => (
          <Button
            key={resource.key}
            href={resource.href}
            size={ButtonSize.Small}
            type={ButtonType.Secondary}
            variant={ButtonVariant.Outlined}
            shape={ButtonShape.Rounded}
          >
            {resource.label[lang as 'ar' | 'en'] || resource.label.en}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default FalakFreeSection;
