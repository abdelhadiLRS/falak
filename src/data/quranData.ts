import { SurahMeta, Ayah } from '../types';

export const SURAHS_LIST: SurahMeta[] = [
  {
    id: 1,
    name: 'الفاتحة',
    englishName: 'Al-Fatiha',
    englishNameTranslation: 'The Opening',
    numberOfAyahs: 7,
    revelationType: 'Meccan',
    revelationOrder: 5,
    juzStart: 1,
    pageStart: 1,
    wordsCount: 29,
    lettersCount: 139,
    summary: 'أم الكتاب والسبع المثاني والقرآن العظيم، تشتمل على مجمل معاني القرآن في التوحيد والعبادة والطلب والهداية.',
    themes: ['التوحيد والثناء على الله', 'الاعتراف بالعبودية والاستعانة', 'طلب الهداية إلى الصراط المستقيم', 'أصناف الخلق: المنعم عليهم والمغضوب عليهم والضالين'],
    virtues: 'أعظم سورة في كتاب الله، لا تصح الصلاة إلا بقراءتها، وهي الشافية والكافية.',
    reasonForNaming: 'سُميت بالفاتحة لافتتاح كتاب الله العزيز بها في المصحف الشريف والصلوات.'
  },
  {
    id: 2,
    name: 'البقرة',
    englishName: 'Al-Baqarah',
    englishNameTranslation: 'The Cow',
    numberOfAyahs: 286,
    revelationType: 'Medinan',
    revelationOrder: 87,
    juzStart: 1,
    pageStart: 2,
    wordsCount: 6144,
    lettersCount: 25613,
    summary: 'أطول سور القرآن، فسطاط القرآن، تضمنت أصول العقيدة، أحكام الشريعة، العبادات، المعاملات، وقصص الأمم السابقة، وتشتمل على آية الكرسي وأطول آية في القرآن (آية الدين).',
    themes: ['أصناف المكلفين (المؤمنون، الكافرون، المنافقون)', 'خلافة آدم في الأرض وعصيان إبليس', 'بني إسرائيل ومواقفهم مع الأنبياء وقصة البقرة', 'أركان الإسلام وأحكام الصيام والحج والإنفاق والقصاص والوصية والطلاق والربا', 'آية الكرسي وخواتيم سورة البقرة'],
    virtues: 'من قرأها في بيته ليلاً لم يدخل الشيطان بيته ثلاث ليالٍ، وتأتي هي وآل عمران كأنهما غمامتان تحاجان عن صاحبهما يوم القيامة.',
    reasonForNaming: 'سميت بسورة البقرة تخليداً لمعجزة بقرة بني إسرائيل وبيان قدرة الله على إحياء الموتى.'
  },
  {
    id: 3,
    name: 'آل عمران',
    englishName: 'Ali \'Imran',
    englishNameTranslation: 'Family of Imran',
    numberOfAyahs: 200,
    revelationType: 'Medinan',
    revelationOrder: 89,
    juzStart: 3,
    pageStart: 50,
    wordsCount: 3503,
    lettersCount: 14605,
    summary: 'تثبيت عقيدة التوحيد، الحوار مع أهل الكتاب، وتناول غزوة بدر وغزوة أحد واستخلاص الدروس الإيمانية والعسكرية والتربوية.',
    themes: ['المحكم والمتشابه وعصمة الوحي', 'قصة ولادة مريم وعيسى عليه السلام', 'مباهلة نصارى نجران', 'دروس غزوة أحد وثبات المؤمنين'],
    virtues: 'الزهراوان (البقرة وآل عمران) تظلان صاحبهما يوم القيامة.',
    reasonForNaming: 'سميت بذلك لذكر قصة أسرة آل عمران وما جرى لامرأة عمران ومريم وعيسى عليه السلام.'
  },
  {
    id: 4,
    name: 'النساء',
    englishName: 'An-Nisa',
    englishNameTranslation: 'The Women',
    numberOfAyahs: 176,
    revelationType: 'Medinan',
    revelationOrder: 92,
    juzStart: 4,
    pageStart: 77,
    wordsCount: 3745,
    lettersCount: 16030,
    summary: 'سورة الأحكام والتشريعات المتعلقة بالأسرة، حقوق الضعفاء واليتامى، المواريث، المحرمات من النساء، والعدل الاجتماعي.',
    themes: ['وحدة الإنسانية وتقوى الله', 'حقوق الأيتام والميراث وقسمة التركات', 'أحكام النكاح والمحرمات', 'الجهاد والعدل ومحاربة النفاق'],
    virtues: 'من السبع الطوال التي من أخذها فهو حَبْر.',
    reasonForNaming: 'لكثرة ما ورد فيها من الأحكام والتشريعات الخاصة بالنساء.'
  },
  {
    id: 5,
    name: 'المائدة',
    englishName: 'Al-Ma\'idah',
    englishNameTranslation: 'The Table Spread',
    numberOfAyahs: 120,
    revelationType: 'Medinan',
    revelationOrder: 112,
    juzStart: 6,
    pageStart: 106,
    wordsCount: 2804,
    lettersCount: 11892,
    summary: 'سورة العقود والعهود، إكمال الدين وبيان الحلال والحرام في الأطعمة والذبائح والشهادات وأحكام الطهارة والقصاص.',
    themes: ['الوفاء بالعقود والعهود', 'أحكام الأطعمة والصيد والذبائح', 'أحكام الوضوء والتيمم', 'قصة ابني آدم هابيل وقابيل', 'مائدة عيسى عليه السلام والحوار الأخروي'],
    virtues: 'من أواخر ما نزل من القرآن وفيها آية: "اليوم أكملت لكم دينكم".',
    reasonForNaming: 'لذكر قصة المائدة التي طلبها الحواريون من عيسى عليه السلام لتكون آية من الله.'
  },
  {
    id: 6,
    name: 'الأنعام',
    englishName: 'Al-An\'am',
    englishNameTranslation: 'The Cattle',
    numberOfAyahs: 165,
    revelationType: 'Meccan',
    revelationOrder: 55,
    juzStart: 7,
    pageStart: 128,
    wordsCount: 3055,
    lettersCount: 12418,
    summary: 'أعظم سورة مكية في تقرير أصول التوحيد، نبذ الشرك، إقامة الحجج العقلية، وإثبات البعث والرسالة.',
    themes: ['الأدلة الكونية على وحدانية الخالق', 'محاجة إبراهيم عليه السلام لقومه في الكواكب', 'بيان ضلالات الجاهلية في تحريم الأنعام والبحائر', 'الوصايا العشر العظيمة في ختام السورة'],
    virtues: 'نزلت جملة واحدة يشيعها سبعون ألف ملك يحفون بها بالتسبيح والتحميد.',
    reasonForNaming: 'لإبطال عقائد المشركين الفاسدة وأحكامهم في الأنعام.'
  },
  {
    id: 7,
    name: 'الأعراف',
    englishName: 'Al-A\'raf',
    englishNameTranslation: 'The Heights',
    numberOfAyahs: 206,
    revelationType: 'Meccan',
    revelationOrder: 39,
    juzStart: 8,
    pageStart: 151,
    wordsCount: 3325,
    lettersCount: 14071,
    summary: 'عرض الصراع بين الحق والباطل عبر قصص الأنبياء (نوح، هود، صالح، لوط، شعيب، وموسى عليه السلام مفصلاً).',
    themes: ['قصة آدم وإبليس والتحذير من فتنة الشيطان', 'مشاهد القيامة وموقع أصحاب الأعراف', 'تفصيل قصة موسى مع فرعون وبني إسرائيل', 'ميثاق الذرية وفطرة التوحيد'],
    virtues: 'من السبع الطوال وفيها تفصيل مواقف الأنبياء مع أقوامهم.',
    reasonForNaming: 'لذكر الأعراف وهو السور الذي يقع بين الجنة والنار ورجاله الذين يرجون رحمة الله.'
  },
  {
    id: 8,
    name: 'الأنفال',
    englishName: 'Al-Anfal',
    englishNameTranslation: 'The Spoils of War',
    numberOfAyahs: 75,
    revelationType: 'Medinan',
    revelationOrder: 88,
    juzStart: 9,
    pageStart: 177,
    wordsCount: 1231,
    lettersCount: 5299,
    summary: 'أحكام الجهاد والغنائم، وتفصيل أحداث يوم الفرقان في غزوة بدر الكبرى ونصر الله للمؤمنين.',
    themes: ['تقسيم الغنائم وتأليف القلوب', 'أحداث غزوة بدر وتأييد الملائكة', 'شروط النصر المعنوية والمادية', 'أحكام الأسرى والمعاهدات'],
    virtues: 'تسمى سورة بدر لأنها نزلت في أحداثها ودروسها.',
    reasonForNaming: 'سميت بالأنفال لأنها افتتحت بالسؤال عن حكم الغنائم بعد بدر.'
  },
  {
    id: 9,
    name: 'التوبة',
    englishName: 'At-Tawbah',
    englishNameTranslation: 'The Repentance',
    numberOfAyahs: 129,
    revelationType: 'Medinan',
    revelationOrder: 113,
    juzStart: 10,
    pageStart: 187,
    wordsCount: 2497,
    lettersCount: 10873,
    summary: 'البراءة من المشركين الناقضين للعهود، فضح المنافقين، أحداث غزوة تبوك، وتوبة الله على الثلاثة الذين خلفوا.',
    themes: ['إعلان البراءة من المشركين', 'أصناف المنافقين ومكائدهم', 'غزوة تبوك وساعة العسرة', 'مصارف الزكاة الثمانية', 'توبة الله على الثلاثة الذين خُلّفوا'],
    virtues: 'الفاضحة والمقشقشة لأنها فضحت النفاق وأبرأت المؤمنين.',
    reasonForNaming: 'سميت بالتوبة لذكر توبة الله تعالى على النبي والمهاجرين والأنصار والثلاثة.'
  },
  {
    id: 10,
    name: 'يونس',
    englishName: 'Yunus',
    englishNameTranslation: 'Jonah',
    numberOfAyahs: 109,
    revelationType: 'Meccan',
    revelationOrder: 51,
    juzStart: 11,
    pageStart: 208,
    wordsCount: 1832,
    lettersCount: 7425,
    summary: 'إثبات الوحي والنبوة، عظمة خلق الكون، بيان سنن الله في إهلاك المكذبين ونجاة المؤمنين كقوم يونس.',
    themes: ['الوحي والقرآن المعجز', 'القدر والتدبير الإلهي', 'قصة موسى وهارون مع فرعون', 'قصة قوم يونس عليه السلام واستثناء إيمانهم'],
    virtues: 'من المئين التي أوتيها النبي صلى الله عليه وسلم مكان الإنجيل.',
    reasonForNaming: 'سميت باسم نبي الله يونس عليه السلام لخصوصية قصة قومه في قبول التوبة.'
  },
  {
    id: 18,
    name: 'الكهف',
    englishName: 'Al-Kahf',
    englishNameTranslation: 'The Cave',
    numberOfAyahs: 110,
    revelationType: 'Meccan',
    revelationOrder: 69,
    juzStart: 15,
    pageStart: 293,
    wordsCount: 1577,
    lettersCount: 6425,
    summary: 'عصمة من فتن الدنيا الأربع (فتنة الدين، فتنة المال، فتنة العلم، فتنة السلطان) من خلال 4 قصص كبرى.',
    themes: ['قصة أصحاب الكهف (العصمة في الدين)', 'قصة صاحب الجنتين (فتنة المال)', 'قصة موسى والخضر (فتنة العلم والتواضع)', 'قصة ذي القرنين ويأجوج ومأجوج (فتنة الحكم والتمكين)'],
    virtues: 'من قرأ سورة الكهف يوم الجمعة أضاء له من النور ما بين الجمعتين، وحفظ عشر آيات من أولها يعصم من فتنة المسيح الدجال.',
    reasonForNaming: 'لذكر قصة الفتية المؤمنين الذين أووا إلى الكهف فراراً بدينهم.'
  },
  {
    id: 36,
    name: 'يس',
    englishName: 'Ya-Sin',
    englishNameTranslation: 'Ya-Sin',
    numberOfAyahs: 83,
    revelationType: 'Meccan',
    revelationOrder: 41,
    juzStart: 22,
    pageStart: 440,
    wordsCount: 729,
    lettersCount: 2988,
    summary: 'قلب القرآن، ترسيخ أصول العقيدة في الرسالة والبعث والنشور، وضرب الأمثال بحبيب النجار ومصير المكذبين.',
    themes: ['القسم بالقرآن الحكيم على صحة النبوة', 'قصة أصحاب القرية ومؤمن آل يس', 'آيات الله في إحياء الأرض والشمس والقمر والفلك المشحون', 'مشاهد البعث والحساب والجنة والنار'],
    virtues: 'سورة جليلة القدر تقرأ عند الشدائد ولتثبيت اليقين في الآخرة.',
    reasonForNaming: 'افتتحت بالحروف المقطعة (يس) للتحدي والإعجاز.'
  },
  {
    id: 55,
    name: 'الرحمن',
    englishName: 'Ar-Rahman',
    englishNameTranslation: 'The Beneficent',
    numberOfAyahs: 78,
    revelationType: 'Medinan',
    revelationOrder: 97,
    juzStart: 27,
    pageStart: 531,
    wordsCount: 351,
    lettersCount: 1585,
    summary: 'عروس القرآن، تعداد نعم الله العظيمة في الآفاق والأنفس، وتكرار النداء المزلزل للثقلين: "فبأي آلاء ربكما تكذبان".',
    themes: ['تعليم القرآن وخلق الإنسان والبيان', 'تسيير الأفلاك والبحار والميزان', 'فناء كل من على الأرض وبقاء وجه ربك ذي الجلال والإكرام', 'وصف دقيق لنعيم الجنتين وأهليهما'],
    virtues: 'تسمى عروس القرآن لجمال نظمها وعظيم ما تضمنته من وصف الجنان.',
    reasonForNaming: 'افتتحت باسم الله الأعظم "الرحمن" مفيض النعم على سائر البريات.'
  },
  {
    id: 56,
    name: 'الواقعة',
    englishName: 'Al-Waqi\'ah',
    englishNameTranslation: 'The Inevitable',
    numberOfAyahs: 96,
    revelationType: 'Meccan',
    revelationOrder: 46,
    juzStart: 27,
    pageStart: 534,
    wordsCount: 379,
    lettersCount: 1692,
    summary: 'وصف أهوال يوم القيامة الحتمية، وتقسيم الناس إلى ثلاثة أصناف: السابقون، وأصحاب اليمين، وأصحاب الشمال.',
    themes: ['أهوال قيام الساعة وتبدل معالم الأرض', 'درجات السابقين المقربين ونعيمهم', 'نعيم أصحاب اليمين', 'عذاب أصحاب الشمال وسوء منقلبهم', 'أدلة الخلق والزرع والماء والنار على قدرة الله'],
    virtues: 'سورة الغنى، كان النبي صلى الله عليه وسلم يقرأ بها في صلاة الفجر.',
    reasonForNaming: 'سميت بالواقعة لأنها تبدأ بذكر يوم القيامة الواقع الذي لا مرية فيه.'
  },
  {
    id: 67,
    name: 'الملك',
    englishName: 'Al-Mulk',
    englishNameTranslation: 'The Sovereignty',
    numberOfAyahs: 30,
    revelationType: 'Meccan',
    revelationOrder: 77,
    juzStart: 29,
    pageStart: 562,
    wordsCount: 333,
    lettersCount: 1316,
    summary: 'التبارك والمانعة والمنجية، إثبات كمال ملك الله وإتقان خلقه للسماوات والشهب والموت والحياة للاختبار.',
    themes: ['حكمة خلق الموت والحياة ليبلوكم أيكم أحسن عملاً', 'إتقان خلق السماوات السبع والتحدي بوجود تفاوت', 'حوار خزنة جهنم مع الفوج الكافر', 'علم الله بما تسرون وما تعلنون وأمنه في الأرض'],
    virtues: 'سورة ثلاثون آية شفعت لرجل حتى غُفر له، وهي المانعة من عذاب القبر.',
    reasonForNaming: 'سميت بالملك لاستهلالها ببيان سعة ملك الله وتصرفه المطلق.'
  },
  {
    id: 112,
    name: 'الإخلاص',
    englishName: 'Al-Ikhlas',
    englishNameTranslation: 'The Sincerity',
    numberOfAyahs: 4,
    revelationType: 'Meccan',
    revelationOrder: 22,
    juzStart: 30,
    pageStart: 604,
    wordsCount: 15,
    lettersCount: 47,
    summary: 'محض التوحيد الخالص، تنزيه الله عن الشبيه والولد والشريك والصاحبة.',
    themes: ['وحدانية الله الأحد', 'الصمد الذي تصمد إليه الخلائق في حوائجها', 'نفي الوالد والولد والكفء'],
    virtues: 'تعدل ثلث القرآن الكريم في الأجر والمعنى لأنها تمحضت لصفات الرب تبارك وتعالى.',
    reasonForNaming: 'لأنها أخلصت بيان صفة الله ولأن قارئها يخلص التوحيد لله.'
  },
  {
    id: 113,
    name: 'الفلق',
    englishName: 'Al-Falaq',
    englishNameTranslation: 'The Daybreak',
    numberOfAyahs: 5,
    revelationType: 'Meccan',
    revelationOrder: 20,
    juzStart: 30,
    pageStart: 604,
    wordsCount: 23,
    lettersCount: 71,
    summary: 'الاستعاذة برب الفلق من شرور المخلوقات والظلمات والسحر والحسد.',
    themes: ['الاعتصام برب الصبح', 'الاستعاذة من شر ما خلق', 'الاستعاذة من غاسق إذا وقب والساحرات والحاسدين'],
    virtues: 'المعوذتان، ما تعوذ متعوذ بمثلهما قط.',
    reasonForNaming: 'سميت بالفلق وهو الصبح الذي يفلقه الله ويطرد به الظلام.'
  },
  {
    id: 114,
    name: 'الناس',
    englishName: 'An-Nas',
    englishNameTranslation: 'Mankind',
    numberOfAyahs: 6,
    revelationType: 'Meccan',
    revelationOrder: 21,
    juzStart: 30,
    pageStart: 604,
    wordsCount: 20,
    lettersCount: 80,
    summary: 'الاستعاذة بمالك الملوك وإله الناس من وسواس الشياطين وجنود إبليس من الجنة والناس.',
    themes: ['توسل بربوبية الله وملكه وإلهيته', 'الاستعاذة من الوسواس الخناس الذي يوسوس في صدور الناس'],
    virtues: 'خاتمة كتاب الله الكريم وأعظم ما يتحصن به العبد.',
    reasonForNaming: 'لتكرار كلمة "الناس" في آياتها ولبيان حفظ الله ورعايته لخلقه.'
  }
];

