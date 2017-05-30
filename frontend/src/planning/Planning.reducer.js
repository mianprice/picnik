let INITIAL_STATE = {
    id: 0,
    date_of: "",
    time_of: "",
    park: {},
    recipes: [],
    beers: [],
    wines: []
};

export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'add-picnik-id') {
        return Object.assign({}, state, {
            id: action.id
        });
    } else if (action.type === "load-saved-picnik") {
        let p = action.picnik;
        return Object.assign({}, state, {
            id: p.picnik_id,
            date_of: p.date_of,
            time_of: p.time_of,
            park: p.park,
            recipes: p.recipes,
            beers: p.beers,
            wines: p.wines
        });
    } else if (action.type === "select-beer") {
        let b = state.beers;
        b.push(action.beer);
        return Object.assign({}, state, {
            beers: b
        });
    } else if (action.type === "select-wine") {
        let w = state.wines;
        w.push(action.wine);
        return Object.assign({}, state, {
            wines: w
        });
    } else if (action.type === "select-recipe") {
        let r = state.recipes;
        r.push(action.recipe);
        return Object.assign({}, state, {
            recipes: r
        });
    } else if (action.type === "select-park") {
        return Object.assign({}, state, {
            park: action.park
        });
    } else if (action.type === "select-date") {
        return Object.assign({}, state, {
            date_of: action.date_of
        });
    } else if (action.type === "select-time") {
        return Object.assign({}, state, {
            time_of: action.time_of
        });
    }
    return state;
};
