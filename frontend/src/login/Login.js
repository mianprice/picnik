import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Login.actions';

class Login extends React.Component {
  render() {
    return (
        <div className="login">
        <label>Username</label>
            <input type="text" onChange={(event) => this.props.updateValue(event.target.id, event.target.value)} id="user_name" value={this.props.login.user_name}/>
        <label>Password</label>
            <input type="password" onChange={(event) => this.props.updateValue(event.target.id, event.target.value)} id="password" value={this.props.login.password}/>
        <button onClick={(event) => this.props.sendLogin(this.props.login)}>Login</button>
        </div>
      );
  }
}

const LoginContainer = ReactRedux.connect(
  state => ({ login: state.login }),
  actions
)(Login);

export default LoginContainer;
