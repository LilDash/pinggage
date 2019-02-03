const ajax = require('../utils/ajax.js')
const userService = require('../services/userService.js')
const jwtService = require('../services/jwtService.js')

const apiBaseUrl = "http://localhost:8080";

const login = (forceLogin, callback) => {
  var userInfo = userService.getUserInfo() || {};
  if (userInfo.userId && userInfo.openId && !forceLogin) {
    return;
  }

  wx.login({
    success: function (res) {
      const code = res.code;
      if (code) {
        wx.getUserInfo({
          success: function (res) {
            const data = {
              encryptedData: res.encryptedData,
              iv: res.iv,
              code: code,
            };
            ajax.post(apiBaseUrl + '/auth/login/wechatmini', data, (res) => {
              if (res.errCode === 0 && res.data && res.data.status === 0) {
                const loginResult = res.data.resultInfo;
                const jwt = res.data.jwtInfo;
                userService.setUserInfo(loginResult);
                jwtService.setJwtInfo(jwt);
                if (callback) {
                  callback();
                }
              } else {
                console.error("Login failure")
              }
            });
          },
          fail: function(err) {
            console.log(err);
          }
        });
      } else {
        console.log('Login failed' + res.errMsg)
      }
    }
  });
}

// const setLoginEncryptedData = (encryptedData) => {
//   wx.setStorageSync('encryptedData', encryptedData);
// }
// const getLoginEncryptedData = () => {
//   return wx.getStorageSync('encryptedData');
// }
// const setLoginIv = (iv) => {
//   wx.setStorageSync('iv', iv);
// }
// const getLoginIv = () => {
//   return wx.getStorageSync('iv');
// }

module.exports = {
  login: login,
  // setLoginEncryptedData: setLoginEncryptedData,
  // setLoginIv: setLoginIv,
}
