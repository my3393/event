// pages/iwillpromote/iwillpromote.js

const app = getApp();
var count = 0;
//var ids = [];
//var moren = [];
//var names = undefined;
let artistId = '92';
var token;
var images = [];
var simages = [];
var title = '';
var person = '';
var tokenn;
var photos = '';
var labels = [];
var bcode;
let province = [];
let citys = [];
let areas = [];
let towns = [];
let province_id = '';
let city_id = '';
let area_id = '';
let town_id = '';
let p_name;
let c_name;
let q_name;
let j_name
let organizationId;
let playerType = 1;
let playerId;
let tsvides='';
let phone = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isardess: true,
    iscity: true,
    isprov: false,
    isjie: true,
    id:'',
    tsvides:'',
    showimg: true,
   // artist_type: "未来之星",
    showlabels: true,
    labels: [],
    posters: '../../images/upimg.png',
   
    imgs: [],
    isvideo: true,
    showadd: false,
    showadds: false,
    tvideo: '',
    price: [],
    
    iscity: true,
    isqu: true,
    isjie: true,
    npay:'',
    isdai:true,
    signUpType:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    
    that.setData({
      id: options.id,
      npay: options.npay,
     
    })
    if (options.type == 1){
      organizationId = options.organizationId
        playerType = options.playerType
        playerId = options.playerId
      that.setData({
        signUpType: options.signUpType
      })
    }

    
    wx.setNavigationBarTitle({
      title: '选手报名',
    })
     
    // 获取所有省
  
    wx.getStorage({
      key: 'etoken',
      success: function (res) {
        token = res.data;
      },
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
    var that = this;
    images = [];
    simages = [];
    count = 0;
    // ids = "";
    title = '';
    province_id = '';
    city_id = '';
    person = "";
    photos = '';
   
    that.setData({
      imgs: []
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
  // 代报名手机号
  inputs:function(e){
    var that = this;
    phone = e.detail.value
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        console.log(res.tempFilePaths);
        var tempFilePaths = res.tempFilePaths;
        for (var i in tempFilePaths) {
          images.push(tempFilePaths[i])
          console.log(1)
          wx.showLoading();
          wx.uploadFile({
            url: app.data.urlmall + '/appylsjfile/fileprogerssupload.do', // 仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'file',
            header: {
              "Content-Type": "multipart/form-data",
              'accept': 'application/json',
            },
            formData: {
              'token': wx.getStorageSync('etoken')
            },
            dataType: 'json',
            success(res) {

              console.log(token)
              let datas = JSON.parse(res.data)
              console.log(datas)
              wx.hideLoading();
              simages.push(datas.data.fileName)
              console.log(simages)
              // do something
              console.log(simages)
              if (simages.length == 3) {
                that.setData({
                  showadd: !that.data.showadd
                })
              }
            }
          })


        }
        that.setData({
          imgs: images,
          showimg: false
        })
      }
    })
  },
  chooseVideo: function (e) {
    var that = this;
    wx.getStorage({
      key: 'etoken',
      success: function (res) {
        token = res.data;
      },
    })
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration:60,
      camera: 'back',
      success(res) {
        wx.showLoading({
          title: '视频上传中...',
        })
        console.log(res)
        var tempFilePathss = res.tempFilePaths;
        that.setData({
          showadds: !that.data.showadds
        })
        if(res.duration < 20){
          wx.uploadFile({
            url: app.data.urlmall + '/appylsjfile/fileprogerssupload.do', // 仅为示例，非真实的接口地址
            filePath: res.tempFilePath,
            name: 'file',
            header: {
              "Content-Type": "multipart/form-data",
              'accept': 'application/json',
            },

            formData: {
              'token': wx.getStorageSync('etoken')
            },
            dataType: 'json',
            success(res) {
              console.log(res)
              let datas = JSON.parse(res.data)
              console.log(datas)
              tsvides = datas.data.fileName
              wx.hideLoading();
              wx.showToast({
                title: '上传成功',
                icon: 'success'
              })
              that.setData({
                tvideo: datas.data.url,
                tsvides: datas.data.fileName
              })
            }
          })
        }else{
          wx.showToast({
            title: '请选择20s以内',
            icon:'none'
          })
          that.setData({
          showadds: !that.data.showadds
         })
        }
      }
    })
  },
  handleImagePreview(e) {
    var that = this;
    const idx = e.target.dataset.idx
    const images = that.data.imgs
    wx.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
  },
  //删除个人照照片
  detel: function (e) {
    var that = this;
    console.log(e)
    console.log(that.data.imgs)


    simages.splice(e.currentTarget.dataset.index, 1)
    images.splice(e.currentTarget.dataset.index, 1)
    that.setData({
      imgs: images
    })
    if (simages.length < 5) {
      that.setData({
        showadd: false
      })
    }
  },
  //删除视频
  detels(){
    let that = this;
    that.setData({
      showadds: !that.data.showadds,
      tsvides:''
    })
  },
  //选择地址
  diz: function () {
    this.getprov();
    this.setData({
      isardess: false,
      isprov: false,
      isqu: true,
      iscity: true,
      isjie: true,
    })
  },
  //省
  getprov: function () {
    var that = this;
    province = []
    wx.request({
      url: app.data.urlmall + "/apparea/nextlist.do",
      data: {
        grade: "1",
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
          for (var i in res.data.data) {
            province.push(res.data.data[i])
          }
          that.setData({
            province: province
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
  // 省跳市
  getprovs: function (e) {
    var that = this;
    console.log(e)
    citys = [];
    province_id = e.currentTarget.id;
    p_name = e.currentTarget.dataset.name
    var nowTime = new Date();
    if (nowTime - this.data.tapTime < 500) {
      console.log('阻断')
      return;
    }
    // 获取所有市
    wx.request({
      url: app.data.urlmall + "/apparea/nextlist.do",
      data: {
        grade: '2',
        id: province_id,
        token: wx.getStorageSync('etoken'),
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status == 100) {
          for (var i in res.data.data) {
            citys.push(res.data.data[i])
          }
          that.setData({
            city: citys,
            isprov: true,
            iscity: false
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
    this.setData({ tapTime: nowTime });
  },
  // 市跳区
  getcity: function (e) {
    var that = this;
    areas = []
    city_id = e.currentTarget.id;;
    c_name = e.currentTarget.dataset.name
    var nowTime = new Date();
    if (nowTime - this.data.tapTime < 500) {
      console.log('阻断')
      return;
    }
    // 获取所有区
    wx.request({
      url: app.data.urlmall + "/apparea/nextlist.do",
      data: {
        grade: '3',
        id: city_id,
        token: wx.getStorageSync('etoken'),
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status == 100) {
          for (var i in res.data.data) {
            areas.push(res.data.data[i])
          }
          that.setData({
            area: areas,
            iscity: true,
            isqu: false,

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
    this.setData({ tapTime: nowTime });
  },
  // 区跳街道
  getarea: function (e) {
    var that = this;
    towns = []
    q_name = e.currentTarget.dataset.name
    area_id = e.currentTarget.id;
    var nowTime = new Date();
    if (nowTime - this.data.tapTime < 500) {
      console.log('阻断')
      return;
    }
    // 获取所有区
    wx.request({
      url: app.data.urlmall + "/apparea/nextlist.do",
      data: {
        grade: '4',
        id: area_id,
        token: wx.getStorageSync('etoken'),
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status == 100) {
          for (var i in res.data.data) {
            towns.push(res.data.data[i])
          }
          that.setData({
            town: towns,
            isjie: false,
            isqu: true,
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
    this.setData({ tapTime: nowTime });
  },
  //街道
  gettown: function (e) {
    var that = this;
    towns = []
    console.log(e)
    town_id = e.currentTarget.id;
    j_name = e.currentTarget.dataset.name;
    that.setData({ //给变量赋值
      addres: p_name + '-' + c_name + '-' + q_name + '-' + j_name,
      isardess: true,
    })
  },
  // gettown: function (e) {
  //   var that = this;
  //   that.setData({ //给变量赋值
  //     tindex: e.detail.value,
  //   })
  //   town_id = that.data.town[e.detail.value].id;
  //   console.log(town_id);
  // },
  showlabel: function (e) {
    var that = this;
    that.setData({
      showlabels: !that.data.showlabels
    })
  },
  quxiao: function (e) {
    var that = this;
    ids = [];
    count = 0
    that.setData({
      showlabels: !that.data.showlabels,
      labels: moren,
      artist_type: "请选择选手类型",
    })
    labels = that.data.labels;
    for(var i in labels){
      labels[i].selected = true
    }
   
    that.setData({
      labels: labels
    })
    console.log(moren)
  },
  sure: function (e) {
    var that = this;
    that.setData({
      showlabels: !that.data.showlabels,
      artist_type: names
    })
  },
  setprice: function (e) {
    var that = this;
    that.setData({ //给变量赋值
      pindex: e.detail.value,
    })
    maxprice = that.data.price[e.detail.value].max_price;
    minprice = that.data.price[e.detail.value].min_price;
  },
  chooselabel: function (e) {
    console.log(e)
    var that = this;
    labels = that.data.labels;
    if (count == 3) {
      wx.showToast({
        title: '最多选择三项',
        icon: 'none'
      })
      return false;
    } else {
      names = undefined;
      ids = [];
      labels[e.currentTarget.dataset.index].selected = !labels[e.currentTarget.dataset.index].selected;
      that.setData({
        labels: labels
      })
      count = 0;
      for (var i in labels) {
        if (labels[i].selected == false) {
          count = count + 1;
          ids.push(labels[i].id);
          if (names == undefined) {
            names = labels[i].name;
          } else {
            names = names + "-" + labels[i].name;
          }
        }
      }
    }
    console.log(ids)
  },
  showvideo: function (e) {
    var that = this;
    console.log(e)
    that.setData({
      isvideo: !that.data.isvideo,
      play: e.currentTarget.id
    })
  },
  hidevideo: function (e) {
    var that = this;
    that.setData({
      isvideo: !that.data.isvideo
    })
  },
  geititle: function (e) {
    title = e.detail.value;
  },
  getperson: function (e) {
    person = e.detail.value;
  },
  getuser: function () {
    var that = this;
    wx.request({
      url: app.data.urlmall + "appuserinfo/getuserinfo.do",
      data: {
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
            userinfo: res.data.data,

          })
          wx.setStorage({
            key: 'etoken',
            data: res.data.data.token,
          })
          wx.setStorage({
            key: 'userinfo',
            data: res.data.data.user,
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
  subnotice: function (e) {
    var photos = '';
    // var lid;
    //console.log(ids)
    wx.getStorage({
      key: 'etoken',
      success: function (res) {
        tokenn = res.data;
        //console.log(tokenn)
      },
    })
    var that = this;
    wx.checkSession({
      success: function (res) {
        if (simages.length != 0) {
          photos = simages.join(",");
        } 
        // if (ids.length < 2) {
        //   lid = ids[0];
        // } else {
        //   lid = ids.join(",");
        // }
        if (title == '') {
          wx.showToast({
            title: '请输入艺名',
            icon: 'none'
          })
          return false;
        }
        if (province_id == '') {
          wx.showToast({
            title: '请选择所在地',
            icon: 'none'
          })
          return false;
        }
        if (city_id == '') {
          wx.showToast({
            title: '请选择所在市',
            icon: 'none'
          })
          return false;
        }
        if (area_id == '') {
          wx.showToast({
            title: '请选择所在区',
            icon: 'none'
          })
          return false;
        }
        if (town_id == '') {
          wx.showToast({
            title: '请选择所在街道',
            icon: 'none'
          })
          return false;
        }
        // if (lid == undefined) {
        //   wx.showToast({
        //     title: '请选择艺人标签',
        //     icon: 'none'
        //   })
        //   return false;
        // }
        if (that.data.signUpType == 2 && phone == '') {
          wx.showToast({
            title: '请输入代报名手机号',
            icon: 'none'
          })
          return false;
        }
        if (that.data.signUpType == 2  && phone.length != 11) {
          wx.showToast({
            title: '请输入正确手机号',
            icon: 'none'
          })
          return false;
        }
        // if (person == '') {
        //   wx.showToast({
        //     title: '请输入个人介绍',
        //     icon: 'none'
        //   })
        //   return false;
        // }

        if (simages.length != 3 && simages.length != 0) {
          wx.showToast({
            title: '请上传3张个人照',
            icon: 'none'
          })
          return false;
        }
        // if (that.data.tvideo == '') {
        //   wx.showToast({
        //     title: '请上传授权视频',
        //     icon: 'none'
        //   })
        //   return false;
        // }
        wx.showLoading();
        if(that.data.npay == 0){
          wx.request({
            url: app.data.urlmall + "/apppcompetitionsignup/averageuserjoin.do",
            data: {
              token: tokenn,
              id: that.data.id,
              userName: title,
              provinceId: province_id,
              cityId: city_id,
              areaId: area_id,
              townId: area_id,
              artistIntroduce: person,
              artistLabel: lid,
              personalPhoto: photos,
              authorizedVideo:that.data.tsvides,
              organizationId: organizationId,
              playerType: playerType,
              playerId: playerId,
              
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function (res) {
              console.log(res.data.data)
              if (res.data.status == 100) {

                wx.hideLoading();
                wx.showToast({
                  title: '报名成功',
                  icon: 'success',
                  duration: 2000
                })
                that.getuser();
                 setTimeout(function(){
                   wx.redirectTo({
                     url: '../e_home/e_home',
                   })
                 },2000)
                  
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none'
                })
              }

            }
          })
        } else if (that.data.npay == 1) {
          wx.request({
            url: app.data.urlmall + "/apppcompetitionsignup/averageuserjoin/xcxpay.do",
            data: {
              token: tokenn,
              id: that.data.id,
              userName: title,
              provinceId: province_id,
              cityId: city_id,
              areaId: area_id,
              townId: area_id,
              artistIntroduce: person,
              artistLabel: artistId,
              personalPhoto: photos,
              authorizedVideo: that.data.tsvides,
              organizationId: organizationId,
              playerType: playerType,
              playerId: playerId,
              signUpType: that.data.signUpType,
              signUpPhone: phone
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function (res) {
              console.log(res.data.data)
              if (res.data.status == 100) {
                wx.hideLoading();
                setTimeout(function () {
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
                        duration: 2000
                      })
                      that.getuser();
                      setTimeout(function () {
                        wx.redirectTo({
                          url: '../e_home/e_home',
                        })
                      }, 2000)
                    },
                    fail(res) {
                      wx.showToast({
                        title: '支付失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  })

                }, 1000)
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
      fail: function (res) {
        console.log(res, '登录过期了')
        wx.showModal({
          title: '提示',
          content: '你的登录信息过期了，请重新登录',
        })
        //再次调用wx.login()
        // wx.login({
        //     success: function (res) {
        //         console.log(res.code)
        //         //发送请求
        //         wx.request({
        //             url: '自己的域名', //仅为示例，并非真实的接口地址
        //             data: {
        //                 code: res.code
        //             },
        //             header: {
        //                 'content-type': 'application/json' // 默认值
        //             },
        //             success(res) {
        //                 console.log(res)
        //             }
        //         })
        //     }
        // })
      }
    })
  },
  // 获取艺人标签
  getable(){
    var that = this;
    
    wx.request({
      url: app.data.urlmall + "/appartistlabel/alllabel.do",
      data: {
        token: wx.getStorageSync('etoken'),
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status == 100) {

          for (var i in res.data.data) {
            res.data.data[i].selected = true;
          }
          that.setData({
            labels: res.data.data
          })
          console.log(res.data.data)
          moren = res.data.data;
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 500
          })
        }

      }
    })
  }
})