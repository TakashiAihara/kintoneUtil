async function getUsers({ record = [], offset = 0 } = {}) {
  var userInfo = await kintone.api(kintone.api.url('/v1/users', true), 'GET', { offset: offset });
  if (userInfo.users.length === 100) {
    return userInfo.users.concat(await getUsers({ record: userInfo.users, offset: offset + 100 }));
  } else {
    return userInfo.users;
  }
}