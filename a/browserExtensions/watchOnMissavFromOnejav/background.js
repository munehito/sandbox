// 拡張機能のインストール時にメニューを作成
chrome.runtime.onInstalled.addListener(() => {
  // リンクに対するコンテキストメニュー
  chrome.contextMenus.create({
    id: "watch-on-MissAV-from-onejav",
    title: "linkTextをMissAVで、みる",
    contexts: ["link"],  // リンクのみに表示
    targetUrlPatterns: ["https://onejav.com/*"],
    icons: {
      "16": "icons/missav_16.png"
    }
  });
});

// メニューがクリックされた時の処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.tabs.create({
    openerTabId: tab.id,
    url: "https://missav.ai/ja/" + info.linkText.replace("FC2PPV", "FC2-PPV-"),
    active: false
  });
});
