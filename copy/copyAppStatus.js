copy(await kintone.api(kintone.api.url('/k/v1/app/status', true), 'GET', { app: kintone.app.getId() }));
