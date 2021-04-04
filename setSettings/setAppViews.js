// view 変更を適用する
// アプリのレコード画面で実行する。

var views =
//  ================= ここに JSON 展開 =================
{
  views: {
    一覧: {
      type: 'LIST',
      name: '一覧',
      filterCond: '',
      sort: '',
      index: '1',
      fields: [
        'レコード番号'
      ]
    }
  }
};

await kintone.api(kintone.api.url('/k/v1/preview/app/views', true), 'PUT', {
  app: kintone.app.getId(),
  views: views.views
});
console.log("applied to preview.")

// deploy
await kintone.api(kintone.api.url('/k/v1/preview/app/deploy', true), 'POST', {
  apps: [
    {
      app: kintone.app.getId()
    }
  ]
});

console.log("deployed.")
