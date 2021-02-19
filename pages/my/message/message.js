const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
import {
    getMyMessageAPI
} from '../../../config/newsAPI/my_api'
var app = getApp();
Page({
    data: {
        pageType: 1,
        page: 1,
        wxUserInfo:'',
        Praise_maxPage: "",
        getPraiseMeList: [],
        Reply_maxPage: "",
        getReplyMeList: [],
    },
    /**
     * 栏目切换
     * @param event
     */
    switchBar: function (event) {
        let that = this;
        that.setData({
            pageType: event.currentTarget.dataset.pagetype,
            page: 1
        });
        if (that.data.pageType == 1) {
            that.getMyMessage(1, 1);
        } else {
            that.getMyMessage(2, 1);
        }
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
    //获取赞过我的列表
    getPraiseMeList: function () {
        let that = this;
        api.My.getPraiseMeList.reqData["open_id"] = app.globalData.open_id;
        if (that.data.Praise_maxPage != "" && api.My.getPraiseMeList.reqData.page > that.data.Praise_maxPage) {
            return;
        }
        util.request(api.My.getPraiseMeList.reqUrl, api.My.getPraiseMeList.reqData, api.My.getPraiseMeList.reqType)
            .then(function (res) {
                let u = res.data,
                    vl = that.data.getPraiseMeList;
                if (u.length > 0) {
                    if (api.My.getPraiseMeList.reqData.page > 1) vl = vl.concat(u)
                    else vl = u;
                }
                let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
                that.setData({
                    Praise_maxPage: maxPage,
                    getPraiseMeList: vl,
                })
            });
    },

    //获取回复我的列表
    getReplyMeList: function () {
        let that = this;
        api.My.getReplyMeList.reqData["open_id"] = app.globalData.open_id;
        if (that.data.Reply_maxPage != "" && api.My.getReplyMeList.reqData.page > that.data.Reply_maxPage) {
            return;
        }
        util.request(api.My.getReplyMeList.reqUrl, api.My.getReplyMeList.reqData, api.My.getReplyMeList.reqType).then(function (res) {
            let u = res.data,
                vl = that.data.getReplyMeList;
            if (u.length > 0) {
                if (api.My.getReplyMeList.reqData.page > 1) vl = vl.concat(u)
                else vl = u;
            }
            let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
            that.setData({
                Reply_maxPage: maxPage,
                getReplyMeList: vl,
            })
        });
    },
    onLoad: function (options) {
        let that = this;
        that.setData({
            wxUserInfo:app.globalData.userInfo
        })
        if (that.data.pageType == 1) {
            api.My.getPraiseMeList.reqData.page = 1;
            that.getMyMessage(1, 1);
        } else {
            api.My.getReplyMeList.reqData.page = 1;
            that.getMyMessage(2, 1);
        }
    },
    onReady: function () {

    },


    onShow: function () {

    },
    onHide: function () {
        // 页面隐藏
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        let that = this;
        that.onLoad();
        util.alert('正在刷新数据...', 'loading');
        wx.stopPullDownRefresh(); //停止刷新操作
    },
    onReachBottom: function () {
        let that = this;
        let page = that.data.page + 1
        if (that.data.pageType == 1) {
            api.My.getPraiseMeList.reqData.page += 1;
            that.getMyMessage(1, page);
        } else {
            api.My.getReplyMeList.reqData.page += 1;
            that.getMyMessage(2, page);
        }
        that.setData({
            page
        })
    },
    onUnload: function () {
        // 页面关闭
    },

    //获取赞过我的列表(new)
    getMyMessage: function (type, pageNumber) {
        let _this = this
        let params = {
            userId: app.globalData.userInfo.id,
            type: type,
            pageSize: '10',
            pageNumber: pageNumber
        }
        getMyMessageAPI(params).then(res => {
            console.log('new我的消息', res)
            if (pageNumber == 1) {
                _this.setData({
                    getPraiseMeList: _this.data.pageType == 1 ? res.data.list : [],
                    getReplyMeList: _this.data.pageType == 2 ? res.data.list : [],
                })
            } else {
                _this.setData({
                    getPraiseMeList: _this.data.pageType == 1 ? [..._this.data.getPraiseMeList, ...res.data.list] : _this.data.getPraiseMeList,
                    getReplyMeList: _this.data.pageType == 2 ? [..._this.data.getReplyMeList, ...res.data.list] : _this.data.getReplyMeList,
                })
            }

        })
    }
})