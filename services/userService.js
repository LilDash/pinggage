const ajax = require('../utils/ajax.js')
const util = require('../utils/util.js')

const baseApiUrl = wx.getStorageSync('baseApiUrl')

// const getContacts = (callback) => {
//   const userInfo = getUserInfo();
//   if (userInfo && userInfo.userId) {
//     ajax.get(apiBaseUrl + '/user/contacts?userId=' + userInfo.userId, {}, (res) => {
//       if (res && res.errCode === 0 && res.data) {
//         callback(res.data);
//       } else if (res) {
//         console.error("Get contacts failed. errCode:" + res.errCode + " errMsg: " + res.errMsg);
//       } else {
//         console.error("Get contacts failed. Unknown response");
//       }
//     });
//   } else {
//     console.error("Fail to get user info")
//   }
  
// }

// const saveContacts = (contacts, onSuccess, onFail) => {
//   const userInfo = getUserInfo();
//   if (userInfo && userInfo.userId) {
//     const reqObj = {
//       userId: userInfo.userId,
//       contacts: contacts,
//     };
//     ajax.post(apiBaseUrl + '/user/contacts', reqObj, (res) => {
//       if (res && res.errCode === 0) {
//         onSuccess();
//       } else if (res) {
//         console.error("Save contacts failed. errCode:" + res.errCode + " errMsg: " + res.errMsg);
//         onFail();
//       } else {
//         console.error("Save contacts failed. Unknown response");
//         onFail();
//       }
//     });
//   } else {
//     console.error("Fail to get user info");
//     onFail();
//   }
// }

const setUserInfo = (userInfo) => {
  wx.setStorageSync('userInfo', userInfo);
}
const getUserInfo = () => {
  return wx.getStorageSync('userInfo');
}

const login = () => {

}


module.exports = {
  setUserInfo: setUserInfo,
  getUserInfo: getUserInfo,
  // getContacts: getContacts,
  // saveContacts: saveContacts,
  login: login,
}
