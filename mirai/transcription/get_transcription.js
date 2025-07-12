javascript: (function () {
  const infoContainer = document.querySelector('yt-formatted-string#info.style-scope.ytd-watch-info-text');
  const deliveryDateElement = infoContainer?.querySelectorAll('span')[2];

  const titleContainer = document.getElementById('title');
  const titleElement = titleContainer?.querySelector('h1 yt-formatted-string');

  if (!titleElement) {
    alert('タイトル要素が見つかりませんでした');
    return;
  }

  const videoInfo = {
    "title": titleElement.textContent,
    "url": window.location.href,
    "video_id": new URL(window.location.href).searchParams.get('v') || '',
    "transcript": {}
  };

  const container = document.getElementById('segments-container');

  if (container) {
    container.querySelectorAll('ytd-transcript-segment-renderer').forEach(e => {
      const time = e.querySelector('.segment-timestamp')?.textContent.trim() || '時間不明';
      const content = e.querySelector('.segment-text')?.textContent.trim() || '内容なし';
      videoInfo.transcript[time] = content;
    });

    if (Object.keys(videoInfo.transcript).length > 0) {
      navigator.clipboard.writeText(JSON.stringify(videoInfo, null, 2))
        .then(() => alert('文字起こしをクリップボードにコピーしました！\n' + JSON.stringify(videoInfo, null, 2)))
        .catch(() => prompt('自動コピーに失敗しました。以下を手動でコピーしてください:', JSON.stringify(videoInfo, null, 2)));
    } else {
      alert('文字起こしデータが見つかりませんでした');
    }
  } else {
    alert('文字起こしパネルが開いていません。先に文字起こしを表示してください');
  }
})();