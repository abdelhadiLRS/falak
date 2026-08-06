import type { NextApiRequest, NextApiResponse } from 'next';

import { loadQuranAyahs, searchQuranText } from '@/lib/quran-search-engine';

type SearchApiResponse =
  | ReturnType<typeof searchQuranText> & { message: string }
  | { message: string; results: []; source: ReturnType<typeof searchQuranText>['source'] };

const source = {
  id: 'quraan-json-master',
  title: 'Local Quran dataset (Quraan_json-master)',
  path: 'db/Quraan_json-master',
  verificationStatus: 'pending' as const,
};

function getLimit(value: string | string[] | undefined): number {
  const parsed = Number(Array.isArray(value) ? value[0] : value);
  return Math.min(Math.max(Number.isFinite(parsed) ? parsed : 10, 1), 25);
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<SearchApiResponse>,
) {
  const queryValue =
    request.method === 'POST'
      ? request.body?.query || request.body?.prompt
      : request.query.q;
  const query = String(Array.isArray(queryValue) ? queryValue[0] : queryValue || '').trim();

  if (!query) {
    response.status(400).json({
      message: request.method === 'POST' ? 'اكتب كلمة أو موضوع للبحث في القرآن' : 'استخدم ?q=كلمة للبحث',
      results: [],
      source,
    });
    return;
  }

  if (request.method !== 'GET' && request.method !== 'POST') {
    response.setHeader('Allow', ['GET', 'POST']);
    response.status(405).json({ message: 'Method not allowed', results: [], source });
    return;
  }

  try {
    const ayahs = await loadQuranAyahs();
    const search = searchQuranText(ayahs, query, getLimit(request.query.limit));

    response.status(200).json({
      ...search,
      message:
        search.results.length > 0
          ? `تم العثور على ${search.results.length} نتيجة`
          : 'لم أجد آيات مطابقة. جرب كلمة أوضح أو جزء من الآية نفسها.',
    });
  } catch (error) {
    console.error('LOCAL_QURAN_SEARCH_ERROR:', error);
    response.status(500).json({
      message: 'حدث خطأ أثناء البحث في القرآن',
      results: [],
      source,
    });
  }
}
