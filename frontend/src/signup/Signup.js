import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Signup.actions';

class Signup extends React.Component {
  render() {
      let taste_profile_array = ["None", "Little", "Some", "Lots"];
      let cuisine_profile_array = [
          "Mexican", "Italian", "Mediterranean", "Thai", "Barbeque", "American", "Japanese", "Chinese"];
      let wine_profile_array = ["Chardonnay", "Cabernet", "Malbec", "Riesling", "Rose"];
      let beer_profile_array = ["IPA", "Stout", "Wheat", "Pilsner","Saison",  "Belgian", "Sours", "Porter", "Lager"];
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
                    <div className="signup_section">
                        <div className="signup_section_title">Spicy</div>
                            {taste_profile_array.map((item, index) =>
                                <div key={index} className={this.props.signup.taste_profile.piquant === index ? "signup_button_selected" : "signup_button"} onClick={() => this.props.setTaste('piquant', index)}>{item}</div>
                            )}
                    </div>
                    <div className="signup_section"><div className="signup_section_title">Sweet</div>
                        {taste_profile_array.map((item, index) =>
                            <div key={index} className={this.props.signup.taste_profile.sweet === index ? "signup_button_selected" : "signup_button"} onClick={() => this.props.setTaste('sweet', index)}>{item}</div>
                        )}
                    </div>
                    <div className="signup_section"><div className="signup_section_title">Savory</div>
                        {taste_profile_array.map((item, index) =>
                            <div key={index} className={this.props.signup.taste_profile.meaty === index ? "signup_button_selected" : "signup_button"} onClick={() => this.props.setTaste('meaty', index)}>{item}</div>
                        )}
                    </div>
                    <div className="signup_section">
                        <div className="signup_section_title">Sour</div>
                            {taste_profile_array.map((item, index) =>
                                <div key={index} className={this.props.signup.taste_profile.sour_taste === index ? "signup_button_selected" : "signup_button"} onClick={() => this.props.setTaste('sour_taste', index)}>{item}</div>
                            )}
                        </div>
                    <div className="signup_section"><div className="signup_section_title">Salty</div>
                        {taste_profile_array.map((item, index) =>
                            <div key={index} className={this.props.signup.taste_profile.salty === index ? "signup_button_selected" : "signup_button"} onClick={() => this.props.setTaste('salty', index)}>{item}</div>
                        )}
                    </div>
                    <div className="signup_section"><div className="signup_section_title">Bitter</div>
                        {taste_profile_array.map((item, index) =>
                            <div key={index} className={this.props.signup.taste_profile.bitter === index ? "signup_button_selected" : "signup_button"} onClick={() => this.props.setTaste('bitter', index)}>{item}</div>
                        )}
                    </div>
                </div>
                <div className="signup_submit_button" onClick={(event) => {this.props.nextSignupSection()}}>Next</div>
                <div className="signup_skip_button" onClick={(event) => {this.props.lastSignupSection()}}>Last</div>

              </div>
          ),
          (
              <div className="signup_section">
                  <div className="signup_section_title">Cuisine</div>
                      {cuisine_profile_array.map((item, index) =>
                          <div key={index} className={this.props.signup.cuisine_profile[item.toLowerCase()] === false ? "signup_button_selected" : "signup_button"} onClick={() => this.props.setCuisine(item.toLowerCase())}>{item}</div>
                      )}

                    <div className="signup_submit_button" onClick={(event) => {this.props.nextSignupSection()}}>Next</div>
                    <div className="signup_skip_button" onClick={(event) => {this.props.lastSignupSection()}}>Last</div>

              </div>
          ),
          (
              <div className="signup_section"><div className="signup_section_title">Wine</div>
                  {wine_profile_array.map((item, index) =>
                      <div key={index} className={this.props.signup.wine_profile[item.toLowerCase()] === false ? "signup_button_selected" : "signup_button"} onClick={() => this.props.setWine(item.toLowerCase())}>{item}</div>
                  )}
                  {/* CAN'T MAP OVER THE WINES BELOW BECAUSE THEIR NAMES IN THE STATE ARE DIFFERENT THAN THEY APPEAR IN THE VIEW */}
                <div className={this.props.signup.wine_profile.pinot_noir === false ? "signup_button_selected" : "signup_button"} onClick={() => this.props.setWine('pinot_noir')}>Pinot Noir</div>
                <div className={this.props.signup.wine_profile.pinot_grigio === false ? "signup_button_selected" : "signup_button"} onClick={() => this.props.setWine('pinot_grigio')}>Pinot Grigio</div>
                <div className={this.props.signup.wine_profile.sauvignon_blanc === false ? "signup_button_selected" : "signup_button"} onClick={() => this.props.setWine('sauvignon_blanc')}>Sauvignon Blanc</div>

                <div className="signup_submit_button" onClick={(event) => {this.props.nextSignupSection()}}>Next</div><div className="signup_skip_button" onClick={(event) => {this.props.lastSignupSection()}}>Last</div>

              </div>
          ),
          (
              <div className="signup_section"><div className="signup_section_title">Beer</div>
                  {beer_profile_array.map((item, index) =>
                      <div key={index} className={this.props.signup.beer_profile[item.toLowerCase()] === false ? "signup_button_selected" : "signup_button"} onClick={() => this.props.setBeer(item.toLowerCase())}>{item}</div>
                  )}
                  {/* CAN'T MAP OVER THE BEER BELOW BECAUSE ITS NAME IN THE STATE IS DIFFERENT THAN IT APPEARS IN THE VIEW */}
                <div className={this.props.signup.beer_profile.pale_ale === false ? "signup_button_selected" : "signup_button"} onClick={() => this.props.setBeer('pale_ale')}>Pale Ale</div>

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
