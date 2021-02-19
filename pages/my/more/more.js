const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
var app = getApp();
Page({
    data: {},
    TapLogOut: function(e) {
        app.globalData.userInfo = {};
        wx.switchTab({
            url: '/pages/my/index/index', //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
        })
    },
    auditStatus: function(e) {
        let that = this;
        api.My.getRegisterInfo.reqData["open_id"] = app.globalData.open_id;
        util.requestAll(api.My.getRegisterInfo.reqUrl, api.My.getRegisterInfo.reqData, api.My.getRegisterInfo.reqType).then(function(res) {
            if (res.code == 0) {
                if (res.data.audit == 0) { //审核状态：0-未审核，1-已通过，2-未通过                
                    wx.navigateTo({
                        url: "/pages/my/auditing/auditing"
                    });
                    return false;
                }
                if (res.data.audit == 1) { //审核状态：0-未审核，1-已通过，2-未通过                
                    wx.navigateTo({
                        url: "/pages/my/audit_pass/audit_pass"
                    });
                    return false;
                }
                if (res.data.audit == 2) { //审核状态：0-未审核，1-已通过，2-未通过                
                    wx.navigateTo({
                        url: "/pages/my/accounts/accounts?audit_NoPass=true"
                    });
                    return false;
                }
            }
            wx.navigateTo({
                url: "/pages/my/accounts/accounts?audit_NoPass=false"
            });
        });
    },
    onLoad: function(options) {},
    onReady: function() {},


    onShow: function() {},
    onHide: function() {
        // 页面隐藏
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        let that = this;
        that.onLoad();
        util.alert('正在刷新数据...', 'loading');
        wx.stopPullDownRefresh(); //停止刷新操作
    },
    onReachBottom: function() {

    },
    onUnload: function() {
        // 页面关闭
    },
})