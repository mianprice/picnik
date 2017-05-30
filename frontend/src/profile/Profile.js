import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Profile.actions';


class Profile extends React.Component {
    componentWillReceiveProps(new_props) {
        if (new_props.login.user_id !== this.props.login.user_id) {
            this.props.loadSavedBeersToProfile(new_props.login);
            this.props.loadSavedWinesToProfile(new_props.login);
            this.props.loadSavedRecipesToProfile(new_props.login);
        }
    }
  render() {
    return (
        <div className="profile">
            <div className="saved_items">
                <div className="saved_items_title">Saved Picniks</div>

            </div>
            <div className="saved_items">
                <div className="saved_items_title">Saved Recipes</div>
                {this.props.profile.saved_recipes.map((recipe, index) => (
                    <div key={index}>
                    {recipe.name}
                    <img src={recipe.image_url} alt={recipe.name}/>
                    </div>
                ))}
            </div>
            <div className="saved_items">
                <div className="saved_items_title">Saved Wines</div>
                {this.props.profile.saved_wines.map((wine, index) => (
                    <div key={index}>{wine.name}</div>
                ))}
            </div>
            <div className="saved_items">
                <div className="saved_items_title">Saved Beers</div>
                {this.props.profile.saved_beers.map((beer, index) => (
                    <div key={index}>{beer.beer_name}</div>
                ))}
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
