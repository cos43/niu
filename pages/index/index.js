import {
  getToken,
  get,
  post
} from '../../utils/request'
import * as echarts from '../../ec-canvas/echarts';

function setOption(chart, data) {
  const x = data.map(item => item.m);
  const y = data.map(item => item.b);
  var option = {
    grid: { //方法 2
      borderWidth: 0,
      x: 20,
      y: 20,
      x2: 20,
      y2: 20,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: x,
      splitLine: {
        show: false // 不显示网格线
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false // 不显示网格线
      },
    },
    series: [{
      data: y,
      type: 'line',
      label: {
        show: true,
        formatter: function (data) {
          return data.value + '%';
        }
      },
    }]
  };
  chart.setOption(option);
}

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素比
  });
  canvas.setChart(chart);

  var option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }]
  };
  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      lazyLoad: true
    },
    x: 0,
    deviceList: [],
    currentDevice: 0,
    currentDevice: null,
    deviceDetail: null,
    batteryMileData: [],
    lastMax: 0,
    lastMile: 0,
  },
  onShareAppMessage() {
    return {
      title: '小牛有点牛',
      path: '/pages/index/index',
      promise 
    }
  },
  onTap: function (e) {
    const {
      x
    } = e.detail;
    this.data.x = x;
  },
  touchEnd() {
    if (this.data.x < 90) {
      this.setData({
        x: 0
      })
    }
  },
  onReady() {
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    console.log(document)
    // this.slider();
  },
  logout() {
    wx.clearStorage();
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  onLoad() {
    const token = getToken();
    if (token == null || token == undefined || token == "") {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      this.getDeviceList();
      this.getTrackList();
      this.getTraceList();
    }
  },
  getTraceList() {
    post("https://app-api.niu.com/v5/track/list/v3", {
      "index": 0,
      "sn": "FB2L393S930E8UNJ",
      "pagesize": 10
    }).then(res => {
      console.log(res)
    })
  },
  loadChart() {
    const self = this;
    this.ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      setOption(chart, self.data.batteryMileData);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false
      });
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  getTrackList() {
    const self = this;
    get("https://app-api.niu.com/v5/scooter/battery/chart?_=1692247536&bmsId=3&page=1&pageLength=2&page_size=A&sn=FB2L393S930E8UNJ").then(res => {
      const {
        items1,
        items2
      } = res.data.data
      let lastMax = items1[items1.length - 1].b;
      let lastMile = items1[items1.length - 1].m;
      for (let i = items1.length - 2; i >= 0; i--) {
        if (lastMax > items1[i].b) {
          lastMile = lastMile - items1[i - 1].m;
          break;
        } else {
          lastMax = items1[i].b;
        }
      }
      self.setData({
        lastMax,
        lastMile,
        batteryMileData: items1
      })
      self.loadChart();
    })
  },
  getDeviceDetail() {
    const self = this;
    const sn_id = this.data.currentDevice.sn_id;
    get("https://app-api-miniapp.niucache.com/v5/scooter/detail/" + sn_id).then(res => {
      console.log(res.data.data)
      const deviceDetail = res.data.data;
      self.setData({
        deviceDetail
      })
    })
  },
  getDeviceList() {
    const self = this;
    get("https://app-api-miniapp.niucache.com/v5/scooter/list").then(res => {
      console.log(res.data.data)
      const deviceList = res.data.data.items;
      const currentDevice = deviceList[0];
      self.setData({
        currentDevice
      })
      self.getDeviceDetail();

    })
  }

})