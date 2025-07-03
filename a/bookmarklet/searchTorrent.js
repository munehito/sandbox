// MISSAVを見ているときに、見ている動画のtorrentを検索ページを開く
// uBlock Origin を使うとwindow.open();が動かない
// マイフィルターに設定してもだめだった
// https://jscompress.com/ でコンパイル
// javascript:(()=>{window.open("https://sukebei.nyaa.si/?f=0&c=0_0&q="+window.location.href.split("/").pop().replace(/-/g,"+")+"&s=seeders&o=desc")})();
javascript:(() => {
  window.open("https://sukebei.nyaa.si/?f=0&c=0_0&q=" + window.location.href.split('/').pop().replace(/-/g, '+') + "&s=seeders&o=desc");
})();


function generateSearchResultsUrl(selectionText){
  return "https://sukebei.nyaa.si/?f=0&c=0_0&q=" + window.location.href.split('/').pop().replace(/-/g, '+' + "&s=seeders&o=desc");
}
(function generateSearchResultsUrl_test01() {
  console.log(generateSearchResultsUrl("FC2-PPV-12345"));
  console.log(generateSearchResultsUrl(" FC2-PPV-12345"));
  console.log(generateSearchResultsUrl("FC2-PPV-12345 "));
})();
(function generateSearchResultsUrl_test01() {
  console.log(generateSearchResultsUrl("HALT0123"));
  console.log(generateSearchResultsUrl(" HALT0123"));
  console.log(generateSearchResultsUrl("HALT0123 "));
})();