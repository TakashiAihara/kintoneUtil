// アクセス権取得用JS
// 各環境のアプリ管理画面で実行すること。
// エラーになる場合は、アプリ名が異なる可能性がある。

const appTitleList = [
]

const appObj = appTitleList.map(e => {
  return {
    id: $x(`//*[td/*[text()="${e}"]]`)[0].firstElementChild.textContent,
    name: e
  }
})

function downloadJson (fileName, json) {
  const data = JSON.stringify(json, null, 4)
  const link = document.createElement('a')
  link.href = 'data:text/plain,' + encodeURIComponent(data)
  link.download = fileName
  link.click()
}

for (v of appObj) {
  const appRights = (await kintone.api(kintone.api.url('/k/v1/app/acl', true), 'GET', { app: v.id })).rights
  downloadJson(`${v.name}_${location.hostname.split('.')[0]}_アプリのアクセス権.json`, appRights)
  const recordRights = (await kintone.api(kintone.api.url('/k/v1/record/acl', true), 'GET', { app: v.id })).rights
  downloadJson(`${v.name}_${location.hostname.split('.')[0]}_レコードのアクセス権.json`, recordRights)
  const fieldRights = (await kintone.api(kintone.api.url('/k/v1/field/acl', true), 'GET', { app: v.id })).rights
  downloadJson(`${v.name}_${location.hostname.split('.')[0]}_フィールドのアクセス権.json`, fieldRights)
}
