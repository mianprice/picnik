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
            <div className="welcome-section">
                <div>Here at picnik, we give you the tools to create a perfect day out at the park. We handle everything from helping you pick the perfect park, the perfect day, and intelligent food and drink pairing based on the things you like. You can even invite your friends to join you on your day out!</div>
            </div>
        </div>
      );
  }
}

const HomeContainer = ReactRedux.connect(
  state => ({ state }),
  actions
)(Home);

export default HomeContainer;
