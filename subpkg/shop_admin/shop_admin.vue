<template>
	<view class="box-bg">
		<uni-nav-bar shadow left-icon="left" leftText="返回" title="欢迎您登录后台管理系统" @clickLeft="backShop" />
	</view>
	<uni-section title="电商后台管理" type="line" padding>
		<template v-slot:right>
			<image src="../../static/logo.png" mode="aspectFit" class="logo"></image>
		</template>
		<uni-grid :column="2" :showBorder="false" @change="jumpAdminItem">
			<uni-grid-item :index="0">
				<image src="../../static/订单管理.png" mode="aspectFit" class="admin_icon"></image>
				<view class="grid-item-box admin_item">订单管理</view>
			</uni-grid-item>
			<uni-grid-item :index="1">
				<image src="../../static/商品管理.png" mode="aspectFit" class="admin_icon"></image>
				<view class="grid-item-box admin_item">商品管理</view>
			</uni-grid-item>
			<uni-grid-item :index="2">
				<image src="../../static/店长管理.png" mode="aspectFit" class="admin_icon"></image>
				<view class="grid-item-box admin_item">店长管理</view>
			</uni-grid-item>
			<uni-grid-item :index="3">
				<image src="../../static/财务管理.png" mode="aspectFit" class="admin_icon"></image>
				<view class="grid-item-box admin_item">财务管理</view>
			</uni-grid-item>
		</uni-grid>
	</uni-section>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		backShop() {
			uni.switchTab({
				url: '/pages/my/my'
			});
		},
		jumpAdminItem(e) {
			switch (e.detail.index) {
				case 0:
					uni.navigateTo({
						url: './../order/order'
					});
				case 1:
					uni.navigateTo({
						url: './../goods/goods'
					});
				case 2:
					uni.navigateTo({
						url: './../Manager/Manager'
					});
				case 3:
					uni.navigateTo({
						url: './../financial/financial'
					});
				default:
					return;
			}
		}
	}
};
</script>

<style>
.logo {
	height: 25px;
	width: 25px;
	margin: 0;
}
.admin_icon {
	height: 80%;
	width: 80%;
	margin: 0;
	align-self: center;
}
.admin_item {
	text-align: center;
}
</style>
