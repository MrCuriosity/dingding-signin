import nattyFetch from 'natty-fetch';
import { urlPrefix, isDev } from './variables';

const { Toast } = window.SaltUI;

// See https://github.com/Jias/natty-fetch for more details.
const context = nattyFetch.context({
  mockUrlPrefix: urlPrefix,
  urlPrefix,
  mock: isDev,
  // jsonp: true,
  withCredentials: false,
  traditional: true,
  data: {
    _tb_token_: '',
  },
  timeout: 5000,
  didFetch: (variable, config) => Toast.hide(),
  // 请按照需要开启
  fit(response) {
    return {
      success: response.success,
      content: response.content,
      error: {
        errorMsg: response.errorMsg,
        errorCode: response.errorCode,
        errorLevel: response.errorLevel,
      },
    };
  },
  willFetch() {
    Toast.show({
      type: 'loading',
      content: 'Loading',
    });
  },
});

context.create('SomeModuleAPI', {
  getSomeInfo: {
    mockUrl: 'query/getSomeInfo.json',
    url: 'query/getSomeInfo.json',
    willFetch() {
      Toast.show({
        type: 'loading',
        content: 'Loading',
      });
    },
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
    url: '/api/v1/dingding/config'
  },

  // if wifi available
  checkWifi: {
    /**
     * [query]
     * ssid => 
     * mac_addr => 
     */
    method: 'GET',
    mockUrl: '/api/v1/logon/wifi/ssid_mac',
    url: '/api/v1/logon/wifi/ssid_mac',
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
    url: '/api/v1/logon/clock_in_record/today/:user_id'
  },

  // signin log latest
  nearLog: {
    /**
     * [query]
     * time => HH:mm:ss
     * user_id => userId
     */
    method: 'GET',
    mockUrl: '/api/v1/logon/clock_in_window/near',
    url: '/api/v1/logon/clock_in_window/near'
  },

  // signin
  signin: {
    /**
     * [query]
     * [param json]
     * {  
     *  "user_id":"userId",
     *  "check_type":"2017-07-11 19:01:00",// 打卡时间,格式: yyyy-MM-dd HH:mm:ss
     *  "location_method":1,// 定位方法: 0 WIFI, 1 GPS
     *  "device_id":"deviceId", // 设备编号
     *  "user_longitude":104.11, // 经度, GPS定位才必填
     *  "user_latitude":31.01, // 纬度, GPS定位才必填
     *  "user_address":"address",// 经纬度地址, GPS定位才必填
     *  "user_ssid":"ssid",// wifi打卡出现
     *  "user_mac_addr":"mac"// wifi打卡出现
     * }
     */
    method: 'POST',
    mockUrl: '/api/v1/logon/clock_in_history',
    url: '/api/v1/logon/clock_in_history',
    header: {
      'Content-Type': 'application/json'
    }
  }
})

export default context.api




