// Helper to fill the rest of the 114 Surahs metadata seamlessly
const ALL_SURAHS_NAMES = [
  'الفاتحة', 'البقرة', 'آل عمران', 'النساء', 'المائدة', 'الأنعام', 'الأعراف', 'الأنفال', 'التوبة', 'يونس',
  'هود', 'يوسف', 'الرعد', 'إبراهيم', 'الحجر', 'النحل', 'الإسراء', 'الكهف', 'مريم', 'طه',
  'الأنبياء', 'الحج', 'المؤمنون', 'النور', 'الفرقان', 'الشعراء', 'النمل', 'القصص', 'العنكبوت', 'الروم',
  'لقمان', 'السجدة', 'الأحزاب', 'سبأ', 'فاطر', 'يس', 'الصافات', 'ص', 'الزمر', 'غافر',
  'فصلت', 'الشورى', 'الزخرف', 'الدخان', 'الجاثية', 'الأحقاف', 'محمد', 'الفتح', 'الحجرات', 'ق',
  'الذاريات', 'الطور', 'النجم', 'القمر', 'الرحمن', 'الواقعة', 'الحديد', 'المجادلة', 'الحشر', 'الممتحنة',
  'الصف', 'الجمعة', 'المنافقون', 'التغابن', 'الطلاق', 'التحريم', 'الملك', 'القلم', 'الحاقة', 'المعارج',
  'نوح', 'الجن', 'المزمل', 'المدثر', 'القيامة', 'الإنسان', 'المرسلات', 'النبأ', 'النازعات', 'عبس',
  'التكوير', 'الانفطار', 'المطففين', 'الانشقاق', 'البروج', 'الطارق', 'الأعلى', 'الغاشية', 'الفجر', 'البلد',
  'الشمس', 'الليل', 'الضحى', 'الشرح', 'التين', 'العلق', 'القدر', 'البينة', 'الزلزلة', 'العاديات',
  'القارعة', 'التكاثر', 'العصر', 'الهمزة', 'الفيل', 'قريش', 'الماعون', 'الكوثر', 'الكافرون', 'النصر',
  'المسد', 'الإخلاص', 'الفلق', 'الناس'
];

