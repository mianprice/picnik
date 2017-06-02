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
                            {picnik.date_of}<br/><br/>
                            {picnik.time_of}<br/><br/>
                            {picnik.park[0].name}<br/><br/>
                            {picnik.park[0].address}<br/><br/>
                        </div>
                            {picnik.recipes.length > 0 ? picnik.recipes.map((recipe, index) => {
                                return <div className="saved-picnik-recipe-details" key={index}>
                                            {recipe.name}
                                            <img src={recipe.image_url}/>
                                        </div>
                            }) : ""}
                        {picnik.beers[0].length > 0 ? picnik.beers[0].map((beer, index) => {
                            return <div className="saved-picnik-beer-details" key={index}>
                                        {beer.beer_name}
                                        <img src={beer.label_image_link_icon}/>
                                    </div>
                        }) : ""}

                        {picnik.wines[0].length > 0 ? picnik.wines[0].map((wine, index) => {
                            return <div className="saved-picnik-wine-details" key={index}>
                                        {wine.name}
                                        <img src={wine.image_link}/>
                                    </div>
                        }) : ""}

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
