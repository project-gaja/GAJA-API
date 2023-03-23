"use strict";
const com = require('../../common/common');


module.exports = {
    selectMemberInfo: async function (res, param1) {
        
        var result  = await com.selectOne(res, param1, 'commonMapper', 'selectMemInfo');
        console.log("Service result: " + result);
        return result;
    }
}
