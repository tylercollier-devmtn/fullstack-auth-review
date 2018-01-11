import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class AccountInfo extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>AccountInfo</h1>
        {user && <p>You are logged in as: <strong>{user.name}</strong></p>}
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

export default connect(mapStateToProps)(AccountInfo);