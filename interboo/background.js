chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SEND_CODE") {
    fetch("http://localhost:8765", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ editors: message.code })
    })
      .then((res) => res.json())
      .then((data) => {
        // send the analysis result back to content.js
        chrome.tabs.sendMessage(sender.tab.id, {
          type: "PYTHON_RESULT",
          result: data.analysis
        });
      })
      .catch((err) => console.error("Error talking to Python:", err));
  }
});
