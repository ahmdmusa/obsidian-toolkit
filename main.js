'use strict';
const { Plugin, PluginSettingTab, Setting, Modal, MarkdownView, Notice, TFile, TFolder, EditorSuggest } = require('obsidian');

/* ══════════════════════════════════════════════
   LANGUAGE DETECTION (English by default, Arabic optional)
══════════════════════════════════════════════ */
let CURRENT_PLUGIN_INSTANCE = null;

const getAppLang = () => {
  if (CURRENT_PLUGIN_INSTANCE && CURRENT_PLUGIN_INSTANCE.settings) {
    if (CURRENT_PLUGIN_INSTANCE.settings.enableArabicUi) return 'ar';
    return 'en';
  }
  return 'en';
};

/* ══════════════════════════════════════════════
   TRANSLATIONS
══════════════════════════════════════════════ */
const TR = {
  en: {
    stSettingName:'Floating Selection Toolbar', stSettingDesc:'Show a Notion-style floating toolbar when selecting text with quick formatting, direction, and AI.', stBold:'Bold (Ctrl+B)', stItalic:'Italic (Ctrl+I)', stHighlight:'Highlight (==)', stStrike:'Strikethrough (~~)', stCode:'Inline Code', stLink:'Link ([[...]])', stCallout:'Wrap in Callout', stRtl:'Toggle RTL / LTR Direction', stAi:'Ask AI with Selection',
    paletteTitle:'Formatting Palette', searchPlaceholder:'Search formats…', noResults:'No results',
    kbNavigate:'navigate', kbInsert:'insert', kbClose:'close',
    catInsert:'Insert', catCallouts:'Callouts', catCustom:'Custom Callouts',
    catIslamic:'Islamic', catHeadings:'Headings', catText:'Text',
    catLists:'Lists', catCode:'Code', catDividers:'Dividers',
    iDateLocale:'Date (Long)', iDateIso:'Date (ISO)', iTimeLocale:'Time',
    iTime24:'Time (24h)', iDatetime:'Date & Time', iProgress:'Progress Bar',
    settingsTitle:'FlowKit (formerly My Toolkit)',
    fcMenu:'🎨 تلوين وأيقونة الفولدر',
    fcModalTitle:'تلوين وأيقونة الفولدر',
    fcPreview:'معاينة:',
    fcColorTitle:'لون المجلد',
    fcIconTitle:'أيقونة مخصصة',
    fcSaveBtn:'حفظ المظهر',
    fcResetBtn:'استعادة الافتراضي',
    fcSavedNotice:'🎨 تم حفظ مظهر: ',
    fcResetNotice:'تمت استعادة المظهر الافتراضي لـ: ',
    fvPanicCmd:'قفل الطوارئ: قفل كافة الفولدرات فوراً',
    fvPanicNotice:'🚨 قفل الطوارئ: تم قفل كافة الفولدرات المحمية فوراً!',
    fcMenu:'🎨 Folder Color & Icon',
    fcModalTitle:'Folder Color & Custom Icon',
    fcPreview:'Preview:',
    fcColorTitle:'Color Theme',
    fcIconTitle:'Preset Icon',
    fcSaveBtn:'Save Style',
    fcResetBtn:'Reset Default',
    fcSavedNotice:'🎨 Style saved for: ',
    fcResetNotice:'Reset style for: ',
    fvPanicCmd:'Panic Lock: Immediately Lock All Folders',
    fvPanicNotice:'🚨 Panic Lock: All protected folders locked!',
    supportTitle:'☕ ادعم تطوير FlowKit',
    supportDesc:'إذا كانت إضافة My Toolkit بتفيدك وتسهّل تنظيم ملاحظاتك ودراستك في Obsidian، يسعدني جداً دعمك بكوب قهوة للاستمرار في تطوير ميزات جديدة وصيانتها باستمرار! ❤️',
    supportBtn:'☕ اشتري لي قهوة (PayPal)',
    starBtn:'⭐ نجمة على GitHub', feedbackBtn:'✉️ أرسل اقتراحاً أو ملاحظة',
    supportFooter:'FlowKit · صُنع بكل حب ❤️ بواسطة أحمد موسى · مصر 🇪🇬',
    supportTitle:'☕ Support FlowKit',
    supportDesc:'If My Toolkit helps you stay organized, focused, and productive in Obsidian, consider buying me a coffee! Your support fuels ongoing development, new privacy features, and open-source maintenance.',
    supportBtn:'☕ Buy Me a Coffee (PayPal)',
    starBtn:'⭐ Star on GitHub', feedbackBtn:'✉️ Suggestions & Feedback',
    supportFooter:'FlowKit · Crafted with ❤️ by Ahmed Mousa · Egypt 🇪🇬',
    fmtName:'🎨 Formatting Palette',
    slashName:'⚡ Slash Commands (/)',
    slashDesc:'Type / at line start or after space to insert callouts, formatting & templates (Notion-style).',
    rtlCommandName:'Toggle Line / Selection RTL (Arabic Direction)', fmtDesc:'Insert callouts, formatting & dividers — Ctrl+Shift+F',
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
    lbFlipH:'Flip horizontal', lbFlipV:'Flip vertical', lbInvert:'Invert colors',
    lbGallery:'Images in this note', lbMoveHint:'← → next/prev image · Shift+arrows to pan · Scroll to zoom',
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
    ffFocusCurrent:'Focus on current folder', ffNoFile:'No active file inside a folder', ffNewNote:'+ New note', ffErrorNotFound:'Folder not found in vault',
    ffFocusMenuItem:'📁 Focus on this folder', ffUnfocusMenuItem:'✕ Exit folder focus',
    ffBack:'All files', ffFocusOn:'📁 Focused on: ', ffFocusOff:'Folder focus cleared',
    ffName:'📁 Folder Focus Mode', ffDesc:'Right-click any folder → "Focus on this folder" to make it look like the vault root in the sidebar. (Search, graph, and Quick Switcher still cover the whole vault.)',
    mfName:'📂 Main Folders (auto-focus)', mfDesc:'Folders in this list jump straight into Focus Mode when clicked — their sub-folders stay collapsed.',
    mfPathPlaceholder:'folder/subfolder', mfAddCurrent:'+ Add current folder',
    mfAdd:'Add', mfRemove:'Remove', mfEmpty:'No main folders yet — add some below.',
    mfDuplicate:'Already a main folder.', mfNoActiveFile:'No active file to detect its folder.',
    mfInvalidPath:'Enter a path first.',
    /* ── Folder Vault & Privacy Lock ── */
    fvName:'🔒 Folder Vault & Privacy Lock',
    fvDesc:'Protect sensitive folders with a custom PIN or password. Prevents leaks in Quick Switcher and Search.',
    fvOn:'✅ Folder Vault enabled', fvOff:'⛔ Folder Vault disabled',
    fvLockMenu:'🔒 Lock Folder / Set PIN', fvUnlockMenu:'🔓 Unlock Folder', fvLockNowMenu:'🔒 Lock Folder Now', fvRemoveMenu:'🔓❌ Remove folder lock (delete PIN)',
    fvAutoLockName:'Auto-Lock Inactivity Timeout', fvAutoLockDesc:'Lock all open folders automatically after inactivity (minutes). 0 to disable.',
    fvBlurName:'Lock on Window Blur', fvBlurDesc:'Auto-lock when switching to another app or when Obsidian window loses focus.',
    fvStartupName:'Lock on Startup', fvStartupDesc:'Always start with all protected folders in a locked state.',
    fvHideName:'Hide Locked Folders in Tree', fvHideDesc:'Completely hide locked folders from the file tree instead of showing them with a lock badge.',
    fvFoldersList:'Protected Folders', fvEmpty:'No folders are protected yet. Right-click any folder in the File Explorer to set a PIN.',
    fvLockedStatus:'🔒 Locked', fvUnlockedStatus:'🟢 Unlocked',
    fvLockNow:'Lock', fvUnlock:'Unlock', fvRemove:'Remove Protection',
    fvLockAllCmd:'Lock All Protected Folders Immediately',
    btnCancel:'Cancel', fvUnlockBtn:'Unlock', fvInputPlaceholder:'PIN or password…', fvModalTitle:'Protected Folder', fvModalDesc:'Enter PIN or password to access:',
    fvWrongPin:'❌ Incorrect PIN or password',
    fvUnlockedNotice:'🔓 Folder unlocked: ', fvLockedNotice:'🔒 Folder locked: ',
    fvAutoLockNotice:'⏱️ Protected folders locked due to inactivity.',
    fvBlurNotice:'🔒 Protected folders locked on window blur.',
    fvSetupTitle:'Set PIN / Password', fvSetupDesc:'Enter a 4-6 digit numeric PIN or alphanumeric password.',
    fvConfirmPin:'Confirm PIN / Password', fvSaveBtn:'Save & Lock Folder',
    fvPinMinLength:'⚠️ PIN/Password must be at least 4 characters.', fvPinMismatch:'❌ PINs do not match.',
    fvSavedNotice:'🔒 Folder protected: ', fvRemovedNotice:'Removed protection from: ',
  },
  ar: {
    stSettingName:'شريط التحديد العائم (Notion-style)', stSettingDesc:'إظهار شريط أدوات عائم للتنسيق السريع، اتجاه الفقرة والذكاء الاصطناعي عند تحديد أي نص.', stBold:'عريض (Bold)', stItalic:'مائل (Italic)', stHighlight:'تمييز (Highlight)', stStrike:'يتوسطه خط (Strikethrough)', stCode:'كود برمجي (Inline Code)', stLink:'رابط داخلي ([[...]])', stCallout:'تحويل لتنبيه (Callout)', stRtl:'تبديل اتجاه الكتابة عربي/إنجليزي', stAi:'معالجة التحديد بالذكاء الاصطناعي',
    paletteTitle:'لوحة التنسيق', searchPlaceholder:'ابحث عن تنسيق…', noResults:'لا توجد نتائج',
    kbNavigate:'تنقل', kbInsert:'إدراج', kbClose:'إغلاق',
    catInsert:'إدراج سريع', catCallouts:'تنبيهات', catCustom:'تنبيهات مخصصة',
    catIslamic:'إسلامي', catHeadings:'عناوين', catText:'نص',
    catLists:'قوائم', catCode:'كود', catDividers:'فواصل',
    iDateLocale:'التاريخ (طويل)', iDateIso:'التاريخ (ISO)', iTimeLocale:'الوقت',
    iTime24:'الوقت (24h)', iDatetime:'التاريخ والوقت', iProgress:'شريط تقدم',
    settingsTitle:'FlowKit (سابقاً My Toolkit)',
    fmtName:'🎨 لوحة التنسيق',
    slashName:'⚡ أوامر السلاش (/)',
    slashDesc:'اكتب / في بداية السطر أو بعد مسافة لإدراج الـ Callouts والقوالب والتنسيقات بسرعة مثل Notion.',
    rtlCommandName:'تبديل اتجاه السطر أو التحديد (RTL / LTR)',       fmtDesc:'إدراج التنبيهات والتنسيقات والفواصل — Ctrl+Shift+F',
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
    lbFlipH:'قلب أفقي', lbFlipV:'قلب رأسي', lbInvert:'عكس الألوان',
    lbGallery:'صور هذه الملاحظة', lbMoveHint:'← → الصورة التالية/السابقة · Shift+سهم للتحريك · التمرير للتكبير',
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
    ffFocusCurrent:'تركيز على مجلد الملف الحالي', ffNoFile:'لا يوجد ملف نشط داخل مجلد', ffNewNote:'+ ملاحظة جديدة', ffErrorNotFound:'المجلد غير موجود في الـ vault',
    ffFocusMenuItem:'📁 ركّز على هذا الفولدر', ffUnfocusMenuItem:'✕ إلغاء التركيز',
    ffBack:'كل الملفات', ffFocusOn:'📁 مُركَّز على: ', ffFocusOff:'تم إلغاء التركيز',
    ffName:'📁 وضع التركيز على فولدر', ffDesc:'كليك يمين على أي فولدر → "ركّز على هذا الفولدر" يخليه يبان كأنه جذر الـ vault في الشريط الجانبي. (البحث، الـ graph، و Quick Switcher بيفضلوا يشملوا الـ vault كامل.)',
    mfName:'📂 الفولدرات الرئيسية (تركيز تلقائي)', mfDesc:'الفولدرات في هذه القائمة تدخل في Focus Mode فوراً عند الضغط عليها — والفولدرات الفرعية بداخلها تفضل مقفولة.',
    mfPathPlaceholder:'folder/subfolder', mfAddCurrent:'+ إضافة الفولدر الحالي',
    mfAdd:'إضافة', mfRemove:'حذف', mfEmpty:'لا توجد فولدرات رئيسية — أضف عناصر من الأسفل.',
    mfDuplicate:'موجود مسبقاً في القائمة.', mfNoActiveFile:'لا يوجد ملف مفتوح لمعرفة فولدره.',
    mfInvalidPath:'اكتب المسار أولاً.',
    /* ── Folder Vault & Privacy Lock ── */
    fvName:'🔒 خزنة المجلدات والقفل',
    fvDesc:'حماية المجلدات الحساسة برمز PIN أو كلمة مرور مشفرة، مع منع التسريب في البحث والـ Quick Switcher.',
    fvOn:'✅ خزنة المجلدات مفعّلة', fvOff:'⛔ خزنة المجلدات معطّلة',
    fvLockMenu:'🔒 قفل الفولدر / تعيين رمز', fvUnlockMenu:'🔓 فتح قفل الفولدر', fvLockNowMenu:'🔒 قفل الفولدر الآن', fvRemoveMenu:'🔓❌ إزالة قفل الفولدر نهائياً (حذف الـ PIN)',
    fvAutoLockName:'قفل تلقائي عند الخمول', fvAutoLockDesc:'قفل الفولدرات المفتوحة تلقائياً عند عدم التفاعل (بالدقائق). 0 للتعطيل.',
    fvBlurName:'قفل عند مغادرة النافذة', fvBlurDesc:'قفل تلقائي عند التبديل لبرنامج آخر أو فقدان نافذة Obsidian للتركيز.',
    fvStartupName:'قفل عند بدء التشغيل', fvStartupDesc:'بدء تشغيل Obsidian دائماً وجميع الفولدرات المحمية في حالة قفل.',
    fvHideName:'إخفاء الفولدرات المقفلة من الشجرة', fvHideDesc:'إخفاء الفولدرات المقفلة تماماً من شجرة الملفات بدلاً من إظهارها مطوية مع شارة قفل.',
    fvFoldersList:'الفولدرات المحمية', fvEmpty:'لا توجد فولدرات محمية بعد. اضغط كليك يمين على أي فولدر في شجرة الملفات لتعيين رمز.',
    fvLockedStatus:'🔒 مقفول', fvUnlockedStatus:'🟢 مفتوح',
    fvLockNow:'قفل', fvUnlock:'فتح', fvRemove:'إلغاء الحماية',
    fvLockAllCmd:'قفل جميع الفولدرات المحمية فوراً',
    btnCancel:'إلغاء', fvUnlockBtn:'فتح القفل', fvInputPlaceholder:'رمز PIN أو كلمة المرور…', fvModalTitle:'مجلد محمي', fvModalDesc:'أدخل رمز الـ PIN أو كلمة المرور للوصول إلى:',
    fvWrongPin:'❌ رمز PIN أو كلمة مرور غير صحيحة',
    fvUnlockedNotice:'🔓 تم فتح قفل الفولدر: ', fvLockedNotice:'🔒 تم قفل الفولدر: ',
    fvAutoLockNotice:'⏱️ تم قفل الفولدرات تلقائياً بسبب الخمول.',
    fvBlurNotice:'🔒 تم قفل الفولدرات عند مغادرة النافذة.',
    fvSetupTitle:'تعيين رمز PIN / كلمة مرور', fvSetupDesc:'أدخل رمز PIN من 4-6 أرقام أو كلمة مرور آمنة.',
    fvConfirmPin:'تأكيد الرمز / كلمة المرور', fvSaveBtn:'حفظ وقفل الفولدر',
    fvPinMinLength:'⚠️ يجب ألا يقل الرمز عن 4 خانات.', fvPinMismatch:'❌ الرمز غير متطابق.',
    fvSavedNotice:'🔒 تم قفل وحماية الفولدر: ', fvRemovedNotice:'تمت إزالة الحماية عن: ',
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
  /* ── Language: English default, Arabic optional ── */
  enableArabicUi:       false,
  enableFormatting:     true,
  enableSlashCommands:  true,
  enableSelectionToolbar: true,
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
  /* ── Folder Vault & Privacy Lock ── */
  folderStyles:          {},                 // { [folderPath]: { color, icon } }
  enableFolderVault:     true,
  lockedFolders:         {},                 // { [folderPath]: { path, salt, hash, iterations } }
  vaultAutoLockTimeout:  10,                 // minutes; 0 = disabled
  vaultLockOnBlur:       false,              // lock on window blur
  vaultLockOnStartup:    true,               // lock on app launch
  vaultHideInTree:       false,              // hide completely or keep with badge
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
   SLASH COMMANDS (/) EDITOR SUGGEST
══════════════════════════════════════════════ */
class SlashCommandSuggest extends EditorSuggest {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
  }

  onTrigger(cursor, editor, file) {
    if (!this.plugin.settings.enableSlashCommands) return null;

    const line = editor.getRange({ line: cursor.line, ch: 0 }, cursor);
    const match = line.match(/(?:^|\s)\/([a-zA-Z0-9\u0600-\u06FF_-]*)$/);
    if (!match) return null;

    const query = match[1];
    const slashCh = line.lastIndexOf('/' + query);
    if (slashCh === -1) return null;

    return {
      start: { line: cursor.line, ch: slashCh },
      end: cursor,
      query: query
    };
  }

  getSuggestions(context) {
    const q = (context.query || '').toLowerCase().trim();
    const items = buildItems(context.editor, this.app, this.plugin);
    if (!q) return items;

    return items.filter(item => {
      const label = (item.label || '').toLowerCase();
      const cat = (item.cat || '').toLowerCase();
      const id = (item.id || '').toLowerCase();
      return label.includes(q) || cat.includes(q) || id.includes(q);
    });
  }

  renderSuggestion(item, el) {
    el.addClass('tk-slash-item');
    const iconSpan = el.createSpan({ cls: 'tk-slash-icon', text: item.icon || '📌' });
    if (item.color) iconSpan.style.color = item.color;

    const textWrap = el.createDiv({ cls: 'tk-slash-text' });
    textWrap.createDiv({ cls: 'tk-slash-title', text: item.label });
    if (item.cat) {
      textWrap.createDiv({ cls: 'tk-slash-cat', text: item.cat });
    }

    if (item.mdpreview) {
      el.createSpan({ cls: 'tk-slash-preview', text: item.mdpreview });
    }
  }

  selectSuggestion(item, evt) {
    const editor = this.context.editor;
    editor.replaceRange('', this.context.start, this.context.end);
    if (typeof item.action === 'function') {
      item.action();
    }
  }
}

/* ══════════════════════════════════════════════
   IMAGE CONTROL (Reading View only — bug fixed)
══════════════════════════════════════════════ */
const ALIGN_ICONS = { left:'⬤←', center:'⬤', right:'→⬤' };
const ALIGNS = ['left','center','right'];
const SIZE_STEP = 30, SIZE_MIN = 60, SIZE_MAX = 950;


/* ==========================================================================
   SelectionToolbarManager — Notion-Style Floating Selection Toolbar 2.0
   ========================================================================== */
class SelectionToolbarManager {
  constructor(plugin) {
    this.plugin = plugin;
    this.app = plugin.app;
    this.toolbarEl = null;
    this.calloutPickerEl = null;
    this.aiPickerEl = null;
    this.visible = false;
    this._debounceTimer = null;

    this._onSelectionChange = this._onSelectionChange.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onScroll = this._onScroll.bind(this);
  }

  register() {
    this.createToolbar();
    document.addEventListener('selectionchange', this._onSelectionChange);
    document.addEventListener('mousedown', this._onMouseDown);
    document.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('scroll', this._onScroll, true);
  }

  destroy() {
    document.removeEventListener('selectionchange', this._onSelectionChange);
    document.removeEventListener('mousedown', this._onMouseDown);
    document.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('scroll', this._onScroll, true);
    this.closeSubmenus();
    if (this.toolbarEl) {
      this.toolbarEl.remove();
      this.toolbarEl = null;
    }
    this.visible = false;
  }

  closeSubmenus() {
    if (this.calloutPickerEl) {
      this.calloutPickerEl.remove();
      this.calloutPickerEl = null;
    }
    if (this.aiPickerEl) {
      this.aiPickerEl.remove();
      this.aiPickerEl = null;
    }
  }

  createToolbar() {
    if (this.toolbarEl) return;
    const el = document.createElement('div');
    el.className = 'fk-selection-toolbar';

    // Prevent editor blur when interacting with toolbar or its submenus
    el.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });

    const addBtn = (titleKey, svgHtml, onClick, cls = '') => {
      const btn = document.createElement('button');
      btn.className = `fk-st-btn ${cls}`.trim();
      btn.setAttribute('aria-label', t(titleKey));
      btn.title = t(titleKey);
      btn.innerHTML = svgHtml;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(btn);
      });
      el.appendChild(btn);
      return btn;
    };

    const addDivider = () => {
      const div = document.createElement('div');
      div.className = 'fk-st-divider';
      el.appendChild(div);
    };

    // 1. Text styles
    addBtn('stBold', '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>', () => { this.closeSubmenus(); this.wrapSelection('**'); });
    addBtn('stItalic', '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>', () => { this.closeSubmenus(); this.wrapSelection('*'); });
    addBtn('stHighlight', '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 11-6 6v3h3l6-6"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/></svg>', () => { this.closeSubmenus(); this.wrapSelection('=='); });
    addBtn('stStrike', '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" y1="12" x2="20" y2="12"/></svg>', () => { this.closeSubmenus(); this.wrapSelection('~~'); });
    addBtn('stCode', '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>', () => { this.closeSubmenus(); this.wrapSelection('`'); });

    addDivider();

    // 2. Structural & Direction
    addBtn('stLink', '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>', () => { this.closeSubmenus(); this.wrapSelection('[[', ']]'); });

    // Callout Button with Interactive Dropdown Picker!
    const calloutBtn = addBtn('stCallout', '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>', (btn) => this.toggleCalloutPicker(btn));

    addBtn('stRtl', '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16"/><path d="m14 6 6 6-6 6"/><path d="M10 4v16"/></svg>', () => { this.closeSubmenus(); this.applyRtl(); });

    addDivider();

    // 3. AI Smart Assist with Dropdown Picker!
    addBtn('stAi', '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>', (btn) => this.toggleAiPicker(btn), 'fk-st-ai');

    document.body.appendChild(el);
    this.toolbarEl = el;
  }

  toggleCalloutPicker(btnEl) {
    if (this.calloutPickerEl) {
      this.closeSubmenus();
      return;
    }
    this.closeSubmenus();
    this.openCalloutPicker(btnEl);
  }

  openCalloutPicker(btnEl) {
    const picker = document.createElement('div');
    picker.className = 'fk-st-callout-picker';

    picker.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });

    const callouts = [
      { id: 'note', icon: '📝', en: 'Note', ar: 'ملاحظة', color: '#0284c7' },
      { id: 'tip', icon: '💡', en: 'Tip', ar: 'فكرة / نصيحة', color: '#06b6d4' },
      { id: 'info', icon: 'ℹ️', en: 'Info', ar: 'معلومة هامة', color: '#8b5cf6' },
      { id: 'warning', icon: '⚠️', en: 'Warning', ar: 'تحذير', color: '#f59e0b' },
      { id: 'danger', icon: '🚨', en: 'Danger', ar: 'خطر / تنبيه', color: '#ef4444' },
      { id: 'success', icon: '✅', en: 'Success', ar: 'تم / إنجاز', color: '#10b981' },
      { id: 'question', icon: '❓', en: 'Question', ar: 'سؤال', color: '#f97316' },
      { id: 'quote', icon: '💬', en: 'Quote', ar: 'اقتباس', color: '#64748b' },
      { id: 'example', icon: '⚡', en: 'Example', ar: 'مثال عملي', color: '#a855f7' },
      { id: 'abstract', icon: '📋', en: 'Summary', ar: 'خلاصة / ملخص', color: '#6366f1' },
    ];

    const isAr = this.plugin.settings.enableArabicUi;

    callouts.forEach(c => {
      const item = document.createElement('button');
      item.className = 'fk-st-callout-item';
      item.innerHTML = `
        <span class="fk-callout-badge" style="background: ${c.color}22; color: ${c.color}; border: 1px solid ${c.color}44;">
          ${c.icon}
        </span>
        <span class="fk-callout-label">${isAr ? c.ar : c.en}</span>
      `;
      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.applyCalloutType(c.id);
        this.closeSubmenus();
      });
      picker.appendChild(item);
    });

    // Auto positioning above or below toolbar
    const tbRect = this.toolbarEl.getBoundingClientRect();
    if (tbRect.bottom + 230 > window.innerHeight) {
      picker.style.bottom = 'calc(100% + 6px)';
      picker.style.top = 'auto';
    } else {
      picker.style.top = 'calc(100% + 6px)';
      picker.style.bottom = 'auto';
    }

    this.toolbarEl.appendChild(picker);
    this.calloutPickerEl = picker;
  }

  toggleAiPicker(btnEl) {
    if (this.aiPickerEl) {
      this.closeSubmenus();
      return;
    }
    this.closeSubmenus();
    this.openAiPicker(btnEl);
  }

  openAiPicker(btnEl) {
    const picker = document.createElement('div');
    picker.className = 'fk-st-ai-picker';

    picker.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });

    const isAr = this.plugin.settings.enableArabicUi;

    const actions = [
      { id: 'proofread', icon: '✍️', en: 'Proofread & Enhance', ar: 'تدقيق لغوي وصياغة', prompt: 'راجع وصحح لغوياً وإملائياً النص التالي وحسّن صياغته مع الحفاظ التام على معناه ولغته:' },
      { id: 'summarize', icon: '📝', en: 'Summarize Selection', ar: 'تلخيص بنقاط مركزة', prompt: 'لخّص النص التالي في نقاط موجزة وسهلة القراءة:' },
      { id: 'explain', icon: '🔍', en: 'Explain & Simplify', ar: 'شرح وتبسيط المفهوم', prompt: 'اشرح هذا المفهوم وبسّطه وقدم مثالاً توضيحياً سريعاً له:' },
      { id: 'translate', icon: '🌐', en: 'Translate (AR ⇄ EN)', ar: 'ترجمة فورية (عربي/إنجليزي)', prompt: 'ترجم النص التالي بدقة (إذا كان عربياً ترجمه للإنجليزية، وإذا كان إنجليزياً ترجمه للعربية) مع الحفاظ على التنسيق:' },
      { id: 'custom', icon: '✨', en: 'Custom AI Assistant...', ar: 'طلب ذكاء اصطناعي مخصص...', isModal: true },
    ];

    actions.forEach(a => {
      const item = document.createElement('button');
      item.className = 'fk-st-ai-item';
      item.innerHTML = `
        <span class="fk-ai-badge">${a.icon}</span>
        <span class="fk-ai-label">${isAr ? a.ar : a.en}</span>
      `;
      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeSubmenus();
        if (a.isModal) {
          this.openAiModal();
        } else {
          this.executeQuickAi(a.prompt);
        }
      });
      picker.appendChild(item);
    });

    const tbRect = this.toolbarEl.getBoundingClientRect();
    if (tbRect.bottom + 190 > window.innerHeight) {
      picker.style.bottom = 'calc(100% + 6px)';
      picker.style.top = 'auto';
    } else {
      picker.style.top = 'calc(100% + 6px)';
      picker.style.bottom = 'auto';
    }

    this.toolbarEl.appendChild(picker);
    this.aiPickerEl = picker;
  }

  _onSelectionChange() {
    clearTimeout(this._debounceTimer);
    this._debounceTimer = setTimeout(() => {
      this.update();
    }, 70);
  }

  _onMouseDown(e) {
    if (this.visible && this.toolbarEl && !this.toolbarEl.contains(e.target)) {
      this.closeSubmenus();
      setTimeout(() => this.update(), 50);
    }
  }

  _onKeyDown(e) {
    if (e.key === 'Escape') {
      this.closeSubmenus();
      this.hide();
    }
  }

  _onScroll() {
    if (this.visible) {
      this.closeSubmenus();
      this.hide();
    }
  }

  update() {
    if (!this.plugin.settings.enableSelectionToolbar) {
      this.hide();
      return;
    }

    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view || !view.editor) {
      this.hide();
      return;
    }

    const editor = view.editor;
    const selText = editor.getSelection();
    if (!selText || !selText.trim()) {
      this.hide();
      return;
    }

    const domSel = window.getSelection();
    if (!domSel || domSel.rangeCount === 0 || domSel.isCollapsed) {
      this.hide();
      return;
    }

    const range = domSel.getRangeAt(0);
    const container = range.commonAncestorContainer;
    const editorEl = container.nodeType === Node.ELEMENT_NODE
      ? container.closest('.cm-editor, .markdown-source-view')
      : container.parentElement?.closest('.cm-editor, .markdown-source-view');

    if (!editorEl) {
      this.hide();
      return;
    }

    const rect = range.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) {
      this.hide();
      return;
    }

    this.showAt(rect);
  }

  showAt(rect) {
    if (!this.toolbarEl) this.createToolbar();
    this.toolbarEl.style.display = 'flex';

    const width = this.toolbarEl.offsetWidth || 340;
    const height = this.toolbarEl.offsetHeight || 38;

    let top = rect.top - height - 8;
    let left = rect.left + (rect.width / 2) - (width / 2);

    if (top < 45) {
      top = rect.bottom + 8;
    }

    left = Math.max(12, Math.min(left, window.innerWidth - width - 12));

    this.toolbarEl.style.top = `${Math.round(top)}px`;
    this.toolbarEl.style.left = `${Math.round(left)}px`;
    this.toolbarEl.classList.add('is-visible');
    this.visible = true;
  }

  hide() {
    this.closeSubmenus();
    if (this.toolbarEl) {
      this.toolbarEl.classList.remove('is-visible');
      this.toolbarEl.style.display = 'none';
    }
    this.visible = false;
  }

  wrapSelection(prefix, suffix = prefix) {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view || !view.editor) return;
    const editor = view.editor;
    const sel = editor.getSelection();
    if (!sel) return;

    if (sel.startsWith(prefix) && sel.endsWith(suffix) && sel.length >= prefix.length + suffix.length) {
      const inner = sel.slice(prefix.length, sel.length - suffix.length);
      editor.replaceSelection(inner);
    } else {
      editor.replaceSelection(`${prefix}${sel}${suffix}`);
    }
    editor.focus();
    setTimeout(() => this.update(), 50);
  }

  applyCalloutType(type) {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view || !view.editor) return;
    const editor = view.editor;
    const sel = editor.getSelection();
    if (!sel) return;

    const calloutRegex = /^>\s*\[!([a-zA-Z0-9_-]+)\](.*)/;
    const lines = sel.split('\n');

    if (lines.length > 0 && calloutRegex.test(lines[0])) {
      // Smoothly switch callout type if already inside one
      lines[0] = lines[0].replace(calloutRegex, `> [!${type}]$2`);
      editor.replaceSelection(lines.join('\n'));
    } else {
      // Wrap lines in new callout
      const callout = `> [!${type}]\n` + lines.map(l => `> ${l}`).join('\n');
      editor.replaceSelection(callout);
    }

    editor.focus();
    this.hide();
  }

  applyRtl() {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view || !view.editor) return;
    const editor = view.editor;
    const sel = editor.getSelection();
    if (!sel) return;

    if (sel.startsWith('<div dir="rtl">\n') && sel.endsWith('\n</div>')) {
      editor.replaceSelection(sel.slice(16, -7));
    } else if (sel.startsWith('<div dir="rtl">') && sel.endsWith('</div>')) {
      editor.replaceSelection(sel.slice(15, -6));
    } else {
      editor.replaceSelection(`<div dir="rtl">\n${sel}\n</div>`);
    }
    editor.focus();
    setTimeout(() => this.update(), 50);
  }

  openAiModal() {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view || !view.editor) return;
    const editor = view.editor;
    const sel = editor.getSelection();
    this.hide();

    if (!this.plugin.settings.enableAI) {
      new Notice(t('aiDisabled'));
      return;
    }
    new AISuggestModal(this.app, this.plugin, editor, sel).open();
  }

  async executeQuickAi(systemInstruction) {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view || !view.editor) return;
    const editor = view.editor;
    const sel = editor.getSelection();
    this.hide();

    if (!this.plugin.settings.enableAI) {
      new Notice(t('aiDisabled'));
      return;
    }

    const notice = new Notice(t('aiThinking') || 'AI is thinking...', 0);
    try {
      const messages = [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: sel }
      ];
      const result = stripCodeFences(await callAI(this.plugin, messages));
      notice.hide();
      if (result) {
        editor.replaceSelection(result);
        new Notice('✨ ' + (t('aiInsertSuggestion') || 'Done!'));
      }
    } catch (err) {
      notice.hide();
      new Notice((t('aiError') || 'AI Error: ') + (err.message || err));
    }
  }
}

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

  /* Collect all image sources within the same rendered note, in document order */
  _allImageSrcsIn(el) {
    const root = el.closest('.markdown-preview-view, .markdown-reading-view, .markdown-rendered') || el.ownerDocument;
    return Array.from(root.querySelectorAll('img')).map(i => i.src);
  }

  processSpecialLayouts(el) {
    el.querySelectorAll('.img-caption').forEach(div => {
      div.classList.add('ic-caption-layout');
      div.querySelectorAll('img').forEach(img => img.addEventListener('click', () => this.openLightbox(img.src, this._allImageSrcsIn(img))));
      div.querySelectorAll('em').forEach(em => em.classList.add('ic-cap-text'));
    });
    el.querySelectorAll('.img-col').forEach(div => {
      div.classList.add('ic-col-layout');
      if (div.classList.contains('img-col-right')) div.classList.add('reversed');
      div.querySelectorAll('img').forEach(img => img.addEventListener('click', () => this.openLightbox(img.src, this._allImageSrcsIn(img))));
    });
    [2,3,4].forEach(n => el.querySelectorAll(`.img-grid-${n}`).forEach(div => {
      div.classList.add('ic-grid', `ic-grid-${n}`);
      div.querySelectorAll('img').forEach(img => img.addEventListener('click', () => this.openLightbox(img.src, this._allImageSrcsIn(img))));
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
    tb.appendChild(mkBtn('⤢', t('lightbox'), () => this.openLightbox(src, this._allImageSrcsIn(img))));

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

  openLightbox(src, allSrcs = []) {
    let scale=1, rot=0, tx=0, ty=0, flipX=1, flipY=1, inverted=false;
    let dragging=false, startX, startY;
    let currentIdx = allSrcs.indexOf(src);
    if (currentIdx < 0) currentIdx = 0;

    /* ── overlay ── */
    const overlay = document.createElement('div'); overlay.className='ic-lightbox-overlay';
    const inner   = document.createElement('div'); inner.className='ic-lightbox-inner';
    const image   = document.createElement('img'); image.className='ic-lightbox-img'; image.src=src;

    const applyT = () => {
      image.style.transform = `translate(${tx}px,${ty}px) scale(${scale*flipX},${scale*flipY}) rotate(${rot}deg)`;
      image.style.filter = inverted ? 'invert(1) hue-rotate(180deg)' : '';
      zoomVal.textContent = Math.round(scale*100)+'%';
    };

    const loadImg = (newSrc) => {
      image.src = newSrc;
      scale=1; rot=0; tx=0; ty=0; flipX=1; flipY=1; inverted=false;
      applyT();
      updateGalleryActive();
    };

    /* ── close button ── */
    const closeBtn = document.createElement('button'); closeBtn.className='ic-lb-close'; closeBtn.innerHTML='✕'; closeBtn.onclick=()=>close();

    /* ── top bar ── */
    const bar     = document.createElement('div'); bar.className='ic-lb-bar';
    const zoomVal = document.createElement('span'); zoomVal.className='ic-lb-zoom-val'; zoomVal.textContent='100%';

    const lbBtn = (l, title, fn) => {
      const b = document.createElement('button'); b.className='ic-lb-btn'; b.textContent=l; b.title=title;
      b.addEventListener('click', e=>{ e.stopPropagation(); fn(); applyT(); }); return b;
    };

    const invertBtn = lbBtn('⬛', t('lbInvert'), ()=>{ inverted=!inverted; invertBtn.classList.toggle('ic-lb-active', inverted); });

    bar.append(
      lbBtn('−',   'Zoom out',       ()=>{ scale=Math.max(0.1,scale-.15); }),
      zoomVal,
      lbBtn('+',   'Zoom in',        ()=>{ scale=Math.min(6,scale+.15); }),
      lbBtn('↻',   'Rotate right',   ()=>{ rot=(rot+90)%360; }),
      lbBtn('↺',   'Rotate left',    ()=>{ rot=(rot-90+360)%360; }),
      lbBtn('↔',   t('lbFlipH'),     ()=>{ flipX*=-1; }),
      lbBtn('↕',   t('lbFlipV'),     ()=>{ flipY*=-1; }),
      invertBtn,
      lbBtn('1:1', 'Reset',          ()=>{ scale=1;rot=0;tx=0;ty=0;flipX=1;flipY=1;inverted=false; invertBtn.classList.remove('ic-lb-active'); }),
    );

    /* ── drag ── */
    inner.addEventListener('mousedown', e => {
      if (e.button!==0) return;
      dragging=true; startX=e.clientX-tx; startY=e.clientY-ty; inner.classList.add('dragging');
    });
    const onMove = e=>{ if(!dragging)return; tx=e.clientX-startX; ty=e.clientY-startY; applyT(); };
    const onUp   = ()=>{ dragging=false; inner.classList.remove('dragging'); };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);

    /* ── scroll zoom ── */
    overlay.addEventListener('wheel', e=>{
      e.preventDefault();
      scale=Math.min(6,Math.max(.1,scale-e.deltaY*.0012));
      applyT();
    }, {passive:false});

    /* ── arrow keys + escape ── */
    const STEP = 20;
    const onKey = e => {
      switch(e.key) {
        case 'Escape':
          close(); break;
        case 'ArrowLeft':
          e.preventDefault();
          if (allSrcs.length > 1 && !e.shiftKey) { currentIdx=(currentIdx-1+allSrcs.length)%allSrcs.length; loadImg(allSrcs[currentIdx]); }
          else { tx-=STEP; applyT(); }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (allSrcs.length > 1 && !e.shiftKey) { currentIdx=(currentIdx+1)%allSrcs.length; loadImg(allSrcs[currentIdx]); }
          else { tx+=STEP; applyT(); }
          break;
        case 'ArrowUp':    e.preventDefault(); ty-=STEP; applyT(); break;
        case 'ArrowDown':  e.preventDefault(); ty+=STEP; applyT(); break;
      }
    };
    document.addEventListener('keydown', onKey);

    overlay.addEventListener('click', e=>{ if(e.target===overlay) close(); });

    /* ── gallery navbar ── */
    let galleryEl = null;
    const updateGalleryActive = () => {
      if (!galleryEl) return;
      galleryEl.querySelectorAll('.ic-gal-thumb').forEach((el,i)=>{
        el.classList.toggle('ic-gal-active', allSrcs[i] === image.src);
      });
    };

    if (allSrcs.length > 1) {
      galleryEl = document.createElement('div'); galleryEl.className='ic-gallery-bar';
      const label = document.createElement('span'); label.className='ic-gal-label'; label.textContent=t('lbGallery');
      galleryEl.appendChild(label);

      const strip = document.createElement('div'); strip.className='ic-gal-strip';
      allSrcs.forEach((s, i) => {
        const thumb = document.createElement('img');
        thumb.className='ic-gal-thumb'; thumb.src=s; thumb.alt='';
        thumb.classList.toggle('ic-gal-active', s===src);
        thumb.addEventListener('click', e=>{ e.stopPropagation(); currentIdx=i; loadImg(s); });
        strip.appendChild(thumb);
      });
      galleryEl.appendChild(strip);
      overlay.appendChild(galleryEl);
    }

    /* ── hint ── */
    const hint = document.createElement('div'); hint.className='ic-lb-hint'; hint.textContent=t('lbMoveHint');
    setTimeout(()=>{ hint.style.opacity='0'; }, 2500);

    const close = () => {
      overlay.remove();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup',   onUp);
      document.removeEventListener('keydown', onKey);
    };

    inner.appendChild(image);
    overlay.append(closeBtn, inner, bar, hint);
    document.body.appendChild(overlay);
    applyT();
  }
}

/* ══════════════════════════════════════════════
   FULLSCREEN MANAGER
══════════════════════════════════════════════ */
class FullscreenManager {
  constructor(plugin) { this.plugin=plugin; this._timer=null; this._hintTimer=null; this._hintEl=null; this._bound={}; this._zenActive=false; }

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

  /* ── Zen Mode: CSS-only "fullscreen" — works without a fresh user
     gesture, unlike the real Fullscreen API which Chromium silently
     rejects when triggered from a setTimeout. ── */
  enterZen() {
    if (this._zenActive) return;
    this._zenActive = true;
    document.body.classList.add('toolkit-zen-mode');
  }

  exitZen() {
    if (!this._zenActive) return;
    this._zenActive = false;
    document.body.classList.remove('toolkit-zen-mode');
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
    this._bound.escExit = (e)=>{ if (e.key==='Escape' && this._zenActive) this.exitZen(); };
    /* Listen on window with capture so events firing inside Settings
       modals or other dialogs are still detected — document-level
       bubble listeners can miss those if a modal stops propagation. */
    ['mousemove','mousedown','keydown','wheel','touchstart'].forEach(ev=>window.addEventListener(ev,this._bound.reset,{passive:true,capture:true}));
    window.addEventListener('keydown', this._bound.escExit, true);
    this.resetTimer();
  }

  stopActivityWatch() {
    ['mousemove','mousedown','keydown','wheel','touchstart'].forEach(ev=>window.removeEventListener(ev,this._bound.reset,true));
    if (this._bound.escExit) window.removeEventListener('keydown', this._bound.escExit, true);
    clearTimeout(this._timer); clearTimeout(this._hintTimer); this.removeHint();
    this.exitZen();
  }

  resetTimer() {
    /* any activity exits zen mode immediately */
    this.exitZen();
    clearTimeout(this._timer); clearTimeout(this._hintTimer); this.removeHint();
    if (!this.plugin.settings.enableAutoFullscreen || document.fullscreenElement) return;
    const delay = Math.max(5,Math.min(120,this.plugin.settings.autoFullscreenDelay))*1000;
    this._hintTimer = setTimeout(()=>this.showHint(), Math.max(0,delay-3000));
    this._timer     = setTimeout(()=>{ this.removeHint(); this.enterZen(); }, delay);
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

  destroy() { document.querySelectorAll('.fs-float-btn').forEach(b=>b.remove()); this.stopActivityWatch(); this.removeHint(); this.exitZen(); }
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
   FOLDER FOCUS MODE  (v2.0 — rewritten)
══════════════════════════════════════════════ */
class FolderFocusManager {
  constructor(plugin) {
    this.plugin = plugin;
    this._obs = null;
    this._rafId = null;
    this.breadcrumbEl = null;
    this._navEl = null;
    this._clickHandler = null;
    this._suppressObserver = false;
    this._ribbonEl = null;
  }

  /* ── DOM helpers (safe for Arabic / Unicode paths — NO CSS.escape) ── */
  _findTitleByPath(nav, path) {
    for (const el of nav.querySelectorAll('.nav-folder-title')) {
      if (el.dataset.path === path) return el;
    }
    return null;
  }

  _getExplorerView() {
    const leaves = this.plugin.app.workspace.getLeavesOfType('file-explorer');
    return leaves.length > 0 ? leaves[0].view : null;
  }

  /* Force-expand a folder AND all its ancestors via Obsidian's internal
     file-explorer API.  This is the key fix: it bypasses the old
     "dispatch a synthetic click" hack, which was unreliable and caused
     race conditions.  `fileItems[path].setCollapsed(false)` is
     synchronous and immediately mounts children into the DOM. */
  _expandToPath(path) {
    const view = this._getExplorerView();
    if (!view || !view.fileItems) return;
    const parts = path.split('/');
    let cur = '';
    for (const part of parts) {
      cur = cur ? cur + '/' + part : part;
      const item = view.fileItems[cur];
      if (item && typeof item.setCollapsed === 'function') {
        try { item.setCollapsed(false); } catch (e) { /* ignore */ }
      }
    }
  }

  /* Collapse direct sub-folders of a path via the explorer API */
  _collapseChildFolders(path) {
    const view = this._getExplorerView();
    if (!view || !view.fileItems) return;
    const prefix = path + '/';
    for (const [itemPath, item] of Object.entries(view.fileItems)) {
      if (itemPath === path) continue;
      if (!itemPath.startsWith(prefix)) continue;
      const rel = itemPath.slice(prefix.length);
      if (!rel.includes('/') && item.file instanceof TFolder &&
          typeof item.setCollapsed === 'function') {
        try { item.setCollapsed(true); } catch (e) { /* ignore */ }
      }
    }
  }

  /* ══════════════════ REGISTER ══════════════════ */
  register() {
    /* ── Context menu ── */
    this.plugin.registerEvent(this.plugin.app.workspace.on('file-menu', (menu, file) => {
      if (!(file instanceof TFolder)) return;
      if (this.plugin.settings.focusedFolder === file.path) {
        menu.addItem(item => item.setTitle(t('ffUnfocusMenuItem')).setIcon('x-circle')
          .onClick(() => this.clearFocus()));
      } else {
        menu.addItem(item => item.setTitle(t('ffFocusMenuItem')).setIcon('focus')
          .onClick(() => this.setFocus(file.path)));
      }
    }));

    /* ── MutationObserver — suppression flag prevents self-trigger loops ── */
    this._obs = new MutationObserver(() => {
      if (this._suppressObserver) return;
      this.schedule();
    });

    /* ── Click handler for auto-focus "main folders" ── */
    this._clickHandler = (e) => {
      const titleEl = e.target.closest('.nav-folder-title');
      if (!titleEl) return;
      const path = titleEl.dataset.path;
      if (!path) return;
      if (!(this.plugin.settings.mainFolders || []).includes(path)) return;
      if (this.plugin.settings.focusedFolder === path) return;
      /* Let Obsidian's own handler expand the folder first */
      setTimeout(() => this.setFocus(path, { collapseChildren: true }), 0);
    };

    /* ── Attach to nav container ── */
    const attach = () => {
      const nav = document.querySelector('.nav-files-container');
      if (nav && !nav.dataset.ffObserved) {
        nav.dataset.ffObserved = '1';
        this._obs.observe(nav, { childList: true, subtree: true });
        nav.addEventListener('click', this._clickHandler, true);
        this._navEl = nav;
        this.applyFocus();
      }
    };

    this.plugin.registerEvent(this.plugin.app.workspace.on('layout-change', attach));
    attach();

    /* ── Ribbon icon: one-click focus on current file's folder ── */
    this._ribbonEl = this.plugin.addRibbonIcon(
      'target', t('ffFocusCurrent'), () => this.focusCurrentFile()
    );
  }

  /* ══════════════════ SCHEDULING ══════════════════ */
  schedule() {
    if (this._rafId != null) return;
    this._rafId = requestAnimationFrame(() => {
      this._rafId = null;
      this.applyFocus();
    });
  }

  /* ══════════════════ SET / CLEAR FOCUS ══════════════════ */
  setFocus(path, opts = {}) {
    /* Validate the folder actually exists in the vault */
    const folder = this.plugin.app.vault.getAbstractFileByPath(path);
    if (!folder || !(folder instanceof TFolder)) {
      new Notice(t('ffErrorNotFound'));
      return;
    }
    this.plugin.settings.focusedFolder = path;
    this.plugin.saveSettings();

    /* Pre-expand the path so children exist in the DOM BEFORE we
       start hiding/showing elements */
    this._expandToPath(path);

    /* Short delay to let Obsidian finish mounting any lazily-rendered
       children, then apply the visual focus */
    setTimeout(() => this.applyFocus({ collapseChildren: opts.collapseChildren }), 60);
  }

  focusCurrentFile() {
    const file = this.plugin.app.workspace.getActiveFile();
    if (!file) { new Notice(t('ffNoFile')); return; }
    const parentPath = file.parent?.path;
    if (!parentPath || parentPath === '/' || parentPath === '') {
      new Notice(t('ffNoFile'));
      return;
    }
    this.setFocus(parentPath, { collapseChildren: true });
  }

  clearFocus() {
    this.plugin.settings.focusedFolder = null;
    this.plugin.saveSettings();
    new Notice(t('ffFocusOff'));
    this.applyFocus();
  }

  /* ══════════════════ DECORATORS ══════════════════ */

  /* Hover-revealed focus icon on every folder title */
  decorateAllFolders(nav) {
    nav.querySelectorAll('.nav-folder-title:not([data-ff-icon])').forEach(titleEl => {
      titleEl.setAttribute('data-ff-icon', '1');
      const path = titleEl.dataset.path;
      if (!path) return;

      const icon = document.createElement('span');
      icon.className = 'ff-quick-icon';
      icon.title = t('ffFocusMenuItem');
      icon.innerHTML = '<svg width="13" height="13" viewBox="0 0 15 15" fill="none" ' +
        'stroke="currentColor" stroke-width="1.4" stroke-linecap="round">' +
        '<circle cx="7.5" cy="7.5" r="5.5"/>' +
        '<circle cx="7.5" cy="7.5" r="1.4" fill="currentColor" stroke="none"/></svg>';
      icon.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const currentPath = titleEl.dataset.path;
        if (this.plugin.settings.focusedFolder === currentPath) this.clearFocus();
        else this.setFocus(currentPath, { collapseChildren: true });
      });
      titleEl.appendChild(icon);
    });
  }

  /* ══════════════════ APPLY FOCUS (CORE LOGIC) ══════════════════ */
  applyFocus(opts = {}) {
    const nav = document.querySelector('.nav-files-container');
    if (!nav) return;
    const focus = this.plugin.settings.focusedFolder;
    const mainFolders = this.plugin.settings.mainFolders || [];

    /* ── Suppress observer while we mutate the DOM ── */
    this._suppressObserver = true;

    /* ── Reset ALL previous focus state ── */
    nav.querySelectorAll('.ff-hidden').forEach(el => el.classList.remove('ff-hidden'));
    nav.querySelectorAll('.ff-self').forEach(el => el.classList.remove('ff-self'));
    nav.querySelectorAll('.ff-ancestor').forEach(el => el.classList.remove('ff-ancestor'));
    nav.querySelectorAll('.ff-main-badge').forEach(el => el.remove());
    document.body.classList.toggle('ff-active', !!focus);
    this.renderBreadcrumb();

    /* ── Decorate main-folder titles with a small dot badge ── */
    mainFolders.forEach(mfPath => {
      const mfTitle = this._findTitleByPath(nav, mfPath);
      if (!mfTitle || mfTitle.querySelector('.ff-main-badge')) return;
      const badge = document.createElement('span');
      badge.className = 'ff-main-badge';
      badge.title = 'Main folder \u2014 click to focus';
      mfTitle.appendChild(badge);
    });

    /* ── Hover-revealed quick-focus icon on every folder ── */
    this.decorateAllFolders(nav);

    /* ── No focus active → done ── */
    if (!focus) { this._suppressObserver = false; return; }

    /* ── Find the focused folder in the DOM (safe path comparison) ── */
    const titleEl = this._findTitleByPath(nav, focus);
    const focusEl = titleEl?.closest('.nav-folder');

    if (!focusEl) {
      /* Folder element not in DOM yet — try expanding, then retry once */
      this._expandToPath(focus);
      setTimeout(() => {
        const retryNav = document.querySelector('.nav-files-container');
        if (!retryNav) { this._suppressObserver = false; return; }
        const retryTitle = this._findTitleByPath(retryNav, focus);
        const retryEl = retryTitle?.closest('.nav-folder');
        if (!retryEl) {
          /* Still not found — clear focus to prevent blank screen */
          this.plugin.settings.focusedFolder = null;
          this.plugin.saveSettings();
          document.body.classList.remove('ff-active');
          this.renderBreadcrumb();
          this._suppressObserver = false;
          new Notice(t('ffErrorNotFound'));
          return;
        }
        this._applyFocusToElement(retryNav, retryEl, retryTitle, focus, opts);
      }, 150);
      return;
    }

    this._applyFocusToElement(nav, focusEl, titleEl, focus, opts);
  }

  /* Internal: applies hide/show logic once we have the DOM element */
  _applyFocusToElement(nav, focusEl, titleEl, focus, opts) {
    focusEl.classList.add('ff-self');

    /* Ensure the folder is expanded via the API */
    this._expandToPath(focus);

    /* Optionally collapse direct sub-folders (one-click "zoom in") */
    if (opts.collapseChildren) {
      this._collapseChildFolders(focus);
    }

    /* ── Walk up from focusEl to nav, marking every ancestor folder.
       This keeps the focused folder visible even when it lives
       inside another main folder. ── */
    const ancestors = new Set();
    let walker = focusEl.parentElement;
    while (walker && walker !== nav) {
      if (walker.classList && walker.classList.contains('nav-folder')) {
        ancestors.add(walker);
      }
      walker = walker.parentElement;
    }
    ancestors.forEach(a => a.classList.add('ff-ancestor'));

    /* ── Hide everything outside the focus path ── */
    nav.querySelectorAll('.nav-folder, .nav-file').forEach(el => {
      if (el === focusEl || focusEl.contains(el) || ancestors.has(el)) return;
      el.classList.add('ff-hidden');
    });

    /* ── Safety net: if children container is empty (lazy-render edge
       case), keep the folder title visible so the screen is never
       blank.  Re-check after 200ms in case Obsidian was still
       mounting children asynchronously. ── */
    const childrenEl = focusEl.querySelector('.nav-folder-children');
    if (!childrenEl || childrenEl.children.length === 0) {
      /* Keep title visible for now (remove ff-self) */
      focusEl.classList.remove('ff-self');
      setTimeout(() => {
        const recheck = focusEl.querySelector('.nav-folder-children');
        if (recheck && recheck.children.length > 0) {
          /* Children appeared — safe to hide the title now */
          focusEl.classList.add('ff-self');
        }
        this._suppressObserver = false;
      }, 250);
    } else {
      this._suppressObserver = false;
    }
  }

  /* ══════════════════ BREADCRUMB / TAB BAR ══════════════════ */
  renderBreadcrumb() {
    const nav = document.querySelector('.nav-files-container');
    if (!nav || !nav.parentElement) return;
    const parent = nav.parentElement;
    const focus = this.plugin.settings.focusedFolder;
    const mainFolders = this.plugin.settings.mainFolders || [];

    const shouldShow = mainFolders.length > 0 || !!focus;
    if (!shouldShow) {
      if (this.breadcrumbEl) { this.breadcrumbEl.remove(); this.breadcrumbEl = null; }
      return;
    }

    if (!this.breadcrumbEl || !this.breadcrumbEl.isConnected) {
      this.breadcrumbEl = document.createElement('div');
      this.breadcrumbEl.className = 'ff-breadcrumb';
      parent.insertBefore(this.breadcrumbEl, nav);
    }
    this.breadcrumbEl.innerHTML = '';

    /* ── Home button (always present, always clickable) ── */
    const home = document.createElement('button');
    home.className = 'ff-home-btn' + (focus ? '' : ' ff-home-active');
    home.textContent = focus ? ('\u2190 ' + t('ffBack')) : ('\uD83C\uDFE0 ' + t('ffBack'));
    home.title = t('ffBack');
    home.addEventListener('click', () => {
      this.clearFocus();
      if (this.plugin.fullscreenMgr && this.plugin.fullscreenMgr.exitZen) {
        this.plugin.fullscreenMgr.exitZen();
      }
    });
    this.breadcrumbEl.appendChild(home);

    /* ── Main-folder tabs ── */
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

    /* ── Hierarchical breadcrumb path (clickable segments) ── */
    if (focus) {
      const parts = focus.split('/');
      if (!mainFolders.includes(focus) || parts.length > 1) {
        const pathCrumbs = document.createElement('div');
        pathCrumbs.className = 'ff-path-crumbs';

        let cumulative = '';
        parts.forEach((part, i) => {
          if (i > 0) {
            const sep = document.createElement('span');
            sep.className = 'ff-path-sep';
            sep.textContent = ' \u203A ';
            pathCrumbs.appendChild(sep);
          }
          cumulative = cumulative ? cumulative + '/' + part : part;
          const segPath = cumulative;
          const seg = document.createElement('button');
          seg.className = 'ff-path-seg';
          if (i === parts.length - 1) seg.classList.add('ff-path-seg-current');
          seg.textContent = part;
          seg.title = segPath;
          if (i < parts.length - 1) {
            seg.addEventListener('click', () => this.setFocus(segPath, { collapseChildren: true }));
          }
          pathCrumbs.appendChild(seg);
        });
        this.breadcrumbEl.appendChild(pathCrumbs);
      }

      /* ── "+ New note" button ── */
      const newBtn = document.createElement('button');
      newBtn.className = 'ff-new-note-btn';
      newBtn.textContent = t('ffNewNote');
      newBtn.title = t('ffNewNote');
      newBtn.addEventListener('click', async () => {
        try {
          const folder = this.plugin.app.vault.getAbstractFileByPath(focus);
          if (!folder) return;
          let name = 'Untitled';
          let num = 1;
          while (this.plugin.app.vault.getAbstractFileByPath(focus + '/' + name + '.md')) {
            name = 'Untitled ' + num++;
          }
          const f = await this.plugin.app.vault.create(focus + '/' + name + '.md', '');
          await this.plugin.app.workspace.getLeaf(false).openFile(f);
        } catch (e) { console.warn('Focus Mode: new note failed', e); }
      });
      this.breadcrumbEl.appendChild(newBtn);
    }
  }

  /* ══════════════════ DESTROY ══════════════════ */
  destroy() {
    if (this._obs) this._obs.disconnect();
    if (this._rafId != null) { cancelAnimationFrame(this._rafId); this._rafId = null; }
    if (this._navEl && this._clickHandler) {
      this._navEl.removeEventListener('click', this._clickHandler, true);
    }
    document.body.classList.remove('ff-active');
    document.querySelectorAll('.ff-hidden,.ff-self,.ff-ancestor').forEach(el =>
      el.classList.remove('ff-hidden', 'ff-self', 'ff-ancestor'));
    document.querySelectorAll('.ff-main-badge').forEach(el => el.remove());
    document.querySelectorAll('.ff-quick-icon').forEach(el => el.remove());
    document.querySelectorAll('[data-ff-icon]').forEach(el => el.removeAttribute('data-ff-icon'));
    if (this.breadcrumbEl) { this.breadcrumbEl.remove(); this.breadcrumbEl = null; }
    if (this._ribbonEl) { this._ribbonEl.remove(); this._ribbonEl = null; }
    const navEl = document.querySelector('.nav-files-container');
    if (navEl) delete navEl.dataset.ffObserved;
  }
}

/* ══════════════════════════════════════════════
   FOLDER COLOR & ICON MODAL
══════════════════════════════════════════════ */
const FOLDER_COLOR_PALETTE = [
  { name: 'Purple',  hex: '#8b5cf6' },
  { name: 'Blue',    hex: '#3b82f6' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Amber',   hex: '#f59e0b' },
  { name: 'Rose',    hex: '#f43f5e' },
  { name: 'Cyan',    hex: '#06b6d4' },
  { name: 'Orange',  hex: '#f97316' },
  { name: 'Default', hex: '' }
];

const FOLDER_ICON_PRESETS = [
  '📚', '🔬', '💡', '📂', '📝', '⚡', '🎯', '⭐', '🔒', '⚙️', ''
];

class FolderColorModal extends Modal {
  constructor(app, plugin, folderPath) {
    super(app);
    this.plugin = plugin;
    this.folderPath = folderPath;
    const current = (plugin.settings.folderStyles || {})[folderPath] || {};
    this.selectedColor = current.color || '';
    this.selectedIcon = current.icon || '';
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('fc-modal-container');

    const header = contentEl.createEl('div', { cls: 'fc-modal-header' });
    header.createEl('span', { text: '🎨', cls: 'fc-modal-icon' });
    header.createEl('h3', { text: t('fcModalTitle') || 'Folder Color & Icon' });

    contentEl.createEl('div', { cls: 'fc-folder-badge', text: this.folderPath });

    // Live Preview
    const previewWrap = contentEl.createEl('div', { cls: 'fc-preview-wrap' });
    previewWrap.createEl('span', { text: t('fcPreview') || 'Preview:' });
    this.previewEl = previewWrap.createEl('div', { cls: 'fc-preview-item' });
    this.updatePreview();

    // Color Swatches
    contentEl.createEl('div', { cls: 'fc-section-title', text: t('fcColorTitle') || 'Color' });
    const colorRow = contentEl.createEl('div', { cls: 'fc-color-row' });
    FOLDER_COLOR_PALETTE.forEach(c => {
      const swatch = colorRow.createEl('button', {
        type: 'button',
        cls: 'fc-swatch' + (this.selectedColor === c.hex ? ' is-selected' : '')
      });
      if (c.hex) {
        swatch.style.backgroundColor = c.hex;
      } else {
        swatch.addClass('fc-swatch-default');
        swatch.textContent = '✕';
      }
      swatch.title = c.name;
      swatch.addEventListener('click', () => {
        this.selectedColor = c.hex;
        colorRow.querySelectorAll('.fc-swatch').forEach(s => s.classList.remove('is-selected'));
        swatch.classList.add('is-selected');
        this.updatePreview();
      });
    });

    // Icon Picker
    contentEl.createEl('div', { cls: 'fc-section-title', text: t('fcIconTitle') || 'Icon' });
    const iconGrid = contentEl.createEl('div', { cls: 'fc-icon-grid' });
    FOLDER_ICON_PRESETS.forEach(ic => {
      const btn = iconGrid.createEl('button', {
        type: 'button',
        cls: 'fc-icon-btn' + (this.selectedIcon === ic ? ' is-selected' : ''),
        text: ic || '✕'
      });
      btn.title = ic || 'No icon';
      btn.addEventListener('click', () => {
        this.selectedIcon = ic;
        iconGrid.querySelectorAll('.fc-icon-btn').forEach(b => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        this.updatePreview();
      });
    });

    // Action Buttons
    const btnRow = contentEl.createEl('div', { cls: 'fc-btn-row' });

    const resetBtn = btnRow.createEl('button', {
      type: 'button',
      cls: 'fc-btn fc-btn-reset',
      text: t('fcResetBtn') || 'Reset Default'
    });
    resetBtn.addEventListener('click', async () => {
      if (this.plugin.settings.folderStyles) {
        delete this.plugin.settings.folderStyles[this.folderPath];
        await this.plugin.saveSettings();
      }
      this.plugin.applyFolderStyles();
      new Notice((t('fcResetNotice') || 'Reset style for: ') + this.folderPath);
      this.close();
    });

    const saveBtn = btnRow.createEl('button', {
      type: 'button',
      cls: 'mod-cta fc-btn',
      text: t('fcSaveBtn') || 'Save'
    });
    saveBtn.addEventListener('click', async () => {
      const map = this.plugin.settings.folderStyles || (this.plugin.settings.folderStyles = {});
      if (!this.selectedColor && !this.selectedIcon) {
        delete map[this.folderPath];
      } else {
        map[this.folderPath] = { color: this.selectedColor, icon: this.selectedIcon };
      }
      await this.plugin.saveSettings();
      this.plugin.applyFolderStyles();
      new Notice((t('fcSavedNotice') || 'Style saved for: ') + this.folderPath);
      this.close();
    });
  }

  updatePreview() {
    this.previewEl.empty();
    const iconSpan = this.previewEl.createSpan({ cls: 'fc-preview-icon' });
    iconSpan.textContent = this.selectedIcon || '📁';
    if (this.selectedColor) {
      iconSpan.style.color = this.selectedColor;
    }
    const nameSpan = this.previewEl.createSpan({ cls: 'fc-preview-text' });
    nameSpan.textContent = this.folderPath.split('/').pop() || this.folderPath;
    if (this.selectedColor) {
      nameSpan.style.color = this.selectedColor;
    }
  }

  onClose() {
    this.contentEl.empty();
  }
}

/* ══════════════════════════════════════════════
   FOLDER VAULT & PRIVACY LOCK
══════════════════════════════════════════════ */
class VaultCrypto {
  static generateSalt() {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return this.bufferToBase64(array.buffer);
  }
  static async hashPassword(password, saltBase64, iterations = 100000) {
    const enc = new TextEncoder();
    const passwordBuffer = enc.encode(password);
    const saltBuffer = this.base64ToBuffer(saltBase64);
    const baseKey = await window.crypto.subtle.importKey(
      'raw', passwordBuffer, { name: 'PBKDF2' }, false, ['deriveBits']
    );
    const derivedBits = await window.crypto.subtle.deriveBits(
      { name: 'PBKDF2', salt: saltBuffer, iterations, hash: 'SHA-256' },
      baseKey, 256
    );
    return this.bufferToBase64(derivedBits);
  }
  static async verifyPassword(password, salt, expectedHash, iterations = 100000) {
    try {
      const actualHash = await this.hashPassword(password, salt, iterations);
      return actualHash === expectedHash;
    } catch (e) {
      console.error('VaultCrypto verification error:', e);
      return false;
    }
  }
  static bufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return window.btoa(binary);
  }
  static base64ToBuffer(base64) {
    const binary = window.atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes.buffer;
  }
}

class UnlockFolderModal extends Modal {
  constructor(app, folderPath, config, onSuccess) {
    super(app);
    this.folderPath = folderPath;
    this.config = config;
    this.onSuccess = onSuccess;
    this.isSubmitting = false;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('fv-modal-clean');

    const header = contentEl.createEl('div', { cls: 'fv-clean-header' });
    header.createEl('span', { cls: 'fv-clean-icon', text: '🔒' });
    header.createEl('h3', { cls: 'fv-clean-title', text: t('fvModalTitle') });

    const badge = contentEl.createEl('div', { cls: 'fv-clean-folder' });
    badge.createEl('span', { text: this.folderPath });

    const form = contentEl.createEl('form', { cls: 'fv-clean-form' });
    this.inputEl = form.createEl('input', {
      type: 'password',
      cls: 'fv-clean-input',
      placeholder: t('fvInputPlaceholder') || 'PIN or password…'
    });

    // Enter key handler
    this.inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        this.attemptUnlock();
      }
    });

    const btnRow = form.createEl('div', { cls: 'fv-clean-btn-row' });
    const cancelBtn = btnRow.createEl('button', {
      type: 'button',
      cls: 'fv-clean-btn fv-clean-btn-cancel',
      text: t('btnCancel') || 'Cancel'
    });
    cancelBtn.addEventListener('click', () => this.close());

    const submitBtn = btnRow.createEl('button', {
      type: 'submit',
      cls: 'mod-cta fv-clean-btn',
      text: t('fvUnlockBtn') || 'Unlock'
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.attemptUnlock();
    });

    setTimeout(() => {
      this.inputEl.focus();
      this.inputEl.select();
    }, 50);
  }

  async attemptUnlock() {
    if (this.isSubmitting) return;
    const entered = this.inputEl.value;
    if (!entered) return;

    this.isSubmitting = true;
    try {
      const isValid = await VaultCrypto.verifyPassword(
        entered,
        this.config.salt,
        this.config.hash,
        this.config.iterations || 100000
      );

      if (isValid) {
        new Notice(t('fvUnlockedNotice') + this.folderPath);
        this.close();
        if (this.onSuccess) this.onSuccess();
      } else {
        this.inputEl.value = '';
        this.contentEl.addClass('vault-shake');
        setTimeout(() => this.contentEl.removeClass('vault-shake'), 500);
        new Notice(t('fvWrongPin'));
        this.inputEl.focus();
      }
    } finally {
      this.isSubmitting = false;
    }
  }

  onClose() {
    this.contentEl.empty();
  }
}
class SetFolderPinModal extends Modal {
  constructor(app, folderPath, onSave) {
    super(app);
    this.folderPath = folderPath;
    this.onSave = onSave;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('fv-modal-clean');

    const header = contentEl.createEl('div', { cls: 'fv-clean-header' });
    header.createEl('span', { cls: 'fv-clean-icon', text: '🔐' });
    header.createEl('h3', { cls: 'fv-clean-title', text: t('fvSetupTitle') });

    const badge = contentEl.createEl('div', { cls: 'fv-clean-folder' });
    badge.createEl('span', { text: this.folderPath });

    const form = contentEl.createEl('form', { cls: 'fv-clean-form' });
    const pinInput = form.createEl('input', {
      type: 'password',
      cls: 'fv-clean-input',
      placeholder: t('fvSetupDesc') || 'New PIN or password…'
    });

    const confirmInput = form.createEl('input', {
      type: 'password',
      cls: 'fv-clean-input',
      placeholder: t('fvConfirmPin') || 'Confirm PIN or password…'
    });

    const btnRow = form.createEl('div', { cls: 'fv-clean-btn-row' });
    const cancelBtn = btnRow.createEl('button', {
      type: 'button',
      cls: 'fv-clean-btn fv-clean-btn-cancel',
      text: t('btnCancel') || 'Cancel'
    });
    cancelBtn.addEventListener('click', () => this.close());

    btnRow.createEl('button', {
      type: 'submit',
      cls: 'mod-cta fv-clean-btn',
      text: t('fvSaveBtn') || 'Lock Folder'
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const pin = pinInput.value;
      const confirm = confirmInput.value;

      if (!pin || pin.length < 4) {
        new Notice(t('fvPinMinLength'));
        return;
      }
      if (pin !== confirm) {
        new Notice(t('fvPinMismatch'));
        confirmInput.value = '';
        confirmInput.focus();
        return;
      }

      const salt = VaultCrypto.generateSalt();
      const hash = await VaultCrypto.hashPassword(pin, salt);

      this.onSave({
        path: this.folderPath,
        salt,
        hash,
        iterations: 100000
      });

      new Notice(t('fvSavedNotice') + this.folderPath);
      this.close();
    });

    setTimeout(() => pinInput.focus(), 50);
  }

