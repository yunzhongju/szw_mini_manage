// components/liveing/liveing.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    len:{
      type:Number,
      value:0
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
    handleToLiveing(){
      if(this.properties.len>0){
        wx.navigateTo({
          url: '/pages/live/liveing/liveing',
        })
      }else{
        wx.showToast({
          title: '暂无正在直播',
          icon:'none'
        })
        return false
      }
    }
  }
})
