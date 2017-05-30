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
                <Link className="plan-submit-buttons" to='/invitations'><div onClick={(event) => this.props.savePicnik(this.props.state.planning.recipes, this.props.state.planning.beers, this.props.state.planning.wines, this.props.state.planning.park, this.props.state.planning.date_of, this.props.state.planning.time_of, this.props.state.login)}>Save Your Picnic and Invite Your Friends</div></Link>
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
