


<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }

  },
  
  mounted(){
     console.log('来源',wx.getLaunchOptionsSync())
    //  this.$fly.request({
		// 		method: 'post', // post/get 请求方式
		// 		url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=26_IYEi5nEVkxuS_MJLw16E5jvEk0ZAOLdOsPwiwB3dO8A-Obzkl7r8wB5g85W4eiIYKIqBbX7M2kRNq0Gkwd4zwon7Ygu4CBNh9wD7hLxBgB0zVZ3NCttWnwrwy3eQ_gTmN6_FbGuZqzOoe_e6DFXfABAMOG',
		// 		body: {}
		// 		}).then(data => {
		// 			console.log(data)
					
					
		// 	})
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
a:link{
	background: none;
}
a:visited{
	background: none;
}
a:hover{
	background: none;
}
a:active{
	background: none;
	color: #43B34F;
}
page::after{
    content: '';
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2rpx;
    background-color: #F4F4F4;
    z-index: 9999;
}
.img-730{
  width: 730rpx !important;
}
image{
  width: 100%;
  max-width: 730rpx;
}
</style>
