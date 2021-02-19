// pages/index/active_details/active_details.js
import common from '../../../config/newsAPI/common'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isVote:false,
    qrCode:'',
    qrTitle:'',
    showLoading:false,
    showQrCode:false,
    residue:'',
    isEmpty:true,
    isSerachData:false,
    serachData:'',
    total:0,
    page:1,
    id: '',
    detail: '',
    cpuTime: '',
    serachContent: '',
    pageSize:10,
    pageNumber:1,
    lastPage:false,
    itemList:[]
  },
  handleShowQr:function(){
    let that = this
    // console.log(21111111111)
    that.setData({
      showQrCode:true
    })
    // console.log(122222222222,this.data.showQrCode)
  },
  handleClearSerach:function(){
    this.setData({
      serachContent:'',
      isSerachData:false,
      pageNumber:1
    })
    this.getItems({activityId:this.data.id,searchContent:'',pageSize:this.data.pageSize,pageNumber:this.data.pageNumber})
  },
  // 活动详细信息
  taptoActive_info: function (e) {
    wx.navigateTo({
      url: '/pages/index/active_details/active_info/active_info?id=' + this.data.id,
    })
  },
  handleInput:function(e){
    // console.log(e)
    this.setData({
      serachContent:e.detail.value
    })
  },
  //搜索
  handleSerach: function () {
    this.setData({
      pageNumber:1
    })
    let aid = this.data.id
    let text = this.data.serachContent
    if (text=='') {
      wx.showToast({
        title: '内容不能为空',
        icon:'none'
      })
      return
    }
    this.getItems({activityId:aid,searchContent:text,pageSize:this.data.pageSize,pageNumber:this.data.pageNumber})
  },
  handleSaveImg:function(){
    let that=this
    that.setData({
      showLoading:true
    })
    wx.getSetting({
      success(res) {
        console.log(res)
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success () {
              that.handleSaveImg()
            }
          })
        }else{
          wx.getImageInfo({
            src:that.data.detail.qrCode,
            success(res){
              console.log('info',res)
              wx.saveImageToPhotosAlbum({
                filePath: res.path,
                success(resp){
                  wx.showToast({
                    title: '图片保存成功',
                    icon: 'none'
                  })
                  that.setData({
                    showQrCode:false,
                    showLoading:false
                  })
                },
                fail(err){
                  wx.showToast({
                    title: '图片保存失败',
                    icon: 'none'
                  })
                  that.setData({
                    showLoading:false
                  })
                }
              })
            }
          })
        
        }
      }
    })
  },
  onClickHide() {
    this.setData({ showQrCode: false });
  },
  // 获取投票项
  getItems:function(params){
    common.getItemSearchResult(params,res=>{
      console.log(111111111,res)
      this.setData({
        lastPage:res.data.lastPage
      })
      if(params.pageNumber===1){
        this.setData({
          itemList:this.handleItemList(res.data.list)
        })
      }else{
        this.setData({
          itemList:this.handleItemList(this.data.itemList.concat(res.data.list))
        })
      }
    })
  },
  // 选手详情页面
  taptoPlayer_details: function (e) {
    let id=e.currentTarget.dataset.id
    let dayTimes=this.data.detail.sets.dayTimes
    wx.navigateTo({
      url: `/pages/index/active_details/player_details/player_details?id=${id}&dayTimes=${dayTimes}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('id:', options.id)
    let id=options.id
    if (options.id) {
      this.setData({
        id: options.id
      })
      common.getActivityDetailById(id, res => {
        console.log('活动详情', res)
        this.setData({
          detail: res,
          total:res.sumActivityTicket,
          residue:res.residue,
          cpuTime:'该活动未开始'
        })
        this.getItems({activityId:id,searchContent:this.data.serachContent,pageSize:this.data.pageSize,pageNumber:this.data.pageNumber})
        if(res.qrCode){
          this.setData({
            qrCode:res.qrCode,
            qrTitle:res.qrTitle,
            showQrCode:true
          })
        }
        if(res.publishStatus!=2){
          setInterval(this.handleTime, 1000);
          this.setData({
            cpuTime:'该活动未开始'
          })
        }
      })
    }

    // setTimeout(() => {
    //   this.setData({
    //     showQrCode:true
    //   })
    // },500)
  },
  //投票
  handleDoVote: function (e) {
    if (this.data.detail.publishStatus == '4') {
      wx.showToast({
        title: '该活动已结束！',
        icon: 'none',
        duration: 1000
      })
      return
    }else if(this.data.detail.publishStatus == '2'){
      wx.showToast({
        title: '该活动未开始！',
        icon: 'none',
        duration: 1000
      })
      return
    }else if(this.data.residue===0){
      wx.showToast({
        title: '投票次数已用完',
        icon: 'none',
        duration: 1000
      })
      return
    }
    let id = e.currentTarget.dataset.id
    let aid = this.data.id
    let index=e.currentTarget.dataset.index
    let copyItemList=this.handleItemList(this.data.itemList,index)
    this.setData({
      isVote:false
    })
    if(!this.data.isVote){
      common.doVote(id, aid, res => {
        if (res.status == 1) {
          this.setData({
            total:this.data.total+1,
            residue:this.data.residue-1,
            itemList:copyItemList,
            isVote:true
          })
          wx.showToast({
            title:'成功,剩余'+this.data.residue+'次',
            icon: 'success',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 1000
          })
        }
      })
    }else{
      wx.showToast({
        title: '操作太快',
        icon:'none'
      })
    }
  },
  handleItemList:function(list,i){
    let copyItemList=JSON.parse(JSON.stringify(list))
    if(i>=0){
      copyItemList[i].ticket+=1
    }
    return copyItemList
  },
  handleTime: function () {
    let t = this.data.detail.endTime
    let timestamp = (Date.parse(new Date())) / 1000;
    let totalS = (t - timestamp) < 0 ? 0 : t - timestamp
    let d = (totalS / 60 / 60 / 24) > 0 ? parseInt(totalS / 60 / 60 / 24) : 0
    let h = parseInt((totalS - (d * 24 * 60 * 60)) / 60 / 60)
    let m = parseInt((totalS - (d * 24 * 60 * 60) - (h * 60 * 60)) / 60)
    let s = m > 0 ? totalS - (d * 24 * 60 * 60) - (h * 60 * 60) - (m * 60) : 0
    let str = (d > 9 ? d : '0' + d) + '天' + (h > 9 ? h : '0' + h) + '小时' + (m > 9 ? m : '0' + m) + '分' + (s > 9 ? s : '0' + s) + '秒'
    this.setData({
      cpuTime: totalS<=0?`该活动已结束`:str
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //分享活动
  onShareAppMessage:function(options){
    return {
      path: '/pages/index/active_details/active_details?id=' + that.data.id
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let id = this.data.id
    // common.getActivityDetailById(id, res => {
    //   console.log('活动详情', res)
    //   if(!res.qrCode){
    //     this.setData({
    //       showQrCode:false
    //     })
    //   }
    //   this.setData({
    //     detail: res,
    //     total:res.sumActivityTicket,
    //     residue:res.residue,
    //     cpuTime:'该活动未开始'
    //   })
    //   this.getItems({activityId:id,searchContent:this.data.serachContent,pageSize:this.data.pageSize,pageNumber:this.data.pageNumber})
    //   if(res.publishStatus!=2){
    //     setInterval(this.handleTime, 1000);
    //     this.setData({
    //       cpuTime:'该活动未开始'
    //     })
    //   }
    // })
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
    var pages = getCurrentPages();
    var beforePage = pages[pages.length - 2];
    // console.log(beforePage,1111111111)
    beforePage.getWxappActivities()
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
    if(this.data.lastPage)return
    let page=this.data.pageNumber+1
    this.getItems({activityId:this.data.id,searchContent:'',pageSize:this.data.pageSize,pageNumber:page})
    this.setData({
      pageNumber:page
    })
  },

  /**
   * 用户点击右上角分享
   */

})