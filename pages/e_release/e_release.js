// pages/e_release/e_release.js
var app = getApp();
var province_id = '';
var city_id = '';
var citys = [];
var areas = [];
var towns = [];
var area_id = '';
var town_id = '';
var images = [];
var simages = [];
var poster;
var postersis;
var photos;
var ids;
var names = undefined;
var moren;
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
    provinceId: '',
    cityId: '',
    areaId: '',
    townId: '',
    province: [],
    poindex: 0,
    city: [],
    cindex: 0,
    area: [],
    aindex: 0,
    town: [],
    tindex: 0, 
    iscity: true,
    isqu: true,
    isjie: true,
    showadd: false,
    showimg: true,
    showlabels: true,//赛事类型显示
    evedet:'',
    saiType:[],
    sex:'2000',
    typeid:'',
    istext:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取所有省
    var province = [{
      id: '',
      name: '请选择所在省'
    }]
   //省
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
        // console.log(res.data.data)
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
    console.log(that.data.imgs)
    console.log(simages)
    console.log(images)
  },
  //企业LOGO
  chooseImage(e) {
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
            'token': wx.getStorageSync('etoken')
          },
          dataType: 'json',
          success(res) { 
            console.log(res)
            let datas = JSON.parse(res.data)
            console.log(datas)
            poster = datas.data.fileName;
            console.log(poster)
            wx.hideLoading();
            wx.showToast({
              title: '上传成功',
              icon:'none'
            })
            // do something
          }
        })
        that.setData({
          posters: res.tempFilePaths[0]
        })
      }
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
  chooseImagess: function (e) {
    var that = this;
    wx.chooseImage({
      count: 5,
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
            url: app.data.urlmall + '/appylsjfile/xcxfileprogerssupload.do', // 仅为示例，非真实的接口地址
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
              let datas = JSON.parse(res.data)
              console.log(datas)
              wx.hideLoading();
              wx.showToast({
                title: '上传成功',
                icon: 'none'
              })
              simages.push(datas.data.fileName)
              // do something
              console.log(simages)
              if (simages.length == 5) {
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
 
  handleImagePreview(e) {
    var that = this;
    const idx = e.target.dataset.idx
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
  // 省跳市
  getprov: function (e) {
    var that = this;
    console.log(e)
    that.setData({ //给变量赋值
      poindex: e.detail.value,
      cindex: 0,
      aindex: 0,
      tindex: 0
    })
    province_id = that.data.province[e.detail.value].id;
    city_id = '';
    area_id = '';
    town_id = '';
    console.log(province_id);
    citys = [{
      id: '',
      name: '请选择所在市'
    }]
    // 获取所有市
    wx.request({
      url: app.data.urlmall + "/apparea/nextlist.do",
      data: {
        grade: '2',
        token: wx.getStorageSync('etoken'),
        id: province_id
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
  },
  // 市跳区
  getcity: function (e) {
    var that = this;
    that.setData({ //给变量赋值
      cindex: e.detail.value,
      aindex: 0,
      tindex: 0
    })
    city_id = that.data.city[e.detail.value].id;
    area_id = 0;
    town_id = 0;
    console.log(city_id);
    areas = [{
      id: '',
      name: '请选择所在区'
    }]
    that.setData({
      isqu: false
    })
    // 获取所有区
    wx.request({
      url: app.data.urlmall + "/apparea/nextlist.do",
      data: {
        grade: '3',
        token: wx.getStorageSync('etoken'),
        id: city_id
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
            area: areas
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
  },
  // 区跳街道
  getarea: function (e) {
    var that = this;
    that.setData({ //给变量赋值
      aindex: e.detail.value,
      tindex: 0
    })
    area_id = that.data.area[e.detail.value].id;
    town_id = '';
    console.log(area_id);
    towns = [{
      id: '',
      name: '请选择所在街道'
    }]
    that.setData({
      isjie: false
    })
    // 获取街道
    wx.request({
      url: app.data.urlmall + "/apparea/nextlist.do",
      data: {
        grade: '4',
        token: wx.getStorageSync('etoken'),
        id: area_id
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
            town: towns
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
  },
  gettown: function (e) {
    var that = this;
    that.setData({ //给变量赋值
      tindex: e.detail.value,
    })
    town_id = that.data.town[e.detail.value].id;
    console.log(town_id);
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
  num: function (e) {
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
    var town_idreg = town_id;
    var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
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
        title: '请上传赛事LOGO',
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
     }
    // else if (town_idreg == '') {
    //   wx.showToast({
    //     title: '请输入所在街道',
    //     icon: 'none',
    //     duration: 1500
    //   })
    //   return false;
    // } 
      else if (simages.length < 2) {
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
        // townId: town_id,
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