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
                        //  console.log(res.data.data);
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
                    }, 1000)
                  }
                }
              });
            }
            // if (res.authSetting['scope.userInfo'] == undefined || res.authSetting['scope.userInfo'] == false) {
            //   console.log(11)
            //   wx.redirectTo({
            //     url: '/pages/login/login',
            //   })
              
            // }
          }
        })
      }
    })
    // 获取用户信息
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        console.log('onCheckForUpdate====', res)
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          console.log('res.hasUpdate====')
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                console.log('success====', res)
                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '更新失败~',
              content: '请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    }
   // console.log("isshow", this.g.config)
    // this.UserLogin();

  },
  globalData: {
    userInfo: null
  },
  onShow: function (e) {
   
  },
})