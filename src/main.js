import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import "reset-css"
import * as echarts from 'echarts'
import './main.css'
import './plugins/element-ui'
import './plugins/vue-echarts'
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app")
