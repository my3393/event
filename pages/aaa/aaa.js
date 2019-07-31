// pages/aaa/aaa.js
var tag = [];
var count = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tar: '10',
    tag: [
      { id: 1, name: 5,  istrue: false},
      { id: 2, name: 10, istrue: false},
      { id: 3, name: 20, istrue: false},
      { id: 4, name: 30, istrue: false},
      { id: 5, name: 50, istrue: false},

    ],
  },
  
  chact: function (e) {
    var that = this;
   
    if(count < 3){
      tag = that.data.tag;
      console.log(count)
      var istrue = e.currentTarget.dataset.istrue;
      var index = e.currentTarget.dataset.index;
      console.log(e);
      tag[index].count = count
      tag[index].istrue = !tag[index].istrue
      console.log(that.data.tag[index])
      that.setData({
        tag: tag
      })
      ++count
    }else{ 
      for(var i in tag){
         if(tag[i].count == 0){
           tag[i].istrue = !tag[i].istrue;
           delete (tag[i].count)
           console.log(tag[i])
        } if (tag[i].count == 1){
          tag[i].count = 0
        } if (tag[i].count == 2) {
          tag[i].count = 1
        }
      }
    }
    count = 2
    if (count < 3) {
      tag = that.data.tag;
      console.log(count)
      var istrue = e.currentTarget.dataset.istrue;
      var index = e.currentTarget.dataset.index;
      console.log(e);
      tag[index].count = count
      tag[index].istrue = !tag[index].istrue
      console.log(that.data.tag[index])
      that.setData({
        tag: tag
      })
      ++count
    }
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

  }
})