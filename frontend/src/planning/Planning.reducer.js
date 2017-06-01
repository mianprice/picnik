let INITIAL_STATE = {
    id: 0,
    date_of: "",
    time_of: "",
    park: {},
    recipes: [],
    beers: [],
    wines: [],
    currentPage: 'food',
    currentBasket: 'food'
};

export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'add-picnik-id') {
        return Object.assign({}, state, {
            id: action.id
        });
    } /*else if (action.type === "load-saved-picnik") {
        let p = action.picnik;
        return Object.assign({}, state, {
            id: p.picnik_id,
            date_of: p.date_of,
            time_of: p.time_of,
            park: p.park,
            recipes: p.recipes,
            beers: p.beers[0],
            wines: p.wines[0]
        });
    } */else if (action.type === "select-beer") {
        let temp_state = Object.assign({}, state);
        temp_state.beers.push(action.beer);
        return Object.assign(temp_state);
    } else if (action.type === "select-wine") {
        let temp_state = Object.assign({}, state);
        temp_state.wines.push(action.wine);
        return Object.assign(temp_state);
    } else if (action.type === "select-recipe") {
        let r = state.recipes;
        r.push(action.recipe);
        return Object.assign({}, state, {
            recipes: r
        });
    } else if (action.type === "select-park") {
        return Object.assign({}, state, {
            park: action.park,
            message: action.message
        });
    } else if (action.type === 'remove-park') {
        return Object.assign({}, state, {
            park: {}
        });
    } else if (action.type === "select-day") {
        return Object.assign({}, state, {
            date_of: action.day
        });
    } else if (action.type === "select-time") {
        return Object.assign({}, state, {
            time_of: action.time
        });
    } else if (action.type === "remove-recipe") {
        let temp_state = Object.assign({}, state);
        let recipes_filtered = temp_state.recipes.filter(recipe => {
            return recipe.recipe_id !== action.recipe.recipe_id;
        });
        temp_state.recipes = recipes_filtered;
        return Object.assign(temp_state);
    } else if (action.type === "remove-beer") {
        let temp_state = Object.assign({}, state);
        let beers_filtered = temp_state.beers.filter(beer => {
            return beer.beer_id !== action.beer.beer_id;
        });
        temp_state.beers = beers_filtered;
        return Object.assign(temp_state);
    } else if (action.type === "remove-wine") {
        let temp_state = Object.assign({}, state);
        let wines_filtered = temp_state.wines.filter(wine => {
            return wine.wine_id !== action.wine.wine_id;
        });
        temp_state.wines = wines_filtered;
        return Object.assign(temp_state);
    } else if (action.type === 'load-picnik-to-planning') {
        // console.log(action.picnik,action.picnik.park, action.picnik.park[0]);
        let park = action.picnik.park[0];
        let recipes = [].concat.apply([], action.picnik.recipes);
        let wines = [].concat.apply([], action.picnik.wines);
        let beers = [].concat.apply([], action.picnik.beers);
        let date_of = action.picnik.date_of;
        let time_of = action.picnik.time_of;
        return Object.assign({}, state, {
            id: action.picnik.picnik_id,
            park,
            recipes,
            wines,
            beers,
            date_of,
            time_of
        });
    } else if (action.type === 'logout') {
        return {
            id: 0,
            date_of: "",
            time_of: "",
            park: {},
            recipes: [],
            beers: [],
            wines: []
        };
    } else if (action.type === 'save-error') {
        console.log('Please select a complete picnik.');
    } else if (action.type === 'to-food') {
        return Object.assign({}, state, {
            currentPage: 'food'
        });
    } else if (action.type === 'to-drinks') {
        return Object.assign({}, state, {
            currentPage: 'drinks'
        });
    } else if (action.type === 'to-map') {
        return Object.assign({}, state, {
            currentPage: 'map'
        });
    } else if (action.type === 'map-choices') {
        return Object.assign({}, state, {
            currentBasket: 'map'
        });
    } else if (action.type === 'beers-choices') {
        return Object.assign({}, state, {
            currentBasket: 'beers'
        });
    } else if (action.type === 'wines-choices') {
        return Object.assign({}, state, {
            currentBasket: 'wines'
        });
    } else if (action.type === 'recipes-choices') {
        return Object.assign({}, state, {
            currentBasket: 'recipes'
        });
    }
    return state;
};
