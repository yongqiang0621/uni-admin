<template>
	<view class="title">
		rt-uni-admin是基于uniapp + vue3 + ts + elementplus + uni-ui + vite的pc端后台管理系统空白模板，支持前后端控制路由权限，request请求可以使用封装好的promise库rt-unipc-utils也可以使用axios
	</view>
 <view class="map"><view id="main" style="width: 100%; height: 400px"></view></view>
 <view class="">
 	<view id="toolbar-container"></view>
 	<view id="editor-container"></view>
 </view>
 <div style="border: 1px solid #ccc">
   <Toolbar
     :editorId="editorId"
     :defaultConfig="toolbarConfig"
     :mode="mode"
     style="border-bottom: 1px solid #ccc"
   />
   <Editor
     :editorId="editorId"
     :defaultConfig="editorConfig"
     :defaultContent="defaultContent"
     :defaultHtml="defaultHtml"
     :mode="mode"
     style="height: 500px; overflow-y: hidden;"
   />
   <!-- 注意: defaultContent (JSON 格式) 和 defaultHtml (HTML 格式) ，二选一 -->
 </div>
</template>

<script setup lang="ts">
import { onMounted,  reactive, ref } from 'vue';
import * as echarts from 'echarts';
const data = reactive({
 value1: '',
 arr: [
  { title: '预览商品', num: '88,888', check: 12 },
  { title: '交易商品', num: '88,888', check: 10 },
  { title: '煤炭交易笔数', num: '88,888', check: 10 },
  { title: '煤炭交易额', num: '88,888', check: 10 },
  { title: '煤炭交易量', num: '88,888', check: 10 }
 ],
 options: [
  {
   value: '选项1',
   label: '预览商品'
  },
  {
   value: '选项2',
   label: '交易商品'
  },
  {
   value: '选项3',
   label: '煤炭交易笔数'
  },
  {
   value: '选项4',
   label: '煤炭交易额'
  },
  {
   value: '选项5',
   label: '煤炭交易量'
  }
 ],
 selectValue: ''
});

// 初始化
const echartInit = () => {
 // @ts-ignore
 const myChart = echarts.init(document.getElementById('main'));
 // 指定图表的配置项和数据
 const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
};
 // 使用刚指定的配置项和数据显示图表。
 myChart.setOption(option);
};

onMounted(() => {
 echartInit();
});
</script>

<style lang="scss">
.title{
	padding: 20px;
	font-size: 30px;
	font-weight: bold;
}
</style>