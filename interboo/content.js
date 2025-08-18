console.log("[Interboo 👻] content.js injected");

function injectScriptFile(fileName) {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL(fileName);
  script.onload = () => script.remove();
  (document.head || document.documentElement).appendChild(script);
}

// Inject the script into the page context
injectScriptFile("page-inject.js");

// Listen for messages from page → extension
window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data?.type === "FROM_PAGE") {
    const editors = event.data.editors;
    console.log("[Interboo 👻] CodeMirror editor content:", editors);

    // Send to background → will overlay
    chrome.runtime.sendMessage(
      { type: "SAVE_MESSAGE", data: editors },
      (response) => {
        console.log("[Interboo 👻] Response from background:", response);
      }
    );
  }
});

// Listen for overlay display requests from background
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "DISPLAY_MESSAGE") {
    showOverlayMessage(msg.data);
  }
});

function showOverlayMessage(text) {
  const div = document.createElement("div");
  div.textContent = "[Interboo 👻] " + text;

  div.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(34, 34, 34, 0.9);
    color: #fff;
    padding: 8px 12px;
    border-radius: 6px;
    font-family: sans-serif;
    font-size: 14px;
    z-index: 999999;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  `;

  document.body.appendChild(div);

  // Fade out and remove after 3 seconds
  setTimeout(() => {
    div.style.transition = "opacity 0.5s";
    div.style.opacity = "0";
    setTimeout(() => div.remove(), 500);
  }, 1000);
}
