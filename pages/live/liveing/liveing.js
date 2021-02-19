// pages/live/liveing/liveing.js
import {getLiveListAPI} from "../../../config/newsAPI/live_api"
import util from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    lastPage:false,
    pageNo:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLiveList({pageSize:10,pageNo:1,liveStatus:"101"})
  },
  getLiveList(params){
    getLiveListAPI(params).then(res=>{
      console.log(res)
      if(res.status==1){
        if(params.pageNo<2){
          this.setData({
            lastPage:res.data.lastPage,
            list:res.data.list
          })
        }else if(params.pageNo>=2){
          this.setData({
            lastPage:res.data.lastPage,
            list:this.data.list.concat(res.data.list)
          })
        }
       
      }
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
    this.getLiveList({pageSize:10,pageNo:1,liveStatus:"101"})
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
    let pageNo=this.data.pageNo+1
    if(this.data.lastPage){
      wx.showToast({
        title: '没有更多了',
      })
      return
    }else{
      this.getLiveList({pageSize:10,pageNo:pageNo,liveStatus:"101"})
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