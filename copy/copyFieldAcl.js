copy(await kintone.api(kintone.api.url('/k/v1/field/acl', true), 'GET', { app: kintone.app.getId() }));
