const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
var app = getApp();
import common from '../../../config/newsAPI/common'
import {
    saveApplySqManagerAPI
} from '../../../config/newsAPI/my_api'
import {getAreasAPI,getCsinformAPI} from '../../../config/newsAPI/api'
Page({

    data: {
        Csinform:'',
        showPopup:false,
        columns:[],
        parentId:"510100",
        loading:true,
        id:'',
        orgid:'',

        audit_obj: '',
        audit_status: '',
        audit_NoPass: false,
        showDialog: false,
        getUploadImageToken: "",
        addressCode: "选择地址",
        open_id: "",
        province: "",
        city: "",
        area: "",
        street: "",
        community:"",
        longitude: "",
        latitude: "",
        address: "",
        community_title: "",
        supporting_documents: "",
        user_name: "",
        phone: "",
        danwper: "", //证照进度条
        positive: "", //身份证正面
        back: "", //反面
        positivejd: "", //正面进度
        backjd: "",
        supporting_documents_br: false,
        positivebr: false,
        backbr: false,
        checked: true,
        danwpers: false,
        positivebrs: false,
        backbrs: false
    },

    onPickerCancel:function(){
        this.setData({
            showPopup:false
        })
    },
    onPickerConfirm:function(){
        this.setData({
            showPopup:false
        })
    },
    onPickerChange:function(e){
        console.log('改变',e)
        const { value, index } = e.detail
        wx.showToast({
            title: value[index].orgname,
            icon:'none',
            duration:1500
          })
        this.setData({
            addressCode:value[index].orgname,
            orgid:value[index].orgid
        })
        this.getAreas(value[index].orgid,index)
    },
    onPopupClose:function(){
        this.setData({
            showPopup:false
        })
    },
    getAreas:function(parentId,index){
        getAreasAPI({parentId:parentId}).then(res=>{
            // console.log('地址额111',res)
            if(res.data.length===0){
                // wx.showToast({
                //   title: '暂无数据',
                //   icon:'none'
                // })
                return
            }
            if(res.data.length!==0){
                let values={
                    values:res.data,
                    defaultIndex: 0 //默认展示第几位，可根据需求来定
                }
                let copyColumns=JSON.parse(JSON.stringify(this.data.columns))
                if(copyColumns[index+2]){
                    copyColumns.pop()
                    copyColumns.pop()
                    copyColumns.push(values)
                }else if(copyColumns[index+1]){
                    copyColumns.pop()
                    copyColumns.push(values)
                }else{
                    copyColumns.push(values)
                }
                this.setData({
                    loading:false,
                    columns:copyColumns
                })
            }
        })
    },
    checkboxChange(e) {
        // this.setData({
        //     checked:!this.data.checked
        // })
        this.setData({
            checked: !this.data.checked
        })
        console.log("用户打勾的是 ", this.data.checked)
    },
    // 删除掉某一张图片
    rompost(e) {
        var type = e.currentTarget.dataset.type
        console.log(type)
        if (type == "licence") {
            this.setData({
                supporting_documents: [],
                supporting_documents_br: false
            })
        }
        if (type == "positive") {
            this.setData({
                positive: [],
                positivebr: false
            })
        }
        if (type == "back") {
            this.setData({
                back: [],
                backbr: false
            })
        }


    },
    toggleDialog: function (e) {
        this.setData({
            showDialog: !this.data.showDialog
        });
    },
    user_name: function (e) {
        let that = this;
        that.setData({
            user_name: e.detail.value
        })
    },
    phone: function (e) {
        let that = this;
        that.setData({
            phone: e.detail.value
        })
    },
    community_title: function (e) {
        let that = this;
        that.setData({
            community_title: e.detail.value
        })
    },
    // 跳转省市区选择页面
    TaptoSwitch_position: function (e) {
        // commonJs.TaptoSwitch_position("accounts")
        this.setData({
            showPopup:true
        })
    },
    // 跳转地图选择页面
    address: function (e) {
        wx.navigateTo({
            url: '/pages/my/position/position',
        });
    },
    // 上传图片
    upImg: function (e) {
        console.log(111)
        var type = e.currentTarget.dataset.type
        var that = this;
        wx.chooseImage({
            count: 1, // 最多可以选择的图片张数，默认9
            success: function (res) {
                var tempFilePaths = res.tempFilePaths;
                // console.log(that.data.getUploadImageToken)
                if (type == "licence") {
                    that.setData({
                        supporting_documents: tempFilePaths[0]
                    })
                }
                if (type == "positive") {
                    //身份证正面
                    that.setData({
                        positives: tempFilePaths[0]
                    })
                }
                if (type == "back") {
                    //身份证反面
                    that.setData({
                        backs: tempFilePaths[0]
                    })
                }
                const upload_task = wx.uploadFile({
                    url: api.uphost,
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                        'token': that.data.getUploadImageToken
                    },
                    success: (res) => {
                        console.log(res)
                        var data = JSON.parse(res.data);
                        // 把获取到的路径存入imagesurl字符串中
                        var imagePath = api.upimg + '/' + data.key;
                        console.log(imagePath)
                        if (type == "licence") {
                            that.setData({
                                supporting_documents: imagePath
                            })
                        }
                        if (type == "positive") {
                            //身份证正面
                            that.setData({
                                positive: imagePath
                            })
                        }
                        if (type == "back") {
                            //身份证反面
                            that.setData({
                                back: imagePath
                            })
                        }
                    }
                });
                upload_task.onProgressUpdate((res) => {
                    console.log(res)
                    if (type == "licence") {
                        that.setData({
                            danwper: res.progress,
                        })
                        if (that.data.danwper < 100) {
                            console.log(that.data.danwper)
                            that.setData({
                                danwpers: true
                            })
                        } else {
                            that.setData({
                                danwpers: false,
                                supporting_documents_br: true
                            })
                        }
                    }
                    if (type == "positive") {
                        //身份证正面
                        that.setData({
                            positivejd: res.progress
                        })
                        if (that.data.positivejd < 100) {

                            that.setData({
                                positivebrs: true
                            })
                        } else {
                            that.setData({
                                positivebrs: false,
                                positivebr: true
                            })
                        }
                    }
                    if (type == "back") {
                        //身份证反面
                        that.setData({
                            backjd: res.progress
                        })
                        if (that.data.backjd < 100) {
                            that.setData({
                                backbrs: true
                            })
                        } else {
                            that.setData({
                                backbrs: false,
                                backbr: true
                            })
                        }
                    };
                })
            }

        })

    },
    reqsdf() {

    },

    //获取图片上传token
    getUploadImageToken: function () {
        let that = this;
        api.property.getUploadImageToken.reqData["open_id"] = app.globalData.open_id; //luocheng微信openid
        util.request(api.property.getUploadImageToken.reqUrl, api.property.getUploadImageToken.reqData, api.property.getUploadImageToken.reqType).then(function (res) {
            that.setData({
                getUploadImageToken: res.data.token,
            })
        });
    },
    //注册社区
    register: function () {
        let that = this;
        if (that.data.checked == "") {
            util.alert("需要同意社区治理协议");
            return false;
        }
        if (that.data.user_name == "") {
            util.alert("申请人名字必填");
            return false;
        }
        if (that.data.phone == "") {
            util.alert("申请人手机号码必填");
            return false;
        }
        if (that.data.community_title == "") {
            util.alert("社区名称必填");
            return false;
        }
        if (that.data.addressCode == "") {
            util.alert("地址必须选择");
            return false;
        }
        if (that.data.supporting_documents == "") {
            util.alert("必须上传社区证明文章");
            return false;
        }
        if (that.data.positives == "") {
            util.alert("必须上传身份证正面");
            return false;
        }
        if (that.data.backs == "") {
            util.alert("必须上传身份证反面");
            return false;
        }
        if(that.data.orgid==''){
            util.alert("必须选择街道或社区");
            return false;
        }
        if(that.data.addressCode.endsWith('区')||that.data.addressCode.endsWith('县')){
            util.alert("必须选择街道或社区");
            return false;
        }
        let op = {
            id:that.data.id?that.data.id:'',
            communityId: that.data.orgid,
            supportingDocuments: that.data.supporting_documents,
            userName: that.data.user_name,
            phone: app.globalData.phone,
            address: that.data.community_title,
            idcardFront: that.data.positive,
            idcardBack: that.data.back
        }
        console.log('提交的表单', op)
        that.subMit(op)
    },
    //获取申请社区审核状态
    getRegisterInfo: function () {
        let that = this;
        api.My.getRegisterInfo.reqData["open_id"] = app.globalData.open_id;
        util.request(api.My.getRegisterInfo.reqUrl, api.My.getRegisterInfo.reqData, api.My.getRegisterInfo.reqType).then(function (res) {
            if (res.data.audit == 2) {
                that.setData({
                    audit_NoPass: true,
                    audit_desc: res.data.audit_desc,
                })
            }
        });
    },
    onLoad: function (options) {
        let that = this;
        common.getMySqManagerDetail(res => {
            console.log('记录', res)
            if (res.data) {
                if (res.data.audit == 2) {
                    that.setData({
                        audit_obj: res.data,
                        audit_NoPass: true,
                        audit_desc: res.data.auditDesc,
                        id:res.data.id,
                        user_name:res.data.userName,
                        phone:res.data.phone,
                        community_title:res.data.address,
                        supporting_documents:res.data.supportingDocuments,
                        positives:res.data.idcardFront,
                        backs:res.data.idcardBack,
                        positive:res.data.idcardFront,
                        back:res.data.idcardBack,
                        supporting_documents_br:true,
                        positivebr:true,
                        backbr:true
                    })
                } 
            }
        })

        that.setData({
            phone: app.globalData.phone
        })

        // that.getUploadImageToken();
        common.getUpToken('image').then(res => {
            that.setData({
                getUploadImageToken: res
            })
        })
    },
    onReady: function () {
        getAreasAPI({parentId:this.data.parentId}).then(res=>{
            console.log('地址额111',res)
            let values={
                values:res.data,
                defaultIndex: 0 //默认展示第几位，可根据需求来定
            }
            let copyColumns=JSON.parse(JSON.stringify(this.data.columns))
            copyColumns.push(values)
            this.setData({
                loading:false,
                columns:copyColumns
            })
        })
        // console.log('values',this.data.columns)
    },

    onShow: function () {
        getCsinformAPI().then(res=>{
            this.setData({
                Csinform:res.data.phone
            })
        })
    },
    onHide: function () {
        // 页面隐藏
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh(); //停止刷新操作
    },
    onReachBottom: function () {},
    onUnload: function () {
        // 页面关闭
    },
    //提交
    subMit: function (op) {
        saveApplySqManagerAPI(op).then(res => {
            console.log('提交ok', res)
            if (res.status == 1) {
                wx.redirectTo({
                    url: "/pages/my/auditing/auditing"
                })
            }
        })
    },

})