"use strict";
const express = require("express");
const router = express.Router();



let ctrl = require("./home.ctrl");


/*
    control(GET 방식)
    ex) router.get("/[url명]",[require명].[메소드명].register);
*/
router.get("/healthCheck",ctrl.healthCheck.register); 


/*
    control(POST 방식)
    ex) router.post("/[url명]",[require명].[메소드명].register);
*/



// 외부로 내보내기
module.exports = router;
