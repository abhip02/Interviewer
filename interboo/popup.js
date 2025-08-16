chrome.runtime.sendMessage({ type: "GET_MESSAGES" }, (messages) => {
  const ul = document.getElementById("messages");
  ul.innerHTML = "";
  messages.forEach(msg => {
    const li = document.createElement("li");
    li.textContent = msg;
    ul.appendChild(li);
  });
});
