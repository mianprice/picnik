import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Invitations.actions';

class Invitations extends React.Component {
    componentDidMount() {
        this.props.refreshGuestList(this.props.planning.id, this.props.login);
    }
    render() {
        let invitation_set = (
            <div className='invitations-display-section'>
                <div className='invitations-content-title'>Guest List<div className="signup_button" onClick={event => this.props.refreshGuestList(this.props.planning.id, this.props.login)}>Refresh</div></div>
                {this.props.invitations.guest_list.length > 0 ? this.props.invitations.guest_list.map((guest, index) => {
                    let responseString, responseIcon;
                    if (guest.response == 2) {
                        responseString = "";
                        responseIcon = <i className="fa fa-fw fa-check" />;
                    } else if (guest.response == 3) {
                        responseString = "";
                        responseIcon = <i className="fa fa-fw fa-times" />;
                    } else {
                        responseString = "";
                        responseIcon = <i className="fa fa-fw fa-question" />;
                    }
                    return (
                            <div className='guest-display' key={index}>
                                <div>{guest.name}</div>
                                <div>{guest.email}</div>
                                <div>{responseString}</div>
                                <div>{responseIcon}</div>
                            </div>
                    );
                }) : ""}
            </div>
        )
        return(
            <div className='invitations-content'>
                <div className="invitations-picnik-summary">
                    <div className='invitations-content-title'>Picnik Summary</div>
                    <div>Recipes</div>
                        <div>{this.props.planning.recipes.length > 0 ? this.props.planning.recipes.map((recipe, index) => (
                            <div key={index}>
                                <img src={recipe.image_url} alt={recipe.name}/>
                                <div>{recipe.name}</div>
                                <a href={"http://www.yummly.co/recipe/" + recipe.yummly_id} target="_blank"><div className="recipe-buttons">View Recipe</div></a>
                            </div>
                        )) : ''}</div>
                    <div>Park</div>
                    <div>
                            <div>{this.props.planning.park.name}</div>
                            <div>{this.props.planning.park.address}</div>
                    </div>
                    <div>Beers</div>
                    <div>{this.props.planning.beers.length > 0 ? this.props.planning.beers.map((beer, index) => (
                        <div key={index}>
                            <img src={beer.label_image_link_icon} alt={beer.beer_name}/>
                            <div>{beer.beer_name}</div>
                            <div>{beer.brewery_name}</div>
                            <div>{beer.style_name}</div>
                        </div>
                    )) : ''}</div>
                    <div>Wines</div>
                        <div>{this.props.planning.wines.length > 0 ? this.props.planning.wines.map((wine, index) => (
                            <div key={index}>
                                <img src={wine.image_link} alt={wine.name}/>
                                <div>{wine.name}</div>
                                <div>{wine.winery}</div>
                                <div>{wine.varietal}</div>
                            </div>
                        )) : ''}</div>
                    <div>Date</div>
                    <div>{this.props.planning.date_of}</div>
                    <div>Weather</div>
                    <div>{this.props.planning.time_of}</div>
                </div>
                <div className="invitations-entry">
                    <div className='invitations-content-title'>Invite Guests</div>
                        <div className="invitations-guest-list-section">
                            <div className='invitations-content-title'>Enter Guests</div>
                            <div>Name of Guest: <input type="text" value={this.props.invitations.invite_name} onChange={(event) => this.props.enterInvites(event.target.value, this.props.invitations.invite_email, 0)}/></div>

                            <div>Email: <input type='text' value={this.props.invitations.invite_email} onChange={(event) => this.props.enterInvites(this.props.invitations.invite_name, event.target.value, 0)}/></div>

                            <div className='add-to-guest-list-button' onClick={() => this.props.sendInvite(this.props.planning.id, this.props.invitations.invite_name, this.props.invitations.invite_email, this.props.login)}>Send Invite</div>
                        </div>

                </div>
                {invitation_set}
            </div>
        );
    }
}

const InvitationsContainer = ReactRedux.connect(
    state => ({invitations: state.invitations, food: state.food, drinks: state.drinks, map: state.map, login: state.login, planning: state.planning}),
    actions
)(Invitations);

export default InvitationsContainer;
