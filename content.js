/* ===================== UTILITIES ===================== */

let lastPath = window.location.pathname;
let scheduled = false;

/* ===================== SHORTS REMOVAL ===================== */

function removeShortsEverywhere() {
  // Remove Shorts shelf on homepage
  document.querySelectorAll("ytd-rich-section-renderer").forEach((section) => {
    if (section.innerText.toLowerCase().includes("shorts")) {
      section.remove();
    }
  });

  // Remove Shorts cards from feeds/search
  document
    .querySelectorAll('ytd-video-renderer a[href*="/shorts/"]')
    .forEach((link) => {
      const card = link.closest("ytd-video-renderer");
      if (card) card.remove();
    });

  // Disable remaining Shorts links safely
  document.querySelectorAll('a[href*="/shorts/"]').forEach((a) => {
    a.style.pointerEvents = "none";
    a.style.opacity = "0.5";
  });
}

/* ===================== BLOCKING POPUP ===================== */

function showBlockingPopup() {
  if (document.getElementById("yt-shorts-blocker-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "yt-shorts-blocker-overlay";
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = "rgba(0,0,0,0.85)";
  overlay.style.zIndex = "999999";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";

  const modal = document.createElement("div");
  modal.style.background = "#fff";
  modal.style.padding = "16px 18px 20px";
  modal.style.borderRadius = "14px";
  modal.style.textAlign = "center";
  modal.style.position = "relative";
  modal.style.maxWidth = "340px";
  modal.style.width = "90%";
  modal.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";

  /* ---------- CLOSE BUTTON (OUTSIDE IMAGE) ---------- */
  const closeBtn = document.createElement("button");
  closeBtn.innerText = "✖";
  closeBtn.setAttribute("aria-label", "Close and go to YouTube");
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "10px";
  closeBtn.style.right = "12px";
  closeBtn.style.border = "none";
  closeBtn.style.background = "transparent";
  closeBtn.style.fontSize = "18px";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.color = "#666";

  closeBtn.onclick = () => {
    window.location.href = "https://www.youtube.com/";
  };

  /* ---------- GIF CONTAINER ---------- */
  const gifWrapper = document.createElement("div");
  gifWrapper.style.marginTop = "10px";
  gifWrapper.style.padding = "12px";
  gifWrapper.style.borderRadius = "12px";
  gifWrapper.style.background = "#f5f5f5";

  const gif = document.createElement("img");
  gif.src = chrome.runtime.getURL("blocked.gif");
  gif.alt = "Blocked";
  gif.style.width = "100%";
  gif.style.borderRadius = "8px";
  gif.style.display = "block";

  gifWrapper.appendChild(gif);

  /* ---------- TEXT ---------- */
  const text = document.createElement("p");
  text.innerText = "Shorts are blocked. Stay focused.";
  text.style.marginTop = "14px";
  text.style.fontSize = "14px";
  text.style.color = "#444";

  modal.appendChild(closeBtn);
  modal.appendChild(gifWrapper);
  modal.appendChild(text);
  overlay.appendChild(modal);

  overlay.addEventListener("click", (e) => e.stopPropagation());
  document.body.appendChild(overlay);
}

/* ===================== ROUTE HANDLING ===================== */

function handleRouteChange() {
  if (window.location.pathname.startsWith("/shorts")) {
    showBlockingPopup();
  } else {
    removeShortsEverywhere();
  }
}

/* ===================== INITIAL RUN ===================== */

handleRouteChange();

/* ===================== SPA OBSERVER ===================== */

const observer = new MutationObserver(() => {
  if (scheduled) return;
  scheduled = true;

  requestAnimationFrame(() => {
    scheduled = false;

    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname;
      handleRouteChange();
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
