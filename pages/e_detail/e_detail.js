// pages/e_detail/e_detail.js
var util = require('../../utils/util.js');
var app = getApp();
var play = [];
var rich;
var video = [];
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
    id:'',
    detail:[],
    photos:[],
    players:[],
    dynamic:[],
    dynamicphotos:[],
    currentPage:1,
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
    is_actor:'',
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
    seasonEndtDate:'',//复赛结束时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
     that.setData({
       id:options.id,
       time: time
     })
    that.getdetail();
    setTimeout(function(){
      that.getplayer();
      that.getdynamic();
      that.getranklist();
      that.getvideo();
      that.getintroduce();
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
    that.setData({
      istp: '',
      isSearch: false,
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
        title: '已经到底了哦',
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
    var that = this;
    console.log(that.data.detail.name)
     return{
       title: that.data.detail.competitionTitle + '正在火热进行中，快来报名参加吧!',
       path: '/pages/e_home/e_home?detailId=' + that.data.id,
     }
  },
  //商品切换
  tag: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.num);
    play= [];
    that.setData({
      isSearch:false,
      splayer:[],
      players:[],
      tar: e.currentTarget.dataset.num,
      tab: e.currentTarget.dataset.num
    })
    
    that.getplayer();
    that.getranklist();
  },
  getdetail: function (e) {
    var that = this;
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
        
         
          if (res.data.data.competitionType == 1){
            that.setData({
              istp: 1,
             
            })
            
          }
          var date = Date.parse(new Date())
          var endDatas = Date.parse(res.data.data.endDate)
          var startDatas = Date.parse(res.data.data.startDate)
          var seasonEndtDate = Date.parse(res.data.data.seasonEndtDate)
          var seasonStartDate = Date.parse(res.data.data.seasonStartDate)
          var t2 = date - endDatas;
          var t1 = date - startDatas;
          var t3 = date - seasonStartDate;
          var t4 = date - seasonEndtDate;
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
         
          console.log(res.data.data.competitionAreaId)
          that.setData({
            competitionAreaId: res.data.data.competitionAreaId,
            competitionName: res.data.data.competitionAreaName,
            qualifiedNumber: res.data.data.areaQualifiedNumber,
            detail:res.data.data,
            photos: res.data.data.posters,
            endDate: res.data.data.endDate,
            seasonEndtDate: res.data.data.seasonEndtDate,
            isNewUserPay: res.data.data.isNewUserPay,
            isArtistUserPay: res.data.data.isArtistUserPay
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
  //选手
  getplayer: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlmall + "/apppcompetitionplayer/playerlist.do",
      data: {
        id: that.data.id,
        token: wx.getStorageSync('etoken'),
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
          for (var i in res.data.data.data){
            play.push(res.data.data.data[i])
          }
         
          that.setData({
            players:play,
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
  //动态
  getdynamic:function(e){
    var that = this;
    wx.request({
      url: app.data.urlmall + "/appcompetitiondynamic/list.do",
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
        console.log(res.data.data.data)
           
        if (res.data.status === 100) {
           
          that.setData({
            dynamic: res.data.data.data,
           // dynamicphotos: res.data.data.data.photos
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
          that.getdetail();
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
        } else {
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
        currentPage: that.data.currentPage,
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
         
          that.setData({
           top_1 : res.data.data.data.splice(0, 1)[0],
           top_2 : res.data.data.data.splice(0, 1)[0],
           top_3 :res.data.data.data.splice(0, 1)[0],
            ranklist: res.data.data.data,           
          })
          
          console.log(that.data.top_1)
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
          for(var i in res.data.data.data){
            video.push(res.data.data.data[i])
          }
          that.setData({
            video:video,
            v_totalPage:res.data.data.totalPage
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
       
        if (res.data.status === 100) {
          rich = res.data.data
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
  //初赛倒计时
  gettime: function countDown() {
    var that = this
    var nspt = that.data.time.split(' ');
    var timer3 = nspt[0].split('-');
    var timer4 = nspt[1].split(':');  
    var start = new Date(timer3[0], timer3[1], timer3[2], timer4[0], timer4[1], timer4[2])
    var spt = that.data.endDate.split(' ');
    var timer1 = spt[0].split('-');
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
    var nspt = that.data.time.split(' ');
    var timer3 = nspt[0].split('-');
    var timer4 = nspt[1].split(':');
    var start = new Date(timer3[0], timer3[1], timer3[2], timer4[0], timer4[1], timer4[2])
    var spt = that.data.seasonEndtDate.split(' ');
    var timer1 = spt[0].split('-');
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
        } else if (res.data.status === 101){
          wx.showToast({
            title: '投票已上限，请明天再来吧',
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
  help:function(e){
    wx.navigateTo({
      url: '../e_help/e_help?id=' + e.currentTarget.id,
    })
  },
  //搜索
  searchinp:function(e){
    var that = this;
    console.log(e);
    that.setData({
      isSearch:true
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
          that.setData({
            splayer: res.data.data.data,

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
      url: '../e_player/e_player?id=' + e.currentTarget.id + '&saiid=' + this.data.id,
    })
  },
  //艺人置顶
  top:function(e){
    wx.navigateTo({
      url: '../e_top/e_top?id=' + e.currentTarget.id,
    })
  },
  //赛事置顶
  hotTop: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../e_etop/e_etop?id=' + that.data.id,
    })
  },
  //上热门
  hots: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../e_hot/e_hot?id=' + that.data.id,
    })
  },
  //报名弹窗
  cance:function(){
    var that = this;
    that.setData({
      isart:!that.data.isart
    })
  },
  deter:function(){
    var that = this;
    wx.navigateTo({
      url: '../e_artist/e_artist?id=' + that.data.id,
    })
  },
  submit:function(e){
    console.log(e)
    var that = this;
    if(that.data.is_actor == 3){
      if (that.data.isArtistUserPay == 0){
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
      }else{
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
      
    }else{
      wx.navigateTo({
        url: '../e_division/e_division?id=' + that.data.id + '&num=' + e.currentTarget.dataset.num + '&art=' + e.currentTarget.dataset.art,
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
  //查看图片
  imgsrc: function (e) {
    var that = this;
    console.log(e)
    var num = e.currentTarget.dataset.num;
    var selectindex = e.currentTarget.dataset.src;//获取data-src
    var imgList = this.data.dynamic[num].img;//获取data-list
    //图片预览
    wx.previewImage({
      current: selectindex, // 当前显示图片的http链接   
      urls: imgList // 需要预览的图片http链接列表
    })
  },
})