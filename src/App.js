import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import Home from './Home';
import AccountInfo from './AccountInfo';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/(access_token.*)?" component={Home} />
        <Route path="/private" component={AccountInfo} />
      </div>
    );
  }
}

export default App;
