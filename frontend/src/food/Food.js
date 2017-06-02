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
                        <div className="recipe-image">
                            <img src={item.image_url} alt={item.name}/>
                        </div>
                    <div className="recipe-title">
                        <div>{item.name}</div>
                        <div className={item.class}>
                            <div alt="food pairing match box">{item.class.includes("user-preferred-recipe-good") ? "A decent match." : item.class.includes("user-preferred-recipe-great") ? "A pretty good match." : item.class.includes("user-preferred-recipe-excellent") ? "This one's a perfect match." : ""}
                            </div>
                        </div>
                    </div>
                        <div className="recipe-cuisines-container">
                            Cuisine: <br/><br/>{item.cuisines.map((cuisines, index) => {
                                return <div key={index} className="recipe-cuisines">
                                             {cuisines.name}
                                        </div>
                            })}
                        </div>
                    <div className="recipe-ingredients">
                        Ingredients: {item.ingredients.map(item => {
                            return item.name + ", ";
                        })}
                    </div>
                    <div className="picnik-chooser-recipe-buttons">
                        {recipe_set.includes(item.recipe_id) ?
                        <div className="recipe-buttons" onClick={() => {this.props.removeRecipe(item)}}>Remove from Basket</div>
                        :
                        <div><div className="recipe-buttons" onClick={() => this.props.selectRecipe(item)}>Add to Basket</div></div>}

                        <a href={"http://www.yummly.co/recipe/" + item.yummly_id} target="_blank"><div className="recipe-buttons">View Recipe</div></a>
                    </div>
                </div>
            );
        });
        return (
            <div className="plan_part">
            {match_set}
            <div className="load-more-buttons" onClick={() => this.props.getMoreRecipes(this.props.signup.taste_profile, this.props.signup.cuisine_profile)}>Load More Recipes</div>
            </div>
        );
    }
}

const FoodContainer = ReactRedux.connect(
  state => ({ food: state.food, signup: state.signup, login: state.login, planning: state.planning }),
  actions
)(Food);

export default FoodContainer;
