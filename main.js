'use strict';
const { Plugin, PluginSettingTab, Setting, Modal, MarkdownView, Notice, TFile, TFolder } = require('obsidian');

/* ══════════════════════════════════════════════
   LANGUAGE DETECTION
══════════════════════════════════════════════ */
const getAppLang = () => {
  if (window.i18next?.language) return window.i18next.language.startsWith('ar') ? 'ar' : 'en';
  if (document.documentElement.lang?.startsWith('ar')) return 'ar';
  return 'en';
};

/* ══════════════════════════════════════════════
   TRANSLATIONS
══════════════════════════════════════════════ */
const TR = {
  en: {
    paletteTitle:'Formatting Palette', searchPlaceholder:'Search formats…', noResults:'No results',
    kbNavigate:'navigate', kbInsert:'insert', kbClose:'close',
    catInsert:'Insert', catCallouts:'Callouts', catCustom:'Custom Callouts',
    catIslamic:'Islamic', catHeadings:'Headings', catText:'Text',
    catLists:'Lists', catCode:'Code', catDividers:'Dividers',
    iDateLocale:'Date (Long)', iDateIso:'Date (ISO)', iTimeLocale:'Time',
    iTime24:'Time (24h)', iDatetime:'Date & Time', iProgress:'Progress Bar',
    settingsTitle:'Obsidian Toolkit',
    fmtName:'🎨 Formatting Palette', fmtDesc:'Insert callouts, formatting & dividers — Ctrl+Shift+F',
    imgName:'🖼 Image Control',      imgDesc:'Click-activated toolbar: resize, align, rotate, lightbox & caption. Reading View only.',
    fsName:'⛶ Fullscreen Note',      fsDesc:'Floating fullscreen button + Ctrl+Shift+Z',
    autoFsName:'⏱ Auto-Fullscreen',  autoFsDesc:'Enter fullscreen automatically after inactivity',
    autoFsDelayName:'Inactivity timeout (seconds)', autoFsDelayDesc:'5–120 seconds',
    ftName:'🌳 Premium File Tree',   ftDesc:'Apple-style icons, image thumbnails & refined spacing in the file explorer',
    ftThumbName:'Image thumbnails',  ftThumbDesc:'Show miniature previews for image files',
    ftHeightName:'Row height',       ftHeightDesc:'Adjust the density of the file tree',
    ftHeightCompact:'Compact', ftHeightDefault:'Default', ftHeightSpacious:'Spacious',
    fmtOn:'✅ Formatting Palette enabled',  fmtOff:'⛔ Formatting Palette disabled',
    imgOn:'✅ Image Control enabled',       imgOff:'⛔ Image Control disabled',
    fsOn:'✅ Fullscreen enabled',           fsOff:'⛔ Fullscreen disabled',
    ftOn:'✅ File Tree enhanced',           ftOff:'⛔ File Tree restored',
    openMd:'Open a markdown file first',
    focusHint:'Entering focus mode…', cancelFocus:'Cancel',
    smaller:'Smaller', larger:'Larger',
    alignL:'Float left', alignC:'Center', alignR:'Float right',
    rotate:'Rotate 90°', caption:'Caption', captionPH:'Add a caption…',
    lightbox:'Open in lightbox', copyMd:'Copy Markdown', copied:'✅ Copied!',
    progressTitle:'Insert Progress Bar', progressValue:'Value',
    progressPreview:'Preview', progressInsert:'Insert', progressCancel:'Cancel',
    reset:'Reset to original',
    aiName:'🤖 AI Provider (Custom / Ollama)', aiDesc:'Connect any OpenAI-compatible API (OpenRouter, Groq, Ollama, Anthropic proxy…) to power Smart Template suggestions.',
    aiUrlName:'API Base URL', aiUrlDesc:'e.g. https://openrouter.ai/api/v1 or http://localhost:11434/v1 for Ollama',
    aiKeyName:'API Key', aiKeyDesc:'Leave empty for providers that don\'t require a key (e.g. local Ollama)',
    aiModelName:'Model name', aiModelDesc:'e.g. gpt-4o-mini, llama3, anthropic/claude-3.5-sonnet',
    aiTest:'Test Connection', aiTestOk:'✅ Connection successful!', aiTestFail:'❌ Connection failed: ',
    aiOn:'✅ AI Provider enabled', aiOff:'⛔ AI Provider disabled',
    iSmartTemplate:'AI Smart Suggestion',
    aiSuggestTitle:'✨ Smart Template Suggestion', aiThinking:'Thinking…',
    aiNoContext:'Write some text first so the AI has context to work with.',
    aiDisabled:'Enable the AI Provider in Settings first.',
    aiRegenerate:'Regenerate', aiInsertSuggestion:'Insert', aiCloseModal:'Close',
    aiError:'⚠️ Request failed: ',
    aiProviderName:'AI Provider', aiProviderDesc:'Choose which AI provider to use',
    aiProviderOllama:'Ollama (local)', aiProviderOpenAI:'OpenAI', aiProviderCustom:'Custom (OpenAI-compatible)',
    aiModelDropdownName:'Ollama Model', aiModelDropdownDesc:'Select an installed Ollama model. Make sure Ollama is running (ollama serve).',
    aiFetchModels:'Fetch models', aiFetchingModels:'Fetching…',
    aiModelsFetchOk:'✅ Found {n} model(s)', aiModelsFetchFail:'❌ Could not reach Ollama: ',
    aiNoModelsYet:'Click "Fetch models" to load your installed Ollama models',
    aiLangName:'Response Language', aiLangDesc:'Language used for AI Smart Template suggestions',
    aiLangAuto:'Auto (match your text)', aiLangAr:'Arabic', aiLangEn:'English',
    aiPromptName:'Edit System Prompt', aiPromptDesc:'Customize how the AI generates Smart Template suggestions',
    aiPromptReset:'Reset to default',
    iTemplateGen:'AI Template Generator',
    tgTitle:'📐 AI Template Generator',
    tgDescLabel:'What do you want to create?', tgDescPlaceholder:'e.g. weekly meeting notes, book review, daily planner, lesson plan…',
    tgPromptLabel:'Extra instructions (optional)', tgPromptPlaceholder:'e.g. include a callout for action items, keep it short, use Arabic headings…',
    tgGenerate:'Generate', tgRegenerate:'↻ Regenerate', tgInsert:'Insert', tgCancel:'Cancel',
    tgEmptyDesc:'Describe what kind of template you want first.',
    tgThinking:'Generating template…',
    qbName:'⚡ Quick Access Bar', qbDesc:'A pinned row of buttons above your file explorer for one-click access to favorite notes and folders.',
    qbItemsLabel:'Pinned items',
    qbPathPlaceholder:'folder/note.md or folder/subfolder',
    qbLabelPlaceholder:'Display name (optional)',
    qbAdd:'Add', qbAddCurrent:'+ Add current file', qbAddCurrentFolder:'+ Add current folder',
    qbRemove:'Remove', qbEmpty:'No pinned items yet — add some below.',
    qbNotFound:'⚠️ Not found in vault: ', qbNoActiveFile:'No active file to add.',
    qbInvalidPath:'Enter a path first.', qbDuplicate:'Already pinned.',
    ffFocusMenuItem:'📁 Focus on this folder', ffUnfocusMenuItem:'✕ Exit folder focus',
    ffBack:'All files', ffFocusOn:'📁 Focused on: ', ffFocusOff:'Folder focus cleared',
    ffName:'📁 Folder Focus Mode', ffDesc:'Right-click any folder → "Focus on this folder" to make it look like the vault root in the sidebar. (Search, graph, and Quick Switcher still cover the whole vault.)',
    mfName:'📂 Main Folders (auto-focus)', mfDesc:'Folders in this list jump straight into Focus Mode when clicked — their sub-folders stay collapsed.',
    mfPathPlaceholder:'folder/subfolder', mfAddCurrent:'+ Add current folder',
    mfAdd:'Add', mfRemove:'Remove', mfEmpty:'No main folders yet — add some below.',
    mfDuplicate:'Already a main folder.', mfNoActiveFile:'No active file to detect its folder.',
    mfInvalidPath:'Enter a path first.',
  },
  ar: {
    paletteTitle:'لوحة التنسيق', searchPlaceholder:'ابحث عن تنسيق…', noResults:'لا توجد نتائج',
    kbNavigate:'تنقل', kbInsert:'إدراج', kbClose:'إغلاق',
    catInsert:'إدراج سريع', catCallouts:'تنبيهات', catCustom:'تنبيهات مخصصة',
    catIslamic:'إسلامي', catHeadings:'عناوين', catText:'نص',
    catLists:'قوائم', catCode:'كود', catDividers:'فواصل',
    iDateLocale:'التاريخ (طويل)', iDateIso:'التاريخ (ISO)', iTimeLocale:'الوقت',
    iTime24:'الوقت (24h)', iDatetime:'التاريخ والوقت', iProgress:'شريط تقدم',
    settingsTitle:'Obsidian Toolkit',
    fmtName:'🎨 لوحة التنسيق',       fmtDesc:'إدراج التنبيهات والتنسيقات والفواصل — Ctrl+Shift+F',
    imgName:'🖼 التحكم في الصور',    imgDesc:'شريط أدوات بالنقر: تكبير، محاذاة، تدوير، Lightbox، Caption. وضع القراءة فقط.',
    fsName:'⛶ ملء الشاشة',           fsDesc:'زرار ملء الشاشة العائم + Ctrl+Shift+Z',
    autoFsName:'⏱ ملء الشاشة التلقائي', autoFsDesc:'الدخول في ملء الشاشة تلقائياً عند عدم التفاعل',
    autoFsDelayName:'وقت الانتظار (ثانية)', autoFsDelayDesc:'5–120 ثانية',
    ftName:'🌳 شجرة الملفات المحسّنة', ftDesc:'أيقونات بأسلوب Apple، صور مصغرة، ومسافات أنيقة في مستعرض الملفات',
    ftThumbName:'صور مصغرة',          ftThumbDesc:'معاينة مصغرة لملفات الصور',
    ftHeightName:'ارتفاع الصف',       ftHeightDesc:'تحكم في كثافة عرض شجرة الملفات',
    ftHeightCompact:'مضغوط', ftHeightDefault:'افتراضي', ftHeightSpacious:'مريح',
    fmtOn:'✅ لوحة التنسيق مفعّلة',   fmtOff:'⛔ لوحة التنسيق معطّلة',
    imgOn:'✅ التحكم في الصور مفعّل', imgOff:'⛔ التحكم في الصور معطّل',
    fsOn:'✅ ملء الشاشة مفعّل',       fsOff:'⛔ ملء الشاشة معطّل',
    ftOn:'✅ شجرة الملفات محسّنة',    ftOff:'⛔ شجرة الملفات عادية',
    openMd:'افتح ملف markdown أولاً',
    focusHint:'جاري الدخول في وضع التركيز…', cancelFocus:'إلغاء',
    smaller:'أصغر', larger:'أكبر',
    alignL:'يسار', alignC:'وسط', alignR:'يمين',
    rotate:'تدوير 90°', caption:'Caption', captionPH:'اكتب الـ caption هنا...',
    lightbox:'فتح في lightbox', copyMd:'نسخ Markdown', copied:'✅ تم النسخ!',
    progressTitle:'إدراج شريط تقدم', progressValue:'النسبة',
    progressPreview:'معاينة', progressInsert:'إدراج', progressCancel:'إلغاء',
    reset:'إعادة الضبط للوضع الأصلي',
    aiName:'🤖 مزوّد الذكاء الاصطناعي (مخصص / Ollama)', aiDesc:'اربط أي API متوافق مع OpenAI (OpenRouter, Groq, Ollama, Anthropic proxy…) لتشغيل اقتراحات Smart Template.',
    aiUrlName:'رابط API الأساسي', aiUrlDesc:'مثال: https://openrouter.ai/api/v1 أو http://localhost:11434/v1 لـ Ollama',
    aiKeyName:'مفتاح API', aiKeyDesc:'اتركه فاضي للمزوّدات التي لا تتطلب مفتاح (مثل Ollama المحلي)',
    aiModelName:'اسم الموديل', aiModelDesc:'مثال: gpt-4o-mini, llama3, anthropic/claude-3.5-sonnet',
    aiTest:'اختبار الاتصال', aiTestOk:'✅ الاتصال ناجح!', aiTestFail:'❌ فشل الاتصال: ',
    aiOn:'✅ مزوّد الذكاء الاصطناعي مفعّل', aiOff:'⛔ مزوّد الذكاء الاصطناعي معطّل',
    iSmartTemplate:'اقتراح ذكي (AI)',
    aiSuggestTitle:'✨ اقتراح Smart Template', aiThinking:'جاري التفكير…',
    aiNoContext:'اكتب بعض النص أولاً حتى يكون للذكاء الاصطناعي سياق للعمل عليه.',
    aiDisabled:'فعّل مزوّد الذكاء الاصطناعي من الإعدادات أولاً.',
    aiRegenerate:'إعادة المحاولة', aiInsertSuggestion:'إدراج', aiCloseModal:'إغلاق',
    aiError:'⚠️ فشل الطلب: ',
    aiProviderName:'مزوّد الذكاء الاصطناعي', aiProviderDesc:'اختر مزوّد الذكاء الاصطناعي المستخدم',
    aiProviderOllama:'Ollama (محلي)', aiProviderOpenAI:'OpenAI', aiProviderCustom:'مخصص (متوافق مع OpenAI)',
    aiModelDropdownName:'موديل Ollama', aiModelDropdownDesc:'اختر موديل مثبّت على Ollama. تأكد إن Ollama شغّال (ollama serve).',
    aiFetchModels:'جلب الموديلات', aiFetchingModels:'جاري الجلب…',
    aiModelsFetchOk:'✅ تم العثور على {n} موديل', aiModelsFetchFail:'❌ تعذّر الوصول لـ Ollama: ',
    aiNoModelsYet:'اضغط "جلب الموديلات" لتحميل الموديلات المثبتة على Ollama',
    aiLangName:'لغة الرد', aiLangDesc:'اللغة المستخدمة في اقتراحات Smart Template',
    aiLangAuto:'تلقائي (حسب نصك)', aiLangAr:'العربية', aiLangEn:'الإنجليزية',
    aiPromptName:'تعديل System Prompt', aiPromptDesc:'تحكم في طريقة توليد اقتراحات Smart Template',
    aiPromptReset:'إعادة الضبط للوضع الافتراضي',
    iTemplateGen:'مولّد قوالب (AI)',
    tgTitle:'📐 مولّد القوالب بالذكاء الاصطناعي',
    tgDescLabel:'عايز تعمل إيه؟', tgDescPlaceholder:'مثال: محضر اجتماع أسبوعي، مراجعة كتاب، خطة يومية، خطة درس…',
    tgPromptLabel:'تعليمات إضافية (اختياري)', tgPromptPlaceholder:'مثال: ضيف callout لـ action items، خليه مختصر، استخدم عناوين عربية…',
    tgGenerate:'توليد', tgRegenerate:'↻ إعادة المحاولة', tgInsert:'إدراج', tgCancel:'إلغاء',
    tgEmptyDesc:'اكتب وصف لنوع القالب اللي عايزه أولاً.',
    tgThinking:'جاري توليد القالب…',
    qbName:'⚡ شريط الوصول السريع', qbDesc:'شريط أزرار ثابت فوق شجرة الملفات للوصول بضغطة واحدة لملفاتك وفولدراتك المفضلة.',
    qbItemsLabel:'العناصر المثبّتة',
    qbPathPlaceholder:'folder/note.md أو folder/subfolder',
    qbLabelPlaceholder:'الاسم المعروض (اختياري)',
    qbAdd:'إضافة', qbAddCurrent:'+ إضافة الملف الحالي', qbAddCurrentFolder:'+ إضافة الفولدر الحالي',
    qbRemove:'حذف', qbEmpty:'لا توجد عناصر مثبّتة — أضف عناصر من الأسفل.',
    qbNotFound:'⚠️ غير موجود في الـ vault: ', qbNoActiveFile:'لا يوجد ملف مفتوح لإضافته.',
    qbInvalidPath:'اكتب المسار أولاً.', qbDuplicate:'العنصر مثبّت مسبقاً.',
    ffFocusMenuItem:'📁 ركّز على هذا الفولدر', ffUnfocusMenuItem:'✕ إلغاء التركيز',
    ffBack:'كل الملفات', ffFocusOn:'📁 مُركَّز على: ', ffFocusOff:'تم إلغاء التركيز',
    ffName:'📁 وضع التركيز على فولدر', ffDesc:'كليك يمين على أي فولدر → "ركّز على هذا الفولدر" يخليه يبان كأنه جذر الـ vault في الشريط الجانبي. (البحث، الـ graph، و Quick Switcher بيفضلوا يشملوا الـ vault كامل.)',
    mfName:'📂 الفولدرات الرئيسية (تركيز تلقائي)', mfDesc:'الفولدرات في هذه القائمة تدخل في Focus Mode فوراً عند الضغط عليها — والفولدرات الفرعية بداخلها تفضل مقفولة.',
    mfPathPlaceholder:'folder/subfolder', mfAddCurrent:'+ إضافة الفولدر الحالي',
    mfAdd:'إضافة', mfRemove:'حذف', mfEmpty:'لا توجد فولدرات رئيسية — أضف عناصر من الأسفل.',
    mfDuplicate:'موجود مسبقاً في القائمة.', mfNoActiveFile:'لا يوجد ملف مفتوح لمعرفة فولدره.',
    mfInvalidPath:'اكتب المسار أولاً.',
  }
};
const t = (k) => { const l = getAppLang(); return TR[l]?.[k] ?? TR.en[k] ?? k; };

