<template>
    <div class="homeshare-warp">
        <image class="homeshare-bj" src="/static/images/font-bj.png" ></image>
        <div class="homeshare-con">
            <image class="font-img" src="/static/images/font.png" ></image>
            <p class="slogan">积分赚不停</p>
            <div class="tips-wrap">
                <h6>活动说明</h6>
                <p>1. 哔吧啦是去中心化社区，邀请大家共享自己熟悉的活动，进行哔吧啦积分挖矿;</p>
                <p>2. 第一个共享平台未有的活动，并经平台确认，该用户可以获得挖矿激励100积分;</p>
                <p>3. 同时，该用户的邀请用户也将获得邀请挖矿激励30积分;</p>
                <p>4. 哔吧啦积分将作为用户参与哔吧啦社区的权益证明;</p>
                <p>5. 本次邀请共享活动长期有效，大家共享起来吧!</p>
                <button open-type="share" class="submit">立即分享</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
    return {
      options:{},
      openId:null
    }
  },
  mounted(){
        let that =this;
        wx.getStorage({
            key: 'openid',
            success:function(res) {
                that.openId = res.data;
                console.log( that.openId)
            }
        })
    //    this.options={
    //        openId:this.openId,
    //    }
    },
    onShareAppMessage: function() {
        console.log('分享的代码！！')
        return {
            // title: '微信小程序联盟',
            desc: '前沿科技活动都在这!',
            path: '/pages/myshare/main?openid='+this.openId
        }
	},
  methods: {
          
  }
}
</script>

<style scoped>
.homeshare-warp{
    width: 100%;
    height: 100%;
}
.homeshare-bj{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;left: 0;right: 0;bottom: 0;
}
.homeshare-con{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
.font-img{
    display: block;
    width: 463rpx;
    height: 110rpx;
    margin: 60rpx auto 20rpx;
}
.slogan{
    font-size: 92rpx;
    color: #ffffff;
    line-height: 120rpx;
    text-align: center;
    font-weight: normal;
}
.tips-wrap{
    width: 663rpx;
    height: 726rpx;
    padding: 20rpx;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 20rpx;
    margin: 40rpx auto;
}
.tips-wrap h6{
    height: 40rpx;
    line-height: 40rpx;
    padding-left: 20rpx;
    border-left: 6rpx solid #43B34F;
    margin-bottom: 40rpx;
}
.tips-wrap p{
    font-size: 28rpx;
    color: #000000;
    line-height: 48rpx;
    margin-bottom: 10rpx;
}
.tips-wrap .submit{
    width: 384rpx;
    height: 60rpx;
    line-height: 60rpx;
    font-size: 28rpx;
    border-radius: 30rpx;
    color: #ffffff;
    text-align: center;
    margin: 60rpx auto;
    background: linear-gradient(to right, #5CD786,#49BC5F);
}
</style>
