import {} from '../actions'

export default function battleNet(state = {}, action) {
  switch (action.type) {
    case REQUEST_BNET_DATA:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_BNET_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        json
      })
    case UPDATE_BNET_DATA:
      return Object.assign({}, state, {
        isFetching: true
      })
    default:
     return state
  }
}
