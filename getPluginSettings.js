// プラグイン設定取得JS
// アプリ一覧画面や詳細画面で利用する。
// フィールド固定検索、標準機能アイコン抑止のIDを使用している。

function c (f, j) {
  const u = JSON.stringify(j, null, 4)
  const l = document.createElement('a')
  l.href = 'data:text/plain,' + encodeURIComponent(u)
  l.download = f
  l.click()
};
const a = $x('//*[@class="gaia-argoui-app-titlebar-content"]/@title')[0].value
c(`${a}_${location.hostname.split('.')[0]}_フィールド固定検索.json`, kintone.plugin.app.getConfig('ccacbpbmhhkocicceoadmcgfbljfnjne'))
c(`${a}_${location.hostname.split('.')[0]}_標準機能アイコン抑止.json`, kintone.plugin.app.getConfig('iihalnfghihmkcngenkdmlndfgcikkfh'))
