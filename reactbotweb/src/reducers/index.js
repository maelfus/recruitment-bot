import { combineReducers } from 'redux'
import userApp from './userApp'
import newestListing from './newestListing'
import userListing from './userListing'

export default combineReducers({
  userApp,
  userListing,
  newestListing
})
