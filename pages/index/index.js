//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tripList: [
      {
        id: 1,
        publishTime: "2018-11-01",
        userInfo: {
          name: "Dash&KK",
          tripCount: 13,
          rating: 3,
        },
        tripInfo: {
          depCity: "广州",
          arrCity: "曼谷",
          date: "2018-11-01",
        }
      },
      {
        id: 2,
        publishTime: "2018-11-02",
        userInfo: {
          name: "Dash跑得快",
          tripCount: 13,
          rating: 4,
        },
        tripInfo: {
          depCity: "广州",
          arrCity: "北京",
          date: "2018-11-01",
        }
      },
      {
        id: 3,
        publishTime: "2018-11-09",
        userInfo: {
          name: "Dash",
          tripCount: 13,
          rating: 5,
        },
        tripInfo: {
          depCity: "莫斯科",
          arrCity: "香港",
          date: "2018-11-01",
        }
      },
      {
        id: 4,
        publishTime: "2018-11-01",
        userInfo: {
          name: "Dash速递",
          tripCount: 13,
          rating: 3.5,
        },
        tripInfo: {
          depCity: "圣安地列斯圣安地",
          arrCity: "叶卡捷琳堡宝宝",
          date: "2018-11-01",
        }
      },
      {
        id: 5,
        publishTime: "2018-11-01",
        userInfo: {
          name: "Dash会飞",
          tripCount: 13,
          rating: 5,
        },
        tripInfo: {
          depCity: "广州",
          arrCity: "圣彼得堡",
          date: "2018-11-01",
        }
      }

    ]
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
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
