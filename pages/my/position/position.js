const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
const bmap = require('../../../utils/bmap-wx.min.js');
var QQMapWX = require('../../../utils/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
var app = getApp();
Page({
    data: {
        latitude: 0, //地图初次加载时的纬度坐标
        longitude: 0, //地图初次加载时的经度坐标
    },
    onLoad: function() {
        // 实例化API核心类
        new QQMapWX({
            key: 'ON2BZ-TXNCU-JJWVG-B6SGA-WIHEV-KPFKX'
        });
        this.setData({
            latitude: app.globalData.latitude, //地图初次加载时的纬度坐标
            longitude: app.globalData.longitude, //地图初次加载时的经度坐标
        });
        this.getLocation();
    },
    //移动选点
    moveToLocation: function() {
        var that = this;
        wx.chooseLocation({
            success: function(res) {
                // console.log(res);
                // address:"广东省广州市天河区天府路1号"
                // errMsg:"chooseLocation:ok"
                // latitude:23.12463
                // longitude:113.36199
                // name:"广州市天河区人民政府"
                /**确定地点并返回*/
                //获取上个页面的参数
                let pages = getCurrentPages();
                //prevPage 相当于上个页面的this，可以通过setData修改上个页面参数执行上个页面的方法等
                let prevPage = pages[pages.length - 2];
                prevPage.setData({
                    longitude: res.longitude,
                    latitude: res.latitude,
                    address: res.address,
                });
                wx.navigateBack();
            },
            fail: function(err) {
                wx.navigateBack();
            }
        });
    },
    getLocation: function() {
        let _this = this;
        wx.getSetting({
            success(res) {
                // 判断定位的授权
                if (!res.authSetting['scope.userLocation']) {
                    wx.authorize({
                        scope: 'scope.userLocation',
                        success() {
                            _this.moveToLocation();
                        },
                        fail(errMsg) {
                            wx.showToast({ title: JSON.stringify(errMsg), icon: 'none' })
                        }
                    })
                } else {
                    _this.moveToLocation();
                }
            }
        })
    },
});