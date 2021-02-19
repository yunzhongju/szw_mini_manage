const util = require('../utils/util.js');
const api = require('../config/api.js');
const app = getApp();

//评论点赞
function CommentPraise(open_id, comment_id) {
    console.log(open_id,comment_id);
    if (!app.globalData.userInfo.avatarUrl) {
        util.alert("请前往我的页面授权")
        return false;
    }
    api.Index.CommentPraise.reqData["open_id"] = open_id;
    api.Index.CommentPraise.reqData["comment_id"] = comment_id; //所属评论编号
    util.request(api.Index.CommentPraise.reqUrl, api.Index.CommentPraise.reqData, api.Index.CommentPraise.reqType).then(function (res) {
        const pages = getCurrentPages()
        const perpage = pages[pages.length - 1]
        perpage.onShow()
    });
}
//取消点赞
function CommentCancenl(open_id, comment_id) {
    
    if (!app.globalData.userInfo.avatarUrl) {
        util.alert("请前往我的页面授权")
        return false;
    }
    api.Index.CommentCancenl.reqData["open_id"] = open_id;
    api.Index.CommentCancenl.reqData["comment_id"] = comment_id; //所属评论编号
    util.request(api.Index.CommentCancenl.reqUrl, api.Index.CommentCancenl.reqData, api.Index.CommentCancenl.reqType).then(function (res) {
        const pages = getCurrentPages()
        const perpage = pages[pages.length - 1]
        perpage.onShow()
    });
}
//评论内容点赞
function CommentPraiseCon(open_id, type, content_id) {
    if (!app.globalData.userInfo.avatarUrl) {
        util.alert("请前往我的页面授权")
        return false;
    }
    api.Index.CommentPraiseCon.reqData["open_id"] = open_id;
    api.Index.CommentPraiseCon.reqData["type"] = type; //信息类型：1-新闻，2-视频,3-社区之声
    api.Index.CommentPraiseCon.reqData["content_id"] = content_id; //话题编号
    util.request(api.Index.CommentPraiseCon.reqUrl, api.Index.CommentPraiseCon.reqData, api.Index.CommentPraiseCon.reqType).then(function (res) {
        // const pages = getCurrentPages()
        // const perpage = pages[pages.length - 1]
        // perpage.onShow()
    });
    console.log('test');
}
//取消内容点赞
function CommentCancenlCon(open_id, type, content_id) {
    if (!app.globalData.userInfo.avatarUrl) {
        util.alert("请前往我的页面授权")
        return false;
    }
    api.Index.CommentCancenlCon.reqData["open_id"] = open_id;
    api.Index.CommentCancenlCon.reqData["type"] = type; //信息类型：1-新闻，2-视频,3-社区之声
    api.Index.CommentCancenlCon.reqData["content_id"] = content_id; //话题编号
    util.request(api.Index.CommentCancenlCon.reqUrl, api.Index.CommentCancenlCon.reqData, api.Index.CommentCancenlCon.reqType).then(function (res) {
        // const pages = getCurrentPages()
        // const perpage = pages[pages.length - 1]
        // perpage.onShow()
        
    });
}
//获取评论量
var commentNumber = (type, content_id) => {
    api.Index.commentNumber.reqData["type"] = type; //评论内容类型:1-新闻，2-视频,3-社区之声
    api.Index.commentNumber.reqData["content_id"] = content_id; //新闻或视频编号
    return new Promise(function (resolve) {
        util.request(api.Index.commentNumber.reqUrl, api.Index.commentNumber.reqData, api.Index.commentNumber.reqType).then(function (res) {
            resolve(res.data);
        });
    });
};
//获取内容点赞数量
var getPraiseNumber = (type, content_id) => {
    api.Index.getPraiseNumber.reqData["type"] = type; //评论内容类型:1-新闻，2-视频,3-社区之声
    api.Index.getPraiseNumber.reqData["content_id"] = content_id; //新闻或视频编号
    return new Promise(function (resolve) {
        util.request(api.Index.getPraiseNumber.reqUrl, api.Index.getPraiseNumber.reqData, api.Index.getPraiseNumber.reqType).then(function (res) {
            resolve(res.data);
        });
    });
};
//跳转到新闻详情页面
function TaptoNews_details(id) {
    wx.navigateTo({
        url: "/pages/index/news_details/news_details?id=" + id,
    });
}
//跳转到活动详情页面
function TaptoActive_details(id) {
    wx.navigateTo({
        url: "/pages/index/active_details/active_details?id=" + id,
    });
}
//跳转到视频详情页面
function TaptoVideo_details(id) {
    wx.navigateTo({
        url: "/pages/index/video_details/video_details?id=" + id,
    });
}
//跳转到专题详情页面
function TaptoProjects_details(id) {
    wx.navigateTo({
        url: "/pages/index/projects_details/projects_details?id=" + id,
    });
}
//跳转到全部专题页面
function TaptoProjects(id) {
    wx.navigateTo({
        url: "/pages/index/projects/projects",
    });
}
//跳转到全部评论页面
function TaptoAll_comments(type, content_id, st_id, praise_number) {
    wx.navigateTo({
        url: "/pages/index/all_comments/all_comments?type=" + type + "&content_id=" + content_id + "&st_id=" + st_id + "&praise_number=" + praise_number,
    });
    //跳转到全部评论页面
    // TaptoAll_comments: function(e) {
    // commonJs.TaptoAll_comments(1,this.data.content_id);
    // },
}
//跳转到发布页面 话题1 评论2
function TaptoPublish(id, type) {
    wx.navigateTo({
        url: "/pages/my/publish/publish?id=" + id + "&type=" + type,
    });
}
//跳转到市民发声页面
function TaptoPeople_voice(data) {
    console.log(data)
    // var data ={
    //     id:id,
    //     title:title
    // }
    // JSON.stringify(s)
    var item = JSON.stringify(data)
    console.log(item)
    wx.navigateTo({
        url: "/pages/property/people_voice/people_voice?data=" + item,
    });
}
//跳转到话题详情页面
function TaptoTopic_details(id) {
    wx.navigateTo({
        url: "/pages/property/topic_details/topic_details?id=" + id,
    });
}
//跳转到话题发布页面
function TaptoRelease_topic(id) {
    if (!app.globalData.userInfo.avatarUrl) {
        util.alert("请前往我的页面授权")
        return false;
    }
    if (id) {
        wx.navigateTo({
            url: "/pages/property/release_topic/release_topic?id=" + id,
        });
    } else {
        wx.navigateTo({
            url: "/pages/property/release_topic/release_topic",
        });
    }
    //跳转到话题发布页面
    // TaptoRelease_topic: function(e) {
    //     commonJs.TaptoRelease_topic();
    // },
}

