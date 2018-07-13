import { combineReducers } from 'redux'
import userApp from './userApp'
import newestListing from './newestListing'

export default combineReducers({
  userApp,
  newestListing
})
