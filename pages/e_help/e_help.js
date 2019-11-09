// pages/e_help/e_help.js
var app = getApp();
let url = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    players:[],
    gift:[],
    choo:'10000',
    price:'',
    name:'',
    chooid:'',
    isart:true,
    isgif:true,
    isgift:true,
    ishelp:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
     console.log(options)
     that.setData({
       id:options.id,
       saiid:options.saiid,
       isGift: options.isGift
     })
     that.getgift();
     that.getplayer();
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
      var that = this;
      wx.getStorage({
        key: 'userinfo',
        success: function (res) {
          that.setData({
            userinfo: res.data
          });
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
    return {
      title: '艺赛联盟',
      path: '/pages/e_home/e_home'
    }
  },
  no:function(){
    var that = this;
    that.setData({
      isart:!that.data.isart
    })
  },
  shi:function(){
    var that = this;
    that.setData({
      isart: !that.data.isart
    })
    wx.navigateTo({
      url: '../recharge/recharge?id=' + that.data.saiid,
    })
  },
  que: function () {
    var that = this;
    if(url != ''){
      wx.navigateTo({
        url: '../e_advert/e_advert?src=' + url,
      })
    }
    this.setData({
      isgift: !that.data.isgift,
    })
    url = '';
    //that.getuser();
  },
  cance: function () {
    var that = this;
    wx.navigateTo({
      url: '../e_my-help/e_my-help'
    })
    that.setData({
      isgif: !that.data.isgif,
    })
    
  },
  deter: function () {
    var that = this;
    this.setData({
      isgif: !that.data.isgif,
    })
    //that.getuser();
  },
  haode: function () {
    var that = this;
    this.setData({
      ishelp: !that.data.ishelp,
    })
    //that.getuser();
  },
  getuser: function () {
    var that = this;
    wx.request({
      url: app.data.urlmall + "appuserinfo/getuserinfo.do",
      data: {
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
          that.setData({
            userinfo: res.data.data.user,

          })
          wx.setStorage({
            key: 'etoken',
            data: res.data.data.token,
          })
          wx.setStorage({
            key: 'userinfo',
            data: res.data.data.user,
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
  getplayer: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlmall + "/apppcompetitionplayer/detail.do",
      data: {
        id: that.data.id,
        token: wx.getStorageSync('etoken')
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {
          that.setData({
            players: res.data.data,

          })
          that.getuser();
        } else if (res.data.status == 105) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          wx.navigateTo({
            url: '../bindphone/bindphone',
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
  //礼物
  getgift: function(e) {
    var that = this;
    wx.request({
      url: app.data.urlmall + "/apppcompetitionplayer/refuelgift.do",
      data: {
        organizerId: that.data.saiid,
        token: wx.getStorageSync('etoken')
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {
          that.setData({
            gift: res.data.data,

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
  choose:function(e){
    console.log(e)
   
    if (e.currentTarget.dataset.url != '' && e.currentTarget.dataset.url != null){
      url = e.currentTarget.dataset.url
    }
    this.setData({
      chooid:e.currentTarget.id,
      choo: e.currentTarget.dataset.index,
      price: e.currentTarget.dataset.price,
      name: e.currentTarget.dataset.name,
    })
    if (e.currentTarget.dataset.gifttype == 2) {
      this.pay();
    }
  },
  //支付
  pay: function (e) {
    var that = this;
    if (that.data.chooid == ''){
      wx.showToast({
        title: '请先选择礼物',
        icon : 'none'
      })
    }else{
      wx.request({
        url: app.data.urlmall + "/appcompetitionpay/refuelsuborder.do",
        data: {
          id: that.data.id,
          giftId: that.data.chooid,
          token: wx.getStorageSync('etoken')
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',
        success: function (res) {
          if (res.data.status === 100) {
            wx.request({
              url: app.data.urlmall + "appcompetitionpay/integralpay.do",
              data: {
                token: wx.getStorageSync('etoken')
              },
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              dataType: 'json',
              success: function (res) {
                console.log(res.data.data)
                if (res.data.status === 100) {
                  
                  that.getplayer();   
                  if(that.data.isGift == 0){        
                    that.setData({
                      ishelp: !that.data.ishelp
                    })
                  }else{
                    that.getcanreceivegift();
                  }
                } else if (res.data.status === 106) {
                  console.log(111)
                  that.setData({
                    isart: !that.data.isart
                  })
                }else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none'
                  })
                }
              }
            })
            
          } else if (res.data.status === 103) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
            wx.navigateTo({
              url: '/pages/login/login',
            })

          } else if (res.data.status == 105) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
            wx.navigateTo({
              url: '../bindphone/bindphone',
            })
          }else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        }
      })
    }
   
  },
  //用户距离下一个礼品票数
  getcanreceivegift: function () {
    var that = this;
    wx.request({
      url: app.data.urlmall + "apppcompetitionplayer/obtainorganizergift.do",
      data: {
        token: wx.getStorageSync('etoken'),
        id: that.data.saiid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {
          that.setData({
            recegift: res.data.data,
          })
          if(res.data.data.giftType == 2) {

            that.setData({
              isgift: !that.data.isgift,
            })
          }else if (res.data.data.giftType == 1) {
            that.setData({
              isgif: !that.data.isgif,
            })
          }

        } else if (res.data.status === 103) {
          wx.showToast({
            title: '请重新登录',
            icon: 'none'
          })
          wx.navigateTo({
            url: '../login/login',
          })
        } else if (res.data.status == 105) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          wx.navigateTo({
            url: '../bindphone/bindphone',
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
})