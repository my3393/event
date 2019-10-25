// pages/my-help/e_my-help.js
const app = getApp();
let detail=[];
let saiid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isgift: true,
    vote: '',
    detail:[],
    nogift: true,
    currentPage:1,
    totalPage:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getdetail();
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
    detail = [];
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    detail= []
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
    var that = this;
    if (that.data.currentPage == that.data.totalPage) {
      wx.showToast({
        title: '没有更多了',
        icon: 'none'
      })
    } else {
      that.setData({
        currentPage: that.data.currentPage + 1,
      })
      that.getdetail();

    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //领取
  receive: function (e) {
    var that = this;
    saiid = e.currentTarget.id
    that.getzergift();
  },
  getdetail:function(){
    var that = this;
    wx.request({
      url: app.data.urlmall + "/appuserinfo/userrefuelvalue.do",
      data: {
        token: wx.getStorageSync('etoken'),
        currentPage: that.data.currentPage
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        if (res.data.status == 100) {
          for(var i in res.data.data.data){
            detail.push(res.data.data.data[i])
          }
          that.setData({
            detail: detail,
            totalPage: res.data.data.totalPage
          })

        } else if (res.data.status === 103) {
          wx.showToast({
            title: '请重新登录',
            icon: 'none'
          })
          wx.navigateTo({
            url: '../login/login',
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
  cance: function () {
    var that = this;
    that.setData({
      isgift: !that.data.isgift
    })
  },
  //领取礼品
  que: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      isgift: !that.data.isgift
    })
    wx.navigateTo({
      url: '../receive/receive?xcxAppId=' + that.data.recegift.xcxAppId + '&xcxUrl=' + that.data.recegift.xcxUrl + '&giftId=' + that.data.giftId,
    })
    // wx.navigateTo({
    //   url: '../receive/receive?giftId=' + that.data.giftId,
    // })
  },
  //查看赛事
  trun: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../e_detail/e_detail?id=' + e.currentTarget.id,
    })
  },
  record:function(e){
    wx.navigateTo({
      url: '../e_my-record/e_my-record',
    })
  },
  
  gohelp: function () {
    var that = this;
    wx.navigateTo({
      url: '../e_detail/e_detail?idx=' + 1 + '&tar=' + 1 + '&id=' + saiid,
    })
    that.setData({
      nogift: true,
    })
  },
  //当前赛事可领取的礼品
  getzergift: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlmall + "apppcompetitionplayer/obtainorganizergift.do",
      data: {
        token: wx.getStorageSync('etoken'),
        id: saiid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status == 100) {
          that.setData({
            gift:res.data.data
          })
          if (res.data.data == null) {
            wx.showToast({
              title: '当前赛事没有礼品哦',
              icon: 'none'
            })
          }else if (res.data.data.giftType == 1){
            that.setData({
              isgift: !that.data.isgift,
              giftId:res.data.data.id
            })
          } else if (res.data.data.giftType == 2) {
            that.setData({
              nogift: !that.data.nogift
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
})