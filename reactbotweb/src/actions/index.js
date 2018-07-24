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
        error => console.error(`Error fetching listing: ${listing} - ${error}`)
      )
      .then (
        json => dispatch(receiveListing(listing, json))
      )
  }
}

export const REQUEST_USER_LISTING = 'REQUEST_USER_LISTING'
function requestUserListing(userId) {
  return {
    type: REQUEST_USER_LISTING,
    userId
  }
}

export const RECEIVE_USER_LISTING = 'RECEIVE_USER_LISTING'
function receiveUserListing(userId, json) {
  return {
    type: RECEIVE_USER_LISTING,
    userId,
    json
  }
}

export const NO_USER_LISTING = 'NO_USER_LISTING'
function noUserListing(userId) {
  return {
    type: NO_USER_LISTING,
    userId
  }
}

export const UPDATE_USER_LISTING = 'UPDATE_USER_LISTING'
function updateUserListing(userId, data) {
  return {
    type: UPDATE_USER_LISTING,
    userId,
    data
  }
}

export const USER_LISTING_UPDATED = 'USER_LISTING_UPDATED'
function userListingUpdated(data) {
  return {
    type: USER_LISTING_UPDATED,
    data
  }
}

export function fetchUserListing(userId) {
  return function (dispatch) {
    dispatch(requestUserListing(userId))
    return fetch(`http://localhost:3005/api/wow/user/${userId}`)
      .then (
        response => response.json(),
        error => console.error(`Error fetching listing: ${userId} - ${error}`)
      )
      .then (
        json => json !== null ? dispatch(receiveUserListing(userId, json)) : dispatch(noUserListing(userId))
      )
  }
}

export function postUserListing(data) {
  return function (dispatch) {
    dispatch(updateUserListing(data.user, data))
    return fetch(`http://localhost:3005/api/wow/user/${data.user}`, { method: "POST", body: JSON.stringify(data) })
      .then (
        response => response.json(),
        error => console.error(`Error posting listing: ${error}`)
      )
      .then (
        json => dispatch(userListingUpdated(json))
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
