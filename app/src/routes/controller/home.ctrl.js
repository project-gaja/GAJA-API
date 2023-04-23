"use strict";
const com = require("../../common/common");
const service = require("../service/home.service");
const logger = require('log4js').getLogger('Controller');
const multer = require('multer');
const bcrypt = require('bcrypt');
const passport = require('passport'); //passport 추가
const NaverStrategy = require('passport-naver').Strategy;

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
    req.body.psword = await pswordHasy(req.body.psword);
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
    // 로그인 클릭시 password 인증
    /*
      const bcrypt = require('bcrypt');
  
      const password = 'mypassword';
      const hashedPassword = '$2b$10$1ONsZsD53MJcGmSdUGk/Nuqw7mwnY/ejwweaq4t4.Fg85eB4JhL5C';
  
      bcrypt.compare(password, hashedPassword, function(err, result) {
        if (err) {
          console.error(err);
        } else if (result === true) {
          console.log('Passwords match!');
        } else {
          console.log('Passwords do not match!');
        }
      });
    */
  },
  naverlogin: async (req, res) => {
  }
};

const pswordHasy = async (psword) => {
  const saltRounds = 10;

  try {
    const hash = await bcrypt.hash(psword, saltRounds);
    return hash;
  } catch (err) {
    throw err;
  };
};

module.exports = {
  healthCheck,
  mail,
  fileupload,
  user
};
