// let _HOST = 'http://132.232.74.143:4440'
// let _HOST = "http://192.168.0.6:80"
let _HOST = 'https://api.sqfzzl.com:4443'

export default {
  toPay: _HOST + '/wxa/order/toPay', //微信支付
  payNotify: _HOST + '/wxa/order/payNotify', //微信支付回调
  getCsinform: _HOST + '/web/csinform/getCsinform', //获取客服信息

  doLogin: _HOST + '/wxa/user/doLogin', //用微信返回的code值换取访问凭证
  getWxInfo: _HOST + '/wxa/user/getWxInfo', //获取用户微信信息
  getUserInfo: _HOST + '/wxa/user/getUserInfo', //获取用户信息
  getCommentList: _HOST + '/wxa/comment/getCommentList', //获取新闻、视频、社区之声评论列表
  praiseContent: _HOST + '/wxa/user/praiseContent', //点赞内容
  canclePraiseContent: _HOST + '/wxa/user/canclePraiseContent', //取消点赞内容
  praiseComment: _HOST + '/wxa/comment/praiseComment', //点赞评论
  canclePraiseComment: _HOST + '/wxa/comment/canclePraiseComment', //取消点赞评论
  getChannelList: _HOST + '/wxa/news/getChannelList', //获取栏目列表
  addComment: _HOST + '/wxa/comment/addComment', //添加评论
  shareContent: _HOST + '/wxa/user/shareContent', //分享内容
  getUpToken: _HOST + '/token/getUpToken', //获取七牛云上传凭证
  getAreas: _HOST + '/common/getAreas', //获取行政区划
  getNewsList: _HOST + '/wxa/news/getNewsList', //获取新闻列表
  getNewsDetailById: _HOST + '/wxa/news/getNewsDetailById', //获取新闻详情
  getDistrictImage: _HOST + '/wxa/news/getDistrictImage', //获取封面摄影
  getWxappActivities: _HOST + '/wxapp/vote/getWxappActivities', //获取小程序端投票活动列表
  getItemDetailByIdByShare: _HOST + '/wxapp/vote/getItemDetailByIdByShare', //分享链接获取当前投票项详情（小程序端）
  getActivityDetailById: _HOST + '/wxapp/vote/getActivityDetailById', //获取投票活动详细（pc小程序通用）
  doVote: _HOST + '/wxapp/vote/doVote', // 投票
  getItemDetailById: _HOST + '/wxapp/vote/getItemDetailById', //小程序端获取当前投票项详情
  getMyVoteRecords: _HOST + '/wxapp/vote/getMyVoteRecords', //获取我的投票记录列表
  getItemSearchResult: _HOST + '/wxapp/vote/getItemSearchResult', //小程序端搜索投票项
  getMySqManagerDetail: _HOST + '/wxapp/sqmanager/getMySqManagerDetail', //获取我的负责人申请记录
  //我的页面
  My: {

    getUnreadMessageCount: _HOST + '/wxa/user/getUnreadMessageCount', //获取未读消息数
    getMyMessage: _HOST + '/wxa/user/getMyMessage', //获取我的消息
    getMyPulish: _HOST + '/wxa/user/getMyPulish', //获取我发布的
    getMyPraiseRecord: _HOST + '/wxa/user/getMyPraiseRecord', //获取我赞过的
    getMybrowseRecord: _HOST + '/wxa/user/getMybrowseRecord', //获取我的浏览记录
    getPhoneNumber: _HOST + '/wxa/user/getPhoneNumber', //获取用户手机号
    saveApplySqManager: _HOST + '/wxapp/sqmanager/saveApplySqManager', //新增或修改社区负责人申请信息
  },
  //民声页面
  PVoice: {
    getCommunityVoiceList: _HOST + '/wxa/voice/getCommunityVoiceList', //获取社区之声列表
    getCommunityVoiceDetail: _HOST + '/wxa/voice/getCommunityVoiceDetail', //获取社区之声详情
    publishCommunityVoice: _HOST + '/wxa/voice/publishCommunityVoice', //发布社区之声
  },
  //关注页面
  Attention: {
    getMyFollow: _HOST + '/wxa/news/getMyFollow', //获取我的关注
  },
  //首页
  index: {
    getBannerList: _HOST + '/web/banner/getBannerList', //获取广告图列表
    getVideoList: _HOST + '/wxa/video/getVideoList', //获取视频列表
    getVideoDetailById: _HOST + '/wxa/video/getVideoDetailById', //获取视频详情
  },
  // 直播
  live: {
    createLiveRoom: _HOST + '/wxa/live/createLiveRoom', //创建直播间
    followAnchor: _HOST + '/wxa/live/followAnchor', //关注或取消关注主播
    getMyFollowList: _HOST + '/wxa/live/getMyFollowList', //获取我的关注列表
    getLiveRoomList: _HOST + '/wxa/live/getLiveRoomList', //获取直播间列表
    addLiveViews: _HOST + '/wxa/live/addLiveViews', //观看数+1
    getAnchorInfo: _HOST + '/wxa/live/getAnchorInfo', //获取主播信息

    cancleSubscribeLive: _HOST + '/wxa/live/cancleSubscribeLive', //取消直播预约
    getLiveList: _HOST + '/wxa/live/getLiveList', //获取直播和回放列表
    subscribeLive: _HOST + '/wxa/live/subscribeLive', //预约直播
    hasOnLiveRoom: _HOST + '/wxa/live/hasOnLiveRoom', //判断是否已有直播间

  }
}