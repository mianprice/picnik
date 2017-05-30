import $ from 'jquery';

const addPicnikID = (id) => {
    return {
        type: 'add-picnik-id',
        id
    };
};

export const savePicnik = (recipes, beers, wines, park, date_of, time_of, login) => {
    let asyncAction = function(dispatch) {
        let beer_ids = beers.map(element =>  element.beer_id);
        let wine_ids = wines.map(element =>  element.wine_id);
        let recipe_ids = recipes.map(element =>  element.recipe_id);
        $.ajax({
            url: "http://localhost:4000/api/picnik/save",
            method: "POST",
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({
                recipe_ids,
                beer_ids,
                wine_ids,
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
