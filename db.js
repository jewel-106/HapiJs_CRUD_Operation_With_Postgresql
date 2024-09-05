

//const pg = require('pg-promise');
import pgPromise from 'pg-promise';

const pg = pgPromise();

const db = pg({
    host:'localhost',
    port:5432,
    database:'test',
    user:'sample',
    password:'1234'
});

//module.exports = db;
export default db;