  onClose() {
    this.contentEl.empty();
  }
}

class FolderVaultManager {
  constructor(plugin) {
    this.plugin = plugin;
    this.app = plugin.app;
    this.unlockedFolders = new Set();
    this._inactivityTimer = null;
    this._vaultPatched = false;
    this._boundActivity = null;
    this._boundBlur = null;
    this._boundFileOpen = null;
    this._boundFileMenu = null;
    this._obs = null;
    this._suppressTreeObserver = false;
    this._rafDecorate = null;
    this._isHandlingOpen = false;
  }

  register() {
    if (this.plugin.settings.vaultLockOnStartup) {
      this.unlockedFolders.clear();
    }

    this.patchVault();

    this._boundFileOpen = (file) => {
      if (file) this.interceptFileOpen(file);
    };
    this.plugin.registerEvent(this.app.workspace.on('file-open', this._boundFileOpen));

    this._boundFileMenu = (menu, file) => {
      if (file instanceof TFolder) this.onFolderMenu(menu, file);
    };
    this.plugin.registerEvent(this.app.workspace.on('file-menu', this._boundFileMenu));

    this.setupActivityWatch();

    this.app.workspace.onLayoutReady(() => {
      this.setupTreeObserver();
      this.decorateTree();
    });
  }

  patchVault() {
    const vault = this.app.vault;
    if (!vault || this._vaultPatched) return;
    this._origGetFiles = vault.getFiles.bind(vault);
    this._origGetMarkdownFiles = vault.getMarkdownFiles.bind(vault);
    this._vaultPatched = true;

    vault.getFiles = () => {
      const files = this._origGetFiles();
      if (!this.plugin.settings.enableFolderVault) return files;
      return files.filter(f => !this.isPathLocked(f.path));
    };

    vault.getMarkdownFiles = () => {
      const mdFiles = this._origGetMarkdownFiles();
      if (!this.plugin.settings.enableFolderVault) return mdFiles;
      return mdFiles.filter(f => !this.isPathLocked(f.path));
    };
  }

