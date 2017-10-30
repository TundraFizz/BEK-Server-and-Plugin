var request = require("request");
var mysql   = require("mysql");
var fs      = require("fs");
var cheerio = require("cheerio");
var phantom = require("phantom");

class ScrapeHotels {
  constructor(){
    this.ready      = true;
    this.hotelIndex = 0;
    this.hotels     = [
      "https://www.expedia.com/Seattle-Hotels-Pan-Pacific-Seattle.h1509734.Hotel-Information?chkin=1%2F24%2F2018&chkout=1%2F30%2F2018",
      "https://www.expedia.com/Seattle-Hotels-The-Loyal-Inn.h16934.Hotel-Information?chkin=1%2F24%2F2018&chkout=1%2F30%2F2018",
      "https://www.expedia.com/Seattle-Hotels-Warwick-Seattle.h6839.Hotel-Information?chkin=1%2F24%2F2018&chkout=1%2F30%2F2018",
      "https://www.expedia.com/Seattle-Hotels-La-Quinta-Inn-Suites-Seattle-Downtown.h16349.Hotel-Information?chkin=1%2F24%2F2018&chkout=1%2F30%2F2018",
      "https://www.expedia.com/Seattle-Hotels-Hotel-Max.h28647.Hotel-Information?chkin=1%2F24%2F2018&chkout=1%2F30%2F2018"
    ];
  }
}

ScrapeHotels.prototype.GetWebPage = function(url){return new Promise((resolve) => {
  var user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36";
  var phInstance, phPage;
  var finalContent;

  phantom.create([],{logLevel: "error"})
  .then(instance => {
    phInstance = instance;
    return phInstance.createPage();
  })
  .then(page => {
    phPage = page;
    phPage.setting("settings.userAgent", user_agent);
    return phPage.open(url);
  })
  .then(status => {
    return phPage.property("content");
  })
  .then(content => {
    finalContent = content;
    resolve(finalContent);
  })
  .catch(error => {
    console.log(error);
    phInstance.exit();
  });
})}

ScrapeHotels.prototype.GetInformation = function(content){return new Promise((resolve) => {
  $ = cheerio.load(content);
  var name   = $("#hotel-name").html();
  var price  = $(".price-per-night-wrapper > .link-to-rooms").html();
  var rating = $("meta[itemprop='ratingValue']").attr("content");
  console.log(`========== ${name} ==========`);
  console.log(price);
  console.log(rating);
  console.log();

  resolve();
  // fs.writeFile("content.html", content, function(err){
  //   if(err)return console.log(err);
  //   console.log("The file was saved!");
  //   resolve();
  // });
})}

ScrapeHotels.prototype.Sample = function(){
  if(this.ready){
    this.ready = false;

    this.GetWebPage(this.hotels[this.hotelIndex])
    .then((content) => this.GetInformation(content))
    .then(() => {
      if(++this.hotelIndex == this.hotels.length)
        this.hotelIndex = 0;
      this.ready = true;
    });
  }
}

ScrapeHotels.prototype.YoloSwag = function(){
  setInterval(this.Sample.bind(this), 2000);
}

module.exports = ScrapeHotels;
