import $ from 'jquery';
import {hashHistory} from 'react-router';

export const goToSignup = () => {
    hashHistory.push('/signup');
    return {
        type: 'edit-profile'
    };
};

const displayPicniks = (data) => {
    return {type: 'display-picniks', payload: data}
};

export const displayPicniksActionCreator = (user_id) => {
    let asyncAction = (dispatch) => {
        $.ajax({
            url: "http://localhost:4000/api/saved_picniks",
            method: "GET",
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({
                user_id
            })
        })
        .then(results => dispatch(displayPicniks(results)))
        .catch(error => console.log(error));
    };
    return asyncAction;
};
