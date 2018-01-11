import React, { Component } from 'react';
import logo from './communityBank.svg';
import './Home.css';
import Auth0Lock from 'auth0-lock';
import axios from 'axios';
import { login } from './ducks/reducer';
import { connect } from 'react-redux';

class Home extends Component {
  constructor() {
    super();
    this.lock = null;
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    this.lock = new Auth0Lock(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN);
    console.log('this.lock', this.lock);
    this.lock.on('authenticated', authResult => {
      this.lock.getUserInfo(authResult.accessToken, (error, user) => {
        console.log('user', user);
        // axios.post('/login', { userId: user.sub }).then(response => {
          const response = {
            data: {
              user: {
                name: 'Billy bob joe bobert',
                picture: 'xasdf'
              }
            }
          }
          this.props.login(response.data.user);
          this.props.history.push('/private');
        // })
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

const mapDispatchToProps = {
  login: login,
};

export default connect(null, mapDispatchToProps)(Home);