import {
  REQUEST_LISTING,
  RECEIVE_LISTING
} from '../actions'

export default function newestListing(state = {}, action) {
  switch (action.type) {
    case REQUEST_LISTING:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_LISTING:
      return Object.assign({}, state, {
        isFetching: false,
        listing: action.json[0]
      })
    default:
      return state
  }
}
