const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
const { BMapWX } = require('../../../utils/bmap-wx.min.js');
var app = getApp();
import common from '../../../config/newsAPI/common'
// pages/index/article_detail/article_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList:[],
    articleId: '',
    articleDetail: null,
    articleDetails: '',
    String: '',
    isPraised:false
  },

  /**
    * 栏目切换
    * @param event
    */

  //点赞文章
  likeArticle(e) {
    let id =e.currentTarget.dataset.articleid
    common.praiseContent(id,1).then(res=>{
      this.setData({
        isPraised:true
      })
    })
    // console.log('点赞参数', e.currentTarget.dataset.articleid, app.globalData.open_id)
    // api.Index.like_article.reqData.articleId = e.currentTarget.dataset.articleid
    // api.Index.like_article.reqData.openid = app.globalData.open_id
    // util.requestAll(api.Index.like_article.reqUrl, api.Index.like_article.reqData, api.Index.like_article.reqType).then(res => {
    //   console.log(res)
    //   if (res.status == 1) {
    //     wx.showToast({
    //       title: res.msg,
    //       icon: 'none'
    //     })
    //     this.setData({
    //       ["articleDetail.isAdmire"]: true
    //     })
    //   }
    // })
  },

  //获取文章详情
  article_detail(articleId) {
    common.getNewsDetails(articleId,res=>{
      console.log('文章详情',res)
      let string = res.content.replace(/<html/g, '<div')
          .replace(/\/html/g, '/div')
          .replace(/<body/g, '<div')
          .replace(/\/body/g, '/div')
          .replace(/<img/gi,
            '< img mode="widthFix" style="max-width:100%;display:block" class="imgsty" ')
        this.setData({
          String: string
        })
        this.setData({
          articleDetail: res,
          isPraised:res.isPraised
        })
    })
    // api.Index.article_detail.reqData.articleId = articleId
    // api.Index.article_detail.reqData.openid = app.globalData.open_id
    // util.requestAll(api.Index.article_detail.reqUrl, api.Index.article_detail.reqData, api.Index.article_detail.reqType).then(res => {
    //   if (res.status == 1) {
    //     res.data.createtime = res.data.createtime.slice(0, -3)

    //     let string = res.data.content.replace(/<html/g, '<div')
    //       .replace(/\/html/g, '/div')
    //       .replace(/<body/g, '<div')
    //       .replace(/\/body/g, '/div')
    //       .replace(/<img/gi,
    //         '< img mode="widthFix" style="max-width:100%;display:block" class="imgsty" ')
    //     this.setData({
    //       String: string
    //     })
    //     this.setData({
    //       articleDetail: res.data
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      articleId: options.articleId || ''
    })
    console.log('test啥',options)
    this.article_detail(this.data.articleId)
  //   common.getNewsDetails('', this.data.articleId, '', '', 1, res => {
  //     console.log('新闻列表', res)
  //     this.article_detail(res.list[0].id)
  //     this.setData({
  //         articleList: res.list
  //     })
  // })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.articleDetail()
 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    console.log('分享参数', options.target.dataset)
    let title = options.target.dataset.title, url = options.target.dataset.url, path = "";
    if (options.target.dataset.name == 'articleshare') { //文章分享
      path = '/pages/index/article_detail/article_detail?articleId=' + options.target.dataset.articeleid;
    }

    // 设置菜单中的转发按钮触发转发事件时的转发内容
    let shareObj = {
      // 默认是小程序的名称(可以写slogan等)
      title: title,
      // 默认是当前页面，必须是以‘/’开头的完整路径
      path: path,
      //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      imageUrl: url,
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
    return shareObj;

  }
})