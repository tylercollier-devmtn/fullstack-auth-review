import React, { Component } from 'react';
import { connect } from 'react-redux';

class AccountInfo extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>AccountInfo</h1>
        <p>You are logged in as: <strong>{user.name}</strong></p>
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