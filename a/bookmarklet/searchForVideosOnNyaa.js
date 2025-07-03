// uBlock Origin を使うとwindow.open();が動かない
// マイフィルターに設定してもだめだった
// https://jscompress.com/ でコンパイル
// javascript:(()=>{var a=prompt("Nyaa\u3067\u3001\u52D5\u753B\u3092\u3001\u63A2\u3059");a&&window.open("https://sukebei.nyaa.si/?f=0&c=0_0&q="+encodeURIComponent(a)+"&s=seeders&o=desc")})();
javascript:(()=>{
  var searchTerm = prompt("Nyaaで、動画を、探す");
  if (searchTerm) window.open("https://sukebei.nyaa.si/?f=0&c=0_0&q=" + encodeURIComponent(searchTerm) + "&s=seeders&o=desc");
})();
