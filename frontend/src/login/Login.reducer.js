let INITIAL_STATE = {
    user_name: '',
    password: ''
};

export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === "update-value") {
        return Object.assign({}, state, {
            [action.id]: action.value
        });

    }
    return state;
};
