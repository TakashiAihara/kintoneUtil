/*
  全ユーザーの所属組織とグループを出力する。
  各環境のkintoneコマンドが利用可能な画面で実行する。
*/

const promiseObject = {};

async function getUsers({ record = [], offset = 0 } = {}) {
  var userInfo = await kintone.api(kintone.api.url('/v1/users', true), 'GET', { offset: offset });
  if (userInfo.users.length === 100) {
    return userInfo.users.concat(await getUsers({ record: userInfo.users, offset: offset + 100 }));
  } else {
    return userInfo.users;
  }
}

async function getOrganizationsTitles({ code } = {}) {
  const api = '/v1/user/organizations';
  if (!promiseObject[`${api}${code}`]) {
    promiseObject[`${api}${code}`] = kintone.api(kintone.api.url(api, true), 'GET', { code: code });
  }
  var userInfo = await promiseObject[`${api}${code}`];
  return userInfo.organizationTitles;
}

async function getGroups({ code } = {}) {
  const api = '/v1/user/groups';
  if (!promiseObject[`${api}${code}`]) {
    promiseObject[`${api}${code}`] = kintone.api(kintone.api.url(api, true), 'GET', { code: code });
  }
  var userInfo = await promiseObject[`${api}${code}`];
  return userInfo.groups;
}

copy(await Promise.all((await getUsers())
  .map(async (user) => {
    var organizationTitles = await getOrganizationsTitles({ code: user.code });
    var groups = await getGroups({ code: user.code });
    return {
      user: { code: user.code, name: user.name },
      organizations: organizationTitles.map(organization => { return { code: organization.code, name: organization.name } }),
      groups: groups.map(group => { return { code: group.code, name: group.name } }),
    };
  }
  )
)

)
