import axios from 'axios'

export function request(config) {
	// 1.创建axios的实例
	const instance = axios.create({
		baseURL: 'http://123.207.32.32:8000',
		timeout: 5000,
		// headers: ''
	})

	// 2.axios的拦截器
	instance.interceptors.request.use(config => {
		return config
	}, err => {
		return Promise.reject(error);
	})
	instance.interceptors.response.use(response => {
		// 响应拦截：拦截后需要返回response.data
		return response.data
	}, err => {
		return Promise.reject(error);
	})

	// 3.发送真正的网络请求，返回的就是promise
	return instance(config)
}
