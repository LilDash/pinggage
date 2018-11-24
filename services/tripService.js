const ajax = require('../utils/ajax.js')
const util = require('../utils/util.js')

const searchTrips = (depCountryId, depCityId, arrCountryId, arrCityId, page, callback) => {
  const qs = 'depCountryId='+depCountryId
            + "&depCityId="+depCityId
            + "&arrCountryId="+arrCountryId
            + "&arrCityId="+arrCityId
            + "&page="+page;
  ajax.get('http://localhost:8080/trips?'+qs, {}, (res) => {
    if (res && res.errCode === 0 && res.data) {
      const data = formatValues(res.data);
      callback(data);
    } else if (res) {
      console.error("Get all trips failed. errCode:" + res.errCode + " errMsg: " + res.errMsg);
    } else {
      console.error("Get all trips failed. Unknown response");
    }
  });
}

const formatValues = (tripsData) => {
  for(var i in tripsData) {
    tripsData[i].departureTime = util.formatTimestampToDate(tripsData[i].departureTime);
    tripsData[i].pickupTime = util.formatTimestampToDate(tripsData[i].pickupTime);
    tripsData[i].recCreatedWhen = util.formatTimestampToDate(tripsData[i].recCreatedWhen);
  }
  return tripsData;
}

module.exports = {
  searchTrips: searchTrips
}
