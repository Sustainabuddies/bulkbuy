import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div id="form-elements">
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" />
          </div>
          {name === 'signup' && (
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="text" />
            </div>
          )}
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          {name === 'signup' && (
            <React.Fragment>
              <div>
                <label htmlFor="streetAddress">
                  <small>Street Address</small>
                </label>
                <input name="streetAddress" type="text" />
              </div>
              <div>
                <label htmlFor="city">
                  <small>City</small>
                </label>
                <input name="city" type="text" />
              </div>
              <div>
                <label htmlFor="state">
                  <small>State</small>
                </label>
                <input name="state" type="text" />
              </div>
              <div>
                <label htmlFor="zip">
                  <small>Zip Code</small>
                </label>
                <input name="zip" type="text" />
              </div>
            </React.Fragment>
          )}
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      let email, streetAddress, city, state, zip
      if (formName === 'signup') {
        email = evt.target.email.value
        streetAddress = evt.target.streetAddress.value
        city = evt.target.city.value
        state = evt.target.state.value
        zip = evt.target.zip.value
      }
      dispatch(
        auth(
          email,
          password,
          formName,
          username,
          streetAddress,
          city,
          state,
          zip
        )
      )
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