/* ══════════════════════════════════════════════
   CATEGORY ORDER
══════════════════════════════════════════════ */
const CAT_ORDER = ['Insert','Callouts','Custom Callouts','Islamic','Headings','Text','Lists','Code','Dividers'];
const CAT_TR    = { 'Insert':()=>t('catInsert'), 'Callouts':()=>t('catCallouts'), 'Custom Callouts':()=>t('catCustom'), 'Islamic':()=>t('catIslamic'), 'Headings':()=>t('catHeadings'), 'Text':()=>t('catText'), 'Lists':()=>t('catLists'), 'Code':()=>t('catCode'), 'Dividers':()=>t('catDividers') };

/* ══════════════════════════════════════════════
   DEFAULT SETTINGS
══════════════════════════════════════════════ */
const DEFAULT_SETTINGS = {
  enableFormatting:     true,
  enableImageControl:   true,
  enableFullscreen:     true,
  enableAutoFullscreen: false,
  autoFullscreenDelay:  15,
  enableFileTree:       true,
  fileTreeThumbnails:   true,
  fileTreeRowHeight:    'default',
  /* ── AI / Smart Template Engine ── */
  enableAI:       false,
  aiProvider:     'ollama',          // 'ollama' | 'openai' | 'custom'
  aiApiUrl:       'http://localhost:11434/v1',
  aiApiKey:       '',
  aiModel:        'qwen2.5:3b',
  aiResponseLang: 'auto',            // 'auto' | 'ar' | 'en'
  aiSystemPrompt: '',                // empty = use built-in default
  aiOllamaModels: [],                 // cached list from /api/tags
  /* ── Quick Access Bar ── */
  enableQuickBar: true,
  quickBarItems: [],                  // [{ id, path, label }]
  /* ── Folder Focus Mode ── */
  enableFolderFocus: true,
  focusedFolder: null,                // path of folder currently treated as vault root
  mainFolders: [],                    // paths that auto-enter Focus Mode on click
};

/* ══════════════════════════════════════════════
   SF-STYLE SVG ICONS (15×15, stroke-based)
══════════════════════════════════════════════ */
const S = 'stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"';
const FT_ICONS = {
  folder:     `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" ${S}><path d="M1.5 4.75c0-.55.45-1 1-1h3.1l1.15 1.5H13a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H2.5a1 1 0 0 1-1-1v-6.5z"/></svg>`,
  folderOpen: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" ${S}><path d="M1.5 4.75c0-.55.45-1 1-1h3.1l1.15 1.5H13a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H2.5a1 1 0 0 1-1-1v-6.5z"/><path d="M1.5 7.5h12.5"/></svg>`,
  markdown:   `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" ${S}><path d="M3 2h6.5l3 3v8a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V2.5A.5.5 0 0 1 3 2z"/><path d="M9.5 2v3h3"/><path d="M5.25 9.5V7.75L6.75 9.5 8.25 7.75V9.5"/><path d="M10 9.5V7.5"/><path d="M10 7.5 8.75 9M10 7.5l1.25 1.5"/></svg>`,
  pdf:        `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" ${S}><path d="M3 2h6.5l3 3v8a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V2.5A.5.5 0 0 1 3 2z"/><path d="M9.5 2v3h3"/><path d="M4.5 8.5h1a1 1 0 0 1 0 2h-1V7.5"/><path d="M7.5 7.5H9a1.5 1.5 0 0 1 0 3H7.5V7.5z"/><path d="M11 7.5v3"/></svg>`,
  image:      `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" ${S}><rect x="1.5" y="3" width="12" height="9" rx="1.5"/><circle cx="5" cy="6.25" r="1"/><path d="M1.5 10.5 5 7l2.5 2.5 2-2 4 4.5"/></svg>`,
  video:      `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" ${S}><rect x="1.5" y="3.5" width="9" height="8" rx="1.5"/><path d="M10.5 6.25 13.5 5v5l-3-1.25V6.25z"/></svg>`,
  audio:      `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" ${S}><path d="M1.5 7.5h2l2-3.5 2.5 7 1.75-4.5 1 1H13.5"/></svg>`,
  code:       `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" ${S}><path d="M4.5 4 1 7.5 4.5 11"/><path d="M10.5 4 14 7.5 10.5 11"/><path d="M8.75 2.5l-2.5 10"/></svg>`,
  archive:    `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" ${S}><rect x="1.5" y="2.5" width="12" height="3" rx=".75"/><path d="M2.5 5.5v6.5a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5.5"/><path d="M6 8.5h3"/></svg>`,
  link:       `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" ${S}><path d="M8.5 6.5 6 9a2.5 2.5 0 0 1-3.54-3.54L4 3.92A2.5 2.5 0 0 1 7.54 3.9"/><path d="M6.5 8.5 9 6a2.5 2.5 0 0 1 3.54 3.54l-1.54 1.54A2.5 2.5 0 0 1 7.46 11.1"/></svg>`,
  canvas:     `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" ${S}><rect x="1.5" y="1.5" width="5" height="5" rx="1"/><rect x="8.5" y="1.5" width="5" height="5" rx="1"/><rect x="1.5" y="8.5" width="5" height="5" rx="1"/><rect x="8.5" y="8.5" width="5" height="5" rx="1"/></svg>`,
  text:       `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" ${S}><path d="M3 2h6.5l3 3v8a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V2.5A.5.5 0 0 1 3 2z"/><path d="M9.5 2v3h3"/><path d="M4.5 7h6M4.5 9h6M4.5 11h4"/></svg>`,
};

/* ══════════════════════════════════════════════
   FILE TYPE DETECTION
══════════════════════════════════════════════ */
function getFileType(name) {
  const ext = (name.split('.').pop() || '').toLowerCase();
  const map = {
    md:'markdown', markdown:'markdown', canvas:'canvas',
    pdf:'pdf',
    png:'image', jpg:'image', jpeg:'image', gif:'image', webp:'image', svg:'image', bmp:'image', tiff:'image', ico:'image', avif:'image',
    mp4:'video', mov:'video', avi:'video', mkv:'video', webm:'video', m4v:'video',
    mp3:'audio', wav:'audio', ogg:'audio', flac:'audio', aac:'audio', m4a:'audio', opus:'audio',
    js:'code', ts:'code', py:'code', html:'code', css:'code', json:'code', xml:'code', yaml:'code', yml:'code', sh:'code', bash:'code', rb:'code', go:'code', cpp:'code', c:'code', java:'code', php:'code', rs:'code', swift:'code',
    zip:'archive', rar:'archive', gz:'archive', tar:'archive', '7z':'archive',
    url:'link', webloc:'link',
  };
  return map[ext] || 'text';
}

/* ══════════════════════════════════════════════
   AI PROVIDER PRESETS
══════════════════════════════════════════════ */
const AI_PROVIDER_PRESETS = {
  ollama: { url: 'http://localhost:11434/v1', model: 'qwen2.5:3b' },
  openai: { url: 'https://api.openai.com/v1', model: 'gpt-4o-mini' },
  custom: { url: '', model: '' },
};

/* Convert an OpenAI-compatible base URL (…/v1) to the Ollama root for /api/tags */
function ollamaTagsUrl(aiApiUrl) {
  const base = (aiApiUrl || AI_PROVIDER_PRESETS.ollama.url).replace(/\/+$/, '');
  const root = base.replace(/\/v1$/, '');
  return `${root}/api/tags`;
}

async function fetchOllamaModels(aiApiUrl) {
  const res = await fetch(ollamaTagsUrl(aiApiUrl));
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const data = await res.json();
  return (data?.models || []).map(m => m.name).filter(Boolean);
}

/* ══════════════════════════════════════════════
   AI CLIENT (OpenAI-compatible Custom API / Ollama)
══════════════════════════════════════════════ */
async function callAI(plugin, messages, opts = {}) {
  const { aiApiUrl, aiApiKey, aiModel } = plugin.settings;
  const base = (aiApiUrl || '').replace(/\/+$/, '');
  const url  = `${base}/chat/completions`;

  const headers = { 'Content-Type': 'application/json' };
  if (aiApiKey) headers['Authorization'] = `Bearer ${aiApiKey}`;

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: aiModel || 'gpt-4o-mini',
      messages,
      temperature: opts.temperature ?? 0.6,
      max_tokens: opts.maxTokens ?? 400,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${res.statusText} ${body.slice(0, 180)}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error('Empty response from model');
  return content.trim();
}

