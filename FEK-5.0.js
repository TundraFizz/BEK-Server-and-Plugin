// ==UserScript==
// @name        F.E.K.
// @author      Tundra Fizz
// @version     5.0.0
// @namespace   https://tundrafizz.com/
// @include     http://*.leagueoflegends.com/*
// @run-at      document-end
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @grant       GM_log
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// ==/UserScript==
// Copyright 2017 - All Rights Reserved
// You are free to modify this file as you like, but don't redistribute without my permission.
// Written by Leif Coleman (Tundra Fizz - NA) <mageleif@yahoo.com>
// http://boards.na.leagueoflegends.com/en/c/miscellaneous/3V6I7JvK

// Library: Perfect Scrollbar v0.4.8
"use strict";(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){var n={wheelSpeed:10,wheelPropagation:!1,minScrollbarLength:null,useBothWheelAxes:!1,useKeyboard:!0,suppressScrollX:!1,suppressScrollY:!1,scrollXMarginOffset:0,scrollYMarginOffset:0},t=function(){var e=0;return function(){var n=e;return e+=1,".perfect-scrollbar-"+n}}();e.fn.perfectScrollbar=function(o,r){return this.each(function(){var l=e.extend(!0,{},n),s=e(this);if("object"==typeof o?e.extend(!0,l,o):r=o,"update"===r)return s.data("perfect-scrollbar-update")&&s.data("perfect-scrollbar-update")(),s;if("destroy"===r)return s.data("perfect-scrollbar-destroy")&&s.data("perfect-scrollbar-destroy")(),s;if(s.data("perfect-scrollbar"))return s.data("perfect-scrollbar");s.addClass("ps-container");var a,i,c,u,p,d,f,h,v,b,g=e("<div class='ps-scrollbar-x-rail'></div>").appendTo(s),m=e("<div class='ps-scrollbar-y-rail'></div>").appendTo(s),w=e("<div class='ps-scrollbar-x'></div>").appendTo(g),T=e("<div class='ps-scrollbar-y'></div>").appendTo(m),L=parseInt(g.css("bottom"),10),y=parseInt(m.css("right"),10),S=t(),I=function(e,n){var t=e+n,o=u-v;b=0>t?0:t>o?o:t;var r=parseInt(b*(d-u)/(u-v),10);s.scrollTop(r),g.css({bottom:L-r})},D=function(e,n){var t=e+n,o=c-f;h=0>t?0:t>o?o:t;var r=parseInt(h*(p-c)/(c-f),10);s.scrollLeft(r),m.css({right:y-r})},x=function(e){return l.minScrollbarLength&&(e=Math.max(e,l.minScrollbarLength)),e},k=function(){g.css({left:s.scrollLeft(),bottom:L-s.scrollTop(),width:c,display:a?"inherit":"none"}),m.css({top:s.scrollTop(),right:y-s.scrollLeft(),height:u,display:i?"inherit":"none"}),w.css({left:h,width:f}),T.css({top:b,height:v})},X=function(){c=s.width(),u=s.height(),p=s.prop("scrollWidth"),d=s.prop("scrollHeight"),!l.suppressScrollX&&p>c+l.scrollXMarginOffset?(a=!0,f=x(parseInt(c*c/p,10)),h=parseInt(s.scrollLeft()*(c-f)/(p-c),10)):(a=!1,f=0,h=0,s.scrollLeft(0)),!l.suppressScrollY&&d>u+l.scrollYMarginOffset?(i=!0,v=x(parseInt(u*u/d,10)),b=parseInt(s.scrollTop()*(u-v)/(d-u),10)):(i=!1,v=0,b=0,s.scrollTop(0)),b>=u-v&&(b=u-v),h>=c-f&&(h=c-f),k()},C=function(){var n,t;w.bind("mousedown"+S,function(e){t=e.pageX,n=w.position().left,g.addClass("in-scrolling"),e.stopPropagation(),e.preventDefault()}),e(document).bind("mousemove"+S,function(e){g.hasClass("in-scrolling")&&(D(n,e.pageX-t),e.stopPropagation(),e.preventDefault())}),e(document).bind("mouseup"+S,function(){g.hasClass("in-scrolling")&&g.removeClass("in-scrolling")}),n=t=null},Y=function(){var n,t;T.bind("mousedown"+S,function(e){t=e.pageY,n=T.position().top,m.addClass("in-scrolling"),e.stopPropagation(),e.preventDefault()}),e(document).bind("mousemove"+S,function(e){m.hasClass("in-scrolling")&&(I(n,e.pageY-t),e.stopPropagation(),e.preventDefault())}),e(document).bind("mouseup"+S,function(){m.hasClass("in-scrolling")&&m.removeClass("in-scrolling")}),n=t=null},P=function(e,n){var t=s.scrollTop();if(0===e){if(!i)return!1;if(0===t&&n>0||t>=d-u&&0>n)return!l.wheelPropagation}var o=s.scrollLeft();if(0===n){if(!a)return!1;if(0===o&&0>e||o>=p-c&&e>0)return!l.wheelPropagation}return!0},M=function(){var e=!1;s.bind("mousewheel"+S,function(n,t,o,r){l.useBothWheelAxes?i&&!a?r?s.scrollTop(s.scrollTop()-r*l.wheelSpeed):s.scrollTop(s.scrollTop()+o*l.wheelSpeed):a&&!i&&(o?s.scrollLeft(s.scrollLeft()+o*l.wheelSpeed):s.scrollLeft(s.scrollLeft()-r*l.wheelSpeed)):(s.scrollTop(s.scrollTop()-r*l.wheelSpeed),s.scrollLeft(s.scrollLeft()+o*l.wheelSpeed)),X(),e=P(o,r),e&&n.preventDefault()}),s.bind("MozMousePixelScroll"+S,function(n){e&&n.preventDefault()})},O=function(){var n=!1;s.bind("mouseenter"+S,function(){n=!0}),s.bind("mouseleave"+S,function(){n=!1});var t=!1;e(document).bind("keydown"+S,function(e){if(n){var o=0,r=0;switch(e.which){case 37:o=-3;break;case 38:r=3;break;case 39:o=3;break;case 40:r=-3;break;case 33:r=9;break;case 32:case 34:r=-9;break;case 35:r=-u;break;case 36:r=u;break;default:return}s.scrollTop(s.scrollTop()-r*l.wheelSpeed),s.scrollLeft(s.scrollLeft()+o*l.wheelSpeed),t=P(o,r),t&&e.preventDefault()}})},E=function(){var e=function(e){e.stopPropagation()};T.bind("click"+S,e),m.bind("click"+S,function(e){var n=parseInt(v/2,10),t=e.pageY-m.offset().top-n,o=u-v,r=t/o;0>r?r=0:r>1&&(r=1),s.scrollTop((d-u)*r)}),w.bind("click"+S,e),g.bind("click"+S,function(e){var n=parseInt(f/2,10),t=e.pageX-g.offset().left-n,o=c-f,r=t/o;0>r?r=0:r>1&&(r=1),s.scrollLeft((p-c)*r)})},A=function(){var n=function(e,n){s.scrollTop(s.scrollTop()-n),s.scrollLeft(s.scrollLeft()-e),X()},t={},o=0,r={},l=null,a=!1;e(window).bind("touchstart"+S,function(){a=!0}),e(window).bind("touchend"+S,function(){a=!1}),s.bind("touchstart"+S,function(e){var n=e.originalEvent.targetTouches[0];t.pageX=n.pageX,t.pageY=n.pageY,o=(new Date).getTime(),null!==l&&clearInterval(l),e.stopPropagation()}),s.bind("touchmove"+S,function(e){if(!a&&1===e.originalEvent.targetTouches.length){var l=e.originalEvent.targetTouches[0],s={};s.pageX=l.pageX,s.pageY=l.pageY;var i=s.pageX-t.pageX,c=s.pageY-t.pageY;n(i,c),t=s;var u=(new Date).getTime();r.x=i/(u-o),r.y=c/(u-o),o=u,e.preventDefault()}}),s.bind("touchend"+S,function(){clearInterval(l),l=setInterval(function(){return.01>Math.abs(r.x)&&.01>Math.abs(r.y)?(clearInterval(l),void 0):(n(30*r.x,30*r.y),r.x*=.8,r.y*=.8,void 0)},10)})},j=function(){s.bind("scroll"+S,function(){X()})},W=function(){s.unbind(S),e(window).unbind(S),e(document).unbind(S),s.data("perfect-scrollbar",null),s.data("perfect-scrollbar-update",null),s.data("perfect-scrollbar-destroy",null),w.remove(),T.remove(),g.remove(),m.remove(),w=T=c=u=p=d=f=h=L=v=b=y=null},H=function(n){s.addClass("ie").addClass("ie"+n);var t=function(){var n=function(){e(this).addClass("hover")},t=function(){e(this).removeClass("hover")};s.bind("mouseenter"+S,n).bind("mouseleave"+S,t),g.bind("mouseenter"+S,n).bind("mouseleave"+S,t),m.bind("mouseenter"+S,n).bind("mouseleave"+S,t),w.bind("mouseenter"+S,n).bind("mouseleave"+S,t),T.bind("mouseenter"+S,n).bind("mouseleave"+S,t)},o=function(){k=function(){w.css({left:h+s.scrollLeft(),bottom:L,width:f}),T.css({top:b+s.scrollTop(),right:y,height:v}),w.hide().show(),T.hide().show()}};6===n&&(t(),o())},B="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,K=function(){var e=navigator.userAgent.toLowerCase().match(/(msie) ([\w.]+)/);e&&"msie"===e[1]&&H(parseInt(e[2],10)),X(),j(),C(),Y(),E(),B&&A(),s.mousewheel&&M(),l.useKeyboard&&O(),s.data("perfect-scrollbar",s),s.data("perfect-scrollbar-update",X),s.data("perfect-scrollbar-destroy",W)};return K(),s})}}),function(e){function n(n){var t=n||window.event,o=[].slice.call(arguments,1),r=0,l=0,s=0;return n=e.event.fix(t),n.type="mousewheel",t.wheelDelta&&(r=t.wheelDelta/120),t.detail&&(r=-t.detail/3),s=r,void 0!==t.axis&&t.axis===t.HORIZONTAL_AXIS&&(s=0,l=-1*r),void 0!==t.wheelDeltaY&&(s=t.wheelDeltaY/120),void 0!==t.wheelDeltaX&&(l=-1*t.wheelDeltaX/120),o.unshift(n,r,l,s),(e.event.dispatch||e.event.handle).apply(this,o)}var t=["DOMMouseScroll","mousewheel"];if(e.event.fixHooks)for(var o=t.length;o;)e.event.fixHooks[t[--o]]=e.event.mouseHooks;e.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var e=t.length;e;)this.addEventListener(t[--e],n,!1);else this.onmousewheel=n},teardown:function(){if(this.removeEventListener)for(var e=t.length;e;)this.removeEventListener(t[--e],n,!1);else this.onmousewheel=null}},e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})}(jQuery);

// Library: ChangeElementType
(function($) {$.fn.ChangeElementType = function(newType) {var attrs = {}; $.each(this[0].attributes, function(idx, attr) {attrs[attr.nodeName] = attr.nodeValue;}); this.replaceWith(function() {return $("<" + newType + "/>", attrs).append($(this).contents());});};})(jQuery);

// Library: GradientText (this is really awful, find a better way to make gradient text)
(function(e){e("head").append('<style type="text/css">.sn-pxg .pxg-set{user-select:none;-moz-user-select:none;-webkit-user-select:none;}.sn-pxg span.pxg-source{position:relative;display:inline-block;z-index:2;}.sn-pxg U.pxg-set,.sn-pxg U.pxg-set S,.sn-pxg U.pxg-set S B{left:0;right:0;top:0;bottom:0;height:inherit;width:inherit;position:absolute;display:inline-block;text-decoration:none;font-weight:inherit;}.sn-pxg U.pxg-set S{overflow:hidden;}.sn-pxg U.pxg-set{text-decoration:none;z-index:1;display:inline-block;position:relative;}</style>');e.fn.GradientText=function(t){function r(e){if("#"==e.substr(0,1)){e=e.substr(1)}if(3==e.length){e=e.substr(0,1)+e.substr(0,1)+e.substr(1,1)+e.substr(1,1)+e.substr(2,1)+e.substr(2,1)}return[parseInt(e.substr(0,2),16),parseInt(e.substr(2,2),16),parseInt(e.substr(4,2),16)]}function i(e){var t="0123456789abcdef";return"#"+t.charAt(parseInt(e[0]/16))+t.charAt(e[0]%16)+t.charAt(parseInt(e[1]/16))+t.charAt(e[1]%16)+t.charAt(parseInt(e[2]/16))+t.charAt(e[2]%16)}function s(e,n){var r=e>0?e/n:0;for(var i=0;i<t.colors.length;i++){fStopPosition=i/(t.colors.length-1);fLastPosition=i>0?(i-1)/(t.colors.length-1):0;if(r==fStopPosition){return t.colors[i]}else if(r<fStopPosition){fCurrentStop=(r-fLastPosition)/(fStopPosition-fLastPosition);return o(t.RGBcolors[i-1],t.RGBcolors[i],fCurrentStop)}}return t.colors[t.colors.length-1]}function o(e,t,n){var r=[];for(var s=0;s<3;s++){r[s]=e[s]+Math.round((t[s]-e[s])*n)}return i(r)}var t=e.extend({step:10,colors:["#ffcc00","#cc0000","#000000"],dir:"y"},t);t.RGBcolors=[];for(var n=0;n<t.colors.length;n++){t.RGBcolors[n]=r(t.colors[n])}return this.each(function(n,r){var i=e(r);if(!i.hasClass("sn-pxg")){var o=i.html();i.html('<span class="pxg-source" style="visibility: hidden;">'+o+"</span>").append('<u class="pxg-set"></u>');var u=i.find(".pxg-set");var a=i.find(".pxg-source");var f=a.innerWidth();var l=a.innerHeight();a.hide();i.addClass("sn-pxg");if(t.dir=="x"){var c=f}else if(t.dir=="y"){var c=l}var h=Math.floor(c/t.step);var p=h;var d=c-h*t.step;if(d>0){p++}u.css({width:f,height:l});var v=0;var m="";if(t.dir=="x"){for(var n=0;n<p;n++){var g=s(v,c);m+='<s style="height:'+l+"px;width:"+t.step+"px;left:"+v+"px;color:"+g+'"><b style="left:-'+v+"px;width:"+f+"px;height:"+l+'px;">'+o+"</b></s>";v=v+t.step}}else if(t.dir=="y"){for(var n=0;n<p;n++){var g=s(v,c);m+='<s style="width:'+f+"px;height:"+t.step+"px;top:"+v+"px;color:"+g+'"><b style="top:-'+v+"px;height:"+f+"px;height:"+l+'px;">'+o+"</b></s>";v=v+t.step}}u.append(m)}})}})(jQuery);

// Library: PRNG
!function(a,b,c,d,e,f,g,h,i){function j(a){var b,c=a.length,e=this,f=0,g=e.i=e.j=0,h=e.S=[];for(c||(a=[c++]);d>f;)h[f]=f++;for(f=0;d>f;f++)h[f]=h[g=s&g+a[f%c]+(b=h[f])],h[g]=b;(e.g=function(a){for(var b,c=0,f=e.i,g=e.j,h=e.S;a--;)b=h[f=s&f+1],c=c*d+h[s&(h[f]=h[g=s&g+b])+(h[g]=b)];return e.i=f,e.j=g,c})(d)}function k(a,b){var c,d=[],e=typeof a;if(b&&"object"==e)for(c in a)try{d.push(k(a[c],b-1))}catch(f){}return d.length?d:"string"==e?a:a+"\0"}function l(a,b){for(var c,d=a+"",e=0;e<d.length;)b[s&e]=s&(c^=19*b[s&e])+d.charCodeAt(e++);return n(b)}function m(c){try{return o?n(o.randomBytes(d)):(a.crypto.getRandomValues(c=new Uint8Array(d)),n(c))}catch(e){return[+new Date,a,(c=a.navigator)&&c.plugins,a.screen,n(b)]}}function n(a){return String.fromCharCode.apply(0,a)}var o,p=c.pow(d,e),q=c.pow(2,f),r=2*q,s=d-1,t=c["seed"+i]=function(a,f,g){var h=[];f=1==f?{entropy:!0}:f||{};var o=l(k(f.entropy?[a,n(b)]:null==a?m():a,3),h),s=new j(h);return l(n(s.S),b),(f.pass||g||function(a,b,d){return d?(c[i]=a,b):a})(function(){for(var a=s.g(e),b=p,c=0;q>a;)a=(a+c)*d,b*=d,c=s.g(1);for(;a>=r;)a/=2,b/=2,c>>>=1;return(a+c)/b},o,"global"in f?f.global:this==c)};if(l(c[i](),b),g&&g.exports){g.exports=t;try{o=require("crypto")}catch(u){}}else h&&h.amd&&h(function(){return t})}(this,[],Math,256,6,52,"object"==typeof module&&module,"function"==typeof define&&define,"random");

// Library: Extend jQuery for FEK control panel
$.fn.hasOverflow = function(){
  var leeway = 0;
  var element = $(this)[0];
  if(element.clientWidth < (element.scrollWidth - leeway) || element.clientHeight < (element.scrollHeight - leeway))
    return true;

  return false;
};

// Library: Extend jQuery for FEK control panel
$.fn.hasOverflowX = function(){
  var leeway = 0;
  var element = $(this)[0];
  if(element.offsetWidth < (element.scrollWidth - leeway)){
    $(this).attr("overflowX", (element.scrollWidth - leeway) - element.offsetWidth);
    return true;
  }else{
    $(this).attr("overflowX", "0");
    return false;
  }
};

// Library: Extend jQuery for FEK control panel
$.fn.hasOverflowY = function(){
  var leeway = 0;
  var element = $(this)[0];
  if(element.offsetHeight < (element.scrollHeight - leeway)){
    $(this).attr("overflowY", (element.scrollHeight - leeway) - element.offsetHeight);
    return true;
  }else{
    $(this).attr("overflowY", "0");
    return false;
  }
};

function Fek(){
  var self = this;

  self.version          = "5.0.0";
  self.FEKpage          = "http://boards.na.leagueoflegends.com/en/c/miscellaneous/3V6I7JvK";
  //self.domain         = "http://35.161.242.105";
  //self.domain         = "http://35.167.193.168:9001";
  self.domain           = "http://localhost:9001";
  self.FEKgfx           = `${self.domain}/fek/gfx/misc/`;
  self.cIcons           = `${self.domain}/fek/gfx/iconsmallchampion/`;
  self.FEKgfxLargeChamp = `${self.domain}/fek/gfx/iconlargechampion/`;
  self.FEKgfxLargeSpell = `${self.domain}/fek/gfx/iconlargespell/`;
  self.FEKgfxLargeItem  = `${self.domain}/fek/gfx/iconlargeitem/`;
  self.FEKtweets        = [];
  self.activeKeys       = [];
  self.hotkeys          = [];
  self.users            = [];
  self.regions          = [];
  self.results          = [];
  self.errorMessage     = "";

  // How to use the SendToServer function:
  // var formData = new FormData();                             <-- First create a new FormData
  // formData.append("key1", "data1");                          <-- Next append keys and data
  // SendToServer("post-url-here", formData, function(data){}); <-- Finally call it

  this.LoadCss(`${self.domain}/fek/css/fekv4panel.css`);
  this.LoadCss(`${self.domain}/fek/css/fekevent.css`);
  this.LoadCss(`${self.domain}/fek/css/thread.css`);

  //////////////////////////////////////////////////////
  // Modify the navigation bar at the top of the page //
  //////////////////////////////////////////////////////

  // Resizes the minimum width for the page (CAN I DO THIS WITH CSS)
  $(document).css("min-width", "1050px");
  // document.body.style.setProperty("min-width", "1050px"); <-- OLD

  self.RiotBar = $("#riotbar-bar");
  if(self.RiotBar)
    $(self.RiotBar).attr("z-index", "-5000 !important");

  // Get board's platform region
  var windowURL       = window.location.href;
  var start           = windowURL.indexOf(".") + 1;
  var end             = windowURL.indexOf(".", start);
  self.platformRegion = windowURL.substring(start, end);

  // Get page data
  self.page = null;
  if     ($("#discussions").length) self.page = "Index";  // Board Index
  else if($("#comments").length)    self.page = "Thread"; // Inside a thread

  self.title = $("#breadcrumbs h2")[0].textContent;
  if(typeof self.title === "undefined") alert("Undefined Title"); // ERROR! THIS SHOULD NOT HAPPEN!
  if(self.title == "My Updates")        self.page = "My Updates";

  self.threadMode = null;
  if     (self.page == "Thread" && $(".flat-comments").length)       self.threadMode = "Chrono";  // Chronological Mode
  else if(self.page == "Thread" && $(".flat-comments").length === 0) self.threadMode = "Discuss"; // Discussion Mode

  // Testing function that will probably be useful
  if(self.page == "Thread"){
    // === NEW ===
    // fek.LoadCss(`${domain}/fek/css/thread.css`);

    // === OLD ===
    // var head  = $("head")[0];
    // var link  = document.createElement("link");
    // link.id   = "fek-thread-css";
    // link.rel  = "stylesheet";
    // link.type = "text/css";
    // link.href = `${domain}/fek/css/thread.css`;
    // link.media = "all";
    // head.appendChild(link);
  }

  // FEK Options
  self.avatarSize                           = "off";
  self.fallbackAvatar                       = "off";
  self.votingDisplay                        = "off";
  self.blacklisting                         = "off";
  self.OPStyle                              = "off";
  self.removeProfHovPop                     = "off";
  self.enhancedThreadPreview                = "off";
  self.highlightMyThreads                   = "off";
  self.boardsDropdownMenu                   = "off";
  self.animateThumbnails                    = "off";
  self.emptyVoteReplacement                 = "off";
  self.embedMedia                           = "off";
  self.favoriteChampion                     = "off";
  self.favoriteSpell                        = "off";
  self.favoriteItem                         = "off";
  self.favoriteIcons                        = "off";
  self.rollDice                             = "off";
  self.hide                                 = {};
  self.hide["Gameplay"]                     = "off";
  self.hide["Story, Art, & Sound"]          = "off";
  self.hide["Esports"]                      = "off";
  self.hide["Team Recruitment"]             = "off";
  self.hide["Concepts & Creations"]         = "off";
  self.hide["Player Behavior & Moderation"] = "off";
  self.hide["Miscellaneous"]                = "off";
  self.hide["Memes & Games"]                = "off";
  self.hide["General Discussion"]           = "off";
  self.hide["Roleplay"]                     = "off";
  self.hide["Help & Support"]               = "off";
  self.hide["Report a Bug"]                 = "off";
  self.hide["Boards Feedback"]              = "off";

  // User data
  if($(".riotbar-summoner-info").length){
    self.myName   = $(".riotbar-summoner-name").first().text();
    self.myRegion = $(".riotbar-summoner-region").first().text();

    if     (self.myRegion == "North America")    self.myRegion = "NA";
    else if(self.myRegion == "Oceania")          self.myRegion = "OCE";
    else if(self.myRegion == "EU West")          self.myRegion = "EUW";
    else if(self.myRegion == "EU Nordic & East") self.myRegion = "EUNE";
  }

  // Misc
  self.originalPoster = "";                    // The name of the original poster in a thread
  self.currentDate    = new Date();            // Gets today's date
  self.RPint          = GM_getValue("_RP", 0); // Keeps track of which pinned threads the user has visited in the Roleplaying board
  self.alertPopUp     = false;                 // Only one alert can display at a time
                                               // 1: Can't connect to FEK server
                                               // 2: FEK needs to be updated
                                               // 3: API Error
                                               // 4: Account Management
                                               // 5: Roleplaying Alert
}

Fek.prototype.Main = function(url){
  var self = this;

  self.CreateGUI();
  self.CreateFeatures();
  self.SettleGUI(); // $("#fekpanel").style.setProperty("visibility", "hidden", "important");
  self.KeyWatch();

  if(document.title == "Boards")
    self.HideSubboards();

  try{
    self.AddFEKNavBar();
  }catch(err){
    self.ReportError("Error Code: 2");
  }

  // try{
  //   if(boardsDropdownMenu == "on")
  //     AddBoardsNavBar();
  // }catch(err){
  //   ReportError("Error Code: 3");
  // }

  try{
    if((self.page == "Thread" || self.page == "Index") && self.platformRegion == "na"){
      var markdownNav = document.getElementById("markdown-nav");
      var timeOut     = 2000, currentTime = 0;

      var interval = setInterval(function(){
        currentTime = currentTime + 1;

        if(currentTime >= timeOut){
          clearInterval(interval);
        }else{
          if(markdownNav.children.length){
            clearInterval(interval);
            self.RemoveNavListLinks();
          }
        }
      }, 1);
    }
  }
  catch(err){
    self.ReportError("Error Code: 4");
  }

  if(self.page == "Index"){
    if(self.emptyVoteReplacement != "off")
      self.EmptyVoteReplacement(); // For boards without voting

    if($(".no-voting").length)
      self.WaitAndRun(".no-voting", self.LoadIndex);
    else
      self.WaitAndRun(".total-votes", self.LoadIndex);
  }else if(self.page == "Thread"){
    self.WaitAndRun(".profile-hover", self.LoadThread);
  }

  if(self.page == "Thread" && self.favoriteIcons != "off")
    self.WaitAndRun(".button.gamedata.champion", self.FavoriteIcons);

  document.getElementById("fekpanel").style.setProperty("visibility", "visible", "important");

  if(self.RPint < 15 && self.title == "Roleplaying" && self.alertPopUp === false)
    self.RoleplayingAlert();

  self.Observer();
  self.Xyz();
};

///////////////////////////////
// LoadCSS: Loads a CSS file //
///////////////////////////////
Fek.prototype.LoadCss = function(url){
  var link = `<link rel="stylesheet" type="text/css" />`;
  $("head").append($(link).attr("href", url));
  // $("head").append($(abc).attr("href", encodeURI(url)));
};

//////////////////////////////////////////////////
// CreateGUI: Creates the GUI for the FEK panel //
//////////////////////////////////////////////////
Fek.prototype.CreateGUI = function(){
  var self = this;
  var tooltipshtml = `<div id="fektooltip">tooltip test</div>`;

  var panelhtml = `
  <div id="fekpanel">
    <div id="col1">
      <div id="logo" style="background:url(${self.FEKgfx}logo.png) no-repeat"></div>
      <div id="version">v${self.FEKversion}</div>
      <div id="tabs"></div>
    </div>
    <div id="col2">
      <div id="refreshNotice">
        Changes Saved. Click Here To Refresh The Page.
      </div>
      <div id="fekScrollRegion" class="fekScrollRegion"></div>
    </div>
  </div>
  `;

  var docbody = $("html").first().find("body:not(.wysiwyg)").first();
  docbody.append(panelhtml);
  docbody.append(tooltipshtml);

  // Hide FEK Panel so the user doesn't see a whole bunch
  // of random text for the second while the webpage loads
  $("#fekpanel").hide();
};

////////////////////////////////////////////////////////////
// CreateFeatures: This is where all FEK features are set //
////////////////////////////////////////////////////////////
Fek.prototype.CreateFeatures = function(){
  console.log("HAPPENING START");
  var self = this;
  var tabgroup, tab, category, options, tooltip;

  // Core Mods -> LoL Boards -> User Identities
  tabgroup = "Core Mods";
  tab      = "LoL Boards";
  category = "User Identities";

  //////////////////////////
  // Feature: FEK Avatars //
  //////////////////////////
  tooltip = "The size of FEK avatars.";
  options = ["100|100x100",
             "125|125x125",
             "150|150x150",
             "175|175x175",
             "200|200x200"];

  self.CreateFeature("FEK Avatars", "_fekAvatars", options, "100", tooltip, tabgroup, tab, category, function(option){
    self.avatarSize = parseInt(option);
  });

  ///////////////////////////////
  // Feature: Fallback Avatars //
  ///////////////////////////////
  tooltip = "The avatar to use when a person doesn't have a FEK avatar.";
  options = ["off|Disable",
             "1|Trident (Dark)",
             "2|Trident (Light)",
             "3|Trident (Parchment)",
             "4|Poro (Dark)",
             "5|Poro (Light)",
             "6|Poro (Parchment)",
             "7|Happy Cloud (Dark)",
             "8|Happy Cloud (Light)",
             "9|Happy Cloud (Parchment)"];

  self.CreateFeature("Fallback Avatars", "_fallbackAvatars", options, "off", tooltip, tabgroup, tab, category, function(option){
    if     (option == "1") self.fallbackAvatar = self.FEKgfx + "no-avatar-trident-dark.gif";
    else if(option == "2") self.fallbackAvatar = self.FEKgfx + "no-avatar-trident-light.gif";
    else if(option == "3") self.fallbackAvatar = self.FEKgfx + "no-avatar-trident-parchment.gif";
    else if(option == "4") self.fallbackAvatar = self.FEKgfx + "no-avatar-poro-dark.gif";
    else if(option == "5") self.fallbackAvatar = self.FEKgfx + "no-avatar-poro-light.gif";
    else if(option == "6") self.fallbackAvatar = self.FEKgfx + "no-avatar-poro-parchment.gif";
    else if(option == "7") self.fallbackAvatar = self.FEKgfx + "no-avatar-dark.gif";
    else if(option == "8") self.fallbackAvatar = self.FEKgfx + "no-avatar-light.gif";
    else if(option == "9") self.fallbackAvatar = self.FEKgfx + "no-avatar-parchment.gif";
  });

  //////////////////////////////
  // Feature: Enhanced Voting //
  //////////////////////////////
  tooltip = "Gives a green color to upvotes, and a red color to downvotes. Also gives you the choice of how to display votes when you hover your mouse over them.";
  options = ["off|Disable",
             "individual|Individual Votes",
             "total|Total Votes",
             "hide|Hide Votes"];

  self.CreateFeature("Enhanced Voting", "_enhancedVoting", options, "individual", tooltip, tabgroup, tab, category, function(option){
    self.votingDisplay = option;
  });

  ///////////////////////////
  // Feature: Blacklisting //
  ///////////////////////////
  tooltip = "Hides posts and threads made by users that you have on your blacklist. To blacklist somebody, hover your mouse over their avatar and click on blacklist";
  self.CreateFeature("Blacklisting", "_blacklisting", "", "on", tooltip, tabgroup, tab, category, function(option){
    self.blacklisting = option;
  });

  //////////////////////////////
  // Feature: OP Style Change //
  //////////////////////////////
  tooltip = "Removes the colored background on an original poster's posts.";
  self.CreateFeature("OP Style Change", "_opStyleChange", "", "on", tooltip, tabgroup, tab, category, function(option){
    self.OPStyle = option;
  });

  /////////////////////////////////////////
  // Feature: Remove Profile Hover Popup //
  /////////////////////////////////////////
  tooltip = "Removes Riot's profile popup when you hover over a user.";
  self.CreateFeature("Remove Profile Hover Popup", "_removeProfHovPop", "", "on", tooltip, tabgroup, tab, category, function(option){
    self.removeProfHovPop = option;
  });

  // Core Mods -> LoL Boards -> Navigation Enhancements
  tabgroup = "Core Mods";
  tab      = "LoL Boards";
  category = "Navigation Enhancements";

  //////////////////////////////////////
  // Feature: Enhanced Thread Preview //
  //////////////////////////////////////
  category = "Navigation Enhancements";
  tooltip  = "Replaces the default thread preview tooltip with a more visible and enhanced one.";
  self.CreateFeature("Enhanced Thread Preview", "_enhancedThreadPreview", "", "on", tooltip, tabgroup, tab, category, function(option){
    self.enhancedThreadPreview = option;
  });

  //////////////////////////////////
  // Feature: Thread Highlighting //
  //////////////////////////////////
  category = "Navigation Enhancements";
  tooltip  = "Threads created by you will have a colored background to stand out from the rest.";
  options = ["off|Disable",
             "#000000|Black",
             "#400000|Red",
             "#442000|Orange",
             "#303000|Yellow",
             "#002800|Green",
             "#003737|Cyan",
             "#000A50|Blue",
             "#551A8B|Purple",
             "#9400D3|Violet"];

  self.CreateFeature("Highlight My Threads", "_threadHighlight", options, "#000000", tooltip, tabgroup, tab, category, function(option){
    self.highlightMyThreads = option;
  });

  ///////////////////////////////////
  // Feature: Boards Dropdown Menu //
  ///////////////////////////////////
  category = "Navigation Enhancements";
  tooltip  = "Adds a dropdown menu when you hover your mouse over the Boards button at the top of the page on the navigation bar.";
  self.CreateFeature("Boards Dropdown Menu", "_boardsDropdownMenu", "", "on", tooltip, tabgroup, tab, category, function(option){
    self.boardsDropdownMenu = option;
  });

  /////////////////////////////////
  // Feature: Animate Thumbnails //
  /////////////////////////////////
  category = "Navigation Enhancements";
  tooltip  = "Animates thumbnails (if they have one) for a thread's image on the index. You may also choose to hide thumbnails completely.";
  options = ["off|Disable",
             "animate|Animate thumbnails",
             "hide|Hide thumbnails"];
  self.CreateFeature("Thumbnails", "_thumbnails", options, "animate", tooltip, tabgroup, tab, category, function(option){
    self.animateThumbnails = option;
  });

  ////////////////////////////
  // Feature: Sticky Navbar //
  ////////////////////////////
  category = "Navigation Enhancements";
  tooltip  = "Keeps the Navbar at the top of the browser window even when you scroll down.";
  self.CreateFeature("Sticky Navbar", "_stickyNavbar", "", "off", tooltip, tabgroup, tab, category, function(option){
    document.getElementById("riotbar-bar").style.setProperty("position", "fixed");
    document.getElementById("riotbar-bar").style.setProperty("top",      "0px");
  });

  ///////////////////////////////////////
  // Feature: Empty Vote Replacement //
  ///////////////////////////////////////
  category = "Navigation Enhancements";
  tooltip  = "If votes aren't displayed, extra stuff can be added to fill the gap.";
  options = ["off|Disable",
             "banners|Green banners",
             "bannersavatars|Green banners and avatars"];
  self.CreateFeature("Empty Vote Replacement", "_emptyvotereplacement", options, "off", tooltip, tabgroup, tab, category, function(option){
    self.emptyVoteReplacement = option;
  });

  // Core Mods -> LoL Boards -> Multimedia
  tabgroup = "Core Mods";
  tab      = "LoL Boards";
  category = "Multimedia";

  //////////////////////////////
  // Feature: Media Embedding //
  //////////////////////////////
  tooltip = "Embeds .webm and YouTube movies into the posts themselves, rather than showing up as just links.";
  self.CreateFeature("Media Embedding", "_mediaEmbedding", "", "on", tooltip, tabgroup, tab, category, function(option){
    self.embedMedia = option;
  });
  console.log("HAPPENING END");
  // Core Mods -> LoL Boards -> Miscellaneous
  tabgroup = "Core Mods";
  tab      = "LoL Boards";
  category = "Miscellaneous";

  ////////////////////////////////
  // Feature: Favorite Champion //
  ////////////////////////////////
  tooltip = "Champion icon that will be used when making posts.";
  options = ["aatrox|Aatrox",
             "ahri|Ahri",
             "akali|Akali",
             "alistar|Alistar",
             "amumu|Amumu",
             "anivia|Anivia",
             "annie|Annie",
             "ashe|Ashe",
             "azir|Azir",
             "bard|Bard",
             "blitzcrank|Blitzcrank",
             "brand|Brand",
             "braum|Braum",
             "caitlyn|Caitlyn",
             "cassiopeia|Cassiopeia",
             "chogath|Cho'Gath",
             "corki|Corki",
             "darius|Darius",
             "diana|Diana",
             "drmundo|Dr. Mundo",
             "draven|Draven",
             "ekko|Ekko",
             "elise|Elise",
             "evelynn|Evelynn",
             "ezreal|Ezreal",
             "fiddlesticks|Fiddlesticks",
             "fiora|Fiora",
             "fizz|Fizz",
             "galio|Galio",
             "gangplank|Gangplank",
             "garen|Garen",
             "gnar|Gnar",
             "gragas|Gragas",
             "graves|Graves",
             "hecarim|Hecarim",
             "heimerdinger|Heimerdinger",
             "irelia|Irelia",
             "janna|Janna",
             "jarvaniv|Jarvan IV",
             "jax|Jax",
             "jayce|Jayce",
             "jinx|Jinx",
             "kalista|Kalista",
             "karma|Karma",
             "karthus|Karthus",
             "kassadin|Kassadin",
             "katarina|Katarina",
             "kayle|Kayle",
             "kennen|Kennen",
             "khazix|Kha'Zix",
             "kindred|Kindred",
             "kogmaw|Kog'Maw",
             "leblanc|LeBlanc",
             "leesin|Lee Sin",
             "leona|Leona",
             "lissandra|Lissandra",
             "lucian|Lucian",
             "lulu|Lulu",
             "lux|Lux",
             "malphite|Malphite",
             "malzahar|Malzahar",
             "maokai|Maokai",
             "masteryi|Master Yi",
             "missfortune|Miss Fortune",
             "mordekaiser|Mordekaiser",
             "morgana|Morgana",
             "nami|Nami",
             "nasus|Nasus",
             "nautilus|Nautilus",
             "nidalee|Nidalee",
             "nocturne|Nocturne",
             "nunu|Nunu",
             "olaf|Olaf",
             "orianna|Orianna",
             "pantheon|Pantheon",
             "poppy|Poppy",
             "quinn|Quinn",
             "rammus|Rammus",
             "reksai|Rek'Sai",
             "renekton|Renekton",
             "rengar|Rengar",
             "riven|Riven",
             "rumble|Rumble",
             "ryze|Ryze",
             "sejuani|Sejuani",
             "shaco|Shaco",
             "shen|Shen",
             "shyvana|Shyvana",
             "singed|Singed",
             "sion|Sion",
             "sivir|Sivir",
             "skarner|Skarner",
             "sona|Sona",
             "soraka|Soraka",
             "swain|Swain",
             "syndra|Syndra",
             "tahmkench|Tahm Kench",
             "talon|Talon",
             "taric|Taric",
             "teemo|Teemo",
             "thresh|Thresh",
             "tristana|Tristana",
             "trundle|Trundle",
             "tryndamere|Tryndamere",
             "twistedfate|Twisted Fate",
             "twitch|Twitch",
             "udyr|Udyr",
             "urgot|Urgot",
             "varus|Varus",
             "vayne|Vayne",
             "veigar|Veigar",
             "velkoz|Vel'Koz",
             "vi|Vi",
             "viktor|Viktor",
             "vladimir|Vladimir",
             "volibear|Volibear",
             "warwick|Warwick",
             "wukong|Wukong",
             "xerath|Xerath",
             "xinzhao|Xin Zhao",
             "yasuo|Yasuo",
             "yorick|Yorick",
             "zac|Zac",
             "zed|Zed",
             "ziggs|Ziggs",
             "zilean|Zilean",
             "zyra|Zyra"];
  self.CreateFeature("Favorite Champion", "_favoritechampion", options, "fizz", tooltip, tabgroup, tab, category, function(option){
    self.favoriteChampion = option;
  });

  //////////////////////////////////////
  // Feature: Favorite Summoner Spell //
  //////////////////////////////////////
  tooltip = "Spell icon that will be used when making posts.";
  options = ["barrier|Barrier",
             "clairvoyance|Clairvoyance",
             "clarity|Clarity",
             "cleanse|Cleanse",
             "exhaust|Exhaust",
             "flash|Flash",
             "garrison|Garrison",
             "ghost|Ghost",
             "heal|Heal",
             "ignite|Ignite",
             "mark|Mark",
             "porotoss|Poro Toss",
             "smite|Smite",
             "teleport|Teleport",
             "totheking|To the King"];
  self.CreateFeature("Favorite Summoner Spell", "_favoritesummonerspell", options, "ignite", tooltip, tabgroup, tab, category, function(option){
    self.favoriteSpell = option;
  });

  ////////////////////////////
  // Feature: Favorite Item //
  ////////////////////////////
  tooltip = "Item icon that will be used when making posts.";
  options = ["blackcleaver|Black Cleaver",
             "bladeoftheruinedking|Blade of the Ruined King",
             "bootsofmobility|Boots of Mobility",
             "bootsofswiftness|Boots of Swiftness",
             "deathfiregrasp|Deathfire Grasp",
             "deathsdance|Death's Dance",
             "deathsdaughter|Death's Daughter",
             "doransring|Doran's Ring",
             "essencereaver|Essence Reaver",
             "frostqueensclaim|Frost Queen's Claim",
             "headofkhazix|Head of Kha'Zix",
             "hextechglp800|Hextech GLP-800",
             "hextechgunblade|Hextech Gunblade",
             "hextechprotobelt01|Hextech Protobelt-01",
             "huntersmachete|Hunter's Machete",
             "infinityedge|Infinity Edge",
             "lastwhisper|Last Whisper",
             "liandrystorment|Liandry's Torment",
             "lichbane|Lich Bane",
             "locketoftheironsolari|Locket of the Iron Solari",
             "lostchapter|Lost Chapter",
             "orbofwinter|Orb of Winter",
             "phantomdancer|Phantom Dancer",
             "rabadonsdeathcap|Rabadon's Deathcap",
             "ravenoushydra|Ravenous Hydra",
             "sightstone|Sightstone",
             "talismanofascension|Talisman of Ascension",
             "tearofthegoddess|Tear of the Goddess",
             "theblackcleaver|The Black Cleaver",
             "thornmail|Thornmail",
             "trinityforce|Trinity Force",
             "warmogsarmor|Warmog's Armor",
             "youmuusghostblade|Youmuu's Ghostblade",
             "zeal|Zeal",
             "zhonyashourglass|Zhonya's Hourglass",
             "zzrotportal|Zz'Rot Portal"];
  self.CreateFeature("Favorite Item", "_favoriteitem", options, "lichbane", tooltip, tabgroup, tab, category, function(option){
    self.favoriteItem = option;
  });

  /////////////////////////////
  // Feature: Favorite Icons //
  /////////////////////////////
  tooltip  = "How favorite icons (champion/spell/item) are displayed.";
  options = ["off|Disable",
             "on|Always On",
             "mouseover|Mouse Over"];
  self.CreateFeature("Favorite Icons", "_favoriteicons", options, "mouseover", tooltip, tabgroup, tab, category, function(option){
    self.favoriteIcons = option;
  });

  ////////////////////////
  // Feature: Roll Dice //
  ////////////////////////
  tooltip = "Shows dice rolls. Disable this feature to completely hide them.";
  self.CreateFeature("Roll Dice", "_rollDice", "", "on", tooltip, tabgroup, tab, category, function(option){
    self.rollDice = option;
  });

  ///////////////////////////
  // Feature: Blacklisting //
  ///////////////////////////
  if(self.blacklisting == "on"){
    self.PanelCreateTab(tabgroup, "Blacklist", function(contentview){
      $(`#tab[tab="core-mods-blacklist"]`).click(function(){
        contentview.html("<h1>Blacklisted Users</h1><br>Click on a name to remove it from your blacklist<br><br>");

        var vals = GM_listValues();
        for(var i = 0; i < vals.length; i++){
          if(vals[i][0] != "_"){
            var myThing = document.createElement("div");
            myThing.innerHTML = `<a href="#">${vals[i]}</a><br>`;

            $(myThing).click(function(event){
              event.preventDefault();
              event.stopPropagation();
              GM_deleteValue(this.textContent);
              this.remove();
            });

            contentview[0].appendChild(myThing);
          }
        }
      });
    });
  }

  // Core Mods -> Hidden Boards -> These boards are hidden from the front page
  tabgroup = "Core Mods";
  tab      = "Hidden Boards";
  category = "These boards are hidden from the front page";

  /////////////////////////////
  // Feature: Hide Subboards //
  /////////////////////////////
  function HideSubboard(boardName, optionVar){
    tooltip  = "Hide threads from " + boardName;

    self.CreateFeature(boardName, optionVar, "", "off", tooltip, tabgroup, tab, category, function(option){
      self.hide[boardName] = option;
    });
  }

  HideSubboard("Gameplay",                     "_gameplay");
  HideSubboard("Story, Art, & Sound",          "_storyartsound");
  HideSubboard("Esports",                      "_esports");
  HideSubboard("Team Recruitment",             "_teamrecruitment");
  HideSubboard("Concepts & Creations",         "_conceptscreations");
  HideSubboard("Player Behavior & Moderation", "_playerbehaviormoderation");
  HideSubboard("Miscellaneous",                "_miscellaneous");
  HideSubboard("Memes & Games",                "_memesgames");
  HideSubboard("General Discussion",           "_generaldiscussion");
  HideSubboard("Roleplay",                     "_roleplay");
  HideSubboard("Help & Support",               "_helpsupport");
  HideSubboard("Report a Bug",                 "_reportabug");
  HideSubboard("Boards Feedback",              "_boardsfeedback");

  /////////////////////////
  // Feature: Fish Chips //
  /////////////////////////
  self.PanelCreateTab(tabgroup, "Fish Chips", function(contentview){
    $(`#tab[tab="core-mods-fish-chips"]`).click(function(){
      self.LoadWebPanel("fishchips", contentview);
    });
  });

  // New Tabgroup: Social
  tabgroup = "Social";

  self.PanelCreateTab(tabgroup, "Friends", function(contentview){
    $(`#tab[tab="social-friends"]`).click(function(){
      self.LoadWebPanel("friends", contentview);
    });
  });

  self.PanelCreateTab(tabgroup, "Messages", function(contentview){
    $(`#tab[tab="social-messages"]`).click(function(){
      self.LoadWebPanel("messages", contentview);
    });
  });

  self.PanelCreateTab(tabgroup, "Send PM", function(contentview){
    $(`#tab[tab="social-send-pm"]`).click(function(){
      self.LoadWebPanel("sendpm", contentview);
    });
  });

  // New Tabgroup: FEK
  tabgroup = "FEK";

  ///////////////////////////
  // Twitter Announcements //
  ///////////////////////////
  self.PanelCreateTab(tabgroup, "Announcements", function(contentview){
    contentview.html("Loading Announcements...");

    // Prepare the twitter popup html
    var docbody = $("html").first().find("body:not(.wysiwyg)").first();
    docbody.append(`<div id="twitter_row" class="popup"></div>`);

    $(document).on("tweetsLoaded", function(){
      contentview.html("<h1>Announcements</h1>");
      if(self.FEKtweets.length){
        for(var i = 0; i < self.FEKtweets.length; i++){
          contentview.append(`
          <div id="twitter_row">
            <div id="twitterlink">
              <a href="http://twitter.com/${self.FEKtweets[i].user[0]}" target="_blank">
                <img src="${self.FEKgfx}twittericon.png">
              </a>
            </div>
            <h2>${self.ParseTwitterDate(self.FEKtweets[i].created_at)}</h2>
            <img id="twitter_img" src="${self.FEKtweets[i].user[2]}">
            <span id="twitter_text">${self.ReplaceUrlWithHtmlLink(self.FEKtweets[i].text.replace("#FEK ", ""))}</span>
            <span style="opacity:0; clear:both;">.</span>
            <div id="spike"></div>
          </div>
          `);
        }

        //Compare last read announcement to current one
        if(GM_getValue("_lastReadTwitter", "") == self.FEKtweets[0].id){
          // The latest announcement has been read
        }else{
          // The latest announcement has NOT been read yet
          // Append alert icons for unread announcements
          self.alertHTML = `<span id="fekalert" style="position:relative; top:-2px; padding:3px; padding-left:2px; padding-right:2px; font:8px bold Arial, Helvetica, 'Sans Serif'; border:1px solid #ff8800; margin-left:5px; background:#222222; border-radius:8px; color:#ffffff; text-shadow: 1px 1px rgba(0,0,0,.8);">NEW</span>`;

          $(`a[href="#fekpanel"]`).eq(0).append(self.alertHTML);
          $(`a[href="#fekpanel"]`).eq(1).append(self.alertHTML);
          $(`#fekpanel #tab[tab="misc-announcements"]`).append(self.alertHTML);
          $(`body #twitter_row.popup`).html(`
          <div id="twitterlink">
            <a href="http://twitter.com/Tundra_Fizz" target="_blank">
              <img src="${self.FEKgfx}twittericon.png">
            </a>
          </div>
          <h2>
            ${self.ParseTwitterDate(self.FEKtweets[0].created_at)}
          </h2>
          <img id="twitter_img" src="${self.FEKtweets[0].user[2]}">
          <span id="twitter_text">
            ${self.ReplaceUrlWithHtmlLink(self.FEKtweets[0].text.replace("#FEK ", ""))}
          </span>
          <div id="dismiss">
            Click here to dismiss the notification
          </div>
          <span style="opacity:0; clear:both;">
            .
          </span>
          <div id="spike"></div>
          `);

          $("body #twitter_row.popup").fadeIn();
        }
      }

      // Now we need to have it mark announcements as read when dismissed or announcement tab is clicked
      $("#dismiss").click(function(event){
        if(self.FEKtweets[0])
          GM_setValue("_lastReadTwitter", self.FEKtweets[0].id);
        $("body #twitter_row.popup").fadeOut();
        $("body #fekalert").each(function(){
          $(this).fadeOut();
        });
      });
    });
  });

  ///////////////
  // Changelog //
  ///////////////
  self.PanelCreateTab(tabgroup, "Changelog", function(contentview){
    $(`#tab[tab*="fek-changelog"]`).click(function(){
      self.LoadWebPanel("changelog", contentview);
    });
  });

  ////////////
  // Donate //
  ////////////
  self.PanelCreateTab(tabgroup, "Donate", function(contentview){
    $(`#tab[tab*="fek-donate"]`).click(function(){
      self.LoadWebPanel("donate", contentview);
    });
  });

  // Register the hotkey ~ to toggle the FEK panel on and off
  self.hotkeys["192"] = function(state, event){
    if(state === "keyup" && !$("input").is(":focus") && !$("textarea").is(":focus"))
      self.PanelToggle();
  };
};

////////////////////////////////////////////////////////////
// CreateFeature: Used within the CreateFeatures function //
////////////////////////////////////////////////////////////
Fek.prototype.CreateFeature = function(label, variablename, options, initvalue, tooltip, tabgroup, tab, category, callback){
  var self = this;

  // Registers a feature with the gui to handle variable reading/writing and then runs the callback function
  // Get the saved value if it exists, otherwise load the initvalue
  var useInitValue = GM_getValue(variablename, initvalue);

  // Check if the provided saved value is in the options group, if not reset it to the default option
  if(options){
    var validOption = false;
    for(var index = 0; index < options.length; ++index){
      // Split the option and associated value apart
      var optionpair = options[index].split("|");

      if(optionpair[0] === useInitValue)
        validOption = true;
    }

    if(!validOption && useInitValue !== "off")
      useInitValue = initvalue; // The user selected option no longer exists
  }

  // Create the tab for the feature
  self.PanelCreateTab(tabgroup, tab, function(contentview){
    // The tab has been created, and we can now create the button within the returned contentview
    var buttonhtml, tooltiphtml, optionpair, initclass, initstyle;
    var scategory = category.replace( /[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "-").toLowerCase();

    // Create the category if it doesn't exist
    if(contentview.find(`#optiongroup[optiongroup="${scategory}"]`).length === 0){
      contentview.append(`
      <div id="optiongroup" optiongroup="${scategory}">
        <h1 class="breakhead">${category}</h1>
      </div>
      `);
    }

    tooltiphtml = `
    <div id="fektooltip-data">
      <span id="ttlabel">${label}</span><br>
      <span id="loadtime"></span>
      <p>${tooltip}</p>
    </div>
    `;

    if(variablename == "dummy")
      contentview.find(`#optiongroup[optiongroup="${scategory}"]`).append(`<div id="button" style="visibility: hidden;"></div>`);
    else if(options && typeof options ==="object"){
      // Create the button toggle for the feature, checking if options is supplied to make it a dropdown
      // An array of options has been provided, so this is a dropdown
      var initlabel, listhtml = "";
      optionpair = "";

      // Prepare the list html
      for(var index = 0; index < options.length; ++index){
        // Split the option and associated value apart
        optionpair = options[index].split("|");
        listhtml = listhtml + `<li fekvalue="${optionpair[0]}">${optionpair[1]}</li>`;
        if(optionpair[0] === useInitValue)
          initlabel = optionpair[1];
      }

      // Prepare the button html
      if(useInitValue === "off"){
        initclass = "inactive ";
        initstyle = `background-position:center; background-repeat:no-repeat; background-image:url("${self.FEKgfx}button-off.png");`;
        initlabel = "Disable";
      }else{
        initclass = "";
        initstyle = `background-position:center; background-repeat:no-repeat; background-image:url("${self.FEKgfx}button-on.png");`;
      }

      buttonhtml = `
      <div id="button" class="${initclass}dropdown" fekvar="${variablename}" style="background-position:right 10px; background-repeat:no-repeat; background-image:url('${self.FEKgfx}drop-indicator.png');">
        ${tooltiphtml}
        <div id="indicator" style="${initstyle}"></div>
        <span id="label">${label}</span>
        <span id="choice" fekvalue="${useInitValue}">${initlabel}</span>
        <ul>
          ${listhtml}
        </ul>
      </div>
      `;

      contentview.find(`#optiongroup[optiongroup="${scategory}"]`).append(buttonhtml);
    }else{
      // No options provided, so this is a toggle
      if(useInitValue === "off"){
        initclass = "inactive";
        initstyle = `background-position:center; background-repeat:no-repeat; background-image:url("${self.FEKgfx}button-off.png");`;
      }else{
        initclass = "";
        initstyle = `background-position:center; background-repeat:no-repeat; background-image:url("${self.FEKgfx}button-on.png");`;
      }

      buttonhtml = `
      <div id="button" class="${initclass}" fekvar="${variablename}">
        ${tooltiphtml}
        <div id="indicator" style="${initstyle}"></div>
        <span id="label">${label}</span>
      </div>
      `;

      contentview.find(`#optiongroup[optiongroup="${scategory}"]`).append(buttonhtml);
    }
  });

  // Run the feature by callback if it isn't disabled
  if(useInitValue !== "off")
    callback(useInitValue);
};

/////////////////////////////////////////////////////////////////////////////////
// SettleGUI: Sets the FEK panel to a default tab so that it doesn't look ugly //
/////////////////////////////////////////////////////////////////////////////////
Fek.prototype.SettleGUI = function(){
  // This sets the GUI panel to the first tab
  $("#fekpanel #tab").each(function(){
    // Remove all contentviews and active tabs
    $(this).removeClass("active");
    $("#fekpanel #col2 #contentview").hide();
  });

  // Now set our active tab and contentview to the first tab listed
  $("#fekpanel #tab:first").addClass("active");
  $(`#fekpanel #col2 #contentview[tablink="${$("#fekpanel #tab:first").attr("tab")}"]`).show();
};

////////////////////////////////////////////////////////////////
// PanelCreateTab: Creates a new tab on the FEK control panel //
////////////////////////////////////////////////////////////////
Fek.prototype.PanelCreateTab = function(tabgroup, tab, callback){
  // This will create a tab and content view with the supplied paramaters and send the contentview element back to the calling function
  // Prepare special compatible/safe tag names by replacing characters and casing
  var stabgroup = tabgroup.replace( /[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "-").toLowerCase();
  var stab      = tab.replace( /[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "-").toLowerCase();

  // Check if the tabgroup exists
  if($(`#fekpanel #col1 #tabgroup[tabgroup="${stabgroup}"]`).length <= 0){
    // Create the tabgroup
    $(`#fekpanel #col1 #tabs`).append(`
    <div id="tabgroup" tabgroup="${stabgroup}">
      <h1>${tabgroup}</h1>
    </div>
    `);
  }

  // Create the tab it if doesn't exist
  if($(`#tab[tab="${stabgroup}-${stab}"]`).length === 0)
    $(`#tabgroup[tabgroup="${stabgroup}"]`).append(`
    <div id="tab" tab="${stabgroup}-${stab}">
      ${tab}
      <div id="indicator"></div>
    </div>
    `);

  // Create the contentview if it doesn't exist
  if($(`#fekpanel #col2 .fekScrollRegion #contentview[tablink="${stabgroup}-${stab}"]`).length === 0)
    $("#fekpanel #col2 .fekScrollRegion").append(`
    <div id="contentview" tablink="${stabgroup}-${stab}"></div>
    `);

  // Now that we've setup the tab and contentview panel, lets send the contentview through the callback
  callback($(`#contentview[tablink="${stabgroup}-${stab}"]`));
};

////////////////////////////////////////////
// PanelShow: Shows the FEK control panel //
////////////////////////////////////////////
Fek.prototype.PanelShow = function(){
  var self = this;
  if($("#fekpanel").is(":visible")){
    // If the panel is already visible when show is called, do nothing
  }else{
    // Hide all content views to speed up the .show animation
    $("#fekScrollRegion").hide();

    // Show the panels off-screen so that we can perform pre-animation calculations
    $( "#fekpanel #col1" ).css("left", "-200vw");
    $( "#fekpanel #col2" ).css("left", "-200vw");

    $("#fekpanel").show(); $("#fekpanel #col2").show();

    // Get current panel widths
    var col1width = $("#fekpanel #col1").outerWidth();
    var col2width = $("#fekpanel #col2").outerWidth();

    // Set start points
    $( "#fekpanel #col1" ).css("left", "-" + col1width + "px");
    $( "#fekpanel #col2" ).css("left", "-" + col2width + "px");

    // Animate
    $("#fekpanel #col1" ).stop().animate({left: "0px"}, 200, function(){
      $("#fekpanel #col2").css("left","-" + (col2width - col1width) + "px");
      $( "#fekpanel #col2" ).stop().animate({left: col1width + "px"}, 150, function(){
        // Hide all content views to speed up the .show animation
        $("#fekScrollRegion").show();
        self.InitScrollbar(".fekScrollRegion");
      });
    });
  }
};

////////////////////////////////////////////
// PanelHide: Hides the FEK control panel //
////////////////////////////////////////////
Fek.prototype.PanelHide = function(){
  // Get current panel widths
  var col1width = $("#fekpanel #col1").outerWidth();
  var col2width = $("#fekpanel #col2").outerWidth();

  // Hide all content views to speed up the .show animation
  $("#fekScrollRegion").hide();

  // Animate
  $("#fekpanel #button").find("ul").hide();
  $("#fekpanel #col2" ).stop().animate({left: "-" + (col2width - col1width) + "px"}, 150, function(){
    $("#fekpanel #col2").hide();
    $( "#fekpanel #col1" ).stop().animate({left: "-" + (col1width) + "px"}, 200, function(){
      $("#fekpanel").hide();
    });
  });
};

////////////////////////////////////////////////
// PanelToggle: Toggles the FEK control panel //
////////////////////////////////////////////////
Fek.prototype.PanelToggle = function(){
  var self = this;
  if($("#fekpanel").is(":visible"))
    self.PanelHide();
  else
    self.PanelShow();
};

/////////////////////////////////////////////////////////////////////////////////
// LoadWebPanel: Loads web panels such as Credits, Announcements, Events, etc. //
/////////////////////////////////////////////////////////////////////////////////
Fek.prototype.LoadWebPanel = function(page, container){
  var self = this;
  var formData = new FormData();
  formData.append("page", page);

  self.SendToServer(`${self.domain}/webpanel`, formData, function(data){
    container.html(data);
    self.InitScrollbar(".fekScrollRegion");
  });
};

///////////////////////////////////////////////
// InitScrollbar: Initializes the scroll bar //
///////////////////////////////////////////////
Fek.prototype.InitScrollbar = function(element){
  var elm;
  var supressx = false;
  var supressy = false;

  // Turn the provided element into an object, whether it was a selector or dom object passed
  elm = $(element);

  // Check for overflow values
  if(!elm.hasOverflowX()) {supressx = true;}
  if(!elm.hasOverflowY()) {supressy = true;}

  // Setup the css
  elm.css("overflow", "hidden");

  // Check if scrollbar exists already. if it does, update it's values
  if(elm.hasClass("ps-container")){
    // Update the scrollbar
    elm.perfectScrollbar("destroy");
    elm.perfectScrollbar({wheelSpeed: 30, useKeyboard: true, minScrollbarLength: 35, suppressScrollY: supressy, suppressScrollX: supressx});
  }else{
    // Create the scrollbar
    elm.perfectScrollbar({wheelSpeed: 30, useKeyboard: true, minScrollbarLength: 35, suppressScrollY: supressy, suppressScrollX: supressx});

    // Register our element's scrollbars to update on resize
    $(window).resize(function(){
      elm.perfectScrollbar("update");
    });
  }

  // Destroy the scrollbar if it isn't needed and remove the class we reference
  if(!elm.hasOverflow()){
    elm.perfectScrollbar("destroy");
    elm.removeClass("ps-container");
  }
};

//////////////////////////////////////
// KeyWatch: Watches for keypresses //
//////////////////////////////////////
Fek.prototype.KeyWatch = function(){
  var self = this;
  // Clear the active keys when the window is focused or when the text area is refocused
  $(window).focus(function(){
    self.activeKeys = [];
  });

  // Watch for key modifiers being held down
  $(document).keydown(function(event){
    var i = self.activeKeys.indexOf(event.which);
    if(i == -1)
      self.activeKeys.push(event.which);

    if(self.hotkeys[event.which] && typeof self.hotkeys[event.which] === "function")
      self.hotkeys[event.which]("keydown", event);
  });

  // Watch for key modifiers being released
  $(document).keyup(function(event){
    if(self.hotkeys[event.which] && typeof self.hotkeys[event.which] === "function")
      self.hotkeys[event.which]("keyup", event);

    var i = self.activeKeys.indexOf(event.which);

    if(i != -1)
      self.activeKeys.splice(i, 1);
  });

  // Setup the fek tooltip
  $(document).on("mousemove", function(e){
    if($("#fektooltip").css("opacity") > 0){
      $("#fektooltip").css({
        left:  e.pageX + 20,
        top:   e.pageY - 20
      });
    }else{
      $("#fektooltip").css({
        left:  -10000
      });
    }
  });

  $("#fekpanel #button").mouseenter(function(){
    $("#fektooltip").html($(this).find("#fektooltip-data").html());
    $("#fektooltip").css("opacity", 1);
  });

  $("#fekpanel #button").mouseleave(function(){
    $("#fektooltip").html($(this).find("#fektooltip-data").html());
    $("#fektooltip").css("opacity", 0);
  });

  // Allow clicking away from the panel to close the panel
  $("body").click(function(){
    self.PanelHide();
  });

  $("#fekpanel").click(function(event){
    event.stopPropagation();
    $("#fekpanel #button").find("ul").hide();
  });

  // Register click events and activates the feklink tabs
  $("body").on("click", `a[href*="#fektab"]`, function(event){
    event.stopPropagation();
    event.preventDefault();
    var tab = $(this).attr("href").replace("#fektab-","");
    $(`#tab[tab="${tab}"]`).trigger("click");
    self.PanelShow();
  });

  $(`a[href="#fekpanel"]`).click(function(event){
    event.stopPropagation();
    event.preventDefault();
    self.PanelToggle();
  });

  $("#fekpanel #tab").click(function(){
    $("#fekpanel #tab").each(function(){
      // Remove all contentviews and active tabs
      $(this).removeClass("active");
      $("#fekpanel #col2 #contentview").hide();
    });

    $(this).addClass("active");
    $("#fekpanel #col2 .fekScrollRegion").scrollTop(0);
    $("#fekpanel #col2 #contentview[tablink=" +$(this).attr("tab") + "]").show();
    self.InitScrollbar(".fekScrollRegion");
  });

  $("#fekpanel").on("mousewheel", function(event){
    event.preventDefault();
  });

  $("#fekpanel #button").find("ul").on("mousewheel", function(event){
    event.stopPropagation();
    event.preventDefault();
  });

  $("#fekpanel #button").click(function(event){
    event.stopPropagation();
    if($(this).hasClass("dropdown")){
      if($(this).find("ul").is(":visible"))
        $(this).find("ul").hide();
      else{
        $("#fekpanel #button").find("ul").hide();
        $("#fekpanel #button").css("z-index", "9998");
        $(this).find("ul").show();
        $(this).css("z-index", "9999");
        $(this).find("ul").scrollTop(0);
        self.InitScrollbar($(this).find("ul"));
      }
    }else{
      $("#fekpanel #button").find("ul").hide();
      $("#refreshNotice").addClass("visible");

      var variablename = $(this).attr("fekvar");

      if($(this).hasClass("inactive")){
        // Turn the variable on and save state
        GM_setValue(variablename, "on");
        $(this).removeClass("inactive");
        $(this).find("#indicator").attr("style", "background-position:center; background-repeat:no-repeat; background-image:url(\"" + self.FEKgfx + "button-on.png\");");
      }else{
        // Turn the variable and save state
        GM_setValue(variablename, "off");
        $(this).addClass("inactive");
        $(this).find("#indicator").attr("style", "background-position:center; background-repeat:no-repeat; background-image:url(\"" + self.FEKgfx + "button-off.png\");");
      }
    }
  });

  $("#fekpanel #button ul li").click(function(){
    var previousChoice = $(this).closest("#button").find("#choice").text();
    if($(this).text() !== previousChoice){
      var variablename = $(this).parent().parent().attr("fekvar");
      GM_setValue(variablename, $(this).attr("fekvalue"));
      $("#refreshNotice").addClass("visible");
    }

    $(this).closest("#button").find("#choice").html($(this).html());
    $(this).closest("#button").find("#choice").attr("fekvalue", $(this).attr("fekvalue"));

    if($(this).attr("fekvalue") === "off"){
      if($(this).closest("#button").hasClass("inactive")){
        // Nothing
      }else{
        $(this).closest("#button").addClass("inactive");
        $(this).closest("#button").find("#indicator").attr("style", "background-position:center; background-repeat:no-repeat; background-image:url(\"" + self.FEKgfx + "button-off.png\");");
      }
    }else{
      $(this).closest("#button").removeClass("inactive");
      $(this).closest("#button").find("#indicator").attr("style", "background-position:center; background-repeat:no-repeat; background-image:url(\"" + self.FEKgfx + "button-on.png\");");
    }
  });

  $("#refreshNotice").click(function(){
    location.reload();
  });
};

///////////////////////////////////////////////////////////////////
// CreateAlertBox: Creates an alert box at the top of the window //
///////////////////////////////////////////////////////////////////
Fek.prototype.CreateAlertBox = function(top, background, border, color, innerHTML){
  var self = this;
  var apolloHeader = document.getElementsByClassName("apollo-header")[0];
  var alertBanner = document.createElement("div");
  apolloHeader.appendChild(alertBanner);

  alertBanner.style.setProperty("position",              "absolute");
  alertBanner.style.setProperty("top",                   top);
  alertBanner.style.setProperty("left",                  "50%");
  alertBanner.style.setProperty("width",                 "600px");
  alertBanner.style.setProperty("margin-left",           "-300px");
  alertBanner.style.setProperty("padding",               "10px");
  alertBanner.style.setProperty("background",            background);
  alertBanner.style.setProperty("border",                "2px solid " + border);
  alertBanner.style.setProperty("color",                 color);
  alertBanner.style.setProperty("-webkit-border-radius", "4px");
  alertBanner.style.setProperty("-moz-border-radius",    "4px");
  alertBanner.style.setProperty("border-radius",         "4px");
  alertBanner.style.setProperty("-webkit-box-shadow",    "0px 0px 5px rgba(0, 0, 0, 0.9)");
  alertBanner.style.setProperty("-moz-box-shadow",       "0px 0px 5px rgba(0, 0, 0, 0.9)");
  alertBanner.style.setProperty("box-shadow",            "0px 0px 5px rgba(0, 0, 0, 0.9)");
  alertBanner.style.setProperty("text-shadow",           "1px 1px rgba(0,0,0,.8)");

  alertBanner.innerHTML = innerHTML;
  self.alertPopUp = true;
};

///////////////////////////////////////////////
// ParseTwitterDate: Parses the Twitter date //
///////////////////////////////////////////////
Fek.prototype.ParseTwitterDate = function(text){
  var date = new Date(Date.parse(text)).toLocaleDateString();
  var time = new Date(Date.parse(text)).toLocaleTimeString();

  // Remove the seconds from the timestamp
  var i = time.lastIndexOf(":");
  time = time.slice(0, i) + time.slice(i+3, time.length);

  return date + " - " + time;
};

///////////////////////////////////////////////////////////////////////
// ReplaceUrlWithHtmlLink: Replaces URLs with HTML links for twitter //
///////////////////////////////////////////////////////////////////////
Fek.prototype.ReplaceUrlWithHtmlLink = function(text){
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
  return text.replace(exp, `<a href="$1" target="_blank">$1</a>`);
};

////////////////////////////////////////////////////////////////////////
// GetBadgesAndTitle: Gets a user's badges and title using Riot's API //
////////////////////////////////////////////////////////////////////////
Fek.prototype.GetBadgesAndTitle = function(usernameT, regionT, profHover, staff, title, badge){
  var self = this;
  $.getJSON("http://boards." + self.platformRegion + ".leagueoflegends.com/api/users/" + regionT + "/" + usernameT + "?include_profile=true", function(api){
    if(!profHover.getElementsByClassName("badge-container")[0] && !profHover.getElementsByClassName("title")[0]){
      var data;
      var badges = [];

      if(api.profile){
        data = api.profile.data;

        if(typeof title == "undefined")
          title = data.title;
      }

      if(typeof data !== "undefined"){
        if(data.b_raf)     {badges.push("https://cdn.leagueoflegends.com/apollo/badges/raf.png");}
        if(data.b_s01gold) {badges.push("https://cdn.leagueoflegends.com/apollo/badges/s1gold.png");}
        if(data.b_s01plat) {badges.push("https://cdn.leagueoflegends.com/apollo/badges/s1platinum.png");}

        if(data.b_s02plat) {badges.push("https://cdn.leagueoflegends.com/apollo/badges/s2platinum.png");}
        if(data.b_s02diam) {badges.push("https://cdn.leagueoflegends.com/apollo/badges/s2diamond.png");}

        if(data.b_s03gold) {badges.push("https://cdn.leagueoflegends.com/apollo/badges/s3gold.png");}
        if(data.b_s03plat) {badges.push("https://cdn.leagueoflegends.com/apollo/badges/s3platinum.png");}
        if(data.b_s03diam) {badges.push("https://cdn.leagueoflegends.com/apollo/badges/s3diamond.png");}
        if(data.b_s03chal) {badges.push("https://cdn.leagueoflegends.com/apollo/badges/s3challenger.png");}

        if(data.b_s04gold) {badges.push("https://cdn.leagueoflegends.com/apollo/badges/s4gold.png");}
        if(data.b_s04plat) {badges.push("https://cdn.leagueoflegends.com/apollo/badges/s4platinum.png");}
        if(data.b_s04diam) {badges.push("https://cdn.leagueoflegends.com/apollo/badges/s4diamond.png");}
        if(data.b_s04mast) {badges.push("https://cdn.leagueoflegends.com/apollo/badges/s4master.png");}
        if(data.b_s04chal) {badges.push("https://cdn.leagueoflegends.com/apollo/badges/s4challenger.png");}

        if(data.b_s05gold) {badges.push("http://i.imgur.com/KqTvYEa.png");}
        if(data.b_s05plat) {badges.push("http://i.imgur.com/l9lMtwa.png");}
        if(data.b_s05diam) {badges.push("http://i.imgur.com/A073pTS.png");}
        if(data.b_s05mast) {badges.push("http://i.imgur.com/ur0LOXd.png");}
        if(data.b_s05chal) {badges.push("http://i.imgur.com/ZmmVMrB.png");}

        if(data.b_s06gold) {badges.push("https://cdn.leagueoflegends.com/apollo/badges/s6gold.png");}
        if(data.b_s06plat) {badges.push("https://cdn.leagueoflegends.com/apollo/badges/s6platinum.png");}
        if(data.b_s06diam) {badges.push("https://cdn.leagueoflegends.com/apollo/badges/s6diamond.png");}
        if(data.b_s06mast) {badges.push("https://cdn.leagueoflegends.com/apollo/badges/s6master.png");}
        if(data.b_s06chal) {badges.push("https://cdn.leagueoflegends.com/apollo/badges/s6challenger.png");}
      }

        if(staff == "1")
          badges.push(self.FEKgfx + "fekbadge.png");

        if((badge !== "") && (typeof badge !== "undefined")){
          var collection = badge.split(",");
          for(var i = 0; i < collection.length; i++){
            if(collection[i])
              badges.push(collection[i]);
          }
        }

        var badgeContainer;

        // badgeContainer size is 160, and badges are 36x36
        // 1-4 badges: 36x36
        //   5 badges: 32x32
        //   6 badges: 26x26
        //   7 badges: 22x22
        //   8 badges: 20x20
        var badgeSize; if     (badges.length <= 4) badgeSize = "36px";
                       else if(badges.length == 5) badgeSize = "32px";
                       else if(badges.length == 6) badgeSize = "26px";
                       else if(badges.length == 7) badgeSize = "22px";
                       else if(badges.length == 8) badgeSize = "20px";
                       else                        badgeSize = "18px"; // Badges are not to exceed 8

        if(badges.length > 0){
          badgeContainer = document.createElement("div");
          badgeContainer.className = "badge-container";
          badgeContainer.style.setProperty("position",   "relative", "important");
          badgeContainer.style.setProperty("top",        "-8px",     "important");
          badgeContainer.style.setProperty("width",      self.avatarSize + 60 + "px", "important");
          badgeContainer.style.setProperty("height",     "36px",     "important");
          badgeContainer.style.setProperty("text-align", "center",   "important");
          profHover.appendChild(badgeContainer);
        }

        while(badges.length > 0){
          var badgeName = badges.shift();
          var divBadge = document.createElement("img");
          divBadge.className = "badge";
          divBadge.setAttribute("src", badgeName);

          divBadge.style.setProperty("width",  badgeSize, "important");
          divBadge.style.setProperty("height", badgeSize, "important");

          badgeContainer.appendChild(divBadge);
        }

      // Apply a title if you have one
      if(typeof title !== "undefined"){
        var divTitle = document.createElement("div");

        divTitle.className = "title";
        divTitle.textContent = title;
        divTitle.style.setProperty("position",       "relative",     "important");
        divTitle.style.setProperty("top",            "-8px",         "important");
        divTitle.style.setProperty("width",          self.avatarSize + 60 + "px", "important");
        divTitle.style.setProperty("max-width",      self.avatarSize + 60 + "px", "important");
        divTitle.style.setProperty("max-height",     "52px",         "important");
        divTitle.style.setProperty("text-align",     "center",       "important");
        divTitle.style.setProperty("overflow",       "hidden",       "important");
        divTitle.style.setProperty("letter-spacing", "0px",          "important");
        divTitle.style.setProperty("display",        "inline-block", "important");
        divTitle.style.setProperty("font-size",      "36px",         "important"); // Artificially inflate size of textbox here
        divTitle.style.setProperty("font-variant",   "normal",       "important");
        divTitle.style.setProperty("font-family",    `"Constantia", "Palatino", "Georgia", serif`, "important");

        profHover.appendChild(divTitle);

        if(title.length < 24)
          divTitle.style.setProperty("font-size", "14px", "important");
        else if(title.length < 28)
          divTitle.style.setProperty("font-size", "12px", "important");
        else
          divTitle.style.setProperty("font-size", "10px", "important");

        if(staff == "1"){
          divTitle.style.setProperty("font-size", "26px", "important");

          $(divTitle).GradientText({
            step: 10,
            colors: ["#68BAFF", "#008AFF", "#68BAFF"],
            dir: "x"
          });

          if(title.length >= 16)
            divTitle.style.setProperty("font-size", "13px", "important");
          else
            divTitle.style.setProperty("font-size", "14px", "important");
        }
      }
    }
  });
};

//////////////////////////////////////////////////////////////////////////////
// EmptyVoteReplacement: Fills things in the gutter on boards with no votes //
//////////////////////////////////////////////////////////////////////////////
Fek.prototype.EmptyVoteReplacement = function(){
  var self = this;
  if(self.emptyVoteReplacement == "banners"){
    $(".inline-profile").each(function(){
      var src           = "http://i.imgur.com/NcHbI1d.png";
      var votingElement = $(this).parent().parent().parent().find(".no-voting");
      $(votingElement).html(`
      <div class="riot-apollo voting">
        <ul class="riot-voting">
          <li class="total-votes">
            <img style="width: auto; max-width: 30px; max-height: 30px;" src="${src}">
          </li>
        </ul>
      </div>
      `);
    });
  }else if(self.emptyVoteReplacement == "bannersavatars"){
    self.users   = [];
    self.regions = [];

    $(".inline-profile").each(function(){
      var username = this.getElementsByClassName("username")[0].textContent;
      var region   = this.getElementsByClassName("realm")[0].textContent;
          region   = region.substring(1, region.length - 1);

      self.users.push(username);
      self.regions.push(region);
    });

    var formData = new FormData();
    formData.append("users",   self.users);
    formData.append("regions", self.regions);

    self.SendToServer(`${self.domain}/GetOnlyAvatars`, formData, function(data){
      $(".inline-profile").each(function(){
        var username = this.getElementsByClassName("username")[0].textContent;
        var region   = this.getElementsByClassName("realm")[0].textContent;
            region   = region.substring(1, region.length - 1);
        var votingElement = $(this).parent().parent().parent().find(".no-voting");
        var avatar = data["records"][username][region].avatar;
        var src;

        if(avatar !== undefined) src = avatar;
        else                     src = "http://i.imgur.com/NcHbI1d.png";

        $(votingElement).html(`
        <div class="riot-apollo voting">
          <ul class="riot-voting">
            <li class="total-votes">
            <img style="width: auto; max-width: 30px; max-height: 30px;" src="${src}"></li>
          </ul>
        </div>
        `);
      });
    });
  }
};

///////////////////////////////////////////////////////////////////////////
// HideSubboards: Hides the sub-boards that the user doesn't want to see //
///////////////////////////////////////////////////////////////////////////
Fek.prototype.HideSubboards = function(){
  var self = this;
  $(".discussion-list-item").each(function(){

    // Always show pinned threads
    if(!$(this.getElementsByClassName("pin")[0]).length){
      var subboard = this.getElementsByClassName("discussion-footer")[0].getElementsByTagName("a")[1];

      // Only hide the thread if it's from a board that is recognized
      if(typeof subboard !== "undefined"){
        subboard = this.getElementsByClassName("discussion-footer")[0].getElementsByTagName("a")[1].textContent;
        if(self.hide[subboard] == "on")
          $(this).remove();
      }
    }
  });
};

//////////////////////////////////////////////////////////////////////////////
// FavoriteIcons: Changes the champion/spell/item icons in the posting area //
//////////////////////////////////////////////////////////////////////////////
Fek.prototype.FavoriteIcons = function(){
  var self = this;
  $(".button.gamedata.champion").each(function(){
    var url = self.FEKgfxLargeChamp + self.favoriteChampion;
    this.style.setProperty("background-image", `url("${url}.png")`, "important");
    this.style.setProperty("background-position", "-3px -3px", "important");
    this.style.setProperty("background-size", "120% auto", "important");

    if(self.favoriteIcons == "mouseover")
      self.SetGrayscaleProperties(this);
  });

  $(".button.gamedata.summoner").each(function(){
    var url = self.FEKgfxLargeSpell + self.favoriteSpell;
    this.style.setProperty("background-image", `url("${url}.png")`, "important");
    this.style.setProperty("background-position", "-3px -3px", "important");
    this.style.setProperty("background-size", "120% auto", "important");

    if(self.favoriteIcons == "mouseover")
      self.SetGrayscaleProperties(this);
  });

  $(".button.gamedata.item").each(function()
  {
    var url = self.FEKgfxLargeItem + self.favoriteItem;
    this.style.setProperty("background-image", `url("${url}.png")`, "important");
    this.style.setProperty("background-position", "-3px -3px", "important");
    this.style.setProperty("background-size", "120% auto", "important");

    if(self.favoriteIcons == "mouseover")
      self.SetGrayscaleProperties(this);
  });
};

///////////////////////////////////////////////////////
// SetGrayscaleProperties: Sets grayscale properties //
///////////////////////////////////////////////////////
Fek.prototype.SetGrayscaleProperties = function(obj){
  obj.style.setProperty("filter", "grayscale(1)", "important");

  $(obj).hover(function(){
    obj.style.setProperty("filter", "grayscale(0)", "important");
  }, function(){
    obj.style.setProperty("filter", "grayscale(1)", "important");
  });
};

//////////////////////////////////////////////////////////////////////////
// QueryFEKServer: Makes a connection to the FEK server for information //
//////////////////////////////////////////////////////////////////////////
Fek.prototype.QueryFEKServer = function(){
  var self = this;
  var formData = new FormData();
  formData.append("name",    self.myName);
  formData.append("region",  self.myRegion);
  formData.append("users",   self.users);
  formData.append("regions", self.regions);

  self.SendToServer(`${self.domain}/database`, formData, function(data){
    self.results   = data.records;
    self.FEKtweets = data.announcements;
    self.FEKevent  = data.event;

    // THIS FEATURE TEMPORARILY DISABLED!
    // var unixTime = Math.floor(Date.now() / 1000);
    // if((unixTime > FEKevent.start) && (unixTime < FEKevent.end))
    // ===== START =====
    // var NavBarEvent = document.createElement("li");
    // var html = `
    // <a href="#">Event</a>
    // <div id="fek-event">
    //   <div id="fek-event-top">${FEKevent.message}</div>
    //   <div id="fek-event-bottom-left">
    //     <a href="${FEKevent.stream}" target="_blank" style="padding: 2px;">Twitch Stream</a>
    //   </div>
    //   <div id="fek-event-bottom-right">
    //     <a href="${FEKevent.thread}" target="_blank" style="padding: 2px;">Boards Thread</a>
    //   </div>
    // </div>
    // `;
    // ====== END ======

    // AddToNavBar(NavBarEvent, "touchpoint-event", html, RiotBar, 8);

    // window.setInterval(function(){$(".touchpoint-event").toggleClass("pulse");}, 1000);

    // // Hides dropdown event information by default, and displays it with mouse hover
    // $("#fek-event").hide();
    // $(".touchpoint-event").hover(function() {$("#fek-event").show();}, function(){$("#fek-event").hide();});

    if(self.FEKversion != self.results.version && window.location.href != self.FEKpage){
      var html = `
      There has been an update to FEK!<br><br>
      <a href="${self.results.details}" style="color:#00C0FF;">Click here</a>
      for the post detailing new changes and to download version ${self.results.version}
      `;

      self.CreateAlertBox("14px", "#990000", "#DD0000", "#FFFFFF", html);
    }else{
      if(typeof self.results.apiStatusCode !== "undefined" && self.alertPopUp === false){
        self.CreateAlertBox("14px", "#990000", "#DD0000", "#FFFFFF",
                       "Error " + self.results.apiStatusCode + ": " + self.results.apiMessage);
      }

      if(typeof self.results.alert !== "undefined" && self.alertPopUp === false){
        self.CreateAlertBox(self.results.top, self.results.color1, self.results.color2, self.results.font,
                       self.results.alert);
      }
    }

    if(self.page == "Thread")
      self.FormatAllPosts(self, true);

    $.event.trigger({type: "tweetsLoaded"});
  });
};

////////////////////////////////////////////////////////////////////////////////////
// RemoveThumbnailBackground: Removes the background from thumbnails on the index //
////////////////////////////////////////////////////////////////////////////////////
Fek.prototype.RemoveThumbnailBackground = function(){
  var self = this;
  // Remove the background image from every thumbnail
  $(".thumbnail-fallback").each(function(){
    this.style.setProperty("background-image", "none", "important");
  });

  // animateThumbnails option
  if(self.animateThumbnails == "animate"){
    $(document.getElementsByTagName("img")).each(function(){
      var thumbnail = this.getAttribute("src");

      if(thumbnail.slice(-14) == "&animate=false")
        this.setAttribute("src", thumbnail.slice(0, thumbnail.length - 14) + "&animate=true");
    });
  }else if(self.animateThumbnails == "hide"){
    $(".discussion-list-item td.thumbnail").css("max-width", "0px");
    $(document.getElementsByClassName("thumbnail-fallback")).each(function(){
      $(this).remove();
    });
  }
};

////////////////////////////////////////////////////
// LoadIndex: Loads everything for the Index page //
////////////////////////////////////////////////////
Fek.prototype.LoadIndex = function(self){
  if(self.blacklisting)
    self.IndexBlacklist();

  self.RemoveThumbnailBackground();
  self.ColorVotes();
  self.HoverVotes();

  if(self.enhancedThreadPreview == "on")
    self.EnhancedThreadPreview();

  if(self.highlightMyThreads != "off")
    self.HighlightMyThreads();

  self.QueryFEKServer();
};

/////////////////////////////////////////////////////////////////////
// IndexBlacklist: Hides threads by blacklisted users on the index //
/////////////////////////////////////////////////////////////////////
Fek.prototype.IndexBlacklist = function(){
  $(".discussion-list-item.row").each(function(){
    // Skip threads that have no username (such as Announcements)
    if($(this).find(".username")[0]){
      var usernameT = this.getElementsByClassName("username")[0].textContent;
      var regionT   = this.getElementsByClassName("realm")[0].textContent;

      // If it's a person you blacklisted, hide the thread
      if(GM_getValue(usernameT + " " + regionT, 0) == 1)
        $(this).remove();
    }
  });
};

//////////////////////////////////////////////////////
// LoadThread: Loads everything for the Thread page //
//////////////////////////////////////////////////////
Fek.prototype.LoadThread = function(self){
  // Remove all "Posting as X" fields
  $(document).find(".bottom-bar.clearfix.box").find(".left").remove();

  // Make sure that the users/regions arrays are empty, since they will have
  // left-over data from when people switch pages in chronological view
  self.users   = [];
  self.regions = [];

  // Get information on every person within the thread
  $(".inline-profile").each(function(){
    var username = this.getElementsByClassName("username")[0].textContent;
    var region   = this.getElementsByClassName("realm")[0].textContent;
        region   = region.substring(1, region.length - 1);

    // FEK staff have special gradient names, so I need to extract them using this method
    if(this.getElementsByClassName("pxg-set").length > 0)
      username = this.getElementsByClassName("pxg-set")[0].childNodes[0].textContent;

    self.users.push(username);
    self.regions.push(region);
  });

  // Bring .toggle-minimized to the front so people can click on it
  $(".toggle-minimized").each(function(){$(this).css("z-index", "1");});

  self.WaitAndRun(".profile-hover", self.FormatAllPosts);

  self.ColorVotes();
  self.HoverVotes();
  self.QueryFEKServer();

  if(self.embedMedia == "on")
    self.EmbedMedia();
};

////////////////////////////////////////////////////////////////
// FormatSomePosts: Calls FormatSinglePost on only some posts //
////////////////////////////////////////////////////////////////
Fek.prototype.FormatSomePosts = function(FEKData = false){
  var self = this;
  if(!FEKData){
    $(".body-container").each(function(){
      self.FormatSinglePost1(this, false);
    });
  }else{
    $(".body-container").each(function(){
      // Only execute the function if the post is not deleted
      if(!$($(this).find(".deleted")[0]).is(":visible"))
        self.FormatSinglePost2(this, false);
    });
  }
};

//////////////////////////////////////////////////////////////////////
// FormatAllPosts: Calls FormatSinglePost on every post that exists //
//////////////////////////////////////////////////////////////////////
Fek.prototype.FormatAllPosts = function(self, FEKData = false){
  $(document).find(".toggle-minimized").remove();

  if(!FEKData){
    if(document.getElementsByClassName("op-container")[0].getElementsByClassName("inline-profile").length){
      $(".op-container").each(function(){
        self.FormatSinglePost1(this, true);
      });
    }

    $(".body-container").each(function(){
      self.FormatSinglePost1(this, false);
    });
  }else{
    if(document.getElementsByClassName("op-container")[0].getElementsByClassName("inline-profile").length){
      $(".op-container").each(function(){
        self.FormatSinglePost2(this, true);
      });
    }

    $(".body-container").each(function(){
      // Only execute the function if the post is not deleted
      if(!$($(this).find(".deleted")[0]).is(":visible"))
        self.FormatSinglePost2(this, false);
    });
  }

  // isMinimized
  $(".toggle-minimized").click(function(){
    // Put everything in a container and then hide it

    var post = $(this).parent()[0];

    if($(this).parent().hasClass("isMinimized")){
      // Minimizing the post

      if($(post).find(".hide-post").length === 0){
        // If the container doesn't exist, make it
        // Classes:
        // 0. masthead
        // 1. toggle-minimized
        // 2. newline
        // 3. small
        // 4. body-container
        // 5. list
        // 6. paging
        //
        // Put 2-5 in their own span and keep it between 1 and 7

        var testing = document.createElement("span");
        $(testing).attr("class", "hide-post");

        $(testing).append($(post).find(".new-line")[0]);
        $(testing).append($(post).find(".small")[0]);
        $(testing).append($(post).find(".body-container")[0]);
        $(testing).append($(post).find(".list")[0]);

        // Finally append it to the post
        $(testing).insertAfter($(post).find(".toggle-minimized")[0]);
        $(testing).css("display", "none");
      }else{
        // If the container already exists
        $($(post).find(".hide-post")[0]).css("display", "none");
      }
    }else{
      // Maximizing the post
      $($(post).find(".hide-post")[0]).css("display", "");

      // Load FEK stuff for posts
      var list = $(post).find(".list")[0];

      $(list).each(function(){
        $(".body-container").each(function(){
          self.FormatSinglePost1(this, false);
          self.FormatSinglePost2(this, false);
          self.ColorVotes();
          self.HoverVotes();
          $(".toggle-minimized").each(function(){$(this).css("z-index", "1");});
        });
      });
    }
  });
};

////////////////////////////////////////////////////////////////////////
// FormatSinglePost1: Formats a single post before inserting FEK data //
////////////////////////////////////////////////////////////////////////
Fek.prototype.FormatSinglePost1 = function(obj, op){
  var self = this;
  if(op === false){
    // Show downvoted posts
    $(obj).parent().removeClass("isLowQuality");

    // See if the post is deleted
    var isThisDeleted = obj.children[0].children[1].getAttribute("style");

    if(isThisDeleted === null)
      return;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  var usernameT = obj.getElementsByClassName("username")[0].textContent;
  var regionT   = obj.getElementsByClassName("realm")[0].textContent;
  regionT       = regionT.substring(1, regionT.length - 1);

  // If it's a person you blacklisted, hide the post if it's not the op
  if(self.blacklisting === "on"){
    if(GM_getValue(usernameT + " (" + regionT + ")", 0) == 1 && op === false)
      $(obj).parent().remove();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  // Define standard variables for this scope
  var riotVoting    = $(obj).parent()[0].getElementsByClassName("riot-voting")[0];
  var inlineProfile = obj.getElementsByClassName("inline-profile")[0];
  var profHover     = obj.getElementsByClassName("profile-hover")[0];
  var timeago       = obj.getElementsByClassName("timeago")[0];
  var icon          = obj.getElementsByTagName("img")[0];
  var body          = obj.getElementsByClassName("body")[0];
  var isRioter      = obj.getElementsByClassName("isRioter")[0];
  var username      = obj.getElementsByClassName("username")[0];
  var region        = obj.getElementsByClassName("realm")[0];

  // FEK staff have special gradient names, so I need to extract them using this method
  if(obj.getElementsByClassName("pxg-set").length > 0)
    usernameT = inlineProfile.getElementsByClassName("pxg-set")[0].childNodes[0].textContent;

  // Wrenchmen don't have a regular icon so if this person is a Wrenchmen, set their icon to "userGroupIcon"
  var tinyIcon; if((typeof(tinyIcon = obj.getElementsByClassName("icon")[0])) == "undefined") tinyIcon = obj.getElementsByClassName("userGroupIcon")[0];

  // Pop up for when you hover your mouse over a person's name/avatar (only do this once for the op)
  tinyIcon.style.setProperty("z-index", "1");

  // Declare variables that will be used later
  var opTitle;      // op
  var authorInfo;   // op
  var content;      // op
  var controlLinks; // op
  var attachments;  // not op
  var footer;       // not op

  var innerDiv;

  $(tinyIcon).each(function(){
    if(this.id != "popupHook"){
      this.id = "popupHook";

      $(this).hover(function(){
        var avatar = $($(this).find("img")[0]).attr("src");

        // Now create and append to innerDiv
        innerDiv = document.createElement("div");
        innerDiv.className = "popup";
        innerDiv.style.setProperty("position", "relative");
        innerDiv.style.setProperty("border", "solid 1px black");
        innerDiv.style.setProperty("width",  self.avatarSize + "px");
        innerDiv.style.setProperty("height", self.avatarSize + "px");
        innerDiv.style.setProperty("left", "99%");
        innerDiv.style.setProperty("display", "none");
        innerDiv.style.setProperty("background-color", "white");
        innerDiv.style.setProperty("z-index", "-1");
        innerDiv.style.setProperty("padding-top", "0px");
        innerDiv.style.setProperty("padding-left", "5%");

        if(op) innerDiv.style.setProperty("top", -self.avatarSize - 8 + "px");
        else   innerDiv.style.setProperty("top", -self.avatarSize - 5 + "px");

        /*   font-size | line-height
        100:    14     |     18
        125:    18     |     23
        150:    22     |     28
        175:    26     |     33
        200:    30     |     38
        */
        innerDiv.style.setProperty("font-size",   (self.avatarSize - 100) / 25 * 4 + 14 + "px");
        innerDiv.style.setProperty("line-height", (self.avatarSize - 100) / 25 * 5 + 18 + "px");

        innerDiv.innerHTML = `<a href="#" id="prfle" style="color: black; letter-spacing: 0px; font-weight: bold; font-variant: normal; font-family: Spiegel-Regular, sans-serif">View Profile</a><br>
                              <a href="#" id="avatr" style="color: black; letter-spacing: 0px; font-weight: bold; font-variant: normal; font-family: Spiegel-Regular, sans-serif">View Avatar</a><br>
                              <a href="#" id="lolnx" style="color: black; letter-spacing: 0px; font-weight: bold; font-variant: normal; font-family: Spiegel-Regular, sans-serif">LoLNexus</a><br>
                              <a href="#" id="opgg"  style="color: black; letter-spacing: 0px; font-weight: bold; font-variant: normal; font-family: Spiegel-Regular, sans-serif">OP.GG</a><br>
                              <a href="#" id="black" style="color: black; letter-spacing: 0px; font-weight: bold; font-variant: normal; font-family: Spiegel-Regular, sans-serif">Blacklist</a>`;

        this.appendChild(innerDiv);

        profHover.setAttribute("href", "#");

        $(profHover).click(function(event){
          event.preventDefault();
          event.stopPropagation();
        });

        $("#prfle").hover(function() {this.style.setProperty("text-decoration",  "underline");}, function() {this.style.setProperty("text-decoration",  "none");});
        $("#avatr").hover(function() {this.style.setProperty("text-decoration",  "underline");}, function() {this.style.setProperty("text-decoration",  "none");});
        $("#lolnx").hover(function() {this.style.setProperty("text-decoration",  "underline");}, function() {this.style.setProperty("text-decoration",  "none");});
        $("#opgg").hover(function()  {this.style.setProperty("text-decoration",  "underline");}, function() {this.style.setProperty("text-decoration",  "none");});
        $("#black").hover(function() {this.style.setProperty("text-decoration",  "underline");}, function() {this.style.setProperty("text-decoration",  "none");});

        $("#prfle").click(function(event){
          event.preventDefault();
          event.stopPropagation();
          var win = window.open("http://boards." + self.platformRegion + ".leagueoflegends.com/en/player/" + regionT + "/" + usernameT, "_blank");
          win.focus();
        });

        $("#avatr").click(function(event){
          event.preventDefault();
          event.stopPropagation();
          var win = window.open(avatar, "_blank");
          win.focus();
        });

        $("#lolnx").click(function(event){
          event.preventDefault();
          event.stopPropagation();
          var win = window.open("http://www.lolnexus.com/" + regionT + "/search?name=" + usernameT, "_blank");
          win.focus();
        });

        $("#opgg").click(function(event){
          event.preventDefault();
          event.stopPropagation();
          var win = window.open("http://" + regionT + ".op.gg/summoner/userName=" + usernameT, "_blank");
          win.focus();
        });

        $("#black").click(function(event){
          event.preventDefault();
          event.stopPropagation();

          var target = usernameT + " (" + regionT + ")";

          // Add the person to our blacklist, or remove them from if they're already on there
          if(GM_getValue(target, 0) === 0){
            GM_setValue(target, 1);
            alert(target + " has been added to your blacklist, refresh your page for this to take effect. If you added them by accident, click on the blacklist link again to undo the action.");
          }else{
            GM_deleteValue(target);
            alert(target + " has been removed from your blacklist");
          }
        });

        // Fade the FEK popup box in
        $(innerDiv).fadeIn(200);
      }, function(){
        innerDiv.remove();
      });
    }
  });

  if(self.removeProfHovPop == "on"){
    // Removes Riot's profile hover popup
    $(profHover).hover(function(){
      self.WaitAndRunManual(1000, function(){
        $(document.getElementsByClassName("information-container")).parent().parent().parent().remove();
      });
    });
  }

  // Modifying variables
  if(typeof riotVoting == "undefined"){
    var discussionTitle = obj.getElementsByClassName("discussion-title")[0];
    discussionTitle.style.setProperty("position",    "relative", "important");
    discussionTitle.style.setProperty("margin-left", "75px",     "important");
  }

  if(op === true){
    self.originalPoster = usernameT;
    opTitle        = obj.getElementsByClassName("title")[0];
    authorInfo     = obj.getElementsByClassName("author-info")[0];
    content        = document.getElementById("content");
  }

  if(op === true){
    controlLinks = obj.getElementsByClassName("control-links")[0];
    controlLinks.style.setProperty("padding-left", self.avatarSize + 85 + "px", "important");
  }

  if(op === false){
    footer      = obj.getElementsByClassName("footer")[0];
    attachments = obj.getElementsByClassName("attachments")[0];
  }

  //if(op === false || (op === true && (document.getElementById("opHook") === null)))
  if(1){
    // If they are a Rioter, do their avatars a bit differently
    if(typeof isRioter !== "undefined")
      self.FormatAvatar(obj, true, tinyIcon, icon);
    else
      self.FormatAvatar(obj, false, tinyIcon, icon);
  }

  //if(op === true)
  if(op === true && (document.getElementById("opHook") === null)){
    obj.getElementsByTagName("a")[1].remove(); // We want to remove the second anchor (link to name of sub-board it's in)
    $(authorInfo).contents().filter(function(){return this.nodeType == 3;}).remove();

    opTitle.style.setProperty("position", "relative", "important");
    opTitle.style.setProperty("left",     "-70px",    "important");

    var titleCreated    = obj.getElementsByTagName("span")[5];
    var submitted       = document.createElement("div");
    submitted.id        = "opHook";
    submitted.innerHTML = "Submitted ";
    submitted.style.setProperty("position",  "relative", "important");
    submitted.style.setProperty("left",      "-234px",   "important");
    submitted.style.setProperty("font-size", "18px",     "important");

    submitted.appendChild(titleCreated);
    authorInfo.appendChild(submitted);
  }

  if(op === false)
    obj.style.setProperty("padding-left", "100px");

  // Body: Original Post
  if(op === true){
    body.style.setProperty("min-height",  self.avatarSize + 20 + "px", "important");
    body.style.setProperty("padding-top", "20px",  "important");
  }

  // Body: Regular Post
  if(op === false){
    body.style.setProperty("position",     "relative", "important");
    body.style.setProperty("top",          "-12px",    "important");
    body.style.setProperty("padding-left", self.avatarSize - 60 + "px", "important");
    body.style.setProperty("min-height",   self.avatarSize + 10 + "px", "important");
    body.style.setProperty("margin-top",   "0px",      "important");
  }

  if(op === true){
    content.style.setProperty("padding-left", "0px",   "important");
    content.style.setProperty("margin-left",  self.avatarSize + 90 + "px", "important");
  }

  // Inline Profile: Original Post
  if(op === true){
    inlineProfile.style.setProperty("position", "relative", "important");
    inlineProfile.style.setProperty("top",      "70px",     "important");
    inlineProfile.style.setProperty("left",     "-42px",    "important");
    inlineProfile.style.setProperty("width",    "160px",    "important");
    inlineProfile.style.setProperty("height",   "20px",     "important");
  }

  // Inline Profile: Regular Post
  if(op === false){
    inlineProfile.style.setProperty("position", "relative", "important");
    inlineProfile.style.setProperty("left",     "-120px",   "important");
    inlineProfile.style.setProperty("width",    "160px",    "important");
    inlineProfile.style.setProperty("height",   "20px",     "important");
  }

  // Profile Hover: All Posts
  if(1){
    profHover.style.setProperty("position",  "absolute", "important");
    profHover.style.setProperty("height",    "20px",     "important");
  }

  // Riot members get a red title
  if(op === false){
    if(isRioter)
      profHover.style.setProperty("color", "#AE250F", "important");
    else
      profHover.style.setProperty("color", "#94724D", "important");
  }

  // Username: All Posts
  if(1){
    username.style.setProperty("position",       "relative",     "important");
    username.style.setProperty("width",          self.avatarSize + 60 + "px", "important");
    username.style.setProperty("height",         "20px",         "important");
    username.style.setProperty("font-size",      "14px",         "important");
    username.style.setProperty("text-align",     "center",       "important");
    username.style.setProperty("overflow",       "hidden",       "important");
    username.style.setProperty("display",        "block",        "important");
    username.style.setProperty("letter-spacing", "1px",          "important");
    username.style.setProperty("font-variant",   "normal",       "important");
    username.style.setProperty("font-family" ,   `"Constantia", "Palatino", "Georgia", serif`, "important");

    if(op === true)
      username.style.setProperty("top", -self.avatarSize - 16 + "px", "important");
    else
      username.style.setProperty("top", -self.avatarSize - 12 + "px", "important");
  }

  // Background of username for regular posts
  if(op === false){
    if(usernameT == self.originalPoster)
    {
      if(self.OPStyle == "on")
      {
        username.style.setProperty("background", "none", "important");
        username.style.setProperty("border",     "none", "important");
      }
      else
      {
        username.style.setProperty("color", "white", "important");
      }
    }
  }

  if(op === true){
    region.style.setProperty("position",       "relative",             "important");
    region.style.setProperty("top",            "-20px",                "important");
    region.style.setProperty("left",           self.avatarSize + 55 + "px", "important");
    region.style.setProperty("letter-spacing", "1px",                  "important");
    region.style.setProperty("font-size",      "16px",                 "important");
    region.style.setProperty("font-variant",   "normal",               "important");
    region.style.setProperty("font-family" ,   `"Constantia", "Palatino", "Georgia", serif`, "important");
  }

  if(op === false){
    region.style.setProperty("position", "relative",             "important");
    region.style.setProperty("top",      "-17px",                "important");
    region.style.setProperty("left",     self.avatarSize + 65 + "px", "important");
  }

  // Voting: Original Post
  if(op === true && typeof riotVoting != "undefined"){
    riotVoting.style.setProperty("position", "absolute", "important");
    riotVoting.style.setProperty("top",      "138px",    "important");
    riotVoting.style.setProperty("left",     "10px",     "important");
  }

  // Voting: Regular Post
  if(op === false && typeof riotVoting != "undefined"){
    riotVoting.style.setProperty("position", "absolute", "important");
    riotVoting.style.setProperty("top",      "50px",     "important");
  }

  // Miscellaneous: Regular Post
  if(op === false){
    timeago.style.setProperty("position", "relative", "important");
    timeago.style.setProperty("top",      "-18px",    "important");
    timeago.style.setProperty("left",     self.avatarSize - 160 + "px", "important");

    footer.style.setProperty("padding-left", self.avatarSize - 65 + "px", "important");

    if($(attachments).length)
      attachments.style.setProperty("padding-left", self.avatarSize - 60 + "px", "important");
  }

  self.RollDice(obj);
};

/////////////////////////////////////////////////////////////////
// FormatSinglePost2: Inserts FEK data into the formatted post //
/////////////////////////////////////////////////////////////////
Fek.prototype.FormatSinglePost2 = function(obj, op){
  var self = this;

  var usernameT     = obj.getElementsByClassName("username")[0].textContent;
  var regionT       = obj.getElementsByClassName("realm")[0].textContent;
  regionT           = regionT.substring(1, regionT.length - 1);

  if(typeof self.results[usernameT] === "undefined")
    return;

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  // Define standard variables for this scope
  // var riotVoting    = $(obj).parent()[0].getElementsByClassName("riot-voting")[0];
  var inlineProfile = obj.getElementsByClassName("inline-profile")[0];
  var profHover     = obj.getElementsByClassName("profile-hover")[0];
  var isRioter      = obj.getElementsByClassName("isRioter")[0];
  var username      = obj.getElementsByClassName("username")[0];
  // var timeago       = obj.getElementsByClassName("timeago")[0];
  // var icon          = obj.getElementsByTagName("img")[0];
  // var body          = obj.getElementsByClassName("body")[0];
  // var region        = obj.getElementsByClassName("realm")[0];

  // FEK staff have special gradient names, so I need to extract them using this method
  if(obj.getElementsByClassName("pxg-set").length > 0)
    usernameT = inlineProfile.getElementsByClassName("pxg-set")[0].childNodes[0].textContent;

  // Wrenchmen don't have a regular icon so if this person is a Wrenchmen, set their icon to "userGroupIcon"
  var tinyIcon; if((typeof (tinyIcon = obj.getElementsByClassName("icon")[0])) == "undefined") tinyIcon = obj.getElementsByClassName("userGroupIcon")[0];

  // Pop up for when you hover your mouse over a person's name/avatar (only do this once for the op)
  tinyIcon.style.setProperty("z-index", "1");

  // Declare variables that will be used later
  // APARENTLY NONE OF THESE ARE USED ANYMORE
  // var opTitle;      // op
  // var authorInfo;   // op
  // var content;      // op
  // var controlLinks; // op
  // var attachments;  // not op
  // var footer;       // not op

  // Define user data variables
  var avatar = self.results[usernameT][regionT].avatar;
  var staff  = self.results[usernameT][regionT].staff;
  var title  = self.results[usernameT][regionT].title;
  var badge  = self.results[usernameT][regionT].badge;

  /*
  var innerDiv;

  $(tinyIcon).each(function()
  {
    if(this.id != "popupHook")
    {
      this.id = "popupHook";

      $(this).hover(function()
      {
        // Now create and append to innerDiv
        innerDiv = document.createElement("div");
        innerDiv.className = "popup";
        innerDiv.style.setProperty("position", "relative");
        innerDiv.style.setProperty("border", "solid 1px black");
        innerDiv.style.setProperty("width", avatarSize + "px");
        innerDiv.style.setProperty("height", avatarSize + "px");
        innerDiv.style.setProperty("left", "99%");
        innerDiv.style.setProperty("display", "none");
        innerDiv.style.setProperty("background-color", "white");
        innerDiv.style.setProperty("z-index", "-1");
        innerDiv.style.setProperty("padding-top", "0px");
        innerDiv.style.setProperty("padding-left", "5%");

        if(op) innerDiv.style.setProperty("top", -avatarSize - 8 + "px");
        else   innerDiv.style.setProperty("top", -avatarSize - 5 + "px");

        /*   font-size | line-height
        100:    14     |     18
        125:    18     |     23
        150:    22     |     28
        175:    26     |     33
        200:    30     |     38
        *
        innerDiv.style.setProperty("font-size",   (avatarSize - 100) / 25 * 4 + 14 + "px");
        innerDiv.style.setProperty("line-height", (avatarSize - 100) / 25 * 5 + 18 + "px");

        innerDiv.innerHTML = `<a href="#" id="prfle" style="color: black; letter-spacing: 0px; font-weight: bold; font-variant: normal; font-family: Spiegel-Regular, sans-serif">View Profile</a><br>
                              <a href="#" id="avatr" style="color: black; letter-spacing: 0px; font-weight: bold; font-variant: normal; font-family: Spiegel-Regular, sans-serif">View Avatar</a><br>
                              <a href="#" id="lolnx" style="color: black; letter-spacing: 0px; font-weight: bold; font-variant: normal; font-family: Spiegel-Regular, sans-serif">LoLNexus</a><br>
                              <a href="#" id="opgg"  style="color: black; letter-spacing: 0px; font-weight: bold; font-variant: normal; font-family: Spiegel-Regular, sans-serif">OP.GG</a><br>
                              <a href="#" id="black" style="color: black; letter-spacing: 0px; font-weight: bold; font-variant: normal; font-family: Spiegel-Regular, sans-serif">Blacklist</a>`;

        this.appendChild(innerDiv);

        profHover.setAttribute("href", "#");

        $(profHover).click(function(event)
        {
          event.preventDefault();
          event.stopPropagation();
        });

        $("#prfle").hover(function() {this.style.setProperty("text-decoration",  "underline");}, function() {this.style.setProperty("text-decoration",  "none");});
        $("#avatr").hover(function() {this.style.setProperty("text-decoration",  "underline");}, function() {this.style.setProperty("text-decoration",  "none");});
        $("#lolnx").hover(function() {this.style.setProperty("text-decoration",  "underline");}, function() {this.style.setProperty("text-decoration",  "none");});
        $("#opgg").hover(function()  {this.style.setProperty("text-decoration",  "underline");}, function() {this.style.setProperty("text-decoration",  "none");});
        $("#black").hover(function() {this.style.setProperty("text-decoration",  "underline");}, function() {this.style.setProperty("text-decoration",  "none");});

        $("#prfle").click(function(event)
        {
          event.preventDefault();
          event.stopPropagation();
          var win = window.open("http://boards." + platformRegion + ".leagueoflegends.com/en/player/" + regionT + "/" + usernameT, "_blank");
          win.focus();
        });

        $("#avatr").click(function(event)
        {
          event.preventDefault();
          event.stopPropagation();
          var win = window.open(avatar, "_blank");
          win.focus();
        });

        $("#lolnx").click(function(event)
        {
          event.preventDefault();
          event.stopPropagation();
          var win = window.open("http://www.lolnexus.com/" + regionT + "/search?name=" + usernameT, "_blank");
          win.focus();
        });

        $("#opgg").click(function(event)
        {
          event.preventDefault();
          event.stopPropagation();
          var win = window.open("http://" + regionT + ".op.gg/summoner/userName=" + usernameT, "_blank");
          win.focus();
        });

        $("#black").click(function(event)
        {
          event.preventDefault();
          event.stopPropagation();

          var target = usernameT + " (" + regionT + ")";

          // Add the person to our blacklist, or remove them from if they're already on there
          if(GM_getValue(target, 0) === 0)
          {
            GM_setValue(target, 1);
            alert(target + " has been added to your blacklist, refresh your page for this to take effect. If you added them by accident, click on the blacklist link again to undo the action.");
          }
          else
          {
            GM_deleteValue(target);
            alert(target + " has been removed from your blacklist");
          }
        });

        // Fade the FEK popup box in
        $(innerDiv).fadeIn(200);
      }, function()
      {
        innerDiv.remove();
      });
    }
  });

  */

  // Assign avatars
  if(typeof isRioter !== "undefined")
    self.AssignAvatar(obj, true, avatar, tinyIcon);
  else
    self.AssignAvatar(obj, false, avatar, tinyIcon);

  // Alter text colors for names and titles
  if(op === false){
    if(isRioter)
      profHover.style.setProperty("color", "#AE250F", "important"); // Makes sure that Rioter's titles are red
    else if(staff == "1")
      profHover.style.setProperty("color", "#0000FF", "important"); // FEK staff
    else
      profHover.style.setProperty("color", "#94724D", "important"); // Regular users
  }

  // Username: All Posts
  if(1){
    if(staff == "1"){
      // Gradient names have problems where if they are too long and have a space, they will
      // go on a second line. So if a name is a certain length (>= 14) and has at least one
      // space in it, decrease the font size to 12
      if(usernameT.length >= 12 && (usernameT.indexOf(" ") >= 0))
        username.style.setProperty("font-size", "12px", "important");

      $(username).GradientText({
        step:    10,
        colors: ["#68BAFF", "#008AFF", "#68BAFF"],
        dir:    "x"
      });
    }
  }

  self.GetBadgesAndTitle(usernameT, regionT, profHover, staff, title, badge);
};

//////////////////////////////////
// RollDice: Rolls virtual dice //
//////////////////////////////////
Fek.prototype.RollDice = function(obj){
  var self = this;
  var spanElements = obj.getElementsByTagName("span");
  var seed;

  for(var i = 0; i < spanElements.length; ++i){
    if(spanElements[i].getAttribute("title") !== null){
      seed = spanElements[i].getAttribute("title");
      i = spanElements.length;
    }
  }

  // DICE ROLLING RULES!
  // Only one roll per post. This is to prevent too many rolls to crash the browser.
  // Don't do rolls in <blockquote>

  // [roll]     = Die Result: 500 (1d1000)
  // [roll:6]   = Die Result: 4 (1d6)
  // [roll:2d6] = Die Result: 7 (1d6)
  // [roll:100] = Die Result: 50 (1d100)

  // Extract text in between [roll: and ]

  // Convert the DateTime seed to a random number
  seed = parseInt(seed.substr(seed.length - 8, 3)) + 1;

  var paragraphs = obj.getElementsByTagName("p");
  var rolled = false;

  for(i = 0; i < paragraphs.length; ++i){
    var regex   = /\[roll(.*?)\]/gi;
    var command = regex.exec(paragraphs[i].innerHTML);

    // Example of the Array command
    // command[0] : "[roll:2d100]"
    // command[1] : "2d100"

    if((rolled || self.rollDice == "off" || (paragraphs[i].parentElement.tagName == "BLOCKQUOTE")) && command !== null)
      paragraphs[i].innerHTML = paragraphs[i].innerHTML.replace(command[0], "");
    else if(self.rollDice == "on" && command !== null){
      var rolls    = 0;
      var die      = 0;
      regex        = /([0-9]*)d([0-9]*)/gi;
      var extended = regex.exec(command[1]);

      // Example of the Array extended (assuming it exists)
      // extended[0] : "2d100"
      // extended[1] : "2"
      // extended[2] : "100"

      // Check if it's something like 2d100, instead of having a single number
      if(extended !== null){
        if(extended[1]) rolls = extended[1];
        else            rolls = 1;

        if(extended[2]) die = extended[2];
        else            die = 1;
      }else{
        regex      = /([0-9]*)/g;
        var simple = regex.exec(command[1]);

        if(command[1] == simple[1]){
          rolls = 1;

          if(command[1]) die = command[1];
          else           die = 1;
        }
      }

      var result = 0;

      // Limit the die rolls and sides to 100
      if(rolls > 100) rolls = 100;
      if(die   > 100) die   = 100;

      // [roll] is a special die roll of 1d1000
      if(command[0] == "[roll]"){
        rolls = 1;
        die   = 1000;
      }

      if(rolls !== 0){
        for(var j = 0; j < rolls; ++j){
          Math.seedrandom(seed);
          result += Math.ceil(Math.random() * die);
          seed += 1;
        }

        // Replace the text
        var dieRoll = `
        <font color="#ff0000">Die Result: </font>
        <font color="#00ff00">${result}</font>
        <font color="#00ffff">(${rolls}d${die})</font>
        `;
        paragraphs[i].innerHTML = paragraphs[i].innerHTML.replace(command[0], dieRoll);

        rolled = true;
      }
    }
  }
};

/////////////////////////////////////
// FormatAvatar: Formats an avatar //
/////////////////////////////////////
Fek.prototype.FormatAvatar = function(obj, isRioter, tinyIcon, icon){
  var self = this;
  tinyIcon.style.setProperty("position",         "relative",        "important");
  tinyIcon.style.setProperty("top",              "12px",            "important");
  tinyIcon.style.setProperty("left",             "30px",            "important");
  tinyIcon.style.setProperty("width",            self.avatarSize + "px", "important");
  tinyIcon.style.setProperty("height",           self.avatarSize + "px", "important");
  tinyIcon.style.setProperty("background-image", "none",            "important");

  if(isRioter){
    if(!tinyIcon.getElementsByTagName("img")[0] && !tinyIcon.getElementsByTagName("video")[0]){
      var imgIcon = document.createElement("img");
      imgIcon.setAttribute("src", "http://i.imgur.com/STcpwlY.png");
      imgIcon.style.setProperty("width",     self.avatarSize + "px",    "important");
      imgIcon.style.setProperty("height",    self.avatarSize + "px",    "important");
      imgIcon.style.setProperty("border",    "thin solid #FF0000", "important");
      tinyIcon.appendChild(imgIcon);
    }
  }else{
    icon.style.setProperty("width",  self.avatarSize + "px",    "important");
    icon.style.setProperty("height", self.avatarSize + "px",    "important");
    icon.style.setProperty("border", "thin solid #FFFFFF", "important");

    if(self.fallbackAvatar != "off"){
      obj.getElementsByTagName("img")[0].setAttribute("src", self.fallbackAvatar);
    }
  }
};

/////////////////////////////////////
// AssignAvatar: Assigns an avatar //
/////////////////////////////////////
Fek.prototype.AssignAvatar = function(obj, isRioter, avatar, tinyIcon){
  var self = this;
  if(isRioter){
     if(typeof avatar !== "undefined"){
       if(avatar.slice(-5) == ".webm"){
         self.FormatWebmAvatar(obj, avatar);
       }else{
         obj.getElementsByTagName("img")[0].setAttribute("src", avatar);
       }
     }
  }else{
    if(typeof avatar !== "undefined"){
      if(avatar.slice(-5) == ".webm")
        self.FormatWebmAvatar(obj, avatar);
      else
        obj.getElementsByTagName("img")[0].setAttribute("src", avatar);
    }else if(self.fallbackAvatar != "off")
      obj.getElementsByTagName("img")[0].setAttribute("src", self.fallbackAvatar);
  }
};

////////////////////////////////////////////////////
// FormatWebmAvatar: Gives the user a webm avatar //
////////////////////////////////////////////////////
Fek.prototype.FormatWebmAvatar = function(obj, avatar){
  // This check ensures no duplicate .webm avatars will be embedded into a user's post
  if(!obj.getElementsByTagName("video")[0]){
    var webm = obj.getElementsByTagName("img")[0];
    webm.setAttribute("src",  avatar, "important");
    webm.setAttribute("loop", "true");
    webm.setAttribute("data-bind", "", "important");
    $(webm).ChangeElementType("video");
    obj.getElementsByTagName("video")[0].play();
  }
};

///////////////////////////////////////////////////////////
// EmbedMedia: Replaces all webm links with actual webms //
///////////////////////////////////////////////////////////
Fek.prototype.EmbedMedia = function(){
  var self = this;
  var links = document.links;
  for(var i = 0; i < links.length; ++i){
    if(links[i].href.slice(-5) == ".webm"){
      var obj = document.getElementsByTagName("a");

      for(var j = 0; j < obj.length; ++j){
        if(links[i].href === obj[j].href){
          obj[j].innerHTML = "";                         // Remove the url since it's not needed
          var webm = document.createElement("video");    // Create the webm element
          webm.setAttribute("width", "500");             // Define the width
          webm.setAttribute("controls", "");             // Create the controls
          var source = document.createElement("source"); // Create the source element
          source.setAttribute("src", links[i].href);     // Set the source
          webm.appendChild(source);                      // Attach the source onto the webm
          obj[j].insertBefore(webm, obj[j].children[0]); // Insert the final result into the post

          // It is imperative to change the .webm's parent from an <a> to a <div>
          $(obj[j]).ChangeElementType("div");
          //obj[j].href = "#";

          // We are done with this loop now
          j = obj.length;
        }
      }
    }
  }

  // YouTube videos do not load immediately, so I have to wait a little bit
  self.WaitAndRunManual(500, self.EmbedYouTube);
};

////////////////////////////////////////////////////////////////////////
// EmbedYouTube: Replaces YouTube previews into actual YouTube videos //
////////////////////////////////////////////////////////////////////////
Fek.prototype.EmbedYouTube = function(){
  // Get all of the YouTube objects
  var youtubeObj = document.getElementsByClassName("video-thumb-link");
  var youtubeObjLength = youtubeObj.length;

  for(var i = 0; i < youtubeObjLength; i++){
    var regex = /ytimg.com%2Fvi%2F(.*?)%2F/g;

    // Extract the Youtube's video Id
    var youtubeId = regex.exec(youtubeObj[0].innerHTML)[1];

    // Create the new embedded YouTube video in the object's parent
    $($(youtubeObj[0]).parent()).append(`
    <iframe width="533" height="300" src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allowfullscreen></iframe>
    `);

    // Remove the old object since it's useless
    $(youtubeObj[0]).remove();
  }
};

/////////////////////////////////////////////////////////////
// ColorVotes: Colors upvotes green and downvotes negative //
/////////////////////////////////////////////////////////////
Fek.prototype.ColorVotes = function(){
  var totalVotes = $(document).find(".total-votes");

  $(totalVotes).each(function(){
    if($(this).html()[0] == "-")
      this.style.setProperty( "color", "#FF5C5C", "important"); // Make red for downvotes
    else if($(this).html()[0] == "•")
      {} // Do nothing
    else if($(this).html() != "0" && $(this).html() != "1")
      this.style.setProperty( "color", "#05E100", "important"); // Make green for upvotes
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////
// HoverVotes: Attaches a hover event to the vote numbers to display their individual votes //
//////////////////////////////////////////////////////////////////////////////////////////////
Fek.prototype.HoverVotes = function(){
  var self = this;
  if(self.votingDisplay != "off"){
    var voteBox = ".riot-voting";

    $(voteBox).each(function(){
      if(self.votingDisplay == "hide")
        this.style.setProperty("visibility", "hidden", "important");
      else if(this.hasAttribute("hover-event") === false){
        this.setAttribute("hover-event", "true");
        $(this).hover(function(){
          self.ShowIndividualVotes(this, self.page);
        }, function(){
          $("#up-down-display").remove();
          $(".total-votes").show();
        });
      }
    });
  }
};

//////////////////////////////////////////////////////////////////////////////////////////
// ShowIndividualVotes: Shows how many upvotes and downvotes a specific thread/post has //
//////////////////////////////////////////////////////////////////////////////////////////
Fek.prototype.ShowIndividualVotes = function(obj, page){
  var self = this;
  var voteFinder    = obj.parentElement;
  var uVotes        = voteFinder.getAttribute("data-apollo-up-votes");
  var dVotes        = voteFinder.getAttribute("data-apollo-down-votes");
  var voteScore     = obj.getElementsByClassName("total-votes")[0];

  var upDownDisplay = document.createElement("li");
  $(upDownDisplay).attr("id", "up-down-display");

  if($(obj).closest(".op-container").length){
    $(upDownDisplay).css("padding", "4px 0px 4px"); // CSS for op's vote
    $(upDownDisplay).css("font-size", "12px");
  }else
    $(upDownDisplay).css("padding", "4px 0px 2px"); // CSS for non-op's vote

  obj.insertBefore(upDownDisplay, obj.children[1]);

  if(self.votingDisplay == "individual")
    upDownDisplay.innerHTML = `
    <font color="#05E100">${uVotes}</font>
    <font color="white">|</font>
    <font color="#FF5C5C">${dVotes}</font>
    `;
  else if(self.votingDisplay == "total")
    upDownDisplay.innerHTML = `
    <font color="#FFA500">${(+uVotes + (+dVotes))}</font>
    `;

  $(voteScore).hide();
};

///////////////////////////////////////////////////////////////////////
// HighlightMyThreads: Highlights your threads as black on the index //
///////////////////////////////////////////////////////////////////////
Fek.prototype.HighlightMyThreads = function(){
  var self = this;
  if(self.page == "Index"){
    $(".discussion-list-item").each(function(){
      // We need to avoid any threads that don't have a name to them
      if(this.getElementsByClassName("username")[0]){
        var name = this.getElementsByClassName("username")[0].textContent;

        if(name == self.myName)
          this.style.setProperty("background-color", self.highlightMyThreads, "important");
      }
    });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// EnhancedThreadPreview: Displays a fancier preview when you hover the mouse over a thread on the index //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
Fek.prototype.EnhancedThreadPreview = function(){
  var self = this;
  if(self.page == "Index"){
    $(".title-span").each(function(){
      if($(this).attr("title")){
        $(this).attr("ttdata", $(this).attr("title"));

        $(this).parent().parent().parent().mouseenter(function(){
          var replaceThing = $(this).find(".title-span").attr("ttdata").replace(/[\n\r]/g, "<br />").replace(/{{champion:??:.*?}}/g, self.MiniChampionIcons).replace(/{{item:??:.*?}}/g, self.MiniItemIcons).replace(/{{summoner:??:.*?}}/g, self.MiniSummonerIcons);

          $("#fektooltip").html(`
            <div id="ttlabel"> ${$(this).find(".username").text()}  </div>
            <div id="loadtime">${$(this).find(".title-span").text()}</div>
            <p>${replaceThing}</p>
            `);

          $("#fektooltip").css({"opacity" : "1"});
        });

        $(this).parent().parent().parent().mouseleave(function() {$("#fektooltip").css({"opacity":"0"});});
        this.removeAttribute("title");
      }
    });
  }
};

//////////////////////////////////////////////////////////////////////
// MiniChampionIcons: Displays champion icons in the thread preview //
//////////////////////////////////////////////////////////////////////
Fek.prototype.MiniChampionIcons = function(x){
  var self = this;
  var start = x.indexOf(":") + 1;
  var end   = x.indexOf("}", start);
  var icon  = "c" + x.substring(start, end);
  return `<img src="${self.cIcons}${icon}.jpg">`;
};

//////////////////////////////////////////////////////////////
// MiniItemIcons: Displays item icons in the thread preview //
//////////////////////////////////////////////////////////////
Fek.prototype.MiniItemIcons = function(x){
  var start = x.indexOf(":") + 1;
  var end   = x.indexOf("}", start);
  var icon  = x.substring(start, end);
  return `<img src="http://ddragon.leagueoflegends.com/cdn/5.21.1/img/item/${icon}.png" width="16px" height="16px">`;
};

////////////////////////////////////////////////////////////////////////////
// MiniSummonerIcons: Displays summoner spell icons in the thread preview //
////////////////////////////////////////////////////////////////////////////
Fek.prototype.MiniSummonerIcons = function(x){
  var start = x.indexOf(":") + 1;
  var end   = x.indexOf("}", start);
  var icon  = x.substring(start, end);

  if(icon ==  1) icon = "-16px 0px";
  if(icon ==  2) icon = "-32px 0px";
  if(icon ==  3) icon = "-64px 0px";
  if(icon ==  4) icon = "-80px 0px";
  if(icon ==  6) icon = "-96px 0px";
  if(icon ==  7) icon = "-112px 0px";
  if(icon == 11) icon = "-32px -16px";
  if(icon == 12) icon = "-48px -16px";
  if(icon == 13) icon = "-128px 0px";
  if(icon == 14) icon = "-48px 0px";
  if(icon == 17) icon = "-144px 0px";
  if(icon == 21) icon = "0px 0px";
  if(icon == 30) icon = "0px -16px";
  if(icon == 31) icon = "-16px -16px";

  if(icon == 32){
    icon = "-128px -32px";
    return `<span style="background-size: 50%; background: transparent url('//ddragon.leagueoflegends.com/cdn/5.21.1/img/sprite/small_spell13.png') no-repeat scroll ${icon}; background-size: 1000%; width: 16px; height: 16px; display: inline-block;"></span>`;
  }

  return `<span style="background-size: 50%; background: transparent url('//ddragon.leagueoflegends.com/cdn/5.21.1/img/sprite/small_spell0.png') no-repeat scroll ${icon}; background-size: 1000%; width: 16px; height: 16px; display: inline-block;"></span>`;
};

//////////////////////////////////////////////////////////////////////
// AddToNavBar: Adds a completely new element to the navigation bar //
//////////////////////////////////////////////////////////////////////
Fek.prototype.AddToNavBar = function(obj, cName, html, navBar, index){
  obj.className = cName;
  obj.innerHTML = html;
  navBar.insertBefore(obj, navBar.children[index]);
};

//////////////////////////////////////////////////////////////////////////////////////////////////
// CreateNavBarGroup: Makes a container in the navigation bar to hold buttons for dropdown list //
//////////////////////////////////////////////////////////////////////////////////////////////////
Fek.prototype.CreateNavBarGroup = function(obj, idName, navBar, index, width, height, lineHeight, backgroundSize){
  navBar.children[index].appendChild(obj);
  obj.id = idName;
  obj.style.setProperty("position",        "absolute");
  obj.style.setProperty("width",           width);
  obj.style.setProperty("height",          height);
  obj.style.setProperty("line-height",     lineHeight);
  obj.style.setProperty("background-size", backgroundSize);
  obj.style.setProperty("background-image", `url("https://cdn.leagueoflegends.com/riotbar/prod/1.5.2/images/bar/bg-bar.jpg?1435084967")`);
};

//////////////////////////////////////////////////////////////////////////////////
// CreateNavBarButton: Creates buttons within a container for the dropdown list //
//////////////////////////////////////////////////////////////////////////////////
Fek.prototype.CreateNavBarButton = function(navGroup, obj, text, url){
  navGroup.appendChild(obj);
  obj.textContent = text;
  obj.href        = url;
  obj.className   = "link";
  obj.onmousedown = function ClickOnLink(){this.style.setProperty("color", "#FFFFFF");};
  obj.style.setProperty("color", "#CFBA6B");
  obj.style.setProperty("height", "30px");
};

//////////////////////////////////////////////////////////////
// CreateNavListLink: Creates a link in the navigation list //
//////////////////////////////////////////////////////////////
Fek.prototype.CreateNavListLink = function(text, url){
  var navList   = document.getElementById("markdown-nav").getElementsByTagName("p")[1];
  var lineBreak = document.createElement("br");
  var anchor    = document.createElement("a");

  anchor.textContent = text;
  anchor.href        = url;

  navList.insertBefore(lineBreak, navList.children[navList.childElementCount]);
  navList.insertBefore(anchor, navList.children[navList.childElementCount]);
};

////////////////////////////////////////////////////////
// RemoveNavListLinks: ?????????????????????????????? //
////////////////////////////////////////////////////////
Fek.prototype.RemoveNavListLinks = function(){
  var self = this;
  var navList = document.getElementById("markdown-nav").getElementsByTagName("p")[1];

  for(var text in self.hide){
    for(var i = 0; i < navList.children.length; ++i){
      if(navList.children[i].textContent == text && self.hide[text] == "on"){
        // Remove the <br> after the navLink, if it exists
        if(navList.children[i].nextSibling)
          navList.children[i].nextSibling.remove();

        // Remove the <a href> link
        navList.children[i].remove();
      }
    }
  }
};

/////////////////////////////////////////////////////////////
// AddFEKNavBar: Adds a FEK dropdown to the navigation bar //
/////////////////////////////////////////////////////////////
Fek.prototype.AddFEKNavBar = function(){
  var self = this;
  self.WaitAndRun("#riotbar-navbar", function(){
    $("#riotbar-navbar").append(`
    <span class="riotbar-navbar-separator"></span>
    <a class="touchpoint-fek" href="#">F.E.K.</a>
    `);

    $(".touchpoint-fek").click(function(event){
      event.preventDefault();
      event.stopPropagation();
      self.PanelToggle();
    });
  });

  // Figure out why I decided to put a return here! The code below might be useful?
  // return;
  // var NavBarFEK      = document.createElement("li"); AddToNavBar(NavBarFEK, "touchpoint-fek", `<a href="#">F.E.K.</a>`, RiotBar, 7);
  // var FEKNavBarGroup = document.createElement("li"); CreateNavBarGroup(FEKNavBarGroup, "FEKNavBarGroup", RiotBar, 7, "120px", "60px", "27px", "100% 30px");
  // var FEKPanel       = document.createElement("a");  CreateNavBarButton(FEKNavBarGroup, FEKPanel,  "F.E.K. Panel",  "#"); FEKPanel.id = "FEKPanel";
  // var FEKThread      = document.createElement("a");  CreateNavBarButton(FEKNavBarGroup, FEKThread, "F.E.K. Thread", FEKpage);
};

////////////////////////////////////////////////////////////////////////////
// AddBoardsNavBarNA: Adds a Boards dropdown to the navigation bar for NA //
////////////////////////////////////////////////////////////////////////////
Fek.prototype.AddBoardsNavBarNA = function(){
  var self = this;
  var BoardsNavBarGroup        = document.createElement("li"); self.CreateNavBarGroup(BoardsNavBarGroup, "BoardsNavBarGroup", self.RiotBar, 3, "250px", "480px", "27px", "100% 30px");

  var Gameplay                 = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, Gameplay,                 "Gameplay",                     "http://boards.na.leagueoflegends.com/en/c/gameplay-balance");
  var StoryArtSound            = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, StoryArtSound,            "Story, Art, & Sound",          "http://boards.na.leagueoflegends.com/en/c/story-art");
  var Esports                  = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, Esports,                  "Esports",                      "http://boards.na.leagueoflegends.com/en/c/esports");
  var TeamRecruitment          = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, TeamRecruitment,          "Team Recruitment",             "http://boards.na.leagueoflegends.com/en/c/team-recruitment");
  var ConceptsCreations        = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, ConceptsCreations,        "Concepts & Creations",         "http://boards.na.leagueoflegends.com/en/c/skin-champion-concepts");
  var PlayerBehaviorModeration = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, PlayerBehaviorModeration, "Player Behavior & Moderation", "http://boards.na.leagueoflegends.com/en/c/player-behavior-moderation");
  var Miscellaneous            = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, Miscellaneous,            "Miscellaneous",                "http://boards.na.leagueoflegends.com/en/c/miscellaneous");
  var MemesGames               = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, MemesGames,               "Memes & Games",                "http://boards.na.leagueoflegends.com/en/c/memes");
  var Roleplay                 = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, Roleplay,                 "Roleplay",                     "http://boards.na.leagueoflegends.com/en/c/roleplaying");
  var GeneralDiscussion        = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, GeneralDiscussion,        "General Discussion",           "http://boards.na.leagueoflegends.com/en/f/mNBeEEkI");
  var DevCorner                = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, DevCorner,                "Dev Corner",                   "http://boards.na.leagueoflegends.com/en/c/developer-corner");
  var RedTracker               = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, RedTracker,               "Red Tracker",                  "http://boards.na.leagueoflegends.com/en/redtracker");
  var HelpSupport              = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, HelpSupport,              "Help & Support",               "http://boards.na.leagueoflegends.com/en/f/osqw6G4M");
  var ReportBug                = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, ReportBug,                "Report a Bug",                 "http://boards.na.leagueoflegends.com/en/c/bug-report");
  var BoardsFeedback           = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, BoardsFeedback,           "Boards Feedback",              "http://boards.na.leagueoflegends.com/en/c/site-feedback");
  var ServiceStatus            = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, ServiceStatus,            "Service Status",               "http://status.leagueoflegends.com/?en_US#na");
};

