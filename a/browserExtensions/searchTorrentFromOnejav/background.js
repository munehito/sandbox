// 拡張機能のインストール時にメニューを作成
chrome.runtime.onInstalled.addListener(() => {
  // リンクに対するコンテキストメニュー
  chrome.contextMenus.create({
    id: "search-torrent-from-onejav",
    title: "linkTextからtorrentを、さがす",
    contexts: ["link"],  // リンクのみに表示
    targetUrlPatterns: ["https://onejav.com/*"],
    icons: {
      "16": "icons/nyaa_16.png"
    }
  });
});

// メニューがクリックされた時の処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
  let endDecimal = info.linkText.match(/[0-9]+$/)[0];
  let startText = info.linkText.replace(endDecimal, "");
  if (startText == "FC2PPV") startText = "FC2 PPV";
  let searchResultsUrl = "https://sukebei.nyaa.si/?f=0&c=0_0&q=" + startText + "+" + endDecimal;
  chrome.tabs.create({
    openerTabId: tab.id,
    url: searchResultsUrl,
    active: false
  });
});
