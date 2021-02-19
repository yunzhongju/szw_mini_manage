// components/helper/helper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    opacity:{
      type:Number,
      value:1
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
    handleToHelper(){
      this.triggerEvent('handleToHelper')
    }
  }
})
