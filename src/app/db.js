import nattyFetch from 'natty-fetch';
import { urlPrefix, isDev } from './variables';

const { Toast } = window.SaltUI;

// See https://github.com/Jias/natty-fetch for more details.
const context = nattyFetch.context({
  mockUrlPrefix: urlPrefix,
  urlPrefix,
  mock: isDev,
  timeout: 5000,
  // didFetch: (variable, config) => Toast.hide(),
  withCredentials: false,
  // 请按照需要开启
  fit(response) {
    return {
      success: response.code && response.code === 200,
      content: {
        code: response.code,
        data: response.data
      },
      error: response.status && response.status !== 200 ? {
        status: response.status,
        message: response.message
      } : null,
    }
  },
});

context.create('Signin', {
  // dd.config
  getConfig: {
    /**
     * [query]
     * url => encoded url
     */
    method: 'GET',
    mockUrl: '/api/v1/dingding/config',
    url: `${urlPrefix}/api/v1/dingding/config`
  },

  getUserId: {
    /**
     * [query]
     * :code
     */
    method: 'GET',
    rest: true,
    mockUrl: '/api/v1/dingding/user_info/:code',
    url: `${urlPrefix}/api/v1/dingding/user_info/:code`
  },

  // getGroup
  getGroup: {
    /** 
     * [query]
     * :user_id
     */
    method: 'GET',
    rest: true,
    mockUrl: '/api/v1/logon/dept/user_id/:user_id',
    url: `${urlPrefix}/api/v1/logon/dept/user_id/:user_id`
  },

  // if wifi available
  checkWifi: {
    /**
     * [query]
     * ssid => 
     * mac_addr => 
     */
    willFetch() {
      Toast.show({
        type: 'loading',
        content: '检查WiFi是否可用...',
      })
    },
    didFetch: () => Toast.hide(),
    method: 'GET',
    mockUrl: '/api/v1/logon/wifi/ssid_mac',
    url: `${urlPrefix}/api/v1/logon/wifi/ssid_mac`,
  },

  // signin log today
  todayLog: {
    /**
     * [query]
     * :user_id => 调用时key为':user_id'
     */
    method: 'GET',
    rest: true,
    mockUrl: '/api/v1/logon/clock_in_record/today/:user_id',
    url: `${urlPrefix}/api/v1/logon/clock_in_record/today/:user_id`
  },

  // signin log latest
  nearLog: {
    /**
     * [query]
     * time => HH:mm:ss
     * user_id => userId
     */
    willFetch() {
      Toast.show({
        type: 'loading',
        content: 'Loading',
      })
    },
    didFetch: () => Toast.hide(),
    method: 'GET',
    mockUrl: '/api/v1/logon/clock_in_window/near',
    url: `${urlPrefix}/api/v1/logon/clock_in_window/near`
  },

  // signin
  signin: {
    /**
     * [query]
     * [param json]
     * {  
     *  "user_id":"userId",
     *  "check_datetime":"2017-07-11 19:01:00",// 打卡时间,格式: yyyy-MM-dd HH:mm:ss
     *  "location_method":1,// 定位方法: 0 WIFI, 1 GPS
     *  "device_id":"deviceId", // 设备编号
     *  "user_longitude":104.11, // 经度, GPS定位才必填
     *  "user_latitude":31.01, // 纬度, GPS定位才必填
     *  "user_address":"address",// 经纬度地址, GPS定位才必填
     *  "user_ssid":"ssid",// wifi打卡出现
     *  "user_mac_addr":"mac"// wifi打卡出现
     * }
     */
    willFetch() {
      Toast.show({
        type: 'loading',
        content: 'Loading',
      })
    },
    didFetch: () => Toast.hide(),
    method: 'POST',
    mockUrl: '/api/v1/logon/clock_in_history',
    url: `${urlPrefix}/api/v1/logon/clock_in_history`,
    header: {
      'Content-Type': 'application/json'
    }
  },

  // refresh log
  successLog: {
    /**
     * [query] user_id=x&appoint_day=yyyy-MM-dd
     * [response]
     * {
     *  "code": 200, // 其余为失败
     *  "message": '',
     *  "data": [
     *    {
     *      "user_id": 'userId',
     *      "title": "上班打卡", // 显示标题
     *      "check_type": 1, // 打卡类型: 1.上班 2.下班
     *      "create_time": timestamp, // 创建时间戳
     *      "check_datetime": '2017-07011 9:25:00' // 打卡时间
     *    },
     *    {
     *      "user_id": 'userId',
     *      "title": "下班打卡",
     *      "check_type": 2,
     *      "create_time": timestamp, // 创建时间戳
     *      "check_datetime": '2017-07011 18:25:00' // 打卡时间
     *    }
     *  ]
     * }
     */
    willFetch() {
      Toast.show({
        type: 'loading',
        content: 'Loading',
      })
    },
    didFetch: () => Toast.hide(),
    method: 'GET',
    mockUrl: '/api/v1/logon/clock_in_record/appoint_day',
    url: `${urlPrefix}/api/v1/logon/clock_in_record/appoint_day`
  }
})

export default context.api




























