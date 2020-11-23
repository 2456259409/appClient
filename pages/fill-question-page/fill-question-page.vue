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
					{{(inde+1)+'.'+ite.title}}
				</view>
			</view>
			<view style="border: 4rpx solid #EEEEEE;border-radius: 2%;margin: 30rpx;">
				<view v-if="ite.code!=3" v-for="(item,index) in ite.answer" :key="index">
					<!-- <view > -->
						<radio-group @change="radioChange" style="display: flex;align-items: center;justify-content: center;width: 100%;border-bottom: 1rpx solid #EEEEEE;">
							<radio :value="item" :checked="index === current"
								style="margin-left: 25rpx;"/>
							<span style="height: 100rpx;flex: 4;display: flex;
							align-items: center; margin-left: 20rpx;font-size: 35rpx;">{{item.content}}</span>
						</radio-group>
						
					<!-- </view> -->
				</view>
				<!-- <view v-else>文本框</view> -->
				<view v-if="ite.code==3" style="margin-bottom: 30rpx;height: 200rpx;">
					<textarea placeholder="最长200个字" maxlength="200"></textarea>
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
				paper: '',
				radio: false,
				results:[]
			}
		},
		async onLoad(opt) {
			let id = opt.id;
			let data = await Api.ApiCall('get', '/api/paper/getById/' + id);
			console.log('renjian', data);
			let paper=data.data;
			paper.question.forEach((item,index)=>{
				if(item.code===1){
					item.selected='';
				}
				if(item.code===2){
					item.selected=[];
				}
				item.answer.forEach((ite,inde)=>{
					ite.questionId=item.id;
					ite.questionTitle=item.title;
					ite.questionType=item.code;
				})
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
			radioChange(e){
				let answer=e.detail.value;
				let paper=this.paper;
				let results=this.results;
				let result={};
				// for(let i=0;i<results.length;i++){
				// 	if(answer.questionId==results[i].questionId){
				// 		if(results[i].questionType==1){
				// 			results.splice(i,1);
				// 		}
						
				// 		return;
				// 	}
				// }
				// if(answer.questionType==1){
				// 	result={
				// 		questionId:answer.questionId,
				// 		questionType:answer.questionType,
				// 		answer:{
				// 			code:answer.code
				// 			// content:answer.content
				// 		}
				// 	}
				// }
				
				// if(result.questionType==1){
					
				// }
				// this.results.push(result);
				// console.log('任建大侠',paper.question)
				// for(let i=0;i<paper.question.length;i++){
				// 	if(paper.question[i].id==answer.questionId){
				// 		if(paper.question[i].code==1){
				// 			paper.question[i].selected=answer;
				// 		}
				// 		if(paper.question[i].code==2){
				// 			paper.question[i].selected.push(answer);
				// 		}
				// 	}
				// }
				
				// console.log(paper);
				// console.log('任建',question);
			}
		}
	}
</script>

<style scoped>

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
