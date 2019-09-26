// pages/receve/receive.js
const app = getApp();
let province_id = '';
let city_id = '';
let citys = [];
let areas = [];
let towns = [];
let area_id = '';
let town_id = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    names:'',
    scope:'',
    minute:'',
    provinceId: '',
    cityId: '',
    areaId: '',
    townId: '',
    province: [],
    poindex: 0,
    city: [],
    cindex: 0,
    area: [],
    aindex: 0,
    town: [],
    tindex: 0,
    iscity: true,
    isqu: true,
    isart:true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      giftId: options.giftId
    })
    // 获取所有省
    var province = [{
      id: '',
      name: '请选择所在省'
    }]
    //省
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
    // wx.navigateBack({
    //   delta: 1
    // })
   wx.redirectTo({
     url: '../e_mine/e_mine',
   })
  },
  deter: function () {
    var that = this;
    this.setData({
      isart: !that.data.isart,
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
  getxcx: function () {
    var that = this;
    wx.request({
      url: app.data.urlmall + "appuserinfo/receivegift.do",
      data: {
        token: wx.getStorageSync('etoken'),
        consigneeName: that.data.names,
        consigneePhone: that.data.scope,
        provinceId: province_id,
        cityId: city_id,
        areaId: area_id,
        address: that.data.minute,
        giftId: that.data.giftId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {
          // wx.showToast({
          //   title: '礼品准备中,请耐心等待',
          //   icon: 'none',
          //   duration: 3000
          // })
          that.setData({
            isart:!that.data.isart
          })
          // setTimeout(function () {
          //   wx.navigateBack({
          //     delta: 1
          //   })
          // }, 3000)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  }
})