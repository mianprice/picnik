import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Planning.actions';

class Planning extends React.Component {
  render() {
    return (
        <div>TEST</div>
      );
  }
}

const PlanningContainer = ReactRedux.connect(
  state => ({ state }),
  actions
)(Planning);

export default PlanningContainer;
