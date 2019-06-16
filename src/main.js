import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from "axios"
Vue.prototype.axios = axios;
Vue.config.productionTip = false;
//全局的过滤器，过滤图片链接中的设置宽高部分
Vue.filter('setWH', (url, arg) => {
    return url.replace(/w\.h/, arg);
});
import scroller from '@/components/scroller'
Vue.component('scroller', scroller);

import loading from '@/components/loading'
Vue.component('loading', loading);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')