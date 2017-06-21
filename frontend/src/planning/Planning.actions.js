import $ from 'jquery';
import {hashHistory} from 'react-router';

const addPicnikID = (id) => {
    return {
        type: 'add-picnik-id',
        id
    };
};

// export const setRedirect = (location) => {
//     return {
//         type: 'set-redirect',
//         link: location
//     };
// };

const redirect = (link, next) => {
    hashHistory.push(link);
    return {
        type: 'set-redirect',
        link: next
    };
};

export const savePicnik = (recipes, beers, wines, park, date_of, time_of, login) => {
    let asyncAction = function(dispatch) {
        if (login.token !== undefined) {
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
                // let r = (result.id)
                dispatch(addPicnikID(result.id));
                dispatch(redirect('/invitations', 'none'));
            })
            .catch(error => {
                console.log(error);
            });
        } else {
            // dispatch(where('token: ' + login.token.length.toString()));
            dispatch(redirect('/login','/invitations'));
        }
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

const beerPairingEngine = (selected_recipe) => {
    let flavor_profile = {
        piquant: selected_recipe.f_piquant,
        meaty: selected_recipe.f_meaty,
        sweet: selected_recipe.f_sweet,
        salty: selected_recipe.f_salty,
        bitter: selected_recipe.f_bitter,
        sour_taste: selected_recipe.f_sour
    };
    let course = selected_recipe.courses.map(course => {
        return course.name;
    });
    let cuisine_final = selected_recipe.cuisines.map(cuisine => {
        return cuisine.name.toLowerCase();
    });
    let ingredient_list = selected_recipe.ingredients.map(item => {
        if (item.name.includes(" ")) {
            return item.name.split(" ");
        } else {
            return [item.name];
        }
    });
    let ingredient_list_final = ingredient_list.toString();
    if (flavor_profile.piquant > .8) { //spicy food
        return [2, 26, 29, 30, 31, 25, 72, 73, 74, 164, 27, 1, 65, 48, 49, 50, 51, 52, 53, 112, 113, 114, 115, 116]; //IPA, pale ale, hefeweizen, saison

    } else if (course.includes("Desserts")) {
        return [13, 16, 20, 21, 42, 43, 17, 34, 68, 119, 121, 122, 167, 18, 19, 90, 64]; //porter, stout, barleywine, old ale, fruit lambic, fruit beer, pumpkin beer, chocolate beer, doppelbock, strong dark belgian ale,

    } else if (flavor_profile.piquant < 0.2 && flavor_profile.salty > 0.8) { //salty non-spicy food
        return [77, 78, 79, 80, 81, 82, 83, 92, 93, 94, 95, 96, 97, 99, 100, 101, 102, 103, 25, 73, 74, 164, 27, 1, 40, 46, 47, 66, 67, 68, 136, 165]; //lager, "pale_ale", "sours"

    } else if (((cuisine_final.includes("barbecue") && !ingredient_list_final.includes('chicken')) && (ingredient_list_final.includes('beef') || ingredient_list_final.includes('chuck') || ingredient_list_final.includes('pork')) && flavor_profile.piquant < 0.8)) { //non-poultry bbq
        return [16, 20, 21, 42, 43, 18, 19, 158, 90, 77, 78, 79, 80, 81, 82, 83, 92, 93, 94, 95, 96, 97, 99, 100, 101, 102, 103, 25, 73, 74, 164, 27, 1]; //"stout", "porter", "doppelbock", "lager", "ipa"

    } else if (ingredient_list_final.includes('roast') &&  ingredient_list_final.includes('pot') && flavor_profile.piquant < 0.8) { //heavy pot roasts
        return [16, 20, 21, 42, 43, 18, 19, 158, 90]; //"stout", "porter", "doppelbock"

    } else if ((cuisine_final.includes("barbecue") && ingredient_list_final.includes('chicken')) && (!ingredient_list_final.includes('beef') && !ingredient_list_final.includes('pork') && flavor_profile.piquant < 0.8)) { //poultry bbq
        return [77, 78, 79, 80, 81, 82, 83, 92, 93, 94, 95, 96, 97, 99, 100, 101, 102, 103, 106, 25, 73, 74, 164, 27, 1, 40, 46, 47, 66, 67, 68, 136, 165]; //lager, "pale_ale", "sours"

    } else if ((cuisine_final.includes("asian") || cuisine_final.includes("japanese") || cuisine_final.includes("chinese") || cuisine_final.includes("thai")) && flavor_profile.piquant < 0.8) { //non-spicy asian
        return [77, 78, 79, 80, 81, 82, 83, 92, 93, 94, 95, 96, 97, 99, 100, 101, 102, 103, 106, 65, 48, 49, 50, 51, 52, 53, 112, 113, 114, 115, 116, 40, 46, 47, 66, 67, 68, 136, 165]; //"lager", "hefeweizen", "gose"

    } else if (cuisine_final.includes("italian") && flavor_profile.piquant < 0.8) { //italian food
        return [77, 78, 79, 80, 81, 82, 83, 92, 93, 94, 95, 96, 97, 99, 100, 101, 102, 103, 25, 73, 74, 164, 27, 1]; //"lager", "pale_ale"

    } else if (cuisine_final.includes("mediterranean") && flavor_profile.piquant < 0.8) { //mediterranean food
        return [59, 77, 78, 79, 80, 81, 82, 83, 92, 93, 94, 95, 96, 97, 99, 100, 101, 102, 103, 25, 73, 74, 164, 27, 1]; //lager, pale ale, tripel

    } else if (cuisine_final.includes("american") && ((ingredient_list_final.includes("salmon") || ingredient_list_final.includes("fish") || ingredient_list_final.includes("tilapia") || ingredient_list_final.includes("lobster") || ingredient_list_final.includes("shrimp") || ingredient_list_final.includes("crab")))) { //american seafood
        return [77, 78, 79, 80, 81, 82, 83, 92, 93, 94, 95, 96, 97, 99, 100, 101, 102, 103, 106, 65, 48, 49, 50, 51, 52, 53, 112, 113, 114, 115, 116, 72, 45]; //'lager', 'hefeweizen', 'saison', 'kolsch'
    } else if (ingredient_list_final.includes('chicken')) {
        return [72, 58, 71, 3, 4, 5, 52]; //saison, dubbel, biere de garde, english bitter, dunkelweizen
    } else {
        return "No matches";
    }
};

