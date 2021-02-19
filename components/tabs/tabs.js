// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    active:0,
    ani:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    change(e){
      let index=e.currentTarget.dataset.id
      this.setData({
        active:index
      })
     this.triggerEvent("change",index)
    }
  }
})
