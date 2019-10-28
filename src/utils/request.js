import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()
const host = 'https://xcx.coinpany.cn/'
wx.getSetting({
  success (res) {
    console.log(res.authSetting)
    // res.authSetting = {
    //   "scope.userInfo": true,
    //   "scope.userLocation": true
    // }
    // 查看是否授权
    if (res.authSetting['scope.userInfo']) {
      // 已经授权，可以直接调用 getUserInfo 获取用户信息
    } else {
       // 显示授权 button
    }
  }
})
let openId = wx.getStorageSync('key')
wx.getStorage({
  key: 'openid',
  success:function(res) {
	openId = res.data;
  }
})

// 添加请求拦截器
fly.interceptors.request.use((request) => {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  // console.log(request)
  // request.headers["X-Tag"] = "flyio";
  // request.headers['content-type']= 'application/json';
  request.headers = {
    'X-Tag': 'flyio',
    'content-type': 'application/json'
  }

  let authParams = {
    // 公共参数
	// 'timestamp': new Date().getTime(),
	"openId":openId
  }
 
  request.body && Object.keys(request.body).forEach((val) => {
    if (request.body[val] === '') {
      delete request.body[val]
    };
  })
  request.body = {
    ...request.body,
    // ...authParams
  }
  return request
})
 
// 添加响应拦截器
fly.interceptors.response.use(
  (response) => {
    wx.hideLoading()
    return response.data // 请求成功之后将返回值返回
  },
  (err) => {
    // 请求出错，根据返回状态码判断出错原因
    console.log(err)
    wx.hideLoading()
    if (err) {
      return '请求失败'
    };
  }
)
fly.config.baseURL = host
 
export default fly