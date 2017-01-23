//////////////////////////////////
// Include local libraries here //
//////////////////////////////////
var app = require("../server.js");
var fs = require("fs");

var desktop = fs.readFileSync("static/navbar.html", "utf8");
var mobile  = fs.readFileSync("static/navbar-mobile.html", "utf8");

///////////
// Index //
///////////
app.get("/", function(req, res){
  console.log("Index");

  res.render("index.ejs", {
    desktop: desktop,
    mobile: mobile
  });
});

///////////
// About //
///////////
app.get("/about", function(req, res){
  res.render("about.ejs", {
    desktop: desktop,
    mobile: mobile});
});

/////////
// Pax //
/////////
app.get("/pax", function(req, res){
  res.render("pax.ejs", {
    desktop: desktop,
    mobile: mobile});
});

/////////
// FEK //
/////////
app.get("/fek", function(req, res){
  res.render("fek.ejs", {
    desktop: desktop,
    mobile: mobile});
});

//////////////
// Projects //
//////////////
app.get("/projects", function(req, res){
  res.render("projects.ejs", {
    desktop: desktop,
    mobile: mobile});
});

///////////////////////
// Change FEK Avatar //
///////////////////////
app.get("/change", function(req, res){
  res.render("change.ejs");
});
