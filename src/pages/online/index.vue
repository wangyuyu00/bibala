<template>
	<div class="online-wrap">
		<div class="online-title">
			<span :class="flag==0?'active':''" @click="flag=0">
				今天
				<b v-if="flag==0"></b>
			</span>
			<span :class="flag==1?'active':''" @click="flag=1">
				本周
				<b v-if="flag==1"></b>
			</span>
		</div>
		<!-- 今天 -->
		<div class="online-list-wrap" v-if="flag==0">
			<div class="online-list-con">
				<div class="online-list-title">
					<span>10:00</span>
				</div>
				<div class="online-list-border">
					<a href="/pages/onlinedetalis/main?slug=5dae6b690c4c2b297e35e9c3" class="online-list-item">
						<image class="left-img" src="/static/images/banner.jpg" alt=""></image>
						<div class="right-div">
							<h6>火星号“嘉宾有约”</h6>
							<p>主办方：火星财经</p>
							<p>嘉&nbsp;&nbsp;宾：Lao Ye、Aaron Gong</p>
						</div>
					</a>
					<a class="online-list-item">
						<image class="left-img" src="/static/images/banner.jpg" alt=""></image>
						<div class="right-div">
							<h6>火星号“嘉宾有约”</h6>
							<p>主办方：火星财经</p>
							<p>嘉&nbsp;&nbsp;宾：Lao Ye、Aaron Gong</p>
						</div>
					</a>
				</div>
			</div>
		</div>
		<!-- 本周 -->
		<div class="online-list-wrap" v-if="flag==1">
			<div class="online-list-con">
				<div class="online-list-title">
					<span>今天</span>
				</div>
				<div class="online-list-border">
					<a class="online-list-item">
						<image class="left-img-big" src="/static/images/banner.jpg" alt=""></image>
						<div class="right-div1">
							<h6>火星号“嘉宾有约”</h6>
							<p>主办方：火星财经</p>
							<p>嘉&nbsp;&nbsp;宾：Lao Ye、Aaron Gong</p>
							<p>时&nbsp;&nbsp;间：17:00</p>
						</div>
					</a>
					<a class="online-list-item">
						<image class="left-img-big" src="/static/images/banner.jpg" alt=""></image>
						<div class="right-div1">
							<h6>火星号“嘉宾有约”</h6>
							<p>主办方：火星财经</p>
							<p>嘉&nbsp;&nbsp;宾：Lao Ye、Aaron Gong</p>
							<p>时&nbsp;&nbsp;间：17:00</p>
						</div>
					</a>
				</div>
			</div>
			<div class="online-list-con">
				<div class="online-list-title">
					<span>明天</span>
				</div>
				<div class="online-list-border">
					<a class="online-list-item">
						<image class="left-img-big" src="/static/images/banner.jpg" alt=""></image>
						<div class="right-div1">
							<h6>火星号“嘉宾有约”</h6>
							<p>主办方：火星财经</p>
							<p>嘉&nbsp;&nbsp;宾：Lao Ye、Aaron Gong</p>
							<p>时&nbsp;&nbsp;间：17:00</p>
						</div>
					</a>
					<a class="online-list-item">
						<image class="left-img-big" src="/static/images/banner.jpg" alt=""></image>
						<div class="right-div1">
							<h6>火星号“嘉宾有约”</h6>
							<p>主办方：火星财经</p>
							<p>嘉&nbsp;&nbsp;宾：Lao Ye、Aaron Gong</p>
							<p>时&nbsp;&nbsp;间：17:00</p>
						</div>
					</a>
				</div>
			</div>
			<div class="online-list-con">
				<div class="online-list-title">
					<span>2019-10-25</span>
				</div>
				<div class="online-list-border">
					<a class="online-list-item">
						<image class="left-img-big" src="/static/images/banner.jpg" alt=""></image>
						<div class="right-div1">
							<h6>火星号“嘉宾有约”</h6>
							<p>主办方：火星财经</p>
							<p>嘉&nbsp;&nbsp;宾：Lao Ye、Aaron Gong</p>
							<p>时&nbsp;&nbsp;间：17:00</p>
						</div>
					</a>
					<a class="online-list-item">
						<image class="left-img-big" src="/static/images/banner.jpg" alt=""></image>
						<div class="right-div1">
							<h6>火星号“嘉宾有约”</h6>
							<p>主办方：火星财经</p>
							<p>嘉&nbsp;&nbsp;宾：Lao Ye、Aaron Gong</p>
							<p>时&nbsp;&nbsp;间：17:00</p>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			flag:0,//0今天 1本周
		};
	},
	created() {},
	onShareAppMessage: function(options) {
		// console.log('分享的代码！！')
	},
	onLoad: function(options) {
		console.log(options);
	},
	mounted() {},
	methods: {}
};
</script>

<style scoped>
.online-list-wrap{
	padding: 20rpx;
}
.online-list-con{
	width: 100%;
}
.online-list-title{
	height: 50rpx;
	padding-top: 10rpx;
}
.online-list-title span{
	height: 40rpx;
	line-height: 40rpx;
	padding: 0 10rpx;
	font-size: 26rpx;
	color: #FFFFFF;
	background: #43B34F;
	border-radius: 18rpx;
}
.online-list-border{
	border-left: 4rpx solid #43B34F;
	margin: 0 0 0 38rpx;
	padding: 20rpx;
}
.online-list-con:last-child .online-list-border{
	border: 0;
}
.online-list-item{
	background: #F8F8F8;
	margin-bottom: 20rpx;
	display: flex;
	border-radius: 5rpx;
	padding: 20rpx;
}
.left-img{
	width: 220rpx;
	height: 140rpx;
	margin-right: 20rpx;
}
.left-img-big{
	width: 220rpx;
	height: 150rpx;
	margin-right: 20rpx;
}
.right-div h6{
	font-size: 34rpx;
	color: #000;
	font-weight: bold;
	line-height: 60rpx;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.right-div p{
	font-size: 26rpx;
	color: #535353;
	line-height: 42rpx;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.right-div1 h6{
	font-size: 34rpx;
	color: #000;
	font-weight: bold;
	line-height: 50rpx;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.right-div1 p{
	font-size: 26rpx;
	color: #535353;
	line-height: 36rpx;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.online-title{
	display: flex;
	height: 78rpx;
	line-height: 78rpx;
	border-bottom: 2rpx solid #F4F4F4;
	justify-content: center;
}
.online-title span{
	width: 60rpx;
	font-size: 30rpx;
	color: #000000;
	position: relative;
	margin: 0 80rpx;
}
.online-title span.active{
	color: #43B34F;
}
.online-title span b{
	position: absolute;
	width: 100%;
	height: 4rpx;
	bottom: -2rpx;
	left: 0;
	background: #43B34F;
}
</style>
