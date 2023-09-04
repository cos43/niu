const getToken = () => {
  return wx.getStorageSync('token');
}
const request = function (url, options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: options.method,
      data: options.data,
      header: {
        'token': getToken(),
        'Content-Type': "application/json",
        "user-agent":"manager/5.1.8 (iPhone; iOS 17.0; Scale/3.00);deviceName=iPhone;timezone=Asia/Shanghai;model=iPhone14,3;lang=zh-CN;ostype=iOS;clientIdentifier=Domestic"
      },
      success: (res) => {
        if (res.data.code == 500) {
          reject(res.data.msg)
        } else {
          resolve(res)
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
module.exports = {
  get(url, data) {
    return request(url, {
      method: "GET",
      data
    })
  },
  post(url, data) {
    return request(url, {
      method: "POST",
      data
    })
  },getToken
}