<template>
	<div class="calendars-wrap">
        <div class="calendar-wrap">
            <Calendar
            :months="months"
            :value="value"
            @next="getMonthList('next')"
            @prev="getMonthList('prev')"
            :events="events"
            @select="getList"
            ref="calendar"
            :now="false"
            @selectMonth="selectMonth"
            @selectYear="selectYear"
            :arrowLeft="arrowLeft"
            :arrowRight="arrowRight"
            :tileContent="tileContent" />
            <div class="sign">
                <p>
                    <span></span>
                    <span>北京</span>
                </p>
                <p>
                    <span></span>
                    <span>上海</span>
                </p>
                <p>
                    <span></span>
                    <span>深圳</span>
                </p>
                <p>
                    <span></span>
                    <span>杭州</span>
                </p>
                <p>
                    <span></span>
                    <span>其它</span>
                </p>
            </div>
        </div>
		<h1>今日活动</h1>
        <div class="activity-list">
            <div class="activity-item" v-for="(item, index) in dayList" :key="index">
                <a :href="'/pages/details/main?slug='+item.slug" class="con">
				    <image :src="item.image" alt=""></image>
                    <div>
                        <h6>{{item.title}}</h6>
                        <p>
                            <span>{{item.address}}</span>
                        </p>
                    </div>
                </a>
            </div>
             <div class="nodata" v-if="nodata">
				<image src="/static/images/rest1.png" alt=""></image>
                <span>今天休息下吧 ~</span>
            </div>
        </div>
	</div>
</template>

<script>
import Calendar from 'mpvue-calendar';
import 'mpvue-calendar/src/style.css'; 
import arrowLeft from '../../assets/zuo.png'; //使用自定义箭头图片
import arrowRight from '../../assets/you.png'; //使用自定义箭头图片
import { formatTime } from '@/utils/index'
export default {
    components:{
        Calendar
    },
    onShareAppMessage: function(options) {
        console.log('分享的代码！！')
    },
    data () {
        return {
            dayList:[],
            nodata:true,
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            value: null,
            monthDay:null,//每月第一天
            begin:[2019,1,1],
            end:[2030,1,1],
            events: {},
            tileContent: [],
            arrowLeft: arrowLeft,
            arrowRight: arrowRight
        }
    },
    methods: {
        selectYear(flag){
            let days='';
            days=flag+'-'+this.monthDay[1]+'-1';
            this.monthDay = days.split("-");
            this.getMonthList('今天');
        },
        selectMonth(flag){
            let days='';
            days=this.monthDay[0]+'-'+flag+'-1';
            this.monthDay = days.split("-");
            this.getMonthList('今天');
        },
        getMonthList(flag){
            //获取月的活动
            let days='';
            if(this.monthDay==null){
                this.monthDay= this.value;
            }
            if(flag=='今天'){
                days=this.monthDay[0]+'-'+this.monthDay[1]+'-1';
                this.monthDay = days.split("-");
            }
            if(flag=='next'){
                let y = this.monthDay[0];
                let m = this.monthDay[1];
                m=='12'?(days=Number(this.monthDay[0])+1+'-'+'1-1'):(days=this.monthDay[0]+'-'+(Number(this.monthDay[1])+1)+'-1')
                this.monthDay = days.split("-");
            }
            if(flag=='prev'){
                let y = this.monthDay[0];
                let m = this.monthDay[1];
                m=='1'?(days=Number(this.monthDay[0])-1+'-'+'12-1'):(days=this.monthDay[0]+'-'+(Number(this.monthDay[1])-1)+'-1')
                this.monthDay = days.split("-");
            }
            if(flag=='selectMonth'){
                let y = this.monthDay[0];
                let m = this.monthDay[1];
                m=='1'?(days=Number(this.monthDay[0])-1+'-'+'12-1'):(days=this.monthDay[0]+'-'+(Number(this.monthDay[1])-1)+'-1')
                this.monthDay = days.split("-");
            }
            this.$fly.request({
                method: 'get', 
                url: '/api/activitys/month/'+days,
                body: {}
            }).then(res => {
                let result = res.data;
                //更新 events: {'2019-10-7':[1,2,3], '2019-10-16':[1,4]},
                // tileContent: [
                //     {date: '2019-10-7', className: 'holiday ', content: '5场'},
                //     {date: '2019-10-16', className: 'holiday ', content: '7场'}
                // ],
                this.tileContent=[];
                for (const key in result) {
                    this.events[formatTime(key,false)]=[];
                    if(result[key].length>0){
                        this.tileContent.push({
                        "date": formatTime(key,false),
                        "className": 'holiday ',
                        "content": result[key].length+'场'
                    })
                    }
                    for (const item in result[key]) {
                        //北京1 上海2 深圳3 其他0 杭州4
                        if(result[key][item].categories[0] && result[key][item].categories[0].name == '北京'){
                            this.events[formatTime(key,false)].push(1);
                        }else if(result[key][item].categories[0] && result[key][item].categories[0].name == '上海'){
                            this.events[formatTime(key,false)].push(2);
                        }else if(result[key][item].categories[0] && result[key][item].categories[0].name == '深圳'){
                            this.events[formatTime(key,false)].push(3);
                        }else if(result[key][item].categories[0] && result[key][item].categories[0].name == '杭州'){
                            this.events[formatTime(key,false)].push(4);
                        }else{
                            this.events[formatTime(key,false)].push(0);
                        }
                       this.events[formatTime(key,false)]= Array.from(new Set(this.events[formatTime(key,false)]))
                    }
                }
            })
        },
        getList(days){
            console.log(days)
            console.log(typeof(days))
            typeof(days) =='object'?days=days.join("-"):days;
            //获取今天的活动
            this.dayList=[];
            this.nodata=true;
            this.$fly.request({
                method: 'get',
                url: '/api/activitys/day/'+days,
                body: {}
            }).then(res => {
                let result = res.data;
                console.log(result)
                let arr=[];
                if(result){
                    for (const item in result) {
                        result=result[item];
                        if(result.length>0){
                            this.nodata = false;
                            for (const key in result) {
                                arr.push({
                                    "address":result[key].categories && result[key].categories[0]?result[key].categories[0].name+'站':'',
                                    "title":result[key].title,
                                    "slug":result[key].slug,
                                    "image":result[key].imageurl,
                                    "time":formatTime(new Date(result[key].publishedDate).getTime(),false),
                                    
                                })
                            }
                        }
                        
                    }
                    console.log('arr',arr)
                    this.dayList = arr;
                }else{
                    this.nodata = true;
                    console.log('dsfasd')
                    this.dayList = [];
                }
            })
        },
  },
    created () {
        let date =new Date();
        let year=date.getFullYear();
        let month=date.getMonth() + 1;
        let day=date.getDate()
        this.value=[year,month,day];

        let days=this.value.join("-");
        this.getMonthList('今天');
        this.getList(days);
    },
    mounted(){
       
    }
}
</script>

