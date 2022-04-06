import { createSSRApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import RouterGuard from './router/router-guard';
import App from './App.vue';
import uView from './uni_modules/vk-uview-ui';
// 全局路由守卫
new RouterGuard();
export function createApp() {
	const app = createSSRApp(App);
	app.use(ElementPlus)
	app.use(uView)
	return {
		app
	};
}
