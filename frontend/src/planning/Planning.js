import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Planning.actions';
import MapContainer from '../map/Map.js';
import DrinksContainer from '../drinks/Drinks.js';
import FoodContainer from '../food/Food.js';

class Planning extends React.Component {
  render() {
    return (
        <div className="planning">
            <div className="plan_info">Picnik Planning
                <div className="plan-submit-buttons" onClick={(event) => this.props.savePicnik(this.props.state.food.select_recipes, this.props.state.drinks.beer_id, this.props.state.drinks.wine_id, [], this.props.state.login)}>Save Your Picnic</div>
            </div>
            <MapContainer />
            <FoodContainer />
            <DrinksContainer />
        </div>
      );
  }
}

const PlanningContainer = ReactRedux.connect(
  state => ({ state }),
  actions
)(Planning);

export default PlanningContainer;
