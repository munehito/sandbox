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
  let parts = info.pageUrl.split('/').filter(Boolean).pop().split('-');
  let searchQuery = parts.join('+');
  let highlightWord = parts.pop() || '';

  let searchResultsUrl = "https://www.av01.tv/jp/search?q=" + searchQuery;

  chrome.tabs.create({
    openerTabId: tab.id,
    url: searchResultsUrl,
    active: true
  }, (newTab) => {
    chrome.tabs.onUpdated.addListener(function listener(tabId, infoUpdate) {
      if (tabId === newTab.id && infoUpdate.status === 'complete') {
        // content-script に highlightWord を送る
        chrome.tabs.sendMessage(newTab.id, { keyword: highlightWord });
        chrome.tabs.onUpdated.removeListener(listener);
      }
    });
  });
});