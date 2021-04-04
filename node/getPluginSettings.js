const rimraf = require('rimraf')
const puppeteer = require('puppeteer')
const USER_DATA_DIR_WSL = 'temp'

const fs = require('fs')

require('dotenv').config()
const { KintoneRestAPIClient } = require('@kintone/rest-api-client')

const client = new KintoneRestAPIClient({
  baseUrl: 'https://' + process.env.KINTONE_DOMAIN,
  auth: {
    username: process.env.KINTONE_USERNAME,
    password: process.env.KINTONE_PASSWORD
  }
})

const Domain = process.env.KINTONE_DOMAIN
const AppId = process.env.KINTONE_MAIN_APP

const UserName = process.env.KINTONE_USERNAME
const Password = process.env.KINTONE_PASSWORD

const UserNameXpath = '//*[@name="username"]'
const PasswordXpath = '//*[@name="password"]'
const LoginButtonXpath = '//input[@value="ログイン"]'

let browser
async function main () {
  try {
    if (!(await fs.existsSync(USER_DATA_DIR_WSL))) {
      await fs.mkdirSync(USER_DATA_DIR_WSL)
    }

    browser = await puppeteer.launch(
      {
        executablePath: 'chrome.exe',
        userDataDir: USER_DATA_DIR_WSL,
        headless: false,
        args: [
          '--disable-setuid-sandbox',
          '--no-sandbox', '--lang=ja'
        ]
      }
    )

    const page = await browser.newPage()

    await page.goto(`https://${Domain}/login?saml=off`)

    await page.waitForXPath(UserNameXpath)
    const UserNameHandleList = await page.$x(UserNameXpath)
    await UserNameHandleList[0].type(UserName)

    await page.waitForXPath(PasswordXpath)
    const PasswordHandleList = await page.$x(PasswordXpath)
    await PasswordHandleList[0].type(Password)

    await page.waitForXPath(LoginButtonXpath)
    const LoginHandleList = await page.$x(LoginButtonXpath)

    await LoginHandleList[0].click()
	  await sleep(1000)
    await page.goto(`https://${Domain}/k/${AppId}/`, { waitUntil: ['load', 'networkidle2'] })

    const pluginSettings = await page.evaluate(_ => {
      return cybozu.data.page.APP_PLUGIN_CONFIGS
    })

	  console.log(AppId)
	  console.log(Domain)
    const data = await getApp(AppId)
	  console.log(data)
    const appName = data.name
    if (!(await fs.existsSync(appName))) {
      await fs.mkdirSync(appName)
    }
	  console.log(pluginSettings)
	  console.log(appName)
    await fs.promises.writeFile(`${appName}/pluginsettings.json`, JSON.stringify(pluginSettings, null, '  '))
  } catch (err) {
    console.log(err)
  } finally {
    await browser.close()
    await rimraf.sync(USER_DATA_DIR_WSL)
  }
}

// .finally(() => rimraf.sync(USER_DATA_DIR_WSL));
main()

async function getApp (appId) {
  return await client.app
    .getApp({ id: appId })
}

function sleep (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
