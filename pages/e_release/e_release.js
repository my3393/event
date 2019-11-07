// pages/e_release/e_release.js
var app = getApp();
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
var images = [];
var simages = [];
var poster;
var postersis;
var photos;
var ids;
var names = undefined;
var moren;
var url;
var id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iszhao:true,
    artist_type: '',
    posters: '../../images/chuan_03.png',
    postersies: '../../images/chuan_03.png',
    post:'../../images/upimg.png',
    info: '',
    contact: '',
    numb: '',
    scope: '',
    isardess: true,
    iscity: true,
    isprov: false,
    isjie: true,
    showadd: false,
    showimg: true,
    showlabels: true,//赛事类型显示
    evedet:'',
    saiType:[],
    sex:'2000',
    typeid:'',
    istext:false,
    ishidden:false,
    isshow:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
   
    //赛事类型
    wx.request({
      url: app.data.urlmall + "/appcompetition/yisaitype.do",
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
          
          that.setData({
           saiType: res.data.data
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
    simages = []
    images = [];
    province_id = '';
    this.setData({
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
    console.log(simages.length)
    if (simages.length < 5) {
      that.setData({
        showadd: false
      })
    }
    
  },
  //企业LOGO
  chooseImage(e) {
    var that = this;
    id = e.currentTarget.id,
    that.setData({
      isshow: !that.data.isshow,
      ishidden:!that.data.ishidden
     })
  },
  cut() {
    var that = this;
    this.selectComponent('#imgcut').cut().then(r => {
      // wx.previewImage({
      //   urls: [r],
      // })
      wx.showLoading({
        title: '上传中',
      })
      url = r
      that.setData({
        isshow: !that.data.isshow,
        ishidden: !that.data.ishidden
      })
      wx.uploadFile({
        url: app.data.urlmall + '/appylsjfile/xcxfileprogerssupload.do', // 仅为示例，非真实的接口地址
        filePath: url,
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
          let datas = JSON.parse(res.data)
          console.log(datas)

          wx.showToast({
            title: '上传成功',
            icon: 'none'
          })
          if (id == 0) {
            that.setData({
              posters: datas.data.url
            })
            poster = datas.data.fileName;
          } else if (id == 1) {
            images.push(datas.data.url)
            simages.push(datas.data.fileName)
            // do something
            console.log(simages)
            if (simages.length == 5) {
              that.setData({
                showadd: !that.data.showadd
              })
            }
            that.setData({
              imgs: images,
              showimg: false
            })
          }
        }
      })

    }).catch(e => {
      wx.showModal({
        title: '',
        content: e.errMsg,
        showCancel: false
      })
    })
  },
  chooseimg() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        this.setData({
          src: res.tempFilePaths[0]
        })
      },
    })
  },
  //营业执照
  chooseImages(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        console.log(res.tempFilePaths[0]);
        var tempFilePaths = res.tempFilePaths;
        wx.showLoading();
        wx.uploadFile({
          url: app.data.urlmall + '/appylsjfile/xcxfileprogerssupload.do', // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
          },
          formData: {
            'token': wx.getStorageSync("etoken")
          },
          dataType: 'json',
          success(res) {
           
            let datas = JSON.parse(res.data)
            console.log(datas)
            postersis = datas.data.fileName;
            console.log(poster)
            wx.hideLoading();
            // do something
            wx.showToast({
              title: '上传成功',
              icon: 'none'
            })
          }
        })
        that.setData({
          postersies: res.tempFilePaths[0]
        })
      }
    })
  },
  //活动海报
  
 
  handleImagePreview(e) {
    var that = this;
    const idx = e.currentTarget.dataset.idx
    const images = that.data.imgs
    console.log(simages[idx])
    wx.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
   
  },
  //赛事类型
  showlabel: function (e) {
    var that = this;
    that.setData({
      showlabels: !that.data.showlabels,
      istext:!that.data.istext
    })
  },
  quxiao: function (e) {
    var that = this;
    ids = '';
    that.setData({
      showlabels: !that.data.showlabels,
      istext: !that.data.istext
    })
    console.log(moren)
  },
  sure: function (e) {
    var that = this;
    that.setData({
      showlabels: !that.data.showlabels,
      artist_type: names,
      typeid:ids,
      istext: !that.data.istext
    })
  },
  chooselabel:function(e){
     console.log(e)
    names = e.currentTarget.dataset.name;
    ids = e.currentTarget.id
     this.setData({
       sex: e.currentTarget.dataset.index
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
      istext:true,
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
      istext:false
    })
  },
  //活动名称
  infor: function (e) {
    var info = e.detail.value
    this.setData({
      info: info
    })
  },
  //手机号
  scope: function (e) {
    var scope = e.detail.value
    this.setData({
      scope: scope
    })
    
  },
  //主办方
  contact: function (e) {
    var contact = e.detail.value
    this.setData({
      contact: contact
    })
  },
  //赛事介绍
  evedetail:function(e){
    this.setData({
      evedet: e.detail.value
    })
  },
  //微信号
  wxchat: function (e) {
    var numb = e.detail.value
    this.setData({
      numb: numb
    })
  },
  //入驻提交
  submit: function (e) {
    
    var that = this;
    var province_idreg = province_id;
    var city_idreg = city_id;
    var area_idreg = area_id;
    
    var phonetel = /^[1]([3-9])[0-9]{9}$/;
    if (simages.length < 2) {
      photos = simages[0];
      console.log(photos)
    } else {
      photos = simages.join(",");
      console.log(photos)
    }
    if (that.data.info == '') {
      wx.showToast({
        title: '请输入活动名称',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false
    } else if (that.data.contact == '') {
      wx.showToast({
        title: '请输入主办方',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (that.data.posters == '../../images/chuan_03.png') {
      wx.showToast({
        title: '请上传赛事封面',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (that.data.postersies == '../../images/chuan_03.png') {
      wx.showToast({
        title: '请上传主办方营业执照',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (province_idreg == '') {
      wx.showToast({
        title: '请输入所在省',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (city_idreg == '') {
      wx.showToast({
        title: '请输入所在市',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (area_idreg == '') {
      wx.showToast({
        title: '请输入所在区',
        icon: 'none',
        duration: 1500
      })
      return false;
     }else if (simages.length < 2) {
      wx.showToast({
        title: '请上传至少两张个人照',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (that.data.evedet == '') {
      wx.showToast({
        title: '请输入活动详情',
        icon: 'none'
      })
      return false
    } else if (that.data.scope == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return false
    } else if (that.data.scope.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (!phonetel.test(that.data.scope)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    return that.getxcx();
  },
  getxcx:function(){
    var that = this;
    wx.request({
      url: app.data.urlmall + "/appcompetition/apply.do",
      data: {
        typeId:that.data.typeid,
        token: wx.getStorageSync('etoken'),
        competitionName: that.data.info,
        organizeName:that.data.contact,
        provinceId: province_id,
        cityId: city_id,
        areaId: area_id,
        // townId: town_id
        phone:that.data.scope,
        weixin:that.data.numb,
        businessLicense: postersis,
        competitionLogo: poster,
        activityPoster: photos,
        activityIntroduction:that.data.evedet
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
             title: '提交成功，请等待审核',
             icon:'none',
             duration: 3000
           })
           setTimeout(function(){
              wx.navigateBack({
                delta: 1
              })
           },3000)
        } else if (res.data.status === 103) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          wx.navigateTo({
            url: '/pages/login/login',
          })

        } else if (res.data.status == 105) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          wx.navigateTo({
            url: '../bindphone/bindphone',
          })
        }else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  }
})