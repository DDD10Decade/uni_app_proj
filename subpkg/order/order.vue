<template>
	<uni-breadcrumb separator=">">
		<uni-breadcrumb-item v-for="(route, index) in routes" :key="index" :to="route.to">
			{{ route.name }}
		</uni-breadcrumb-item>
	</uni-breadcrumb>
	<uni-swipe-action>
		<view v-for="(item, i) in orderList" :key="i">
			<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler($event, item, i)">
				<uni-card>
					<template v-slot:title>
						<uni-icons type="gift-filled" size="30"></uni-icons>
						{{ item.name }}
						{{ item.time }}
					</template>
					<uni-list-chat
						:avatar-circle="true"
						:title="item.buyer"
						:note="item.role ? '经理' : '分销员'"
						avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
					>
						<uni-tag :text="item.price" type="primary" circle="true"></uni-tag>
						<uni-tag :text="item.state ? '已完成' : '未完成'" :type="item.state ? 'success' : 'error'" inverted="true" circle="true"></uni-tag>
					</uni-list-chat>
				</uni-card>
			</uni-swipe-action-item>
		</view>
	</uni-swipe-action>
	<!-- 筛选弹出层 -->
	<uni-fab horizontal="left" @trigger="menuChoose" :content="fab_menu" direction="horizontal" />
	<van-popup class="popup" :show="screen_popup" position="bottom">
		<van-nav-bar title="筛选" left-text="返回" left-arrow @click-left="close_popup" />
		<van-cell-group>
			<van-field :value="queryParam.good" required clearable label="商品名称：" placeholder="请输入商品名称：" />
			<van-field :value="queryParam.consignee" required clearable label="收货人：" placeholder="请输入收货人：" />
			<van-field :value="queryParam.name" required clearable label="用户名称：" placeholder="请输入用户名称：" />
			<van-field :value="queryParam.phone" required clearable label="手机号：" placeholder="请输入手机号：" />
		</van-cell-group>
		<uni-row class="demo-uni-row">
			<uni-col :span="12">
				<button type="warn" @click="clear">清空筛选</button>
			</uni-col>
			<uni-col :span="12">
				<button type="primary" @click="requestData">筛选</button>
			</uni-col>
		</uni-row>
	</van-popup>
</template>

<script>
import Mock from '../../mock/Mock';
export default {
	data() {
		return {
			routes: [
				{
					to: './../shop_admin/shop_admin',
					name: '后台管理系统'
				},
				{
					to: '',
					name: '订单管理'
				}
			],
			//滑动按钮
			options: [
				{
					text: '联系客户', // 显示的文本内容
					style: {
						backgroundColor: '#00aaff' // 按钮的背景颜色
					}
				},
				{
					text: '删除', // 显示的文本内容
					style: {
						backgroundColor: '#C00000' // 按钮的背景颜色
					}
				}
			],
			//悬浮菜单
			fab_menu: [
				{
					iconPath: '/static/筛选.png',
					text: '筛选',
					active: false
				},
				{
					iconPath: '/static/导出.png',
					text: '导出',
					active: false
				},
				{
					iconPath: '/static/发货.png',
					text: '批量发货',
					active: false
				},
				{
					iconPath: '/static/下载.png',
					text: '下载发货样单',
					active: false
				}
			],
			screen_popup: false,
			//列表订单数据
			orderList: [],
			//筛选订单参数
			queryParam: {
				good: '',
				consignee: '',
				phone: '',
				name: '',
				payTime: '',
				sendTime: ''
			},
			//当前选中订单对象
			multipleSelection: []
		};
	},
	methods: {
		onClickItem(e) {
			if (this.current !== e.currentIndex) {
				this.current = e.currentIndex;
			}
		},
		menuChoose(e) {
			console.log(e);
			if (e.index == 0) {
				//打开筛选弹出层
				this.screen_popup = true;
			}
			if (e.index == 1) {
				//导出订单
				this.exportData();
			}
			if (e.index == 2) {
				//批量发货
				this.dispatchGoods();
			}
			if (e.index == 3) {
				//下载批量发货样单
				this.exportDispatchGoods();
			}
		},
		// 筛选弹出层
		close_popup() {
			this.screen_popup = false;
		},
		swipeActionClickHandler(e, item, i) {
			console.log(e, i);
			if (e.index == 0) {
				// 联系客户
				uni.showLoading({
					title: '联系客户：' + item.phone,
					icon: 'success'
				});
				setTimeout(() => {
					uni.hideLoading();
				}, 1000);
			} else {
				//点击删除
				this.deleteItem(i);
			}
		},
		//模拟请求数据
		requestData() {
			uni.showLoading({
				title: '筛选请求参数：' + JSON.stringify(this.queryParam)
			});
			console.log(this.queryParam);
			this.orderList = Mock.getOrder();
			setTimeout(() => {
				uni.hideLoading();
				this.screen_popup = false;
			}, 1000);
		},
		//
		handleClick(tab) {
			uni.showLoading({
				title: '切换tab刷新数据' + tab.props.label
			});
			this.orderList = Mock.getOrder();
			setTimeout(() => {
				uni.hideLoading();
				this.screen_popup = false;
			}, 1000);
		},
		//清空筛选项
		clear() {
			this.queryParam = {
				good: '',
				consignee: '',
				phone: '',
				name: '',
				payTime: '',
				sendTime: ''
			};
			this.orderList = Mock.getOrder();
		},
		//导出订单
		exportData() {
			// Tools.exportJesn('订单.json', JSON.stringify(this.orderList));
		},
		//导出选中的发货单
		exportDispatchGoods() {
			// Tools.exportJesn('发货单.json', JSON.stringify(this.multipleSelection));
		},
		//处理多选
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		//进行发货
		dispatchGoods() {
			uni.showLoading({
				title: '发货商品' + JSON.stringify(this.multipleSelection),
				icon: 'success'
			});
			setTimeout(() => {
				uni.hideLoading();
			}, 1000);
		},
		//删除订单
		deleteItem(item) {
			this.orderList.splice(item, 1);
		}
	},
	mounted() {
		this.orderList = Mock.getOrder();
	},
	//路由更新时刷新数据
	beforeRouteUpdate() {
		this.orderList = Mock.getOrder();
	}
};
</script>

<style>
.popup {
	height: 80vh;
	width: 100vw;
}
</style>
