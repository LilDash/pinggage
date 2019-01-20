const tripService = require('../../services/tripService.js')
const locationService = require('../../services/locationService.js')

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    trips: [],
    searchCriteria: {
      depCountryId: 0,
      depCityId: 0,
      arrCountryId: 0,
      arrCityId: 0,
      page: 0,
    },
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    //Load trip list
    tripService.searchTrips(this.data.searchCriteria, (res) => {
      this.loadTrips(res);
    });
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  loadTrips: function(trips) {
    this.setData({
      'trips': trips,
    })
  },

  appendTrips: function(trips) {
    const newTrips = this.data.trips.concat(trips);
    this.setData({
      trips: newTrips,
    });
  },

  onSearchFormSubmit: function(e) {
    this.setData({
      searchCriteria: e.detail.searchCriteria,
    })
    this.loadTrips(e.detail.trips);
  },

  onScrollToBottom: function(e) {
    const newSearchCriteria = this.data.searchCriteria;
    newSearchCriteria.page++;
    tripService.searchTrips(newSearchCriteria, (res) => {
      if (res.length > 0){
        this.setData({
          searchCriteria: newSearchCriteria,
        });
        this.appendTrips(res);
      } 
      // TODO:  Show message if no more data can be loaded.
      
    });
  },
   
})
