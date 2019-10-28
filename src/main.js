import Vue from 'vue'
import App from './App'
import fly from './utils/request'

Vue.prototype.$fly = fly
Vue.config.productionTip = false
App.mpType = 'app'
wx.getStorage({
  key: 'openid',
  success:function(res) {
    Vue.prototype.openid = res.data;
  }
})
wx.getStorage({
  key: 'session_key',
  success:function(res) {
    Vue.prototype.session_key = res.data;
  }
})
wx.getStorage({
  key: 'phoneNumber',
  success:function(res) {
    Vue.prototype.phoneNumber = res.data;
  }
})
const app = new Vue(App)
app.$mount()
