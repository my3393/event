// pages/e_hot/e_hot.js
var poster;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    posters: '../../images/addtu.png',
    price:'',
    days:'',
    prices:'',
    players:[],
    isshow:true,
    checked:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
     this.setData({
       id:options.id
     })
     this.getplayer();
    wx.request({
      url: app.data.urlmall + "/appcompetitionpay/hotprice.do",
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
            prices: res.data.data,

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
  close: function () {
    var that = this;
    this.setData({
      isshow: !this.data.isshow
    })
  },
  getplayer: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlmall + "/appcompetition/detail.do",
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
  chooseImage(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        console.log(res.tempFilePaths[0]);
        var tempFilePaths = res.tempFilePaths;
        wx.showLoading();
        wx.uploadFile({
          url: app.data.urlmall + '/appylsjfile/xcxfileprogerssupload.do', // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
          },
          formData: {
            'token': wx.getStorageSync("etoken"),
            'file': tempFilePaths[0]
          },
          dataType: 'json',
          success(res) { 
            let datas = JSON.parse(res.data)
            console.log(datas.data.fileName)
            poster = datas.data.fileName;
            console.log(poster)
            wx.hideLoading();
            // do something
          }
        })
        that.setData({
          posters: res.tempFilePaths[0]
        })
      }
    })
  },
  //查看服务协议
  chak:function(){
    wx.navigateTo({
      url: '../e_serviceAgree/e_serviceAgree',
    })
  },
  inputs:function(e){
    this.setData({
      days: e.detail.value,
      price: e.detail.value * this.data.prices
    })
  },
  pay: function () {
    var that = this;
    if (that.data.days == '') {
      wx.showToast({
        title: '请选择天数',
        icon: 'none'
      })
    } else if (that.data.checked == false) {
      wx.showToast({
        title: '点击已阅读同意协议',
        icon: 'none'
      })

    } else if (that.data.posters == '../../images/addtu.png') {
      wx.showToast({
        title: '请上传图片',
        icon: 'none'
      })

    } else {
      wx.request({
        url: app.data.urlmall + "/appcompetitionpay/hotsuborder.do",
        data: {
          id: that.data.id,
          token: wx.getStorageSync('etoken'),
          days: that.data.days,
          imgPath:poster
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
                        title: '支付成功',
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

  },
  checked: function (e) {
    var that = this;
    var checked = that.data.checked;
    that.setData({
      checked: !checked,
    })

  },
})