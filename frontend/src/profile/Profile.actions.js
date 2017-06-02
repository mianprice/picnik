import $ from 'jquery';
import {hashHistory} from 'react-router';

export const goToSignup = () => {
    hashHistory.push('/signup');
    return {
        type: 'edit-profile'
    };
};

const pageError = (err) => {
    return {
        type: 'page-error',
        payload: err
    };
};

const displayPicniks = (data) => {
    return {type: 'display-picniks', payload: data};
};

export const displayPicniksActionCreator = (login) => {
    let asyncAction = (dispatch) => {
        $.ajax({
            url: "http://picnik.ianprice.co/api/saved_picniks",
            method: "POST",
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({
                login
            })
        })
        .then(results => dispatch(displayPicniks(results)))
        .catch(error => console.log(error));
    };
    return asyncAction;
};

// export const loadSavedBeersToProfile = (data) => {
//     let asyncAction = (dispatch) => {
//         $.ajax({
//             method: "GET",
//             url: "http://localhost:4000/api/beer/saved/" + data.user_id,
//             dataType: "json"
//         })
//         .then(result => dispatch({ type: 'load-saved-beers-to-profile', payload: result }))
//         .catch(error => dispatch(pageError(error)));
//     };
//     return asyncAction;
// };
//
// export const loadSavedWinesToProfile = (data) => {
//     let asyncAction = (dispatch) => {
//         $.ajax({
//             method: "GET",
//             url: "http://localhost:4000/api/wine/saved/" + data.user_id,
//             dataType: "json"
//         })
//         .then(result => dispatch({ type: 'load-saved-wines-to-profile', payload: result }))
//         .catch(error => dispatch(pageError(error)));
//     };
//     return asyncAction;
// };
//
// export const loadSavedRecipesToProfile = (data) => {
//     let asyncAction = (dispatch) => {
//         $.ajax({
//             method: "GET",
//             url: "http://localhost:4000/api/recipe/saved/" + data.user_id,
//             dataType: "json"
//         })
//         .then(result => dispatch({ type: 'load-saved-recipes-to-profile', payload: result }))
//         .catch(error => dispatch(pageError(error)));
//     };
//     return asyncAction;
// };

export const loadPicnikToPlanning = (picnik) => {
    // console.log(picnik);
    return {type: 'load-picnik-to-planning', picnik };
};
