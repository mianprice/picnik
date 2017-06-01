import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Food.actions';

class Food extends React.Component {
    componentDidMount() {
        this.props.getRecipes(this.props.signup.taste_profile, this.props.signup.cuisine_profile);
    }
    render() {
        let recipe_set = this.props.planning.recipes.map(recipe => {
            return recipe.recipe_id;
        });
        let match_set = this.props.food.recipe_set.map((item, index) => {
            return (
                <div className="recipe" key={index}>
                    <div>
                        {item.name}
                        {item.cuisines.map(cuisines => {
                            return cuisines.name;
                        })}
                    </div>
                    <img src={item.image_url} alt={item.name}/>
                    {item.ingredients.map(item => {
                        return item.name;
                    })}
                    {recipe_set.includes(item.recipe_id) ?
                    <div className="recipe-buttons" onClick={() => {this.props.removeRecipe(item)}}>Remove from Picnik</div>
                    :
                    <div className="recipe-buttons" onClick={() => this.props.selectRecipe(item)}>Add to My Picnik</div>}

                    <a href={"http://www.yummly.co/recipe/" + item.yummly_id} target="_blank"><div className="recipe-buttons">View Recipe</div></a>
                    <div className={item.class}><div alt="food pairing match box"/>{item.class.includes("user-preferred-recipe-good") ? "Good Match" : item.class.includes("user-preferred-recipe-great") ? "Great Match" : item.class.includes("user-preferred-recipe-excellent") ? "Excellent Match" : ""}</div>
                </div>
            );
        });
        return (
            <div className="plan_part">
            {match_set}
            <div className="drink-buttons" onClick={() => this.props.getMoreRecipes(this.props.signup.taste_profile, this.props.signup.cuisine_profile)}>Load More Recipes</div>
            </div>
        );
    }
}

const FoodContainer = ReactRedux.connect(
  state => ({ food: state.food, signup: state.signup, login: state.login, planning: state.planning }),
  actions
)(Food);

export default FoodContainer;
