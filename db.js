const { Client } = require("pg");
const Pool = require('pg').Pool


let db = new Client({ connectionString: "postgresql:///creditCard" });

db.connect();


module.exports = db