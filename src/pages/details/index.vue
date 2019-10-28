<template>
  <div class="details-warp">
    <div class="banner">
       <image :src="details.image?details.image:'/static/images/banner.jpg'" alt=""></image>
    </div>
    <h1 class="details-title">{{details.title}}</h1>
    <!-- <p class="browse">
        <span>浏览 {{details.readNum}}</span>
        <span>收藏 {{details.collectNum}}</span>
    </p> -->
    <div class="price">{{details.expenses}}</div>
    <div class="synopsis">
        <p>
            <image src="/static/images/sponsor.png" alt=""></image>
            <span>主办方：{{details.sponsor}}</span>
        </p>
        <p>
            <image src="/static/images/date-icon.png" alt=""></image>
            <span>{{details.activityTime}}</span>
        </p>
        <p @click="openmap(details.address)">
            <image src="/static/images/add-icon.png" alt=""></image>
            <span>{{details.address}}</span>
            <image class="to-right" src="/static/images/to-right.png" alt=""></image>
        </p>
        <p>
            <image src="/static/images/people.png" alt=""></image>
            <span>{{details.capacity}}人</span>
        </p>
    </div>
    <div class="tag-wrap">
        <span v-for="(item, index) in details.tags" :key="index">{{item}}</span>
    </div>
    <h2 class="rich-text-title">
        <span>活动内容</span>
    </h2>
    <div class="rich-text">
        <!-- <wxParse :content="details.content" /> -->
        <!-- <wxparser :rich-text="details.content" /> -->
        <parser :html="details.content"></parser>
    </div>
    <div :class="isIphoneX==true?'footer-wrap pb-60':'footer-wrap'">
        <p @click="goBack" >
            <image src="/static/images/home.png" alt=""></image>
            <span>主页</span>
        </p>
        <p @click="addCollect">
             <image v-if="details.is_collect!==true" src="/static/images/collect.png" alt=""></image>
             <image  v-if="details.is_collect==true" src="/static/images/collected.png" alt=""></image>
            <span :class="details.is_collect==true?'collected':''">收藏</span>
        </p>
        <p>
            <image src="/static/images/share.png" alt=""></image>
            <span>分享</span>
            <button open-type="share"></button>
        </p>
        <p>
            <a v-if="details.finished==false" :href="details.website" class="button">立即报名</a>
            <span v-if="details.finished==true" class="button" style="background:#b4b4b4;">活动已结束</span>
        </p>
    </div>
    </div>
</template>

<script>
// import wxParse from 'mpvue-wxparse'
import QQMapWX from 'qqmap-wx-jssdk'
export default {
    data(){
        return{
            slug:'',//请求详情的标示
            details:{},
            isIphoneX:false,
            openId:null
        }
    },
    components: {
        // wxParse
    },
    mounted(){
        let that =this;
        wx.getStorage({
            key: 'openid',
            success:function(res) {
                that.openId = res.data;
                console.log( that.openId)
                 that.getDetails();
            }
        })
        this.slug=this.$root.$mp.query.slug;
        this.getDetails();

        wx.getSystemInfo({
            success: function (res) {
                console.log(res)
                let flag = res.model.replace(/\s*/g,"").toLowerCase();
                if (flag.indexOf('iphonex')>-1) {
                    that.isIphoneX = true
                }
            }
        });　
    },
    onShareAppMessage: function(options) {
		console.log('分享的代码！！')
	},
    methods: {
        goBack(){
            console.log(this)
            wx.reLaunch({
                url: "/pages/index/main"
            })
        },
        openmap(add){
            let _this =this;
            let qqmapsdk = new QQMapWX({
                    key: 'IMVBZ-2C7KX-HQT4U-7HLJ3-7DN22-6OFXD'
                })
            qqmapsdk.geocoder({
                address: _this.details.address, 
                success: function(res) {
                    wx.openLocation({
                    latitude: res.result.location.lat,
                    longitude: res.result.location.lng,
                    scale: 28
                })
                },
                fail: function(error) {
                    console.error(error);
                },
                complete: function(res) {
                    console.log(res);
                }
            })
        },
        addCollect(){
            if(this.openId==null){
                wx.showToast({
                    title: "请先登录再收藏",
                    // icon: 'fail',
                    image:'/static/images/cuo.png',
                    mask: true,
                    duration: 2000
                });
                return
            }
            this.$fly.request({
                    method: 'get',
                    url: '/api/toCollect/'+this.openId+'/'+this.slug,
                    body: {}
                }).then(res => {
                    let result = res.data;
                    console.log(result)
                    this.details.is_collect = !this.details.is_collect;
                    wx.showToast({
                        title: result,
                        icon: 'success',
                        mask: true,
                        duration: 1000
                    });
                })
        },
        getDetails(){
            let url = '';
            console.log('this.openId',this.openId)
            if(this.openId!=null){
                url = '/api/activity/'+this.slug+'/'+this.openId
            }else{
                url = '/api/activity/'+this.slug
            }
            this.$fly.request({
				method: 'get', 
				url: url,
				body: {}
			}).then(res => {
                let result = res.data;
				this.details={
                    "title":result.title,
                    "readNum":result.readNum,//浏览量
                    "collectNum":result.collectNum,//收藏量
                    "expenses":result.expenses,//收费方式 及时免费
                    "sponsor":result.sponsor,//主办方
                    "activityTime":result.activityTime,//活动时间
                    "address":result.address,//活动地址
                    "capacity":result.capacity,//参加人数
                    "tags":result.tags.split(","),//活动标签
                    "content":result.content.brief,//活动内容
                    "website":result.website,//报名网址
                    "image":result.imageurl,//
                    "is_collect":res.is_collect,//是否收藏过
                    "finished":new Date().getTime()>new Date(result.endDate).getTime()?true:false,//是否结束
                }

				console.log(this.details)
			})
        }
    }
}
</script>

