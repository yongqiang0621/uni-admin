<template>
	<view class="flexce big">
		<image src="../../static/404.png" mode="" class="error"></image>
		<view class="btnbox">
			<text class="c9">页面不存在</text>
			<text class="c9">请检查您输入的网址是否正确，或单击下面的按钮返回主页</text>
			<button type="primary" @click="toIndex">跳转首页</button>
		</view>
	</view>
</template>

<script setup lang="ts">
	const toIndex = ()=>{
		uni.$emit('hashchange','/pages/index/index')
		uni.navigateTo({
			url:'/pages/index/index'
		})
	}
	
</script>

<style lang="scss">
.big {
	padding: 200px 0;
}
.error {
	width: 600px;
	height: 328px;
}
.btnbox {
	width: 200px;
	.c9 {
		font-size: 14px;
		text-align: center;
	}
	button {
		margin-top: 20px;
		background-color: #409eff;
	}
}
</style>
