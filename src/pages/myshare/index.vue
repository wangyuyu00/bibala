<template>
	<div class="my-share">
		<div class="input-wrap">
            <span>活动名称</span>
            <input type="text" placeholder="请输入活动名称" v-model="title">
        </div>
        <div class="input-wrap">
            <span>活动链接</span>
            <input type="text" placeholder="请输入活动链接" v-model="website">
        </div>
        <div class="input-wrap">
            <span>活动图片</span>
            <input type="text" placeholder="请添加活动图片" disabled>
            <image class="upload-icon uploadimg" v-if="path!=null" :src="path" alt=""></image>
			<image class="upload-icon" @click="uploadPhoto()" src="/static/images/upload.png" alt=""></image>
        </div>
        <div class="tips">
            <p>
                <span>1.</span>
                <span>哔吧啦是去中心化社区，邀请大家共享自己熟悉的活动，进行哔吧啦积分挖矿;</span>
            </p>
            <p>
                <span>2.</span>
                <span>第一个共享平台未有的活动，并经平台确认，该用户可以获得挖矿激励100积分;</span>
            </p>
            <p>
                <span>3.</span>
                <span>同时，该用户的邀请用户也将获得邀请挖矿激励30积分;</span>
            </p>
            <p>
                <span>4.</span>
                <span>哔吧啦积分将作为用户参与哔吧啦社区的权益证明;</span>
            </p>
            <p>
                <span>5.</span>
                <span>本次邀请共享活动长期有效，大家共享起来吧!</span>
            </p>
        </div>
        <div class="submit" @click="addActivity">提交</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      path:null,
      title:null,
      website:null,
      file:'',//最后提交的图片地址
      source:null,//来源的openid
    }
  },
  created () {
    
  },
   onShareAppMessage: function(options) {
    // console.log('分享的代码！！')
},
onLoad: function(options) {
    console.log(options);
    this.source=options.openid
},
  mounted(){
      let that =this;
        wx.getStorage({
            key: 'openid',
            success:function(res) {
                that.openId = res.data;
                // console.log( that.openId)
            }
        })

        // console.log('来源',wx.getLaunchOptionsSync())
  },
  methods:{
      addActivity(){
          if(this.title==null){
            wx.showModal({
                title: '提示',
                content: '请填写活动名称',
                success (res) {
                    if (res.confirm) {
                    // console.log('用户点击确定')
                    } else if (res.cancel) {
                    // console.log('用户点击取消')
                    }
                }
            })
            return
          }
        //   console.log('this.file',this.file)
          if(this.website==null && this.file==''){
            wx.showModal({
                title: '提示',
                content: '请填写活动链接,或者上传活动图片',
                success (res) {
                    if (res.confirm) {
                    // console.log('用户点击确定')
                    } else if (res.cancel) {
                    // console.log('用户点击取消')
                    }
                }
            })
            return
          }
        

          this.$fly.request({
				method: 'post',
				url: '/api/addActivity/'+this.openId,
				body: {}
			},{
                imageurl: this.file,
                title: this.title,
                website: this.website,
                source: this.source,
            }).then(res => {
				if(res.err==null){
                    //成功
                    wx.showToast({
                        title: '提交成功',
                        icon: 'success',
                        mask: true,
                        duration: 1000
                    });
                    this.title=null;
                    this.file=null;
                    this.path=null;
                    this.website=null;
                }else{
                    //失败
                    wx.showToast({
                        title: "提交失败",
                        // icon: 'fail',
                        image:'/static/images/cuo.png',
                        mask: true,
                        duration: 2000
                    });
                }
				
			})
      },
      uploadPhoto(){
           let that = this; 
            wx.chooseImage({
            count: 1, // 默认9
            //   sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    let tempFilePaths = res.tempFilePaths;
                    that.upload(tempFilePaths);
                }
            })
      },
      upload(path) {
        //   console.log(path)
            let that =this;
            that.path=path;
            wx.uploadFile({
                url: "https://xcx.coinpany.cn/api/file",
                filePath: path[0], 
                name: 'file',
                header: { "Content-Type": "multipart/form-data" },
                formData: {
                    //和服务器约定的token, 一般也可以放在header中
                    // 'session_token': wx.getStorageSync('session_token')
                },
                success: function (res) {
                    let res1 =JSON.parse(res.data);
                    that.file =res1.data;
                    
                    // console.log(res1);
                    // console.log(that.file);
                },
                fail: function (e) {
                    // console.log(e);
                },
                complete: function () {
                    wx.hideToast();  //隐藏Toast
                }
            })
        }
  }
}
</script>

<style scoped>
.submit{
    width: 710rpx;
	height: 80rpx;
	line-height: 80rpx;
	background: #43B34F;
	color: #ffffff;
	text-align: center;
    border-radius: 8rpx;
    
}
.tips{
    padding: 40rpx 10rpx;
}
.tips p{
    display: flex;
}
.tips p span{
    font-size: 28rpx;
    color: #202020;
    letter-spacing:2rpx;
}
.tips p span:nth-child(1){
    line-height: 48rpx;
}
.tips p span:nth-child(2){
    line-height: 48rpx;
}
.my-share{
    padding: 20rpx;
}
.input-wrap{
    border-bottom: 2rpx solid #F4F4F4;
    display: flex;
    flex-wrap: wrap;
}
.input-wrap span{
    height: 96rpx;
    line-height: 96rpx;
    width: 25%;
    font-size: 30rpx;
    color: #000000;
}
.input-wrap input{
    height: 96rpx;
    line-height: 96rpx;
    width: 75%;
    font-size: 28rpx;
    color: #B9B9B9;
}
.input-wrap .uploadimg{
    margin-right: 20rpx;
}
.upload-icon{
    width: 145rpx;
    height: 145rpx;
    margin-bottom: 40rpx;
}
</style>