const DEFAULT_SMART_TEMPLATE_PROMPT =
  'You are a writing assistant embedded in Obsidian (a markdown note-taking app). ' +
  'Given the context the user is currently writing, suggest ONE short, useful continuation: ' +
  'this can be a relevant Obsidian callout block (e.g. "> [!tip]"), a heading, a checklist, ' +
  'a table skeleton, or a short paragraph continuation — whatever best fits the context. ' +
  'Reply with ONLY the raw markdown snippet to insert, no explanations, no code fences, no extra commentary. ' +
  'Match the language of the provided context (Arabic or English).';

function buildSystemPrompt(plugin) {
  let prompt = (plugin.settings.aiSystemPrompt || '').trim() || DEFAULT_SMART_TEMPLATE_PROMPT;
  const lang = plugin.settings.aiResponseLang;
  if (lang === 'ar') prompt += ' Always reply in Arabic, regardless of the input language.';
  else if (lang === 'en') prompt += ' Always reply in English, regardless of the input language.';
  return prompt;
}

/* strip accidental ```fences``` some local models add despite instructions */
function stripCodeFences(text) {
  const trimmed = text.trim();
  const fenceMatch = trimmed.match(/^```[a-zA-Z]*\n([\s\S]*?)\n```$/);
  return fenceMatch ? fenceMatch[1].trim() : trimmed;
}

/* ══════════════════════════════════════════════
   SMART TEMPLATE SUGGESTION MODAL
══════════════════════════════════════════════ */
class AISuggestModal extends Modal {
  constructor(app, plugin, editor, context) {
    super(app);
    this.plugin = plugin; this.editor = editor; this.context = context;
    this.suggestion = '';
  }

  onOpen() {
    const { contentEl, modalEl } = this;
    contentEl.empty();
    modalEl.addClass('ai-modal-root');
    contentEl.addClass('ai-modal');

    contentEl.createEl('div', { text: t('aiSuggestTitle'), cls: 'ai-modal-title' });
    this.bodyEl = contentEl.createDiv('ai-modal-body');

    this.actionsEl = contentEl.createDiv('ai-modal-actions');
    this.regenBtn  = this.actionsEl.createEl('button', { text: '↻ ' + t('aiRegenerate'), cls:'progress-btn progress-btn-cancel' });
    this.insertBtn = this.actionsEl.createEl('button', { text: t('aiInsertSuggestion'), cls:'progress-btn progress-btn-insert' });
    this.closeBtn  = this.actionsEl.createEl('button', { text: t('aiCloseModal'), cls:'progress-btn progress-btn-cancel' });

    this.regenBtn.style.display  = 'none';
    this.insertBtn.style.display = 'none';

    this.regenBtn.addEventListener('click', () => this.fetchSuggestion());
    this.insertBtn.addEventListener('click', () => {
      if (this.suggestion) this.editor.replaceSelection(this.suggestion);
      this.close();
    });
    this.closeBtn.addEventListener('click', () => this.close());

    this.fetchSuggestion();
  }

  setLoading() {
    this.bodyEl.empty();
    const loading = this.bodyEl.createDiv('ai-loading');
    loading.createDiv('ai-spinner');
    loading.createEl('span', { text: t('aiThinking') });
    this.regenBtn.style.display  = 'none';
    this.insertBtn.style.display = 'none';
  }

  async fetchSuggestion() {
    this.setLoading();
    try {
      const messages = [
        { role: 'system', content: buildSystemPrompt(this.plugin) },
        { role: 'user', content: this.context },
      ];
      const result = stripCodeFences(await callAI(this.plugin, messages));
      this.suggestion = result;
      this.bodyEl.empty();
      const pre = this.bodyEl.createEl('pre', { cls: 'ai-suggestion-box' });
      pre.textContent = result;
      this.regenBtn.style.display  = '';
      this.insertBtn.style.display = '';
    } catch (err) {
      this.bodyEl.empty();
      this.bodyEl.createEl('div', { text: t('aiError') + err.message, cls: 'ai-error-box' });
      this.regenBtn.style.display = '';
    }
  }

  onClose() { this.contentEl.empty(); }
}

/* ══════════════════════════════════════════════
   TEMPLATE GENERATOR (full multi-section templates)
══════════════════════════════════════════════ */
const DEFAULT_TEMPLATE_GEN_PROMPT =
  'You are a template-generation assistant for Obsidian (a markdown note-taking app). ' +
  'The user will describe what kind of note or template they want to create. ' +
  'Generate a COMPLETE, well-structured markdown template: use headings (##, ###), ' +
  'Obsidian callouts ("> [!type]") where relevant, checklists, tables, and clear ' +
  'placeholders (e.g. "...") for the user to fill in. ' +
  'Reply with ONLY the raw markdown template — no explanations, no code fences, no extra commentary. ' +
  'Match the language of the user\'s description (Arabic or English) unless told otherwise.';

function buildTemplateSystemPrompt(plugin) {
  let prompt = DEFAULT_TEMPLATE_GEN_PROMPT;
  const lang = plugin.settings.aiResponseLang;
  if (lang === 'ar') prompt += ' Always write the template in Arabic, regardless of the input language.';
  else if (lang === 'en') prompt += ' Always write the template in English, regardless of the input language.';
  return prompt;
}

class TemplateGeneratorModal extends Modal {
  constructor(app, plugin, editor) {
    super(app);
    this.plugin = plugin; this.editor = editor;
    this.result = '';
  }

  onOpen() {
    const { contentEl, modalEl } = this;
    contentEl.empty();
    modalEl.addClass('ai-modal-root');
    contentEl.addClass('ai-modal');

    contentEl.createEl('div', { text: t('tgTitle'), cls: 'ai-modal-title' });

    contentEl.createEl('div', { text: t('tgDescLabel'), cls: 'progress-label' });
    this.descEl = contentEl.createEl('textarea', { cls: 'ai-textarea', placeholder: t('tgDescPlaceholder') });
    this.descEl.rows = 2;

    contentEl.createEl('div', { text: t('tgPromptLabel'), cls: 'progress-label ai-label-spaced' });
    this.extraEl = contentEl.createEl('textarea', { cls: 'ai-textarea', placeholder: t('tgPromptPlaceholder') });
    this.extraEl.rows = 2;

    this.bodyEl = contentEl.createDiv('ai-modal-body');

    this.actionsEl = contentEl.createDiv('ai-modal-actions');
    this.generateBtn = this.actionsEl.createEl('button', { text: t('tgGenerate'), cls:'progress-btn progress-btn-insert' });
    this.regenBtn    = this.actionsEl.createEl('button', { text: t('tgRegenerate'), cls:'progress-btn progress-btn-cancel' });
    this.insertBtn   = this.actionsEl.createEl('button', { text: t('tgInsert'), cls:'progress-btn progress-btn-insert' });
    this.cancelBtn   = this.actionsEl.createEl('button', { text: t('tgCancel'), cls:'progress-btn progress-btn-cancel' });

    this.regenBtn.style.display  = 'none';
    this.insertBtn.style.display = 'none';

    this.generateBtn.addEventListener('click', () => this.generate());
    this.regenBtn.addEventListener('click',    () => this.generate());
    this.insertBtn.addEventListener('click', () => {
      if (this.result) this.editor.replaceSelection(this.result);
      this.close();
    });
    this.cancelBtn.addEventListener('click', () => this.close());

    setTimeout(() => this.descEl.focus(), 30);
  }

  setLoading() {
    this.bodyEl.empty();
    const loading = this.bodyEl.createDiv('ai-loading');
    loading.createDiv('ai-spinner');
    loading.createEl('span', { text: t('tgThinking') });
    this.generateBtn.style.display = 'none';
    this.regenBtn.style.display    = 'none';
    this.insertBtn.style.display   = 'none';
  }

  async generate() {
    const description = this.descEl.value.trim();
    if (!description) { new Notice(t('tgEmptyDesc')); return; }
    const extra = this.extraEl.value.trim();

    this.setLoading();
    try {
      let userMsg = description;
      if (extra) userMsg += `\n\nAdditional instructions: ${extra}`;

      const messages = [
        { role: 'system', content: buildTemplateSystemPrompt(this.plugin) },
        { role: 'user', content: userMsg },
      ];
      const result = stripCodeFences(await callAI(this.plugin, messages, { maxTokens: 900 }));
      this.result = result;
      this.bodyEl.empty();
      const pre = this.bodyEl.createEl('pre', { cls: 'ai-suggestion-box' });
      pre.textContent = result;
      this.regenBtn.style.display  = '';
      this.insertBtn.style.display = '';
    } catch (err) {
      this.bodyEl.empty();
      this.bodyEl.createEl('div', { text: t('aiError') + err.message, cls: 'ai-error-box' });
      this.regenBtn.style.display = '';
    } finally {
      this.generateBtn.style.display = 'none';
    }
  }

  onClose() { this.contentEl.empty(); }
}


function makeProgressBar(pct) {
  const filled = Math.round(pct / 10);
  return `[${'█'.repeat(filled)}${'░'.repeat(10 - filled)}] ${pct}%`;
}

class ProgressInputModal extends Modal {
  constructor(app, editor) { super(app); this.editor = editor; }

  onOpen() {
    const { contentEl, modalEl } = this;
    contentEl.empty();
    modalEl.addClass('progress-modal-root');
    contentEl.addClass('progress-modal');

    contentEl.createEl('div', { text: '📊 ' + t('progressTitle'), cls: 'progress-modal-title' });

    /* slider + number row */
    const row = contentEl.createDiv('progress-slider-row');
    const slider = row.createEl('input', { type:'range', cls:'progress-slider' });
    slider.min = '0'; slider.max = '100'; slider.step = '5'; slider.value = '50';

    const numInput = row.createEl('input', { type:'number', cls:'progress-num-input' });
    numInput.min = '0'; numInput.max = '100'; numInput.value = '50';
    row.createEl('span', { text:'%', cls:'progress-pct-label' });

    /* preview */
    contentEl.createEl('div', { text: t('progressPreview'), cls: 'progress-label' });
    const preview = contentEl.createDiv('progress-preview-box');
    preview.textContent = makeProgressBar(50);

    const sync = (val) => {
      const v = Math.max(0, Math.min(100, Number(val)));
      slider.value   = v;
      numInput.value = v;
      preview.textContent = makeProgressBar(v);
    };

    slider.addEventListener('input', () => sync(slider.value));
    numInput.addEventListener('input', () => sync(numInput.value));

    /* actions */
    const actions = contentEl.createDiv('progress-actions');
    const cancelBtn = actions.createEl('button', { text: t('progressCancel'), cls:'progress-btn progress-btn-cancel' });
    const insertBtn = actions.createEl('button', { text: t('progressInsert'), cls:'progress-btn progress-btn-insert' });

    cancelBtn.addEventListener('click', () => this.close());
    insertBtn.addEventListener('click', () => {
      this.editor.replaceSelection(makeProgressBar(Number(slider.value)));
      this.close();
    });

    setTimeout(() => numInput.focus(), 30);
  }

  onClose() { this.contentEl.empty(); }
}

