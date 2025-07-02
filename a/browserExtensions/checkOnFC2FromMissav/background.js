// 拡張機能のインストール時にメニューを作成
chrome.runtime.onInstalled.addListener(() => {
  // リンクに対するコンテキストメニュー
  chrome.contextMenus.create({
    id: "check-on-FC2-from-missav",
    title: "pageURLをFC2で、かくにんする",
    contexts: ["page"],
    documentUrlPatterns: ["https://missav.ai/*"],
    icons: {
      "128": "icons/fc2_128.png"
    }
  });
});

// メニューがクリックされた時の処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.tabs.create({
    openerTabId: tab.id,
    url: "https://adult.contents.fc2.com/article/" + info.pageUrl.split('/').pop().replace("FC2-PPV-", "") + "/",
    active: false
  });
});
