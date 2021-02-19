const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
var app = getApp();
Page({
    data: {
        SpecialTopic: {},
        list: [],
        maxPage: ""
    },
    // 跳转到新闻详情页面
    TaptoNews_details: function(e) {
        commonJs.TaptoNews_details(e.currentTarget.dataset.id);
    },
    //跳转到视频详情页面
    TaptoVideo_details: function(e) {
        commonJs.TaptoVideo_details(e.currentTarget.dataset.id);
    },
    // 点击关注
    isFocusOn: function(event) {
        if (!app.globalData.userInfo.avatarUrl) {
            util.alert("请前往我的页面授权");
            return false;
        }
        api.Index.attention.reqData["open_id"] = app.globalData.open_id;
        api.Index.attention.reqData["special_topic_id"] = event.currentTarget.dataset.id;
        api.Index.attention.reqData["type"] = 1;
        if (event.currentTarget.dataset.on == 1) {
            api.Index.attention.reqData["type"] = 0;
        }
        this.attention();
    },
    //关注和取消主题关注
    attention: function() {
        let that = this;
        util.request(api.Index.attention.reqUrl, api.Index.attention.reqData, api.Index.attention.reqType).then(function(res) {
            if (res != undefined) {
                api.Index.special_topicDetails.reqData.page = 1;
                that.special_topicDetails();
            }
        });
    },
    //获取最新的非推荐新闻和视频
    special_topicDetails: function() {
        let that = this;
        if (that.data.maxPage != "" && api.Index.special_topicDetails.reqData.page > that.data.maxPage) {
            return;
        }
        util.request(api.Index.special_topicDetails.reqUrl, api.Index.special_topicDetails.reqData, api.Index.special_topicDetails.reqType).then(function(res) {
            let u = res.data.list,
                vl = that.data.list;
            if (u.length > 0) {
                if (api.Index.special_topicDetails.reqData.page > 1) vl = vl.concat(u)
                else vl = u;
            }
            let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
            that.setData({
                maxPage: maxPage,
                SpecialTopic: res.data.SpecialTopic,
                list: vl,
            })
        });
    },
    onLoad: function(options) {
        let that = this;
        that.setData({
            id: options.id,
        })
    },
    onReady: function() {

    },


    onShow: function() {
        let that = this;
        api.Index.special_topicDetails.reqData.id = that.data.id;
        api.Index.special_topicDetails.reqData.open_id = app.globalData.open_id;
        api.Index.special_topicDetails.reqData.page = 1;
        that.special_topicDetails();
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
        api.Index.special_topicDetails.reqData.page += 1;
        this.special_topicDetails();
    },
    onUnload: function() {
        // 页面关闭
    },
})