/***********************************/
/***********************************/
/*<-----  SETUP STARTS HERE  ----->*/
/***********************************/
/***********************************/

const Promise = require ('bluebird');
const bcrypt = require ('bcrypt');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const express = require ('express');
const uuid = require ('uuid');
const rp = require ('request-promise');
const pgp = require('pg-promise')({
  promiseLib: Promise
});
const config = require('./config');
const db = pgp(config.db);
const app = express();
app.use(bodyParser.json());
app.use(cors());

const nodemailer = require ('nodemailer');
// CREATE MAIL TRANPORTER
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: config.email
});

/******************************************/
/******************************************/
/* <-----  API MIRRORS START HERE  -----> */
/******************************************/
/******************************************/


/******************************************/
/* <-----  RECIPE API STARTS HERE  -----> */
/******************************************/

// GET /api/recipe
// Retrieve a set of recipes
app.get('/api/recipe', (req,res,next) => {
    db.any('select * from recipes r inner join recipe_links rl on(r.id=rl.recipe_id) where r.seed = 0')
        .then((results) => {
            return Promise.all(results.map(get_recipe_step_1));
        })
        .then((results) => {
            return Promise.all(results.map(get_recipe_step_2));
        })
        .then((results) => {
            res.json(results.map(create_recipe_object));
        })
        .catch(next);
});

// GET /api/recipe/specific/:id
// Retrieve a specific recipe (denoted by id, which refers to recipeID)
app.get('/api/recipe/specific/:id', (req,res,next) => {
    let recipe_id = req.params.id;
    db.one('select * from recipes r inner join recipe_links rl on(r.id=rl.recipe_id) where r.id = $1', [recipe_id])
        .then(get_recipe_step_1)
        .then(get_recipe_step_2)
        .then(create_recipe_object)
        .then(result => res.json(result))
        .catch(next);
});

// POST /api/recipe/criteriaSearch
// Retrieve a set of recipes that match the provided criteria
// CRITERIA    => ?Comma?-separated property names
// CONSTRAINTS => ?Comma?-separated property values
app.post('/api/recipe/criteriaSearch', (req,res,next) => {
    let criteria = req.body.criteria;
    let constraints = req.body.contraints;
});

// GET /api/recipe/saved/:userID
// Retrieve the set of recipes saved by a specific user (denoted by userID)
app.get('/api/recipe/saved/:userID', (req,res,next) => {
    let user_id = req.params.userID;
    db.any('select * from recipes_saves saves inner join recipes r on (saves.recipe_id = r.id) inner join recipe_links rl on(r.id=rl.recipe_id) where saves.user_id = $1', [user_id])
        .then(result => {
            res.json(result);
        })
        .catch(next);
});

//save recipe for later
app.post('/api/save_recipe', (req, res, next) => {
    db.one('insert into recipes_saves values ($1, $2, $3) returning user_id', [req.body.recipe_id, req.body.user_id, req.body.type])
    .then(results => {
        res.json({
            success: true
        });
    })
    .catch(next);
});

//save beer or wine for later
app.post('/api/save_drink', (req, res, next) => {
    var query = req.body.drink === 'beer' ? 'insert into beer_saves values ($1, $2, $3) returning user_id' : 'insert into wine_saves values ($1, $2, $3) returning user_id';
    db.one(query, [req.body.drink_id, req.body.user_id, req.body.type])
    .then(results => {
        res.json({
            success: true
        });
    })
    .catch(next);
});

/****************************************/
/* <-----  BEER API STARTS HERE  -----> */
/****************************************/

// GET /api/beer
// Retrieve a set of beers
app.get('/api/beer', (req,res,next) => {
    db.any('select b.id as beer_id, b.name as beer_name, brewery_db_id, cast(abv as float), cast(ibu as float), label_image_link_medium, label_image_link_icon, brewery_id, brewery_db_breweryid, br.name as brewery_name,br.link as brewery_link, br.icon_image_link as brewery_icon, br.medium_image_link as brewery_medium, br.description as brewery_desc, br.zip as zip, style_id as internal_style_id, brewery_db_styleid::int as style_id, s.name as style_name from beers b inner join beer_links bl on(b.id = bl.beer_id) inner join breweries_beers bb on(b.id=bb.beer_id) inner join breweries br on(bb.brewery_id = br.id) inner join beers_styles bs on(b.id=bs.beer_id) inner join styles s on(bs.style_id = s.id) where b.seed = 0')
        .then((results) => {
            res.json(results);
        })
        .catch(next);
});

