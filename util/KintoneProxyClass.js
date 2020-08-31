// TODO TotalCountを利用した並行非同期通信の実装
/**
 * @description APIのGETを仲介するクラス。並列取得、同一API通信の更新の有無を管理する
 */
window.KintoneProxyClass = {
  getPromise: async function ({ api, update = false, opt } = {}) {
    if (update || !(jsonStableStringify({ api, ...opt }) in this)) {
      this[jsonStableStringify({ api, ...opt })] = await kintone.api(
        kintone.api.url(api, true),
        'GET',
        { ...opt });
    }
    return this[jsonStableStringify({ api, ...opt })];
  },
  getLoginUserGroupsPromise: async function ({ api = '/v1/user/groups', update = false, opt } = {}) {
    return await this.getPromise({
      api,
      update,
      opt: {
        code: kintone.getLoginUser().code,
        ...opt
      }
    });
  },
  getStringPromise: async function ({ api = '/k/v1/records', update = false, opt } = {}) {
    return await this.getPromise({
      api,
      update,
      opt: {
        app: window.reservation.appId.closingDayMasterApp,
        query: `文字列 = "test"
                  order by $id limit 100`
          .replace(/[\n ]+/g, ' '), // クエリURLが長くなるのでtrim,
        fields: ['日付'],
        ...opt
      }
    });
  },
  getViewsInformationPromise: async function ({ api = '/k/v1/app/views', update = false, opt } = {}) {
    return await this.getPromise({
      api,
      update,
      opt: {
        app: kintone.app.getId(),
        ...opt
      }
    });
  }
};

/**
 * @description Object をキー名順にソートしてStringifyする関数
 * @author https://github.com/substack/json-stable-stringify
 * @param {*} data
 * @param {*} opts
 */
function jsonStableStringify(data, opts = {}) {
  if (typeof opts === 'function') opts = { cmp: opts };
  var cycles = (typeof opts.cycles === 'boolean') ? opts.cycles : false;

  var cmp = opts.cmp && (function (f) {
    return function (node) {
      return function (a, b) {
        var aObj = { key: a, value: node[a] };
        var bObj = { key: b, value: node[b] };
        return f(aObj, bObj);
      };
    };
  })(opts.cmp);

  var seen = [];
  return (function stringify (node) {
    if (node && node.toJSON && typeof node.toJSON === 'function') {
      node = node.toJSON();
    }

    if (node === undefined) return;
    if (typeof node === 'number') return isFinite(node) ? '' + node : 'null';
    if (typeof node !== 'object') return JSON.stringify(node);

    var i, out;
    if (Array.isArray(node)) {
      out = '[';
      for (i = 0; i < node.length; i++) {
        if (i) out += ',';
        out += stringify(node[i]) || 'null';
      }
      return out + ']';
    }

    if (node === null) return 'null';

    if (seen.indexOf(node) !== -1) {
      if (cycles) return JSON.stringify('__cycle__');
      throw new TypeError('Converting circular structure to JSON');
    }

    var seenIndex = seen.push(node) - 1;
    var keys = Object.keys(node).sort(cmp && cmp(node));
    out = '';
    for (i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = stringify(node[key]);

      if (!value) continue;
      if (out) out += ',';
      out += JSON.stringify(key) + ':' + value;
    }
    seen.splice(seenIndex, 1);
    return '{' + out + '}';
  })(data);
}
