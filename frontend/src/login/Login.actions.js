import $ from 'jquery';
import {hashHistory} from 'react-router';

export function updateValue(id, value) {
    return {
        id,
        value,
        type: 'update-value'
    };
};

const loginComplete = (data, redirect) => {
    if (redirect !== 'none') {
        hashHistory.push(redirect);
    } else {
        hashHistory.push('/');
    }
    return {
        type: 'login-complete',
        payload: data
    };
};

const loadPrefs = (data) => {
    let beer = data.beer_profile.split(",").map(element => (element === 'true'));
    let wine = data.wine_profile.split(",").map(element => (element === 'true'));
    let taste = data.taste_profile.split(",").map(element => parseInt(element));
    let beer_profile = {
        ipa: beer[0],
        pale_ale: beer[1],
        lager: beer[2],
        belgian: beer[3],
        wheat: beer[4],
        stout: beer[5],
        porter: beer[6],
        pilsner: beer[7],
        saison: beer[8],
        sours: beer[9]
    };
    let wine_profile = {
        dry_whites: wine[0],
        sweet_whites: wine[1],
        rich_whites: wine[2],
        light_reds: wine[3],
        medium_reds: wine[4],
        bold_reds: wine[5],
        sparkling: wine[6]
    };
    let taste_profile = {
        piquant: taste[0],
        meaty: taste[1],
        sweet: taste[2],
        salty: taste[3],
        bitter: taste[4],
        sour_taste: taste[5]
    };
    return {
        type: 'update-prefs',
        beer_profile,
        wine_profile,
        taste_profile
    };
};

const pageError = (err) => {
    return {
        type: 'page-error',
        payload: err
    };
};

export function sendLogin(login, redirect) {
    let asyncAction = function(dispatch) {
        $.ajax({
            method: "POST",
            url: "http://picnik.ianprice.co/api/user/login",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                login
            })
        })
        .then(data => {
            dispatch(loginComplete(data, redirect));
            dispatch(loadPrefs(data));
        })
        .catch(error => dispatch(pageError(error)));
    };
    return asyncAction;
};
