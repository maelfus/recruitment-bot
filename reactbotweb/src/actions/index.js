import fetch from 'cross-fetch'

export const REQUEST_LISTING = 'REQUEST_LISTING'
function requestListing(listing) {
  return {
    type: REQUEST_LISTING,
    listing
  }
}

export const RECEIVE_LISTING = 'RECEIVE_LISTING'
function receiveListing(listing, json) {
  return {
    type: RECEIVE_LISTING,
    listing,
    json
  }
}

export function fetchListing(listing) {
  return function (dispatch) {
    dispatch(requestListing(listing))
    return fetch(`http://localhost:3005/api/wow/${listing}`)
      .then (
        response => response.json(),
        error => console.log(`Error fetching listing: ${listing} - ${error}`)
      )
      .then (
        json => dispatch(receiveListing(listing, json))
      )
  }
}

export const REQUEST_USER = 'REQUEST_USER'
function requestUser(accessToken) {
  return {
    type: REQUEST_USER,
    accessToken
  }
}

export const REFRESH_USER = 'REFRESH_USER'
function refreshUser(accessToken) {
  return {
    type: REFRESH_USER,
    accessToken
  }
}

export const RECEIVE_USER = 'RECEIVE_USER'
function receiveUser(accessToken, json) {
  return {
    type: RECEIVE_USER,
    accessToken,
    json
  }
}

export function fetchUser(accessToken) {
  return function (dispatch) {
    dispatch(requestUser(accessToken))
    return fetch(`https://discordapp.com/api/v6/users/@me`, { headers: { 'Authorization': `Bearer ${accessToken}` } })
      .then (
        response => response.json(),
        error => console.log(`Error fetching user: ${error}`)
      )
      .then (
        json => dispatch(receiveUser(accessToken, json))
      )
  }
}
