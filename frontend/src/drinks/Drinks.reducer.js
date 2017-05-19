let INITIAL_STATE = {
    beer_set: [],
    beer_search_criteria: {},
    beer_id: [],
    wine_set: [],
    wine_search_criteria: {},
    wine_id: [],
};

export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'display-beer-options') {
        return Object.assign({}, state, {
            beer_set: action.payload.data
            /*search_criteria: action.payload.criteria*/
        });
    } else if (action.type === 'select-beer') {
        let arr = state.beer_id;
        arr.push(action.beer_id);
        return Object.assign({}, state, {
            beer_id: arr
        });
    } else if (action.type === 'display-wine-options') {
        return Object.assign({}, state, {
            wine_set: action.payload.wines
            /*search_criteria: action.payload.criteria*/
        });
    } else if (action.type === 'select-wine') {
        let arr = state.wine_id;
        arr.push(action.wine_id);
        return Object.assign({}, state, {
            wine_id: arr
        });
    } else {
        return state;
    }
};
