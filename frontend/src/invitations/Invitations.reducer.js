const INITIAL_STATE = {
    invite_email: '',
    invite_name: '',
    guest_list: [],
    error_message: null
};

export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'enter-invites') {
        return Object.assign({}, state, {
            invite_email: action.email,
            invite_name: action.name
        });
    } else if (action.type === 'save-guest-list'){
        let temp_state = Object.assign({}, state);
        temp_state.guest_list
        temp_state.invite_email = '';
        temp_state.invite_name = '';
        return Object.assign({}, state, {
            invite_email: '',
            invite_name: '',
            guest_list: action.picnik_guests
        });
    } /*else if (action.type === 'remove-from-guest-list') {
        let temp_state = state.guest_list;
        temp_state.splice(action.index, 1);
        return Object.assign({}, state, {
            guest_list: temp_state
        });
    } */else if (action.type === 'invite-send-error') {
        return Object.assign({}, state, {
            error_message: action.error
        });
    } else if (action.type === 'logout') {
        return Object.assign({}, state, {
            INITIAL_STATE
        });
    } else if (action.type === "login-complete") {
        return Object.assign({}, INITIAL_STATE, {
            guest_list: []
        });
    }
    return state;
};
