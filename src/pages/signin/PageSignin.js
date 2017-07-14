import { Component } from 'refast'
import logic from './logic'
import './PageSignin.less'

const { HBox, VBox, Box } = SaltUI.Boxs
const { Avatar } = SaltUI
const jsApiList = [
  'biz.user.get',
  'device.base.getInterface',
  'device.geolocation.get'
]
export default class PageSignin extends Component {

  constructor(props) {
    super(props, logic)
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
          <Box flex={1} className="on_work_container">

          </Box>
          <Box flex={1} className="out_work_container">

          </Box>
        </VBox>
      </div>
    )
  }
}
