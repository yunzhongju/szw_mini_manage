// components/liveItem/liveItem.js
import {addLiveViewsAPI} from '../../config/newsAPI/live_api'
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    addLiveViews(args){
      addLiveViewsAPI(args).then(res=>{})
    },
    handleToLiveRoom(e){
      let roomId = e.currentTarget.dataset.id
      let currentPage=getCurrentPages()
      this.addLiveViews({roomId:roomId})
      currentPage[0].onLoad()
      wx.navigateTo({
        url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}`,
      })
    }
  }
})
