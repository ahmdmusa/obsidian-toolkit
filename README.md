# Obsidian Toolkit

An all-in-one productivity suite for Obsidian. Seven integrated modules in a single plugin — no configuration required to get started.

---

## Features

### 🎨 Formatting Palette — `Ctrl+Shift+F`
A searchable command palette with 60+ formatting elements organised by category.

- **Insert**: Dates, times, progress bars, AI smart suggestions, AI template generator
- **Callouts**: All 12 built-in Obsidian callouts (note, tip, warning, danger…)
- **Custom callouts**: Goal, Idea, Task, Formula, Remember, Blocker, Command, Config…
- **Islamic**: Ayah, Hadith, Dua — with RTL and Arabic typography
- **Headings, Text, Lists, Code, Dividers**: Bold, italic, highlight, strikethrough, subscript, superscript, bullet/numbered/task lists, code blocks, math, decorative dividers

Keyboard navigation: `↑↓` to move, `Enter` to insert, `Esc` to close.

---

### 🤖 AI Smart Templates (requires AI Provider)
Two AI-powered features accessible from the Formatting Palette or via commands:

**AI Smart Suggestion — `Ctrl+Shift+G`**
Reads the last 12 lines of context (or your selection) and suggests a single continuation — a callout, heading, checklist, or paragraph.

**AI Template Generator — `Ctrl+Shift+T`**
Describe what you want to create (e.g. "weekly meeting notes", "book review", "lesson plan") with optional extra instructions, and the AI generates a complete structured markdown template.

**Compatible providers:**
- **Ollama** (local, free) — auto-fetches your installed models from `/api/tags`
- **OpenAI** (gpt-4o-mini, gpt-4o…)
- **Custom** (any OpenAI-compatible endpoint: OpenRouter, Groq, Anthropic proxy…)

Configure in **Settings → Obsidian Toolkit → AI Provider**.

---

### 🖼 Image Control *(Reading View)*
Click any image to reveal a floating toolbar:

| Button | Action |
|--------|--------|
| `−` / `+` | Resize by 30px steps |
| `⬤← ⬤ →⬤` | Float left / center / float right |
| `↻` | Rotate 90° |
| `✎` | Add a caption |
| `⟲` | Reset to original size and position |
| `⎘` | Copy Obsidian markdown link with current width |
| `⤢` | Open in fullscreen lightbox |

The lightbox supports pan (drag), zoom (scroll wheel), and rotation.

**Special layouts** (add CSS classes to a div wrapping images in markdown):
- `.img-grid-2` / `.img-grid-3` / `.img-grid-4` — photo grid
- `.img-col` / `.img-col-right` — text + image column layout
- `.img-caption` — image with caption below

---

### ⛶ Fullscreen Note — `Ctrl+Shift+Z`
Floating fullscreen button on every note. Optionally enters fullscreen automatically after a configurable inactivity period (5–120 seconds), with a 3-second soft-hint and cancel button before switching.

---

### 🌳 Premium File Tree
Apple-style SF Symbols-inspired icons for every file type in the file explorer.

| Type | Icon |
|------|------|
| Folder (open/closed) | Custom SVG folder |
| Markdown | Document with M symbol |
| Canvas | Four-grid layout |
| PDF | Document with lines |
| Image | Photo frame with mountain |
| Video | Film frame |
| Audio | Waveform |
| Code | `</>` |
| Archive | Box |
| Link | Chain link |

Image files show a real 18×18px thumbnail in the tree. Row height is configurable: Compact / Default / Spacious.

---

### ⚡ Quick Access Bar
A persistent bar of pinned buttons above the file tree. Each button opens a specific note or folder with one click.

Add items from Settings → add the current file, the current folder, or any manual path.

---

### 📁 Folder Focus Mode
Right-click any folder → **"📁 Focus on this folder"** to make it the visual root of the sidebar — all other folders and files disappear, sub-folders start collapsed.

**Main Folders** (Settings → Folder Focus Mode): define a list of top-level folders that appear as tabs in a persistent bar above the tree. Click a tab → instant focus. Click again → return to full vault view.

> Note: Search, Graph View, and Quick Switcher (`Ctrl+O`) always cover the entire vault regardless of focus state.

---

## Installation

### From Obsidian Community Plugins *(recommended)*
1. Open Obsidian → Settings → Community Plugins → Browse
2. Search for **Obsidian Toolkit**
3. Install → Enable

### Manual installation
1. Download `main.js`, `styles.css`, and `manifest.json` from the [latest release](https://github.com/ahmdmusa/obsidian-toolkit/releases/latest)
2. Copy them to `<vault>/.obsidian/plugins/obsidian-toolkit/`
3. Reload Obsidian → Settings → Community Plugins → enable **Obsidian Toolkit**

---

## Settings overview

| Section | Key options |
|---------|-------------|
| 🎨 Formatting Palette | Enable / disable |
| 🖼 Image Control | Enable / disable (Reading View only) |
| ⛶ Fullscreen Note | Enable, auto-fullscreen toggle, inactivity timer |
| 🤖 AI Provider | Provider dropdown, model selector, API key, response language, system prompt |
| 🌳 Premium File Tree | Enable, image thumbnails toggle, row height |
| ⚡ Quick Access Bar | Enable, manage pinned items |
| 📁 Folder Focus Mode | Enable, manage main folder tabs |

---

## Keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+F` | Open Formatting Palette |
| `Ctrl+Shift+Z` | Toggle Fullscreen |
| `Ctrl+Shift+G` | AI Smart Suggestion |
| `Ctrl+Shift+T` | AI Template Generator |

---

## AI Provider setup (Ollama)

1. Install Ollama: [ollama.com](https://ollama.com)
2. Pull a model: `ollama pull qwen2.5:3b`
3. Run: `ollama serve`
4. In Obsidian settings: Provider = Ollama → click **Fetch models** → select your model → **Test Connection**

If you get a CORS error, start Ollama with:
```bash
OLLAMA_ORIGINS="app://obsidian.md*" ollama serve
```

---

## Compatibility

- Obsidian `0.15.0` or later
- Desktop and mobile (Image Control and Fullscreen are desktop-optimised)
- Works with any community theme

---

## License

MIT — see [LICENSE](LICENSE)
