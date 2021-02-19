// pages/live/detail/detail.js
import {
  getAnchorInfoAPI,
  getLiveRoomListAPI,
  followAnchorAPI,
  addLiveViewsAPI
} from '../../../config/newsAPI/live_api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    detail: {},
    page: 1,
    isAttendance: false,
    isLive: true,
    liveList: []
  },
  handleToLivePlayer: function (e) {
    let roomId = e.currentTarget.dataset.roomid
    let params = {
      roomId: roomId,
      type: 'live',
      fileId: 'dka'
    }
    addLiveViewsAPI(params).then(res => {})
    wx.navigateTo({
      url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}`,
    })
  },
  getLiveRoomList: function (anchorInfoId, type, pageNo) {
    let params = {
      pageSize: '10',
      pageNo: pageNo,
      type: type,
      anchorInfoId: anchorInfoId
    }
    getLiveRoomListAPI(params).then(res => {
      console.log('直播列表', res)
      if (res.status == 1) {
        if (pageNo <= 1) {
          this.setData({
            liveList: res.data.list
          })
        } else {
          this.setData({
            liveList: [...this.data.liveList, ...res.data.list]
          })
        }
      }
    })
  },
  getAnchorInfo: function (id) {
    let params = {
      anchorInfoId: id
    }
    getAnchorInfoAPI(params).then(res => {
      console.log('详情', res)
      if (res.status == 1) {
        this.setData({
          detail: res.data,
          isAttendance: res.data.isFollow
        })
      }
    })
  },
  handleAttendance: function (e) {
    let type = e.currentTarget.dataset.type
    let isself = e.currentTarget.dataset.isself
    if (!isself) {
      let params = {
        anchorInfoId: this.data.id
      }
      if (type == '1') {
        this.setData({
          isAttendance: false
        })
        wx.showToast({
          title: '取消关注',
          icon: 'none'
        })
        followAnchorAPI(params).then(res => {
          this.getMyFollowList(1)
          if (res.status == 1) {
            wx.showToast({
              title: '取消关注',
              icon: 'none'
            })
          }
        })
      } else {
        this.setData({
          isAttendance: true
        })
        followAnchorAPI(params).then(res => {
          if (res.status == 1) {
            wx.showToast({
              title: '关注成功',
              icon: 'none'
            })
          }
        })
      }
    } else {
      wx.showToast({
        title: '不能关注自己',
        icon: 'none'
      })
    }

  },
  handleBack: function () {
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
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
    let id = this.data.id
    this.getAnchorInfo(id)
    this.getLiveRoomList(id, '', 1)
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
    this.onShow()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let page = this.data.page + 1
    this.getLiveRoomList(id, '', page)
    this.setData({
      page
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})