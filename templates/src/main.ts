
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueRouter from 'vue-router'
import router from './router/index'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'babel-polyfill'

Vue.config.productionTip = false

Vue.prototype.$axios = axios;
Vue.use(Antd)
Vue.use(ElementUI)
Vue.use(VueRouter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

