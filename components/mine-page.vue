<template>
	<view>
		<!-- <view class="page-title-class">个人主页</view> -->
		<!-- 顶部头像 -->
		<view class="user-info-class">
			<view class="image-add-class">
				<image :src="user.icon?user.icon:staticIcon" class="icon-class">
					<text class="lg text-gray cuIcon-add add-icon-class"></text>
				</image>
				
				<view style="margin-top: 20upx;font-weight: bold;font-size: 35upx;">{{user.nickName}}</view>
			</view>
			<view class="detail-info-class">
				<view class="about-data-class">
					<view class="info-item-class">
						<text style="font-weight: bold;">{{user.articleCount}}</text>
						<text style="color: #989898;">帖子</text>
					</view>
					<view class="info-item-class">
						<text style="font-weight: bold;">{{user.fansCount}}</text>
						<text style="color: #989898;">粉丝</text>
					</view>
					<view class="info-item-class">
						<text style="font-weight: bold;">{{user.followCount}}</text>
						<text style="color: #989898;">已关注</text>
					</view>
				</view>
				<button class="cu-btn lg" style="height: 50upx;margin-top: 20upx;color: #282828;background: #FFFFFF;border: 1upx solid #EEEEEE;font-weight: bold;">编辑主页</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import Api from '../common/api.js';
	export default {
		data() {
			return {
				user:'',
				staticIcon:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
			};
		},
		beforeMount(){
			let user = Api.getUserInfo();
			if(!user){
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return;
			}else{
				// console.log(user);
				this.user=user;
			}
		},
		created() {
		}
	}
</script>

<style>
	.page-title-class{
		font-size: 30upx;
		text-align: center;
		padding-top: 20upx;
		padding-bottom: 10upx;
		background: #FBFBFB;
		border-bottom: 1upx solid #EEEEEE;
	}
	.user-info-class{
		display: flex;
		margin-top: 25upx;
		
	}
	.image-add-class{
		margin-left: 80upx;
	}
	.icon-class{
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
	}
	.add-icon-class{
		border-radius: 46%;
		background-color: #3996F0;
		color: #FFFFFF;
		
	}
	.detail-info-class{
		display: flex;
		flex-direction: column;
		margin-left: 80upx;
		width: 50%;
		margin-top: 60rpx;
	}
	.about-data-class{
		display: flex;
		justify-content: space-around;
	}
	.info-item-class{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
</style>
