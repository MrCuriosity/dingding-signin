export default function(config) {
	return new Promise((resolve, reject) => {
		dd.config(config)
		dd.error((reason) => {
			alert('DINGDING CONFIG REJECT' + JSON.stringify(reason))
			console.error('DINGDING CONFIG REJECT -> ', reason)
			reject(0)
		})
		dd.ready(() => {
			alert('DINGDING CONFIG SUCCESS!')
			console.log('DINGDING CONFIG SUCCESS!')
			dd.biz.user.get({
        onSuccess: function (info) {
          info = JSON.parse(JSON.stringify(info))
          alert('getUserSuccess => ' + JSON.stringify(info))
        },
        onFail: function (err) {
          alert('userGet failed: ' + JSON.stringify(err));
        }
      })
			resolve(1)
		})
		
	})
	.catch((e) => {
		alert('DINGDING CONFIG ERROR' + JSON.stringify(e))
		console.error('DINGDING CONFIG ERROR -> ', e)
	})
}