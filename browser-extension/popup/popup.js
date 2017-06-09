// document.addEventListener("click", (e) => {
  // $("span").click(function(){
  //   chrome.tabs.create({url: "http://boards.na.leagueoflegends.com/en/f/mNBeEEkI"});
  // });
// });

$(document).ready(function(){
  $("span").click(function(){
    chrome.tabs.create({url: "http://boards.na.leagueoflegends.com/en/f/mNBeEEkI"});
  });
});

// var port = chrome.extension.connect({
//   name: "Sample Communication"
// });

// port.postMessage("Hi BackGround");

// port.onMessage.addListener(function(msg){
//   $("span").click(function(){
//     chrome.tabs.create({url: "http://boards.na.leagueoflegends.com/en/f/mNBeEEkI"});
//   });
// });
