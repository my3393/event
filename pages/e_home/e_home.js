// pages/e_home/e_home.js
var app = getApp();
var detail = [];

Page({
  handleContact(e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
  },
  /**
   * 页面的初始数据
   */
  data: {
    currentPage:1,
    totalPage: '',
    detail:[],
    isshow:'',
    startDatas:[],
    endDatas:[],
    status:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    detail = [];
    if (wx.getStorageSync('etoken')) {
      that.getdetail();
      console.log('token存在')
    } else {
      that.gettoken();
      console.log('token不存在')
    }
      // if(options.detailId){
      //   wx.navigateTo({
      //     url: '../e_detail/e_detail?id=' + options.detailId,
      //   })
      // } else if (options.playId && options.saiId){
      //   wx.navigateTo({
      //     url: '../e_player/e_player?id=' + options.detailId + '&saiid=' + options.saiId ,
      //   })
      // }
   
      
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
    // setTimeout(function(){
    //   that.getdetail();
    // },500)
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
       
        that.setData({
          user: res.data
        })
        
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
     var that = this;
    //  that.setData({
    //    currentPage: 1,
    //    totalPage: '',
    //    detail: [],
    //    isshow: '',
    //    startDatas: [],
    //    endDatas: [],
    //  })
    //  detail = [];
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this;
    that.setData({
      currentPage: 1,
      totalPage: '',
      detail: [],
      isshow: '',
      startDatas: [],
      endDatas: [],
    })
    detail = [];
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
   // wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.showToast({
      title: '刷新中',
      icon: "none"
    })
    var that = this;
    //模拟加载
    setTimeout(function () {
      detail = [];
      that.setData({
        detail: [],
        currentPage: 1,
        totalPage: '',
        isShelf: '',
      })
      that.getdetail();
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新

    },1000);
  },

  // 上拉触底
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
    return {
      title: '艺赛联盟',
      path: '/pages/e_home/e_home',
      
    }
  },
  yule: function (e) {
    //娱乐世界
    wx.navigateToMiniProgram({
      appId: 'wxf556b39ee9c934b4',
      path: 'pages/my_idol/my_idol',
      extraData: {

      },
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })

  },
  //我的
  mine:function(){
    wx.redirectTo({
      url: '../e_mine/e_mine',
    })
  },
  gettoken: function (e) {
    var that = this;
       
      wx.request({
        url: app.data.urlmall + "appcomeptition/default/token.do",
        data: {
         
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',
        success: function (res) {
          console.log(res.data.data)
          if (res.data.status === 100) {
            wx.setStorage({
              key: 'etoken',
              data: res.data.data.token,
            })
            wx.setStorage({
              key: 'userinfo',
              data: res.data.data.user,
            })
           setTimeout(function(){
             that.getdetail();
           },400)
          } else if (res.data.status === 103) {
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
  getdetail:function(e){
    var that = this;
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: app.data.urlmall + "/appcompetition/homelist.do",
        data: {
          currentPage: that.data.currentPage,
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
            wx.hideLoading()
            for (var i in res.data.data.data) {

              var date = Date.parse(new Date())
              var endDatas = Date.parse(res.data.data.data[i].endDate)
              var startDatas = Date.parse(res.data.data.data[i].startDate)
              var t2 = date - endDatas;
              var t1 = date - startDatas;
              if (t1 < 0) {
                res.data.data.data[i].isshow = 1
              } else if (t1 > 0 && t2 < 0) {
                res.data.data.data[i].isshow = 2
              } else if (t2 > 0) {
                res.data.data.data[i].isshow = 3

              }
              detail.push(res.data.data.data[i])
            }

            that.setData({
              detail: detail,
              
              totalPage: res.data.data.totalPage
            })
            
            console.log(that.data.endDatas)
          } else if (res.data.status === 103) {
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
  sumb:function(e){
    let that = this;
    if (that.data.user.user_id == null || that.data.user.user_id == '') {

      wx.showToast({
        title: '请先登录',
        icon: 'none',

      })
      wx.navigateTo({
        url: '../login/login',
      })

    }else{
      wx.navigateTo({
        url: '../e_release/e_release',
      })
    }
    
  },
  trun: function (e) {
    console.log(e)
      wx.navigateTo({
        url: '../e_detail/e_detail?id=' + e.currentTarget.dataset.id,
      })
  },
  //娱乐世界
  goylsj:function(){
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