/* ══════════════════════════════════════════════
   FORMATTING ITEMS
══════════════════════════════════════════════ */
function buildItems(editor, app, plugin) {
  const insertCallout = (type) => {
    const body  = editor.getSelection() || '…';
    const lines = body.split('\n').map(l => `> ${l}`).join('\n');
    editor.replaceSelection(`> [!${type}]\n${lines}\n`);
  };
  const insertRaw   = (text) => editor.replaceSelection(text);
  const wrapSel     = (b, a) => { const s = editor.getSelection() || 'text'; editor.replaceSelection(`${b}${s}${a}`); };
  const prependLine = (pfx)  => { const cur = editor.getCursor(); const line = editor.getLine(cur.line); editor.setLine(cur.line, line.startsWith(pfx) ? line : `${pfx}${line}`); };

  const insertDateTime = (fmt) => {
    const now    = new Date();
    const locale = getAppLang() === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US';
    let text = '';
    if      (fmt === 'date')     text = now.toLocaleDateString(locale,  { year:'numeric', month:'long', day:'numeric' });
    else if (fmt === 'date-iso') text = now.toISOString().split('T')[0];
    else if (fmt === 'time')     text = now.toLocaleTimeString(locale,  { hour:'2-digit', minute:'2-digit' });
    else if (fmt === 'time-24')  text = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    else if (fmt === 'datetime') text = now.toLocaleDateString(locale, { year:'numeric', month:'long', day:'numeric' }) + ' — ' + now.toLocaleTimeString(locale, { hour:'2-digit', minute:'2-digit' });
    editor.replaceSelection(text);
  };

  const openSmartSuggestion = () => {
    if (!plugin?.settings?.enableAI) { new Notice(t('aiDisabled')); return; }
    const cursor = editor.getCursor();
    const selection = editor.getSelection();
    let context = selection;
    if (!context) {
      const fromLine = Math.max(0, cursor.line - 12);
      context = editor.getRange({ line: fromLine, ch: 0 }, cursor);
    }
    if (!context || !context.trim()) { new Notice(t('aiNoContext')); return; }
    new AISuggestModal(app, plugin, editor, context).open();
  };

  const openTemplateGenerator = () => {
    if (!plugin?.settings?.enableAI) { new Notice(t('aiDisabled')); return; }
    new TemplateGeneratorModal(app, plugin, editor).open();
  };

  return [
    /* ── INSERT ── */
    { id:'i-template',  label:t('iTemplateGen'), icon:'📐', cat:'Insert', color:'#0ea5e9', mdpreview:'AI: ## … > [!tip] …', action:openTemplateGenerator },
    { id:'i-smart',    label:t('iSmartTemplate'), icon:'✨', cat:'Insert', color:'#9333ea', mdpreview:'AI: > [!tip] …', action:openSmartSuggestion },
    { id:'i-date',     label:t('iDateLocale'), icon:'📅', cat:'Insert', color:'#0f766e', mdpreview:'June 11, 2025',         action:()=>insertDateTime('date') },
    { id:'i-date-iso', label:t('iDateIso'),    icon:'🗓️', cat:'Insert', color:'#0891b2', mdpreview:'2025-06-11',            action:()=>insertDateTime('date-iso') },
    { id:'i-time',     label:t('iTimeLocale'), icon:'🕐', cat:'Insert', color:'#7c3aed', mdpreview:'2:30 PM',               action:()=>insertDateTime('time') },
    { id:'i-time-24',  label:t('iTime24'),     icon:'⏱️', cat:'Insert', color:'#6d28d9', mdpreview:'14:30',                action:()=>insertDateTime('time-24') },
    { id:'i-datetime', label:t('iDatetime'),   icon:'📆', cat:'Insert', color:'#059669', mdpreview:'June 11, 2025 — 2:30', action:()=>insertDateTime('datetime') },
    { id:'i-progress', label:t('iProgress'),   icon:'▓',  cat:'Insert', color:'#4f46e5', mdpreview:'[████░░░░░░] 40%',      action:()=>new ProgressInputModal(app, editor).open() },

    /* ── CALLOUTS ── */
    { id:'c-note',     label:'Note',     icon:'📝', cat:'Callouts', color:'#3b82f6', mdpreview:'> [!NOTE]',     action:()=>insertCallout('NOTE') },
    { id:'c-info',     label:'Info',     icon:'ℹ️', cat:'Callouts', color:'#0ea5e9', mdpreview:'> [!INFO]',     action:()=>insertCallout('INFO') },
    { id:'c-tip',      label:'Tip',      icon:'💡', cat:'Callouts', color:'#10b981', mdpreview:'> [!TIP]',      action:()=>insertCallout('TIP') },
    { id:'c-abstract', label:'Abstract', icon:'📋', cat:'Callouts', color:'#06b6d4', mdpreview:'> [!ABSTRACT]', action:()=>insertCallout('ABSTRACT') },
    { id:'c-success',  label:'Success',  icon:'✅', cat:'Callouts', color:'#22c55e', mdpreview:'> [!SUCCESS]',  action:()=>insertCallout('SUCCESS') },
    { id:'c-warning',  label:'Warning',  icon:'⚠️', cat:'Callouts', color:'#f59e0b', mdpreview:'> [!WARNING]',  action:()=>insertCallout('WARNING') },
    { id:'c-danger',   label:'Danger',   icon:'🚨', cat:'Callouts', color:'#ef4444', mdpreview:'> [!DANGER]',   action:()=>insertCallout('DANGER') },
    { id:'c-bug',      label:'Bug',      icon:'🐛', cat:'Callouts', color:'#f43f5e', mdpreview:'> [!BUG]',      action:()=>insertCallout('BUG') },
    { id:'c-question', label:'Question', icon:'❓', cat:'Callouts', color:'#8b5cf6', mdpreview:'> [!QUESTION]', action:()=>insertCallout('QUESTION') },
    { id:'c-quote',    label:'Quote',    icon:'💬', cat:'Callouts', color:'#6b7280', mdpreview:'> [!QUOTE]',    action:()=>insertCallout('QUOTE') },
    { id:'c-example',  label:'Example',  icon:'🔍', cat:'Callouts', color:'#a855f7', mdpreview:'> [!EXAMPLE]',  action:()=>insertCallout('EXAMPLE') },
    { id:'c-failure',  label:'Failure',  icon:'❌', cat:'Callouts', color:'#dc2626', mdpreview:'> [!FAILURE]',  action:()=>insertCallout('FAILURE') },

    /* ── CUSTOM CALLOUTS ── */
    { id:'c-goal',       label:'Goal',       icon:'🎯', cat:'Custom Callouts', color:'#ea580c', mdpreview:'> [!GOAL]',       action:()=>insertCallout('GOAL') },
    { id:'c-idea',       label:'Idea',       icon:'✨', cat:'Custom Callouts', color:'#ca8a04', mdpreview:'> [!IDEA]',       action:()=>insertCallout('IDEA') },
    { id:'c-task',       label:'Task',       icon:'📌', cat:'Custom Callouts', color:'#7c3aed', mdpreview:'> [!TASK]',       action:()=>insertCallout('TASK') },
    { id:'c-important',  label:'Important',  icon:'⭐', cat:'Custom Callouts', color:'#b91c1c', mdpreview:'> [!IMPORTANT]',  action:()=>insertCallout('IMPORTANT') },
    { id:'c-definition', label:'Definition', icon:'📖', cat:'Custom Callouts', color:'#4f46e5', mdpreview:'> [!DEFINITION]', action:()=>insertCallout('DEFINITION') },
    { id:'c-formula',    label:'Formula',    icon:'🧮', cat:'Custom Callouts', color:'#1d4ed8', mdpreview:'> [!FORMULA]',    action:()=>insertCallout('FORMULA') },
    { id:'c-remember',   label:'Remember',   icon:'🧠', cat:'Custom Callouts', color:'#6d28d9', mdpreview:'> [!REMEMBER]',   action:()=>insertCallout('REMEMBER') },
    { id:'c-review',     label:'Review',     icon:'🔄', cat:'Custom Callouts', color:'#0891b2', mdpreview:'> [!REVIEW]',     action:()=>insertCallout('REVIEW') },
    { id:'c-resource',   label:'Resource',   icon:'📚', cat:'Custom Callouts', color:'#059669', mdpreview:'> [!RESOURCE]',   action:()=>insertCallout('RESOURCE') },
    { id:'c-decision',   label:'Decision',   icon:'⚖️', cat:'Custom Callouts', color:'#065f46', mdpreview:'> [!DECISION]',   action:()=>insertCallout('DECISION') },
    { id:'c-blocker',    label:'Blocker',    icon:'🚧', cat:'Custom Callouts', color:'#b45309', mdpreview:'> [!BLOCKER]',    action:()=>insertCallout('BLOCKER') },
    { id:'c-cmd',        label:'Command',    icon:'💻', cat:'Custom Callouts', color:'#1e293b', mdpreview:'> [!CMD]',        action:()=>insertCallout('CMD') },
    { id:'c-config',     label:'Config',     icon:'⚙️', cat:'Custom Callouts', color:'#475569', mdpreview:'> [!CONFIG]',     action:()=>insertCallout('CONFIG') },

    /* ── ISLAMIC ── */
    { id:'c-ayah',   label:'Ayah',   icon:'📿', cat:'Islamic', color:'#166534', mdpreview:'> [!AYAH]',   action:()=>insertCallout('AYAH') },
    { id:'c-hadith', label:'Hadith', icon:'🕌', cat:'Islamic', color:'#1e40af', mdpreview:'> [!HADITH]', action:()=>insertCallout('HADITH') },
    { id:'c-dua',    label:'Dua',    icon:'🤲', cat:'Islamic', color:'#6d28d9', mdpreview:'> [!DUA]',    action:()=>insertCallout('DUA') },

    /* ── HEADINGS ── */
    { id:'h1', label:'Heading 1', icon:'H¹', cat:'Headings', color:'#7c3aed', mdpreview:'# Heading 1',     action:()=>prependLine('# ') },
    { id:'h2', label:'Heading 2', icon:'H²', cat:'Headings', color:'#6d28d9', mdpreview:'## Heading 2',    action:()=>prependLine('## ') },
    { id:'h3', label:'Heading 3', icon:'H³', cat:'Headings', color:'#5b21b6', mdpreview:'### Heading 3',   action:()=>prependLine('### ') },
    { id:'h4', label:'Heading 4', icon:'H⁴', cat:'Headings', color:'#4c1d95', mdpreview:'#### Heading 4',  action:()=>prependLine('#### ') },
    { id:'h5', label:'Heading 5', icon:'H⁵', cat:'Headings', color:'#3730a3', mdpreview:'##### Heading 5', action:()=>prependLine('##### ') },

    /* ── TEXT ── */
    { id:'t-bold',   label:'Bold',          icon:'𝐁',  cat:'Text', color:'#7c3aed', mdpreview:'**bold**',       action:()=>wrapSel('**','**') },
    { id:'t-italic', label:'Italic',        icon:'𝐼',  cat:'Text', color:'#2563eb', mdpreview:'*italic*',       action:()=>wrapSel('*','*') },
    { id:'t-mark',   label:'Highlight',     icon:'🖍️', cat:'Text', color:'#ca8a04', mdpreview:'==highlight==',  action:()=>wrapSel('==','==') },
    { id:'t-strike', label:'Strikethrough', icon:'S̶',  cat:'Text', color:'#dc2626', mdpreview:'~~strike~~',     action:()=>wrapSel('~~','~~') },
    { id:'t-code',   label:'Inline Code',   icon:'`',  cat:'Text', color:'#4f46e5', mdpreview:'`code`',         action:()=>wrapSel('`','`') },
    { id:'t-sub',    label:'Subscript',     icon:'₂',  cat:'Text', color:'#0891b2', mdpreview:'~sub~',          action:()=>wrapSel('~','~') },
    { id:'t-sup',    label:'Superscript',   icon:'²',  cat:'Text', color:'#0891b2', mdpreview:'^sup^',          action:()=>wrapSel('^','^') },

    /* ── LISTS ── */
    { id:'l-bullet',   label:'Bullet List', icon:'•',  cat:'Lists', color:'#059669', mdpreview:'- Item',       action:()=>insertRaw('- ') },
    { id:'l-numbered', label:'Numbered',    icon:'1.', cat:'Lists', color:'#0284c7', mdpreview:'1. First',     action:()=>insertRaw('1. ') },
    { id:'l-task',     label:'Task List',   icon:'☐',  cat:'Lists', color:'#7c3aed', mdpreview:'- [ ] Task',   action:()=>insertRaw('- [ ] ') },

    /* ── CODE ── */
    { id:'code-block', label:'Code Block', icon:'{}', cat:'Code', color:'#1e293b', mdpreview:'```code```',   action:()=>insertRaw('```\n\n```') },
    { id:'code-math',  label:'Math Block', icon:'∑',  cat:'Code', color:'#1d4ed8', mdpreview:'$$ f(x) $$',  action:()=>insertRaw('$$\n\n$$') },

    /* ── DIVIDERS ── */
    { id:'d-simple', label:'Line',    icon:'─', cat:'Dividers', color:'#6b7280', mdpreview:'──────────────',   action:()=>insertRaw('\n---\n') },
    { id:'d-double', label:'Double',  icon:'═', cat:'Dividers', color:'#374151', mdpreview:'══════════════',   action:()=>insertRaw('\n══════════════════════\n') },
    { id:'d-dots',   label:'Dots',    icon:'·', cat:'Dividers', color:'#6b7280', mdpreview:'· · · · · · · ·', action:()=>insertRaw('\n· · · · · · · · · · ·\n') },
    { id:'d-arrow',  label:'Arrow →', icon:'►', cat:'Dividers', color:'#4f46e5', mdpreview:'──────────────►',  action:()=>insertRaw('\n─────────────────────►\n') },
    { id:'d-wave',   label:'Wave',    icon:'〰', cat:'Dividers', color:'#0891b2', mdpreview:'〰〰〰〰〰〰〰〰',     action:()=>insertRaw('\n〰〰〰〰〰〰〰〰〰〰〰\n') },
    { id:'d-dashed', label:'Dashed',  icon:'╌', cat:'Dividers', color:'#6b7280', mdpreview:'- - - - - - - -', action:()=>insertRaw('\n- - - - - - - - - - -\n') },
  ];
}

/* ══════════════════════════════════════════════
   FORMATTING PALETTE MODAL
══════════════════════════════════════════════ */
class FormattingPaletteModal extends Modal {
  constructor(app, editor, plugin) { super(app); this.editor = editor; this.plugin = plugin; this.allItems = []; this.filtered = []; this.activeIdx = 0; this.cardEls = []; }