  unpatchVault() {
    if (!this._vaultPatched) return;
    const vault = this.app.vault;
    if (this._origGetFiles) vault.getFiles = this._origGetFiles;
    if (this._origGetMarkdownFiles) vault.getMarkdownFiles = this._origGetMarkdownFiles;
    this._vaultPatched = false;
  }

  isPathLocked(itemPath) {
    const lockedFolders = this.plugin.settings.lockedFolders || {};
    for (const folderPath in lockedFolders) {
      if (itemPath === folderPath || itemPath.startsWith(folderPath + '/')) {
        if (!this.unlockedFolders.has(folderPath)) {
          return folderPath;
        }
      }
    }
    return null;
  }

  interceptFileOpen(file) {
    if (!this.plugin.settings.enableFolderVault) return;
    if (this._isHandlingOpen) return;
    const lockedFolder = this.isPathLocked(file.path);
    if (lockedFolder) {
      this._isHandlingOpen = true;
      this.closeLockedLeaves();
      this.requestUnlock(lockedFolder, () => {
        this.app.workspace.openLinkText(file.path, '', false);
      });
      setTimeout(() => { this._isHandlingOpen = false; }, 300);
    }
  }

  closeLockedLeaves() {
    this.app.workspace.iterateAllLeaves((leaf) => {
      const viewState = leaf.getViewState();
      const filePath = viewState?.state?.file;
      if (filePath && this.isPathLocked(filePath)) {
        leaf.detach();
      }
    });
  }

