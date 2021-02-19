const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
const WxParse = require('../../../utils/wxParse/wxParse.js');
import common from '../../../config/newsAPI/common'
import { getAccessToken, msg_sec_check } from '../../../config/newsAPI/token'
var app = getApp();
Page({
    data: {
        access_token: '',
        isPraised: false,
        praisedNum: '',
        wxUserInfo: "",
        msg: '说点什么吧',
        sendCommentsHeight: 0,
        sendCommentsConHeight: 0,
        id: "", //视频id
        type: "2", //内容类型：1-新闻，2-视频，3社区之声

        videoDetails: {},
        commentslist: [],
        maxPage: "",
        comments_input: false,
        special_topic_info_id: "",
        parent_id: "",
        by_user_id: '',
        content: "",
        by_comment_id: "",
        getMyPraise: [],
        getMyPraiseCon: [],
        commentNum: "",
        sendCommentsValue: "",
        share: 0
    },
    bindGetUserInfo: function (e) {
        commonJs.bindGetUserInfo(e)
    },
    //跳转到首页
    TaptoIndex: function (e) {
        commonJs.TaptoIndex();
    },
    //评论点赞
    TapCommentPraise: function (e) {
        // commonJs.CommentPraise(app.globalData.open_id, e.currentTarget.dataset.id);
        let id = e.currentTarget.dataset.id
        let op = {
            contentId: this.data.videoDetails.id,
            commentId: id,
            msgType: '2',
            byUserId: e.currentTarget.dataset.uid,
            infoType: '2'
        }
        common.praiseComment(op).then(res => {
            this.setData({
                commentslist: this.handleCommentList(this.data.commentslist, id, 1)
            })
        })
    },
    //取消点赞
    TapCommentCancenl: function (e) {
        // commonJs.CommentCancenl(app.globalData.open_id, e.currentTarget.dataset.id);
        let id = e.currentTarget.dataset.id
        common.canclePraiseComment(id).then(res => {
            this.setData({
                commentslist: this.handleCommentList(this.data.commentslist, id, 2)
            })
        })
    },
    //评论内容点赞
    TapCommentPraiseCon: function (e) {
        this.setData({
            isPraised: true,
            praisedNum: this.data.praisedNum + 1
            // ['videoDetails.getMyPraise']: 2,
            // ['videoDetails.praise_number']: this.data.videoDetails.praise_number + 1
        })
        // commonJs.CommentPraiseCon(app.globalData.open_id, this.data.type, this.data.id);
        common.praiseContent(this.data.videoDetails.id, 2).then(res => { })
    },
    //取消内容点赞
    TapCommentCancenlCon: function (e) {
        this.setData({
            isPraised: false,
            praisedNum: this.data.praisedNum == 0 ? 0 : this.data.praisedNum - 1
            // ['videoDetails.getMyPraise']: 0,
            // ['videoDetails.praise_number']: this.data.videoDetails.praise_number == 0 ? 0 : this.data.videoDetails.praise_number - 1
        })
        // commonJs.CommentCancenlCon(app.globalData.open_id, this.data.type, this.data.id);
        common.canclePraiseContent(this.data.id, 2).then(res => { })
    },
    //点击立即回复ta 获取输入框焦点
    TapReply: function (e) {
        this.setData({
            msg: '说点什么吧',
            comments_input: true,
            by_comment_id: e.currentTarget.dataset.id,
            parent_id: e.currentTarget.dataset.parentId,
            by_user_id: e.currentTarget.dataset.uid
        });
    },
    //失去输入框焦点
    bindblurFun: function (e) {
        // const pages = getCurrentPages()
        // const perpage = pages[pages.length - 1]
        console.log(1)
        // perpage.onShow()
        this.setData({
            comments_input: false,
            msg: '',
            sendCommentsValue: "",
        });
        console.log(2, this.data.comments_input)
    },
    //点击回复发送
    sendComments: function (e) {
        this.setData({
            comments_input: false,
            content: e.detail.value,
        });
        //添加评论
        this.addComment();
    },
    //点击发送
    TapReplyCon: function (e) {
        // console.log('dsada',e)
        wx.getSystemInfo({
            success: (result) => {
                //   console.log('系统',result)
                if (result.platform == 'ios') {
                    wx.onKeyboardHeightChange(res => {
                        this.setData({
                            sendCommentsHeight: res.height,
                            comments_input: true,
                            parent_id: "0",
                            by_comment_id: "",
                            by_user_id: 0,
                            content: e.detail.value,
                        })
                    })

                } else {
                    this.setData({
                        comments_input: true,
                        parent_id: "0",
                        by_comment_id: "",
                        by_user_id: 0,
                        content: e.detail.value,
                    });
                }
            },
        })
        this.setData({
            msg: '说点什么吧',
            comments_input: true,
            parent_id: "0",
            by_comment_id: "",
            by_user_id: 0,
            content: e.detail.value,
        });
    },
    //添加评论
    addComment: function () {
        let that = this;
        // msg_sec_check(that.data.access_token,that.data.content,resp=>{
        //     if(resp==0){
        //         common.addComment(that.data.videoDetails.id, 2, 0, that.data.content,'').then(res => {
        //             const pages = getCurrentPages()
        //             const perpage = pages[pages.length - 1]
        //             perpage.onShow()
        //         })
        //     }
        // })
        common.addComment(that.data.videoDetails.id, 2, that.data.by_user_id, that.data.content, '', that.data.parent_id).then(res => {
            const pages = getCurrentPages()
            const perpage = pages[pages.length - 1]
            perpage.onShow()
        })
        // if (!app.globalData.userInfo.avatarUrl) {
        //     util.alert("请前往我的页面授权")
        //     return false;
        // }
        // api.Index.addComment.reqData["special_topic_info_id"] = that.data.videoDetails.special_topic_id; //所属专题编号
        // api.Index.addComment.reqData["parent_id"] = that.data.parent_id; //所属评论编号（回复评论轮的时候用到，不是回复传入0）
        // api.Index.addComment.reqData["content"] = that.data.content; //评论内容
        // api.Index.addComment.reqData["type"] = that.data.type; //评论内容类型:1-新闻，2-视频，3-社区之声
        // api.Index.addComment.reqData["open_id"] = app.globalData.open_id;
        // api.Index.addComment.reqData["content_id"] = that.data.id; //新闻或视频编号
        // api.Index.addComment.reqData["by_comment_id"] = that.data.by_comment_id; //（选填）被评论编号
        // util.request(api.Index.addComment.reqUrl, api.Index.addComment.reqData, api.Index.addComment.reqType).then(function (res) {
        //     const pages = getCurrentPages()
        //     const perpage = pages[pages.length - 1]
        //     perpage.onShow()
        // });
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
        common.getCommentList(that.data.id, 2, 1).then(res => {
            that.setData({
                commentslist: res.list,
                commentNum: res.num
            })

        })
        // api.Index.commentslist.reqData["open_id"] = app.globalData.open_id;
        // api.Index.commentslist.reqData["type"] = that.data.type;
        // api.Index.commentslist.reqData["content_id"] = that.data.id;
        // if (that.data.maxPage != "" && api.Index.commentslist.reqData.page > that.data.maxPage) {
        //     return;
        // }
        // util.request(api.Index.commentslist.reqUrl, api.Index.commentslist.reqData, api.Index.commentslist.reqType).then(function(res) {
        //     let u = res.data,
        //         vl = that.data.commentslist;
        //     if (u.length > 0) {
        //         u.forEach((obj) => {
        //             if (that.data.getMyPraise.includes(Number(obj.id)) == true) {
        //                 obj.getMyPraise = 1;
        //             } else {
        //                 obj.getMyPraise = 0;
        //             }
        //             obj.childs.forEach((obj1) => {
        //                 if (that.data.getMyPraise.includes(Number(obj1.id)) == true) {
        //                     obj1.getMyPraise = 1;
        //                 } else {
        //                     obj1.getMyPraise = 0;
        //                 }
        //             });
        //         });
        //         if (api.Index.commentslist.reqData.page > 1) vl = vl.concat(u)
        //         else vl = u;
        //     }
        //     let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
        //     that.setData({
        //         maxPage: maxPage,
        //         commentslist: vl,
        //     })
        // });
    },
    //获取我赞过的内容编号列表
    getMyPraiseCon: function () {
        let that = this;
        that.videoDetails();
        // api.Index.getMyPraiseCon.reqData["open_id"] = app.globalData.open_id;
        // api.Index.getMyPraiseCon.reqData["type"] = that.data.type;
        // util.request(api.Index.getMyPraiseCon.reqUrl, api.Index.getMyPraiseCon.reqData, api.Index.getMyPraiseCon.reqType).then(function(res) {
        //     var getMyPraiseCon = [];
        //     res.data.forEach((data) => {
        //         getMyPraiseCon.push(data.content_id)
        //     });
        //     that.setData({
        //         getMyPraiseCon: getMyPraiseCon
        //     })
        //     that.videoDetails();
        // });
    },

    //视频详情
    videoDetails: function () {
        let that = this;
        common.getVideoDetail(that.data.id, res => {
            console.log('视频详情', res)
            that.setData({
                videoDetails: res,
                praisedNum: res.praiseNumber,
                isPraised: res.isPraised
            })
        })
        // api.Index.videoDetails.reqData["id"] = that.data.id;
        // api.Index.videoDetails.reqData["open_id"] = app.globalData.open_id;
        // util.request(api.Index.videoDetails.reqUrl, api.Index.videoDetails.reqData, api.Index.videoDetails.reqType).then(function(res) {
        //     if (that.data.getMyPraiseCon.includes(Number(res.data.id)) == true) {
        //         res.data.getMyPraise = 1;
        //     } else {
        //         res.data.getMyPraise = 0;
        //     }
        //     //获取评论量
        //     commonJs.commentNumber(that.data.type, res.data.id).then(function(rescommentNumber) {
        //         that.setData({
        //             commentNum: rescommentNumber
        //         })
        //     })
        //     that.setData({
        //         videoDetails: res.data
        //     })
        //     that.getMyPraise();
        // });
    },
    onLoad: function (options) {
        // getAccessToken(res => {
        //     this.setData({
        //         access_token: res
        //     })
        // })
        let that = this;
        if (options.share && options.share == 1) {
            that.setData({
                share: 1
            })
        }
        that.setData({
            id: options.id,
        })
    },
    onReady: function () {

    },


    onShow: function () {
        let that = this;
        if (app.globalData.open_id == "") {
            app.getOpenid().then(function (res) {
                if (res == 1) {
                    that.setData({
                        wxUserInfo: app.globalData.userInfo
                    })
                    api.Index.commentslist.reqData.page = 1;
                    api.Index.commentslist.reqData["limit"] = 10;
                    that.getMyPraiseCon();
                    that.commentslist();
                }
            });
        } else {
            that.setData({
                wxUserInfo: app.globalData.userInfo
            })
            api.Index.commentslist.reqData.page = 1;
            api.Index.commentslist.reqData["limit"] = 10;
            that.getMyPraiseCon();
            that.commentslist();
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
        api.Index.commentslist.reqData.page += 1;
        this.commentslist();
    },
    onUnload: function () {
        // 页面关闭
    },
    onShareAppMessage: function (options) {
        var that = this;
        // api.share.video_infoShare.reqData["open_id"] = app.globalData.open_id;
        // api.share.video_infoShare.reqData["id"] = that.data.id;
        // util.request(api.share.video_infoShare.reqUrl, api.share.video_infoShare.reqData, api.share.video_infoShare.reqType).then(function (res) {});
        common.shareContent(that.data.id).then(res => { })
        // 设置菜单中的转发按钮触发转发事件时的转发内容
        var shareObj = {
            // 默认是小程序的名称(可以写slogan等)
            title: that.data.videoDetails.title,
            // 默认是当前页面，必须是以‘/’开头的完整路径
            path: '/pages/index/video_details/video_details?share=1&id=' + that.data.id,
            //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
            imageUrl: '',
            // 转发成功之后的回调
            success: function (res) {
                if (res.errMsg == 'shareAppMessage:ok') { }
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
        // 来自页面内的按钮的转发
        // if (options.from == 'button') {　　　　
        // var eData = options.target.dataset;　　　　
        // console.log(eData.name);
        // shareBtn
        // 此处可以修改 shareObj 中的内容
        // shareObj.path = '/pages/btnname/btnname?btn_name=' + eData.name;　　
        // }　　
        // 返回shareObj
        return shareObj;
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