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
			<view class="btn-class">
				<button class="cu-btn round bg-blue" @click="Login">登录</button>
				<button class="cu-btn round bg-blue" @click="Register">注册</button>
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
			async Login(){
				if(this.user.username&&this.user.password){
					let data =await Api.ApiCall('post','/api/client_user/login',this.user);
					// console.log(data,'任建大侠')
					console.log(data);
					// Api.setUserStorage(data.data);
					if(data.code>=200&&data.code<300){
						uni.showModal({
						    title: '提示',
						    content: '登录成功'
						});
						setTimeout(function(){
							
						},1000);
						Api.setUserStorage(data.data);
						uni.navigateTo({
							url:'/pages/index/index'
						})
					}else{
						uni.showModal({
						    title: '提示',
						    content: data.data
						});
						return;
					}
					
				}else{
					uni.showModal({
					    title: '提示',
					    content: '请输入完整的用户名和密码'
					});
				}
			},
			Register(){
				uni.navigateTo({
					url:'/pages/register/register'
				})
			}
		}
	}
</script>

<style scoped>
	uni-page-body{
	  margin:0;
	  padding:0;
	  height: 30%;
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
		padding: 0 50rpx;
		padding-top: 200rpx;
	}
	.container{
		background: #EEEEEE;
		height: 100%;
		
	}
</style>
