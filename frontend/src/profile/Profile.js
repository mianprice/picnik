import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Profile.actions';


class Profile extends React.Component {
  componentDidMount () {
      this.props.profile.displayPicniksActionCreator(this.props.login.user_id);
  }
  render() {
    return (
        <div className="profile">
            <div className="signup_button" onClick={(event) => {console.log('go to favorites')}}>Saved Picniks</div>
            <div>

            </div>
            <div className="signup_button" onClick={(event) => {this.props.goToSignup()}}>Edit profile</div>
        </div>
      );
  }
}

const ProfileContainer = ReactRedux.connect(
  state => ({ profile: state.profile, login: state.login }),
  actions
)(Profile);

export default ProfileContainer;
