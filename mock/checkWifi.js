module.exports = (req, res) => {
	const data = {
    "id":"id",
    "ssid":"ssid",
    "mac":"mac",
    "remark":"remark"
 	}
 	const result = {
 		"code": 200,
 		"message": "success",
 		data
 	}
 	// data有值，则WiFi可用
 	setTimeout(() => {
 		res.status(200).send(result)
 	}, 1200)
}