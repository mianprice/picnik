import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Signup.actions';

class Signup extends React.Component {
  render() {
    return (
        <div className="signup">SIGNUP TEST
        <div>TASTE
          <div>Spicy
            <button onClick={() => this.props.setTaste('piquant', 0)}>None</button>
            <button onClick={() => this.props.setTaste('piquant', .33)}>Little</button>
            <button onClick={() => this.props.setTaste('piquant', .66)}>Some</button>
            <button onClick={() => this.props.setTaste('piquant', 1)}>Lots</button>
          </div>

          <div>Sweet
            <button onClick={() => this.props.setTaste('sweet', 0)}>None</button>
            <button onClick={() => this.props.setTaste('sweet', .33)}>Little</button>
            <button onClick={() => this.props.setTaste('sweet', .66)}>Some</button>
            <button onClick={() => this.props.setTaste('sweet', 1)}>Lots</button>
          </div>

          <div>Savory
            <button onClick={() => this.props.setTaste('meaty', 0)}>None</button>
            <button onClick={() => this.props.setTaste('meaty', .33)}>Little</button>
            <button onClick={() => this.props.setTaste('meaty', .66)}>Some</button>
            <button onClick={() => this.props.setTaste('meaty', 1)}>Lots</button>
          </div>

          <div>Sour
            <button onClick={() => this.props.setTaste('sour', 0)}>None</button>
            <button onClick={() => this.props.setTaste('sour', .33)}>Little</button>
            <button onClick={() => this.props.setTaste('sour', .66)}>Some</button>
            <button onClick={() => this.props.setTaste('sour', 1)}>Lots</button>
          </div>

          <div>Salty
            <button onClick={() => this.props.setTaste('salty', 0)}>None</button>
            <button onClick={() => this.props.setTaste('salty', .33)}>Little</button>
            <button onClick={() => this.props.setTaste('salty', .66)}>Some</button>
            <button onClick={() => this.props.setTaste('salty', 1)}>Lots</button>
          </div>

          <div>Bitter
            <button onClick={() => this.props.setTaste('bitter', 0)}>None</button>
            <button onClick={() => this.props.setTaste('bitter', .33)}>Little</button>
            <button onClick={() => this.props.setTaste('bitter', .66)}>Some</button>
            <button onClick={() => this.props.setTaste('bitter', 1)}>Lots</button>
          </div>

          <button>Submit</button><button>Skip</button>

        </div>
        <div>Cuisine
          <button onClick={() => this.props.setCuisineAndDrinks('mexican')}>Mexican</button>
          <button onClick={() => this.props.setCuisineAndDrinks('italian')}>Italian</button>
          <button onClick={() => this.props.setCuisineAndDrinks('greek')}>Greek</button>
          <button onClick={() => this.props.setCuisineAndDrinks('hungarian')}>Hungarian</button>
          <button onClick={() => this.props.setCuisineAndDrinks('swedish')}>Swedish</button>
          <button onClick={() => this.props.setCuisineAndDrinks('american')}>American</button>
          <button onClick={() => this.props.setCuisineAndDrinks('japanese')}>Japanese</button>
          <button onClick={() => this.props.setCuisineAndDrinks('chinese')}>Chinese</button>

          <button>Submit</button><button>Skip</button>

        </div>

        <div>Wine
          <button onClick={() => this.props.setCuisineAndDrinks('chardonnay')}>Chardonnay</button>
          <button onClick={() => this.props.setCuisineAndDrinks('cabernet')}>Cabernet</button>
          <button onClick={() => this.props.setCuisineAndDrinks('malbec')}>Malbec</button>
          <button onClick={() => this.props.setCuisineAndDrinks('pinot_noir')}>Pinot Noir</button>
          <button onClick={() => this.props.setCuisineAndDrinks('champagne')}>Champagne</button>
          <button onClick={() => this.props.setCuisineAndDrinks('riesling')}>Riesling</button>
          <button onClick={() => this.props.setCuisineAndDrinks('rose')}>Rose</button>
          <button onClick={() => this.props.setCuisineAndDrinks('barbera')}>Barbera</button>

          <button>Submit</button><button>Skip</button>

        </div>

        <div>Beer
          <button onClick={() => this.props.setCuisineAndDrinks('ipa')}>IPA</button>
          <button onClick={() => this.props.setCuisineAndDrinks('pale_ale')}>Pale Ale</button>
          <button onClick={() => this.props.setCuisineAndDrinks('stout')}>Stout</button>
          <button onClick={() => this.props.setCuisineAndDrinks('doppelbock')}>Doppelbock</button>
          <button onClick={() => this.props.setCuisineAndDrinks('gose')}>Gose</button>
          <button onClick={() => this.props.setCuisineAndDrinks('sour')}>Sour</button>
          <button onClick={() => this.props.setCuisineAndDrinks('tripel')}>Tripel</button>
          <button onClick={() => this.props.setCuisineAndDrinks('lambic')}>Lambic</button>
          <button onClick={() => this.props.setCuisineAndDrinks('porter')}>Porter</button>
          <button onClick={() => this.props.setCuisineAndDrinks('lager')}>Lager</button>

          <button>Submit</button><button>Skip</button>

        </div>

        </div>

      );
  }
}

const SignupContainer = ReactRedux.connect(
  state => ({ state }),
  actions
)(Signup);

export default SignupContainer;
