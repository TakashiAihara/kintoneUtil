copy(await kintone.api(kintone.api.url('/k/v1/app/settings', true), 'GET', { app: kintone.app.getId() }));
