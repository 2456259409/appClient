<template>
	<view>
		<!-- <image src="../static/paper.jpg" mode="widthFix"></image>
		<view>
			
		</view> -->
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
				papers: []
			};
		},
		async created() {
			console.log('ok123')
			let data = await Api.ApiCall('get', '/api/paper/get_papers', {
				pageNum: 0,
				pageSize: 10
			});
			this.papers = data.data;
		},
		methods: {
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

<style>

</style>
