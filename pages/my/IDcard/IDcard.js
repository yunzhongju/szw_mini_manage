// pages/my/IDcard/IDcard.js
const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    smgs:[],
    positive:[],//身份证正面
    back:[],//背面
    iungs:false,
    getUploadImageToken:""//图片上传token
  },
  // 上传图片
  uploadimages(e){
    console.log(e.currentTarget.dataset.type)
    var that = this
    var type = e.currentTarget.dataset.type
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        console.log(that.data.getUploadImageToken)
        wx.uploadFile({
          url: api.uphost,
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
              'token': that.data.getUploadImageToken
          },
          success: (res) => {
              console.log(res)
              var data = JSON.parse(res.data);
              // 把获取到的路径存入imagesurl字符串中
              var imagePath = api.upimg + '/' + data.key;
              console.log(imagePath)
              api.property.validImageSecurity.reqData["image_path"] = imagePath;
              util.request(api.property.validImageSecurity.reqUrl, api.property.validImageSecurity.reqData, api.property.validImageSecurity.reqType, false).then(function(res) {
                  console.log(res)
                  that.setData({
                      supporting_documents: imagePath
                  })
              });
          }
      });
        that.setData({
          positive:tempFilePaths
        })
      }
    })
  },
  rompost(){
    this.setData({
      positive:[]
    })
  },
  getUploadImageToken: function() {
    let that = this;
    api.property.getUploadImageToken.reqData["open_id"] = app.globalData.open_id; //luocheng微信openid
    util.request(api.property.getUploadImageToken.reqUrl, api.property.getUploadImageToken.reqData, api.property.getUploadImageToken.reqType).then(function(res) {
        that.setData({
            getUploadImageToken: res.data.token,
        })
    });
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.smgs.length)
    this.getUploadImageToken()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})