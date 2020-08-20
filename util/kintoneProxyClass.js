// var apis = [
// '/k/v1/app',
// '/k/v1/app/acl',
// '/k/v1/app/customize',
// '/k/v1/app/form/fields',
// '/k/v1/app/form/layout',
// '/k/v1/app/settings',
// '/k/v1/app/status',
// '/k/v1/app/views',
// '/k/v1/apps',
// '/k/v1/bulkRequest',
// '/k/v1/field/acl',
// '/k/v1/file',
// '/k/v1/form',
// '/k/v1/guests',
// '/k/v1/preview/app',
// '/k/v1/preview/app/acl',
// '/k/v1/preview/app/customize',
// '/k/v1/preview/app/deploy',
// '/k/v1/preview/app/form/fields',
// '/k/v1/preview/app/form/layout',
// '/k/v1/preview/app/settings',
// '/k/v1/preview/app/status',
// '/k/v1/preview/app/views',
// '/k/v1/preview/field/acl',
// '/k/v1/preview/form',
// '/k/v1/preview/record/acl',
// '/k/v1/record',
// '/k/v1/record/acl',
// '/k/v1/record/assignees',
// '/k/v1/record/comment',
// '/k/v1/record/comments',
// '/k/v1/record/status',
// '/k/v1/records',
// '/k/v1/records/acl/evaluate',
// '/k/v1/records/cursor',
// '/k/v1/records/status',
// '/k/v1/space',
// '/k/v1/space/body',
// '/k/v1/space/guests',
// '/k/v1/space/members',
// '/k/v1/space/thread',
// '/k/v1/space/thread/comment',
// '/k/v1/template/space'
// ];

window.kintoneProxy = {
  get: async function ({ api, update = false, opt }) {
    if (update || !(api in this)) {
      this[api] = await kintone.api(kintone.api.url(api, true), 'GET', opt);
    }
    return this[api];
  }
};