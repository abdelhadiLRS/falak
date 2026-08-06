import type { NextApiRequest, NextApiResponse } from 'next';

import { getLocalCollectionCatalog } from '@/lib/local-content';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }
  res.status(200).json({ collections: getLocalCollectionCatalog() });
}
