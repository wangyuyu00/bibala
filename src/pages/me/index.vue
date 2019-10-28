<template>
	<div class="me-wrap">
		<div class="username" v-if="openId!=null">
			<!-- <image src="/static/images/time-axis.png" alt=""></image>
			<span>{{openId}}</span> -->
			<open-data class="user-avatar" type="userAvatarUrl"></open-data>
            <open-data class="user-name" type="userNickName" lang="zh_CN"></open-data>
		</div>
		<div   class="username" v-if="openId ==null">
			<image  class="user-avatar" src="/static/images/notlogin.png" alt=""></image>
			<span class="user-name">未登录</span>
			<button class="not-btn" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">授权</button>
		</div>
		<div class="notlogin">
			<div>
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
				<a  @click="tophone" class="list">
					<image src="/static/images/me-icon4.png" alt=""></image>
					<span>绑定手机</span>
					<image class="to-right" src="/static/images/to-right.png" alt=""></image>
					<button v-if="!phone" open-type='getPhoneNumber' @getphonenumber="bindgetphonenumber">获取用户手机号</button>
				</a>
			</div>
			<div class="notlogin-a"  v-if="openId==null">
				<button  ref="not" id="not-btn" class="not-btn" open-type="getUserInfo" @getuserinfo="bindGetUserInfo(event)">授权</button>
			</div>
			<!-- <a class="notlogin-a" @click="login" v-if="openId!==null"></a> -->
		</div>
	</div>
</template>

<script>
// import { formatTime } from '@/utils/index'
// import card from '@/components/card'

export default {
  // components: {
  //   card
  // },

  data () {
    return {
      openId:null,
      sessionKey:null,
      phone:null,
    }
  },
	onShareAppMessage: function(options) {
		console.log('分享的代码！！')
	},
  created () {
    
  },
  onTabItemTap(item) {
    // 可以在此做自己需求的逻辑操作，如点击出现弹窗等
	// this.bindGetUserInfo();
	console.log(item)
	// this.$ref.not.getuserinfo()
  },
  mounted(){
	  this.openId = this.openid;
	  this.sessionKey = this.session_key;
	  this.phone = this.phoneNumber;
	//   wx.authorize({scope: "scope.userInfo"})
	console.log(this.openId)
	console.log(this.sessionKey)
	console.log(this.phone)
	// this.bindGetUserInfo()
  },

  methods:{
	  tophone(){
		  if(!this.phone)return
		  wx.navigateTo({
			  'url':'/pages/setphone/main?phone='+this.phone
		  })
	  },
	  bindgetphonenumber(e){
		  console.log('绑定手机号',e)
		  let encryptedData = e.mp.detail.encryptedData;
		  let iv = e.mp.detail.iv;
		  console.log('绑定手机号',encryptedData)
		  console.log('this.session_key',this.sessionKey)
		  this.$fly.request({
				method: 'post', // post/get 请求方式
				url: '/api/decryptData',
				body: {}
				},{
                encryptedData: encryptedData,
                iv: iv,
                sessionkey: this.sessionKey,
                openid: this.openId,
            }).then(data => {
				console.log(data)
				this.phone = data.data.phoneNumber;
				wx.setStorage({
					key:"phoneNumber",
					data:this.phone
				});
				this.$fly.request({
					method: 'get', // post/get 请求方式
					url: '/api/bind/'+this.openId+'/'+this.phone,
					body: {}
				}).then(data => {
					console.log(data)
					wx.showToast({
                    title: data.data,
                    icon: 'success',
                    mask: true,
                    duration: 1000
                })
				})
			})
	  },
	  bindGetUserInfo(e){
        console.log(e)
        let encryptedData = e.mp.detail.encryptedData;
        let iv = e.mp.detail.iv;
        let that =this;
        if(encryptedData){
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
						that.openId=data.openid;
						that.sessionKey=data.session_key;
                        wx.setStorage({
                            key:"openid",
                            data:data.openid
                        })
						wx.setStorage({
                            key:"session_key",
                            data:data.session_key
                        })
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
		}
    
    }
  }
}
</script>

<style scoped>
.notlogin{
	position: relative;
}
.notlogin-a{
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}
.list{
	display: flex;
	height: 98rpx;
	line-height: 98rpx;
	border-bottom:  2rpx solid #F4F4F4;
	position: relative;
}
.list image{
	width: 40rpx;
	height: 40rpx;
	margin: 30rpx 20rpx;
}
.list span{
	color: #000000;
	font-size: 30rpx;
	width: 610rpx;
}
.list button{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	opacity: 0;
}
.list image.to-right{
	width: 20rpx;
}
.username{
	position: relative;
	display: flex;
	height: 128rpx;
	line-height: 128rpx;
	border-bottom:  2rpx solid #F4F4F4;
}
.username .user-avatar{
	width: 90rpx;
	height: 90rpx;
	margin: 20rpx 20rpx 0;
}
.username .user-name{
	color: #000000;
	font-size: 30rpx;
}
.not-btn{
	position: absolute;
	width: 100%;
	height: 100%;
	opacity: 0;
}
</style>
