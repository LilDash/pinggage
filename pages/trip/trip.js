// pages/trip/trip.js
const tripService = require('../../services/tripService.js')

Page({

  /**
   * Page initial data
   */
  data: {
    trip: null,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    
    tripService.getTrip(options.id, (res) => {
      this.setData({'trip': res});
    });
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

  onTapContact: function (e) {
    var self = this;
    wx.setClipboardData({
      data: "As",// TODO: 
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1500
        })
      }
    });
  }
})