const Promise = require ('bluebird');
const bcrypt = require ('bcrypt');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const express = require ('express');
const uuid = require ('uuid');
const pgp = require('pg-promise')({
  promiseLib: Promise
});
const db = pgp({
    database: 'picnik_db'
});
const app = express();
app.use(bodyParser.json());
app.use(cors());

// <-----  SETUP ENDS HERE  ----->







// <-----  APP LISTEN BELOW  ----->
app.listen(4000, () => {
    console.log('Listening on port 4000');
});
