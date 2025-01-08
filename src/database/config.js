const mysql = require('mysql2/promise'); 

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "crud_db",
};


const pool = mysql.createPool(dbConfig);

module.exports = pool;
