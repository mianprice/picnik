import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Home.actions';

class Home extends React.Component {
  render() {
    return (
        <div>HOME TEST</div>
      );
  }
}

const HomeContainer = ReactRedux.connect(
  state => ({ state }),
  actions
)(Home);

export default HomeContainer;
