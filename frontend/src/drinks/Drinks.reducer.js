let INITIAL_STATE = {
    beer_set: [],
    beer_search_criteria: {},
    wine_set: [],
    wine_search_criteria: {}
};

export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'display-beer-options') {
        return Object.assign({}, state, {
            beer_set: action.payload
        });
    } else if (action.type === 'display-wine-options') {
        return Object.assign({}, state, {
            wine_set: action.payload
        });
    } else {
        return state;
    }
};
