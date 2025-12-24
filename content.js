(() => {
  const SHORTS_PATH_REGEX = /^\/shorts\/.+/;

  /* ---------- 1. HARD BLOCK DIRECT /shorts URLs ---------- */
  function handleShortsURL() {
    if (SHORTS_PATH_REGEX.test(location.pathname)) {
      showBlockedModal();
      return true;
    }
    return false;
  }

  /* ---------- 2. REMOVE ALL SHORTS ELEMENTS ---------- */
  function removeShorts() {
    const selectors = [
      "ytd-rich-shelf-renderer[is-shorts]",
      "ytd-rich-section-renderer",
      "ytd-reel-shelf-renderer",
      'ytd-guide-entry-renderer a[href^="/shorts"]',
      'a[href^="/shorts"]',
      'ytd-mini-guide-entry-renderer a[href^="/shorts"]',
    ];

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.remove();
      });
    });
  }

  /* ---------- 3. MODAL FOR BLOCKED SHORTS ---------- */
  function showBlockedModal() {
    if (document.getElementById("__yt_shorts_blocked")) return;

    const inject = () => {
      if (!document.body) {
        requestAnimationFrame(inject);
        return;
      }

      document.documentElement.style.overflow = "hidden";

      const overlay = document.createElement("div");
      overlay.id = "__yt_shorts_blocked";
      overlay.style = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.85);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

      const box = document.createElement("div");
      box.style = `
      background: #111;
      padding: 20px;
      border-radius: 12px;
      text-align: center;
      position: relative;
    `;

      const img = document.createElement("img");
      img.src = chrome.runtime.getURL("blocked.gif");
      img.style = "max-width: 300px;";

      const close = document.createElement("button");
      close.textContent = "✕";
      close.style = `
      position: absolute;
      top: 8px;
      right: 10px;
      background: none;
      color: white;
      font-size: 20px;
      border: none;
      cursor: pointer;
    `;

      close.onclick = () => {
        document.documentElement.style.overflow = "";
        location.replace("https://www.youtube.com/");
      };

      box.append(close, img);
      overlay.appendChild(box);
      document.body.appendChild(overlay);
    };

    inject();
  }

  /* ---------- 4. OBSERVE SPA NAVIGATION ---------- */
  let lastPath = location.pathname;

  const observer = new MutationObserver(() => {
    if (location.pathname !== lastPath) {
      lastPath = location.pathname;
      if (handleShortsURL()) return;
    }
    removeShorts();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  /* ---------- INITIAL RUN ---------- */
  if (!handleShortsURL()) {
    removeShorts();
  }
})();
