import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Login.actions';

class Login extends React.Component {
  render() {
    return (
        <div>TEST</div>
      );
  }
}

const LoginContainer = ReactRedux.connect(
  state => ({ state }),
  actions
)(Login);

export default LoginContainer;
