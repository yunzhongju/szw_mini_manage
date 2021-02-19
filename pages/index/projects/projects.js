const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
var app = getApp();
Page({
    data: {
        maxPage: "",
        open_id: "",
        projectsList: []
    },
    //跳转到专题详情页面
    TaptoProjects_details: function(e) {
        commonJs.TaptoProjects_details(e.currentTarget.dataset.id)
    },
    // 点击关注
    isFocusOn: function(event) {
        if (!app.globalData.userInfo.avatarUrl) {
            util.alert("请前往我的页面授权");
            return false;
        }
        api.Index.attention.reqData["open_id"] = this.data.open_id;
        api.Index.attention.reqData["special_topic_id"] = event.currentTarget.dataset.id;
        api.Index.attention.reqData["type"] = 1;
        if (event.currentTarget.dataset.on == 1) {
            api.Index.attention.reqData["type"] = 0;
        }
        this.attention();
    },
    //关注和取消主题关注
    attention: function() {
        let that = this;
        util.request(api.Index.attention.reqUrl, api.Index.attention.reqData, api.Index.attention.reqType).then(function(res) {
            if (res != undefined) {
                api.Index.special_topic.reqData.page = 1;
                that.special_topic();
            }
        });
    },
    //获取专题列表
    special_topic: function() {
        let that = this;
        if (that.data.maxPage != "" && api.Index.special_topic.reqData.page > that.data.maxPage) {
            return;
        }
        util.request(api.Index.special_topic.reqUrl, api.Index.special_topic.reqData, api.Index.special_topic.reqType).then(function(res) {
            let u = res.data.list,
                vl = that.data.projectsList;
            if (res.data.list.length > 0) {
                if (that.data.open_id != "") {
                    res.data.list.forEach((obj, index) => {
                        obj.attention = 0;
                        res.data.attention.forEach((obj1, index1) => {
                            if (obj.id == obj1.special_topic_id) {
                                obj.attention = 1;
                            }
                        });
                    });
                }
                u = res.data.list, vl = that.data.projectsList;
                if (api.Index.special_topic.reqData.page > 1) vl = vl.concat(u)
                else vl = u;
            }
            let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
            that.setData({
                maxPage: maxPage,
                projectsList: u
            })
        });
    },
    onLoad: function(options) {
        this.setData({
            open_id: app.globalData.open_id
        })
        api.Index.special_topic.reqData.page = 1;
        api.Index.special_topic.reqData["hot"] = "";
        api.Index.special_topic.reqData["open_id"] = this.data.open_id;
        this.special_topic();
    },
    onReady: function() {

    },


    onShow: function() {

    },
    onHide: function() {
        // 页面隐藏
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        let that = this;
        that.onLoad();
        util.alert('正在刷新数据...', 'loading');
        wx.stopPullDownRefresh(); //停止刷新操作
    },
    onReachBottom: function() {
        api.Index.special_topic.reqData.page += 1;
        this.special_topic();
    },
    onUnload: function() {
        // 页面关闭
    },
})