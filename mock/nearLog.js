module.exports = (req, res) => {
	const data = {  
		"title":"上班打卡",// 显示标题
		"check_type":1,// 打卡类型: 1 上班, 2 下班
		"start_time":"05:00:00", // 当check_type=2使用这个值
		"end_time":"09:30:00",// 当check_type使用这个值
	}
	const result = {
		"code": 200,
		"message": "",
		data
	}
	setTimeout(() => {
		res.status(200).send(result)
	})
}