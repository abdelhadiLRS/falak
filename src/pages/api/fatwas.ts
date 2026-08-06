import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getUserIdCookie } from '@/utils/auth/login';

const prisma = new PrismaClient();

async function checkAdminAuth(req: NextApiRequest, res: NextApiResponse): Promise<boolean> {
  const userId = getUserIdCookie(req);
  if (!userId) {
    res.status(401).json({ success: false, error: 'Unauthorized: Please log in' });
    return false;
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== 'admin') {
    res.status(403).json({ success: false, error: 'Forbidden: Admin access required' });
    return false;
  }

  return true;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    const { category, mufti, search, limit = '20', page = '1' } = req.query;
    const take = parseInt(limit as string, 10);
    const skip = (parseInt(page as string, 10) - 1) * take;

    const where: any = {};
    if (category) where.category = category as string;
    if (mufti) where.mufti = mufti as string;
    if (search) {
      where.OR = [
        { question: { contains: search as string } },
        { answer: { contains: search as string } },
        { mufti: { contains: search as string } },
      ];
    }

    try {
      const total = await prisma.fatwa.count({ where });
      const items = await prisma.fatwa.findMany({
        where,
        take,
        skip,
        orderBy: { id: 'desc' },
      });

      return res.status(200).json({
        success: true,
        data: {
          items,
          pagination: {
            total,
            limit: take,
            page: parseInt(page as string, 10),
            pages: Math.ceil(total / take),
          },
        },
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  if (method === 'POST') {
    const isAuthorized = await checkAdminAuth(req, res);
    if (!isAuthorized) return;

    const { question, answer, mufti, category } = req.body;

    if (!question || !answer || !mufti || !category) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    try {
      const item = await prisma.fatwa.create({
        data: { question, answer, mufti, category },
      });
      return res.status(201).json({ success: true, data: item });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
