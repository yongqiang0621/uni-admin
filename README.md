![输入图片说明](src/static/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20220322223109.png)
![输入图片说明](src/static/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20220322222129.png)![输入图片说明](src/static/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20220322222105.png)
![输入图片说明](src/static/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20220322222121.png)
# rt-uni-admin

## 请使用hbuilderX编辑器导入项目并打开

## 安装依赖
```
npm i
```

```
npm run dev:h5 //或者点击hbuilderx的菜单，运行到浏览器
```
```
npm run build:h5 //打包 或者点击hbuilderx的菜单 发行 网站-pc
```
## 项目简介

##rt-uni-admin是基于uniapp + vue3 + ts + elementplus + uni-ui + vite的pc端后台管理系统空白模板，支持前后端控制权限

## 目录简介

1、api文件夹 ，放置项目下所有请求api，最好对根据模块设置多个ts文件；例如login.ts、order.ts、menu.ts
根据请求头不同 封装了三种方法 get/post/postForm  


```
// get的请求头

header: {
	'content-type': 'application/json',
	Authorization: uni.getStorageSync('token')
},
		
				
// post的请求头

header: {
	'content-type': 'application/json',
	Authorization: uni.getStorageSync('token')
},


// postForm的请求头

header: {
	'content-type': 'application/x-www-form-urlencoded',
	Authorization: uni.getStorageSync('token')
},


// api写法  api/login.ts

import uniHttp from 'rt-unipc-utils/request'; // 引入依赖包

//定义user类
class User {
	// 微信登录
	login(data){
		return uniHttp.get('/api/user',data) // get方法
		return uniHttp.post('/api/user',data) // post方法 
		return uniHttp.postForm('/api/user',data) // postForm方法 
	}

}
export const user = new User();



// vue页面写法   pages/login/login.vue

<script setup lang="ts">
	import { reactive } from 'vue';
	import { user } from '../../../api/login';
		const data = reactive({
			info: {
				account:'123456',
				password:'123456'
			}
		});
		
		// 登录方法
		const goLogin = async () => {
			const res = await user.login(data.info).catch(err => {
				//如果需要处理异常,请写在这里
			});
			if(res.xxx){
				console.log('登录成功')
			}else{
				console.log('登录失败')
			}
		}	
</script>
```

2、config文件夹 配置测试和线上环境的请求接口前缀等

```
class Config {
	
	// 接口地址前缀
	baseUrl = '';

	// 请求超时时间
	timeout = 10000;
	
	// 默认登录页
	loginPage = '/pages/login/login'; // 必须配置 服务器的statuCode ===401会默认跳转登录页 
	
	constructor() {
		if (process.env.NODE_ENV === 'development') {
			//开发环境 运行
			this.baseUrl = 'http://127.0.0.1:8080'; //测试地址 （ hbuiderx的菜单运行到浏览器或者命令npm run dev:h5 请求的接口都是这个地址 ）
		} else {
			//生产环境 发行
			this.baseUrl = 'http://xxx.xxxx.com'; //正式地址  （ hbuiderx的菜单发行网站-pc或者使用命令npm run build:h5 请求的接口都是这个地址 ）
		}
	}
}
export default new Config();

```
3、dist文件夹 打包后的h5文件存放位置

4、src文件夹下的compoents文件夹的window文件夹，用来设置后台模板的左侧菜单栏和顶部栏 leftWindow.vue无需修改，topWindow.vue里修改或者设置顶部栏目内容：左侧的后台logo、文字和顶部右侧的文字，修改密码等

5、src文件夹下的pages文件夹，用来所有页面 /pages/index/index是首页，pages/error/error是404页面，这两个页面名称尽量不要修改，所有无权限的路由都会跳转到/pages/error/error

6、src文件夹下permission文件夹permission.ts是用来配置路由权限

```
// name是你的角色是后端返回的角色相对应，page就是可以访问的页面 

// 前端控制用户权限
export const permission = {
		defaultRule: [
			{ name: '普通用户', page: ['/pages/index/index'] }, 
			{
				name: '管理员',
				page: [
					'/pages/index/index',
					'/pages/menu',
					'/pages/menu/menu2',
					'/pages/menu/menu1'
				]
			},
		]
	};


//后端控制用户权限   如果是后端返回权限表 尽量把 permission.defaultRule 初始化如下值 (忘记初始化也没关系，在login.vue 登录用的时候在初始化也行)
export const permission = {
		defaultRule: [
			{ name: '', page: [] }
		]
	};
```

7、src文件夹下 router文件夹的routers文件夹，可以按照模块存放多个路由例如menu.ts,person.ts，name就是左侧菜单显示名称 path就是路径  icon为显示的图标 （icon是uni-icons的 图标 文档http://vue3-hellouniapp.dcloud.net.cn/pages/extUI/icons/icons）
菜单最多支持三级，最后一级菜单无需设置icon
```
// menu.ts

export default [
	{
		name: '菜单',
		icon: 'bars',
		path: '/pages/menu', 
		children: [
			{
				name: '菜单一',
				path: '/pages/menu/menu1',
			},
			{
				name: '菜单二',
				path: '/pages/menu/menu2',
			}
		]
	}
];

```

8、src文件夹下 router文件夹index.ts 默认路由 可以把所有路由都写到这里，也可以按照如下写法，将routers文件夹下多个的路由引入

```
import menu from './routers/menu';
class Router {
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

```

9、src文件夹下 router文件夹router-guard.ts 全局路由守卫，拦截浏览器默认输入事件，阻止通过直接输入网站地址进入无权限的页面，无需修改 

10、src文件夹下 static文件夹 图片存储文件夹

11、src文件夹下 uni_modules插件


# 二、开始使用

