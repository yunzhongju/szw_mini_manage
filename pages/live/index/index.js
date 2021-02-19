// pages/live/index/index.js
import {
  getLiveRoomListAPI,
  getMyFollowListAPI,
  followAnchorAPI,
  addLiveViewsAPI
} from '../../../config/newsAPI/live_api'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    isLoading: false,
    isAttendance: false,
    isLive: true,
    liveList: [],
    attendanceList: [],
    page: 1,
    write:[0,0],
    writePosition: [80, 90],
    window: [0, 0],
    writesize: [0, 0],
    scrolltop: 0
  },
  onPageScroll(e) {
    this.data.scrolltop = e.scrollTop;
  },
  //计算默认定位值
  getSysdata: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (e) {
        that.data.window = [e.windowWidth, e.windowHeight];
        var write = [];
        write[0] = that.data.window[0] * that.data.writePosition[0] / 100;
        write[1] = that.data.window[1] * that.data.writePosition[1] / 100;
        console.log(write,45)
        that.setData({
          write: write
        }, function () {
          // 获取元素宽高
          wx.createSelectorQuery().select('.collectBox').boundingClientRect(function (res) {
            console.log(res.width)
            that.data.writesize = [res.width, res.height];
          }).exec();
        })
      },
      fail: function (e) {
        console.log(e)
      }
    });
  },
  touchmove:function(e){
    var that = this;
    var position = [e.touches[0].pageX - that.data.writesize[0] / 2, e.touches[0].pageY - that.data.writesize[1] / 2 - this.data.scrolltop];
    that.setData({
      write: position
    });
  },
  getMyFollowList: function (pageNo) {
    let params = {
      pageSize: '10',
      pageNo: pageNo
    }
    getMyFollowListAPI(params).then(res => {
      console.log(res)
      if (pageNo <= 1) {
        this.setData({
          attendanceList: res.data.list
        })
      } else {
        this.setData({
          attendanceList: [...this.data.attendanceList, ...res.data.list]
        })
      }

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
  handleToLivePlayer: function (e) {
    let roomId = e.currentTarget.dataset.roomid
    let params = {
      roomId: roomId,
      type: 'live',
      fileId: 'dka'
    }
    addLiveViewsAPI(params).then(res => {
      console.log('加1')
    })
    wx.navigateTo({
      url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}`,
    })
  },
  handleToCreate: function () {
    let livePower = app.globalData.livePower
    let content=`您没有直播权限,请联系微信: kirslo1015`
    if (!livePower) {
      wx.showModal({
        title: '提示',
        content: content,
        success(res) { }
      })
    } else {
      wx.navigateTo({
        url: '/pages/live/create_live/create_live',
      })
    }
  },
  handleToAttendance: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/live/detail/detail?id=${id}`,
    })
  },
  handleCreateLive: function () {

  },
  onChange: function (e) {
    let index = e.detail.index
    this.setData({
      active: index,
      page: 1
    })
    if (index == 1) {
      this.getMyFollowList(1)
    }
    if (index == 0) {
      this.getLiveRoomList('', '', 1)
    }

  },
  handleAttendance: function (e) {
    let id = e.currentTarget.dataset.id
    let isself = e.currentTarget.dataset.isself
    let list = this.handleList(id, this.data.liveList, 1)
    if (!isself) {
      let params = {
        anchorInfoId: id
      }
      this.setData({
        liveList: list
      })
      followAnchorAPI(params).then(res => {
        if (res.status == 1) {
          wx.showToast({
            title: '关注成功',
            icon: 'none'
          })
        }
      })
    } else {
      wx.showToast({
        title: '不能关注自己',
        icon: 'none'
      })
    }
  },
  handleCancleAttendance: function (e) {
    let id = e.currentTarget.dataset.id
    let list = this.handleList(id, this.data.liveList, 2)
    this.setData({
      liveList: list
    })
    let params = {
      anchorInfoId: id
    }
    followAnchorAPI(params).then(res => {
      this.getMyFollowList(1)
      if (res.status == 1) {
        wx.showToast({
          title: '取消关注',
          icon: 'none'
        })
      }
    })
  },
  handleList: function (id, list, type) {
    let arr = []
    for (let i = 0; i < list.length; i++) {
      if (list[i].anchorInfoId == id) {
        if (type == 1) {
          list[i].isFollow = true
        } else {
          list[i].isFollow = false
        }
      }
      arr.push(list[i])
    }
    return arr
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSysdata()
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
    this.getLiveRoomList('', '', 1)
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
    wx.showLoading({
      title: '加载中',
      
    })
    setTimeout(function () {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    }, 1000)
    this.getLiveRoomList('', '', 1)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.active == 0) {
      let page = this.data.page + 1
      this.getLiveRoomList('', '', page)
      this.setData({
        page
      })
    } else if (this.data.active == 1) {
      let page = this.data.page + 1
      this.getMyFollowList(page)
      this.setData({
        page
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})