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
    this.dispatch('getConfig', { url: encodeURI(window.location.href.split('#')[0]) })
    // this.dispatch('init', { url: encodeURI(window.location.href.split('#')[0]) })
  }
  componentDidMount() {
  }
  componentDidUpdate() {
    console.log('component updated')
    /** 注册JSAPI */
    const config = {...this.state.ddconfig, jsApiList}
    console.log(config)
    this.state.ddconfig && dd.config(config)

    const _this = this
    dd.ready(function() {
      /** getUserInfo */
      dd.biz.user.get({
        onSuccess: function (info) {
          info = JSON.parse(JSON.stringify(info))
          _this.setState({
            userid: info.id,
            avatar: info.avatar,
            username: info.nickName
          })
        },
        onFail: function (err) {
          alert('userGet fail: ' + JSON.stringify(err));
        }
      })

      /** todayLog */
    })

    dd.error(function(err) {
      alert(`config error -> ${JSON.stringify(err)}`)
    })
    console.log('..')
  }
  render() {
    // console.log(this)
    // alert(`username: ${this.state.username}`)
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
