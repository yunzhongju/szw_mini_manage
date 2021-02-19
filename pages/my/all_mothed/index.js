import {
  doLoginAPI
} from '../../../config/newsAPI/api'

//用微信返回的code值换取访问凭证
export function doLogin(){
  doLoginAPI().then(res=>{
    console.log('新的api请求',res)
  })
}