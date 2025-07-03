// OneJAVで探した動画のIDを選択して実行すると、torrentを検索する
// https://jscompress.com/ でコンパイル
// const で定義すると複数回実行した時に前と同じページが開かれるっぽい
// javascript:(()=>{let a=document.selection?document.selection.createRange().text:document.getSelection().toString(),b=a.match(/[A-Z,,FC2PPV]+[0-9]+/)[0],c=b.match(/[0-9]+$/)[0],d=b.replace(c,"");"FC2PPV"==d&&(d="FC2 PPV");let e="https://sukebei.nyaa.si/?f=0&c=0_0&q="+d+"+"+c;window.open(e)})();
javascript:(() => {
  let selectionText = document.selection
    ? document.selection.createRange().text
    : document.getSelection().toString();
  let trimmedText = selectionText.match(/[A-Z,,FC2PPV]+[0-9]+/)[0];
  let endDecimal = trimmedText.match(/[0-9]+$/)[0];
  let startText = trimmedText.replace(endDecimal, "");
  if (startText == "FC2PPV") startText = "FC2 PPV";
  let searchResultsUrl = "https://sukebei.nyaa.si/?f=0&c=0_0&q=" + startText + "+" + endDecimal;
  window.open(searchResultsUrl);
})();

// function 使うとちょっと遅い気がする
javascript:(function (){
  function getSelectionText(){
    return document.selection
      ? document.selection.createRange().text
      : document.getSelection().toString();
  }
  function generateSearchResultsUrl(selectionText){
    let trimmedText = selectionText.match(/[A-Z,,FC2PPV]+[0-9]+/)[0];
    let endDecimal = trimmedText.match(/[0-9]+$/)[0];
    let startText = trimmedText.replace(endDecimal, "");
    if (startText == "FC2PPV") startText = "FC2 PPV";
    return "https://sukebei.nyaa.si/?f=0&c=0_0&q=" + startText + "+" + endDecimal;
  }
  window.open(generateSearchResultsUrl(getSelectionText()));
})();

(function generateSearchResultsUrl_test01() {
  console.log(generateSearchResultsUrl("FC2PPV12345"));
  console.log(generateSearchResultsUrl(" FC2PPV12345"));
  console.log(generateSearchResultsUrl("FC2PPV12345 "));
})();
(function generateSearchResultsUrl_test01() {
  console.log(generateSearchResultsUrl("HALT0123"));
  console.log(generateSearchResultsUrl(" HALT0123"));
  console.log(generateSearchResultsUrl("HALT0123 "));
})();