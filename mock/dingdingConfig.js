module.exports = (req, res) => {

	const data = {
    "timeStamp":"1499736625",
    "nonceStr":"noncestr",
    "signature":"signature",
    "agentId":"agentId",
    "corpId":"corpId"
 	}
 	const result = {
 		"code": 200,
 		"message": "",
 		data
 	}
 	setTimeout(() => {
 		res.status(200).send(result)
 		// res.status(403).end()
 	}, 800)

}