  expandFolder(folderPath) {
    // Expand via Obsidian Explorer API
    const leaves = this.app.workspace.getLeavesOfType('file-explorer');
    if (leaves.length > 0 && leaves[0].view && leaves[0].view.fileItems) {
      const parts = folderPath.split('/');
      let cur = '';
      for (const part of parts) {
        cur = cur ? cur + '/' + part : part;
        const item = leaves[0].view.fileItems[cur];
        if (item && typeof item.setCollapsed === 'function') {
          try { item.setCollapsed(false); } catch (e) {}
        }
      }
    }

    // Also remove is-collapsed in DOM
    const nav = document.querySelector('.nav-files-container');
    if (nav) {
      nav.querySelectorAll('.nav-folder-title').forEach(t => {
        if (t.dataset.path === folderPath) {
          const f = t.closest('.nav-folder');
          if (f) {
            f.classList.remove('is-collapsed');
            const indicator = t.querySelector('.nav-folder-collapse-indicator') || t;
            indicator.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
          }
        }
      });
    }
  }

  onFolderMenu(menu, folder) {
    if (!this.plugin.settings.enableFolderVault) return;
    const path = folder.path;
    const isConfigured = Boolean(this.plugin.settings.lockedFolders?.[path]);

    if (!isConfigured) {
      menu.addItem((item) => {
        item.setTitle(t('fvLockMenu'))
          .setIcon('lock')
          .onClick(() => this.openSetPinModal(path));
      });
    } else {
      const isUnlocked = this.unlockedFolders.has(path);
      // Toggle Lock / Unlock
      menu.addItem((item) => {
        item.setTitle(isUnlocked ? t('fvLockNowMenu') : t('fvUnlockMenu'))
          .setIcon(isUnlocked ? 'lock' : 'unlock')
          .onClick(() => {
            if (isUnlocked) {
              this.lockFolder(path);
            } else {
              this.requestUnlock(path, () => this.expandFolder(path));
            }
          });
      });

      // Remove Protection Permanently
      menu.addItem((item) => {
        item.setTitle(t('fvRemoveMenu'))
          .setIcon('trash')
          .onClick(async () => {
            delete this.plugin.settings.lockedFolders[path];
            this.unlockedFolders.delete(path);
            await this.plugin.saveSettings();
            this.decorateTree();
            new Notice(t('fvRemovedNotice') + path);
          });
      });
    }
  }

