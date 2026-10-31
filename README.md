<div align="center">
<img width="80" height="80" alt="FlowKit Logo" src="icon.svg" />

# FlowKit (formerly My Toolkit)

**Modular Productivity, Organization, and Security Plugin for Obsidian**

[![Version](https://img.shields.io/badge/version-2.9.9-6366f1?style=flat-square)](https://github.com/ahmdmusa/obsidian-toolkit/releases)
[![Obsidian](https://img.shields.io/badge/Obsidian-0.15%2B-6366f1?style=flat-square&logo=obsidian)](https://obsidian.md)
[![License](https://img.shields.io/badge/license-MIT-6366f1?style=flat-square)](LICENSE)
[![Support](https://img.shields.io/badge/Support-PayPal-00457C?style=flat-square&logo=paypal)](https://www.paypal.com/ncp/payment/4SWPEP8Q3YF78)

</div>

### 6. Text-to-Speech (TTS) Engine & Document Reader
- **Dual-Engine Architecture:** 100% offline system natural voices via Web Speech API (zero server reliance or downtime) plus Microsoft Edge neural cloud voices with seamless automatic offline fallback.
- **Anti-Freeze Sentence Chunking:** Automatically divides text into natural sentences at punctuation marks (`.`, `!`, `?`, `؛`, `؟`), completely bypassing Chromium's 15-second speech synthesis pause bug.
- **Markdown & PDF Sanitization:** Strips YAML frontmatter, code blocks, images, link syntax, callouts, and HTML tags for natural pronunciation.
- **Floating Mini-Player HUD:** Sleek, draggable player with live sentence preview, percentage progress bar, sentence counter (`Sentence X / Y`), Previous/Next sentence jump, Play/Pause, Stop, and a speed cycle pill (`0.75x` to `2.0x`).
- **Universal Triggers:** Accessible via the left ribbon icon (`volume-2`), floating selection toolbar, editor context menu, file explorer menu, and global hotkey (`Alt+S`).

---

---

FlowKit is an open-source Obsidian plugin built to solve daily writing, security, and workspace management friction. It consolidates folder encryption, in-editor formatting tools, Live Preview image controls, a universal AI engine with live streaming, and navigation utilities into a single, high-performance package with zero memory leaks.

## Core Modules

| Module | Description | Trigger / Shortcut |
| :--- | :--- | :--- |
| **Text-to-Speech (TTS) Reader** | High-fidelity voice narration for Markdown notes and open PDFs. 100% offline system natural voices, online neural cloud speech, draggable floating mini-player, and speed cycling. | `Alt+S` / Ribbon / Selection toolbar |
| **Folder Vault & Privacy Lock** | Password-protect folders using PBKDF2 key derivation. Excludes files from Quick Switcher and Search. | Right-click folder |
| **Live Preview Image Toolbar** | Floating controls over images in Live Preview and Reading View. Quick resizing (25% to 100%), alignment, rotation, and markdown synchronization. | Click/hover any image |
| **Floating Selection Toolbar** | Notion-style floating toolbar on text selection with one-click formatting, 10 callout types, instant RTL toggle, and AI actions. | Select text in editor |
| **Universal AI Engine** | Streaming SSE integration with Google Gemini, OpenAI, Ollama (local), LM Studio (local), or any custom OpenAI-compatible endpoint. | `Ctrl+Shift+G` / Selection toolbar |
| **Folder Focus Mode 2.0+** | Focus on a specific folder in the file tree with folder note statistics, auto-focus active note folder, and quick breadcrumb navigation. | `Alt+F` / Ribbon icon |
| **Notion-Style Slash Commands** | Type `/` at the start of any line to open a searchable menu for callouts, dividers, and snippets. | `/` in editor |
| **Formatting Palette** | Over 60 styled callouts, academic layouts, dividers, and bilingual RTL templates. | `Ctrl+Shift+F` |
| **Instant RTL / LTR Toggle** | Toggle paragraph direction for seamless mixed Arabic and English note-taking. | `Alt+R` |
| **Panic Lock** | Emergency hotkey to immediately close sensitive leaves and lock all protected folders. | `Ctrl+Alt+L` |
| **Folder Colors & Icons** | Assign custom accent colors and icons to folders in the sidebar. | Right-click folder |

---

## Technical Overview

### 1. Folder Vault & Cryptography
- **Key Derivation:** Web Crypto API using PBKDF2 with SHA-256 (100,000 iterations, 16-byte cryptographically secure random salt).
- **Zero Plaintext Storage:** Passwords and PINs are never saved to disk; only the salt and derived hash are persisted in `data.json`.
- **Search & Switcher Interception:** Patches internal vault search and switcher methods while locked to guarantee sensitive filenames and contents do not leak in global search (`Ctrl+Shift+F`) or Quick Switcher (`Ctrl+O`).
- **Auto-Lock Triggers:** Configurable inactivity timeout, window blur (`window.onblur`), and automatic lock upon Obsidian launch.

### 2. Live Preview Image Controls
- Operates directly inside CodeMirror 6 Live Preview and Reading View.
- Resizing updates the note's markdown source directly (`![[image.png|400]]` or `![alt|400](url)`).
- Features size presets (25%, 50%, 75%, 100%, +/- 50px increments), alignment (left, center, right), 90-degree rotation, and fullscreen lightbox zoom with arrow navigation.

### 3. Floating Selection Toolbar
- Appears above selected text in markdown source view and Live Preview.
- Includes quick text styling (bold, italic, highlight, strikethrough, inline code, internal links).
- **Interactive Callout Picker:** Choose from 10 standard callouts (Note, Tip, Info, Warning, Danger, Success, Question, Quote, Example, Summary). If the selected text is already inside a callout, it seamlessly updates the callout type without duplicating text.
- **Instant AI Actions:** Proofread Arabic/English, summarize into bullets, explain concepts, or translate.

### 4. Universal AI Engine with Streaming
- **Supported Providers:**
  - **Google Gemini:** Connects via official `v1beta/openai` endpoint using Gemini API key.
  - **OpenAI:** Full support for `gpt-4o-mini`, `gpt-4o`, and newer models.
  - **Ollama (Local):** Connects to `http://localhost:11434/v1` with local privacy.
  - **LM Studio (Local):** Connects to local server on port 1234.
  - **Custom Endpoints:** Compatible with Groq, DeepSeek, OpenRouter, Mistral, and self-hosted vLLM.
- **Server-Sent Events (SSE) Streaming:** Responses stream word-by-word into the interface in real time.
- **Model Auto-Discovery:** Click `Test & Fetch Models` in settings to ping the provider and populate available models automatically.

### 5. Folder Focus Mode 2.0+
- Isolates the active working folder in the file tree to eliminate sidebar visual noise.
- Displays note count statistics directly in the breadcrumb bar (`MSc (14 notes)`).
- Full Unicode support for Arabic and non-Latin paths without DOM escape failures.
- Optional setting to automatically focus the folder of the note currently being edited.

---

## Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + Shift + F` | Open Formatting Palette |
| `Ctrl + Shift + G` | Open AI Assistant |
| `Ctrl + Shift + T` | AI Template Generator |
| `Ctrl + Shift + Z` | Toggle Fullscreen Note Mode |
| `Alt + F` | Toggle Folder Focus on current note |
| `Alt + S` | Toggle Text-to-Speech Play / Pause |
| `Alt + R` | Toggle RTL / LTR paragraph direction |
| `Ctrl + Alt + L` | Panic Lock: Lock all folders and close sensitive tabs |
| `/` | Open Slash Commands popup |

---

## Installation & Updates

### Option 1: Via BRAT (Recommended for Automatic Updates)
1. Install the **BRAT** plugin from Obsidian Community Plugins.
2. In BRAT settings, click **Add Beta plugin**.
3. Enter repository URL: `ahmdmusa/obsidian-toolkit`.
4. Enable **Auto-update plugins on start** in BRAT settings. BRAT will automatically check GitHub releases and download new updates on startup without manual intervention.

### Option 2: Manual Installation
1. Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](https://github.com/ahmdmusa/obsidian-toolkit/releases/latest).
2. Create a folder named `ahmed-toolkit` inside your vault at `.obsidian/plugins/ahmed-toolkit/`.
3. Copy the three files into that folder and reload Obsidian.

---

## Support & Feedback

If FlowKit helps you stay focused and saves you time in Obsidian, you can support its ongoing development:

<p align="center">
  <a href="https://www.paypal.com/ncp/payment/4SWPEP8Q3YF78" target="_blank" rel="noopener noreferrer">
    <img src="https://raw.githubusercontent.com/stefan-niedermann/paypal-donate-button/master/paypal-donate-button.png" alt="Donate with PayPal" width="180" />
  </a>
</p>

- **Issues & Suggestions:** [GitHub Issues](https://github.com/ahmdmusa/obsidian-toolkit/issues)
- **Email:** [ahmedmousa.eng+ObsToolkit@gmail.com](mailto:ahmedmousa.eng+ObsToolkit@gmail.com?subject=FlowKit%20Feedback)
- **Repository:** Star the project on [GitHub](https://github.com/ahmdmusa/obsidian-toolkit)

---

## دليل الاستخدام بالعربية

إضافة **FlowKit** (المعروفة سابقاً باسم My Toolkit) هي أداة مفتوحة المصدر طورتها لتوفير الميزات الأساسية التي يحتاجها كل مستخدم يكتب ويدير ملاحظاته بشكل مكثف داخل أوبسيديان، مع تركيز خاص على الأمان المحلي وسلاسة الكتابة باللغة العربية.

### أهم ميزات الإضافة عملياً:

1. **قفل وحماية المجلدات (Folder Vault):**
   - حماية أي مجلد برقم سري أو كلمة مرور مع تشفير PBKDF2-SHA-256 (100 ألف دورة تشفير).
   - لا يتم حفظ كلمة السر كنص صريح نهائياً.
   - حجب تام للملفات المقفلة من البحث العام (`Ctrl+Shift+F`) ومن نافذة التبديل السريع (`Ctrl+O`).
   - قفل تلقائي عند الخمول أو عند مغادرة نافذة البرنامج.

2. **التحكم بالصور في Live Preview:**
   - شريط أدوات عائم يظهر تلقائياً بمجرد النقر على أي صورة أثناء الكتابة.
   - خيارات تصغير وتكبير بنسب جاهزة (25%, 50%, 75%, 100%) أو أزرار تدريجية.
   - يقوم الشريط بتحديث كود الملاحظة الماركداون مباشرة (`![[image.png|400]]`) لضمان حفظ المقاس دائماً داخل الملف.
   - محاذاة لليمين أو الوسط أو اليسار، تدوير، وتكبير بملء الشاشة (Lightbox).

3. **شريط التحديد العائم (Notion-style):**
   - بمجرد تحديد أي نص في المحرر، يظهر شريط عائم يتيح لك تنسيق النص، إضافة الروابط، تحويل النص إلى تنبيه Callout مع إمكانية الاختيار من بين 10 أنواع مختلفة، وتبديل اتجاه الكتابة للعربية فورياً (`Alt+R`).
   - قائمة سريعة لمعالجة النص المحدد بالذكاء الاصطناعي (تدقيق لغوي، تلخيص، شرح، ترجمة).

4. **محرك الذكاء الاصطناعي الشامل والبث المباشر:**
   - دعم مباشر لأي مزود تريده: **Google Gemini**، **OpenAI**، **Ollama (محلي)**، **LM Studio (محلي)**، أو أي سيرفر خارجي يدعم بروتوكول OpenAI.
   - عرض الردود بنظام البث المباشر (SSE Streaming) كلمة بكلمة دون تجميد الواجهة.
   - زر داخل الإعدادات لفحص الاتصال واكتشاف النماذج المتاحة وتعبئتها في القائمة تلقائياً.

5. **وضع التركيز المطور (Focus Mode 2.0+):**
   - عزل المجلد الذي تعمل عليه في شجرة الملفات لإلغاء التشتت البصري.
   - إظهار عدد الملاحظات الموجودة داخل المجلد في شريط المسار العلوي.
   - خيار لجعل شجرة الملفات تركز تلقائياً على مجلد الملاحظة المفتوحة حالياً.

---

### الدعم والتواصل

إذا كانت الإضافة مفيدة لك وبتوفر وقتك وشغلك، تقدر تدعم استمرار تطويرها:

<p align="center">
  <a href="https://www.paypal.com/ncp/payment/4SWPEP8Q3YF78" target="_blank" rel="noopener noreferrer">
    <img src="https://raw.githubusercontent.com/stefan-niedermann/paypal-donate-button/master/paypal-donate-button.png" alt="Donate with PayPal" width="180" />
  </a>
</p>

- **الاقتراحات والمشاكل:** [فتح تذكرة على GitHub Issues](https://github.com/ahmdmusa/obsidian-toolkit/issues)
- **البريد الإلكتروني:** [ahmedmousa.eng+ObsToolkit@gmail.com](mailto:ahmedmousa.eng+ObsToolkit@gmail.com?subject=FlowKit%20Feedback)
- **دعم المشروع:** وضع نجمة (Star) للمستودع على [GitHub](https://github.com/ahmdmusa/obsidian-toolkit)

---

## License

This project is licensed under the [MIT License](LICENSE).
