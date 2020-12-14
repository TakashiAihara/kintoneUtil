// アプリフォーム設定画面で実行
copy(
  '番号,ラベル' + '\n' + $x('//*[@class="label-text-cybozu" or @class="group-label-gaia"]').map((e, i) => `${i + 1},${e.innerText}`).join('\n')
);