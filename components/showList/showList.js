// components/showList/showList.js
import {addLiveViewsAPI} from '../../config/newsAPI/live_api'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    minHeight:0,
  },
  lifetimes:{
    attached:function(){
      wx.getSystemInfo({
        success: (result) => {
          this.setData({
            minHeight:result.screenHeight-200
          })
        },
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleToLiveRoom(e){
      let roomId = e.currentTarget.dataset.id
      let currentPage=getCurrentPages()
      this.addLiveViews({roomId:roomId})
      currentPage[0].onLoad()
      wx.navigateTo({
        url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}`,
      })
    },
    addLiveViews(args){
      addLiveViewsAPI(args).then(res=>{
        console.log(111111111,res)
      })
    }
  }
})
