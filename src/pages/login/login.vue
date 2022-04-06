<template>
	<view class="flexco bigview">
		<view class="bgmask flexco">
			<text class="tit b">uniapp的PC后台管理模板</text>
			<uni-forms ref="form">
				<uni-easyinput prefixIcon="person" placeholder="请输入姓名" style="color: #FFFFFF;"></uni-easyinput>
				<uni-easyinput prefixIcon="locked" type="password" placeholder="请输入密码" style="color: #FFFFFF;"></uni-easyinput>
			</uni-forms>
			<button @click="submit" type="primary">登录</button>
			<!-- <button @click="goLogin" type="primary">真实请求</button> -->
		</view>
	</view>
</template>

<script setup lang="ts">
import { permission } from '../../permission/permission';
import { reactive,toRefs } from 'vue';
import { user } from '../../../api/login';
import router from '../../router';
	
	
// 真实请求写法
/*
const data = reactive({
		info: {
			account:'123456',
			password:'123456'
		}
	});
	const { info } = toRefs(data);
	const goLogin = async () => {
		const res = await user.login(data.info).catch(err => {
			//如果需要处理异常,请写在这里
		});
		
		// 登录后返回的token 键名必须存为token，根据uni.getStorageSync('token')判断是否登录
		 uni.setStorageSync('token',res.data.token)
		
		//将登录后的个人信息存到本地
		uni.setStorageSync('userInfo', res.data);
		
		// 先把permission.ts文件的默认规则置空
		permission.defaultRule = [{name:'',page:[]}];
		
		// 把后端返回的路由权限赋值给 permission.defaultRule
		permission.defaultRule[0].name = res.data.role;
		permission.defaultRule[0].page = res.data.permission;
		
		//遍历permission中的路由表 找到自己的路由表
		let permit = permission.defaultRule.filter(item => {
			return item.name === res.data.role;
		});
		
		//必须要加 登录后刷新重置路由 并将路由存到缓存 routers:默认路由 role:后端返回的角色 permit:后端返回的路由表
		uni.$emit('updateRouter',{ routers: router.defaultRouter, role: res.data.role, permit })
		uni.setStorageSync('router',router.defaultRouter)
		uni.setStorageSync('permit',permit)
		uni.navigateTo({
			url: '/pages/index/index'
		});
	};

*/


const submit = () => {
	//第一种：前端控制路由权限

	//模拟登录后返回的角色
	let data = {
		role: '管理员',
		id: '21321313131313',
		token: 'xxxxx'
		// ...
	};

	// 模拟登录后返回的token 键名必须存为token，根据uni.getStorageSync('token')判断是否登录
	uni.setStorageSync('token', data.token);

	//将登录后的个人信息存到本地 
	uni.setStorageSync('userInfo', data);

	//遍历permission中的路由表 找到自己的路由表
	let permit = permission.defaultRule.filter(item => {
		return item.name === data.role;
	});

	console.log('permit',permit)
	// 必须要加 登录后刷新重置路由 并将路由存到缓存 routers:默认路由 role:后端返回的角色 permit:遍历permission中的路由表，返回的符合自己的路由表
	uni.$emit('updateRouter', { routers: router.defaultRouter, role: data.role, permit });
	uni.setStorageSync('router', router.defaultRouter);

	uni.$u.route('/pages/index/index') // 等同于 uni.navigateTo 
	

	/* --------------------------------------------------------- */


	/* 

	// 第二种：后台返回路由列表

	// 这里permission是模拟登录完成后后台返回的路由表 permission最好是数组，格式如下：（这样菜单页就不需要有修改了）
	let data = {
		role: '普通用户',
		id: '21321313131313',
		token:'xxxxxx',
		permission: ['/pages/index/index','/pages/menu','/pages/menu/menu2']
		
	};

	// 模拟登录后返回的token 键名必须存为token，根据uni.getStorageSync('token')判断是否登录
	 uni.setStorageSync('token',data.token)

	//将登录后的个人信息存到本地
	uni.setStorageSync('userInfo', data);
	
	// 先把permission.ts文件的默认规则置空
	permission.defaultRule = [{name:'',page:[]}];
	
	// 把后端返回的路由权限赋值给 permission.defaultRule
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
	uni.navigateTo({
		url: '/pages/index/index'
	});
*/

};

</script>

<style>
.bgmask {
	width: 400px;
	height: 400px;
	padding: 0 20px;
	border-radius: 10px;
}
.bigview {
	background: #2d3a4b;
	padding-bottom: 100px;
	box-sizing: border-box;
}
.tit {
	font-size: 28px;
	color: #ffffff;
	margin-bottom: 50px;
}
.bigview {
	background: #2d3a4b;
	width: 100vw;
	height: 100vh;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
.uni-easyinput {
	width: 400px;
	margin-bottom: 30px;
}
button {
	width: 400px;
	line-height: 40px;
}
</style>
