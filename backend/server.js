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
  let new_tastes = [new_account.piquant.toString(),new_account.meaty.toString(),new_account.sweet.toString(),new_account.salty.toString(),new_account.bitter.toString(),new_account.sour_taste.toString()].join(",");
  let new_cuisines = [new_account.mexican.toString(),new_account.italian.toString(),new_account.greek.toString(),new_account.hungarian.toString(),new_account.swedish.toString(),new_account.american.toString(),new_account.japanese.toString(),new_account.chinese.toString()].join(",");
  let new_wines = [new_account.chardonnay.toString(),new_account.cabernet.toString(),new_account.malbec.toString(),new_account.pinot_noir.toString(),new_account.champagne.toString(),new_account.riesling.toString(),new_account.rose.toString(),new_account.barbera.toString()].join(",");
  let new_beers = [new_account.ipa.toString(),new_account.pale_ale.toString(),new_account.lager.toString(),new_account.tripel.toString(),new_account.lambic.toString(),new_account.stout.toString(),new_account.porter.toString(),new_account.doppelbock.toString(),new_account.gose.toString(),new_account.sour.toString()].join(",");
  db.none('select * from users where user_name = $1 or email = $2', [new_account.user_name,new_account.email])
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
  db.one('select * from sessions where token=$1', [req.body.token])
    .then((data) => {
      return db.one('select id,first_name,last_name,email,user_name from users where id=$1', [data.u_id])
    })
    .then((data) => {
      req.user = data;
      next();
    })
    .catch((err) => {
      res.send('Unauthenticated user, please log in.');
    });
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
