
const getJwtInfo = () => {
  return wx.getStorageSync('jwtInfo');
}

const setJwtInfo = (jwt) => {
  wx.setStorageSync('jwtInfo', jwt);
}

const isJwtValid = () => {
  const jwtInfo = getJwtInfo();
  return jwtInfo.token && now < jwtInfo.expirationTime * 1000;
}

module.exports = {
  getJwtInfo: getJwtInfo,
  setJwtInfo: setJwtInfo,
  isJwtValid: isJwtValid,
}
