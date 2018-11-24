const ajax = require('../utils/ajax.js')

const getCountryCities = (callback) => {
  ajax.get('http://localhost:8080/geo/countrycity', {}, (res) => {
    if (res && res.errCode === 0 && res.data) {
      
      const allCountryOption = {
        "countryId": 0, 
        "countryName": "all", 
        "countryDisplayName": "不限", 
        "cities": [],
      };
      res.data.unshift(allCountryOption);
      const allCityOption = { "cityId": 0, "cityName": "all", "cityDisplayName": "不限" };
      for (var i in res.data) {
        res.data[i].cities.unshift(allCityOption);
      }
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
