const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const bmap = require('../../../utils/bmap-wx.min.js');
const api = require('../../../config/api.js');
const {
  default: common
} = require('../../../config/newsAPI/common.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    channelList: [],
    channelId: '',
    chname: '',
    url: '',
    articleList: [],
    pageNo: 1,
    allowPull: false //允许上拉加载更多
  },

  /**
   * 栏目切换
   * @param event
   */

  //跳转到文章详情
  pageToArticleDetail(e) {
    let articleId = e.currentTarget.dataset.articleid
    common.getNewsList('', articleId, '', '', 1, res => {
      console.log('新闻列表', res)
      let id=null
      if(res.list.length!==0){
        id=res.list[0].id
        commonJs.pageToArticleDetail(id)
      }else{
        wx.showToast({
          title: '该栏目下暂时没有文章',
          icon:'none'
        })
      }
    })
  },

  //获取文章列表
  article_list(id, type = 'one') {
    common.getNewsList('', id, 0, '', 1, res => {
      console.log('新闻列表9999999', res)
      this.setData({
        articleList: res.list
      })
    })
    // api.Index.article_list.reqData.channelId = id
    // api.Index.article_list.reqData.pageNo = this.data.pageNo
    // api.Index.article_list.reqData.pageSize = 10
    // api.Index.article_list.reqData.openid = app.globalData.open_id
    // util.requestAll(api.Index.article_list.reqUrl, api.Index.article_list.reqData, api.Index.article_list.reqType).then(res => {
    //   console.log('栏目文章列表', res)
    //   if (res.status == 1 && type == 'one') {
    //     this.setData({
    //       articleList: res.data.list,
    //       allowPull: !res.data.lastPage
    //     })

    //   } else if (res.status == 1 && type == 'more') {
    //     this.setData({
    //       articleList: [...articleList, ...res.data.list],
    //       allowPull: !res.data.lastPage
    //     })
    //   }
    // })
  },

  onLoad: function (options) {
    console.log('options', options)
    this.setData({
      channelId: options.channelId || '',
      chname: options.chname || '',
      url: options.url || ''
    })
    // this.article_list(this.data.channelId)
    common.getChannelList(options.channelId).then(res => {
      console.log('new的channel', res)
      this.setData({
        channelList: res.list
      })
    })
  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },


  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },


  onShareAppMessage: function () {

  }
})