// 全局路由守卫
import { permission } from '../permission/permission';
import config from '../../config/config'
import router from './index';
class RouterGuard {
	constructor() {
		// 监听浏览器输入框直接输入路径
		window.addEventListener('popstate', event => {
			let url = location.hash.replace('#', '');
			let newUrl = url.split('?');
			let role = uni.getStorageSync('userInfo').role; // 后端返回的角色
			if (!uni.getStorageSync('token')) {
				console.log('未登录')
				// 未登录
				uni.redirectTo({
					url: config.loginPage
				});
			} else {
				if (newUrl[0] === config.loginPage) { //登录页不做权限校验
					
				}else if (newUrl[0] === '/pages/index/index' ) { //首页不做权限校验
					uni.$emit('hashchange', newUrl[0]);
				} else {
					uni.getStorageSync('permit') ? permission.defaultRule = uni.getStorageSync('permit') :''
					let routers = permission.defaultRule.filter(item => {
						return item.name === role;
					});
					if (routers.length !== 0 && routers[0].page.includes(newUrl[0])) {
						uni.$emit('hashchange', newUrl[0]);

					} else {
						//无权限 跳转error
						uni.redirectTo({
							url: '/pages/error/error'
						});
						uni.$emit('hashchange', 'error');
					}
				}
			}
		});
	}
}
export default RouterGuard;
