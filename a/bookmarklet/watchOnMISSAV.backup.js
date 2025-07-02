// OneJAVで探した動画のIDを選択して実行すると、MISSAVの動画ページを開く
// https://jscompress.com/ でコンパイル
// const で定義すると複数回実行した時に前と同じページが開かれるっぽい
// javascript:(()=>{let a=document.selection?document.selection.createRange().text:document.getSelection().toString();a&&window.open("https://missav.ai/ja/"+a.match(/[A-Z,-]+[0-9]+/)[0].replace("FC2PPV","FC2-PPV-"))})();
javascript:(() =>{
  let selectionText = document.selection
    ? document.selection.createRange().text
    : document.getSelection().toString();
  if (selectionText) window.open("https://missav.ai/ja/" + selectionText.match(/[A-Z,FC2PPV]+[0-9]+/)[0].replace("FC2PPV", "FC2-PPV-"));
})();


function generateWatchUrl(selectionText){
  return "https://missav.ai/ja/" + selectionText.match(/[A-Z,,FC2PPV]+[0-9]+/)[0].replace("FC2PPV", "FC2-PPV-"));
}

(function generateWatchUrl_test01() {
  console.log(generateWatchUrl("FC2PPV12345"));
  console.log(generateWatchUrl(" FC2PPV12345"));
  console.log(generateWatchUrl("FC2PPV12345 "));
})();
(function generateWatchUrl_test01() {
  console.log(generateWatchUrl("HALT0123"));
  console.log(generateWatchUrl(" HALT0123"));
  console.log(generateWatchUrl("HALT0123 9"));
})();