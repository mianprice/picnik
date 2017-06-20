import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Responses.actions';

class Responses extends React.Component {
    render() {
        let picnik = this.props.planning;
        return (
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
            </div>
        );
    }
}

const ResponsesContainer = ReactRedux.connect(
    state => ({invitations: state.invitations, food: state.food, drinks: state.drinks, map: state.map, login: state.login, planning: state.planning}),
    actions
)(Responses);

export default ResponsesContainer;
