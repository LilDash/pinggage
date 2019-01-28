// pages/me/index.js
const userService = require('../../services/userService.js')
const tripService = require('../../services/tripService.js')

Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: {},
    trips: [],
    page: 0,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const self = this;
    const userInfo = userService.getUserInfo();
    this.setData({'userInfo': userInfo});

    tripService.getMyTrips(this.data.page, (res) => {
      const trips = [];
      for(var i in res) {
        const trip = { 'tripInfo': res[i] };
        trips.push(trip);
      }
      self.setData({ 'trips': trips});
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

  onScrollToBottom: function (e) {
    const newPage = this.data.page + 1;
    tripService.getMyTrips(newPage, (res) => {
      if (res.length > 0) {
        this.setData({
          page: newPage,
        });
        this.appendTrips(res);
      }
      // TODO:  Show message if no more data can be loaded.

    });
  },


  appendTrips: function (trips) {
    const newTrips = this.data.trips.concat(trips);
    this.setData({
      trips: newTrips,
    });
  },
})