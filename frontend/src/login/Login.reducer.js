let INITIAL_STATE = {
    user_name: '',
    password: ''
};

export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === "update-value") {
        return Object.assign({}, state, {
            [action.id]: action.value
        });
    } else if (action.type === "login-complete") {
        return Object.assign({}, state, {
            user_name: action.payload.user_name,
            token: action.payload.token,
            first: action.payload.first,
            last: action.payload.last,
            user_id: action.payload.id,
        });
    }
    return state;
};
