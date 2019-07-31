// pages/e_player/e_player.js
var app = getApp();
var list= [];
var bcode;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isyds:true,
    id:'',
    detail:[],
    photos:[],
    
    before:'',
    fileType:'1',//照片文件类型
    votelist:[],
    refue:[],
    currentPage:1,
    totalPage:'',
    tar:'',
    tab:'',
    tag:[
      {id:1,name:'照片'},
      {id:2,name:'作品'}
    ],
    videos:[],//作品
    isvideo:true,
    artId:false,
    user:[],
    saiId:'',//赛事id
    is_actor:'',
    text:'',
    systemInfo:'',
    ishelp:true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        id:options.id,
        saiId:options.saiid
      })
      console.log(this.data.saiId)
      this.getdetail();
      this.getdetailss();
      this.getrefue();
      this.getvote();
      this.getphoto();
      this.getvideo();
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
    var that =this;
    setTimeout(function () {
      
      wx.setNavigationBarTitle({
        title: that.data.detail.userName,
      })
    }, 500)
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        bcode = res.data.user_id;
        that.setData({
          is_actor: res.data.is_actor
        })
        console.log(bcode)
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that =this;
    // list= []
    // that.setData({
    //   refue: [],
    // })
   
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this;
    list = [];
    that.setData({
      refue:[],
    })
    
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
        title: '已经到底了',
        icon: 'none'
      })
    } else {
      that.setData({
        currentPage: that.data.currentPage + 1
      })
      this.getrefue();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
      return {
        title: '我是' + that.data.detail.playerNumber + '号' + that.data.detail.userName + '我正在参加' + that.data.text + '快来投我一票吧' ,
        path: '/pages/e_home/e_home?playId=' + that.data.id + '&saiId=' + that.data.saiId,
        success: function (res) {
          // 转发成功
          wx.showToast({
            title: '转发成功',

          })
          wx.request({
            url: app.data.urlmall + "/apppcompetitionplayer/addforward.do",
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
               
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none'
                })
              }
            }
          })
        },
        fail: function (res) {
          // 转发失败
          wx.showToast({
            title: '转发失败',
            icon : 'none'
          })
        }
      }     
  },
  //照片作品切换
  tag: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.num)
    that.setData({
      tar: e.currentTarget.dataset.num,
      tab: e.currentTarget.dataset.num,
      fileType: e.currentTarget.dataset.num + 1
    })
    console.log(that.data.fileType)

  },
  lticket:function(e){
    var that = this;
    that.setData({
      isyds:!that.data.isyds
    })
  },
  know: function (e) {
    var that = this;
    that.setData({
      isyds: !that.data.isyds
    })
  },
  
  //查看作品
  hidevideo: function (e) {
    var that = this;
    that.setData({
      isvideo: !that.data.isvideo
    })
  },
  seevideo: function (e) {
    var that = this;
    that.setData({
      isvideo: !that.data.isvideo,
      play: e.currentTarget.dataset.src
    })
  },
  //详情
  getdetail: function (e) {
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
        var  before = res.data.data.beforeStarValue - res.data.data.starValue;
          if(before < 0){
             before = 0
          }
          if (bcode == res.data.data.userId){
            that.setData({
              artId:true
            })
          }
          that.setData({
            detail: res.data.data,
            before:before,
            
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
  //赛事详情
  getdetailss: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlmall + "/appcompetition/detail.do",
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
             text: res.data.data.competitionTitle
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
  //个人照片
  getphoto: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlmall + "/apppcompetitionplayer/filelist.do",
      data: {
        id: that.data.id,
        token: wx.getStorageSync('etoken'),
        fileType: that.data.fileType,
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
            photos:res.data.data
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
  //个人作品
  getvideo: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlmall + "/apppcompetitionplayer/filelist.do",
      data: {
        id: that.data.id,
        token: wx.getStorageSync('etoken'),
        fileType: 2
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
            videos: res.data.data
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
  //投票列表
  getvote: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlmall + "/apppcompetitionplayer/votelist.do",
      data: {
        id: that.data.id,
        token: wx.getStorageSync('etoken'),
        currentPage:that.data.currentPage
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
            votelist: res.data.data.data,
            
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
  //助力列表
  getrefue: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlmall + "/apppcompetitionplayer/refuellist.do",
      data: {
        id: that.data.id,
        currentPage:that.data.currentPage,
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
          for (var i in res.data.data.data) {
            list.push(res.data.data.data[i])
          }
          that.setData({
            refue: list,
            totalPage: res.data.data.totalPage
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
  //投票
  vote: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlmall + "/apppcompetitionplayer/addvote.do",
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
            title: '感谢你宝贵的一票',
            icon: 'none'
          })
        } else if (res.data.status === 101) {
          wx.showToast({
            title: '你已投票，请明天再来吧',
            icon: 'none'
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
  help: function () {
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
            url: '../e_help/e_help?id=' + that.data.id,
          })  
          
        } 
      }
    })
    
  },
  tis:function(){
    var that = this;
    that.setData({
      ishelp: !that.data.ishelp
    })
  },
  //预约
  online:function(e){
    // wx.navigateTo({
    //   url: '../e_online/e_online?id=' + e.currentTarget.id,
    // })
    wx.navigateToMiniProgram({
      appId: 'wxf556b39ee9c934b4',
      path: 'pages/funcicle_detail/funcicle_detail?user_id=' + e.currentTarget.id,
      extraData: {
        foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
  },
  //首页
  home: function (e) {
    wx.reLaunch({
      url: '../e_home/e_home',
    })
  },
  //查看赛事
  sai: function (e) {
    wx.redirectTo({
      url: '../e_detail/e_detail?id=' + this.data.saiId,
    })
  },
  //报名
  subm: function (e) {
    wx.navigateTo({
      url: '../e_division/e_division?id=' + this.data.saiId,
    })
  },
})