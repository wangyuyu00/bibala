<template>
	<div>
		<div class="city-list">
			<span :class="currentCity=='-1'?'city-list-span green':'city-list-span'" @click="currentCity='-1';getList(null)">
				全部
				<b v-if="currentCity=='-1'"></b>
			</span>
			<span :class="currentCity==item.code?'city-list-span green':'city-list-span'" v-for="(item, index) in cityList" :key="index" @click="currentCity=item.code;getList(item.name)">
				{{item.name}}
				<b v-if="currentCity==item.code"></b>
			</span>
			<span :class="currentCity==0?'city-list-span green':'city-list-span'" @click="currentCity=0;getList('其他')">
				其他
				<b v-if="currentCity==0"></b>
			</span>
		</div>
		<div class="icon-wrap">
			<a href="/pages/activitys/main"  class="div-wrap">
				<image src="/static/images/my-activity.png" alt=""></image>
				<span>我的活动</span>
			</a>
			<a href="/pages/eventscalendar/main" class="div-wrap">
				<image src="/static/images/calendar.png" alt=""></image>
				<span>活动日历</span>
			</a>
			<a href="/pages/homeshare/main" class="div-wrap">
				<image src="/static/images/home-share.png" alt=""></image>
				<span>邀请共享</span>
			</a>
		</div>
		<div class="activity-list">
			<div class="title">
				<h6>本周活动</h6>
				<image class="notice-icon" src="/static/images/notice.png" alt=""></image>
				<swiper v-if="noticeList.length > 0" indidator-dots="noticeList.length > 1" circular="true" autoplay='1000' vertical>
					<block v-for="(item, index) in noticeList" :key="index" >
						<swiper-item>
							<a :href="'/pages/details/main?slug='+item.slug"><span>{{item.title}}</span></a>
						</swiper-item>
					</block>
				</swiper>
			</div>
			<div  class="activity-con" v-for="(item, weekindex) in weekList" :key="weekindex">
				<div class="title-sub">
					<image src="/static/images/time-axis.png" alt=""></image>
					<span>{{weekindex}}</span>
				</div>
				<div class="border-l">
					<div>
						<a class="todetails" :href="'/pages/details/main?slug='+key.slug" v-for="(key, itemindex) in item" :key="itemindex">
							<span v-if="key.level=='hot' || key.level=='excellent' " :class="key.level=='hot'?'hot tag':'best tag'">{{key.level=='hot'?'热门':'优选'}}</span>
							<span class="con">{{key.title}}</span>
							<span class="address">{{key.address}}</span>
						</a>
						<div class="nodata" v-if="item.length==0">
							<image src="/static/images/rest.png" alt=""></image>
							<span>今天休息下吧</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<a href="/pages/eventscalendar/main" class="counter" v-if="flag">下周活动请查看<b>活动日历</b></a>
	</div>
</template>

<script>
import card from '@/components/card'
import { formatTime } from '@/utils/index'
export default {
  data () {
    return {
     cityList:[],
	 weekList:[],//本周活动列表
	 today:'',
	 currentCity:-1,
	 noticeList:[],
	 flag:false
    }
  },

  components: {
    card
  },
	mounted(){
		this.getCity();
		this.getList();
		this.getnotice();
	},

  methods: {
    getnotice(){
		//获取公告
		this.$fly.request({
				method: 'get', // post/get 请求方式
				url: '/api/notice',
				body: {}
			}).then(res => {
				let result = res.data;
				console.log(result);
				for (const key in result) {
					this.noticeList.push({
						title:result[key].title,
						slug:result[key].slug,
					})
				}
			})
	},
	getList(citykey){
		//获取首页活动
		let url = '';
		if(citykey!=null){
			url ='/api/activitys/week/'+this.today+'/'+citykey;
		}else{
			url ='/api/activitys/week/'+this.today;
		}
		 this.$fly.request({
				method: 'get', // post/get 请求方式
				url: url,
				body: {}
			}).then(res => {
				let result = res.data;
				// console.log(result)
				let date =new Date().getTime();
				let today = formatTime(date,false); // 今天
				let tomorrow = formatTime(date+ 86400000,false); // 明天
				let json={};

  				let weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
				for (const key in result) {
					// console.log(formatTime(key,false))
					let arr = [];
					for (const item in result[key]) {
						arr.push({
							"address":result[key][item].categories[0]?result[key][item].categories[0].name:'',
							"title":result[key][item].title,
							"slug":result[key][item].slug,
							"level":result[key][item].level,
							"slug":result[key][item].slug
						})
					}
					// console.log(formatTime(key,'1'))
					// json[formatTime(key,false)==today?'今天':(formatTime(key,false)==tomorrow?'明天':formatTime(key,false)+' '+weekday[formatTime(key,'1')])]=arr;
					json[formatTime(key,false)==today?'今天 '+weekday[formatTime(key,'1')]:(formatTime(key,false)==tomorrow?'明天 '+weekday[formatTime(key,'1')]:formatTime(key,false)+' '+weekday[formatTime(key,'1')])]=arr;
				}
				// console.log('json',json)
				this.weekList = json;
				if(Object.keys(json).length <= 2){
					this.flag=true;
				}
			})
	},
	getCity(){
		//获取城市列表
		 this.$fly.request({
				method: 'get', // post/get 请求方式
				url: '/api/citys',
				body: {}
			}).then(res => {
				let result = res.data;
				// console.log(result);
				this.cityList = result;
			})
	}
	
  },
  onShareAppMessage: function(options) {
		// console.log('分享的代码！！',options)
	},
	created () {
		let date =new Date();
		this.today=formatTime(date,false);
	}
}
</script>

