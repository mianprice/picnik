import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Planning.actions';
import MapContainer from '../map/Map.js';
import DrinksContainer from '../drinks/Drinks.js';
import FoodContainer from '../food/Food.js';
import {Router, Route, hashHistory, Link, IndexLink, IndexRoute} from 'react-router';

class Planning extends React.Component {
  render() {
      let currentContainer;
      if (this.props.planning.currentPage === 'food') {
          currentContainer = <FoodContainer />;
      } else if (this.props.planning.currentPage === 'map') {
          currentContainer = <MapContainer />;
      } else {
          currentContainer = <DrinksContainer />;
      }
      let currentBasket;
      if (this.props.planning.currentBasket === 'recipes') {
          currentBasket = (<div className="recipe-choices">
              {this.props.planning.recipes.map((recipe, index) => {
                  return <div key={index}>
                            <div className="choice" >{recipe.name}</div>
                            <div className='drink-buttons' onClick={() => {this.props.beerPairingMegaFunction(this.props.signup,recipe); this.props.winePairingMegaFunction(this.props.signup, recipe)}}>View Pairing Options</div>
                            <div className='drink-buttons' onClick={() => this.props.removeRecipe(recipe)}>Remove from Picnik Basket</div>
                        </div>
              })}
          </div>);
      } else if (this.props.planning.currentBasket === 'beers') {
          currentBasket = (<div className="beer-choices">
              {this.props.planning.beers.map((beer, index) => {
                  return <div className="choice" key={index}>
                              {beer.beer_name}
                              <div className="drink-buttons" onClick={() => {this.props.removeBeer(beer)}}>Remove from Picnik</div>
                          </div>
              })}
          </div>);
      } else if (this.props.planning.currentBasket === 'wines') {
          currentBasket = (<div className="wine-choices">
              {this.props.planning.wines.map((wine, index) => {
                  return <div className="choice" key={index}>
                                {wine.name}
                                <div className="drink-buttons" onClick={() => {this.props.removeWine(wine)}}>Remove from Picnik</div>
                        </div>
              })}
          </div>);
      } else {
          currentBasket = (<div className="choice park-choice">
              <div>{(this.props.planning.park && this.props.planning.park.name) || "No choice made yet."}</div>
          </div>);
      }
    return (
        <div className="planning">
            <div className="picnik-planner-container">
                <div className="planning-page-picnik-chooser">
                    <div className={this.props.planning.currentPage !== 'food' ? "planning-container-tab" : "planning-container-tab planning-container-tab-active"} onClick={event => this.props.changePage('food')}>
                        <div>
                            Food
                        </div>
                    </div>
                    <div className={this.props.planning.currentPage !== 'drinks' ? "planning-container-tab" : "planning-container-tab planning-container-tab-active"} onClick={event => this.props.changePage('drinks')}>
                        <div>
                            Drinks
                        </div>
                    </div>
                    <div className={this.props.planning.currentPage !== 'map' ? "planning-container-tab" : "planning-container-tab planning-container-tab-active"} onClick={event => this.props.changePage('map')}>
                        <div>
                            Parks & Weather
                        </div>
                    </div>
                    <div className="current-planning-container">
                        {currentContainer}
                    </div>
                </div>
                <div className="planning-page-picnik-tracker">
                        <div className="current-picnik-basket-title">
                            <div>Picnik Basket</div>
                        </div>
                        <div className="current-picnik-basket">
                            <div className="basket-choice-types">
                                <div className="choice-type" onClick={event => this.props.changeBasket('recipes')}><div>Recipes</div></div>
                                <div className="choice-type" onClick={event => this.props.changeBasket('beers')}><div>Beers</div></div>
                                <div className="choice-type" onClick={event => this.props.changeBasket('wines')}><div>Wines</div></div>
                                <div className="choice-type" onClick={event => this.props.changeBasket('map')}><div>Park</div></div>
                            </div>
                            <div className="basket-choices">
                                {currentBasket}
                            </div>
                        </div>
                        <div className="save-picnik-buttons-container">
                            <div className="save-picnik-button">
                                <Link className="plan-submit-buttons" to='/invitations'><div onClick={(event) => this.props.savePicnik(this.props.planning.recipes, this.props.planning.beers, this.props.planning.wines, this.props.planning.park, this.props.planning.date_of, this.props.planning.time_of, this.props.login)}>Save Your Picnik for Later</div></Link>
                            </div>
                            <div className="save-picnik-button">
                                <Link className="plan-submit-buttons" to='/invitations'><div onClick={(event) => this.props.savePicnik(this.props.planning.recipes, this.props.planning.beers, this.props.planning.wines, this.props.planning.park, this.props.planning.date_of, this.props.planning.time_of, this.props.login)}>Save Your Picnik and Invite Your Friends</div></Link>
                            </div>
                        </div>
                </div>
            </div>
        </div>
      );
  }
}

const PlanningContainer = ReactRedux.connect(
  state => ({ planning: state.planning, login: state.login, drinks: state.drinks, signup: state.signup }),
  actions
)(Planning);

export default PlanningContainer;
