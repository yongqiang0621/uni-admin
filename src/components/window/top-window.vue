<template>
	<view class="flexbe top">
		<view class="flexst logobox">
			<image src="../../static/logo.png" mode="" class="logo"></image>
			<text class="cor-ff b">PC后台管理系统</text>
		</view>
		<view class="flexed topr">
			<view class="flexed">
				<view class="flexst ml15">
					<uni-icons type="person" size="16" color="#000000"></uni-icons>
					<view class="ml5">admin</view>
				</view>
				<view class="ml15 fs14 c9">修改密码</view>
				<view class="ml15 fs14 c9" @click="loginOut">退出</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import router from '../../router';
const data = reactive({
	menu: uni.getStorageSync('router'),
});
const { menu } = toRefs(data);

const loginOut = () => {
	uni.showModal({
		title: '提示',
		content: '确定退出登录吗',
		success: res => {
			if (res.confirm) {
				uni.clearStorageSync();
				uni.reLaunch({
					url: '/pages/login/login'
				});
			} else if (res.cancel) {
				console.log('用户点击取消');
			}
		}
	});
};
</script>

<style lang="scss">
.top {
	background: #29374b;
	.topl {
		padding-left: 20px;
	}
	.topr {
		width: calc(100% - 240px);
		background: #ffffff;
		height: 60px;
		padding:0 20px;
		box-sizing: border-box;
		border-bottom: 1px solid #eeeeee;
		.tabBtn {
			padding: 0 10px;
			font-size: 12px;
			margin: 0 5px;
			line-height: 24px;
			border: 1px solid #abafb6;
			border-radius: 2px;
			cursor: pointer;
			.mr5 {
				margin-right: 5px;
			}
		}
		.active {
			background: #409eff;
			color: #ffffff;
			border: none;
		}
		.c9 {
			cursor: pointer;
		}
		.ml15 {
			margin-left: 15px;
		}
		.ml5 {
			margin-left: 5px;
		}
		.fs14 {
			font-size: 14px;
		}
		.pl20 {
			padding-left: 20px;
		}
	}
}
.logobox {
	width: 240px;
	font-size: 20px;
	padding-left: 20px;
	box-sizing: border-box;
	.logo {
		width: 30px;
		height: 30px;
		margin-right: 10px;
	}
}
.menu {
	width: 20px;
	height: 20px;
	margin-right: 5px;
}
.el-tag {
	margin: 0 5px;
}
</style>
