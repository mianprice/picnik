import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Profile.actions';
import {hashHistory} from 'react-router';


class Profile extends React.Component {
    componentDidMount() {
        if (this.props.login.user_id) {
            this.props.displayPicniksActionCreator(this.props.login);
            // this.props.loadSavedBeersToProfile(this.props.login);
            // this.props.loadSavedWinesToProfile(this.props.login);
            // this.props.loadSavedRecipesToProfile(this.props.login);
        }
    }
    componentWillReceiveProps(new_props) {
        if (new_props.login.user_id !== this.props.login.user_id) {
            // this.props.loadSavedBeersToProfile(new_props.login);
            // this.props.loadSavedWinesToProfile(new_props.login);
            // this.props.loadSavedRecipesToProfile(new_props.login);
            this.props.displayPicniksActionCreator(new_props.login);
        }
    }
  render() {
    return (
        <div className="profile">
            <div className="saved_items">
                <div className="saved_items_title">My Saved Picniks</div>
                {this.props.profile.saved_picniks.map((picnik, index) => (
                    <div className="saved-picnik" key={index}>
                        <div className="saved-picnik-details">
                            Date: {picnik.date_of}<br/><br/>
                            Time: {picnik.time_of}<br/><br/>
                            Park: {picnik.park.name}<br/><br/>
                            Address: {picnik.park.address}<br/><br/>
                        </div>
                            Recipes: {picnik.recipes.length > 0 ? picnik.recipes.map((recipe, index) => {
                                return <div className="saved-picnik-recipe-details" key={index}>
                                            {recipe.name}

                                        </div>
                            }) : "No recipes were selected for this picnik."}
                        {picnik.beers.length > 0 ? picnik.beers.map((beer, index) => {
                            return <div className="saved-picnik-beer-details" key={index}>
                                        Beers: <br/><br/> {beer.beer_name}

                                    </div>
                        }) : "No beers were selected for this picnik."}

                        {picnik.wines.length > 0 ? picnik.wines.map((wine, index) => {
                            return <div className="saved-picnik-wine-details" key={index}>
                                        Wines: <br/><br/>{wine.name}
                                    </div>
                        }) : "No wines were selected for this picnik."}

                        <div className='profile-buttons' onClick={() => {this.props.loadPicnikToPlanning( this.props.profile.saved_picniks[index]);hashHistory.push('/invitations')}}>View and Send Invites</div>
                    </div>
                ))}
            </div>

        </div>
      );
  }
}

const ProfileContainer = ReactRedux.connect(
  state => ({ profile: state.profile, login: state.login }),
  actions
)(Profile);

export default ProfileContainer;
