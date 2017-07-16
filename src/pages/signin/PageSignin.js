import { Component } from 'refast'
import logic from './logic'
import moment from 'moment'
import './PageSignin.less'

const { HBox, VBox, Box } = SaltUI.Boxs
const { Toast, Avatar, Icon, Dialog } = SaltUI
const jsApiList = [
  'biz.user.get',
  'device.base.getInterface',
  'device.geolocation.get'
]
export default class PageSignin extends Component {

  constructor(props) {
    super(props, logic)
    this.showDialog = this.showDialog.bind(this)
    this.hideDialog = this.hideDialog.bind(this)
    this.checkWifi = this.checkWifi.bind(this)
    this.getNearLog = this.getNearLog.bind(this)
    this.handleSignin = this.handleSignin.bind(this)
  }
  checkWifi() {
    const { ssid, mac_addr } = this.state
    this.dispatch('checkWifi', { ssid, mac_addr })
  }
  getNearLog() {
    const time = moment().format('HH:mm:ss')
    const user_id = this.state.userid
    this.dispatch('nearLog', { time, user_id })
  }
  showDialog() {
    this.checkWifi()
    this.getNearLog()
    this.setState({ dialogShow: true })
  }
  hideDialog() {
    this.setState({ dialogShow: false })
  }
  handleSignin() {
    const postJSON = {
      user_id: this.state.userid,
      check_datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
      location_method: this.state.wifi ? 0 : 1,
      device_id: this.state.device_id,
      user_longitude: this.state.longitude,
      user_latitude: this.state.latitude,
      user_address: this.state.address,
      user_ssid: this.state.ssid,
      user_mac_addr: this.state.mac_addr
    }
    const userId = this.state.userid
    this.dispatch(['signin'], { postJSON, userId })
  }
  componentWillMount() {
    this.dispatch('init', { url: encodeURI(window.location.href.split('#')[0]) })
  }
  componentDidMount() {
  }
  componentDidUpdate() {

  }
  render() {
    // console.log(this)
    // alert(`username: ${this.state.username}`)
    const color = {
      normal: 'rgba(77, 157, 240, 1)',
      warn: 'rgba(230, 81, 0, 1)',
      award: 'rgba(123, 195, 128, 1)'
    }
    const getWorkLog = ({ todayLog, type }) => {
      if (!todayLog) {
        return undefined
      }
      let i
      for (i = 0; i < todayLog.length; i++) {
        if (todayLog[i].check_type == type) {
          return Object.assign(todayLog[i], {})
        }
      }
      return undefined
    }
    const onWorkLog = getWorkLog({ todayLog: this.state.todayLog, type: 1 })
    const outWorkLog = getWorkLog({ todayLog: this.state.todayLog, type: 2 })

    const { nearLog } = this.state
    const nearTitle = nearLog && nearLog.title ? nearLog.title : undefined
    const nearCheckType = nearLog && nearLog.check_type ? nearLog.check_type : undefined
    let nearTime
    if (!nearLog) {
      nearTime = undefined
    } else if (nearCheckType === 1) {
      nearTime = `${nearLog.start_time} 前`
    } else if (nearCheckType === 2) {
      nearTime = `${nearLog.end_time} 后`
    }

    return (
      <div className="page-signin">
        <VBox className='header_container'>
          {/** 头像及按钮 */}
          <HBox className="avatar_container">
            <Box flex={0} className='avatarStyle'>
              <Avatar name={this.state.username} src={this.state.avatar} size={40}  />
            </Box>
            <VBox flex={1} className='userInfo_container'>
              <Box className='username' flex={1}>{this.state.username ? this.state.username : '-'}</Box>
              <Box className='usergroup' flex={1}>{this.state.usergroup ? this.state.usergroup : '-'}</Box>
            </VBox>
            <Box className='signin_button' onClick={this.showDialog}>
              <span className='signin_button_text'>打卡</span>
              <Icon fill={'#108ee9'} name='time' height={'40px'} width={'24px'} />
            </Box>
          </HBox>
          {/** 上班记录 */}
          <Box flex={1} className="on_work_container">
            {
              onWorkLog ?
              <VBox vAlign='center' className="click_field">
                <Box><Icon width={'60px'} height={'100%'} name='check-round' fill={color.normal} /></Box>
                <Box className='signin_status_text'>{onWorkLog.title}</Box>
                <Box className='signin_time_text'>{onWorkLog.check_datetime}</Box>
              </VBox>
              :
              <VBox hAlign='center' className="click_field">
                <Box flex={1} ><Icon width={'60px'} height={'100%'} name='face-sad-full' fill={color.warn} /></Box>
                <Box className='noLog_text'>今日暂无记录</Box>
              </VBox>
            }
          </Box>
          {/** 下班记录 */}
          <Box flex={1} className="out_work_container">
            {
              outWorkLog ?
                <VBox vAlign='center' className="click_field">
                  <Box><Icon width={'60px'} height={'100%'} name='check-round' fill={color.normal} /></Box>
                  <Box className='signin_status_text'>{outWorkLog.title}</Box>
                  <Box className='signin_time_text'>{outWorkLog.check_datetime}</Box>
                </VBox>
                :
                <VBox flex={1} hAlign='center' className="click_field">
                  <Box flex={1}><div><Icon width={'60px'} height={'100%'} name='face-sad-full' fill={color.warn} /></div></Box>
                  <Box className='noLog_text'>今日暂无记录</Box>
                </VBox>
              }
          </Box>
        </VBox>
        <Dialog
          show={this.state.dialogShow}
          type={'confirm'}
          onCancel={this.hideDialog}
          onConfirm={this.handleSignin}
        >
          <div>
            {
              !nearLog ? <p>无法获取打卡信息</p>
              :
              <div>
                <span style={{ marginRight: 10 }}>{nearTitle}</span>
                <span>{nearTime}</span>
                <p>现在时间：{moment().format('HH:mm:ss')}</p>
              </div>
            }
            {
              this.state.wifi ? <p>进入WiFi打卡范围</p> : <p>当前WiFi不可用，将使用GPS打卡</p>
            }
          </div>
        </Dialog>
      </div>
    )
  }
}
