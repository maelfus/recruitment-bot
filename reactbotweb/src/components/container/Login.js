import React, { Component } from 'react'
import { connect } from 'react-redux'
import { OauthSender } from 'react-oauth-flow'
import { NavLink } from 'reactstrap'
import DisplayUser from '../presentational/DisplayUser'

class Login extends Component {
  render () {
    const user = this.props.userApp.user
    if (user) {
      return (
        <DisplayUser user={user} />
      )
    }
    return (
      <OauthSender
        authorizeUrl="https://discordapp.com/api/oauth2/authorize"
        clientId={process.env.REACT_APP_CLIENT_ID}
        redirectUri="http://localhost:3000/callback"
        state={{ from: '/listings' }}
        args={{ scope: 'identify' }}
        render={({url}) => <NavLink href={url} className="text-white">Login</NavLink>}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const { userApp } = state
  return {
    userApp
  }
}

export default connect(mapStateToProps)(Login)
