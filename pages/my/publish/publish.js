const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
import common from '../../../config/newsAPI/common'
var app = getApp();
Page({
    data: {
        //new
        voiceList: [],
        commentList: [],
        page:1,


        wxUserInfo: "",
        pageType: 1,
        getMyVoice_maxPage: "",
        getMyVoice: [],
        getMyComments_maxPage: "",
        getMyComments: [],
    },


    //跳转到市民发声页面
    TaptoPeople_voice: function (e) {
        commonJs.TaptoPeople_voice(e.currentTarget.dataset.id);
    },

    //跳转到话题详情页面
    TaptoTopic_details: function (e) {
        commonJs.TaptoTopic_details(e.currentTarget.dataset.id);
    },
    //跳转到新闻详情页面
    TaptoNews_details: function (e) {
        commonJs.TaptoNews_details(e.currentTarget.dataset.id);
    },
    //跳转到视频详情页面
    TaptoVideo_details: function (e) {
        commonJs.TaptoVideo_details(e.currentTarget.dataset.id);
    },
    /**
     * 栏目切换
     * @param event
     */
    switchBar: function (event) {
        let that = this;
        that.setData({
            pageType: event.currentTarget.dataset.pagetype
        });
        if (that.data.pageType == 1) {
            common.getMyPulish(that.data.pageType).then(res => {
                that.setData({
                    voiceList: res.list
                })
            })
        } else {
            common.getMyPulish(that.data.pageType).then(res => {
                that.setData({
                    commentList: res.list
                })
            })
        }
    },
    //获取我发部的话题列表
    getMyVoice: function () {
        let that = this;
        api.My.getMyVoice.reqData["open_id"] = app.globalData.open_id;
        if (that.data.getMyVoice_maxPage != "" && api.My.getMyVoice.reqData.page > that.data.getMyVoice_maxPage) {
            return;
        }
        util.request(api.My.getMyVoice.reqUrl, api.My.getMyVoice.reqData, api.My.getMyVoice.reqType).then(function (res) {
            let u = res.data,
                vl = that.data.getMyVoice;
            if (u.length > 0) {
                if (api.My.getMyVoice.reqData.page > 1) vl = vl.concat(u)
                else vl = u;
            }
            let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
            that.setData({
                getMyVoice_maxPage: maxPage,
                getMyVoice: vl,
            })
        });
    },

    //获取回复我的列表
    getMyComments: function () {
        let that = this;
        api.My.getMyComments.reqData["open_id"] = app.globalData.open_id;
        if (that.data.getMyComments_maxPage != "" && api.My.getMyComments.reqData.page > that.data.getMyComments_maxPage) {
            return;
        }
        util.request(api.My.getMyComments.reqUrl, api.My.getMyComments.reqData, api.My.getMyComments.reqType).then(function (res) {
            let u = res.data,
                vl = that.data.getMyComments;
            if (u.length > 0) {
                if (api.My.getMyComments.reqData.page > 1) vl = vl.concat(u)
                else vl = u;
            }
            let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
            that.setData({
                getMyComments_maxPage: maxPage,
                getMyComments: vl,
            })
        });
    },
    onLoad: function (options) {
        let that = this;
        that.setData({
            type: options.type,
            wxUserInfo: app.globalData.userInfo
        })
    },
    onReady: function () {

    },


    onShow: function () {
        let that = this;
        if (that.data.pageType == 1) {
            // api.My.getMyVoice.reqData.page = 1;
            // that.getMyVoice();
            common.getMyPulish(1).then(res => {
                that.setData({
                    voiceList: res.list
                })
            })
        } else {
            // api.My.getMyComments.reqData.page = 1;
            // that.getMyComments();
            common.getMyPulish(2).then(res => {
                that.setData({
                    commentList: res.list
                })
            })
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
        util.alert('正在刷新数据...', 'loading');
        wx.stopPullDownRefresh(); //停止刷新操作
    },
    onReachBottom: function () {
        let that = this;
        let page = that.data.page
        if (that.data.pageType == 1) {
            page+=1
            if(page>1){
                common.getMyPulish(1,page).then(res=>{
                    voiceList:that.data.voiceList.concat(res.list),
                    page
                })
            }
            // api.My.getMyVoice.reqData.page += 1;
            // that.getMyVoice();

        } else {
            // api.My.getMyComments.reqData.page += 1;
            // that.getMyComments();
            page+=1
            if(page>1){
                common.getMyPulish(2,page).then(res=>{
                    commentList:that.data.voiceList.concat(res.list),
                    page
                })
            }
        }

    },
    onUnload: function () {
        // 页面关闭
    },
})