// GET /api/beer/specific/:id
// Retrieve a specific beer (denoted by id, which refers to beerID)
app.get('/api/beer/specific/:id', (req,res,next) => {
    let beer_id = req.params.id;
    db.one('select b.id as beer_id, b.name as beer_name, brewery_db_id, cast(abv as float), cast(ibu as float), label_image_link_medium, label_image_link_icon, brewery_id, brewery_db_breweryid, br.name as brewery_name,br.link as brewery_link, br.icon_image_link as brewery_icon, br.medium_image_link as brewery_medium, br.description as brewery_desc, br.zip as zip, style_id as internal_style_id, brewery_db_styleid::int as style_id, s.name as style_name from beers b inner join beer_links bl on(b.id = bl.beer_id) inner join breweries_beers bb on(b.id=bb.beer_id) inner join breweries br on(bb.brewery_id = br.id) inner join beers_styles bs on(b.id=bs.beer_id) inner join styles s on(bs.style_id = s.id) where b.id = $1', [beer_id])
        .then((result) => {
            res.json(result);
        })
        .catch(next);
});
// POST /api/beer/criteriaSearch
// Retrieve a set of beers that match the provided criteria
// CRITERIA    => ?Comma?-separated property names
// CONSTRAINTS => ?Comma?-separated property values
app.post('/api/beer/criteriaSearch', (req,res,next) => {
    let criteria = req.body.criteria;
    let constraints = req.body.contraints;
});

// GET /api/beer/saved/:userID
// Retrieve the set of beers saved by a specific user (denoted by userID)
app.get('/api/beer/saved/:userID', (req,res,next) => {
    let user_id = req.params.userID;
    db.any('select b.id as beer_id, b.name as beer_name, brewery_db_id, cast(abv as float), cast(ibu as float), label_image_link_medium, label_image_link_icon, brewery_id, brewery_db_breweryid, br.name as brewery_name,br.link as brewery_link, br.icon_image_link as brewery_icon, br.medium_image_link as brewery_medium, br.description as brewery_desc, br.zip as zip, style_id as internal_style_id, brewery_db_styleid::int as style_id, s.name as style_name from beer_saves saves inner join beers b on (saves.beer_id = b.id) inner join beer_links bl on(b.id = bl.beer_id) inner join breweries_beers bb on(b.id=bb.beer_id) inner join breweries br on(bb.brewery_id = br.id) inner join beers_styles bs on(b.id=bs.beer_id) inner join styles s on(bs.style_id = s.id) where saves.user_id = $1', [user_id])
        .then(result => {
            res.json(result);
        })
        .catch(next);
});


/****************************************/
/* <-----  WINE API STARTS HERE  -----> */
/****************************************/

// GET /api/wine
// Retrieve a set of wines
app.get('/api/wine', (req,res,next) => {
    db.any('select w.id as wine_id, w.name as name, wl.snooth_code as snooth_code, wl.region as region, cast (wl.price as float) as price, wl.vintage::int as vintage, wl.type as type, wl.link as link, wl.image_link as image_link, v.name as varietal, v.id as varietal_id, wi.name as winery, wi.id as winery_id, wi.winery_snooth_id as winery_snooth_id from wines w inner join wines_varietals wv on (w.id = wv.wine_id) inner join varietals v on (wv.varietal_id = v.id) inner join wines_wineries ww on (w.id = ww.wine_id) inner join wineries wi on (ww.winery_id = wi.id) inner join wine_links wl on (w.id = wl.wine_id) where w.seed = 0')
        .then((results) => {
            res.json(results);
        })
        .catch(next);
});

