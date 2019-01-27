const ajax = require('../utils/ajax.js')
const util = require('../utils/util.js')

const apiBaseUrl = "http://localhost:8080";

const login = () => {
  var userInfo = wx.getStorageSync('userInfo') || {};
  //var openid = wx.getStorageSync('openid') || null;
  if (userInfo.userId && userInfo.openId) {
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

const getContacts = (callback) => {
  const userInfo = getUserInfo();
  if (userInfo && userInfo.userId) {
    ajax.get(apiBaseUrl + '/user/contacts?userId=' + userInfo.userId, {}, (res) => {
      if (res && res.errCode === 0 && res.data) {
        callback(res.data);
      } else if (res) {
        console.error("Get contacts failed. errCode:" + res.errCode + " errMsg: " + res.errMsg);
      } else {
        console.error("Get contacts failed. Unknown response");
      }
    });
  } else {
    console.error("Fail to get user info")
  }
  
}

const saveContacts = (contacts, onSuccess, onFail) => {
  const userInfo = getUserInfo();
  if (userInfo && userInfo.userId) {
    const reqObj = {
      userId: userInfo.userId,
      contacts: contacts,
    };
    ajax.post(apiBaseUrl + '/user/contacts', reqObj, (res) => {
      if (res && res.errCode === 0) {
        onSuccess();
      } else if (res) {
        console.error("Save contacts failed. errCode:" + res.errCode + " errMsg: " + res.errMsg);
        onFail();
      } else {
        console.error("Save contacts failed. Unknown response");
        onFail();
      }
    });
  } else {
    console.error("Fail to get user info");
    onFail();
  }
}

const getUserInfo = () => {
  return wx.getStorageSync('userInfo');
}

module.exports = {
  login: login,
  getUserInfo: getUserInfo,
  getContacts: getContacts,
  saveContacts: saveContacts,
}
