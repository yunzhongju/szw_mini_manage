const util = require('../../../utils/util.js');
const commonJs = require('../../../utils/common.js');
const api = require('../../../config/api.js');
const WxParse = require('../../../utils/wxParse/wxParse.js');
import common from '../../../config/newsAPI/common'
var app = getApp();
Page({
    data: {
        addressCode:'',
        chooseType:'',
        pro:'四川省',
        city:'成都市',
        country:'',
        street:'',
        community:'',
        show:false,
        columns: [],
				
			
        type: "index",
        array1: [],
        array2: [],
        array3: [],
        index: 0,
        city1: [],
        city1Index: 22,
        city2: [],
        city2Index: 0,
        city3: [],
        city3Index: null,
        city4: [],
        city4Index: null,
        city5: [],
        city5Index: null,
        communityDetails: [],
    },
		onClose:function(){
			this.setData({
				show:false
			})
		},
		onConfirm:function(val){
			console.log('选择',val)
			let type=this.data.chooseType
			let value=val.detail.value.text
            let index=val.detail.index
            let key=val.detail.value.key
			if(type==0){
				this.getNewAreas(1,key)
				this.setData({
					pro:value,
					city1Index:index
				})
			}else if(type==1){
				this.getNewAreas(2,key)
				this.setData({
					city:value,
					city2Index:index
				})
			}else if(type==2){
				this.getNewAreas(3,key)
				this.setData({
					country:value,
					city3Index:index
				})
			}else if(type==3){
				this.getNewAreas(4,key)
				this.setData({
					street:value,
					city4Index:index
				})
			}else if(type==4){
				this.setData({
					community:value,
					city5Index:index
				})
			}
			this.setData({
                show:false,
                addressCode:this.data.pro+this.data.city+this.data.country+this.data.street+this.data.community
			})
		},
		onCancel:function(){
			this.setData({
				show:false
			})
		},
		handleChoose:function(e){
			console.log('选择位置',e)
			if(e.currentTarget.dataset.type=='0'){
				console.log('test1',this.handleList(this.data.city1))
				this.setData({
					chooseType:0,
					columns:this.handleList(this.data.city1)
				})
			}else if(e.currentTarget.dataset.type=='1'){
				this.setData({
					chooseType:1,
					columns:this.handleList(this.data.city2)
				})
			}else if(e.currentTarget.dataset.type=='2'){
				this.setData({
					chooseType:2,
					columns:this.handleList(this.data.city3)
				})
			}else if(e.currentTarget.dataset.type=='3'){
				this.setData({
					chooseType:3,
					columns:this.handleList(this.data.city4)
				})
			}else if(e.currentTarget.dataset.type=='4'){
				this.setData({
					chooseType:4,
					columns:this.handleList(this.data.city5)
				})
			}
			this.setData({
				show:true
			})
		},
		
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
//   省份
    bindcity1: function(e) {
        console.log("?!")
        var selectIndex = e.detail.value;
        var city1 = this.data.city1;
        // city1.code = city1[selectIndex].code;
        this.setData({
            city1Index: selectIndex,
            city1: city1,
        });
        // this.cityFun2(city1.code)
        var id= this.data.city1[selectIndex].orgid
        this.getNewAreas(1,id)
    },
// 城市
    bindcity2: function(e) {
        var selectIndex = e.detail.value;
        var city2 = this.data.city2;
        // city2.code = city2[selectIndex].code;
        this.setData({
            city2Index: selectIndex,
            city2: city2,
        });
        // this.cityFun3(city2.code)
        var id= this.data.city2[selectIndex].orgid
        this.getNewAreas(2,id)
    },
    // 城区
    bindcity3: function(e) {
        var selectIndex = e.detail.value;
        var city3 = this.data.city3;
        // city3.code = city3[selectIndex].code;
        this.setData({
            city3Index: selectIndex,
            city3: city3,
        });
        // this.cityFun4(city3.code)
        var id= this.data.city3[selectIndex].orgid
        this.getNewAreas(3,id)
    },
    // 街道
    bindcity4: function(e) {
        var selectIndex = e.detail.value;
        var city4 = this.data.city4;
        // city4.code = city4[selectIndex].code;
        this.setData({
            city4Index: selectIndex,
            city4: city4,
        });
        // this.cityFun5(city4.code)
        var id= this.data.city4[selectIndex].orgid
        this.getNewAreas(4,id)
    },
    bindcity5: function(e) {
        var selectIndex = e.detail.value;
        var city5 = this.data.city5;
        // city5.code = city5[selectIndex].value;
        // console.log(city5)
        this.setData({
            city5Index: selectIndex,
            city5: city5
        });
    },

    cityFun1: function(t) {
        let that = this;
        util.requestAll(api.Index.position.reqUrl + t + ".json", api.Index.position.reqData, api.Index.position.reqType).then(function(res) {
            console.log(res,"省")
            if (res.length > 0) {
                that.setData({
                    city1: res,
                })
                that.cityFun2(res[22].code)
            }
        });
    },
    cityFun2: function(t) {
        let that = this;
        util.requestAll(api.Index.position.reqUrl + t + ".json", api.Index.position.reqData, api.Index.position.reqType).then(function(res) {
            console.log(res,"市")
            if (res.length > 0) {
                that.setData({
                    city2: res,
                })
                that.cityFun3(res[0].code)
            }
        });
    },
    cityFun3: function(t) {
        let that = this;
        util.requestAll(api.Index.position.reqUrl + t + ".json", api.Index.position.reqData, api.Index.position.reqType).then(function(res) {
            console.log(res,"区")
            if (res.length > 0) {
                that.setData({
                    city3: res,
                })
                that.cityFun4(res[0].code)
            }
        });
    },
    cityFun4: function(t) {
        let that = this;
        util.requestAll(api.Index.position.reqUrl + t + ".json", api.Index.position.reqData, api.Index.position.reqType).then(function(res) {
            console.log(res,"街道")
            if (res.length > 0) {
                that.setData({
                    city4: res,
                })
                if (that.data.type == "accounts") {
                    return false;
                }
                that.cityFun5(res[0].code)
            }
        });
    },
    cityFun5: function(t) {
        let that = this;
        api.Index.getDropDownList.reqData['street'] = t;
        util.requestAll(api.Index.getDropDownList.reqUrl, api.Index.getDropDownList.reqData, api.Index.getDropDownList.reqType).then(function(res) {
            that.setData({
                city5: res.data,
            })
        });
    },

    //通过经纬度获取最近的社区信息
    communityDetails: function() {
        let that = this;
        console.log('App对象',app.globalData)
        if (app.globalData.choosecommunity.province != "") {
            api.Index.getByCode.reqData["province"] = app.globalData.choosecommunity.province;
            api.Index.getByCode.reqData["city"] = app.globalData.choosecommunity.city;
            api.Index.getByCode.reqData["area"] = app.globalData.choosecommunity.area;
            api.Index.getByCode.reqData["street"] = app.globalData.choosecommunity.street;
            api.Index.getByCode.reqData["community"] = app.globalData.choosecommunity.community;
            util.request(api.Index.getByCode.reqUrl, api.Index.getByCode.reqData, api.Index.getByCode.reqType).then(function(res) {
                that.setData({
                    communityDetails: res.data,
                });
            });
        } else if (app.globalData.longitude != "" && app.globalData.latitude != "") {
            api.Index.getRecently.reqData["longitude"] = app.globalData.longitude;
            api.Index.getRecently.reqData["latitude"] = app.globalData.latitude;
            util.request(api.Index.getRecently.reqUrl, api.Index.getRecently.reqData, api.Index.getRecently.reqType).then(function(res) {
                that.setData({
                    communityDetails: res.data,
                });
            });
        } else {
            util.request(api.Index.getDefaultCommunity.reqUrl, api.Index.getDefaultCommunity.reqData, api.Index.getDefaultCommunity.reqType).then(function(res) {
                that.setData({
                    communityDetails: res.data,
                });
            });
        }
    },
    //通过经纬度获取最近的社区信息
    TapLocation: function() {
        let that = this;
        wx.getLocation({
            type: 'wgs84',
            success(res) {
                const latitude = res.latitude
                const longitude = res.longitude
                const speed = res.speed
                const accuracy = res.accuracy
                app.globalData.latitude = res.latitude;
                app.globalData.longitude = res.longitude;
                that.communityDetails();
            }
        })
    },
    //通过经纬度获取最近的社区信息
    sureBtn: function() {
        let that = this;
        if (that.data.type == "index") {
            app.globalData.choosecommunity = {
                province: that.data.city1[that.data.city1Index].orgid,
                city: that.data.city2[that.data.city2Index].orgid,
                area: that.data.city3[that.data.city3Index].orgid,
                street: that.data.city4[that.data.city4Index].orgid,
                community: "",
            }
            
            if (that.data.city5.length > 0) {
                app.globalData.choosecommunity.community = that.data.city5[that.data.city5Index].orgid;
            }
            util.alert("选择地址成功")
        }
        // console.log('确定添加社区', app.globalData.choosecommunity)
        // debugger
        that.refreshBeforePage();
    },
    // 刷新返回的上一个页面
    refreshBeforePage: function(e) {
        var that = this;
        var pages = getCurrentPages(); //当前页面栈
        if (pages.length > 1) {
            var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象
            if (that.data.type == "index") {
                beforePage.changeData(); //触发父页面中的方法
            } else if (that.data.type == "accounts") {
                debugger
                beforePage.setData({
                    "province": that.data.city1Index?that.data.city1[that.data.city1Index].orgid:null,
                    "city": that.data.city2Index?that.data.city2[that.data.city2Index].orgid:null,
                    "area": that.data.city3Index?that.data.city3[that.data.city3Index].orgid:null,
                    "street": that.data.city4Index?that.data.city4[that.data.city4Index].orgid:null,
                    "community":that.data.city5Index?that.data.city5[that.data.city5Index].orgid:null,
                    "addressCode": that.data.addressCode,
                }); //触发父页面中的方法
                // console.log(that.data.city1[that.data.city1Index].orgname + that.data.city2[that.data.city2Index].orgname+ that.data.city3[that.data.city3Index].orgname+that.data.city4[that.data.city4Index].orgname+that.data.city5[that.data.city5Index].orgname)
                console.log(beforePage.data.addressCode,'啥??')
            } else {
                var community1 = ""
                if (that.data.city5.length > 0) {
                    community1 = that.data.city5[that.data.city5Index].orgid;
                }
                if (that.data.city5.length < 1) {
                    that.setData({
                        community:''
                    })
                }
                let city6=that.data.city5
                let params=[
                    {name:that.data.city1[that.data.city1Index].orgname,id:that.data.city1[that.data.city1Index].orgid},
                    {name:that.data.city2[that.data.city2Index].orgname,id:that.data.city2[that.data.city2Index].orgid},
                    {name:that.data.city3[that.data.city3Index].orgname,id:that.data.city3[that.data.city3Index].orgid},
                    {name:that.data.city4[that.data.city4Index].orgname,id:that.data.city4[that.data.city4Index].orgid},
                    {name: city6.length!=0?city6[that.data.city5Index].orgname:'',id:city6.length!=0?city6[that.data.city5Index].orgid:''},
                ]
                beforePage.changeData(params); //触发父页面中的方法
            }
        }
        wx.navigateBack({
            delta: 1
        })
    },
    onLoad: function(options) {
        console.log('添加页面进来',options)
        this.setData({
            type: options.type
        });
        this.getNewAreas(0)
        this.getNewAreas(1,"510000")
        this.getNewAreas(2,"510100")
        this.getNewAreas(3,"510104")
        this.getNewAreas(4,"510104020")
    },
    onReady: function() {
       
    },


    onShow: function() {
        
        // this.cityFun1(1);
        // this.getNewAreas(2,this.data.city2[0].orgid)
        // this.communityDetails()
        // this.setData({
        //     pro:this.data.city1[22].orgname,
        //     city:this.data.city2[0].orgname,
        //     country:this.data.city3[0].orgname,
        //     street:this.data.city4[0].orgname,
        //     community:this.data.city5[0].orgname
        // })
    },
    getNewAreas:function(type,pid=''){
        common.getAreas(pid).then(res=>{
            // console.log('区域',res)
            if(type==0){
                this.setData({
                    city1:res
                })
            }else if(type==1){
                this.setData({
                    city2:res
                })
            }else if(type==2){
                this.setData({
                    city3:res
                })
            }else if(type==3){
                this.setData({
                    city4:res
                })
            }else if(type==4){
                this.setData({
                    city5:res
                })
            }else{
                console.log('other')
            }
            
        })
    },
    onHide: function() {
        // 页面隐藏
    },
		handleList:function(arr){
			let newArr=[]
			for(let i=0;i<arr.length;i++){
				let p={}
				p['key']=arr[i].orgid
				p['text']=arr[i].orgname
				newArr.push(p)
			}
			return newArr
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
    onReachBottom: function() {

    },
    onUnload: function() {
        // 页面关闭
    },
})