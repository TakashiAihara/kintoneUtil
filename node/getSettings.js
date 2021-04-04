const fs = require('fs')

require('dotenv').config()
const { KintoneRestAPIClient } = require('@kintone/rest-api-client')

const appList = process.env.KINTONE_APP.split(',')
console.log(appList)

const client = new KintoneRestAPIClient({
  baseUrl: 'https://' + process.env.KINTONE_DOMAIN,
  auth: {
    username: process.env.KINTONE_USERNAME,
    password: process.env.KINTONE_PASSWORD
  }
})

const func = {

  /**
   * @param {string} appId
   */
  getFormFields: async function (appId) {
    return await client.app
      .getFormFields({ app: appId })
  },

  /**
   * @param {string} appId
   */
  getApp: async function (appId) {
    return await client.app
      .getApp({ id: appId })
  },

  /**
   * @param {string} appId
   */
  getAppAcl: async function (appId) {
    return await client.app
      .getAppAcl({ app: appId })
  },

  /**
   * @param {string} appId
   */
  getAppCustomize: async function (appId) {
    return await client.app
      .getAppCustomize({ app: appId })
  },

  /**
   * @param {string} appId
   */
  getFieldAcl: async function (appId) {
    return await client.app
      .getFieldAcl({ app: appId })
  },

  /**
   * @param {string} appId
   */
  getFormLayout: async function (appId) {
    return await client.app
      .getFormLayout({ app: appId })
  },

  /**
   * @param {string} appId
   */
  getProcessManagement: async function (appId) {
    return await client.app
      .getProcessManagement({ app: appId })
  },

  /**
   * @param {string} appId
   */
  getRecordAcl: async function (appId) {
    return await client.app
      .getRecordAcl({ app: appId })
  },

  /**
   * @param {string} appId
   */
  getViews: async function (appId) {
    return await client.app
      .getViews({ app: appId })
  },

  /**
   * @param {string} appId
   */
  getAppSettings: async function (appId) {
    return await client.app
      .getAppSettings({ app: appId })
  }
};

(async () => {
  await Promise.all(appList.map(async appId => {
    const data = await func.getApp(appId)
    const appName = data.name
    if (!(await fs.existsSync(appName))) {
      await fs.mkdirSync(appName)
    }
    await Promise.all(Object.keys(func).map(async getFunction => {
      const resp = await func[getFunction](appId)
      await fs.promises.writeFile(`${appName}/${getFunction.replace(/^get/, '').toLowerCase()}.json`, JSON.stringify(resp, null, '  '))
    })
    )
  })
  )
})()
