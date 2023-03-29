"use strict";
const com     = require("../../common/common");
const service = require("../service/home.service");
const logger = require('log4js').getLogger('Controller');

const  healthCheck = {
  register : async (req, res) => {
      let param = {
          data1 : req.body.data1
      }
       
      var result = await service.selectMemberInfo(res,param);
      logger.info("Controller result  : "  + result);

      if (result == "OKAY"){
        logger.info('OKAY');
      }else if (result == "FAIL"){
        logger.error('ERROR');
      } 

      
  }
};

module.exports = {
    healthCheck
};