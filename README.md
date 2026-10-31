<div align="center">
  <img width="100" height="100" alt="Ultimate Toolkit Logo" src="icon.png" style="border-radius: 22px; box-shadow: 0 8px 24px rgba(112, 64, 215, 0.25);" />

  # Ultimate Toolkit

  **The unified productivity and privacy suite for Obsidian.**  
  *Encrypted Folder Vaults · Natural Bilingual Text-to-Speech · Live Image HUD · Universal Streaming AI · Adaptive Selection Toolbar*

  <p>
    <a href="https://github.com/ahmdmusa/obsidian-toolkit/releases"><img src="https://img.shields.io/badge/version-2.9.16-6366f1?style=flat-square" alt="Version" /></a>
    <a href="https://obsidian.md"><img src="https://img.shields.io/badge/Obsidian-0.15%2B-6366f1?style=flat-square&logo=obsidian" alt="Obsidian" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-6366f1?style=flat-square" alt="License" /></a>
    <a href="https://www.paypal.com/ncp/payment/4SWPEP8Q3YF78"><img src="https://img.shields.io/badge/Support-Buy%20Me%20A%20Coffee-FFDD00?style=flat-square&logo=buy-me-a-coffee&logoColor=000000" alt="Buy Me A Coffee" /></a>
  </p>

  <p align="center">
    <a href="https://www.paypal.com/ncp/payment/4SWPEP8Q3YF78" target="_blank" rel="noopener noreferrer">
      <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="42" style="height: 42px !important; border-radius: 8px;" />
    </a>
  </p>
</div>

---

## Overview

**Ultimate Toolkit** consolidates essential note-taking, privacy, and reading capabilities into a single, cohesive Obsidian plugin. Instead of installing and managing multiple disjointed community extensions, Ultimate Toolkit delivers a unified, memory-efficient environment designed for academic research, deep reading, and intensive knowledge work.

### Core Architecture

- **Unified Performance**: Engineered with a strict single-worker model and generational cleanup to ensure flat memory usage (~30MB) and zero process flooding.
- **Privacy by Design**: Cryptographic operations run locally via the Web Crypto API; encrypted vaults never persist plaintext keys on disk.
- **Universal Multi-Format Ingestion**: Built-in parsers interact natively with Markdown notes, open PDF documents, embedded PDF canvases, and HTML chapter containers.
- **Bilingual First-Class Citizen**: Complete native support for mixed Arabic and English workflows, automatic RTL/LTR direction toggling, and language-aware text segmentation.

---

## Feature Matrix

| Capability | Scope | Primary Triggers |
| :--- | :--- | :--- |
| **Natural Text-to-Speech** | Markdown notes, PDFs, and HTML chapters with bilingual auto-routing (Salma for Arabic, Sonia for British English). | `Alt + S` / Ribbon / Selection HUD |
| **Encrypted Folder Vault** | PBKDF2-SHA-256 folder protection with search index isolation and auto-lock. | Right-click folder in file tree |
| **Adaptive Selection Toolbar** | Notion-style context toolbar with formatting in editor mode and reading tools in PDF/HTML mode. | Highlight text in any view |
| **Universal Streaming AI** | Real-time SSE streaming for Google Gemini, OpenAI, Claude, Ollama (Local), and custom endpoints. | `Ctrl + Shift + G` / Selection HUD |
| **Live Preview Image HUD** | On-canvas sizing, fine pixel adjustments, alignment, 90° rotation, and fullscreen lightbox. | Hover or click image |
| **Workspace Focus Mode** | Sidebar folder isolation with recursive note count statistics and Unicode path handling. | `Alt + F` / Left ribbon |
| **Slash Commands** | Inline `/` trigger for instant structural blocks, dividers, callouts, and templates. | Type `/` at line start |
| **Emergency Panic Lock** | Instant hotkey to close active sensitive tabs and lock all protected folders. | `Ctrl + Alt + L` |

---

## Detailed Capabilities

### Natural Text-to-Speech (TTS) & Document Reader

- **Multi-Format Support**: Reads Markdown notes, native Obsidian PDF views, embedded PDF previews (`![[paper.pdf]]`), and HTML chapter containers (`<iframe>`).
- **Bilingual Segmentation**: Sentences with mixed Arabic and English text are split on language boundaries at runtime, routing Arabic segments to **Microsoft Salma Online** and English terms to **Microsoft Sonia** (offline natural UK voice).
- **System Voice Discovery**: Automatically discovers and lists all 34 Windows-installed voices (including Piper neural models and Narrator natural voices) directly in settings.
- **Sanitization Pipeline**: Strips YAML frontmatter, markdown formatting, HTML tags, arrows, bullets, and TOC leader dots before synthesis.
- **Floating HUD Player**: Provides sentence progress, playback speed toggles (`0.75x` to `2.0x`), sentence jumping, and pause/resume controls.

### Encrypted Folder Vault

- **Cryptographic Standard**: Derives 256-bit AES encryption keys using **PBKDF2 with SHA-256** (100,000 iterations and 16-byte cryptographic salt).
- **Zero Plaintext Footprint**: Passwords and PINs are never stored on disk; only the salt and verification hash are retained.
- **Search & Switcher Shielding**: Intercepts Obsidian search and Quick Switcher indexes while locked to prevent file names or sensitive contents from leaking.
- **Inactivity Protection**: Automatically locks protected folders on window blur or after a configurable idle duration.

