// components/share/share.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detail:{
      type:Object,
      value:{}
    },
    code:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isshow: false,
    canvasW: 0,
    canvasH: 0,
    tempFilePath:'',
    ctx: null,
  },

  /**
   * 组件的方法列表
   */

  methods: {
    hideRepost(){
      this.setData({
        isshow:false
      })
    },
    touchMove(){},
    touchStart(){},
    touchEnd(){},
    showCanvas() {
      this.setData({
        isshow: true
      })
      this._init()
    },
    async _init() {
      var rpx;
      //获取屏幕宽度，获取自适应单位
      wx.getSystemInfo({
        success: function(res) {
          rpx = res.windowWidth/375;
        },
      })
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      const ctx = wx.createCanvasContext('myCanvas', this)
      let canvasW=315*rpx
      let canvasH=515*rpx
      this.setData({
        canvasW,
        canvasH
      })
      ctx.setFillStyle('rgb(255, 255, 255)')
      ctx.fillRect(0, 0, canvasW, canvasH)
      ctx.save()
      //绘制封面
      let imgW=290*rpx
      let imgH=200*rpx
      let path=this.properties.detail.imagePath
      let img_path = await this.getImageInfo(path)
      ctx.drawImage(img_path.path, (canvasW-imgW)/2, 50*rpx, imgW, imgH)
      ctx.save()
      //绘制标题
      let title = this.properties.detail.title
      this.drawTitle(ctx,title,(canvasW-imgW)/2,270*rpx,imgW-(canvasW-imgW)/2)
      ctx.save()
      //绘制二维码
       let code_path =this.properties.code
       ctx.drawImage(code_path, (canvasW-imgW)/2, 380*rpx, 100*rpx, 100*rpx)
       ctx.save()
       let msg="关注我们的社区长按识别小程序"
       this.drawTitle(ctx,msg,canvasW/2, 400*rpx,(canvasW/2)-(canvasW-imgW)-(10*rpx))

       setTimeout(function () {
        ctx.draw()
        wx.hideLoading()
      }, 500)
       
    },
    //绘制标题
    drawTitle(context, t, x, y, w) {
      var chr = t.split("");
      var temp = "";
      var row = [];

      context.font = "18rpx Arial";
      context.fillStyle = "rgb(89, 89, 89)";
      context.setTextBaseline('middle')

      for (var a = 0; a < chr.length; a++) {
        if (context.measureText(temp).width < w) {
          ;
        } else {
          row.push(temp);
          temp = "";
        }
        temp += chr[a];
      }

      row.push(temp);

      for (var b = 0; b < row.length; b++) {
        context.fillText(row[b], x, y + (b + 1) * 20);
      }
    },
    //圆角矩形
    drawRoundRect(ctx, x, y, width, height, radius, color) {
      ctx.save();
      ctx.beginPath();
      ctx.setFillStyle(color);
      ctx.setStrokeStyle(color)
      ctx.setLineJoin('round'); //交点设置成圆角
      ctx.setLineWidth(radius);
      ctx.strokeRect(x + radius / 2, y + radius / 2, width - radius, height - radius);
      ctx.fillRect(x + radius, y + radius, width - radius * 2, height - radius * 2);
      ctx.stroke();
      ctx.closePath();
    },
    //获取图片
    getImageInfo(imgSrc) {
      return new Promise((resolve, reject) => {
        wx.getImageInfo({
          src: imgSrc,
          success: (image) => {
            resolve(image);
            console.log('获取图片成功', image)
          },
          fail: (err) => {
            reject(err);
            wx.showToast({
              title: '获取图片失败',
              icon:'none'
            })
            console.log('获取图片失败', err)
            this.setData({
              isshow:false
            })
          }
        });
      });
    },
    saveImage(){
      let that =this
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success () {
                that.canvasToImg()
              }
            })
          }else{
            that.canvasToImg()
          }
        }
      })
    },
     canvasToImg(){
      let that =this
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
				quality: 1,
        success(res) {
          console.log(res.tempFilePath,'................')
          wx.saveImageToPhotosAlbum({
            filePath:res.tempFilePath,
            success(resp) { 
              wx.showToast({
                title: '图片保存成功',
                icon:"none"
              })
              that.setData({
                isshow:false
              })
            }
          })
        }
      },that)
    }
  }
})