/////////////////////////////////////////////////////////////////////////////
// AddBoardsNavBarNA: Adds a Boards dropdown to the navigation bar for OCE //
/////////////////////////////////////////////////////////////////////////////
Fek.prototype.AddBoardsNavBarOCE = function(){
  var self = this;
  var BoardsNavBarGroup     = document.createElement("li"); self.CreateNavBarGroup(BoardsNavBarGroup, "BoardsNavBarGroup", self.RiotBar, 3, "225px", "300px", "27px", "100% 30px");
  var RedTracker            = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, RedTracker,            "Red Tracker",               "http://boards.oce.leagueoflegends.com/en/redtracker");
  var Miscellaneous         = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, Miscellaneous,         "Miscellaneous",             "http://boards.oce.leagueoflegends.com/en/c/miscellaneous");
  var PlayerCreations       = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, PlayerCreations,       "Player Creations",          "http://boards.oce.leagueoflegends.com/en/c/player-creations");
  var GameplayStrategy      = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, GameplayStrategy,      "Gameplay & Strategy",       "http://boards.oce.leagueoflegends.com/en/c/gameplay-strategy");
  var Announcements         = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, Announcements,         "Announcements",             "http://boards.oce.leagueoflegends.com/en/c/announcements");
  var TheNewsHour           = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, TheNewsHour,           "The News Hour",             "http://boards.oce.leagueoflegends.com/en/c/the-news-hour");
  var TeamRecruitment       = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, TeamRecruitment,       "Team Recruitment",          "http://boards.oce.leagueoflegends.com/en/c/team-recruitment");
  var Esports               = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, Esports,               "Esports",                   "http://boards.oce.leagueoflegends.com/en/c/esports");
  var HelpSupport           = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, HelpSupport,           "Help & Support",            "http://boards.oce.leagueoflegends.com/en/f/ElA0rvVL");
  var ServiceStatus         = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, ServiceStatus,         "Service Status",            "http://status.leagueoflegends.com/?en_US#na");
};

