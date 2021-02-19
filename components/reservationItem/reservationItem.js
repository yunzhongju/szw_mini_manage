// components/reservationItem/reservationItem.js
const app=getApp()
import {hasOnLiveRoomAPI} from "../../config/newsAPI/live_api"

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detail:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isPlayer:true,
    anchorName:''
  },

  /**
   * 组件的方法列表
   */
  lifetimes:{
    attached(){
      // console.log('app',app)
      this.setData({
        anchorName:app.globalData.anchorName
      })
    }
  },
  methods: {
    handleToReservat(e){
      let roomId=e.currentTarget.dataset.id
      this.triggerEvent('handleToReservat',roomId)
    },
    handleToCancle(e){
      let roomId=e.currentTarget.dataset.id
      this.triggerEvent('handleToCancle',roomId)
    },
    handleToStartLive(e){
      let roomId=e.currentTarget.dataset.id
      hasOnLiveRoomAPI().then(res=>{
        let type=res.data.type?res.data.type:''
        if(type==1){
          wx.showModal({
            title: '提示',
            content: '该直播为推流直播,请使用推流设备进行直播',
          })
          return
        }else{
          wx.navigateToMiniProgram({
            appId: 'wxcbbd86b156ae4441'
          })
        }
      })
    }
  }
})
