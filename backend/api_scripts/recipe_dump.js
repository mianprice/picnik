const Promise = require ('bluebird');
const bodyParser = require ('body-parser');
const rp = require('request-promise');
const fs = require('fs-extra');
const cors = require ('cors');
const pgp = require('pg-promise')({
  promiseLib: Promise
});
const config = require('../config');
const db = pgp(config.db);

let db_record_count = 0;
let api_total_record_count = 0;
let api_returned_record_count = 0;
let api_result_number = 680500;
let api_url = 'http://api.yummly.com/v1/api/recipes?_app_id=cf10df74&_app_key=aaf39aafaee8cecc801ecd6f94b60b57&maxResult=500&flavor.piquant.min=0&flavor.piquant.max=1&flaver.sweet.min=0&flavor.sweet.max=1&flavor.meaty.min=0&flavor.meaty.max=1&flavor.sour.min=0&flavor.sour.max=1&flavor.bitter.min=0&flavor.bitter.max=1&flavor.salty.min=0&flavor.salty.max=1&requirePictures=true&start=';

script_health_check();

function get_api_data() {
    var options = {
        uri: api_url + api_result_number.toString(),
        json: true
    };
    rp(options)
        .then((response) => {
            console.log('Saving response to json file');
            return Promise.all([response, fs.writeJson(`./yummly_json/api_result_page_${api_result_number}.json`,response)])
        })
        .then((result) => {
            console.log('Successfully wrote output json to file');
            insert_api_data(result[0]);
        })
        .catch(err => {console.log(err)});
}

function insert_api_data(response) {
    response.matches = response.matches.filter((element) => {
        return element.attributes && element.attributes.course && (element.ingredients.length > 0) && element.attributes.cuisine && (element.attributes.cuisine.length > 0) && element.recipeName && element.id && element.smallImageUrls && (element.smallImageUrls.length > 0);
    });
    let first_round = Promise.mapSeries(response.matches, (element) => {
        return Promise.all([
            db.one('insert into recipes values(default,$1,$2,$3,$4,$5,$6,$7) returning id', [element.recipeName,element.flavors.piquant.toString(),element.flavors.meaty.toString(),element.flavors.bitter.toString(),element.flavors.sweet.toString(),element.flavors.sour.toString(),element.flavors.salty.toString()]),
            Promise.all(element.attributes.cuisine.map((cuisine) => {
                return upsert_cuisine(cuisine);
            })),
            Promise.all(element.attributes.course.map((course) => {
                return upsert_course(course);
            })),
            Promise.all(element.ingredients.map((ingredient) => {
                return upsert_ingredient(ingredient);
            })),
            element
        ])
    });
    Promise.all(first_round)
        .then((result) => {
            let second_round = result.map((element) => {
                let recipe_id = element[0].id;
                let cuisines = element[1];
                let courses = element[2];
                let ingredients = element[3];
                let recipe = Object.assign({},element[4]);
                return Promise.all([
                    Promise.all(cuisines.map((cuisine) => {
                        return db.none('insert into recipes_cuisines values($1,$2)', [recipe_id,cuisine.id]);
                    })),
                    Promise.all(courses.map((course) => {
                        return db.none('insert into recipes_courses values($1,$2)', [recipe_id,course.id]);
                    })),
                    Promise.all(ingredients.map((ingredient) => {
                        return db.none('insert into recipes_ingredients values($1,$2)', [recipe_id,ingredient.id]);
                    })),
                    db.none('insert into recipe_links values($1,$2,$3,$4,$5,$6)', [
                        recipe_id,
                        recipe.id,
                        recipe.smallImageUrls[0] || "",
                        recipe.sourceDisplayName || "",
                        recipe.totalTimeInSeconds || 0,
                        recipe.rating || 0
                    ])
                ]);
            });
            return Promise.all(second_round);
        })
        .then((result) => {
            script_health_check();
        })
        .catch(err => {console.log(err)});
}

function upsert_course(course) {
    return db.oneOrNone("select count(*) from courses where name = $1", [course])
        .then((result) => {
            if ((result === null) || (result.count === '0')) {
                return db.one('insert into courses values(default,$1) returning id', [course]);
            } else {
                return db.one("select id from courses where name = $1", [course]);
            }
        })
        .catch(err => {console.log(err)});
}

function upsert_ingredient(ingredient) {
    return db.oneOrNone("select count(*) from ingredients where name = $1", [ingredient])
        .then((result) => {
            if ((result === null) || (result.count === '0')) {
                return db.one('insert into ingredients values(default,$1) returning id', [ingredient]);
            } else {
                return db.one("select id from ingredients where name = $1", [ingredient]);
            }
        })
        .catch(err => {console.log(err)});
}

function upsert_cuisine(cuisine) {
    return db.oneOrNone("select count(*) from cuisines where name = $1", [cuisine])
        .then((result) => {
            if ((result === null) || (result.count === '0')) {
                return db.one('insert into cuisines values(default,$1) returning id', [cuisine]);
            } else {
                return db.one("select id from cuisines where name = $1", [cuisine]);
            }
        })
        .catch(err => {console.log(err)});
}

function script_health_check() {
    db.one('select count(*) from recipes')
        .then((data) => {
            console.log(`Total record count: ${data.count}`);
            if (api_result_number >= 686000) {
                console.log(`DB insertion stopped after API record: ${api_result_number}`);
            } else {
                api_result_number += 500;
                get_api_data();
            }
        })
        .catch(err => {console.log(err)});
}
