import Vue from 'vue'
import App from './App.vue'
import 'url-search-params-polyfill';
import router from './router'
import store from './store'
import Config from '@/Config';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

Vue.use(MuseUI);
Vue.prototype.config = Config;
let emptyImg = require('@/assets/images/empty_img.png');
import $axios from './api/axios'

Vue.prototype.$axios = $axios;
Vue.prototype.$emptyImg = emptyImg;
Vue.config.productionTip = false;
import Mui from 'vue-awesome-mui'
// import "vue-awesome-mui/mui/dist/css/mui.css"
import animator from './assets/anim'

Vue.prototype.$animatorData = animator;
Vue.use(Mui);
let oldBack = mui.back;
mui.back = () => {
	router.isBack = true;
	oldBack();
};

import api from './api'
import './assets/css/base.less'
import 'material-design-icons/iconfont/material-icons.css';
import Message from 'muse-ui-message';

Vue.use(Message);
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
	preLoad: 1.3,
	error: require('@/assets/images/empty_img.png'),   //请求失败后显示的图片
	loading: require('@/assets/images/empty_img.png'),   //加载的loading过渡图片
	attempt: 1     // 加载图片数量
});

import Navigation from './components/plugin/index'

Vue.use(Navigation, {router, store});
Vue.prototype.$api = api;

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
