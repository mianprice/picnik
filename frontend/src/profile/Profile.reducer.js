let INITIAL_STATE = {
    saved_picniks: [],
    saved_parks: [],
    saved_recipes: [],
    saved_beers: [],
    saved_wines: []
};

export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'display-picniks') {
        let temp_state = state;
        temp_state.saved_picniks[0] = action.payload;
        return Object.assign(temp_state);
    } else {
        return state;
    }
};
