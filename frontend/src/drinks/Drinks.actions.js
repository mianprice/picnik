import $ from 'jquery';

// Beer ------------------------------->

export const selectBeer = (beer_id) => {
    return {type: 'select-beer', beer_id};
};

// Wine ------------------------------->

export const selectWine = (wine_id) => {
    return {type: 'select-wine', wine_id};
};
