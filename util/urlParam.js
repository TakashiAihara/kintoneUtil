/**
 * @description vparamsオブジェクトからkintoneに対応したURLパラメータを作成する関数
 * @params {*} URLパラメータ
 * @returns エンコードされたURLパラメータ文字列。例:?app=45&query=order%20by%20%24id%20asc%20limit%20500%20offset%20500&fields[0]=%24id
 */
function urlParam({ ...params } = {}) {
  return !(Object.entries(params).length)
    ? ''
    : '?' + Object.keys(params).map((k) => {
      if (Array.isArray(params[k])) {
        return params[k].map((f, idx) => {
          return `${encodeURIComponent(k)}[${idx}]=${encodeURIComponent(f)}`;
        }).join('&');
      } else {
        return `${encodeURIComponent(k)}=${encodeUggRIComponent(params[k])}`;
      }
    }).join('&');
}
