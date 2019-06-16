import Vue from 'vue'
import Router from 'vue-router'
import routerMovie from './movie'
import routerMine from './mine'
import routerCinema from './cinema'
Vue.use(Router)

export default new Router({
    mode: 'history',
    // base: process.env.BASE_URL,
    base: "huaqianshu",
    routes: [
        routerMovie,
        routerMine,
        routerCinema,
        {
            path: "/*",
            redirect: "/movie"
        }
    ]
})