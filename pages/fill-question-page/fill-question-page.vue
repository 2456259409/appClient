<template>
	<view class="content">
		<view style="color: #1D9EF9;text-align: center;padding: 50rpx 0;
		font-size: 42rpx;font-weight: normal;">{{this.paper.title}}</view>
		
		<view style="padding: 0 30rpx;font-size: 30rpx;
		color: #646464;line-height:51rpx;
		">同学你好!为了对大学生人际交往的相关情况有进一步的了解，
		我们小组设计了此次问卷调查。请您协助我们完成这份问卷，结合自己
		的实际情况做出选择。</view>
		<view style="border-bottom: 2rpx dashed #CCCCCC; padding: 30rpx;margin:0 30rpx;"></view>
		<view style="margin: 0 30rpx;padding-top: 65rpx;" v-for="(ite,inde) in paper.question" :key="inde">
			<view style="position: relative;font-weight: bold;font-size: 35rpx;">
				<view class="cuIcon-favorfill text-red" style="position: absolute;
				top: 10rpx;left: 0;font-size: 15rpx;"></view>
				<view style="padding-left: 20rpx;">	
					{{ite.code+'.'+ite.title}}
				</view>
			</view>
			<view style="border: 4rpx solid #EEEEEE;border-radius: 2%;margin: 30rpx;">
				<view
				v-for="(item,index) in ite.answer" :key="index">
					<view style="display: flex;align-items: center;width: 100%;border-bottom: 1rpx solid #EEEEEE;">
						<radio class='blue radio' :class="radio=='C'?'checked':''" 
						:checked="radio=='C'?true:false" value="C" style="margin-left: 20rpx;"></radio>
						<span style="height: 100rpx;flex: 4;display: flex;
						align-items: center; margin-left: 20rpx;font-size: 45rpx;">{{item.content}}</span>
					</view>
					
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import Api from '../../common/api.js'
	export default {
		data() {
			return {
				paper:''
			}
		},
		async onLoad(opt) {
			let id=opt.id;
			// console.log('任建',id);
			let data=await Api.ApiCall('get','/api/paper/getById/'+id);
			console.log('renjian',data);
			this.paper=data.data;
			let title=this.paper.title;
			if(title.length>9){
				title=title.substr(0,9)+'...';
			}
			uni.setNavigationBarTitle({
			　　title:title
			})
		},
		methods: {
			
		}
	}
</script>

<style scoped>

	checkbox .checkbox-wraper{
		width: 16rpx;  /*外框宽度*/
		height: 16rpx; /*外框高度*/
	}
	checkbox::before {
	    margin-top: -7px; /*距离顶部*/
	    font-size: 40rpx; /*勾勾大小*/
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
	.content{
		background: #FFFFFF;
		min-height: 100%;
	}
</style>
