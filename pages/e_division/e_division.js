// pages/e_division/e_division.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    saiId:'',
    detail:[],
    num:100,
    id:'',
    isart:true,
    pay:'',
    is_actor:'',
    art:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
     console.log(options)
     that.setData({
       saiId: options.id,
       pay: options.num,
       art:options.art
     })
    console.log(that.data.pay)
    wx.request({
      url: app.data.urlmall + "/appcompetition/competitionarea.do",
      data: {
        id: that.data.saiId,
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
            detail: res.data.data,

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
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        console.log(res.data.is_actor)
        that.setData({
          is_actor: res.data.is_actor
        })
      }
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

  },
  tap:function(e){
    console.log(e)
    this.setData({
      num : e.currentTarget.dataset.index,
      id:e.currentTarget.id 
    })
    console.log(this.data.id)
  },
  //提交
  submit:function(e){
    var that = this;
    console.log(that.data.is_actor)
    if(that.data.id == ''){
       wx.showToast({
         title: '请选择赛区',
         icon:'none'
       })
    }else if (that.data.is_actor == 2) {
      if (that.data.art == 0) {
        wx.request({
          url: app.data.urlmall + "/apppcompetitionsignup/artistjoin.do",
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
              wx.showToast({
                title: '报名成功',
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
        wx.request({
          url: app.data.urlmall + "/apppcompetitionsignup/artistjoin/xcxpay.do",
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
              wx.requestPayment({
                timeStamp: res.data.data.sign.timeStamp,
                nonceStr: res.data.data.sign.nonceStr,
                package: res.data.data.sign.package,
                signType: 'MD5',
                paySign: res.data.data.sign.paySign,
                success(res) {
                  wx.showToast({
                    title: '报名成功',
                    icon: 'none',
                    duration: 1000
                  })
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
      }

    }else {
      this.setData({
        isart: !that.data.isart
      })

    }
  },
  //报名弹窗
  cance: function () {
    var that = this;
    that.setData({
      isart: !that.data.isart
    })
  },
  deter: function () {
    var that = this;
    console.log(that.data.isUser)
    wx.navigateTo({
      url: '../e_artist/e_artist?id=' + that.data.id + '&npay=' + that.data.pay,
    })
  },
})