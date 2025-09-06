// 拡張機能のインストール時にメニューを作成
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "search-av01-from-missav",
    title: "pageURLをAV01で、さがす",
    contexts: ["page"],
    documentUrlPatterns: ["https://missav.ai/*"],
    icons: {
      "16": "icons/av01_16.png"
    }
  });
});

// メニューがクリックされた時の処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
  let searchResultsUrl = "https://www.av01.tv/jp/search?q=" + info.pageUrl.split('/').filter(Boolean).pop().replace(/-/g, '+');
  chrome.tabs.create({
    openerTabId: tab.id,
    url: searchResultsUrl,
    active: true
  });
});
