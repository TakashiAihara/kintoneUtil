// TODO fields 対応
// 編集権限のあるAPIトークン
var API_TOKEN = '';

async function getFetch({ offset = 0, records = [] } = {}) {
  var result = await fetch(
    kintone.api.url('/k/v1/records', true) +
    urlParam({
      app: kintone.app.getId(),
      query: 'order by $id asc limit 500 offset ' + offset
    }),
    {
      method: 'get',
      headers: {
        'X-Cybozu-API-Token': API_TOKEN
      }
    }
  );

  var resp = JSON.parse(await result.text());

  if (resp.records.length === 500) {
    return resp.records.concat(await getFetch({ offset: offset + 500, records: records }));
  }
  return resp.records;
}

function offsetSlice({ array = [], offsetLimit = 100 }) {
  var resultArray = array.slice(0, offsetLimit);
  if (resultArray.length === offsetLimit) {
    return [resultArray].concat(offsetSlice({ array: array.slice(offsetLimit), offsetLimit }));
  }
  return [resultArray];
}

// get して 加工する
var records = (await getFetch()).map(e => {
  return {
    id: e.$id.value,
    record: {
      文字列: {
        value: e.組織選択.value.map((f) => f.name).join('・')
      }
    }
  };
});

// 100件 ずつにスライスして put する
offsetSlice({ array: records }).map(async (e) => {
  var result = await fetch(kintone.api.url('/k/v1/records', true), {
    method: 'put',
    body: JSON.stringify({
      app: kintone.app.getId(),
      records: e
    }),
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'X-Cybozu-API-Token': API_TOKEN
    }
  });
  console.log(await result.text());
});

function urlParam({ ...params } = {}) {
  return !(Object.entries(params).length)
    ? ''
    : '?' + Object.keys(params).map((k) => {
      if (Array.isArray(params[k])) {
        return params[k].map((f, idx) => {
          return `${encodeURIComponent(k)}[${idx}]=${encodeURIComponent(f)}`;
        }).join('&');
      } else {
        return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
      }
    }).join('&');
}
