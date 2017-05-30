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

let api_result_number = -99;
let api_url = 'http://api.snooth.com/wines/?akey=k55ur744ocfnnnh63q52bvh26eaqg9oekf7er3tp5mbj09a1&n=100&q=wine&a=1&f=';

script_health_check();

function get_api_data() {
    var options = {
        uri: api_url + api_result_number.toString(),
        json: true
    };
    rp(options)
        .then((response) => {
            console.log('Saving response to json file');
            return Promise.all([response, fs.writeJson(`./wine_json/api_result_page_${api_result_number}.json`,response)])
        })
        .then((result) => {
            console.log('Successfully wrote output json to file');
            insert_api_data(result[0]);
        })
        .catch(err => {console.log(err)});
}

function insert_api_data(response) {
    response.wines = response.wines.filter((element) => {
        return element.varietal && !element.varietal.includes(';') && !element.varietal.includes(',') && !element.varietal.includes('^') && element.image && element.type && element.code;
    });
    let first_round = Promise.mapSeries(response.wines, (element) => {
        return Promise.all([
            db.one('insert into wines values(default,$1) returning id', [element.name]),
            upsert_varietal(element.varietal),
            upsert_winery(element.winery,element.winery_id),
            element
        ])
    });
    Promise.all(first_round)
        .then((result) => {
            let second_round = result.map((element) => {
                let wine_id = element[0].id;
                let varietal_id = element[1].id;
                let winery_id = element[2].id
                let wine = Object.assign({},element[3]);
                return Promise.all([
                    db.none('insert into wines_varietals values($1,$2)', [wine_id,varietal_id]),
                    db.none('insert into wines_wineries values($1,$2)', [wine_id,winery_id]),
                    db.none('insert into wine_links values($1,$2,$3,$4,$5,$6,$7,$8)', [
                        wine_id,
                        wine.code,
                        wine.region || "",
                        wine.price || "",
                        wine.vintage || "",
                        wine.type || "",
                        wine.link || "",
                        wine.image || ""
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

function upsert_varietal(varietal) {
    return db.oneOrNone("select count(*) from varietals where name = $1", [varietal])
        .then((result) => {
            if ((result === null) || (result.count === '0')) {
                return db.one('insert into varietals values(default,$1) returning id', [varietal]);
            } else {
                return db.one("select id from varietals where name = $1", [varietal]);
            }
        })
        .catch(err => {console.log(err)});
}

function upsert_winery(winery_name,winery_id) {
    return db.oneOrNone("select count(*) from wineries where winery_snooth_id = $1", [winery_id.toString()])
        .then((result) => {
            if ((result === null) || (result.count === '0')) {
                return db.one('insert into wineries values(default,$1,$2) returning id', [winery_name,winery_id.toString()]);
            } else {
                return db.one("select id from wineries where winery_snooth_id = $1", [winery_id.toString()]);
            }
        })
        .catch(err => {console.log(err)});
}

function script_health_check() {
    db.one('select count(*) from wines')
        .then((data) => {
            console.log(`Total record count: ${data.count}`);
            if (api_result_number >= 232488) {
                console.log(`DB insertion stopped after API record: ${api_result_number}`);
            } else {
                api_result_number += 100;
                get_api_data();
            }
        })
        .catch(err => {console.log(err)});
}
