var api = require('./config/api.js');
var util = require('./utils/util.js');
import {doLoginAPI,getUserInfoAPI,getWxInfoAPI} from './config/newsAPI/api'
App({
    onLaunch: function () {
        let that = this;
        that.wxLogin();
        // that.getConfig();
    },

    onShow:function(){
        let that=this
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
                    showCancel:false,
                    content: '新版本已经准备好，是否重启应用？',
                    success: function (res) {
                      console.log('success====', res)
                      // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                      if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                      }else if(res.cancel){
                        // that.showModal(that,updateManager)
                      }
                    }
                  })
                })
                updateManager.onUpdateFailed(function () {
                  // 新的版本下载失败
                  wx.showModal({
                    title: '已经有新版本了哟~',
                    content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
                  })
                })
              }
            })
          }
    },
    /**
     * 微信登录并获取openId
     */
    showModal:function(that,updateManager){
        wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
            console.log('success====', res)
            // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
            if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
            }else if(res.cancel){
            that.showModal(that,updateManager)
            }
        }
        })
    },
    wxLogin: function () {
        var that = this;
        // 登录
        wx.login({
            success: res => {    
                let params={code:res.code}
                // that.getAccessToken()
                doLoginAPI(params)
                .then(function (res) {
                    that.globalData.open_id = res.data.sessionId;
                    // console.log("that.globalData.open_id=" + that.globalData.open_id, res);
                    // 获取用户信息
                    wx.getSetting({
                        success: res => {
                            console.log('获取用户是否授权过',res);
                            // console.log(res);
                            if (!res.authSetting['scope.userInfo']) {
                                // console.log('用户没有授权过，准备发送授权申请');
                                wx.authorize({
                                    scope: 'scope.userInfo',
                                    success: res => {
                                        // console.log('主动发送授权，成功');
                                        console.log(e);
                                        wx.getUserInfo({
                                            success: function (res) {
                                                // console.log("1获取用户信息 res=" + JSON.stringify(res))
                                                // console.log(res)
                                                that.setUserInfo(res.userInfo);
                                            }
                                        })
                                    },
                                    fail: err => {
                                        // console.log('主动发送授权，失败');
                                        console.log(err);
                                    }
                                })
                            } else {
                                wx.getUserInfo({
                                    success: function (res) {
                                        console.log("2获取用户信息 res=",res)
                                        that.setUserInfo(res);
                                    }
                                })
                            }
                        },
                        fail: res => {
                            // console.log('获取查询用户是否授权失败，内容如下：');
                            console.log(res);

                        }
                    })
                });
            },
        });
    },
    getOpenid: function () {
        var that = this;
        // console.log('没有的方法')
        return new Promise(function (resolve, reject) {
            wx.login({
                success: res => {
                    // api.My.Login.reqData["code"] = res.code;
                    // util.request(api.My.Login.reqUrl, api.My.Login.reqData, api.My.Login.reqType)
                    let params={code:res.code}
                    doLoginAPI(params)
                    .then(function (res) {
                        that.globalData.open_id = res.data.sessionId;
                        resolve(res.status);
                    });
                },
            });
        });
    },
    /**
     * 设置用户基本信息
     */
    setUserInfo: function (res) {
        // console.log('setuserinfo',res)
        let params={
            encryptedData:res.encryptedData,
            iv:res.iv
        }
        getWxInfoAPI(params).then(res=>{})
        var that = this;
        // api.My.updateBaseInfo.reqData = userInfo;
        // api.My.updateBaseInfo.reqData["open_id"] = that.globalData.open_id;
        // util.requestAll(api.My.updateBaseInfo.reqUrl, api.My.updateBaseInfo.reqData, api.My.updateBaseInfo.reqType)
        getUserInfoAPI().then(function (updateres) {  
            console.log('updateres',updateres)
            let live_info={
                livePower:updateres.data.livePower,
                wxcode:updateres.data.wxcode,
                anchorName:updateres.data.anchorName,
                firstLive:updateres.data.firstLive
            }
            wx.setStorage({
              data: JSON.stringify(live_info),
              key: 'live_info',
            })
            that.globalData.userInfo = res.userInfo
            that.globalData.livePower=updateres.data.livePower
            that.globalData.wxcode=updateres.data.wxcode
            that.globalData.anchorName=updateres.data.anchorName
            that.globalData.userInfo['id']=updateres.data.id
            // console.log('全局app',that.globalData)
            const pages = getCurrentPages()
            const perpage = pages[pages.length - 1]
            // perpage.onShow()
        })
    },
    /**
     * 视频开关
     */
    getConfig: function () {
        var that = this;
        util.requestAll(api.Common.getConfig.reqUrl, api.Common.getConfig.reqData, api.Common.getConfig.reqType).then(function (res) {
            that.globalData.is_video = res.data.is_video;
        })
    },
    
    // 获取用户位置信息
    getuserLocation: function () {
        var that = this;
        //判断是否获得了用户地理位置授权
        wx.getSetting({
            success: (res) => {
                wx.getLocation({
                    type: 'wgs84',
                    success(res) {
                        const latitude = res.latitude
                        const longitude = res.longitude
                        const speed = res.speed
                        const accuracy = res.accuracy
                        that.globalData.latitude = res.latitude;
                        that.globalData.longitude = res.longitude;
                    }
                })
                // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
                // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
                // res.authSetting['scope.userLocation'] == true    表示 地理位置授权

                // if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
                //     wx.showModal({
                //         title: '请求授权当前位置',
                //         content: '需要获取您的地理位置，请确认授权',
                //         success: function(res) {
                //             if (res.cancel) {
                //                 that.communityDetails();
                //             } else if (res.confirm) {
                //                 wx.openSetting({
                //                     success: function(dataAu) {
                //                         if (dataAu.authSetting["scope.userLocation"] == true) {
                //                             wx.getLocation({
                //                                 type: 'wgs84',
                //                                 success(res) {
                //                                     const latitude = res.latitude
                //                                     const longitude = res.longitude
                //                                     const speed = res.speed
                //                                     const accuracy = res.accuracy
                //                                     that.globalData.latitude = res.latitude;
                //                                     that.globalData.longitude = res.longitude;
                //                                 }
                //                             })
                //                         } else {
                //                             wx.showToast({
                //                                 title: '授权失败',
                //                                 icon: 'none',
                //                                 duration: 1000
                //                             })
                //                         }
                //                     }
                //                 })
                //             }
                //         }
                //     })
                // } else if (res.authSetting['scope.userLocation'] == undefined) {
                //     wx.getLocation({
                //         type: 'wgs84',
                //         success(res) {
                //             const latitude = res.latitude
                //             const longitude = res.longitude
                //             const speed = res.speed
                //             const accuracy = res.accuracy
                //             that.globalData.latitude = res.latitude;
                //             that.globalData.longitude = res.longitude;
                //         }
                //     })
                // } else {
                //     wx.getLocation({
                //         type: 'wgs84',
                //         success(res) {
                //             const latitude = res.latitude
                //             const longitude = res.longitude
                //             const speed = res.speed
                //             const accuracy = res.accuracy
                //             that.globalData.latitude = res.latitude;
                //             that.globalData.longitude = res.longitude;
                //         }
                //     })
                // }
            }
        })
    },

    globalData: {
        acount_info:'',
        livePower:'',
        wxcode:'',
        anchorName:'',
        access_token:'',
        is_video: "", //是否开放视频,0-否，1-是
        communityId: "", //社区编号
        longitude: "",
        latitude: "",
        longitude1: "104.015864",
        latitude1: "30.698104",
        phone: "",
        choosecommunity: {
            province: "",
            city: "",
            area: "",
            street: "",
            community: "",
        },
        userInfo: {
            // avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/NqibOC4oNTWeuJdyLVSwQibrPQogy6OgEL6xhSPoos13wVTT0zibMPQ7bTcTKhiavS4HwicX7ue4EkTcvYT5Xvc8maQ/132",
            // city: "Zigong",
            // country: "China",
            // gender: 2,
            // language: "zh_CN",
            // nickName: "竹子",
            // province: "Sichuan",
            avatarUrl: "",
            city: "",
            country: "",
            gender: "",
            language: "",
            nickName: "",
            province: "",
        },
        open_id: "",
    },
})
