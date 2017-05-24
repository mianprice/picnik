let INITIAL_STATE = {
    recipe_set: [],
    search_criteria: {},
    select_recipes: []
};

export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'display-recipe-options') {
        return Object.assign({}, state, {
            recipe_set: action.payload.matches,
            search_criteria: action.payload.criteria
        });
    } else if (action.type === 'select-recipe') {
        let select_recipes_array = state.select_recipes;
        select_recipes_array.push(action.item);
        return Object.assign({}, state, {
            select_recipes: select_recipes_array
        });
    } else {
        return state;
    }
};
