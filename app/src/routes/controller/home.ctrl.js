"use strict";
const com = require("../../common/common");
const service = require("../service/home.service");
const logger = require('log4js').getLogger('Controller');
const multer = require('multer');

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
      from: 'eocjf4701@gmail.com',
      to: 'recipient-email@gmail.com',
      subject: 'Test Email from Node.js',
      text: 'Hello, this is a test email from Node.js!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send('Error sending email!');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Email sent successfully!');
      }
    });
  }
};

module.exports = {
  healthCheck,
  mail,
  fileupload
};
