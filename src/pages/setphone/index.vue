<template>
	<div class="setphone-wrap">
		<div v-if="false">
			<div class="input-wrap">
				<span>手机号</span>
				<input type="text" placeholder="请输入手机号码">
			</div>
			<div class="input-wrap">
				<span>验证码</span>
				<input type="text" placeholder="请输入验证码">
				<b>获取验证码</b>
			</div>
			<div class="submit">确定</div>
		</div>
		<div>
			<image class="phone-img" src="/static/images/phone.png" alt=""></image>
			<p class="phone-num">你的手机号：{{phone}}</p>
			<div class="submits" @click="goback">确定</div>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      phone:null
    }
  },
   onShareAppMessage: function(options) {
    console.log('分享的代码！！')
},
  mounted(){
	  this.phone=this.$root.$mp.query.phone;
	  console.log('setphone',this.$root.$mp)
  },
  created () {
    
  },
  methods:{
	  goback(){
		  wx.navigateBack()
	  }
  }
}
</script>

<style scoped>
.setphone-wrap{
  	padding: 20rpx;
}
.input-wrap{
	position: relative;
	display: flex;
	height: 106rpx;
	line-height: 106rpx;
	border-bottom: 2rpx solid #F4F4F4;
}
.input-wrap span{
	margin-right: 50rpx;
	color: #000000;
	font-size: 30rpx;
}
.input-wrap input {
	color: #B9B9B9;
	height: 106rpx;
	line-height: 106rpx;
	width: 70%;
}
.input-wrap  b{
	position: absolute; 
	right: 0;
	top: 25rpx;
	padding: 0 20rpx;
	height: 60rpx;
	line-height: 60rpx;
	background: #43B34F;
	color: #ffffff;
	text-align: center;
	border-radius: 8rpx;
}
.submit{
	position: fixed;
	bottom: 60rpx;
	width: 710rpx;
	height: 80rpx;
	line-height: 80rpx;
	left: 20rpx;
	background: #43B34F;
	color: #ffffff;
	text-align: center;
	border-radius: 8rpx;
}
.phone-img{
	display: block;
	width: 114rpx;
	height: 206rpx;
	margin: 120rpx auto 0;
}
.phone-num{
	font-size: 34rpx;
	color: #000000;
	text-align: center;
	line-height: 80rpx;
	height:80rpx;
	padding-top: 40rpx;
	margin-bottom: 40rpx;
}
.submits{
	width: 710rpx;
	height: 80rpx;
	line-height: 80rpx;
	background: #43B34F;
	color: #ffffff;
	text-align: center;
	border-radius: 8rpx;
}
</style>

