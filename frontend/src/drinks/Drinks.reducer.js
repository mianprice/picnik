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
    } else if (action.type === 'logout') {
        return Object.assign(INITIAL_STATE);
    } else if (action.type === 'select-beer') {
        let temp_state = Object.assign({}, state);
        let beers_filtered = temp_state.beer_set.filter(beer => {
            return beer.beer_id !== action.beer.beer_id;
        });
        temp_state.beer_set = beers_filtered;
        return Object.assign(temp_state);
    } else if (action.type === "remove-beer") {
        let temp_state = Object.assign({}, state);
        temp_state.beer_set.unshift(action.beer);
        return Object.assign(temp_state);
    } else if (action.type === "login-complete") {
        return {
            beer_set: [],
            beer_search_criteria: {},
            wine_set: [],
            wine_search_criteria: {}
        };
    } else {
    return state;
    }
};
