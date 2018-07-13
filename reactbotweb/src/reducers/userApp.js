import {
  REQUEST_USER,
  RECEIVE_USER,
  REFRESH_USER
} from '../actions'

function userApp(state = {}, action) {
  switch (action.type) {
    case REQUEST_USER:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_USER:
      return Object.assign({}, state, {
        isFetching: false,
        token: action.accessToken,
        user: action.json
      })
    case REFRESH_USER:
      return Object.assign({}, state, {
        isFetching: true
      })
    default:
      return state
  }
}

export default userApp
