const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
var app = getApp();
Page({
    data: {
        showDialog: false,
        phone:''
    },
    toggleDialog: function(e) {
        this.setData({
            showDialog: !this.data.showDialog
        });
    },
    onLoad: function(options) {
        let that = this;
        console.log(app,111111111111)
        if(app.globalData){
            that.setData({
                phone:app.globalData.acount_info.phone
            })
        }
        
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
    },
})