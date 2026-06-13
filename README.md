<div align="center">

# Obsidian Toolkit

**An all-in-one productivity suite for Obsidian**

Seven integrated modules — formatting, AI, image control, navigation, and focus — all in a single plugin.

[![Version](https://img.shields.io/badge/version-2.6.0-7c3aed?style=flat-square)](https://github.com/ahmdmusa/obsidian-toolkit/releases)
[![Obsidian](https://img.shields.io/badge/Obsidian-0.15%2B-7c3aed?style=flat-square&logo=obsidian)](https://obsidian.md)
[![License](https://img.shields.io/badge/license-MIT-7c3aed?style=flat-square)](LICENSE)

</div>

---

## Features at a glance

| Module | Description | Shortcut |
|--------|-------------|----------|
| 🎨 Formatting Palette | 60+ formatting elements in a searchable palette | `Ctrl+Shift+F` |
| 🤖 AI Smart Suggestion | One-line continuation based on context | `Ctrl+Shift+G` |
| 📐 AI Template Generator | Full structured templates from a description | `Ctrl+Shift+T` |
| 🖼 Image Control | Click-activated toolbar: resize, align, rotate, lightbox | Reading View |
| ⛶ Fullscreen Note | Distraction-free writing + auto-fullscreen | `Ctrl+Shift+Z` |
| 🌳 Premium File Tree | SF Symbols-style icons + image thumbnails | Sidebar |
| ⚡ Quick Access Bar | Pinned one-click buttons above the file tree | Sidebar |
| 📁 Folder Focus Mode | Zoom into a folder — it becomes the visual vault root | Right-click |

---

## 🎨 Formatting Palette

A searchable command palette with 60+ formatting elements organised by category.

Press `Ctrl+Shift+F` (or click the wand icon in the ribbon) to open it. Use `↑↓` to navigate, `Enter` to insert, `Esc` to close.

<img width="994" height="867" alt="1" src="https://github.com/user-attachments/assets/cfe5e484-d84e-45dd-8e70-1032c5cd826f" />


**Categories:**
- **Insert** — Dates, times, progress bar generator, AI smart suggestion, AI template generator
- **Callouts** — All 12 built-in Obsidian callouts (note, tip, warning, danger, bug…)
- **Custom Callouts** — Goal, Idea, Task, Formula, Remember, Blocker, Command, Config…
- **Islamic** — Ayah, Hadith, Dua with RTL layout and Arabic typography
- **Headings** — H1–H5
- **Text** — Bold, italic, highlight, strikethrough, inline code, subscript, superscript
- **Lists** — Bullet, numbered, task
- **Code** — Code block, math block
- **Dividers** — Line, double, dots, arrow, wave, dashed

---

## 🤖 AI Provider

Connect any OpenAI-compatible API — or run models locally for free with Ollama.

<img width="683" height="504" alt="2" src="https://github.com/user-attachments/assets/589ca5fe-d551-4c82-a64f-ccbd9af199b7" />

**Supported providers:**
- **Ollama** (local, free) — auto-fetches your installed models
- **OpenAI** — gpt-4o-mini, gpt-4o…
- **Custom** — OpenRouter, Groq, Anthropic proxy, or any `/v1/chat/completions` endpoint

**Configure:** Settings → Obsidian Toolkit → 🤖 AI Provider
<img width="1137" height="860" alt="55" src="https://github.com/user-attachments/assets/0650bde7-8977-4205-a98e-dc8848ab91f7" />


### AI Smart Suggestion `Ctrl+Shift+G`

Reads the last 12 lines of context (or your selection) and suggests a single continuation — a callout, heading, checklist, or paragraph that fits what you're writing.

### AI Template Generator `Ctrl+Shift+T`

Describe what you want to create and the AI generates a complete, structured markdown template:

> *"Weekly meeting notes with action items"*
> → Full template with headings, callouts, checklists, and placeholders

<img width="683" height="504" alt="2" src="https://github.com/user-attachments/assets/eafad452-5ee5-4ecc-a195-5c638ef2a3af" />

Optional extra instructions: *"Use Arabic headings"*, *"Keep it short"*, *"Include a progress bar"*

**Setting up Ollama:**
```bash
# Install: https://ollama.com
ollama pull qwen2.5:3b
ollama serve
# If you get a CORS error:
OLLAMA_ORIGINS="app://obsidian.md*" ollama serve
```
Then: Settings → AI Provider → Ollama → **Fetch models** → select model → **Test Connection**

---

## 🖼 Image Control

Click any image in Reading View to reveal a floating toolbar.

| Button | Action |
|--------|--------|
| `−` / `+` | Resize by 30 px steps |
| `⬤← ⬤ →⬤` | Float left / center / float right |
| `↻` | Rotate 90° |
| `✎` | Add a caption |
| `⟲` | Reset to original size and position |
| `⎘` | Copy Obsidian markdown link with current width |
| `⤢` | Open fullscreen lightbox (pan, zoom, rotate) |

<img width="617" height="326" alt="image" src="https://github.com/user-attachments/assets/9a561c12-9d6f-42a2-b1fb-85a883908d81" />

**Special layouts** — add these CSS classes to a `div` wrapping images in your markdown:

```html
<div class="img-grid-3">...images...</div>   <!-- 3-column photo grid -->
<div class="img-col">...image + text...</div>  <!-- image + text columns -->
<div class="img-caption">...image + em...</div><!-- image with caption -->
```

---

## ⛶ Fullscreen Note

Floating fullscreen button (`⛶`) appears on every note. Toggle with `Ctrl+Shift+Z`.
<img width="166" height="134" alt="3" src="https://github.com/user-attachments/assets/88f8366a-736a-4074-8e36-c19bf06c0e8e" />

**Auto-fullscreen:** Enable in settings to automatically enter fullscreen after a configurable inactivity period (5–120 seconds). A soft hint bar appears 3 seconds before with a Cancel button.

<img width="1137" height="537" alt="5" src="https://github.com/user-attachments/assets/1db45739-6fac-4af4-bad6-38c97d142c96" />

---

## 🌳 Premium File Tree

Apple-style SF Symbols-inspired icons for every file type in the file explorer — Markdown, PDF, Image, Video, Audio, Code, Archive, Canvas, Link, and plain text.
<img width="334" height="340" alt="8" src="https://github.com/user-attachments/assets/8b7c7677-06d6-4c22-ad0b-835210e419f8" />

Image files display a real 18×18 px thumbnail in the tree.

**Row height:** Compact / Default / Spacious — configurable in settings.
<img width="1086" height="442" alt="3 2" src="https://github.com/user-attachments/assets/45e1025c-7639-4701-bf19-dbfc0c15e16a" />

---

## ⚡ Quick Access Bar

A persistent bar of pinned buttons above the file tree. Each button opens a specific note or folder with one click.

**Add items:**
- **"+ Add current file"** — pins the file currently open in the editor
- **"+ Add current folder"** — pins its parent folder
- **Manual path** — type any vault-relative path
<img width="1085" height="539" alt="6" src="https://github.com/user-attachments/assets/37f2f1d9-3632-4e2a-ac94-304df369a7c5" />

<img width="344" height="491" alt="4" src="https://github.com/user-attachments/assets/8438522f-085b-4818-85f9-932860a4aaaf" />

---

## 📁 Folder Focus Mode

Right-click any folder → **"📁 Focus on this folder"** — the sidebar shows only that folder's contents, with everything else hidden. Sub-folders start collapsed.

A back button ("← All files") appears at the top to exit focus.

**Main Folders** (Settings → Folder Focus Mode): define a list of top-level folders that appear as **tabs** in a persistent bar above the tree. One click on a tab → instant focus. Click again → exit.
<img width="1067" height="556" alt="7" src="https://github.com/user-attachments/assets/320ae64e-4b29-4bf9-ae1a-1e8386fb57c0" />

> Note: Search, Graph View, and Quick Switcher (`Ctrl+O`) always cover the full vault regardless of focus state.

---

## Installation

### From Obsidian Community Plugins *(coming soon)*
Settings → Community Plugins → Browse → search **Obsidian Toolkit** → Install → Enable

### Via BRAT *(available now)*
1. Install the [BRAT](https://github.com/TfTHacker/obsidian42-brat) plugin
2. BRAT → Add Beta Plugin → enter `ahmdmusa/obsidian-toolkit`
3. Enable the plugin

### Manual
1. Download `main.js`, `styles.css`, `manifest.json` from [Releases](https://github.com/ahmdmusa/obsidian-toolkit/releases/latest)
2. Copy to `<vault>/.obsidian/plugins/obsidian-toolkit/`
3. Quit and reopen Obsidian → Settings → Community Plugins → enable **Obsidian Toolkit**

---

## Keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+F` | Open Formatting Palette |
| `Ctrl+Shift+Z` | Toggle Fullscreen |
| `Ctrl+Shift+G` | AI Smart Suggestion |
| `Ctrl+Shift+T` | AI Template Generator |

All shortcuts can be changed in Settings → Hotkeys.

---

## Settings overview

| Section | Key options |
|---------|-------------|
| 🎨 Formatting Palette | Enable / disable |
| 🖼 Image Control | Enable / disable |
| ⛶ Fullscreen Note | Enable, auto-fullscreen toggle, inactivity timer (5–120 s) |
| 🤖 AI Provider | Provider, model selector (Ollama: auto-fetch), API key, response language, custom system prompt |
| 🌳 Premium File Tree | Enable, image thumbnails, row height |
| ⚡ Quick Access Bar | Enable, manage pinned items (reorder, remove) |
| 📁 Folder Focus Mode | Enable, manage main folder tabs (reorder with ↑↓, remove) |

---

## Compatibility

- Obsidian `0.15.0` or later
- Desktop and mobile (Image Control and Fullscreen are desktop-optimised)
- Works with any community theme

---

---

<div dir="rtl">

# Obsidian Toolkit — ع

**مجموعة أدوات متكاملة لـ Obsidian — سبع وحدات في إضافة واحدة**

---

## المميزات

### 🎨 لوحة التنسيق — `Ctrl+Shift+F`
أكثر من 60 عنصر تنسيق في لوحة بحث سريعة: Callouts مدمجة ومخصصة، إسلاميات (آيات وأحاديث وأدعية) بتنسيق RTL، عناوين، نصوص، قوائم، كود، فواصل — كل حاجة في مكان واحد.

### 🤖 الذكاء الاصطناعي
**اقتراح ذكي** `Ctrl+Shift+G`: بيقرأ سياق ما تكتبه ويقترح جملة أو callout أو قائمة مناسبة.

**مولّد قوالب** `Ctrl+Shift+T`: اكتب وصف (مثل "محضر اجتماع أسبوعي") والـ AI يولّد قالب Obsidian كامل.

يدعم Ollama المحلي (مجاني) + OpenAI + أي خدمة متوافقة مع OpenAI (OpenRouter, Groq…).

### 🖼 التحكم في الصور *(وضع القراءة)*
انقر على أي صورة لتظهر شريط أدوات: تكبير/تصغير، محاذاة، تدوير، caption، Reset، نسخ Markdown، lightbox كامل.

### ⛶ ملء الشاشة — `Ctrl+Shift+Z`
زر عائم على كل ملف + دخول تلقائي لملء الشاشة بعد فترة خمول قابلة للتحديد.

### 🌳 شجرة الملفات المحسّنة
أيقونات بأسلوب Apple SF Symbols لكل نوع ملف + صور مصغّرة للصور داخل الشجرة.

### ⚡ شريط الوصول السريع
شريط أزرار ثابت فوق شجرة الملفات — كل زرار يفتح ملف أو فولدر بضغطة واحدة.

### 📁 وضع التركيز على فولدر
كليك يمين على أي فولدر ← "ركّز على هذا الفولدر": الشجرة بتعرض محتوياته بس، وكل حاجة تانية بتختفي. شريط تابات للفولدرات الرئيسية فوق الشجرة للتنقل السريع.

---

## التثبيت

### عبر BRAT *(متاح الآن)*
1. ثبّت إضافة [BRAT](https://github.com/TfTHacker/obsidian42-brat)
2. BRAT → Add Beta Plugin → أدخل `ahmdmusa/obsidian-toolkit`
3. فعّل الإضافة

### يدوياً
1. حمّل `main.js` و`styles.css` و`manifest.json` من [Releases](https://github.com/ahmdmusa/obsidian-toolkit/releases/latest)
2. انسخهم إلى `<vault>/.obsidian/plugins/obsidian-toolkit/`
3. أعد فتح Obsidian → Settings → Community Plugins → فعّل **Obsidian Toolkit**

---
<img width="994" height="867" alt="1" src="https://github.com/user-attachments/assets/c00977c7-87c4-47c3-ab6e-472775d28d50" />
<img width="683" height="504" alt="2" src="https://github.com/user-attachments/assets/f51727b3-37db-4c9d-b808-db47216412ac" />

<img width="166" height="134" alt="3" src="https://github.com/user-attachments/assets/3a5a1500-b548-4de4-a5ff-d0c28e8fdaee" />

<img width="344" height="491" alt="4" src="https://github.com/user-attachments/assets/8d7b35ee-d706-45ce-81be-1b69b9da606e" />
<img width="1137" height="537" alt="5" src="https://github.com/user-attachments/assets/559fa6c9-f0ae-4578-9d74-9d4dcd3866fe" />
<img width="1137" height="860" alt="55" src="https://github.com/user-attachments/assets/d5aedd1d-aa8e-4563-9a3d-29f333a55aa2" />
<img width="1086" height="442" alt="3 2" src="https://github.com/user-attachments/assets/095888d5-77e7-421e-81c4-90c2c1ceecdf" />
<img width="1085" height="539" alt="6" src="https://github.com/user-attachments/assets/74021700-f2f8-4504-9909-c0bb36a7269b" />
<img width="1067" height="556" alt="7" src="https://github.com/user-attachments/assets/1b5ba115-8339-49cf-9ce0-ffb8c5be2a66" />


### licence 

MIT — by [ Ahmed Mousa - EG26 ](https://github.com/ahmdmusa)
#### thanks
</div>
