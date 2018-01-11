import React, { Component } from 'react';
import logo from './communityBank.svg';
import './Home.css';
import Auth0Lock from 'auth0-lock';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {

    }
    this.lock = null;
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    this.lock = new Auth0Lock(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN);
    this.lock.on('authenticated', authResult => {
      this.lock.getUserInfo(authResult.accessToken, (error, user) => {

      })
    })
  }

  login() {
    this.lock.show();
  }

  render() {
    return (
      <div className="home">
        <img src={logo} className="logo" />
        <div className="actions">
          <button onClick={this.login}>Log in</button>
        </div>
      </div>
    );
  }
}