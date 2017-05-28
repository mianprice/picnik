import $ from 'jquery';

// Beer and Wine ---------------------->

export const saveForLater = (beer_or_wine_item, user_id) => {
    if(beer_or_wine_item.beer_id) {
        var drink_id = beer_or_wine_item.beer_id;
        var drink = 'beer';
    } else {
        var drink_id = beer_or_wine_item.wine_id;
        var drink = 'wine';
    }
    let asyncAction = (dispatch) => {
        $.ajax({
            url: "http://localhost:4000/api/save_drink",
            method: "POST",
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({
                drink_id,
                user_id,
                type: 2,
                drink
            })
        })
        .then(results => console.log(results))
        .catch(error => {throw error});
    };
    return asyncAction;
};

// Beer ------------------------------->

export const selectBeer = (beer_id) => {
    return {type: 'select-beer', beer_id};
};

// Wine ------------------------------->

export const selectWine = (wine_id) => {
    return {type: 'select-wine', wine_id};
};
