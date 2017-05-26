import $ from 'jquery';

export const savePicnik = (recipes, beers, wines, parks, login) => {
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
                parks,
                login
            })
        })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });
    };
    return asyncAction;
};
