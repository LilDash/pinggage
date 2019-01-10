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
  onDepartureLocationSeleted: function (e) {
    this.setData({
      'departureCountryId': e.detail.countryId,
      'departureCityId': e.detail.cityId,
    })
  },

  onArrivalLocationSeleted: function (e) {
    this.setData({
      'arrivalCountryId': e.detail.countryId,
      'arrivalCityId': e.detail.cityId,
    })
  },

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

  onFormSubmit(e) {
    if(!this.validateInput(e.detail.value)){
      return ;
    }
  },

  /**
   * Helper functions
   */

  validateInput(input) {
    console.log(input);
    if (this.data.departureCountryId == 0 || this.data.departureCityId == 0 
    || this.data.arrivalCountryId == 0 || this.data.arrivalCityId == 0) {
      wx.showToast({
        title: '请选择出发地和目的地城市',
        icon: 'none',
        duration: 2000
      });
      return false;
    }

    if (this.data.departureCityId == this.data.arrivalCityId) {
      wx.showToast({
        title: '出发地和目的地不允许相同',
        icon: 'none',
        duration: 2000
      });
      return false;
    }

    if (this.data.departureDate > this.data.arrivalDate) {
      wx.showToast({
        title: '请选择正确的出发日期和到达日期',
        icon: 'none',
        duration: 2000
      });
      return false;
    }

    if(! /[0-9a-zA-Z]+/.test(input.flightNo)) {
      wx.showToast({
        title: '航班号格式错误',
        icon: 'none',
        duration: 2000
      });
      return false;
    }

    if (! /[0-9]{1,2}/.test(input.totalCapacity)) {
      wx.showToast({
        title: '总行李额必须是两位或以下整数',
        icon: 'none',
        duration: 2000
      });
      return false;
    }

    if (! /[0-9]{1,2}/.test(input.remainingCapacity)) {
      wx.showToast({
        title: '剩余行李额必须是两位或以下整数',
        icon: 'none',
        duration: 2000
      });
      return false;
    }

    if (! /[0-9]+/.test(input.capacityPrice)) {
      wx.showToast({
        title: '行李额单价必须是整数',
        icon: 'none',
        duration: 2000
      });
      return false;
    }

    if (input.memo.length > 200) {
      wx.showToast({
        title: '留言字数超过限制',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    
    return true;
  },

})