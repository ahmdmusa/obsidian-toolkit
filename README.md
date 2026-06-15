<div align="center">
<img width="30" height="30" alt="Toolkit Logo" src="https://github.com/user-attachments/assets/2470633d-b5d0-4590-b45a-d7a5b95e19e5" />

# My Toolkit

**An all-in-one productivity suite for Obsidian**

Seven integrated modules — formatting, AI, image control, navigation, and focus — all in a single plugin.

[![Version](https://img.shields.io/badge/version-2.6.0-7c3aed?style=flat-square)](https://github.com/ahmdmusa/obsidian-toolkit/releases)
[![Obsidian](https://img.shields.io/badge/Obsidian-0.15%2B-7c3aed?style=flat-square&logo=obsidian)](https://obsidian.md)
[![License](https://img.shields.io/badge/license-MIT-7c3aed?style=flat-square)](LICENSE)

</div>

---

## Modules at a glance

| | Module | Description | Shortcut |
|-|--------|-------------|----------|
| 🎨 | Formatting Palette | 60+ elements in a searchable palette | `Ctrl+Shift+F` |
| 🤖 | AI Smart Suggestion | One-line continuation from context | `Ctrl+Shift+G` |
| 📐 | AI Template Generator | Full structured templates from a description | `Ctrl+Shift+T` |
| 🖼 | Image Control | Resize, align, rotate, caption, lightbox | Reading View |
| ⛶ | Fullscreen Note | Distraction-free writing + auto-fullscreen | `Ctrl+Shift+Z` |
| 🌳 | Premium File Tree | SF Symbols-style icons + image thumbnails | Sidebar |
| ⚡ | Quick Access Bar | Pinned one-click buttons above the file tree | Sidebar |
| 📁 | Folder Focus Mode | Zoom into a folder — hide everything else | Right-click |

---

## 🎨 Formatting Palette

Press `Ctrl+Shift+F` to open. Use `↑↓` to navigate, `Enter` to insert, `Esc` to close.

<img width="994" alt="Formatting Palette" src="https://github.com/user-attachments/assets/cfe5e484-d84e-45dd-8e70-1032c5cd826f" />

**Categories:** Insert · Callouts · Custom Callouts · Islamic (RTL) · Headings · Text · Lists · Code · Dividers

<details>
<summary>Full category breakdown</summary>

- **Insert** — Dates, times, progress bar generator, AI smart suggestion, AI template generator
- **Callouts** — All 12 built-in callouts (note, tip, warning, danger, bug…)
- **Custom Callouts** — Goal, Idea, Task, Formula, Remember, Blocker, Command, Config…
- **Islamic** — Ayah, Hadith, Dua with RTL layout and Arabic typography
- **Headings** — H1–H5
- **Text** — Bold, italic, highlight, strikethrough, inline code, subscript, superscript
- **Lists** — Bullet, numbered, task
- **Code** — Code block, math block
- **Dividers** — Line, double, dots, arrow, wave, dashed

</details>

---

## 🤖 AI Provider

Connect any OpenAI-compatible API — or run models locally for free with Ollama.

**Supported providers:**

| Provider | Notes |
|----------|-------|
| **Ollama** | Local, free — auto-fetches your installed models |
| **OpenAI** | gpt-4o-mini, gpt-4o… |
| **Custom** | OpenRouter, Groq, Anthropic proxy, or any `/v1/chat/completions` endpoint |

<img width="1137" alt="AI Settings" src="https://github.com/user-attachments/assets/0650bde7-8977-4205-a98e-dc8848ab91f7" />

### AI Smart Suggestion `Ctrl+Shift+G`

Reads the last 12 lines of context (or your selection) and suggests a single continuation — a callout, heading, checklist, or paragraph.

### AI Template Generator `Ctrl+Shift+T`

Describe what you want to create, and the AI generates a complete structured markdown template.

> **Example:** *"Weekly meeting notes with action items"*
> → Full template with headings, callouts, checklists, and placeholders

<img width="683" alt="AI Template Generator" src="https://github.com/user-attachments/assets/589ca5fe-d551-4c82-a64f-ccbd9af199b7" />

<img width="683" alt="AI Smart Suggestion" src="https://github.com/user-attachments/assets/eafad452-5ee5-4ecc-a195-5c638ef2a3af" />

<details>
<summary>Ollama setup</summary>

```bash
# Install: https://ollama.com
ollama pull qwen2.5:3b
ollama serve

# If you get a CORS error:
OLLAMA_ORIGINS="app://obsidian.md*" ollama serve
```

Then: **Settings → AI Provider → Ollama → Fetch models → select model → Test Connection**

</details>

---

## 🖼 Image Control

Click any image in Reading View to reveal a floating toolbar.

<img width="617" alt="Image Control toolbar" src="https://github.com/user-attachments/assets/9a561c12-9d6f-42a2-b1fb-85a883908d81" />

| Button | Action |
|--------|--------|
| `−` / `+` | Resize by 30 px steps |
| `⬤← ⬤ →⬤` | Float left / center / float right |
| `↻` | Rotate 90° |
| `✎` | Add a caption |
| `⟲` | Reset to original size and position |
| `⎘` | Copy markdown link with current width |
| `⤢` | Open fullscreen lightbox (pan · zoom · rotate) |

<details>
<summary>Special layout classes</summary>

```html
<div class="img-grid-2">...</div>    <!-- 2-column grid -->
<div class="img-grid-3">...</div>    <!-- 3-column grid -->
<div class="img-grid-4">...</div>    <!-- 4-column grid -->
<div class="img-col">...</div>       <!-- image + text column -->
<div class="img-col-right">...</div> <!-- reversed: text + image -->
<div class="img-caption">...</div>   <!-- image with caption below -->
```

</details>

---

## ⛶ Fullscreen Note

Floating `⛶` button on every note. Toggle with `Ctrl+Shift+Z`.

<img width="166" alt="Fullscreen button" src="https://github.com/user-attachments/assets/88f8366a-736a-4074-8e36-c19bf06c0e8e" />

**Auto-fullscreen:** Enters fullscreen automatically after a configurable inactivity period (5–120 s). A soft hint bar with a Cancel button appears 3 seconds before.

<img width="1137" alt="Auto-fullscreen hint bar" src="https://github.com/user-attachments/assets/1db45739-6fac-4af4-bad6-38c97d142c96" />

<img width="1137" alt="Fullscreen settings" src="https://github.com/user-attachments/assets/0650bde7-8977-4205-a98e-dc8848ab91f7" />

---

## 🌳 Premium File Tree

Apple-style SF Symbols-inspired icons for every file type — Markdown, PDF, Image, Video, Audio, Code, Archive, Canvas, Link, and plain text. Image files show a real 18×18 px thumbnail.

<img width="334" alt="Premium File Tree icons" src="https://github.com/user-attachments/assets/8b7c7677-06d6-4c22-ad0b-835210e419f8" />

**Row height:** Compact / Default / Spacious

<img width="1086" alt="File Tree row height settings" src="https://github.com/user-attachments/assets/45e1025c-7639-4701-bf19-dbfc0c15e16a" />

---

## ⚡ Quick Access Bar

A persistent bar of pinned buttons above the file tree. One click opens any note or folder.

<img width="344" alt="Quick Access Bar in sidebar" src="https://github.com/user-attachments/assets/8438522f-085b-4818-85f9-932860a4aaaf" />

<img width="1085" alt="Quick Access Bar settings" src="https://github.com/user-attachments/assets/37f2f1d9-3632-4e2a-ac94-304df369a7c5" />

**Add items:** `+ Add current file` · `+ Add current folder` · manual path input

---

## 📁 Folder Focus Mode

Right-click any folder → **"📁 Focus on this folder"** — the sidebar shows only that folder's contents. Everything else is hidden. Sub-folders start collapsed. A back button ("← All files") appears at the top to exit.

<img width="1067" alt="Folder Focus Mode" src="https://github.com/user-attachments/assets/320ae64e-4b29-4bf9-ae1a-1e8386fb57c0" />

**Main Folders tabs:** Define top-level folders in Settings — they appear as tabs in a persistent bar above the tree. One click to focus, one click to exit.

> Search, Graph View, and Quick Switcher (`Ctrl+O`) always cover the full vault regardless of focus state.

---

## Installation

### From Community Plugins *(coming soon)*
Settings → Community Plugins → Browse → search **My Toolkit** → Install → Enable

### Via BRAT *(available now)*
1. Install [BRAT](https://github.com/TfTHacker/obsidian42-brat)
2. BRAT → Add Beta Plugin → `ahmdmusa/obsidian-toolkit`
3. Enable the plugin

### Manual
1. Download `main.js`, `styles.css`, `manifest.json` from [Releases](https://github.com/ahmdmusa/obsidian-toolkit/releases/latest)
2. Copy to `<vault>/.obsidian/plugins/ahmed-toolkit/`
3. Restart Obsidian → Settings → Community Plugins → enable **My Toolkit**

---

## Keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+F` | Formatting Palette |
| `Ctrl+Shift+Z` | Toggle Fullscreen |
| `Ctrl+Shift+G` | AI Smart Suggestion |
| `Ctrl+Shift+T` | AI Template Generator |

All shortcuts are remappable in Settings → Hotkeys.

---

## Settings overview

| Section | Key options |
|---------|-------------|
| 🎨 Formatting Palette | Enable / disable |
| 🖼 Image Control | Enable / disable |
| ⛶ Fullscreen Note | Enable, auto-fullscreen, inactivity timer (5–120 s) |
| 🤖 AI Provider | Provider, model (auto-fetch for Ollama), API key, response language, system prompt |
| 🌳 Premium File Tree | Enable, image thumbnails, row height |
| ⚡ Quick Access Bar | Enable, manage pinned items |
| 📁 Folder Focus Mode | Enable, manage main folder tabs (↑↓ to reorder) |

---

## Compatibility

- Obsidian 0.15.0 or later
- Desktop and mobile
- Works with any community theme

---

## Screenshots

<div align="center">

<table>
<tr>
<td align="center" width="50%">

**🎨 Formatting Palette**
<img width="480" alt="لوحة التنسيق" src="https://github.com/user-attachments/assets/c00977c7-87c4-47c3-ab6e-472775d28d50" />

</td>
<td align="center" width="50%">

**🤖 AI Template Generator**
<img width="480" alt="مولّد القوالب" src="https://github.com/user-attachments/assets/f51727b3-37db-4c9d-b808-db47216412ac" />

</td>
</tr>
<tr>
<td align="center" width="50%">

**⛶ Fullscreen Note**
<img width="480" alt="ملء الشاشة التلقائي" src="https://github.com/user-attachments/assets/559fa6c9-f0ae-4578-9d74-9d4dcd3866fe" />

</td>
<td align="center" width="50%">

**🤖 AI Provider Settings**
<img width="480" alt="إعدادات الذكاء الاصطناعي" src="https://github.com/user-attachments/assets/d5aedd1d-aa8e-4563-9a3d-29f333a55aa2" />

</td>
</tr>
<tr>
<td align="center" width="50%">

**🌳 Premium File Tree**
<img width="480" alt="شجرة الملفات" src="https://github.com/user-attachments/assets/095888d5-77e7-421e-81c4-90c2c1ceecdf" />

</td>
<td align="center" width="50%">

**⚡ Quick Access Bar**
<img width="480" alt="شريط الوصول السريع" src="https://github.com/user-attachments/assets/74021700-f2f8-4504-9909-c0bb36a7269b" />

</td>
</tr>
<tr>
<td align="center" width="50%">

**📁 Folder Focus Mode**
<img width="480" alt="وضع التركيز على فولدر" src="https://github.com/user-attachments/assets/1b5ba115-8339-49cf-9ce0-ffb8c5be2a66" />

</td>
<td align="center" width="50%">

**⚡ Quick Access Bar Sidebar**
<img width="480" alt="شريط الوصول السريع - الشريط الجانبي" src="https://github.com/user-attachments/assets/8d7b35ee-d706-45ce-81be-1b69b9da606e" />

</td>
</tr>
</table>

</div>

---

<div dir="rtl">


**مجموعة أدوات متكاملة — سبع وحدات في إضافة واحدة**

| الوحدة | الوصف |
|--------|-------|
| 🎨 لوحة التنسيق | أكثر من 60 عنصر — Callouts، إسلاميات، عناوين، فواصل |
| 🤖 الذكاء الاصطناعي | اقتراح ذكي ومولّد قوالب كاملة |
| 🖼 التحكم في الصور | تكبير، محاذاة، تدوير، lightbox بالنقر |
| ⛶ ملء الشاشة | زر عائم + دخول تلقائي بعد فترة خمول |
| 🌳 شجرة الملفات | أيقونات SF Symbols + صور مصغّرة |
| ⚡ شريط الوصول السريع | أزرار ثابتة فوق الشجرة لأي ملف أو فولدر |
| 📁 وضع التركيز | كليك يمين على فولدر → يصبح جذر الـ sidebar |

### التثبيت عبر BRAT
```
ahmdmusa/obsidian-toolkit
```

### التثبيت اليدوي
انسخ الملفات إلى: `<vault>/.obsidian/plugins/ahmed-toolkit/`

</div>

---

<div align="center">

MIT License · Ahmed Mousa · [GitHub](https://github.com/ahmdmusa) · [LinkedIn](https://www.linkedin.com/in/ahmdmusa) · Egypt 🇪🇬

</div>
