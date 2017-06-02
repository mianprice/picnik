import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Login.actions';
import {hashHistory} from 'react-router';


class Login extends React.Component {
  render() {
    return (
        <div className="login">
            <label>Username</label>
            <input type="text" onChange={(event) => this.props.updateValue(event.target.id, event.target.value)} id="user_name" value={this.props.login.user_name}/>
            <label>Password</label>
            <input type="password" onChange={(event) => this.props.updateValue(event.target.id, event.target.value)} id="password" value={this.props.login.password}/>
            <div onClick={(event) => this.props.sendLogin(this.props.login)}>Login</div>
            <div onClick={(event) => hashHistory.push('/signup')}>Create Account</div>
        </div>
      );
  }
}

const LoginContainer = ReactRedux.connect(
  state => ({ login: state.login }),
  actions
)(Login);

export default LoginContainer;
