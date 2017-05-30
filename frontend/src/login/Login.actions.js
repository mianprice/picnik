import $ from 'jquery';

export function updateValue(id, value) {
    return {
        id,
        value,
        type: 'update-value'
    };
};

const loginComplete = (data) => {
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

const loadSavedItemsToProfile = (data) => {
    let asyncAction = (dispatch) => {
        $.ajax({
            method: "POST",
            url: "http://localhost:4000/api/beer/saved/:userID",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                
            })
        })
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
        .then(data => dispatch(loginComplete(data)))
        .catch(error => dispatch(pageError(error)));
    };
    return asyncAction;
};
