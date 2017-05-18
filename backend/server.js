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


// POST /api/user/signup
// Creates new user accounts, returns standard login response
app.post('/api/user/signup', (req,res,next) => {
  let new_account = req.body.signup;
  db.none('select * from users where user_name = $1 or email = $2', [new_account.user_name,new_account.email])
    .then(() => {
      return bcrypt.hash(new_account.password, 10);
    })
    .then((hash) => {
      return Promise.all([new_account, db.one('insert into users values(default,$1,$2,$3,$4,$5) returning *', [new_account.first_name,new_account.last_name,new_account.user_name,hash,new_account.email,new_account.of_age])]);
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
