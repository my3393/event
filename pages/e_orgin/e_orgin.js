// pages/receve/receive.js
const app = getApp();
let province_id = '';
let city_id = '';
let citys = [];
let areas = [];
let towns = [];
let area_id = '';
let town_id = '';
let postersis='';
let saiid;
let conut = 0;
let detail = [];
let teamName = [];
let iscategory = 0;
let isname = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tas:99999,
    names: '',
    scope: '',
    minute: '',
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
    isart: true,
    isjie:true,
    isSai:true,
   
    posters: '../../images/chuan_03.png',
    detail: [],
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
  
      saiid= options.id
  
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
        console.log(res.data.data)
        if (res.data.status === 100) {
          for (var i in res.data.data) {
            province.push(res.data.data[i])
          }
          that.setData({
            province: province
          })

        }else if(res.data.status == 105){
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          wx.navigateTo({
            url: '../bindphone/bindphone',
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
     province_id = '';
     postersis == ''
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

  },
  addNew() {
    var that = this;
    
    var array = this.data.detail
      console.log(array.length)
      conut = array.length 
    if(conut == 0){
    array.push({ index: -1, category: '', name: '' })
      this.setData({
      detail: array
    })
      that.setData({
      isSai: !that.data.isSai
    })
      this.getNarea();
  }else if (array[conut-1].category != '' && array[conut-1].name == '' ){
      wx.showToast({
        title: '请填写类别名称',
        icon:'none',
        duration:2000
      })
    }else{
      array.push({ index: -1, category: '', name: '' })
      this.setData({
        detail: array
      })
      that.setData({
        isSai: !that.data.isSai
      })
      this.getNarea();
    }
   
  },
  xuan:function(e){
     var that = this;
    isname = 0
    iscategory = 0 
     console.log(e)
     that.getNarea();
     that.setData({
       isSai: !that.data.isSai
     })
    conut = e.currentTarget.dataset.index
  },
  //名称
  input:function(e){
    console.log(e)
    var that = this;
    isname = 0
    iscategory = 0  
    var detail = that.data.detail
    // if (detail[e.currentTarget.dataset.index].category == ''){
     
    // }
    detail[e.currentTarget.dataset.index].res = detail[e.currentTarget.dataset.index].category + '-' + e.detail.value
    detail[e.currentTarget.dataset.index].name = e.detail.value
    that.setData({
      detail: detail,
    })
    console.log(that.data.detail)
  },
  //赛区选择
  narea: function (e) {
    isname= 0
    iscategory = 0
    console.log(e)
   
    var that = this;
    console.log(that.data.detail)
    var detail = that.data.detail
    var index = e.currentTarget.dataset.index
    var competitionName = e.currentTarget.dataset.name
    detail[conut].category = competitionName
    detail[conut].index = 1
    detail[conut].name=''
    that.setData({
      isSai: !that.data.isSai,
      tas: index,

      detail:detail,
    })
    

  },
  //赛区
  getNarea: function () {
    var that = this;
    wx.request({
      url: app.data.urlmall + "/appcompetition/competitionarea.do",
      data: {
        id: saiid,
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
            narea: res.data.data
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
  cance: function () {
    var that = this;

    that.setData({
      isart: !that.data.isart,
    })
    // wx.navigateBack({
    //   delta: 1
    // })
    wx.navigateTo({
      url: '../e_mine/e_mine',
    })
  },
  deter: function () {
    var that = this;
    this.setData({
      isart: !that.data.isart,
    })

  },
  //入驻提交
  submit: function (e) {
    teamName = []
    var that = this;
    console.log(iscategory)
    console.log(isname)
    for(var i in that.data.detail){
      if(that.data.detail[i].res != ''){
        teamName.push(that.data.detail[i].res)
      }
      if (that.data.detail[i].category != '' && that.data.detail[i].name == ''){
          iscategory = 1
      } else if (that.data.detail[i].category == '' && that.data.detail[i].name != '') {
        isname = 1
      }
    }
    console.log(iscategory)
    console.log(isname)
    console.log(teamName)
    var province_idreg = province_id;
    var city_idreg = city_id;
    var area_idreg = area_id;
    var town_idreg = town_id;
    var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (that.data.names == '') {
      wx.showToast({
        title: '请输入机构名称',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false
    } else if (that.data.scope == '') {
      wx.showToast({
        title: '请输入联系方式',
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
    } else if (town_idreg == '') {
      wx.showToast({
        title: '请输入所在街道',
        icon: 'none',
        duration: 1500
      })
      return false;
    }else if (postersis == '') {
      wx.showToast({
        title: '请上传营业执照',
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
    } else if (iscategory == 1) {
      wx.showToast({
        title: '请填写类别的名称！',
        icon: 'none',
        duration: 3000
      })
      return false;
    } else if (isname == 1) {
      wx.showToast({
        title: '参选节目中选择了名称必须填写类别！',
        icon: 'none',
        duration: 3000
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
  //收件人
  names: function (e) {
    var names = e.detail.value
    this.setData({
      names: names
    })

  },
  //手机号
  scope: function (e) {
    var scope = e.detail.value
    this.setData({
      scope: scope
    })

  },
  //详细地址
  minute: function (e) {
    var minute = e.detail.value
    this.setData({
      minute: minute
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
          url: app.data.urlmall + 'appfile/xcxfileprogerssupload.do', // 仅为示例，非真实的接口地址
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
            
            wx.hideLoading();
            // do something
            wx.showToast({
              title: '上传成功',
              icon: 'none'
            })
          }
        })
        that.setData({
          posters: res.tempFilePaths[0]
        })
      }
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
  getxcx: function () {
    var that = this;
    
    wx.request({
      url: app.data.urlmall + "appcompetition/organizationapply.do",
      data: {
        token: wx.getStorageSync('etoken'),      
        provinceId: province_id,
        cityId: city_id,
        areaId: area_id,
        organizerId: saiid,
        organizationName: that.data.names,
        phone: that.data.scope,
        townId:town_id,
        businessLicense:postersis,
        teamName:teamName
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
            title: '提交成功',
            icon: 'none',
            duration: 2000
          })
          
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
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
  }
})