### Adaptive Selection Toolbar

- **Context-Aware Modes**:
  - *Editor Mode*: Comprehensive markdown tools including bold, italic, highlights, inline code, wikilinks, callout wrap, and RTL direction.
  - *Reader Mode (PDFs & Books)*: Minimalist reading tools featuring Read Selection, Read from Here, AI Query, and Copy.
- **Callout Switcher**: Wraps selections into any of 10 standard callout types (Note, Tip, Info, Warning, Danger, Success, Question, Quote, Example, Summary), or updates an existing callout in place without duplicating text.

### Universal Streaming AI Assistant

- **Provider Compatibility**: Native support for **Google Gemini** (official OpenAI-compatible endpoint), **OpenAI**, **Anthropic Claude**, **Ollama (local offline)**, **LM Studio**, and custom OpenAI-compatible proxies.
- **Real-Time Streaming**: Server-Sent Events (SSE) display responses word-by-word without blocking UI threads.
- **Workflow Actions**: One-click actions for summarizing academic literature, proofreading bilingual notes, extracting key concepts, or translating.

### Live Preview Image Controls

- **Interactive Canvas HUD**: Hover over or click any image in Live Preview or Reading View to reveal formatting controls.
- **Underlying Markdown Synchronization**: Updates the image size syntax directly in the document (e.g. `![[figure.png|400]]`) ensuring persistent sizing across sync.
- **Tools**: Size presets (25%, 50%, 75%, 100%), +/- 50px increments, left/center/right alignment, 90° rotation, and lightbox fullscreen zoom.

### Workspace Focus Mode

- **Distraction-Free Exploration**: Temporarily hides non-relevant directories from the file explorer, isolating the active project folder.
- **Folder Statistics**: Displays accurate recursive note counts in the breadcrumb bar with full support for Arabic and Unicode path names.
- **Visual Indentation Guides**: Subtle vertical lines clarifying folder depth in complex vault trees.

---

## Keyboard Shortcuts

| Shortcut | Description | Default Trigger |
| :--- | :--- | :--- |
| `Alt + S` | Toggle Text-to-Speech Play / Pause | Universal |
| `Alt + F` | Toggle Folder Focus on current note | Universal |
| `Alt + R` | Toggle paragraph RTL / LTR direction | Editor |
| `Ctrl + Alt + L` | Panic Lock (Lock all folders & close sensitive tabs) | Universal |
| `Ctrl + Shift + G` | Open AI Assistant modal | Editor |
| `Ctrl + Shift + F` | Open Formatting Palette | Editor |
| `Ctrl + Shift + T` | Open AI Template Generator | Editor |
| `Ctrl + Shift + Z` | Toggle Fullscreen Note Mode | Editor |
| `/` | Trigger Notion-style Slash Command suggest | Line Start |

---

## Support & Contributing

Ultimate Toolkit is an independent open-source project. If it saves you time or improves your study workflow, consider supporting ongoing maintenance:

<p align="center">
  <a href="https://www.paypal.com/ncp/payment/4SWPEP8Q3YF78" target="_blank" rel="noopener noreferrer">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="42" style="height: 42px !important; border-radius: 8px;" />
  </a>
</p>

- **Issue Tracker**: [GitHub Issues](https://github.com/ahmdmusa/obsidian-toolkit/issues)
- **Direct Inquiries**: [ahmedmousa.eng+ObsToolkit@gmail.com](mailto:ahmedmousa.eng+ObsToolkit@gmail.com?subject=Ultimate%20Toolkit%20Feedback)

---

## الدليل العربي السريع

إضافة **Ultimate Toolkit** هي بيئة عمل موحدة وشاملة داخل أوبسيديان تجمع بين خمس أدوات رئيسية دون الحاجة لتثبيت إضافات متعددة:

1. **القارئ الصوتي الطبيعي (TTS):** قراءة الملاحظات وكتب PDF وصفحات HTML بصوت **سلمى** الطبيعي للنصوص العربية وصوت **سونيا** البريطاني للنصوص الإنجليزية مع تقسيم فوري للجمل ثنائية اللغة.
2. **الخزنة المشفرة (Folder Vault):** تشفير أي مجلد بخوارزمية PBKDF2-SHA-256 مع حجب الملفات من البحث العام وقفل تلقائي عند الخمول وزر طوارئ سريع (`Ctrl + Alt + L`).
3. **شريط التحديد العائم:** شريط ذكي يتكيف بين وضع الكتابة (تنسيق، صناديق تنبيهات، تبديل RTL) ووضع قراءة الكتب والـ PDF (قراءة صوتية، ذكاء اصطناعي، نسخ).
4. **الذكاء الاصطناعي التفاعلي:** بث مباشر فوري يدعم Gemini و OpenAI ونماذج Ollama المحلية.
5. **التحكم المباشر بالصور ووضع التركيز:** تكبير وتصغير الصور أثناء المعاينة الحية وعزل المجلدات النشطة في شجرة الملفات لإلغاء التشتت.

---

## License

This project is licensed under the [MIT License](LICENSE).