  panicLock() {
    this.lockAll(true);
    this.closeLockedLeaves();
    new Notice(t('fvPanicNotice'));
  }

  openSetPinModal(folderPath) {
    new SetFolderPinModal(this.app, folderPath, async (config) => {
      const map = this.plugin.settings.lockedFolders || (this.plugin.settings.lockedFolders = {});
      map[folderPath] = config;
      this.unlockedFolders.delete(folderPath);
      await this.plugin.saveSettings();
      this.closeLockedLeaves();
      this.decorateTree();
    }).open();
  }

  requestUnlock(folderPath, onSuccess) {
    const config = this.plugin.settings.lockedFolders?.[folderPath];
    if (!config) return;

    new UnlockFolderModal(this.app, folderPath, config, () => {
      this.unlockedFolders.add(folderPath);
      this.decorateTree();
      this.resetInactivityTimer();
      // Auto-expand folder on successful unlock!
      this.expandFolder(folderPath);
      if (onSuccess) onSuccess();
    }).open();
  }

  lockFolder(folderPath) {
    this.unlockedFolders.delete(folderPath);
    this.closeLockedLeaves();
    this.decorateTree();
    new Notice(t('fvLockedNotice') + folderPath);
  }

  lockAll(silent = false) {
    this.unlockedFolders.clear();
    this.closeLockedLeaves();
    this.decorateTree();
    if (!silent) new Notice(t('fvLockAllCmd'));
  }

