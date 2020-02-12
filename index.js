var express = require("express");
var nunjucks = require("nunjucks");

var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const users = [];

app.post("/geo", (req, res) => {
  const user = req.body;

  users.push(user);
  users.reverse();
  console.log(users);

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
