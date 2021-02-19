import URL from './baseURL'
import {
  nRequestAll
} from '../../utils/newsRequest/newsRequest'
//获取的关注
export function getMyFollowAPI(data) {
  return nRequestAll(URL.Attention.getMyFollow, data, 'GET')
}