  setupActivityWatch() {
    let lastTime = Date.now();
    this._boundActivity = () => {
      const now = Date.now();
      if (now - lastTime > 10000) {
        lastTime = now;
        this.resetInactivityTimer();
      }
    };
    window.addEventListener('mousemove', this._boundActivity);
    window.addEventListener('keydown', this._boundActivity);

    this._boundBlur = () => {
      if (this.plugin.settings.vaultLockOnBlur && this.unlockedFolders.size > 0) {
        this.lockAll(true);
        new Notice(t('fvBlurNotice'));
      }
    };
    window.addEventListener('blur', this._boundBlur);

    this.resetInactivityTimer();
  }

  resetInactivityTimer() {
    if (this._inactivityTimer != null) {
      clearTimeout(this._inactivityTimer);
      this._inactivityTimer = null;
    }
    const timeout = this.plugin.settings.vaultAutoLockTimeout || 0;
    if (timeout <= 0 || this.unlockedFolders.size === 0) return;

    this._inactivityTimer = setTimeout(() => {
      if (this.unlockedFolders.size > 0) {
        this.lockAll(true);
        new Notice(t('fvAutoLockNotice'));
      }
    }, timeout * 60 * 1000);
  }

  setupTreeObserver() {
    const nav = document.querySelector('.nav-files-container');
    if (!nav || nav.dataset.fvObserved) return;
    nav.dataset.fvObserved = '1';

    this._obs = new MutationObserver(() => {
      if (this._suppressTreeObserver) return;
      this.scheduleDecorate();
    });
    this._obs.observe(nav, { childList: true, subtree: true });
  }

