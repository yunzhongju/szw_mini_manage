export function getAccessToken(cb) {
  wx.request({
    url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx50ce5f3ba10dcc1d&secret=0666838c1b449226e78c48bb11cd7ab0`,
    method: 'GET',
    success: function (resp) {
      console.log('获取密钥', resp)
      // console.log(access_token)
      cb(resp.data.access_token)
      
    }
  })
}
export function msg_sec_check(token,msg,cb){
  wx.request({
    url: `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${token}`,
    method:'POST',
    data:{
      content:msg
    },
    success:function(res){
        console.log('审核评论',res)
        if(res.data.errcode==0){
          cb(res.data.errcode)
        }else{
            wx.showToast({
              title: '内容不规范',
              icon:'none'
            })
            return
        }
    }
  })
}
export function img_sec_check(token,file,cb){
  wx.request({
    url: `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${token}`,
    method:'POST',
  
    header:{
      'Content-Type': 'application/octet-stream'
    },
    success:function(res){
        console.log('审核图片',res)
        if(res.data.errcode==0){
          cb(res.data.errcode)
        }else{
            wx.showToast({
              title: '图片不规范',
              icon:'none'
            })
            return
        }
    }
  })
}