import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Invitations.actions';

class Invitations extends React.Component {
    componentDidMount() {
        if (this.props.login.token !== undefined) {
            this.props.refreshGuestList(this.props.planning.id, this.props.login);
        }
    }
    render() {
        let invitation_set = (
            <div className='invitations-display-section'>
                <div className='invitations-content-title'>Guest List</div>
                {this.props.invitations.guest_list.length > 0 ? this.props.invitations.guest_list.map((guest, index) => {
                    let responseIcon;
                    if (guest.response == 2) {
                        responseIcon = <i className="fa fa-fw fa-check" />;
                    } else if (guest.response == 3) {
                        responseIcon = <i className="fa fa-fw fa-times" />;
                    } else {
                        responseIcon = <i className="fa fa-fw fa-question" />;
                    }
                    return (
                            <div className='guest-display' key={index}>
                                <div>{guest.name} {responseIcon}</div>
                                <div>{guest.email}</div>
                            </div>
                    );
                }) : ""}
                <div className="add-to-guest-list-button" onClick={event => this.props.refreshGuestList(this.props.planning.id, this.props.login)}>Refresh</div>
            </div>
        );

        let invitationResponse = (
            <div className="invite-response">
                <div className="invite-response-text">{this.props.params.invite_response === 'true' ? "Thanks for your response!  Contact the host of your Picnik if you have any further questions." : "Thanks for your response.  Maybe next time!"}
            </div>
        );
        let picnik = this.props.planning;
        let page_body;
        if (this.props.login.token) {
            page_body = (
                <div className='invitations-content'>
                    <div className="invitations-picnik-summary">
                        <div className="saved-picnik">
                            <div className="saved-picnik-details">
                                <div>Date: {picnik.date_of}</div>
                                <div>Time: {picnik.time_of}</div>
                                <div>Park: {(picnik.park) ? (picnik.park.name) : ""}</div>
                                <div>Address: {(picnik.park) ? (picnik.park.address) : ""}</div>
                            </div>
                            <div className="saved-picnik-details">
                                <div>Recipes:</div>
                                <div className="saved-picnik-recipe-details">
                                    {picnik.recipes.length > 0 ? picnik.recipes.map((recipe, index) => {
                                        return <div>{recipe.name}</div>
                                    }) : "No recipes were selected for this picnik."}
                                </div>
                            </div>
                            <div className="saved-picnik-details">
                                <div>Beers:</div>
                                {(picnik.beers && picnik.beers.length > 0) ? picnik.beers.map((beer, index) => {
                                    return <div className="saved-picnik-beer-details">
                                                 {beer.beer_name}

                                            </div>
                                }) : (<div className="saved-picnik-beer-details">No beers were selected for this picnik.</div>)}
                            </div>

                            <div className="saved-picnik-details">
                                <div>Wines:</div> {(picnik.wines && picnik.wines.length > 0) ? picnik.wines.map((wine, index) => {
                                    return <div className="saved-picnik-wine-details">
                                                 {wine.name}
                                            </div>
                                }) : (<div className="saved-picnik-wine-details">No wines were selected for this picnik.</div>)}
                            </div>
                        </div>
                    </div>
                    <div className="invitations-entry">
                        <div className='invitations-content-title'>Invite Guests</div>
                        <div className="invitations-guest-list-section">
                            <div className='invitations-content-title'>Enter Guests</div>
                            <div>
                                <div><div>Name of Guest: </div><input type="text" value={this.props.invitations.invite_name} onChange={(event) => this.props.enterInvites(event.target.value, this.props.invitations.invite_email)}/></div>
                                <div><div>Email: </div><input type='text' value={this.props.invitations.invite_email} onChange={(event) => this.props.enterInvites(this.props.invitations.invite_name, event.target.value)}/></div>
                            </div>

                            <div className='add-to-guest-list-button' onClick={() => this.props.sendInvite(this.props.planning.id, this.props.invitations.invite_name, this.props.invitations.invite_email, this.props.login)}>Send Invite</div>
                        </div>
                        {invitation_set}
                    </div>
                </div>
            );
        } else {
            page_body = invitationResponse;
        }
        return page_body;
    }
}

const InvitationsContainer = ReactRedux.connect(
    state => ({invitations: state.invitations, food: state.food, drinks: state.drinks, map: state.map, login: state.login, planning: state.planning}),
    actions
)(Invitations);

export default InvitationsContainer;
