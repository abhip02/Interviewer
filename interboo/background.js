let storedMessages = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("[Interboo 👻 background] received:", message);

  if (message.type === "SAVE_MESSAGE") {
    // Store the message (optional)
    storedMessages.push(message.data);

    // Forward message to active tab to display
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: "DISPLAY_MESSAGE",
          data: message.data
        });
      }
    });

    sendResponse({ status: "Message stored" });
  }

  if (message.type === "GET_MESSAGES") {
    sendResponse(storedMessages);
  }

  return true; // Keep channel open for async responses
});
