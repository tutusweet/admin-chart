import Vue from "vue";
import VueRouter from "vue-router";
import AdminHome from '../views/AdminHome'
Vue.use(VueRouter)
const router = new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/admin-chart',
            component:AdminHome
        }
    ]
})
export default router