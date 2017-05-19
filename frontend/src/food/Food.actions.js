import $ from 'jquery';
import testResponse from './recipes.js';

const displayRecipes = (results) => {
    return {type: 'display-recipe-options', payload: results};
};

export const getRecipe = (search_params) => {
    let asyncAction = function(dispatch) {
        $.ajax({
            url: "http://api.yummly.com/v1/api/recipes?_app_id=cf10df74&_app_key=46a91a122338f6df55213530c127f027&maxResult=100",
            method: "GET",
            dataType: 'JSON'
        })
        .then((results) => dispatch(displayRecipes(results)))
        .catch(error =>  {throw error});
    };
    return asyncAction;
};

export const getTestRecipes = () => {
    let asyncAction = function(dispatch) {
        dispatch(displayRecipes(testResponse.testResponse));
    };
    return asyncAction;
}

export const selectRecipe = (recipe_id) => {
    return {type: 'select-recipe', recipe_id};
};
