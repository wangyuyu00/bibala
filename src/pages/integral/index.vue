<template>
	<div class="integral-wrap">
		<div class="card">
			<span><b>{{integral}}</b> 积分</span>
            <p><a href="/pages/myshare/main">共享活动</a> 获得更多积分哦</p>
		</div>
        <div class="list-wrap">
            <h6 class="title">
                <span>时间</span>
                <span>收益</span>
                <span>备注</span>
            </h6>
            <div class="con" v-for="(item, index) in integralList" :key="index">
                <span>{{item.time}}</span>
                <span>{{item.credit}}</span>
                <span>{{item.note}}</span>
            </div>
            <div class="nodata" v-if="nodata">
                <image src="/static/images/integral-nodata.png" alt=""></image>
                <span>暂无积分，快去赚取更多积分吧</span>
            </div>
        </div>
	</div>
</template>

<script>
import { formatTime } from '@/utils/index'
export default {
  data () {
    return {
      integralList:[],//明细列表
      integral:0,//积分数量
      openId:null,
      nodata:true,
      page:1,
      total:1
    }
  },
  	// 上拉加载
onReachBottom: function () {
//执行上拉执行的功能
  this.getList();
},
  methods: {
	getList(){
        //获取积分
        this.page++;
        if(this.page >this.total)return
        this.integralList = [];
         if(this.openId==null)return
		 this.$fly.request({
				method: 'get',
				url: '/api/myCredit/'+this.openId+"/"+this.page,
				body: {}
			}).then(res => {
                this.integral =res.data;
				let result = res.list.results;
                this.total = res.data.totalPage;
				console.log(result)
				// console.log()
                let arr=[];
                if(result.length>0){
                    this.nodata = false;
                    for (const key in result) {
                        arr.push({
                            "time":formatTime(new Date(result[key].addDate).getTime(),false),
                            "credit":result[key].credit,
                            "note":result[key].note
                        })
                    }
                    console.log('arr',arr)
                    this.integralList = arr;
                }else{
                    this.nodata = true;
                    this.integralList = [];
                }
                
			})
	}
  },
   onShareAppMessage: function(options) {
    console.log('分享的代码！！')
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
    margin: 90rpx auto;
}
.nodata image{
    display: block;
    width: 265rpx;
    height: 256rpx;
    margin: 0 auto;
}
.nodata  span{
    display: block;
    text-align: center;
    width: 100%;
    line-height: 60rpx;
    color: #999999;
    font-size: 28rpx;
}
.title{
    display: flex;
    justify-content: space-between;
    border-bottom: 2rpx solid #F4F4F4;
    height: 78rpx;
    line-height: 78rpx;
    font-size: 28rpx;
    color: #484848;
}
.title span{
    width: 33%;
    text-align: center;
}
.con{
     display: flex;
    justify-content: space-between;
    border-bottom: 2rpx solid #F4F4F4;
    height: 78rpx;
    line-height: 78rpx;
    font-size: 26rpx;
    color: #484848;

}
.con span{
    width: 33%;
    text-align: center;
}
.card{
    width: 710rpx;
    height: 170rpx;
    margin: 20rpx;
    padding-top: 20rpx;
    text-align: center;
    color: #ffffff;
    border-radius: 8rpx;
    background: linear-gradient(to right,#43B34F,#5FC36A);
}
.card span{
    display: flex;
    height: 100rpx;
    justify-content: center;
    line-height: 110rpx;
}
.card span b{
    font-size: 48rpx;
    font-weight: bold;
    margin-right: 10rpx;
    line-height: 100rpx;
}
.card p{
    display: flex;
    justify-content: center;
}
.card p a{
    text-decoration: underline;
    margin-right: 10rpx;
}
</style>