const displayBeers = (results) => {
    return {type: 'display-beer-options', payload: results};
};

export const beerPairingMegaFunction = (beers_filtered_based_on_prefs, selected_recipe) => {
    let asyncAction = function(dispatch) {
        $.ajax({
            url: "http://localhost:4000/api/beer",
            method: "GET",
            dataType: 'JSON'
        })
        .then((beers_filtered_based_on_prefs) => {
            let final_beer_set = beers_filtered_based_on_prefs.map(beer => { //adds paired-beer class to beers that matched the recommended pairings for the selected dish
                let classes = "beer";
                let smart_pairings = beerPairingEngine(selected_recipe);
                if (smart_pairings!== "No matches") {
                    if (smart_pairings.includes(beer.style_id)) {
                        classes += " paired-beer";
                    }
                }
                beer.class = classes;
                return beer;
            });
            return final_beer_set;
        })
        .then((final_beer_set) => dispatch(displayBeers(final_beer_set)))
        .catch(error =>  {throw error});
    };
    return asyncAction;
};

const winePairingEngine = (selected_recipe) => {
  let flavor_profile = {
      piquant: selected_recipe.f_piquant,
      meaty: selected_recipe.f_meaty,
      sweet: selected_recipe.f_sweet,
      salty: selected_recipe.f_salty,
      bitter: selected_recipe.f_bitter,
      sour_taste: selected_recipe.f_sour
  };
  let course = selected_recipe.courses.map(course => {
      return course.name;
  });
  let cuisine_final = selected_recipe.cuisines.map(cuisine => {
      return cuisine.name.toLowerCase();
  });
  let ingredient_list = selected_recipe.ingredients.map(item => {
      if (item.name.includes(" ")) {
          return item.name.split(" ");
      } else {
          return [item.name];
      }
  });
  let ingredient_list_final = ingredient_list.toString();
  if (course.includes('Dessert') || flavor_profile.sweet > .75) {
    return [ 3, 5, 8, 23, 25, 36, 40, 42, 44, 84, 92, 113, 126, 131, 135, 137, 148, 159, 162, 180, 184, 192, 206 ]; //sweet, sparkling
  } else if (flavor_profile.piquant > .8) {
    return [7, 12, 14, 15, 16, 17, 22, 34, 37, 51, 52, 67, 75, 77, 106, 123, 194]; //medium
  } else if (flavor_profile.meaty > .8) {
    if (ingredient_list_final.includes("beef") || ingredient_list_final.includes("steak")) {
      return [7, 12, 14, 15, 16, 17, 22, 34, 37, 51, 52, 67, 75, 77, 106, 123, 194, 2, 3, 8, 24, 30, 36, 46, 58, 88, 109, 117, 154, 155, 200, 173]; //medium, bold
    } else if (ingredient_list_final.includes('pork')) {
      return [7, 12, 14, 15, 16, 17, 22, 34, 37, 51, 52, 67, 75, 77, 106, 123, 194];
    } else if (ingredient_list_final.includes("chicken")) {
      return [5, 6, 19, 29, 32, 48, 50, 62, 79, 90, 150, 197, 11, 112, 125, 193, 175, 169, 7, 12, 14, 15, 16, 17, 22, 34, 37, 51, 52, 67, 75, 77, 106, 123, 194]; //rich, light, medium
    } else if (ingredient_list_final.includes("salmon") || ingredient_list_final.includes("fish") || ingredient_list_final.includes("tilapia") || ingredient_list_final.includes("lobster") || ingredient_list_final.includes("shrimp") || ingredient_list_final.includes("crab")) {
      return [28, 27, 31, 38, 60, 76, 97, 121, 122, 141, 156, 208, 5, 6, 19, 29, 32, 48, 50, 62, 79, 90, 150, 197, 23, 84, 113, 135]; //dry, rich, sparkling
    }
  } else if (flavor_profile.salty > .6) {
    return [89, 97, 104, 110, 276, 279, 297, 306, 311, 322, 333, 350, 421, 424, 448, 460, 462, 476, 477, 511, 540, 556, 563, 568, 569, 584, 640, 654, 670, 683, 684, 690, 723, 737, 748, 803, 823, 825, 59615, 117076, 176662]; //sparkling
  } else return "No matches";
}

