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
                <div className="signup_button" onClick={() => this.props.setCuisine('mexican')}>Mexican</div>
                <div className="signup_button" onClick={() => this.props.setCuisine('italian')}>Italian</div>
                <div className="signup_button" onClick={() => this.props.setCuisine('mediterranean')}>Mediterranean</div>
                <div className="signup_button" onClick={() => this.props.setCuisine('thai')}>Thai</div>
                <div className="signup_button" onClick={() => this.props.setCuisine('barbeque')}>Barbeque</div>
                <div className="signup_button" onClick={() => this.props.setCuisine('american')}>American</div>
                <div className="signup_button" onClick={() => this.props.setCuisine('japanese')}>Japanese</div>
                <div className="signup_button" onClick={() => this.props.setCuisine('chinese')}>Chinese</div>

                <div className="signup_submit_button" onClick={(event) => {this.props.nextSignupSection()}}>Next</div><div className="signup_skip_button" onClick={(event) => {this.props.lastSignupSection()}}>Last</div>

              </div>
          ),
          (
              <div className="signup_section"><div className="signup_section_title">Wine</div>
                <div className="signup_button" onClick={() => this.props.setWine('chardonnay')}>Chardonnay</div>
                <div className="signup_button" onClick={() => this.props.setWine('cabernet')}>Cabernet</div>
                <div className="signup_button" onClick={() => this.props.setWine('malbec')}>Malbec</div>
                <div className="signup_button" onClick={() => this.props.setWine('pinot_noir')}>Pinot Noir</div>
                <div className="signup_button" onClick={() => this.props.setWine('pinot_grigio')}>Pinot Grigio</div>
                <div className="signup_button" onClick={() => this.props.setWine('riesling')}>Riesling</div>
                <div className="signup_button" onClick={() => this.props.setWine('rose')}>Rose</div>
                <div className="signup_button" onClick={() => this.props.setWine('sauvignon_blanc')}>Sauvignon Blanc</div>

                <div className="signup_submit_button" onClick={(event) => {this.props.nextSignupSection()}}>Next</div><div className="signup_skip_button" onClick={(event) => {this.props.lastSignupSection()}}>Last</div>

              </div>
          ),
          (
              <div className="signup_section"><div className="signup_section_title">Beer</div>
                <div className="signup_button" onClick={() => this.props.setBeer('ipa')}>IPA</div>
                <div className="signup_button" onClick={() => this.props.setBeer('pale_ale')}>Pale Ale</div>
                <div className="signup_button" onClick={() => this.props.setBeer('stout')}>Stout</div>
                <div className="signup_button" onClick={() => this.props.setBeer('wheat')}>Wheat</div>
                <div className="signup_button" onClick={() => this.props.setBeer('pilsner')}>Pilsner</div>
                <div className="signup_button" onClick={() => this.props.setBeer('saison')}>Saison</div>
                <div className="signup_button" onClick={() => this.props.setBeer('belgian')}>Belgian</div>
                <div className="signup_button" onClick={() => this.props.setBeer('sours')}>Sours</div>
                <div className="signup_button" onClick={() => this.props.setBeer('porter')}>Porter</div>
                <div className="signup_button" onClick={() => this.props.setBeer('lager')}>Lager</div>

                <div className="signup_submit_button" onClick={(event) => {this.props.completeSignup(this.props.signup)}}>Submit</div><div className="signup_skip_button" onClick={(event) => {this.props.lastSignupSection()}}>Last</div>

              </div>
          )
      ];
    return (
        <div className="signup">
            <div className="signup_progress">
                <div className={this.props.signup.current_section > 0 ? "sec_done progress_section" : (this.props.signup.current_section === 0 ? "sec_now progress_section" : "sec_future progress_section")}>Basic Info</div>
                <div className={this.props.signup.current_section > 1 ? "sec_done progress_section" : (this.props.signup.current_section === 1 ? "sec_now progress_section" : "sec_future progress_section")}>Tastes</div>
                <div className={this.props.signup.current_section > 2 ? "sec_done progress_section" : (this.props.signup.current_section === 2 ? "sec_now progress_section" : "sec_future progress_section")}>Cuisines</div>
                <div className={this.props.signup.current_section > 3 ? "sec_done progress_section" : (this.props.signup.current_section === 3 ? "sec_now progress_section" : "sec_future progress_section")}>Wines</div>
                <div className={this.props.signup.current_section > 4 ? "sec_done progress_section" : (this.props.signup.current_section === 4 ? "sec_now progress_section" : "sec_future progress_section")}>Beers</div>
            </div>
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
