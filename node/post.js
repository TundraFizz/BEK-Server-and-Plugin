var app     = require("../server.js");
var request = require("request");
var mysql   = require("mysql");
var obj     = new Obj;

function Obj(){
  this.conn = mysql.createConnection({host     : "localhost",
                                      user     : "root",
                                      password : "Fizz",
                                      database : "fek"});
  this.response            = {};
  this.response["records"] = {};
  this.response["tweets"]  = {};
  this.response["events"]  = {};
  this.response["version"] = {};
}

Obj.prototype.GetBoardsInfo = function(name, region, callback){
  // Get JSON data from Riot's Boards API
  var uri = `http://boards.na.leagueoflegends.com/api/users/${region}/${name}`;
  uri = encodeURI(uri);

  var options = {
    url     : uri,
    json    : true,
    headers : {
      "User-Agent": "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.9) Gecko/20071025 Firefox/2.0.0.9"
    }
  };

  request(options, function(err, res, body){
    callback(body);
  });
}

Obj.prototype.CheckIfUserExists = function(callback){
  // Check if the Boards ID exists in the database
  var self = this;
  var sql = `SELECT * FROM users WHERE boards_id=?`;
  var args = [self.boardsId];

  self.conn.query(sql, args, function(err, rows){
    if(rows.length == 0)
      self.InsertUser(function(){callback()}); // Insert new user into database
    else
      self.UpdateUser(function(){callback()}); // Update existing user
  });
}

Obj.prototype.InsertUser = function(callback){
  var self = this;
  var sql = `INSERT INTO users (boards_id) VALUES (?)`;
  var args = [self.boardsId];

  self.conn.query(sql, args, function(err, rows){
    self.UpdateUser(function(){callback()});
  });
}

Obj.prototype.UpdateUser = function(callback){
  var self = this;
  var lastLogin = new Date();
  var sql = `UPDATE users SET username=?, region=?, last_login=? WHERE boards_id=?`;
  var args = [self.boardsName, self.boardsRegion, lastLogin, self.boardsId];
  self.conn.query(sql, args, function(err, rows){
    self.GetVersion(function(){callback()});
  });
}

Obj.prototype.GetVersion = function(callback){
  var self = this;
  var sql = `SELECT version, details FROM version`;
  var args = [];
  self.conn.query(sql, args, function(err, rows){
    self.response["version"] = rows;
    self.GetEvent(function(){callback()});
  });
}

Obj.prototype.GetEvent = function(callback){
  var self = this;
  var sql = `SELECT message, stream, thread, start, end FROM event;`;
  var args = [];
  self.conn.query(sql, args, function(err, rows){
    self.response["events"] = rows;
    callback();
  });
}

app.post("/database", function(req, res){
  if(req.body.action == "GetMemberData"){} // Move each into their own app.post

  obj.myName   = req.body.myName;
  obj.myRegion = req.body.myRegion;
  obj.users    = req.body.users;
  obj.regions  = req.body.regions;

  // If the user is logged in
  if(obj.myName != null){
    console.log(obj.myName, obj.myRegion);

    if(obj.myRegion == "EU Oeste" ||
       obj.myRegion == "EU Ouest" ||
       obj.myRegion == "Eu Ovest" ||
       obj.myRegion == "Westeuropa")
      obj.myRegion = "EUW";

    obj.GetBoardsInfo(obj.myName, obj.myRegion, function(data){
      obj.boardsId     = data["id"];
      obj.boardsName   = data["name"];
      obj.boardsRegion = data["realm"];

      obj.CheckIfUserExists(function(){
        console.log(obj.response);
        res.json(obj.response);
      });
    });
  }
  else{
    obj.GetVersion();
  }

  // Get Twitter information
  // TODO

  // Send data back to client
  // TODO
});

app.post("/placeholder", function(req, res){
  console.log("placeholder");
  console.log("placeholder");
});

/*
module.exports = function(app){
  //////////////////////////////////
  // Include local libraries here //
  //////////////////////////////////
  var mysql = require("mysql");



  ////////////////
  // add-person //
  ////////////////
  app.post("/database", function(req, res){
    console.log("!!!!!!!!!!");
    var response        = {};
    response["records"] = {};
    response["tweets"]  = {};
    response["events"]  = {};
    // res.json(response);
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
*/
