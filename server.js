var bodyParser = require("body-parser");          // Allows you to read POST data
var express    = require("express");              // Express
var cors       = require("cors");                 // CORS
var app        = module.exports = express();      // Define the application
app.use(cors());                                  //
app.use(bodyParser.urlencoded({extended: true})); // Setting for bodyParser
app.use(bodyParser.json());                       // Setting for bodyParser
app.use(express.static("./static"));              // Define the static directory
app.set("views", "./views");                      // Define the views directory
app.options("*", cors());                         // Allow CORS
// require("./node/func-global.js");              // Include global functions first
require("./node/post.js");                        // Include POST requests second
// require("./node/routes.js")(app);              // Include web routes third
// require("./node/routes-404.js")(app);          // Include 404 page last

app.listen(9001);                                 // Start the server

// USEFUL DEBUG STUFF
// http://www.http-post.com/
// myName   = Tundra Fizz
// myRegion = NA
