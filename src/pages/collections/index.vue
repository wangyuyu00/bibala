<template>
	<div class="activitys-wrap">
		<h1>我的收藏</h1>
        <div class="activity-list">
            <div class="activity-item" v-for="(item, index) in collectionList" :key="index">
               <div class="activity-item">
                    <a :href="'/pages/details/main?slug='+item.slug" class="con">
                        <image :src="item.image" alt=""></image>
                        <div>
                            <h6>{{item.title}}</h6>
                            <p>
                                <span>{{item.time}}</span>
                                <span>{{item.address}}</span>
                            </p>
                        </div>
                    </a>
                    <div class="cancel" @click="cancel(item.slug)">取消关注</div>
                 </div>
            </div>
            <div class="nodata" v-if="nodata">
				<image src="/static/images/collections-nodata.png" alt=""></image>
                <span>暂无收藏的活动~</span>
            </div>
        </div>
	</div>
</template>

<script>
import { formatTime } from '@/utils/index'
export default {
  data () {
    return {
      collectionList:[],
      openId:null,
      nodata:true,
      page:1,
      total:1
    }
  },
  onShareAppMessage: function(options) {
    console.log('分享的代码！！')
},
	// 上拉加载
onReachBottom: function () {
//执行上拉执行的功能
  this.getList();
},
  methods: {
    bindViewTap () {
    },
    clickHandle (ev) {
		console.log('clickHandle:', ev)
    },
    cancel(slug){
        this.$fly.request({
				method: 'get',
				url: '/api/toCollect/'+this.openId+'/'+slug,
				body: {}
			}).then(res => {
				let result = res.data;
                console.log(result)
                wx.showToast({
                    title: result,
                    icon: 'success',
                    mask: true,
                    duration: 1000
                })
				this.getList();
			})
    },
	getList(){
        //获取我的收藏
        this.page++;
        if(this.page >this.total)return
        this.collectionList = [];
         if(this.openId==null)return
		 this.$fly.request({
				method: 'get',
				url: '/api/myCollect/'+this.openId+"/"+this.page,
				body: {}
			}).then(res => {
				let result = res.data.results;
                console.log(result);
                this.total = res.data.totalPage;
				// console.log()
                let arr=[];
                if(result.length>0){
                    this.nodata = false;
                    for (const key in result) {
                        arr.push({
                            "address":result[key].post.categories && result[key].post.categories[0]?result[key].post.categories[0].name+'站':'',
                            "title":result[key].post.title,
                            "slug":result[key].post.slug,
                            "image":result[key].post.imageurl,
                            "time":formatTime(new Date(result[key].post.publishedDate).getTime(),false),
                            
                        })
                    }
                    console.log('arr',arr)
                    this.collectionList = arr;
                }else{
                    this.nodata = true;
                    this.collectionList = [];
                }
                
			})
	}
  },
  created () {
     
  },
  mounted(){
      let that =this;
        wx.getStorage({
            key: 'openid',
            success:function(res) {
                that.openId = res.data;
                console.log( that.openId)
                that.getList();
            }
        })
  }
}
</script>

<style scoped>
.nodata{
    margin: 200rpx auto 0;
}
.nodata image{
    display: block;
    width: 326rpx;
    height: 214rpx;
    margin: 0 auto;
}
.nodata  span{
    display: block;
    text-align: center;
    width: 100%;
    line-height: 80rpx;
    color: #999999;
    font-size: 28rpx;
}
.activity-list{
    padding: 20rpx;
}
.activity-item{
    background: #F8F8F8;
    height: 198rpx;
    margin-bottom: 20rpx;
    width: 100%;
    white-space: nowrap;
	overflow-x: scroll;
}
.activity-item .con{
    width:100%;
    height: 198rpx;
    padding: 20rpx;
    box-sizing: border-box;
    display: inline-block;
    position: relative;
}
.activity-item .con image{
    width: 206rpx;
    height: 150rpx;
}
.activity-item .con div{
    width: 450rpx;
    height: 150rpx;
    position: absolute;
    top: 20rpx;
    left: 240rpx;
}
.activity-item .con div h6{
    width:450rpx;
    line-height: 44rpx;
    height: 100rpx;
    white-space: pre-wrap;
}
.activity-item .con div p{
    font-size: 26rpx;
    color: #838383;
    line-height: 50rpx;
}
.activity-item .cancel{
    width: 234rpx;
    line-height: 198rpx;
    display: inline-block;
    background: #E95745;
    padding: 0;
    color: #FFFFFF;
    font-size: 34rpx;
    text-align: center;
    vertical-align:top;
}
 ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
    opacity: 0;
}

h1{
    color: #000000;
    font-size: 34rpx;
    padding: 20rpx;
}
</style>
