const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
var app = getApp();
Page({
    data: {
        wxUserInfo: "",
        getChildTreeListByParentID: [],
        getUploadImageToken: "",
        title: "", //社区之声发布测试2标题
        content: "", //发布内容
        image_path: [], //['图片1','图片2']上传图片json数组
        communityDetails: {},
        province: "", //（选填）省编号
        city: "", //（选填）市编号
        area: "", //（选填）区编号
        street: "", //（选填）街道编号
        community: "", //（选填）社区编号
        navigation_id: "", //栏目编号
        arr: [1, 2, 3, 4, 5, 6]
    },

    //跳转到选择地址
    TaptoSwitch_position: function(e) {
        commonJs.TaptoSwitch_position("release_topic");
    },
    //删除图片
    image_del: function(e) {
        let that = this;
        let image_path = that.data.image_path;
        image_path.splice(e.currentTarget.dataset.id, 1);
        that.setData({
            image_path: image_path
        })
    },
    //选择栏目
    choose_column: function(e) {
        let that = this;
        that.setData({
            navigation_id: e.currentTarget.dataset.id
        })
    },
    getTitle: function(e) {
        let that = this;
        that.setData({
            title: e.detail.value
        })
    },
    getContent: function(e) {
        let that = this;
        that.setData({
            content: e.detail.value
        })
    },
    //社区之声发布
    communityvoiceAdd: function() {
        let that = this;
        api.property.communityvoiceAdd.reqData["open_id"] = app.globalData.open_id; //luocheng微信openid
        api.property.communityvoiceAdd.reqData["title"] = that.data.title; //社区之声发布测试2标题
        api.property.communityvoiceAdd.reqData["content"] = that.data.content; //发布内容
        api.property.communityvoiceAdd.reqData["image_path"] = JSON.stringify(that.data.image_path); //['图片1','图片2']上传图片json数组
        api.property.communityvoiceAdd.reqData["province"] = that.data.province; //（选填）省编号
        api.property.communityvoiceAdd.reqData["city"] = that.data.city; //（选填）市编号
        api.property.communityvoiceAdd.reqData["area"] = that.data.area; //（选填）区编号
        api.property.communityvoiceAdd.reqData["street"] = that.data.street; //（选填）街道编号
        api.property.communityvoiceAdd.reqData["community"] = that.data.community; //（选填）社区编号
        api.property.communityvoiceAdd.reqData["navigation_id"] = that.data.navigation_id; //栏目编号
        util.request(api.property.communityvoiceAdd.reqUrl, api.property.communityvoiceAdd.reqData, api.property.communityvoiceAdd.reqType).then(function(res) {
            util.alert("发布成功");
            that.refreshBeforePage();
        });
    },

    // 上传路线图
    // upImg: function(e) {
    //     var that = this;
    //     if (that.data.image_path.length > 2) {
    //         util.alert("图片最多上传3张");
    //         return false;
    //     }
    //     wx.chooseImage({
    //         count: 3, // 最多可以选择的图片张数，默认9
    //         success: function(res) {
    //             var tempFilePaths = res.tempFilePaths;
    //             if (parseInt(tempFilePaths.length + that.data.image_path.length) > 3) {
    //                 util.alert("图片最多上传3张");
    //                 return false;
    //             }
    //             var imagePathArr = [];
    //             for (let ind1 = 0; ind1 < tempFilePaths.length; ind1++) {
    //                 wx.uploadFile({
    //                     url: api.uphost,
    //                     filePath: tempFilePaths[ind1],
    //                     name: 'file',
    //                     formData: {
    //                         'token': that.data.getUploadImageToken
    //                     },
    //                     success: function(res) {
    //                         console.log("-----------2=" + ind1)
    //                         console.log("-----------22=" + tempFilePaths[ind1])
    //                         console.log("-----------23=" + res.data)
    //                         var data = JSON.parse(res.data);
    //                         var imagePath = api.upimg + '/' + data.key;
    //                         console.log("------------imagePath=" + imagePath)
    //                         imagePathArr[ind1] = imagePath;
    //                         if (ind1 == tempFilePaths.length - 1) {
    //                             // imagePathArr.forEach((src, index) => {
    //                             //     api.property.validImageSecurity.reqData["image_path"] = src;
    //                             //     util.request(api.property.validImageSecurity.reqUrl, api.property.validImageSecurity.reqData, api.property.validImageSecurity.reqType, false).then(function(res) {
    //                             //         let image_path = that.data.image_path
    //                             //         image_path.push(src);
    //                             //         that.setData({
    //                             //             image_path: image_path
    //                             //         })
    //                             //     });
    //                             // })
    //                         }
    //                     }
    //                 })
    //             };
    //         }
    //     })
    // },
    // 上传路线图
    upImg: function(e) {
        var that = this;
        if (that.data.image_path.length > 2) {
            util.alert("图片最多上传3张");
            return false;
        }
        wx.chooseImage({
            count: 3, // 最多可以选择的图片张数，默认9
            success: function(res) {
                var tempFilePaths = res.tempFilePaths;
                if (parseInt(tempFilePaths.length + that.data.image_path.length) > 3) {
                    util.alert("图片最多上传3张");
                    return false;
                } else {
                    that.uploadDIY(tempFilePaths, 0, 0, 0, tempFilePaths.length)
                }

            }
        })
    },
    uploadDIY: function(filePaths, successUp, failUp, i, length) {
        var that = this;
        wx.uploadFile({
            url: api.uphost,
            filePath: filePaths[i],
            name: 'file',
            formData: {
                'token': that.data.getUploadImageToken
            },
            success: (res) => {
                successUp++;
                console.log("success i=" + i)
                console.log("success filePaths=" + filePaths[i])
                console.log("success res=" + res)
                var data = JSON.parse(res.data);
                // 把获取到的路径存入imagesurl字符串中
                var imagePath = api.upimg + '/' + data.key;
                console.log("imagePath=" + imagePath)
                api.property.validImageSecurity.reqData["image_path"] = imagePath;
                util.request(api.property.validImageSecurity.reqUrl, api.property.validImageSecurity.reqData, api.property.validImageSecurity.reqType, false).then(function(res) {
                    let image_path = that.data.image_path
                    image_path.push(imagePath);
                    that.setData({
                        image_path: image_path
                    })
                });
            },
            fail: (res) => {
                console.log("fail res=" + res)
                failUp++;
            },
            complete: () => {
                i++;
                if (i == length) {
                    // Toast('总共' + successUp + '张上传成功,' + failUp + '张上传失败！');
                    console.log('总共' + successUp + '张上传成功,' + failUp + '张上传失败！')
                } else { //递归调用uploadDIY函数
                    that.uploadDIY(filePaths, successUp, failUp, i, length);
                }
            },
        });
    },
    //获取图片上传token
    getUploadImageToken: function() {
        let that = this;
        api.property.getUploadImageToken.reqData["open_id"] = app.globalData.open_id; //luocheng微信openid
        util.request(api.property.getUploadImageToken.reqUrl, api.property.getUploadImageToken.reqData, api.property.getUploadImageToken.reqType).then(function(res) {
            that.setData({
                getUploadImageToken: res.data.token,
            })
        });
    },
    //通过父栏目编号获取下面所有的子栏目
    getChildTreeListByParentID: function() {
        let that = this;
        util.request(api.property.getChildTreeListByParentID.reqUrl, api.property.getChildTreeListByParentID.reqData, api.property.getChildTreeListByParentID.reqType).then(function(res) {
            that.setData({
                getChildTreeListByParentID: res.data,
            })
            if (that.data.navigation_id == "") {
                that.setData({
                    navigation_id: res.data[0].id,
                })
            }
        });
    },
    //通过省市等编号获取最近的社区信息
    communityDetails: function() {
        let that = this;
        api.Index.getByCode.reqData["province"] = that.data.province;
        api.Index.getByCode.reqData["city"] = that.data.city;
        api.Index.getByCode.reqData["area"] = that.data.area;
        api.Index.getByCode.reqData["street"] = that.data.street;
        api.Index.getByCode.reqData["community"] = that.data.community;
        util.request(api.Index.getByCode.reqUrl, api.Index.getByCode.reqData, api.Index.getByCode.reqType).then(function(res) {
            that.setData({
                communityDetails: res.data,
            });
        });
    },
    onLoad: function(options) {
        let that = this;
        that.setData({
            wxUserInfo: app.globalData.userInfo,
            navigation_id: options.id || ""
        })
    },
    // 从编辑地址返回时刷新当前页面
    changeData: function(options) {
        let that = this;
        that.setData({
            "province": options.province,
            "city": options.city,
            "area": options.area,
            "street": options.street,
            "community": options.community,
        })
        if (that.data.province != "") {
            that.communityDetails();
        }
    },

    // 刷新返回的上一个页面
    refreshBeforePage: function(e) {
        var pages = getCurrentPages(); //当前页面栈
        if (pages.length > 1) {
            var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象
            beforePage.changeData();
        }
        wx.navigateBack({
            delta: 1
        })
    },
    onReady: function() {

    },


    onShow: function() {
        let that = this;
        that.getChildTreeListByParentID();
        that.getUploadImageToken();
    },
    onHide: function() {
        // 页面隐藏
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        let that = this;
        that.onShow();
        util.alert('正在刷新数据...', 'loading');
        wx.stopPullDownRefresh(); //停止刷新操作
    },
    onReachBottom: function() {},
    onUnload: function() {
        // 页面关闭
    },
})