  onOpen() {
    this.allItems = buildItems(this.editor, this.app, this.plugin);
    this.filtered = [...this.allItems];
    const { contentEl, modalEl } = this;
    contentEl.empty(); modalEl.addClass('fp-modal-root'); contentEl.addClass('fp-palette');

    const header = contentEl.createDiv('fp-header');
    header.createEl('span', { text:'🎨', cls:'fp-logo' });
    header.createEl('span', { text:t('paletteTitle'), cls:'fp-title' });
    const kb = header.createEl('span', { cls:'fp-kb-hint' });
    kb.createEl('kbd',{text:'↑↓'}); kb.appendText(` ${t('kbNavigate')} · `);
    kb.createEl('kbd',{text:'Enter'}); kb.appendText(` ${t('kbInsert')} · `);
    kb.createEl('kbd',{text:'Esc'}); kb.appendText(` ${t('kbClose')}`);

    const sw = contentEl.createDiv('fp-search-wrap');
    sw.createEl('span', { text:'🔍', cls:'fp-search-icon' });
    this.searchEl = sw.createEl('input', { type:'text', placeholder:t('searchPlaceholder'), cls:'fp-search' });
    this.searchEl.addEventListener('input',   () => this.filter(this.searchEl.value));
    this.searchEl.addEventListener('keydown', (e) => this.handleKey(e));

    this.cardsArea = contentEl.createDiv('fp-cards-area');
    this.renderCards();
    setTimeout(() => this.searchEl.focus(), 30);
  }

  filter(q) {
    const query = q.trim().toLowerCase();
    this.filtered = query
      ? this.allItems.filter(i => i.label.toLowerCase().includes(query) || i.cat.toLowerCase().includes(query) || i.mdpreview.toLowerCase().includes(query))
      : [...this.allItems];
    this.activeIdx = 0; this.renderCards();
  }

  renderCards() {
    this.cardsArea.empty(); this.cardEls = [];
    if (!this.filtered.length) { this.cardsArea.createEl('div', { text:t('noResults'), cls:'fp-empty' }); return; }

    if (this.searchEl.value.trim()) {
      const grid = this.cardsArea.createDiv('fp-grid');
      this.filtered.forEach((item, i) => grid.appendChild(this.makeCard(item, i)));
    } else {
      let idx = 0;
      for (const cat of CAT_ORDER) {
        const items = this.filtered.filter(i => i.cat === cat);
        if (!items.length) continue;
        const section = this.cardsArea.createDiv('fp-section');
        section.createEl('div', { text: CAT_TR[cat]?.() ?? cat, cls:'fp-section-label' });
        const grid = section.createDiv('fp-grid');
        items.forEach(item => grid.appendChild(this.makeCard(item, idx++)));
      }
    }
    this.highlightActive();
  }

  makeCard(item, idx) {
    const card = document.createElement('div'); card.className = 'fp-card'; card.style.setProperty('--card-color', item.color);
    const accent = document.createElement('div'); accent.className = 'fp-card-accent';
    const body   = document.createElement('div'); body.className   = 'fp-card-body';
    const icon   = document.createElement('div'); icon.className   = 'fp-card-icon';   icon.textContent = item.icon;
    const info   = document.createElement('div'); info.className   = 'fp-card-info';
    const name   = document.createElement('div'); name.className   = 'fp-card-name';    name.textContent = item.label;
    const prev   = document.createElement('div'); prev.className   = 'fp-card-preview'; prev.textContent = item.mdpreview.split('\n')[0];
    info.append(name, prev); body.append(icon, info); card.append(accent, body);
    card.addEventListener('click',      () => { item.action(); if (!(item.id === 'i-progress')) this.close(); else this.close(); });
    card.addEventListener('mouseenter', () => { this.activeIdx = idx; this.highlightActive(); });
    this.cardEls.push(card); return card;
  }

  highlightActive() {
    this.cardEls.forEach((el, i) => el.classList.toggle('fp-active', i === this.activeIdx));
    this.cardEls[this.activeIdx]?.scrollIntoView({ block:'nearest', behavior:'smooth' });
  }

  handleKey(e) {
    const total = this.cardEls.length; if (!total) return;
    if      (e.key === 'ArrowDown') { e.preventDefault(); this.activeIdx = (this.activeIdx+1)%total; this.highlightActive(); }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); this.activeIdx = (this.activeIdx-1+total)%total; this.highlightActive(); }
    else if (e.key === 'Enter')     { e.preventDefault(); const item = this.filtered[this.activeIdx]; if (item) { item.action(); this.close(); } }
  }

  onClose() { this.contentEl.empty(); }
}

/* ══════════════════════════════════════════════
   IMAGE CONTROL (Reading View only — bug fixed)
══════════════════════════════════════════════ */
const ALIGN_ICONS = { left:'⬤←', center:'⬤', right:'→⬤' };
const ALIGNS = ['left','center','right'];
const SIZE_STEP = 30, SIZE_MIN = 60, SIZE_MAX = 950;

class ImageControlManager {
  constructor(plugin) { this.plugin = plugin; this._activeWrapper = null; }

  register() {
    /* Reading View ONLY — no MutationObserver on workspace */
    this.plugin.registerMarkdownPostProcessor((el) => {
      this.processSpecialLayouts(el);
      this.processStandaloneImages(el);
    });
    this._docClick = (e) => { if (!e.target.closest('.ic-wrapper')) this._closeActive(); };
    document.addEventListener('click', this._docClick, true);
  }

  destroy() {
    document.removeEventListener('click', this._docClick, true);
    document.querySelectorAll('.ic-lightbox-overlay').forEach(e => e.remove());
  }

  _closeActive() { this._activeWrapper?.classList.remove('ic-active'); this._activeWrapper = null; }

  processSpecialLayouts(el) {
    el.querySelectorAll('.img-caption').forEach(div => {
      div.classList.add('ic-caption-layout');
      div.querySelectorAll('img').forEach(img => img.addEventListener('click', () => this.openLightbox(img.src)));
      div.querySelectorAll('em').forEach(em => em.classList.add('ic-cap-text'));
    });
    el.querySelectorAll('.img-col').forEach(div => {
      div.classList.add('ic-col-layout');
      if (div.classList.contains('img-col-right')) div.classList.add('reversed');
      div.querySelectorAll('img').forEach(img => img.addEventListener('click', () => this.openLightbox(img.src)));
    });
    [2,3,4].forEach(n => el.querySelectorAll(`.img-grid-${n}`).forEach(div => {
      div.classList.add('ic-grid', `ic-grid-${n}`);
      div.querySelectorAll('img').forEach(img => img.addEventListener('click', () => this.openLightbox(img.src)));
    }));
  }

  processStandaloneImages(el) {
    el.querySelectorAll('img').forEach(img => {
      if (img.closest('.ic-wrapper,.ic-col-layout,.ic-grid,.ic-caption-layout')) return;
      this.wrapImage(img);
    });
  }

  wrapImage(img) {
    const src = img.src;
    const originalWidth = img.naturalWidth > 0 ? Math.min(img.naturalWidth, 400) : 360;
    let width = originalWidth;
    let align = 'center', rotate = 0;

    const outer = document.createElement('div'); outer.className = 'ic-block-center';
    const wrapper = document.createElement('div'); wrapper.className = 'ic-wrapper';
    const captEl = document.createElement('div'); captEl.className = 'ic-caption-el';
    const captIn = document.createElement('input');
    captIn.className = 'ic-caption-input'; captIn.type = 'text'; captIn.placeholder = t('captionPH');
    captIn.addEventListener('input', () => { captEl.textContent = captIn.value; captEl.classList.toggle('visible', !!captIn.value); });

    const applyAlign = () => {
      outer.className = align === 'left' ? 'ic-float-left' : align === 'right' ? 'ic-float-right' : 'ic-block-center';
      wrapper.querySelectorAll('.ic-btn[data-align]').forEach(b => b.classList.toggle('active', b.dataset.align === align));
      if (align !== 'center' && outer.parentNode?.tagName === 'P') {
        const p = outer.parentNode; p.parentNode.insertBefore(outer, p);
        if (!p.textContent.trim() && !p.querySelector('img')) p.style.display = 'none';
      }
    };

    const applySize = () => { img.style.width = width+'px'; img.style.height='auto'; sizeDisplay.textContent = width+'px'; };

    const tb = document.createElement('div'); tb.className = 'ic-toolbar';
    tb.addEventListener('click', e => e.stopPropagation());

    const mkBtn = (label, title, fn) => { const b = document.createElement('button'); b.className='ic-btn'; b.textContent=label; b.title=title; b.addEventListener('click', e=>{e.stopPropagation();fn(b);}); return b; };
    const sep   = () => { const d = document.createElement('div'); d.className='ic-sep'; return d; };

    tb.appendChild(mkBtn('−', t('smaller'), () => { width=Math.max(SIZE_MIN, width-SIZE_STEP); applySize(); }));
    const sizeDisplay = document.createElement('span'); sizeDisplay.className='ic-size-display'; sizeDisplay.textContent=width+'px';
    tb.appendChild(sizeDisplay);
    tb.appendChild(mkBtn('+', t('larger'),  () => { width=Math.min(SIZE_MAX, width+SIZE_STEP); applySize(); }));
    tb.appendChild(sep());

    ALIGNS.forEach(al => {
      const titles = { left:t('alignL'), center:t('alignC'), right:t('alignR') };
      const b = mkBtn(ALIGN_ICONS[al], titles[al], () => { align=al; applyAlign(); });
      b.dataset.align = al; if (al===align) b.classList.add('active'); tb.appendChild(b);
    });
    tb.appendChild(sep());
    tb.appendChild(mkBtn('↻', t('rotate'), () => { rotate=(rotate+90)%360; img.style.transform=`rotate(${rotate}deg)`; }));
    let captionVisible = false;
    tb.appendChild(mkBtn('✎', t('caption'), () => { captionVisible=!captionVisible; captIn.classList.toggle('visible',captionVisible); if(captionVisible) setTimeout(()=>captIn.focus(),50); }));
    tb.appendChild(sep());
    tb.appendChild(mkBtn('⟲', t('reset'), () => {
      width = originalWidth; align = 'center'; rotate = 0;
      applySize(); applyAlign();
      img.style.transform = '';
    }));
    tb.appendChild(sep());
    tb.appendChild(mkBtn('⎘', t('copyMd'), () => { navigator.clipboard.writeText(`![[${img.src}|${width}]]`).then(()=>new Notice(t('copied'))); }));
    tb.appendChild(mkBtn('⤢', t('lightbox'), () => this.openLightbox(src)));

    img.style.width=width+'px'; img.style.height='auto'; img.style.cursor='pointer';
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      const was = wrapper.classList.contains('ic-active');
      this._closeActive();
      if (!was) { wrapper.classList.add('ic-active'); this._activeWrapper = wrapper; }
    });

    const parent = img.parentNode; if (parent) parent.insertBefore(outer, img);
    wrapper.append(tb, img); outer.append(wrapper, captIn, captEl);
  }

  openLightbox(src) {
    let scale=1, rot=0, tx=0, ty=0, dragging=false, startX, startY;
    const overlay = document.createElement('div'); overlay.className='ic-lightbox-overlay';
    const inner   = document.createElement('div'); inner.className='ic-lightbox-inner';
    const image   = document.createElement('img'); image.className='ic-lightbox-img'; image.src=src;
    const applyT  = () => { image.style.transform=`translate(${tx}px,${ty}px) scale(${scale}) rotate(${rot}deg)`; zoomVal.textContent=Math.round(scale*100)+'%'; };
    const closeBtn= document.createElement('button'); closeBtn.className='ic-lb-close'; closeBtn.innerHTML='✕'; closeBtn.onclick=()=>close();
    const bar     = document.createElement('div'); bar.className='ic-lb-bar';
    const zoomVal = document.createElement('span'); zoomVal.className='ic-lb-zoom-val'; zoomVal.textContent='100%';
    const lbBtn   = (l,fn)=>{ const b=document.createElement('button'); b.className='ic-lb-btn'; b.textContent=l; b.addEventListener('click',e=>{e.stopPropagation();fn();applyT();}); return b; };
    bar.append(lbBtn('−',()=>{scale=Math.max(0.1,scale-.15);}), zoomVal, lbBtn('+',()=>{scale=Math.min(6,scale+.15);}), lbBtn('↻',()=>{rot=(rot+90)%360;}), lbBtn('↺',()=>{rot=(rot-90+360)%360;}), lbBtn('1:1',()=>{scale=1;rot=0;tx=0;ty=0;}));
    inner.addEventListener('mousedown', e => { if(e.button!==0)return; dragging=true; startX=e.clientX-tx; startY=e.clientY-ty; inner.classList.add('dragging'); });
    const onMove=e=>{ if(!dragging)return; tx=e.clientX-startX; ty=e.clientY-startY; applyT(); };
    const onUp  =()=>{ dragging=false; inner.classList.remove('dragging'); };
    window.addEventListener('mousemove',onMove); window.addEventListener('mouseup',onUp);
    overlay.addEventListener('wheel',e=>{e.preventDefault();scale=Math.min(6,Math.max(.1,scale-e.deltaY*.0012));applyT();},{passive:false});
    overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
    const onKey=e=>{if(e.key==='Escape')close();};
    document.addEventListener('keydown',onKey);
    const close=()=>{ overlay.remove(); window.removeEventListener('mousemove',onMove); window.removeEventListener('mouseup',onUp); document.removeEventListener('keydown',onKey); };
    inner.appendChild(image); overlay.append(closeBtn,inner,bar); document.body.appendChild(overlay);
  }
}

