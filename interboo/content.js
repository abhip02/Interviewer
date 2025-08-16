console.log("[Interboo 👻] content.js injected");

function injectScriptFile(fileName) {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL(fileName); // this makes it load from your extension
  script.onload = () => script.remove(); // clean up after
  (document.head || document.documentElement).appendChild(script);
}

// Inject the script into the page context
injectScriptFile('page-inject.js');

window.addEventListener('message', event => {
  if (event.source !== window) return;
  if (event.data?.type === 'FROM_PAGE') {
    const editors = event.data.editors;
    console.log('[Interboo 👻] CodeMirror editor content:', editors);

    // Send code to local Python server
    fetch('http://localhost:8765', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ editors })
    }).catch(err => console.warn("Failed to send to local server:", err));
  }
});

// Example: send a test message once the page loads
chrome.runtime.sendMessage(
  { type: "SAVE_MESSAGE", data: "Abhi says hi" },
  (response) => {
    console.log("Response from background:", response);
  }
);
