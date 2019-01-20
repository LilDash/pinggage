const ajax = require('../utils/ajax.js')
const util = require('../utils/util.js')

const apiBaseUrl = "http://localhost:8080";

const searchTrips = (depCountryId, depCityId, arrCountryId, arrCityId, page, callback) => {
  const qs = 'depCountryId='+depCountryId
            + "&depCityId="+depCityId
            + "&arrCountryId="+arrCountryId
            + "&arrCityId="+arrCityId
            + "&page="+page;
  ajax.get(apiBaseUrl + '/trip/search?'+qs, {}, (res) => {
    if (res && res.errCode === 0 && res.data) {
      for (var i in res.data) {
        res.data[i] = formatValues(res.data[i]);
      }
      callback(res.data);
    } else if (res) {
      console.error("Get trips failed. errCode:" + res.errCode + " errMsg: " + res.errMsg);
    } else {
      console.error("Get trips failed. Unknown response");
    }
  });
}

const getTrip = (tripId, callback) => {
  ajax.get(apiBaseUrl + '/trip/detail?id=' + tripId, {}, (res) => {
    if (res && res.errCode === 0 && res.data) {
      const data = formatValues(res.data);
      callback(data);
    } else if (res) {
      console.error("Get trip detail failed. errCode:" + res.errCode + " errMsg: " + res.errMsg);
    } else {
      console.error("Get trip detail failed. Unknown response");
    }
  });
}

const publishTrip = (tripObj, callback) => {
  ajax.post(apiBaseUrl + '/trip/publish', tripObj, (res) => {
    if (res && res.errCode === 0 && res.data) {
      callback(res.data);
    } else if (res) {
      console.error("Publish trip failed. errCode:" + res.errCode + " errMsg: " + res.errMsg);
    } else {
      console.error("Publish trip failed. Unknown response");
    }
  });
}

const formatValues = (tripData) => {
  tripData.tripInfo.departureTime = util.formatTimestampToDate(tripData.tripInfo.departureTime);
  tripData.tripInfo.pickupTime = util.formatTimestampToDate(tripData.tripInfo.pickupTime);
  tripData.tripInfo.recCreatedWhen = util.formatTimestampToDate(tripData.tripInfo.recCreatedWhen);
  return tripData;
}

module.exports = {
  searchTrips: searchTrips,
  getTrip: getTrip,
  publishTrip: publishTrip,
}
