import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Profile.actions';

class Profile extends React.Component {
  render() {
    return (
        <div className="profile">PROFILE TEST</div>
      );
  }
}

const ProfileContainer = ReactRedux.connect(
  state => ({ state }),
  actions
)(Profile);

export default ProfileContainer;
