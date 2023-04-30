module.exports = {
  secretKey: 'f5d999accdd1eb5aa7f27d17553c052f4c12d663f706e3fcbf166570aa3136ca', // crypto random 생성
  option: {
    algorithm: "HS256", // 해싱 알고리즘
    expiresIn: "30m",  // 토큰 유효 기간
    issuer: "issuer" // 발행자
  }
}