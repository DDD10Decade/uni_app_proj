// #ifndef VUE3
import {
	Vue
} from 'vue'
import {
	App
} from './App'
import {
	store
} from './store/index.js'
Vue.config.productionTip = false
App.mpType = 'app'
require('./mock/Mock.js'); // 注意文件路径名称
const app = new Vue({
	Element,
	// 将 store 挂载到 Vue 实例上
	store,
	...App,
})
app.use(store)
app.$mount()
// #endif

import {
	$http
} from '@escook/request-miniprogram'

uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中...',
	})
	// 判断请求的是否为有权限的 API 接口
	if (options.url.indexOf('/my/') !== -1) {
		// 为请求头添加身份认证字段
		options.header = {
			// 字段的值可以直接从 vuex 中进行获取
			Authorization: store.state.m_user.token,
		}
	}
}

// 请求完成之后做一些事情
$http.afterRequest = function() {
	uni.hideLoading()
}
// 封装的展示消息提示的方法
uni.$showMsg = function(title = '数据加载失败！', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none',
	})
}


// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
import store from './store/index'

export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	return {
		// store,
		app,
	}
}
// #endif