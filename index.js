var express = require("express");
var nunjucks = require("nunjucks");

require('dotenv').config()


var cors = require("cors");

var app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const users = [];

app.post("/geo", (req, res) => {
  const item = req.body;

  let user = item[0];

  console.log(user, "user");

  user.createdAt = new Date().toLocaleTimeString();

  users.push(user);
  users.reverse();
  // console.log(users, "users");

  //return res.json(data);

  // return res.send({ user });
  return res.send({ user });

  // local view
  // return res.redirect("/");
});

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

app.set("view engine", "njk");

app.get("/", function(req, res) {
  res.render("list", {
    users
  });
});

app.get("/new", function(req, res) {
  res.render("new");
});

app.post("/create", function(req, res) {
  users.push(req.body.user);

  return res.redirect("/");
});

app.post("/app", function(req, res) {
  const details = req.body;

  let user = details;

  console.log(details, "details");
  console.log(user, "user");

  users.push(user);
  users.reverse();

  return res.send({ details });
});

// production;
app.listen(process.env.PORT);

// localhost
// app.listen(3000);
