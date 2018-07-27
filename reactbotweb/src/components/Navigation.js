import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './container/Login';

class Navigation extends Component {
  render () {
    return (
      <div>
        <Navbar className="bg-dark text-muted">
          <Nav className="d-flex flex-row align-items-baseline" navbar>
            <NavItem>
              <NavbarBrand tag={Link} to="/" className="text-light">LFMBot</NavbarBrand>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/listings" className="text-white">Listings</NavLink>
            </NavItem>
          </Nav>
          <Nav className="d-flex flex-row-end">
            <NavItem>
              <Login />
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="#" className="text-white">Logout</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userApp: state.userApp
  }
}

export default connect(mapStateToProps)(Navigation)
