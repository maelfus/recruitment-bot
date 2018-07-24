import {
  REQUEST_USER_LISTING,
  RECEIVE_USER_LISTING,
  NO_USER_LISTING,
  UPDATE_USER_LISTING,
  USER_LISTING_UPDATED
} from '../actions'

export default function userListing(state = {}, action) {
  switch (action.type) {
    case REQUEST_USER_LISTING:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_USER_LISTING:
      return Object.assign({}, state, {
        isFetching: false,
        listing: action.json[0]
      })
    case NO_USER_LISTING:
      return Object.assign({}, state, {
        isFetching: false
      })
    case UPDATE_USER_LISTING:
      return Object.assign({}, state, {
        isPosting: true
      })
    case USER_LISTING_UPDATED:
      return Object.assign({}, state, {
        isPosting: false,
        verify: action.json[0]
      })
    default:
      return state
  }
}
