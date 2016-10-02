
var USER_SESSION = "../../db/session.php";

var timerMouseEnter = 0;
var myVar;

var sfx  = [];
var sfxi = 0;
var html5_audiotypes = {"mp3": "audio/mpeg"};

var fizze1 = CreateSoundBite("https://tundrafizz.com/sfx/fizz-e1.mp3");
var fizze2 = CreateSoundBite("https://tundrafizz.com/sfx/fizz-e2.mp3");
var fizze3 = CreateSoundBite("https://tundrafizz.com/sfx/fizz-e3.mp3");

var val = Math.random();
if     (val < 0.33) sfx.push(1);
else if(val < 0.66) sfx.push(2);
else                sfx.push(3);

if(val < 0.5)
{
  if(sfx[0] == 1)
  {
    sfx.push(2);
    sfx.push(3);
  }
  else if(sfx[0] == 2)
  {
    sfx.push(3);
    sfx.push(1);
  }
  else
  {
    sfx.push(1);
    sfx.push(2);
  }
}
else
{
  if(sfx[0] == 1)
  {
    sfx.push(3);
    sfx.push(2);
  }
  else if(sfx[0] == 2)
  {
    sfx.push(1);
    sfx.push(3);
  }
  else
  {
    sfx.push(2);
    sfx.push(1);
  }
}

function CreateSoundBite(sound)
{
  var html5audio = document.createElement("audio");
  
  // Check support for HTML5 audio
  if(html5audio.canPlayType)
  { 
    for(var i=0; i<arguments.length; i++)
    {
      var sourceel=document.createElement("source");
      sourceel.setAttribute('src', arguments[i]);
      
      if(arguments[i].match(/\.(\w+)$/i))
        sourceel.setAttribute('type', html5_audiotypes[RegExp.$1]);
      
      html5audio.appendChild(sourceel);
    }
    
    html5audio.load();
    
    html5audio.playclip = function()
    {
      html5audio.pause();
      html5audio.currentTime = 0;
      html5audio.play();
    }
    
    return html5audio;
  }
  else
  {
    return {playclip:function(){throw new Error("Your browser doesn't support HTML5 audio")}}
  }
}

function FizzE()
{
  if     (sfx[sfxi] == 1) fizze1.playclip();
  else if(sfx[sfxi] == 2) fizze2.playclip();
  else                    fizze3.playclip();
  
  if(++sfxi == 3)
    sfxi = 0;
}

function GetMin(array){var result = 9999;for(var i = 0; i < array.length; i++)if(array[i].y < result)result = array[i].y;return result;}
function GetMax(array){var result = -999;for(var i = 0; i < array.length; i++)if(array[i].y > result)result = array[i].y;return result;}

// Login and stuff
// Allow user to submit Login by pressing enter
// !!! Most likely useless code now since I'm using a <form> !!!
// $("#username").bind("keydown", function(e) {if(e.keyCode === 13) Login();});
// $("#password").bind("keydown", function(e) {if(e.keyCode === 13) Login();});

function AuthenticateAccount()
{
  $.ajax(
  {
    url:      USER_SESSION,
    type:     "POST",
    dataType: "json",
    data:
    {
      action:   "check url",
      authcode: $("#auth-code-url").val()
    }
  }).success(function(data)
  {
    if(data["message"] == "0")
      alert("Did not find the code in your post. Are you sure you copy/pasted the correct Permalink URL? Also, make sure there is nothing else in your post except the 10-character code. Not even spaces or line breaks.");
    else if(data["message"] == "1")
      location.reload();
  }).error(function()
  {
    alert("Error: No response from the server!");
  });
}

function AccountError(borderColor, backgroundColor, error)
{
  if($("#account-error").css("display") == "none")
  {
    $("#account-error").css("borderColor", borderColor);
    $("#account-error").css("backgroundColor", backgroundColor);
    $("#account-error").fadeIn("slow", function(){}).dequeue();
    
    if(error)
      Shake("#account-error");
  }
  else
  {
    $("#account-error").animate(
    {
      borderColor:     borderColor,
      backgroundColor: backgroundColor
    }, 400).dequeue();
    
    if(error)
      Shake("#account-error");
  }
}

function Shake(id)
{
  var interval = 100;
  var distance = 10;
  var times    = 4;
  
  for(var iter=0;iter<(times+1);iter++)
  {
    $(id).animate(
    { 
      left: ((iter%2==0 ? distance : distance*-1))
    }, interval);
  }
  
  $(id).animate(
  {
    left: 0
  }, interval, function(){});
}

function Logout()
{
  $.ajax(
  {
    url:      USER_SESSION,
    type:     "POST",
    dataType: "json",
    data:
    {
      action: "logout"
    }
  }).success(function(data)
  {
    location.reload();
  }).error(function()
  {
    alert("Error: No response from the server!");
  });
}


function AccountBoxClose()
{
  $("#account-manage-box").fadeOut("slow", function(){}).dequeue();
}

