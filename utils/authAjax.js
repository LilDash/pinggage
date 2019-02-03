const jwtService = require('../services/jwtService.js')
const userService = require('../services/userService.js')
const authService = require('../services/authService.js')
const ajax = require('./ajax.js')

const get = (url, data, onSuccess, onFail) => {
  const now = Date.now();
  const jwtInfo = jwtService.getJwtInfo() || {};

  if (jwtInfo.token && now < jwtInfo.expirationTime * 1000) {
    ajax.get(url, data, onSuccess, onFail, jwtInfo.token);
  } else {
    userService.setUserInfo(null);
    authService.login(true, () => {
      const jwtInfo = jwtService.getJwtInfo();
      ajax.get(url, data, onSuccess, onFail, jwtInfo.token);
    });
  }
}


const post = (url, data, onSuccess, onFail) => {
  const now = Date.now();
  const jwtInfo = jwtService.getJwtInfo() || {};

  if (jwtInfo.token && now < jwtInfo.expirationTime * 1000) {
    ajax.post(url, data, onSuccess, onFail, jwtInfo.token);
  } else {
    userService.setUserInfo(null);
    authService.login(true, () => {
      const jwtInfo = jwtService.getJwtInfo();
      ajax.post(url, data, onSuccess, onFail, jwtInfo.token);
    })
  }
}

const deleteit = (url, onSuccess, onFail) => {
  const now = Date.now();
  const jwtInfo = jwtService.getJwtInfo() || {};

  if (jwtInfo.token && now < jwtInfo.expirationTime * 1000) {
    ajax.delete(url, onSuccess, onFail, jwtInfo.token);
  } else {
    userService.setUserInfo(null);
    authService.login(true, () => {
      const jwtInfo = jwtService.getJwtInfo();
      ajax.delete(url, onSuccess, onFail, jwtInfo.token);
    })
  }
}

module.exports = {
  get: get,
  post: post,
  delete: deleteit,
}
