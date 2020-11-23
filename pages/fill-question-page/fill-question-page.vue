<template>
	<view class="content">
		<view style="color: #1D9EF9;text-align: center;padding: 50rpx 0; 
		font-size: 42rpx;font-weight: normal;">{{paper.title}}</view>

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
					{{(inde+1)+'.'+ite.title}}
					<span style="color: #E72F28;">{{'  ['+ite.type+']'}}</span>
				</view>
			</view>
			<view style="border: 4rpx solid #EEEEEE;border-radius: 2%;margin: 30rpx;">
				<view v-if="ite.code!=3" v-for="(item,index) in ite.answer" :key="index">
					<!-- <view > -->
						<radio-group style="display: flex;align-items: center;justify-content: center;width: 100%;border-bottom: 1rpx solid #EEEEEE;">
							<radio :value="item" :checked="checkSeleted(ite.id+':'+item.code)"
								style="margin-left: 25rpx;" @click="changeRadio(ite.id+':'+item.code,ite.type)"/>
							<span style="height: 100rpx;flex: 4;display: flex;
							align-items: center; margin-left: 20rpx;font-size: 35rpx;">{{item.content}}</span>
						</radio-group>
						
					<!-- </view> -->
				</view>
				<!-- <view v-else>文本框</view> -->
				<view v-if="ite.code==3" style="margin-bottom: 30rpx;height: 200rpx;">
					<textarea placeholder="最长200个字" maxlength="200" v-model="results[inde].content"></textarea>
				</view>
			</view>


		</view>
		<button class="btn-submit" @tap="submitAnswer">提交</button>
	</view>
</template>

<script>
	import Api from '../../common/api.js'
	export default {
		data() {
			return {
				paper: '',
				radio: false,
				results:[],
				check:false
			}
		},
		async onLoad(opt) {
			let id = opt.id;
			let data = await Api.ApiCall('get', '/api/paper/getById/' + id);
			console.log('renjian', data);
			let paper=data.data;
			paper.question.forEach((item,index)=>{
				if(item.type===3){
					this.results.push({
						questionId:item.id,
						content:'',
						type:3
					})
				}else{
					this.results.push({
						questionId:item.id,
						codes:[],
						type:item.code
					})
				}
			});
			this.paper=paper;
			let title = this.paper.title;
			if (title.length > 9) {
				title = title.substr(0, 9) + '...';
			}
			uni.setNavigationBarTitle({
				title: title
			})
		},
		methods: {
			submitAnswer(){
				console.log(this.results,'任建');
			},
			changeRadio(item,type){
				//console.log(type,'type');
				let questionId=parseInt(item.split(':')[0]);
				let code=parseInt(item.split(':')[1]);
				let flag=0;
				for(let i=0;i<this.results.length;i++){
					if(this.results[i].questionId===questionId){
						if(this.results[i].codes.indexOf(code)>=0){
							this.results[i].codes.splice(this.results[i].codes.indexOf(code),1);
						}else{
							if(type===('单选题')){
								this.results[i].codes=[];
							}
							this.results[i].codes.push(code);
						}
						flag=1;
					}
				}
				if(flag==0){
					let answer={
						questionId:questionId,
						codes:[]
					};
					answer.codes.push(code);
					this.results.push(answer);
				}
			},
			checkSeleted(item){
				let questionId=parseInt(item.split(':')[0]);
				let code=parseInt(item.split(':')[1]);
				for(let i=0;i<this.results.length;i++){
					if(this.results[i].questionId===questionId){
						if(this.results[i].codes.indexOf(code)>=0){
							return true;
						}else{
							return false;
						}
					}
				}
			}
		}
	}
</script>

<style scoped>
	.btn-submit{
		margin: 0 auto;
		width: 20%;
		background: #0081FF;
		color: #FFFFFF;
		height: 80rpx;
		line-height: 200%;
		margin-top: 100rpx;
	}
	uni-page-wrapper {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}

	uni-page-body {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}

	.content {
		background: #FFFFFF;
		min-height: 100%;
		padding-bottom: 50rpx;
	}
</style>
