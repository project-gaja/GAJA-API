"use strict";
const com = require('../../common/common');
const logger = require('log4js').getLogger('service');

module.exports = {
    selectMemberInfo: async function (res, param1) {

        var result = await com.selectOne(res, param1, 'commonMapper', 'selectMemInfo');

        return result;
    },
    insertMemberInfo: async function (res, param) {
        var result = await com.insert(res, param, 'commonMapper', 'insertMemberInfo');

        return result;
    },
    selectEmailUniqueCheck: async function (res, param) {

        var result = await com.selectOne(res, param, 'commonMapper', 'selectEmailUniqueCheck');

        return result;
    },
}
