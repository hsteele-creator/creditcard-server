const { Client } = require("pg");
const Pool = require('pg').Pool


let db = new Client({ connectionString: "postgres://pvruejpx:0mDe2RUKhdctlGSUHKMViNGC_GTAeZMj@suleiman.db.elephantsql.com/pvruejpx" });

db.connect();


module.exports = db

// postgresql:///creditCard