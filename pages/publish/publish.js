// pages/publish/publish.js
const tripService = require('../../services/tripService.js')
const locationService = require('../../services/locationService.js')
const util = require('../../utils/util.js')

Page({

  /**
   * Page initial data
   */
  data: {
    countryCities: [],
    departureCountryId: 0,
    departureCityId: 0,
    arrivalCountryId: 0,
    arrivalCityId: 0,
    departureDate: util.formatTimeToDate(new Date()),
    arrivalDate: util.formatTimeToDate(new Date()),

    todayDate: util.formatTimeToDate(new Date()),
    endDate: (function() {
      const d = new Date();
      d.setMonth(d.getMonth() + 6);
      return util.formatTimeToDate(d);
    })()
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const self = this;
    locationService.getCountryCities((res) => {
      self.setData({
        'countryCities': res,
      })
    }, false);
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },


  /**
   * Custom functions
   */
  onDepartureDateChange(e) {
    this.setData({
      departureDate: e.detail.value
    })
  },

  onArrivalDateChange(e) {
    this.setData({
      arrivalDate: e.detail.value
    })
  },

  /**
   * Helper functions
   */

})