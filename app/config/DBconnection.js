const mysql = require('mysql');
const logger = require('log4js').getLogger('INFO');

//DB info
const dbInfo = {
    host: '13.125.250.52',
    port: '52001',
    user: 'autobit',
    password: 'autobit1!',
    database: 'GAJADB'
}

//DB connection
let dbcon = {
	init:function() {
		return mysql.createConnection(dbInfo);
	},
	conn:function(con) {
		con.connect(function(err){
			if(err) {
				logger.error("Mysql Connection Error : " + err);
				setTimeout(init, 2000);
			} else {
				logger.info("Mysql Connection Sucessfully")
			}
		})
	}
}

module.exports = dbcon; //모듈 등록