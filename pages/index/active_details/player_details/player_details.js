// pages/index/active_details/player_details/player_details.js
import common from '../../../../config/newsAPI/common'
import {getItemDetailByIdByShareAPI} from '../../../../config/newsAPI/api'
import checkUpdateVersion from '../../../../utils/checkversion'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    detail: '',
    total:'',
    title:'',
    id:'',
    publishStatus:'',
    dayTimes:'',
    residue:'',
  },
  handleVote: function (e) {
    checkUpdateVersion.checkUpdateVersion()
    if(this.data.publishStatus==='4'){
      wx.showToast({
        title: '该活动已结束！',
        icon: 'none',
        duration: 1000
      })
      return
    }
    if(this.data.publishStatus==='2'){
      wx.showToast({
        title: '该活动未开始！',
        icon: 'none',
        duration: 1000
      })
      return
    }
    if(this.data.residue===0){
      wx.showToast({
        title: '投票次数已用完',
        icon:'none'
      })
      return
    }
    let id=e.currentTarget.dataset.id
    common.doVote(id, this.data.detail.activityId, res => {
      if (res.status == 1) {
        this.setData({
          total:this.data.total+1,
          residue:this.data.residue-1
        })
        wx.showToast({
          title:'成功,剩余'+this.data.residue+'次',
          icon: 'success',
          duration: 1000
        })
        
        setTimeout(() => {
          wx.navigateTo({
            url: `/pages/index/active_details/active_details?id=${this.data.detail.activityId}`,
          })
        }, 1500)
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id=options.id
    let dayTimes=options.dayTimes
    console.log('id',id)
    console.log('dayTimes',dayTimes)
    let that =this
    getItemDetailByIdByShareAPI({id:id,dayTimes:dayTimes}).then(res=>{
      console.log(2222222222,res)
      that.setData({
        height: wx.getSystemInfoSync().windowHeight,
        id,
        residue:res.data.residue,
        dayTimes:dayTimes
      })
    })
    that.getItemDetailById(id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getItemDetailById:function(id){
    common.getItemDetailById(id, res => {
      console.log('投票项详情', res)
      this.setData({
        detail: res,
        total:res.ticket,
        title:res.btnName
      })
      common.getActivityDetailById(res.activityId,resp=>{
        console.log('活动详情',resp)
        this.setData({
          publishStatus:resp.publishStatus
        })
      })
    })
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
    // var pages = getCurrentPages();
    // var beforePage = pages[pages.length - 2];
    // // console.log(beforePage,1111111111)
    // beforePage.onShow()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      path: `/pages/index/active_details/player_details/player_details?id=${this.data.id}&dayTimes=${this.data.dayTimes}`
    }
  }
})