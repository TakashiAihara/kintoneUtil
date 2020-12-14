// 詳細画面か新規画面で実行。

var list = [];
Object.keys(cybozu.data.page.FORM_DATA.schema.table.fieldList).map(e =>
  list.push(
    `\
${cybozu.data.page.FORM_DATA.schema.table.fieldList[e].id},\
${cybozu.data.page.FORM_DATA.schema.table.fieldList[e].label},\
${cybozu.data.page.FORM_DATA.schema.table.fieldList[e].var},\
${cybozu.data.page.FORM_DATA.schema.table.fieldList[e].type}\
`
  )
);

Object.keys(cybozu.data.page.FORM_DATA.schema.subTable).map(e =>
  list.push(
    `\
${cybozu.data.page.FORM_DATA.schema.subTable[e].id},\
${cybozu.data.page.FORM_DATA.schema.subTable[e].label},\
${cybozu.data.page.FORM_DATA.schema.subTable[e].var},\
${cybozu.data.page.FORM_DATA.schema.subTable[e].type}\
`
  )
);

Object.keys(cybozu.data.page.FORM_DATA.schema.subTable).map(e =>
  Object.keys(cybozu.data.page.FORM_DATA.schema.subTable[e].fieldList).map(f =>
    list.push(
      `\
${cybozu.data.page.FORM_DATA.schema.subTable[e].fieldList[f].id},\
${cybozu.data.page.FORM_DATA.schema.subTable[e].fieldList[f].label},\
${cybozu.data.page.FORM_DATA.schema.subTable[e].fieldList[f].var},\
${cybozu.data.page.FORM_DATA.schema.subTable[e].fieldList[f].type}\
`)));

copy(
  'No,ID,ラベル,コード,型' + '\n' +
    list.map((e, i) => { return `${i + 1},${e}`; }).join('\n')
);
