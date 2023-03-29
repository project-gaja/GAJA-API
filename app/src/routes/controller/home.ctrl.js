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
      if (result == "OKAY"){
        logger.info('OKAY');
        res.status(200).json(com.returnMsg(true,"성공",result));
      }else if (result == "FAIL"){
        logger.error('ERROR');
        res.status(400).json(com.returnMsg(false,"실패",result));
      } 
      

      return false;
  }
};

module.exports = {
    healthCheck
};
