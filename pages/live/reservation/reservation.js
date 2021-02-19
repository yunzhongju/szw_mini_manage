// pages/live/reservation/reservation.js
import {
  getLiveListAPI,
  subscribeLiveAPI,
  cancleSubscribeLiveAPI
} from "../../../config/newsAPI/live_api"
import util from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    lastPage: false,
    pageNo: 1
  },
  handleToReservat(e) {
    let that = this
    let roomId = e.detail
    let tmplId = "97wbJr3w_laDxf-JaMAuPjvmarIoyIDHBu5dNhzWOZg"
    wx.requestSubscribeMessage({
      tmplIds: [tmplId],
      success(res) {
        console.log(res)
        if (res[tmplId] === 'accept') {
          that.subscribeLive(roomId)
        } else if (res[tmplId] === "reject") {
          wx.openSetting({
            withSubscriptions: true,
            success: (res => {
              console.log(res)
            }),
            fail: (err => {
              console.log(err)
            })
          })
        }
      },
      fail: (err => {
        console.log(err)
      })
    })
  },
  handleToCancle(e) {
    let roomId = e.detail
    cancleSubscribeLiveAPI({
      roomId: roomId
    }).then(res => {
      if (res.status == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
        this.getLiveList({
          pageSize: 10,
          pageNo: 1,
          liveStatus: "102"
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
    })
  },
  dingyueComfirm: function (tmplId, roomId) {
    let that = this
    wx.requestSubscribeMessage({
      tmplIds: [tmplId],
      success: (res) => {
        console.log("sdasds", res)
        if (res[tmplId] === 'accept') {
          wx.showToast({
            title: '订阅成功！',
            duration: 1000,
            success(data) {
              that.subscribeLive(roomId)
            }
          })
        }
      },
      fail: (err => {
        console.log(err)
      })
    })
  },
  subscribeLive(roomId) {
    subscribeLiveAPI({
      roomId: roomId
    }).then(res => {
      if (res.status == 1) {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
        this.getLiveList({
          pageSize: 10,
          pageNo: 1,
          liveStatus: "102"
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
    })
  },
  getLiveList(params) {
    getLiveListAPI(params).then(res => {
      console.log(res)
      if (params.pageNo == 1) {
        this.setData({
          lastPage: res.data.lastPage,
          list: this.handleList(res.data.list)
        })
      } else if (params.pageNo >= 2) {
        this.setData({
          lastPage: res.data.lastPage,
          list: this.handleList(this.data.list.concat(res.data.list))
        })
      }

    })
  },
  handleList(arr) {
    let list = []
    for (let i = 0; i < arr.length; i++) {
      let obj = {}
      obj["startTime"] = util.handleTime(arr[i].startTime)
      obj["roomName"] = arr[i].roomName
      obj["anchorName"] = arr[i].anchorName
      obj["roomId"] = arr[i].roomId
      obj["anchorImg"] = arr[i].anchorImg
      obj["vmAudience"] = arr[i].vmAudience
      obj["isSubscribe"] = arr[i].isSubscribe
      obj["isFollow"] = arr[i].isFollow
      obj["subscribeCount"] = arr[i].subscribeCount
      obj["anchorInfoId"] = arr[i].anchorInfoId
      list.push(obj)
    }
    return list
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLiveList({
      pageSize: 10,
      pageNo: 1,
      liveStatus: "102"
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
    util.alert('正在刷新数据...', 'loading');
    this.getLiveList({
      pageSize: 10,
      pageNo: 1,
      liveStatus: "102"
    })
    this.setData({
      lastPage:false,
      pageNo:1
    })
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let pageNo = this.data.pageNo + 1
    if (this.data.lastPage) {
      wx.showToast({
        title: '没有更多了',
        icon: "none"
      })
      return
    } else {
      this.getLiveList({
        pageSize: 10,
        pageNo: pageNo,
        liveStatus: "102"
      })
      this.setData({
        pageNo
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})