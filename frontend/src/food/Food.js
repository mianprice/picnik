import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Food.actions';

class Food extends React.Component {
    componentDidMount() {
        //Get Recipes
        // this.props.getRecipe();
        this.props.getTestRecipes();
    }
    render() {
        let match_set = this.props.food.recipe_set.map(item => {
            return (
                <div key={item.id}>
                    <div>
                        {item.recipeName}
                    </div>
                    <img src={item.smallImageUrls[0]} alt={item.recipeName}/>
                    <button onClick={() => this.props.selectRecipe(item.id)}>Select</button>
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
  state => ({ food: state.food }),
  actions
)(Food);

export default FoodContainer;
