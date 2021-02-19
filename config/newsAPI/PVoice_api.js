import URL from './baseURL'
import {
  nRequestAll
} from '../../utils/newsRequest/newsRequest'

//获取栏目列表
export function getChannelListAPI(data) {
  return nRequestAll(URL.PVoice.getChannelList, data, 'GET')
}
//获取社区之声列表
export function getCommunityVoiceListtAPI(data) {
  return nRequestAll(URL.PVoice.getCommunityVoiceList, data, 'GET')
}
//获取社区之声详情
export function getCommunityVoiceDetailAPI(data) {
  return nRequestAll(URL.PVoice.getCommunityVoiceDetail, data, 'GET')
}
//发布社区之声
export function publishCommunityVoiceAPI(data) {
  return nRequestAll(URL.PVoice.publishCommunityVoice, data)
}