//////////////////////////////////////////////////////////////////////////////
// AddBoardsNavBarEUW: Adds a Boards dropdown to the navigation bar for EUW //
//////////////////////////////////////////////////////////////////////////////
Fek.prototype.AddBoardsNavBarEUW = function(){
  var self = this;
  var BoardsNavBarGroup     = document.createElement("li"); self.CreateNavBarGroup(BoardsNavBarGroup, "BoardsNavBarGroup", self.RiotBar, 3, "225px", "480px", "27px", "100% 30px");
  var RedTracker            = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, RedTracker,            "Red Tracker",               "http://boards.eune.leagueoflegends.com/en/redtracker");
  var Announcements         = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, Announcements,         "Announcements",             "http://boards.euw.leagueoflegends.com/en/c/announcements-en");
  var CommunityCreations    = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, CommunityCreations,    "Community Creations",       "http://boards.euw.leagueoflegends.com/en/c/community-creations-en");
  var CommunityEvents       = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, CommunityEvents,       "Community Events",          "http://events.euw.leagueoflegends.com/");
  var StreamsVideos         = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, StreamsVideos,         "Streams & Videos",          "http://boards.euw.leagueoflegends.com/en/c/streams-videos-en");
  var EventsTournaments     = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, EventsTournaments,     "Events & Tournaments",      "http://boards.euw.leagueoflegends.com/en/c/events-tournaments-en");
  var Esports               = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, Esports,               "Esports",                   "http://boards.euw.leagueoflegends.com/en/c/esports-en");
  var ChampionsGameplay     = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, ChampionsGameplay,     "Champions & Gameplay",      "http://boards.euw.leagueoflegends.com/en/c/champions-gameplay-en");
  var MapsModes             = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, MapsModes,             "Maps & Modes",              "http://boards.euw.leagueoflegends.com/en/c/maps-modes-en");
  var TeamRecruitment       = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, TeamRecruitment,       "Team Recruitment",          "http://boards.euw.leagueoflegends.com/en/c/team-recruitment-en");
  var PlayerBehaviour       = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, PlayerBehaviour,       "Player Behaviour",          "http://boards.euw.leagueoflegends.com/en/c/player-behaviour-en");
  var ForumGamesContests    = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, ForumGamesContests,    "Forum Games & Contests",    "http://boards.euw.leagueoflegends.com/en/c/forum-games-contests-en");
  var SuggestionsBugReports = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, SuggestionsBugReports, "Suggestions & Bug Reports", "http://boards.euw.leagueoflegends.com/en/c/suggestions-bug-reports-en");
  var OffTopic              = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, OffTopic,              "Off Topic",                 "http://boards.euw.leagueoflegends.com/en/c/off-topic-en");
  var HelpSupport           = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, HelpSupport,           "Help & Support",            "http://boards.euw.leagueoflegends.com/en/c/help-support-en");
  var ServiceStatus         = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, ServiceStatus,         "Service Status",            "http://status.leagueoflegends.com/?en_GB#euw");
};

