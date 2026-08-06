import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    const { query } = req.query;

    if (!query) {
      return res.status(200).json({ success: true, data: [] });
    }

    const searchQuery = query as string;

    try {
      const [hadiths, books, articles, fatwas, lessons] = await Promise.all([
        prisma.hadith.findMany({
          where: {
            OR: [
              { hadithText: { contains: searchQuery } },
              { narrator: { contains: searchQuery } },
            ],
          },
          take: 5,
        }),
        prisma.book.findMany({
          where: {
            OR: [
              { title: { contains: searchQuery } },
              { description: { contains: searchQuery } },
              { author: { contains: searchQuery } },
            ],
          },
          take: 5,
        }),
        prisma.article.findMany({
          where: {
            OR: [
              { title: { contains: searchQuery } },
              { content: { contains: searchQuery } },
            ],
          },
          take: 5,
        }),
        prisma.fatwa.findMany({
          where: {
            OR: [
              { question: { contains: searchQuery } },
              { answer: { contains: searchQuery } },
            ],
          },
          take: 5,
        }),
        prisma.lesson.findMany({
          where: {
            OR: [
              { title: { contains: searchQuery } },
              { description: { contains: searchQuery } },
            ],
          },
          take: 5,
        }),
      ]);

      const formattedResults = [
        ...hadiths.map(h => ({ id: `hadith-${h.id}`, title: h.narrator, description: h.hadithText.substring(0, 150) + '...', type: 'hadith', link: '/hadiths' })),
        ...books.map(b => ({ id: `book-${b.id}`, title: b.title, description: b.description ? b.description.substring(0, 150) + '...' : '', type: 'book', link: '/books' })),
        ...articles.map(a => ({ id: `article-${a.id}`, title: a.title, description: a.content.substring(0, 150) + '...', type: 'article', link: '/articles' })),
        ...fatwas.map(f => ({ id: `fatwa-${f.id}`, title: f.question, description: f.answer.substring(0, 150) + '...', type: 'fatwa', link: '/fatwas' })),
        ...lessons.map(l => ({ id: `lesson-${l.id}`, title: l.title, description: l.description ? l.description.substring(0, 150) + '...' : '', type: 'lesson', link: '/lessons' })),
      ];

      return res.status(200).json({ success: true, data: formattedResults });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
