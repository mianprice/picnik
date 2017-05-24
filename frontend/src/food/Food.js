import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Food.actions';
import checked from './checked.png'; //check mark image
import basket from './basket.png'; //basket image

class Food extends React.Component {
    componentDidMount() {
        //Get Recipes
        // this.props.getRecipe();
        this.props.getTestRecipes(this.props.signup.taste_profile, this.props.signup.cuisine_profile);
    }
    render() {
        let match_set = this.props.food.recipe_set.map(item => {
            return (
                <div key={item.id}>
                    <div>
                        {item.recipeName}
                    </div>
                    <img src={item.smallImageUrls[0]} alt={item.recipeName}/>
                    <div className="recipe-buttons" onClick={() => {this.props.selectRecipe(item); this.props.beerPairingMegaFunction(this.props.signup.beer_profile, item)}}>Select</div>
                    <a href={"http://www.yummly.co/recipe/" + item.id} target="_blank"><div className="recipe-buttons">View Recipe</div></a>
                    <div className="check_mark"><img className="check_mark" src={item.class === "recipe user-preferred-recipe" ? checked : null}/></div>
                    <div className="check_mark"><img className="check_mark" src={item.cuisine_class === "cuisine-matched-recipe" ? basket : null}/></div>
                </div>
            );
        });
        return (
            <div className="plan_part">
            Food
            {match_set}
            </div>
        );
    }
}

const FoodContainer = ReactRedux.connect(
  state => ({ food: state.food, signup: state.signup }),
  actions
)(Food);

export default FoodContainer;
