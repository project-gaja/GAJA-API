"use strict";
const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path'); // path 모듈 import
var fs = require('fs');
// 1. mime 모듈 추가. 서비스하려는 파일의 타입을 알아내기 위해서 필요
var mime = require('mime');

//컨트롤러 파일등록
let ctrl = require("./controller/home.ctrl");



/*
    control(GET 방식)
    ex) router.get("/[url명]",[컨트롤러].[메소드명].register);
*/
router.get("/healthCheck", ctrl.healthCheck.register);



/*
    control(POST 방식)
    ex) router.post("/[url명]",[컨트롤러].[메소드명].register);
*/
router.post("/send-email", ctrl.mail.sendMail);




let storage = multer.diskStorage({
    destination: function(req, file ,callback){
        callback(null, "uploads/")
    },
    filename: function(req, file, callback){
        var mimeType;

        switch (file.mimetype) {
          case "image/jpeg":
            mimeType = "jpg";
          break;
          case "image/png":
            mimeType = "png";
          break;
          case "image/gif":
            mimeType = "gif";
          break;
          case "image/bmp":
            mimeType = "bmp";
          break;
          default:
            mimeType = "jpg";
          break;
        }

        let extension = path.extname(file.originalname);
        let basename  = path.basename(file.originalname, extension);
        callback(null, basename + "-" + Date.now() + extension ) ;
    }
})



var upload = multer({storage: storage});
  
  // 파일 업로드를 처리하는 라우터
  router.post('/fileupload', upload.single('image'), (req, res) => {
    debugger;
    console.log(req.file);
    const imageUrl = req.file.path;
    console.log("imageUrl : " + imageUrl);
    res.json({ imageUrl: imageUrl });
  });


// 외부로 내보내기
module.exports = router;
