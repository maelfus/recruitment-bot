import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Navigation from './components/Navigation';
import Listings from './components/Listings';
import Home from './components/Home';
import Callback from './components/Callback';

// import logo from './logo.svg';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/listings" component={Listings}/>
            <Route path="/callback" component={Callback}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
