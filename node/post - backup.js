module.exports = function(app){
  //////////////////////////////////
  // Include local libraries here //
  //////////////////////////////////
  var mysql = require("mysql");

  var connection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "Fizz",
    database : "fek"
  });

  var obj = {
    connection = con,
    fullName : function() {
       return this.firstName + " " + this.lastName;}
  };

  ////////////////
  // add-person //
  ////////////////
  app.post("/database", function(req, res){
    var response        = {};
    response["records"] = {};
    response["tweets"]  = {};
    response["events"]  = {};
    var data = req.body;

    if(data.action == "GetMemberData"){
      var myName   = data.myName;
      var myRegion = data.myRegion;
      var users    = data.users;
      var regions  = data.regions;
      var table    = "users";

      // If the user is logged in
      if(myName != null){
        if(myRegion == "EU Oeste" ||
           myRegion == "EU Ouest" ||
           myRegion == "Eu Ovest" ||
           myRegion == "Westeuropa")
          myRegion = "EUW";

        // Use Name/Region to get Boards ID/Name/Region
        var uri = `http://boards.na.leagueoflegends.com/api/users/${myRegion}/${myName}`;
        encodeURI(uri);
        // curl_init(uri);
        // curl_setopt
        // var result = curl_exec
        // result = json_decode(result)
        // curl_close

        var boardsId     = result["id"];
        var boardsName   = result["name"];
        var boardsRegion = result["realm"];

        // Check if the Boards ID exists in the database
        var sql = `SELECT * FROM ${table} WHERE boards_id='${boardsId}'`;

        connection.query(sql, function(err, rows){
          // If there are no rows, then that means the user doesn't
          // exist and needs to be inserted into the database
          var sql = `INSERT INTO ${table} (boards_id) VALUES ('${boardsId}')`;

          connection.query(sql, function(err, rows){
            // No idea what these are for
            // $response["records"]["top"]    = "14px";
            // $response["records"]["color1"] = "#008000";
            // $response["records"]["color2"] = "#006400";
            // $response["records"]["font"]   = "#FFFFFF";

            // Update FEK database
            var lastLogin = new Date();
            var sql = `UPDATE ${table} SET username='${boardsName}', region='${boardsRegion}', last_login='${lastLogin}' WHERE boards_id='${boardsId}'`;
            connection.query(sql, function(err, rows){
              PlaceholderFunction();
            });
          });
        });
      }

      // Get the version number
      // TODO

      // Get FEK Events announcement
      // TODO

      // Get user information
      if(users != null){
        var sql   = `SELECT username, region, boards_id, staff, title, badge FROM ${table} WHERE`;
        var first = true;

        for(var i = 0; i < users.length; i++){
          if(first){
            first = false;
            sql += ` username='${users[i]}' AND region='${regions[i]}'`;
          }
          else{
            sql += ` OR username='${users[i]}' AND region='${regions[i]}'`;
          }
        }

        connection.query(sql, function(err, rows){
          for(var i = 0; i < rows.length; i++){
            var obj = rows[i];
            var u   = obj.username;
            var r   = obj.region;
            response["records"][u]                 = {};
            response["records"][u][r]              = {};
            response["records"][u][r]["boards_id"] = obj.boards_id;
            response["records"][u][r]["staff"]     = obj.staff;
            response["records"][u][r]["title"]     = obj.title;
            response["records"][u][r]["badge"]     = obj.badge;

            response["records"][u][r]["avatar"]    = "http://localhost:9001/avatars/NA/33897078.gif";
          }

          res.json(response);
        });
      }

      // Get Twitter information
      // TODO

      // Send data back to client
      // TODO
    }

    // res.end("name");
    // res.json(name);
  });
}

// ACTIONS
// GetOnlyAvatars
//
//
//
