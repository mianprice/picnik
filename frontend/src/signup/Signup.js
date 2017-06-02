import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Signup.actions';
import {Router, Route, hashHistory, Link, IndexLink, IndexRoute} from 'react-router';

class Signup extends React.Component {
  render() {
      let taste_profile_array = ["None", "Little", "Some", "Lots"];
      // let wine_profile_array = ["Chardonnay", "Cabernet", "Malbec", "Riesling", "Rose"];
      let beer_profile_array = ["IPA", "Stout", "Wheat", "Pilsner","Saison",  "Belgian", "Sours", "Porter", "Lager"];
      let displayArray = [
          (
              <div className="signup_section">
                  <div className="signup_section_form">
                      <label>Email</label>
                      <div className="signup-text-input"><input type="text" id="email" value={this.props.signup.email} onChange={(event) => {this.props.updateBasicSignup(event.target.id,event.target.value)}}/></div>
                      <label>Username</label>
                      <div className="signup-text-input"><input type="text" id="user_name" value={this.props.signup.username} onChange={(event) => {this.props.updateBasicSignup(event.target.id,event.target.value)}}/></div>
                      <label>Password</label>
                      <div className="signup-text-input"><input type="password" id="password" value={this.props.signup.password} onChange={(event) => {this.props.updateBasicSignup(event.target.id,event.target.value)}}/></div>
                      <label>Confrim Password</label>
                      <div className="signup-text-input"><input type="password" id="password_confirm" value={this.props.signup.password_confirm} onChange={(event) => {this.props.updateBasicSignup(event.target.id,event.target.value)}}/></div>
                      <label>First Name</label>
                      <div className="signup-text-input"><input type="text" id="first_name" value={this.props.signup.first} onChange={(event) => {this.props.updateBasicSignup(event.target.id,event.target.value)}}/></div>
                      <label>Last Name</label>
                      <div className="signup-text-input"><input type="text" id="last_name" value={this.props.signup.last} onChange={(event) => {this.props.updateBasicSignup(event.target.id,event.target.value)}}/></div>
                  </div>
                  <div className="signup_submit_button" onClick={(event) => {this.props.nextSignupSection()}}>Next</div>

              </div>
          ),
          (
                <div className="signup_group">
                    <div className="signup_section">
                        <div className="signup_section_title">Spicy</div>
                            {taste_profile_array.map((item, index) =>
                                <div key={index} className={this.props.signup.taste_profile.piquant === index ? "signup_button_selected signup_profile_button" : "signup_button signup_profile_button"} onClick={() => this.props.setTaste('piquant', index)}>{item}</div>
                            )}
                    </div>
                    <div className="signup_section">
                        <div className="signup_section_title">Sweet</div>
                        {taste_profile_array.map((item, index) =>
                            <div key={index} className={this.props.signup.taste_profile.sweet === index ? "signup_button_selected signup_profile_button" : "signup_button signup_profile_button"} onClick={() => this.props.setTaste('sweet', index)}>{item}</div>
                        )}
                    </div>
                    <div className="signup_section">
                        <div className="signup_section_title">Savory</div>
                        {taste_profile_array.map((item, index) =>
                            <div key={index} className={this.props.signup.taste_profile.meaty === index ? "signup_button_selected signup_profile_button" : "signup_button signup_profile_button"} onClick={() => this.props.setTaste('meaty', index)}>{item}</div>
                        )}
                    </div>
                    <div className="signup_section">
                        <div className="signup_section_title">Sour</div>
                        {taste_profile_array.map((item, index) =>
                            <div key={index} className={this.props.signup.taste_profile.sour_taste === index ? "signup_button_selected signup_profile_button" : "signup_button signup_profile_button"} onClick={() => this.props.setTaste('sour_taste', index)}>{item}</div>
                        )}
                    </div>
                    <div className="signup_section">
                        <div className="signup_section_title">Salty</div>
                        {taste_profile_array.map((item, index) =>
                            <div key={index} className={this.props.signup.taste_profile.salty === index ? "signup_button_selected signup_profile_button" : "signup_button signup_profile_button"} onClick={() => this.props.setTaste('salty', index)}>{item}</div>
                        )}
                    </div>
                    <div className="signup_section">
                        <div className="signup_section_title">Bitter</div>
                        {taste_profile_array.map((item, index) =>
                            <div key={index} className={this.props.signup.taste_profile.bitter === index ? "signup_button_selected signup_profile_button" : "signup_button signup_profile_button"} onClick={() => this.props.setTaste('bitter', index)}>{item}</div>
                        )}
                    </div>
                    <div className="signup_skip_button" onClick={(event) => {this.props.lastSignupSection()}}>Last</div>
                    <div className="signup_submit_button" onClick={(event) => {this.props.nextSignupSection()}}>Next</div>
                </div>
          ),
          (   <div className="signup_section">
              <div className="wine_section">

                <div className="wine_instructions">
                Here we suggest keeping your options open. Sometimes a properly paired wine 			can really change your mind, but if you really don’t like Reds, or can’t stand Sparkling 		wine, we won’t judge, Simply select the wines you don’t want us to show you.
                </div>
                <div className="wine_category">
                  <div className={this.props.signup.wine_profile.dry_whites === false ? " wine_button wine_button_selected" : "wine_button"} onClick={() => this.props.setWine('dry_whites')}>Dry Whites</div>
                  <div className="wine_category_description">Dry, crisp, sometimes tart and usually refreshing, these are among the lightest wines. <br/>
                  ex. Sauvignon Blanc, Albariño, Pinot Grigio, ...
                  </div>
                </div>

                <div className="wine_category">
                  <div className={this.props.signup.wine_profile.sweet_whites === false ? " wine_button wine_button_selected" : "wine_button"} onClick={() => this.props.setWine('sweet_whites')}>Sweet Whites</div>
                  <div className="wine_category_description">
                  Sweet while sweet, these wines are also generally balanced. The natural sugars from the grapes help to balance the higher than average acidity or bitterness present in these wines.
                  examples: Chenin Blanc, Riesling , Torrontés
                  </div>
                </div>

                <div className="wine_category">
                  <div className={this.props.signup.wine_profile.rich_whites === false ? " wine_button wine_button_selected" : "wine_button"} onClick={() => this.props.setWine('rich_whites')}>Rich Whites</div>
                  <div className="wine_category_description">
                  Rich Whites - fuller in body and sometimes oaky, these wines tend to be a bit heavier on the pallet than their Dry counterparts
                  ex. Chardonnay, Sémillon, Viogner, ...
                  </div>
                </div>

                <div className="wine_category">
                  <div className={this.props.signup.wine_profile.light_reds === false ? " wine_button wine_button_selected" : "wine_button"} onClick={() => this.props.setWine('light_reds')}>Light Reds</div>
                  <div className="wine_category_description">
                  Light Reds - Subtle and lighter in body compared to other red wines, lower tannins and bright acidity make these wines very drinkable
                  ex. Pinot Noir, Gamay, Brachetto
                  </div>
                </div>

                <div className="wine_category">
                  <div className={this.props.signup.wine_profile.medium_reds === false ? " wine_button wine_button_selected" : "wine_button"} onClick={() => this.props.setWine('medium_reds')}>Medium Reds</div>
                  <div className="wine_category_description">
                  Medium Reds - medium in body with a broad spectrum of flavor profiles, these are some of the most food friendly wines
                  ex. Merlot, Sangiovese, Barbera, …
                  </div>
                </div>

                <div className="wine_category">
                  <div className={this.props.signup.wine_profile.bold_reds === false ? " wine_button wine_button_selected" : "wine_button"} onClick={() => this.props.setWine('bold_reds')}>Bold Reds</div>
                  <div className="wine_category_description">
                  Bold Reds - High in tannins and bold in flavor, these wines can hold their own when paired with very flavorful dishes
                  ex. Cabernet Sauvignon, Malbec, Syrah, …
                  </div>
                </div>

                <div className="wine_category">
                  <div className={this.props.signup.wine_profile.sparkling === false ? " wine_button wine_button_selected" : "wine_button"} onClick={() => this.props.setWine('sparkling')}>Sparkling</div>
                  <div>
                  Sparkling
                  Ranging from dry to sweet, sparkling wines are good for a variety of occasions and cuisines.

                  ex. cava, champagne, prosecco, …
                  </div>
                </div>
              </div>
              <div className="signup_skip_button" onClick={(event) => {this.props.lastSignupSection()}}>Last</div>
              <div className="signup_submit_button" onClick={(event) => {this.props.nextSignupSection()}}>Next</div>
              </div>

          ),
          (
            <div className="signup_section">
              <div className="beer-signup-section-container">
                  {beer_profile_array.map((item, index) =>
                      <div key={index} className={this.props.signup.beer_profile[item.toLowerCase()] === false ? "signup_button_selected" : "signup_button"} onClick={() => this.props.setBeer(item.toLowerCase())}>{item}</div>
                  )}
                  {/* CAN'T MAP OVER THE BEER BELOW BECAUSE ITS NAME IN THE STATE IS DIFFERENT THAN IT APPEARS IN THE VIEW */}
                <div className={this.props.signup.beer_profile.pale_ale === false ? "signup_button_selected" : "signup_button"} onClick={() => this.props.setBeer('pale_ale')}>Pale Ale</div>

              </div>
              <div className="signup_skip_button" onClick={(event) => {this.props.lastSignupSection()}}>Last</div>
              <div className="signup_submit_button" onClick={(event) => {this.props.completeSignup(this.props.signup); hashHistory.push('/planning')}}>Submit</div>
            </div>
          )
      ];
    return (
        <div className="signup">
            <div className="signup_progress">
                <div className={this.props.signup.current_section > 0 ? "sec_done progress_section" : (this.props.signup.current_section === 0 ? "sec_now progress_section" : "sec_future progress_section")}>Basic Info</div>
                <div className={this.props.signup.current_section > 1 ? "sec_done progress_section" : (this.props.signup.current_section === 1 ? "sec_now progress_section" : "sec_future progress_section")}>Tastes</div>
                <div className={this.props.signup.current_section > 2 ? "sec_done progress_section" : (this.props.signup.current_section === 2 ? "sec_now progress_section" : "sec_future progress_section")}>Wines</div>
                <div className={this.props.signup.current_section > 3 ? "sec_done progress_section" : (this.props.signup.current_section === 3 ? "sec_now progress_section" : "sec_future progress_section")}>Beers</div>
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
