chrome.runtime.onMessage.addListener((msg) => {
  if (msg.keyword) {
    showPopup(msg.keyword);
  }
});

function showPopup(keyword) {
  let old = document.getElementById("av01-highlight-popup");
  if (old) old.remove();

  let popup = document.createElement("div");
  popup.id = "av01-highlight-popup";
  Object.assign(popup.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "white",
    border: "1px solid #444",
    borderRadius: "8px",
    padding: "10px 14px",
    zIndex: 999999,
    boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
    fontFamily: "sans-serif",
    fontSize: "14px",
    color: "#222"
  });

  let text = document.createElement("div");
  text.textContent = `${keyword} を検索します`;
  popup.appendChild(text);

  let btn = document.createElement("button");
  btn.textContent = "OK";
  Object.assign(btn.style, {
    marginTop: "8px",
    padding: "4px 10px",
    border: "none",
    borderRadius: "4px",
    background: "#4CAF50",
    color: "white",
    cursor: "pointer"
  });
  btn.onmouseenter = () => (btn.style.background = "#45a049");
  btn.onmouseleave = () => (btn.style.background = "#4CAF50");

  btn.onclick = () => {
    popup.remove();
    highlightKeyword(keyword);
  };

  popup.appendChild(btn);
  document.body.appendChild(popup);
}

function highlightKeyword(kw) {
  let regex = new RegExp(kw, "gi");
  let found = false;

  function walk(node) {
    if (node.nodeType === 3) {
      let match = regex.exec(node.nodeValue);
      if (match) {
        let span = document.createElement("mark");
        span.style.background = "yellow";
        span.textContent = match[0];

        let after = node.splitText(match.index);
        after.nodeValue = after.nodeValue.substring(match[0].length);
        node.parentNode.insertBefore(span, after);

        if (!found) {
          span.scrollIntoView({ behavior: "smooth", block: "center" });
          found = true;
        }
      }
    } else if (node.nodeType === 1 && node.childNodes && !["SCRIPT","STYLE"].includes(node.tagName)) {
      for (let i = 0; i < node.childNodes.length; i++) {
        walk(node.childNodes[i]);
      }
    }
  }

  walk(document.body);
}
