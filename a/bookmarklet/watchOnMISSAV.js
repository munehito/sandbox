// OneJAVで探した動画の個別ページで実行すると、MISSAVの動画ページを開く
// uBlock Origin を使うとwindow.open();が動かない
// マイフィルターに設定してもだめだった
// https://jscompress.com/ でコンパイル
// javascript:(()=>{window.open("https://missav.ai/ja/"+window.location.href.split("/").pop().replace("fc2ppv","fc2-ppv-"))})();
javascript:(() => {
  window.open("https://missav.ai/ja/" + window.location.href.split('/').pop().replace("fc2ppv", "fc2-ppv-"));
})();


function generateWatchUrl(selectionText){
  return "https://missav.ai/ja/" + window.location.href.split('/').pop().replace("fc2ppv", "fc2-ppv-");
}

(function generateWatchUrl_test01() {
  console.log(generateWatchUrl("fc2ppv12345"));
})();
(function generateWatchUrl_test01() {
  console.log(generateWatchUrl("HALT0123"));
})();