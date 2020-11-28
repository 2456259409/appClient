<template>
	<view>
		<view class="title">
			<!-- #ifdef H5 -->
			<view style="padding-top: 20rpx;margin-bottom: -80rpx;">
			<text class="H5-title">小说</text>
			</view>
			<!-- #endif -->
			<view class="back-arraw">
				<text class="text-white cuIcon-back" style="font-size: 45rpx;" @click="backOnePage"></text>
				<text class="text-white cuIcon-more" style="font-size: 50rpx;"></text>
			</view>
			<view class="title-content">
				<view>
					<image :src="book.icon" style="width: 200rpx;height: 250rpx;"></image>
				</view>
				<view class="book-text-content">
					<text style="color: #FEFEFE;line-height: 70rpx;font-size: 45rpx;">{{book.bookName}}</text>
					<view>
						<text style="color: #C9C8C7;font-size: 30rpx;line-height: 55rpx;">{{book.author}}</text>
						<text class="lg text-gray cuIcon-right"></text>
					</view>
					<view class="types-class">
						<text v-for="(item,index) in book.types" :key="index" style="color: #AEADAC;font-size: 30rpx;">{{item.name+'&nbsp'}}</text>
					</view>
					<button class="cu-btn round bg-blue apply-btn"></button>
				</view>
			</view>
		</view>
		<view class="content">

		</view>
	</view>
</template>

<script>
	import Api from '../../common/api.js';
	export default {
		data() {
			return {
				book: {},
				types: [{
						id: 1,
						name: '科幻小说 '
					},
					{
						id: 2,
						name: '玄幻小说 '
					},
					{
						id: 3,
						name: '传统文学 '
					},
					{
						id: 4,
						name: '外国名著 '
					}
				]
			}
		},
		async onLoad(opt) {
			// console.log(opt.id,'任建书籍的id');
			let data = await Api.ApiCall('get', '/api/book/get_one_book/' + opt.id);
			console.log('书籍', data);
			this.book = data.data;
			this.book.types = [];
			let types = [];
			types = JSON.parse(this.book.strTypes);
			types.forEach((item,index)=>{
				for(let i=0;i<this.types.length;i++){
					if(item===this.types[i].id){
						this.book.types.push(this.types[i]);
						break;
					}
				}
			})
			
		},
		methods: {
			backOnePage() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style scoped>
	.apply-btn{
		margin-top: 20rpx;
		height: 55rpx;
		background: #4F4948;
		border: 1rpx solid #CAC6C5;
	}
	.types-class{
		display: flex;
	}
	.book-text-content{
		display: flex;
		flex-direction: column;
		margin-top: 10rpx;
		margin-left: 20rpx;
	}
	.title-content{
		display: flex;
	}
	.H5-title{
		color: #FFFFFF;
		font-size: 40rpx;
		margin-left: 45%;
		margin-top: 30rpx;
	}
	.title-content{
		margin-left: 40rpx;
		margin-top: -40rpx;
	}
	.back-arraw {
		padding: 80rpx 25rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.title {
		background: #605A5B;
		height: 550rpx;

	}
</style>
