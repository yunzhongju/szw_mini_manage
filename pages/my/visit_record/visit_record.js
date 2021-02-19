const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
import {
    getMybrowseRecordAPI
} from '../../../config/newsAPI/my_api'
var app = getApp();
Page({
    data: {
        newsList: [],
        videoList: [],
        topicList: [],
        page: 1,


        is_video: 1,
        wxUserInfo: "",
        pageType: 1,
        getMyList1_maxPage: "",
        getMyList1: [],
        getMyList2_maxPage: "",
        getMyList2: [],
        getMyList3_maxPage: "",
        getMyList3: [],
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
            // that.getMyList1();
            that.getMybrowseRecord(1, 1, res => {
                console.log('我浏览过的', res)
                that.setData({
                    newsList: res.list
                })
            })
        } else if (that.data.pageType == 2) {
            // that.getMyList2();
            that.getMybrowseRecord(2, 1, res => {
                console.log('我浏览过的', res)
                that.setData({
                    videoList: res.list
                })
            })
        } else {
            // that.getMyList3();
            that.getMybrowseRecord(3, 1, res => {
                console.log('我浏览过的', res)
                that.setData({
                    topicList: res.list
                })
            })
        }
    },
    //浏览记录1
    getMyList1: function () {
        let that = this;
        api.My.getMyList1.reqData["open_id"] = app.globalData.open_id;
        if (that.data.getMyList1_maxPage != "" && api.My.getMyList1.reqData.page > that.data.getMyList1_maxPage) {
            return;
        }
        util.request(api.My.getMyList1.reqUrl, api.My.getMyList1.reqData, api.My.getMyList1.reqType).then(function (res) {
            let u = res.data,
                vl = that.data.getMyList1;
            if (u.length > 0) {
                if (api.My.getMyList1.reqData.page > 1) vl = vl.concat(u)
                else vl = u;
            }
            let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
            that.setData({
                getMyList1_maxPage: maxPage,
                getMyList1: vl,
            })
        });
    },

    //浏览记录2
    getMyList2: function () {
        let that = this;
        api.My.getMyList2.reqData["open_id"] = app.globalData.open_id;
        if (that.data.getMyList2_maxPage != "" && api.My.getMyList2.reqData.page > that.data.getMyList2_maxPage) {
            return;
        }
        util.request(api.My.getMyList2.reqUrl, api.My.getMyList2.reqData, api.My.getMyList2.reqType).then(function (res) {
            let u = res.data,
                vl = that.data.getMyList2;
            if (u.length > 0) {
                if (api.My.getMyList2.reqData.page > 1) vl = vl.concat(u)
                else vl = u;
            }
            let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
            that.setData({
                getMyList2_maxPage: maxPage,
                getMyList2: vl,
            })
        });
    },
    //浏览记录3
    getMyList3: function () {
        let that = this;
        api.My.getMyList3.reqData["open_id"] = app.globalData.open_id;
        if (that.data.getMyList3_maxPage != "" && api.My.getMyList3.reqData.page > that.data.getMyList3_maxPage) {
            return;
        }
        util.request(api.My.getMyList3.reqUrl, api.My.getMyList3.reqData, api.My.getMyList3.reqType).then(function (res) {
            let u = res.data,
                vl = that.data.getMyList3;
            if (u.length > 0) {
                if (api.My.getMyList3.reqData.page > 1) vl = vl.concat(u)
                else vl = u;
            }
            let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
            that.setData({
                getMyList3_maxPage: maxPage,
                getMyList3: vl,
            })
        });
    },
    onLoad: function (options) {
        let that = this;
        that.setData({
            is_video: app.globalData.is_video,
            wxUserInfo: app.globalData.userInfo
        })
        if (that.data.pageType == 1) {
            // api.My.getMyList1.reqData.page = 1;
            // that.getMyList1();
            that.getMybrowseRecord(1, 1, res => {
                console.log('我浏览过的', res)
                that.setData({
                    newsList: res.list
                })
            })
        } else if (that.data.pageType == 2) {
            // api.My.getMyList2.reqData.page = 1;
            // that.getMyList2();
            that.getMybrowseRecord(2, 1, res => {
                console.log('我浏览过的', res)
                that.setData({
                    videoList: res.list
                })
            })
        } else {
            // api.My.getMyList3.reqData.page = 1;
            // that.getMyList3();
            that.getMybrowseRecord(2, 1, res => {
                console.log('我浏览过的', res)
                that.setData({
                    topicList: res.list
                })
            })
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
        let page = that.data.page += 1
        if (that.data.pageType == 1) {
            // api.My.getMyList1.reqData.page += 1;
            // that.getMyList1();
            that.getMybrowseRecord(1, page, res => {
                console.log('我浏览过的', res)
                if (page > 1) {
                    that.setData({
                        newsList: that.data.newsList.concat(res.list),
                        page
                    })
                }
            })
        } else if (that.data.pageType == 2) {
            // api.My.getMyList2.reqData.page = 1;
            // that.getMyList2();
            that.getMybrowseRecord(2, page, res => {
                console.log('我浏览过的', res)
                if (page > 1) {
                    that.setData({
                        videoList: that.data.newsList.concat(res.list),
                        page
                    })
                }
            })
        } else {
            that.getMybrowseRecord(31, page, res => {
                console.log('我浏览过的', res)
                if (page > 1) {
                    that.setData({
                        topicList: that.data.newsList.concat(res.list),
                        page
                    })
                }
            })
            // .My.getMyList3.reqData.page += 1;
            // that.getMyList3();
        }

    },
    onUnload: function () {
        // 页面关闭
    },
    //获取浏览记录
    getMybrowseRecord: function (...args) {
        let params = {
            userId: app.globalData.userInfo.id,
            type: args[0],
            pageSize: '10',
            pageNumber: args[1]
        }
        getMybrowseRecordAPI(params).then(res => {
            if (res.status == 1) {
                args[2](res.data)
            }
        })
    }
})