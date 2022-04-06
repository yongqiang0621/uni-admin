<template>
	<el-row class="big">
		<el-col :text="12">
			<el-scrollbar>
				<el-menu
					width="240px"
					background-color="#29374b"
					class="el-menu-vertical-demo"
					:default-openeds="defaultOpen"
					:default-active="defaultAct"
					active-text-color="#ffffff"
					unique-opened="true"
					text-color="#fff"
				>
					<view class="tit1" v-for="(item, index) in menu" :key="item.name">
						<el-menu-item
							:index="index"
							v-if="item.path === '/pages/index/index' || (!item.children && routers[0]?.page.includes(item.path))"
							@click="open(item, index + '')"
							:class="[defaultAct == index ? 'active' : '']"
						>
						<uni-icons :type="item.icon" size="24" color="#ffffff"></uni-icons>
							<text>{{ item.name }}</text>
						</el-menu-item>
					</view>
					<view class="tit1" v-for="(item, index) in menu" :key="item.name">
						<el-sub-menu
							:index="index + ''"
							v-if="item.children && routers[0]?.page.includes(item.path)"
							@click="open(item, index + '')"
							:class="[defaultAct == index ? 'active' : '']"
						>
							<template #title>
								<uni-icons :type="item.icon" size="24" color="#ffffff"></uni-icons>
								<text>{{ item.name }}</text>
							</template>
							<view class="tit1" v-for="(c, cindex) in item.children" :key="c.name">
								<el-menu-item
									:index="`${index + '-' + cindex}`"
									v-if="!c.children && routers[0]?.page.includes(c.path)"
									@click="childOpen(c, `${index + '-' + cindex}`)"
									:class="[defaultAct == `${index + '-' + cindex}` ? 'active' : '']"
								>
									<text>{{ c.name }}</text>
								</el-menu-item>
							</view>
							<view
								class="tit1"
								v-for="(c, cindex) in item.children"
								:key="c.name"
								@click="childOpen(c, `${index + '-' + cindex}`)"
								:class="[defaultAct == `${index + '-' + cindex}` ? 'active' : '']"
							>
								<el-sub-menu :index="`${index + '-' + cindex}`" v-if="c.children && routers[0]?.page.includes(c.path)">
									<template #title>
										<uni-icons :type="item.icon" size="24" color="#ffffff"></uni-icons>
										<text>{{ c.name }}</text>
									</template>
									<view class="tit1" v-for="(s, sindex) in c.children" :key="s.name">
										<el-menu-item
											:index="`${index + '-' + cindex + '-' + sindex}`"
											v-if="c.children && routers[0]?.page.includes(s.path)"
											@click="lastOpen(s, `${index + '-' + cindex + '-' + sindex}`)"
											:class="[defaultAct == `${index + '-' + cindex + '-' + sindex}` ? 'active' : '']"
										>
											{{ s.name }}
										</el-menu-item>
									</view>
								</el-sub-menu>
							</view>
						</el-sub-menu>
					</view>
				</el-menu>
			</el-scrollbar>
		</el-col>
	</el-row>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { Location, Document, Menu as IconMenu, Setting } from '@element-plus/icons-vue';
import router from '../../router';
import { permission } from '../../permission/permission';

const defaultOpen = ref(uni.getStorageSync('defaultOpen') ?? []);
const defaultAct = ref(uni.getStorageSync('defaultAct') ?? '0');
const role = ref(uni.getStorageSync('userInfo').role); //角色
uni.getStorageSync('permit') ? permission.defaultRule = uni.getStorageSync('permit') :''
const data = reactive({
	menu: uni.getStorageSync('router'),
	routers: permission.defaultRule.filter(item => {
		return item.name === role.value;
	})
});
const { menu, routers } = toRefs(data);

//监听浏览器导航栏输入url后对应的菜单高亮
uni.$on('hashchange', url => {
	let keyPath = [];
	if (url !== 'error') {
		for (var i in data.menu) {
			if (data.menu[i].path === url) {
				uni.setStorageSync('defaultAct', i + '');
				defaultAct.value = i + '';
				break;
			} else {
				for (var j in data.menu[i].children) {
					if (data.menu[i].children[j].path === url) {
						keyPath[0] = i;
						uni.setStorageSync('defaultOpen', keyPath);
						uni.setStorageSync('defaultAct', i + '-' + j);
						defaultOpen.value = keyPath;
						defaultAct.value = i + '-' + j;
						break;
					} else {
						for (var k in data.menu[i].children[j].children) {
							keyPath[0] = i;
							keyPath[1] = i + '-' + j;
							uni.setStorageSync('defaultOpen', keyPath);
							uni.setStorageSync('defaultAct', i + '-' + j + '-' + k);
							defaultOpen.value = keyPath;
							defaultAct.value = i + '-' + j + '-' + k;

							break;
						}
					}
				}
			}
		}
	} else {
		uni.setStorageSync('defaultAct', '-1');
		defaultAct.value = '-1';
	}
});

//登录后重置路由表
uni.$on('updateRouter', info => {
	data.menu = info.routers;
	role.value = info.role;
	data.routers = info.permit;
	defaultAct.value = '0';
	defaultOpen.value = [];
});

//点击第一级菜单
const open = (item, index) => {
	const page = window.location.hash.replace('#', '');

	if (item.path === page) {
		return;
	}
	if (item.children) {
		item.open = !item.open;
	} else {
		uni.navigateTo({
			url: item.path,
			success() {
				defaultAct.value = index;
				uni.setStorageSync('defaultAct', index);
			}
		});
	}
};

//点击第二级菜单
const childOpen = (c, index) => {
	const page = window.location.hash.replace('#/', '');
	if (c.path === page) {
		return;
	}
	if (c.children) {
		c.open = !c.open;
	} else {
		defaultAct.value = index;

		uni.navigateTo({
			url: c.path,
			success() {
				uni.setStorageSync('defaultAct', index);
			}
		});
	}
};

//点击第三级菜单
const lastOpen = (s, index) => {
	const page = window.location.hash.replace('#/', '');
	defaultAct.value = index;

	if (s.path === page) {
		return;
	}
	uni.navigateTo({
		url: s.path,
		success() {
			uni.setStorageSync('defaultAct', index);
		}
	});
};
</script>

<style lang="scss">
.big {
	width: 240px;
	height: calc(100vh - (var(--top-window-height)));
	background: #29374b;
	box-sizing: border-box;
}
.tit1 {
	width: 240px;
	background: #29374b;
}

.uni-icons {
	margin-right: 10px;
}
.logobox {
	padding: 20px;
	font-size: 20px;
	.logo {
		width: 30px;
		height: 30px;
		margin-right: 10px;
	}
}
.pl20 {
	padding-left: 15px;
}
.active {
	background-color: #409eff;
}
</style>
