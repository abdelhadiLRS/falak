import type { NextApiRequest, NextApiResponse } from 'next';

import {
  getLocalCollection,
  getLocalCollectionCatalog,
  getLocalContent,
  type ContentType,
  type LocalCollectionId,
} from '@/lib/local-content';

const CONTENT_TYPES: ContentType[] = ['azkar', 'tafsir-lessons', 'hadith-lessons'];

function getSingleQueryValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const type = getSingleQueryValue(req.query.type);
  if (type === 'catalog') {
    res.status(200).json({ collections: getLocalCollectionCatalog() });
    return;
  }
  const collectionId = type as LocalCollectionId;
  if (getLocalCollectionCatalog().some((collection) => collection.id === collectionId)) {
    try {
      const limitValue = getSingleQueryValue(req.query.limit);
      const limit = limitValue === undefined ? 50 : Number(limitValue);
      if (!Number.isInteger(limit)) {
        res.status(400).json({ message: 'الحد يجب أن يكون رقمًا صحيحًا' });
        return;
      }
      res.status(200).json(await getLocalCollection(collectionId, limit));
    } catch (error) {
      console.error('LOCAL_COLLECTION_ERROR:', error);
      res.status(500).json({ message: 'تعذر تحميل مجموعة المحتوى المحلية' });
    }
    return;
  }
  if (!type || !CONTENT_TYPES.includes(type as ContentType)) {
    res.status(400).json({
      message: 'نوع المحتوى غير صالح',
      supportedTypes: ['catalog', ...getLocalCollectionCatalog().map((collection) => collection.id)],
    });
    return;
  }

  const levelValue = getSingleQueryValue(req.query.level);
  const level = levelValue === undefined ? undefined : Number(levelValue);
  const limitValue = getSingleQueryValue(req.query.limit);
  const limit = limitValue === undefined ? undefined : Number(limitValue);

  if ((level !== undefined && !Number.isInteger(level)) || (limit !== undefined && !Number.isInteger(limit))) {
    res.status(400).json({ message: 'المستوى أو الحد يجب أن يكون رقمًا صحيحًا' });
    return;
  }

  try {
    const result = await getLocalContent(type as ContentType, {
      category: getSingleQueryValue(req.query.category),
      level,
      limit,
    });
    res.status(200).json(result);
  } catch (error) {
    console.error('LOCAL_CONTENT_ERROR:', error);
    res.status(500).json({ message: 'تعذر تحميل المحتوى المحلي' });
  }
}
