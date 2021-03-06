import React from 'react'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {username} = props
  const history = useHistory()

  return (
    <div className="main">
      <h3>Welcome Back, {username}</h3>
      <div className="home">
        <button>I need items</button>
        <button>I want to buy for others</button>
        <button>Review my trips</button>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.user.username
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  username: PropTypes.string
}
