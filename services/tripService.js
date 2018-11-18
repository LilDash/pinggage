const getTripList = page => {
  wx.request({
    url: 'http://localhost:8080/geo/countrycity', //仅为示例，并非真实的接口地址
    data: {
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      console.log(res.data)
    }
  })
}



module.exports = {
  getTripList: getTripList
}
