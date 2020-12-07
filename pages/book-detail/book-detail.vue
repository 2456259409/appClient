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
				<view style="flex:1;">
					<image :src="book.icon" style="width: 200rpx;height: 250rpx;"></image>
				</view>
				<view class="book-text-content" style="flex:2;">
					<text style="color: #FEFEFE;line-height: 70rpx;font-size: 45rpx;">{{book.bookName}}</text>
					<view>
						<text style="color: #C9C8C7;font-size: 30rpx;line-height: 55rpx;">{{book.author}}</text>
						<text class="lg text-gray cuIcon-right"></text>
					</view>
					<view class="types-class">
						<text v-for="(item,index) in book.types" :key="index" style="color: #AEADAC;font-size: 30rpx;">{{item.name+'&nbsp'}}</text>
					</view>
					<button class="cu-btn round bg-blue apply-btn">
						<text class="lg text-gray cuIcon-recharge">打赏图书馆</text>
					</button>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="[isShow?'show':'']">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					本系统目前暂不支持在线阅读方式!
				</view>
			</view>
		</view>
		<view class="content">
			<view class="tab-tip">
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<text class="text-red cuIcon-choiceness" style="font-size: 70rpx;"></text>
					<view>
						<text style="color: #191919;font-weight: bold;">百万打赏</text>
						<view style="color: #808080;margin-top: 10rpx;">
							1荣誉
							<text class="text-gray cuIcon-right"></text>
						</view>
					</view>
				</view>
				<view>
					<text  style="color: #191919;font-weight: bold;">43万字</text>
					<view style="color: #808080;margin-top: 10rpx;">连载</view>
				</view>
				<view>
					<text style="color: #191919;font-weight: bold;">14万</text>
					<view style="color: #808080;margin-top: 10rpx;">推荐票
						<text class="text-gray cuIcon-right"></text>
					</view>
				</view>
				<view>
					<text style="color: #191919;font-weight: bold;">1611票</text>
					<view style="color: #808080;margin-top: 10rpx;">月票
						<text class="text-gray cuIcon-right"></text>
					</view>
				</view>
			</view>
			<view style="margin-top: 30rpx;">
				<view>【简介】</view>
				<view style="margin-top: 40rpx;"> 
					<text>
						{{book.introduce}}
					</text>
				</view>
			</view>
		</view>
		<view class="bottom-class">
				<button class="cu-btn round" :class="[!isAdded?'bg-red':'bg-grey']" @click="changeAdded">借阅本书</button>
				<button class="cu-btn round bg-red"  @tap="showModel">立即阅读</button>
		</view>
	</view>
</template>

<script>
	import Api from '../../common/api.js';
	export default {
		data() {
			return {
				isShow:false,
				isAdded:false,
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
			hideModal(e) {
				this.isShow=!this.isShow;
			},
			showModel(){
				this.isShow=!this.isShow;
			},
			changeAdded(){
				this.isAdded=true;
			},
			backOnePage() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style scoped>
	.tab-tip{
		display: flex;
		justify-content: space-around;
	}
	.content{
		margin: 40rpx 30rpx;
		border-radius: 20%;
	}
	.bottom-class{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #FFFFFF;
		height: 150rpx;
		display: flex;
		justify-content: space-around;
		border-top: 1rpx solid #EEEEEE;
		padding-top: 40rpx;
	}
	.apply-btn{
		margin-top: 20rpx;
		height: 55rpx;
		background: #4F4948;
		border: 1rpx solid #CAC6C5;
		width: 80%;
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
		width: 100%;
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
