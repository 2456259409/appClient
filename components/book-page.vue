<template>
	<view>
		<view class="cu-bar bg-white search fixed" :class="[this.isH5==true?'marginToTop':'']" style="margin: 0 auto;">
			<view class="search-form round">
				<text class="cuIcon-search text-gray" style="font-size: 30rpx;"></text>
				<input type="text" placeholder="搜索图书" confirm-type="search" @confirm="searchBook" v-model="keyword"></input>
				<text class="text-gray cuIcon-scan" style="font-size: 40rpx;"></text>
			</view>
		</view>
		<!-- #ifdef H5 -->
		<view style="height: 120rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<view style="height: 120rpx;"></view>
		<!-- #endif -->
		<view class="books-all">
			<view v-for="(item,index) in books" :key="index" :class="[index%2==0?'marginToLeft':'marginToRight']"
			style="width: 50%;margin: 30rpx 0;">
				<view class="book-one">
					<image :src="item.icon"
					style="width: 250rpx;height: 300rpx;"></image>
					<text>{{item.bookName}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Api from '../common/api.js';
	export default {
		data() {
			return {
				isH5:false,
				keyword:'',
				books:[]
			};
		},
		methods:{
			async searchBook(){
				let data = await Api.ApiCall('get','/api/book/get_client_books',{pageSize:10,pageNum:0,keyword:this.keyword});
				this.books=data.data;
			}
		},
		async created() {
			// #ifdef H5
			this.isH5=true;
			// #endif
			let data = await Api.ApiCall('get','/api/book/get_client_books',{pageSize:10,pageNum:0,keyword:this.keyword});
			this.books=data.data;
			console.log(data,'任建的书籍')
		}
	}
</script>

<style scoped>
	.marginToTop{
		top:100rpx
	}
	.marginToRight{
		padding-right: 40rpx;
	}
	.marginToLeft{
		padding-left: 40rpx;
	}
	.books-all{
		display: flex;
		flex-wrap: wrap;
	}
	
	.book-one{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
