let avater = '';
let iv='';
let encryptedData = '';
const app = getApp();
Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad() {
        // 查看是否授权
        wx.getSetting({
            success(res) {
                console.log(res)
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.login({
                        success: function(res) {
                            wx.getUserInfo({
                                success: function(res) {
                                    console.log(res)
                                    iv = res.iv
                                    encryptedData = res.encryptedData
                                    avater = JSON.parse(res.rawData)
                                    wx.setStorage({
                                      key: 'avater',
                                      data: avater,
                                    })
                                    wx.setStorage({
                                      key: 'encryptedData',
                                      data: encryptedData,
                                    })
                                    wx.setStorage({
                                      key: 'iv',
                                      data: iv,
                                    })
                                }
                            })
                            wx.setStorage({
                                key: 'code',
                                data: res.code,
                            })
                            if (res.code) {
                                console.log(1)
                                console.log(res.code)
                                setTimeout(function () {
                                    wx.request({
                                      url: "https://yisai.xcx.1v.0.xingtu-group.cn/yisai-api-service/appcomeptition/xcx/login.do",
                                        data: {
                                            code: res.code,
                                            nickName: avater.nickName,
                                            headimgurl: avater.avatarUrl,
                                            encryptedData: encryptedData,
                                            iv: iv
                                        },
                                        method: 'POST',
                                        header: {
                                            'content-type': 'application/x-www-form-urlencoded'
                                        },
                                        dataType: 'json',
                                        success: function (res) {
                                            console.log(res.data.data);
                                            wx.setStorage({
                                                key: 'etoken',
                                                data: res.data.data.token,
                                            })
                                            wx.setStorage({
                                                key: 'userinfo',
                                                data: res.data.data.user,
                                            })
                                                // if (res.data.data.user.phone == null || res.data.data.user.phone == '') {
                                                //     wx.redirectTo({
                                                //         url: '../bindphone/bindphone',
                                                //     })
                                                // } else {
                                                    
                                                // }
                                          wx.redirectTo({
                                              url: '../e_home/e_home'
                                            })
                                        }
                                    })
                                }, 500)

                                
                            }
                        }
                    });
                }
            }
        })
    },
    bindGetUserInfo(e) {
        console.log(e.detail.userInfo)
        wx.getSetting({
            success(res) {
                console.log(res)
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称

                    wx.login({
                        success: function(res) {
                            wx.getUserInfo({
                                success: function(res) {
                                    console.log(res)
                                    iv = res.iv
                                    encryptedData = res.encryptedData
                                    avater = JSON.parse(res.rawData)
                                    wx.setStorage({
                                        key: 'avater',
                                        data: avater,
                                    })
                                    wx.setStorage({
                                      key: 'encryptedData',
                                      data: encryptedData,
                                    })
                                    wx.setStorage({
                                      key: 'iv',
                                      data: iv,
                                    })
                                }
                            })
                            wx.setStorage({
                                key: 'code',
                                data: res.code,
                            })
                            if (res.code) {
                              console.log(res.iv)
                                console.log(res.code)
                                setTimeout(function () {
                                    wx.request({
                                      url: "https://yisai.xcx.1v.0.xingtu-group.cn/yisai-api-service/appcomeptition/xcx/login.do",
                                        data: {
                                            code: res.code,
                                            nickName: avater.nickName,
                                            headimgurl: avater.avatarUrl,
                                            encryptedData:encryptedData,
                                            iv: iv
                                        },
                                        method: 'POST',
                                        header: {
                                            'content-type': 'application/x-www-form-urlencoded'
                                        },
                                        dataType: 'json',
                                        success: function (res) {
                                            console.log(res.data.data);
                                          
                                            if(res.data.status == 100){
                                                wx.setStorage({
                                                    key: 'etoken',
                                                    data: res.data.data.token,
                                                })
                                                wx.setStorage({
                                                    key: 'userinfo',
                                                    data: res.data.data.user,
                                                })
                                                // if (res.data.data.user.phone == null || res.data.data.user.phone == '') {
                                                //     wx.redirectTo({
                                                //         url: '../bindphone/bindphone',
                                                //     })
                                                // } else {

                                                // }
                                               wx.redirectTo({
                                                  url: '../e_home/e_home'
                                                })
                                            }else{
                                                wx.showToast({
                                                    title: res.data.msg,
                                                    
                                                })
                                              console.log(11)
                                            }
                                        }
                                    })
                                }, 500)
                            }
                        }
                    });
                }
            }
        })
    }
})