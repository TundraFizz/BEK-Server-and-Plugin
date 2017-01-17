module.exports = function(app){
  //////////////////////////////////
  // Include local libraries here //
  //////////////////////////////////
  var lib = require("./func-parser.js");
  var mysql = require("mysql");
  var fs = require("fs");

  var desktop = fs.readFileSync("static/navbar.html", "utf8");
  var mobile  = fs.readFileSync("static/navbar-mobile.html", "utf8");

  ///////////
  // Index //
  ///////////
  app.get("/", function(req, res){
    console.log("Index");
    // MySQL Test
    var connection = mysql.createConnection({
      host     : "localhost",
      user     : "root",
      password : "",
      database : "fek"
    });

    sql = "SELECT * FROM users";
    connection.query(sql, function(err, rows){
      // console.log(rows);
    });

    var string = "A string from the server.";
    var people = [
      {name: "Adam", age: 10},
      {name: "Bob",  age: 12},
      {name: "Carl", age: 15}
    ];

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
}
