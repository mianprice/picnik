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
const pgp = require('pg-promise')({
  promiseLib: Promise
});
const config = require('./config');
const db = pgp(config.db);
const app = express();
app.use(bodyParser.json());
app.use(cors());



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
    db.any('select * from recipes r inner join recipe_links rl on(r.id=rl.recipe_id) order by id limit 100 offset 100')
        .then((results) => {
            let all_recipes = results.map((recipe) => {
                return Promise.all([
                    recipe,
                    db.any('select ingredient_id from recipes_ingredients where recipe_id = $1', [recipe.id]),
                    db.any('select course_id from recipes_courses where recipe_id = $1', [recipe.id]),
                    db.any('select cuisine_id from recipes_cuisines where recipe_id = $1', [recipe.id])
                ]);
            });
            return Promise.all(all_recipes);
        })
        .then((results) => {
            let recipes_with_other_ids = results.map((recipe_info) => {
                let recipe = recipe_info[0];
                recipe.f_sweet = parseFloat(recipe.f_sweet);
                recipe.f_meaty = parseFloat(recipe.f_meaty);
                recipe.f_salty = parseFloat(recipe.f_salty);
                recipe.f_piquant = parseFloat(recipe.f_piquant);
                recipe.f_bitter = parseFloat(recipe.f_bitter);
                recipe.f_sour = parseFloat(recipe.f_sour);
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
            });
            return Promise.all(recipes_with_other_ids);
        })
        .then((results) => {
            let recipes = results.map((recipe) => {
                let r = recipe[0];
                r.ingredients = recipe[1];
                r.courses = recipe[2];
                r.cuisines = recipe[3];
                return r;
            });
            return recipes;
        })
        .then((results) => {
            res.json(results);
        })
        .catch(next);
});

// GET /api/recipe/specific/:id
// Retrieve a specific recipe (denoted by id, which refers to recipeID)
app.get('/api/recipe/specific/:id', (req,res,next) => {
    let recipe_id = req.params.id;
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
});


/****************************************/
/* <-----  BEER API STARTS HERE  -----> */
/****************************************/

// GET /api/beer
// Retrieve a set of beers
app.get('/api/beer', (req,res,next) => {
    db.any('select b.id as beer_id, b.name as beer_name, brewery_db_id, abv, ibu, label_image_link_medium, label_image_link_icon, brewery_id, brewery_db_breweryid, br.name as brewery_name,br.link as brewery_link, br.icon_image_link as brewery_icon, br.medium_image_link as brewery_medium, br.description as brewery_desc, br.zip as zip, style_id as internal_style_id, brewery_db_styleid::int as style_id, s.name as style_name from beers b inner join beer_links bl on(b.id = bl.beer_id) inner join breweries_beers bb on(b.id=bb.beer_id) inner join breweries br on(bb.brewery_id = br.id) inner join beers_styles bs on(b.id=bs.beer_id) inner join styles s on(bs.style_id = s.id) order by b.id limit 100 offset 100')
        .then((results) => {
            res.json(results);
        })
        .catch(next);
});

// GET /api/beer/specific/:id
// Retrieve a specific beer (denoted by id, which refers to beerID)
app.get('/api/beer/specific/:id', (req,res,next) => {
    let beer_id = req.params.id;
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
});


/****************************************/
/* <-----  WINE API STARTS HERE  -----> */
/****************************************/

// GET /api/wine
// Retrieve a set of wines
app.get('/api/wine', (req,res,next) => {

});

// GET /api/wine/specific/:id
// Retrieve a specific wine (denoted by id, which refers to wineID)
app.get('/api/wine/specific/:id', (req,res,next) => {
    let wine_id = req.params.id;
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
  let new_tastes = [new_account.taste_profile.piquant.toString(),new_account.taste_profile.meaty.toString(),new_account.taste_profile.sweet.toString(),new_account.taste_profile.salty.toString(),new_account.taste_profile.bitter.toString(),new_account.taste_profile.sour_taste.toString()].join(",");
  let new_cuisines = [new_account.cuisine_profile.mexican.toString(),new_account.cuisine_profile.italian.toString(),new_account.cuisine_profile.mediterranean.toString(),new_account.cuisine_profile.thai.toString(),new_account.cuisine_profile.barbecue.toString(),new_account.cuisine_profile.american.toString(),new_account.cuisine_profile.japanese.toString(),new_account.cuisine_profile.chinese.toString()].join(",");
  let new_wines = [new_account.wine_profile.chardonnay.toString(),new_account.wine_profile.cabernet.toString(),new_account.wine_profile.malbec.toString(),new_account.wine_profile.pinot_noir.toString(),new_account.wine_profile.champagne.toString(),new_account.wine_profile.riesling.toString(),new_account.wine_profile.rose.toString(),new_account.wine_profile.barbera.toString()].join(",");
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

app.post('/api/picnik/save', (req, res, next) => {
    db.one('insert into picniks values (default, $1, $2, $3, $4) returning id', [false, "07/04/2017", 30324, req.body.login.user_id])
    .then(result => {
        let beer_promises = req.body.beers.map(beer_id => {
            return db.none('insert into picniks_beers values ($1, $2)', [result.id, beer_id])
        });
        let wine_promises = req.body.wines.map(wine_id => {
            return db.none('insert into picniks_wines values ($1, $2)', [result.id, wine_id])
        });
        let recipe_promises = req.body.recipes.map(recipe => {
            return db.none('insert into picniks_recipes values ($1, $2)', [result.id, recipe.id])
        });
        let park_promises = req.body.parks.map(park_id => {
            return db.none('insert into picniks_parks values ($1, $2)', [result.id, park_id])
        });
        return Promise.all([
            Promise.all(beer_promises),
            Promise.all(wine_promises),
            Promise.all(recipe_promises),
            Promise.all(park_promises),
        ]);
    })
    .then(result => {
        res.json({
            success: true
        });
    })
    .catch(next);
})

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
