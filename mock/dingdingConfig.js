module.exports = (req, res) => {

	const data = {
    "timeStamp":"1499736625",
    "nonceStr":"noncestr",
    "signature":"signature",
    "agentid":"agentId",
    "corpid":"corpId"
 	}
 	const result = {
 		"code": 200,
 		"message": "",
 		data
 	}
 	setTimeout(() => {
 		res.status(200).send(result)
 	}, 800)

}