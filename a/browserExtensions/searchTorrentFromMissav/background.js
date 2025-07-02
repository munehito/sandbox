// 拡張機能のインストール時にメニューを作成
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "search-torrent-from-missav",
    title: "pageURLからtorrentを、さがす",
    contexts: ["page"],
    documentUrlPatterns: ["https://missav.ai/*"],
    icons: {
      "16": "icons/nyaa_16.png"
    }
  });
});

// メニューがクリックされた時の処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
  let searchResultsUrl = "https://sukebei.nyaa.si/?f=0&c=0_0&q=" + info.pageUrl.split('/').pop().replace(/-/g, '+') + "&s=seeders&o=desc"
  chrome.tabs.create({
    openerTabId: tab.id,
    url: searchResultsUrl,
    active: true
  });
});
