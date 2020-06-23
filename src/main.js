// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import store from './store'
import VueWechatTitle from 'vue-wechat-title'
import "./style/icon/iconfont.css";
Vue.use(VueWechatTitle)

Vue.config.productionTip = false
Vue.use(router)
Vue.use(Vant)

router.beforeEach((to, from, next) => {
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
