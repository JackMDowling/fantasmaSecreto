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

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT,");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

app.get("/feed/", (req, res) => {
  db.dbConnection.query(
    "SELECT * FROM messages ORDER  BY id DESC LIMIT 5",
    (err, data) => {
      if (err) throw err;
      res.send(data);
      res.end();
    }
  );
});

app.post("/submit/", (req, res) => {
  let { username, text, img } = req.body;
  db.dbConnection.query(
    "INSERT INTO messages (username, text, img) VALUES (?, ?, ?);",
    [username, text, img],
    (err, data) => {
      if (err) throw err;
    }
  );
});

app.put("/upvote/", (req, res) => {
  let id = Object.keys(req.body);
  id = Number(id[0]);
  console.log(id);
  db.dbConnection.query(
    "UPDATE chat.messages SET upvotes = upvotes + 1 WHERE id = ?;",
    [id]
  );
});

app.listen(port, () => {
  console.log(`server connected to port: ${port}`);
});
