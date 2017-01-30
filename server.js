var bodyParser = require("body-parser");          // Allows you to read POST data
var express    = require("express");              // Express
var cors       = require("cors");                 // CORS
var app        = module.exports = express();      // Define the application

app.use(cors());                                  // Enable all CORS requests
app.use(bodyParser.urlencoded({extended: true})); // Setting for bodyParser
app.use(bodyParser.json());                       // Setting for bodyParser
app.use(express.static("./static"));              // Define the static directory
app.set("views", "./views");                      // Define the views directory
app.options("*", cors());                         // Allow CORS
require("./node/post.js");                        // Include POST requests second
require("./node/routes.js");                      // Include web routes third

app.listen(9001);                                 // Start the server

// USEFUL DEBUG STUFF
// http://www.http-post.com/
// http://localhost:9001/database
// myName   = Tundra Fizz
// myRegion = NA
