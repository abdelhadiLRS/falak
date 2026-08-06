import type { NextApiRequest, NextApiResponse } from 'next';

import { getLocalAssetCatalog } from '@/lib/local-assets';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }
  try {
    const rawLimit = Array.isArray(req.query.limit) ? req.query.limit[0] : req.query.limit;
    const limit = rawLimit === undefined ? 200 : Number(rawLimit);
    if (!Number.isInteger(limit)) {
      res.status(400).json({ message: 'الحد يجب أن يكون رقمًا صحيحًا' });
      return;
    }
    res.status(200).json({ assets: await getLocalAssetCatalog(limit) });
  } catch (error) {
    console.error('LOCAL_ASSETS_ERROR:', error);
    res.status(500).json({ message: 'تعذر تحميل فهرس الأصول' });
  }
}
