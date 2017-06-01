import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Home.actions';
import picnik_background from '../../public/picnik-color.jpg';

class Home extends React.Component {
  render() {
    let home_style = {
        backgroundImage: `url(${picnik_background})`,
        height: "90vh",
        width: "100vw",
        backgroundPosition: "center",
        backgroundContain: "cover",
        backgroundRepeat: "no-repeat"
    };
    return (
        <div className="home" style={home_style}>

        </div>
      );
  }
}

const HomeContainer = ReactRedux.connect(
  state => ({ state }),
  actions
)(Home);

export default HomeContainer;
