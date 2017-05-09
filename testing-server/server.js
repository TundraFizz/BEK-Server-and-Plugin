var express    = require("express");         // Define the web framework
var app        = module.exports = express(); // Define the application
app.use(express.static("./static"));         // Define the static directory
app.listen(80);                              // Start the server
