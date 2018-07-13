import React, { Component } from 'react';
import NewestListing from './container/NewestListing';

export default class Home extends Component {
  render() {
    return (
      <div className="container-fluid text-light">
          <h2>Newest Listing:</h2>
          <NewestListing />
      </div>
    );
  }
}
