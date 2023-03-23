"use strict";
const com     = require("./../../common/common.js");
const service = require("./home.service");

const  healthCheck = {
  register : async (req, res) => {
      let param = {
          data1 : req.body.data1
      }
       
      var result = await service.selectMemberInfo(res,param);


      console.log("Controller result  : "  + result);
      if (result == "OKAY"){
        console.log("성공");
      }else if (result == "FAIL"){
        console.log("실패");
      } 
  }
};

module.exports = {
    healthCheck
};