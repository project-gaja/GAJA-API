"use strict";
const com = require('../../common/common');
const logger = require('log4js').getLogger('service');

module.exports = {
    selectMemberInfo: async function (res, param1) {
        
        var result  = await com.selectOne(res, param1, 'commonMapper', 'selectMemInfo');
        logger.info("Service result: " + result);
        
        return result;
    }
}
