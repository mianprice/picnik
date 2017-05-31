import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Planning.actions';
import MapContainer from '../map/Map.js';
import DrinksContainer from '../drinks/Drinks.js';
import FoodContainer from '../food/Food.js';
import {Router, Route, hashHistory, Link, IndexLink, IndexRoute} from 'react-router';

class Planning extends React.Component {
  render() {
    return (
        <div className="planning">
            <div className="plan_info">Picnik Planning
                <Link className="plan-submit-buttons" to='/invitations'><div onClick={(event) => this.props.savePicnik(this.props.planning.recipes, this.props.planning.beers, this.props.planning.wines, this.props.planning.park, this.props.planning.date_of, this.props.planning.time_of, this.props.login)}>Save Your Picnic and Invite Your Friends</div></Link>
            </div>
            <div className="planning-page-picnik-tracker">
                <div>Your Picnik</div>
                    <div>Recipes</div>
                        {this.props.planning.recipes.map((recipe, index) => {
                            return <div key={index}>{recipe.name}</div>
                        })}
                    <div>Beers</div>
                        {this.props.planning.beers.map((beer, index) => {
                            return <div key={index}>{beer.beer_name}</div>
                        })}
                    <div>Wines</div>
                        {this.props.planning.wines.map((wine, index) => {
                            return <div key={index}>{wine.name}</div>
                        })}
            </div>
            <MapContainer />
            <FoodContainer />
            <DrinksContainer />
        </div>
      );
  }
}

const PlanningContainer = ReactRedux.connect(
  state => ({ planning: state.planning, login: state.login }),
  actions
)(Planning);

export default PlanningContainer;
