module.exports = {
	configureWebpack: {
		resolve: {
			alias: { // 给路径起别名
				'assets': '@/assets',
				'common': '@/common',
				'components': '@/components',
				'network': '@/network',
				'views': '@/views',
			}
		}
	}
}