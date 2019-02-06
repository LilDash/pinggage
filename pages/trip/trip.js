// pages/trip/trip.js
const tripService = require('../../services/tripService.js')
const userService = require('../../services/userService.js')

Page({

  /**
   * Page initial data
   */
  data: {
    trip: null,
    contactValue: "",
    onBackToHome: false,
    showDeleteButton: false,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    if (options.onBackToHome && options.onBackToHome == 'true') {
      this.setData({'onBackToHome': true});
    }
    wx.showLoading({
      title: '加载中',
      mask: true,
    });
    this.loadTrip(options.id);
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
      data: self.data.contactValue,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1500
        })
      }
    });
  },

  onTapGoBack: function (e) {
    if (this.data.onBackToHome) {
      wx.switchTab({
        url: '/pages/index/index',
      });
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
  },

  onTapDelete: function(e) {
    const self = this;
    wx.showModal({
      title: '删除',
      content: '确认删除这条空箱记录吗？',
      success(res) {
        if (res.confirm) {
          tripService.deleteTrip(self.data.trip.tripInfo.id, () => {
            wx.navigateBack({
              delta: 1
            })
          });
        }
      }
    })
  },


  loadTrip: function(tripId) {
    tripService.getTrip(tripId, (res) => {
      const userInfo = userService.getUserInfo();
      const showDeleteButton = userInfo && userInfo.userId && userInfo.userId == res.tripInfo.userId;

      this.setData({ 'trip': res, 'contactValue': res.tripInfo.contactValue, 'showDeleteButton': showDeleteButton });
      wx.hideLoading();
    });
  }


})