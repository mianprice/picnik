import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Food.actions';

class Food extends React.Component {
  render() {
    return (
        <div>Food TEST</div>
      );
  }
}

const FoodContainer = ReactRedux.connect(
  state => ({ state }),
  actions
)(Food);

export default FoodContainer;
