// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log("Background received:", message);

//   if (message.type === "SAVE_MESSAGE") {
//     // In the future, you could persist this or forward it to popup.js
//     // For now, just echo back
//     sendResponse({ status: "Message stored", echo: message.data });
//   }

//   return true; // keeps the channel open for async responses
// });

let storedMessages = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Background received:", message);

  if (message.type === "SAVE_MESSAGE") {
    storedMessages.push(message.data);
    sendResponse({ status: "Message stored" });
  }

  if (message.type === "GET_MESSAGES") {
    sendResponse(storedMessages);
  }

  return true;
});
