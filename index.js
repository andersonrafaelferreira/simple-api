var express = require("express");
var puppeteer = require("puppeteer");
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

app.post("/demora", async function(req, res) {

  const details = req.body;

  const result = await new Promise((resolve) => setTimeout(resolve, 5000)); 


  return res.send({ demora: "5 segundos", result, details });
});

app.get("/maps/:from/:to", async(req, res) => {
  let data = {};

  const { from, to} = req.params;

  console.log(from, to);

  let URL = `https://www.google.com/maps/dir/${from},+Rio+Claro+-+SP/${to},+Rio+Claro+-+SP/`;
    console.log(URL);

    try{
      // const browser = await puppeteer.launch();
      const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});

      const page = await browser.newPage();
      await page.goto(URL);
  
      // console.log(await page.content());
  
      const distance = await page.evaluate(() => document.querySelector(".section-directions-trip-secondary-text").innerText);
  
      if(distance){
        console.log("distance", distance);
  
        await browser.close();
    
        const [km] = distance.split(" "); 
    
        console.log("km", km)
    
        data.distance = km;
      }
    }
      
    catch(err){
      console.log(err);
    } 

  res.json({status: data});
})
app.post("/maps", async(req, res) => {
  let data = {};

  const { url } = req.body;

  // let URL = `https://www.google.com/maps/dir/${from},+Rio+Claro+-+SP/${to},+Rio+Claro+-+SP/`;
    console.log(url);

    try{
      // const browser = await puppeteer.launch();
      const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});

      const page = await browser.newPage();
      await page.goto(url);
  
      // console.log(await page.content());
  
      const distance = await page.evaluate(() => document.querySelector(".section-directions-trip-secondary-text").innerText);
      const alternative = await page.evaluate(() => document.querySelector(".section-directions-trip-distance").innerText);
  
      if(alternative){
        console.log("if alternative", alternative);
      }
      if(distance){
        console.log("distance", distance);
  
        await browser.close();
    
        const [km] = distance.split(" "); 
    
        console.log("km", km)
    
        data.distance = km;
      }else{
        console.log("alternative else", alternative)
        await browser.close();
    
        const [km] = alternative.split(" "); 
    
        console.log("km", km)
    
        data.distance = km;
      }
      res.json(data);
    }

    catch(err){
      console.log("deu merda", err);
      res.status(400).send({error: "Cannot read property 'innerText' of null"})
    } 

})

// production;
app.listen(process.env.PORT);

// localhost
// app.listen(3000);