function ThisIsATest()
{
  $.ajax(
  {
    url:      "../thing/",
    type:     "POST",
    dataType: "json",
    data:
    {
      something: "yoloswag"
    }
  }).success(function(data)
  {
    alert(data["html"]);
  }).error(function()
  {
    alert("Error: No response from the server!");
  });
}

$(function() {

$("#myTable").tablesorter({sortList: [[0,0]], headers:{8:{sorter: false}}});
$("#pax-banner").scrollLeft(50); // Make the banner appear in the center of the screen for mobile devices

$(".navbar-brand").click(function()
{
  $({deg: 0}).animate({deg: -360},
  {
    step: function(now, fx)
    {
      $(".navbar-brand").css(
      {
        transform: "rotate(" + now + "deg)"
      });
    }
  });
});

// Set the positions for the two highlights
$(".highlight").each(function()
{
  var hi = $(this).parent().attr("id");
  var left;
  
  var currentPageItem = $(this).parent().find(".current_page_item");
  
  if     (hi == "nav")    left = $(currentPageItem).position().left;
  else if(hi == "subnav") left = $(currentPageItem).position().left;
  
  // Get width of bright thing AND highlight
  // Subtract: (highlight - current) / 2
  //var current = $(this).find(".current_page_item");
  var aa = $(this).width();
  var bb = $(currentPageItem).width();
  left -= ((aa - bb) / 2);
  
  $(this).css("left", left + "px");
});

$(".page_item").mouseenter(function()
{
  var highlight = $(this).parent().parent().find(".highlight");
  
  myVar = setInterval(function()
  {
    var filter;
    var chrome  = $(highlight).css("-webkit-filter");
    var firefox = $(highlight).css("filter");
    if(!(chrome  == null || chrome  == "none")) filter = "-webkit-filter";
    if(!(firefox == null || firefox == "none")) filter = "filter";
    
    var zxc = $(highlight).css(filter);
    zxc = parseInt(zxc.match(/\d+/)[0]);
    zxc += 1;
    zxc = "hue-rotate(" + zxc + "deg)";
    
    $(highlight).css(filter, zxc);
    
    if(++timerMouseEnter == 150)
    {
      timerMouseEnter = 0;
      clearInterval(myVar);
    }
  }, 1);
  
  pos = $(this).position();
  pos = pos.left + (($(this).width() / 2) - 62);
  
  $(highlight).stop().animate(
  {
    left: pos
  }, 150, "easeInOutQuad")
});

$(".page_item").mouseleave(function()
{
  // Determine if this is the nav or subnav
  var determine = $(this).parent().parent().attr("id");
  var currentPageItem = $(this).parent().find(".current_page_item");
  var left;
  if     (determine == "nav")    left = $(currentPageItem).position().left;
  else if(determine == "subnav") left = $(currentPageItem).position().left;
  
  var highlight = $(this).parent().parent().find(".highlight");
  // Get width of bright thing AND highlight
  // Subtract: (highlight - currentPageItem) / 2
  
  var aa = $(highlight).width();
  var bb = $(currentPageItem).width();
  left -= ((aa - bb) / 2);
  
  timerMouseEnter = 0;
  clearInterval(myVar);
  
  $(highlight).stop().animate(
  {
    left: left
  }, 250, "easeInOutQuad")
});

$(window).resize(function()
{
  if($(".highlight").length == 1)
    return;
  
  // Manually get the subnav items
  var highlight       = $(".highlight")[1];
  var currentPageItem = $(".current_page_item")[1];
  var left            = $(currentPageItem).position().left;
  
  var aa = $(highlight).width();
  var bb = $(currentPageItem).width();
  left -= ((aa - bb) / 2);
  
  timerMouseEnter = 0;
  clearInterval(myVar);
  
  $(highlight).stop().animate(
  {
    left: left
  }, 250, "easeInOutQuad")
});

$(".price").each(function()
{
  if     (parseInt(this.textContent) <= 200) this.style.background = "lightgreen";
  else if(parseInt(this.textContent) <= 300) this.style.background = "lightblue";
  else if(parseInt(this.textContent) <= 450) this.style.background = "yellow";
  else                                       this.style.background = "salmon";
});

$(".price_low").each(function()
{
  if     (parseInt(this.textContent) <= 200) this.style.background = "lightgreen";
  else if(parseInt(this.textContent) <= 300) this.style.background = "lightblue";
  else if(parseInt(this.textContent) <= 400) this.style.background = "yellow";
  else                                       this.style.background = "salmon";
});

$(".prestige").each(function()
{
  if     (parseInt(this.textContent) == 5) this.style.background = "lightgreen";
  else if(parseInt(this.textContent) == 4) this.style.background = "lightblue";
  else if(parseInt(this.textContent) == 3) this.style.background = "yellow";
  else                                     this.style.background = "salmon";
});

$(".rating").each(function()
{
  if     (parseInt(this.textContent) >= 9) this.style.background = "lightgreen";
  else if(parseInt(this.textContent) >= 8) this.style.background = "lightblue";
  else if(parseInt(this.textContent) >= 7) this.style.background = "yellow";
  else                                     this.style.background = "salmon";
});

$(".reviews").each(function()
{
  if     (parseInt(this.textContent) >= 100) this.style.background = "lightgreen";
  else if(parseInt(this.textContent) >= 50)  this.style.background = "lightblue";
  else if(parseInt(this.textContent) >= 25)  this.style.background = "yellow";
  else                                       this.style.background = "salmon";
});

$(".distance").each(function()
{
  if     (parseInt(this.textContent) <= 3) this.style.background = "lightgreen";
  else if(parseInt(this.textContent) <= 6) this.style.background = "lightblue";
  else if(parseInt(this.textContent) <= 9) this.style.background = "yellow";
  else                                     this.style.background = "salmon";
});

$(".points").each(function()
{
  if     (parseInt(this.textContent) >= 13) this.style.background = "lightgreen";
  else if(parseInt(this.textContent) >= 10) this.style.background = "lightblue";
  else if(parseInt(this.textContent) >= 7)  this.style.background = "yellow";
  else                                      this.style.background = "salmon";
});

$(".header").click(function()
{
  $("#dataGraph").remove();
});

$(".viewgraph").click(function()
{
  $("#dataGraph").remove();
  $(this.parentNode.parentNode).after("<tr id='dataGraph'><td colspan='9'><div id='chartContainer' style='height: 300px; width: 100%;'></div></td></tr>");
  
  var index        = this.id;
  var propertyData = JSON.parse('<?= $propertyData; ?>');
  
  var data       = [];
  var dataSeries = { type: "line" };
  var dataPoints = [];
  
  for(var i = 0; i < propertyData[index]["dateArray"].length; i++)
  {
    dataPoints.push(
    {
      x: new Date(propertyData[index]["dateArray"][i]),
      y: parseInt(propertyData[index]["priceArray"][i])
    });
  }
  
  dataSeries.dataPoints = dataPoints;
  data.push(dataSeries);
  
  var min = GetMin(data[0].dataPoints);
  var max = GetMax(data[0].dataPoints);
  var difference = max - min;
  var interval = Math.ceil(difference / 10);
  
  var chart = new CanvasJS.Chart("chartContainer",
  {
    data:             data,
    zoomEnabled:      false,
    animationEnabled: false,
    
    title:
    {
      text: ""
    },
    
    axisX:
    {
      labelFontColor: "white",
      labelAngle:     -45,
      tickLength:     0,
      margin:         -60,
    },
    
    axisY:
    {
      includeZero: false,
      tickLength:  0,
      interval:    interval,
    },
  });
  
  chart.render();
});

});

