var fs         = require("fs");                   // File system
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

// Get the port number from the config file and start the server
var port = JSON.parse(fs.readFileSync("config.json"))["port"];
app.listen(port);



var abc = require("./node/scrape-hotels.js");
var scrapeHotels = new abc();
scrapeHotels.YoloSwag();