<style scoped>
.city-list{
	padding: 0 20rpx;
    width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	display: block;
	white-space: nowrap;
	overflow-x: scroll;
	box-sizing: border-box;
}
 ::-webkit-scrollbar {
    width: 0;
    height: 0;
	color: transparent;
	opacity: 0;
}
.city-list-span{
	padding-right: 60rpx;
	position: relative;
	display: inline-block;
	height: calc(100% - 5rpx);
	border-bottom: 1rpx solid #F4F4F4;
	box-sizing: border-box;
}
.city-list-span.green{
	color: #43b34f;
}
.city-list-span b{
	position: absolute;
	bottom: -1rpx;
	left: 0;
	width: calc(100% - 60rpx);
	height: 5rpx;
	background: #43B34F;
}
.icon-wrap{
	display: flex;
	width: 100%;
	border-bottom: 1rpx solid #F4F4F4;
	justify-content: flex-start;
}
.div-wrap{
	width: 33%;
	/* text-align: center; */
	padding: 44rpx 0 30rpx; 
	box-sizing: border-box;
}
.div-wrap:nth-child(1){
	text-align: right;
	position: relative;
}
.div-wrap:nth-child(1) image{
	margin-right: 17.5%;
}
.div-wrap:nth-child(1) span{
	padding-right: 12%;
}
.div-wrap:nth-child(2){
	text-align: center;
}
.div-wrap:nth-child(3){
	text-align: left;
}
.div-wrap:nth-child(3) image{
	margin-left: 17.5%;
}
.div-wrap:nth-child(3) span{
	padding-left: 12%;
}
.div-wrap image{
	width: 86rpx;
	height: 86rpx;
}
.div-wrap span{
	display: block;
	line-height: 60rpx;
}
.activity-list{
	padding: 20rpx;
	position: relative;
}
.activity-list .title{
	display: flex;
	height: 60rpx;
	padding: 20rpx 0;
}
.activity-list .title h6{
	font-size: 34rpx;
	color: #000000;
}
.activity-list .title .notice-icon{
	width: 36rpx;
	height: 32rpx;
	margin: 14rpx 10rpx 0 10rpx;
}
swiper{
	width: 70%;
	color: #424242;
	font-size: 24rpx;
	height: 32rpx;
	line-height: 32rpx;
	margin-top: 14rpx;
}
swiper span{
	display: block;
	width: 100%;
}

.activity-con .title-sub{
	height:80rpx;
	display: flex;
	margin-bottom: 4rpx;
}
.activity-con .title-sub image{
	width: 70rpx;
	height: 70rpx;
	margin:0 20rpx 0 0;
}
.activity-con .title-sub span{
	margin-top: 10rpx;
	height: 54rpx;
	line-height: 54rpx;
	padding: 0 20rpx;
	border-radius: 40rpx;
	font-size: 28rpx; 
	color: #000000;
	background: #F1F1F1;
}
.activity-con .border-l{
	border-left: 4rpx solid #43B34F;
	padding: 20rpx 20rpx 20rpx 20rpx;
	margin-left: 30rpx;
	margin-bottom: 10rpx;
}
.activity-con .border-l div{
	background: #F8F8F8;
}
.activity-con .border-l div .todetails{
	/* line-height: 80rpx; */
	padding: 0 10rpx;
	display: flex;
	justify-content: space-between;
	border-bottom: 1rpx solid #E5E5E5;
}
.activity-con .border-l div .todetails:last-child{
	border: 0;
}
.activity-con .border-l div .todetails span.con{
	/* max-width: calc(100% - 100rpx); */
	width: 100%;
	text-align: left;
	flex-wrap: nowrap;
	overflow: hidden;
	line-height: 80rpx;
	/* padding: 10rpx 0; */
	font-size: 24rpx;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.activity-con .border-l div .todetails span.address{
	font-size: 24rpx;
	color: #838383;
	min-width: 60rpx;
	line-height: 80rpx;
}
.activity-con .border-l div .todetails .hot{
	background: #F19837;
	padding:5rpx;
	color: #FFFFFF;
	font-size: 24rpx;
	border-radius: 6rpx;
	text-align: center;
	margin-right: 5rpx;
	height: 30rpx;
	line-height:  30rpx;
	margin-top: 22rpx;
	min-width: 40rpx;
	font-size: 24rpx;
	overflow: hidden;
}
.activity-con .border-l div .todetails .best{
	background: #E14864;
	padding:5rpx;
	color: #FFFFFF;
	font-size: 24rpx;
	border-radius: 6rpx;
	text-align: center;
	margin-right: 5rpx;
	height: 30rpx;
	line-height:  30rpx;
	margin-top: 22rpx;
	font-size: 24rpx;
	min-width: 40rpx;
	overflow: hidden;
}
.activity-con:last-child .border-l{
	border: 0;
}
.activity-con .border-l div .nodata{
	display: flex;
	height: 86rpx;
	line-height: 86rpx;
}
.activity-con .border-l div .nodata image{
	width: 48rpx;
	height: 48rpx;
	margin:20rpx 20rpx 0 20rpx;
}
.activity-con .border-l div .nodata span{
	color:#4EB759;
	font-size: 26rpx;
}
.counter{
	display: block;
	text-align: center;
	color:#4EB759;
}
.counter b{
	display: inline;
	text-decoration: underline;
}
</style>
