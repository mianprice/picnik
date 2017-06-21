import $ from 'jquery';

export const enterInvites = (name, email) => {
    return {type: 'enter-invites', name, email};
};

// //
// //
// // const removeFromGuestList = (index) => {
// //     return {type: 'remove-from-guest-list', index}
// // };
//
// export const removeFromGuestListActionCreator = (index, email, picnik_id, login) => {
//     let asyncAction = (dispatch) => {
//         $.ajax({
//             url: "http://localhost:4000/api/remove_invite",
//             method: "DELETE",
//             dataType: 'JSON',
//             contentType: 'application/json',
//             data: JSON.stringify({
//                 email,
//                 picnik_id,
//                 login
//             })
//         })
//         .then(results => dispatch(removeFromGuestList(index)))
//         .catch(error => dispatch({type: 'page-error', error: error}));
//     };
//     return asyncAction;
// };
//
// export const addToGuestListActionCreator = (name, email, login, picnik_id) => {
//     let asyncAction = (dispatch) => {
//         $.ajax({
//             url: "http://localhost:4000/api/add_invite",
//             method: "POST",
//             dataType: 'JSON',
//             contentType: 'application/json',
//             data: JSON.stringify({
//                 picnik_id,
//                 name,
//                 email,
//                 login
//             })
//         })
//         .then(results => dispatch(addToGuestList(name, email)))
//         .catch(error => dispatch({type: 'page-error', error: error}));
//     };
//     return asyncAction;
// };

// Picnik_id, name, email

const showGuestList = (picnik_guests) => {
    return {
        type: 'save-guest-list',
        picnik_guests
    };
};

export const refreshGuestList = (picnik_id, login) => {
    let asyncAction = (dispatch) => {
        $.ajax({
            url: "http://localhost:4000/api/get_invites",
            method: "POST",
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({
                picnik_id,
                login
            })
        })
        .then(results => {
            dispatch(showGuestList(results.invite_set));
        })
        .catch(error => dispatch({type: 'invite-refresh-error', error: error}));
    };
    return asyncAction;
};


export const sendInvite = (picnik_id, name, email, login) => {
    let asyncAction = (dispatch) => {
        $.ajax({
            url: "http://localhost:4000/api/send_invite",
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
        .then(results => {
            console.log(results);
            dispatch(showGuestList(results.invite_set));
        })
        .catch(error => dispatch({type: 'invite-send-error', error: error}));
    };
    return asyncAction;
};

export const loadPicnikToPlanning = (picnik) => {
    // console.log(picnik);
    return {type: 'load-picnik-to-planning', picnik };
};
