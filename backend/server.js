const express = require("express");
const app = express();
const port = 3000;
const db = require("./database");
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/feed/", (req, res) => {
  db.dbConnection.query(
    "SELECT * FROM messages ORDER  BY id DESC LIMIT 5",
    (err, data) => {
      if (err) throw err;
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(data);
      res.end();
    }
  );
});

app.post("/submit/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log("post made it so far");
  console.log(req.body);
  let { username, text, img } = req.body;
  db.dbConnection.query(
    "INSERT INTO messages (username, text, img) VALUES (?, ?, ?);",
    [username, text, img],
    (err, data) => {
      if (err) throw err;
    }
  );
});

app.listen(port, () => {
  console.log(`server connected to port: ${port}`);
});
