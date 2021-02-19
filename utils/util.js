var api = require('../config/api.js');
const app = getApp()

function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "H+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**
 * 封封微信的的request
 */
function request(url, data = {}, method, asyncMethod = true) {
    // const app = getApp()
    // console.log("打印app",app)
    if (method == "" || method == undefined) {
        method = "post"
    }
    // console.log(data)
    return new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            data: data,
            method: method,
            async: asyncMethod,
            header: {
                // "Content-Type": "application/json"
                'x-requested-with': 'XMLHttpRequest',
                // 'wxa-sessionid':app.globalData.open_id
            },

            success: function (res) {
                // console.log('request',res)
                if (Number(res.data.code) == 0) {
                    resolve(res.data);
                } else {
                    alert(res.data.msg)
                }
            },
            fail: function (err) {
                reject(err);
            }
        })
    });
}
/**
 * 封封微信的的request
 */
function requestF(url, data = {}, method, asyncMethod = true) {
    if (method == "" || method == undefined) {
        method = "post"
    }
    // console.log(data)
    return new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            data: data,
            method: method,
            async: asyncMethod,
            header: {
                // "Content-Type": "application/json"
                'x-requested-with': 'XMLHttpRequest',
            },
            success: function (res) {
                // console.log('第一次',res)
                if (Number(res.data.code) == 0) {
                    resolve(res.data);
                } else {
                    alert(res.data.msg)
                }
            },
            fail: function (err) {
                reject(err);
            }
        })
    });
}
/**
 * 封封微信的的request
 */
function requestAll(url, data = {}, method) {
    // 
    if (method == "" || method == undefined) {
        method = "post"
    }
    return new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            data: data,
            method: method,
            header: {
                'x-requested-with': 'XMLHttpRequest',
                // 'wxa-sessionid':app.globalData.open_id
            },
            success: function (res) {
                // console.log('第二次',res)
                resolve(res.data);
            },
            fail: function (err) {
                reject(err);
            }
        })
    });
}

function alert(msg, type = "none") {
    var icon = type;
    return new Promise(function (resolve) {
        resolve(
            wx.showToast({
                icon: icon,
                title: msg,
                duration: 1500
            })
        );
    });
}

function handleTime(date) {
    var dateTime = new Date(date*1000)
    var currentTime = new Date();
    var currentHours = currentTime.getHours()
    var h = dateTime.getHours()
    // debugger
    var m = dateTime.getMinutes()
    var month = dateTime.getMonth() + 1
    var day = dateTime.getDay()
    var d = currentTime.getDay()
    if (day - d >= 1 && day - d < 2) {
        return '明天 ' + h + " : " + (m > 9 ? m : '0' + m)
    } else if (day - d < 1) {
        return '今天 ' + h + " : " + (m > 9 ? m : '0' + m)
    } else if (day - d >= 2) {
        return month + '-' + day + ' ' + h + " : " + (m > 9 ? m : '0' + m)
    }
}


module.exports = {
    formatTime,
    formatDate,
    request,
    requestAll,
    // requestF,
    alert,
    handleTime
}