// GET /api/wine/specific/:id
// Retrieve a specific wine (denoted by id, which refers to wineID)
app.get('/api/wine/specific/:id', (req,res,next) => {
    let wine_id = req.params.id;
    db.one('select w.id as id, w.name as name, wl.snooth_code as snooth_code, wl.region as region, cast (wl.price as float) as price, wl.vintage::int as vintage, wl.type as type, wl.link as link, wl.image_link as image_link, v.name as varietal, v.id as varietal_id, wi.name as winery, wi.id as winery_id, wi.winery_snooth_id as winery_snooth_id from wines w inner join wines_varietals wv on (w.id = wv.wine_id) inner join varietals v on (wv.varietal_id = v.id) inner join wines_wineries ww on (w.id = ww.wine_id) inner join wineries wi on (ww.winery_id = wi.id) inner join wine_links wl on (w.id = wl.wine_id) where w.id = $1', [wine_id])
        .then((result) => {
            res.json(result);
        })
        .catch(next);
});

// POST /api/wine/criteriaSearch
// Retrieve a set of wines that match the provided criteria
// CRITERIA    => ?Comma?-separated property names
// CONSTRAINTS => ?Comma?-separated property values
app.post('/api/wine/criteriaSearch', (req,res,next) => {
    let criteria = req.body.criteria;
    let constraints = req.body.contraints;
});

// GET /api/wine/saved/:userID
// Retrieve the set of wines saved by a specific user (denoted by userID)
app.get('/api/wine/saved/:userID', (req,res,next) => {
    let user_id = req.params.userID;
    db.any('select w.id as id, w.name as name, wl.snooth_code as snooth_code, wl.region as region, cast (wl.price as float) as price, wl.vintage::int as vintage, wl.type as type, wl.link as link, wl.image_link as image_link, v.name as varietal, v.id as varietal_id, wi.name as winery, wi.id as winery_id, wi.winery_snooth_id as winery_snooth_id from wine_saves saves inner join wines w on (saves.wine_id = w.id) inner join wines_varietals wv on (w.id = wv.wine_id) inner join varietals v on (wv.varietal_id = v.id) inner join wines_wineries ww on (w.id = ww.wine_id) inner join wineries wi on (ww.winery_id = wi.id) inner join wine_links wl on (w.id = wl.wine_id) where saves.user_id = $1', [user_id])
        .then(result => {
            res.json(result);
        })
        .catch(next);
});

/*************************************************/
/* <-----  PARKS/WEATHER API STARTS HERE  -----> */
/*************************************************/

// GET /api/parks_and_weather/:zip
// Retrieve a the forecast and parks for a given zip code
app.get('/api/parks_and_weather/:zip', (req,res,next) => {
    let zip = req.params.zip;
    Promise.all([get_parks(zip), get_weather(zip)])
        .then(result => {
            res.json({
                weather: result[1],
                parks: result[0]
            });
        })
        .catch(next);
});

app.get('/api/park/saved/:userID', (req,res,next) => {
    let user_id = req.params.userID;
    db.any('select p.id as park_id, p.name as name, p.google_id, p.place_id, pl.address, pl.icon, pl.rating, pl.reference, po.location_lat, po.location_lon, pv.viewport_ne_lat, pv.viewport_ne_lon, pv.viewport_sw_lat, pv.viewport_sw_lon from parks_saves saves inner join parks p on (saves.park_id = p.id) inner join park_links pl on (p.id = pl.park_id) inner join park_locations po on (p.id = po.park_id) inner join park_viewports pv on (p.id = pv.park_id) where saves.user_id = $1', [user_id])
        .then(result => {
            res.json(result);
        })
        .catch(next);
});

/****************************************/
/****************************************/
/* <-----  INVITE RESPONSE API   -----> */
/****************************************/
/****************************************/
app.get('/api/respond/accept/:token', (req,res,next) => {
    let token = parseInt(req.params.token);
    console.log(typeof token, token);
    db.one('select i.id as id from invites_tokens it inner join invites i on (it.invite_id = i.id) where it.id = $1', [token])
        .then(result => {
            let invite_id = result.id;
            return db.none('update invites set response = 2 where id = $1', [invite_id])
        })
        .then(() => {
            res.send('<h1>We have recorded you response!  The Picnik Planner will contact you with any further information.</h1>');
        })
        .catch(next);
});

