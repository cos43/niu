const FormData = require('./formData.js')
import {
  hexMD5
} from "../../utils/md5.js"
Page({
 
  /**
   * 页面的初始数据
   */
  data: {

  },
  login(username, password) {
    const data = {
      account: username,
      app_id: "niu_03cn0n7v",
      grant_type: "password",
      country_code: 86,
      password: hexMD5(password),
      scope: "base"
    }
    wx.request({
      url: 'https://account.niu.com/v3/api/oauth2/token',
      method: "POST",
      header: {
        'Upload-Incomplete': '?0',
        'Connection': 'keep-alive',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'multipart/form-data; boundary=Boundary+E645C6C45CC90CFB',
        'Upload-Draft-Interop-Version': '3',
        'token': '',
        'User-Agent': 'manager/5.1.8 (iPhone; iOS 17.0; Scale/3.00);deviceName=iPhone;timezone=Asia/Shanghai;model=iPhone14,3;lang=zh-CN;ostype=iOS;clientIdentifier=Domestic',
        'Cookie': 'uvid=uv_ljln72wv_qdlcbycocdiydr2m',
        'Host': 'account.niu.com',
        'Accept-Language': 'zh-Hans-CN;q=1',
        'Accept': '*/*'
      },
      data: this.formdata(data),
      success: (res) => {
        if (!res.data.data.token) {
          wx.showToast({
            title: '账号或者密码错误',
            icon:'error'
          })
          return;
        }
        wx.setStorage({
          key: "token",
          data: res.data.data.token.access_token
        }).then(res => {
          wx.navigateTo({
            url: '/pages/index/index',
          })
        })
        wx.setStorageSync('user', res.data.data.user);

      },
      fail: (res) => {
        console.log(res)
      }
    })
  },
  formdata(obj = {}) {
    let result = ''
    for (let name of Object.keys(obj)) {
      let value = obj[name];
      result +=
        '\r\n--Boundary+E645C6C45CC90CFB' +
        '\r\nContent-Disposition: form-data; name=\"' + name + '\"' +
        '\r\n' +
        '\r\n' + value
    }
    return result + '\r\n--Boundary+E645C6C45CC90CFB--'
  },
  formSubmit(e) {
    const {
      phone,
      password
    } = e.detail.value;
    this.login(phone, password);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})