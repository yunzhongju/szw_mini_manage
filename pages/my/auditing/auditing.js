const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
var app = getApp();
Page({
    data: {},
    onLoad: function(options) {
        let that = this;
    },
    onReady: function() {

    },


    onShow: function() {},
    onHide: function() {
        // 页面隐藏

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onUnload: function() {
        // 页面关闭
        wx.switchTab({
            url: '/pages/my/index/index',
          })
    },
})