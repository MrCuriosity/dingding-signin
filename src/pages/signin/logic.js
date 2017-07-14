import dingdingConfig from './ddconfig.js'

const jsApiList = [
  'biz.user.get',
  'device.base.getInterface',
  'device.base.getUUID',
  'device.geolocation.get'
]

export default {
  defaults(props) {
    return {
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
      longitude: null,
      latitude: null,
      todayLog: [],
      dialogShow: false,
      loading: false
    };
  },
	/** init */
	async init({ fn, setState }, { url }) {
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
  			ddconfig.jsApiList = jsApiList
  			console.log('ddconfig', ddconfig)
  			const configResult = await dingdingConfig(ddconfig)
  			alert('configResult => ' + configResult)
  			if (configResult === 1) {
  				alert('okok')

  				dd.ready(() => {
					  /** getUserInfo */
			      dd.biz.user.get({
			        onSuccess: async function (info) {
			          info = JSON.parse(JSON.stringify(info))
			          setState({
			          	userid: info.id,
			          	username: info.nickName,
			          	avatar: info.avatar
			          })

			          alert('getUser success => ' + JSON.stringify(info))
			          
			          /** get todayLog */
  							const result = await fn.DB.Signin.todayLog({ ':user_id': info.id })
  							alert('init todayLog result => ' + JSON.stringify(result))
  							setState({ todayLog: result.data })
  							

			        },
			        onFail: function (err) {
			          alert('getUser fail: ' + JSON.stringify(err))
			        }
			      })

			      /** get device_id */
			      dd.device.base.getUUID({
					    onSuccess(data) {
					    	// alert('getDeviceId success => ' + JSON.stringify(data))
					    	setState({ device_id: data.uuid })
					    },
					    onFail(err) {
					    	alert(JSON.stringify(err))
					    	console.error('get device_id error -> ', err)
					    }
						})

			      /** get location */
			      dd.device.geolocation.get({
			      	targetAccuracy : 200,
					    coordinate : 1,// 1 => 高德 | 2 => 标准
					    withReGeocode : true,
					    onSuccess(result) {
					      // alert('getLocation success => ' + JSON.stringify(result))
					      result = JSON.parse(JSON.stringify(result))
					    	const data = result.location ? result.location : result
					    	const { longitude, latitude, address } = data
					    	setState({ longitude, latitude, address })
					    },
					    onFail(err) {
					    	console.error('getLocation error -> ', err)
					    }
			      })


			      /** checkWIfi */
			      dd.device.base.getInterface({
			      	onSuccess(info) {
			      		info = JSON.parse(JSON.stringify(info))
			      		alert('checkWIfi success ' + JSON.stringify(info))
			      		setState({
			      			ssid: info.ssid,
			      			mac_addr: info.macIp
			      		})

			      	},
			      	onFail(err) {
			          console.error('checkWifi error -> ', JSON.stringify(err))
			      	}
			      })
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
  		alert('todayLog userId ' + userId)
  		const result = await fn.DB.Signin.todayLog({ ':user_id': userId })
  		console.log('todayLog result => ', result)
  		alert('todayLog result => ' + result)
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
  		console.log('nearLog result => ', result)
  		const { data } = result
  		if (data) {
  			setState({ nearLog })
  		}
  	} catch(e) {
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
  async signin({ fn, setState }, { postJSON, type }) {
  	try {
  		const { check_datetime } = postJSON
  		const result = await fn.DB.Signin.signin(postJSON)
  		console.log('signin result => ', result)
  		const { code } = result
  		if (code && code === 200) {
  			console.log('signin ok')
  		}
  	} catch(e) {
  		console.error('signin logic error -> ', e)
  	}
  }

}