const db = require('../../config/DBconnection');
const logger = require('log4js').getLogger('COMMON');


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
      success: '',
      msg: ''
    }

    result.success = success;
    result.msg = msg;
    result.content = content;

    return result;
  },


  /**
   * (DAO) Data Access Object 
   * ex) param1 : parameter, param2 : namespace, param3 : sql id
   * @Method       	: selectOne
   * @date   		    : 2023.03.23
   * @author   		: hosung98
   * ----------------------------------------
   */
  selectOne: async function (res, param1, param2, param3) {
    const conn = db.init();


    let format = { language: 'sql', indent: '' };
    let query = global.mapper.getStatement(param2, param3, param1, format);
    logger.info('[' + param2 + '.' + param3 + '] ==> ' + 'parameters :' + JSON.stringify(param1));
    logger.info('[' + param2 + '.' + param3 + '] SQL QUERY ==> \n' + query);

    var result = await new Promise((resolve, reject) => {
      conn.query(query, function (error, rows) {

        //Error
        if (typeof rows == "undefined" || rows == null || rows == "") {
          resolve("FAIL");
          logger.error("DAO result : " + JSON.stringify(rows));
          //SUCCESS 
        } else {
          resolve(rows);
          logger.info("DAO result : " + JSON.stringify(rows));
        }
      });
    });

    return result;
  },

  /**
 * (DAO) Data Access Object 
 * ex) param1 : parameter, param2 : namespace, param3 : sql id
 * @Method       	: insert
 * @date   		    : 2023.04.20
 * @author   		: eocjf4701
 * ----------------------------------------
 */
  insert: async function (res, param1, param2, param3) {
    const conn = db.init();


    let format = { language: 'sql', indent: '' };
    let query = global.mapper.getStatement(param2, param3, param1, format);
    logger.info('[' + param2 + '.' + param3 + '] ==> ' + 'parameters :' + JSON.stringify(param1));
    logger.info('[' + param2 + '.' + param3 + '] SQL QUERY ==> \n' + query);

    var result = await new Promise((resolve, reject) => {
      conn.query(query, function (error, rows) {

        //Error
        if (typeof rows == "undefined" || rows == null || rows == "") {
          resolve("FAIL");
          logger.error("DAO result : " + JSON.stringify(rows));
          //SUCCESS 
        } else {
          resolve(rows);
          logger.info("DAO result : " + JSON.stringify(rows));
        }
      });
    });

    return result;
  }
}