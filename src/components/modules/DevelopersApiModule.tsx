import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  Send,
  Play,
  Terminal,
  Globe,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';

export const DevelopersApiModule: React.FC = () => {
  const [activeEndpointIdx, setActiveEndpointIdx] = useState(0);
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const endpoints = [
    {
      method: 'GET',
      path: '/api/health',
      title: 'فحص صحة الخادم والخدمات',
      description: 'إرجاع حالة اتصال الخادم بالإنترنت وجهوزية نموذج الذكاء الاصطناعي.',
      sampleResponse: {
        status: 'ok',
        service: 'Falak Islamic Platform Backend',
        timestamp: new Date().toISOString(),
        geminiConfigured: true,
        version: '1.0.0'
      }
    },
    {
      method: 'POST',
      path: '/api/ai/chat',
      title: 'مساعد فلك العلمي المؤصل',
      description: 'إرسال استفسار شرعي أو قرآني واستقبال رد منضبط بأقوال أهل العلم وموثق بالمصادر.',
      sampleRequest: {
        message: 'ما هي شروط صحة الصلاة؟',
        context: 'سائل مبتدئ يطلب خلاصة فقهية'
      },
      sampleResponse: {
        reply: 'شروط صحة الصلاة المتفق عليها بين جماهير الفقهاء تسعة شروط: الإسلام، العقل، التمييز، رفع الحدث (الوضوء أو الغسل)، إزالة النجاسة من البدن والثوب والمكان، ستر العورة، دخول الوقت، استقبال القبلة، والنية.',
        sources: [
          { title: 'المجموع شرح المهذب', author: 'الإمام النووي' },
          { title: 'المغني', author: 'ابن قدامة' }
        ]
      }
    },
    {
      method: 'POST',
      path: '/api/ai/quiz',
      title: 'مولّد الاختبارات والمسابقات الإسلامية',
      description: 'توليد حزمة أسئلة اختيار من متعدد بالذكاء الاصطناعي في مختلف فروع المعرفة الإسلامية.',
      sampleRequest: {
        topic: 'أحكام التجويد ومخارج الحروف',
        difficulty: 'متوسط',
        count: 3
      },
      sampleResponse: {
        questions: [
          {
            id: 1,
            question: 'كم عدد أحكام النون الساكنة والتنوين؟',
            options: ['4 أحكام (الإظهار، الإدغام، الإقلاب، الإخفاء)', '3 أحكام', '5 أحكام', '6 أحكام'],
            correctIndex: 0,
            explanation: 'أحكام النون الساكنة والتنوين أربعة كما نظمها صاحب تحفة الأطفال: للنون إن تسكن وللتنوين أربع أحكام فخذ تبييني.',
            source: 'متن تحفة الأطفال'
          }
        ]
      }
    }
  ];

  const currentEndpoint = endpoints[activeEndpointIdx];

  const handleTestApi = async () => {
    setIsLoading(true);
    try {
      if (currentEndpoint.method === 'GET') {
        const res = await fetch(currentEndpoint.path);
        const data = await res.json();
        setTestResponse(JSON.stringify(data, null, 2));
      } else {
        const res = await fetch(currentEndpoint.path, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentEndpoint.sampleRequest)
        });
        const data = await res.json();
        setTestResponse(JSON.stringify(data, null, 2));
      }
    } catch {
      setTestResponse(JSON.stringify(currentEndpoint.sampleResponse, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-emerald-400">
          <Code2 className="w-3.5 h-3.5" />
          <span>Falak Open REST APIs & Developer SDK</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-arabic-heading">
          بوابة المطورين والواجهات البرمجية المفتوحة (Open APIs)
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          واجهات برمجية RESTful موثقة بالكامل لتمكين المطورين والمؤسسات من بناء تطبيقات القرآن والحديث والذكاء الاصطناعي بسهولة ومجاناً.
        </p>
      </div>

      {/* Endpoints & Sandbox Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Endpoints Nav (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="font-bold text-xs text-slate-500 uppercase px-2 font-arabic-heading">
            النقاط البرمجية المتاحة (Endpoints)
          </h3>
          <div className="space-y-1.5">
            {endpoints.map((ep, idx) => {
              const isSelected = activeEndpointIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveEndpointIdx(idx);
                    setTestResponse(null);
                  }}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border space-y-1.5 ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      ep.method === 'GET' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {ep.method}
                    </span>
                    <span className="font-mono text-xs text-slate-800 dark:text-slate-200">{ep.path}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{ep.title}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Endpoint Interactive Sandbox (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          
          <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold">
                {currentEndpoint.method}
              </span>
              <h2 className="font-mono text-base font-bold text-slate-900 dark:text-white">
                {currentEndpoint.path}
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {currentEndpoint.description}
            </p>
          </div>

          {/* Request Payload (if POST) */}
          {currentEndpoint.sampleRequest && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>جسم الطلب (JSON Request Body):</span>
              </div>
              <pre className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed">
                {JSON.stringify(currentEndpoint.sampleRequest, null, 2)}
              </pre>
            </div>
          )}

          {/* Live Test Action */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleTestApi}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 flex items-center gap-2 shadow-md disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Play className="w-4 h-4 fill-white" />
              )}
              <span>تجربة الطلب الحي (Send Live Request)</span>
            </button>

            <button
              onClick={() => handleCopyCode(JSON.stringify(currentEndpoint.sampleResponse, null, 2))}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-emerald-600"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? 'تم النسخ' : 'نسخ الاستجابة النموذجية'}</span>
            </button>
          </div>

          {/* Response Console */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-600" />
                <span>الاستجابة البرمجية (Live JSON Response):</span>
              </span>
            </div>
            <pre className="p-4 rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto max-h-72 leading-relaxed border border-slate-800">
              {testResponse || JSON.stringify(currentEndpoint.sampleResponse, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
