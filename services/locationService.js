const ajax = require('../utils/ajax.js')

const getCountryCities = (callback) => {
  ajax.get('http://localhost:8080/geo/countrycity', {}, (res) => {
    if (res && res.errCode === 0 && res.data) {
      callback(res.data);
    } else if (res) {
      console.error("Get country and city failed. errCode:" + res.errCode + " errMsg: " + res.errMsg);
    } else {
      console.error("Get country and city failed. Unknown response");
    }     
  });
}

module.exports = {
  getCountryCities: getCountryCities
}
