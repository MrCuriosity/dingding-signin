import { Component } from 'refast'
import logic from './logic'
import moment from 'moment'
import './PageSignin.less'

const { HBox, VBox, Box } = SaltUI.Boxs
const { Avatar, Icon } = SaltUI
const jsApiList = [
  'biz.user.get',
  'device.base.getInterface',
  'device.geolocation.get'
]
export default class PageSignin extends Component {

  constructor(props) {
    super(props, logic)
    this.checkWifi = this.checkWifi.bind(this)
    this.handleSignin = this.handleSignin.bind(this)
  }
  checkWifi() {
    const { ssid, mac_addr } = this.state
    this.dispatch('checkWifi', { ssid, mac_addr })
  }
  handleSignin() {

  }
  componentWillMount() {
    // this.dispatch('getConfig', { url: encodeURI(window.location.href.split('#')[0]) })
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
    return (
      <div className="page-signin">
        <VBox vAlign='start' className='header_container'>
          <HBox className="avatar_container">
            <Box flex={0} className='avatarStyle'>
              <Avatar name={this.state.username} src={this.state.avatar} size={40}  />
            </Box>
            <VBox flex={1} className='userInfo_container'>
              <Box className='username' flex={1}>{this.state.username}</Box>
              <Box className='usergroup' flex={1}>{this.state.usergroup}</Box>
            </VBox>
          </HBox>
          <Box flex={1} className="on_work_container" onClick={this.checkWifi}>
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
                <Box flex={0} style={{ height: 32, lineHeight: '32px' }}>暂无记录</Box>
              </VBox>
            }
          </Box>
          <Box flex={1} className="out_work_container" onClick={this.checkWifi}>
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
                  <Box flex={0} style={{ height: 32, lineHeight: '32px' }}>暂无记录</Box>
                </VBox>
              }
          </Box>
        </VBox>
      </div>
    )
  }
}
