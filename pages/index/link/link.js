const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
var app = getApp();
Page({
    data: {
        pageType: 1,
        bannerList: [],
        getContentList: [], //党建
        getContentList_maxPage: "",
        newlist: [], //获取推荐的新闻和视频
        projectsNewlist: [], //获取最新的非推荐新闻和视频
        projectsNewlist_maxPage: "",
        projectsList: [], //获取专题列表
        videolist: [],
        videolist_maxPage: "",
        communityDetails: "",
        AreaNewlist: [],
        AreaNewlist_maxPage: "",
        open_id: "",
        getNameByCode: "",
    },

    //跳转到搜索页面
    // getInput: function(e) {
    // console.log("-------------------------------------------" + e.detail)
    // wx.navigateTo({
    //     url: "/pages/common/search/search",
    // });
    // },
    /**
     * 栏目切换
     * @param event
     */
    switchBar: function(event) {
        this.setData({
            pageType: event.currentTarget.dataset.pagetype
        });
        if (this.data.pageType == 1) {
            this.getNewsInfoVideoInfoList();
        }
        if (this.data.pageType == 2) {
            this.getContentList();
        }
        if (this.data.pageType == 3) {
            this.videolist();
        }
        if (this.data.pageType == 4) {
            this.communityDetails();
        }
    },

    StartPlay: function(e) {
        this.videoContext = wx.createVideoContext('newlistLogo' + e.currentTarget.dataset.id)
        this.videoContext.play()
    },
    // 搜索内容
    searchInput: function(e) {
        let that = this;
        that.setData({
            searchValue: e.detail.value,
        })
    },
    //首页banner跳转到接口link
    TaptoUrl: function(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.url,
        });
    },
    //跳转到新闻详情页面
    TaptoNews_details: function(e) {
        commonJs.TaptoNews_details(e.currentTarget.dataset.id);
    },
    //跳转到视频详情页面
    TaptoVideo_details: function(e) {
        commonJs.TaptoVideo_details(e.currentTarget.dataset.id);
    },
    //跳转到选择地址
    TaptoSwitch_position: function(e) {
        commonJs.TaptoSwitch_position(e.currentTarget.dataset.id);
    },
    //Banner 轮播
    banner_list: function() {
        let that = this;
        util.request(api.Index.banner_list.reqUrl, api.Index.banner_list.reqData, api.Index.banner_list.reqType).then(function(res) {
            that.setData({
                bannerList: res.data,
            })
        });
    },
    //获取推荐的新闻和视频
    getHotNewsInfoVideoInfoList: function() {
        let that = this;
        util.request(api.Index.getHotNewsInfoVideoInfoList.reqUrl, api.Index.getHotNewsInfoVideoInfoList.reqData, api.Index.getHotNewsInfoVideoInfoList.reqType).then(function(res) {
            that.setData({
                newlist: res.data,
            })
        });
    },
    //获取最新的非推荐新闻和视频
    getNewsInfoVideoInfoList: function() {
        let that = this;
        if (that.data.projectsNewlist_maxPage != "" && api.Index.getNewsInfoVideoInfoList.reqData.page > that.data.projectsNewlist_maxPage) {
            return;
        }
        util.request(api.Index.getNewsInfoVideoInfoList.reqUrl, api.Index.getNewsInfoVideoInfoList.reqData, api.Index.getNewsInfoVideoInfoList.reqType).then(function(res) {
            let u = res.data,
                vl = that.data.projectsNewlist;
            if (u.length > 0) {
                if (api.Index.getNewsInfoVideoInfoList.reqData.page > 1) vl = vl.concat(u)
                else vl = u;
            }
            let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
            that.setData({
                projectsNewlist_maxPage: maxPage,
                projectsNewlist: vl,
            })
        });
    },
    //获取专题列表
    special_topic: function() {
        let that = this;
        api.Index.special_topic.reqData["open_id"] = that.data.open_id;
        util.request(api.Index.special_topic.reqUrl, api.Index.special_topic.reqData, api.Index.special_topic.reqType).then(function(res) {
            that.setData({
                projectsList: res.data.list
            })
        });
    },
    //获取专题内容列表 首页党建
    getContentList: function() {
        let that = this;
        if (that.data.getContentList_maxPage != "" && api.Index.getContentList.reqData.page > that.data.getContentList_maxPage) {
            return;
        }
        util.request(api.Index.getContentList.reqUrl, api.Index.getContentList.reqData, api.Index.getContentList.reqType).then(function(res) {
            let u = res.data,
                vl = that.data.getContentList;
            if (u.length > 0) {
                if (api.Index.getContentList.reqData.page > 1) vl = vl.concat(u)
                else vl = u;
            }
            let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
            that.setData({
                getContentList_maxPage: maxPage,
                getContentList: vl,
            })
        });
    },

    //视频列表
    videolist: function() {
        let that = this;
        if (that.data.videolist_maxPage != "" && api.Index.videolist.reqData.page > that.data.videolist_maxPage) {
            return;
        }
        util.request(api.Index.videolist.reqUrl, api.Index.videolist.reqData, api.Index.videolist.reqType).then(function(res) {
            let u = res.data,
                vl = that.data.videolist;
            if (u.length > 0) {
                if (api.Index.videolist.reqData.page > 1) vl = vl.concat(u)
                else vl = u;
            }
            let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
            that.setData({
                videolist_maxPage: maxPage,
                videolist: vl,
            })
        });
    },

    //获取社区详情
    // communityDetails: function() {
    //     let that = this;
    //     api.Index.communityDetails.reqData["id"] = that.data.communityId;
    //     util.request(api.Index.communityDetails.reqUrl, api.Index.communityDetails.reqData, api.Index.communityDetails.reqType).then(function(res) {
    //         that.setData({
    //             communityDetails: res.data,
    //         });
    //         api.Index.getNewsInfoVideoInfoList_Area.reqData.province = res.data.province;
    //         api.Index.getNewsInfoVideoInfoList_Area.reqData.city = res.data.city;
    //         api.Index.getNewsInfoVideoInfoList_Area.reqData.area = res.data.area;
    //         api.Index.getNewsInfoVideoInfoList_Area.reqData.street = res.data.street;
    //         api.Index.getNewsInfoVideoInfoList_Area.reqData.community = res.data.community;
    //         that.getNewsInfoVideoInfoList_Area()
    //     });
    // },
    //通过经纬度获取最近的社区信息
    communityDetails: function() {
        let that = this;
        if (app.globalData.choosecommunity.province != "") {
            api.Index.getByCode.reqData["province"] = app.globalData.choosecommunity.province;
            api.Index.getByCode.reqData["city"] = app.globalData.choosecommunity.city;
            api.Index.getByCode.reqData["area"] = app.globalData.choosecommunity.area;
            api.Index.getByCode.reqData["street"] = app.globalData.choosecommunity.street;
            api.Index.getByCode.reqData["community"] = app.globalData.choosecommunity.community;
            util.request(api.Index.getByCode.reqUrl, api.Index.getByCode.reqData, api.Index.getByCode.reqType).then(function(res) {
                that.setData({
                    communityDetails: res.data,
                });
                api.Index.getNameByCode.reqData["code"] = res.data.area;
                api.Index.getNameByCode.reqData["parent_code"] = res.data.city;
                that.getNameByCode();

                api.Index.getNewsInfoVideoInfoList_Area.reqData.province = res.data.province;
                api.Index.getNewsInfoVideoInfoList_Area.reqData.city = res.data.city;
                api.Index.getNewsInfoVideoInfoList_Area.reqData.area = res.data.area;
                api.Index.getNewsInfoVideoInfoList_Area.reqData.street = res.data.street;
                api.Index.getNewsInfoVideoInfoList_Area.reqData.community = res.data.community;
                that.getNewsInfoVideoInfoList_Area();
            });
        } else if (app.globalData.longitude != "" && app.globalData.latitude != "") {
            api.Index.getRecently.reqData["longitude"] = app.globalData.longitude;
            api.Index.getRecently.reqData["latitude"] = app.globalData.latitude;
            util.request(api.Index.getRecently.reqUrl, api.Index.getRecently.reqData, api.Index.getRecently.reqType).then(function(res) {
                that.setData({
                    communityDetails: res.data,
                });
                api.Index.getNameByCode.reqData["code"] = res.data.area;
                api.Index.getNameByCode.reqData["parent_code"] = res.data.city;
                that.getNameByCode();

                api.Index.getNewsInfoVideoInfoList_Area.reqData.province = res.data.province;
                api.Index.getNewsInfoVideoInfoList_Area.reqData.city = res.data.city;
                api.Index.getNewsInfoVideoInfoList_Area.reqData.area = res.data.area;
                api.Index.getNewsInfoVideoInfoList_Area.reqData.street = res.data.street;
                api.Index.getNewsInfoVideoInfoList_Area.reqData.community = res.data.community;
                that.getNewsInfoVideoInfoList_Area()
            });
        } else {
            util.request(api.Index.getDefaultCommunity.reqUrl, api.Index.getDefaultCommunity.reqData, api.Index.getDefaultCommunity.reqType).then(function(res) {
                that.setData({
                    communityDetails: res.data,
                });
                api.Index.getNameByCode.reqData["code"] = res.data.area;
                api.Index.getNameByCode.reqData["parent_code"] = res.data.city;
                that.getNameByCode();

                api.Index.getNewsInfoVideoInfoList_Area.reqData.province = res.data.province;
                api.Index.getNewsInfoVideoInfoList_Area.reqData.city = res.data.city;
                api.Index.getNewsInfoVideoInfoList_Area.reqData.area = res.data.area;
                api.Index.getNewsInfoVideoInfoList_Area.reqData.street = res.data.street;
                api.Index.getNewsInfoVideoInfoList_Area.reqData.community = res.data.community;
                that.getNewsInfoVideoInfoList_Area()
            });
        }
    },
    //通过编码获取名称
    getNameByCode: function() {
        let that = this;
        util.request(api.Index.getNameByCode.reqUrl, api.Index.getNameByCode.reqData, api.Index.getNameByCode.reqType).then(function(res) {
            that.setData({
                getNameByCode: res.data,
            });
        });
    },

    //获取最新的非推荐新闻和视频
    getNewsInfoVideoInfoList_Area: function() {
        let that = this;
        if (that.data.AreaNewlist_maxPage != "" && api.Index.getNewsInfoVideoInfoList_Area.reqData.page > that.data.AreaNewlist_maxPage) {
            return;
        }
        util.request(api.Index.getNewsInfoVideoInfoList_Area.reqUrl, api.Index.getNewsInfoVideoInfoList_Area.reqData, api.Index.getNewsInfoVideoInfoList_Area.reqType).then(function(res) {
            let u = res.data,
                vl = that.data.AreaNewlist;
            if (u.length > 0) {
                if (api.Index.getNewsInfoVideoInfoList_Area.reqData.page > 1) vl = vl.concat(u)
                else vl = u;
            }
            let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
            that.setData({
                AreaNewlist_maxPage: maxPage,
                AreaNewlist: vl,
            })
        });
    },
    onLoad: function(options) {},
    onReady: function() {},


    onShow: function() {
        this.setData({
            open_id: app.globalData.open_id,
        })
        this.banner_list();
        this.getHotNewsInfoVideoInfoList();
        this.special_topic();
        api.Index.getNewsInfoVideoInfoList.reqData.page = 1;
        api.Index.getContentList.reqData.page = 1;
        api.Index.videolist.reqData.page = 1;
        api.Index.getNewsInfoVideoInfoList_Area.reqData.page = 1;
        if (this.data.pageType == 1) {
            this.getNewsInfoVideoInfoList();
        }
        if (this.data.pageType == 2) {
            this.getContentList();
        }
        if (this.data.pageType == 3) {
            this.videolist();
        }
        app.getLocationCallback = res => {
            this.communityDetails();
        };
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
        if (this.data.pageType == 1) {
            api.Index.getNewsInfoVideoInfoList.reqData.page += 1;
            this.getNewsInfoVideoInfoList();
        }
        if (this.data.pageType == 2) {
            api.Index.getContentList.reqData.page += 1;
            this.getContentList();
        }
        if (this.data.pageType == 3) {
            api.Index.videolist.reqData.page += 1;
            this.videolist();
        }
        if (this.data.pageType == 4) {
            api.Index.getNewsInfoVideoInfoList_Area.reqData.page += 1;
            this.getNewsInfoVideoInfoList_Area();
        }
    },
    onUnload: function() {
        // 页面关闭
    },
})