// アプリ管理画面での複数アプリ全設定取得JS
// エラーになる場合は、アプリIDが異なるか、権限が無い可能性がある。

// アプリID（複数）
const appTitleList = [
  1,
  2,
  3
];

const appObj = appTitleList.map((id) => {
  return {
    id: id,
    name: $x(`//*[td[text()="${id}"]]/td[2]/a/text()`)[0].textContent
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
    `${v.name}_${location.hostname.split('.')[0]}_app_form_fields.json`,
    await kintone.api(kintone.api.url('/k/v1/app/form/fields', true), 'GET', { app: v.id })
  );
  downloadJson(
    `${v.name}_${location.hostname.split('.')[0]}_app_form_layout.json`,
    await kintone.api(kintone.api.url('/k/v1/app/form/layout', true), 'GET', { app: v.id })
  );
  downloadJson(
    `${v.name}_${location.hostname.split('.')[0]}_app_views.json`,
    await kintone.api(kintone.api.url('/k/v1/app/views', true), 'GET', { app: v.id })
  );
  downloadJson(
    `${v.name}_${location.hostname.split('.')[0]}_app_settings.json`,
    await kintone.api(kintone.api.url('/k/v1/app/settings', true), 'GET', { app: v.id })
  );
  downloadJson(
    `${v.name}_${location.hostname.split('.')[0]}_app_status.json`,
    await kintone.api(kintone.api.url('/k/v1/app/status', true), 'GET', { app: v.id })
  );
  downloadJson(
    `${v.name}_${location.hostname.split('.')[0]}_app_customize.json`,
    await kintone.api(kintone.api.url('/k/v1/app/customize', true), 'GET', { app: v.id })
  );
  downloadJson(
    `${v.name}_${location.hostname.split('.')[0]}_app_acl.json`,
    await kintone.api(kintone.api.url('/k/v1/app/acl', true), 'GET', { app: v.id })
  );
  downloadJson(
    `${v.name}_${location.hostname.split('.')[0]}_record_acl.json`,
    await kintone.api(kintone.api.url('/k/v1/record/acl', true), 'GET', { app: v.id })
  );
  downloadJson(
    `${v.name}_${location.hostname.split('.')[0]}_field_acl.json`,
    await kintone.api(kintone.api.url('/k/v1/field/acl', true), 'GET', { app: v.id })
  );
  downloadJson(
    `${v.name}_${location.hostname.split('.')[0]}_form.json`,
    await kintone.api(kintone.api.url('/k/v1/form', true), 'GET', { app: v.id })
  );
}
