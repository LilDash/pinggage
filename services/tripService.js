const authAjax = require('../utils/authAjax.js')
const util = require('../utils/util.js')
const userService = require('./userService.js')
const baseApiUrl = wx.getStorageSync('baseApiUrl')

const searchTrips = (searchCriteria, callback) => {
  const depCountryId = searchCriteria.depCountryId || 0;
  const depCityId = searchCriteria.depCityId || 0;
  const arrCountryId = searchCriteria.arrCountryId || 0;
  const arrCityId = searchCriteria.arrCityId || 0;
  const page = searchCriteria.page || 0;
  const qs = 'depCountryId='+depCountryId
            + "&depCityId="+depCityId
            + "&arrCountryId="+arrCountryId
            + "&arrCityId="+arrCityId
            + "&page="+page;
  authAjax.get(baseApiUrl + '/trip/search?'+qs, {}, (res) => {
    if (res && res.errCode === 0 && res.data) {
      for (var i in res.data) {
        res.data[i].tripInfo = formatValues(res.data[i].tripInfo);
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
  authAjax.get(baseApiUrl + '/trip/detail?id=' + tripId, {}, (res) => {
    if (res && res.errCode === 0 && res.data) {
      const data = res.data;
      data.tripInfo = formatValues(res.data.tripInfo);
      callback(data);
    } else if (res) {
      console.error("Get trip detail failed. errCode:" + res.errCode + " errMsg: " + res.errMsg);
    } else {
      console.error("Get trip detail failed. Unknown response");
    }
  });
}

const getMyTrips = (page, callback) => {
  const userInfo = userService.getUserInfo();
  if (userInfo && userInfo.userId) {
    authAjax.get(baseApiUrl + '/trip/mytrips?userId=' + userInfo.userId, {}, (res) => {
      if (res && res.errCode === 0 && res.data) {
        for (var i in res.data) {
          res.data[i] = formatValues(res.data[i]);
        }
        callback(res.data);
      } else if (res) {
        console.error("Get trip detail failed. errCode:" + res.errCode + " errMsg: " + res.errMsg);
      } else {
        console.error("Get trip detail failed. Unknown response");
      }
    });
  } else {
    console.error("Fail to get user info");
  }
  
}

const publishTrip = (tripObj, onSuccess, onFail) => {
  authAjax.post(baseApiUrl + '/trip/publish', tripObj, (res) => {
    if (res && res.errCode === 0 && res.data) {
      onSuccess(res.data);
    } else if (res && res.errCode != 0) {
      onFail(res.errCode);
    } else if (res) {
      console.error("Publish trip failed. errCode:" + res.errCode + " errMsg: " + res.errMsg);
    } else {
      console.error("Publish trip failed. Unknown response");
    }
  });
}

const deleteTrip = (tripId, onSuccess, onFail) => {
  const userInfo = userService.getUserInfo();
  if (userInfo && userInfo.userId) {
    authAjax.delete(baseApiUrl + '/trip?userId='+userInfo.userId+'&tripId='+tripId, (res) => {
      if (res && res.errCode === 0) {
        onSuccess();
      } else {
        onFail();
      }
    });
  } else {
    console.error("Fail to get user info");
  }
}

const formatValues = (tripInfo) => {
  // blur contact
  if (Date.now() > tripInfo.departureTime + 86400000) {
    tripInfo.contactValue = "******";
  }
  // datetime format
  tripInfo.departureTime = util.formatTimestampToDate(tripInfo.departureTime);
  tripInfo.pickupTime = util.formatTimestampToDate(tripInfo.pickupTime);
  tripInfo.recCreatedWhen = util.formatTimestampToDate(tripInfo.recCreatedWhen);


  return tripInfo;
}

module.exports = {
  searchTrips: searchTrips,
  getTrip: getTrip,
  publishTrip: publishTrip,
  getMyTrips: getMyTrips,
  deleteTrip: deleteTrip,
}
