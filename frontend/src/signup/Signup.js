import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Signup.actions';

class Signup extends React.Component {
  render() {
      let displayArray = [
          (
              <div className="signup_section">
                  <div className="signup_section_title">Basic Info</div>
                  <div>Email: <input type="text" id="email" value={this.props.signup.email} onChange={(event) => {this.props.updateBasicSignup(event.target.id,event.target.value)}}/></div>
                  <div>Username: <input type="text" id="user_name" value={this.props.signup.username} onChange={(event) => {this.props.updateBasicSignup(event.target.id,event.target.value)}}/></div>
                  <div>Password: <input type="text" id="password" value={this.props.signup.password} onChange={(event) => {this.props.updateBasicSignup(event.target.id,event.target.value)}}/></div>
                  <div>Confirm Password: <input type="text" id="password_confirm" value={this.props.signup.password_confirm} onChange={(event) => {this.props.updateBasicSignup(event.target.id,event.target.value)}}/></div>
                  <div>First Name: <input type="text" id="first_name" value={this.props.signup.first} onChange={(event) => {this.props.updateBasicSignup(event.target.id,event.target.value)}}/></div>
                  <div>Last Name: <input type="text" id="last_name" value={this.props.signup.last} onChange={(event) => {this.props.updateBasicSignup(event.target.id,event.target.value)}}/></div>
                  <div>Are you over the age of 21?
                      <div className="signup_button" onClick={() => this.props.updateBasicSignup('of_age', true)}>Yes</div>
                      <div className="signup_button" onClick={() => this.props.updateBasicSignup('of_age', false)}>No</div>
                  </div>
                  <div className="signup_submit_button" onClick={(event) => {this.props.nextSignupSection()}}>Next</div>

              </div>
          ),
          (
              <div className="signup_section"><div className="signup_section_title">TASTE</div>
                <div className="signup_group">
                    <div className="signup_section"><div className="signup_section_title">Spicy</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('piquant', 0)}>None</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('piquant', 1)}>Little</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('piquant', 2)}>Some</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('piquant', 3)}>Lots</div>
                    </div>

                    <div className="signup_section"><div className="signup_section_title">Sweet</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('sweet', 0)}>None</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('sweet', 1)}>Little</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('sweet', 2)}>Some</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('sweet', 3)}>Lots</div>
                    </div>

                    <div className="signup_section"><div className="signup_section_title">Savory</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('meaty', 0)}>None</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('meaty', 1)}>Little</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('meaty', 2)}>Some</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('meaty', 3)}>Lots</div>
                    </div>

                    <div className="signup_section"><div className="signup_section_title">Sour</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('sour_taste', 0)}>None</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('sour_taste', 1)}>Little</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('sour_taste', 2)}>Some</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('sour_taste', 3)}>Lots</div>
                    </div>

                    <div className="signup_section"><div className="signup_section_title">Salty</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('salty', 0)}>None</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('salty', 1)}>Little</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('salty', 2)}>Some</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('salty', 3)}>Lots</div>
                    </div>

                    <div className="signup_section"><div className="signup_section_title">Bitter</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('bitter', 0)}>None</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('bitter', 1)}>Little</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('bitter', 2)}>Some</div>
                      <div className="signup_button" onClick={() => this.props.setTaste('bitter', 3)}>Lots</div>
                    </div>
                </div>
                <div className="signup_submit_button" onClick={(event) => {this.props.nextSignupSection()}}>Next</div><div className="signup_skip_button" onClick={(event) => {this.props.lastSignupSection()}}>Last</div>

              </div>
          ),
          (
              <div className="signup_section"><div className="signup_section_title">Cuisine</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('mexican')}>Mexican</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('italian')}>Italian</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('greek')}>Greek</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('hungarian')}>Hungarian</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('swedish')}>Swedish</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('american')}>American</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('japanese')}>Japanese</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('chinese')}>Chinese</div>

                <div className="signup_submit_button" onClick={(event) => {this.props.nextSignupSection()}}>Next</div><div className="signup_skip_button" onClick={(event) => {this.props.lastSignupSection()}}>Last</div>

              </div>
          ),
          (
              <div className="signup_section"><div className="signup_section_title">Wine</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('chardonnay')}>Chardonnay</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('cabernet')}>Cabernet</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('malbec')}>Malbec</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('pinot_noir')}>Pinot Noir</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('champagne')}>Champagne</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('riesling')}>Riesling</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('rose')}>Rose</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('barbera')}>Barbera</div>

                <div className="signup_submit_button" onClick={(event) => {this.props.nextSignupSection()}}>Next</div><div className="signup_skip_button" onClick={(event) => {this.props.lastSignupSection()}}>Last</div>

              </div>
          ),
          (
              <div className="signup_section"><div className="signup_section_title">Beer</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('ipa')}>IPA</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('pale_ale')}>Pale Ale</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('stout')}>Stout</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('doppelbock')}>Doppelbock</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('gose')}>Gose</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('sour')}>Sour</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('tripel')}>Tripel</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('lambic')}>Lambic</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('porter')}>Porter</div>
                <div className="signup_button" onClick={() => this.props.setCuisineAndDrinks('lager')}>Lager</div>

                <div className="signup_submit_button" onClick={(event) => {this.props.completeSignup(this.props.signup)}}>Submit</div><div className="signup_skip_button" onClick={(event) => {this.props.lastSignupSection()}}>Last</div>

              </div>
          )
      ];
    return (
        <div className="signup">
            {displayArray[this.props.signup.current_section]}
        </div>
      );
  }
}

const SignupContainer = ReactRedux.connect(
  state => ({ signup: state.signup }),
  actions
)(Signup);

export default SignupContainer;
