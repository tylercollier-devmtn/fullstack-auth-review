import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { login } from './ducks/reducer';

class AccountInfo extends Component {
  componentDidMount() {
    axios.get('/user-data').then(response => {
      if (response.data.user) {
        this.props.login(response.data.user);
      }
    });
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>AccountInfo</h1>
        {user && <div>You are logged in as:
          <div><strong>{user.name}</strong></div>
          <div><strong>{user.email}</strong></div>
          <div><strong>{user.auth0_id}</strong></div>
          <img src={user.pictureUrl} />
        </div>}
        {!user && <p>You must login! <Link to="/">Log in</Link></p>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  login: login,
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);