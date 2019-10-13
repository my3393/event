// pages/e_division/e_division.js
var app = getApp();
var type;
let organizationId = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    saiId:'',
    detail:[],
    num:100000,
    tars:100000,
    nums:100000,
    id:'',
    isart:true,
    pay:'',
    is_actor:'',
    art:'',
    issai:false,
    isgorup:false,
    playerId:'',
    playerType:'',
    isqu:1,
    tag:[
      {name:'团队',id:2},
      {name:'单人',id:1}
    ],
    tar:10000,
    isdai:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
     
     console.log(options)
     that.setData({
       saiId: options.id,
       pay: options.num,
       art:options.art,
       type: options.type,
     })
    if (options.num == 1) {
      that.setData({
        isdai: !that.data.isdai
      })
    }
    that.getorganization();
     if(options.type == 0){
       that.setData({
         isgorup:true,
         isqu:2,
        
       })
     }
    // if (options.organizationId){
    //   organizationId = options.organizationId
    //  }
   
   
   // that.getgroup();
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
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        if(res.data.phone == null || res.data.phone == ''){
          wx.showToast({
            title: '报名赛事需绑定手机号',
            icon:'none',
            duration:3000
          })
          wx.navigateTo({
            url: '../bindphone/bindphone',
          })
        }
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
    return {
      title: '艺赛联盟',
      path: '/pages/e_home/e_home'
    }
  },
  //机构参赛
  btn: function (e) {
    wx.navigateTo({
      url: '../e_orgin/e_orgin?id=' + this.data.saiId,
    })
  },
  // 机构代报名
  brbm: function () {
    let that = this;
    that.setData({
      isdai: !that.data.isdai,
      signUpType: 1
    })
  },
  jgdbm: function () {
    let that = this;
    that.setData({
      isdai: !that.data.isdai,
      signUpType: 2
    })
  },
  //单人选择
  tar:function(e){
    var that = this;
  
    console.log(e)
    that.setData({
      tar:e.currentTarget.dataset.index,
      playerType:e.currentTarget.id
    })
    if (e.currentTarget.id == 2 &&that.data.type == 1){
      that.setData({
        isg:2
      })
    }else{
      that.setData({
        isg: 1,
        nums:100000,
        playerId:'',
      })
    }
  },
  //赛区选择
   getdetail:function(){
     var that = this;
     wx.request({
       url: app.data.urlmall + "apppcompetitionsignup/organizationarea.do",
       data: {
         organizerId: that.data.saiId,
         token: wx.getStorageSync('etoken'),
         id: organizationId
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
             detail: res.data.data,

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
  tap:function(e){
    console.log(e)
    var that = this;
    this.setData({
      num : e.currentTarget.dataset.index,
      id:e.currentTarget.id,
      playerId: '',     
      nums: 100000,
      tar:100000,
      playerType:''
    })
    
    if (that.data.type == 1 ){
     
      that.getgroup();
    }
    // if (this.data.playerType == 2 && that.data.type == 0){
    //    that.setData({
    //      isg: 2
    //    })
    //    that.getgroup();
    // }
    // console.log(this.data.id)
  },
  //选择机构
  bindPickerChange: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e)
    organizationId = e.currentTarget.id
    this.setData({
      tars: e.currentTarget.dataset.index,
      num:100000,
      isg:1,
      isqu: 2,
      id:'',
      nums: 100000
    })
    that.getdetail();
    

  },
  //团体选择
  tas: function (e) {
    console.log(e)
    var that = this;
    this.setData({
      nums: e.currentTarget.dataset.index,
      playerId: e.currentTarget.id
    })
   
  },
  //单人
  one:function(){
    var that = this;
    that.setData({
      isgorup: !that.data.isgorup,
    })
  },
  //团体
  two: function () {
    var that = this;
    that.setData({
      isgorup: !that.data.isgorup,
      playerType:2,
      
    })
  },
  
  //机构
  getorganization:function(){
     var that = this;
     wx.request({
       url: app.data.urlmall + "/apppcompetitionsignup/organization.do",
       data: {
         id: that.data.saiId,
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
             orgin: res.data.data,

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
  //团体
  getgroup: function () {
    var that = this;
    wx.request({
      url: app.data.urlmall + "apppcompetitionsignup/playerteam.do",
      data: {
        id: that.data.id,
        token: wx.getStorageSync('etoken'),
        organizationId: organizationId,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {
          if(res.data.data == ''){
            wx.showToast({
              title: "该类别下没有该团体，可选择别的",
              icon: 'none',
              duration:2000
            })
          }
          that.setData({
            group: res.data.data,

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
  //提交
  submit:function(e){
    var that = this;
    console.log(organizationId)
    console.log(that.data.type)
        //  wx.showToast({
        //   title: '由于相关规范，ios功能暂不可用',
        //   icon:'none'
        //  })
    

   // console.log(that.data.is_actor)
    if (organizationId == '' && that.data.type == 1) {
      
        wx.showToast({
          title: '请选择所属机构',
          icon: 'none',
          duration:2000
        })
     
    }else if (that.data.id == '') {
      wx.showToast({
        title: '请选择报名节目',
        icon: 'none'
      })
    } else if (that.data.playerType == '') {
      wx.showToast({
        title: '请选择参赛类型',
        icon: 'none'
      })
    }else if (that.data.playerId == '' && that.data.playerType == 2) {
          wx.showToast({
            title: '请选择要加入的团体',
            icon: 'none'
          })
        } else{
          console.log('进入')
          that.is_actor();
      // wx.request({
      //   url: app.data.urlmall + "/apppcompetitionsignup/isjoin.do",
      //   data: {
      //     id: that.data.id,
      //     token: wx.getStorageSync('etoken')
      //   },
      //   method: 'POST',
      //   header: {
      //     'content-type': 'application/x-www-form-urlencoded'
      //   },
      //   dataType: 'json',
      //   success: function (res) {
      //     console.log(res.data.data)

      //     if (res.data.status === 100) {
      //        that.is_actor();
           
      //     } else if (res.data.status === 101) {
      //       wx.showToast({
      //         title: '该赛事你已报名，去看看别的赛事吧',
      //         icon: 'none'
      //       })
      //     } else{
      //       wx.showToast({
      //         title: res.data.msg,
      //         icon: 'none'
      //       }) 
      //     }
      //   }
      // }) 
    }
  },
  //报名判断后判断是否是艺人
  is_actor:function(){
    var that = this;
    if (that.data.signUpType == 2){
      wx.navigateTo({
        url: '../e_artist/e_artist?id=' + that.data.id + '&npay=' + that.data.pay + '&organizationId=' + organizationId + '&playerType=' + that.data.playerType + '&playerId=' + that.data.playerId + '&type=' + that.data.type + '&signUpType=' + that.data.signUpType,
      })
    }else{
      if (that.data.is_actor == 2) {
        if (that.data.art == 0) {
          wx.request({
            url: app.data.urlmall + "/apppcompetitionsignup/artistjoin.do",
            data: {
              id: that.data.id,
              token: wx.getStorageSync('etoken'),
              organizationId: organizationId,
              playerType: that.data.playerType,
              playerId: that.data.playerId
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
                  duration: 3000
                })
                setTimeout(function () {
                  wx.redirectTo({
                    url: '../e_home/e_home',
                  })
                }, 3000)
                // var pages = getCurrentPages();//当前页面栈
                // if (pages.length > 1) {
                //   var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
                //   var currPage = pages[pages.length - 1]; // 当前页面，若不对当前页面进行操作，可省去
                //   // beforePage.setData({       //如果需要传参，可直接修改A页面的数据，若不需要，则可省去这一步
                //   //   id: res.data.data
                //   // })
                //   beforePage.changeData();//触发父页面中的方法
                // }
                // wx.navigateBack({
                //   delta: 1
                // })
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none'
                })
              }
            }
          })
        } else {
          wx.request({
            url: app.data.urlmall + "/apppcompetitionsignup/artistjoin/xcxpay.do",
            data: {
              id: that.data.id,
              token: wx.getStorageSync('etoken'),
              organizationId: organizationId
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
                      duration: 3000
                    })
                    setTimeout(function () {
                      wx.redirectTo({
                        url: '../e_home/e_home',
                      })
                    }, 3000)
                    // var pages = getCurrentPages();//当前页面栈
                    // if (pages.length > 1) {
                    //   var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
                    //   var currPage = pages[pages.length - 1]; // 当前页面，若不对当前页面进行操作，可省去
                    //   // beforePage.setData({       //如果需要传参，可直接修改A页面的数据，若不需要，则可省去这一步
                    //   //   id: res.data.data
                    //   // })
                    //   beforePage.changeData();//触发父页面中的方法
                    // }
                    // wx.navigateBack({
                    //   delta: 1
                    // })
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
      } else {
        // this.setData({
        //   isart: !that.data.isart
        // })
        wx.navigateTo({
          url: '../e_artist/e_artist?id=' + that.data.id + '&npay=' + that.data.pay + '&organizationId=' + organizationId + '&playerType=' + that.data.playerType + '&playerId=' + that.data.playerId + '&type=' + that.data.type + '&signUpType=' + that.data.signUpType,
        })

      }
    }
    
  },
  //报名弹窗
  cance : function () {
    var that = this;
    that.setData({
      isart: !that.data.isart
    })
  },
  deter: function () {
    var that = this;
    console.log(that.data.isUser)
    wx.navigateTo({
      url: '../e_artist/e_artist?id=' + that.data.id + '&npay=' + that.data.pay + '&organizationId=' + organizationId + '&playerType=' + that.data.playerType + '&playerId=' + that.data.playerId + '&type=' + that.data.type,
    })
  },
})