import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Food.actions';
import checked from './checked.png'; //check mark image
import basket from './basket.png'; //basket image

class Food extends React.Component {
    componentDidMount() {
        this.props.getRecipes(this.props.signup.taste_profile, this.props.signup.cuisine_profile);
    }
    render() {
        let match_set = this.props.food.recipe_set.map(item => {
            return (
                <div key={item.id}>
                    <div>
                        {item.name}
                    </div>
                    <img src={item.image_url} alt={item.name}/>
                    <div className="recipe-buttons" onClick={() => {this.props.selectRecipe(item); this.props.beerPairingMegaFunction(this.props.signup.beer_profile, item);this.props.getWines();}}>Select</div>
                    <div className="recipe-buttons" onClick={() => this.props.saveForLater(item.recipe_id, this.props.login.user_id)}>Save for later</div>
                    <a href={"http://www.yummly.co/recipe/" + item.yummly_id} target="_blank"><div className="recipe-buttons">View Recipe</div></a>
                    <div className="check_mark"><i className={item.class} alt="check mark"/></div>
                </div>
            );
        });
        return (
            <div className="plan_part">
            {match_set}
            </div>
        );
    }
}

const FoodContainer = ReactRedux.connect(
  state => ({ food: state.food, signup: state.signup, login: state.login }),
  actions
)(Food);

export default FoodContainer;
