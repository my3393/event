// pages/e_top/e_top.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:false,
    id:'',
    players:[],
    isshow:true,
    tar:'10',
    tag:[
      { id: 1 ,name: 5},
      { id: 2, name: 10 },
      { id: 3, name: 20 },
      { id: 4, name: 30 },
      { id: 5, name: 50 },
     
    ],
    ismon:true,
    price:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      that.setData({
        id: options.id
      })
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

  },
  checked: function (e) {
    var that = this;
    var checked = that.data.checked;
    that.setData({
      checked: !checked,

    })

  },
  //查看服务协议
  chak: function () {
    wx.navigateTo({
      url: '../e_serviceAgree/e_serviceAgree',
    })
  },
  getplayer: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlmall + "/appparticipateuser/detail.do",
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
  close:function(){
    var that = this;
    this.setData({
      isshow:!this.data.isshow
    })
  },
  chact:function(e){
    var that = this;
    that.setData({
      tar: e.currentTarget.dataset.index,
      ismon: true,
      price: e.currentTarget.dataset.price
    })
  },
  chacts: function (e) {
    var that = this;    
    that.setData({
      tar: 5,
      ismon: false,
      price:''
    })
    
  },
  pric:function(e){
    var that = this;
    console.log(e)
    that.setData({
       price: e.detail.value
    })
  },
  pay:function(){
    var that = this;
    if(that.data.price == ''){
       wx.showToast({
         title: '请选择价格',
         icon:'none'
       })
    }else if(that.data.checked == false){
      wx.showToast({
        title: '点击已阅读同意协议',
        icon: 'none'
      })

    }else{
      wx.request({
        url: app.data.urlmall + "/appcompetitionpay/playertopsuborder.do",
        data: {
          id: that.data.id,
          token: wx.getStorageSync('etoken'),
          inputPrice: that.data.price
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

                if (res.data.status === 100) {
                  wx.requestPayment({
                    timeStamp: res.data.data.sign.timeStamp,
                    nonceStr: res.data.data.sign.nonceStr,
                    package: res.data.data.sign.package,
                    signType: 'MD5',
                    paySign: res.data.data.sign.paySign,
                    success(res) {
                      wx.showToast({
                        title: '选手置顶成功',
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
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        }
      })
    }
   
  }
})