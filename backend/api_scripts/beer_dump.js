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

let api_page_number = 0;
let api_url = 'http://api.brewerydb.com/v2/beers?key=30fae795a155ea7f3a8401417c570efe&availableId=4&hasLabels=Y&withBreweries=Y&p=';

script_health_check();

function get_api_data() {
    var options = {
        uri: api_url + api_page_number.toString(),
        json: true
    };
    rp(options)
        .then((response) => {
            console.log('Saving response to json file');
            return Promise.all([response, fs.writeJson(`./brewery_json/api_result_page_${api_page_number}.json`,response)])
        })
        .then((result) => {
            console.log('Successfully wrote output json to file');
            insert_api_data(result[0]);
        })
        .catch(err => {console.log(err)});
}

function insert_api_data(response) {
    response.data = response.data.filter((element) => {
        return element.style && element.breweries[0];
    });
    let first_round = Promise.mapSeries(response.data, (element) => {
        return Promise.all([
            db.one('insert into beers values(default,$1) returning id', [element.name]),
            upsert_style(element.style.id,element.style.name),
            upsert_category(element.style.category.id,element.style.category.name),
            upsert_brewery(element.breweries[0]),
            element
        ])
    });
    Promise.all(first_round)
        .then((result) => {
            let second_round = result.map((element) => {
                let beer_id = element[0].id;
                let style_id = element[1].id;
                let category_id = element[2].id;
                let brewery_id = element[3].id;
                let beer = Object.assign({},element[4]);
                return Promise.all([
                    db.none('insert into beers_styles values($1,$2)', [beer_id,style_id]),
                    db.none('insert into categories_styles values($1,$2)', [category_id,style_id]),
                    db.none('insert into breweries_beers values($1,$2)', [brewery_id,beer_id]),
                    db.none('insert into beer_links values($1,$2,$3,$4,$5,$6,$7)', [
                        beer_id,
                        beer.id,
                        beer.abv || "",
                        beer.ibu || "",
                        beer.isOrganic === "Y",
                        beer.labels.medium || "",
                        beer.labels.icon || ""
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

function upsert_style(style_id,style_name) {
    return db.oneOrNone("select count(*) from styles where brewery_db_styleID = $1", [style_id.toString()])
        .then((result) => {
            if ((result === null) || (result.count === '0')) {
                return db.one('insert into styles values(default,$1,$2) returning id', [style_id.toString(),style_name]);
            } else {
                return db.one("select id from styles where brewery_db_styleID = $1", [style_id.toString()]);
            }
        })
        .catch(err => {console.log(err)});
}

function upsert_category(category_id,category_name) {
    return db.oneOrNone("select count(*) from categories where brewery_db_categoryID = $1", [category_id.toString()])
        .then((result) => {
            if ((result === null) || (result.count === '0')) {
                return db.one('insert into categories values(default,$1,$2) returning id', [category_id.toString(),category_name]);
            } else {
                return db.one("select id from categories where brewery_db_categoryID = $1", [category_id.toString()]);
            }
        })
        .catch(err => {console.log(err)});
}

function upsert_brewery(brewery) {
    return db.one("select count(*) from breweries where brewery_db_breweryID = $1", [brewery.id.toString()])
        .then((result) => {
            if (result.count === '0') {
                return db.one('insert into breweries values(default,$1,$2,$3,$4,$5,$6,$7) returning id', [
                    brewery.id.toString(),
                    brewery.name,
                    brewery.website || "",
                    (brewery.images && brewery.images.icon) || "",
                    (brewery.images && brewery.images.squareMedium) || "",
                    brewery.description || "",
                    (brewery.locations && brewery.locations[0] && brewery.locations[0].postalCode) || ""]);
            } else {
                return db.one("select id from breweries where brewery_db_breweryID = $1", [brewery.id.toString()]);
            }
        })
        .catch(err => {console.log(err)});
}

function script_health_check() {
    db.one('select count(*) from beers')
        .then((data) => {
            console.log(`Total record count: ${data.count}`);
            if (api_page_number >= 45) {
                console.log(`DB insertion stopped after API page ${api_page_number}`);
            } else {
                api_page_number += 1;
                get_api_data();
            }
        })
        .catch(err => {console.log(err)});
}