////////////////////////////////////////////////////////////////////////////////
// AddBoardsNavBarEUNE: Adds a Boards dropdown to the navigation bar for EUNE //
////////////////////////////////////////////////////////////////////////////////
Fek.prototype.AddBoardsNavBarEUNE = function(){
  var self = this;
  var BoardsNavBarGroup     = document.createElement("li"); self.CreateNavBarGroup(BoardsNavBarGroup, "BoardsNavBarGroup", self.RiotBar, 3, "225px", "480px", "27px", "100% 30px");
  var RedTracker            = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, RedTracker,            "Red Tracker",               "http://boards.eune.leagueoflegends.com/en/redtracker");
  var Announcements         = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, Announcements,         "Announcements",             "http://boards.eune.leagueoflegends.com/en/c/announcements-en");
  var CommunityCreations    = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, CommunityCreations,    "Community Creations",       "http://boards.eune.leagueoflegends.com/en/c/community-creations-en");
  var CommunityEvents       = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, CommunityEvents,       "Community Events",          "http://events.eune.leagueoflegends.com/");
  var StreamsVideos         = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, StreamsVideos,         "Streams & Videos",          "http://boards.eune.leagueoflegends.com/en/c/streams-videos-en");
  var EventsTournaments     = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, EventsTournaments,     "Events & Tournaments",      "http://boards.eune.leagueoflegends.com/en/c/events-tournaments-en");
  var Esports               = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, Esports,               "Esports",                   "http://boards.eune.leagueoflegends.com/en/c/esports-en");
  var ChampionsGameplay     = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, ChampionsGameplay,     "Champions & Gameplay",      "http://boards.eune.leagueoflegends.com/en/c/champions-gameplay-en");
  var MapsModes             = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, MapsModes,             "Maps & Modes",              "http://boards.eune.leagueoflegends.com/en/c/maps-modes-en");
  var TeamRecruitment       = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, TeamRecruitment,       "Team Recruitment",          "http://boards.eune.leagueoflegends.com/en/c/team-recruitment-en");
  var PlayerBehaviour       = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, PlayerBehaviour,       "Player Behaviour",          "http://boards.eune.leagueoflegends.com/en/c/player-behaviour-en");
  var ForumGamesContests    = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, ForumGamesContests,    "Forum Games & Contests",    "http://boards.eune.leagueoflegends.com/en/c/forum-games-contests-en");
  var SuggestionsBugReports = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, SuggestionsBugReports, "Suggestions & Bug Reports", "http://boards.eune.leagueoflegends.com/en/c/suggestions-bug-reports-en");
  var OffTopic              = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, OffTopic,              "Off Topic",                 "http://boards.eune.leagueoflegends.com/en/c/off-topic-en");
  var HelpSupport           = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, HelpSupport,           "Help & Support",            "http://boards.eune.leagueoflegends.com/en/c/help-support-en");
  var ServiceStatus         = document.createElement("a");  self.CreateNavBarButton(BoardsNavBarGroup, ServiceStatus,         "Service Status",            "http://status.leagueoflegends.com/?en_GB#eune");
};

