// uBlock Origin を使うとwindow.open();が動かない
// マイフィルターに設定してもだめだった
// https://jscompress.com/ でコンパイル
// javascript:(()=>{var a=prompt("MISSAV\u3067\u3001\u63A2\u3059");a&&window.open("https://missav.ai/ja/search/"+encodeURIComponent(a))})();
javascript:(()=>{
  var searchTerm = prompt("MISSAVで、探す");
  if (searchTerm) window.open("https://missav.ai/ja/search/" + encodeURIComponent(searchTerm));
})();
