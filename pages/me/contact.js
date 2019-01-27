// pages/me/contact.js
const userService = require('../../services/userService.js')

const phoneNumberContactTypeId = 2;
const wechatIdContactTypeId = 3;

Page({

  /**
   * Page initial data
   */
  data: {
    wechatid: "",
    phonenumber: "",
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const self = this;
    userService.getContacts(function(contacts){
      for(var i in contacts) {
        if (contacts[i].contactTypeId === phoneNumberContactTypeId) {
          self.setData({'phonenumber': contacts[i].contactTypeValue});
        }
        if (contacts[i].contactTypeId === wechatIdContactTypeId) {
          self.setData({'wechatid': contacts[i].contactTypeValue});
        }
      }
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

  onFormSubmit(e) {
    
    wx.showLoading({
      title: '正在保存',
      mask: true,
    });

    const contacts = [
      { contactTypeId: phoneNumberContactTypeId, contactValue: e.detail.value.phonenumber }, 
      { contactTypeId: wechatIdContactTypeId, contactValue: e.detail.value.wechatid }, 
    ];

    userService.saveContacts(contacts, () => {
      wx.hideLoading();
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000,
        mask: true,
      });
    }, () => {
      wx.hideLoading();
      wx.showToast({
        title: '保存失败',
        icon: 'none',
        duration: 2000,
        mask: true,
      });
    });
  },
})