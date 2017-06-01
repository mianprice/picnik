import $ from 'jquery';


const displayRecipes = (results) => {
    return {type: 'display-recipe-options', payload: results};
};

const displayMoreRecipes = (results) => {
    return {type: 'display-more-recipe-options', payload: results};
};

const checkRange = (prev_value, element) => {
    return prev_value + (((element[0] <= (element[1] / 3)) && (element[0] >= ((element[1] - 1) / 3))) ? 1 : 0);
};

export const getRecipes = (taste_prefs_from_signup_state, cuisine_prefs_from_signup_state) => {
    let taste = taste_prefs_from_signup_state;
    let cuisine = cuisine_prefs_from_signup_state;

    let asyncAction = function(dispatch) {
        $.ajax({
            url: "http://localhost:4000/api/recipe",
            method: "GET",
            dataType: 'JSON'
        })
        .then((results) => {
            return results.map((recipe) => {
                // User preference check
                // FLAVOR
                let classes = "recipe ";
                let flavors_and_prefs = [
                    [recipe.f_sweet,taste.sweet],
                    [recipe.f_sour,taste.sour_taste],
                    [recipe.f_bitter,taste.bitter],
                    [recipe.f_meaty,taste.meaty],
                    [recipe.f_piquant,taste.piquant],
                    [recipe.f_salty,taste.salty]
                ];
                let taste_pref_matching_class_score = flavors_and_prefs.reduce(checkRange, 0);

                if ((taste_pref_matching_class_score > 1) && (taste_pref_matching_class_score <= 2)) {
                    classes += " user-preferred-recipe-good";
                } else if ((taste_pref_matching_class_score > 2) && (taste_pref_matching_class_score <= 4)) {
                    classes += " user-preferred-recipe-great";
                } else if (taste_pref_matching_class_score > 4) {
                    classes += " user-preferred-recipe-excellent";
                } else {
                    classes += " user-preferred-recipe-poor"
                }
                // CUISINE
                let cuisine_set = recipe.cuisines.map((c) => {
                    return c.name.toLowerCase();
                });
                let cuisines_and_prefs = [
                    (cuisine_set.includes("mexican") && cuisine.mexican),
                    (cuisine_set.includes("italian") && cuisine.italian),
                    (cuisine_set.includes("mediterranean") && cuisine.mediterranean),
                    (cuisine_set.includes("thai") && cuisine.thai),
                    (cuisine_set.includes("barbecue") && cuisine.barbecue),
                    (cuisine_set.includes("american") && cuisine.american),
                    (cuisine_set.includes("japanese") && cuisine.japanese),
                    (cuisine_set.includes("chinese") && cuisine.chinese),
                ];
                recipe.class = classes;
                return recipe;
            });
        })
        .then((results) => dispatch(displayRecipes(results)))
        .catch(error =>  {throw error});
    };
    return asyncAction;
};

export const getMoreRecipes = (taste_prefs_from_signup_state, cuisine_prefs_from_signup_state) => {
    let taste = taste_prefs_from_signup_state;
    let cuisine = cuisine_prefs_from_signup_state;

    let asyncAction = function(dispatch) {
        $.ajax({
            url: "http://localhost:4000/api/recipe",
            method: "GET",
            dataType: 'JSON'
        })
        .then((results) => {
            return results.map((recipe) => {
                // User preference check
                // FLAVOR
                let classes = "recipe ";
                let flavors_and_prefs = [
                    [recipe.f_sweet,taste.sweet],
                    [recipe.f_sour,taste.sour_taste],
                    [recipe.f_bitter,taste.bitter],
                    [recipe.f_meaty,taste.meaty],
                    [recipe.f_piquant,taste.piquant],
                    [recipe.f_salty,taste.salty]
                ];
                let taste_pref_matching_class_score = flavors_and_prefs.reduce(checkRange, 0);

                if ((taste_pref_matching_class_score > 1) && (taste_pref_matching_class_score <= 2)) {
                    classes += " user-preferred-recipe-good";
                } else if ((taste_pref_matching_class_score > 2) && (taste_pref_matching_class_score <= 4)) {
                    classes += " user-preferred-recipe-great";
                } else if (taste_pref_matching_class_score > 4) {
                    classes += " user-preferred-recipe-excellent";
                } else {
                    classes += " user-preferred-recipe-poor"
                }
                // CUISINE
                let cuisine_set = recipe.cuisines.map((c) => {
                    return c.name.toLowerCase();
                });
                let cuisines_and_prefs = [
                    (cuisine_set.includes("mexican") && cuisine.mexican),
                    (cuisine_set.includes("italian") && cuisine.italian),
                    (cuisine_set.includes("mediterranean") && cuisine.mediterranean),
                    (cuisine_set.includes("thai") && cuisine.thai),
                    (cuisine_set.includes("barbecue") && cuisine.barbecue),
                    (cuisine_set.includes("american") && cuisine.american),
                    (cuisine_set.includes("japanese") && cuisine.japanese),
                    (cuisine_set.includes("chinese") && cuisine.chinese),
                ];
                recipe.class = classes;
                return recipe;
            });
        })
        .then((results) => dispatch(displayMoreRecipes(results)))
        .catch(error =>  {throw error});
    };
    return asyncAction;
};

export const selectRecipe = (recipe) => { //we pass the entire recipe object into the function so we can save it to the select_recipes array in the state
    return {type: 'select-recipe', recipe};
};

export const removeRecipe = (recipe) => { //we pass the entire recipe object into the function so we can save it to the select_recipes array in the state
    return {type: 'remove-recipe', recipe};
};

export const saveForLater = (recipe_id, user_id) => {
    let asyncAction = (dispatch) => {
        $.ajax({
            url: "http://localhost:4000/api/save_recipe",
            method: "POST",
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({
                recipe_id,
                user_id,
                type: 2
            })
        })
        .then(results => console.log(results))
        .catch(error => {throw error});
    };
    return asyncAction;
};
