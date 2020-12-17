// 閲覧中のアプリからすべてのレコードを取得する。
// records変数にすべて格納される。

var records = [];
var offset = 0;
while (true) {
  var resp = (await kintone.api(kintone.api.url('/k/v1/records', true), 'GET', {
    app: kintone.app.getId(),
    totalCount: true,
    query: 'limit 500 offset ' + offset
  }));
  records = records.concat(resp.records);
  if (records.length === resp.totalCount) break;
  offset = records.length;
}