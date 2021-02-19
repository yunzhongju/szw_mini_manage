const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
import common from '../../../config/newsAPI/common'
import {
    getCommunityVoiceListtAPI
} from '../../../config/newsAPI/PVoice_api'
var app = getApp();
Page({
    data: {
        channelList: [], //新的栏目列表
        communityVoiceList: [], //新的社区之声列表
        wxUserInfo: "",
        pageType: 1,
        communitylist_maxPage: "",
        communitylist: [],
        getChildTreeListByParentID: [],
        page: 1,
        lastPage:false
    },

    bindGetUserInfo: function (e) {
        commonJs.bindGetUserInfo(e)
    },
    //跳转到市民发声页面
    TaptoPeople_voice: function (e) {
        // console.log(e)
        var data = {
            id: e.currentTarget.dataset.id.channelid || e.currentTarget.dataset.id.navigationId,
            title: e.currentTarget.dataset.id.name || e.currentTarget.dataset.id.channelName
        }
        // console.log(data)
        commonJs.TaptoPeople_voice(data);
    },

    //跳转到话题详情页面
    TaptoTopic_details: function (e) {
        commonJs.TaptoTopic_details(e.currentTarget.dataset.id.id);
    },
    //跳转到话题发布页面
    TaptoRelease_topic: function (e) {
        commonJs.TaptoRelease_topic();
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
            that.communitylist();
        } else if (that.data.pageType == 2) {
            that.getMyList2();
        } else {
            that.getMyList3();
        }
    },
    //获取社区之声列表
    communitylist: function () {
        let that = this;
        api.property.communitylist.reqData["open_id"] = app.globalData.open_id;
        if (that.data.communitylist_maxPage != "" && api.property.communitylist.reqData.page > that.data.communitylist_maxPage) {
            return;
        }
        util.request(api.property.communitylist.reqUrl, api.property.communitylist.reqData, api.property.communitylist.reqType).then(function (res) {
            let u = res.data,
                vl = that.data.communitylist;
            if (u.length > 0) {
                if (api.property.communitylist.reqData.page > 1) vl = vl.concat(u)
                else vl = u;
            }
            let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
            // console.log('oldlist', vl)
            that.setData({
                communitylist_maxPage: maxPage,
                communitylist: vl,
            })
        });
    },
    //通过父栏目编号获取下面所有的子栏目
    getChildTreeListByParentID: function () {
        let that = this;
        util.request(api.property.getChildTreeListByParentID.reqUrl, api.property.getChildTreeListByParentID.reqData, api.property.getChildTreeListByParentID.reqType).then(function (res) {
            that.setData({
                getChildTreeListByParentID: res.data,
            })
        });
    },

    onLoad: function (options) {},
    // 从发布话题返回时刷新当前页面
    changeData: function () {
        this.onShow(); //最好是只写需要刷新的区域的代码，onload也可，效率低，有点low
    },
    onReady: function () {

    },


    onShow: function () {
        let that = this;
        that.setData({
            wxUserInfo: app.globalData.userInfo,
            page:1,
            lastPage:false
        })
        common.getChannelList(3).then(res => {
            that.setData({
                channelList: res.list
            })
        }) //new
        // that.getChildTreeListByParentID();
        // api.property.communitylist.reqData.page = 1;
        // api.property.communitylist.reqData.navigation_id = "";
        // that.communitylist();
        that.getCommunityVoiceList()
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
        // api.property.communitylist.reqData.page += 1;
        // that.communitylist();
        if(that.data.lastPage){
            wx.showToast({
              title: '最后一页了',
              icon:"none"
            })
            return
        }
        that.data.page += 1
        that.getCommunityVoiceList(3, '', that.data.page)
    },
    onUnload: function () {
        // 页面关闭
    },

    //新的接口
    //获取社区之声列表
    getCommunityVoiceList: function (channelId = '', serachContent = '', pageNumber = 1) {
        let _this = this
        let params = {
            channelId: channelId,
            serachContent: serachContent,
            pageSize: '10',
            pageNumber: pageNumber
        }
        getCommunityVoiceListtAPI(params).then(res => {
            // console.log('社区之声列表', res)
            let list = res.data.list
            let communityVoiceList = list
            if (params.pageNumber > 1) {
                _this.setData({
                    communityVoiceList:_this.data.communityVoiceList.concat(list),
                    lastPage:res.data.lastPage
                })
            }
            if (res.status == 1) {
                _this.setData({
                    communityVoiceList,
                    lastPage:res.data.lastPage
                })
            }
        })
    }
})