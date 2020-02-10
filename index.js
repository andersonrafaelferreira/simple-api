var express = require("express")
var nunjucks = require("nunjucks")

var app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

const users = []

app.post('/geo', (req, res) => {
 const data = req.body;

 users.push(data)
 console.log(users);

//   return res.json(data);
    return res.redirect('/');
})

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true
});

app.set("view engine", "njk")

app.get('/', function(req, res) {
   res.render('list', {
       users
   })
});

app.get('/new', function(req, res) {
   res.render('new');
});

app.post('/create', function(req, res) {

    users.push(req.body.user)

   return res.redirect('/');
});



app.listen(3000)