  scheduleDecorate() {
    if (this._rafDecorate != null) return;
    this._rafDecorate = requestAnimationFrame(() => {
      this._rafDecorate = null;
      this.decorateTree();
    });
  }

  decorateTree() {
    const nav = document.querySelector('.nav-files-container');
    if (!nav) return;
    this._suppressTreeObserver = true;

    try {
      const lockedFolders = this.plugin.settings.lockedFolders || {};

      nav.querySelectorAll('.nav-folder-title').forEach(titleEl => {
        const path = titleEl.dataset.path;
        if (!path) return;
        const isConfigured = Boolean(lockedFolders[path]);
        const folderEl = titleEl.closest('.nav-folder');

        if (isConfigured && this.plugin.settings.enableFolderVault) {
          const isUnlocked = this.unlockedFolders.has(path);
          if (this.plugin.settings.vaultHideInTree && !isUnlocked) {
            if (folderEl) folderEl.classList.add('fv-folder-hidden');
            const existingBadge = titleEl.querySelector('.fv-lock-badge');
            if (existingBadge) existingBadge.remove();
            return;
          } else {
            if (folderEl) folderEl.classList.remove('fv-folder-hidden');
          }

          let badge = titleEl.querySelector('.fv-lock-badge');
          const expectedClass = isUnlocked ? 'fv-unlocked' : 'fv-locked';
          const expectedTitle = isUnlocked ? (t('fvUnlockedStatus') + ' (اضغط للقفل)') : (t('fvLockedStatus') + ' (اضغط للفتح)');
          const expectedSvg = isUnlocked
            ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>'
            : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';

          if (!badge) {
            badge = document.createElement('span');
            badge.className = 'fv-lock-badge ' + expectedClass;
            badge.title = expectedTitle;
            badge.innerHTML = expectedSvg;
            badge.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              const p = titleEl.dataset.path;
              if (!p) return;
              if (this.unlockedFolders.has(p)) {
                this.lockFolder(p);
              } else {
                this.requestUnlock(p, () => this.expandFolder(p));
              }
            });
            titleEl.appendChild(badge);
          } else if (!badge.classList.contains(expectedClass)) {
            badge.className = 'fv-lock-badge ' + expectedClass;
            badge.title = expectedTitle;
            badge.innerHTML = expectedSvg;
          }

          if (!titleEl.dataset.fvHooked) {
            titleEl.dataset.fvHooked = '1';
            titleEl.addEventListener('click', (e) => {
              const p = titleEl.dataset.path;
              if (this.plugin.settings.lockedFolders?.[p] && !this.unlockedFolders.has(p)) {
                e.preventDefault();
                e.stopPropagation();
                this.requestUnlock(p, () => {
                  this.expandFolder(p);
                });
              }
            }, true);
          }
        } else {
          if (folderEl) folderEl.classList.remove('fv-folder-hidden');
          const existingBadge = titleEl.querySelector('.fv-lock-badge');
          if (existingBadge) existingBadge.remove();
        }
      });
    } finally {
      setTimeout(() => { this._suppressTreeObserver = false; }, 60);
    }
  }

  destroy() {
    this.unpatchVault();
    this._obs?.disconnect();
    if (this._inactivityTimer != null) {
      clearTimeout(this._inactivityTimer);
      this._inactivityTimer = null;
    }
    if (this._boundActivity) {
      window.removeEventListener('mousemove', this._boundActivity);
      window.removeEventListener('keydown', this._boundActivity);
    }
    if (this._boundBlur) {
      window.removeEventListener('blur', this._boundBlur);
    }
    document.querySelectorAll('.fv-lock-badge').forEach(b => b.remove());
    document.querySelectorAll('.fv-folder-hidden').forEach(f => f.classList.remove('fv-folder-hidden'));
    delete document.querySelector('.nav-files-container')?.dataset.fvObserved;
  }
}
class ToolkitSettingsTab extends PluginSettingTab {
  constructor(app, plugin) { super(app, plugin); this.plugin=plugin; }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    const headerWrap = containerEl.createEl('div', { cls: 'tk-settings-header' });
    headerWrap.innerHTML = `<svg class="tk-brand-logo" width="32" height="32" viewBox="0 0 100 100" fill="none">
      
    <defs>
      <!-- Crystal Facets Gradients -->
      <linearGradient id="crTL" x1="50" y1="16" x2="22" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#C084FC" />
        <stop offset="100%" stop-color="#9333EA" />
      </linearGradient>
      <linearGradient id="crTR" x1="50" y1="16" x2="78" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#D8B4FE" />
        <stop offset="100%" stop-color="#A855F7" />
      </linearGradient>
      <linearGradient id="crBL" x1="22" y1="50" x2="50" y2="84" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#7C3AED" />
        <stop offset="100%" stop-color="#4F46E5" />
      </linearGradient>
      <linearGradient id="crBR" x1="78" y1="50" x2="50" y2="84" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#6366F1" />
        <stop offset="100%" stop-color="#3730A3" />
      </linearGradient>

      <!-- Pen Gradient (Vibrant Gold) -->
      <linearGradient id="penGrad" x1="0" y1="-36" x2="0" y2="38" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#FEF08A" />
        <stop offset="30%" stop-color="#FACC15" />
        <stop offset="100%" stop-color="#EAB308" />
      </linearGradient>

      <!-- Wrench Gradient (Chrome Silver / Pure White) -->
      <linearGradient id="wrenchGrad" x1="0" y1="-35" x2="0" y2="38" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="60%" stop-color="#F1F5F9" />
        <stop offset="100%" stop-color="#CBD5E1" />
      </linearGradient>

      <!-- Dark Squircle Background (Design 1) -->
      <linearGradient id="darkBgGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#1A182F" />
        <stop offset="100%" stop-color="#0E0D1B" />
      </linearGradient>

      <!-- Vibrant Royal Gradient Background (Design 2, matching Image 2) -->
      <linearGradient id="vibrantBgGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#8B5CF6" />
        <stop offset="50%" stop-color="#6366F1" />
        <stop offset="100%" stop-color="#3B82F6" />
      </linearGradient>

      <!-- Neon Cyan Glow Background (Design 3) -->
      <linearGradient id="neonBgGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#1E1B4B" />
        <stop offset="100%" stop-color="#0F172A" />
      </linearGradient>

      <!-- Drop Shadows & Glow Filters -->
      <filter id="toolShadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.55" />
      </filter>
      <filter id="sparkleGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="crystalGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#8B5CF6" flood-opacity="0.4" />
      </filter>
    </defs>
  
      <!-- Squircle Container -->
      <rect width="100" height="100" rx="26" fill="url(#darkBgGrad)" stroke="#312B4F" stroke-width="1.5" />
      <!-- Background Ambient Glow -->
      <circle cx="50" cy="50" r="32" fill="#7C3AED" opacity="0.22" filter="url(#sparkleGlow)" />
      <!-- Obsidian Crystal Gem -->
      
    <g opacity="0.92" filter="url(#crystalGlow)">
      <!-- Top Left Facet -->
      <polygon points="50,15 23,49 50,52" fill="url(#crTL)" />
      <!-- Top Right Facet -->
      <polygon points="50,15 77,49 50,52" fill="url(#crTR)" />
      <!-- Bottom Left Facet -->
      <polygon points="23,49 50,85 50,52" fill="url(#crBL)" />
      <!-- Bottom Right Facet -->
      <polygon points="77,49 50,85 50,52" fill="url(#crBR)" />
      <!-- Polished Facet Edge Bevels -->
      <line x1="50" y1="15" x2="23" y2="49" stroke="rgba(255,255,255,0.45)" stroke-width="0.8" />
      <line x1="50" y1="15" x2="77" y2="49" stroke="rgba(255,255,255,0.65)" stroke-width="0.8" />
      <line x1="23" y1="49" x2="50" y2="85" stroke="rgba(255,255,255,0.2)" stroke-width="0.8" />
      <line x1="77" y1="49" x2="50" y2="85" stroke="rgba(255,255,255,0.3)" stroke-width="0.8" />
      <line x1="23" y1="49" x2="77" y2="49" stroke="rgba(255,255,255,0.25)" stroke-width="0.7" />
      <line x1="50" y1="15" x2="50" y2="85" stroke="rgba(255,255,255,0.35)" stroke-width="0.7" />
    </g>
  
      <!-- Crossed Tools Floating Over Crystal -->
      
    <g filter="url(#toolShadow)">
      <!-- WRENCH (White/Chrome Silver, Top-Right) -->
      <g transform="translate(50, 50) rotate(45)">
        <path d="
          M -3.6, 32
          A 3.6 3.6 0 0 0 3.6, 32
          L 3.6, -15
          C 7.5, -17 9.5, -20.5 9.5, -25
          C 9.5, -31 5, -35.5 -0.5, -35.5
          C -6, -35.5 -10.5, -31 -10.5, -25
          C -10.5, -20.5 -8.5, -17 -4.6, -15
          L -3.6, -15
          Z
        " fill="url(#wrenchGrad)" stroke="#CBD5E1" stroke-width="0.7"/>
        <!-- Wrench Hex Jaw Opening -->
        <path d="
          M -4.8, -35.6
          L 3.2, -35.6
          L 5.2, -26.5
          L 0, -21.5
          L -5.2, -26.5
          Z
        " fill="#151324"/>
        <!-- Hanging Hole -->
        <circle cx="0" cy="28.5" r="1.6" fill="#151324" opacity="0.85"/>
        <!-- Chrome Glint Line -->
        <line x1="0" y1="-13" x2="0" y2="23" stroke="rgba(255,255,255,0.8)" stroke-width="0.8" stroke-linecap="round"/>
      </g>

      <!-- PEN (Luminous Gold, Top-Left) -->
      <g transform="translate(50, 50) rotate(-45)">
        <path d="
          M -3.8, 32
          A 3.8 3.8 0 0 0 3.8, 32
          L 3.8, -15
          L 5.8, -23.5
          L 0, -35.5
          L -5.8, -23.5
          L -3.8, -15
          Z
        " fill="url(#penGrad)" stroke="#D97706" stroke-width="0.7"/>
        <!-- Nib Collar Ring -->
        <rect x="-4.2" y="-17" width="8.4" height="2" rx="1" fill="#FEF08A"/>
        <!-- Slit & Breather Hole -->
        <line x1="0" y1="-34.5" x2="0" y2="-23" stroke="#78350F" stroke-width="0.9" stroke-linecap="round"/>
        <circle cx="0" cy="-23" r="1.2" fill="#78350F"/>
        <!-- Gold Glint Highlight -->
        <line x1="-1.2" y1="-13" x2="-1.2" y2="28" stroke="rgba(255,255,255,0.7)" stroke-width="0.9" stroke-linecap="round"/>
      </g>

      <!-- Central Luminous Sparkle Star (The Fusion Node) -->
      <circle cx="50" cy="50" r="4.2" fill="#FFFFFF" filter="url(#sparkleGlow)"/>
      <circle cx="50" cy="50" r="2.4" fill="#FFFFFF"/>
      <polygon points="50,42.5 51.5,48.5 57.5,50 51.5,51.5 50,57.5 48.5,51.5 42.5,50 48.5,48.5" fill="#FFFFFF"/>
    </g>
  
    </svg>`;
    headerWrap.createEl('h2', { text:t('settingsTitle'), cls: 'tk-brand-title' });

