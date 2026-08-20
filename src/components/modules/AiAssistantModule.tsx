import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  BookOpen,
  ShieldCheck,
  HelpCircle,
  Award,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { AiService, AiChatMessage, QuizQuestion } from '../../services/aiService';

export const AiAssistantModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'quiz'>('chat');
  const [inputMessage, setInputMessage] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<AiChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: 'السلام عليكم ورحمة الله وبركاته 🌙 مرحباً بك في مساعد فلك الإسلامي الذكي. أنا مهيأ للإجابة عن أسئلتك في القرآن الكريم، التفاسير المقارنة، علم التجويد، الحديث الشريف، والسيرة النبوية، مستنداً إلى أمهات المصادر المعتمدة دون الخوض في فتاوى شخصية.',
      sources: [
        { title: 'تفسير ابن كثير', author: 'ابن كثير' },
        { title: 'صحيح البخاري ومسلم', author: 'الأئمة المحدثون' }
      ],
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Quiz State
  const [quizTopic, setQuizTopic] = useState('علوم القرآن والتجويد');
  const [quizDifficulty, setQuizDifficulty] = useState('متوسط');
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isQuizLoading, setIsQuizLoading] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const samplePrompts = [
    'ما هي لطائف وهدايات سورة الفاتحة في بناء شخصية المسلم؟',
    'اشرح لي أحكام النون الساكنة والتنوين مع أمثلة من سورة الملك',
    'ما هي الدروس والعبر المستفادة من غزوة بدر الكبرى؟',
    'ما الفرق بين تفسير ابن كثير وتفسير السعدي؟',
    'ما هي شروط صحة الصلاة وأركانها المتفق عليها؟'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const msg = textToSend || inputMessage;
    if (!msg.trim() || isAiLoading) return;

    const userMsg: AiChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: msg,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsAiLoading(true);

    try {
      const response = await AiService.askScholarAssistant(msg);
      const assistantMsg: AiChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: response.reply,
        sources: response.sources,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, assistantMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleGenerateQuiz = async () => {
    setIsQuizLoading(true);
    setSelectedAnswers({});
    setQuizScore(null);
    try {
      const qs = await AiService.generateQuiz(quizTopic, quizDifficulty, 4);
      setQuizQuestions(qs);
    } finally {
      setIsQuizLoading(false);
    }
  };

  const handleSelectAnswer = (qId: number, optionIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    setQuizScore(score);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-800 via-emerald-800 to-teal-950 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/60 border border-teal-500/30 text-xs font-semibold text-teal-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>الذكاء الاصطناعي المؤصل شرعياً عبر Gemini</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-arabic-heading">
          مساعد فلك الذكي ومولّد الاختبارات المعرفية
        </h1>
        <p className="text-xs sm:text-sm text-teal-100/90 max-w-2xl leading-relaxed">
          حوار علمي رصين موثق بالمصادر الشرعية، وتوليد اختبارات معرفية مخصصة لاختبار حصيلتك في القرآن والسنة والتجويد.
        </p>
      </div>

      {/* Sub-Tabs Switcher */}
      <div className="flex items-center justify-center">
        <div className="p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex gap-2">
          <button
            onClick={() => setActiveSubTab('chat')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeSubTab === 'chat'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            المساعد العلمي الذكي
          </button>
          <button
            onClick={() => {
              setActiveSubTab('quiz');
              if (quizQuestions.length === 0) handleGenerateQuiz();
            }}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeSubTab === 'quiz'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            اختبارات الذكاء المعرفية
          </button>
        </div>
      </div>

      {activeSubTab === 'chat' ? (
        <div className="space-y-4">
          
          {/* Quick Prompts Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 border border-slate-200 dark:border-slate-700 transition-colors shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Messages Container */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col h-[520px] overflow-hidden">
            
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-2xl p-4 sm:p-5 rounded-2xl text-sm leading-relaxed space-y-2.5 ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-bl-none shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 rounded-br-none border border-slate-200/70 dark:border-slate-700/60'
                    }`}
                  >
                    <p className="whitespace-pre-line font-sans">{msg.text}</p>

                    {msg.sources && msg.sources.length > 0 && (
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-semibold">المصادر المعتمدة:</span>
                        {msg.sources.map((s, sIdx) => (
                          <span key={sIdx} className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                            {s.title} ({s.author})
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}

              {isAiLoading && (
                <div className="flex items-center gap-2 text-xs text-slate-500 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl max-w-xs">
                  <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                  <span>جاري استحضار الأدلة وتخريج المسألة...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center gap-2">
              <input
                type="text"
                placeholder="اسأل مساعد فلك عن تفسير، حكم تجويدي، حديث نبوي، أو مسألة في السيرة..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isAiLoading || !inputMessage.trim()}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all disabled:opacity-40 flex items-center gap-1.5 shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>إرسال</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        
        /* Interactive AI Quiz Screen */
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white font-arabic-heading">
                اختبار معرفي تفاعلي بالذكاء الاصطناعي
              </h3>
              <p className="text-xs text-slate-500">اختر الموضوع ومستوى الصعوبة لبدء التحدي</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={quizTopic}
                onChange={(e) => setQuizTopic(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none"
              >
                <option value="علوم القرآن والتجويد">علوم القرآن والتجويد</option>
                <option value="السيرة النبوية والغزوات">السيرة النبوية والغزوات</option>
                <option value="الحديث ومصطلح الحديث">الحديث ومصطلح الحديث</option>
                <option value="الفقه وأصول الفقه">الفقه وأصول الفقه</option>
              </select>

              <select
                value={quizDifficulty}
                onChange={(e) => setQuizDifficulty(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none"
              >
                <option value="سهل">سهل</option>
                <option value="متوسط">متوسط</option>
                <option value="متقدم">متقدم</option>
              </select>

              <button
                onClick={handleGenerateQuiz}
                disabled={isQuizLoading}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 flex items-center gap-1.5 shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>توليد اختبار جديد</span>
              </button>
            </div>
          </div>

          {/* Quiz Questions Render */}
          {isQuizLoading ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-medium text-slate-500">جاري توليد الأسئلة وتحكيم الإجابات بالذكاء الاصطناعي...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {quizQuestions.map((q, qIdx) => {
                const userSelected = selectedAnswers[q.id];
                const isSubmitted = quizScore !== null;
                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 space-y-3"
                  >
                    <div className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center font-mono shrink-0">
                        {qIdx + 1}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-relaxed">
                        {q.question}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = userSelected === optIdx;
                        const isCorrect = q.correctIndex === optIdx;
                        let btnStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100';

                        if (isSubmitted) {
                          if (isCorrect) btnStyle = 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                          else if (isChosen && !isCorrect) btnStyle = 'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-900 dark:text-rose-200';
                        } else if (isChosen) {
                          btnStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-600 text-emerald-800 dark:text-emerald-300 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(q.id, optIdx)}
                            className={`p-3 rounded-xl text-xs text-right border transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isSubmitted && (
                      <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
                        <span className="font-bold text-emerald-700 dark:text-emerald-400 block">التوضيح والمصدر:</span>
                        <p>{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                {quizScore !== null ? (
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      النتيجة: {quizScore} من {quizQuestions.length} ({Math.round((quizScore / quizQuestions.length) * 100)}%)
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-400">أجب على جميع الأسئلة ثم اضغط اعتماد النتيجة</span>
                )}

                <button
                  onClick={handleSubmitQuiz}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-md"
                >
                  اعتماد وتقييم الإجابات
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
