import $ from 'jquery';

const addPicnikID = (id) => {
    return {
        type: 'add-picnik-id',
        id
    };
};

export const savePicnik = (recipes, beers, wines, park, date_of, time_of, login) => {
    if (recipes.length < 1 || beers.length < 1 || wines.length < 1 || !park.park_id) {
        return {type: 'save-error'};
    }
    let asyncAction = function(dispatch) {
        console.log(JSON.stringify({
            beers,
            wines,
            recipes,
            park,
            date_of,
            time_of,
            login
        }));
        $.ajax({
            url: "http://localhost:4000/api/picnik/save",
            method: "POST",
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({
                beers,
                wines,
                recipes,
                park,
                date_of,
                time_of,
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
