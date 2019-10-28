<template>
	<div class="me1-wrap">
		<div class="username">
			<image src="/static/images/time-axis.png" alt=""></image>
			<span>未登录</span>
		</div>
		<a  href="/pages/integral/main" class="list">
			<image src="/static/images/me-icon1.png" alt=""></image>
			<span>我的积分</span>
			<image class="to-right" src="/static/images/to-right.png" alt=""></image>
		</a>
		<a  href="/pages/myshare/main" class="list">
			<image src="/static/images/me-icon2.png" alt=""></image>
			<span>共享活动</span>
			<image class="to-right" src="/static/images/to-right.png" alt=""></image>
		</a>
		<a href="/pages/collections/main" class="list">
			<image src="/static/images/me-icon3.png" alt=""></image>
			<span>我的收藏</span>
			<image class="to-right" src="/static/images/to-right.png" alt=""></image>
		</a>
		<a  href="/pages/setphone/main" class="list">
			<image src="/static/images/me-icon4.png" alt=""></image>
			<span>绑定手机</span>
			<image class="to-right" src="/static/images/to-right.png" alt=""></image>
		</a>
        <div class="notlogin-wrap">
            <div class="opa"></div>
			<div class="notlogin-con">
                <h6>
			        <image src="/static/images/logo.png" alt=""></image>
                    <span>哔吧啦</span>
                    <b>申请</b>
                </h6>
                <h5>
                    获取你的昵称、头像、地区及性别
                </h5>
                <div class="face-wrap">
			        <image class="face" src="/static/images/logo.png" alt=""></image>
                    <div class="username">
                        <!-- <p>南瓜头</p>
                        <p>微信个人信息</p> -->
                        <open-data class="user-avatar" type="userAvatarUrl"></open-data>
                        <open-data class="user-name" type="userNickName" lang="zh_CN"></open-data>
                    </div>
                    <image class="yes" src="/static/images/yes.png" alt=""></image>
                </div>
                <div class="btn-wrap">
                    <span>取消</span>
                    <!-- <span @click="login">取消</span> -->
                    <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo">授权</button>
                </div>
            </div>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      openid:''
    }
  },
methods:{
    login(){
        let that =this
         wx.getUserInfo({
            success: function(res) {
                console.log(res)
                var userInfo = res.userInfo
                var nickName = userInfo.nickName
                var avatarUrl = userInfo.avatarUrl
                var gender = userInfo.gender //性别 0：未知、1：男、2：女
                var province = userInfo.province
                var city = userInfo.city
                var country = userInfo.country
            }
        })
		  wx.login({
            success (res) {
                console.log(res)
                if (res.code) {
                //发起网络请求
                   that.$fly.request({
                    method: 'get', // post/get 请求方式
                    url: '/api/login/'+res.code,
                    body: {}
                    }).then(data => {
                        console.log(data)
                        that.openid=data.openid;
                        wx.setStorage({
                            key:"openid",
                            data:data.openid
                        })
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
	  },
    bindGetUserInfo(e){
        console.log(e)
        let encryptedData = e.mp.detail.encryptedData;
        let iv = e.mp.detail.iv;
        let that =this;
        wx.login({
            success (res) {
                console.log(res)
                if (res.code) {
                //发起网络请求
                   that.$fly.request({
                    method: 'get', // post/get 请求方式
                    url: '/api/login/'+res.code,
                    body: {}
                    }).then(data => {
                        console.log(data)
                        that.openid=data.openid;
                        wx.setStorage({
                            key:"openid",
                            data:data.openid
                        })
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
    
    }
},
  created () {
  }
}
</script>

<style scoped>
.notlogin-wrap{
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}
.notlogin-wrap .opa{
    width: 100%;
	height: 100%;
    background: #000000;
	opacity: 0.4;
}
.notlogin-con{
    position: absolute;
    bottom: 0;
    left: 0;
    height: 602rpx;
    width: 100%;
    padding: 20rpx;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 8rpx 8rpx 0 0;
}
.notlogin-con h6{
    display: flex;
    line-height: 60rpx;
}
.notlogin-con h6 image{
    width: 54rpx;
    height: 54rpx;
    margin: 20rpx;
    margin-left: 0;
}
.notlogin-con h6 span{
    font-size: 30rpx;
    color: #000000;
    line-height: 60rpx;
    height: 60rpx;
    margin: 20rpx;
}
.notlogin-con h6 b{
    font-size: 30rpx;
    line-height: 60rpx;
    height: 60rpx;
    color: #000000;
    font-weight: bold;
    margin: 20rpx;
    margin-left: 0;
}
.notlogin-con h5 {
    color: #000000;
    font-weight: bold;
    font-size: 32rpx;
    line-height: 80rpx;
    height: 80rpx;
    padding-bottom: 20rpx;
    border-bottom: 2rpx solid #EDEDED;
}
.notlogin-con .face-wrap{
    display: flex;
    height: 126rpx;
    justify-content: space-between;
    border-bottom: 2rpx solid #EDEDED;
}
.notlogin-con .face-wrap .face{
    width: 80rpx;
    height: 80rpx;
    border-radius: 8rpx;
    margin-right: 20rpx;
    margin-top: 20rpx;
}
.notlogin-con .face-wrap .username{
    width: 556rpx;
    height: 106rpx;
    display: flex;
    flex-wrap: wrap;
    padding: 10rpx 0;
}
.notlogin-con .face-wrap .username p:nth-child(1){
    font-size: 30rpx;
    color: #000000;
    width: 100%;
    height: 50rpx;
    line-height: 50rpx;
}
.notlogin-con .face-wrap .username p:nth-child(2){
    font-size: 30rpx;
    color: #C0C0C0;
    width: 100%;
    height: 50rpx;
    line-height: 50rpx;
}
.notlogin-con .face-wrap .yes{
    width: 32rpx;
    height: 24rpx;
    margin-right: 20rpx;
    margin-top: 50rpx;
}
.btn-wrap{
    width: 520rpx;
    height: 80rpx;
    display: flex;
    justify-content: space-between;
    margin: 80rpx auto 0;
}
.btn-wrap span{
    width: 240rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    border-radius: 8rpx;
    font-size: 34rpx;
    border: 0 !important;
}
.btn-wrap span:nth-child(1){
    background: #EDEDED;
    color: #43B34F;
}
.btn-wrap span:nth-child(2){
    background: #43B34F;
    color: #ffffff;
}
.list{
	display: flex;
	height: 118rpx;
	line-height: 118rpx;
	border-bottom:  2rpx solid #F4F4F4;
}
.list image{
	width: 40rpx;
	height: 40rpx;
	margin: 40rpx 20rpx;
}
.list span{
	color: #000000;
	font-size: 30rpx;
	width: 610rpx;
}
.list image.to-right{
	width: 20rpx;
}
.username{
	display: flex;
	height: 148rpx;
	line-height: 148rpx;
	border-bottom:  2rpx solid #F4F4F4;
}
.username image{
	width: 90rpx;
	height: 90rpx;
	margin: 30rpx 20rpx 0;
}
.username span{
	color: #000000;
	font-size: 30rpx;
}
</style>
