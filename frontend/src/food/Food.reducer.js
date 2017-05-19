let INITIAL_STATE = {
    recipe_set: [],
    search_criteria: {},
    recipe_id: []
};

export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'display-recipe-options') {
        return Object.assign({}, state, {
            recipe_set: action.payload.matches,
            search_criteria: action.payload.criteria
        });
    } else if (action.type === 'select-recipe') {
        let arr = state.recipe_id;
        arr.push(action.recipe_id);
        return Object.assign({}, state, {
            recipe_id: arr
        });
    } else {
        return state;
    }
};
