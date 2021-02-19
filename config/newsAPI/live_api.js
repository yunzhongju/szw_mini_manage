import URL from './baseURL'
import {
  nRequestAll
} from '../../utils/newsRequest/newsRequest'

//创建直播间
export function createLiveRoomAPI(data) {
  return nRequestAll(URL.live.createLiveRoom, data)
}
//关注或取消关注主播
export function followAnchorAPI(data) {
  return nRequestAll(URL.live.followAnchor, data)
}
//获取我的关注列表
export function getMyFollowListAPI(data) {
  return nRequestAll(URL.live.getMyFollowList, data, 'GET')
}
//获取主播信息
export function getAnchorInfoAPI(data) {
  return nRequestAll(URL.live.getAnchorInfo, data, 'GET')
}
//获取直播间列表
export function getLiveRoomListAPI(data) {
  return nRequestAll(URL.live.getLiveRoomList, data, 'GET')
}
//观看数+1
export function addLiveViewsAPI(data) {
  return nRequestAll(URL.live.addLiveViews, data)
}

//获取直播和回放列表
export function getLiveListAPI(data) {
  return nRequestAll(URL.live.getLiveList, data, 'GET')
}
//取消直播预约
export function cancleSubscribeLiveAPI(data) {
  return nRequestAll(URL.live.cancleSubscribeLive, data, 'GET')
}
//预约直播
export function subscribeLiveAPI(data) {
  return nRequestAll(URL.live.subscribeLive, data, 'GET')
}
//判断是否已有直播间
export function hasOnLiveRoomAPI(data) {
  return nRequestAll(URL.live.hasOnLiveRoom, data, 'GET')
}