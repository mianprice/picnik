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
    } else if (action.type === 'display-more-beer-options') {
        let temp_state = Object.assign({}, state);
        let temp_beer_set = temp_state.beer_set.concat(action.payload);
        temp_state.beer_set = temp_beer_set;
        return Object.assign(temp_state);
    } else if (action.type === 'display-wine-options') {
        return Object.assign({}, state, {
            wine_set: action.payload
        });
    } else if (action.type === 'display-more-wine-options') {
        let temp_state = Object.assign({}, state);
        let temp_wine_set = temp_state.wine_set.concat(action.payload);
        temp_state.wine_set = temp_wine_set;
        return Object.assign(temp_state);
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
    }  else if (action.type === 'select-wine') {
        let temp_state = Object.assign({}, state);
        let wines_filtered = temp_state.wine_set.filter(wine => {
            return wine.wine_id !== action.wine.wine_id;
        });
        temp_state.wine_set = wines_filtered;
        return Object.assign(temp_state);
    } else if (action.type === "remove-wine") {
        let temp_state = Object.assign({}, state);
        temp_state.wine_set.unshift(action.wine);
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
