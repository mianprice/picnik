const INITIAL_STATE = {
    user_name: '',
    password: '',
    redirect_link: 'none'
};

export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === "update-value") {
        return Object.assign({}, state, {
            [action.id]: action.value
        });
    } else if (action.type === "login-complete") {
        return Object.assign({}, INITIAL_STATE, {
            user_name: action.payload.username,
            token: action.payload.token,
            first: action.payload.first,
            last: action.payload.last,
            user_id: action.payload.id
        });
    } else if (action.type === "logout") {
        return INITIAL_STATE;
    } else if (action.type === 'set-redirect') {
        return Object.assign({}, state, {
            redirect_link: action.link
        });
    }
    return state;
};