//跳转到选择地址TaptoSwitch_position
function TaptoSwitch_position(type) {
    // type=index 从首页进入 / release_topic 从话题发布页面进入
    wx.navigateTo({
        url: "/pages/index/switch_position/switch_position?type=" + type
    });
}
//跳转到全部社区
function TaptoAll_shequ(code) {
    wx.navigateTo({
        url: "/pages/index/all_shequ/all_shequ?code=" + code
    });
}
//跳转到社区注册审核中
function TaptoAuditing() {
    wx.navigateTo({
        url: "/pages/my/auditing/auditing"
    });
}
//跳转到社区详情
function TaptoCommunity_details(id) {
    wx.navigateTo({
        url: "/pages/index/community_details/community_details?id=" + id
    });
}
//跳转到首页
function TaptoIndex() {
    wx.switchTab({
        url: "/pages/index/index/index"
    });
}
// 点击按钮获取用户信息
function bindGetUserInfo(e) {
    if (e.detail.userInfo) {
        app.wxLogin();
    }
}
// 电话好啊没
function getPhoneNumber(e) {
    if (e.detail.encryptedData) {
        console.log(e)
        api.My.getUserPhone.reqData.encrypted_data = e.detail.encryptedData
        api.My.getUserPhone.reqData.vi = e.detail.iv
        api.My.getUserPhone.reqData.open_id = app.globalData.open_id
        console.log(api.My.getUserPhone.reqData)
    }
}
function getInfoByOpenID() {
    api.My.getInfoByOpenID.reqData.open_id = app.globalData.open_id


}
//跳转到文章详情
function pageToArticleDetail(articleId) {
    wx.navigateTo({
        url: "/pages/index/article_detail/article_detail?articleId=" + articleId
    })
}

//栏目列表跳文章列表
function ColPageToArticleList(channelId, name, url) {
    wx.navigateTo({
        url: `/pages/index/social_constructor/social_constructor?channelId=${channelId}&chname=${name}&url=${url}`
    })
}

module.exports = {
    CommentPraise,
    CommentCancenl,
    CommentPraiseCon,
    CommentCancenlCon,
    commentNumber,
    getPraiseNumber,
    TaptoNews_details,
    TaptoActive_details,
    TaptoVideo_details,
    TaptoProjects,
    TaptoProjects_details,
    TaptoAll_comments,
    TaptoPublish,
    TaptoPeople_voice,
    TaptoTopic_details,
    TaptoRelease_topic,
    TaptoSwitch_position,
    TaptoAll_shequ,
    TaptoAuditing,
    TaptoCommunity_details,
    TaptoIndex,
    bindGetUserInfo,
    getPhoneNumber,
    getInfoByOpenID,
    pageToArticleDetail,
    ColPageToArticleList
}