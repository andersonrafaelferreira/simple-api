var express = require("express");
var nunjucks = require("nunjucks");

var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const users = [];

app.post("/geo", (req, res) => {
  const user = req.body;

  console.log(user[0], "user");

  user[0].createdAt = new Date().toLocaleTimeString();

  users.push(user[0]);
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

// production;
app.listen(process.env.PORT);

// localhost
// app.listen(3000);
