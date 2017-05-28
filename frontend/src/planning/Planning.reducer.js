let INITIAL_STATE = {
    test: true,
    id: 0
};

export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'add-picnik-id') {
        return Object.assign({}, state, {
            id: action.id
        })
    }
    return state;
};