/*

function PushOpen()
{
  $("#row-container").animate(
  {
    top: "+=90"
  }, 300, "easeOutExpo", function()
  {
    expandedArray.shift();
    
    if(expandedArray.length > 1)
    {
      // If the last element is Open, do nothing and clear the area
      if(expandedArray[expandedArray.length-1] == "Open")
      {
        expandedArray = [];
      }
      else
      {
        expandedArray = [];
        expandedArray.push("Close");
        PushClose();
      }
    }
    else if(expandedArray.length == 1)
      PushClose();
  });
}

function PushClose()
{
  $("#row-container").animate(
  {
    top: "-=90"
  }, 300, "easeOutExpo", function()
  {
    expandedArray.shift();
    
    if(expandedArray.length > 1)
    {
      // If the last element is Close, do nothing and clear the area
      if(expandedArray[expandedArray.length-1] == "Close")
      {
        expandedArray = [];
      }
      else
      {
        expandedArray = [];
        expandedArray.push("Open");
        PushOpen();
      }
    }
    else if(expandedArray.length == 1)
      PushOpen();
  });
}

*/

/*

$(".dropdown").hover(
function()
{
  //var collapse2 = $(this.children[1]);
  var collapse = $(this);
  
  var thisdiv = $(this).attr("data-target");
  $(thisdiv).css("visibility", "visible");
  
//$(this).queue(function A()
//{
    $(thisdiv).collapse("show");
//  setTimeout(function(){AnotherFunction(collapse)}, 500);
//});
},
function()
{
  //var collapse2 = $(this.children[1]);
  var collapse = $(this);
  
  var thisdiv = $(this).attr("data-target");
  $(thisdiv).removeClass();
  $(thisdiv).addClass("submenu");
  $(thisdiv).addClass("collapse");
  $(thisdiv).css("visibility", "hidden");
  
//$(this).queue(function B()
//{
//  $(thisdiv).collapse("hide");
//  setTimeout(function(){AnotherFunction(collapse)}, 500);
//});
});

*/

/*

$(".dropdown").hover(function()
{
  $(this).addClass("open");
}, function()
{
  $(this).removeClass("open");
});

*/
