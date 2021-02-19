import URL from './baseURL'
import {
  nRequest,
  nRequestAll
} from '../../utils/newsRequest/newsRequest'

//用微信返回的code值换取访问凭证
export function doLoginAPI(data) {
  return nRequest(URL.doLogin, data, 'GET')
}
//获取用户信息
export function getUserInfoAPI(data) {
  return nRequestAll(URL.getUserInfo, data, 'GET')
}
//获取用户微信信息
export function getWxInfoAPI(data) {
  return nRequestAll(URL.getWxInfo, data)
}
//获取新闻、视频、社区之声评论列表
export function getCommentListAPI(data) {
  return nRequestAll(URL.getCommentList, data, 'GET')
}
//点赞内容
export function praiseContentAPI(data) {
  return nRequestAll(URL.praiseContent, data)
}
//取消点赞内容
export function canclePraiseContentAPI(data) {
  return nRequestAll(URL.canclePraiseContent, data)
}
//点赞评论
export function praiseCommentAPI(data) {
  return nRequestAll(URL.praiseComment, data)
}
//取消点赞评论
export function canclePraiseCommentAPI(data) {
  return nRequestAll(URL.canclePraiseComment, data)
}
//获取栏目列表
export function getChannelListAPI(data) {
  return nRequestAll(URL.getChannelList, data, 'GET')
}
//添加评论
export function addCommentAPI(data) {
  return nRequestAll(URL.addComment, data)
}
//分享内容
export function shareContentAPI(data) {
  return nRequestAll(URL.shareContent, data)
}
//获取上传token
export function getUpTokenAPI(data) {
  return nRequestAll(URL.getUpToken, data, 'GET')
}
//获取行政区划
export function getAreasAPI(data) {
  return nRequestAll(URL.getAreas, data, 'GET')
}
//获取客服信息
export function getCsinformAPI(data) {
  return nRequestAll(URL.getCsinform, data, 'GET')
}
//获取新闻列表
export function getNewsListAPI(data) {
  return nRequestAll(URL.getNewsList, data, 'GET')
}
//获取新闻详情
export function getNewsDetailsAPI(data) {
  return nRequestAll(URL.getNewsDetailById, data, 'GET')
}
//获取banner
export function getBannerListAPI(data) {
  return nRequestAll(URL.index.getBannerList, data, 'GET')
} //获取视频列表
export function getVideoListAPI(data) {
  return nRequestAll(URL.index.getVideoList, data, 'GET')
}
//获取视频详情
export function getVideoDetailAPI(data) {
  return nRequestAll(URL.index.getVideoDetailById, data, 'GET')
}
//社区封面摄影
export function getDistrictImageAPI(data) {
  return nRequestAll(URL.getDistrictImage, data, 'GET')
}
//获取投票活动列表
export function getWxappActivitiesAPI(data) {
  return nRequestAll(URL.getWxappActivities, data, 'GET')
}
//投票活动详情
export function getActivityDetailByIdAPI(data) {
  return nRequestAll(URL.getActivityDetailById, data, 'GET')
}
//投票
export function doVoteAPI(data) {
  return nRequestAll(URL.doVote, data)
}
//投票项详情
export function getItemDetailByIdAPI(data) {
  return nRequestAll(URL.getItemDetailById, data, "GET")
}
//分享链接获取当前投票项详情（小程序端）
export function getItemDetailByIdByShareAPI(data) {
  return nRequestAll(URL.getItemDetailByIdByShare, data, "GET")
}
//获取我的投票记录
export function getMyVoteRecordsAPI(data) {
  return nRequestAll(URL.getMyVoteRecords, data, 'GET')
}
//搜索投票项
export function getItemSearchResultAPI(data) {
  return nRequestAll(URL.getItemSearchResult, data, 'GET')
}
//获取申请记录
export function getMySqManagerDetailAPI(data) {
  return nRequestAll(URL.getMySqManagerDetail, data, 'GET')
}
//微信支付
export function toPayAPI(data) {
  return nRequestAll(URL.toPay, data)
}
//微信支付回调
export function payNotifyAPI(data) {
  return nRequestAll(URL.payNotify, data)
}