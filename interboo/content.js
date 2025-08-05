console.log("[Interboo 👻] content.js injected");

function injectScriptFile(fileName) {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL(fileName); // this makes it load from your extension
  script.onload = () => script.remove(); // clean up after
  (document.head || document.documentElement).appendChild(script);
}

// Inject the script into the page context
injectScriptFile('page-inject.js');

// Listen for messages from page-injected script
window.addEventListener('message', event => {
  if (event.source !== window) return;
  if (event.data?.type === 'FROM_PAGE') {
    console.log('[Interboo 👻] CodeMirror editor content:', event.data.editors);
  }
});
