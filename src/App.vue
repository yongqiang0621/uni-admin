<script setup lang="ts">
import { onLaunch, onShow, onHide, onPageNotFound } from '@dcloudio/uni-app';
onLaunch(() => {
	// console.log("App Launch");
});
onShow(() => {
	// 未登录
	if(!uni.getStorageSync('token')){
		uni.redirectTo({
			url: '/pages/login/login'
		});
	}
});
onHide(() => {
	// console.log("App Hide");
});
onPageNotFound(() => {
	uni.redirectTo({
		url: '/pages/error/error'
	});
});

</script>
<style>
.flexst {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	flex-direction: row;
}

.flexsted {
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	flex-wrap: wrap;
	flex-direction: row;
}

.flexed {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	flex-wrap: wrap;
	flex-direction: row;
}

.flexbe {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	flex-direction: row;
}

.flexad {
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	flex-direction: row;
}

.flexco {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	flex-wrap: wrap;
}
.flexcobe {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	flex-direction: column;
	flex-wrap: wrap;
}
.flexcost {
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;
	flex-wrap: wrap;
}

.flexcoend {
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	flex-direction: column;
	flex-wrap: wrap;
}

.flexce {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
}

.pore {
	position: relative;
}
.flexstst {
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: row;
}

.cor-ff {
	color: #fff;
}

.bg-ff {
	background: #fff;
}

.b {
	font-weight: bold;
}

.c9 {
	color: #999999;
}
</style>
