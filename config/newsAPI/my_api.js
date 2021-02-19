import URL from './baseURL'
import {
  nRequestAll,
  nRequest
} from '../../utils/newsRequest/newsRequest'

//获取我的消息
export function getMyMessageAPI(data) {
  return nRequestAll(URL.My.getMyMessage, data, 'GET')
}
//获取未读消息数
export function getUnreadMessageCountAPI(data) {
  return nRequestAll(URL.My.getUnreadMessageCount, data, 'GET')
}
//获取我发布的
export function getMyPulishAPI(data) {
  return nRequestAll(URL.My.getMyPulish, data, 'GET')
}
//获取我赞过的
export function getMyPraiseRecordAPI(data) {
  return nRequestAll(URL.My.getMyPraiseRecord, data, 'GET')
}
//获取我的浏览记录
export function getMybrowseRecordAPI(data) {
  return nRequestAll(URL.My.getMybrowseRecord, data, 'GET')
}
//获取用户手机号
export function getPhoneNumberAPI(data) {
  return nRequestAll(URL.My.getPhoneNumber, data)
}
//申请账户管理
export function saveApplySqManagerAPI(data) {
  return nRequestAll(URL.My.saveApplySqManager, data)
}