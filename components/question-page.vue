<template>
	<view>
		<!-- <image src="../static/paper.jpg" mode="widthFix"></image>
		<view>
			
		</view> -->
		<view class="cu-bar bg-white search fixed" :class="[this.isH5==true?'marginToTop':'']">
			<view class="search-form round">
				<text class="cuIcon-search text-gray" style="font-size: 30rpx;"></text>
				<input type="text" placeholder="搜索问卷" confirm-type="search" @confirm="searchPaper" v-model="keyword"></input>
				<text class="text-gray cuIcon-scan" style="font-size: 40rpx;"></text>
			</view>
		</view>
		<!-- #ifdef H5 -->
		<view style="height: 120rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<view style="height: 120rpx;"></view>
		<!-- #endif -->
		<view class="cu-list menu-avatar">
			<view class="cu-item" v-for="(item,index) in papers" 
			:key="index" @click="toFillPage(item.id)"
			style="border-bottom: 1rpx solid #EEEEEE;">
				<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
				<view class="content">
					<view class="text-grey">{{item.creatorName==null?'佚名':item.creatorName}}</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							<text class="cuIcon-roundcheck text-red  margin-right-xs"></text>
							{{item.title}}
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">{{timeComputed(item.createTime)}}</view>
					<view class="cu-tag round bg-grey sm">5</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Api from '../common/api.js'
	export default {
		data() {
			return {
				papers: [],
				isH5:false,
				keyword:''
			};
		},
		async created() {
			console.log('ok123')
			// #ifdef H5
			this.isH5=true;
			// #endif
			let data = await Api.ApiCall('get', '/api/paper/get_papers', {
				pageNum: 0,
				pageSize: 10,
				keyword:this.keyword
			});
			this.papers = data.data;
		},
		methods: {
			async searchPaper(){
				let data = await Api.ApiCall('get', '/api/paper/get_papers', {
					pageNum: 0,
					pageSize: 10,
					keyword:this.keyword
				});
				this.papers = data.data;
			},
			timeComputed(time) {
				let date = Api.dateFormat('mm-dd',time);
				return date;
			},
			toFillPage(id){
				uni.navigateTo({
					url:'/pages/fill-question-page/fill-question-page?id='+id
				})
			}
		}
	}
</script>

<style scoped>
	.marginToTop{
		top:100rpx
	}
</style>
