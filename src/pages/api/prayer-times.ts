import type { NextApiRequest, NextApiResponse } from 'next';

function value(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const latitude = Number(value(req.query.latitude ?? req.query.lat));
  const longitude = Number(value(req.query.longitude ?? req.query.lng));
  const requestedDate = value(req.query.date);
  const now = new Date();
  const date =
    requestedDate ||
    [now.getDate(), now.getMonth() + 1, now.getFullYear()]
      .map((part, index) => (index < 2 ? String(part).padStart(2, '0') : String(part)))
      .join('-');
  const method = Number(value(req.query.method) || 3);
  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180 ||
    !/^\d{2}-\d{2}-\d{4}$/.test(date) ||
    !Number.isInteger(method)
  ) {
    res.status(400).json({
      message: 'أرسل latitude و longitude وتاريخًا بصيغة DD-MM-YYYY',
    });
    return;
  }

  const url = new URL(`https://api.aladhan.com/v1/timings/${date}`);
  url.searchParams.set('latitude', String(latitude));
  url.searchParams.set('longitude', String(longitude));
  url.searchParams.set('method', String(method));

  try {
    const upstream = await fetch(url);
    if (!upstream.ok) {
      throw new Error(`Prayer times provider returned ${upstream.status}`);
    }
    const payload = await upstream.json();
    res.status(200).json({
      ...payload,
      source: {
        id: 'aladhan-prayer-times',
        title: 'AlAdhan Prayer Times API',
        url: url.toString(),
        verificationStatus: 'external',
      },
    });
  } catch (error) {
    console.error('PRAYER_TIMES_ERROR:', error);
    res.status(502).json({ message: 'تعذر جلب مواقيت الصلاة حاليًا' });
  }
}
