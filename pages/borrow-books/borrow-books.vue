<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in selectTab" :key="index" @tap="tabSelect" :data-id="index">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		
		<view class="cu-list menu-avatar">
			<view class="cu-item" v-for="(item,index) in borrowBooks" :key="index">
				<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
				<view class="content" style="margin-left: 30rpx;">
					<view class="text-grey">{{item.bookName}}</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							<text class="cuIcon-infofill text-red  margin-right-xs">
								{{timeComputed(item.returnTime)}}
							</text>
						</view> 
					</view>
				</view>
				<view style="margin-right: 40rpx;" v-if="item.status==0">
					<button class="cu-btn round bg-blue" @click="backBook(index)">归还</button>
				</view>
				<view style="margin-right: 40rpx;" v-if="item.status==5">
					<button class="cu-btn round bg-grey">审核中</button>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modelIsShow?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">归还图书</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{'您当前的图书'+computedReturnTime()+'超时,您确定归还图书吗?'}}
				</view>
				<view class="cu-bar bg-white justify-center">
					<view>
						<button class="cu-btn line-green text-green margin-right-xs" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="confirmBack">确定</button>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import Api from '../../common/api.js';
	export default {
		data() {
			return {
				isOutTime:'',
				returnBook:'',
				modelIsShow:false,
				borrowBooks:[],
				scrollLeft:'0',
				userInfo:'',
				TabCur: 0,
				selectTab:[
					{
						name:'全部',
						id:1
					},
					{
						name:'审核中',
						id:2
					},
					{
						name:'已归还',
						id:3
					}
						
				]
			}
		},
		async onLoad() {
			let user=Api.getUserInfo();
			if(!user){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}else{
				this.userInfo=user;
			}
			let param = {
				key:this.TabCur,
				pageSize:10,
				pageNum:0,
				userId:this.userInfo.id
			}
			let data = await Api.ApiCall('get','/api/book/get_borrow_books',param);
			this.borrowBooks=data.data;
		},
		methods: {
			confirmBack(){
				this.modelIsShow=!this.modelIsShow;
				let param={
					borrowId:this.returnBook.id,
					isOutTime:this.isOutTime?1:0
				}
				Api.ApiCall('post','/api/book/back_book',param);
				uni.showModal({
					title:'提示',
					content:'归还正在飞速审核中...'
				})
				this.returnBook.status=5;
				this.returnBook='';
			},
			computedReturnTime(){
				let backTime=new Date(this.returnBook.returnTime).getTime();
				if(backTime>new Date().getTime()){
					this.isOutTime=false;
					return '未';
				}else{
					this.isOutTime=true;
					return '已';
				}
			},
			hideModal(){
				this.modelIsShow=!this.modelIsShow;
				this.returnBook='';
			},
			backBook(index){
				this.returnBook=this.borrowBooks[index];
				this.modelIsShow=!this.modelIsShow;
			},
			async tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				let param = {
					key:this.TabCur,
					pageSize:10,
					pageNum:0,
					userId:this.userInfo.id
				}
				let data = await Api.ApiCall('get','/api/book/get_borrow_books',param);
				this.borrowBooks=data.data;
			},
			timeComputed(time) {
				let date = Api.dateFormat('YY-mm-dd',time);
				return date;
			}
		}
	}
</script>

<style>

</style>
