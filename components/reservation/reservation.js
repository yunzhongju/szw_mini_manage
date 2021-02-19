// components/reservation/reservation.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    active: 0,
    timer: null,
  },
  pageLifetimes: {
    hide: function () {

    },
    show() {

    }
  },
  lifetimes: {
    attached: function () {
      console.log('11111111111111', this.properties.list)
      // this.setData({
      //   active: this.data.active + 1
      // })
      // let timer = setInterval(() => {
      //   let len = this.data.list.length
      //   let active = this.data.active
      //   if (active === len - 1) {
      //     this.setData({
      //       active: 0
      //     })
      //   } else {
      //     this.setData({
      //       active: active + 1
      //     })
      //   }
      // }, 2000)

      // this.setData({
      //   timer
      // })
    },
    detached() {
      // clearInterval(this.data.timer)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleToReservation() {
      if (this.properties.list.length == 0) {
        wx.showToast({
          title: '暂无预告',
          icon: 'none'
        })
        return false
      } else {
        wx.navigateTo({
          url: '/pages/live/reservation/reservation',
        })
      }
    },
  },

})