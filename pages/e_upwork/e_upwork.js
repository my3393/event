// pages/e_upwork/e_upwork.js
var app = getApp();
var poster;
var token;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    posters: '../../images/upimg.png',
    video: '../../images/upimg.png',
    tvideo:'',
    showadds: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
          url: app.data.urlmall + '/appylsjfile/fileprogerssupload.do', // 仅为示例，非真实的接口地址
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
            console.log(datas.data.fileName)
            poster = datas.data.fileName;
            console.log(poster)
            wx.hideLoading();
            // do something
          }
        })
        that.setData({
          posters: res.tempFilePaths[0]
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
      maxDuration: 60,
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
        if (res.duration < 20) {
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

              wx.hideLoading();
              wx.showToast({
                title: '上传成功',
                icon: 'success'
              })
              that.setData({
                video: datas.data.url,
                tvideo: datas.data.fileName
              })
            }
          })
        } else {
          wx.showToast({
            title: '请选择20s以内',
            icon: 'none'
          })
          that.setData({
            showadds: !that.data.showadds
          })
        }
      }
    })
  },
})