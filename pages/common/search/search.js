const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
var app = getApp();
import common from '../../../config/newsAPI/common'
import {getCommunityVoiceListtAPI} from '../../../config/newsAPI/PVoice_api'
Page({
    data: {
        is_video: 1,
        pageType: 1,
        totalNews:0,
        totalVideo:0,
        totalVoice:0,
        news_lastPage:false,
        voide_lastPage:false,
        voice_lastPage:false,
        page:1,
        search_key: "",
        newslist_maxPage: "",
        newslist: [],
        videolist_maxPage: "",
        videolist: [],
        communitylist_maxPage: "",
        communitylist: [],
    },
    /**
     * 栏目切换
     * @param event
     */
    switchBar: function (event) {
        this.setData({
            pageType: event.currentTarget.dataset.pagetype,
            page:1
        });
    },

    //跳转到新闻详情页面
    TaptoNews_details: function (e) {
        commonJs.TaptoNews_details(e.currentTarget.dataset.id);
    },
    //跳转到视频详情页面
    TaptoVideo_details: function (e) {
        commonJs.TaptoVideo_details(e.currentTarget.dataset.id);
    },
    //跳转到话题详情页面
    TaptoTopic_details: function (e) {
        commonJs.TaptoTopic_details(e.currentTarget.dataset.id);
    },
    searchInput: function (e) {
        let that = this;
        that.setData({
            search_key: e.detail.value,
        });
    },
    searchBtn: function (e) {
        let that = this;
        that.setData({
            page:1
        })
        that.newslist({search_key:that.data.search_key,page:that.data.page});
        that.videolist({search_key:that.data.search_key,page:that.data.page});
        that.communitylist({search_key:that.data.search_key,page:that.data.page});
    },
    //新闻列表
    newslist: function (options) {
        let that = this;
        common.getNewsList(options.search_key,'','','',options.page,res=>{
            if(options.page>1){
                that.setData({
                    newslist:that.data.newslist.concat(res.list),
                    totalNews:res.totalRow,
                    news_lastPage:res.lastPage
                })
            }else{
                that.setData({
                    newslist:res.list,
                    totalNews:res.totalRow,
                    news_lastPage:res.lastPage
                })
            }
        })
    },
    //视频列表
    videolist: function (options) {
        let that = this;
        common.getVideoList(options.search_key,options.page,res=>{
            if(options.page>1){
                that.setData({
                    videolist:that.data.videolist.concat(res.list),
                    totalVideo:res.totalRow,
                    voide_lastPage:res.lastPage
                })
            }else{
                that.setData({
                    videolist:res.list,
                    totalVideo:res.totalRow,
                    voide_lastPage:res.lastPage
                })
            }
        })
    },
    //话题列表
    communitylist: function (options) {
        let that = this;
        let p={
            channelId:'',
            serachContent:options.search_key,
            pageSize:'10',
            pageNumber:options.page
        }
        getCommunityVoiceListtAPI(p).then(res=>{
            if(options.page>1){
                that.setData({
                    communitylist:that.data.communitylist.concat(res.data.list),
                    totalVoice:res.data.totalRow,
                    voice_lastPage:res.data.lastPage
                })
            }else{
                that.setData({
                    communitylist:res.data.list,
                    totalVoice:res.data.totalRow,
                    voice_lastPage:res.data.lastPage
                })
            }
        })
    },
    onLoad: function (options) {
        // console.log(1111111,app)
        let that = this;
        that.setData({
            is_video: app.globalData.is_video,
        })
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
        that.searchBtn();
        util.alert('正在刷新数据...', 'loading');
        wx.stopPullDownRefresh(); //停止刷新操作
    },
    onReachBottom: function () {
        let that = this
        let page=that.data.page+1
        if (that.data.pageType == 1) {
            if(!that.data.news_lastPage){
                that.newslist({search_key:that.data.search_key,page:page});
            }
        } else if (that.data.pageType == 2) {
            if(!that.data.voide_lastPage){
                that.videolist({search_key:that.data.search_key,page:page});
            }
        } else {
            if(!that.data.voice_lastPage){
            that.communitylist({search_key:that.data.search_key,page:page});
            }
        }
        that.setData({
            page
        })
    },
    onUnload: function () {
        // 页面关闭
    },
})