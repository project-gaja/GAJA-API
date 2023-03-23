const db = require('../../config/DBconnection');


module.exports = {
    /**
     * 화면으로 보낼 정보 메서드  
     * GAJA-API → GAJA-WEB
     * @Method       	: returnMsg
     * @date   		    : 2023.03.23
     * @author   		: hosung98
     * ----------------------------------------
     */   
    returnMsg: function (success, msg, content) {
        let result = {
            success : '',
            msg : ''
        }      

        result.success = success;
        result.msg = msg;
        result.content = content;
        
        return result;  
    },    

  
    /**
     * DAO  
     * ex) param1 : parameter, param2 : namespace, param3 : sql id)
     * @Method       	: selectOne
     * @date   		    : 2023.03.23
     * @author   		: hosung98
     * ----------------------------------------
     */      
    selectOne: async function (res,param1, param2, param3) {
        const conn = db.init();    
        console.log("INPUT PARAM: "+ param1);
      
        let format = {language : 'sql', indent : ''};
        let query = global.mapper.getStatement(param2, param3, param1, format);
      
        console.log("SQL LOG: " + query);
        
        // Promise 객체를 반환하는 함수로 변환하여 await로 실행 가능하도록 함
        var result = await new Promise((resolve, reject) => {
          conn.query(query, function (error, rows) {
            //Error
            if (rows == '') {
              resolve("FAIL");
            //SUCCESS 
            } else {
              resolve("OKAY");
            }
          });
        });
        
        console.log("DAO result : " + result);
        return result;
      }
}