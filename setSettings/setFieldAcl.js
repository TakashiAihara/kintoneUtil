// field acl 変更を適用する
// アプリのレコード画面で実行する。

var rights =
//  ================= ここに JSON 展開 =================
{
  rights: [
  ]
}

await kintone.api(kintone.api.url('/k/v1/field/acl', true), 'PUT', {
  app: kintone.app.getId(),
  rights: rights
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
