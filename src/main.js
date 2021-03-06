import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import axios from '@/api'
// 1. 导入某一个目录，默认会去找索引文件（index.js index.vue index.json） 基于webpack
// 2. @ 别名  指定的是 /src 路径  一个绝对路径。 基于webpack
// import router from './router/index.js'
import router from '@/router'
// import MyBread from '@/components/my-bread'
import plugin from '@/components'
import './style/index.less'

Vue.use(ElementUI)
Vue.prototype.$http = axios
// Vue.component('my-bread', MyBread)
Vue.use(plugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
