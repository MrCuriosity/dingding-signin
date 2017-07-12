module.exports = (req, res) => {
	const result = {
		"code": 200, // 其余失败
		"message": "",
		"data": {}
	}
	setTimeout(() => {
		res.status(200).send(result)
	})
}