const displayWines = (results) => {
    return {type: 'display-wine-options', payload: results};
};

export const winePairingMegaFunction = (wines_filtered_based_on_prefs, selected_recipe) => {
    let asyncAction = function(dispatch) {
        $.ajax({
            url: "http://localhost:4000/api/wine",
            method: "GET",
            dataType: 'JSON'
        })
        .then((wines_filtered_based_on_prefs) => {
            let final_wine_set = wines_filtered_based_on_prefs.map(wine => { //adds paired-wine class to wines that matched the recommended pairings for the selected dish
                let classes = "wine";
                let smart_pairings = winePairingEngine(selected_recipe);
                if (smart_pairings !== "No matches") {
                    if (smart_pairings.includes(wine.varietal_id)) {
                        classes += " paired-wine";
                    }
                }
                wine.class = classes;
                return wine;
            });
            return final_wine_set;
        })
        .then((final_wine_set) => dispatch(displayWines(final_wine_set)))
        .catch(error =>  {throw error});
    };
    return asyncAction;
};

export const removeWine = (wine) => { //we pass the entire recipe object into the function so we can save it to the select_recipes array in the state
    return {type: 'remove-wine', wine};
};

export const removeRecipe = (recipe) => { //we pass the entire recipe object into the function so we can save it to the select_recipes array in the state
    return {type: 'remove-recipe', recipe};
};
