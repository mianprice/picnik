import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Profile.actions';


class Profile extends React.Component {
  render() {
    return (
        <div className="profile">
            <div className="signup_button" onClick={(event) => {console.log('go to favorites')}}>View favorites</div>
            <div className="signup_button" onClick={(event) => {this.props.goToSignup()}}>Edit profile</div>
        </div>
      );
  }
}

const ProfileContainer = ReactRedux.connect(
  state => ({ state }),
  actions
)(Profile);

export default ProfileContainer;
