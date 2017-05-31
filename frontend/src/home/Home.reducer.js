let INITIAL_STATE = {
    test: true
};

export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'logout') {
        return Object.assign(INITIAL_STATE);
    }
    return state;
};
