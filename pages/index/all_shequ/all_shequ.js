const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const bmap = require('../../../utils/bmap-wx.min.js');
const api = require('../../../config/api.js');
var app = getApp();
Page({
    data: {
        code: "",
        maxPage: "",
        getListByCode: [],
    },
    //跳转到社区详情
    TaptoCommunity_details: function(e) {
        commonJs.TaptoCommunity_details(e.currentTarget.dataset.id);
    },
    //通过省市区街道编码获取社区信息列表
    getListByCode: function() {
        let that = this;
        if (that.data.maxPage != "" && api.Index.getListByCode.reqData.page > that.data.maxPage) {
            return;
        }
        if (app.globalData.longitude != "" && app.globalData.latitude != "") {
            api.Index.getListByCode.reqData['longitude'] = app.globalData.longitude;
            api.Index.getListByCode.reqData['latitude'] = app.globalData.latitude;
        } else {
            api.Index.getListByCode.reqData['longitude'] = app.globalData.longitude1;
            api.Index.getListByCode.reqData['latitude'] = app.globalData.latitude1;
        }
        api.Index.getListByCode.reqData['area'] = that.data.code;
        api.Index.getListByCode.reqData['open_id'] = app.globalData.open_id;

        util.request(api.Index.getListByCode.reqUrl, api.Index.getListByCode.reqData, api.Index.getListByCode.reqType).then(function(res) {
            let u = res.data,
                vl = that.data.getListByCode;
            if (u.length > 0) {
                if (api.Index.getListByCode.reqData.page > 1) vl = vl.concat(u)
                else vl = u;
            }
            let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
            that.setData({
                maxPage: maxPage,
                getListByCode: vl,
            })
        });
    },
    onLoad: function(options) {
        let that = this;
        that.setData({
            code: options.code,
        });
        api.Index.getListByCode.reqData['limit'] = 20;
    },
    onReady: function() {},
    onShow: function() {
        let that = this;
        api.Index.getListByCode.reqData['page'] = 1;
        that.getListByCode();
    },
    onHide: function() {
        // 页面隐藏
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        let that = this;
        that.onShow();
        util.alert('正在刷新数据...', 'loading');
        wx.stopPullDownRefresh(); //停止刷新操作
    },
    onReachBottom: function() {
        api.Index.getListByCode.reqData['page'] += 1;
        this.getListByCode();
    },
    onUnload: function() {
        // 页面关闭
    },
})