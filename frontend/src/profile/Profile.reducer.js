let INITIAL_STATE = {
    saved_picniks: [],
    saved_parks: [],
    saved_recipes: [],
    saved_beers: [],
    saved_wines: [],
    id: 0
};

export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'display-picniks') {
        console.log(action.payload);
        return Object.assign({}, state, {
            saved_picniks: action.payload
        });
    } else if (action.type === 'load-saved-beers-to-profile') {
        return Object.assign({}, state, {
            saved_beers: action.payload
        });
    } else if (action.type === 'load-saved-wines-to-profile') {
        return Object.assign({}, state, {
            saved_wines: action.payload
        });
    } else if (action.type === 'load-saved-recipes-to-profile') {
        return Object.assign({}, state, {
            saved_recipes: action.payload
        });
    } else if (action.type === 'logout') {
        return INITIAL_STATE;
    }
    return state;
};
