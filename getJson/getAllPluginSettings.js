function downloadJson(fileName, json) {
  const data = JSON.stringify(json, null, 4);
  const link = document.createElement('a');
  link.href = 'data:text/plain,' + encodeURIComponent(data);
  link.download = fileName;
  link.click();
}

downloadJson(
  `${cybozu.data.page.APP_DATA.name}_${location.hostname.split('.')[0]}_プラグイン設定.json`,
  cybozu.data.page.APP_PLUGIN_CONFIGS
);
