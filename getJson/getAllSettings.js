// 全設定取得JS
// 各環境のアプリ管理画面で実行すること。
// エラーになる場合は、アプリ名が異なる可能性がある。

const appTitleList = [];

const appObj = appTitleList.map((e) => {
  return {
    id: $x(`//*[td/*[text()="${e}"]]`)[0].firstElementChild.textContent,
    name: e,
  };
});

function downloadJson(fileName, json) {
  const data = JSON.stringify(json, null, 4);
  const link = document.createElement('a');
  link.href = 'data:text/plain,' + encodeURIComponent(data);
  link.download = fileName;
  link.click();
}

for (v of appObj) {
  downloadJson(
    `${v.name}_${location.hostname.split('.')[0]}_フィールドの一覧.json`,
    await kintone.api(kintone.api.url('/k/v1/app/form/fields', true), 'GET', { app: v.id })
  );
  downloadJson(
    `${v.name}_${location.hostname.split('.')[0]}_フォームのレイアウト.json`,
    await kintone.api(kintone.api.url('/k/v1/app/form/layout', true), 'GET', { app: v.id })
  );
  downloadJson(
    `${v.name}_${location.hostname.split('.')[0]}_一覧の設定.json`,
    await kintone.api(kintone.api.url('/k/v1/app/views', true), 'GET', { app: v.id })
  );
  downloadJson(
    `${v.name}_${location.hostname.split('.')[0]}_アプリ情報.json`,
    await kintone.api(kintone.api.url('/k/v1/app', true), 'GET', { id: v.id })
  );
  downloadJson(
    `${v.name}_${location.hostname.split('.')[0]}_一般設定.json`,
    await kintone.api(kintone.api.url('/k/v1/app/settings', true), 'GET', { app: v.id })
  );
  downloadJson(
    `${v.name}_${location.hostname.split('.')[0]}_プロセス管理の設定.json`,
    await kintone.api(kintone.api.url('/k/v1/app/status', true), 'GET', { app: v.id })
  );
  downloadJson(
    `${v.name}_${location.hostname.split('.')[0]}_JavaScript / CSS.json`,
    await kintone.api(kintone.api.url('/k/v1/app/customize', true), 'GET', { app: v.id })
  );
  downloadJson(
    `${v.name}_${location.hostname.split('.')[0]}_アプリのアクセス権.json`,
    await kintone.api(kintone.api.url('/k/v1/app/acl', true), 'GET', { app: v.id })
  );
  downloadJson(
    `${v.name}_${location.hostname.split('.')[0]}_レコードのアクセス権.json`,
    await kintone.api(kintone.api.url('/k/v1/record/acl', true), 'GET', { app: v.id })
  );
  downloadJson(
    `${v.name}_${location.hostname.split('.')[0]}_フィールドのアクセス権.json`,
    await kintone.api(kintone.api.url('/k/v1/field/acl', true), 'GET', { app: v.id })
  );
  downloadJson(
    `${v.name}_${location.hostname.split('.')[0]}_フォーム設計情報.json`,
    await kintone.api(kintone.api.url('/k/v1/form', true), 'GET', { app: v.id })
  );
}
