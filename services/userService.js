const ajax = require('../utils/ajax.js')
const util = require('../utils/util.js')

const apiBaseUrl = "http://localhost:8080";

const login = () => {
  var userInfo = wx.getStorageSync('userInfo') || {};
  //var openid = wx.getStorageSync('openid') || null;
  if (userInfo.userId && userInfo.openId) {
    console.log(userInfo)
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
                  wx.setStorageSync('userInfo', loginResult);
                } else {
                  console.error("Login failure")
                }
            });
          }
        });
      } else {
        console.log('Login failed' + res.errMsg)
      }
    }
  });
}


module.exports = {
  login: login,
}