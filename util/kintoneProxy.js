var proxyObject = {};
/** APIコールの仲介をするPromiseオブジェクト。
 *  データ格納済みの場合はAPIコールをしない。
 */
var proxy = new Proxy(proxyObject, {
  get(target, prop) {
    return new Promise((resolve, reject) => {
      if (prop in target) {
        resolve(target[prop]);
      } else {
        switch (prop) {
          // 前後1年の休館日
          case 'loginUserGroupsPromise': {
            // TODO 例外処理
            kintone
              .api(kintone.api.url('/v1/user/groups', true), 'GET', { code: kintone.getLoginUser().code })
              .then((resp) => {
                Reflect.set(target, prop, resp);
                resolve(target[prop]);
              }) // TODO エラー処理
              .catch((error) => {
                console.log(error);
              });

            break;
          }

          // 前後1年の休館日
          case 'latestClosingDayPromise': {
          // TODO 例外処理
            kintone
              .api(kintone.api.url('/k/v1/records', true), 'GET', {
                app: window.reservation.appId.closingDayMasterApp,
                query: `日付 >= "${moment().subtract(1, 'years').format('YYYY-MM-DD')}"
                  and 日付 <= "${moment().add(1, 'years').format('YYYY-MM-DD')}"
                  order by $id limit 100`.replace(/[\n ]+/g, ' '), // クエリURLが長くなるのでtrim,
                fields: ['日付']
              })
              .then((resp) => {
                Reflect.set(target, prop, resp);
                resolve(target[prop]);
              }) // TODO エラー処理
              .catch((error) => {
                console.log(error);
              });

            break;
          }

          // 1年以内の休館日
          case 'withinYearClosingDayPromise': {
            // TODO 例外処理
            kintone
              .api(kintone.api.url('/k/v1/records', true), 'GET', {
                app: window.reservation.appId.closingDayMasterApp,
                query: `日付 >= "${moment().format('YYYY-MM-DD')}"
                  and 日付 <= "${moment().add(1, 'years').format('YYYY-MM-DD')}"
                  order by $id limit 100`.replace(/[\n ]+/g, ' '), // クエリURLが長くなるのでtrim,
                fields: ['日付']
              })
              .then((resp) => {
                Reflect.set(target, prop, resp);
                resolve(target[prop]);
              }) // TODO エラー処理
              .catch((error) => {
                console.log(error);
              });

            break;
          }

          default: {
            resolve(target[prop]);
            break;
          }
        }
      }
    });
    async function loginUserGroupsFunction(event) {
      var loginUserGroups = await proxy.loginUserGroupsPromise;
      return event;
    }
  }
});
