const util = require('../../utils/util.js');
const commonJs = require('../../utils/common.js');
Component({
    properties: {
        commonHeadHeight: {
            type: Object,
            value: {}
        },

    },
    data: {
        inputVal: '', //输入内容
    },
    methods: {
        //获取组件输入的内容传递给父页面
        getInput: function(e) {
            // this.setData({
            //     inputVal: e.detail.value
            // });
            // this.triggerEvent('getInput', this.data.inputVal);
            wx.navigateTo({
                url: "/pages/common/search/search",
            });
        },
    },

    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {}, // 此处attached的声明会被lifetimes字段中的声明覆盖
    ready: function() {
        var that = this;
        wx.getSystemInfo({
            success(res) {
                // console.log(res.model)
                // console.log(res.pixelRatio)
                // console.log("res.windowWidth=" + res.windowWidth)
                // console.log(res.windowHeight)
                // console.log("res.screenHeight=" + res.screenHeight)
                // console.log(res.language)
                // console.log(res.version)
                // console.log("res.statusBarHeight=" + res.statusBarHeight)

                that.setData({
                    "commonHeadHeight.statusBarHeight": (34 * 2),
                    "commonHeadHeight.titleHeight": res.statusBarHeight + 46
                });

            }
        })
    },

})