import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Profile.actions';


class Profile extends React.Component {
  render() {
    return (
        <div className="profile">
            <div className="saved_items">
                <div className="saved_items_title">Saved Picniks</div>
                
            </div>
            <div className="saved_items">
                <div className="saved_items_title">Saved Recipes</div>
            </div>
            <div className="saved_items">
                <div className="saved_items_title">Saved Wines</div>
            </div>
            <div className="saved_items">
                <div className="saved_items_title">Saved Beers</div>
            </div>
            <div className="saved_items">
                <div className="saved_items_title">Saved Parks</div>
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
