const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
const WxParse = require('../../../utils/wxParse/wxParse.js');
const {
    default: common
} = require('../../../config/newsAPI/common.js');
import {getAccessToken,msg_sec_check} from '../../../config/newsAPI/token'
var app = getApp();
Page({
    data: {
        access_token:'',
        detail:'',
        isPraised:false,
        pariseNum: 0,
        wxUserInfo: "",
        type: "1",
        commentslist: [],
        maxPage: "",
        comments_input: false,
        parent_id: "",
        content: "",
        content_id: "",
        by_comment_id: "",
        getMyPraise: [],
        getMyPraiseCon: [],
        commentNum: "",
        getPraiseNumber: "",
        st_id: "",
        getConPraise: 0,
        sendCommentsValue: "",
        sendCommentsConValue: "",
        sendCommentsHeight: 0,
        sendCommentsConHeight: 0,
    },
    bindGetUserInfo: function (e) {
        commonJs.bindGetUserInfo(e)
    },
    //评论点赞
    TapCommentPraise: function (e) {
        let id=e.currentTarget.dataset.id
        console.log(this.data.detail)
        let op={
            contentId:this.data.content_id,
            commentId:id,
            msgType:'2',
            byUserId :e.currentTarget.dataset.byuserid,
            infoType :'1'
        }
        common.praiseComment(op).then(res=>{
            this.setData({
                commentslist:this.handleCommentList(this.data.commentslist,id,1)
            })
        })
        // commonJs.CommentPraise(app.globalData.open_id, e.currentTarget.dataset.id);
    },
    //取消点赞
    TapCommentCancenl: function (e) {
        let id=e.currentTarget.dataset.id
        common.canclePraiseComment(id).then(res=>{
            this.setData({
                commentslist:this.handleCommentList(this.data.commentslist,id,2)
            })
        })
        // commonJs.CommentCancenl(app.globalData.open_id, e.currentTarget.dataset.id);
    },
    //评论内容点赞
    TapCommentPraiseCon: function (e) {
        this.setData({
            pariseNum: this.data.pariseNum + 1,
            isPraised: true
        })
        common.praiseContent(this.data.content_id, 1).then(res => {})
        // commonJs.CommentPraiseCon(app.globalData.open_id, this.data.type, this.data.content_id);
    },
    //取消内容点赞
    TapCommentCancenlCon: function (e) {
        this.setData({
            pariseNum: this.data.pariseNum == 0 ? 0 : this.data.pariseNum - 1,
            isPraised: false
        })
        common.canclePraiseContent(this.data.content_id, 1).then(res => {})
        // commonJs.CommentCancenlCon(app.globalData.open_id, this.data.type, this.data.content_id);
    },
    //点击立即回复ta 获取输入框焦点
    TapReply: function (e) {
        this.setData({
            comments_input: true,
            by_comment_id: e.currentTarget.dataset.id,
            parent_id: e.currentTarget.dataset.parentId,
            by_user_id:e.currentTarget.dataset.uid
        });
    },
    //回复 获取输入框焦点
    bindfocusFun: function (e) {
        this.setData({
            sendCommentsHeight: parseFloat(e.detail.height * 2),
        });
    },
    //内容 获取输入框焦点
    bindfocusConFun: function (e) {
        this.setData({
            // sendCommentsConHeight: parseFloat(e.detail.height * 2 - 34),
        });
    },
    //内容 输入框失去焦点
    bindblurConFun: function (e) {
        this.setData({
            sendCommentsConHeight: 0,
            sendCommentsConValue: "",
        });
    },

    //回复 失去输入框焦点
    bindblurFun: function (e) {
        this.setData({
            sendCommentsConHeight: 0,
            comments_input: false,
            sendCommentsValue: "",
        });
    },
    //回复 点击发送
    sendComments: function (e) {
        this.setData({
            comments_input: false,
            content: e.detail.value,
        });
        //添加评论
        // this.addComment();
        common.addComment(this.data.content_id, 1, this.data.by_user_id, e.detail.value,'', this.data.parent_id).then(res => {
            this.onShow()
        })
        
    },
    //内容 点击发送
    sendCommentsCon: function (e) {
        this.setData({
            parent_id: "0",
            by_comment_id: "",
            content: e.detail.value,
        });
        //添加评论
        // this.addComment();
        common.addComment(this.data.content_id, 1, 0, e.detail.value, '').then(res => {
            this.onShow()
        })
       
    },
    //添加评论
    addComment: function () {
        let that = this;
        if (!app.globalData.userInfo.avatarUrl) {
            util.alert("请前往我的页面授权")
            return false;
        }
        api.Index.addComment.reqData["special_topic_info_id"] = that.data.st_id; //所属专题编号
        api.Index.addComment.reqData["parent_id"] = that.data.parent_id; //所属评论编号（回复评论轮的时候用到，不是回复传入0）
        api.Index.addComment.reqData["content"] = that.data.content; //评论内容
        api.Index.addComment.reqData["type"] = that.data.type; //评论内容类型:1-新闻，2-视频，3-社区之声
        api.Index.addComment.reqData["open_id"] = app.globalData.open_id;
        api.Index.addComment.reqData["content_id"] = that.data.content_id; //新闻或视频编号
        api.Index.addComment.reqData["by_comment_id"] = that.data.by_comment_id; //（选填）被评论编号
        util.request(api.Index.addComment.reqUrl, api.Index.addComment.reqData, api.Index.addComment.reqType).then(function (res) {
            const pages = getCurrentPages()
            const perpage = pages[pages.length - 1]
            perpage.onShow()
        });
    },
    //获取我赞过的内容编号列表
    getMyPraiseCon: function () {
        let that = this;
        api.Index.getMyPraiseCon.reqData["open_id"] = app.globalData.open_id;
        api.Index.getMyPraiseCon.reqData["type"] = that.data.type;
        util.request(api.Index.getMyPraiseCon.reqUrl, api.Index.getMyPraiseCon.reqData, api.Index.getMyPraiseCon.reqType).then(function (res) {
            var getMyPraiseCon = [];
            res.data.forEach((data) => {
                getMyPraiseCon.push(data.content_id)
            });

            that.setData({
                getMyPraiseCon: getMyPraiseCon
            })
            if (that.data.getMyPraiseCon.includes(Number(that.data.content_id)) == true) {
                that.setData({
                    getConPraise: 1
                })
            }
        });
    },
    //获取我赞过的评论编号
    getMyPraise: function () {
        let that = this;
        api.Index.getMyPraise.reqData["open_id"] = app.globalData.open_id;
        util.request(api.Index.getMyPraise.reqUrl, api.Index.getMyPraise.reqData, api.Index.getMyPraise.reqType).then(function (res) {
            var getMyPraise = [];
            res.data.forEach((data) => {
                getMyPraise.push(data.comment_id)
            });
            that.setData({
                getMyPraise: getMyPraise
            })
            that.commentslist();
        });
    },
    //获取评论列表
    commentslist: function () {
        let that = this;
        api.Index.commentslist.reqData["open_id"] = app.globalData.open_id;
        api.Index.commentslist.reqData["type"] = that.data.type;
        api.Index.commentslist.reqData["content_id"] = that.data.content_id;
        if (that.data.maxPage != "" && api.Index.commentslist.reqData.page > that.data.maxPage) {
            return;
        }
        util.request(api.Index.commentslist.reqUrl, api.Index.commentslist.reqData, api.Index.commentslist.reqType).then(function (res) {
            let u = res.data,
                vl = that.data.commentslist;
            if (u.length > 0) {
                u.forEach((obj) => {
                    if (that.data.getMyPraise.includes(Number(obj.id)) == true) {
                        obj.getMyPraise = 1;
                    } else {
                        obj.getMyPraise = 0;
                    }
                    obj.childs.forEach((obj1) => {
                        if (that.data.getMyPraise.includes(Number(obj1.id)) == true) {
                            obj1.getMyPraise = 1;
                        } else {
                            obj1.getMyPraise = 0;
                        }
                    });
                });
                if (api.Index.commentslist.reqData.page > 1) vl = vl.concat(u)
                else vl = u;
            }
            let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
            that.setData({
                maxPage: maxPage,
                commentslist: vl,
            })
        });
    },
    onLoad: function (options) {
        // getAccessToken(res=>{
        //     this.setData({
        //         access_token:res
        //     })
        // })
        let that = this;
        that.setData({
            st_id: options.st_id,
            type: options.type,
            content_id: options.content_id,
            pariseNum: options.praise_number
        })
    },
    onReady: function () {

    },


    onShow: function () {
        let that = this;
        that.setData({
            wxUserInfo: app.globalData.userInfo
        })

        //获取评论列表按
        common.getCommentList(this.data.content_id, this.data.type, 1).then(res => {
            this.setData({
                commentslist: res.list
            })
        })
        common.getNewsDetails(this.data.content_id,res=>{
            this.setData({
                pariseNum:res.praiseNumber,
                isPraised:res.isPraised
            })
        })
        // commonJs.commentNumber(that.data.type, that.data.content_id).then(function(res) {
        //     that.setData({
        //         commentNum: res
        //     })
        // });
        // commonJs.getPraiseNumber(that.data.type, that.data.content_id).then(function(res) {
        //     that.setData({
        //         getPraiseNumber: res
        //     })
        // });
        // api.Index.commentslist.reqData.page = 1;
        // api.Index.commentslist.reqData["limit"] = 10;
        // that.getMyPraiseCon();
        // that.getMyPraise();
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
        api.Index.commentslist.reqData.page += 1;
        this.commentslist();
    },
    onUnload: function () {
        // 页面关闭
    },
    //处理评论列表
    handleCommentList: function (arr, id, type) {
        for (let i = 0; i < arr.length; i++) {
            if (id == arr[i].id) {
                if (type === 1) {
                    arr[i].isPraised = !arr[i].isPraised
                    arr[i].likeNumber += 1
                } else {
                    arr[i].isPraised = !arr[i].isPraised
                    arr[i].likeNumber -= 1
                }
            }
            if (arr[i].reply && arr[i].reply.length != 0) {
                this.handleCommentList(arr[i].reply, id, type)
            }
        }
        return arr
    }
})