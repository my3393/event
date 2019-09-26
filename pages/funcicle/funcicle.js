// pages/funcicle/funcicle.js
const app = getApp();
let currentPage = 1;
let currentPage1 = 1;
var videos = [];
var keyword = '';
var labels = [{
    id: 9999,
    name: '全部'
}];
var imgs = [];
var label_id = '';
var is_add = 0;
var others = [];

var bcode;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        videos: [],
        labels: [],
        num: '',
        showvideo: false,
        others: [],
        isvideo: true,
        play: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
       
        var that = this;
        wx.request({
            url: app.data.urlmall + "/appartist/list.do",
            data: {
                currentPage: currentPage,
                token :wx.getStorageSync('etoken')
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function(res) {
                console.log(res.data.data)
                if (res.data.status == 100) {
                    for (var i in res.data.data.data) {
                        videos.push(res.data.data.data[i]);
                    }
                    that.setData({
                        videos: videos
                    });
                    console.log(that.data.videos)
                }

            }
        })
        // 获取艺人标签
        wx.request({
          url: app.data.urlmall + "/appartistlabel/alllabel.do",
            data: {
              token:wx.getStorageSync('etoken')
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function(res) {
                if (res.data.status == 100) {
                    console.log(res.data.data)
                    for (var i = 0; i < res.data.data.length; i++) {
                        labels.push(res.data.data[i])
                    }
                    that.setData({
                        labels: labels
                    })
                    console.log(labels)
                } else if (res.data.status === 103) {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none'
                  })
                  wx.navigateTo({
                    url: '/pages/login/login',
                  })

                }

            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        wx.getStorage({
            key: 'userinfo',
            success: function(res) {
                bcode = res.data.user_id;
                console.log(bcode + "----")
            },
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        var that = this;
        if (is_add == 0) {
            currentPage = currentPage + 1;
            wx.request({
              url: app.data.urlmall + "/appartist/list.do",
                data: {
                    currentPage: currentPage,
                    keywords: keyword,
                    token :wx.getStorageSync('etoken')
                },
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                dataType: 'json',
                success: function(res) {
                    console.log(res.data.data)
                    if (res.data.status == 100) {
                        if (currentPage > res.data.data.totalPage) {
                            wx.showToast({
                                title: '已加载全部',
                                icon: 'none',
                                duration: 500
                            })
                        } else {
                            for (var i in res.data.data.data) {
                                videos.push(res.data.data.data[i]);
                            }
                            that.setData({
                                videos: videos
                            });
                            console.log(that.data.videos)
                        }

                    }

                }
            })
        }
        if (is_add == 1) {
            currentPage1 = currentPage1 + 1;
            wx.request({
              url: app.data.urlmall + "/appartist/list.do",
                data: {
                    labelId: label_id,
                    currentPage: currentPage1,
                    token:wx.getStorageSync('etoken')
                },
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                dataType: 'json',
                success: function(res) {
                    if (res.data.status == 100) {

                        if (res.data.data.totalPage == 0) {
                            wx.showToast({
                                title: '当前标签暂无艺人',
                                icon: 'none',
                                duration: 500
                            })
                        } else if (currentPage1 > res.data.data.totalPage) {
                            wx.showToast({
                                title: '已加载全部',
                                icon: 'none',
                                duration: 500
                            })
                        } else {
                            for (var i in res.data.data.data) {
                                others.push(res.data.data.data[i])
                            }
                            that.setData({
                                others: others
                            })
                        }
                        console.log(res.data)
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        console.log(wx.getStorageSync("userinfo").is_actor)
        var isactor = wx.getStorageSync("userinfo").is_actor;
        var isleagure = wx.getStorageSync("userinfo").shareIdentityType;
        var hasdiol = wx.getStorageSync("userinfo").idol_id;
        var bcode;
        var scode;
        if (isactor == 2) {
            bcode = wx.getStorageSync("userinfo").user_id;
            scode = wx.getStorageSync("userinfo").user_id;
        } else if (isleagure != 0 && hasdiol == null) {
            bcode = wx.getStorageSync("userinfo").user_id;
            scode = wx.getStorageSync("userinfo").user_id;
        } else if (isleagure != 0 && hasdiol != null) {
            bcode = wx.getStorageSync("userinfo").idol_id;
            scode = wx.getStorageSync("userinfo").user_id;
        } else if (hasdiol != null || hasdiol != "") {
            bcode = wx.getStorageSync("userinfo").idol_id;
            scode = wx.getStorageSync("userinfo").user_id;
        } else {
            bcode = wx.getStorageSync("userinfo").user_id;
            scode = wx.getStorageSync("userinfo").user_id;
        }
        return {
            title: '明星家园，我为自己代言',
            path: '/pages/funcicle/funcicle?bindcode=' + bcode + "&scode=" + scode
        }
    },
    todetail: function(e) {
        wx.getStorage({
            key: 'userinfo',
            success: function(res) {
                if (res.data.phone == '' || res.data.phone == null) {
                    wx.navigateTo({
                        url: '../bindphone/bindphone',
                    })
                } else {
                    wx.navigateTo({
                        url: '../funcicle_detail/funcicle_detail?user_id=' + e.currentTarget.id,
                    })
                }
            },
        })


    },
    aenter: function(e) {
        wx.getStorage({
            key: 'userinfo',
            success: function(res) {
                console.log(res.data.phone)
                if (res.data.phone == '' || res.data.phone == null) {
                    wx.navigateTo({
                        url: '../bindphone/bindphone',
                    })
                } else {
                    wx.getStorage({
                        key: 'userinfo',
                        success: function(res) {
                            if (res.data.is_actor == 2) {
                                wx.showToast({
                                    title: '您已经是艺人身份',
                                    icon: 'none'
                                })
                            } else if (res.data.is_actor == 1) {
                                wx.showToast({
                                    title: '您的信息正在审核中',
                                    icon: 'none'
                                })
                            } else {
                                wx.navigateTo({
                                    url: '../iwillpromote/iwillpromote',
                                })
                            }
                        },
                    })
                }
            },
        })
    },
    getkeyword: function(e) {
        keyword = e.detail.value;
      var that = this;
      that.setData({
        videos: []
      });
      videos = [];
      currentPage = 1;
      wx.request({
        url: app.data.urlmall + "/appartist/list.do",
        data: {
          currentPage: currentPage,
          keywords: keyword,
          token :wx.getStorageSync('etoken')

        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',
        success: function (res) {
          //console.log(res.data.data)
          if (res.data.status == 100) {
            for (var i in res.data.data.data) {
              videos.push(res.data.data.data[i]);
            }
            that.setData({
              videos: videos
            });
           // console.log(that.data.videos)
          }

        }
      })
    },
    tosearch: function(e) {
        
    },
    selectlabel: function(e) {
        var that = this;
       // console.log(e)
        currentPage1 = 1;
        label_id = e.currentTarget.id;
        that.setData({
            num: e.currentTarget.dataset.num
        })
        if (e.currentTarget.dataset.num == 0) {
            that.setData({
                showvideo: false
            })
            is_add = 0;
        } else {
            that.setData({
                showvideo: true
            })
            is_add = 1;
        }
        others = [];
        that.setData({
            others: []
        })
        if (e.currentTarget.id == 9999) {

        } else {
            // 获取筛选数据
            wx.request({
              url: app.data.urlmall + "/appartist/list.do",
                data: {
                   token:wx.getStorageSync('etoken'),
                    labelId: label_id,
                    currentPage: currentPage1
                },
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                dataType: 'json',
                success: function(res) {
                    if (res.data.status == 100) {
                        if (res.data.data.totalPage == 0) {
                            wx.showToast({
                                title: '当前标签暂无艺人',
                                icon: 'none',
                                duration: 500
                            })
                        } else {
                            for (var i in res.data.data.data) {
                                others.push(res.data.data.data[i])
                            }
                          
                            that.setData({
                                others: others
                            })
                        }

                        //console.log(res.data)
                    }else {
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }

                }
            })
        }

    },
    handleImagePreview: function(e) {
        var that = this;
        var urlsa = [];
        urlsa.push(e.currentTarget.id)
        console.log(urlsa)
        wx.previewImage({
            current: e.currentTarget.id,
            urls: urlsa
        })
    },
    showvideo: function(e) {
        var that = this;
        that.setData({
            isvideo: !that.data.isvideo,
            play: e.currentTarget.id
        })
    },
    hidevideo: function(e) {
        var that = this;
        that.setData({
            isvideo: !that.data.isvideo
        })
    },
    seevideo: function(e) {
        var that = this;
        that.setData({
            isvideo: !that.data.isvideo,
            play: e.currentTarget.dataset.ids
        })
    }  
})