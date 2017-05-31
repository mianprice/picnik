import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Invitations.actions';

class Invitations extends React.Component {

    render() {
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
                    <div>Weather</div>
                </div>
                <div className="invitations-entry">
                    <div className='invitations-content-title'>Invite Guests</div>
                        <div className="invitations-guest-list-section">
                            <div className='invitations-content-title'>Enter Guests</div>
                            <div>Name of Guest: <input type="text" value={this.props.invitations.invites[0].name} onChange={(event) => this.props.enterInvites(event.target.value, this.props.invitations.invites[0].email, 0)}/></div>

                            <div>Email: <input type='text' value={this.props.invitations.invites[0].email} onChange={(event) => this.props.enterInvites(this.props.invitations.invites[0].name, event.target.value, 0)}/></div>

                            <div className='add-to-guest-list-button' onClick={() => this.props.addToGuestListActionCreator(this.props.invitations.invites[0].name, this.props.invitations.invites[0].email, this.props.login, this.props.planning.id)}>Add to Guest List</div>
                        </div>
                        <div className='invitations-display-section'>
                            <div className='invitations-content-title'>Guest List</div>
                            {this.props.invitations.guest_list.length > 0 ? this.props.invitations.guest_list.map((guest, index) => {
                                return <div className='guest-display' key={index}>
                                            <div>{guest.name}</div>
                                            <div>{guest.email}</div>
                                            <div className='invitation-clear-button' onClick={() => this.props.removeFromGuestListActionCreator(index, guest.email, this.props.planning.id, this.props.login)}>Remove</div>
                                       </div>
                            }) : ""}
                            <div className='invitation-submit-button' onClick={event => this.props.sendInvites(1, this.props.login)}>Send Invitations</div>
                        </div>
                </div>
            </div>
        );
    }
}

const InvitationsContainer = ReactRedux.connect(
    state => ({invitations: state.invitations, food: state.food, drinks: state.drinks, map: state.map, login: state.login, planning: state.planning}),
    actions
)(Invitations);

export default InvitationsContainer;
