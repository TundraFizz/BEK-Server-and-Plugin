module.exports = function(app){
  //////////////////////////////////
  // Include local libraries here //
  //////////////////////////////////
  // ->

  ////////////////
  // add-person //
  ////////////////
  app.post("/database", function(req, res){
    var name = req.body.name;
    var time = req.body.time;
    console.log(name);
    console.log(time);
    res.json(name);
  });
}