    /* ── Language Switcher (Primary English, Arabic Option) ── */
    new Setting(containerEl)
      .setName(this.plugin.settings.enableArabicUi ? '🌐 الواجهة العربية' : '🌐 Arabic Interface')
      .setDesc(this.plugin.settings.enableArabicUi
        ? 'تحويل لغة واجهة الإضافة ورسائلها إلى اللغة العربية (الافتراضي: الإنجليزية).'
        : 'Enable Arabic translations for the plugin interface and notices (Default: English).')
      .addToggle(tog => tog
        .setValue(this.plugin.settings.enableArabicUi || false)
        .onChange(async (val) => {
          this.plugin.settings.enableArabicUi = val;
          await this.plugin.saveSettings();
          this.display();
        }));

    new Setting(containerEl).setName(t('slashName')).setDesc(t('slashDesc'))
      .addToggle(tog=>tog.setValue(this.plugin.settings.enableSlashCommands).onChange(async val=>{
        this.plugin.settings.enableSlashCommands = val;
        await this.plugin.saveSettings();
      }));

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

    containerEl.createEl('hr');

    /* ── Folder Vault & Privacy Lock Settings ── */
    new Setting(containerEl).setName(t('fvName')).setDesc(t('fvDesc'))
      .addToggle(tog=>tog.setValue(this.plugin.settings.enableFolderVault).onChange(async val=>{
        this.plugin.settings.enableFolderVault = val;
        await this.plugin.saveSettings();
        if (val) {
          this.plugin.folderVaultMgr.register();
        } else {
          this.plugin.folderVaultMgr.destroy();
        }
        new Notice(val ? t('fvOn') : t('fvOff'));
        this.display();
      }));

    if (this.plugin.settings.enableFolderVault) {
      new Setting(containerEl).setName(t('fvAutoLockName')).setDesc(t('fvAutoLockDesc'))
        .addSlider(sl=>sl.setLimits(0, 60, 5).setValue(this.plugin.settings.vaultAutoLockTimeout).setDynamicTooltip().onChange(async val=>{
          this.plugin.settings.vaultAutoLockTimeout = val;
          await this.plugin.saveSettings();
          this.plugin.folderVaultMgr.resetInactivityTimer();
        }));

      new Setting(containerEl).setName(t('fvBlurName')).setDesc(t('fvBlurDesc'))
        .addToggle(tog=>tog.setValue(this.plugin.settings.vaultLockOnBlur).onChange(async val=>{
          this.plugin.settings.vaultLockOnBlur = val;
          await this.plugin.saveSettings();
        }));

      new Setting(containerEl).setName(t('fvStartupName')).setDesc(t('fvStartupDesc'))
        .addToggle(tog=>tog.setValue(this.plugin.settings.vaultLockOnStartup).onChange(async val=>{
          this.plugin.settings.vaultLockOnStartup = val;
          await this.plugin.saveSettings();
        }));

      new Setting(containerEl).setName(t('fvHideName')).setDesc(t('fvHideDesc'))
        .addToggle(tog=>tog.setValue(this.plugin.settings.vaultHideInTree).onChange(async val=>{
          this.plugin.settings.vaultHideInTree = val;
          await this.plugin.saveSettings();
          this.plugin.folderVaultMgr.decorateTree();
        }));

      containerEl.createEl('div', { text: t('fvFoldersList'), cls: 'setting-item-name', attr:{ style:'margin:14px 0 4px;' } });
      const lockedFolders = this.plugin.settings.lockedFolders || {};
      const paths = Object.keys(lockedFolders);

      if (!paths.length) {
        containerEl.createEl('p', { text: t('fvEmpty'), cls: 'setting-item-description' });
      } else {
        paths.forEach(p => {
          const isUnlocked = this.plugin.folderVaultMgr.unlockedFolders.has(p);
          new Setting(containerEl)
            .setName(p.split('/').pop())
            .setDesc(`${p} — ${isUnlocked ? t('fvUnlockedStatus') : t('fvLockedStatus')}`)
            .addButton(btn=>btn
              .setButtonText(isUnlocked ? t('fvLockNow') : t('fvUnlock'))
              .onClick(async () => {
                if (isUnlocked) {
                  this.plugin.folderVaultMgr.lockFolder(p);
                  this.display();
                } else {
                  this.plugin.folderVaultMgr.requestUnlock(p, () => this.display());
                }
              }))
            .addButton(btn=>btn
              .setWarning()
              .setButtonText(t('fvRemove'))
              .onClick(async () => {
                delete this.plugin.settings.lockedFolders[p];
                this.plugin.folderVaultMgr.unlockedFolders.delete(p);
                await this.plugin.saveSettings();
                this.plugin.folderVaultMgr.decorateTree();
                new Notice(t('fvRemovedNotice') + p);
                this.display();
              }));
        });
      }
    }

    /* ══════════════════════════════════════════════
       SUPPORT / BUY ME A COFFEE CARD
    ══════════════════════════════════════════════ */
    const supportCard = containerEl.createEl('div', { cls: 'tk-support-card' });

    const supHeader = supportCard.createEl('div', { cls: 'tk-support-header' });
    supHeader.createEl('span', { cls: 'tk-support-icon', text: '☕' });
    const supTitleWrap = supHeader.createEl('div', { cls: 'tk-support-title-wrap' });
    supTitleWrap.createEl('div', { cls: 'tk-support-title', text: t('supportTitle') });

    supportCard.createEl('p', { cls: 'tk-support-desc', text: t('supportDesc') });

    const supActions = supportCard.createEl('div', { cls: 'tk-support-actions' });

    // Coffee Button (PayPal)
    const coffeeBtn = supActions.createEl('a', {
      cls: 'tk-btn-coffee',
      href: 'https://www.paypal.com/ncp/payment/4SWPEP8Q3YF78',
      text: t('supportBtn')
    });
    coffeeBtn.setAttribute('target', '_blank');
    coffeeBtn.setAttribute('rel', 'noopener noreferrer');

    // GitHub Star Button
    const ghBtn = supActions.createEl('a', {
      cls: 'tk-btn-github',
      href: 'https://github.com/ahmdmusa/obsidian-toolkit',
      text: t('starBtn')
    });
    ghBtn.setAttribute('target', '_blank');
    ghBtn.setAttribute('rel', 'noopener noreferrer');

    // Suggestions & Feedback Email Button
    const emailBtn = supActions.createEl('a', {
      cls: 'tk-btn-email',
      href: 'mailto:ahmedmousa.eng+ObsToolkit@gmail.com?subject=My%20Toolkit%20Feedback%20%26%20Suggestions',
      text: t('feedbackBtn')
    });
    emailBtn.setAttribute('title', 'ahmedmousa.eng+ObsToolkit@gmail.com');

    // Footer note
    const supFooter = supportCard.createEl('div', { cls: 'tk-support-footer' });
    supFooter.createEl('span', { text: t('supportFooter') });

    containerEl.createEl('p', { text:'FlowKit (formerly My Toolkit) v2.9.1 — by Ahmed Mousa', cls:'setting-item-description' });
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
  applyFolderStyles() {
    const styles = this.settings.folderStyles || {};
    const nav = document.querySelector('.nav-files-container');
    if (!nav) return;

    nav.querySelectorAll('.nav-folder-title').forEach(titleEl => {
      const path = titleEl.dataset.path;
      if (!path) return;
      const custom = styles[path];

      let customIcon = titleEl.querySelector('.fc-custom-icon');
      const textContent = titleEl.querySelector('.nav-folder-title-content');
      const defaultIcon = titleEl.querySelector('.ft-icon.ft-folder');

      if (custom && (custom.color || custom.icon)) {
        if (custom.color) {
          if (textContent) textContent.style.color = custom.color;
          if (defaultIcon) defaultIcon.style.color = custom.color;
        } else {
          if (textContent) textContent.style.color = '';
          if (defaultIcon) defaultIcon.style.color = '';
        }

        if (custom.icon) {
          if (defaultIcon) defaultIcon.style.display = 'none';
          if (!customIcon) {
            customIcon = document.createElement('span');
            customIcon.className = 'fc-custom-icon';
            const indicator = titleEl.querySelector('.nav-folder-collapse-indicator');
            if (indicator) indicator.after(customIcon);
            else titleEl.prepend(customIcon);
          }
          customIcon.textContent = custom.icon;
          customIcon.style.display = 'inline-flex';
        } else {
          if (defaultIcon) defaultIcon.style.display = '';
          if (customIcon) customIcon.style.display = 'none';
        }
      } else {
        if (textContent) textContent.style.color = '';
        if (defaultIcon) {
          defaultIcon.style.color = '';
          defaultIcon.style.display = '';
        }
        if (customIcon) customIcon.remove();
      }
    });
  }

  async onload() {
    CURRENT_PLUGIN_INSTANCE = this;
    await this.loadSettings();

    /* CSS auto-loaded by Obsidian from styles.css */

    this.selectionToolbarMgr = new SelectionToolbarManager(this);
    if (this.settings.enableSelectionToolbar) {
      this.selectionToolbarMgr.register();
    }

    if (this.settings.enableFormatting) {
      this.slashSuggest = new SlashCommandSuggest(this.app, this);
      this.registerEditorSuggest(this.slashSuggest);

      this.addCommand({
        id: 'toggle-paragraph-rtl',
        name: t('rtlCommandName'),
        hotkeys: [{ modifiers: ['Alt'], key: 'r' }],
        editorCallback: (editor) => {
          const sel = editor.getSelection();
          if (sel) {
            if (sel.startsWith('<div dir="rtl">\n') && sel.endsWith('\n</div>')) {
              editor.replaceSelection(sel.slice(16, -7));
            } else if (sel.startsWith('<div dir="rtl">') && sel.endsWith('</div>')) {
              editor.replaceSelection(sel.slice(15, -6));
            } else {
              editor.replaceSelection(`<div dir="rtl">\n${sel}\n</div>`);
            }
          } else {
            const cur = editor.getCursor();
            const line = editor.getLine(cur.line);
            if (line.startsWith('<div dir="rtl">') && line.endsWith('</div>')) {
              editor.setLine(cur.line, line.slice(15, -6));
            } else if (line.startsWith('<div dir="rtl">')) {
              editor.setLine(cur.line, line.replace(/^<div dir="rtl">/, ''));
            } else {
              editor.setLine(cur.line, `<div dir="rtl">${line}</div>`);
            }
          }
        }
      });
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
    this.addCommand({
      id: 'focus-current-folder',
      name: 'Focus on Current File Folder (Alt+F)',
      hotkeys: [{ modifiers: ['Alt'], key: 'f' }],
      callback: () => {
        if (!this.settings.enableFolderFocus) return;
        this.folderFocusMgr.focusCurrentFile();
      }
    });
    this.addCommand({
      id: 'clear-folder-focus',
      name: 'Clear Folder Focus Mode',
      callback: () => {
        if (!this.settings.enableFolderFocus) return;
        this.folderFocusMgr.clearFocus();
      }
    });

    this.folderVaultMgr = new FolderVaultManager(this);
    if (this.settings.enableFolderVault) this.folderVaultMgr.register();

    // Folder color context menu
    this.registerEvent(this.app.workspace.on('file-menu', (menu, file) => {
      if (file instanceof TFolder) {
        menu.addItem(item => item.setTitle(t('fcMenu')).setIcon('palette')
          .onClick(() => new FolderColorModal(this.app, this, file.path).open()));
      }
    }));
    this.registerEvent(this.app.workspace.on('layout-change', () => this.applyFolderStyles()));
    this.app.workspace.onLayoutReady(() => this.applyFolderStyles());

    // Panic Lock Command (Ctrl + Alt + L)
    this.addCommand({
      id: 'vault-panic-lock',
      name: t('fvPanicCmd'),
      hotkeys: [{ modifiers: ['Ctrl', 'Alt'], key: 'l' }],
      callback: () => {
        if (this.folderVaultMgr) this.folderVaultMgr.panicLock();
      }
    });

    this.addCommand({ id:'vault-lock-all-folders', name:t('fvLockAllCmd'),
      callback:()=>this.folderVaultMgr?.lockAll() });

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
    this.selectionToolbarMgr?.destroy();
    this.imgMgr?.destroy();
    this.fullscreenMgr?.destroy();
    this.fileTreeMgr?.destroy();
    this.quickBarMgr?.destroy();
    this.folderFocusMgr?.destroy();
    this.folderVaultMgr?.destroy();
    document.querySelectorAll('.ic-lightbox-overlay').forEach(e=>e.remove());
  }

  async loadSettings()  { this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData()); }
  async saveSettings()  { await this.saveData(this.settings); }
}

module.exports = ObsidianToolkitPlugin;
/* nosourcemap */