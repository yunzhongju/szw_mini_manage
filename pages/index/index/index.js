const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const bmap = require('../../../utils/bmap-wx.min.js');
const api = require('../../../config/api.js');
import common from '../../../config/newsAPI/common'
var app = getApp();
Page({
    data: {
        noRecommentNews:[],
        title:'',
        downPage:1,
        activeList:[],
        activePage:1,
        page: 1,
        arcilePage:1,
        arcileId:'',
        videopage:1,
        is_video: 1,
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
        provinceName: "",
        cityName: "",
        areaName: "",
        indicatorDots: true, //视频
        controls: true,
        playBtn: false,
        duration: 1000,
        cache: false,
        indexCurrent: null,
        weatherData: '',
        getListByCode: [],
        areaCode: "",
        dangjianIndex: 1,
        pageNo: 1,
        columnList: [], //栏目列表
        articleList: [], //文章列表
        allowPull: false,
        animationTobot: '', // 动画
        articleStatus: 0 //0 未进入文章详情  1 进入文章详情   当为1时候  不调用onShow方法
    },

    //跳转到搜索页面
    // getInput: function(e) {
    // wx.navigateTo({
    //     url: "/pages/common/search/search",
    // });
    // },
    /**
     * 栏目切换
     * @param event
     */

    //跳转到机器人对话
    pageToTobot() {
        wx.navigateTo({
            url: '/pages/index/dialogue_robot/dialogue_robot'
        })
    },
    handleToHelper(){
        wx.navigateTo({
          url: '../helper/helper?type=0',
        })
    },
    //栏目 --> 文章列表
    ColPageToArticleList(e) {

        commonJs.ColPageToArticleList(e.currentTarget.dataset.channelid, e.currentTarget.dataset.name, e.currentTarget.dataset.url)
    },

    //跳转到文章详情
    pageToArticleDetail(e) {
        this.setData({
            articleStatus: 1
        });
        let articleId = e.currentTarget.dataset.articleid
        commonJs.pageToArticleDetail(articleId)
    },

    tabBar: function (e) {
        this.setData({
            articleStatus: 0
        })
        let index = e.currentTarget.dataset.index
        if (this.data.dangjianIndex != index) {
            this.setData({
                dangjianIndex: index,
                pageNo: 1
            })

            if (this.data.dangjianIndex == 1) { //栏目--智慧党建
                this.column_list()
            } else { //文章列表
                let id = this.data.dangjianIndex == 2 ? '49' : this.data.dangjianIndex == 3 ? '50' : '51'
                this.setData({
                    arcileId:id,
                    arcilePage:1
                })
                this.article_list(id)
            }
        }
    },

    //获取栏目列表
    column_list() {
        common.getChannelList(48).then(res => {
            // console.log('栏目列表', res)
            this.setData({
                columnList: res.list
            })
        })
        // util.requestAll(api.Index.column_list.reqUrl, api.Index.column_list.reqData, api.Index.column_list.reqType).then(res => {
        //     if (res.status == 1) {
        //         res.data.forEach(item => {
        //             item.name = item.name.replace(/<p>/g, '').replace(/<\/p>/g, '')
        //             item.description = item.description.replace(/<p>/g, '').replace(/<\/p>/g, '')
        //         })
        //         this.setData({
        //             columnList: res.data
        //         })
        //     }
        // })
    },

    //获取文章列表
    article_list(id, page = '1') {
        common.getNewsList('', id, 0, '', page, res => {
            // console.log('新闻列表', res)
            if(res.list.length===0){
                wx.showToast({
                  title: '暂无更多数据',
                  icon:'none'
                })
                this.setData({
                    arcilePage:1
                })
            }
            if(page<=1){
                this.setData({
                    articleList: res.list
                })
            }else{
                this.setData({
                    articleList: [...this.data.articleList,...res.list]
                })
            }  
        })
        // api.Index.article_list.reqData.channelId = id
        // api.Index.article_list.reqData.pageNo = this.data.pageNo
        // api.Index.article_list.reqData.openid = app.globalData.open_id
        // util.requestAll(api.Index.article_list.reqUrl, api.Index.article_list.reqData, api.Index.article_list.reqType).then(res => {
        //     if (res.status == 1 && type == 'one') {
        //         this.setData({
        //             articleList: res.data.list,
        //             allowPull: !res.data.lastPage
        //         })

        //     } else if (res.status == 1 && type == 'more') {
        //         this.setData({
        //             articleList: [...this.data.articleList, ...res.data.list],
        //             allowPull: !res.data.lastPage
        //         })
        //     }
        // })
    },

    switchBar: function (event) {
        this.setData({
            articleStatus: 0,
            downPage:1
        })
        if (this.data.indexCurrent) {
            var videoContextPrev = wx.createVideoContext('myVideo' + this.data.indexCurrent);
            videoContextPrev.pause();
        }
        this.setData({
            pageType: event.currentTarget.dataset.pagetype,
            indexCurrent: null
        });
        if (this.data.pageType == 1) {
            this.banner_list();
            // this.special_topic();
            this.getHotNewsInfoVideoInfoList();
            // this.getNewsInfoVideoInfoList();
        }
        if (this.data.pageType == 2) {
            // this.getContentList();
            this.setData({
                pageNo: 1
            })
            if (this.data.dangjianIndex == 1) { //栏目--智慧党建
                this.column_list()
            } else { //文章列表
                let id = this.data.dangjianIndex == 2 ? '48' : this.data.dangjianIndex == 49 ? '50' : '51'
                this.article_list(id)
            }
        }
        if (this.data.pageType == 3) {
            this.videolist();
        }
        if (this.data.pageType == 4) {
            // this.getHotNewsInfoVideoInfoList();
            common.getNewsList('','',0,this.data.areaCode,1,res=>{
                // console.log('区域新闻',res)
                this.setData({
                    AreaNewlist:res.list
                })
            })
        }
        if(this.data.pageType==5){
            common.getWxappActivities(1,res=>{
                // console.log('活动列表',res)
                this.setData({
                    activeList:res.list
                })
            })
        }
    },
    getWxappActivities:function(){
        common.getWxappActivities(1,res=>{
            // console.log('活动列表',res)
            this.setData({
                activeList:res.list
            })
        })
    },
    videoPlay: function (e) {
        var curIdx = e.currentTarget.dataset.index;
        // 没有播放时播放视频
        if (!this.data.indexCurrent) {
            this.setData({
                indexCurrent: curIdx
            })
            var videoContext = wx.createVideoContext('myVideo' + curIdx) //这里对应的视频id
            videoContext.play()
        } else { // 有播放时先将prev暂停，再播放当前点击的current
            var videoContextPrev = wx.createVideoContext('myVideo' + this.data.indexCurrent)
            if (this.data.indexCurrent != curIdx) {
                videoContextPrev.pause()
            }
            this.setData({
                indexCurrent: curIdx
            })
            var videoContextCurrent = wx.createVideoContext('myVideo' + curIdx)
            videoContextCurrent.play()
        }
    },
    // 搜索内容
    searchInput: function (e) {
        let that = this;
        that.setData({
            searchValue: e.detail.value,
        })
    },
    //首页banner跳转到接口link
    TaptoUrl: function (e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.url,
        });
    },
    //跳转到社区详情
    TaptoCommunity_details: function (e) {
        this.setData({
            articleStatus: 1
        })
        commonJs.TaptoCommunity_details(e.currentTarget.dataset.id);
    },
    //跳转到新闻详情页面
    TaptoNews_details: function (e) {
        this.setData({
            articleStatus: 1
        })
        commonJs.TaptoNews_details(e.currentTarget.dataset.id);
    },
    //跳转到活动详情页面
    TaptoActive_details: function (e) {
        this.setData({
            articleStatus: 1
        })
        commonJs.TaptoActive_details(e.currentTarget.dataset.id);
    },
    //跳转到视频详情页面
    TaptoVideo_details: function (e) {
        this.setData({
            articleStatus: 1
        })
        commonJs.TaptoVideo_details(e.currentTarget.dataset.id);
    },
    //跳转到专题详情页面
    TaptoProjects_details: function (e) {
        this.setData({
            articleStatus: 1
        })
        commonJs.TaptoProjects_details(e.currentTarget.dataset.id);
    },
    //跳转到全部专题页面
    TaptoProjects: function (e) {
        this.setData({
            articleStatus: 0
        })
        commonJs.TaptoProjects();
    },
    //跳转到选择地址
    TaptoSwitch_position: function (e) {
        this.setData({
            articleStatus: 0
        })
        commonJs.TaptoSwitch_position("index");
    },
    //跳转到全部社区
    TaptoAll_shequ: function (e) {
        this.setData({
            articleStatus: 0
        })
        commonJs.TaptoAll_shequ(this.data.areaCode);
    },
    //Banner 轮播
    banner_list: function () {
        let that = this;
        common.getBannerList(res => {
            // console.log('banner list', res)
            that.setData({
                bannerList: res
            })
        })
        // util.request(api.Index.banner_list.reqUrl, api.Index.banner_list.reqData, api.Index.banner_list.reqType).then(function (res) {
        //     // console.log(res)
        //     that.setData({
        //         bannerList: res.data,
        //     })
        // });
    },
    //获取推荐的新闻和视频
    getHotNewsInfoVideoInfoList: function () {
        let that = this;
        common.getNewsList('', '', 1, '', that.data.page, res => {
            // console.log('新闻列表222', res)
            if (that.data.page > 1) {
                that.setData({
                    newlist: that.data.newlist.concat(res.list)
                })
            } else {
                that.setData({
                    newlist: res.list.slice(0,2)
                })
            }
        })
        common.getNewsList('','',0,'',1,res=>{
            // console.log('非推荐news',res)
            that.setData({
                noRecommentNews:res.list
            })
        })
        // util.request(api.Index.getHotNewsInfoVideoInfoList.reqUrl, api.Index.getHotNewsInfoVideoInfoList.reqData, api.Index.getHotNewsInfoVideoInfoList.reqType).then(function (res) {
        //     that.setData({
        //         newlist: res.data,
        //     })
        // });
    },
    //获取最新的非推荐新闻和视频
    getNewsInfoVideoInfoList: function () {

        let that = this;
        if (that.data.projectsNewlist_maxPage != "" && api.Index.getNewsInfoVideoInfoList.reqData.page > that.data.projectsNewlist_maxPage) {
            return;
        }
        util.request(api.Index.getNewsInfoVideoInfoList.reqUrl, api.Index.getNewsInfoVideoInfoList.reqData, api.Index.getNewsInfoVideoInfoList.reqType).then(function (res) {
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
    special_topic: function () {
        let that = this;
        api.Index.special_topic.reqData["open_id"] = app.globalData.open_id;
        util.request(api.Index.special_topic.reqUrl, api.Index.special_topic.reqData, api.Index.special_topic.reqType).then(function (res) {
            that.setData({
                projectsList: res.data.list
            })
        });
    },
    //获取专题内容列表 首页党建
    getContentList: function () {
        let that = this;
        if (that.data.getContentList_maxPage != "" && api.Index.getContentList.reqData.page > that.data.getContentList_maxPage) {
            return;
        }
        util.request(api.Index.getContentList.reqUrl, api.Index.getContentList.reqData, api.Index.getContentList.reqType).then(function (res) {
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
    videolist: function () {
        let that = this;
        common.getVideoList('', 1, res => {
            // console.log('视频列表', res)
            that.setData({
                videolist: res.list
            })
        })
        // if (that.data.videolist_maxPage != "" && api.Index.videolist.reqData.page > that.data.videolist_maxPage) {
        //     return;
        // }
        // util.request(api.Index.videolist.reqUrl, api.Index.videolist.reqData, api.Index.videolist.reqType).then(function (res) {
        //     let u = res.data,
        //         vl = that.data.videolist;
        //     if (u.length > 0) {
        //         if (api.Index.videolist.reqData.page > 1) vl = vl.concat(u)
        //         else vl = u;
        //     }
        //     let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
        //     that.setData({
        //         videolist_maxPage: maxPage,
        //         videolist: vl,
        //     })
        // });
    },

    //通过经纬度获取最近的社区信息
    // communityDetails: function() {
    //     let that = this;
    //     if (app.globalData.choosecommunity.province != "") {
    //         api.Index.getByCode.reqData["province"] = app.globalData.choosecommunity.province;
    //         api.Index.getByCode.reqData["city"] = app.globalData.choosecommunity.city;
    //         api.Index.getByCode.reqData["area"] = app.globalData.choosecommunity.area;
    //         api.Index.getByCode.reqData["street"] = app.globalData.choosecommunity.street;
    //         api.Index.getByCode.reqData["community"] = app.globalData.choosecommunity.community;
    //         util.request(api.Index.getByCode.reqUrl, api.Index.getByCode.reqData, api.Index.getByCode.reqType).then(function(res) {
    //             that.setData({
    //                 communityDetails: res.data,
    //             });
    //             if (res.data != null && res.data != "") {
    //                 // 获取用户所在区域
    //                 that.getArea(res.data.longitude, res.data.latitude);
    //                 // 获取用户所在区域天气
    //                 that.getWeather(res.data.longitude, res.data.latitude);

    //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.province = res.data.province;
    //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.city = res.data.city;
    //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.area = res.data.area;
    //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.street = res.data.street;
    //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.community = res.data.community;
    //             } else {
    //                 // 获取用户所在区域
    //                 that.getArea(app.globalData.longitude, app.globalData.latitude);
    //                 // 获取用户所在区域天气
    //                 that.getWeather(app.globalData.longitude, app.globalData.latitude);

    //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.province = "";
    //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.city = "";
    //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.area = "";
    //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.street = "";
    //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.community = "";
    //             }
    //             that.getNewsInfoVideoInfoList_Area();
    //         });
    //     } else if (app.globalData.longitude != "" && app.globalData.latitude != "") {
    //         api.Index.getRecently.reqData["longitude"] = app.globalData.longitude;
    //         api.Index.getRecently.reqData["latitude"] = app.globalData.latitude;

    //         util.request(api.Index.getRecently.reqUrl, api.Index.getRecently.reqData, api.Index.getRecently.reqType).then(function(res) {
    //             that.setData({
    //                 communityDetails: res.data,
    //             });
    //             if (res.data != null && res.data != "") {
    //                 // 获取用户所在区域
    //                 that.getArea(res.data.longitude, res.data.latitude);
    //                 // 获取用户所在区域天气
    //                 that.getWeather(res.data.longitude, res.data.latitude);
    //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.province = res.data.province;
    //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.city = res.data.city;
    //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.area = res.data.area;
    //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.street = res.data.street;
    //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.community = res.data.community;
    //             } else {
    //                 // 获取用户所在区域
    //                 that.getArea(app.globalData.longitude, app.globalData.latitude);
    //                 // 获取用户所在区域天气
    //                 that.getWeather(app.globalData.longitude, app.globalData.latitude);

    //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.province = "";
    //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.city = "";
    //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.area = "";
    //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.street = "";
    //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.community = "";
    //             }
    //             that.getNewsInfoVideoInfoList_Area()
    //         });
    //     } else {
    //         util.request(api.Index.getDefaultCommunity.reqUrl, api.Index.getDefaultCommunity.reqData, api.Index.getDefaultCommunity.reqType).then(function(res) {
    //             that.setData({
    //                 communityDetails: res.data,
    //             });

    //             // 获取用户所在区域
    //             that.getArea(res.data.longitude, res.data.latitude);
    //             // 获取用户所在区域天气
    //             that.getWeather(res.data.longitude, res.data.latitude);

    //             api.Index.getNewsInfoVideoInfoList_Area.reqData.province = res.data.province;
    //             api.Index.getNewsInfoVideoInfoList_Area.reqData.city = res.data.city;
    //             api.Index.getNewsInfoVideoInfoList_Area.reqData.area = res.data.area;
    //             api.Index.getNewsInfoVideoInfoList_Area.reqData.street = res.data.street;
    //             api.Index.getNewsInfoVideoInfoList_Area.reqData.community = res.data.community;
    //             that.getNewsInfoVideoInfoList_Area()
    //         });
    //     }
    // },

    //通过经纬度获取最近的社区信息
    communityDetails: function () {
        // console.log("-------------------进入communityDetails")
        let that = this;
        if (app.globalData.longitude != "" && app.globalData.latitude != "") {
            // 获取用户所在区域
            that.getArea(app.globalData.longitude, app.globalData.latitude);
            // 获取用户所在区域天气
            that.getWeather(app.globalData.longitude, app.globalData.latitude);
        } else {
            // 获取用户所在区域
            that.getArea(app.globalData.longitude1, app.globalData.latitude1);
            // 获取用户所在区域天气
            that.getWeather(app.globalData.longitude1, app.globalData.latitude1);
        }
    },
    //通过省市区街道编码获取社区信息列表
    getListByCode: function () {
        let that = this;
        if (app.globalData.longitude != "" && app.globalData.latitude != "") {
            api.Index.getListByCode.reqData['longitude'] = app.globalData.longitude;
            api.Index.getListByCode.reqData['latitude'] = app.globalData.latitude;
        } else {
            api.Index.getListByCode.reqData['longitude'] = app.globalData.longitude1;
            api.Index.getListByCode.reqData['latitude'] = app.globalData.latitude1;
        }
        api.Index.getListByCode.reqData['area'] = that.data.areaCode;
        api.Index.getListByCode.reqData['open_id'] = app.globalData.open_id;
        api.Index.getListByCode.reqData['page'] = 1;
        api.Index.getListByCode.reqData['limit'] = 3;
        util.request(api.Index.getListByCode.reqUrl, api.Index.getListByCode.reqData, api.Index.getListByCode.reqType).then(function (res) {
            that.setData({
                getListByCode: res.data,
            });
        });
    },
    // 获取用户所在区域
    getArea: function (longitude, latitude) {
        // console.log(1111111111111111)
        let that = this;
        var BMap = new bmap.BMapWX({
            ak: api.baidumapak
        });
        var fail = function (data) {
            // console.log(22222222222,data)
        };
        var success = function (data) {
            if (that.data.communityDetails == null || that.data.communityDetails == "") {
                that.setData({
                    communityDetails: {
                        title: data.originalData.result.formatted_address
                    }
                });
            }
            console.log('自动获取区域',data)
            that.setData({
                provinceName: data.originalData.result.addressComponent.province,
                cityName: data.originalData.result.addressComponent.city,
                areaName: data.originalData.result.addressComponent.district,
                title:data.originalData.result.formatted_address
            });
            that.cityFun1();
        }
        BMap.regeocoding({
            fail: fail,
            location: latitude + "," + longitude,
            success: success
        });
    },
    getWeather: function (longitude, latitude) {
        let that = this;
        var BMap = new bmap.BMapWX({
            ak: api.baidumapak
        });
        var fail = function (data) {};
        var success = function (data) {
            var weatherData = data.currentWeather[0];
            weatherData.wendu = weatherData.date.split("：")[1].split(")")[0];
            weatherData.des = data.originalData.results[0].index[0]?data.originalData.results[0].index[0].des:'';
            that.setData({
                weatherData: weatherData
            });
        }
        BMap.weather({
            fail: fail,
            location: longitude + "," + latitude,
            success: success
        });
    },
    // 省
    cityFun1: function () {
        let that = this;
        common.getAreas().then(res => {
            // console.log('行政区划1', res)
            if (res.length > 0) {
                res.forEach((obj) => {
                    if (that.data.provinceName == obj.orgname) {
                        that.cityFun2(obj.orgid)
                        return false;
                    }
                });
            }
        })
        // util.requestAll(api.Index.position.reqUrl + "1.json", api.Index.position.reqData, api.Index.position.reqType).then(function (res) {
        //     if (res.length > 0) {
        //         res.forEach((obj) => {
        //             if (that.data.provinceName == obj.name) {
        //                 that.cityFun2(obj.code)
        //                 return false;
        //             }
        //         });
        //     }
        // });
    },
    // 市
    cityFun2: function (t) {
        let that = this;
        common.getAreas(t).then(res => {
            // console.log('行政区划2', res)
            if (res.length > 0) {
                res.forEach((obj) => {
                    if (that.data.cityName == obj.orgname) {
                        that.cityFun3(obj.orgid)
                        return false;
                    }
                });
            }
        })
        // util.requestAll(api.Index.position.reqUrl + t + ".json", api.Index.position.reqData, api.Index.position.reqType).then(function (res) {
        //     if (res.length > 0) {
        //         if (res.length == 1) {
        //             that.cityFun3(res[0].code)
        //         } else {
        //             res.forEach((obj) => {
        //                 if (that.data.cityName == obj.name) {
        //                     that.cityFun3(obj.code)
        //                     return false;
        //                 }
        //             });
        //         }
        //     }
        // });
    },
    // 区
    cityFun3: function (t) {
        let that = this;
        common.getAreas(t).then(res => {
            // console.log('行政区划3', res)
            if (res.length > 0) {
                res.forEach((obj) => {
                    if (that.data.areaName == obj.orgname) {
                        // console.log('objname', obj)
                        // that.cityFun3(obj.orgid)
                        common.getNewsList('', '', 0, obj.orgid, 1, res => {
                            // console.log('自动获取新闻', res)
                            common.getDistrictImage(obj.orgid, res => {
                                    // console.log('封面',res)
                                    that.setData({
                                        communityDetails:res
                                    })
                                    // console.log('当前社区详情',that.data.communityDetails)
                                })
                            that.setData({
                                AreaNewlist: res.list,
                                areaCode: obj.orgid
                            })
                        })
                        return false;
                    }
                });
            }
        })
        // util.requestAll(api.Index.position.reqUrl + t + ".json", api.Index.position.reqData, api.Index.position.reqType).then(function (res) {
        //     if (res.length > 0) {
        //         res.forEach((obj) => {
        //             if (that.data.areaName == obj.name) {
        //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.province = "";
        //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.city = "";
        //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.area = obj.code;
        //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.street = "";
        //                 api.Index.getNewsInfoVideoInfoList_Area.reqData.community = "";
        //                 that.getNewsInfoVideoInfoList_Area();

        //                 that.setData({
        //                     areaCode: obj.code,
        //                 });
        //                 //通过省市区街道编码获取社区信息列表
        //                 that.getListByCode();
        //                 return false;
        //             }
        //         });
        //     }
        // });
    },
    //根据省市区地址 获取最新的非推荐新闻和视频
    getNewsInfoVideoInfoList_Area: function () {
        let that = this;
        if (that.data.AreaNewlist_maxPage != "" && api.Index.getNewsInfoVideoInfoList_Area.reqData.page > that.data.AreaNewlist_maxPage) {
            return;
        }
        util.request(api.Index.getNewsInfoVideoInfoList_Area.reqUrl, api.Index.getNewsInfoVideoInfoList_Area.reqData, api.Index.getNewsInfoVideoInfoList_Area.reqType).then(function (res) {
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
    //获取用户位置信息
    getuserLocation: function () {
        var that = this;
        //判断是否获得了用户地理位置授权
        wx.getSetting({
            success: (res) => {
                wx.getLocation({
                    type: 'wgs84',
                    success(res) {
                        const latitude = res.latitude
                        const longitude = res.longitude
                        const speed = res.speed
                        const accuracy = res.accuracy
                        app.globalData.latitude = res.latitude;
                        app.globalData.longitude = res.longitude;
                        that.communityDetails();
                    },
                    fail: (res) => {
                        that.communityDetails();
                    }
                })
                // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
                // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
                // res.authSetting['scope.userLocation'] == true    表示 地理位置授权

                // if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
                //     console.log("-------------初始化进入该页面")
                //     wx.showModal({
                //         title: '请求授权当前位置',
                //         content: '需要获取您的地理位置，请确认授权',
                //         success: function(res) {
                //             if (res.cancel) {
                //                 that.communityDetails();
                //             } else if (res.confirm) {
                //                 wx.openSetting({
                //                     success: function(dataAu) {
                //                         if (dataAu.authSetting["scope.userLocation"] == true) {
                //                             wx.getLocation({
                //                                 type: 'wgs84',
                //                                 success(res) {
                //                                     const latitude = res.latitude
                //                                     const longitude = res.longitude
                //                                     const speed = res.speed
                //                                     const accuracy = res.accuracy
                //                                     app.globalData.latitude = res.latitude;
                //                                     app.globalData.longitude = res.longitude;
                //                                     that.communityDetails();
                //                                 }
                //                             })
                //                         } else {
                //                             wx.showToast({
                //                                 title: '授权失败',
                //                                 icon: 'none',
                //                                 duration: 1000
                //                             })
                //                             that.communityDetails();
                //                         }
                //                     }
                //                 })
                //             }
                //         }
                //     })
                // } else if (res.authSetting['scope.userLocation'] == undefined) {
                //     console.log("-------------非初始化进入该页面 且未授权")
                //     wx.getLocation({
                //         type: 'wgs84',
                //         success(res) {
                //             const latitude = res.latitude
                //             const longitude = res.longitude
                //             const speed = res.speed
                //             const accuracy = res.accuracy
                //             app.globalData.latitude = res.latitude;
                //             app.globalData.longitude = res.longitude;
                //             that.communityDetails();
                //         }
                //     })
                // } else {
                //     console.log("-------------地理位置授权")
                //     wx.getLocation({
                //         type: 'wgs84',
                //         success(res) {
                //             const latitude = res.latitude
                //             const longitude = res.longitude
                //             const speed = res.speed
                //             const accuracy = res.accuracy
                //             app.globalData.latitude = res.latitude;
                //             app.globalData.longitude = res.longitude;
                //             that.communityDetails();
                //         }
                //     })
                // }
            }
        })
    },
    /**
     * 设置用户基本信息
     */
    getConfig: function () {
        var that = this;
        util.requestAll(api.Common.getConfig.reqUrl, api.Common.getConfig.reqData, api.Common.getConfig.reqType).then(function (res) {
            app.globalData.is_video = res.data.is_video;
            that.setData({
                is_video: app.globalData.is_video,
            })
        })
    },
    onLoad: function (options) {
        if (options.pageType) {
            this.setData({
                pageType: options.pageType,
            })
        }

        if (app.globalData.is_video == "") {
            this.getConfig();
        } else {
            this.setData({
                is_video: app.globalData.is_video,
            })
        }

        this.onShowPlus()
    },

    // 从编辑地址返回时刷新当前页面
    changeData: function (options) {
        this.onShow(options); //最好是只写需要刷新的区域的代码，onload也可，效率低，有点low
    },
    onReady: function () {
        let animation = wx.createAnimation({
            duration: 1000,
            timingFunction: "linear"
        })
        let next = true
        setInterval(() => {
            if (next) {
                animation.scale(1.04).step()
                next = !next
            } else {
                animation.scale(0.96).step()
                next = !next
            }
            this.setData({
                animationTobot: animation.export()
            })
        }, 1000)
    },

    onShow: function () { //mfwl修改： 将onshow的内容移动到onshowplus里面了
        if (this.data.articleStatus == 0) {
            this.onShowPlus()
        }
        this.setData({
            articleStatus: 0
        })
    },

    onShowPlus: function () { //mfwl新增
        var that = this;
        if (!app.globalData.longitude) {
            that.getuserLocation();
        } else {
            that.communityDetails();
        }
        if (app.globalData.open_id == "") {
            app.getOpenid().then(function (res) {
                if (res == 1) {
                    api.Index.getNewsInfoVideoInfoList.reqData.page = 1;
                    api.Index.getContentList.reqData.page = 1;
                    api.Index.videolist.reqData.page = 1;
                    api.Index.getNewsInfoVideoInfoList_Area.reqData.page = 1;
                    if (that.data.pageType == 1) {
                        that.banner_list();
                        // that.special_topic();
                        that.getHotNewsInfoVideoInfoList();
                        that.getNewsInfoVideoInfoList();
                        
                    }
                    if (that.data.pageType == 2) {
                        // that.getContentList();
                        that.setData({
                            pageNo: 1
                        })
                        if (that.data.dangjianIndex == 1) { //栏目--智慧党建
                            that.column_list()
                        } else { //文章列表
                            let id = this.data.dangjianIndex == 2 ? '24' : this.data.dangjianIndex == 3 ? '25' : '1'
                            that.article_list(id)
                        }
                    }
                    if (that.data.pageType == 3) {
                        that.videolist();
                    }
                    if (that.data.pageType == 4) {
                        that.getHotNewsInfoVideoInfoList();
                    }
                }
            });
        } else {
            api.Index.getNewsInfoVideoInfoList.reqData.page = 1;
            api.Index.getContentList.reqData.page = 1;
            api.Index.videolist.reqData.page = 1;
            api.Index.getNewsInfoVideoInfoList_Area.reqData.page = 1;
            if (that.data.pageType == 1) {
                that.banner_list();
                // that.special_topic();
                that.getHotNewsInfoVideoInfoList();
                that.getNewsInfoVideoInfoList();
            }
            if (that.data.pageType == 2) {
                // that.getContentList();
                that.setData({
                    pageNo: 1
                })
                if (that.data.dangjianIndex == 1) { //栏目--智慧党建
                    that.column_list()
                } else { //文章列表
                    let id = this.data.dangjianIndex == 2 ? '24' : this.data.dangjianIndex == 3 ? '25' : '1'
                    that.article_list(id)
                }
            }
            if (that.data.pageType == 3) {
                that.videolist();
            }
            if (that.data.pageType == 4) {
                that.getHotNewsInfoVideoInfoList();
            }
        }
    },
    onHide: function () {
        // 页面隐藏
    },
    onShareAppMessage: function (options) {
        var that = this,
            title = "社区发展治理",
            path = '/pages/index/index/index',
            url = '';

        if (options.from === 'button') {
            // console.log('分享参数', options.target.dataset)
            if (options.target.dataset.name == 'articleshare') { //文章分享
                path = '/pages/index/article_detail/article_detail?articleId=' + options.target.dataset.articeleid;
            } else if (options.target.dataset.name == 'pageShare') { //视频分享
                path = '/pages/index/index/index?pageType=3';
                api.share.video_infoShare.reqData["open_id"] = app.globalData.open_id;
                api.share.video_infoShare.reqData["id"] = options.target.dataset.id;
                util.request(api.share.video_infoShare.reqUrl, api.share.video_infoShare.reqData, api.share.video_infoShare.reqType).then(function (res) {});
            }
            url = options.target.dataset.url
            title = options.target.dataset.title;
        }

        // 设置菜单中的转发按钮触发转发事件时的转发内容
        var shareObj = {
            // 默认是小程序的名称(可以写slogan等)
            title: title,
            // 默认是当前页面，必须是以‘/’开头的完整路径
            path: path,
            //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
            imageUrl: url,
            // 转发成功之后的回调
            success: function (res) {
                if (res.errMsg == 'shareAppMessage:ok') {}
            },

            // 转发失败之后的回调
            fail: function () {
                if (res.errMsg == 'shareAppMessage:fail cancel') { // 用户取消转发　　　
                } else if (res.errMsg == 'shareAppMessage:fail') { // 转发失败，其中 detail message 为详细失败信息　　　
                }
            },
            // 转发结束之后的回调（转发成不成功都会执行）
            complete: function () {

            },
        };
        return shareObj;
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        util.alert('正在刷新数据...', 'loading');
        this.setData({
            articleStatus: 0,
            page:1
        })
        let that = this;
        if(that.data.pageType==1){
            let downPage=that.data.downPage+1
            // that.onShow();
            common.getNewsList('','',0,'',downPage,res=>{
                // console.log('非推荐news',res)
                that.setData({
                    noRecommentNews:res.list,
                    downPage,
                    videopage:1
                })
            })
        }else if(that.data.pageType==3){
            let downPage=that.data.downPage+1
            common.getVideoList('', downPage, res => {
                // console.log('视频列表', res)
                that.setData({
                    videolist: res.list,
                    downPage
                })
            })
        }else if(that.data.pageType==4){
            common.getNewsList('','',0,this.data.areaCode,1,res=>{
                // console.log('区域新闻',res)
                this.setData({
                    AreaNewlist:res.list
                })
            })
        }else if(that.data.pageType==5){
            common.getWxappActivities(1,res=>{
                // console.log('活动列表',res)
                this.setData({
                    activeList:res.list
                })
            })
        }
        wx.stopPullDownRefresh(); //停止刷新操作
    },
    onReachBottom: function () {
        if (this.data.pageType == 1) {
            // api.Index.getNewsInfoVideoInfoList.reqData.page += 1;
            this.setData({
                page: this.data.page + 1
            })
            // this.getNewsInfoVideoInfoList();
            // this.getHotNewsInfoVideoInfoList()
            common.getNewsList('','',0,'',this.data.page,res=>{
                // console.log('非推荐news',res)
                this.setData({
                    noRecommentNews:[...this.data.noRecommentNews,...res.list]
                })
            })
        }
        if (this.data.pageType == 2) {
            // api.Index.getContentList.reqData.page += 1;
            // this.getContentList();
            let id = this.data.dangjianIndex == 2 ? '49' : this.data.dangjianIndex == 3 ? '50' : '51'
            let page=this.data.arcilePage+1
            this.article_list(id,page)
            this.setData({
                arcilePage:this.data.arcilePage+1
            })

        }
        if (this.data.pageType == 3) {
             let videopage=this.data.videopage+1
            common.getVideoList('',videopage,res=>{
                this.setData({
                    videolist:[...this.data.videolist,...res.list],
                    videopage
                })
            })
        }
        if (this.data.pageType == 4) {
   
            this.setData({
                page: this.data.page + 1
            })

            common.getNewsList('','',0,this.data.areaCode,this.data.page,res=>{
                // console.log('非推荐news',res)
                this.setData({
                    AreaNewlist:[...this.data.AreaNewlist,...res.list]
                })
                if(res.lastPage){
                    wx.showToast({
                      title: '最后一页了',
                      icon:"none"
                    })
                    return
                }
            })
        }
        if(this.data.pageType==5){
            let page=this.data.activePage+1
            common.getWxappActivities(page,res=>{
                // console.log('活动列表',res)
                this.setData({
                    activeList:[...this.data.activeList,...res.list],
                    activePage:page+1
                })
            })
        }
    },
    onUnload: function () {
        // 页面关闭
    },
})