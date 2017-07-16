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
    const onWorkLog = this.state.todayLog[0]
    const outWorkLog = this.state.todayLog[1]
    const { nearLog } = this.state
    const nearTitle = nearLog && nearLog.title ? nearLog.title : undefined
    const nearCheckType = nearLog && nearLog.check_type ? nearLog.check_type : undefined
    let nearTime
    if (!nearLog) {
      nearTime = undefined
    } else if (nearCheckType === 1) {
      nearTime = nearLog.start_time
    } else if (nearCheckType === 2) {
      nearTime = nearLog.end_time
    }

    return (
      <div className="page-signin">
        <VBox vAlign='start' className='header_container'>
          <HBox className="avatar_container">
            <Box flex={0} className='avatarStyle'>
              <Avatar name={this.state.username} src={this.state.avatar} size={40}  />
            </Box>
            <VBox flex={1} className='userInfo_container'>
              <Box className='username' flex={1}>{this.state.username ? this.state.username : '员工'}</Box>
              <Box className='usergroup' flex={1}>{this.state.usergroup ? this.state.usergroup : '所属小组'}</Box>
            </VBox>
          </HBox>
          <Box flex={1} className="on_work_container" onClick={this.showDialog}>
            {
              onWorkLog ?
              <VBox vAlign='start' className="click_field">
                <Box><Icon name='check-round' fill={color.normal} /></Box>
                <Box>{onWorkLog.title}</Box>
                <Box>{onWorkLog.check_datetime}</Box>
              </VBox>
              :
              <VBox vAlign='start' className="click_field">
                <Box flex={1}><Icon width={'60px'} height={'100%'} name='face-sad-full' fill={color.warn} /></Box>
                <Box flex={0} style={{ height: 32, lineHeight: '32px' }}>今日暂无记录</Box>
              </VBox>
            }
          </Box>
          <Box flex={1} className="out_work_container" onClick={this.showDialog}>
            {
              outWorkLog ?
                <VBox className="click_field">
                  <p><Icon name='check-round' fill={color.normal} /></p>
                  <p>{outWorkLog.title}</p>
                  <p>{outWorkLog.check_datetime}</p>
                </VBox>
                :
                <VBox className="click_field">
                  <Box flex={1}><Icon width={'60px'} height={'100%'} name='face-sad-full' fill={color.warn} /></Box>
                  <Box flex={0} style={{ height: 32, lineHeight: '32px' }}>今日暂无记录</Box>
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
              <p>
                <span style={{ marginRight: 10 }}>{nearTitle}</span>
                <span>{nearTime}</span>
              </p>
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
