const get = (url, data, onSuccess, onFail) => {
  wx.request({
    url: url,
    method: 'GET',
    data: data,
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      if (res.statusCode === 200) {
        onSuccess(res.data);
      } else {
        console.error("Ajax call failed. url: " + url + " errMsg: " + res.errMsg);
      }
    },
    fail: onFail
  })
}

const post = (url, data, onSuccess, onFail) => {
  wx.request({
    url: url,
    method: 'POST',
    data: data,
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      if (res.statusCode === 200) {
        onSuccess(res.data);
      } else {
        console.error("Ajax call failed. url: " + url + " errMsg: " + res.errMsg);
      }
    },
    fail: onFail
  })
}


const deleteit = (url, onSuccess, onFail) => {
  wx.request({
    url: url,
    method: 'DELETE',
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      if (res.statusCode === 200) {
        onSuccess(res.data);
      } else {
        console.error("Ajax call failed. url: " + url + " errMsg: " + res.errMsg);
      }
    },
    fail: onFail
  })
}

module.exports = {
  get: get,
  post: post,
  delete: deleteit,
}
