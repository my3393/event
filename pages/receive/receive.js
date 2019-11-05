// pages/receve/receive.js
const app = getApp();
let province = [];
let citys = [];
let areas = [];
let towns = [];
let province_id = '';
let city_id = '';
let area_id = '';
let town_id = '';
let p_name;
let c_name;
let q_name;
let j_name
Page({

  /**
   * 页面的初始数据
   */
  data: {
    names:'',
    scope:'',
    minute:'',
    isardess: true,
    iscity: true,
    isprov: false,
    isjie: true,
    isart: true,
    isart2:true,
    xcxUrl:'',
    xcxAppId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      giftId: options.giftId
    })
    if (options.xcxUrl != '') {
      that.setData({
        xcxUrl: options.xcxUrl,
        xcxAppId: options.xcxAppId
      })
    }
   
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

  },
  cance:function(){
    var that = this;
    
    that.setData({
      isart: !that.data.isart,
    })
    wx.navigateBack({
      delta: 2
    })
  //  wx.redirectTo({
  //    url: '../e_mine/e_mine',
  //  })
  },
  deter: function () {
    var that = this;
    this.setData({
      isart2: !that.data.isart2,
    })

    //娱乐世界
    wx.navigateToMiniProgram({
      appId: that.data.xcxAppId,
      path: that.data.xcxUrl,
      extraData: {

      },
      envVersion: 'release',
      success(res) {
        // 打开成功
      },
      fail() {
        wx.navigateBack({
          delta: 1
        })
      }
    })
   
  },
  //入驻提交
  submit: function (e) {

    var that = this;
    var province_idreg = province_id;
    var city_idreg = city_id;
    var area_idreg = area_id;
    var town_idreg = town_id;
    var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (that.data.names == '') {
      wx.showToast({
        title: '请输入收件人姓名',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false
    } else if (that.data.scope == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (province_idreg == '') {
      wx.showToast({
        title: '请输入所在省',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (city_idreg == '') {
      wx.showToast({
        title: '请输入所在市',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (area_idreg == '') {
      wx.showToast({
        title: '请输入所在区',
        icon: 'none',
        duration: 1500
      })
      return false;
    }else if (that.data.minute == '') {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none'
      })
      return false
    } else if (that.data.scope.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (!phonetel.test(that.data.scope)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    return that.getxcx();
  },
  //收件人
  names: function (e) {
    var names = e.detail.value
    this.setData({
      names: names
    })

  },
  //手机号
  scope: function (e) {
    var scope = e.detail.value
    this.setData({
      scope: scope
    })

  },
  //详细地址
  minute: function (e) {
    var minute = e.detail.value
    this.setData({
      minute: minute
    })

  },
  //选择地址
  diz: function () {
    this.getprov();
    this.setData({
      isardess: false,
      isprov: false,
      isqu: true,
      iscity: true,
      isjie: true,
    })
  },
  //省
  getprov: function () {
    var that = this;
    province = []
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
  },
  // 省跳市
  getprovs: function (e) {
    var that = this;
    console.log(e)
    citys = [];
    province_id = e.currentTarget.id;
    p_name = e.currentTarget.dataset.name
    var nowTime = new Date();
    if (nowTime - this.data.tapTime < 500) {
      console.log('阻断')
      return;
    }
    // 获取所有市
    wx.request({
      url: app.data.urlmall + "/apparea/nextlist.do",
      data: {
        grade: '2',
        id: province_id,
        token: wx.getStorageSync('etoken'),
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
            isprov: true,
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
    this.setData({ tapTime: nowTime });
  },
  // 市跳区
  getcity: function (e) {
    var that = this;
    areas = []
    city_id = e.currentTarget.id;;
    c_name = e.currentTarget.dataset.name
    var nowTime = new Date();
    if (nowTime - this.data.tapTime < 500) {
      console.log('阻断')
      return;
    }
    // 获取所有区
    wx.request({
      url: app.data.urlmall + "/apparea/nextlist.do",
      data: {
        grade: '3',
        id: city_id,
        token: wx.getStorageSync('etoken'),
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
            area: areas,
            iscity: true,
            isqu: false,

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
    this.setData({ tapTime: nowTime });
  },
  // 区跳街道
  getarea: function (e) {
    var that = this;
    towns = []
    q_name = e.currentTarget.dataset.name
    area_id = e.currentTarget.id;
    var nowTime = new Date();
    if (nowTime - this.data.tapTime < 500) {
      console.log('阻断')
      return;
    }
    // 获取所有区
    wx.request({
      url: app.data.urlmall + "/apparea/nextlist.do",
      data: {
        grade: '4',
        id: area_id,
        token: wx.getStorageSync('etoken'),
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
            town: towns,
            isjie: false,
            isqu: true,
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
    this.setData({ tapTime: nowTime });
  },
  //街道
  gettown: function (e) {
    var that = this;
    towns = []
    console.log(e)
    town_id = e.currentTarget.id;
    j_name = e.currentTarget.dataset.name;
    that.setData({ //给变量赋值
      addres: p_name + '-' + c_name + '-' + q_name + '-' + j_name,
      isardess: true,
    })
  },
})