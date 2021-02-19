import {
  praiseCommentAPI,
  canclePraiseCommentAPI,
  praiseContentAPI,
  getCommentListAPI,
  getChannelListAPI,
  addCommentAPI,
  shareContentAPI,
  getAreasAPI,
  canclePraiseContentAPI,
  getUpTokenAPI,
  getNewsListAPI,
  getNewsDetailsAPI,
  getBannerListAPI,
  getVideoListAPI,
  getVideoDetailAPI,
  getDistrictImageAPI,
  getWxappActivitiesAPI,
  getActivityDetailByIdAPI,
  getItemDetailByIdAPI,
  getMyVoteRecordsAPI,
  doVoteAPI,
  getItemSearchResultAPI,
  getMySqManagerDetailAPI
} from './api'
import {
  getMyPulishAPI
} from './my_api'
import util from '../../utils/util'
import {
  nRequest
} from '../../utils/newsRequest/newsRequest'
const app = getApp()

export default {
  //点赞评论
  praiseComment: function (op) {
    if (!app.globalData.userInfo.avatarUrl) {
      util.alert("请前往我的页面授权")
      return false;
    }
    let params = {
      userId: app.globalData.userInfo.id,
      commentId: op.commentId,
      contentId: op.contentId,
      msgType: op.msgType,
      byUserId: op.byUserId,
      infoType: op.infoType
    }
    return new Promise(function (resolve, reject) {
      praiseCommentAPI(params).then(res => {
        console.log('点赞评论', res)
        if (res.status == 1) {
          resolve(res)
        }
      })
    })
  },
  //取消点赞评论
  canclePraiseComment: function (commentId) {
    if (!app.globalData.userInfo.avatarUrl) {
      util.alert("请前往我的页面授权")
      return false;
    }
    let params = {
      userId: app.globalData.userInfo.id,
      commentId: commentId
    }
    return new Promise((resolve, reject) => {
      canclePraiseCommentAPI(params).then(res => {
        console.log('取消点赞评论', res)
        if (res.status == 1) {
          resolve(res)
        }
      })
    })
  },
  //内容点赞
  praiseContent: function (contentId, type) {
    if (!app.globalData.userInfo.avatarUrl) {
      util.alert("请前往我的页面授权")
      return false;
    }
    let params = {
      userId: app.globalData.userInfo.id,
      contentId: contentId,
      type: type
    }
    return new Promise((resolve, reject) => {
      praiseContentAPI(params).then(res => {
        console.log('点赞内容', res)
        if (res.status == 1) {
          resolve(res)
        }
      })
    })
  },
  //取消点赞内容
  canclePraiseContent: function (contentId, type) {
    if (!app.globalData.userInfo.avatarUrl) {
      util.alert("请前往我的页面授权")
      return false;
    }
    let params = {
      userId: app.globalData.userInfo.id,
      contentId: contentId,
      type: type
    }
    return new Promise((resolve, reject) => {
      canclePraiseContentAPI(params).then(res => {
        console.log('取消点赞', res)
        if (res.status == 1) {
          resolve(res)
        }
      })
    })
  },
  //获取评论列表
  getCommentList: function (contentId, type, pageNumber = 1, arr = []) {
    if (!app.globalData.userInfo.avatarUrl) {
      util.alert("请前往我的页面授权")
      return false;
    }
    let params = {
      contentId: contentId,
      type: type,
      userId: app.globalData.userInfo.id,
      pageSize: '10',
      pageNumber: pageNumber
    }
    return new Promise((resolve, reject) => {
      getCommentListAPI(params).then(res => {
        console.log('社区之声评论列表', res)
        let list = res.data.commentsList.list
        if (params.pageNumber > 1) {
          list = arr.concat(list)
        }
        if (res.status == 1) {
          let d = {
            list: list,
            num: res.data.commentCount
          }
          resolve(d)
        }
      })
    })
  },
  // 获取栏目列表
  getChannelList: function (parentId) {
    let params = {
      parentId: parentId,
      pageSize: '10',
      pageNumber: '1'
    }
    return new Promise((resolve, reject) => {
      getChannelListAPI(params).then(res => {
        if (res.status == 1) {
          resolve(res.data)
        }
      })
    })
  },
  //添加评论
  addComment: function (contentId, type, byUserId, content, byContent, parentId = 0) {
    if (!app.globalData.userInfo.avatarUrl) {
      util.alert("请前往我的页面授权")
      return false;
    }
    let params = {
      contentId: contentId,
      parentId: parentId,
      type: type,
      userId: app.globalData.userInfo.id,
      byUserId: byUserId,
      content: content,
      byContent: byContent
    }
    return new Promise((resolve, reject) => {
      addCommentAPI(params).then(res => {
        console.log('添加评论', res)
        if (res.status == 1) {
          resolve(res.data)
        }else{
          wx.showToast({
            title: res.msg,
            icon:'none'
          })
          return
        }
      })
    })
  },
  //分享内容
  shareContent: function (contentId, type) {
    if (!app.globalData.userInfo.avatarUrl) {
      util.alert("请前往我的页面授权")
      return false;
    }
    let params = {
      contentId: contentId,
      type: type,
      userId: app.globalData.userInfo.id
    }
    return new Promise((resolve, reject) => {
      shareContentAPI(params).then(res => {
        console.log('分享内容', res)
        if (res.status == 1) {
          resolve(res)
        }
      })
    })
  },
  //我发布的
  getMyPulish: function (type, pageNumber = 1) {
    if (!app.globalData.userInfo.avatarUrl) {
      util.alert("请前往我的页面授权")
      return false;
    }
    let params = {
      pageNumber: pageNumber,
      type: type,
      userId: app.globalData.userInfo.id,
      pageSize: '10'
    }
    return new Promise((resolve, reject) => {
      getMyPulishAPI(params).then(res => {
        console.log('我发布的', res)
        if (res.status == 1) {
          resolve(res.data)
        }
      })
    })
  },
  //获取上传token
  getUpToken: function (type) {
    let params = {
      type: type
    }
    return new Promise((resolve, reject) => {
      getUpTokenAPI(params).then(res => {
        if (res.status == -1) {
          resolve(res.data)
        }
      })
    })
  },
  //获取行政区划
  getAreas: function (pid = '') {
    return new Promise((resolve, reject) => {
      getAreasAPI({
        parentId: pid
      }).then(res => {
        if (res.status == 1) {
          resolve(res.data)
        }
      })
    })
  },
  //获取新闻聊表
  getNewsList: function (...args) {
    let params = {
      searchContent: args[0],
      channelId: args[1],
      recommend: args[2],
      district: args[3],
      pageSize: '30',
      pageNumber: args[4]
    }
    getNewsListAPI(params).then(res => {
      if (res.status == 1) {
        args[5](res.data)
      }
    })
  },
  //获取新闻详情
  getNewsDetails: function (id, cb) {
    let p = {
      id: id,
      userId: app.globalData.userInfo.id
    }
    getNewsDetailsAPI(p).then(res => {
      if (res.status == 1) {
        cb(res.data)
      }
    })
  },
  //获取banner列表
  getBannerList: function (cb) {
    getBannerListAPI().then(res => {
      if (res.status == 1) {
        cb(res.data)
      }
    })
  },
  //获取视频列表
  getVideoList: function (...args) {
    let params = {
      searchContent: args[0],
      pageSize: '10',
      pageNumber: args[1]
    }
    getVideoListAPI(params).then(res => {
      if (res.status == 1) {
        args[2](res.data)
      }
    })
  },
  //获取视频详情
  getVideoDetail: function (id, cb) {
    let p = {
      id: id,
      userId: app.globalData.userInfo.id
    }
    getVideoDetailAPI(p).then(res => {
      if (res.status == 1) {
        cb(res.data)
      }
    })
  },
  //社区封面摄影
  getDistrictImage: function (district, cb) {
    getDistrictImageAPI({
      district: district
    }).then(res => {
      if (res.status == 1) {
        cb(res.data)
      }
    })
  },
  //获取投票活动列表
  getWxappActivities: function (pageNumber, cb) {
    let params = {
      pageSize: '10',
      pageNumber: pageNumber
    }
    getWxappActivitiesAPI(params).then(res => {
      if (res.status == 1) {
        cb(res.data)
      }
    })
  },
  //活动详情
  getActivityDetailById: function (id, cb) {
    getActivityDetailByIdAPI({
      id: id
    }).then(res => {
      if (res.status == 1) {
        cb(res.data)
      }
    })
  },
  //投票
  doVote: function (id, aid, cb) {
    let p = {
      id: id,
      activity_id: aid
    }
    doVoteAPI(p).then(res => {
      cb(res)
    })
  },
  //投票项详情
  getItemDetailById: function (id, cb) {
    getItemDetailByIdAPI({
      id: id
    }).then(res => {
      if (res.status == 1) {
        cb(res.data)
      }
    })
  },
  //获取我的投票记录
  getMyVoteRecords: function (pageNumber, cb) {
    let p = {
      pageNumber: pageNumber,
      pageSize: '10'
    }
    getMyVoteRecordsAPI(p).then(res => {
      if (res.status == 1) {
        cb(res.data)
      }
    })
  },
  //搜索投票项
  getItemSearchResult: function (params,cb) {
    getItemSearchResultAPI(params).then(res => {
      cb(res)
    })
  },
  //获取申请记录
  getMySqManagerDetail: function (cb) {
    getMySqManagerDetailAPI().then(res => {
      if (res.status == 1) {
        cb(res)
      }
    })
  }
}