/* ══════════════════════════════════════════════
   FULLSCREEN MANAGER
══════════════════════════════════════════════ */
class FullscreenManager {
  constructor(plugin) { this.plugin=plugin; this._timer=null; this._hintTimer=null; this._hintEl=null; this._bound={}; }

  register() {
    this.plugin.registerEvent(this.plugin.app.workspace.on('layout-change',      ()=>this.injectButton()));
    this.plugin.registerEvent(this.plugin.app.workspace.on('active-leaf-change', ()=>this.injectButton()));
    this.injectButton();
    if (this.plugin.settings.enableAutoFullscreen) this.startActivityWatch();
  }

  toggle() {
    const leaf = this.plugin.app.workspace.activeLeaf; if (!leaf) return;
    if (!document.fullscreenElement) leaf.view.contentEl.requestFullscreen().catch(console.error);
    else document.exitFullscreen();
  }

  injectButton() {
    document.querySelectorAll('.fs-float-btn').forEach(b=>b.remove());
    const leaf = this.plugin.app.workspace.activeLeaf; if (!leaf) return;
    const container = leaf.view.contentEl; if (!container) return;
    const btn = document.createElement('button'); btn.className='fs-float-btn'; btn.innerHTML='⛶'; btn.title='Fullscreen (Ctrl+Shift+Z)';
    btn.addEventListener('click', ()=>this.toggle());
    if (getComputedStyle(container).position==='static') container.style.position='relative';
    container.appendChild(btn);
  }

  startActivityWatch() {
    this._bound.reset = ()=>this.resetTimer();
    ['mousemove','mousedown','keydown','wheel','touchstart'].forEach(ev=>document.addEventListener(ev,this._bound.reset,{passive:true}));
    this.resetTimer();
  }

  stopActivityWatch() {
    ['mousemove','mousedown','keydown','wheel','touchstart'].forEach(ev=>document.removeEventListener(ev,this._bound.reset));
    clearTimeout(this._timer); clearTimeout(this._hintTimer); this.removeHint();
  }

  resetTimer() {
    clearTimeout(this._timer); clearTimeout(this._hintTimer); this.removeHint();
    if (!this.plugin.settings.enableAutoFullscreen || document.fullscreenElement) return;
    const delay = Math.max(5,Math.min(120,this.plugin.settings.autoFullscreenDelay))*1000;
    this._hintTimer = setTimeout(()=>this.showHint(), Math.max(0,delay-3000));
    this._timer     = setTimeout(()=>{ this.removeHint(); this.toggle(); }, delay);
  }

  showHint() {
    this.removeHint();
    const hint   = document.createElement('div'); hint.className='fs-hint';
    const msg    = document.createElement('span'); msg.textContent=t('focusHint');
    const prog   = document.createElement('div'); prog.className='fs-hint-progress';
    const bar    = document.createElement('div'); bar.className='fs-hint-progress-bar';
    const cancel = document.createElement('button'); cancel.className='fs-hint-cancel'; cancel.textContent=t('cancelFocus');
    cancel.addEventListener('click', ()=>this.resetTimer());
    prog.appendChild(bar); hint.append(msg,prog,cancel);
    document.body.appendChild(hint); this._hintEl=hint;
  }

  removeHint() { this._hintEl?.remove(); this._hintEl=null; }

  destroy() { document.querySelectorAll('.fs-float-btn').forEach(b=>b.remove()); this.stopActivityWatch(); this.removeHint(); }
}

/* ══════════════════════════════════════════════
   PREMIUM FILE TREE MANAGER
══════════════════════════════════════════════ */
class FileTreeManager {
  constructor(plugin) { this.plugin=plugin; this._obs=null; this._rafId=null; this._imageMap=null; }

  register() {
    document.body.classList.add('ft-active', `ft-height-${this.plugin.settings.fileTreeRowHeight}`);

    this._buildImageMap();
    this.plugin.registerEvent(this.plugin.app.vault.on('create', () => this._buildImageMap()));
    this.plugin.registerEvent(this.plugin.app.vault.on('delete', () => this._buildImageMap()));
    this.plugin.registerEvent(this.plugin.app.vault.on('rename', () => this._buildImageMap()));

    this._obs = new MutationObserver(()=>this.scheduleProcessTree());

    const attach = () => {
      const nav = document.querySelector('.nav-files-container');
      if (nav && !nav.dataset.ftObserved) {
        nav.dataset.ftObserved = '1';
        this._obs.observe(nav, { childList:true, subtree:true });
        this.processTree();
      }
    };

    this.plugin.registerEvent(this.plugin.app.workspace.on('layout-change', attach));
    this.plugin.registerEvent(this.plugin.app.workspace.on('file-open',     ()=>this.scheduleProcessTree()));
    attach();
  }

  /* Build a cached filename → resource-path lookup once, instead of
     calling vault.getFiles() on every single row render. */
  _buildImageMap() {
    this._imageMap = new Map();
    for (const file of this.plugin.app.vault.getFiles()) {
      if (getFileType(file.name) === 'image') this._imageMap.set(file.name, file.path);
    }
  }

  /* Coalesce bursts of MutationObserver events (e.g. during file-tree
     scroll/virtualization) into a single pass per animation frame. */
  scheduleProcessTree() {
    if (this._rafId != null) return;
    this._rafId = requestAnimationFrame(() => {
      this._rafId = null;
      this.processTree();
    });
  }

  processTree() {
    const nav = document.querySelector('.nav-files-container');
    if (!nav) return;
    /* folders */
    nav.querySelectorAll('.nav-folder-title:not([data-ft])').forEach(el=>{
      el.setAttribute('data-ft','1');
      this._enhanceFolder(el);
    });
    /* files */
    nav.querySelectorAll('.nav-file-title:not([data-ft])').forEach(el=>{
      el.setAttribute('data-ft','1');
      this._enhanceFile(el);
    });
  }

  _enhanceFolder(titleEl) {
    const icon = document.createElement('span'); icon.className='ft-icon ft-folder';

    const indicator = titleEl.querySelector('.nav-folder-collapse-indicator');
    if (indicator) indicator.after(icon); else titleEl.prepend(icon);

    const update = () => {
      const isCollapsed = titleEl.closest('.nav-folder')?.classList.contains('is-collapsed') ?? false;
      icon.innerHTML = isCollapsed ? FT_ICONS.folder : FT_ICONS.folderOpen;
    };
    update();
    titleEl.addEventListener('click', ()=>setTimeout(update, 40));
  }

  _enhanceFile(titleEl) {
    const textEl = titleEl.querySelector('.nav-file-title-content');
    if (!textEl) return;

    const filename = textEl.textContent.trim();
    const type     = getFileType(filename);

    const icon = document.createElement('span');
    icon.className = `ft-icon ft-${type}`;
    icon.innerHTML = FT_ICONS[type] || FT_ICONS.text;
    titleEl.prepend(icon);

    /* image thumbnail — uses the cached map, no full vault scan */
    if (type === 'image' && this.plugin.settings.fileTreeThumbnails) {
      const path = this._imageMap?.get(filename);
      if (path) {
        const src = this.plugin.app.vault.adapter.getResourcePath(path);
        const img = document.createElement('img');
        img.className = 'ft-thumb';
        img.src = src;
        img.alt = '';
        img.loading = 'lazy';
        img.onload = () => { icon.innerHTML=''; icon.appendChild(img); icon.classList.add('ft-has-thumb'); };
      }
    }
  }

  updateHeight(height) {
    document.body.classList.remove('ft-height-compact','ft-height-default','ft-height-spacious');
    document.body.classList.add(`ft-height-${height}`);
  }

  destroy() {
    this._obs?.disconnect();
    if (this._rafId != null) { cancelAnimationFrame(this._rafId); this._rafId = null; }
    document.body.classList.remove('ft-active','ft-height-compact','ft-height-default','ft-height-spacious');
    document.querySelectorAll('[data-ft]').forEach(el=>{ el.removeAttribute('data-ft'); el.querySelectorAll('.ft-icon').forEach(i=>i.remove()); });
    delete document.querySelector('.nav-files-container')?.dataset.ftObserved;
  }
}

/* ══════════════════════════════════════════════
   QUICK ACCESS BAR
══════════════════════════════════════════════ */
class QuickBarManager {
  constructor(plugin) { this.plugin = plugin; this.barEl = null; }

  register() {
    const attach = () => this.injectBar();
    this.plugin.registerEvent(this.plugin.app.workspace.on('layout-change', attach));
    attach();
  }

  injectBar() {
    const nav = document.querySelector('.nav-files-container');
    if (!nav || !nav.parentElement) return;
    const parent = nav.parentElement;

    if (this.barEl && this.barEl.isConnected) { this.render(); return; }

    this.barEl = document.createElement('div');
    this.barEl.className = 'qb-bar';
    parent.insertBefore(this.barEl, nav);
    this.render();
  }

  render() {
    if (!this.barEl) return;
    this.barEl.empty ? this.barEl.empty() : (this.barEl.innerHTML = '');

    const items = this.plugin.settings.quickBarItems || [];
    if (!items.length) {
      this.barEl.style.display = 'none';
      return;
    }
    this.barEl.style.display = 'flex';

    items.forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'qb-item';
      btn.title = item.path;

      const af = this.plugin.app.vault.getAbstractFileByPath(item.path);
      const isFolder = af instanceof TFolder;
      const iconKey = isFolder ? 'folder' : (FT_ICONS[getFileType(item.path)] ? getFileType(item.path) : 'text');

      const icon = document.createElement('span');
      icon.className = `qb-icon ft-icon ft-${iconKey}`;
      icon.innerHTML = FT_ICONS[iconKey] || FT_ICONS.text;

      const label = document.createElement('span');
      label.className = 'qb-label';
      label.textContent = item.label || item.path.split('/').pop();

      btn.append(icon, label);
      btn.addEventListener('click', () => this.openItem(item));
      this.barEl.appendChild(btn);
    });
  }

  openItem(item) {
    const af = this.plugin.app.vault.getAbstractFileByPath(item.path);
    if (!af) { new Notice(t('qbNotFound') + item.path); return; }

    if (af instanceof TFolder) {
      const explorerLeaf = this.plugin.app.workspace.getLeavesOfType('file-explorer')[0];
      explorerLeaf?.view?.revealInFolder?.(af);
    } else if (af instanceof TFile) {
      this.plugin.app.workspace.getLeaf(false).openFile(af);
    }
  }

  destroy() {
    this.barEl?.remove();
    this.barEl = null;
  }
}

/* ══════════════════════════════════════════════
   FOLDER FOCUS MODE
══════════════════════════════════════════════ */
class FolderFocusManager {
  constructor(plugin) { this.plugin = plugin; this._obs = null; this._rafId = null; this.breadcrumbEl = null; this._navEl = null; this._clickHandler = null; }

  register() {
    this.plugin.registerEvent(this.plugin.app.workspace.on('file-menu', (menu, file) => {
      if (!(file instanceof TFolder)) return;
      if (this.plugin.settings.focusedFolder === file.path) {
        menu.addItem(item => item.setTitle(t('ffUnfocusMenuItem')).setIcon('x-circle').onClick(() => this.clearFocus()));
      } else {
        menu.addItem(item => item.setTitle(t('ffFocusMenuItem')).setIcon('focus').onClick(() => this.setFocus(file.path)));
      }
    }));

    this._obs = new MutationObserver(() => this.schedule());

    this._clickHandler = (e) => {
      const titleEl = e.target.closest('.nav-folder-title');
      if (!titleEl) return;
      const path = titleEl.dataset.path;
      if (!path) return;
      if (!(this.plugin.settings.mainFolders || []).includes(path)) return;
      if (this.plugin.settings.focusedFolder === path) return;
      e.preventDefault();
      e.stopPropagation();
      this.setFocus(path, { collapseChildren: true });
    };

    const attach = () => {
      const nav = document.querySelector('.nav-files-container');
      if (nav && !nav.dataset.ffObserved) {
        nav.dataset.ffObserved = '1';
        this._obs.observe(nav, { childList:true, subtree:true });
        nav.addEventListener('click', this._clickHandler, true);
        this._navEl = nav;
        this.applyFocus();
      }
    };

    this.plugin.registerEvent(this.plugin.app.workspace.on('layout-change', attach));
    attach();
  }

