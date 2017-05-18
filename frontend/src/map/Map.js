import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Map.actions';

class Map extends React.Component {
  render() {
    return (
        <div>TEST</div>
      );
  }
}

const MapContainer = ReactRedux.connect(
  state => ({ state }),
  actions
)(Map);

export default MapContainer;
