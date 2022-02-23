const express = require("express");
const app = express();
const port = 3000;
const db = require("./database");

app.get("/feed/", (req, res) => {
  db.dbConnection.query("SELECT * FROM messages", (err, data) => {
    if (err) throw err;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(data);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`server connected to port: ${port}`);
});
