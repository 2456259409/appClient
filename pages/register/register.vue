<template>
	<view class="container">
		<view class="card-class">
			<view class="cu-form-group">
				<view class="title">用户名</view>
				<input placeholder="请输入:" name="input" v-model="user.username"></input>
			</view>
			<view class="cu-form-group" style="border-bottom: 2upx solid #EEEEEE;">
				<view class="title">密码</view>
				<input placeholder="请输入:" name="input" v-model="user.password" style="margin-left: 30upx;"></input>
			</view>
			<view class="cu-form-group" style="border-bottom: 2upx solid #EEEEEE;">
				<view class="title">昵称</view>
				<input placeholder="请输入:" name="input" v-model="user.nickName" style="margin-left: 30upx;"></input>
			</view>
			<view class="cu-form-group" style="border-bottom: 2upx solid #EEEEEE;">
				<view class="title">手机</view>
				<input placeholder="请输入:" name="input" v-model="user.phone" style="margin-left: 30upx;"></input>
			</view>
			<view class="cu-form-group" style="border-bottom: 2upx solid #EEEEEE;">
				<view class="title">邮箱</view>
				<input placeholder="请输入:" name="input" v-model="user.email" style="margin-left: 30upx;"></input>
			</view>
			<view class="btn-class">
				<!-- <button class="cu-btn round bg-blue" @click="Login">登录</button> -->
				<button class="cu-btn round bg-blue" @tap="registerSubmit">提交</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import Api from '../../common/api.js';
	export default {
		data() {
			return {
				user:{
					username:'',
					password:''
				}
			}
		},
		methods: {
			async registerSubmit(){
				console.log(this.user,'ok123');
				let data = await Api.ApiCall('post','/api/client_user/register',this.user);
				console.log(data,'任建来了');
				uni.showModal({
					title:'提示',
					content:data.data
				})
				setTimeout(function(){
					
				},1000);
				uni.navigateTo({
					url:'/pages/login/login'
				})
				
			}
		}
	}
</script>

<style scoped>
	uni-page-body{
	  margin:0;
	  padding:0;
	  height: 35%;
	}

	.btn-class{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 40upx;
		/* margin-bottom: 20upx; */
	}
	.card-class{
		background: #FFFFFF;
		height: 100%;
		width: 100%;
		margin: 130upx auto;
	}
	.container{
		/* padding: 0 20upx; */
		background: #EEEEEE;
		height: 100%;
		
	}
</style>
