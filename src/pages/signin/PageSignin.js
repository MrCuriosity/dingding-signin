import { Component } from 'refast'
import logic from './logic'
import './PageSignin.less'

const { HBox, VBox, Box } = SaltUI.Boxs
const { Avatar } = SaltUI

export default class PageSignin extends Component {

  constructor(props) {
    super(props, logic)
  }

  render() {
    return (
      <div className="page-signin">
        <VBox vAlign='start' className='header_container'>
          <HBox className="avatar_container">
            <Box flex={0} className='avatarStyle'>
              <Avatar name="tingle" size={40}/>  
            </Box>
            <VBox flex={1} className='userInfo_container'>
              <Box className='username' flex={1}>Tingle</Box>
              <Box className='usergroup' flex={1}>Tingle Group</Box>
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
