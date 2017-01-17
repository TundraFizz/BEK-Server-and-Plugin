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

  ////////////////
  // add-person //
  ////////////////
  app.post("/database", function(req, res){
    var response            = {};
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

      // Check if there's an error connecting to the database
      if(myName != null){

        // TODO
      }

      // Get the version number
      // TODO

      // Get FEK Events announcement
      // TODO

      // Get user information
      if(users != null){
        var sql   = "SELECT username, region, boards_id, staff, title, badge FROM " + table +" WHERE";
        var first = true;

        for(var i = 0; i < users.length; i++){
          if(first){
            first = false;
            sql += " username='" + users[i] + "' AND region='" + regions[i] + "'";
          }
          else{
            sql += " OR username='" + users[i] + "' AND region='" + regions[i] + "'";
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