///////////////////////////////////////////////////////////////////
// AddBoardsNavBar: Adds a Boards dropdown to the navigation bar //
///////////////////////////////////////////////////////////////////
Fek.prototype.AddBoardsNavBar = function(){
  var self = this;
  if     (self.platformRegion == "na")   self.AddBoardsNavBarNA();
  else if(self.platformRegion == "oce")  self.AddBoardsNavBarOCE();
  else if(self.platformRegion == "euw")  self.AddBoardsNavBarEUW();
  else if(self.platformRegion == "eune") self.AddBoardsNavBarEUNE();
};

///////////////////////////////////////////////////////////////////////////////////////
// RoleplayingAlert: Creates a banner in the Roleplaying boards to notify newcomers. //
///////////////////////////////////////////////////////////////////////////////////////
Fek.prototype.RoleplayingAlert = function(){
  var self = this;
  self.CreateAlertBox("6px", "#003562", "#0000FF", "#FFFFFF",
                 `Hello and welcome to the Roleplaying Boards! Before diving in, we ask that you familiarize yourself with the
                 <a href="http://boards.na.leagueoflegends.com/en/c/roleplaying/L4KZzEqE-community-rules-culture-and-etiquette" style="color:#00C0FF;">Community Rules</a>,
                 and afterwards the <a href="http://boards.na.leagueoflegends.com/en/c/roleplaying/ghd7259r-guide-for-newcomers" style="color:#00C0FF;">Guide for Newcomers</a>.
                 Another helpful thread is <a href="http://boards.na.leagueoflegends.com/en/c/roleplaying/LtW6jJgO-how-to-join-rps-and-not-get-yelled-at" style="color:#00C0FF;">How To Join RPs</a>.
                 Please check <a href="http://boards.na.leagueoflegends.com/en/c/roleplaying/V0JcVrj0-the-ask-champion-compendium" style="color:#00C0FF;">The Ask Champion Compendium</a> for
                 availability and details on how to play as a champion. Once you have visited these threads,
                 this notification will automatically disappear. Thank you, and enjoy your stay!`);

  var url = window.location.href;
  if(url == "http://boards.na.leagueoflegends.com/en/c/roleplaying/L4KZzEqE-community-rules-culture-and-etiquette"){
    if(self.RPint === 0 || self.RPint == 2 || self.RPint == 4 || self.RPint == 6 || self.RPint == 8 || self.RPint == 10 || self.RPint == 12 || self.RPint == 14){
      self.RPint += 1;
      GM_setValue("_RP", self.RPint);
      if(self.RPint == 15)
        self.alertBanner.remove();
    }
  }else if(url == "http://boards.na.leagueoflegends.com/en/c/roleplaying/ghd7259r-guide-for-newcomers"){
    if(self.RPint === 0 || self.RPint == 1 || self.RPint == 4 || self.RPint == 5 || self.RPint == 8 || self.RPint == 9 || self.RPint == 12 || self.RPint == 13){
      self.RPint += 2;
      GM_setValue("_RP", self.RPint);
      if(self.RPint == 15)
        self.alertBanner.remove();
    }
  }else if(url == "http://boards.na.leagueoflegends.com/en/c/roleplaying/LtW6jJgO-how-to-join-rps-and-not-get-yelled-at"){
    if(self.RPint === 0 || self.RPint == 1 || self.RPint == 2 || self.RPint == 3 || self.RPint == 8 || self.RPint == 9 || self.RPint == 10 || self.RPint == 11){
      self.RPint += 4;
      GM_setValue("_RP", self.RPint);
      if(self.RPint == 15)
        self.alertBanner.remove();
    }
  }else if(url == "http://boards.na.leagueoflegends.com/en/c/roleplaying/V0JcVrj0-the-ask-champion-compendium"){
    if(self.RPint === 0 || self.RPint == 1 || self.RPint == 2 || self.RPint == 3 || self.RPint == 4 || self.RPint == 5 || self.RPint == 6 || self.RPint == 7){
      self.RPint += 8;
      GM_setValue("_RP", self.RPint);
      if(self.RPint == 15)
        self.alertBanner.remove();
    }
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
// WaitAndRun: Waits for a certain element on the page to load and then executes the callback //
////////////////////////////////////////////////////////////////////////////////////////////////
Fek.prototype.WaitAndRun = function(selector, callback){
  var self = this;
  var timeOut = 2000, currentTime = 0;

  var interval = setInterval(function(){
    currentTime = currentTime + 1;

    if(currentTime >= timeOut)
      clearInterval(interval);
    else if($(selector).length > 0){
      clearInterval(interval);
      callback(self);
    }
  }, 1);
};

//////////////////////////////////////////////////////////////////////////////////////////
// WaitAndRunManual: Waits for a specified amount of time before executing the callback //
//////////////////////////////////////////////////////////////////////////////////////////
Fek.prototype.WaitAndRunManual = function(time, callback){
  var timeOut = time, currentTime = 0;

  var interval = setInterval(function(){
    currentTime = currentTime + 1;

    if(currentTime >= timeOut){
      clearInterval(interval);
      callback();
    }
  }, 1);
};

/////////////////////////////////////////////
// ========== MUTATION OBSERVER ========== //
/////////////////////////////////////////////
Fek.prototype.Observer = function(){
  var self = this;
  if(self.page == "Index" || self.page == "Thread"){
    var target; if     (self.page == "Index")                             target = document.querySelector("#discussion-list");
                else if(self.page == "Thread" && self.threadMode == "Chrono")  target = document.querySelector("#comments");
                else if(self.page == "Thread" && self.threadMode == "Discuss") target = document.querySelector("#comments");

    var observer = new MutationObserver(function(mutations){
      if(self.page == "Index")
        self.WaitAndRun(mutations[0].addedNodes[0].children[0], self.LoadIndex);
      else if(self.page == "Thread")
        self.WaitAndRun(".riot-voting", self.LoadThread);
    });

    var config = {attributes: true, childList: true, characterData: true};

    observer.observe(target, config);
  }
};

///////////////////////////////////////////////////////
// This function is a mess, I need to make it better //
///////////////////////////////////////////////////////
Fek.prototype.ReportError = function(msg){
  //   if(errorMessage != "")
  //     errorMessage += "<br><br>";

  //   errorMessage += msg;

  //   // If an errorIcon doesn't currently exist
  //   if(document.getElementById("errorFek") == null)
  //   {
  //     var errorFek = document.createElement("div");
  //     errorFek.setAttribute("id", "errorFek");
  //     $("#riotbar-service-status").append(errorFek);

  //     var errorFekIcon = document.createElement("img");
  //     errorFekIcon.setAttribute("id", "errorFekIcon");
  //     errorFekIcon.setAttribute("src", "http://i.imgur.com/djAvEc6.png");
  //     errorFekIcon.style.setProperty("position", "relative");
  //     errorFekIcon.style.setProperty("top", "5px");

  //     $(errorFek).append(errorFekIcon);

  //     $(errorFekIcon).hover(function() {errorFekIcon.setAttribute("src", "http://i.imgur.com/Y32t3E5.png");}, function() {errorFekIcon.setAttribute("src", "http://i.imgur.com/djAvEc6.png");});

  //     $(errorFekIcon).on("click", function(event)
  //     {
  //       event.stopPropagation();
  //       event.preventDefault();

  //       if(document.getElementById("errorFekInfo") == null)
  //       {
  //         var errorFekInfo = document.createElement("div");
  //         errorFekInfo.setAttribute("id", "errorFekInfo");
  //         errorFekInfo.style.setProperty("position", "absolute");
  //         errorFekInfo.style.setProperty("top", "48px");
  //         errorFekInfo.style.setProperty("right", "-80px");
  //         errorFekInfo.style.setProperty("width", "350px");
  //       //errorFekInfo.style.setProperty("padding", "14px 20px 10px 40px");
  //         errorFekInfo.style.setProperty("padding", "10px 20px 10px 20px");
  //         errorFekInfo.style.setProperty("border-radius", "5px");
  //         errorFekInfo.style.setProperty("border-width", "1px");
  //         errorFekInfo.style.setProperty("border-style", "solid");
  //         errorFekInfo.style.setProperty("border-color", "#7E744E #B6A671 #55513A");
  //         errorFekInfo.style.setProperty("box-shadow", "0px 0px 3px 1px rgba(0, 0, 0, 0.3) inset, -1px 1px 10px 0px rgba(0, 0, 0, 0.8)");
  //         errorFekInfo.style.setProperty("background", "transparent linear-gradient(#1F3948, #0D1417) repeat scroll 0% 0%");
  //         errorFekInfo.style.setProperty("-webkit-touch-callout", "text");
  //         errorFekInfo.style.setProperty("-webkit-user-select", "text");
  //         errorFekInfo.style.setProperty("-khtml-user-select", "text");
  //         errorFekInfo.style.setProperty("-moz-user-select", "text");
  //         errorFekInfo.style.setProperty("-ms-user-select", "text");
  //         errorFekInfo.style.setProperty("-ms-user-select", "text");

  //         errorFekInfo.style.setProperty("font-family", "Tahoma");
  //         errorFekInfo.style.setProperty("color", "#9B9480");
  //         errorFekInfo.style.setProperty("font-size", "12px");
  //         errorFekInfo.style.setProperty("line-height", "1.4em");
  //         errorFekInfo.style.setProperty("z-index", "10");

  //         errorFekInfo.innerHTML = errorMessage;
  //         $(errorFek).append(errorFekInfo);

  //         var errorFekArrowContainer = document.createElement("div");
  //         errorFekArrowContainer.setAttribute("id", "errorFekArrowContainer");
  //         errorFekArrowContainer.style.setProperty("height", "15px");
  //         errorFekArrowContainer.style.setProperty("overflow", "hidden");
  //         $(errorFek).append(errorFekArrowContainer);

  //         var errorFekArrow = document.createElement("div");
  //         errorFekArrow.setAttribute("id", "errorFekArrow");
  //         errorFekArrow.style.setProperty("position", "relative");
  //         errorFekArrow.style.setProperty("content", "");
  //         errorFekArrow.style.setProperty("top", "10px");
  //         errorFekArrow.style.setProperty("right", "-10px");
  //         errorFekArrow.style.setProperty("width", "10px");
  //         errorFekArrow.style.setProperty("height", "10px");
  //         errorFekArrow.style.setProperty("background", "repeating-linear-gradient(135deg, #044247 0px, #232930 6.5px)");
  //         errorFekArrow.style.setProperty("border-top", "1px solid #7E744E");
  //         errorFekArrow.style.setProperty("border-left", "1px solid #7E744E");
  //         errorFekArrow.style.setProperty("-webkit-transform", "rotate(45deg)");
  //         errorFekArrow.style.setProperty("-moz-transform", "rotate(45deg)");
  //         errorFekArrow.style.setProperty("-ms-transform", "rotate(45deg)");
  //         errorFekArrow.style.setProperty("transform", "rotate(45deg)");
  //         errorFekArrow.style.setProperty("z-index", "10");
  //         $(errorFekArrowContainer).append(errorFekArrow);

  //         // Allow clicking away from the panel to close the message box
  //         $("body").click(function()
  //         {
  //           document.getElementById("errorFekArrow").remove();
  //           document.getElementById("errorFekArrowContainer").remove();
  //           document.getElementById("errorFekInfo").remove();
  //         });
  //       }
  //       else
  //       {
  //         document.getElementById("errorFekArrow").remove();
  //         document.getElementById("errorFekArrowContainer").remove();
  //         document.getElementById("errorFekInfo").remove();
  //       }
  //     });
  //   }
};

//////////////////////////////////////////////////////
// Easy way to send FormData to the server via POST //
//////////////////////////////////////////////////////
Fek.prototype.SendToServer = function(u,f,c){var s=this;$.ajax({url:u,type:"POST",data:f,contentType:false,processData:false}).done(function(d){c(d);}).fail(function(){s.CreateAlertBox("14px","#990000","#DD0000","#FFFFFF",`Unable to connect to the FEK server, <a href="https://twitter.com/Tundra_Fizz" target="_blank">try checking Twitter</a> for possible status updates.`);});};

////////////////////////////////////////////////
// AddPagingRight: Inefficient... merge later //
////////////////////////////////////////////////
Fek.prototype.AddPagingRight = function(){
  var self = this;
  var currentPostCount = 0;
  $(".body-container.clearfix").each(function(){
    ++currentPostCount;
  });

  var timeOut = 5000, currentTime = 0;

  var interval = setInterval(function(){
    currentTime = currentTime + 1;

    if(currentTime >= timeOut)
      clearInterval(interval);
    else{
      var newPostCount = 0;
      $(".body-container.clearfix").each(function(){
        ++newPostCount;
      });

      // console.log("Checking: " + newPostCount);

      if(currentPostCount != newPostCount){
        clearInterval(interval);
        self.LoadThread(self);
        self.AddPagingRight();
      }
    }
  }, 1);
};

////////////////////////////////
// Xyz: !!!!!!!!!!!!!!!!!!!!! //
////////////////////////////////
Fek.prototype.Xyz = function(){
  var self = this;
  /////////////////////////////////////////////
  // When "Show More" is clicked on an index //
  /////////////////////////////////////////////
  $(".box.show-more").click(function(event){
  var timeOut = 2000, currentTime = 0;

  var oldLength = $("#discussion-list")[0].children.length;

  var interval = setInterval(function(){
    currentTime++;

    if(currentTime >= timeOut)
      clearInterval(interval);
    else{
      if(oldLength != $("#discussion-list")[0].children.length){
        clearInterval(interval);
        self.HideSubboards();
        if(self.page == "Index" && self.emptyVoteReplacement != "off") self.EmptyVoteReplacement();
      }
    }
  }, 1);
  });

  /////////////////////////////////////////////////////////////////////////
  // When "Show More" is clicked on Discussion View Threads within posts //
  /////////////////////////////////////////////////////////////////////////
  $(".paging.right").click(function(event){
  var currentPostCount = 0;
  $(".body-container.clearfix").each(function(){
    ++currentPostCount;
  });

  var timeOut = 5000, currentTime = 0;

  var interval = setInterval(function(){
    currentTime = currentTime + 1;

    if(currentTime >= timeOut)
      clearInterval(interval);
    else{
      var newPostCount = 0;
      $(".body-container.clearfix").each(function(){
        ++newPostCount;
      });

      // console.log("Checking: " + newPostCount);

      if(currentPostCount != newPostCount){
        clearInterval(interval);
        self.LoadThread(self);
        self.AddPagingRight();
      }
    }
  }, 1);
  });

  //////////////////////////////////////
  // Toggles the FEK panel on and off //
  //////////////////////////////////////
  $("#FEKPanel").click(function(event)
  {
  event.preventDefault();
  event.stopPropagation();
  self.PanelToggle();
  });

  ////////////////////////////////////////////////////////////////////////////
  // When Quote or Reply is clicked, change the old icons to favorite icons //
  ////////////////////////////////////////////////////////////////////////////
  $(".toggle-reply-form").click(function(event){
  self.FavoriteIcons();
  });

  ////////////////////////////////////////
  // ========== HOVER EVENTS ========== //
  ////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////
  // Hides the dropdown menu for Boards and FEK by default, and displays them with mouse hover //
  ///////////////////////////////////////////////////////////////////////////////////////////////
  $("#BoardsNavBarGroup").hide(); $("#FEKNavBarGroup").hide();
  $(".touchpoint-boards").hover(function() {$("#BoardsNavBarGroup").show();}, function(){$("#BoardsNavBarGroup").hide();});
  $(".touchpoint-fek").hover(function()    {$("#FEKNavBarGroup").show();},    function() {$("#FEKNavBarGroup").hide();});

  //////////////////////////////////////////////////////////////////
  // Changes the color of a link when you mouse over/away from it //
  //////////////////////////////////////////////////////////////////
  $(".link").hover(function(){
  this.style.setProperty("color", "#D3C7A9");
  }, function(){
  this.style.setProperty("color", "#CFBA6B");
  });
};

///////////////////////////////////////
// ========== ENTRY POINT ========== //
///////////////////////////////////////
$(document).ready(function(){
  if(window.top != window.self ||       // Prevent FEK from loading twice
     typeof disableFEK !== "undefined") // Custom Wrenchmen script
    return;

  var fek = new Fek();
  fek.Main();
});
