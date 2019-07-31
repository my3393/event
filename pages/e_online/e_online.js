// pages/yl_online/yl_online.js
var util = require('../../utils/times.js');
var app = getApp();
var token;
var wfee = [];
var title = '';
var startdate = '';
var enddate = '';
var province_id = '';
var city_id = '';
var citys = [];
var areas = [];
var towns = [];
var area_id = '';
var town_id = '';
var addrs = "";
var ccfee = "";
var persent = '';
var lids = '';
var article_id = '';
var bcode;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dfee: [],
    num: null,
    price: '',
    startdate: '请选择开始时间',
    enddate: '请选择结束时间',
    mrdate: util.formatTime(new Date),
    province: [],
    poindex: 0,
    city: [],
    cindex: 0,
    area: [],
    aindex: 0,
    town: [],
    tindex: 0,
    pricName:'',
    art:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    article_id = options.id
    var that = this;
    wx.getStorage({
      key: 'etoken',
      success: function (res) {
        token = res.data;
        wx.request({
          url: app.data.urlmall + "/appartistlabel/appearancetype.do",
          data: {
            token: token,
            
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          dataType: 'json',
          success: function (res) {
            console.log(res.data.data)
            if (res.data.status == 100) {
              wfee = res.data.data;
              that.setData({
                dfee: wfee
              });
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 500
              })
            }

          }
        });
      },
    })
    // 获取选手详情
    wx.request({
      url: app.data.urlmall + "/apppcompetitionplayer/detail.do",
      data: {
        token: wx.getStorageSync('etoken'),
        id: article_id,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        if (res.data.status == 100) {
          that.setData({
            art: res.data.data
          })

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 500
          })
        }

      }
    })
    // 获取所有省
    var province = [{
      id: '',
      name: '请选择所在省'
    }]
    wx.request({
      url: app.data.urlmall + "/apparea/nextlist.do",
      data: {
        grade: "1",
        token: wx.getStorageSync('etoken'),
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {
          for (var i in res.data.data) {
            province.push(res.data.data[i])
          }
          that.setData({
            province: province
          })

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
    // 初始化市
    citys = [{
      id: '',
      name: '请选择所在市'
    }]
    that.setData({
      city: citys
    })
    // 初始化区
    areas = [{
      id: '',
      name: '请选择所在区'
    }]
    that.setData({
      area: areas
    })
    // 初始化街道
    towns = [{
      id: '',
      name: '请选择所在街'
    }]
    that.setData({
      town: towns
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getStorage({
      key: 'token',
      success: function (res) {
        token = res.data;
      },
    })
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        bcode = res.data.user_id;
        console.log(bcode + "----")
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this;
    lids = "";
    token = '';
    title = '';
    startdate = '';
    enddate = '';
    province_id = '';
    city_id = '';
    area_id = '';
    town_id = '';
    addrs = '';
    ccfee = '';
    persent = '';
    that.setData({
      price: []
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log(wx.getStorageSync("userinfo").is_actor)
    return {
      title: '艺赛联盟',
      path: '/pages/e_home/e_home'
    }
  },
  choosefee: function (e) {
    console.log(e)
    lids = e.currentTarget.id;
    var that = this;
    if (e.currentTarget.dataset.minprice == undefined) {
      that.setData({
        price: '预约沟通',
        pricName: e.currentTarget.dataset.name
      })
    } else {
      that.setData({
        price: e.currentTarget.dataset.minprice + "-" + e.currentTarget.dataset.maxprice
      })
    }
    that.setData({
      num: e.currentTarget.dataset.num
    })
  },
  geititle: function (e) {
    title = e.detail.value;
    console.log(title)
  },
  bindDateChange: function (e) {
    this.setData({
      startdate: e.detail.value,
    })
    startdate = e.detail.value;
  },
  bindDateChange1: function (e) {
    this.setData({
      enddate: e.detail.value
    })
    enddate = e.detail.value;
  },
  // 省跳市
  getprov: function (e) {
    var that = this;
    console.log(e)
    that.setData({ //给变量赋值
      poindex: e.detail.value,
      cindex: 0,
      aindex: 0,
      tindex: 0
    })
    province_id = that.data.province[e.detail.value].id;
    city_id = '';
    area_id = '';
    town_id = '';
    console.log(province_id);
    citys = [{
      id: '',
      name: '请选择所在市'
    }]
    // 获取所有市
    wx.request({
      url: app.data.urlmall + "/apparea/nextlist.do",
      data: {
        grade: '2',
        token: wx.getStorageSync('etoken'),
        id: province_id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status == 100) {
          for (var i in res.data.data) {
            citys.push(res.data.data[i])
          }
          that.setData({
            city: citys,
            iscity: false
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 500
          })
        }

      }
    })
  },
  // 市跳区
  getcity: function (e) {
    var that = this;
    that.setData({ //给变量赋值
      cindex: e.detail.value,
      aindex: 0,
      tindex: 0
    })
    city_id = that.data.city[e.detail.value].id;
    area_id = 0;
    town_id = 0;
    console.log(city_id);
    areas = [{
      id: '',
      name: '请选择所在区'
    }]
    that.setData({
      isqu: false
    })
    // 获取所有区
    wx.request({
      url: app.data.urlmall + "/apparea/nextlist.do",
      data: {
        grade: '3',
        token: wx.getStorageSync('etoken'),
        id: city_id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status == 100) {
          for (var i in res.data.data) {
            areas.push(res.data.data[i])
          }
          that.setData({
            area: areas
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 500
          })
        }

      }
    })
  },
  // 区跳街道
  getarea: function (e) {
    var that = this;
    that.setData({ //给变量赋值
      aindex: e.detail.value,
      tindex: 0
    })
    area_id = that.data.area[e.detail.value].id;
    town_id = '';
    console.log(area_id);
    towns = [{
      id: '',
      name: '请选择所在街道'
    }]
    that.setData({
      isjie: false
    })
    // 获取街道
    wx.request({
      url: app.data.urlmall + "/apparea/nextlist.do",
      data: {
        grade: '4',
        token: wx.getStorageSync('etoken'),
        id: area_id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status == 100) {
          for (var i in res.data.data) {
            towns.push(res.data.data[i])
          }
          that.setData({
            town: towns
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 500
          })
        }

      }
    })
  },
  gettown: function (e) {
    var that = this;
    that.setData({ //给变量赋值
      tindex: e.detail.value,
    })
    town_id = that.data.town[e.detail.value].id;
    console.log(town_id);
  },
  getdetailaddr: function (e) {
    addrs = e.detail.value;
  },
  getfees: function (e) {
    ccfee = e.detail.value;
  },
  getpersent: function (e) {
    persent = e.detail.value;
  },
  subyl: function (e) {
    var that = this;
    console.log(that.data.art.userId)
    wx.getStorage({
      key: 'etoken',
      success: function (res) {
        if (lids == '') {
          wx.showToast({
            title: '请选择出场类型',
            icon: 'none'
          })
          return false;
        }
        if (title == '') {
          wx.showToast({
            title: '请输入活动主题',
            icon: 'none'
          })
          return false;
        }
        if (startdate == '') {
          wx.showToast({
            title: '请选择开始时间',
            icon: 'none'
          })
          return false;
        }
        if (enddate == '') {
          wx.showToast({
            title: '请选择结束时间',
            icon: 'none'
          })
          return false;
        }
        if (province_id == '') {
          wx.showToast({
            title: '请选择所在省',
            icon: 'none'
          })
          return false;
        }
        if (city_id == '') {
          wx.showToast({
            title: '请选择所在市',
            icon: 'none'
          })
          return false;
        }
        if (area_id == '') {
          wx.showToast({
            title: '请选择所在区',
            icon: 'none'
          })
          return false;
        }
        if (town_id == '') {
          wx.showToast({
            title: '请选择所在街道',
            icon: 'none'
          })
          return false;
        }
        if (addrs == '') {
          wx.showToast({
            title: '请输入详细地址',
            icon: 'none'
          })
          return false;
        }
        if (ccfee == '') {
          wx.showToast({
            title: '请输入活动预算',
            icon: 'none'
          })
          return false;
        }
        if (persent == '') {
          wx.showToast({
            title: '请输入活动详情',
            icon: 'none'
          })
          return false;
        }
        wx.showLoading({
          title: '正在提交...',
        })
        var shareUserId;
        setTimeout(function () {
          wx.getStorage({
            key: 'bcode',
            success: function (res) {
              shareUserId = res.data;
            },
          })
        }, 1000)
        setTimeout(function () {
          wx.request({
            url: app.data.urlmall + "/appointartist/submitinfo.do",
            data: {
              token: res.data,
              artistId: that.data.art.userId,
              typeName: that.data.pricName,
              activityTitle: title,
              startDate: startdate,
              endDate: enddate,
              provinceId: province_id,
              cityId: city_id,
              areaId: area_id,
              townId: town_id,
              address: addrs,
              budget: ccfee,
              activityDetail: persent,
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function (res) {
              console.log(res.data)
              if (res.data.status == 100) {
                wx.hideLoading();
                wx.showToast({
                  title: '提交预约成功',
                  icon: 'success',
                  duration: 1000
                })
                setTimeout(function () {
                  wx.switchTab({
                    url: '../e_home/e_home',
                  })
                }, 1000)
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none'
                })
              }

            }
          })
        }, 1200)
      },
    })
  }
})