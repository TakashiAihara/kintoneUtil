(function() {
    'use strict';
    $(window).on('load', async function(){
        console.log("test");
        await sleep(1000);
        Object.keys(kintone.app.record.get().record).map(e => kintone.app.record.setFieldShown(e, true));
        Object.entries(cybozu.data.page.FORM_DATA.schema.table.fieldList).map(e => kintone.app.record.setFieldShown(e[1].var, true));
        });
})();

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
