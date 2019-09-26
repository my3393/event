// pages/e_detail/e_detail.js
var util = require('../../utils/util.js');

var app = getApp();
var play = [];
var splayer=[];
var rich;
var video = [];
var dynamic = [];
var ranklist = [];
var bcode;
var usid;
var seasonStartDate;
var cleartime;
var detail = [];
var ybm = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tar: "2",
    tab:'2',
    tas:'',
    istp: "",
    tag: [
      { id: 1, name: '动态' },
      { id: 2, name: '参赛选手' },
      { id: 3, name: '排行榜' },
      { id: 4, name: '活动视频' },
      { id: 5, name: '活动介绍' },
    ],
    tag2: [
      { id: 1, name: '动态' },
      { id: 2, name: '参赛选手' },
      { id: 4, name: '活动视频' },
      { id: 5, name: '活动介绍' },
    ],
    id:'',
    detail:[],
    photos:[],
    players:[],
    dynamic:[],
    dynamicphotos:[],
    p_currentPage:1,
    totalPage:'',
    ranklist:[],
    top_1:'',
    top_2:'',
    top_3:'',
    video:[],
    days:'',
    hours:'',
    min:'',
    miao:'',
    daySea: '',
    hourSea: '',
    minSea: '',
    miaoSea: '',
    istime:1,
    endDate:'',
    time:'',
   
    isSearch:false,
    splayer:[],
    isart:true,
    isSai:true,
    isvideo: true,
    play:'',
    isArtistUserPay:'',//艺人是否付费
    isNewUserPay:'',//新用户是否付费
    rich:'',
    eventId:'',
    v_totalPage:'',//
    competitionAreaId:'',//赛区id
    narea:'',
    competitionName:'',//赛区名称
    qualifiedNumber:'',//晋级人数
    seaEndtDate:'',//复赛结束时间
    competitionType:'',//赛事类型
    x_totalPage:'',//选手总条数
    p_totalPage :'',//排行榜总条数
    d_totalPage:'',//动态总条数
    h_totalPage : '',//活动视频总条数
    d_currentPage:1,
    h_currentPage:1,
    x_currentPage:1,
    seasonStartDate:'',
    competitionTitle:'',
    fullScreenFlag : false,
    isLive:'',
    ishelp:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    console.log(time)
    // 再通过setData更改Page()里面的data，动态更新页面的数据
     that.setData({
       id:options.id,
       time: time
     })
    that.getdetail();
    setTimeout(function(){
     
    },500)
     setInterval(function () {
      that.setData({
        time: util.formatTime(new Date())
      })
      that.gettime();
      that.settime();

    }, 1000)

    console.log(that.data.endDate)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.Player = wx.createLivePlayerContext('player');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    var a = this.data.time
    console.log(a.split("-"))
    var that = this;
    setTimeout(function () {
      console.log(that.data)
      wx.setNavigationBarTitle({
        title: that.data.detail.competitionTitle,
      })
    }, 500)
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        bcode = res.data.user_id;
        that.setData({
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
    that.setData({
       istp:'',
      isSearch: false,
      isart:true,
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this;
    ranklist = [];
    that.setData({
      istp: '',
      isSearch: false,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
     wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.showToast({
      title: '刷新中',
      icon: "none"
    })
    var that = this;
     play = [];
     rich;
    ranklist=[]
     video = []; 
     dynamic = [];
     splayer =[];
     seasonStartDate;
    //模拟加载
    setTimeout(function () {
      detail = [];
      that.setData({
       
        detail: [],
        photos: [],
        players: [],
        dynamic: [],
        dynamicphotos: [],
        currentPage: 1,
        totalPage: '',
        ranklist: [],
        top_1: '',
        top_2: '',
        top_3: '',
        video: [],
        days: '',
        hours: '',
        min: '',
        miao: '',
        daySea: '',
        hourSea: '',
        minSea: '',
        miaoSea: '',
        endDate: '',
        
        isSearch: false,
        splayer: [],
        isart: true,
        isSai: true,
        isvideo: true,
        play: '',
        isArtistUserPay: '',//艺人是否付费
        isNewUserPay: '',//新用户是否付费
        rich: '',
        eventId: '',
        v_totalPage: '',//
        competitionAreaId: '',//赛区id
        narea: '',
        competitionName: '',//赛区名称
        qualifiedNumber: '',//晋级人数
        seaEndtDate: '',//复赛结束时间
        competitionType: '',//赛事类型
        x_totalPage: '',//选手总条数
        p_totalPage: '',//排行榜总条数
        d_totalPage: '',//动态总条数
        h_totalPage: '',//活动视频总条数
        d_currentPage: 1,
        h_currentPage: 1,
        x_currentPage: 1,
        seasonStartDate: ''
      })
      
      setTimeout(function () {
        that.getdetail();
       
        that.gettime();
        that.settime();
      }, 500)
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
    //动态
    if (that.data.d_currentPage == that.data.d_totalPage) {
      wx.showToast({
        title: '已经到底了哦',
        icon: 'none'
      })
    }else {
      console.log(that.data.d_currentPage)
      console.log(that.data.d_totalPage)
      that.setData({
        d_currentPage: that.data.d_currentPage + 1,
      })
      that.getdynamic();

    }
    //选手
    if (that.data.x_currentPage == that.data.x_totalPage) {
      wx.showToast({
        title: '已经到底了哦',
        icon: 'none'
      })
    }else {
      that.setData({
        x_currentPage: that.data.x_currentPage + 1,
      })
      if (that.data.isSearch == false){
       that.getplayer();
      }else{
        that.searchinps();
      }
    }
    //排行榜
    if (that.data.p_currentPage == that.data.p_totalPage) {
      wx.showToast({
        title: '已经到底了哦',
        icon: 'none'
      })
    } else {
      that.setData({
        currentPage: that.data.currentPage + 1,
      })
      that.getranklist();

    }
    //活动视频
    if (that.data.h_currentPage == that.data.h_totalPage) {
      wx.showToast({
        title: '已经到底了哦',
        icon: 'none'
      })
    }else {
      that.setData({
        h_currentPage: that.data.h_currentPage + 1,
      })
      that.getvideo();

    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    console.log(that.data.detail.name)
     return{
       title: that.data.detail.competitionTitle + '正在火热进行中，快来报名参加吧!',
       path: '/pages/e_detail/e_detail?id=' + that.data.id,
     }
  },
  statechange(e) {
    console.log('live-player code:', e.detail.code)
    this.setData({
      isLive: 1
    })
  },
  error(e) {
    console.error('live-player error:', e.detail.errMsg)
    this.setData({
      isLive:2
    })
  },
  //全屏
  bindfull:function(){
   //var play =  wx.createLivePlayerContext('Player', this)
    // livePlayerContext.requestFullScreen({
      
    // })
    var that = this;
    //全屏
   
    var fullScreenFlag = that.data.fullScreenFlag;
    if (fullScreenFlag) {
      fullScreenFlag = false;
    } else {
      fullScreenFlag = true;
    }
    if (fullScreenFlag) {
      //全屏
      that.Player.requestFullScreen({
        direction: 90,
        success: res => {
          that.setData({
            fullScreenFlag: fullScreenFlag
          });
          console.log('我要执行了');
        },
        fail: res => {
          console.log('fullscreen fail');
        }
      });

    } else {
      //缩小
      that.Player.exitFullScreen({
        success: res => {
          console.log('fullscreen success');
          that.setData({
            fullScreenFlag: fullScreenFlag
          });
        },
        fail: res => {
          console.log('exit fullscreen success');
        }
      });
    }
  },
  tis: function () {
    var that = this;
    that.setData({
      ishelp: !that.data.ishelp
    })
  },
  //商品切换
  tag: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.num);
    play= [];
    dynamic=[];
    video=[];
    splayer=[];
    that.setData({
      isSearch:false,
      splayer:[],
      players:[],
      dynamic:[],
      video:[],
      p_currentPage:1,
      h_currentPage:1,
      d_currentPage:1,
      x_currentPage:1,
      
      tar: e.currentTarget.dataset.num,
      tab: e.currentTarget.dataset.num
    })
    
    that.getplayer();
    that.getranklist();
    that.getdynamic();
    that.getvideo();
  },
  getdetail: function (e) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.data.urlmall + "/appcompetition/detail.do",
      data: {
        id : that.data.id,
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
          that.getplayer();
          that.getdynamic();
          that.getranklist();
          that.getvideo();
          that.getintroduce();
          wx.hideLoading()
          if (res.data.data.competitionType == 1){
            that.setData({
              istp: 1,
             
            })
            
          }
            seasonStartDate = res.data.data.seasonStartDate.split(' ')
           var seasonEndtDate = res.data.data.seasonEndtDate.split(' ')
          var star = seasonStartDate[0]
          var eND = seasonEndtDate[0]
          
          var date = Date.parse(that.data.time)
          var endDatas = Date.parse(res.data.data.endDate.replace(/-/g, '/'))
          var startDatas = Date.parse(res.data.data.startDate.replace(/-/g, '/'))
          var seasonEndtDate = Date.parse(res.data.data.seasonEndtDate.replace(/-/g, '/'))
          var seasonStartDate = Date.parse(res.data.data.seasonStartDate.replace(/-/g, '/'))
          
          var t2 = date - endDatas;
          var t1 = date - startDatas;
          var t3 = date - seasonStartDate;
          var t4 = date - seasonEndtDate;
          console.log(t2)
          if (t1 < 0){
            that.setData({
              istime:1
            })
          } else if (t1 > 0 && t2 < 0){
            that.setData({
              istime: 2
            })
          }else if(t2>0 && t3<0){
            that.setData({
              istime: 3
            })
          } else if (t3 > 0 && t4 < 0) {
            that.setData({
              istime: 4
            })
          } else if (t4>0) {
            that.setData({
              istime: 5
            })
          };
          
          console.log(that.data.istime)
          that.setData({
            competitionAreaId: res.data.data.competitionAreaId,
            competitionName: res.data.data.competitionAreaName,
            qualifiedNumber: res.data.data.areaQualifiedNumber,
            detail:res.data.data,
            photos: res.data.data.posters,
            endDate: res.data.data.endDate,
            seasonEndtDate: res.data.data.seasonEndtDate,
            isNewUserPay: res.data.data.isNewUserPay,
            isArtistUserPay: res.data.data.isArtistUserPay,
            competitionType: res.data.data.competitionType,
            seasonStartDate: star,
            seaEndtDate : eND,
            competitionTitle:res.data.data.competitionTitle,
            isLive: res.data.data.isLive,
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

        }else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  //选手
  getplayer: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlmall + "/apppcompetitionplayer/playerlist.do",
      data: {
        id: that.data.id,
        token: wx.getStorageSync('etoken'),
        competitionAreaId: that.data.competitionAreaId,
        currentPage:that.data.x_currentPage
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {
          for (var i in res.data.data.data){
            play.push(res.data.data.data[i])
          }
         
          that.setData({
            players:play,
            x_totalPage: res.data.data.totalPage
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
  //动态
  getdynamic:function(e){
    var that = this;
    wx.request({
      url: app.data.urlmall + "/appcompetitiondynamic/list.do",
      data: {
        id: that.data.id,
        token: wx.getStorageSync('etoken'),
        currentPage:that.data.d_currentPage
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
           
        if (res.data.status === 100) {
          for(var i in res.data.data.data){
            dynamic.push(res.data.data.data[i])
          }
           
          that.setData({
            dynamic: dynamic,
            d_totalPage:res.data.data.totalPage,
           // dynamicphotos: res.data.data.data.photos
          })
         console.log(that.data.d_totalPage)
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
  //点赞
  praise:function(e){
    var that = this;
    wx.request({
      url: app.data.urlmall + "/appcompetitiondynamic/thumbsup.do",
      data: {
        id: e.currentTarget.id,
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
          wx.showToast({
            title: res.data.msg,
          })
          dynamic=[];
          that.setData({
            dynamic:[]
          })
          that.getdynamic();
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
  //赛区
  getNarea:function(){
    var that = this;
    wx.request({
      url: app.data.urlmall + "/appcompetition/competitionarea.do",
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
            narea:res.data.data
          })
        } else if (res.data.status === 103) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          wx.redirectTo({
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
  //赛区切换
  bind:function(){
    var that =this;
    this.setData({
      isSai:!this.data.isSai
    })
    that.getNarea();
  },
  //赛区选择
  narea:function(e){
     console.log(e)
     var that = this;
     var index = e.currentTarget.dataset.index;
     var competitionName = e.currentTarget.dataset.name;
     var qualifiedNumber = e.currentTarget.dataset.num;
     play = [];
     that.setData({
       competitionAreaId: e.currentTarget.id,
       competitionName: competitionName,
       qualifiedNumber: qualifiedNumber,
       isSai: !this.data.isSai,
       tas:index,
       players:[],
       ranklist: [],
       top_1:'',
       top_2:'',
       top_3:'',
     })
    that.getplayer();
    that.getdynamic();
    that.getranklist();
   
  },
  //排行榜
  getranklist:function(e){
    var that = this;
    wx.request({
      url: app.data.urlmall + "/apppcompetitionplayer/ranklist.do",
      data: {
        id: that.data.id,
        token: wx.getStorageSync('etoken'),
        currentPage: that.data.p_currentPage,
        competitionAreaId: that.data.competitionAreaId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {         
          if (that.data.p_currentPage == 1) {
            that.setData({
              top_1: res.data.data.data.splice(0, 1)[0],
              top_2: res.data.data.data.splice(0, 1)[0],
              top_3: res.data.data.data.splice(0, 1)[0],
            
            })
          }
          for(var i in res.data.data.data){
            ranklist.push(res.data.data.data[i])
          }
          that.setData({
          
            ranklist: ranklist,
            p_totalPage:res.data.data.totalPage           
          })
          
          console.log(that.data.top_1)
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
  //视频
  getvideo: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlmall + "/apppcompetitionvideo/videolist.do",
      data: {
        id: that.data.id,
        token: wx.getStorageSync('etoken'),
        currentPage:that.data.h_currentPage
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {
          for(var i in res.data.data.data){
            video.push(res.data.data.data[i])
          }
          that.setData({
            video:video,
            h_totalPage:res.data.data.totalPage
          })

        } else if (res.data.status === 103) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          wx.navigateTo({
            url: '/pages/login/login',
          })

        }  else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  //活动介绍
  getintroduce: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlmall + "/appcompetition/activityintroduce.do",
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
       //  console.log(res.data.data)
        if (res.data.status === 100) {
          rich = res.data.data.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
          that.setData({
            rich:rich
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
  //报名倒计时
  gettime: function countDown() {
    var that = this
    
    var aaa = that.data.time.replace(/-/g, '/');
    var aaa_start = Date.parse(aaa)
    var nspt = aaa.split(' ')  
    var timer3 = nspt[0].split('/');
    var timer4 = nspt[1].split(':');  
    var start = new Date(timer3[0], timer3[1], timer3[2], timer4[0], timer4[1], timer4[2])
    var bbb = that.data.endDate.replace(/-/g, '/');
    
    var spt = bbb.split(' ');
    var timer1 = spt[0].split('/');
    if (spt[1] == undefined) {
      spt[1] = '23:59:59'
     
    }
    var bbb_end = Date.parse(spt) 
    var ti = aaa_start - bbb_end
    // if(ti < 0){
    //   that.setData({
    //     istime :1
    //   })
    // }
    var timer2 = spt[1].split(':');
    var end = new Date(timer1[0], timer1[1], timer1[2], timer2[0],timer2[1],timer2[2])
    var oft = Math.round((end - start) / 1000);
    var ofd = parseInt(oft / 3600 / 24);
    var ofh = parseInt((oft % (3600 * 24)) / 3600);
    var ofm = parseInt((oft % 3600) / 60);
    var ofs = oft % 60;
     if(ofd < 10){
       ofd= '0' + ofd
    } 
    if(ofh < 10){
      ofh = '0' + ofh
     }
     if (ofm < 10) {
       ofm = '0' + ofm
     } 
     if (ofs < 10) {
       ofs = '0' + ofs
  
     } 
    this.setData({
      days:ofd,
      hours:ofh,
      min:ofm,
      miao:ofs
    })
    
    
    if(ofs < 0) {
       this.setData({
         istime:1
       })
    };
			
  },
  //复赛倒计时
  settime: function countDown() {
    var that = this
    var aaa = that.data.time.replace(/-/g, '/');
    var aaa_start = Date.parse(aaa)
    var nspt = aaa.split(' ')  
    var timer3 = nspt[0].split('/');
    var timer4 = nspt[1].split(':');
    var start = new Date(timer3[0], timer3[1], timer3[2], timer4[0], timer4[1], timer4[2])
    var bbb = that.data.seasonEndtDate.replace(/-/g, '/');
    
    var spt = bbb.split(' ');
    
    var timer1 = spt[0].split('/');
    if (spt[1] == undefined) {
      spt[1] = '23:59:59'
      
    }
    var bbb_end = Date.parse(spt)
    var ti = aaa_start - bbb_end
    // if (ti < 0) {
    //   that.setData({
    //     istime: 4
    //   })
    // }
    var timer2 = spt[1].split(':');
   
    var end = new Date(timer1[0], timer1[1], timer1[2], timer2[0], timer2[1], timer2[2])
    var oft = Math.round((end - start) / 1000);
    var ofd = parseInt(oft / 3600 / 24);
    var ofh = parseInt((oft % (3600 * 24)) / 3600);
    var ofm = parseInt((oft % 3600) / 60);
    var ofs = oft % 60;
    if (ofd < 10) {
      ofd = '0' + ofd
    }
    if (ofh < 10) {
      ofh = '0' + ofh
    }
    if (ofm < 10) {
      ofm = '0' + ofm
    }
    if (ofs < 10) {
      ofs = '0' + ofs

    }
    this.setData({
      daySea: ofd,
      hourSea: ofh,
      minSea: ofm,
      miaoSea: ofs
    })


    if (ofs < 0) {
      this.setData({
        istime: 1
      })
    };

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
            title: '感谢你宝贵的一票',
            icon:'none'
          })
          play=[];
          that.setData({
            players:[]
          })
          that.getplayer();
          that.getdetail();
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
  help:function(e){
    var that = this;
    console.log(e)
    wx.navigateTo({
      url: '../e_help/e_help?saiid=' + that.data.id + '&isGift=' + this.data.detail.isGift + '&id=' + e.currentTarget.id,
    })
  },
  //搜索
  searchinp:function(e){
    var that = this;
    console.log(e);
    that.setData({
      isSearch:true,
      valu:e.detail.value
    })
    wx.request({
      url: app.data.urlmall + "/apppcompetitionplayer/playerlist.do",
      data: {
        id: that.data.id,
        token: wx.getStorageSync('etoken'),
        keyword:e.detail.value,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {
          for(var i in res.data.data.data){
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

        }  else {
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
      url: app.data.urlmall + "/apppcompetitionplayer/playerlist.do",
      data: {
        id: that.data.id,
        token: wx.getStorageSync('etoken'),
        keyword: that.data.valu,
        currentPage: that.data.x_currentPage
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
            x_totalPage:res.data.data.totalPage
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
  //查看选手详情
  detail: function (e) {
    wx.navigateTo({
      url: '../e_player/e_player?id=' + e.currentTarget.id + '&saiid=' + this.data.id + '&isOrganization=' + this.data.detail.isOrganization,
    })
  },
  //艺人置顶
  top:function(e){
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
  //赛事置顶
  hotTop: function (e) {
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
            url: '../e_etop/e_etop?id=' + that.data.id,
          })

        }
      }
    })
    
  },
  //上热门
  hots: function (e) {
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
            url: '../e_hot/e_hot?id=' + that.data.id,
          })

        }
      }
    })
   
  },
  // //刷新报名
  // changeData: function () {
  //   play = [];
  //   this.setData({
  //     ranklist: [],
  //     players:[]
  //   })
  //   //var options = { 'id': this.data.id }
  //   //this.onLoad(options);//最好是只写需要刷新的区域的代码，onload也可，效率低，有点low
  //   this.getplayer();
  //   this.getranklist();
  // },
  // //报名弹窗
  // cance:function(){
  //   var that = this;
  //   that.setData({
  //     isart:!that.data.isart
  //   })
  // },
  deter:function(){
    var that = this;
    wx.navigateTo({
      url: '../e_artist/e_artist?id=' + that.data.id,
    })
  },
  submit:function(e){
    console.log(e)
    var that = this;
   
    // wx.request({
    //   url: app.data.urlmall + "apppcompetitionsignup/isjoin.do",
    //   data: {
    //     id: that.data.competitionAreaId,
    //     token: wx.getStorageSync('etoken'),
    //   },
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   dataType: 'json',
    //   success: function (res) {
    //     console.log(res.data.data)
    //     if (res.data.status === 100) {
    //       wx.navigateTo({
    //         url: '../e_division/e_division?id=' + that.data.id + '&num=' + e.currentTarget.dataset.num + '&art=' + e.currentTarget.dataset.art + '&type=' + that.data.detail.isOrganization,
    //       })
    //     } else if (res.data.status === 103) {
    //       wx.showToast({
    //         title: res.data.msg,
    //         icon: 'none'
    //       })
    //       wx.navigateTo({
    //         url: '/pages/login/login',
    //       })

    //     } else if (res.data.status === 105) {
    //       wx.showToast({
    //         title: res.data.msg,
    //         icon: 'none'
    //       })
    //       wx.navigateTo({
    //         url: '/pages/bindphone/bindphone',
    //       })

    //     } else {
    //       wx.showToast({
    //         title: res.data.msg,
    //         icon: 'none'
    //       })
    //     }
    //   }
    // })
     if (that.data.user.phone == null || that.data.user.phone == '') {

          wx.showToast({
            title: '报名赛事需绑定手机号',
            icon: 'none',

          })
          wx.navigateTo({
            url: '../bindphone/bindphone',
          })

        } else{
       wx.navigateTo({
         url: '../e_division/e_division?id=' + that.data.id + '&num=' + e.currentTarget.dataset.num + '&art=' + e.currentTarget.dataset.art + '&type=' + that.data.detail.isOrganization,
       })
        }
    
    
     
      
  },
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
      play: e.currentTarget.dataset.ids
    })
  },
  //机构参赛
  jgeve:function(e){
    wx.navigateTo({
      url: '../e_orgin/e_orgin?id=' + e.currentTarget.id,
    })
  },
  //赛区承办权
  undertake: function (e) {
    wx.navigateTo({
      url: '../undertake/undertake?id=' + e.currentTarget.id,
    })
  },
  //查看图片
  imgsrc: function (e) {
    var that = this;
    console.log(e)
    var num = e.currentTarget.dataset.num;
    var selectindex = e.currentTarget.dataset.src;//获取data-src
    var imgList = this.data.dynamic[num].photos;//获取data-list
    //图片预览
    wx.previewImage({
      current: selectindex, // 当前显示图片的http链接   
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  bindPlayerPlay() {
    this.Player.play({
      success: res => {
        console.log('play success')
      },
      fail: res => {
        console.log('play fail', res)
      }
    })
  },
  

})