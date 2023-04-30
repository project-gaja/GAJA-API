"use strict";
const com = require("../../common/common");
const service = require("../service/home.service");
const logger = require('log4js').getLogger('Controller');
const multer = require('multer');
const crypto = require('crypto')

const passport = require('passport'); //passport 추가
const NaverStrategy = require('passport-naver').Strategy;
const jwt = require('../../../modules/jwt');

const healthCheck = {
  register: async (req, res) => {

    let param = {
      data1: req.body.data1
    }

    var result = await service.selectMemberInfo(res, param);
    if (result == "FAIL") {
      logger.error('ERROR');
      res.status(400).json(com.returnMsg(false, "실패", result));
    } else {
      logger.info('OKAY');
      res.status(200).json(com.returnMsg(true, "성공", result));
    }
  }
};

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../../common/asset'); // 이미지를 저장할 폴더 경로
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // 이미지 파일명 설정
    }
  })
});

const fileupload = {
  register: async (req, res) => {
    logger.info("req : " + req.file);
    try {
      const imageUrl = req.file.path; // 업로드된 이미지 파일 경로
      res.status(200).json({ imageUrl });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: '이미지 업로드에 실패했습니다.' });
    }
  }
};


// node-mailer 기능 구현
const nodemailer = require('nodemailer');
const { hasPointerEvents } = require('@testing-library/user-event/dist/utils');
// Nodemailer 설정
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'eocjf4701@gmail.com',
    pass: 'ctbcjmkviniibszx'
  }
});

const mail = {
  sendMail: async (req, res) => {
    const mailOptions = {
      from: 'gaja@gmail.com',
      to: req.body.email.email,
      subject: '인증코드 안내입니다.',
      text: '인증코드 : ' + req.body.code,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send('Error sending email!');
      } else {
        console.log('Email sent: ' + info.response);
        res.send({ 'code': 200, 'msg': 'success' });
      }
    });
  }
};

const user = {
  register: async (req, res) => {
    // password 암호화
    req.body.psword = await createHashedPassword(req.body.psword);
    let param = req.body;
    var result = await service.insertMemberInfo(res, param);
    if (result == "FAIL") {
      logger.error('ERROR');
      res.status(400).json(com.returnMsg(false, "실패", result));
    } else {
      logger.info('OKAY');
      res.status(200).json(com.returnMsg(true, "성공", result));
    }
  },
  login: async (req, res) => {
    let userId = req.body.email;
    let psword = req.body.psword;
    /* user의 email을 통해 토큰을 생성! */
    const jwtToken = await jwt.sign(userId);
    psword = await createHashedPassword(psword);
    let param = {
      email: userId,
      psword: psword,
      token: jwtToken.token,
    }

    let result = await service.selectIsLogin(res, param);
    if (result == "FAIL") {
      logger.error('ERROR');
      res.status(400).json(com.returnMsg(false, "실패", result));
    } else {
      logger.info('OKAY');
      res.status(200).json(com.returnMsg(true, "성공", result));
    }
  },
  emailUniqueCheck: async (req, res) => {
    let param = {
      email: req.body.email.email
    }
    var result = await service.selectEmailUniqueCheck(res, param);
    if (result == "FAIL") {
      logger.error('ERROR');
      res.status(400).json(com.returnMsg(false, "실패", result));
    } else {
      logger.info('OKAY');
      res.status(200).json(com.returnMsg(true, "성공", result));
    }
  }
};

const createHashedPassword = (psword) => {
  return crypto.createHash("sha512").update(psword).digest("base64");
};

module.exports = {
  healthCheck,
  mail,
  fileupload,
  user
};
