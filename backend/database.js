const mysql = require("mysql");

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chat",
});
dbConnection.connect();

exports.dbConnection = dbConnection;
