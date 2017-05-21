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

// <-----  SETUP ENDS HERE  ----->


// <---- POST /api/user/signup ----->
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

// <----- POST /api/user/login ----->
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

// <----- AUTHENTICATION MIDDLEWARE ----->
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




// <-----  APP LISTEN BELOW  ----->
app.listen(4000, () => {
    console.log('Listening on port 4000');
});


//////////////////////
// HELPER FUNCTIONS //
//////////////////////

// Verify that login attempt is valid
function validate_login(attempted) {
  let data = attempted[1];
  let attempt = attempted[0];
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
