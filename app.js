//app.js
let avater = '';
let iv = '';
let encryptedData = '';
App({
  data: {
    urlmall: "https://yisai.xcx.1v.0.xingtu-group.cn/yisai-api-service/"
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.getSetting({
          success(res) {
            console.log(res.authSetting['scope.userInfo'])
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称

              wx.login({
                success: function (res) {
                  wx.getUserInfo({
                    success: function (res) {
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
                  console.log(res.code)
                  if (res) {
                    setTimeout(function () {
                      wx.request({
                        url: "https://yisai.xcx.1v.0.xingtu-group.cn/yisai-api-service/appcomeptition/xcx/login.do",
                        data: {
                          code: res.code,
                          nickName: avater.nickName,
                          davatarUrl: avater.avatarUrl,
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
                          // if (res.data.data.user.phone == null || res.data.data.user.phone == ''){
                          //     wx.redirectTo({
                          //         url: '../bindphone/bindphone',
                          //     })
                          // }
                        }
                      })
                    }, 500)
                  }
                }
              });
            }
            if (res.authSetting['scope.userInfo'] == undefined || res.authSetting['scope.userInfo'] == false) {
              console.log(11)
              wx.redirectTo({
                url: '/pages/login/login',
              })
              
            }
          }
        })
      }
    })
    // 获取用户信息
   
  },
  globalData: {
    userInfo: null
  },
  onShow: function (e) {
   
  },
})