import $ from 'jquery';

const addPicnikID = (id) => {
    return {
        type: 'add-picnik-id',
        id
    };
};

export const savePicnik = (recipes, beers, wines, park, date_of, time_of, login) => {
    let asyncAction = function(dispatch) {
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

export const removeBeer = (beer) => { //we pass the entire recipe object into the function so we can save it to the select_recipes array in the state
    return {type: 'remove-beer', beer};
};

export const changePage = (str) => {
    return {
        type: 'to-' + str
    };
}

export const changeBasket = (str) => {
    return {
        type: str + '-choices'
    };
}
