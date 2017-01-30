var app        = require("../server.js");
var formidable = require("formidable");
var request    = require("request");
var mysql      = require("mysql");
var fs         = require("fs");

function FEK(req){
  this.conn = mysql.createConnection({host     : "localhost",
                                      user     : "root",
                                      password : "Fizz",
                                      database : "fek"});

  this.response                  = {};
  this.response["records"]       = {};
  this.response["announcements"] = [];
  this.response["event"]         = {};
  this.response["version"]       = {};

  this.name    = req.body.myName;
  this.region  = req.body.myRegion;
  this.users   = req.body.users;
  this.regions = req.body.regions;
}

FEK.prototype.GetBoardsInfo = function(){return new Promise((resolve) => {
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
    resolve();
  });
})}

FEK.prototype.CheckIfUserExists = function(){return new Promise((resolve) => {
  // Check if the Boards ID exists in the database
  var self = this;
  var sql = `SELECT * FROM users WHERE boards_id=?`;
  var args = [self.boardsId];

  self.conn.query(sql, args, function(err, rows){
    var lastLogin = new Date();

    if(rows.length == 0){
      var sql = `INSERT INTO users (boards_id, name, region, last_login) VALUES (?,?,?,?)`;
      var args = [self.boardsId, self.boardsName, self.boardsRegion, lastLogin];

      self.conn.query(sql, args, function(err, rows){
        resolve();
      });
    }
    else{
      var sql = `UPDATE users SET name=?, region=?, last_login=? WHERE boards_id=?`;
      var args = [self.boardsName, self.boardsRegion, lastLogin, self.boardsId];
      self.conn.query(sql, args, function(err, rows){
        resolve();
      });
    }
  });
})}

FEK.prototype.GetVersion = function(){return new Promise((resolve) => {
  var self = this;
  var sql = `SELECT number, link FROM version`;
  var args = [];
  self.conn.query(sql, args, function(err, rows){
    // IMPORTANT!
    // Change this from records to something else later
    self.response["version"]["number"] = rows[0]["number"];
    self.response["version"]["link"]   = rows[0]["link"];
    resolve();
  });
})}

FEK.prototype.GetEvent = function(){return new Promise((resolve) => {
  var self = this;
  var sql = `SELECT message, stream, thread, start, end FROM event`;
  var args = [];
  self.conn.query(sql, args, function(err, rows){
    self.response["event"]["message"] = rows[0]["message"];
    self.response["event"]["stream"]  = rows[0]["stream"];
    self.response["event"]["thread"]  = rows[0]["thread"];
    self.response["event"]["start"]   = rows[0]["start"];
    self.response["event"]["end"]     = rows[0]["end"];
    resolve();
  });
})}

FEK.prototype.GetTwitterInfo = function(){return new Promise((resolve) => {
  var self = this;
  var sql = `SELECT * FROM tweets ORDER BY id DESC LIMIT 0, 2`;
  var args = [];
  self.conn.query(sql, args, function(err, rows){
    for(var i = 0; i < rows.length; i++){
      var data           = {};
      data["id"]         = rows[i]["id"];
      data["created_at"] = rows[i]["created_at"];
      data["text"]       = rows[i]["text"];
      data["user"]       = [rows[i]["name"],
                            rows[i]["screen_name"],
                            rows[i]["profile_image_url"]];

      self.response["announcements"].push(data);
    }

    resolve();
  });
})}

FEK.prototype.GetAvatars = function(){return new Promise((resolve) => {
  if(!this.users){
    resolve();
    return;
  }

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

      var avatar = self.FindAvatar(boardsId);
      if(avatar)
        self.response["records"][name][region]["avatar"] = avatar;
    }

    resolve();
  });
})}

