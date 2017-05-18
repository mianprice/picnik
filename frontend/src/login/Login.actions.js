import $ from 'jquery';

export function updateValue(id, value) {
    return {
        id,
        value,
        type: 'update-value'
    };
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
        .then(data => {console.log(data);})
        .catch(error => {throw error});
    };
    return asyncAction;
};
