var app     = require("../server.js");
var request = require("request");
var mysql   = require("mysql");
var fs      = require("fs");
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

Obj.prototype.GetBoardsInfo = function(callback){
  var self = this;

  // Get JSON data from Riot's Boards API
  var uri = `http://boards.na.leagueoflegends.com/api/users/${self.region}/${self.name}`;
  uri = encodeURI(uri);

  var options = {
    url     : uri,
    json    : true,
    headers : {
      "User-Agent": "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.9) Gecko/20071025 Firefox/2.0.0.9"
    }
  };

  request(options, function(err, res, data){
    self.boardsId     = data["id"];
    self.boardsName   = data["name"];
    self.boardsRegion = data["realm"];
    self.CheckIfUserExists(function(){callback()});
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
  var sql = `UPDATE users SET name=?, region=?, last_login=? WHERE boards_id=?`;
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
  var sql = `SELECT message, stream, thread, start, end FROM event`;
  var args = [];
  self.conn.query(sql, args, function(err, rows){
    self.response["events"] = rows;
    self.GetTwitterInfo(function(){callback()});
  });
}

Obj.prototype.GetTwitterInfo = function(callback){
  var self = this;
  var sql = `SELECT * FROM tweets ORDER BY id DESC LIMIT 0, 2`;
  var args = [];
  self.conn.query(sql, args, function(err, rows){
    self.response["tweets"] = rows;
    self.GetAvatars(function(){callback()});
  });
}

Obj.prototype.GetAvatars = function(callback){
  var self = this;
  var sql = `SELECT name, region, boards_id, staff, title, badge FROM users`;
  var args = [];
  var firstRun = true;

  for(var i = 0; i < self.users.length; i++){
    if(firstRun){
      firstRun = false;
      sql += ` WHERE name=? AND region=?`;
      args.push(self.users[i]);
      args.push(self.regions[i]);
    }
    else{
      sql += ` OR name=? AND region=?`;
      args.push(self.users[i]);
      args.push(self.regions[i]);
    }
  }

  self.conn.query(sql, args, function(err, rows){
    for(var i = 0; i < rows.length; i++){

      var row      = rows[i];
      var name     = row["name"];
      var region   = row["region"];
      var boardsId = row["boards_id"];
      var staff    = row["staff"];
      var title    = row["title"];
      var badge    = row["badge"];

      if(!self.response["records"][name])         self.response["records"][name]         = {};
      if(!self.response["records"][name][region]) self.response["records"][name][region] = {};

      self.response["records"][name][region]["staff"] = staff;
      self.response["records"][name][region]["title"] = title;
      self.response["records"][name][region]["badge"] = badge;

      var avatar = FindAvatar(boardsId);
      if(avatar)
        self.response["records"][name][region]["avatar"] = avatar;
    }

    callback();
  });
}

app.post("/database", function(req, res){
  obj.myName   = req.body.myName;
  obj.myRegion = req.body.myRegion;
  obj.users    = req.body.users;
  obj.regions  = req.body.regions;

  if(obj.myName != null){ // If the user is logged in
    if(obj.myRegion == "EU Oeste" ||
       obj.myRegion == "EU Ouest" ||
       obj.myRegion == "Eu Ovest" ||
       obj.myRegion == "Westeuropa")
      obj.myRegion = "EUW";

    obj.GetBoardsInfo(function(){
      res.json(obj.response);
    });
  }
  else{
    obj.GetVersion(function(){
      res.json(obj.response);
    });
  }
});

app.post("/getavatars", function(req, res){

});

app.post("/webpanel", function(req, res){
  console.log("placeholder");
  console.log("placeholder");
});

// getFriends
// addFriend
// acceptFriend
// removeFriend
// messages
// writePM
// sendPM
// deletePM
// wrenchmenIndex
// wrenchmenThread
// wrenchmenStatus

//////////////////////
// Helper Functions //
//////////////////////
function FindAvatar(boardsId){
  var localPath = "static/avatars/" + boardsId;
  var publicPath = "http://localhost:9001/avatars/" + boardsId;
  var extensions = [".jpg", ".jpeg", ".png", ".gif", ".webm", ".bmp"];

  for(var i = 0; i < extensions.length; i++){
    if(fs.existsSync(localPath + extensions[i])){
      return publicPath + extensions[i];
    }
  }

  return false;
}
