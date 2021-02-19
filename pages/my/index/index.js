const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
var app = getApp();
import common from '../../../config/newsAPI/common'
import {
    getPhoneNumberAPI,
    getUnreadMessageCountAPI
} from '../../../config/newsAPI/my_api'
import {
    getUserInfoAPI,
    toPayAPI,
    payNotifyAPI,
    getWxInfoAPI
} from '../../../config/newsAPI/api'
Page({
    data: {
        wxUserInfo: "",
        getNoReadNumber: 0,
        accountInfo:'',
        isphone: false,
        auditStatus:''
    },

    // 支付
    goToPay: function () {
        toPayAPI({}).then(res=>{
            // console.log('支付ok',res)
            wx.requestPayment({
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              paySign: res.data.paySign,
              signType: 'MD5',
              timeStamp: res.data.timeStamp,
              success (res) {
                //   console.log(res)
               },
              fail (res) {console.log(res) }
            })
        })
    },
    auditStatus(){
        let status=this.data.accountInfo.audit
        if(status==1){
            wx.navigateTo({
                url: '/pages/my/audit_pass/audit_pass',
            })
        }else if(status==0){
            wx.navigateTo({
                url: '/pages/my/auditing/auditing',
            })
        }else if(status==2){
            wx.navigateTo({
              url: '/pages/my/accounts/accounts',
            })
        }else{
            wx.navigateTo({
                url: '/pages/my/accounts/accounts',
              })
        }
    },
    // bindGetUserInfo
    // 获取个人信息
    bindGetUserInfo: function (e) {
        // console.log(e) //==个人信息
        let params = {
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv
        }
        getWxInfoAPI(params).then(res=>{})
        commonJs.bindGetUserInfo(e)
    },
    // 电话号码授权
    getPhoneNumber(e) {
        // commonJs.getPhoneNumber(e)
        // console.log(e)
        let params = {
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv
        }
        getPhoneNumberAPI(params).then(res => {
            // console.log('获取手机号', res)
            if (res.status == 1) {
                app.globalData.phone = res.data
                this.setData({
                    isphone: true
                })
                // this.upsetinfo()
            }
        })
        // var that = this
        // util.request(api.My.getUserPhone.reqUrl, api.My.getUserPhone.reqData, api.My.getUserPhone.reqType).then(function(res) {
        //     that.upsetinfo()
        // })
    },
    upsetinfo() {
        getUserInfoAPI().then(res => {
            console.log('获取用户信息', res)
        })
        // commonJs.getInfoByOpenID()
        // var that = this
        // util.request(api.My.getInfoByOpenID.reqUrl, api.My.getInfoByOpenID.reqData, api.My.getInfoByOpenID.reqType).then(function (res) {
        //     console.log(res)
        //     if (res.data.phone && that.data.wxUserInfo.avatarUrl) {
        //         // 已经授权电话号码
        //         that.setData({
        //             isphone: true
        //         })
        //     } else {
        //         // 没有授权电话号码
        //         app.globalData.phone = res.data.phone
        //         // that.setData({
        //         //     isphone:true
        //         // })
        //         // console.log(app.globalData.phone)
        //     }
        // })
    },

    TapLogOut: function (e) {
        wx.clearStorage()
        app.globalData.userInfo = {};
        let that = this;
        that.onShow();
    },
    //获取我的未读信息数量
    getNoReadNumber: function () {
        let that = this;
        let params={
            userId:app.globalData.userInfo.id
        }
        getUnreadMessageCountAPI(params).then(res=>{
            // console.log('消息数',res)
            that.setData({
                getNoReadNumber:res.data
            })
        })
        // api.My.getNoReadNumber.reqData["open_id"] = app.globalData.open_id;
        // util.request(api.My.getNoReadNumber.reqUrl, api.My.getNoReadNumber.reqData, api.My.getNoReadNumber.reqType).then(function (res) {
        //     that.setData({
        //         getNoReadNumber: res.data
        //     })
        // });
    },
    onLoad: function (options) {
        const accountInfo = wx.getAccountInfoSync();
        this.getMySqManagerDetail()
    },
    onReady: function () {},

    onShow: function () {
        this.upsetinfo()
        var that = this;
        // 判断session_key 是否失效
        wx.checkSession({
            fail() {
                // console.log('登录失效，重新登录');
                app.wxLogin();
            }
        })
        that.setData({
            wxUserInfo: app.globalData.userInfo
        })

        if (that.data.wxUserInfo.avatarUrl) {
            that.getNoReadNumber();
        }
    },
    onHide: function () {
        // 页面隐藏
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        let that = this;
        that.onShow();
        that.getMySqManagerDetail()
        util.alert('正在刷新数据...', 'loading');
        wx.stopPullDownRefresh(); //停止刷新操作
    },
    onReachBottom: function () {

    },
    onUnload: function () {
        // 页面关闭
    },
    //获取审核状态
    getMySqManagerDetail: function () {
        common.getMySqManagerDetail(res=>{
            if(res.data){
                app.globalData.acount_info=res.data
                this.setData({
                    accountInfo:res.data
                })
            }
        })
    }
})