// name是你的角色是后端返回的角色相对应，page就是可以访问的页面
export const permission = {
	// 前端控制用户权限
	defaultRule: [
		{ name: '普通用户', page: ['/pages/index/index'] }, 
		{
			name: '管理员',
			page: [
				'/pages/index/index',
				'/pages/menu',
				'/pages/menu/menu2',
				'/pages/menu/menu1'
				// '/pages/department',
				// '/pages/department/person',
				// '/pages/department/person/list'
			]
		},

		{ name: '运维', page: ['/pages/update/android', '/pages/update', '/pages/update/ios', '/pages/error/error'] }
	]
};
