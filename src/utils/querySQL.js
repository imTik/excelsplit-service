const mysql = require('mysql');
const config = require('../config/defaultConfig');

const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
});

function querySQL(sql) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err);

      connection.query(sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
        connection.release();
      });
      
    });
  });
}

module.exports = querySQL;
