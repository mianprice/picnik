let INITIAL_STATE = {
    recipe_set: [],
    search_criteria: {},
    select_recipes: []
};

export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'display-recipe-options') {
        return Object.assign({}, state, {
            recipe_set: action.payload
        });
    } else if (action.type === 'display-more-recipe-options') {
        let temp_state = Object.assign({}, state);
        let temp_recipe_set = temp_state.recipe_set.concat(action.payload);
        temp_state.recipe_set = temp_recipe_set;
        return Object.assign(temp_state);
    } else if (action.type === "remove-recipe") {
        let temp_state = Object.assign({}, state);
        temp_state.recipe_set.unshift(action.recipe);
        return Object.assign(temp_state);
    }  else if (action.type === 'select-recipe') {
        let temp_state = Object.assign({}, state);
        let recipes_filtered = temp_state.recipe_set.filter(recipe => {
            return recipe.recipe_id !== action.recipe.recipe_id;
        });
        temp_state.recipe_set = recipes_filtered;
        return Object.assign(temp_state);
    } else if (action.type === 'logout') {
        return INITIAL_STATE;
    } else if (action.type === "login-complete") {
        return {
            recipe_set: [],
            search_criteria: {},
            select_recipes: []
        };
    }
    return state;
};