<style scoped>
.footer-wrap{
    background: #FFFFFF;
    position: fixed;
    height: 90rpx;
    padding-top: 8rpx;
    width: 100%;
    border-top: 2rpx solid #EFEFEF;
    left: 0;
    bottom: 0;
    display: flex;
}
.footer-wrap.pb-60{
    padding-bottom: 68rpx; 
}
.footer-wrap p{
    padding:0 20rpx;
    display:flex;
    flex-wrap: wrap;
    text-align: center;
    position: relative;
     
}
.footer-wrap p image{
    width: 40rpx;
    height: 40rpx;
    margin: 10rpx 0 0 15rpx;
}
.footer-wrap p span{
    width: 100%;
    color: #474747;
    font-size: 22rpx;
}
.footer-wrap p button{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
}
.footer-wrap p span.collected{
    color: #e14864;
}
.footer-wrap p .button{
    width: 384rpx;
    height: 60rpx;
    line-height: 60rpx;
    color: #ffffff;
    border-radius: 30rpx;
    margin-top: 13rpx;
    background: linear-gradient(to right, #5CD786, #49BC5F);
}
.rich-text{
    padding: 0 20rpx;
    box-sizing: border-box;
    overflow-x: hidden;
}
.rich-text-title{
    padding:20rpx;
}
.rich-text-title span{
    height: 36rpx;
    line-height: 36rpx;
    padding: 0 10rpx;
    font-size: 30rpx;
    color: #000000;
    border-left: 6rpx solid #43B34F;
}
.tag-wrap{
    padding: 20rpx;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 0;
}
.tag-wrap span{
    height: 42rpx;
    line-height: 42rpx;
    padding: 0 20rpx;
    margin-right: 20rpx;
    margin-bottom: 20rpx;
    color: #43B34F;
    background: #ecf7ed;
    border-radius: 21rpx;
    font-size: 20rpx;
}
.synopsis{
    padding: 0 20rpx;
}
.synopsis p{
    display: flex;
    padding: 10rpx 0;
}
.synopsis p image{
    width: 40rpx;
    height: 30rpx;
    margin-right: 10rpx;
    margin-top: 5rpx;
}
.synopsis p span{
    color: #545454;
    font-size: 26rpx;
    width: 700rpx;
    padding-right: 50rpx;
}
.synopsis p .to-right{
    width: 15rpx;
    height: 30rpx;
}
.price{
    color: #43B34F;
    font-size: 30rpx;
    padding: 20rpx;
}
.browse{
    padding:0 20rpx 10rpx;
    display: flex;
}
.browse span{
    color: #9A9A9A;
    font-size: 24rpx;
    margin-right: 40rpx;
}
.details-title{
    color: #000000;
    font-weight: bold;
    font-size: 34rpx;
    padding: 10rpx;
}
.banner{
    padding: 20rpx;
}
.banner image{
    width: 710rpx;
    height: 320rpx;
    border-radius: 8rpx;
}
.details-warp{
    position: relative;
    padding-bottom: 150rpx;
}
</style>