## ！！！很重要 登录页的写法

```
<script setup lang="ts">
import { permission } from '../../permission/permission';
import { reactive,toRefs } from 'vue';
import { user } from '../../../api/login';
import router from '../../router';

//第一种：前端控制路由权限 
const submit = () => {
	
	//这里是模拟登录后返回的角色role 返回数据中必须要有role和token
	let data = {
		role: '管理员',
		id: '21321313131313',
		token: 'xxxxx'
		// ...
	};
	
	// 模拟登录后返回的token 键名必须存为token，根据uni.getStorageSync('token')判断是否登录
	uni.setStorageSync('token', data.token);

	//必须将登录后的个人信息存到本地  根据uni.getStorageSync('userInfo').role 判断是否有权限;
	uni.setStorageSync('userInfo', data);

	//遍历permission中的路由表 找到自己的路由表
	let permit = permission.defaultRule.filter(item => {
		return item.name === data.role;
	});

	// 必须要加 登录后刷新重置路由 并将路由存到缓存 routers:默认路由 role:后端返回的角色 permit:遍历permission中的路由表，返回的符合自己的路由表
	uni.$emit('updateRouter', { routers: router.defaultRouter, role: data.role, permit });
	uni.setStorageSync('router', router.defaultRouter);
	uni.$u.route('/pages/index/index')
}	


// 第二种：后台返回路由列表
const submit = () => {

	// 这里permission是模拟登录完成后后台返回的路由表 permission最好是数组，格式如下：（这样菜单页就不需要有修改了）
	let data = {
		role: '普通用户',
		id: '21321313131313',
		token:'xxxxxx',
		permission: ['/pages/index/index','/pages/menu','/pages/menu/menu2']
		
	};

	// 模拟登录后返回的token 键名必须存为token，根据uni.getStorageSync('token')判断是否登录
	uni.setStorageSync('token', data.token);
	
	//必须将登录后的个人信息存到本地  根据uni.getStorageSync('userInfo').role 判断是否有权限;
	uni.setStorageSync('userInfo', data);
	
	// 先把permission.ts文件的默认规则置空 
	permission.defaultRule = [{name:'',page:[]}];
	
	// 把后端返回的路由权限和登录用户名称赋值给 permission.defaultRule
	permission.defaultRule[0].name = data.role;
	permission.defaultRule[0].page = data.permission;
	
	//遍历permission中的路由表 找到自己的路由表
	let permit = permission.defaultRule.filter(item => {
		return item.name === data.role;
	});

	//必须要加 登录后刷新重置路由 并将路由存到缓存 routers:默认路由 role:后端返回的角色 permit:后端返回的路由表
	uni.$emit('updateRouter',{ routers: router.defaultRouter, role: data.role, permit })
	uni.setStorageSync('router',router.defaultRouter)
	uni.setStorageSync('permit',permit)
	uni.$u.route('/pages/index/index')

};

</script>

```
 
## 使用uniapp的生命周期
```
<script setup lang="ts">
	import { onLaunch, onShow, onLoad, onPageNotFound } from '@dcloudio/uni-app';
	onLaunch(() => {

	});
	onShow(() => {

	});
	onLoad((options) => {
		console.log("options"); // 传入的参数
	});
	onPageNotFound(() => {

	});
</script>

```

## 使用uniapp的路由跳转

```
// 第一种 不传参
uni.navigateTo({
	url: '/pages/error/error'
});
// 传参
uni.navigateTo({
	url: '/pages/error/error?id=xxx&type=xxxx'
});

// 传参
uni.navigateTo({
	url: '/pages/error/error?obj=' + JSON.stringify(obj)
});



注：为了方便简写和调用，可以直接传递一个url地址替代Object，它只能执行uni.navigateTo类型的地址，不支持跳转到Tabbar页面， 如果有参数需要携带，以对象形式写到方法的第二个参数中。

// 简写	 不传参
uni.$u.route('/pages/error/error')

// 传参
uni.$u.route('/pages/error/error',{
	id: 'xxxxx',
	type: 'xxxxx'
})
// 传参
uni.$u.route('/pages/error/error',obj) //无需 JSON.stringify(xxx)

```
#格式化时间
#timeFormat | date(timestamp, format = "yyyy-mm-dd")

该函数必须传入第一个参数，第二个参数是可选的，函数返回一个格式化好的时间。
time <String> 任何合法的时间格式、秒或毫秒的时间戳
format <String> 时间格式，可选。默认为yyyy-mm-dd，年为"yyyy"，月为"mm"，日为"dd"，时为"hh"，分为"MM"，秒为"ss"，格式可以自由搭配，如： yyyy:mm:dd，yyyy-mm-dd，yyyy年mm月dd日，yyyy年mm月dd日 hh时MM分ss秒，yyyy/mm/dd/，MM:ss等组合

```
<template>
	<view>
		<view>
			时间为：{{$u.timeFormat(data.timestamp, 'yyyy年mm月dd日')}}
		</view>
		<view>
			时间为：{{data.time}}
		</view>
	</view>
</template>

<script setup lang="ts">
	import { reactive,toRefs } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	const data = reactive({
		timestamp: '1581170184',
		time:''
	})
	onLoad(()=>{
		data.time = uni.$u.timeFormat(data.timestamp, 'yyyy-mm-dd')
	})	

</script>

```
## 以集成uview的所有的js工具库  具体看uview官方文档 [](https://v1.uviewui.com/js/time.html)使用时 把this换成uni

节流防抖
对象深度克隆
对象深度合并
时间格式化
路由跳转
数组乱序
全局唯一标识符
对象转URL参数
规则校验
md5加密
随机数值
去除空格等

## 如有不懂请加qq 965969604