<style>
.calendar-wrap .sign{
    display: flex;
    position: absolute;
    top: 10rpx;
    right: 20rpx;
    width: 250rpx;
}
.calendar-wrap .sign p{
    width: 20%;
    text-align: center;
}
.calendar-wrap .sign p  span:nth-child(2){
    color: #666666;
    font-size: 22rpx;
}
.calendar-wrap .sign p  span:nth-child(1){
    display: block;
    width: 16rpx;
    height: 16rpx;
    margin: 20rpx auto 0;
}
.calendar-wrap .sign p:nth-child(1) span:nth-child(1){
    background: #EC4C44;
}
.calendar-wrap .sign p:nth-child(2) span:nth-child(1){
    background: #F8CC46;
}
.calendar-wrap .sign p:nth-child(3) span:nth-child(1){
    background: #1283ED;
}
.calendar-wrap .sign p:nth-child(4) span:nth-child(1){
    background: #00ffde;
}
.calendar-wrap .sign p:nth-child(5) span:nth-child(1){
    background: #EB82D1;
}
/* 
.mc-text{
    line-height: 0.8rem !important;
}*/
.remark-text{
    overflow: initial !important;
}
.mc-text.remark-text .testlabs{
    display: flex;
    justify-content: center;
}
.mc-text.remark-text .testlabs span{
    width: 16rpx !important;
    height: 16rpx !important;
    margin: 20rpx 0 10rpx !important;
    text-indent: -999rem;
    position: relative;
    z-index: 8;
    border-radius: 0 !important;
}
.mc-text.remark-text .testlabs span.testlab0{
    background: #EB82D1 !important;
}
.mc-text.remark-text .testlabs span.testlab1{
    background: #EC4C44 !important;
}
.mc-text.remark-text .testlabs span.testlab2{
    background: #F8CC46 !important;
}
.mc-text.remark-text .testlabs span.testlab3{
    background: #1283ED !important;
}
.mc-text.remark-text .testlabs span.testlab4{
    background: #00ffde !important;
}
/*
.mc-body .mc-today-element .calendar-date{
    background-color: rgba(67, 179, 79, 0.2) !important;
}
.mc-today {
    color: #000000 !important;
}
.mc-body ._tr {
    margin-bottom: 50rpx;
}
.mpvue-calendar ._td.selected ._span {
    color: #fff !important;
    border-radius: 50%;
    background-color: #43B34F !important;
}
.mpvue-calendar ._td ._span {
    display: block;
    height: 76rpx;
    width: 76rpx;
    font-size: 28rpx;
    line-height: 76rpx;
    margin: 0 auto;
    position: relative;
    z-index: 3;
}
.slot-element {
    text-align: center !important;
    position: absolute;
    top: 90rpx;
    left: 0;
    right: 0;
    text-align: center;
    padding: 4rpx;
    font-size: 24rpx;
    line-height: 1.2;
    color: #656565;
    z-index: 4;
    padding-left: 8rpx;
    padding-right: 8rpx;
    box-sizing: border-box;
    height: 34rpx;
    overflow: hidden;
    text-overflow: ellipsis;
} */



