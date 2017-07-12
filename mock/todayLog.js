module.exports = (req, res) => {
	const data = [  
		{  
			"user_id":"userId",
			"title":"上班打卡",// 显示标题
			"check_type":1,// 打卡类型: 1 上班, 2 下班
			"create_time":1499739553820,// 创建时间戳
			"check_datetime":"2017-07-11 9:25:00"// 打卡时间
		},
		{  
			"user_id":"userId",
			"title":"下班打卡",
			"check_type":2,
			"create_time":1499739553820,
			"check_datetime":"2017-07-11 19:01:00"
		}
	]
	const result = {
		"code": 200,
		"message": "",
		data
	}
	setTimeout(() => {
		res.status(200).send(result)
	})
}