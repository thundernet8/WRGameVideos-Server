/**
 * Created by WXQ on 16/1/13.
 */

define("main", ["config", "utils/jsToOC", "utils/openPage", "plugins/cookie", "utils/localStorage", "utils/global", "utils/lazyLoad", "utils/pageBannerGoogle", "utils/mvadRenderCall", "plugins/iscroll"], function(a) {
	function b() {
		for (var a = 0; a < w.length; a++) f.send("getnativead?o=" + encodeURIComponent(JSON.stringify(w[a])) + "&source_index=" + String(a + 1)), console.log(JSON.stringify(w[a]))
	}
	function c() {
		d(), $(".cate-list").show(), $(".scroller").each(function() {
			var a = $(this),
				b = $(this).find("a"),
				c = b.first().width();
			a.hasClass("chart-scroller") ? a.css("width", b.length / 5 * c) : a.css("width", b.length * c)
		})
	}
	function d() {
		function a() {
			clearTimeout(o), o = setTimeout(function() {
				m.currentPage.pageX == l - 1 ? m.goToPage(0, 0, 500) : m.next()
			}, 3e3)
		}
		var b = $("#home-slider"),
			c = e.screenWidth,
			d = "iPad" == i.appInfo.deviceInfo.deviceType ? .375 : .444,
			h = c * d;
		b.css("height", h);
		var j = $("#scroller"),
			k = j.find(".slide"),
			l = k.size();
		k.css({
			width: c
		}), j.css({
			width: c * l
		}), $("#indicator").size() > 0 && $("#indicator").remove();
		$('<div id="indicator"><dic class="dot"><div class="inner"></div></div>').appendTo(b).css({
			width: 20 * l,
			"margin-left": 20 * -l / 2
		});
		/* k.off(e.clickEvent).on(e.clickEvent, function() {
			var a = $(this),
				b = a.data("id"),
				c = a.data("name");
			if (a.hasClass("ad")) {
				if (ga("send", "event", "Home Slider", "click", "AD_" + c + "_" + b), 0 == c.indexOf("wingmob")) {
					var d = $.cookie("xy_d_idfa"),
						h = "Yxo",
						i = "http://api.wingmob.com/s/c/" + h + "?r=3&advid=" + d;
					console.log(i), $.ajax({
						url: i,
						dataType: "jsonp"
					})
				} else if (0 == c.indexOf("vxinyou")) {
					var d = $.cookie("xy_d_idfa"),
						h = "20243",
						i = "https://adapi.vxinyou.com/auth/index/index/?adid=" + h + "&idfa=" + d;
					console.log(i), $.ajax({
						url: i,
						dataType: "jsonp"
					})
				}
			} else {
				if (a.hasClass("special")) {
					var j, k = a.data();
					return j = e.isLocal ? "http://10.88.0.111/tonight/server-v3/static/client/src/html/special.html" : e.webDomain + "/video/special", g({
						url: j + "?special_id=" + k.id + "&from=home",
						t: k.name,
						tbh: !0,
						ahl: !1,
						pdr: !1,
						pcf: !0,
						rb: {
							t: "1",
							v: "share"
						}
					}), void ga("send", "event", "Home Slider", "click", "Special_" + k.name + "_" + k.id)
				}
				if (a.hasClass("native-ad")) {
					var l = a.data("href"),
						m = a.data("type"),
						n = a.parents("#home-slider"),
						o = n.offset().left,
						q = n.offset().top,
						r = a.width(),
						s = a.height(),
						t = o + r / 2,
						u = q + s / 2;
					return "mvad" == m ? l = l + "&x=" + t + "&y=" + u : "baidu" == m && (l = l + "&x=" + t + "&y=" + u), f.send(l), void console.log("slider-ad-" + m + " : " + l)
				}
				var v, w = a.data("id"),
					x = a.data("name");
				v = e.isLocal ? "http://10.88.0.111/tonight/server-v3/static/client/src/html/detail.html" : e.webDomain + "/video/detail", g(!isNaN(p) && p >= 3.6 ? {
					url: v + "?video_id=" + w + "&video_name=" + x,
					t: x,
					tbh: !0,
					pdr: !1,
					pcf: !0,
					rb: {
						t: "1",
						v: "share"
					},
					ban: {
						i: 2,
						p: 2
					}
				} : {
					url: v + "?video_id=" + w + "&video_name=" + x,
					t: x,
					tbh: !0,
					pdr: !1,
					pcf: !0,
					ban: {
						i: 2,
						p: 2
					}
				}), ga("send", "event", "Home Slider", "click", "Video Detail_" + x + "_" + w)
			}
		});
		*/
		var m = new n("#home-slider", {
			scrollX: !0,
			scrollY: !1,
			momentum: !0,
			snap: !0,
			eventPassthrough: !0,
			mouseWheel: !0,
			mouseWheelSpeed: 1,
			deceleration: .05,
			indicators: {
				el: "#indicator",
				interactive: !0,
				resize: !1
			}
		});
		a(), m.on("scrollStart", function() {
			clearTimeout(o)
		}), m.on("scrollEnd", function() {
			if (a(), 0 == r) {
				var b = $("#scroller a:eq(" + m.currentPage.pageX + ")");
				"mvad" == b.data("type") && (f.send(s), r = 1, console.log("render mvad"))
			}
			if (0 == t) {
				var b = $("#scroller a:eq(" + m.currentPage.pageX + ")");
				"baidu" == b.data("type") && (f.send(u), t = 1, console.log("render baidu"))
			}
		})
	}
	var e = a("config"),
		f = a("utils/jsToOC"),
		g = a("utils/openPage"),
		h = a("utils/localStorage"),
		i = a("utils/global"),
		j = a("utils/lazyLoad"),
		k = (a("utils/pageBannerGoogle"), null),
		l = a("utils/mvadRenderCall"),
		m = $(".pageView"),
		n = a("plugins/iscroll");
	a("plugins/cookie");
	var o, p = parseFloat($.cookie("xy_a_version")),
		q = i.appInfo.deviceInfo.deviceType,
		r = 0,
		s = "",
		t = 0,
		u = "",
		v = 1;
	"iPad" == q && (v = 2);
	var w = [],
		x = {
			type: "baidu",
			key: {
				publisher: "c134ee15",
				placement: "2072285"
			}
		},
		y = {
			type: "gdt",
			count: v,
			key: {
				publisher: "1103603602",
				placement: "7050801535516843"
			}
		};
	w.push(x), w.push(y), console.log(JSON.stringify(w)), i.appDidLoadNativeAd = function(a, b) {
		console.log("appDidLoadNativeAd");
		for (var c = JSON.parse(a), e = 0; e < c.length; e++) {
			var g = c[e].title,
				h = c[e].index,
				i = c[e].img,
				j = c[e].icon,
				k = c[e].desc,
				m = c[e].source,
				n = "",
				o = "";
			1 == b ? 0 == h && ("gdt" == m ? (f.send("nativeadrender?index=" + h + "&source_index=" + b), console.log("slider-ad-gdt : nativeadrender?index=" + h + "&source_index=" + b)) : "mvad" == m ? o = ' style="display:none;"' : "baidu" == m && (o = ' style="display:none;"'), n = '<a href="javascript:;" data-type="' + m + '" data-href="nativeadclick?index=' + h + "&source_index=" + b + '" data-name="' + g + '" data-index="' + h + '" data-desc="' + k + '" data-icon="' + j + '" style="background-image: url(&quot;' + i + '&quot;);" class="slide native-ad ' + m + '-slider"><div' + o + ' class="ad-notice"></div><span class="ad-icon">广告</span></a>', $("#scroller a:eq(1)").after(n), d(), s = "nativeadrender?index=" + h + "&source_index=" + b, u = "nativeadrender?index=" + h + "&source_index=" + b) : (2 == b || 3 == b) && ("gdt" == m || ("mvad" == m ? o = ' style="display:none;"' : "baidu" == m && (o = ' style="display:none;"')), n = ['<div class="native-ad ' + m + '-list"><a data-type="' + m + '" data-render="nativeadrender?index=' + h + "&source_index=" + b + '" data-href="nativeadclick?index=' + h + "&source_index=" + b + '" class="native-ad-link">', '<img src="' + i + '">', '<div class="title-con">', '<span class="ad-icon">广告</span>', '<span class="title">' + g + "</span>", '<span class="caption">' + k + "</span>", "</div>", "<div" + o + ' class="ad-notice"></div>', "</a>", "</div>"].join(""), "iPad" == q ? c.length >= v && v > h && (2 == b ? (0 == $(".native-ad-con-a").length && $(".chart-list").after('<div class="native-ad-con native-ad-con-a clearfix"></div>'), $(".native-ad-con-a").append(n)) : 3 == b && (0 == $(".native-ad-con-b").length && $(".zongyi:eq(0)").parents(".cate-list").after('<div class="native-ad-con native-ad-con-b clearfix"></div>'), $(".native-ad-con-b").append(n)), "gdt" == m && (f.send("nativeadrender?index=" + h + "&source_index=" + b), console.log("list-ad-gdt : nativeadrender?index=" + h + "&source_index=" + b))) : 0 == e && (2 == b ? (0 == $(".native-ad-con-a").length && $(".chart-list").after('<div class="native-ad-con native-ad-con-a clearfix"></div>'), $(".native-ad-con-a").append(n)) : 3 == b && (0 == $(".native-ad-con-b").length && $(".zongyi:eq(0)").parents(".cate-list").after('<div class="native-ad-con native-ad-con-b clearfix"></div>'), $(".native-ad-con-b").append(n)), "gdt" == m && (f.send("nativeadrender?index=" + h + "&source_index=" + b), console.log("list-ad-gdt : nativeadrender?index=" + h + "&source_index=" + b))), l.check())
		}
	}, $(function() {
		c(), j.init(), b(), l.init(), j.first(), m.on(e.clickEvent, ".native-ad-link", function() {
			var a = $(this),
				b = a.data("href"),
				c = a.data("type"),
				d = a.parent(),
				e = d.offset().left,
				g = d.offset().top,
				h = a.width(),
				i = a.height(),
				j = e + h / 2,
				k = g + i / 2;
			"mvad" == c && (b = b + "&x=" + j + "&y=" + k), console.log(b), f.send(b)
		}), m.on(e.clickEvent, ".native-ad .close", function() {
			$(this).parents(".native-ad").remove()
		}), m.on(e.clickEvent, ".special-list a", function() {
			var a, b = $(this),
				c = b.data();
			if (b.hasClass("banner-item")) {
				{
					var d = c.bannertype,
						f = c.bannersource;
					c.id
				}
				if (console.log(typeof d), "0" == d) a = e.isLocal ? "http://10.88.0.110/hd-v3/server-v3/static/client/src/html/detail.html" : e.webDomain + "/video/detail", h.set(c), g({
					url: a + "?video_id=" + f + "&video_name=" + encodeURIComponent(c.name),
					t: c.name,
					tbh: !0,
					pdr: !1,
					pcf: !0,
					rb: {
						t: "1",
						v: "share"
					},
					ban: {
						i: 2,
						p: 2
					}
				});
				else if ("1" == d) {
					var i = b.data("name");
					if (console.log(i), 0 == i.indexOf("wingmob")) {
						var j = $.cookie("xy_d_idfa"),
							k = "TZa",
							l = "http://api.wingmob.com/s/c/" + k + "?r=3&advid=" + j;
						console.log(l), $.ajax({
							url: l,
							dataType: "jsonp"
						})
					} else if (0 == i.indexOf("vxinyou")) {
						var j = $.cookie("xy_d_idfa"),
							k = "20243",
							l = "https://adapi.vxinyou.com/auth/index/index/?adid=" + k + "&idfa=" + j;
						console.log(l), $.ajax({
							url: l,
							dataType: "jsonp"
						})
					} else ga("send", "event", "Home To Video Special", "click", "AD_" + c.name + "_" + c.id)
				} else "2" == d && (a = e.isLocal ? "http://10.88.0.110/hd-v3/server-v3/static/client/src/html/special.html" : e.webDomain + "/video/special", g({
					url: a + "?special_id=" + f + "&from=home",
					t: c.name,
					tbh: !0,
					pdr: !1,
					ahl: !1,
					pcf: !0,
					rb: {
						t: "1",
						v: "share"
					}
				}), ga("send", "event", "Home To Video Special", "click", c.name + "_" + f))
			} else a = e.isLocal ? "http://10.88.0.111/hd-v3/server-v3/static/client/src/html/special.html" : e.webDomain + "/video/special", g({
				url: a + "?special_id=" + c.id + "&from=home",
				t: c.name,
				tbh: !0,
				pdr: !1,
				ahl: !1,
				pcf: !0,
				rb: {
					t: "1",
					v: "share"
				}
			}), ga("send", "event", "Home To Video Special", "click", c.name + "_" + c.id)
		}), m.on(e.clickEvent, ".video-item", function() {
			var a;
			a = e.isLocal ? "http://10.88.0.111/tonight/server-v3/static/client/src/html/detail.html" : e.webDomain + "/video/detail";
			var b = $(this).data();
			h.set(b), g({
				url: a + "?video_id=" + b.videoId + "&video_name=" + encodeURIComponent(b.name),
				t: b.name,
				tbh: !0,
				pcf: !0,
				rb: {
					t: "1",
					v: "share"
				},
				ban: {
					i: 2,
					p: 2
				}
			}), $(this).parents(".cate-list").hasClass("chart-list") ? ga("send", "event", "Home Chart To Video Detail", "click", decodeURIComponent(b.name) + "_" + b.videoId) : ga("send", "event", "Home To Video Detail", "click", decodeURIComponent(b.name) + "_" + b.videoId)
		}), m.on(e.clickEvent, ".cate-head", function() {
			var a, b = $(this),
				c = b.find(".cate-title").text(),
				d = b.data("target"),
				f = b.data("filter");
			if (b.find(".more").length > 0) if (b.hasClass("channel-list")) {
				var h = b.find(".more").data("ismore");
				"1" == h ? (a = e.isLocal ? "http://10.88.0.110/tonight-v3/server-v3/static/client/src/html/channellist.html" : e.webDomain + "/channel/list", g({
					url: a + "?cate_id=" + d + "&from=channelindex&cate_alias=" + c,
					t: c,
					tbh: !0,
					pdr: !1,
					asl: !1,
					rb: {
						t: "3",
						v: "更多"
					},
					ck: 1
				})) : (a = e.isLocal ? "http://10.88.0.110/tonight-v3/server-v3/static/client/src/html/channellist.html" : e.webDomain + "/channel/list", g({
					url: a + "?cate_id=" + d + "&from=channelindex&cate_alias=" + c,
					t: c,
					tbh: !0,
					asl: !1,
					ck: 1
				})), ga("send", "event", "Home To List", "click", "Channel_" + c + "_" + d)
			} else b.find(".chart").length > 0 ? (a = e.isLocal ? "http://10.88.0.110/hd-v3/server-v3/static/client/src/html/rank.html" : e.webDomain + "/video/rank", g(!isNaN(p) && p >= 3.2 ? {
				url: a,
				t: c,
				tbh: !0,
				pdr: !1,
				ahl: !1,
				bce: !1,
				pc: {
					r: 255,
					g: 255,
					b: 255,
					a: .2
				}
			} : {
				url: a,
				t: c,
				tbh: !0,
				pdr: !1,
				pc: {
					r: 255,
					g: 255,
					b: 255,
					a: .2
				}
			}), ga("send", "event", "Home To List", "click", "Chart_" + c + "_" + d)) : (a = e.isLocal ? "http://10.88.0.110/tonight-v3/server-v3/static/client/src/html/list.html" : e.webDomain + "/video/list", g({
				url: a + "?cate_alias=" + d + "&from=home&filter=" + f,
				t: c,
				tbh: !0,
				pdr: !1,
				ahl: !1,
				rb: {
					t: "1",
					v: "panel"
				},
				ck: 1
			}), ga("send", "event", "Home To Video List", "click", d))
		}), $(document).on("touchstart", ".video-item", function() {
			k = setTimeout(function() {
				$(".pageView").addClass("touch-visible")
			}, 300)
		}), $(document).on("touchmove", ".video-item", function() {
			$(".pageView").removeClass("touch-visible"), k && clearTimeout(k), console.log(k)
		}), $(document).on("touchend", ".video-item", function() {
			$(".pageView").removeClass("touch-visible"), k && clearTimeout(k), console.log(k)
		}), ga("send", "pageview", {
			page: "/v3/index",
			title: e.appUAPrefix
		})
	})
}), define("config", [], function() {
	var a = location.hostname,
		b = "10.88.0.111" == a || "192.168.1.102" == a || "10.88.0.110" == a || "dev.qisi.com" == a,
		c = -1 !== a.indexOf("dev"),
		d = $(window);
	return {
		isLocal: b,
		ajaxCallback: b ? "?callback=?" : "",
		apiDomain: b || c ? "http://hd.m.dev.jinerkan.com/v3/api" : "http://hd.m.jinerkan.com/v3/api",
		webDomain: b || c ? "http://hd.m.dev.jinerkan.com/v3/client" : "http://hd.m.jinerkan.com/v3/client",
		screenWidth: d.width(),
		screenHeight: d.height(),
		staticPath: b ? "/hdvideo/server-v3/static/client/src" : "/static/m/hd/v3/client/src",
		appScheme: "qisi-hd://",
		appUAPrefix: "QISI-HD",
		clickEvent: "ontouchstart" in window ? "tap" : "click",
		appID: "463709549",
		appName: "高清影视",
		appSpecialName: "来自《高清影视》的专题推荐: ",
		appVersion: 4.3
	}
}), define("utils/jsToOC", ["config"], function(a, b) {
	function c(a) {
		var b = document.createElement("IFRAME");
		b.setAttribute("src", d.appScheme + a), document.documentElement.appendChild(b), b.parentNode.removeChild(b), b = null
	}
	var d = a("config");
	b.send = c
}), define("utils/openPage", ["utils/jsToOC", "config", "plugins/cookie"], function(a) {
	var b = a("utils/jsToOC");
	a("plugins/cookie");
	var c = parseFloat($.cookie("xy_a_version"));
	return function(a) {
		var d;
		d = !isNaN(c) && c >= 4.3 ? {
			nbs: 1,
			tc: {
				r: 255,
				g: 255,
				b: 255,
				a: 1
			},
			bgc: {
				r: 0,
				g: 0,
				b: 0,
				a: 1
			},
			cc: {
				r: 255,
				g: 255,
				b: 255,
				a: 1
			},
			bs: 1,
			ck: 1,
			or: 2,
			ar: 0,
			ca: 0
		} : {
			tc: {
				r: 255,
				g: 255,
				b: 255,
				a: 1
			},
			bgc: {
				r: 25,
				g: 25,
				b: 25,
				a: 1
			},
			btc: {
				r: 0,
				g: 0,
				b: 0,
				a: 1
			},
			cc: {
				r: 255,
				g: 255,
				b: 255,
				a: 1
			},
			bs: 1,
			ck: 1,
			or: 2,
			ar: 0,
			ca: 0
		};
		var e = $.extend(!0, d, a),
			f = JSON.stringify(e);
		console.log(f), b.send("open/window?o=" + encodeURIComponent(f))
	}
}), define("plugins/cookie", [], function() {
	$.cookie = function(a, b, c) {
		if ("undefined" == typeof b) {
			var d = null;
			if (document.cookie && "" != document.cookie) for (var e = document.cookie.split(";"), f = 0; f < e.length; f++) {
				var g = $.trim(e[f]);
				if (g.substring(0, a.length + 1) == a + "=") {
					d = decodeURIComponent(g.substring(a.length + 1));
					break
				}
			}
			return d
		}
		c = c || {}, null === b && (b = "", c = $.extend({}, c), c.expires = -1);
		var h = "";
		if (c.expires && ("number" == typeof c.expires || c.expires.toUTCString)) {
			var i;
			"number" == typeof c.expires ? (i = new Date, i.setTime(i.getTime() + 24 * c.expires * 60 * 60 * 1e3)) : i = c.expires, h = "; expires=" + i.toUTCString()
		}
		var j = c.path ? "; path=" + c.path : "",
			k = c.domain ? "; domain=" + c.domain : "",
			l = c.secure ? "; secure" : "";
		document.cookie = [a, "=", encodeURIComponent(b), h, j, k, l].join("")
	}
}), define("utils/localStorage", ["config"], function(a) {
	var b = (a("config"), function(a) {
		for (var b = localStorage.preData ? JSON.parse(localStorage.preData) : [], c = 0, d = 0; d < b.length; d++) if (b[d].videoId == a.videoId) return void(c = 1);
		0 == c && (b.length > 19 && b.shift(), b.push(a), localStorage.preData = JSON.stringify(b))
	}),
		c = function(a) {
			var b = localStorage.preData ? JSON.parse(localStorage.preData) : "";
			if (b.length > 0) for (var c = 0; c < b.length; c++) if (b[c].videoId == a) return b[c]
		};
	return {
		set: b,
		get: c
	}
}), define("utils/global", ["config", "plugins/cookie"], function(a) {
	var b = a("config");
	a("plugins/cookie");
	var c = "unknown";
	"unknown" == c && "iPad" == $.cookie("xy_d_model") && (c = "iPad"), "unknown" == c && "iPhone" == $.cookie("xy_d_model") && (c = "iPhone"), console.log("device type: %s", c);
	var d = $.cookie("xy_s_version");
	console.log("system version: %s", d);
	var e = {
		deviceType: c,
		systemVersion: d
	},
		f = parseFloat($.cookie("xy_a_version")),
		g = {
			appVersion: f,
			deviceInfo: e
		};
	return window[b.appUAPrefix] = {}, window[b.appUAPrefix].appInfo = g, window[b.appUAPrefix].deviceInfo = e, window[b.appUAPrefix]
}), define("utils/lazyLoad", ["config", "utils/jsToOC"], function(a) {
	function b() {
		var a = $("body").scrollTop(),
			b = $(window).height();
		return {
			top: a,
			bottom: a + b
		}
	}
	function c(a) {
		var b = $(a).offset();
		return {
			top: b.top,
			height: b.height,
			bottom: b.top + b.height
		}
	}
	function d() {
		var a = $(".lazy-pic:not(.loaded-pic)"),
			d = b().top,
			e = b().bottom;
		if (a.length > 0) for (var f = 0; f < a.length; f++) {
			var g = $(a[f]),
				h = c(a[f]).top,
				i = (c(a[f]).height, c(a[f]).bottom);
			(h > d && e > h || i > d && e > i) && g.attr("src", g.data("pic")).addClass("loaded-pic")
		}
	}
	function e() {
		$(document).on("touchstart", function() {
			f && clearTimeout(f)
		}), $(document).on("touchend", function() {
			f = setTimeout(function() {
				d()
			}, 0)
		})
	}
	var f = (a("config"), a("utils/jsToOC"), null);
	return {
		init: e,
		first: d
	}
}), define("utils/pageBannerGoogle", ["config", "plugins/cookie"], function(a) {
	a("config");
	a("plugins/cookie");
	var b = function(a) {
			var b = document,
				c = b.getElementsByTagName("head")[0],
				d = b.createElement("script");
			d.async = !0, d.src = "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", c && c.insertBefore(d, c.firstChild), a.append('<ins class="adsbygoogle" style="display:block;width:100%;height:50px;" data-ad-client="ca-pub-4635126905896687" data-ad-slot="9325960458"></ins>'), (adsbygoogle = window.adsbygoogle || []).push({})
		},
		c = function(a) {
			var b = document,
				c = b.getElementsByTagName("head")[0],
				d = b.createElement("script");
			d.async = !0, d.src = "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", c && c.insertBefore(d, c.firstChild), a.append('<ins class="adsbygoogle" style="display:block;width:100%;height:50px;" data-ad-client="ca-pub-4635126905896687" data-ad-slot="5765217254"></ins>'), (adsbygoogle = window.adsbygoogle || []).push({})
		},
		d = function(a) {
			var b = 60,
				c = $.cookie("xy_d_model");
			c && c.indexOf("iPad") >= 0 && (b = 120), $("body").bind("DOMNodeInserted", function() {
				$(".adsbygoogle").length > 0 && ($("body").unbind("DOMNodeInserted"), setTimeout(function() {
					"fixBottom" == a ? ($(".pageView").css({
						"padding-bottom": 50,
						"box-sizing": "border-box"
					}), $(".adsbygoogle").css({
						position: "fixed",
						"z-index": "5",
						bottom: "0",
						height: 50
					})) : "bottom" == a && $(".adsbygoogle").css({
						"z-index": "5",
						height: 50
					}), $(".adsbygoogle").css({
						height: 50
					})
				}, 1e3))
			})
		};
	return {
		initBanner: b,
		initBannerB: c,
		setBanner: d
	}
}), define("utils/mvadRenderCall", ["config", "utils/jsToOC"], function(a) {
	function b() {
		var a = $("body").scrollTop(),
			b = $(window).height();
		return {
			top: a,
			bottom: a + b
		}
	}
	function c() {
		if ($(".mvad-list").size()) var a = $(".mvad-list").offset();
		else if ($(".baidu-list").size()) var a = $(".baidu-list").offset();
		return {
			top: a.top,
			height: a.height,
			bottom: a.top + a.height
		}
	}
	function d() {
		var a = (b().top, b().bottom);
		if ($(".mvad-list").size()) {
			{
				var d = c().top;
				c().bottom
			}
			if (a > d) {
				console.log("send " + h);
				var e = $(".mvad-list").find(".native-ad-link");
				if (0 == h) {
					for (var g = 0; g < e.length; g++) f.send($(e[g]).data("render")), console.log($(e[g]).data("render"));
					h = 1
				}
			}
		} else if ($(".baidu-list").size()) {
			{
				var d = c().top;
				c().bottom
			}
			if (a > d) {
				console.log("send " + h);
				var e = $(".baidu-list").find(".native-ad-link");
				if (0 == i) {
					for (var g = 0; g < e.length; g++) f.send($(e[g]).data("render")), console.log($(e[g]).data("render"));
					i = 1
				}
			}
		}
	}
	function e() {
		$(document).on("touchstart", function() {
			g && clearTimeout(g)
		}), $(document).on("touchend", function() {
			g = setTimeout(function() {
				d()
			}, 0)
		})
	}
	var f = (a("config"), a("utils/jsToOC")),
		g = null,
		h = 0,
		i = 0;
	return {
		init: e,
		check: d
	}
}), define("plugins/iscroll", [], function(a, b, c) {
	!
	function(a, b, d) {
		function e(a, c) {
			this.wrapper = "string" == typeof a ? b.querySelector(a) : a, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
				resizeScrollbars: !0,
				mouseWheelSpeed: 20,
				snapThreshold: .334,
				startX: 0,
				startY: 0,
				scrollY: !0,
				directionLockThreshold: 5,
				momentum: !0,
				bounce: !0,
				bounceTime: 600,
				bounceEasing: "",
				preventDefault: !0,
				preventDefaultException: {
					tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
				},
				HWCompositing: !0,
				useTransition: !0,
				useTransform: !0
			};
			for (var d in c) this.options[d] = c[d];
			this.translateZ = this.options.HWCompositing && i.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = i.hasTransition && this.options.useTransition, this.options.useTransform = i.hasTransform && this.options.useTransform, this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" == this.options.eventPassthrough ? !1 : this.options.scrollY, this.options.scrollX = "horizontal" == this.options.eventPassthrough ? !1 : this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? i.ease[this.options.bounceEasing] || i.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, this.options.tap === !0 && (this.options.tap = "tap"), "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
		}
		function f(a, c, d) {
			var e = b.createElement("div"),
				f = b.createElement("div");
			return d === !0 && (e.style.cssText = "position:absolute;z-index:9999", f.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), f.className = "iScrollIndicator", "h" == a ? (d === !0 && (e.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", f.style.height = "100%"), e.className = "iScrollHorizontalScrollbar") : (d === !0 && (e.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", f.style.width = "100%"), e.className = "iScrollVerticalScrollbar"), e.style.cssText += ";overflow:hidden", c || (e.style.pointerEvents = "none"), e.appendChild(f), e
		}
		function g(c, d) {
			this.wrapper = "string" == typeof d.el ? b.querySelector(d.el) : d.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = c, this.options = {
				listenX: !0,
				listenY: !0,
				interactive: !1,
				resize: !0,
				defaultScrollbars: !1,
				shrink: !1,
				fade: !1,
				speedRatioX: 0,
				speedRatioY: 0
			};
			for (var e in d) this.options[e] = d[e];
			this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (i.addEvent(this.indicator, "touchstart", this), i.addEvent(a, "touchend", this)), this.options.disablePointer || (i.addEvent(this.indicator, "MSPointerDown", this), i.addEvent(a, "MSPointerUp", this)), this.options.disableMouse || (i.addEvent(this.indicator, "mousedown", this), i.addEvent(a, "mouseup", this))), this.options.fade && (this.wrapperStyle[i.style.transform] = this.scroller.translateZ, this.wrapperStyle[i.style.transitionDuration] = i.isBadAndroid ? "0.001s" : "0ms", this.wrapperStyle.opacity = "0")
		}
		var h = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame ||
		function(b) {
			a.setTimeout(b, 1e3 / 60)
		}, i = function() {
			function c(a) {
				return g === !1 ? !1 : "" === g ? a : g + a.charAt(0).toUpperCase() + a.substr(1)
			}
			var e = {},
				f = b.createElement("div").style,
				g = function() {
					for (var a, b = ["t", "webkitT", "MozT", "msT", "OT"], c = 0, d = b.length; d > c; c++) if (a = b[c] + "ransform", a in f) return b[c].substr(0, b[c].length - 1);
					return !1
				}();
			e.getTime = Date.now ||
			function() {
				return (new Date).getTime()
			}, e.extend = function(a, b) {
				for (var c in b) a[c] = b[c]
			}, e.addEvent = function(a, b, c, d) {
				a.addEventListener(b, c, !! d)
			}, e.removeEvent = function(a, b, c, d) {
				a.removeEventListener(b, c, !! d)
			}, e.momentum = function(a, b, c, e, f, g) {
				var h, i, j = a - b,
					k = d.abs(j) / c;
				return g = void 0 === g ? 6e-4 : g, h = a + k * k / (2 * g) * (0 > j ? -1 : 1), i = k / g, e > h ? (h = f ? e - f / 2.5 * (k / 8) : e, j = d.abs(h - a), i = j / k) : h > 0 && (h = f ? f / 2.5 * (k / 8) : 0, j = d.abs(a) + h, i = j / k), {
					destination: d.round(h),
					duration: i
				}
			};
			var h = c("transform");
			return e.extend(e, {
				hasTransform: h !== !1,
				hasPerspective: c("perspective") in f,
				hasTouch: "ontouchstart" in a,
				hasPointer: navigator.msPointerEnabled,
				hasTransition: c("transition") in f
			}), e.isBadAndroid = /Android /.test(a.navigator.appVersion) && !/Chrome\/\d/.test(a.navigator.appVersion), e.extend(e.style = {}, {
				transform: h,
				transitionTimingFunction: c("transitionTimingFunction"),
				transitionDuration: c("transitionDuration"),
				transitionDelay: c("transitionDelay"),
				transformOrigin: c("transformOrigin")
			}), e.hasClass = function(a, b) {
				var c = new RegExp("(^|\\s)" + b + "(\\s|$)");
				return c.test(a.className)
			}, e.addClass = function(a, b) {
				if (!e.hasClass(a, b)) {
					var c = a.className.split(" ");
					c.push(b), a.className = c.join(" ")
				}
			}, e.removeClass = function(a, b) {
				if (e.hasClass(a, b)) {
					var c = new RegExp("(^|\\s)" + b + "(\\s|$)", "g");
					a.className = a.className.replace(c, " ")
				}
			}, e.offset = function(a) {
				for (var b = -a.offsetLeft, c = -a.offsetTop; a = a.offsetParent;) b -= a.offsetLeft, c -= a.offsetTop;
				return {
					left: b,
					top: c
				}
			}, e.preventDefaultException = function(a, b) {
				for (var c in b) if (b[c].test(a[c])) return !0;
				return !1
			}, e.extend(e.eventType = {}, {
				touchstart: 1,
				touchmove: 1,
				touchend: 1,
				mousedown: 2,
				mousemove: 2,
				mouseup: 2,
				MSPointerDown: 3,
				MSPointerMove: 3,
				MSPointerUp: 3
			}), e.extend(e.ease = {}, {
				quadratic: {
					style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
					fn: function(a) {
						return a * (2 - a)
					}
				},
				circular: {
					style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
					fn: function(a) {
						return d.sqrt(1 - --a * a)
					}
				},
				back: {
					style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
					fn: function(a) {
						var b = 4;
						return (a -= 1) * a * ((b + 1) * a + b) + 1
					}
				},
				bounce: {
					style: "",
					fn: function(a) {
						return (a /= 1) < 1 / 2.75 ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
					}
				},
				elastic: {
					style: "",
					fn: function(a) {
						var b = .22,
							c = .4;
						return 0 === a ? 0 : 1 == a ? 1 : c * d.pow(2, -10 * a) * d.sin(2 * (a - b / 4) * d.PI / b) + 1
					}
				}
			}), e.tap = function(a, c) {
				var d = b.createEvent("Event");
				d.initEvent(c, !0, !0), d.pageX = a.pageX, d.pageY = a.pageY, a.target.dispatchEvent(d)
			}, e.click = function(a) {
				var c, d = a.target;
				/(SELECT|INPUT|TEXTAREA)/i.test(d.tagName) || (c = b.createEvent("MouseEvents"), c.initMouseEvent("click", !0, !0, a.view, 1, d.screenX, d.screenY, d.clientX, d.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, null), c._constructed = !0, d.dispatchEvent(c))
			}, e
		}();
		e.prototype = {
			version: "5.1.1",
			_init: function() {
				this._initEvents(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys()
			},
			destroy: function() {
				this._initEvents(!0), this._execEvent("destroy")
			},
			_transitionEnd: function(a) {
				a.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
			},
			_start: function(a) {
				if (!(1 != i.eventType[a.type] && 0 !== a.button || !this.enabled || this.initiated && i.eventType[a.type] !== this.initiated)) {
					!this.options.preventDefault || i.isBadAndroid || i.preventDefaultException(a.target, this.options.preventDefaultException) || a.preventDefault();
					var b, c = a.touches ? a.touches[0] : a;
					this.initiated = i.eventType[a.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = i.getTime(), this.options.useTransition && this.isInTransition ? (this.isInTransition = !1, b = this.getComputedPosition(), this._translate(d.round(b.x), d.round(b.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = c.pageX, this.pointY = c.pageY, this._execEvent("beforeScrollStart")
				}
			},
			_move: function(a) {
				if (this.enabled && i.eventType[a.type] === this.initiated) {
					this.options.preventDefault && a.preventDefault();
					var b, c, e, f, g = a.touches ? a.touches[0] : a,
						h = g.pageX - this.pointX,
						j = g.pageY - this.pointY,
						k = i.getTime();
					if (this.pointX = g.pageX, this.pointY = g.pageY, this.distX += h, this.distY += j, e = d.abs(this.distX), f = d.abs(this.distY), !(k - this.endTime > 300 && 10 > e && 10 > f)) {
						if (this.directionLocked || this.options.freeScroll || (this.directionLocked = e > f + this.options.directionLockThreshold ? "h" : f >= e + this.options.directionLockThreshold ? "v" : "n"), "h" == this.directionLocked) {
							if ("vertical" == this.options.eventPassthrough) a.preventDefault();
							else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
							j = 0
						} else if ("v" == this.directionLocked) {
							if ("horizontal" == this.options.eventPassthrough) a.preventDefault();
							else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
							h = 0
						}
						h = this.hasHorizontalScroll ? h : 0, j = this.hasVerticalScroll ? j : 0, b = this.x + h, c = this.y + j, (b > 0 || b < this.maxScrollX) && (b = this.options.bounce ? this.x + h / 3 : b > 0 ? 0 : this.maxScrollX), (c > 0 || c < this.maxScrollY) && (c = this.options.bounce ? this.y + j / 3 : c > 0 ? 0 : this.maxScrollY), this.directionX = h > 0 ? -1 : 0 > h ? 1 : 0, this.directionY = j > 0 ? -1 : 0 > j ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(b, c), k - this.startTime > 300 && (this.startTime = k, this.startX = this.x, this.startY = this.y)
					}
				}
			},
			_end: function(a) {
				if (this.enabled && i.eventType[a.type] === this.initiated) {
					this.options.preventDefault && !i.preventDefaultException(a.target, this.options.preventDefaultException) && a.preventDefault();
					var b, c, e = (a.changedTouches ? a.changedTouches[0] : a, i.getTime() - this.startTime),
						f = d.round(this.x),
						g = d.round(this.y),
						h = d.abs(f - this.startX),
						j = d.abs(g - this.startY),
						k = 0,
						l = "";
					if (this.isInTransition = 0, this.initiated = 0, this.endTime = i.getTime(), !this.resetPosition(this.options.bounceTime)) {
						if (this.scrollTo(f, g), !this.moved) return this.options.tap && i.tap(a, this.options.tap), this.options.click && i.click(a), void this._execEvent("scrollCancel");
						if (this._events.flick && 200 > e && 100 > h && 100 > j) return void this._execEvent("flick");
						if (this.options.momentum && 300 > e && (b = this.hasHorizontalScroll ? i.momentum(this.x, this.startX, e, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
							destination: f,
							duration: 0
						}, c = this.hasVerticalScroll ? i.momentum(this.y, this.startY, e, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
							destination: g,
							duration: 0
						}, f = b.destination, g = c.destination, k = d.max(b.duration, c.duration), this.isInTransition = 1), this.options.snap) {
							var m = this._nearestSnap(f, g);
							this.currentPage = m, k = this.options.snapSpeed || d.max(d.max(d.min(d.abs(f - m.x), 1e3), d.min(d.abs(g - m.y), 1e3)), 300), f = m.x, g = m.y, this.directionX = 0, this.directionY = 0, l = this.options.bounceEasing
						}
						return f != this.x || g != this.y ? ((f > 0 || f < this.maxScrollX || g > 0 || g < this.maxScrollY) && (l = i.ease.quadratic), void this.scrollTo(f, g, k, l)) : void this._execEvent("scrollEnd")
					}
				}
			},
			_resize: function() {
				var a = this;
				clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
					a.refresh()
				}, this.options.resizePolling)
			},
			resetPosition: function(a) {
				var b = this.x,
					c = this.y;
				return a = a || 0, !this.hasHorizontalScroll || this.x > 0 ? b = 0 : this.x < this.maxScrollX && (b = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? c = 0 : this.y < this.maxScrollY && (c = this.maxScrollY), b == this.x && c == this.y ? !1 : (this.scrollTo(b, c, a, this.options.bounceEasing), !0)
			},
			disable: function() {
				this.enabled = !1
			},
			enable: function() {
				this.enabled = !0
			},
			refresh: function() {
				this.wrapper.offsetHeight;
				this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = i.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
			},
			on: function(a, b) {
				this._events[a] || (this._events[a] = []), this._events[a].push(b)
			},
			off: function(a, b) {
				if (this._events[a]) {
					var c = this._events[a].indexOf(b);
					c > -1 && this._events[a].splice(c, 1)
				}
			},
			_execEvent: function(a) {
				if (this._events[a]) {
					var b = 0,
						c = this._events[a].length;
					if (c) for (; c > b; b++) this._events[a][b].apply(this, [].slice.call(arguments, 1))
				}
			},
			scrollBy: function(a, b, c, d) {
				a = this.x + a, b = this.y + b, c = c || 0, this.scrollTo(a, b, c, d)
			},
			scrollTo: function(a, b, c, d) {
				d = d || i.ease.circular, this.isInTransition = this.options.useTransition && c > 0, !c || this.options.useTransition && d.style ? (this._transitionTimingFunction(d.style), this._transitionTime(c), this._translate(a, b)) : this._animate(a, b, c, d.fn)
			},
			scrollToElement: function(a, b, c, e, f) {
				if (a = a.nodeType ? a : this.scroller.querySelector(a)) {
					var g = i.offset(a);
					g.left -= this.wrapperOffset.left, g.top -= this.wrapperOffset.top, c === !0 && (c = d.round(a.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), e === !0 && (e = d.round(a.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), g.left -= c || 0, g.top -= e || 0, g.left = g.left > 0 ? 0 : g.left < this.maxScrollX ? this.maxScrollX : g.left, g.top = g.top > 0 ? 0 : g.top < this.maxScrollY ? this.maxScrollY : g.top, b = void 0 === b || null === b || "auto" === b ? d.max(d.abs(this.x - g.left), d.abs(this.y - g.top)) : b, this.scrollTo(g.left, g.top, b, f)
				}
			},
			_transitionTime: function(a) {
				if (a = a || 0, this.scrollerStyle[i.style.transitionDuration] = a + "ms", !a && i.isBadAndroid && (this.scrollerStyle[i.style.transitionDuration] = "0.001s"), this.indicators) for (var b = this.indicators.length; b--;) this.indicators[b].transitionTime(a)
			},
			_transitionTimingFunction: function(a) {
				if (this.scrollerStyle[i.style.transitionTimingFunction] = a, this.indicators) for (var b = this.indicators.length; b--;) this.indicators[b].transitionTimingFunction(a)
			},
			_translate: function(a, b) {
				if (this.options.useTransform ? this.scrollerStyle[i.style.transform] = "translate(" + a + "px," + b + "px)" + this.translateZ : (a = d.round(a), b = d.round(b), this.scrollerStyle.left = a + "px", this.scrollerStyle.top = b + "px"), this.x = a, this.y = b, this.indicators) for (var c = this.indicators.length; c--;) this.indicators[c].updatePosition()
			},
			_initEvents: function(b) {
				var c = b ? i.removeEvent : i.addEvent,
					d = this.options.bindToWrapper ? this.wrapper : a;
				c(a, "orientationchange", this), c(a, "resize", this), this.options.click && c(this.wrapper, "click", this, !0), this.options.disableMouse || (c(this.wrapper, "mousedown", this), c(d, "mousemove", this), c(d, "mousecancel", this), c(d, "mouseup", this)), i.hasPointer && !this.options.disablePointer && (c(this.wrapper, "MSPointerDown", this), c(d, "MSPointerMove", this), c(d, "MSPointerCancel", this), c(d, "MSPointerUp", this)), i.hasTouch && !this.options.disableTouch && (c(this.wrapper, "touchstart", this), c(d, "touchmove", this), c(d, "touchcancel", this), c(d, "touchend", this)), c(this.scroller, "transitionend", this), c(this.scroller, "webkitTransitionEnd", this), c(this.scroller, "oTransitionEnd", this), c(this.scroller, "MSTransitionEnd", this)
			},
			getComputedPosition: function() {
				var b, c, d = a.getComputedStyle(this.scroller, null);
				return this.options.useTransform ? (d = d[i.style.transform].split(")")[0].split(", "), b = +(d[12] || d[4]), c = +(d[13] || d[5])) : (b = +d.left.replace(/[^-\d.]/g, ""), c = +d.top.replace(/[^-\d.]/g, "")), {
					x: b,
					y: c
				}
			},
			_initIndicators: function() {
				function a(a) {
					for (var b = h.indicators.length; b--;) a.call(h.indicators[b])
				}
				var b, c = this.options.interactiveScrollbars,
					d = "string" != typeof this.options.scrollbars,
					e = [],
					h = this;
				this.indicators = [], this.options.scrollbars && (this.options.scrollY && (b = {
					el: f("v", c, this.options.scrollbars),
					interactive: c,
					defaultScrollbars: !0,
					customStyle: d,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenX: !1
				}, this.wrapper.appendChild(b.el), e.push(b)), this.options.scrollX && (b = {
					el: f("h", c, this.options.scrollbars),
					interactive: c,
					defaultScrollbars: !0,
					customStyle: d,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenY: !1
				}, this.wrapper.appendChild(b.el), e.push(b))), this.options.indicators && (e = e.concat(this.options.indicators));
				for (var i = e.length; i--;) this.indicators.push(new g(this, e[i]));
				this.options.fadeScrollbars && (this.on("scrollEnd", function() {
					a(function() {
						this.fade()
					})
				}), this.on("scrollCancel", function() {
					a(function() {
						this.fade()
					})
				}), this.on("scrollStart", function() {
					a(function() {
						this.fade(1)
					})
				}), this.on("beforeScrollStart", function() {
					a(function() {
						this.fade(1, !0)
					})
				})), this.on("refresh", function() {
					a(function() {
						this.refresh()
					})
				}), this.on("destroy", function() {
					a(function() {
						this.destroy()
					}), delete this.indicators
				})
			},
			_initWheel: function() {
				i.addEvent(this.wrapper, "wheel", this), i.addEvent(this.wrapper, "mousewheel", this), i.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function() {
					i.removeEvent(this.wrapper, "wheel", this), i.removeEvent(this.wrapper, "mousewheel", this), i.removeEvent(this.wrapper, "DOMMouseScroll", this)
				})
			},
			_wheel: function(a) {
				if (this.enabled) {
					a.preventDefault(), a.stopPropagation();
					var b, c, e, f, g = this;
					if (void 0 === this.wheelTimeout && g._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
						g._execEvent("scrollEnd"), g.wheelTimeout = void 0
					}, 400), "deltaX" in a) b = -a.deltaX, c = -a.deltaY;
					else if ("wheelDeltaX" in a) b = a.wheelDeltaX / 120 * this.options.mouseWheelSpeed, c = a.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
					else if ("wheelDelta" in a) b = c = a.wheelDelta / 120 * this.options.mouseWheelSpeed;
					else {
						if (!("detail" in a)) return;
						b = c = -a.detail / 3 * this.options.mouseWheelSpeed
					}
					if (b *= this.options.invertWheelDirection, c *= this.options.invertWheelDirection, this.hasVerticalScroll || (b = c, c = 0), this.options.snap) return e = this.currentPage.pageX, f = this.currentPage.pageY, b > 0 ? e-- : 0 > b && e++, c > 0 ? f-- : 0 > c && f++, void this.goToPage(e, f);
					e = this.x + d.round(this.hasHorizontalScroll ? b : 0), f = this.y + d.round(this.hasVerticalScroll ? c : 0), e > 0 ? e = 0 : e < this.maxScrollX && (e = this.maxScrollX), f > 0 ? f = 0 : f < this.maxScrollY && (f = this.maxScrollY), this.scrollTo(e, f, 0)
				}
			},
			_initSnap: function() {
				this.currentPage = {}, "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function() {
					var a, b, c, e, f, g, h = 0,
						i = 0,
						j = 0,
						k = this.options.snapStepX || this.wrapperWidth,
						l = this.options.snapStepY || this.wrapperHeight;
					if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
						if (this.options.snap === !0) for (c = d.round(k / 2), e = d.round(l / 2); j > -this.scrollerWidth;) {
							for (this.pages[h] = [], a = 0, f = 0; f > -this.scrollerHeight;) this.pages[h][a] = {
								x: d.max(j, this.maxScrollX),
								y: d.max(f, this.maxScrollY),
								width: k,
								height: l,
								cx: j - c,
								cy: f - e
							}, f -= l, a++;
							j -= k, h++
						} else for (g = this.options.snap, a = g.length, b = -1; a > h; h++)(0 === h || g[h].offsetLeft <= g[h - 1].offsetLeft) && (i = 0, b++), this.pages[i] || (this.pages[i] = []), j = d.max(-g[h].offsetLeft, this.maxScrollX), f = d.max(-g[h].offsetTop, this.maxScrollY), c = j - d.round(g[h].offsetWidth / 2), e = f - d.round(g[h].offsetHeight / 2), this.pages[i][b] = {
							x: j,
							y: f,
							width: g[h].offsetWidth,
							height: g[h].offsetHeight,
							cx: c,
							cy: e
						}, j > this.maxScrollX && i++;
						this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), this.options.snapThreshold % 1 === 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = d.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = d.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
					}
				}), this.on("flick", function() {
					var a = this.options.snapSpeed || d.max(d.max(d.min(d.abs(this.x - this.startX), 1e3), d.min(d.abs(this.y - this.startY), 1e3)), 300);
					this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, a)
				})
			},
			_nearestSnap: function(a, b) {
				if (!this.pages.length) return {
					x: 0,
					y: 0,
					pageX: 0,
					pageY: 0
				};
				var c = 0,
					e = this.pages.length,
					f = 0;
				if (d.abs(a - this.absStartX) < this.snapThresholdX && d.abs(b - this.absStartY) < this.snapThresholdY) return this.currentPage;
				for (a > 0 ? a = 0 : a < this.maxScrollX && (a = this.maxScrollX), b > 0 ? b = 0 : b < this.maxScrollY && (b = this.maxScrollY); e > c; c++) if (a >= this.pages[c][0].cx) {
					a = this.pages[c][0].x;
					break
				}
				for (e = this.pages[c].length; e > f; f++) if (b >= this.pages[0][f].cy) {
					b = this.pages[0][f].y;
					break
				}
				return c == this.currentPage.pageX && (c += this.directionX, 0 > c ? c = 0 : c >= this.pages.length && (c = this.pages.length - 1), a = this.pages[c][0].x), f == this.currentPage.pageY && (f += this.directionY, 0 > f ? f = 0 : f >= this.pages[0].length && (f = this.pages[0].length - 1), b = this.pages[0][f].y), {
					x: a,
					y: b,
					pageX: c,
					pageY: f
				}
			},
			goToPage: function(a, b, c, e) {
				e = e || this.options.bounceEasing, a >= this.pages.length ? a = this.pages.length - 1 : 0 > a && (a = 0), b >= this.pages[a].length ? b = this.pages[a].length - 1 : 0 > b && (b = 0);
				var f = this.pages[a][b].x,
					g = this.pages[a][b].y;
				c = void 0 === c ? this.options.snapSpeed || d.max(d.max(d.min(d.abs(f - this.x), 1e3), d.min(d.abs(g - this.y), 1e3)), 300) : c, this.currentPage = {
					x: f,
					y: g,
					pageX: a,
					pageY: b
				}, this.scrollTo(f, g, c, e)
			},
			next: function(a, b) {
				var c = this.currentPage.pageX,
					d = this.currentPage.pageY;
				c++, c >= this.pages.length && this.hasVerticalScroll && (c = 0, d++), this.goToPage(c, d, a, b)
			},
			prev: function(a, b) {
				var c = this.currentPage.pageX,
					d = this.currentPage.pageY;
				c--, 0 > c && this.hasVerticalScroll && (c = 0, d--), this.goToPage(c, d, a, b)
			},
			_initKeys: function() {
				var b, c = {
					pageUp: 33,
					pageDown: 34,
					end: 35,
					home: 36,
					left: 37,
					up: 38,
					right: 39,
					down: 40
				};
				if ("object" == typeof this.options.keyBindings) for (b in this.options.keyBindings)"string" == typeof this.options.keyBindings[b] && (this.options.keyBindings[b] = this.options.keyBindings[b].toUpperCase().charCodeAt(0));
				else this.options.keyBindings = {};
				for (b in c) this.options.keyBindings[b] = this.options.keyBindings[b] || c[b];
				i.addEvent(a, "keydown", this), this.on("destroy", function() {
					i.removeEvent(a, "keydown", this)
				})
			},
			_key: function(a) {
				if (this.enabled) {
					var b, c = this.options.snap,
						e = c ? this.currentPage.pageX : this.x,
						f = c ? this.currentPage.pageY : this.y,
						g = i.getTime(),
						h = this.keyTime || 0,
						j = .25;
					switch (this.options.useTransition && this.isInTransition && (b = this.getComputedPosition(), this._translate(d.round(b.x), d.round(b.y)), this.isInTransition = !1), this.keyAcceleration = 200 > g - h ? d.min(this.keyAcceleration + j, 50) : 0, a.keyCode) {
					case this.options.keyBindings.pageUp:
						this.hasHorizontalScroll && !this.hasVerticalScroll ? e += c ? 1 : this.wrapperWidth : f += c ? 1 : this.wrapperHeight;
						break;
					case this.options.keyBindings.pageDown:
						this.hasHorizontalScroll && !this.hasVerticalScroll ? e -= c ? 1 : this.wrapperWidth : f -= c ? 1 : this.wrapperHeight;
						break;
					case this.options.keyBindings.end:
						e = c ? this.pages.length - 1 : this.maxScrollX, f = c ? this.pages[0].length - 1 : this.maxScrollY;
						break;
					case this.options.keyBindings.home:
						e = 0, f = 0;
						break;
					case this.options.keyBindings.left:
						e += c ? -1 : 5 + this.keyAcceleration >> 0;
						break;
					case this.options.keyBindings.up:
						f += c ? 1 : 5 + this.keyAcceleration >> 0;
						break;
					case this.options.keyBindings.right:
						e -= c ? -1 : 5 + this.keyAcceleration >> 0;
						break;
					case this.options.keyBindings.down:
						f -= c ? 1 : 5 + this.keyAcceleration >> 0;
						break;
					default:
						return
					}
					if (c) return void this.goToPage(e, f);
					e > 0 ? (e = 0, this.keyAcceleration = 0) : e < this.maxScrollX && (e = this.maxScrollX, this.keyAcceleration = 0), f > 0 ? (f = 0, this.keyAcceleration = 0) : f < this.maxScrollY && (f = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(e, f, 0), this.keyTime = g
				}
			},
			_animate: function(a, b, c, d) {
				function e() {
					var m, n, o, p = i.getTime();
					return p >= l ? (f.isAnimating = !1, f._translate(a, b), void(f.resetPosition(f.options.bounceTime) || f._execEvent("scrollEnd"))) : (p = (p - k) / c, o = d(p), m = (a - g) * o + g, n = (b - j) * o + j, f._translate(m, n), void(f.isAnimating && h(e)))
				}
				var f = this,
					g = this.x,
					j = this.y,
					k = i.getTime(),
					l = k + c;
				this.isAnimating = !0, e()
			},
			handleEvent: function(a) {
				switch (a.type) {
				case "touchstart":
				case "MSPointerDown":
				case "mousedown":
					this._start(a);
					break;
				case "touchmove":
				case "MSPointerMove":
				case "mousemove":
					this._move(a);
					break;
				case "touchend":
				case "MSPointerUp":
				case "mouseup":
				case "touchcancel":
				case "MSPointerCancel":
				case "mousecancel":
					this._end(a);
					break;
				case "orientationchange":
				case "resize":
					this._resize();
					break;
				case "transitionend":
				case "webkitTransitionEnd":
				case "oTransitionEnd":
				case "MSTransitionEnd":
					this._transitionEnd(a);
					break;
				case "wheel":
				case "DOMMouseScroll":
				case "mousewheel":
					this._wheel(a);
					break;
				case "keydown":
					this._key(a);
					break;
				case "click":
					a._constructed || (a.preventDefault(), a.stopPropagation())
				}
			}
		}, g.prototype = {
			handleEvent: function(a) {
				switch (a.type) {
				case "touchstart":
				case "MSPointerDown":
				case "mousedown":
					this._start(a);
					break;
				case "touchmove":
				case "MSPointerMove":
				case "mousemove":
					this._move(a);
					break;
				case "touchend":
				case "MSPointerUp":
				case "mouseup":
				case "touchcancel":
				case "MSPointerCancel":
				case "mousecancel":
					this._end(a)
				}
			},
			destroy: function() {
				this.options.interactive && (i.removeEvent(this.indicator, "touchstart", this), i.removeEvent(this.indicator, "MSPointerDown", this), i.removeEvent(this.indicator, "mousedown", this), i.removeEvent(a, "touchmove", this), i.removeEvent(a, "MSPointerMove", this), i.removeEvent(a, "mousemove", this), i.removeEvent(a, "touchend", this), i.removeEvent(a, "MSPointerUp", this), i.removeEvent(a, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
			},
			_start: function(b) {
				var c = b.touches ? b.touches[0] : b;
				b.preventDefault(), b.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = c.pageX, this.lastPointY = c.pageY, this.startTime = i.getTime(), this.options.disableTouch || i.addEvent(a, "touchmove", this), this.options.disablePointer || i.addEvent(a, "MSPointerMove", this), this.options.disableMouse || i.addEvent(a, "mousemove", this), this.scroller._execEvent("beforeScrollStart")
			},
			_move: function(a) {
				{
					var b, c, d, e, f = a.touches ? a.touches[0] : a;
					i.getTime()
				}
				this.moved || this.scroller._execEvent("scrollStart"), this.moved = !0, b = f.pageX - this.lastPointX, this.lastPointX = f.pageX, c = f.pageY - this.lastPointY, this.lastPointY = f.pageY, d = this.x + b, e = this.y + c, this._pos(d, e), a.preventDefault(), a.stopPropagation()
			},
			_end: function(b) {
				if (this.initiated) {
					if (this.initiated = !1, b.preventDefault(), b.stopPropagation(), i.removeEvent(a, "touchmove", this), i.removeEvent(a, "MSPointerMove", this), i.removeEvent(a, "mousemove", this), this.scroller.options.snap) {
						var c = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
							e = this.options.snapSpeed || d.max(d.max(d.min(d.abs(this.scroller.x - c.x), 1e3), d.min(d.abs(this.scroller.y - c.y), 1e3)), 300);
						(this.scroller.x != c.x || this.scroller.y != c.y) && (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = c, this.scroller.scrollTo(c.x, c.y, e, this.scroller.options.bounceEasing))
					}
					this.moved && this.scroller._execEvent("scrollEnd")
				}
			},
			transitionTime: function(a) {
				a = a || 0, this.indicatorStyle[i.style.transitionDuration] = a + "ms", !a && i.isBadAndroid && (this.indicatorStyle[i.style.transitionDuration] = "0.001s")
			},
			transitionTimingFunction: function(a) {
				this.indicatorStyle[i.style.transitionTimingFunction] = a
			},
			refresh: function() {
				this.transitionTime(), this.indicatorStyle.display = this.options.listenX && !this.options.listenY ? this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.scroller.hasVerticalScroll ? "block" : "none" : this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (i.addClass(this.wrapper, "iScrollBothScrollbars"), i.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (i.removeClass(this.wrapper, "iScrollBothScrollbars"), i.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px"));
				this.wrapper.offsetHeight;
				this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = d.max(d.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = d.max(d.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
			},
			updatePosition: function() {
				var a = this.options.listenX && d.round(this.sizeRatioX * this.scroller.x) || 0,
					b = this.options.listenY && d.round(this.sizeRatioY * this.scroller.y) || 0;
				this.options.ignoreBoundaries || (a < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = d.max(this.indicatorWidth + a, 8), this.indicatorStyle.width = this.width + "px"), a = this.minBoundaryX) : a > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = d.max(this.indicatorWidth - (a - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", a = this.maxPosX + this.indicatorWidth - this.width) : a = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), b < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = d.max(this.indicatorHeight + 3 * b, 8), this.indicatorStyle.height = this.height + "px"), b = this.minBoundaryY) : b > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = d.max(this.indicatorHeight - 3 * (b - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", b = this.maxPosY + this.indicatorHeight - this.height) : b = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")), this.x = a, this.y = b, this.scroller.options.useTransform ? this.indicatorStyle[i.style.transform] = "translate(" + a + "px," + b + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = a + "px", this.indicatorStyle.top = b + "px")
			},
			_pos: function(a, b) {
				0 > a ? a = 0 : a > this.maxPosX && (a = this.maxPosX), 0 > b ? b = 0 : b > this.maxPosY && (b = this.maxPosY), a = this.options.listenX ? d.round(a / this.sizeRatioX) : this.scroller.x, b = this.options.listenY ? d.round(b / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(a, b)
			},
			fade: function(a, b) {
				if (!b || this.visible) {
					clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
					var c = a ? 250 : 500,
						d = a ? 0 : 300;
					a = a ? "1" : "0", this.wrapperStyle[i.style.transitionDuration] = c + "ms", this.fadeTimeout = setTimeout(function(a) {
						this.wrapperStyle.opacity = a, this.visible = +a
					}.bind(this, a), d)
				}
			}
		}, e.utils = i, "undefined" != typeof c && c.exports ? c.exports = e : a.IScroll = e
	}(window, document, Math)
});