  schedule() {
    if (this._rafId != null) return;
    this._rafId = requestAnimationFrame(() => {
      this._rafId = null;
      this.applyFocus();
    });
  }

  setFocus(path, opts = {}) {
    this.plugin.settings.focusedFolder = path;
    this.plugin.saveSettings();
    this.applyFocus({ collapseChildren: opts.collapseChildren });
  }

  clearFocus() {
    this.plugin.settings.focusedFolder = null;
    this.plugin.saveSettings();
    new Notice(t('ffFocusOff'));
    this.applyFocus();
  }

  applyFocus(opts = {}) {
    const nav = document.querySelector('.nav-files-container');
    if (!nav) return;
    const focus = this.plugin.settings.focusedFolder;
    const mainFolders = this.plugin.settings.mainFolders || [];

    /* reset previous state */
    nav.querySelectorAll('.ff-hidden').forEach(el => el.classList.remove('ff-hidden'));
    nav.querySelectorAll('.ff-self').forEach(el => el.classList.remove('ff-self'));
    nav.querySelectorAll('.ff-main-badge').forEach(el => el.remove());
    document.body.classList.toggle('ff-active', !!focus);
    this.renderBreadcrumb();

    /* decorate main-folder titles with a small indicator */
    mainFolders.forEach(mfPath => {
      const mfTitle = nav.querySelector(`.nav-folder-title[data-path="${CSS.escape(mfPath)}"]`);
      if (!mfTitle || mfTitle.querySelector('.ff-main-badge')) return;
      const badge = document.createElement('span');
      badge.className = 'ff-main-badge';
      badge.title = 'Main folder — click to focus';
      mfTitle.appendChild(badge);
    });

    if (!focus) return;

    /* data-path lives on .nav-folder-title, not .nav-folder */
    const titleEl = nav.querySelector(`.nav-folder-title[data-path="${CSS.escape(focus)}"]`);
    const focusEl = titleEl?.closest('.nav-folder');
    if (!focusEl) return;

    focusEl.classList.add('ff-self');
    focusEl.classList.remove('is-collapsed');

    /* optionally collapse all direct sub-folders */
    if (opts.collapseChildren) {
      focusEl.querySelectorAll('.nav-folder').forEach(sub => {
        sub.classList.add('is-collapsed');
      });
    }

    nav.querySelectorAll('.nav-folder, .nav-file').forEach(el => {
      if (el === focusEl || focusEl.contains(el)) return;
      el.classList.add('ff-hidden');
    });
  }

  renderBreadcrumb() {
    const nav = document.querySelector('.nav-files-container');
    if (!nav || !nav.parentElement) return;
    const parent = nav.parentElement;
    const focus = this.plugin.settings.focusedFolder;
    const mainFolders = this.plugin.settings.mainFolders || [];

    /* always show the bar if we have main folders or an active focus */
    const shouldShow = mainFolders.length > 0 || !!focus;

    if (!shouldShow) { this.breadcrumbEl?.remove(); this.breadcrumbEl = null; return; }

    if (!this.breadcrumbEl || !this.breadcrumbEl.isConnected) {
      this.breadcrumbEl = document.createElement('div');
      this.breadcrumbEl.className = 'ff-breadcrumb';
      parent.insertBefore(this.breadcrumbEl, nav);
    }
    this.breadcrumbEl.innerHTML = '';

    /* ← back button */
    if (focus) {
      const back = document.createElement('button');
      back.className = 'ff-back-btn';
      back.textContent = '← ' + t('ffBack');
      back.addEventListener('click', () => this.clearFocus());
      this.breadcrumbEl.appendChild(back);
    }

    /* main-folder tabs */
    mainFolders.forEach(mfPath => {
      const name = mfPath.split('/').pop();
      const btn = document.createElement('button');
      btn.className = 'ff-tab' + (mfPath === focus ? ' ff-tab-active' : '');
      btn.textContent = name;
      btn.title = mfPath;
      btn.addEventListener('click', () => {
        if (mfPath === focus) this.clearFocus();
        else this.setFocus(mfPath, { collapseChildren: true });
      });
      this.breadcrumbEl.appendChild(btn);
    });

    /* current-folder label (if focused on a non-main folder) */
    if (focus && !mainFolders.includes(focus)) {
      const label = document.createElement('span');
      label.className = 'ff-label';
      label.textContent = focus.split('/').pop();
      this.breadcrumbEl.appendChild(label);
    }
  }

  destroy() {
    this._obs?.disconnect();
    if (this._rafId != null) { cancelAnimationFrame(this._rafId); this._rafId = null; }
    if (this._navEl && this._clickHandler) this._navEl.removeEventListener('click', this._clickHandler, true);
    document.body.classList.remove('ff-active');
    document.querySelectorAll('.ff-hidden,.ff-self').forEach(el=>el.classList.remove('ff-hidden','ff-self'));
    document.querySelectorAll('.ff-main-badge').forEach(el=>el.remove());
    this.breadcrumbEl?.remove();
    this.breadcrumbEl = null;
    delete document.querySelector('.nav-files-container')?.dataset.ffObserved;
  }
}


class ToolkitSettingsTab extends PluginSettingTab {
  constructor(app, plugin) { super(app, plugin); this.plugin=plugin; }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl('h2', { text:t('settingsTitle') });

    new Setting(containerEl).setName(t('fmtName')).setDesc(t('fmtDesc'))
      .addToggle(tog=>tog.setValue(this.plugin.settings.enableFormatting).onChange(async val=>{
        this.plugin.settings.enableFormatting=val; await this.plugin.saveSettings();
        new Notice(val?t('fmtOn'):t('fmtOff'));
      }));

    new Setting(containerEl).setName(t('imgName')).setDesc(t('imgDesc'))
      .addToggle(tog=>tog.setValue(this.plugin.settings.enableImageControl).onChange(async val=>{
        this.plugin.settings.enableImageControl=val; await this.plugin.saveSettings();
        new Notice(val?t('imgOn'):t('imgOff'));
      }));

    new Setting(containerEl).setName(t('fsName')).setDesc(t('fsDesc'))
      .addToggle(tog=>tog.setValue(this.plugin.settings.enableFullscreen).onChange(async val=>{
        this.plugin.settings.enableFullscreen=val; await this.plugin.saveSettings();
        val ? this.plugin.fullscreenMgr.injectButton() : this.plugin.fullscreenMgr.destroy();
        new Notice(val?t('fsOn'):t('fsOff'));
      }));

    new Setting(containerEl).setName(t('autoFsName')).setDesc(t('autoFsDesc'))
      .addToggle(tog=>tog.setValue(this.plugin.settings.enableAutoFullscreen).onChange(async val=>{
        this.plugin.settings.enableAutoFullscreen=val; await this.plugin.saveSettings();
        val ? this.plugin.fullscreenMgr.startActivityWatch() : this.plugin.fullscreenMgr.stopActivityWatch();
        this.display();
      }));

    if (this.plugin.settings.enableAutoFullscreen) {
      new Setting(containerEl).setName(t('autoFsDelayName')).setDesc(t('autoFsDelayDesc'))
        .addSlider(sl=>sl.setLimits(5,120,5).setValue(this.plugin.settings.autoFullscreenDelay).setDynamicTooltip().onChange(async val=>{
          this.plugin.settings.autoFullscreenDelay=val; await this.plugin.saveSettings(); this.plugin.fullscreenMgr.resetTimer();
        }));
    }

    containerEl.createEl('hr');

    new Setting(containerEl).setName(t('aiName')).setDesc(t('aiDesc'))
      .addToggle(tog=>tog.setValue(this.plugin.settings.enableAI).onChange(async val=>{
        this.plugin.settings.enableAI=val; await this.plugin.saveSettings();
        new Notice(val?t('aiOn'):t('aiOff'));
        this.display();
      }));

    if (this.plugin.settings.enableAI) {
      const isOllama = this.plugin.settings.aiProvider === 'ollama';

      /* ── Provider ── */
      new Setting(containerEl).setName(t('aiProviderName')).setDesc(t('aiProviderDesc'))
        .addDropdown(dd=>dd
          .addOption('ollama', t('aiProviderOllama'))
          .addOption('openai', t('aiProviderOpenAI'))
          .addOption('custom', t('aiProviderCustom'))
          .setValue(this.plugin.settings.aiProvider)
          .onChange(async val=>{
            this.plugin.settings.aiProvider = val;
            const preset = AI_PROVIDER_PRESETS[val] || AI_PROVIDER_PRESETS.custom;
            this.plugin.settings.aiApiUrl = preset.url;
            if (preset.model) this.plugin.settings.aiModel = preset.model;
            await this.plugin.saveSettings();
            this.display();
          }));

      /* ── Base URL ── */
      new Setting(containerEl).setName(t('aiUrlName')).setDesc(t('aiUrlDesc'))
        .addText(tx=>tx.setPlaceholder('http://localhost:11434/v1')
          .setValue(this.plugin.settings.aiApiUrl)
          .onChange(async val=>{ this.plugin.settings.aiApiUrl = val.trim(); await this.plugin.saveSettings(); }));

      /* ── API Key (hidden-but-optional for Ollama) ── */
      new Setting(containerEl).setName(t('aiKeyName')).setDesc(t('aiKeyDesc'))
        .addText(tx=>{
          tx.inputEl.type = 'password';
          tx.setPlaceholder(isOllama ? '(not required)' : 'sk-…')
            .setValue(this.plugin.settings.aiApiKey)
            .onChange(async val=>{ this.plugin.settings.aiApiKey = val.trim(); await this.plugin.saveSettings(); });
        });

      /* ── Model ── */
      if (isOllama) {
        const models = this.plugin.settings.aiOllamaModels || [];
        const modelSetting = new Setting(containerEl).setName(t('aiModelDropdownName')).setDesc(t('aiModelDropdownDesc'));

        if (models.length) {
          modelSetting.addDropdown(dd=>{
            models.forEach(m => dd.addOption(m, m));
            if (!models.includes(this.plugin.settings.aiModel)) dd.addOption(this.plugin.settings.aiModel, this.plugin.settings.aiModel);
            dd.setValue(this.plugin.settings.aiModel)
              .onChange(async val=>{ this.plugin.settings.aiModel = val; await this.plugin.saveSettings(); });
          });
        } else {
          modelSetting.setDesc(t('aiModelDropdownDesc') + '  —  ' + t('aiNoModelsYet'));
          modelSetting.addText(tx=>tx.setPlaceholder('qwen2.5:3b')
            .setValue(this.plugin.settings.aiModel)
            .onChange(async val=>{ this.plugin.settings.aiModel = val.trim(); await this.plugin.saveSettings(); }));
        }

        modelSetting.addButton(btn=>btn.setButtonText(t('aiFetchModels')).onClick(async ()=>{
          btn.setButtonText(t('aiFetchingModels')).setDisabled(true);
          try {
            const fetched = await fetchOllamaModels(this.plugin.settings.aiApiUrl);
            this.plugin.settings.aiOllamaModels = fetched;
            if (fetched.length && !fetched.includes(this.plugin.settings.aiModel)) {
              this.plugin.settings.aiModel = fetched[0];
            }
            await this.plugin.saveSettings();
            new Notice(t('aiModelsFetchOk').replace('{n}', fetched.length));
          } catch (err) {
            new Notice(t('aiModelsFetchFail') + err.message);
          } finally {
            this.display();
          }
        }));
      } else {
        new Setting(containerEl).setName(t('aiModelName')).setDesc(t('aiModelDesc'))
          .addText(tx=>tx.setPlaceholder('gpt-4o-mini')
            .setValue(this.plugin.settings.aiModel)
            .onChange(async val=>{ this.plugin.settings.aiModel = val.trim(); await this.plugin.saveSettings(); }));
      }

      /* ── Test connection ── */
      new Setting(containerEl).setName(t('aiTest')).setDesc('')
        .addButton(btn=>btn.setButtonText(t('aiTest')).onClick(async ()=>{
          btn.setDisabled(true);
          try {
            await callAI(this.plugin, [{ role:'user', content:'Reply with the single word: OK' }]);
            new Notice(t('aiTestOk'));
          } catch (err) {
            new Notice(t('aiTestFail') + err.message);
          } finally {
            btn.setDisabled(false);
          }
        }));

      /* ── Response language ── */
      new Setting(containerEl).setName(t('aiLangName')).setDesc(t('aiLangDesc'))
        .addDropdown(dd=>dd
          .addOption('auto', t('aiLangAuto'))
          .addOption('ar',   t('aiLangAr'))
          .addOption('en',   t('aiLangEn'))
          .setValue(this.plugin.settings.aiResponseLang)
          .onChange(async val=>{ this.plugin.settings.aiResponseLang = val; await this.plugin.saveSettings(); }));

      /* ── System prompt ── */
      const promptSetting = new Setting(containerEl).setName(t('aiPromptName')).setDesc(t('aiPromptDesc'));
      promptSetting.settingEl.style.flexDirection = 'column';
      promptSetting.settingEl.style.alignItems = 'stretch';
      promptSetting.addTextArea(ta=>{
        ta.inputEl.rows = 5;
        ta.inputEl.style.width = '100%';
        ta.setPlaceholder(DEFAULT_SMART_TEMPLATE_PROMPT)
          .setValue(this.plugin.settings.aiSystemPrompt)
          .onChange(async val=>{ this.plugin.settings.aiSystemPrompt = val; await this.plugin.saveSettings(); });
      });
      promptSetting.addButton(btn=>btn.setButtonText(t('aiPromptReset')).onClick(async ()=>{
        this.plugin.settings.aiSystemPrompt = '';
        await this.plugin.saveSettings();
        this.display();
      }));
    }

