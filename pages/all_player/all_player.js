// pages/all_player/all_player.js
const app = getApp();
let play = [];
let splayer = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage:1,
    isSearch:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      id:options.id
    })
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

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    play = [];
    splayer = [];
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
    if (that.data.currentPage < that.data.totalPage) {
      that.setData({
        currentPage: that.data.currentPage + 1,
      })
      if (that.data.isSearch == false) {
        that.getplayer();
      } else {
        that.searchinps();
      }

    } else {
      wx.showToast({
        title: '已经到底了哦',
        icon: 'none'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //查看选手详情
  detail: function (e) {
    if(this.data.competitionType == 2){
      wx.navigateTo({
        url: '../e_player/e_player?id=' + e.currentTarget.id + '&saiid=' + this.data.id + '&isOrganization=' + this.data.detail.isOrganization,
      })
    }
  },
  //投票
  vote: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlmall + "/apppcompetitionplayer/addvote.do",
      data: {
        id: e.currentTarget.id,
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
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          })
          setTimeout(function () {
            play = [];
            that.setData({
              players: []
            })
            that.getplayer();
            // that.getdetail();
          }, 1500)
        }
        //  else if (res.data.status === 101){
        //   wx.showToast({
        //     title: '投票已上限，请明天再来吧',
        //     icon: 'none'
        //   })
        // } 
        else if (res.data.status === 103) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          wx.navigateTo({
            url: '/pages/login/login',
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
  //助力
  help: function (e) {
    var that = this;
    console.log(e)
    wx.navigateTo({
      url: '../e_help/e_help?saiid=' + that.data.id + '&isGift=' + this.data.detail.isGift + '&id=' + e.currentTarget.id,
    })
  },
  //艺人置顶
  top: function (e) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          systemInfo: res,
        })
        if (res.platform == "ios") {
          that.setData({
            ishelp: !that.data.ishelp
          })
          console.log('IOS')
        } else {
          wx.navigateTo({
            url: '../e_top/e_top?id=' + e.currentTarget.id,
          })

        }
      }
    })

  },
  //选手
  getplayer: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlmall + "apppcompetitionplayer/allplayerlist.do",
      data: {
        id: that.data.id,
        token: wx.getStorageSync('etoken'),
        // competitionAreaId: that.data.competitionAreaId,
        currentPage: that.data.currentPage
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {
          for (var i in res.data.data.data) {
            play.push(res.data.data.data[i])
          }

          that.setData({
            players: play,
            totalPage: res.data.data.totalPage
          })

        } else if (res.data.status === 103) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          wx.redirectTo({
            url: '/pages/login/login',
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
  //搜索
  searchinp: function (e) {
    var that = this;
    console.log(e);
    that.setData({
      isSearch: true,
      valu: e.detail.value
    })
    splayer = []
    wx.request({
      url: app.data.urlmall + "apppcompetitionplayer/allplayerlist.do",
      data: {
        id: that.data.id,
        token: wx.getStorageSync('etoken'),
        keyword: e.detail.value,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {
          for (var i in res.data.data.data) {
            splayer.push(res.data.data.data[i])
          }
          that.setData({
            splayer: splayer,

          })

        } else if (res.data.status === 103) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          wx.navigateTo({
            url: '/pages/login/login',
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
  searchinps: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlmall + "apppcompetitionplayer/allplayerlist.do",
      data: {
        id: that.data.id,
        token: wx.getStorageSync('etoken'),
        keyword: that.data.valu,
        currentPage: that.data.currentPage
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {
          for (var i in res.data.data.data) {
            splayer.push(res.data.data.data[i])
          }
          that.setData({
            splayer: splayer,
            totalPage: res.data.data.totalPage
          })


        } else if (res.data.status === 103) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          wx.navigateTo({
            url: '/pages/login/login',
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
  getdetail: function (e) {
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
          that.getplayer()      
          that.setData({
            detail: res.data.data,
            competitionType: res.data.data.competitionType,
          })
          console.log(that.data.seasonStartDate)
        } else if (res.data.status === 103) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          wx.redirectTo({
            url: '/pages/login/login',
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