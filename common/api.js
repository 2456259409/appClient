var baseUrl='http://127.0.0.1:8888';

async function ApiCall(method,url,data,header){
	console.log('进入请求了')
	let [error,res] = await uni.request({
		method:method,
	    url: baseUrl+url, //仅为示例，并非真实接口地址。
	    data: data,
	    header: {
			token:'16<->9wvq4y8zpqidzq6',
			type:'client'
	    }
	})
	if(res.data.code<200||res.data.code>=300){
		let msg = res.data.msg
		uni.showModal({
			title:'警告',
			content:'出现网络错误:'+msg
		})
	}
	return res.data;
}

function dateFormat(fmt, date) {
	// console.log('-->',date,'<--')
	// let dat=new date(dat);
	date=new Date(date);
	let ret;
	const opt = {
		"Y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"H+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"S+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}



module.exports={
	ApiCall:ApiCall,
	dateFormat:dateFormat
}