"use strict";
const logger = require('log4js').getLogger('INFO');

// 서버를 띄워주는 코드
const app = require("../app");
const PORT = 3001;

app.listen(PORT, () => {
  logger.info('localhost:3001 Server start!');
});