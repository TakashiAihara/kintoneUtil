function getFetch({ offset = 0, records = [], fields = '' }) {
  var params = {
    app: kintone.app.getId(),
    query: 'order by $id asc limit 500 offset ' + offset,
    fields
  };
  return kintone.api(kintone.api.url('/k/v1/records', true), 'GET', params).then(function(resp) {
    records = records.concat(resp.records);
    if (resp.records.length === 500) {
      return getFetch({ offset: offset + 500, records: records });
    }
    return records;
  });
}

function offsetSlice({ array = [], offset = 100 }) {
  var resultArray = array.slice(0, 100);
  console.log(resultArray);
  if (resultArray.length === 100) {
    return [resultArray].concat(offsetSlice({ array: array.slice(100) }));
  }
  return [resultArray];
}

var records = (await getFetch({ fields: ['$id', '文字列フィールド1'] })).map(e => {
  return {
    id: e.$id.value,
    record: {
      文字列フィールド2: {
        value: e.文字列フィールド1.value.map(f => f.name).join('・')
      }
    }
  };
});

console.log(records);

offsetSlice({ array: records }).map(async (e) => {
  var result = await fetch(kintone.api.url('/k/v1/records', true), {
    method: 'put',
    body: JSON.stringify(
      {
        app: kintone.app.getId(),
        records: e
      }
    ),
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'X-Cybozu-API-Token': ''
    }
  });

  console.log(await result.text());
});