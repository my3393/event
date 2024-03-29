// pages/e_player/e_player.js
var app = getApp();
var list= [];
var bcode;
var usid;
var ybm = false;
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
    user:'',
    saiId:'',//赛事id
    is_actor:'',
    text:'',
    systemInfo:'',
    ishelp:true,
    players:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options)
      this.setData({
        id:options.id,
        saiId:options.saiid,
        isOrganization: options.isOrganization,
      })
      console.log(this.data.saiId)
    if (wx.getStorageSync('etoken')) {
      that.getdetail();
      console.log('token存在')
    } else {
      that.gettoken();
      console.log('token不存在')
    }
      
      if(options.isOrganization == 0){
        
      }
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
       
        console.log(res.data)
        that.setData({
          is_actor: res.data.is_actor,
          user:res.data
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
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.showToast({
      title: '刷新中',
      icon: "none"
    })
    var that = this;
    //模拟加载
     list=[];
   
    setTimeout(function () {
    
      that.setData({
        detail: [],
        votelist: [],
        refue: [],
        videos:[],
      })
      that.getdetail();
      
      if (that.data.isOrganization == 0) {
        this.getphoto();
        this.getvideo();
      }
     
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新

    }, 1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    // if (that.data.currentPage == that.data.totalPage) {
    //   wx.showToast({
    //     title: '已经到底了',
    //     icon: 'none'
    //   })
    // } else {
    //   that.setData({
    //     currentPage: that.data.currentPage + 1
    //   })
    //   this.getrefue();
    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
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
           that.getdetail();
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })   
    return {
        title: '我正在参加' + that.data.text + ',快来投我一票吧~' ,
        path: '/pages/e_player/e_player?id=' + that.data.id + '&saiid=' + that.data.saiId,
      }  
      console.log(111)
    
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
  //广告
  getadvert() {
    let that = this;
    wx.request({
      url: app.data.urlmall + "appadbrandadvertise/xcxadvertise.do",
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


          //src:res.data.data.url

          wx.navigateTo({
            url: '../e_advert/e_advert?src=' + res.data.data.url,
          })
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
          setTimeout(function () {
            that.getdetail();
          }, 400)
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
  getplayer: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlmall + "/apppcompetitionplayer/playerlist.do",
      data: {
        id: that.data.id,
        token: wx.getStorageSync('etoken'),
        competitionAreaId: that.data.saiId,
        type:''
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
            players: res.data.data.data,
           
          })

        } else if (res.data.status === 103) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          wx.navigateTo({
            url: '/pages/login/login',
          })

        }else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  qwsc:function(){
    wx.navigateTo({
      url: '../e_upwork/e_upwork',
    })
  },
  //详情
  getdetail: function (e) {
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        bcode = res.data.user_id;
        
        console.log(bcode)
      },
    })
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
        that.getdetailss();
        that.getrefue();
        that.getvote();
      
       // that.getplayer();
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
            group: res.data.data.users
          })
          console.log(res.data.data)
          console.log(that.data.detail.competitionAreaName )
          if(res.data.data.playerType == 1){
            that.getphoto();
            that.getvideo();
          }
        } else if (res.data.status === 103) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          wx.navigateTo({
            url: '/pages/login/login',
          })

        }else {
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
             text: res.data.data.competitionTitle,
             event:res.data.data
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
  //投票列表
  getvote: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlmall + "/apppcompetitionplayer/votelist.do",
      data: {
        id: that.data.id,
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
      url: app.data.urlmall + "apppcompetitionplayer/refuellist.do",
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
          for (var i in res.data.data.data) {
            list.push(res.data.data.data[i])
          }
          that.setData({
            refue: res.data.data.data,
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
            icon: 'none',
            duration:2000
          })
          that.getadvert();
          that.getdetail();
          that.getvote();
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
  //艺人主页
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
  //助力
  help: function () {
    var that = this;
          wx.navigateTo({
            url: '../e_help/e_help?id=' + that.data.id + '&isGift=' + that.data.event.isGift + '&saiid=' + that.data.event.id,
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

   
    // wx.navigateToMiniProgram({
    //   appId: 'wxf556b39ee9c934b4',
    //   path: 'pages/funcicle_detail/funcicle_detail?user_id=' + e.currentTarget.id,
    //   extraData: {
    //     user_id: e.currentTarget.id
    //   },
    //   envVersion: 'release',
    //   success(res) {
    //     // 打开成功
    //   }
    // })
  },
  //首页
  home: function (e) {
    wx.reLaunch({
      url: '../e_home/e_home',
    })
  },
  //查看赛事
  sai: function (e){
    wx.redirectTo({
      url: '../e_detail/e_detail?id=' + this.data.saiId,
      
    })
  },
  //报名
  subm: function (e){
    var that = this; 
    
    if (that.data.user.phone == null || that.data.user.phone == '') {

          wx.showToast({
            title: '报名赛事需绑定手机号',
            icon: 'none',

          })
          wx.navigateTo({
            url: '../bindphone/bindphone',
          })

    } else if (that.data.event.isOrganization == 1){
      wx.navigateTo({
        url: '../e_division/e_division?id=' + that.data.saiId + '&num=' + that.data.event.isNewUserPay + '&art=' + that.data.event.isArtistUserPay + '&type=' + that.data.event.isOrganization,
      })
    } else if (that.data.event.isOrganization == 0){
      wx.navigateTo({
        url: '../e_divisions/e_divisions?id=' + that.data.saiId + '&num=' + that.data.event.isNewUserPay + '&art=' + that.data.event.isArtistUserPay + '&type=' + that.data.event.isOrganization,
      })
    } 

     
  },
})