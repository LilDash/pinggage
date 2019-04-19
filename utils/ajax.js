
const get = (url, data, onSuccess, onFail, authHeader='') => {
  wx.request({
    url: url,
    method: 'GET',
    data: data,
    dataType: 'json',
    header: {
      'content-type': 'application/json',
      'Authorization': authHeader,
    },
    success(res) {
      if (res.statusCode === 200) {
        onSuccess(res.data);
      } else {
        console.error("Ajax call failed. code: " + res.statusCode + " url: " + url + " errMsg: " + res.errMsg);
      }
    },
    fail: onFail
  })
}

const post = (url, data, onSuccess, onFail, authHeader='') => {
  wx.request({
    url: url,
    method: 'POST',
    data: data,
    dataType: 'json',
    header: {
      'content-type': 'application/json',
      'Authorization': authHeader,
    },
    success(res) {
      if (res.statusCode === 200) {
        onSuccess(res.data);
      } else {
        console.error("Ajax call failed. code: " + res.statusCode + " url: " + url + " errMsg: " + res.errMsg);
      }
    },
    fail: onFail
  })
}

const deleteit = (url, onSuccess, onFail, authHeader='') => {
  wx.request({
    url: url,
    method: 'DELETE',
    header: {
      'content-type': 'application/json',
      'Authorization': authHeader,
    },
    dataType: 'json',
    success(res) {
      if (res.statusCode === 200) {
        onSuccess(res.data);
      } else {
        console.error("Ajax call failed. code: " + res.statusCode + " url: " + url + " errMsg: " + res.errMsg);
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
