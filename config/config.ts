class Config {
	
	// 接口地址前缀
	baseUrl = '';
	
	// 图片地址前缀
	ossUrl = '';
	
	// 请求超时时间
	timeout = 10000;
	
	// 默认登录页
	loginPage = '/pages/login/login';
	
	constructor() {
		if (process.env.NODE_ENV === 'development') {
			//开发环境 运行
			this.baseUrl = 'http://127.0.0.1:8080'; //本地地址
		} else {
			//生产环境 发行
			this.baseUrl = 'http://xxx.xxxx.com'; //正式地址
		}
	}
}
export default new Config();
