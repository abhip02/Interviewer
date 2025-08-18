console.log("[Interboo 👻] content.js injected");

function injectScriptFile(fileName) {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL(fileName);
  script.onload = () => script.remove();
  (document.head || document.documentElement).appendChild(script);
}

injectScriptFile('page-inject.js');

let overlay = document.createElement("div");
overlay.id = "interboo-overlay";
Object.assign(overlay.style, {
  position: "fixed",
  top: "10px",
  right: "10px",
  background: "rgba(0,0,0,0.8)",
  color: "white",
  padding: "10px",
  borderRadius: "8px",
  zIndex: "999999",
  maxWidth: "300px",
  fontFamily: "monospace",
  whiteSpace: "pre-wrap"
});
overlay.innerText = "Waiting for analysis…";
document.body.appendChild(overlay);

function fetchAnalysis() {
  window.postMessage({ type: "REQUEST_CODE" }, "*");
}

window.addEventListener("message", event => {
  if (event.source !== window) return;

  if (event.data?.type === "FROM_PAGE") {
    const editors = event.data.editors;

    fetch("http://localhost:8765", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ editors })
    })
      .then(res => res.json())
      .then(data => {
        overlay.innerText = data.analysis;
      })
      .catch(err => {
        overlay.innerText = "⚠️ Error contacting Python: " + err;
      });
  }
});

// Request analysis every 1 second
setInterval(fetchAnalysis, 1000);
