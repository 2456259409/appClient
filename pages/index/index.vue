<template>
	<view class="content">
		
		<indexPage v-if="activeBar==1"></indexPage>
		<questionPage v-if="activeBar==2"></questionPage>
		<bookPage v-if="activeBar==3"></bookPage>
		<minePage v-if="activeBar==4"></minePage>
		<!-- 占位 -->
		<view style="height: 100rpx;background: #FFFFFF;"></view>
		<!-- bottom -->
		<view class="cu-bar tabbar bg-black my-bottom">
			<view style="height: 100rpx;background: #FFFFFF;"></view>
			<view class="action " :class="[activeBar==1?'text-orange':'text-gray']" @click="changeBar(1)">
				<view class="cuIcon-homefill"></view> 首页
			</view>
			<view class="action " :class="[activeBar==2?'text-orange':'text-gray']" @click="changeBar(2)">
				<view class="cuIcon-questionfill"></view> 问卷
			</view>
			<view class="action " :class="[activeBar==3?'text-orange':'text-gray']" @click="changeBar(3)">
				<view class="cuIcon-send"></view>
				图书
			</view>
			<view class="action " :class="[activeBar==4?'text-orange':'text-gray']" @click="changeBar(4)">
				<view class="cuIcon-my">
					<view class="cu-tag badge"></view>
				</view>
				我的
			</view>
		</view>
	</view>
</template>

<script>
	import bookPage from '../../components/book-page.vue';
	import indexPage from '../../components/index-page.vue'
	import minePage from '../../components/mine-page.vue';
	import questionPage from '../../components/question-page.vue'
	export default {
		components:{
			bookPage,
			indexPage,
			minePage,
			questionPage
		},
		data() {
			return {
				title: 'Hello',
				activeBar:1,
				barName:[
					'首页','问卷','图书','我的'
				]
			}
		},
		onLoad() {

		},
		methods: {
			changeBar(index){
				console.log('chanhge bar');
				this.activeBar=index;
				uni.setNavigationBarTitle({
				　　title:this.barName[index-1]
				})
			}
		}
	}
</script>

<style scoped>
	.my-bottom{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
	uni-page-wrapper{
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	
	uni-page-body{
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	
	
</style>
