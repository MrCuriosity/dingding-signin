export default function(config) {
	return new Promise((resolve, reject) => {
		dd.config(config)
		dd.error(function(reason) {
			// alert('DINGDING CONFIG REJECT' + JSON.stringify(reason))
			console.error('DINGDING CONFIG REJECT -> ', reason)
			reject(0)
		})
		dd.ready(function() {
			// alert('DINGDING CONFIG SUCCESS!')
			console.log('DINGDING CONFIG SUCCESS!')
			resolve(1)
		})
		
	})
	.catch(function(e) {
		// alert('DINGDING CONFIG ERROR ' + JSON.stringify(e))
		console.error('DINGDING CONFIG ERROR -> ', e)
	})
}