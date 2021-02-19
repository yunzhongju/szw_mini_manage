// pages/live/home/home.js
import {
  getLiveListAPI
} from "../../../config/newsAPI/live_api"
import util from "../../../utils/util"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    noStartList: [],
    startingList: [],
    pageNo: 1,
    lastPage: false,
    endList: [],
    isFixed: false,
    topDistance: 0,
    scrollTop: 0,
    tabs: [{
        id: 1,
        title: '内容回顾'
      },
      {
        id: 2,
        title: '人气排行'
      }
    ],
  },
  change(e) {
    let order = e.detail
    if (order == 0) {
      this.getLiveList({
        pageSize: "10",
        pageNo: "1",
        liveStatus: "103",
        order: "time"
      })
    } else if (order == 1) {
      this.getLiveList({
        pageSize: "10",
        pageNo: "1",
        liveStatus: "103",
        order: "hot"
      })
    }
    this.setData({
      pageNo:1
    })
  },
  getLiveList(params) {
    getLiveListAPI(params).then(res => {
      console.log("liveList", res)
      if (params.liveStatus == "102") {
        this.setData({
          noStartList: this.handleList(res.data.list)
        })
      } else if (params.liveStatus == "101") {
        this.setData({
          startingList: res.data.list
        })
      } else if (params.liveStatus == "103") {
        if (params.pageNo == 1) {
          this.setData({
            lastPage: res.data.lastPage,
            endList: res.data.list
          })
        } else if (params.pageNo > 1 && res.data.list.length != 0) {
          this.setData({
            lastPage: res.data.lastPage,
            endList: this.data.endList.concat(res.data.list)
          })
        } else if (res.data.list.length == 0) {
          wx.showToast({
            title: '没有更多了',
            icon: "none"
          })
          return
        }
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
  handleToHelper(){
    wx.navigateTo({
      url: '../../index/helper/helper?type=1',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.data.topDistance == 0) {
      this.getElenmentDistance()
    }
    // 预告列表
    this.getLiveList({
      pageSize: "10",
      pageNo: "1",
      liveStatus: "102"
    })
    // 直播列表
    this.getLiveList({
      pageSize: "10",
      pageNo: "1",
      liveStatus: "101"
    })
    // 回访列表
    this.getLiveList({
      pageSize: "10",
      pageNo: "1",
      liveStatus: "103"
    })

  },
  getElenmentDistance() {
    let query = wx.createSelectorQuery()
    query.select('#mytab').boundingClientRect((rect) => {
      let top = rect.top
      // 这里是关键
      this.setData({
        topDistance: top
      })
    }).exec()
  },
  onPageScroll: function (e) {
    let scrollTop = e.scrollTop
    let isStaisfy = scrollTop >= this.data.topDistance ? true : false
    if (this.data.isFixed === isStaisfy) {
      return false
    }
    this.setData({
      isFixed: isStaisfy
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
    // 预告列表
    this.getLiveList({
      pageSize: "10",
      pageNo: "1",
      liveStatus: "102"
    })
    // 直播列表
    this.getLiveList({
      pageSize: "10",
      pageNo: "1",
      liveStatus: "101"
    })
    // 回访列表
    this.getLiveList({
      pageSize: "10",
      pageNo: "1",
      liveStatus: "103"
    })
    wx.stopPullDownRefresh()
    this.setData({
      lastPage:false,
      pageNo:1
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let pageNo = this.data.pageNo + 1
    if (this.data.lastPage) {
      wx.showToast({
        title: '没有更多了',
        icon:"none"
      })
      return
    } else {
      this.getLiveList({
        pageSize: "10",
        pageNo: pageNo,
        liveStatus: "103"
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