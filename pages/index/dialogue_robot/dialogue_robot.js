
var myPluginInterface = requirePlugin('myPlugin')
var wulAiSDK = require('../../../utils/WulAiSDK-1.1.3');
let app = getApp()
Page({

  data: {

  },

  onLoad: function (options) {

    //初始化插件
    const pubkey = '4ReYK9dNSQgWe9NJiEShKUxYgcFjr5jG00c9722ddc646cb7dd';
    const userinfo = {
      "avatar": app.globalData.userInfo.avatarUrl || '',
      "nickname": app.globalData.userInfo.nickName || '',
      "username": app.globalData.open_id || ''
    }

    console.log('请求参数', userinfo)

    myPluginInterface.init(wulAiSDK, wx, pubkey, userinfo);
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

})