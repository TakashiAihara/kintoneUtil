/*
execute at Record Detail.
example:
  No,ID,Label,Code,type
  1,5500000,レコード番号,レコード番号,RECORD_ID
  2,5500001,更新者,更新者,MODIFIER
  3,5500002,作成者,作成者,CREATOR
  ...
*/

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
  'No,ID,Label,Code,type' + '\n' +
    list.map((e, i) => { return `${i + 1},${e}`; }).join('\n')
);
