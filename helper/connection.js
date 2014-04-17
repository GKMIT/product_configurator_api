var mysql      = require('mysql');
  testConnection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "",
    database : "cg_test"
  });
  testConnection.connect();

  module.exports = testConnection;