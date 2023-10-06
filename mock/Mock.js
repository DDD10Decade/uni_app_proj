import mockjs from "mockjs"
//JavaScript模拟数据生成器
const Mock = {
	//模拟订单数据
	getOrder(type = 0) {
		let array = [];
		for (let i = 0; i < mockjs.Random.integer(5, 10); i++) {
			array.push(mockjs.mock({
				'name': type === 0 ? '普通商品' : "秒杀商品" + i,
				'price': mockjs.Random.integer(20, 500) + "元",
				//这段代码使用Mock.js库中的Random模块来生成一个随机整数，整数的范围为20到500之间（包括20和500）。
				// 其中，integer方法用于产生整数，其参数表示最小值和最大值。
				'buyer': mockjs.Random.cname(),
				'time': mockjs.Random.datetime('yyyy-MM-dd A HH:mm:ss'),
				'role': mockjs.Random.boolean(),
				'state': mockjs.Random.boolean(),
				'payType': mockjs.Random.boolean(),
				'source': mockjs.Random.url(),
				'phone': mockjs.mock(/\d{11}/)
			}))
		}
		return array;
	},
	//模拟获取商品数据
	getGoods(type = 0) {
		let array = [];
		for (let i = 0; i < mockjs.Random.integer(5, 10); i++) {
			array.push(mockjs.mock({
				'name': (type == 0 ? "普通商品" : type == 1 ? "秒杀商品" : "今日推荐") + i,
				'img': mockjs.Random.dataImage('60x100', "商品示例图"),
				'price': mockjs.Random.integer(20, 500) + "元",
				'sellCount': mockjs.Random.integer(10, 100),
				'count': mockjs.Random.integer(10, 100),
				'back': mockjs.Random.integer(10, 100),
				'backPrice': mockjs.Random.integer(0, 5000) + "元",
				'owner': mockjs.Random.cname(),
				'time': mockjs.Random.datetime('yyyy-MM-dd A HH:mm:ss'),
				'state': mockjs.Random.boolean(),
			}))
		}
		return array;
	},
	getManagerList() { //模拟店长数据
		let array = [];
		for (let i = 0; i < mockjs.Random.integer(10, 100); i++) {
			array.push(mockjs.mock({
				'people': mockjs.Random.csentence(2, 10),
				'WeiXin': mockjs.Random.string(7, 10),
				'state': mockjs.Random.boolean(),
				'income': mockjs.Random.integer(0, 500000) + '元',
				'back': mockjs.Random.integer(0, 1000) + '元',
				'backPrice': mockjs.Random.integer(0, 5000) + "元",
				'source': '站内',
				'customer': mockjs.Random.integer(0, 50),
				'time': mockjs.Random.datetime('yyyy-MM-dd A HH:mm:ss'),

			}))
		}
		return array;
	},
	getManagerReqList() { //模拟店长数据
		let array = [];
		for (let i = 0; i < mockjs.Random.integer(10, 100); i++) {
			array.push(mockjs.mock({
				'people': mockjs.Random.csentence(2, 10),
				'state': mockjs.Random.boolean(),
				'time': mockjs.Random.datetime('yyyy-MM-dd A HH:mm:ss'),
				'addTime': mockjs.Random.datetime('yyyy-MM-dd A HH:mm:ss'),

			}))
		}
		return array;
	},
	getManagerOrder() { //模拟店长数据
		let array = [];
		for (let i = 0; i < mockjs.Random.integer(10, 100); i++) {
			array.push(mockjs.mock({
				'type': '店长订单',
				'ordername': mockjs.Random.csentence(2, 8),
				'orderNo': mockjs.Random.string(5, 7),
				'manager': mockjs.Random.cname(),
				'count': mockjs.Random.integer(0, 500),
				'price': mockjs.Random.integer(0, 1000) + '元',
				'commission': mockjs.Random.integer(0, 1000) + "元",
				'payTime': mockjs.Random.datetime('yyyy-MM-dd A HH:mm:ss'),
				'deliverytime': mockjs.Random.datetime('yyyy-MM-dd A HH:mm:ss'),
			}))
		}
		return array;
	},
	getChartsData() {
		const date = new Date();
		let today = {
			mm: date.getMonth() + 1,
			dd: date.getDate(),
		}
		let array = [];
		for (let i = 1; i < today.dd; i++) {
			array.push(mockjs.Random.integer(0, 100))
		}
		return array;
	},
	getTradeData() {
		return mockjs.mock({
			'allTra': mockjs.Random.integer(10000, 50000),
			'speTra': mockjs.Random.integer(0, 5000),
			'norTra': mockjs.Random.integer(0, 5000),
			'userCount': mockjs.Random.integer(0, 1000),
			'managerCount': mockjs.Random.integer(0, 100),
			'time': mockjs.Random.datetime('yyyy-MM-dd A HH:mm:ss'),
		})
	},
	getDateData() {
		const date = new Date();
		let today = {
			mm: date.getMonth() + 1,
			dd: date.getDate(),
		}
		let datedata = [];
		for (let i = 1; i < today.dd; i++) {
			const day = today.mm.toString() + "." + i.toString();
			datedata.push(day);
		}
		return datedata
	}
}

export default Mock;