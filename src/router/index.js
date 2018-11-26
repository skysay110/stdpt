import Vue from 'vue'
import Router from 'vue-router'

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
			component: () => import('_c/common/PageTransition'),
			children: [
				{
					path: '/index',
					name: 'index',
					component: () => import('_c/index/Index'),
					meta: {
						title: '发布需求',
						type: 'HomePage',
					}
				},
				{
					path: '/register',
					name: 'register',
					component: () => import('_c/login/Register'),
					meta: {
						keepAlive: true,
						title: '注册'
					}
				},
				{
					path: '/login',
					name: 'Login',
					component: () => import('_c/login/Login'),
					meta: {
						title: '登录'
					}
				},
				{
					path: '/mine',
					name: 'Mine',
					component: () => import('_c/mine/Mine'),
					meta: {
						title: '我的',
						type: 'HomePage',
					}
				},
				{
					path: '/ProductList',
					name: 'ProductList',
					alias: '/',
					component: () => import('_c/product/ProductList'),
					meta: {
						title: '产品',
						type: 'HomePage',
					}
				},
				{
					path: '/productDetail',
					name: 'productDetail',
					component: () => import('_c/product/ProductDetail'),
					meta: {
						title: '产品详情',
					}
				},
			]
		},
	]
})
