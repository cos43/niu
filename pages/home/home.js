
Page({

  data: {
    orderList: []
  },

  onLoad(options) {
  },

  getTrackList() {
    const url = "https://app-api.niu.com/v5/track/list/v3"
    const headers ={
      'User-Agent': `manager/5.1.8 (iPhone; iOS 17.0; Scale/3.00);deviceName=iPhone;timezone=Asia/Shanghai;model=iPhone14,3;lang=zh-CN;ostype=iOS;clientIdentifier=Domestic`,
      'Accept-Language': `zh-Hans-CN;q=1`,
      'token': `eyJhbGciOiJIUzUxMiIsImtpZCI6Ik5MbjQ4d2Fsc090TmtIdHFpVkVOSFB3RlA1TVdEa3ZhSmFCcSIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJyU3YzWDV3NzhybUI5WWNpNW45QzVoVldsWWtNdzVkZjhIMW9iRG1QVVJZd043RXNreVZLTTdyS0lYbG5EMGlMIiwiZXhwIjoxNjkyODM1NTA5LCJpYXQiOjE2OTIyMzA3MDkwNjU3NDQwMDksInN1YiI6ImRlZHdjOWExZms3cjV3dDdjc3N4Y2RhOCJ9.2qGjSzx4qgch5IxAumSuDpDX7aFLvC2m9aOQ5-HbskIEZHbdESBl5j9nCg8naL3KLQbmgrdhKBPdYoOGqhQTlw`
  };
    const body = `{"sn":"FB2L393S930E8UNJ","pagesize":10,"index":"0"}`;
    wx.request({
      url,
      method: "POST",
      header: headers,
      data: body,
      success: res => {
        console.log(res)
      }
    })
  },
  onReady() {

  },

  onShow() {

  },
  onHide() {

  },
  onUnload() {

  }
})