    containerEl.createEl('hr');

    new Setting(containerEl).setName(t('ftName')).setDesc(t('ftDesc'))
      .addToggle(tog=>tog.setValue(this.plugin.settings.enableFileTree).onChange(async val=>{
        this.plugin.settings.enableFileTree=val; await this.plugin.saveSettings();
        val ? this.plugin.fileTreeMgr.register() : this.plugin.fileTreeMgr.destroy();
        new Notice(val?t('ftOn'):t('ftOff'));
        this.display();
      }));

    if (this.plugin.settings.enableFileTree) {
      new Setting(containerEl).setName(t('ftThumbName')).setDesc(t('ftThumbDesc'))
        .addToggle(tog=>tog.setValue(this.plugin.settings.fileTreeThumbnails).onChange(async val=>{
          this.plugin.settings.fileTreeThumbnails=val; await this.plugin.saveSettings();
          this.plugin.fileTreeMgr.destroy(); this.plugin.fileTreeMgr.register();
        }));

      new Setting(containerEl).setName(t('ftHeightName')).setDesc(t('ftHeightDesc'))
        .addDropdown(dd=>dd
          .addOption('compact',  t('ftHeightCompact'))
          .addOption('default',  t('ftHeightDefault'))
          .addOption('spacious', t('ftHeightSpacious'))
          .setValue(this.plugin.settings.fileTreeRowHeight)
          .onChange(async val=>{
            this.plugin.settings.fileTreeRowHeight=val; await this.plugin.saveSettings();
            this.plugin.fileTreeMgr.updateHeight(val);
          })
        );
    }

    containerEl.createEl('hr');

    new Setting(containerEl).setName(t('qbName')).setDesc(t('qbDesc'))
      .addToggle(tog=>tog.setValue(this.plugin.settings.enableQuickBar).onChange(async val=>{
        this.plugin.settings.enableQuickBar=val; await this.plugin.saveSettings();
        val ? this.plugin.quickBarMgr.injectBar() : this.plugin.quickBarMgr.destroy();
        this.display();
      }));

    if (this.plugin.settings.enableQuickBar) {
      containerEl.createEl('div', { text: t('qbItemsLabel'), cls: 'setting-item-name', attr: { style: 'margin: 8px 0 4px;' } });

      const items = this.plugin.settings.quickBarItems || [];
      if (!items.length) {
        containerEl.createEl('p', { text: t('qbEmpty'), cls: 'setting-item-description' });
      } else {
        items.forEach((item, idx) => {
          new Setting(containerEl)
            .setName(item.label || item.path.split('/').pop())
            .setDesc(item.path)
            .addExtraButton(btn=>btn.setIcon('x').setTooltip(t('qbRemove')).onClick(async ()=>{
              this.plugin.settings.quickBarItems.splice(idx, 1);
              await this.plugin.saveSettings();
              this.plugin.quickBarMgr.render();
              this.display();
            }));
        });
      }

      /* quick-add buttons */
      new Setting(containerEl)
        .addButton(btn=>btn.setButtonText(t('qbAddCurrent')).onClick(async ()=>{
          const file = this.plugin.app.workspace.getActiveFile();
          if (!file) { new Notice(t('qbNoActiveFile')); return; }
          await this.addQuickItem(file.path, file.name);
        }))
        .addButton(btn=>btn.setButtonText(t('qbAddCurrentFolder')).onClick(async ()=>{
          const file = this.plugin.app.workspace.getActiveFile();
          if (!file || !file.parent) { new Notice(t('qbNoActiveFile')); return; }
          const folder = file.parent;
          await this.addQuickItem(folder.path, folder.name || folder.path);
        }));

      /* manual add */
      let manualPath = '', manualLabel = '';
      new Setting(containerEl)
        .addText(tx=>tx.setPlaceholder(t('qbPathPlaceholder')).onChange(val=>{ manualPath = val.trim(); }))
        .addText(tx=>tx.setPlaceholder(t('qbLabelPlaceholder')).onChange(val=>{ manualLabel = val.trim(); }))
        .addButton(btn=>btn.setButtonText(t('qbAdd')).setCta().onClick(async ()=>{
          if (!manualPath) { new Notice(t('qbInvalidPath')); return; }
          await this.addQuickItem(manualPath, manualLabel);
        }));
    }

    containerEl.createEl('hr');

    new Setting(containerEl).setName(t('ffName')).setDesc(t('ffDesc'))
      .addToggle(tog=>tog.setValue(this.plugin.settings.enableFolderFocus).onChange(async val=>{
        this.plugin.settings.enableFolderFocus=val; await this.plugin.saveSettings();
        if (val) { this.plugin.folderFocusMgr.register(); }
        else { this.plugin.settings.focusedFolder = null; await this.plugin.saveSettings(); this.plugin.folderFocusMgr.destroy(); }
        this.display();
      }));

    if (this.plugin.settings.enableFolderFocus && this.plugin.settings.focusedFolder) {
      new Setting(containerEl)
        .setName(t('ffFocusOn') + this.plugin.settings.focusedFolder)
        .addButton(btn=>btn.setButtonText(t('ffUnfocusMenuItem')).onClick(async ()=>{
          this.plugin.folderFocusMgr.clearFocus();
          this.display();
        }));
    }

    if (this.plugin.settings.enableFolderFocus) {
      containerEl.createEl('div', { text: t('mfName'), cls: 'setting-item-name', attr:{ style:'margin:10px 0 2px;' } });
      containerEl.createEl('div', { text: t('mfDesc'), cls: 'setting-item-description', attr:{ style:'margin-bottom:8px;' } });

      const mf = this.plugin.settings.mainFolders || [];
      if (!mf.length) {
        containerEl.createEl('p', { text: t('mfEmpty'), cls: 'setting-item-description' });
      } else {
        mf.forEach((path, idx) => {
          new Setting(containerEl)
            .setName(path.split('/').pop())
            .setDesc(path)
            .addExtraButton(btn=>btn.setIcon('arrow-up').onClick(async ()=>{
              if (idx === 0) return;
              [mf[idx-1], mf[idx]] = [mf[idx], mf[idx-1]];
              await this.plugin.saveSettings(); this.plugin.folderFocusMgr.applyFocus(); this.display();
            }))
            .addExtraButton(btn=>btn.setIcon('arrow-down').onClick(async ()=>{
              if (idx === mf.length-1) return;
              [mf[idx], mf[idx+1]] = [mf[idx+1], mf[idx]];
              await this.plugin.saveSettings(); this.plugin.folderFocusMgr.applyFocus(); this.display();
            }))
            .addExtraButton(btn=>btn.setIcon('x').setTooltip(t('mfRemove')).onClick(async ()=>{
              mf.splice(idx, 1);
              await this.plugin.saveSettings(); this.plugin.folderFocusMgr.applyFocus(); this.display();
            }));
        });
      }

      new Setting(containerEl)
        .addButton(btn=>btn.setButtonText(t('mfAddCurrent')).onClick(async ()=>{
          const file = this.plugin.app.workspace.getActiveFile();
          if (!file?.parent) { new Notice(t('mfNoActiveFile')); return; }
          const path = file.parent.path;
          if (!path || path === '/') { new Notice(t('mfInvalidPath')); return; }
          const mf = this.plugin.settings.mainFolders || (this.plugin.settings.mainFolders = []);
          if (mf.includes(path)) { new Notice(t('mfDuplicate')); return; }
          mf.push(path);
          await this.plugin.saveSettings(); this.plugin.folderFocusMgr.applyFocus(); this.display();
        }));

      let mfManual = '';
      new Setting(containerEl)
        .addText(tx=>tx.setPlaceholder(t('mfPathPlaceholder')).onChange(val=>{ mfManual = val.trim(); }))
        .addButton(btn=>btn.setButtonText(t('mfAdd')).setCta().onClick(async ()=>{
          if (!mfManual) { new Notice(t('mfInvalidPath')); return; }
          const mf = this.plugin.settings.mainFolders || (this.plugin.settings.mainFolders = []);
          if (mf.includes(mfManual)) { new Notice(t('mfDuplicate')); return; }
          mf.push(mfManual);
          await this.plugin.saveSettings(); this.plugin.folderFocusMgr.applyFocus(); this.display();
        }));
    }

    containerEl.createEl('p', { text:'Obsidian Toolkit v2.6 — by Ahmed', cls:'setting-item-description' });
  }

  async addQuickItem(path, label) {
    const items = this.plugin.settings.quickBarItems || (this.plugin.settings.quickBarItems = []);
    if (items.some(i => i.path === path)) { new Notice(t('qbDuplicate')); return; }
    items.push({ id: `${Date.now()}`, path, label: label || path.split('/').pop() });
    await this.plugin.saveSettings();
    this.plugin.quickBarMgr.render();
    this.display();
  }
}

/* ══════════════════════════════════════════════
   MAIN PLUGIN
══════════════════════════════════════════════ */
class ObsidianToolkitPlugin extends Plugin {
  async onload() {
    await this.loadSettings();

    /* CSS auto-loaded by Obsidian from styles.css */

    if (this.settings.enableFormatting) {
      this.addRibbonIcon('wand-2', 'Formatting Palette (Ctrl+Shift+F)', ()=>{
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (view) new FormattingPaletteModal(this.app, view.editor, this).open();
        else new Notice(t('openMd'));
      });
      this.addCommand({ id:'open-formatting-palette', name:'Open Formatting Palette',
        hotkeys:[{modifiers:['Ctrl','Shift'],key:'f'}],
        editorCallback:(editor)=>new FormattingPaletteModal(this.app, editor, this).open() });
    }

    if (this.settings.enableImageControl) {
      this.imgMgr = new ImageControlManager(this);
      this.imgMgr.register();
    }

    this.fullscreenMgr = new FullscreenManager(this);
    if (this.settings.enableFullscreen) this.fullscreenMgr.register();

    this.addRibbonIcon('maximize-2', 'Fullscreen Note (Ctrl+Shift+Z)', ()=>this.fullscreenMgr.toggle());
    this.addCommand({ id:'toggle-fullscreen', name:'Toggle Fullscreen Note',
      hotkeys:[{modifiers:['Ctrl','Shift'],key:'z'}], callback:()=>this.fullscreenMgr.toggle() });

    this.fileTreeMgr = new FileTreeManager(this);
    if (this.settings.enableFileTree) this.fileTreeMgr.register();

    this.quickBarMgr = new QuickBarManager(this);
    if (this.settings.enableQuickBar) this.quickBarMgr.register();

    this.folderFocusMgr = new FolderFocusManager(this);
    if (this.settings.enableFolderFocus) this.folderFocusMgr.register();

    this.addCommand({ id:'ai-smart-suggestion', name:'AI Smart Template Suggestion',
      hotkeys:[{modifiers:['Ctrl','Shift'],key:'g'}],
      editorCallback:(editor)=>{
        if (!this.settings.enableAI) { new Notice(t('aiDisabled')); return; }
        const cursor = editor.getCursor();
        const selection = editor.getSelection();
        let context = selection;
        if (!context) {
          const fromLine = Math.max(0, cursor.line - 12);
          context = editor.getRange({ line: fromLine, ch: 0 }, cursor);
        }
        if (!context || !context.trim()) { new Notice(t('aiNoContext')); return; }
        new AISuggestModal(this.app, this, editor, context).open();
      } });

    this.addCommand({ id:'ai-template-generator', name:'AI Template Generator',
      hotkeys:[{modifiers:['Ctrl','Shift'],key:'t'}],
      editorCallback:(editor)=>{
        if (!this.settings.enableAI) { new Notice(t('aiDisabled')); return; }
        new TemplateGeneratorModal(this.app, this, editor).open();
      } });

    this.addSettingTab(new ToolkitSettingsTab(this.app, this));
  }

  onunload() {
    this.imgMgr?.destroy();
    this.fullscreenMgr?.destroy();
    this.fileTreeMgr?.destroy();
    this.quickBarMgr?.destroy();
    this.folderFocusMgr?.destroy();
    document.querySelectorAll('.ic-lightbox-overlay').forEach(e=>e.remove());
  }

  async loadSettings()  { this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData()); }
  async saveSettings()  { await this.saveData(this.settings); }
}

module.exports = ObsidianToolkitPlugin;