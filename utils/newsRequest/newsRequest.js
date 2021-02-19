//第一
export function nRequest(url, data = {}, method,asyncMethod = true) {
  if (method == "" || method == undefined) {
    method = "post"
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method,
      async: asyncMethod,
      header: {
        "Content-Type": "application/json"
        // 'x-requested-with': 'XMLHttpRequest',
      },
      success: function (res) {
        // console.log('newsRequest', res)
        if (Number(res.statusCode) == 200) {
          resolve(res.data)
        } else {
          alert(res.data.msg)
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}
//第二
const header={
  // "Content-Type": "application/json",
  "Content-Type": "application/x-www-form-urlencoded"
}
export function nRequestAll(url, data = {}, method,asyncMethod = true) {
  let app = getApp()
  header['wxa-sessionid']=app.globalData.open_id
  // console.log('newsApp',app)
  if (method == "" || method == undefined) {
    method = "post"
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method,
      async: asyncMethod,
      header:header,
      success: function (res) {
        // console.log('newsRequestAll', res)
        if (Number(res.statusCode) == 200) {
          resolve(res.data)
        } else {
          alert(res.data.msg)
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

function alert(msg, type = "none") {
  var icon = type;
  return new Promise(function (resolve) {
    resolve(
      wx.showToast({
        icon: icon,
        title: msg,
        duration: 1500
      })
    );
  });
}