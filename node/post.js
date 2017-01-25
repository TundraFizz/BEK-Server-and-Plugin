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
    if(rows.length == 0)
      self.InsertUser().then(() => resolve()); // Insert new user into database
    else
      self.UpdateUser().then(() => resolve()); // Update existing user
  });
})}

FEK.prototype.InsertUser = function(){return new Promise((resolve) => {
  var self = this;
  var sql = `INSERT INTO users (boards_id) VALUES (?)`;
  var args = [self.boardsId];

  self.conn.query(sql, args, function(err, rows){
    self.UpdateUser().then(() => resolve()); // Update existing user
  });
})}

FEK.prototype.UpdateUser = function(){return new Promise((resolve) => {
  var self = this;
  var lastLogin = new Date();
  var sql = `UPDATE users SET name=?, region=?, last_login=? WHERE boards_id=?`;
  var args = [self.boardsName, self.boardsRegion, lastLogin, self.boardsId];
  self.conn.query(sql, args, function(err, rows){
    resolve();
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
  this.req                  = req;
  this.avatarDirectory      = "./fek-avatars";
  this.response             = {};
  this.response["uploaded"] = false;

  this.form                 = new formidable.IncomingForm();
  this.form.multiples       = true; // Form Option: Allow uploading multiple files at once
  this.form.uploadDir       = "./fek-avatars";  // Form Option: Set the upload directory
}

UploadAvatar.prototype.FormParse = function(){return new Promise((resolve) => {
  var self = this;
  self.form.parse(self.req, function(err, data, files){
    name          = data["name"];
    region        = data["region"];
    self.filePath = files["file"].path;
    self.fileExt  = files["file"].name.split(".").pop();

    // Get JSON data from Riot's Boards API
    var uri = `http://boards.na.leagueoflegends.com/api/users/${region}/${name}`;
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

      self.ReadDir()
      .then(() => self.SaveAvatar())
      .then(() => resolve())
    }
    else{
      fs.unlinkSync(self.filePath);
      resolve();
    }
  });
})}

UploadAvatar.prototype.ReadDir = function(){return new Promise((resolve) => {
  var self = this;
  fs.readdir(self.avatarDirectory, function(err, files){
    self.files = files;
    resolve();
  });
})}

UploadAvatar.prototype.SaveAvatar = function(){return new Promise((resolve) => {
  var self = this;
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
  .then(() => res.json(uploadAvatar.response))
})

app.post("/getavatars", function(req, res){
  console.log("placeholder");
  console.log("placeholder");
})

app.post("/webpanel", function(req, res){
  console.log("placeholder");
  console.log("placeholder");
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
