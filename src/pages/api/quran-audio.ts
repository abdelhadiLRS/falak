import type { NextApiRequest, NextApiResponse } from 'next';

const RECITERS = [
  { id: 'ar.alafasy', name: 'مشاري راشد العفاسي' },
  { id: 'ar.abdulbasitmurattal', name: 'عبد الباسط عبد الصمد' },
  { id: 'ar.abdurrahmaansudais', name: 'عبد الرحمن السديس' },
  { id: 'ar.husary', name: 'محمود خليل الحصري' },
  { id: 'ar.minshawi', name: 'محمد صديق المنشاوي' },
  { id: 'ar.saoodshuraym', name: 'سعود الشريم' },
  { id: 'ar.mahermuaiqly', name: 'ماهر المعيقلي' },
  { id: 'ar.muhammadayyoub', name: 'محمد أيوب' },
  { id: 'ar.muhammadjibreel', name: 'محمد جبريل' },
  { id: 'ar.hudhaify', name: 'علي الحذيفي' },
] as const;

function single(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const reciter = single(req.query.reciter) || RECITERS[0].id;
  const selected = RECITERS.find((item) => item.id === reciter);
  const scope = single(req.query.scope) || 'surah';
  const surah = Number(single(req.query.surah));
  const ayah = Number(single(req.query.ayah));
  if (!selected || !['verse', 'surah', 'full'].includes(scope)) {
    res.status(400).json({ message: 'القارئ أو نوع التلاوة غير صالح', reciters: RECITERS });
    return;
  }
  if ((scope !== 'full' && (!Number.isInteger(surah) || surah < 1 || surah > 114)) ||
      (scope === 'verse' && (!Number.isInteger(ayah) || ayah < 1))) {
    res.status(400).json({ message: 'أرسل رقم السورة والآية الصحيحين' });
    return;
  }

  const endpoint =
    scope === 'verse'
      ? `https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/${selected.id}`
      : scope === 'surah'
        ? `https://api.alquran.cloud/v1/surah/${surah}/${selected.id}`
        : `https://api.alquran.cloud/v1/quran/${selected.id}`;
  try {
    const upstream = await fetch(endpoint);
    if (!upstream.ok) throw new Error(`Audio provider returned ${upstream.status}`);
    const payload = await upstream.json();
    res.status(200).json({
      ...payload,
      reciter: selected,
      source: {
        id: 'alquran-cloud-audio',
        title: 'AlQuran Cloud audio API',
        url: endpoint,
        verificationStatus: 'external',
      },
    });
  } catch (error) {
    console.error('QURAN_AUDIO_ERROR:', error);
    res.status(502).json({ message: 'تعذر جلب التلاوة حاليًا', reciters: RECITERS });
  }
}
