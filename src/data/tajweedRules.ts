export interface TajweedExample {
  ayahText: string;
  highlightWord: string;
  surah: string;
  explanation: string;
}

export interface TajweedCategoryItem {
  id: string;
  name: string;
  count: number;
}

export interface TajweedRuleData {
  id: string;
  name: string;
  category: string;
  categoryArabic: string;
  colorCode: string;
  definition: string;
  howToApply: string;
  letters: string[];
  poeticEvidence?: string;
  examples: TajweedExample[];
}

export const TAJWEED_CATEGORIES: TajweedCategoryItem[] = [
  { id: 'noon-sakinah', name: 'أحكام النون الساكنة والتنوين', count: 4 },
  { id: 'meem-sakinah', name: 'أحكام الميم الساكنة', count: 3 },
  { id: 'mudood', name: 'أحكام المدود', count: 4 },
  { id: 'qalqalah', name: 'أحكام القلقلة', count: 1 },
  { id: 'makharij', name: 'مخارج الحروف وصفاتها', count: 2 }
];

export const TAJWEED_RULES: TajweedRuleData[] = [
  {
    id: 'izhar',
    name: 'الإظهار الحلقي',
    category: 'noon-sakinah',
    categoryArabic: 'النون الساكنة والتنوين',
    colorCode: '#059669',
    definition: 'إخراج كل حرف من مخرجه من غير غنة زائدة في الحرف المظهر إذا وقع بعد النون الساكنة أو التنوين أحد حروف الحلق الستة.',
    howToApply: 'نطق النون الساكنة أو التنوين واضحة بيّنة دون إطالة الغنة ودون سكت.',
    letters: ['ء', 'هـ', 'ع', 'ح', 'غ', 'خ'],
    poeticEvidence: 'فالأول الإظهار قبل أحرف * للحلق ست رتبت فلتعرف: همز فهاء ثم عين حاء * مهملتان ثم غين خاء',
    examples: [
      {
        ayahText: 'مِنْ خَوْفٍ',
        highlightWord: 'مِنْ خَوْفٍ',
        surah: 'قريش: 4',
        explanation: 'إظهار النون الساكنة لوقوع حرف الخاء بعدها'
      },
      {
        ayahText: 'عَلِيمٌ حَكِيمٌ',
        highlightWord: 'عَلِيمٌ حَكِيمٌ',
        surah: 'النساء: 26',
        explanation: 'إظهار التنوين لوقوع حرف الحاء بعده'
      },
      {
        ayahText: 'أَنْعَمْتَ عَلَيْهِمْ',
        highlightWord: 'أَنْعَمْتَ',
        surah: 'الفاتحة: 7',
        explanation: 'إظهار النون الساكنة في كلمة واحدة لوقوع العين بعدها'
      }
    ]
  },
  {
    id: 'idgham',
    name: 'الإدغام بغنة وبغير غنة',
    category: 'noon-sakinah',
    categoryArabic: 'النون الساكنة والتنوين',
    colorCode: '#2563eb',
    definition: 'إدخال حرف ساكن في حرف متحرك بحيث يصيران حرفاً واحداً مشدداً من جنس الثاني.',
    howToApply: 'إدغام النون الساكنة أو التنوين في أحرف (يرملون)، ويكون بغنة مع (ينمو) وبغير غنة مع (اللام والراء).',
    letters: ['ي', 'ر', 'م', 'ل', 'و', 'ن'],
    poeticEvidence: 'والثان إدغام بستة أتت * في يرملون عندهم قد ثبتت * لكنها قسمان قسم يدغما * فيه بغنة بينمو علما',
    examples: [
      {
        ayahText: 'فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُۥ',
        highlightWord: 'فَمَن يَعْمَلْ',
        surah: 'الزلزلة: 7',
        explanation: 'إدغام بغنة بمقدار حركتين'
      },
      {
        ayahText: 'مِّن وَرَآئِهِم مُّحِيطٌۢ',
        highlightWord: 'مِّن وَرَآئِهِم',
        surah: 'البروج: 20',
        explanation: 'إدغام النون في الواو بغنة'
      },
      {
        ayahText: 'هُدًى لِّلْمُتَّقِينَ',
        highlightWord: 'هُدًى لِّلْمُتَّقِينَ',
        surah: 'البقرة: 2',
        explanation: 'إدغام التنوين في اللام بغير غنة (إدغام كامل)'
      }
    ]
  },
  {
    id: 'iqlab',
    name: 'الإقلاب',
    category: 'noon-sakinah',
    categoryArabic: 'النون الساكنة والتنوين',
    colorCode: '#d97706',
    definition: 'قلب النون الساكنة أو التنوين ميماً مخفاة بغنة عند ملاقاة حرف الباء.',
    howToApply: 'إطباق الشفتين بلطف دون كز شديد مع إخراج غنة حركتين من الخيشوم.',
    letters: ['ب'],
    poeticEvidence: 'والثالث الإقلاب عند الباء * ميماً بغنة مع الإخفاء',
    examples: [
      {
        ayahText: 'مِنۢ بَعْدِ مَا جَآءَتْهُمُ ٱلْبَيِّنَـٰتُ',
        highlightWord: 'مِنۢ بَعْدِ',
        surah: 'البقرة: 213',
        explanation: 'قلب النون الساكنة ميماً لوقوع الباء بعدها'
      },
      {
        ayahText: 'وَٱللَّهُ سَمِيعٌۢ بَصِيرٌ',
        highlightWord: 'سَمِيعٌۢ بَصِيرٌ',
        surah: 'النساء: 134',
        explanation: 'قلب التنوين ميماً مخفاة بغنة'
      }
    ]
  },
  {
    id: 'ikhfa',
    name: 'الإخفاء الحقيقي',
    category: 'noon-sakinah',
    categoryArabic: 'النون الساكنة والتنوين',
    colorCode: '#dc2626',
    definition: 'النطق بالحرف الساكن بصفة بين الإظهار والإدغام عارٍ عن التشديد مع بقاء الغنة في الحرف الأول.',
    howToApply: 'تهيئة الفم لمخرج الحرف التالي مع إخراج غنة رقيقة أو مفخمة تتبع ما بعدها.',
    letters: ['ص', 'ذ', 'ث', 'ك', 'ج', 'ش', 'ق', 'س', 'د', 'ط', 'ز', 'ف', 'ت', 'ض', 'ظ'],
    poeticEvidence: 'والرابع الإخفاء عند الفاضل * من الحروف واجب للفاضل * في خمسة من بعد عشر رمزها * في كلم هذا البيت قد ضمنتها',
    examples: [
      {
        ayahText: 'مِن قَبْلُ',
        highlightWord: 'مِن قَبْلُ',
        surah: 'البقرة: 25',
        explanation: 'إخفاء بغنة مفخمة لمجاورة القاف'
      },
      {
        ayahText: 'كُنتُمْ خَيْرَ أُمَّةٍ',
        highlightWord: 'كُنتُمْ',
        surah: 'آل عمران: 110',
        explanation: 'إخفاء بغنة مرققة لمجاورة التاء'
      }
    ]
  },
  {
    id: 'meem-ikhfa',
    name: 'الإخفاء الشفوي',
    category: 'meem-sakinah',
    categoryArabic: 'الميم الساكنة',
    colorCode: '#7c3aed',
    definition: 'إخفاء الميم الساكنة بغنة إذا وقع بعدها حرف الباء فقط.',
    howToApply: 'تلامس لطيف للشفتين مع إخراج غنة بمقدار حركتين.',
    letters: ['ب'],
    poeticEvidence: 'فالأول الإخفاء عند الباء * وسمه الشفوي للقراء',
    examples: [
      {
        ayahText: 'تَرْمِيهِم بِحِجَارَةٍ',
        highlightWord: 'تَرْمِيهِم بِحِجَارَةٍ',
        surah: 'الفيل: 4',
        explanation: 'إخفاء الميم الساكنة لوقوع الباء بعدها'
      }
    ]
  },
  {
    id: 'meem-idgham',
    name: 'إدغام المتماثلين الصغير',
    category: 'meem-sakinah',
    categoryArabic: 'الميم الساكنة',
    colorCode: '#2563eb',
    definition: 'إدغام الميم الساكنة في ميم متحركة بعدها فتصبحان ميماً واحدة مشددة بغنة.',
    howToApply: 'إدغام كامل مع غنة ظاهرة حركتين.',
    letters: ['م'],
    poeticEvidence: 'والثان إدغام بمثلها أتى * وسم إدغاماً صغيراً يا فتى',
    examples: [
      {
        ayahText: 'لَهُم مَّا يَشَآءُونَ',
        highlightWord: 'لَهُم مَّا',
        surah: 'الفرقان: 16',
        explanation: 'إدغام الميم في الميم'
      }
    ]
  },
  {
    id: 'meem-izhar',
    name: 'الإظهار الشفوي',
    category: 'meem-sakinah',
    categoryArabic: 'الميم الساكنة',
    colorCode: '#059669',
    definition: 'إظهار الميم الساكنة واضحة عند جميع الحروف عدا الباء والميم.',
    howToApply: 'نطق الميم الساكنة من الشفتين بوضوح وأشد ما تكون إظهاراً عند الواو والفاء.',
    letters: ['بقية الحروف'],
    poeticEvidence: 'والثالث الإظهار في البقية * من أحرف وسمها شفوية * واحذر لدى واو وفا أن تختفي * لقربها ولاتحاد فاعرف',
    examples: [
      {
        ayahText: 'أَلَمْ تَرَ كَيْفَ',
        highlightWord: 'أَلَمْ تَرَ',
        surah: 'الفيل: 1',
        explanation: 'إظهار شفوي للميم الساكنة'
      }
    ]
  },
  {
    id: 'qalqalah-rule',
    name: 'القلقلة ومراتبها',
    category: 'qalqalah',
    categoryArabic: 'صفات الحروف',
    colorCode: '#ea580c',
    definition: 'اضطراب مخرج الحرف عند النطق به ساكناً حتى يسمع له نبرة قوية.',
    howToApply: 'اهتزاز المخرج بحسب مرتبة القلقلة (كبرى عند الوقف المشدد، وسطى عند الساكن الموقوف عليه، صغرى في وسط الكلمة).',
    letters: ['ق', 'ط', 'ب', 'ج', 'د'],
    poeticEvidence: 'قطب جد؛ وبينن مقلقلاً إن سكنا * وإن يكن في الوقف كان أبينا',
    examples: [
      {
        ayahText: 'قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ',
        highlightWord: 'ٱلْفَلَقِ',
        surah: 'الفلق: 1',
        explanation: 'قلقلة وسطى عند الوقف على القاف الساكنة'
      },
      {
        ayahText: 'تَبَّتْ يَدَآ أَبِى لَهَبٍ وَتَبَّ',
        highlightWord: 'وَتَبَّ',
        surah: 'المسد: 1',
        explanation: 'قلقلة كبرى عند الوقف على الباء المشددة'
      }
    ]
  },
  {
    id: 'madd-muttasil-munfasil',
    name: 'المد المتصل والمنفصل واللازم',
    category: 'mudood',
    categoryArabic: 'أحكام المدود',
    colorCode: '#9333ea',
    definition: 'إطالة الصوت بأحد حروف المد الثلاثة (الألف الساكنة المفتوح ما قبلها، الواو الساكنة المضموم ما قبلها، الياء الساكنة المكسور ما قبلها).',
    howToApply: 'المد المتصل: 4 أو 5 حركات وجوباً، المد المنفصل: 4 أو 5 حركات جوازاً، المد اللازم: 6 حركات لزوماً.',
    letters: ['ا', 'و', 'ي'],
    poeticEvidence: 'للمد أحكام ثلاثة تدوم * وهي الوجوب والجواز واللزوم',
    examples: [
      {
        ayahText: 'إِذَا جَآءَ نَصْرُ ٱللَّهِ وَٱلْفَتْحُ',
        highlightWord: 'جَآءَ',
        surah: 'النصر: 1',
        explanation: 'مد متصل واجب (4 - 5 حركات)'
      },
      {
        ayahText: 'إِنَّآ أَعْطَيْنَـٰكَ ٱلْكَوْثَرَ',
        highlightWord: 'إِنَّآ أَعْطَيْنَـٰكَ',
        surah: 'الكوثر: 1',
        explanation: 'مد منفصل جائز (4 - 5 حركات)'
      },
      {
        ayahText: 'وَلَا ٱلضَّآلِّينَ',
        highlightWord: 'ٱلضَّآلِّينَ',
        surah: 'الفاتحة: 7',
        explanation: 'مد لازم كلمي مثقل (6 حركات لزوماً)'
      }
    ]
  }
];
