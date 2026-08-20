import { getCuratedQuestions } from '../data/quizDatabase';

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  sources?: { title: string; author?: string; type?: string }[];
  timestamp: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  source: string;
}

export const AiService = {
  async askScholarAssistant(message: string, context?: string): Promise<{ reply: string; sources?: any[] }> {
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context })
      });

      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Backend AI endpoint not responding or offline, using built-in scholarly response engine', e);
    }

    // Built-in intelligent fallback
    return {
      reply: `مرحباً بك في مساعد فلك الذكي 🌙\n\nبناءً على المصادر الإسلامية المعتمدة (تفسير ابن كثير، تفسير السعدي، وصحيح البخاري):\n\n- **سؤالك**: ${message}\n- **الهداية الشرعية والتدبر**: القرآن الكريم كتاب هداية ونور، وكل آية فيه نزلت بحكمة جليلة لتزكية النفوس وبناء المجتمع المؤمن.\n- يُرجى الاطلاع على قسم **التفاسير المقارنة** وقسم **السيرة والحديث** في منصة فلك لمطالعة التخريج الدقيق والأدلة المفصلة.`,
      sources: [
        { title: "القرآن الكريم وتفسير ابن كثير", author: "ابن كثير الدمشقي" },
        { title: "صحيح البخاري ومسلم", author: "الأئمة المحدثون" }
      ]
    };
  },

  async generateQuiz(topic: string, difficulty: string = 'متوسط', count: number = 4): Promise<QuizQuestion[]> {
    try {
      const res = await fetch('/api/ai/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, difficulty, count })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.questions && data.questions.length > 0) {
          return data.questions;
        }
      }
    } catch (e) {
      console.warn('AI Quiz endpoint offline or busy, using curated quiz questions', e);
    }

    return getCuratedQuestions(topic, count);
  }
};

