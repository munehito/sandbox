// 拡張機能のインストール時にメニューを作成
chrome.runtime.onInstalled.addListener(() => {
  // リンクに対するコンテキストメニュー
  chrome.contextMenus.create({
    id: "watch-on-AV01-from-fc2",
    title: "linkURLをAV01で、みる",
    contexts: ["link"],  // リンクのみに表示
    targetUrlPatterns: ["https://adult.contents.fc2.com/article*"],
    icons: {
      "16": "icons/av01_16.png"
    }
  });
});

// メニューがクリックされた時の処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
  let url = "https://www.av01.tv/jp/search?q=fc2-ppv-" +
    info.linkUrl
      .replace("https://adult.contents.fc2.com/article_search.php?id=", "")
      .replace("https://adult.contents.fc2.com/article/", "")
      .replace("/", "");
  chrome.tabs.create({
    openerTabId: tab.id,
    url: url,
    active: false
  });
});
