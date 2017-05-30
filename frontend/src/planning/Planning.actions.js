import $ from 'jquery';

const addPicnikID = (id) => {
    return {
        type: 'add-picnik-id',
        id
    };
};

export const savePicnik = (recipes, beers, wines, park, login) => {
    let asyncAction = function(dispatch) {
        $.ajax({
            url: "http://localhost:4000/api/picnik/save",
            method: "POST",
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({
                recipes,
                beers,
                wines,
                park,
                login
            })
        })
        .then(result => {
            dispatch(addPicnikID(result.id));
        })
        .catch(error => {
            console.log(error);
        });
    };
    return asyncAction;
};
