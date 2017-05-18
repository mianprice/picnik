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
            <div className="plan_info">PLANNING TEST</div>
            <FoodContainer />
            <DrinksContainer />
            <MapContainer />
        </div>
      );
  }
}

const PlanningContainer = ReactRedux.connect(
  state => ({ state }),
  actions
)(Planning);

export default PlanningContainer;
