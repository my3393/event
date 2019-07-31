// pages/e_help/e_help.js
var app = getApp();
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
    chooid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
     that.setData({
       id:options.id
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
    this.setData({
      chooid:e.currentTarget.id,
      choo: e.currentTarget.dataset.index,
      price: e.currentTarget.dataset.price,
      name: e.currentTarget.dataset.name,
    })
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
              url: app.data.urlmall + "/appcompetitionpay/xcxpay.do",
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
                  wx.requestPayment({
                    timeStamp: res.data.data.sign.timeStamp,
                    nonceStr: res.data.data.sign.nonceStr,
                    package: res.data.data.sign.package,
                    signType: 'MD5',
                    paySign: res.data.data.sign.paySign,
                    success(res) {
                      wx.showToast({
                        title: '助力成功',
                        icon: 'none',
                        duration: 1000
                      })
                      
                      that.getplayer();
                      // var pages = getCurrentPages();//当前页面栈
                      // if (pages.length > 1) {
                      //   var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
                      //   var currPage = pages[pages.length - 1]; // 当前页面，若不对当前页面进行操作，可省去
                      //   // beforePage.setData({       //如果需要传参，可直接修改A页面的数据，若不需要，则可省去这一步
                      //   //   id: res.data.data
                      //   // })
                      //   beforePage.changeData();//触发父页面中的方法
                      // }
                      wx.navigateBack({
                        delta: 1
                      })
                    },
                    fail(res) {
                      wx.showToast({
                        title: '支付失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  })

                } else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none'
                  })
                }
              }
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        }
      })
    }
   
  },
})