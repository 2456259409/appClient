<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './colorui/main.css';
	@import './colorui/icon.css';
	
	uni-radio .uni-radio-input{
		width: 50rpx;
		height: 50rpx;
	}

    uni-radio::before{
		/* #ifdef MP-WEIXIN */
		margin-top: -8px;
		left: 4.5rpx;
		/*距离顶部*/
		font-size: 40rpx;
		/* #endif */
        
    }
	/* #ifdef H5 */
	.cuIcon-favorfill::before{
		margin-top: 0px;
		left: 4.5rpx;
		/*距离顶部*/
		font-size: 5rpx;
	}
	/* #endif */
	
	page{
		min-height: 100%;
		background: #FFFFFF;
	}
</style>
