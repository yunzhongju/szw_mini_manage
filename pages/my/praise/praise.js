const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
import {
    getMyPraiseRecordAPI
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
        getMyPraiseList1_maxPage: "",
        getMyPraiseList1: [],
        getMyPraiseList2_maxPage: "",
        getMyPraiseList2: [],
        getMyPraiseList3_maxPage: "",
        getMyPraiseList3: [],
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
            that.getMyPraiseRecord(1)
        } else if (that.data.pageType == 2) {
            that.getMyPraiseRecord(2)
        } else {
            that.getMyPraiseRecord(3)
        }
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
    //浏览记录1
    getMyPraiseList1: function () {
        let that = this;
        api.My.getMyPraiseList1.reqData["open_id"] = app.globalData.open_id;
        if (that.data.getMyPraiseList1_maxPage != "" && api.My.getMyPraiseList1.reqData.page > that.data.getMyPraiseList1_maxPage) {
            return;
        }
        util.request(api.My.getMyPraiseList1.reqUrl, api.My.getMyPraiseList1.reqData, api.My.getMyPraiseList1.reqType).then(function (res) {
            let u = res.data,
                vl = that.data.getMyPraiseList1;
            if (u.length > 0) {
                if (api.My.getMyPraiseList1.reqData.page > 1) vl = vl.concat(u)
                else vl = u;
            }
            let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
            that.setData({
                getMyPraiseList1_maxPage: maxPage,
                getMyPraiseList1: vl,
            })
        });
    },

    //浏览记录2
    getMyPraiseList2: function () {
        let that = this;
        api.My.getMyPraiseList2.reqData["open_id"] = app.globalData.open_id;
        if (that.data.getMyPraiseList2_maxPage != "" && api.My.getMyPraiseList2.reqData.page > that.data.getMyPraiseList2_maxPage) {
            return;
        }
        util.request(api.My.getMyPraiseList2.reqUrl, api.My.getMyPraiseList2.reqData, api.My.getMyPraiseList2.reqType).then(function (res) {
            let u = res.data,
                vl = that.data.getMyPraiseList2;
            if (u.length > 0) {
                if (api.My.getMyPraiseList2.reqData.page > 1) vl = vl.concat(u)
                else vl = u;
            }
            let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
            that.setData({
                getMyPraiseList2_maxPage: maxPage,
                getMyPraiseList2: vl,
            })
        });
    },
    //浏览记录3
    getMyPraiseList3: function () {
        let that = this;
        api.My.getMyPraiseList3.reqData["open_id"] = app.globalData.open_id;
        if (that.data.getMyPraiseList3_maxPage != "" && api.My.getMyPraiseList3.reqData.page > that.data.getMyPraiseList3_maxPage) {
            return;
        }
        util.request(api.My.getMyPraiseList3.reqUrl, api.My.getMyPraiseList3.reqData, api.My.getMyPraiseList3.reqType).then(function (res) {
            let u = res.data,
                vl = that.data.getMyPraiseList3;
            if (u.length > 0) {
                if (api.My.getMyPraiseList3.reqData.page > 1) vl = vl.concat(u)
                else vl = u;
            }
            let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
            that.setData({
                getMyPraiseList3_maxPage: maxPage,
                getMyPraiseList3: vl,
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
            // api.My.getMyPraiseList1.reqData.page = 1;
            // that.getMyPraiseList1();
            that.getMyPraiseRecord(1)
        } else if (that.data.pageType == 2) {
            // api.My.getMyPraiseList2.reqData.page = 1;
            // that.getMyPraiseList2();
            that.getMyPraiseRecord(2)
        } else {
            // api.My.getMyPraiseList3.reqData.page = 1;
            // that.getMyPraiseList3();
            that.getMyPraiseRecord(3)
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
            // api.My.getMyPraiseList1.reqData.page += 1;
            // that.getMyPraiseList1();
            that.getMyPraiseRecord(1, page)
        } else if (that.data.pageType == 2) {
            // api.My.getMyPraiseList2.reqData.page = 1;
            // that.getMyPraiseList2();
            that.getMyPraiseRecord(2, page)
        } else {
            // api.My.getMyPraiseList3.reqData.page += 1;
            // that.getMyPraiseList3();
            that.getMyPraiseRecord(3, page)
        }

    },
    onUnload: function () {
        // 页面关闭
    },
    //获取的赞过的
    getMyPraiseRecord: function (type, pageNumber = 1) {
        let params = {
            userId: app.globalData.userInfo.id,
            type: type,
            pageSize: 10,
            pageNumber: pageNumber
        }
        getMyPraiseRecordAPI(params).then(res => {
            console.log('我攒过的', res)
            if (type == 1) {
                if (pageNumber == 1) {
                    this.setData({
                        newsList: res.data.list
                    })
                } else {
                    this.setData({
                        newsList: this.data.newsList.concat(res.data.list),
                        page: pageNumber
                    })
                }
            } else if (type == 2) {
                if (pageNumber == 1) {
                    this.setData({
                        videoList: res.data.list
                    })
                } else {
                    this.setData({
                        videoList: this.data.videoList.concat(res.data.list),
                        page: pageNumber
                    })
                }
            } else {
                if (pageNumber == 1) {
                    this.setData({
                        topicList: res.data.list
                    })
                } else {
                    this.setData({
                        topicList: this.data.topicList.concat(res.data.list),
                        page: pageNumber
                    })
                }
            }
        })
    }
})