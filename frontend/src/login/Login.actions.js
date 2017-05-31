import $ from 'jquery';
import {hashHistory} from 'react-router';

export function updateValue(id, value) {
    return {
        id,
        value,
        type: 'update-value'
    };
};

const loginComplete = (data) => {
    hashHistory.push('/');
    return {
        type: 'login-complete',
        payload: data
    };
};

const pageError = (err) => {
    return {
        type: 'page-error',
        payload: err
    };
};

export const loadSavedBeersToProfile = (data) => {
    let asyncAction = (dispatch) => {
        $.ajax({
            method: "GET",
            url: "http://localhost:4000/api/beer/saved/" + data.id,
            dataType: "json"
        })
        .then(result => dispatch({ type: 'load-saved-beers-to-profile', payload: result }))
        .catch(error => dispatch(pageError(error)));
    };
    return asyncAction;
};

export const loadSavedWinesToProfile = (data) => {
    let asyncAction = (dispatch) => {
        $.ajax({
            method: "GET",
            url: "http://localhost:4000/api/wine/saved/" + data.id,
            dataType: "json"
        })
        .then(result => dispatch({ type: 'load-saved-wines-to-profile', payload: result }))
        .catch(error => dispatch(pageError(error)));
    };
    return asyncAction;
};

export const loadSavedRecipesToProfile = (data) => {
    let asyncAction = (dispatch) => {
        $.ajax({
            method: "GET",
            url: "http://localhost:4000/api/recipe/saved/" + data.id,
            dataType: "json"
        })
        .then(result => dispatch({ type: 'load-saved-recipes-to-profile', payload: result }))
        .catch(error => dispatch(pageError(error)));
    };
    return asyncAction;
};

export function sendLogin(login) {
    let asyncAction = function(dispatch) {
        $.ajax({
            method: "POST",
            url: "http://localhost:4000/api/user/login",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                login
            })
        })
        .then(data => {
            dispatch(loginComplete(data));
            dispatch(loadSavedBeersToProfile(data));
            dispatch(loadSavedWinesToProfile(data));
            dispatch(loadSavedRecipesToProfile(data));
        })
        .catch(error => dispatch(pageError(error)));
    };
    return asyncAction;
};
