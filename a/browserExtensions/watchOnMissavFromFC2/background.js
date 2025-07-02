// 拡張機能のインストール時にメニューを作成
chrome.runtime.onInstalled.addListener(() => {
  // リンクに対するコンテキストメニュー
  chrome.contextMenus.create({
    id: "watch-on-MissAV-from-fc2",
    title: "linkURLをMISSAVで、みる",
    contexts: ["link"],  // リンクのみに表示
    targetUrlPatterns: ["https://adult.contents.fc2.com/article*"],
    icons: {
      "16": "icons/missav_16.png"
    }
  });
});

// メニューがクリックされた時の処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
  let url = "https://missav.ai/ja/FC2-PPV-" +
    info.linkUrl
      .replace("https://adult.contents.fc2.com/article_search.php?id=", "")
      .replace("https://adult.contents.fc2.com/article/", "");
  chrome.tabs.create({
    openerTabId: tab.id,
    url: url,
    active: false
  });
});
