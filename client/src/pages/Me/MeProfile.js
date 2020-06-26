import React ,{useEffect} from 'react'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {grabProfile} from '../../redux/users/user.selectors'
import {fetchUserProfileStarts} from '../../redux/users/user.action'

const MeProfile = ({profile,fetchUserProfileStarts}) => {
  useEffect(() => {
    fetchUserProfileStarts()
  },[fetchUserProfileStarts])
  return (
    <h1>PROFILE PAGE</h1>
  )
}


const mapStateToProps = createStructuredSelector({
  profile: grabProfile
})

export default connect(
mapStateToProps ,
{fetchUserProfileStarts}
)(MeProfile);