.calendar-tools{
    color: #ffffff !important;
    width: 354rpx !important;
    height: 54rpx !important;
    line-height: 54rpx !important;
    background: #43B34F !important;
    border-radius: 28rpx !important;
}
.calendar-info{
    display: flex !important;
    color: #ffffff !important;
    justify-content: center;
    flex-direction:row-reverse !important;
}
.mc-month,.mc-year{
    font-size: 34rpx !important;
    color: #ffffff !important;
    height: 54rpx !important;
    line-height: 54rpx !important;
    margin-top: -5rpx !important;
}
.mc-month{
    padding: 0 6rpx 0 0 !important;
}
.mc-year{
    padding: 0 0 0 6rpx !important;
}
.calendar-prev{
    width: 12rpx !important;
    height: 20rpx !important;
    margin: -2rpx 0 0  20rpx !important;
}
.calendar-next{
    width: 12rpx !important;
    height: 20rpx !important;
    margin: -2rpx 20rpx 0 0 !important;

}
.calendar-prev ._img, .calendar-next ._img{
    width: 12rpx !important;
    height: 20rpx !important;
}
.calendars-wrap .calendar-wrap{
    padding: 20rpx;
    border-bottom: 2rpx solid #F4F4F4;
    position: relative;
}
.calendars-wrap .nodata{
    margin: 100rpx auto 0;
}
.calendars-wrap .nodata image{
    display: block;
    width: 100rpx;
    height: 92rpx;
    margin: 0 auto;
}
.calendars-wrap .nodata  span{
    display: block;
    text-align: center;
    width: 100%;
    line-height: 80rpx;
    color: #999999;
    font-size: 28rpx;
}
.calendars-wrap .activity-list{
    padding: 20rpx;
}
.calendars-wrap .activity-item{
    background: #F8F8F8;
    height: 198rpx;
    margin-bottom: 20rpx;
    width: 100%;
    white-space: nowrap;
	overflow-x: scroll;
}
.calendars-wrap .activity-item .con{
    width:100%;
    height: 198rpx;
    padding: 20rpx;
    box-sizing: border-box;
    display: inline-block;
    position: relative;
}
.calendars-wrap .activity-item .con image{
    width: 206rpx;
    height: 150rpx;
}
.calendars-wrap .activity-item .con div{
    width: 450rpx;
    height: 150rpx;
    position: absolute;
    top: 20rpx;
    left: 240rpx;
}
.calendars-wrap .activity-item .con div h6{
    width:450rpx;
    line-height: 44rpx;
    height: 100rpx;
    white-space: pre-wrap;
}
.calendars-wrap .activity-item .con div p{
    font-size: 26rpx;
    color: #838383;
    line-height: 50rpx;
}
.calendars-wrap .activity-item .cancel{
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

.calendars-wrap h1{
    color: #000000;
    font-size: 34rpx;
    padding: 20rpx;
}
</style>
