import $ from 'jquery';

export const enterInvites = (name, email, index) => {
    return {type: 'enter-invites', name, email, index};
};

const addToGuestList = (name, email) => {
    return {type: 'save-to-guest-list', name, email};
};

export const removeFromGuestList = (index) => {
    return {type: 'remove-from-guest-list', index}
};

export const addToGuestListActionCreator = (name, email, login, picnik_id) => {
    let asyncAction = (dispatch) => {
        $.ajax({
            url: "http://localhost:4000/api/add_invite",
            method: "POST",
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({
                picnik_id,
                name,
                email,
                login
            })
        })
        .then(results => dispatch(addToGuestList(name, email)))
        .catch(error => dispatch({type: 'page-error', error: error}));
    };
    return asyncAction;
};

// Picnik_id, name, email
