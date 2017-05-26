import $ from 'jquery';

// Beer ------------------------------->

export const selectBeer = (beer_id) => {
    return {type: 'select-beer', beer_id};
};

// Wine ------------------------------->

const displayWines = (results) => {
    return {type: 'display-wine-options', payload: results};
};

export const getWine = (search_params) => {
    let asyncAction = function(dispatch) {
        $.ajax({
            url: "http://api.snooth.com/wines/?akey=k55ur744ocfnnnh63q52bvh26eaqg9oekf7er3tp5mbj09a1&a=1",
            method: "GET",
            dataType: 'JSON'
        })
        .then((results) => dispatch(displayWines(results)))
        .catch(error =>  {throw error});
    };
    return asyncAction;
};


export const selectWine = (wine_id) => {
    return {type: 'select-wine', wine_id};
};
