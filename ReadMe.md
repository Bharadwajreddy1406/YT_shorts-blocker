# Block YouTube Shorts 

I built **Block YouTube Shorts** to solve a simple but frustrating problem:
when I open YouTube to study or work, **YouTube Shorts hijack my attention**.

This extension removes Shorts from normal YouTube usage and gently interrupts me if I try to open a Shorts link directly — helping me stay focused without blocking YouTube entirely.

---

## ✨ What this extension does

* Completely removes **YouTube Shorts** from:

  * Homepage
  * Search results
  * Feeds and recommendations
* If a Shorts link is opened directly (via paste or click):

  * Shows a blocking popup with a reminder
  * Redirects back to YouTube home
* Works automatically once installed
* Lightweight, fast, and privacy-friendly

---

## ❌ What it does NOT do

* It does **not** block normal YouTube videos
* It does **not** track users or collect any data
* It does **not** use any backend or external services
* It does **not** require unnecessary permissions

---

## 🧠 Why I built this

Many of us uninstall Instagram or other social apps during exams or focused work.
But YouTube remains essential for tutorials — and Shorts sneak in as a distraction.

Instead of blocking YouTube entirely, I chose a **selective, intent-based approach**:

* Normal YouTube → works as usual
* Shorts → removed or interrupted

This keeps YouTube useful without letting Shorts steal time.

---

## 🛠️ Tech overview

* Chrome Extension (Manifest V3)
* Content-script only (no background script)
* DOM manipulation + SPA route detection
* MutationObserver with performance throttling
* No external dependencies

---

## 🚀 How to try this extension locally

You can test this extension on your own machine in under a minute.

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Bharadwajreddy1406/YT_shorts-blocker.git
cd YT_shorts-blocker
```

---

### 2️⃣ Open Chrome Extensions page

* Open Chrome
* Go to:

  ```
  chrome://extensions
  ```
* Enable **Developer mode** (top right)

---

### 3️⃣ Load the extension

* Click **Load unpacked**
* Select the project folder (the one containing `manifest.json`)

The extension will now be active.

---

### 4️⃣ Test the behavior

* Open YouTube → Shorts should not appear
* Search for anything → Shorts won’t show up
* Paste a Shorts URL (e.g. `youtube.com/shorts/...`) → popup appears and redirects

---

## 🧩 Folder structure

```
block-yt-shorts/
├── manifest.json
├── content.js
├── blocked.gif
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
```

---

## 🔐 Privacy

I do **not** collect, store, or transmit any user data.

* No analytics
* No tracking
* No cookies
* No external API calls

Everything runs locally in the browser.

---

## 🧪 Current status

* ✅ Fully working on Chromium browsers (Chrome, Edge, Brave)
* 🕒 Firefox support planned
* 🕒 Chrome Web Store release in progress

---

## 🤝 Open to contributions

I’m **open to contributions**.

If you’d like to help, you can:

* Improve DOM detection robustness
* Add Firefox compatibility
* Add an optional ON/OFF toggle
* Improve UI/UX of the blocking popup
* Write tests or documentation

Feel free to:

* Open an issue
* Submit a pull request
* Suggest improvements

Thoughtful, minimal, and well-reasoned contributions are welcome.

---
