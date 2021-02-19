const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
import {getCommunityVoiceListtAPI} from '../../../config/newsAPI/PVoice_api'
var app = getApp();
Page({
    data: {
        communityVoiceList:[],
        wxUserInfo: "",
        pageType: 1,
        communitylist_maxPage: "",
        communitylist: [],
        isblo:true,
        title:'',
        page:1,
        lastPage:false
    },
    bindGetUserInfo: function(e) {
        commonJs.bindGetUserInfo(e)
    },
    //跳转到话题详情页面
    TaptoTopic_details: function(e) {
        commonJs.TaptoTopic_details(e.currentTarget.dataset.id);
    },
    //跳转到话题发布页面
    TaptoRelease_topic: function(e) {
        commonJs.TaptoRelease_topic(e.currentTarget.dataset.id);
    },
    //获取社区之声列表
    communitylist: function() {
        let that = this;
        api.property.communitylist.reqData["open_id"] = app.globalData.open_id;
        if (that.data.communitylist_maxPage != "" && api.property.communitylist.reqData.page > that.data.communitylist_maxPage) {
            return;
        }
        util.request(api.property.communitylist.reqUrl, api.property.communitylist.reqData, api.property.communitylist.reqType).then(function(res) {
            let u = res.data,
                vl = that.data.communitylist;
            if (u.length > 0) {
                if (api.property.communitylist.reqData.page > 1) vl = vl.concat(u)
                else vl = u;
            }
            let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
            that.setData({
                communitylist_maxPage: maxPage,
                communitylist: vl,
            })
        });
    },
    onLoad: function(options) {
        let that = this;
        var data = JSON.parse(options.data)
        console.log('options',options)
        that.setData({
            navigation_id: data.navigationId||data.id,
            title:data.channelName||data.title
        })
    },
    // 从发布话题返回时刷新当前页面
    changeData: function(options) {
        let that = this;
        // api.property.communitylist.reqData.page = 1;
        // api.property.communitylist.reqData.navigation_id = that.data.navigation_id;
        // that.communitylist();
        that.getCommunityVoiceList(that.data.navigation_id)
    },
    onReady: function() {},


    onShow: function() {
        let that = this;
        that.setData({
            wxUserInfo: app.globalData.userInfo
        })
        // api.property.communitylist.reqData.page = 1;
        // api.property.communitylist.reqData.navigation_id = that.data.navigation_id;
        // that.communitylist();
        that.getCommunityVoiceList(that.data.navigation_id)
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
        let that = this;
        // api.property.communitylist.reqData.page += 1;
        // that.communitylist();
        if(that.data.lastPage){
            wx.showToast({
              title: '最后一页了',
              icon:"none"
            })
            return
        }
        that.data.page+=1
        that.getCommunityVoiceList(that.data.navigation_id,'',that.data.page)
    },
    onUnload: function() {
        // 页面关闭
    },

    //获取社区之声列表
    getCommunityVoiceList:function(channelId='',serachContent='',pageNumber=1){
    let _this=this
    let params={
        channelId:channelId,
        serachContent:serachContent,
        pageSize:'10',
        pageNumber:pageNumber
    }
    getCommunityVoiceListtAPI(params).then(res=>{
        console.log('社区之声列表',res)
        let list=res.data.list
        let communityVoiceList=list
        if(params.pageNumber>1){
            _this.setData({
                communityVoiceList:_this.data.communityVoiceList.concat(list),
                lastPage:res.data.lastPage
            })
            
        }
        if(res.status==1){
            _this.setData({
                communityVoiceList,
                lastPage:res.data.lastPage
            })
        }
    })
    }
})