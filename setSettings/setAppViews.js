// viwsにはviews:{}以下のものを追記する
// 例：一覧: {},自分が作業者:{}
var views = {};

await kintone.api(kintone.api.url('/k/v1/preview/app/views', true), 'PUT', {
  app: kintone.app.getId(),
  views,
});

// deploy
await kintone.api(kintone.api.url('/k/v1/preview/app/deploy', true), 'POST', {
  apps: [
    {
      app: kintone.app.getId(),
    },
  ],
});