FEK.prototype.FindAvatar = function(boardsId){
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

function UploadAvatar(req){
  this.conn = mysql.createConnection({host     : "localhost",
                                      user     : "root",
                                      password : "Fizz",
                                      database : "fek"});

  this.req                  = req;
  this.avatarDirectory      = "./fek-avatars";
  this.response             = {};
  this.response["uploaded"] = false;

  this.form                 = new formidable.IncomingForm();
  this.form.multiples       = true; // Form Option: Allow uploading multiple files at once
  this.form.uploadDir       = "./fek-avatars"; // Form Option: Set the upload directory
}

UploadAvatar.prototype.FormParse = function(){return new Promise((resolve) => {
  var self = this;
  self.form.parse(self.req, function(err, data, files){
    self.name     = data["name"];
    self.region   = data["region"];
    self.filePath = files["file"].path;
    self.fileExt  = files["file"].name.split(".").pop();

    // Get JSON data from Riot's Boards API
    var uri = `http://boards.na.leagueoflegends.com/api/users/${self.region}/${self.name}`;
    uri = encodeURI(uri);

    self.options = {
      url     : uri,
      json    : true,
      headers : {
        "User-Agent": "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.9) Gecko/20071025 Firefox/2.0.0.9"
      }
    };
    resolve();
  });
})}

UploadAvatar.prototype.GetIdFromRiotApi = function(){return new Promise((resolve) => {
  var self = this;
  request(self.options, function(err, res, data){
    var summonerNameFound = (typeof data["id"] !== "undefined");
    if(summonerNameFound){
      self.id = data["id"];
      self.fullFilePath = `${self.avatarDirectory}/${self.id}.${self.fileExt}`;

      fs.readdir(self.avatarDirectory, function(err, files){
        self.files = files;
        for(var i = 0; i < self.files.length; i++){
          var dir = self.avatarDirectory;
          var id  = self.files[i].split(".")[0];
          var ext = self.files[i].split(".")[1];
          var deleteThisFile = `${dir}/${id}.${ext}`;

          if(id == self.id)
            fs.unlinkSync(deleteThisFile);
        }

        fs.rename(self.filePath, self.fullFilePath);
        self.response["uploaded"] = true;
        resolve();
      });
    }
    else{
      fs.unlinkSync(self.filePath);
      resolve();
    }
  });
})}

UploadAvatar.prototype.UpdateUser = function(){return new Promise((resolve) => {
  var self = this;
  var sql  = `SELECT * FROM users WHERE boards_id=?`;
  var args = [self.id];

  // Check if the ID exists in the database
  self.conn.query(sql, args, function(err, rows){
    var lastLogin = new Date();

    if(rows.length == 0){
      // Insert new user into database if they don't exist
      var sql = `INSERT INTO users (boards_id, name, region, last_login) VALUES (?,?,?,?)`;
      var args = [self.id, self.name, self.region, lastLogin];
      self.conn.query(sql, args, function(err, rows){
        resolve();
      });
    }
    else{
      // Update existing user
      var sql = `UPDATE users SET name=?, region=?, last_login=? WHERE boards_id=?`;
      var args = [self.name, self.region, lastLogin, self.id];
      self.conn.query(sql, args, function(err, rows){
        resolve();
      });
    }
  });
})}

function UserSearch(req){
  this.conn = mysql.createConnection({host     : "localhost",
                                      user     : "root",
                                      password : "Fizz",
                                      database : "fek"});
  this.name     = req.body.name;
  this.response = {};
}

UserSearch.prototype.QuerySearch = function(){return new Promise((resolve) => {
  var self = this;
  var sql  = `SELECT * FROM users WHERE name LIKE ?`;
  var args = ["%"+self.name+"%"];

  self.conn.query(sql, args, function(err, rows){
    self.response = rows;
    resolve();
  });
})}

app.post("/database", function(req, res){
  var fek = new FEK(req);

  if(fek.name != null){ // If the user is logged in
    if(fek.region == "EU Oeste" ||
       fek.region == "EU Ouest" ||
       fek.region == "Eu Ovest" ||
       fek.region == "Westeuropa")
      fek.region = "EUW";

    fek.GetBoardsInfo()
    .then(() => fek.CheckIfUserExists())
    .then(() => fek.GetVersion())
    .then(() => fek.GetEvent())
    .then(() => fek.GetTwitterInfo())
    .then(() => fek.GetAvatars())
    .then(() => res.json(fek.response));
  }
  else{
    fek.GetVersion()
    .then(() => fek.GetEvent())
    .then(() => fek.GetTwitterInfo())
    .then(() => fek.GetAvatars())
    .then(() => res.json(fek.response));
  }
})

app.post("/uploadavatar", function(req, res){
  var uploadAvatar = new UploadAvatar(req);

  uploadAvatar.FormParse()
  .then(() => uploadAvatar.GetIdFromRiotApi())
  .then(() => uploadAvatar.UpdateUser())
  .then(() => res.json(uploadAvatar.response))
})

app.post("/querysearch", function(req, res){
  var userSearch = new UserSearch(req);
  userSearch.QuerySearch()
  .then(() => res.json(userSearch.response))
})

function ManageCosmetics(req){
  this.conn = mysql.createConnection({host     : "localhost",
                                      user     : "root",
                                      password : "Fizz",
                                      database : "fek"});
  this.action   = req.body.action;
  this.data     = req.body.data;
  this.response = {};
}

ManageCosmetics.prototype.Testing = function(){return new Promise((resolve) => {
  var self = this;

  if(self.action == "Change Title"){
    var title1 = false; // Current title
    var title2 = false; // New title

    self.data = self.data.trim();

    if(self.data)
      title2 = true;

    // Check if there is no title
    var sql  = `SELECT title FROM users WHERE name LIKE 'Tundra Fizz' AND region='NA'`;
    // var sql  = `SELECT title FROM users WHERE name LIKE ?`;
    var args = ["Tundra Fizz"];

    self.conn.query(sql, /*args,*/ function(err, rows){
      var row = rows[0];

      if(row["title"])
        title1 = true;

      if(title1 == false && title2 == true){
        console.log("Make sure user has enough FC");
      }

      var sql  = `UPDATE users SET title=? WHERE name LIKE 'Tundra Fizz' AND region='NA'`;
      var args = [self.data];
      self.conn.query(sql, args, function(err, rows){
        console.log("DONE");
        resolve();
      });

      resolve();
    });

  }else if(self.action == "Add Badge"){

  }else if(self.action == "Remove Badge"){

  }else if(self.action == "Advance Day Test"){
    console.log("Advancing the day...");
    // Check all non-staff and reduce the number of FC they have by this:

    var sql  = `SELECT id, fish_chips, title, badge FROM users WHERE staff!=1`;

    self.conn.query(sql, function(err, rows){
      for(var i = 0; i < rows.length; i++){
        var row       = rows[i];
        var cosmetics = 0;

        console.log(row);

        if(row["title"])
          cosmetics++;

        if(row["badge"]){
          var badges = row["badge"].split(",");
          console.log(badges);
          cosmetics += badges.length;
        }

        var upkeep = cosmetics * 3;
        console.log(cosmetics, upkeep);

        // Upkeep has been found
        //   If user can pay for it, deduct FC
        //   If user can't pay for it, DO NOT deduct FC and remove all cosmetics
      }
      resolve();
    });

    // Set new amount of FC
  }else{
    console.log("Invalid action");
  }

  self.response = "Testing";
  resolve();
})}

app.post("/managecosmetics", function(req, res){
  var manageCosmetics = new ManageCosmetics(req);
  manageCosmetics.Testing()
  .then(() => res.json(manageCosmetics.response))
})

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