const SURAH_AYAH_COUNTS = [
  7, 286, 200, 176, 120, 165, 206, 75, 129, 109,
  123, 111, 43, 52, 99, 128, 111, 110, 98, 135,
  112, 78, 118, 64, 77, 227, 93, 88, 69, 60,
  34, 30, 73, 54, 45, 83, 182, 88, 75, 85,
  54, 53, 89, 59, 37, 35, 38, 29, 18, 45,
  60, 49, 62, 55, 78, 96, 29, 22, 24, 13,
  14, 11, 11, 18, 12, 12, 30, 52, 52, 44,
  28, 28, 20, 56, 40, 31, 50, 40, 46, 42,
  29, 19, 36, 25, 22, 17, 19, 26, 30, 20,
  15, 21, 11, 8, 8, 19, 5, 8, 8, 11,
  11, 8, 3, 9, 5, 4, 7, 3, 6, 3,
  5, 4, 5, 6
];

export function getAllSurahs(): SurahMeta[] {
  const map = new Map<number, SurahMeta>();
  SURAHS_LIST.forEach(s => map.set(s.id, s));

  return ALL_SURAHS_NAMES.map((name, index) => {
    const id = index + 1;
    if (map.has(id)) {
      return map.get(id)!;
    }
    const count = SURAH_AYAH_COUNTS[index] || 10;
    const isMedinan = [2, 3, 4, 5, 8, 9, 22, 24, 33, 47, 48, 49, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 76, 98, 110].includes(id);
    return {
      id,
      name,
      englishName: `Surah ${id}`,
      englishNameTranslation: name,
      numberOfAyahs: count,
      revelationType: isMedinan ? 'Medinan' : 'Meccan',
      revelationOrder: id,
      juzStart: Math.min(30, Math.ceil((id / 114) * 30)),
      pageStart: Math.min(604, id * 5),
      summary: `سورة ${name} المباركة، تشتمل على هدايات ربانية وأحكام وقيم إيمانية عظيمة.`,
      themes: ['التوحيد والعبودية', 'العمل الصالح وتقوى الله', 'التربية الإيمانية والأخلاق']
    };
  });
}

