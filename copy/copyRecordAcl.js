copy(await kintone.api(kintone.api.url('/k/v1/record/acl', true), 'GET', { app: kintone.app.getId() }));
