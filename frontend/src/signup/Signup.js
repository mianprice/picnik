import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Signup.actions';

class Signup extends React.Component {
  render() {
    return (
        <div>SIGNUP TEST</div>
      );
  }
}

const SignupContainer = ReactRedux.connect(
  state => ({ state }),
  actions
)(Signup);

export default SignupContainer;
