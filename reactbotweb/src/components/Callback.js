import React, { Component } from 'react'
import { OauthReceiver } from 'react-oauth-flow'
import { connect }from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchUser, fetchUserListing } from '../actions'


class Callback extends Component {
  handleSuccess = async (accessToken, { response, state }) => {
    console.log('Successfully authorized')
    console.log(accessToken)
    console.log(response)
    await this.props.dispatch(fetchUser(accessToken))

    await this.props.dispatch(fetchUserListing(this.props.userApp.user.id))
    this.props.history.push(state.from)
  }

  handleError = error => {
    console.error('An error occured')
    console.error(error.message)
  }

  render() {
    return (
      <OauthReceiver
        tokenUrl="https://discordapp.com/api/oauth2/token"
        clientId={process.env.REACT_APP_CLIENT_ID}
        clientSecret={process.env.REACT_APP_CLIENT_SECRET}
        redirectUri="http://localhost:3000/callback"
        onAuthSuccess={this.handleSuccess}
        onAuthError={this.handleError}
        render={({ processing, state, error }) => (
          <div>
            {processing && <p>Authorizing now...</p>}
            {error && (
              <p className="error">An error occured: {error.message}</p>
            )}
          </div>
        )}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const {userApp} = state
  return {
    userApp: userApp
  }
}

export default withRouter(connect(mapStateToProps)(Callback))
