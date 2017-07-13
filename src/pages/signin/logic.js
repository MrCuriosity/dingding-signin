import dingdingConfig from './ddconfig.js'

const jsApiList = [
  'biz.user.get',
  'device.base.getInterface',
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
      loading: false
    };
  },
	/** init */
	async init({ fn, setState }, { url }) {
		try {
  		const result = await fn.DB.Signin.getConfig({ url })
  		const { data } = result
  		if (data) {
  			let ddconfig = Object.assign(data)
  			ddconfig.agentId = parseInt(ddconfig.agentid)
  			delete ddconfig.agentid
  			ddconfig.corpId = ddconfig.corpid
  			delete ddconfig.corpid
  			ddconfig.timeStamp = +new Date(parseInt(ddconfig.timeStamp, 10))
  			console.log(ddconfig)
  			const configResult = await dingdingConfig(ddconfig)
  			alert('configResult => ' + configResult)
  			if (configResult === 1) {
  				alert('okok')
  				dd.ready(() => {
					  /** getUserInfo */
			      // dd.biz.user.get({
			      //   onSuccess: function (info) {
			      //     info = JSON.parse(JSON.stringify(info))
			      //     alert('getUserSuccess => ' + JSON.stringify(info))
			      //   },
			      //   onFail: function (err) {
			      //     alert('userGet fail: ' + JSON.stringify(err));
			      //   }
			      // })
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
  			let ddconfig = Object.assign(data)
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
  		const result = await fn.DB.todayLog({ ':user_id': userId })
  		console.log('todayLog result => ', result)
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
  		const result = await fn.DB.nearLog({ time, user_id })
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
  		const result = await fn.DB.nearLog({ ssid, mac_addr })
  		console.log('checkWifi result => ', result)
  		const { code } = result
  		if (code && code === 200) {
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
  		const result = await fn.DB.signin(postJSON)
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