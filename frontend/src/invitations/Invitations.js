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
                        <div>{this.props.food.select_recipes.length > 0 ? this.props.food.select_recipes.map(recipe => (
                            <div>
                                <img src={recipe.image_url} alt={recipe.name}/>
                                <div>{recipe.name}</div>
                                <a href={"http://www.yummly.co/recipe/" + recipe.yummly_id} target="_blank"><div className="recipe-buttons">View Recipe</div></a>
                            </div>
                        )) : ''}</div>
                    <div>Park</div>
                    <div>Beers</div>
                    <div>Wines</div>
                    <div>Date</div>
                    <div>Weather</div>
                </div>
                <div className="invitations-entry">
                    <div className='invitations-content-title'>Invite Guests</div>
                        <div className="invitations-guest-list-section">
                            <div className='invitations-content-title'>Enter Guests</div>
                            <div>Name of Guest: <input type="text" value={this.props.invitations.invites[0].name} onChange={(event) => this.props.enterInvites(event.target.value, this.props.invitations.invites[0].email, 0)}/></div>

                            <div>Email: <input type='text' value={this.props.invitations.invites[0].email} onChange={(event) => this.props.enterInvites(this.props.invitations.invites[0].name, event.target.value, 0)}/></div>

                            <div className='add-to-guest-list-button' onClick={() => this.props.addToGuestListActionCreator(this.props.invitations.invites[0].name, this.props.invitations.invites[0].email, 'test', 'test')}>Add to Guest List</div>
                        </div>
                        <div className='invitations-display-section'>
                            <div className='invitations-content-title'>Guest List</div>
                            {this.props.invitations.guest_list.length > 0 ? this.props.invitations.guest_list.map((guest, index) => {
                                return <div className='guest-display' key={index}>
                                            <div>{guest.name}</div>
                                            <br/><br/>
                                            <div>{guest.email}</div>
                                            <div className='invitation-clear-button' onClick={() => this.props.removeFromGuestList(index)}>Remove</div>
                                       </div>
                            }) : ""}
                            <div className='invitation-submit-button'>Send Invitations</div>
                        </div>
                </div>
            </div>
        );
    }
}

const InvitationsContainer = ReactRedux.connect(
    state => ({invitations: state.invitations, food: state.food, drinks: state.drinks, map: state.map}),
    actions
)(Invitations);

export default InvitationsContainer;
