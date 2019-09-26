// pages/fucicle_detail/fucicle_detail.js
const app = getApp();
var article_id = '';
var bcode;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        datas: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        console.log(options)
        wx.showLoading();
        wx.request({
          url: app.data.urlmall + "/appartist/detail.do",
            data: {
              token:wx.getStorageSync('etoken'),
              artistId: options.user_id
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function (res) {
                console.log(res.data.data)
                if (res.data.status == 100) {
                    article_id = res.data.data.user_id;
                    wx.hideLoading();
                    that.setData({
                        datas: res.data.data
                    });
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
        console.log(this.options.bindcode+"sdasdas")
      var that = this;
      setTimeout(function () {

        wx.setNavigationBarTitle({
          title: that.data.datas.userName,
        })
      }, 500)
        wx.setStorage({
            key: 'bcode',
            data: this.options.bindcode,
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
        var that = this;
        
      var isactor = wx.getStorageSync("userinfo").is_actor;
      var isleagure = wx.getStorageSync("userinfo").shareIdentityType;
      var hasdiol = wx.getStorageSync("userinfo").idol_id;
      var bcode;
      var scode;
      if (isactor == 2) {
        bcode = wx.getStorageSync("userinfo").user_id;
        scode = wx.getStorageSync("userinfo").user_id;
      } else if (isleagure != 0 && hasdiol == null) {
        bcode = wx.getStorageSync("userinfo").user_id;
        scode = wx.getStorageSync("userinfo").user_id;
      } else if (isleagure != 0 && hasdiol != null) {
        bcode = wx.getStorageSync("userinfo").idol_id;
        scode = wx.getStorageSync("userinfo").user_id;
      } else if (hasdiol != null || hasdiol != "") {
        bcode = wx.getStorageSync("userinfo").idol_id;
        scode = wx.getStorageSync("userinfo").user_id;
      } else {
        bcode = wx.getStorageSync("userinfo").user_id;
        scode = wx.getStorageSync("userinfo").user_id;
      }
      return {
        title: '我是' + that.data.datas.name + ",我在娱乐世界等你",
        path: '/pages/funcicle/funcicle?bindcode=' + bcode + "&scode=" + scode
      }
    },
    yuyue: function(e){
      //娱乐世界
        wx.navigateToMiniProgram({
          appId: 'wxf556b39ee9c934b4',
          path: 'pages/funcicle/funcicle',
          extraData: {

          },
          envVersion: 'release',
          success(res) {
            // 打开成功
          }
        })
     
    }
})