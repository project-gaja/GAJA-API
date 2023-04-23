"use strict";
const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path'); // path 모듈 import
const axios = require('axios');
const qs = require('qs');
require('dotenv').config();
var fs = require('fs');
// 1. mime 모듈 추가. 서비스하려는 파일의 타입을 알아내기 위해서 필요
var mime = require('mime');

// 환경변수사용
const dotenv = require('dotenv');
dotenv.config();

//컨트롤러 파일등록
let ctrl = require("./controller/home.ctrl");

/*
    control(GET 방식)
    ex) router.get("/[url명]",[컨트롤러].[메소드명].register);
*/
router.get("/healthCheck", ctrl.healthCheck.register);
router.get('/naverlogin', function (req, res) {
  let client_id = 'wR83WrPaWLvs2CKHC3Un';
  let client_secret = '_j5cSaAogN';
  let redirectURI = encodeURI('http://localhost:3001/naverlogin');
  let code = req.query.code;
  let callback_state = req.query.state;

  let api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
    + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + callback_state;
  axios({
    method: 'get',
    url: api_url,
    headers: {
      'X-Naver-Client-Id': client_id,
      'X-Naver-Client-Secret': client_secret
    }
  })
    .then(ans => {
      return axios({
        method: 'get',
        url: 'https://openapi.naver.com/v1/nid/me',
        headers: {
          Authorization: ans.data.token_type + ' ' + ans.data.access_token
        }
      })
    })
    .then(ans => res.send(ans.data.response.email));
});
router.get('/kakaologin', function (req, res) {
  //axios>>promise object

  let token;

  token = axios({//token
    method: 'POST',
    url: 'https://kauth.kakao.com/oauth/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify({
      grant_type: 'authorization_code',
      client_id: 'fd105bdb5cdd612c620fde133e80b5d3',
      client_secret: '',
      redirectUri: 'http://localhost:3001/kakaologin',
      code: req.query.code,
    })
  })
    .then(ans => {
      return axios({
        method: 'GET',
        url: 'https://kapi.kakao.com//v2/user/me',
        headers: {
          'Authorization': `Bearer ${ans.data.access_token}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
    })
    .then(ans => res.send(ans.data.kakao_account));
});

/*
    control(POST 방식)
    ex) router.post("/[url명]",[컨트롤러].[메소드명].register);
*/
router.post("/send-email", ctrl.mail.sendMail);
router.post("/register", ctrl.user.register);

/*
    control(PUT 방식)
    ex) router.put("/[url명]",[컨트롤러].[메소드명].register);
*/

/*
    control(DELETE 방식)
    ex) router.delete("/[url명]",[컨트롤러].[메소드명].register);
*/


let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/")
  },
  filename: function (req, file, callback) {
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
    let basename = path.basename(file.originalname, extension);
    callback(null, basename + "-" + Date.now() + extension);
  }
})



var upload = multer({ storage: storage });

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
