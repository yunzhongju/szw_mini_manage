// components/addLive/addLive.js
const app = getApp()
import {hasOnLiveRoomAPI} from "../../config/newsAPI/live_api"
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleToCreateLive(){
      let livePower = app.globalData.livePower
      let content=`您没有直播权限,请联系微信: kirslo1015`
      if (!livePower) {
        wx.showModal({
          title: '提示',
          content: content,
          success(res) { }
        })
      } else {
        hasOnLiveRoomAPI().then(res=>{
          console.log(11111111,res)
          let hasRoom=res.data.hasRoom
          let type=res.data.type?res.data.type:''
          if(type==1){
            wx.showModal({
              title: '提示',
              content: '已经有创建的推流直播未开播,请使用推流设备进行直播',
            })
            return
          }
          if(hasRoom){
            wx.showModal({
              title: '提示',
              content: '已经有创建的直播未开播,是否前往直播',
              success (res) {
                if (res.confirm) {
                    wx.navigateToMiniProgram({
                    appId: 'wxcbbd86b156ae4441',
                  })
                } else if (res.cancel) {
                  return
                }
              }
            })
          }else{
            wx.navigateTo({
              url: '/pages/live/create_live/create_live',
            })
          }
        })
   
      }
    }
  }
})
