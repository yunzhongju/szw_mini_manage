// pages/my/my_votes/my_votes.js
import common from '../../../config/newsAPI/common'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    page: 1,
    activeList: []
  },
  taptoActive_details: function (e) {
    console.log(e)
    wx.navigateTo({
      url: `/pages/index/active_details/active_details?id=${e.currentTarget.dataset.aid}`,
    })
  },
  taptoActiveItem_details: function (e) {
    
    wx.navigateTo({
      url: `/pages/index/active_details/player_details/player_details?id=${e.currentTarget.dataset.id}&dayTimes=${dayTimes}&publishStatus=${this.data.detail.publishStatus}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    common.getMyVoteRecords(1, res => {
      console.log('我参与的活动', res)
      this.setData({
        activeList: res.list
      })
    })
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
    let page = this.data.page+1
    if (page > 1) {
      common.getMyVoteRecords(page, res => {
        this.setData({
          activeList: [...this.data.activeList, ...res.list],
          page
        })
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})