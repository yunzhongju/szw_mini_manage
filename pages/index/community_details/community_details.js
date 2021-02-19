const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
var app = getApp();
Page({
    data: {
        communityDetails: {},
        isAttention: 0,
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
        if (event.currentTarget.dataset.on == 0) {
            this.attention();
        } else {
            this.cancenAttention();
        }
    },
    //点击关注
    attention: function() {
        let that = this;
        api.Index.community_attention.reqData["open_id"] = app.globalData.open_id;
        api.Index.community_attention.reqData["community_id"] = that.data.id;
        util.request(api.Index.community_attention.reqUrl, api.Index.community_attention.reqData, api.Index.community_attention.reqType).then(function(res) {
            that.isAttention();
        });
    },
    //点击关注
    cancenAttention: function() {
        let that = this;
        api.Index.cancenAttention.reqData["open_id"] = app.globalData.open_id;
        api.Index.cancenAttention.reqData["community_id"] = that.data.id;
        util.request(api.Index.cancenAttention.reqUrl, api.Index.cancenAttention.reqData, api.Index.cancenAttention.reqType).then(function(res) {
            that.isAttention();
        });
    },
    //获取最新的非推荐新闻和视频
  community_getNewsInfoVideoInfoList: function() {
        let that = this;
    if (that.data.maxPage != "" && api.Index.community_getNewsInfoVideoInfoList.reqData.page > that.data.maxPage) {
            return;
        }
    util.request(api.Index.community_getNewsInfoVideoInfoList.reqUrl, api.Index.community_getNewsInfoVideoInfoList.reqData, api.Index.community_getNewsInfoVideoInfoList.reqType).then(function(res) {
            let u = res.data,
                vl = that.data.list;
            if (u.length > 0) {
              if (api.Index.community_getNewsInfoVideoInfoList.reqData.page > 1) vl = vl.concat(u)
                else vl = u;
            }
            let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
            that.setData({
                maxPage: maxPage,
                list: vl,
            })
        });
    },
    //判断是否关注社区
    isAttention: function() {
        let that = this;
        api.Index.isAttention.reqData["open_id"] = app.globalData.open_id;
        api.Index.isAttention.reqData["community_id"] = that.data.id;
        util.request(api.Index.isAttention.reqUrl, api.Index.isAttention.reqData, api.Index.isAttention.reqType).then(function(res) {
            that.setData({
                isAttention: res.data, //0-没有关注，1-已关注
            })
            that.communityDetails();
        });
    },
    //获取社区详情
    communityDetails: function() {
        let that = this;
        api.Index.communityDetails.reqData["id"] = that.data.id;
        util.request(api.Index.communityDetails.reqUrl, api.Index.communityDetails.reqData, api.Index.communityDetails.reqType).then(function(res) {
            that.setData({
                communityDetails: res.data,
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
        that.isAttention();
      api.Index.community_getNewsInfoVideoInfoList.reqData.page = 1;
      api.Index.community_getNewsInfoVideoInfoList.reqData.community_id = that.data.id;
      that.community_getNewsInfoVideoInfoList();
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
      api.Index.community_getNewsInfoVideoInfoList.reqData.page += 1;
      this.community_getNewsInfoVideoInfoList();
    },
    onUnload: function() {
        // 页面关闭
    },
})