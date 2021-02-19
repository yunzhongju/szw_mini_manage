const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
import common from '../../../config/newsAPI/common'
import {
    getAccessToken,
    msg_sec_check
} from '../../../config/newsAPI/token'
import {
    getCommunityVoiceDetailAPI
} from '../../../config/newsAPI/PVoice_api'
var app = getApp();
Page({
    data: {
        access_token: '',
        //new
        voiceDetail: '',
        voiceCommentList: [],
        page: 1,
        contentIsPraise: '',
        contentPraiseNum: '',
        byUserId: '',

        wxUserInfo: "",
        id: "",
        type: "3",
        st_id: "0", //社区之声的专题编号传0
        wxUserInfo: "",
        communityvoiceDetails: [],
        read_number: "0",
        commentslist: [],
        maxPage: "",
        comments_input: false,
        special_topic_info_id: "",
        parent_id: "",
        content: "",
        by_comment_id: "",
        getMyPraise: [],
        getMyPraiseCon: [],
        commentNum: "",
        imglist: [],
        share: 0
    },
    bindGetUserInfo: function (e) {
        commonJs.bindGetUserInfo(e)
    },
    //跳转到首页
    TaptoIndex: function (e) {
        commonJs.TaptoIndex();
    },
    /**   
     * 预览图片  
     */
    previewImage: function (e) {
        var current = e.target.dataset.src;
        wx.previewImage({
            current: current, // 当前显示图片的http链接  
            urls: this.data.imglist // 需要预览的图片http链接列表  
        })
    },
    //跳转到市民发声页面
    // TaptoPeople_voice: function (e) {
    //     commonJs.TaptoPeople_voice(e.currentTarget.dataset.id);
    // },

    //跳转到话题详情页面
    // TaptoTopic_details: function (e) {
    //     commonJs.TaptoTopic_details(e.currentTarget.dataset.id);
    // },

    //评论点赞
    TapCommentPraise: function (e) {
        // commonJs.CommentPraise(app.globalData.open_id, e.currentTarget.dataset.id);
        let op={
            contentId:this.data.voiceDetail.id,
            commentId:e.currentTarget.dataset.id,
            msgType:'2',
            byUserId :e.currentTarget.dataset.byuserid,
            infoType :'3'
        }
        common.praiseComment(op).then(res => {
            let id = e.currentTarget.dataset.id
            let arr = this.handleCommentList(this.data.voiceCommentList, id, 1)
            this.setData({
                voiceCommentList: arr
            })
        })

    },
    //取消点赞
    TapCommentCancenl: function (e) {
        // commonJs.CommentCancenl(app.globalData.open_id, e.currentTarget.dataset.id);
        common.canclePraiseComment(e.currentTarget.dataset.id).then(res => {
            let id = e.currentTarget.dataset.id
            let arr = this.handleCommentList(this.data.voiceCommentList, id, 2)
            this.setData({
                voiceCommentList: arr
            })
        })

    },
    //评论内容点赞
    TapCommentPraiseCon: function (e) {
        // commonJs.TapCommentPraiseCon(app.globalData.open_id, this.data.type, this.data.id);
        common.praiseContent(this.data.id, 3).then(res => {
            let num = this.data.contentPraiseNum += 1
            this.setData({
                contentPraiseNum: num,
                contentIsPraise: !this.data.contentIsPraise
            })
        })
    },
    //取消内容点赞
    TapCommentCancenlCon: function (e) {
        // commonJs.CommentCancenlCon(app.globalData.open_id, this.data.type, this.data.id);
        common.canclePraiseContent(this.data.id, 3).then(res => {
            let num = this.data.contentPraiseNum -= 1
            this.setData({
                contentPraiseNum: num,
                contentIsPraise: !this.data.contentIsPraise
            })
        })
    },
    //点击立即回复ta 获取输入框焦点
    TapReply: function (e) {
        console.log('获取焦点e', e)
        this.setData({
            comments_input: true,
            by_comment_id: e.currentTarget.dataset.id,
            parent_id: e.currentTarget.dataset.parentId,
            byUserId: e.currentTarget.dataset.byuserid
        });
    },
    //回复 获取输入框焦点
    bindfocusFun: function (e) {
        this.setData({
            sendCommentsHeight: parseFloat(e.detail.height * 2 ),
        });
    },
    //内容 获取输入框焦点
    bindfocusConFun: function (e) {
        this.setData({
            sendCommentsConHeight: parseFloat(e.detail.height * 2 ),
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
        // msg_sec_check(this.data.access_token, this.data.content, resp => {
        //     if (resp == 0) {
        //         common.addComment(this.data.id, 3, this.data.byUserId, this.data.content, '', this.data.parent_id).then(res => {
        //             common.getCommentList(this.data.id, 3).then(resp => {
        //                 this.setData({
        //                     voiceCommentList: resp.list,
        //                     commentNum: resp.num
        //                 })
        //             })
        //         })
        //     }
        // })
        common.addComment(this.data.id, 3, this.data.byUserId, this.data.content, '', this.data.parent_id).then(res => {
            common.getCommentList(this.data.id, 3).then(resp => {
                this.setData({
                    voiceCommentList: resp.list,
                    commentNum: resp.num
                })
            })
        })
        // this.addComment();
    },
    //内容 点击发送
    sendCommentsCon: function (e) {
        this.setData({
            parent_id: "0",
            by_comment_id: "",
            content: e.detail.value,
        });
        //添加评论
        // console.log('添加评论的e', e)
        // msg_sec_check(this.data.access_token, this.data.content,resp=>{
        //     if(resp==0){
        //         common.addComment(this.data.id, 3, 0, this.data.content, '').then(res => {
        //             common.getCommentList(this.data.id, 3).then(resp => {
        //                 this.setData({
        //                     voiceCommentList: resp.list,
        //                     commentNum: resp.num
        //                 })
        //             })
        //         })
        //     }
        // })
        common.addComment(this.data.id, 3, 0, this.data.content, '').then(res => {
            if(res.status==-1){
                wx.showToast({
                  title: res.msg,
                  icon:'none'
                })
                return
            }
            common.getCommentList(this.data.id, 3).then(resp => {
                this.setData({
                    voiceCommentList: resp.list,
                    commentNum: resp.num
                })
            })
        })
        // this.addComment();
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
        api.Index.addComment.reqData["content_id"] = that.data.id; //新闻或视频编号
        api.Index.addComment.reqData["by_comment_id"] = that.data.by_comment_id; //（选填）被评论编号
        util.request(api.Index.addComment.reqUrl, api.Index.addComment.reqData, api.Index.addComment.reqType).then(function (res) {
            const pages = getCurrentPages()
            const perpage = pages[pages.length - 1]
            perpage.onShow()
        });
    },
    //获取我赞过的评论编号
    // getMyPraise: function () {
    //     let that = this;
    //     api.Index.getMyPraise.reqData["open_id"] = app.globalData.open_id;
    //     util.request(api.Index.getMyPraise.reqUrl, api.Index.getMyPraise.reqData, api.Index.getMyPraise.reqType).then(function (res) {
    //         var getMyPraise = [];
    //         res.data.forEach((data) => {
    //             getMyPraise.push(data.comment_id)
    //         });
    //         that.setData({
    //             getMyPraise: getMyPraise
    //         })
    //         api.Index.commentslist.reqData.page = 1;
    //         that.commentslist();
    //     });
    // },

    //获取评论列表
    // commentslist: function () {
    //     let that = this;
    //     api.Index.commentslist.reqData["open_id"] = app.globalData.open_id;
    //     api.Index.commentslist.reqData["type"] = that.data.type;
    //     api.Index.commentslist.reqData["content_id"] = that.data.id;
    //     if (that.data.maxPage != "" && api.Index.commentslist.reqData.page > that.data.maxPage) {
    //         return;
    //     }
    //     util.request(api.Index.commentslist.reqUrl, api.Index.commentslist.reqData, api.Index.commentslist.reqType).then(function (res) {
    //         let u = res.data,
    //             vl = that.data.commentslist;
    //         if (u.length > 0) {
    //             u.forEach((obj) => {
    //                 if (that.data.getMyPraise.includes(Number(obj.parent_id)) == true) {
    //                     obj.getMyPraise = 1;
    //                 } else {
    //                     obj.getMyPraise = 0;
    //                 }
    //                 obj.childs.forEach((obj1) => {
    //                     if (that.data.getMyPraise.includes(Number(obj1.parent_id)) == true) {
    //                         obj1.getMyPraise = 1;
    //                     } else {
    //                         obj1.getMyPraise = 0;
    //                     }
    //                 });
    //             });
    //             if (api.Index.commentslist.reqData.page > 1) vl = vl.concat(u)
    //             else vl = u;
    //         }
    //         let maxPage = parseInt(res.count / res.limit) + ((res.count % res.limit) > 0 ? 1 : 0);
    //         that.setData({
    //             maxPage: maxPage,
    //             commentslist: vl,
    //         })
    //     });
    // },

    //获取我赞过的内容编号列表
    // getMyPraiseCon: function () {
    //     let that = this;
    //     api.Index.getMyPraiseCon.reqData["open_id"] = app.globalData.open_id;
    //     api.Index.getMyPraiseCon.reqData["type"] = that.data.type;
    //     util.request(api.Index.getMyPraiseCon.reqUrl, api.Index.getMyPraiseCon.reqData, api.Index.getMyPraiseCon.reqType).then(function (res) {
    //         var getMyPraiseCon = [];
    //         res.data.forEach((data) => {
    //             getMyPraiseCon.push(data.content_id)
    //         });
    //         that.setData({
    //             getMyPraiseCon: getMyPraiseCon
    //         })

    //         that.communityvoiceDetails();
    //     });
    // },


    //获取社区之声详情
    // communityvoiceDetails: function () {
    //     let that = this;
    //     api.property.communityvoiceDetails.reqData["id"] = that.data.id;
    //     api.property.communityvoiceDetails.reqData["open_id"] = app.globalData.open_id;
    //     util.request(api.property.communityvoiceDetails.reqUrl, api.property.communityvoiceDetails.reqData, api.property.communityvoiceDetails.reqType).then(function (res) {
    //         if (that.data.getMyPraiseCon.includes(Number(res.data.id)) == true) {
    //             res.data.getMyPraise = 1;
    //         } else {
    //             res.data.getMyPraise = 0;
    //         }
    //         //获取评论量
    //         commonJs.commentNumber(that.data.type, res.data.id).then(function (rescommentNumber) {
    //             that.setData({
    //                 commentNum: rescommentNumber
    //             })
    //         })
    //         res.data.image_path = JSON.parse(res.data.image_path)
    //         that.setData({
    //             communityvoiceDetails: res.data,
    //             imglist: res.data.image_path,
    //         })

    //         var number = res.data.read_number
    //         if (number > 10000) {
    //             var num = Math.ceil(number / 10000 * 10) / 10
    //             that.setData({
    //                 read_number: num + "万",
    //             })
    //         } else {
    //             that.setData({
    //                 read_number: number,
    //             })
    //         }

    //     });
    // },

    onLoad: function (options) {
        // getAccessToken(res => {
        //     this.setData({
        //         access_token: res
        //     })
        // });
        console.log('options', options)
        let that = this;
        // that.getCommunityVoiceDetail(options.id)
        if (options.share && options.share == 1) {
            that.setData({
                share: 1
            })
        }
        that.setData({
            id: options.id,
        })
    },
    onReady: function () {},
    onShow: function () {
        let that = this;
        if (app.globalData.open_id == "") {
            app.getOpenid().then(function (res) {
                console.log('getopenid', res)
                if (res == 1) {
                    that.setData({
                        wxUserInfo: app.globalData.userInfo
                    })
                    that.getCommunityVoiceDetail(that.data.id)
                    common.getCommentList(that.data.id, 3).then(resp => {
                        this.setData({
                            voiceCommentList: resp.list,
                            commentNum: resp.num
                        })
                    })
                    // that.getMyPraiseCon();
                    // that.getMyPraise();
                }
            });
        } else {
            that.setData({
                wxUserInfo: app.globalData.userInfo
            })
            that.getCommunityVoiceDetail(that.data.id)
            common.getCommentList(that.data.id, 3).then(resp => {
                this.setData({
                    voiceCommentList: resp.list,
                    commentNum: resp.num
                })
            })
            // that.getMyPraiseCon();
            // that.getMyPraise();
        }
    },
    onHide: function () {
        // 页面隐藏
    },
    onShareAppMessage: function (options) {
        var that = this;
        // api.share.topic_infoShare.reqData["open_id"] = app.globalData.open_id;
        // api.share.topic_infoShare.reqData["id"] = that.data.id;
        // util.request(api.share.topic_infoShare.reqUrl, api.share.topic_infoShare.reqData, api.share.topic_infoShare.reqType).then(function (res) {});
        common.shareContent(that.data.id, 3).then(res => {})
        // 设置菜单中的转发按钮触发转发事件时的转发内容
        var shareObj = {
            // 默认是小程序的名称(可以写slogan等)
            title: that.data.voiceDetail.title,
            // 默认是当前页面，必须是以‘/’开头的完整路径
            path: '/pages/property/topic_details/topic_details?share=1&id=' + that.data.id,
            //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
            imageUrl: '',
            // 转发成功之后的回调
            success: function (res) {
                if (res.errMsg == 'shareAppMessage:ok') {

                }
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
        // api.Index.commentslist.reqData.page += 1;
        // that.commentslist();
        that.data.page += 1
        common.getCommentList(that.data.id, 3, that.data.page, that.data.voiceCommentList).then(resp => {
            this.setData({
                voiceCommentList: resp.list,
                commentNum: resp.num
            })
        })
    },
    onUnload: function () {
        // 页面关闭
    },

    //新的
    //获取话题详情
    getCommunityVoiceDetail: function (id) {
        let params = {
            id: id,
            userId: app.globalData.userInfo.id
        }
        getCommunityVoiceDetailAPI(params).then(res => {
            console.log('详情', res)
            if (res.status == 1) {
                this.setData({
                    voiceDetail: res.data,
                    imglist: JSON.parse(res.data.imagePath),
                    contentIsPraise: res.data.isPraised,
                    contentPraiseNum: res.data.praiseNumber
                })
            }
        })
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