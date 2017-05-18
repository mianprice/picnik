import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Drinks.actions';

class Drinks extends React.Component {
  render() {
    return (
        <div>TEST</div>
      );
  }
}

const DrinksContainer = ReactRedux.connect(
  state => ({ state }),
  actions
)(Drinks);

export default DrinksContainer;