app.get('/api/respond/decline/:token', (req,res,next) => {
    let token = parseInt(req.params.token);
    db.one('select i.id as id from invites_tokens it inner join invites i on (it.invite_id = i.id) where it.id = $1', [token])
        .then(result => {
            let invite_id = result.id;
            return db.none('update invites set response = 3 where id = $1', [invite_id])
        })
        .then(() => {
            res.send('<h1>We have recorded your response.  The Picnik Planner will miss you at the Picnik, but you can always plan another Picnik for another time.</h1>');
        })
        .catch(next);
});


/****************************************/
/****************************************/
/* <-----  USER API STARTS HERE  -----> */
/****************************************/
/****************************************/

// POST /api/user/signup
// Creates new user accounts, returns standard login response
app.post('/api/user/signup', (req,res,next) => {
  let new_account = req.body.signup;
  console.log(new_account);
  let new_tastes = [new_account.taste_profile.piquant.toString(),new_account.taste_profile.meaty.toString(),new_account.taste_profile.sweet.toString(),new_account.taste_profile.salty.toString(),new_account.taste_profile.bitter.toString(),new_account.taste_profile.sour_taste.toString()].join(",");
  let new_cuisines = [new_account.cuisine_profile.mexican.toString(),new_account.cuisine_profile.italian.toString(),new_account.cuisine_profile.mediterranean.toString(),new_account.cuisine_profile.thai.toString(),new_account.cuisine_profile.barbecue.toString(),new_account.cuisine_profile.american.toString(),new_account.cuisine_profile.japanese.toString(),new_account.cuisine_profile.chinese.toString()].join(",");
  let new_wines = [new_account.wine_profile.dry_whites.toString(),new_account.wine_profile.sweet_whites.toString(),new_account.wine_profile.rich_whites.toString(),new_account.wine_profile.light_reds.toString(),new_account.wine_profile.medium_reds.toString(),new_account.wine_profile.bold_reds.toString(),new_account.wine_profile.sparkling.toString()].join(",");
  let new_beers = [new_account.beer_profile.ipa.toString(),new_account.beer_profile.pale_ale.toString(),
  new_account.beer_profile.lager.toString(),new_account.beer_profile.belgian.toString(),new_account.beer_profile.wheat.toString(),new_account.beer_profile.stout.toString(),new_account.beer_profile.porter.toString(),new_account.beer_profile.pilsner.toString(),new_account.beer_profile.saison.toString(),new_account.beer_profile.sours.toString()].join(",");
  db.none('select * from users where user_name = $1 or email = $2', [new_account.user_name, new_account.email])
    .then(() => {
      return bcrypt.hash(new_account.password, 10);
    })
    .then((hash) => {
      return Promise.all([new_account, db.one('insert into users values(default,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning *', [new_account.first_name,new_account.last_name,new_account.user_name,hash,new_account.email,new_account.of_age,new_tastes,new_cuisines,new_wines,new_beers])]);
    })
    .then(validate_login)
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

// POST /api/user/login
// Logs in users, returns standard login response
app.post('/api/user/login', (req,res,next) => {
  let login = req.body.login;
  Promise.all([login, db.one('select * from users where user_name = $1', [login.user_name])])
    .then(validate_login)
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

// AUTHENTICATION MIDDLEWARE
// Authenticate the token provided as part of the request
app.use(function authenticate(req,res,next) {
  db.one('select * from sessions where token=$1', [req.body.login.token])
    .then((data) => {
      return db.one('select id,first_name,last_name,email,user_name from users where id=$1', [data.user_id]);
    })
    .then((data) => {
      req.user = data;
      next();
    })
    .catch((err) => {
      res.send('Unauthenticated user, please log in.');
    });
});

//GET SAVED PICNIKS FOR DISPLAYING ON PROFILE PAGE
app.post('/api/saved_picniks', (req,res,next) => {
    db.any('select id::int as picnik_id, favorites as favorite, date_of, time_of, zip from picniks where user_id = $1', [req.body.login.user_id])
        .then(result => {
            let first_promises = result.map(picnik => {
                return Promise.all([
                    picnik,
                    db.any('select * from picniks_parks where picnik_id = $1', [picnik.picnik_id]),
                    db.any('select * from picniks_recipes where picnik_id = $1', [picnik.picnik_id]),
                    db.any('select * from picniks_beers where picnik_id = $1', [picnik.picnik_id]),
                    db.any('select * from picniks_wines where picnik_id = $1', [picnik.picnik_id])
                ]);
            });
            return Promise.all(first_promises);
        })
        .then(result => {
            let second_promises = result.map(picnik_set => {
                let picnik = picnik_set[0];
                let park_id;
                if (picnik_set[1] && picnik_set[1][0] && picnik_set[1][0].park_id) {
                    park_id = picnik_set[1][0].park_id;
                } else {
                    park_id = 0;
                }
                let recipe_ids = picnik_set[2];
                let recipe_set = Promise.all(recipe_ids.map(recipe => {
                    return db.one('select * from recipes r inner join recipe_links rl on(r.id=rl.recipe_id) where r.id = $1', [recipe.recipe_id])
                        .then(get_recipe_step_1)
                        .then(get_recipe_step_2)
                        .then(create_recipe_object);
                }));
                let beer_ids = picnik_set[3];
                let beer_set = Promise.all(beer_ids.map(beer => {
                    return db.any('select b.id as beer_id, b.name as beer_name, brewery_db_id, cast(abv as float), cast(ibu as float), label_image_link_medium, label_image_link_icon, brewery_id, brewery_db_breweryid, br.name as brewery_name,br.link as brewery_link, br.icon_image_link as brewery_icon, br.medium_image_link as brewery_medium, br.description as brewery_desc, br.zip as zip, style_id as internal_style_id, brewery_db_styleid::int as style_id, s.name as style_name from beers b inner join beer_links bl on(b.id = bl.beer_id) inner join breweries_beers bb on(b.id=bb.beer_id) inner join breweries br on(bb.brewery_id = br.id) inner join beers_styles bs on(b.id=bs.beer_id) inner join styles s on(bs.style_id = s.id) where b.id = $1', [beer.beer_id]);
                }));
                let wine_ids = picnik_set[4];
                let wine_set = Promise.all(wine_ids.map(wine => {
                    return db.any('select w.id as id, w.name as name, wl.snooth_code as snooth_code, wl.region as region, cast (wl.price as float) as price, wl.vintage::int as vintage, wl.type as type, wl.link as link, wl.image_link as image_link, v.name as varietal, v.id as varietal_id, wi.name as winery, wi.id as winery_id, wi.winery_snooth_id as winery_snooth_id from wines w inner join wines_varietals wv on (w.id = wv.wine_id) inner join varietals v on (wv.varietal_id = v.id) inner join wines_wineries ww on (w.id = ww.wine_id) inner join wineries wi on (ww.winery_id = wi.id) inner join wine_links wl on (w.id = wl.wine_id) where w.id = $1', [wine.wine_id]);
                }));
                return Promise.all([
                    picnik,
                    db.any('select p.id as park_id, p.name as name, p.google_id, p.place_id, pl.address, pl.icon, pl.rating, pl.reference, po.location_lat, po.location_lon, pv.viewport_ne_lat, pv.viewport_ne_lon, pv.viewport_sw_lat, pv.viewport_sw_lon from parks p inner join park_links pl on (p.id = pl.park_id) inner join park_locations po on (p.id = po.park_id) inner join park_viewports pv on (p.id = pv.park_id) where p.id = $1', [1]),
                    Promise.all(recipe_set),
                    Promise.all(beer_set),
                    Promise.all(wine_set)
                ]);
            });

            return Promise.all(second_promises);
        })
        .then(result => {
            let picniks = result.map(item => {
                let p = item[0];
                p.park = item[1];
                p.recipes = item[2];
                p.beers = item[3];
                p.wines = item[4];
                return p;
            });
            res.json(picniks);
        })
        .catch(next);
});

app.post('/api/picnik/save', (req, res, next) => {
    db.one('insert into picniks values (default, $1, $2, $3, $4, $5) returning id', [false, "07/04/2017", "3:00 PM", 30324, req.body.login.user_id])
    .then(result => {
        let beer_promises = req.body.beers.map(beer => {
            return db.none('insert into picniks_beers values ($1, $2)', [result.id, beer.beer_id])
        });
        let wine_promises = req.body.wines.map(wine => {
            return db.none('insert into picniks_wines values ($1, $2)', [result.id, wine.wine_id])
        });
        let recipe_promises = req.body.recipes.map(recipe => {
            return db.none('insert into picniks_recipes values ($1, $2)', [result.id, recipe.recipe_id])
        });
        let park_promise = db.none('insert into picniks_parks values ($1, $2)', [result.id, req.body.park.park_id]);
        return Promise.all([
            result.id,
            Promise.all(beer_promises),
            Promise.all(wine_promises),
            Promise.all(recipe_promises),
            park_promise,
        ]);
    })
    .then(result => {
        res.json({
            success: true,
            id: result[0]
        });
    })
    .catch(next);
});

// ADD INVITE
app.post('/api/add_invite', (req,res,next) => {
    let name = req.body.name;
    let email = req.body.email;
    let picnik_id = req.body.picnik_id;
    db.one('select count(*)::int from invites where (picnik_id,name,email) = ($1,$2,$3)', [picnik_id,name, email])
        .then(result => {
            if (result.count === 0) {
                return db.none('insert into invites values (default, $1, $2, $3, 0)', [picnik_id,name, email]);
            } else {
                return;
            }
        })
        .then(result => {
            res.json({
                success: true
            });
        })
        .catch(next);
});

//DELETE INVITE

app.delete('/api/remove_invite', (req,res,next) => {
    let email = req.body.email;
    let picnik_id = req.body.picnik_id;
    let login = req.body.login;
    db.one('delete from invites where picnik_id = $1 and email = $2 returning id', [picnik_id, email])
        .then(result => {
            res.json({
                success: true
            });
        })
        .catch(next);
});

// SEND INVITES
app.post('/api/send_invites', (req,res,next) => {
    let picnik_id = req.body.picnik_id;
    db.any('select * from invites where picnik_id = $1', [picnik_id])
        .then(result => {
            let emails_names = result.map((element) => {
                return {
                    email: element.email,
                    name: element.name
                };
            });
            let tokens = result.map((element) => {
                return db.one('insert into invites_tokens values ($1,default) returning id', [element.id])
            })
            console.log(req.user.id);
            return Promise.all([
                emails_names,
                db.one('select * from users where id = $1', [req.user.id]),
                db.one('select * from picniks where id = $1', [picnik_id]),
                db.one('select * from picniks_parks pp inner join parks p on (pp.park_id = p.id) inner join park_links pl on (p.id = pl.park_id) where pp.picnik_id = $1', [picnik_id]),
                db.any('select * from picniks_recipes pp inner join recipes r on (pp.recipe_id = r.id) inner join recipe_links rl on (r.id = rl.recipe_id) where pp.picnik_id = $1', [picnik_id]),
                db.any('select * from picniks_beers pp inner join beers b on (pp.beer_id = b.id) inner join beer_links bl on (b.id = bl.beer_id) where pp.picnik_id = $1', [picnik_id]),
                db.any('select * from picniks_wines pp inner join wines w on (pp.wine_id = w.id) inner join wine_links wl on (w.id = wl.wine_id) where pp.picnik_id = $1', [picnik_id]),
                Promise.all(tokens)
            ]);
        })
        .then(result => {
            return Promise.mapSeries(result[0], (element, idx) => {
                let greeting = `<h1>${element.name}, ${result[1].name} has invited you to a Picnik!</h1><br><br>`;
                let dateAndTimeString = `<p>Date: ${result[2].date_of}<br>Time: ${result[2].time_of}</p><br><br>`
                let parkString = `<p>Park: ${result[3].name}<br>Address: ${result[3].address}</p><br><br>`;
                let recipeStrings = result[4].map(recipe => {
                    return `<a href="http://google.com">${recipe.name}</a>`
                });
                let recipeString = '<h3>Food</h3><br>' + recipeStrings.join('<br>') + '<br><br>';
                let beerStrings = result[5].map(beer => {
                    return `<a href="http://google.com">${beer.name}</a>`
                });
                let beerString = '<h3>Beer</h3><br>' + beerStrings.join('<br>') + '<br><br>';
                let wineStrings = result[6].map(wine => {
                    return `<a href="http://google.com">${wine.name}</a>`
                });
                let wineString = '<h3>Wine</h3><br>' + wineStrings.join('<br>') + '<br><br>';
                let responseString = `<a href="http://localhost:4000/api/respond/accept/${result[7][idx].id}">Accept</a><br><br><a href="http://localhost:4000/api/respond/decline/${result[7][idx].id}">Decline</a>`
                let body = dateAndTimeString + parkString + recipeString + beerString + wineString + responseString;
                let mailOptions = {
                    from: 'picnik.ian@gmail.com',
                    to: element.email, // list of receivers
                    subject: "You've been invited to a Picnik!", // Subject line
                    html: body, // html body
                };
                return new Promise((resolve,reject) => {
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                            reject(error);
                        } else {
                            console.log('success');
                            console.log('Message %s sent: %s', info.messageId, info.response);
                            resolve(info);
                        }
                    });
                });
            });
        })
        .then((result) => {
            res.json({
                success: true
            });
        })
        .catch(next);
});

/************************************/
/************************************/
/* <-----  API LISTEN BELOW  -----> */
/************************************/
/************************************/

app.listen(4000, () => {
    console.log('Listening on port 4000');
});



/********************/
/********************/
/* HELPER FUNCTIONS */
/********************/
/********************/

// VALIDATE LOGIN
// Verify that login attempt is valid
function validate_login(attempted) {
  let data = attempted[1];
  let attempt = attempted[0];
  // GET /api/something

  return bcrypt.compare(attempt.password, data.password)
    .then((res) => {
      if (res) {
        let x = Date.now();
        let y = x+21600000;
        return db.one('insert into sessions values(default,$1,$2,$3,$4) returning *', [uuid.v4(),x,y,data.id])
      } else {
        reject('Invalid login attempt');
      }
    })
    .then((result) => {
      return {
        username: data.user_name,
        first: data.first_name,
        last: data.last_name,
        token: result.token,
        id: data.id
      };
    })
    .catch((err) => {throw err});
}

function get_recipe_step_1(recipe) {
    return Promise.all([
        recipe,
        db.any('select ingredient_id from recipes_ingredients where recipe_id = $1', [recipe.id]),
        db.any('select course_id from recipes_courses where recipe_id = $1', [recipe.id]),
        db.any('select cuisine_id from recipes_cuisines where recipe_id = $1', [recipe.id])
    ]);
}

function get_recipe_step_2(recipe_info) {
    let recipe = recipe_info[0];
    recipe.f_sweet = parseFloat(recipe.f_sweet);
    recipe.f_meaty = parseFloat(recipe.f_meaty);
    recipe.f_salty = parseFloat(recipe.f_salty);
    recipe.f_piquant = parseFloat(recipe.f_piquant);
    recipe.f_bitter = parseFloat(recipe.f_bitter);
    recipe.f_sour = parseFloat(recipe.f_sour);
    recipe.rating = parseInt(recipe.rating);
    let ingredient_set = recipe_info[1].map((ingredient) => {
        return db.one('select * from ingredients where id = $1', [ingredient.ingredient_id]);
    });
    let course_set = recipe_info[2].map((course) => {
        return db.one('select * from courses where id = $1', [course.course_id]);
    });
    let cuisine_set = recipe_info[3].map((cuisine) => {
        return db.one('select * from cuisines where id = $1', [cuisine.cuisine_id]);
    });
    return Promise.all([
        recipe,
        Promise.all(ingredient_set),
        Promise.all(course_set),
        Promise.all(cuisine_set)
    ]);
}

function create_recipe_object(recipe) {
    let r = recipe[0];
    r.ingredients = recipe[1];
    r.courses = recipe[2];
    r.cuisines = recipe[3];
    return r;
}

function get_parks(zip) {
    zip = parseInt(zip);
    let parks_request_options = {
        uri: `https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyApxzwzxHelwZIV4JIkWmcOjqA9ISieZm4&type=park&query=${zip}`,
        json: true
    };
    return db.one('select count(*)::int from parks_zips where zip = $1', [zip])
        .then(result => {
            if (result.count === 0) {
                return rp(parks_request_options)
                    .then(parks_request_result => {
                        let park_inserts = parks_request_result.results.map((park) => {
                            return db.one('select count(*)::int from parks where place_id = $1', [park.place_id])
                                .then(park_result => {
                                    if (park_result.count === 0) {
                                        return db.one('insert into parks values(default,$1,$2,$3) returning id', [park.name, park.id, park.place_id])
                                            .then(new_park => {
                                                return Promise.all([
                                                    db.none('insert into park_links values($1,$2,$3,$4,$5,$6,$7,$8,$9)', [new_park.id, park.formatted_address, park.icon, park.rating, park.reference, (park.photos && park.photos.length > 0 && park.photos[0].photo_reference) || "", (park.photos && park.photos.length > 0 && park.photos[0].height) || 0, (park.photos && park.photos.length > 0 && park.photos[0].width) || 0, (park.photos && park.photos.length > 0 && park.photos[0].html_attributions && park.photos[0].html_attributions.length > 0 && park.photos[0].html_attributions[0]) || ""]),
                                                    db.none('insert into park_locations values($1,$2,$3)', [new_park.id, (park.geometry && park.geometry.location && park.geometry.location.lat) || 0, (park.geometry && park.geometry.location && park.geometry.location.lng) || 0]),
                                                    db.none('insert into park_viewports values($1,$2,$3,$4,$5)', [new_park.id, (park.geometry && park.geometry.viewport && park.geometry.viewport.northeast.lat) || 0, (park.geometry && park.geometry.viewport && park.geometry.viewport.northeast.lng) || 0, (park.geometry && park.geometry.viewport && park.geometry.viewport.southwest.lat) || 0, (park.geometry && park.geometry.viewport && park.geometry.viewport.southwest.lng) || 0])
                                                ]);
                                            })
                                            .then(promise_set => {
                                                return db.one('select id from parks where place_id = $1', [park.place_id]);
                                            });
                                    } else {
                                        return db.one('select id from parks where place_id = $1', [park.place_id]);
                                    }
                                })
                                .then(park_object => {
                                    return db.none('insert into parks_zips values($1,$2)', [park_object.id, zip]);
                                })
                        });
                        return Promise.all(park_inserts);
                    })
                    .then(big_promise_set => {
                        return db.any('select p.id as park_id, p.name as name, p.google_id, p.place_id, pz.zip, pl.address, pl.icon, pl.rating, pl.reference, po.location_lat, po.location_lon, pv.viewport_ne_lat, pv.viewport_ne_lon, pv.viewport_sw_lat, pv.viewport_sw_lon from parks_zips pz inner join parks p on (pz.park_id = p.id) inner join park_links pl on (p.id = pl.park_id) inner join park_locations po on (p.id = po.park_id) inner join park_viewports pv on (p.id = pv.park_id) where pz.zip = $1', [zip]);
                    });
            } else {
                return db.any('select p.id as park_id, p.name as name, p.google_id, p.place_id, pz.zip, pl.address, pl.icon, pl.rating, pl.reference, po.location_lat, po.location_lon, pv.viewport_ne_lat, pv.viewport_ne_lon, pv.viewport_sw_lat, pv.viewport_sw_lon from parks_zips pz inner join parks p on (pz.park_id = p.id) inner join park_links pl on (p.id = pl.park_id) inner join park_locations po on (p.id = po.park_id) inner join park_viewports pv on (p.id = pv.park_id) where pz.zip = $1', [zip]);
            }
        });
}

function get_weather(zip) {
    let weather_request_options = {
        uri: `http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zip},us&APPID=3569484daaaf0e9db08bd8a0189f6692`,
        json: true
    };
    let today = new Date();
    let date_of = [today.getMonth().toString(), today.getDate().toString(), today.getFullYear().toString()].join(",");
    return db.one('select count(*)::int from weather where (zip, date_of) = ($1,$2)', [zip, date_of])
        .then(result => {
            if (result.count === 0) {
                // go get the data
                return rp(weather_request_options)
                    .then(result => {
                        return db.one('insert into weather values ($1,$2,$3) returning forecast', [zip, result, date_of]);
                    });
            } else {
                // pull the data from the db
                return db.one('select forecast from weather where (zip, date_of) = ($1,$2)', [zip, date_of]);
            }
        })
        .then(result => {
            return result.forecast;
        });
}
