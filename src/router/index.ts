import menu from './routers/menu';
class Router {
	//默认路由 icon是uni-ui的 图标 文档http://vue3-hellouniapp.dcloud.net.cn/pages/extUI/icons/icons
	defaultRouter = [
		{
			name: '首页',
			path: '/pages/index/index',
			icon: 'home-filled',
			
		},
		...menu, // 这里是为了代码简洁，可以放在routers文件下 ，然后引入
		
	];

}

export default new Router();
