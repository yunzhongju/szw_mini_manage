const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
const WxParse = require('../../../utils/wxParse/wxParse.js');
import common from '../../../config/newsAPI/common'
import {
    getAccessToken,
    msg_sec_check
} from '../../../config/newsAPI/token'
var app = getApp();
Page({
    data: {
        showShare: false,
        showShareCanvas:false,
        options: [{
                name: '微信',
                icon: 'wechat',
                openType: 'share'
            },
            {
                name: '分享海报',
                icon: 'poster'
            },
        ],
        access_token: '',
        wxUserInfo: "",
        type: "1",
        id: "",
        pariseNum: '',
        isPraised: false,
        by_user_id: '',

        newsDetails: {},
        read_number: "0",
        newsDesc: "",
        newslist: [],
        commentslist: [],
        comments_input: false,
        st_id: "",
        parent_id: "",
        content: "",
        by_comment_id: "",
        getMyPraise: [],
        getMyPraiseCon: [],
        commentNum: "",
        sendCommentsValue: "",
        sendCommentsConValue: "",
        sendCommentsHeight: 0,
        sendCommentsConHeight: 0,
        share: 0
    },
    handleShare:function(){
        this.setData({
            showShare: true
        });
    },
    onClose() {
        this.setData({
            showShare: false
        });
    },
    onSelect(event) {
        console.log(event)
        if(event.detail.index==1){
            let myComponent = this.selectComponent('#my-share')
            console.log(myComponent)
            myComponent.showCanvas()
        }
        this.onClose();
    },
    bindGetUserInfo: function (e) {
        commonJs.bindGetUserInfo(e)
    },
    //跳转到首页
    TaptoIndex: function (e) {
        commonJs.TaptoIndex();
    },
    //跳转到新闻详情页面
    TaptoNews_details: function (e) {
        commonJs.TaptoNews_details(e.currentTarget.dataset.id);
    },
    //跳转到全部评论页面
    TaptoAll_comments: function (e) {
        commonJs.TaptoAll_comments(1, this.data.id, this.data.newsDetails.specialTopicId, this.data.newsDetails.praiseNumber);
    },
    //评论点赞
    TapCommentPraise: function (e) {
        let id = e.currentTarget.dataset.id
        let op = {
            contentId: this.data.newsDetails.id,
            commentId: id,
            msgType: '2',
            byUserId: e.currentTarget.dataset.byuserid,
            infoType: '1'
        }
        common.praiseComment(op).then(res => {
            this.setData({
                commentslist: this.handleCommentList(this.data.commentslist, id, 1)
            })
        })
        // this.setData({
        //     ['commentslist.getMyPraise']: 2,
        //     ['commentslist.like_number']: this.data.commentslist.like_number + 1
        // })
        // commonJs.CommentPraise(app.globalData.open_id, e.currentTarget.dataset.id);
    },
    //取消点赞
    TapCommentCancenl: function (e) {
        let id = e.currentTarget.dataset.id
        common.canclePraiseComment(id).then(res => {
            this.setData({
                commentslist: this.handleCommentList(this.data.commentslist, id, 2)
            })
        })
        // this.setData({
        //     ['commentslist.getMyPraise']: 1,
        //     ['commentslist.like_number']: this.data.commentslist.like_number == 0 ? 0 : this.data.commentslist.like_number - 1
        // })
        // commonJs.CommentCancenl(app.globalData.open_id, e.currentTarget.dataset.id);
    },
    //评论内容点赞
    TapCommentPraiseCon: function (e) {
        this.setData({
            pariseNum: this.data.pariseNum + 1,
            isPraised: true
        })
        common.praiseContent(this.data.id, 1).then(res => {})
        // this.setData({
        //     ['newsDetails.getMyPraise']: 2,
        //     ['newsDetails.praise_number']: this.data.newsDetails.praise_number + 1
        // })
        // commonJs.CommentPraiseCon(app.globalData.open_id, this.data.type, this.data.id);
    },
    //取消内容点赞
    TapCommentCancenlCon: function (e) {

        // this.setData({
        //     ['newsDetails.getMyPraise']: 0,
        //     ['newsDetails.praise_number']: this.data.newsDetails.praise_number == 0 ? 0 : this.data.newsDetails.praise_number - 1
        // })
        // commonJs.CommentCancenlCon(app.globalData.open_id, this.data.type, this.data.id);
        this.setData({
            pariseNum: this.data.pariseNum == 0 ? 0 : this.data.pariseNum - 1,
            isPraised: false
        })
        common.canclePraiseContent(this.data.id, 1).then(res => {})
    },
    //点击立即回复ta 获取输入框焦点
    TapReply: function (e) {
        console.log('回复id', e)
        this.setData({
            comments_input: true,
            by_comment_id: e.currentTarget.dataset.id,
            parent_id: e.currentTarget.dataset.parentId,
            by_user_id: e.currentTarget.dataset.uid
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
        console.log('键盘高度', e)
        this.setData({
            sendCommentsConHeight: parseFloat(e.detail.height * 2),
            // sendCommentsConHeight: parseFloat(e.detail.height*2 + 24),
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
        // msg_sec_check(this.data.access_token,e.detail.value,resp=>{
        //     if(resp==0){
        //         common.addComment(this.data.id, 1, this.data.by_user_id, e.detail.value, '', this.data.parent_id).then(res => {
        //             const pages = getCurrentPages()
        //             const perpage = pages[pages.length - 1]
        //             perpage.onShow()
        //         })
        //     }
        // })
        common.addComment(this.data.id, 1, this.data.by_user_id, e.detail.value, '', this.data.parent_id).then(res => {
            // const pages = getCurrentPages()
            // const perpage = pages[pages.length - 1]
            // perpage.onShow()
            common.getCommentList(this.data.id, 1).then(data => {
                this.setData({
                    commentslist: data.list.reverse().slice(0, 1),
                    commentNum: data.num,
                })
            })
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
        // msg_sec_check(this.data.access_token,e.detail.value,resp=>{
        //     if(resp==0){
        //         common.addComment(this.data.id, 1, 0, e.detail.value, '').then(res => {
        //             const pages = getCurrentPages()
        //             const perpage = pages[pages.length - 1]
        //             perpage.onShow()
        //         })
        //     }
        // })
        common.addComment(this.data.id, 1, 0, e.detail.value, '').then(res => {
            // const pages = getCurrentPages()
            // const perpage = pages[pages.length - 1]
            // perpage.onShow()
            common.getCommentList(this.data.id, 1).then(data => {
                this.setData({
                    commentslist: data.list.slice(0, 1),
                    commentNum: data.num,
                })
            })
        })
    },
    //添加评论
    addComment: function () {
        let that = this;
        if (!app.globalData.userInfo.avatarUrl) {
            util.alert("请前往我的页面授权")
            return false;
        }
        api.Index.addComment.reqData["special_topic_info_id"] = that.data.newsDetails.special_topic_id; //所属专题编号
        api.Index.addComment.reqData["parent_id"] = that.data.parent_id; //所属评论编号（回复评论轮的时候用到，不是回复传入0）
        api.Index.addComment.reqData["content"] = that.data.content; //评论内容
        api.Index.addComment.reqData["type"] = that.data.type; //评论内容类型:1-新闻，2-视频，3-社区之声
        api.Index.addComment.reqData["open_id"] = app.globalData.open_id;
        api.Index.addComment.reqData["content_id"] = that.data.id; //新闻或视频编号
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
            that.newsDetails();
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
    //新闻详情
    newsDetails: function () {
        let that = this;
        common.getNewsDetails(that.data.id, res => {
            console.log('新闻详情', res)
            let desc = unescape(res.content);
            console.log('原始富文本', desc)
            let desc1 = desc.replace(/&quot;/g, "")
                .replace(/<p/g, '<p class="fontsize24 formatted"')
                .replace(/<p class="formatted"/g, '<p class="fontsize24"')
                .replace(/<p style="text-align: justify; text-indent: 2em;"/g, '<p style="text-align: justify; text-indent: 0;"')
                .replace(/<span/g, '<span class="fontsize24"')
                // .replace(/<strong/g, '<strong class="fontsize24"')
                .replace(/<img/g, '<img class="marginbottom20"')
                .replace(/<p style="text-align:justify;text-justify:inter-ideograph"><span style=";font-family:微软雅黑;font-size:19px">&nbsp;/g, '<p class="formatted"></p>')
                .replace(/<br\/>/g, '<p class="textnext"></p>')
                .replace(/&nbsp; /g, '')
                .replace(/&nbsp;/g, '')
            console.log('富文本', desc1)
            try {
                WxParse.wxParse('newsDesc', 'html', desc1, that, 16);
            } catch {
                WxParse.wxParse('newsDesc', 'html', "<p></p>", that, 16);
            }

            that.setData({
                newsDetails: res,
                pariseNum: res.praiseNumber,
                isPraised: res.isPraised
            })
        })
        common.getCommentList(that.data.id, 1).then(data => {
            that.setData({
                commentslist: data.list.slice(0, 1),
                commentNum: data.num,
            })
        })
    },
    //通过标签获取推荐的新闻
    getRecommendList: function (tags, self) {
        let that = this;
        api.Index.getRecommendList.reqData["tags"] = tags;
        api.Index.getRecommendList.reqData["self"] = self;
        util.request(api.Index.getRecommendList.reqUrl, api.Index.getRecommendList.reqData, api.Index.getRecommendList.reqType).then(function (res) {
            that.setData({
                newslist: res.data,
            })
        });
    },
    //获取评论列表
    commentslist: function () {
        let that = this;
        api.Index.commentslist.reqData["open_id"] = app.globalData.open_id;
        api.Index.commentslist.reqData["type"] = that.data.type;
        api.Index.commentslist.reqData["content_id"] = that.data.id;
        api.Index.commentslist.reqData.page = 1;
        api.Index.commentslist.reqData["limit"] = 2;
        util.request(api.Index.commentslist.reqUrl, api.Index.commentslist.reqData, api.Index.commentslist.reqType).then(function (res) {
            var commentslist = res.data;
            commentslist.forEach((obj, index) => {
                if (that.data.getMyPraise.includes(Number(obj.id)) == true) {
                    obj.getMyPraise = 1;
                } else {
                    obj.getMyPraise = 0;
                }
            });
            that.setData({
                commentslist: commentslistcommentslist,
            })
        });
    },
    onLoad: function (options) {
 
        let that = this;
        if (options.share && options.share == 1) {
            that.setData({
                share: 1
            })
        }

        that.setData({
            id: options.id
        })
    },
    onReady: function () {
        
    },


    onShow: function () {
        let that = this;
        console.log(app,"app")
        // app.wxLogin()
        if(app.globalData.userInfo.avatarUrl==''){
            wx.showModal({
                title: '提示',
                content: '是否前往我的页面登陆',
                success (res) {
                  if (res.confirm) {
                    wx.switchTab({
                        url: '/pages/my/index/index',
                      })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
        }
        if (app.globalData.open_id == "") {
            app.getOpenid().then(function (res) {

                if (res == 1) {
                    that.setData({
                        wxUserInfo: app.globalData.userInfo
                    })
                    WxParse.wxParse('newsDesc', 'html', "", that, 16);
                    // that.getMyPraiseCon();
                    that.newsDetails();
                    common.getNewsList('', '', 1, '', 1, res => {
                        console.log('推荐新闻列表', res)
                        that.setData({
                            newslist: res.list
                        })
                    })
                }
            });
        } else {
            that.setData({
                wxUserInfo: app.globalData.userInfo
            })
            WxParse.wxParse('newsDesc', 'html', "", that, 16);
            // that.getMyPraiseCon();
            that.newsDetails();
            common.getNewsList('', '', 1, '', 1, res => {
                console.log('推荐新闻列表', res)
                that.setData({
                    newslist: res.list
                })
            })
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
    onReachBottom: function () {},
    onUnload: function () {
        // 页面关闭
    },
    onShareAppMessage: function (options) {
        var that = this;
        common.shareContent(that.data.id, 1).then(res => {})
        // 设置菜单中的转发按钮触发转发事件时的转发内容
        var shareObj = {
            // 默认是小程序的名称(可以写slogan等)
            title: that.data.newsDetails.title,
            // 默认是当前页面，必须是以‘/’开头的完整路径
            path: '/pages/index/news_details/news_details?share=1&id=' + that.data.id,
            //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
            imageUrl: that.data.newsDetails.imagePath,
            // 转发成功之后的回调
            success: function (res) {
                console.log("分享成功")
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