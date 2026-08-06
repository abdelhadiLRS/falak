import type { NextApiRequest, NextApiResponse } from 'next';

const EARTH_RADIUS_DEGREES = 180 / Math.PI;
const KAABA_LATITUDE = 21.422487;
const KAABA_LONGITUDE = 39.826206;

function numberParam(value: string | string[] | undefined) {
  const parsed = Number(Array.isArray(value) ? value[0] : value);
  return Number.isFinite(parsed) ? parsed : null;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const latitude = numberParam(req.query.latitude ?? req.query.lat);
  const longitude = numberParam(req.query.longitude ?? req.query.lng);
  if (
    latitude === null ||
    longitude === null ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    res.status(400).json({ message: 'أرسل latitude و longitude صالحين' });
    return;
  }

  const lat = latitude / EARTH_RADIUS_DEGREES;
  const kaabaLat = KAABA_LATITUDE / EARTH_RADIUS_DEGREES;
  const deltaLongitude = (KAABA_LONGITUDE - longitude) / EARTH_RADIUS_DEGREES;
  const bearing =
    (Math.atan2(
      Math.sin(deltaLongitude),
      Math.cos(lat) * Math.tan(kaabaLat) - Math.sin(lat) * Math.cos(deltaLongitude),
    ) *
      EARTH_RADIUS_DEGREES +
      360) %
    360;

  res.status(200).json({
    latitude,
    longitude,
    bearing: Number(bearing.toFixed(2)),
    destination: { latitude: KAABA_LATITUDE, longitude: KAABA_LONGITUDE },
    source: {
      id: 'great-circle-bearing',
      title: 'Great-circle bearing to the Kaaba',
      verificationStatus: 'verified',
    },
  });
}
