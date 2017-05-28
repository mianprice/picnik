let INITIAL_STATE = {
    invites: [{email: '', name: ''}],
    guest_list: [],
    error_message: null
};

export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'enter-invites') {
        let temp_state = state.invites;
        let current = {
            email: action.email,
            name: action.name
        };
        temp_state[action.index] = current;
        return Object.assign({}, state, {
            invites: temp_state
        });
    } else if (action.type === 'save-to-guest-list'){
        let temp_state = state;
        temp_state.guest_list.push({
            name: action.name,
            email: action.email
        });
        temp_state.invites = [{email: '', name: ''}];
        return Object.assign({}, state, temp_state);
    } else if (action.type === 'remove-from-guest-list') {
        let temp_state = state.guest_list;
        temp_state.splice(action.index, 1);
        return Object.assign({}, state, {
            guest_list: temp_state
        });
    } else if (action.type === 'page-error') {
        return Object.assign({}, state, {
            error_message: action.error
        });
    } else {
        return state;
    }
};