// Pre-packaged authentic verses with Uthmani script & word details
export const SAMPLE_VERSES_DATA: Record<number, Ayah[]> = {
  1: [
    {
      id: 1,
      surahNumber: 1,
      numberInSurah: 1,
      juz: 1,
      page: 1,
      hizbQuarter: 1,
      textUthmani: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
      textSimple: 'بسم الله الرحمن الرحيم',
      translationEn: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      translationFr: 'Au nom d\'Allah, le Tout Miséricordieux, le Très Miséricordieux.',
      translationUr: 'اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے',
      tafsirSummary: 'أبدأ قراءتي مستعيناً باسم الله الأعظم، الرحمن الذي وسعت رحمته كل شيء، الرحيم بالمؤمنين.',
      words: [
        { id: 1, arabic: 'بِسْمِ', transliteration: 'Bismi', translation: 'In (the) name', root: 'سمو' },
        { id: 2, arabic: 'ٱللَّهِ', transliteration: 'Allahi', translation: 'of Allah', root: 'اله' },
        { id: 3, arabic: 'ٱلرَّحْمَـٰنِ', transliteration: 'Ar-Rahmani', translation: 'the Entirely Merciful', root: 'رحم' },
        { id: 4, arabic: 'ٱلرَّحِيمِ', transliteration: 'Ar-Rahimi', translation: 'the Especially Merciful', root: 'رحم' }
      ]
    },
    {
      id: 2,
      surahNumber: 1,
      numberInSurah: 2,
      juz: 1,
      page: 1,
      hizbQuarter: 1,
      textUthmani: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ',
      textSimple: 'الحمد لله رب العالمين',
      translationEn: '[All] praise is [due] to Allah, Lord of the worlds -',
      translationFr: 'Louange à Allah, Seigneur de l\'univers.',
      translationUr: 'سب تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے',
      tafsirSummary: 'الثناء الكامل والمحبة والتعظيم لله تعالى وحده، المربي لجميع خلقه بنعمه الظاهرة والباطنة.',
      words: [
        { id: 1, arabic: 'ٱلْحَمْدُ', transliteration: 'Al-hamdu', translation: 'All praise', root: 'حمد' },
        { id: 2, arabic: 'لِلَّهِ', transliteration: 'lillahi', translation: 'be to Allah', root: 'اله' },
        { id: 3, arabic: 'رَبِّ', transliteration: 'Rabbi', translation: 'Lord', root: 'ربب' },
        { id: 4, arabic: 'ٱلْعَـٰلَمِينَ', transliteration: 'Al-\'Alameen', translation: 'of the worlds', root: 'علم' }
      ]
    },
    {
      id: 3,
      surahNumber: 1,
      numberInSurah: 3,
      juz: 1,
      page: 1,
      hizbQuarter: 1,
      textUthmani: 'ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
      textSimple: 'الرحمن الرحيم',
      translationEn: 'The Entirely Merciful, the Especially Merciful,',
      translationFr: 'Le Tout Miséricordieux, le Très Miséricordieux,',
      translationUr: 'بڑا مہربان نہایت رحم والا',
      tafsirSummary: 'تكرار صفتي الرحمة لبيان سعة فضله وإحسانه على عباده في الدنيا والآخرة.',
      words: [
        { id: 1, arabic: 'ٱلرَّحْمَـٰنِ', transliteration: 'Ar-Rahman', translation: 'The Entirely Merciful', root: 'رحم' },
        { id: 2, arabic: 'ٱلرَّحِيمِ', transliteration: 'Ar-Raheem', translation: 'The Especially Merciful', root: 'رحم' }
      ]
    },
    {
      id: 4,
      surahNumber: 1,
      numberInSurah: 4,
      juz: 1,
      page: 1,
      hizbQuarter: 1,
      textUthmani: 'مَـٰلِكِ يَوْمِ ٱلدِّينِ',
      textSimple: 'مالك يوم الدين',
      translationEn: 'Sovereign of the Day of Recompense.',
      translationFr: 'Maître du Jour de la rétribution.',
      translationUr: 'بدلے کے دن کا مالک',
      tafsirSummary: 'المتصرف وحده بلا منازع يوم القيامة، يوم الجزاء والحساب بالعدل.',
      words: [
        { id: 1, arabic: 'مَـٰلِكِ', transliteration: 'Maliki', translation: 'Master / Sovereign', root: 'ملك' },
        { id: 2, arabic: 'يَوْمِ', transliteration: 'Yawmi', translation: 'of the Day', root: 'يوم' },
        { id: 3, arabic: 'ٱلدِّينِ', transliteration: 'Ad-Deen', translation: 'of Recompense', root: 'دين' }
      ]
    },
    {
      id: 5,
      surahNumber: 1,
      numberInSurah: 5,
      juz: 1,
      page: 1,
      hizbQuarter: 1,
      textUthmani: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
      textSimple: 'إياك نعبد وإياك نستعين',
      translationEn: 'It is You we worship and You we ask for help.',
      translationFr: 'C\'est Toi [Seul] que nous adorons, et c\'est Toi [Seul] dont nous implorons secours.',
      translationUr: 'ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں',
      tafsirSummary: 'نخصك وحدك بالعبادة والخضوع، ونخصك وحدك بطلب العون والتوفيق في سائر أمورنا.',
      words: [
        { id: 1, arabic: 'إِيَّاكَ', transliteration: 'Iyyaka', translation: 'You alone', root: 'ايا' },
        { id: 2, arabic: 'نَعْبُدُ', transliteration: 'na\'budu', translation: 'we worship', root: 'عبد' },
        { id: 3, arabic: 'وَإِيَّاكَ', transliteration: 'wa iyyaka', translation: 'and You alone', root: 'ايا' },
        { id: 4, arabic: 'نَسْتَعِينُ', transliteration: 'nasta\'een', translation: 'we ask for help', root: 'عون' }
      ]
    },
    {
      id: 6,
      surahNumber: 1,
      numberInSurah: 6,
      juz: 1,
      page: 1,
      hizbQuarter: 1,
      textUthmani: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ',
      textSimple: 'اهدنا الصراط المستقيم',
      translationEn: 'Guide us to the straight path -',
      translationFr: 'Guide-nous dans le droit chemin,',
      translationUr: 'ہمیں سیدھے راستے کی ہدایت فرما',
      tafsirSummary: 'وفقنا وثبتنا وأرشدنا إلى دين الإسلام الحق، الواضح الذي لا اعوجاج فيه.',
      words: [
        { id: 1, arabic: 'ٱهْدِنَا', transliteration: 'Ihdina', translation: 'Guide us', root: 'هدي' },
        { id: 2, arabic: 'ٱلصِّرَٰطَ', transliteration: 'as-sirat', translation: 'to the path', root: 'صرط' },
        { id: 3, arabic: 'ٱلْمُسْتَقِيمَ', transliteration: 'al-mustaqeem', translation: 'the straight', root: 'قوم' }
      ]
    },
    {
      id: 7,
      surahNumber: 1,
      numberInSurah: 7,
      juz: 1,
      page: 1,
      hizbQuarter: 1,
      textUthmani: 'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ',
      textSimple: 'صراط الذين أنعمت عليهم غير المغضوب عليهم ولا الضالين',
      translationEn: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
      translationFr: 'le chemin de ceux que Tu as comblés de faveurs, non pas de ceux qui ont encouru Ta colère, ni des égarés.',
      translationUr: 'ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، نہ کہ ان کا جن پر غضب نازل ہوا اور نہ گمراہوں کا',
      tafsirSummary: 'طريق النبيين والصدّيقين والشهداء والصالحين، غير طريق اليهود الذين عرفوا الحق ولم يعملوا به فغضب الله عليهم، وغير طريق النصارى الذين عبدوا الله على جهل وضلال.',
      words: [
        { id: 1, arabic: 'صِرَٰطَ', transliteration: 'Sirata', translation: 'Path', root: 'صرط' },
        { id: 2, arabic: 'ٱلَّذِينَ', transliteration: 'alladheena', translation: 'of those', root: 'لذي' },
        { id: 3, arabic: 'أَنْعَمْتَ', transliteration: 'an\'amta', translation: 'You bestowed favor', root: 'نعم' },
        { id: 4, arabic: 'عَلَيْهِمْ', transliteration: '\'alayhim', translation: 'upon them', root: 'علي' },
        { id: 5, arabic: 'غَيْرِ', transliteration: 'ghayri', translation: 'not', root: 'غير' },
        { id: 6, arabic: 'ٱلْمَغْضُوبِ', transliteration: 'al-maghdoobi', translation: 'of those who earned wrath', root: 'غضب' },
        { id: 7, arabic: 'عَلَيْهِمْ', transliteration: '\'alayhim', translation: 'upon them', root: 'علي' },
        { id: 8, arabic: 'وَلَا', transliteration: 'wa la', translation: 'and not', root: 'لا' },
        { id: 9, arabic: 'ٱلضَّآلِّينَ', transliteration: 'ad-daalleen', translation: 'those who are astray', root: 'ضلل' }
      ]
    }
  ],
  112: [
    {
      id: 1,
      surahNumber: 112,
      numberInSurah: 1,
      juz: 30,
      page: 604,
      hizbQuarter: 240,
      textUthmani: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ',
      textSimple: 'قل هو الله أحد',
      translationEn: 'Say, "He is Allah, [who is] One,',
      tafsirSummary: 'قل يا محمد لهؤلاء المشركين السائلين عن نسب ربك: هو الله المتفرد بالألوهية والربوبية والأسماء والصفات، لا نظير له ولا مثيل.',
      words: [
        { id: 1, arabic: 'قُلْ', transliteration: 'Qul', translation: 'Say', root: 'قول' },
        { id: 2, arabic: 'هُوَ', transliteration: 'Huwa', translation: 'He is', root: 'هو' },
        { id: 3, arabic: 'ٱللَّهُ', transliteration: 'Allahu', translation: 'Allah', root: 'اله' },
        { id: 4, arabic: 'أَحَدٌ', transliteration: 'Ahad', translation: 'One', root: 'احد' }
      ]
    },
    {
      id: 2,
      surahNumber: 112,
      numberInSurah: 2,
      juz: 30,
      page: 604,
      hizbQuarter: 240,
      textUthmani: 'ٱللَّهُ ٱلصَّمَدُ',
      textSimple: 'الله الصمد',
      translationEn: 'Allah, the Eternal Refuge.',
      tafsirSummary: 'السيد الكامل في سؤدده وعظمته، الذي تقصده جميع الخلائق في قضاء حوائجها ولا يستغني عنه أحد.',
      words: [
        { id: 1, arabic: 'ٱللَّهُ', transliteration: 'Allahu', translation: 'Allah', root: 'اله' },
        { id: 2, arabic: 'ٱلصَّمَدُ', transliteration: 'As-Samad', translation: 'The Eternal Refuge', root: 'صمد' }
      ]
    },
    {
      id: 3,
      surahNumber: 112,
      numberInSurah: 3,
      juz: 30,
      page: 604,
      hizbQuarter: 240,
      textUthmani: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
      textSimple: 'لم يلد ولم يولد',
      translationEn: 'He neither begets nor is born,',
      tafsirSummary: 'ليس له ولد ولا والد ولا صاحبة، لكمال غناه وقدمه وأزليته سبحانه.',
      words: [
        { id: 1, arabic: 'لَمْ', transliteration: 'Lam', translation: 'Not', root: 'لم' },
        { id: 2, arabic: 'يَلِدْ', transliteration: 'yalid', translation: 'He begets', root: 'ولد' },
        { id: 3, arabic: 'وَلَمْ', transliteration: 'wa lam', translation: 'and not', root: 'لم' },
        { id: 4, arabic: 'يُولَدْ', transliteration: 'yoolad', translation: 'was He begotten', root: 'ولد' }
      ]
    },
    {
      id: 4,
      surahNumber: 112,
      numberInSurah: 4,
      juz: 30,
      page: 604,
      hizbQuarter: 240,
      textUthmani: 'وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ',
      textSimple: 'ولم يكن له كفوا أحد',
      translationEn: 'Nor is there to Him any equivalent."',
      tafsirSummary: 'وليس له مكافئ ولا مماثل ولا شريك في ذاته ولا في أسمائه ولا في صفاته ولا في أفعاله جل في علاه.',
      words: [
        { id: 1, arabic: 'وَلَمْ', transliteration: 'Wa lam', translation: 'And not', root: 'لم' },
        { id: 2, arabic: 'يَكُن', transliteration: 'yakun', translation: 'is', root: 'كون' },
        { id: 3, arabic: 'لَّهُۥ', transliteration: 'lahoo', translation: 'for Him', root: 'له' },
        { id: 4, arabic: 'كُفُوًا', transliteration: 'kufuwan', translation: 'equivalent', root: 'كفا' },
        { id: 5, arabic: 'أَحَدٌۢ', transliteration: 'Ahad', translation: 'anyone', root: 'احد' }
      ]
    }
  ]
};
