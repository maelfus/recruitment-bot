import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import Navigation from './components/Navigation'
import Listings from './components/Listings'
import Home from './components/Home'
import Callback from './components/Callback'

// import logo from './logo.svg';


const App = ({history}) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/listings" component={Listings}/>
          <Route path="/callback" component={Callback}/>
        </Switch>
      </div>
    </ConnectedRouter>
  )
}

export default App
