import Vue from 'vue'
import Router from 'vue-router'
import PageTransition from '../components/common/PageTransition'
import Index from '../components/index/Index'
import Register from '../components/login/Register'
import Login from '../components/login/Login'
import Mine from '../components/mine/Mine'
import ProductList from '../components/product/ProductList'
import ProductDetail from '../components/product/ProductDetail'

Vue.use(Router);

Router.prototype.goBack = function () {
	this.isBack = true;
	window.history.go(-1)
};

export default new Router({
	routes: [
		{
			path: '/',
			name: 'PageTransition',
			component: PageTransition,
			children: [
				{
					path: '/index',
					name: 'index',
					component: Index,
					meta: {
						title: '发布需求',
						type: 'HomePage',
					}
				},
				{
					path: '/register',
					name: 'register',
					component: Register,
					meta: {
						keepAlive: true,
						title: '注册'
					}
				},
				{
					path: '/login',
					name: 'Login',
					component: Login,
					meta: {
						title: '登录'
					}
				},
				{
					path: '/mine',
					name: 'Mine',
					component: Mine,
					meta: {
						title: '我的',
						type: 'HomePage',
					}
				},
				{
					path: '/ProductList',
					name: 'ProductList',
					alias: '/',
					component: ProductList,
					meta: {
						title: '产品',
						type: 'HomePage',
					}
				},
				{
					path: '/productDetail',
					name: 'productDetail',
					component: ProductDetail,
					meta: {
						title: '产品详情',
					}
				},
			]
		},
	]
})
