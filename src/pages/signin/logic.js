import dingdingConfig from './ddconfig.js'

const { Toast } = SaltUI

const jsApiList = [
  'biz.user.get',
  'device.base.getInterface',
  'device.base.getUUID',
  'device.geolocation.get'
]

export default {
  defaults(props) {
    return {
    	initialized: false,
    	userid: '',
      avatar: '',
      username: '',
      usergroup: '',
      avatar: '',
      device_id: '',
      ssid: '',
      mac_addr: '',
      wifi: false,
      address: '',
      longitude: undefined,
      latitude: undefined,
      todayLog: [],
      nearLog: undefined,
      dialogShow: false,
      loading: false
    };
  },
	/** init */
	async init({ fn, setState }, { url }) {
		try {
			Toast.show({
				type: 'loading',
				content: '初始化中...'
			})

  		const result = await fn.DB.Signin.getConfig({ url })
  		const { data } = result
  		if (data) {

  			let ddconfig = Object.assign(data, {})
  			ddconfig.agentId = parseInt(ddconfig.agentid)
  			delete ddconfig.agentid
  			ddconfig.corpId = ddconfig.corpid
  			delete ddconfig.corpid
  			ddconfig.timeStamp = +new Date(parseInt(ddconfig.timeStamp, 10))
  			ddconfig.jsApiList = jsApiList

  			console.log('ddconfig', ddconfig)
  			const configResult = await dingdingConfig(ddconfig)
  			if (configResult === 1) {

  				dd.ready(() => {

  					const p1 = new Promise((resolve, reject) => {
  						/** getUserInfo */
				      dd.biz.user.get({
				        onSuccess: async function (info) {
				          info = JSON.parse(JSON.stringify(info))
				          setState({
				          	userid: info.id,
				          	username: info.nickName,
				          	avatar: info.avatar
				          })
				          // alert('getUser success => ' + JSON.stringify(info))
				          
				          /** get todayLog */
	  							const result = await fn.DB.Signin.todayLog({ ':user_id': info.id })
	  							// alert(`init todayLog result => ${JSON.stringify(result)}`)
	  							setState({ todayLog: result.data })
	  							resolve(1)
				        },
				        onFail: function (err) {
				          alert(`getUser error ${JSON.stringify(err)}`)
				          console.error('getUser error -> ', err)
				        	reject(1)
				        }
				      })
  					}).catch(e => alert(`p1 error -> ${JSON.stringify(e)}`))

  					const p2 = new Promise((resolve, reject) => {
  						/** get device_id */
				      dd.device.base.getUUID({
						    onSuccess(data) {
						    	// alert('getDeviceId success => ' + JSON.stringify(data))
						    	setState({ device_id: data.uuid })
						    	resolve(2)
						    },
						    onFail(err) {
						    	alert(`get device_id error -> ${JSON.stringify(err)}`)
						    	console.error('get device_id error -> ', err)
						    	reject(2)
						    }
							})
  					}).catch(e => alert(`p2 error -> ${JSON.stringify(e)}`))

				    const p3 = new Promise((resolve, reject) => {
				    	/** get location */
				      dd.device.geolocation.get({
				      	targetAccuracy : 200,
						    coordinate : 1,// 1 => 高德 | 2 => 标准
						    withReGeocode : true,
						    onSuccess(result) {
						    	// alert(`getLocation success => ${JSON.stringify(result)}`)
						      result = JSON.parse(JSON.stringify(result))
						    	const data = result.location ? result.location : result
						    	const { longitude, latitude, address } = data
						    	setState({ longitude, latitude, address })
						    	resolve(3)
						    },
						    onFail(err) {
						    	alert(`getLocation error -> ${JSON.stringify(err)}`)
						    	console.error('getLocation error -> ', err)
						    	reject(3)
						    }
				      })
				    }).catch(e => alert(`getLocation error -> ${JSON.stringify(e)}`))

				    const p4 = new Promise((resolve, reject) => {
				    	/** checkWIfi */
				      dd.device.base.getInterface({
				      	onSuccess(info) {
				      		info = JSON.parse(JSON.stringify(info))
				      		// alert('checkWIfi success ' + JSON.stringify(info))
				      		setState({
				      			ssid: info.ssid,
				      			mac_addr: info.macIp
				      		})
				      		resolve(4)
				      	},
				      	onFail(err) {
				      		alert(`checkWifi error -> ${JSON.stringify(err)}`)
				          console.error('checkWifi error -> ', JSON.stringify(err))
				          reject(4)
				      	}
				      })
				    }).catch(e => alert(`checkWifi error -> ${JSON.stringify(e)}`))

				    Promise.all([p1, p2, p3, p4])
  					.then(data => {
  						// alert(`init Promise.all => ${JSON.stringify(data)}`)
  						setState({ initialized: true })
  						Toast.hide()
  					})
  					.catch(e => alert(`init Promise.all error -> ${JSON.stringify(e)}`))

  				})
  			}
  		}
  	} catch(e) {
  		console.error('init logic error -> ', e)
  	}
	},

	/** 获取ddconfig */
  async getConfig({ fn, setState }, { url }) {
  	try {
  		const result = await fn.DB.Signin.getConfig({ url })
  		const { data } = result
  		if (data) {
  			let ddconfig = Object.assign(data, {})
  			ddconfig.agentId = parseInt(ddconfig.agentid)
  			delete ddconfig.agentid
  			ddconfig.corpId = ddconfig.corpid
  			delete ddconfig.corpid
  			ddconfig.timeStamp = +new Date(parseInt(ddconfig.timeStamp, 10))
  			setState({ ddconfig })
  		}
  	} catch(e) {
  		console.error('ddconfig logic error -> ', e)
  	}
  },

  /** 获取今天打卡记录 */
  async todayLog({ fn, setState }, userId) {
  	try {
  		alert(`todayLog userId => ${JSON.stringify(userId)}`)
  		const result = await fn.DB.Signin.todayLog({ ':user_id': userId })
  		console.log('todayLog result => ', result)
  		alert(`todayLog result => ${JSON.stringify(result)}`)
  		const { data } = result
  		if (data) {
  			setState({ todayLog })
  		}
  	} catch(e) {
  		console.error('todayLog logic error -> ', e)
  	}
  },
  /** 获取最近打卡记录 */
  async nearLog({ fn, setState }, { time, user_id }) {
  	try {
  		const result = await fn.DB.Signin.nearLog({ time, user_id })
  		alert(`nearLog result => ${JSON.stringify(result)}`)
  		console.log('nearLog result => ', result)
  		const { data } = result
  		if (data) {
  			setState({ nearLog })
  		}
  	} catch(e) {
  		alert(`nearLog error -> ${JSON.stringify(e)}`)
  		console.error('nearLog logic error -> ', e)
  	}
  },
  /** 检查WiFi是否可用 */
  async checkWifi({ fn, setState }, { ssid, mac_addr }) {
  	try {
  		const result = await fn.DB.Signin.checkWifi({ ssid, mac_addr })
  		console.log('checkWifi result => ', result)
  		const { code, data } = result
  		if (code && data && code === 200) {
  			setState({ wifi: true })
  		} else {
  			setState({ wifi: false })
  		}
  	} catch(e) {
  		console.error('checkWifi logic error -> ', e)
  	}
  },
  /** 打卡 */
  async signin({ fn, setState }, { postJSON, userId }) {
  	try {
  		const result = await fn.DB.Signin.signin(postJSON)
  		console.log('signin result => ', result)
  		alert(`signin result => ${JSON.stringify(result)}`)
  		const { code } = result
  		if (code && code === 200) {
  			console.log('signin ok')
  			const refresh = await fn.DB.Signin.todayLog({ ':user_id': userId })
				// alert(`refresh todayLog result => ${JSON.stringify(refresh)}`)
				setState({ todayLog: refresh.data })
  		}
  	} catch(e) {
  		alert(`signin logic error -> ${JSON.stringify(e)}`)
  		console.error('signin logic error -> ', e)
  	}
  }

}