"use strict";

const healthCheck = {
  register : (req, res) => {
      let param = {
          data1 : req.body.data1
      }

      let result = {
          success : "",
          msg : ""
      }        
      
      // 인증 완료
      const db = require('../../../config/DBconnection');
      const conn = db.init();      
      console.log("data1 :: "+ param.data1);
      

      let format = {language : 'sql', indent : ''};
      let query = global.mapper.getStatement('commonMapper', 'selectMemInfo', param, format);

      console.log("sql :: " + query);
      conn.query(query, function (error, rows) {
      
      //Error
      if (rows == '') {
          result.success = false;
          result.msg = "검색된 정보가 없습니다.";
          res.status(400).json(result);
          return;
      }
      //SUCCESS           
          result.success = true;
          result.msg = "success";
          result.content = rows;
          res.json(result);
      });     
  }

  
};

module.exports = {
  healthCheck
};