const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const bmap = require('../../../utils/bmap-wx.min.js');
const api = require('../../../config/api.js');
var app = getApp();
import {
    getMyFollowAPI
} from '../../../config/newsAPI/Attention_api'
Page({
    data: {
        list: [],
        page:1,

        wxUserInfo: "",
        focusOn: "0",
        Attention_maxPage: "",
        getMyAttentionNewsInfoList: [],
        Recently_maxPage: "",
        getRecentlyUpdateNewsInfoList: [],
        myAttentionList: [],
        provinceName: "",
        cityName: "",
        areaName: "",
        areaCode: "0",
    },

    bindGetUserInfo: function (e) {
        commonJs.bindGetUserInfo(e)
    },

    //跳转到社区详情
    TaptoCommunity_details: function (e) {
        commonJs.TaptoCommunity_details(e.currentTarget.dataset.id);
    },
    //跳转到新闻详情页面
    TaptoNews_details: function (e) {
        commonJs.TaptoNews_details(e.currentTarget.dataset.id);
    },
    //跳转到视频详情页面
    TaptoVideo_details: function (e) {
        commonJs.TaptoVideo_details(e.currentTarget.dataset.id);
    },
    //获取我关注的专题最新信息
    getMyAttentionNewsInfoList: function () {
        let that = this;
        api.attention.getMyAttentionNewsInfoList.reqData["open_id"] = app.globalData.open_id;
        if (that.data.Attention_maxPage != "" && api.attention.getMyAttentionNewsInfoList.reqData.page > that.data.Attention_maxPage) {
            return;
        }
        util.request(api.attention.getMyAttentionNewsInfoList.reqUrl, api.attention.getMyAttentionNewsInfoList.reqData, api.attention.getMyAttentionNewsInfoList.reqType).then(function (res) {
            let u = res.data,
                vl = that.data.getMyAttentionNewsInfoList;
            if (api.attention.getMyAttentionNewsInfoList.reqData.page == 1 && u.length < 1) {
                api.attention.getRecentlyUpdateNewsInfoList.reqData.page = 1;
                that.getRecentlyUpdateNewsInfoList();
                return false;
            }
            if (u.length > 0) {
                if (api.attention.getMyAttentionNewsInfoList.reqData.page > 1) vl = vl.concat(u)
                else vl = u;
            }
            let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
            that.setData({
                Attention_maxPage: maxPage,
                getMyAttentionNewsInfoList: vl,
                focusOn: "1",
            })
        });
    },
    //获取推荐的专题最新信息
    getRecentlyUpdateNewsInfoList: function () {
        let that = this;
        if (that.data.Recently_maxPage != "" && api.attention.getRecentlyUpdateNewsInfoList.reqData.page > that.data.Recently_maxPage) {
            return;
        }
        util.request(api.attention.getRecentlyUpdateNewsInfoList.reqUrl, api.attention.getRecentlyUpdateNewsInfoList.reqData, api.attention.getRecentlyUpdateNewsInfoList.reqType).then(function (res) {
            let u = res.data,
                vl = that.data.getRecentlyUpdateNewsInfoList;
            if (u.length > 0) {
                if (api.attention.getRecentlyUpdateNewsInfoList.reqData.page > 1) vl = vl.concat(u)
                else vl = u;
            }
            let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
            that.setData({
                Recently_maxPage: maxPage,
                getRecentlyUpdateNewsInfoList: vl,
                focusOn: "0",
            })
        });
    },
    //获取我关注的社区列表
    myAttentionList: function () {
        let that = this;
        api.attention.myAttentionList.reqData["open_id"] = app.globalData.open_id;
        util.request(api.attention.myAttentionList.reqUrl, api.attention.myAttentionList.reqData, api.attention.myAttentionList.reqType).then(function (res) {
            that.setData({
                myAttentionList: res.data
            })
        });
    },
    onLoad: function (options) {},
    onReady: function () {

    },


    onShow: function () {
        var that = this;
        // 判断session_key 是否失效
        wx.checkSession({
            fail() {
                console.log('登录失效，重新登录');
                app.wxLogin();
            }
        })
        that.setData({
            wxUserInfo: app.globalData.userInfo
        })
        if (!that.data.wxUserInfo.avatarUrl) {
            api.attention.getRecentlyUpdateNewsInfoList.reqData.page = 1;
            // that.getRecentlyUpdateNewsInfoList();
            that.getMyFollow(1,res=>{
                console.log('我关注的',res)
                that.setData({
                    list:res.list
                })
            })
        } else {
            // api.attention.getMyAttentionNewsInfoList.reqData.page = 1;
            that.getMyFollow(1,res=>{
                console.log('我关注的',res)
                that.setData({
                    list:res.list
                })
            })
            // that.getMyAttentionNewsInfoList();
            // that.myAttentionList();
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
        // if (this.data.focusOn == 1) {
        //     api.attention.getMyAttentionNewsInfoList.reqData.page += 1;
        //     this.getMyAttentionNewsInfoList();
        // } else {
        //     api.attention.getRecentlyUpdateNewsInfoList.reqData.page += 1;
        //     this.getRecentlyUpdateNewsInfoList();
        // }
        let that=this
        let page=that.data.page+=1
        that.getMyFollow(page,res=>{
            console.log('我关注的',res)
            if(page>1){
                that.setData({
                    list:that.data.list.concat(res.list),
                    page
                })
            }
           
        })
    },
    onUnload: function () {
        // 页面关闭
    },
    getMyFollow: function (pageNumber, cb) {
        let p = {
            pageSize: 10,
            pageNumber: pageNumber
        }
        getMyFollowAPI(p).then(res => {
            if (res.status == 1) {
                cb(res.data)
            }
        })
    }
})