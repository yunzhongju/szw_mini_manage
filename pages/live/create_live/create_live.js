// pages/live/create_live/create_live.js
import common from '../../../config/newsAPI/common'
import {
  createLiveRoomAPI
} from '../../../config/newsAPI/live_api'
import until from "../../../utils/util"
const app = getApp()

Page({

  /**
   * 页面的初始数据
   *  startTime:until.formatDate(new Date().getTime(),"yyyy-MM-dd-HH-mm"),
   */
  data: {
    radio:'0',
    isFirst:true,
    showOverlay:false,
    showTime:false,
    minDate: new Date().getTime(),
    title: '',
    currentTime:new Date().getTime(),
    nickname: '',
    wechat: '',
    startTime:new Date().getTime(),
    valueTime:``,
    coverImg: '',
    bgImg: '',
    firstLive:null,
    isLoading: false,
    type: '',
    token: '',
    baseUrl: 'https://image.sqfzzl.com/',
    show: false,
    src: null, // 裁剪图片地址
    visible: false, // 是否显示
    size: { //裁剪尺寸
      width: 400,
      height: 500
    },
    cropSizePercent: 0.9, //裁剪框显示比例
    borderColor: '#fff', //裁剪框边框颜色
    result: '', //裁剪结果地址
  },
  onChangeRadio:function(e){
    this.setData({
      radio: e.detail
    });
  },
  onConfirm(e){
    console.log(e)
    let valueTime=until.formatDate(new Date(e.detail),"yyyy-MM-dd HH:mm")
    this.setData({
      valueTime: valueTime,
      startTime:e.detail,
      showTime:false
    })
  },
  onInputTime(event) {
    // console.log(event.detail)
    let shijianc=event.detail
    if(shijianc){
      let valueTime=until.formatDate(new Date(shijianc),"yyyy-MM-dd HH:mm")
      this.setData({
        valueTime: valueTime,
        startTime:event.detail,
        showTime:false
      });
    }
   
  },
  onChangeTime(){
    this.setData({
      showTime:true
    })
  },
  onChangeTitle: function (e) {
    let value = e.detail
    this.setData({
      title: value
    })
  },
  onChangeNickname: function (e) {
    let value = e.detail
    this.setData({
      nickname: value
    })
  },
  onChangeWechat: function (e) {
    this.setData({
      wechat: e.detail
    })
  },
  closeCallback: function () {
    this.setData({
      visible: false,
      src: null
    })
  },
  cropCallback: function (e) {
    let that = this
    that.setData({
      isLoading: true,
      visible: false,
    })
    let result = e.detail.resultSrc
    if(result){
      wx.uploadFile({
        filePath: result,
        name: 'file',
        // url: 'http://132.232.74.143:4440/common/uploadPic',
        url: 'https://api.sqfzzl.com:4443/common/uploadPic',
        success(res) {
          let data = JSON.parse(res.data)
          let path = data.data[0]
          console.log(data)
          let type = that.data.type
          if (type == '1') {
            that.setData({
              coverImg: path
            })
          } else {
            that.setData({
              bgImg: path
            })
          }
          that.setData({
            isLoading: false
          })
        }
      })
    }else{
      wx.showToast({
        title: '图片不存在',
        icon:"none"
      })
      return
    }
  },
  uploadCallback: function (e) {},
  handleUploadImg: function (e) {
    let type = e.currentTarget.dataset.type
    let that = this
    wx.chooseImage({
      count: 1,
      success: res => {
        console.log('上传本第文件',res)
        let img_size=res.tempFiles[0].size/1024/1024
        let path=res.tempFilePaths[0]
        if(!path){
          wx.showToast({
            title: '图片不存在',
            icon:'none'
          })
          return false
        }
        if (type == 1) {
          if(img_size>1){
            wx.showToast({
              title: '图片大小超过1M',
              icon:'none'
            })
            return
          }
          let size = {
            width: 800,
            height: 640
          }
          this.setData({
            size
          })
        } else {
          if(img_size>2){
            wx.showToast({
              title: '图片大小超过2M',
              icon:'none'
            })
            return
          }
          let size = {
            width: 1080,
            height: 1920
          }
          this.setData({
            size
          })
        }
        this.setData({
          visible: true,
          src: path,
          type: type
        })
      }
    })
  },
  handleDelete: function (e) {
    let type = e.currentTarget.dataset.type
    if (type == '1') {
      this.setData({
        coverImg: ''
      })
    } else {
      this.setData({
        bgImg: ''
      })
    }
  },
  handleSaveImg:function(){
    let that=this
    wx.getSetting({
      success(res) {
        console.log(res)
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success () {
              that.handleSaveImg()
            }
          })
        }else{
          wx.getImageInfo({
            src: '../../../images/live/share.png',
            success(res){
              // console.log('info',res)
              wx.saveImageToPhotosAlbum({
                filePath: res.path,
                success(resp){
                  wx.showToast({
                    title: '图片保存成功',
                    icon: 'none'
                  })
                  that.setData({
                    showOverlay:false
                  })
                  wx.navigateTo({
                    url: '/pages/live/home/home',
                  })
                },
                fail(err){
                  wx.showToast({
                    title: '图片保存失败',
                    icon: 'none'
                  })
                }
              })
            }
          })
        
        }
      }
    })
  },
  onClickHide:function(){
    this.setData({
      showOverlay: false
    })
  },
  handleRule: function () {
    this.setData({
      show: true
    })
  },
  handleSubmit: function () {
    if (this.data.title == '') {
      wx.showToast({
        title: '请填写直播主题',
        icon: 'none'
      })
      return
    } else if (this.data.title.length < 3 || this.data.title.length > 17) {
      wx.showToast({
        title: '请填写主播主题3-17汉字',
        icon: 'none'
      })
      return 
    } else if (this.data.nickname.length < 2 || this.data.nickname.length > 15) {
      wx.showToast({
        title: '请填写主播昵称2-15汉字',
        icon: 'none'
      })
      return
    } else if (this.data.nickname == '') {
      wx.showToast({
        title: '请填写主播昵称',
        icon: 'none'
      })
      return
    } else if (this.data.wechat == '') {
      wx.showToast({
        title: '请填写微信号',
        icon: 'none'
      })
      return
    } else if (this.data.coverImg == '') {
      wx.showToast({
        title: '请上传分享图',
        icon: 'none'
      })
      return
    } else if (this.data.bgImg == '') {
      wx.showToast({
        title: '请上传背景图',
        icon: 'none'
      })
      return
    } else if (this.data.startTime-this.data.currentTime<=900*1000) {
      wx.showToast({
        title: '开播时间至少在15分钟后',
        icon: 'none'
      })
      return
    } else {
      if(!this.data.isFirst){
        wx.showToast({
          title: '请勿重复提交',
          icon:"none"
        })
        return
      }
      let params = {
        roomName: this.data.title,
        anchorName: this.data.nickname,
        anchorWechat: this.data.wechat,
        coverImg: this.data.bgImg,
        shareImg: this.data.coverImg,
        firstLive: this.data.firstLive,
        startTime:parseInt(this.data.startTime/1000),
        type:this.data.radio
      }
      this.setData({
        isLoading: true,
        isFirst:false
      })
      // console.log('提交的表单', params)
      createLiveRoomAPI(params).then(res => {
        this.setData({
          isLoading: false,
          isFirst:true
        })
        console.log('ok', res)
        if (res.data == '0'&&this.data.radio=='0') {
          wx.showModal({
            title: '提示',
            content: res.msg,
            success(res) {
              if (res.confirm){
                wx.navigateToMiniProgram({
                  appId: 'wxcbbd86b156ae4441',
                  success(res){
                    console.log('小程序跳转成功')
                  },
                  fail(res){
                    console.log('小程序跳转失败')
                    wx.switchTab({
                      url: '/pages/live/home/home',
                    })
                  }
                })
              }else if(res.cancel){
                wx.switchTab({
                  url: '/pages/live/home/home',
                })
              }
            }
          })
        }else if(this.data.radio==1&&res.data == '0'){
          wx.showModal({
            title: '提示',
            content: '推流直播创建成功,请使用推流设备进行直播(OBS)',
            success(resp){
              if(resp.confirm){
                wx.switchTab({
                  url: '/pages/live/home/home',
                })
              }else if(resp.cancel){
                wx.switchTab({
                  url: '/pages/live/home/home',
                })
              }
            }
          })
        }else if(res.data=='400001'){
          wx.showToast({
            title: '微信号不存在',
            icon:"none"
          })
          return
        }else if(res.data=='101'){
          wx.showModal({
            title: '提示',
            content: res.msg,
            success(res) {
              if (res.confirm){
                wx.navigateToMiniProgram({
                  appId: 'wxcbbd86b156ae4441',
                  success(res){
                    console.log('小程序跳转成功')
                  },
                  fail(res){
                    console.log('小程序跳转失败')
                    wx.switchTab({
                      url: '/pages/live/home/home',
                    })
                  }
                })
              }else if(res.cancel){
                wx.switchTab({
                  url: '/pages/live/home/home',
                })
              }
            }
          })
        }else if(res.data=='400002'){
          this.setData({
            showOverlay: true
          })
        }else if(res.data=='300036'){
          this.setData({
            showOverlay: true
          })
        }else if(res.data=='300028'){
          wx.showToast({
            title: '房间名称违规',
            icon:"none"
          })
          return
        }else if(res.data=='300029'){
          wx.showToast({
            title: '主播昵称违规',
            icon:"none"
          })
          return
        }else if(res.data=='300031'){
          wx.showToast({
            title: '直播间封面图不合规',
            icon:"none"
          })
          return
        }else if(res.data=='300032'){
          wx.showToast({
            title: '直播间分享图违规',
            icon:"none"
          })
          return
        }else{
          wx.showToast({
            title: `错误码${res.data}`,
            icon:"none",
            duration:2000
          })
          return
        }
        let live_info = {
          wxcode: this.data.wechat,
          anchorName: this.data.nickname
        }
        wx.setStorage({
          data: JSON.stringify(live_info),
          key: 'live_info',
        })
      })
    }
  },
  onClose() {
    this.setData({ showTime: false });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.wxLogin()
    let that =this
    wx.getStorage({
      key: 'live_info',
      success(res) {
        let live_info = JSON.parse(res.data)
        // console.log('test',live_info)
        that.setData({
          nickname: live_info.anchorName ? live_info.anchorName : '',
          wechat: live_info.wxcode ? live_info.wxcode : '',
          firstLive:live_info.firstLive?live_info.firstLive:true
        })
      }
    })
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