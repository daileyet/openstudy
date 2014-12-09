/*! jQuery v1.7.1 jquery.com | jquery.org/license */
(function(a, b) {
	function cy(a) {
		return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
	}

	function cv(a) {
		if (!ck[a]) {
			var b = c.body,
				d = f("<" + a + ">").appendTo(b),
				e = d.css("display");
			d.remove();
			if (e === "none" || e === "") {
				cl || (cl = c.createElement("iframe"), cl.frameBorder = cl.width = cl.height = 0), b.appendChild(cl);
				if (!cm || !cl.createElement) cm = (cl.contentWindow || cl.contentDocument).document, cm.write((c.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"), cm.close();
				d = cm.createElement(a), cm.body.appendChild(d), e = f.css(d, "display"), b.removeChild(cl)
			}
			ck[a] = e
		}
		return ck[a]
	}

	function cu(a, b) {
		var c = {};
		f.each(cq.concat.apply([], cq.slice(0, b)), function() {
			c[this] = a
		});
		return c
	}

	function ct() {
		cr = b
	}

	function cs() {
		setTimeout(ct, 0);
		return cr = f.now()
	}

	function cj() {
		try {
			return new a.ActiveXObject("Microsoft.XMLHTTP")
		} catch (b) {}
	}

	function ci() {
		try {
			return new a.XMLHttpRequest
		} catch (b) {}
	}

	function cc(a, c) {
		a.dataFilter && (c = a.dataFilter(c, a.dataType));
		var d = a.dataTypes,
			e = {},
			g, h, i = d.length,
			j, k = d[0],
			l, m, n, o, p;
		for (g = 1; g < i; g++) {
			if (g === 1)
				for (h in a.converters) typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
			l = k, k = d[g];
			if (k === "*") k = l;
			else if (l !== "*" && l !== k) {
				m = l + " " + k, n = e[m] || e["* " + k];
				if (!n) {
					p = b;
					for (o in e) {
						j = o.split(" ");
						if (j[0] === l || j[0] === "*") {
							p = e[j[1] + " " + k];
							if (p) {
								o = e[o], o === !0 ? n = p : p === !0 && (n = o);
								break
							}
						}
					}
				}!n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
			}
		}
		return c
	}

	function cb(a, c, d) {
		var e = a.contents,
			f = a.dataTypes,
			g = a.responseFields,
			h, i, j, k;
		for (i in g) i in d && (c[g[i]] = d[i]);
		while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
		if (h)
			for (i in e)
				if (e[i] && e[i].test(h)) {
					f.unshift(i);
					break
				}
		if (f[0] in d) j = f[0];
		else {
			for (i in d) {
				if (!f[0] || a.converters[i + " " + f[0]]) {
					j = i;
					break
				}
				k || (k = i)
			}
			j = j || k
		} if (j) {
			j !== f[0] && f.unshift(j);
			return d[j]
		}
	}

	function ca(a, b, c, d) {
		if (f.isArray(b)) f.each(b, function(b, e) {
			c || bE.test(a) ? d(a, e) : ca(a + "[" + (typeof e == "object" || f.isArray(e) ? b : "") + "]", e, c, d)
		});
		else if (!c && b != null && typeof b == "object")
			for (var e in b) ca(a + "[" + e + "]", b[e], c, d);
		else d(a, b)
	}

	function b_(a, c) {
		var d, e, g = f.ajaxSettings.flatOptions || {};
		for (d in c) c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
		e && f.extend(!0, a, e)
	}

	function b$(a, c, d, e, f, g) {
		f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
		var h = a[f],
			i = 0,
			j = h ? h.length : 0,
			k = a === bT,
			l;
		for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = b$(a, c, d, e, l, g)));
		(k || !l) && !g["*"] && (l = b$(a, c, d, e, "*", g));
		return l
	}

	function bZ(a) {
		return function(b, c) {
			typeof b != "string" && (c = b, b = "*");
			if (f.isFunction(c)) {
				var d = b.toLowerCase().split(bP),
					e = 0,
					g = d.length,
					h, i, j;
				for (; e < g; e++) h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
			}
		}
	}

	function bC(a, b, c) {
		var d = b === "width" ? a.offsetWidth : a.offsetHeight,
			e = b === "width" ? bx : by,
			g = 0,
			h = e.length;
		if (d > 0) {
			if (c !== "border")
				for (; g < h; g++) c || (d -= parseFloat(f.css(a, "padding" + e[g])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + e[g])) || 0 : d -= parseFloat(f.css(a, "border" + e[g] + "Width")) || 0;
			return d + "px"
		}
		d = bz(a, b, b);
		if (d < 0 || d == null) d = a.style[b] || 0;
		d = parseFloat(d) || 0;
		if (c)
			for (; g < h; g++) d += parseFloat(f.css(a, "padding" + e[g])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + e[g] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + e[g])) || 0);
		return d + "px"
	}

	function bp(a, b) {
		b.src ? f.ajax({
			url: b.src,
			async: !1,
			dataType: "script"
		}) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
	}

	function bo(a) {
		var b = c.createElement("div");
		bh.appendChild(b), b.innerHTML = a.outerHTML;
		return b.firstChild
	}

	function bn(a) {
		var b = (a.nodeName || "").toLowerCase();
		b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
	}

	function bm(a) {
		if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked
	}

	function bl(a) {
		return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
	}

	function bk(a, b) {
		var c;
		if (b.nodeType === 1) {
			b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase();
			if (c === "object") b.outerHTML = a.outerHTML;
			else if (c !== "input" || a.type !== "checkbox" && a.type !== "radio") {
				if (c === "option") b.selected = a.defaultSelected;
				else if (c === "input" || c === "textarea") b.defaultValue = a.defaultValue
			} else a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value);
			b.removeAttribute(f.expando)
		}
	}

	function bj(a, b) {
		if (b.nodeType === 1 && !!f.hasData(a)) {
			var c, d, e, g = f._data(a),
				h = f._data(b, g),
				i = g.events;
			if (i) {
				delete h.handle, h.events = {};
				for (c in i)
					for (d = 0, e = i[c].length; d < e; d++) f.event.add(b, c + (i[c][d].namespace ? "." : "") + i[c][d].namespace, i[c][d], i[c][d].data)
			}
			h.data && (h.data = f.extend({}, h.data))
		}
	}

	function bi(a, b) {
		return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
	}

	function U(a) {
		var b = V.split("|"),
			c = a.createDocumentFragment();
		if (c.createElement)
			while (b.length) c.createElement(b.pop());
		return c
	}

	function T(a, b, c) {
		b = b || 0;
		if (f.isFunction(b)) return f.grep(a, function(a, d) {
			var e = !!b.call(a, d, a);
			return e === c
		});
		if (b.nodeType) return f.grep(a, function(a, d) {
			return a === b === c
		});
		if (typeof b == "string") {
			var d = f.grep(a, function(a) {
				return a.nodeType === 1
			});
			if (O.test(b)) return f.filter(b, d, !c);
			b = f.filter(b, d)
		}
		return f.grep(a, function(a, d) {
			return f.inArray(a, b) >= 0 === c
		})
	}

	function S(a) {
		return !a || !a.parentNode || a.parentNode.nodeType === 11
	}

	function K() {
		return !0
	}

	function J() {
		return !1
	}

	function n(a, b, c) {
		var d = b + "defer",
			e = b + "queue",
			g = b + "mark",
			h = f._data(a, d);
		h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function() {
			!f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
		}, 0)
	}

	function m(a) {
		for (var b in a) {
			if (b === "data" && f.isEmptyObject(a[b])) continue;
			if (b !== "toJSON") return !1
		}
		return !0
	}

	function l(a, c, d) {
		if (d === b && a.nodeType === 1) {
			var e = "data-" + c.replace(k, "-$1").toLowerCase();
			d = a.getAttribute(e);
			if (typeof d == "string") {
				try {
					d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? parseFloat(d) : j.test(d) ? f.parseJSON(d) : d
				} catch (g) {}
				f.data(a, c, d)
			} else d = b
		}
		return d
	}

	function h(a) {
		var b = g[a] = {},
			c, d;
		a = a.split(/\s+/);
		for (c = 0, d = a.length; c < d; c++) b[a[c]] = !0;
		return b
	}
	var c = a.document,
		d = a.navigator,
		e = a.location,
		f = function() {
			function J() {
				if (!e.isReady) {
					try {
						c.documentElement.doScroll("left")
					} catch (a) {
						setTimeout(J, 1);
						return
					}
					e.ready()
				}
			}
			var e = function(a, b) {
					return new e.fn.init(a, b, h)
				},
				f = a.jQuery,
				g = a.$,
				h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
				j = /\S/,
				k = /^\s+/,
				l = /\s+$/,
				m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
				n = /^[\],:{}\s]*$/,
				o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
				p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
				q = /(?:^|:|,)(?:\s*\[)+/g,
				r = /(webkit)[ \/]([\w.]+)/,
				s = /(opera)(?:.*version)?[ \/]([\w.]+)/,
				t = /(msie) ([\w.]+)/,
				u = /(mozilla)(?:.*? rv:([\w.]+))?/,
				v = /-([a-z]|[0-9])/ig,
				w = /^-ms-/,
				x = function(a, b) {
					return (b + "").toUpperCase()
				},
				y = d.userAgent,
				z, A, B, C = Object.prototype.toString,
				D = Object.prototype.hasOwnProperty,
				E = Array.prototype.push,
				F = Array.prototype.slice,
				G = String.prototype.trim,
				H = Array.prototype.indexOf,
				I = {};
			e.fn = e.prototype = {
				constructor: e,
				init: function(a, d, f) {
					var g, h, j, k;
					if (!a) return this;
					if (a.nodeType) {
						this.context = this[0] = a, this.length = 1;
						return this
					}
					if (a === "body" && !d && c.body) {
						this.context = c, this[0] = c.body, this.selector = a, this.length = 1;
						return this
					}
					if (typeof a == "string") {
						a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
						if (g && (g[1] || !d)) {
							if (g[1]) {
								d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
								return e.merge(this, a)
							}
							h = c.getElementById(g[2]);
							if (h && h.parentNode) {
								if (h.id !== g[2]) return f.find(a);
								this.length = 1, this[0] = h
							}
							this.context = c, this.selector = a;
							return this
						}
						return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
					}
					if (e.isFunction(a)) return f.ready(a);
					a.selector !== b && (this.selector = a.selector, this.context = a.context);
					return e.makeArray(a, this)
				},
				selector: "",
				jquery: "1.7.1",
				length: 0,
				size: function() {
					return this.length
				},
				toArray: function() {
					return F.call(this, 0)
				},
				get: function(a) {
					return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
				},
				pushStack: function(a, b, c) {
					var d = this.constructor();
					e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
					return d
				},
				each: function(a, b) {
					return e.each(this, a, b)
				},
				ready: function(a) {
					e.bindReady(), A.add(a);
					return this
				},
				eq: function(a) {
					a = +a;
					return a === -1 ? this.slice(a) : this.slice(a, a + 1)
				},
				first: function() {
					return this.eq(0)
				},
				last: function() {
					return this.eq(-1)
				},
				slice: function() {
					return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
				},
				map: function(a) {
					return this.pushStack(e.map(this, function(b, c) {
						return a.call(b, c, b)
					}))
				},
				end: function() {
					return this.prevObject || this.constructor(null)
				},
				push: E,
				sort: [].sort,
				splice: [].splice
			}, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function() {
				var a, c, d, f, g, h, i = arguments[0] || {},
					j = 1,
					k = arguments.length,
					l = !1;
				typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
				for (; j < k; j++)
					if ((a = arguments[j]) != null)
						for (c in a) {
							d = i[c], f = a[c];
							if (i === f) continue;
							l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
						}
					return i
			}, e.extend({
				noConflict: function(b) {
					a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f);
					return e
				},
				isReady: !1,
				readyWait: 1,
				holdReady: function(a) {
					a ? e.readyWait++ : e.ready(!0)
				},
				ready: function(a) {
					if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
						if (!c.body) return setTimeout(e.ready, 1);
						e.isReady = !0;
						if (a !== !0 && --e.readyWait > 0) return;
						A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready")
					}
				},
				bindReady: function() {
					if (!A) {
						A = e.Callbacks("once memory");
						if (c.readyState === "complete") return setTimeout(e.ready, 1);
						if (c.addEventListener) c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1);
						else if (c.attachEvent) {
							c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
							var b = !1;
							try {
								b = a.frameElement == null
							} catch (d) {}
							c.documentElement.doScroll && b && J()
						}
					}
				},
				isFunction: function(a) {
					return e.type(a) === "function"
				},
				isArray: Array.isArray || function(a) {
					return e.type(a) === "array"
				},
				isWindow: function(a) {
					return a && typeof a == "object" && "setInterval" in a
				},
				isNumeric: function(a) {
					return !isNaN(parseFloat(a)) && isFinite(a)
				},
				type: function(a) {
					return a == null ? String(a) : I[C.call(a)] || "object"
				},
				isPlainObject: function(a) {
					if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) return !1;
					try {
						if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return !1
					} catch (c) {
						return !1
					}
					var d;
					for (d in a);
					return d === b || D.call(a, d)
				},
				isEmptyObject: function(a) {
					for (var b in a) return !1;
					return !0
				},
				error: function(a) {
					throw new Error(a)
				},
				parseJSON: function(b) {
					if (typeof b != "string" || !b) return null;
					b = e.trim(b);
					if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
					if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return (new Function("return " + b))();
					e.error("Invalid JSON: " + b)
				},
				parseXML: function(c) {
					var d, f;
					try {
						a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
					} catch (g) {
						d = b
					}(!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
					return d
				},
				noop: function() {},
				globalEval: function(b) {
					b && j.test(b) && (a.execScript || function(b) {
						a.eval.call(a, b)
					})(b)
				},
				camelCase: function(a) {
					return a.replace(w, "ms-").replace(v, x)
				},
				nodeName: function(a, b) {
					return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
				},
				each: function(a, c, d) {
					var f, g = 0,
						h = a.length,
						i = h === b || e.isFunction(a);
					if (d) {
						if (i) {
							for (f in a)
								if (c.apply(a[f], d) === !1) break
						} else
							for (; g < h;)
								if (c.apply(a[g++], d) === !1) break
					} else if (i) {
						for (f in a)
							if (c.call(a[f], f, a[f]) === !1) break
					} else
						for (; g < h;)
							if (c.call(a[g], g, a[g++]) === !1) break; return a
				},
				trim: G ? function(a) {
					return a == null ? "" : G.call(a)
				} : function(a) {
					return a == null ? "" : (a + "").replace(k, "").replace(l, "")
				},
				makeArray: function(a, b) {
					var c = b || [];
					if (a != null) {
						var d = e.type(a);
						a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
					}
					return c
				},
				inArray: function(a, b, c) {
					var d;
					if (b) {
						if (H) return H.call(b, a, c);
						d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
						for (; c < d; c++)
							if (c in b && b[c] === a) return c
					}
					return -1
				},
				merge: function(a, c) {
					var d = a.length,
						e = 0;
					if (typeof c.length == "number")
						for (var f = c.length; e < f; e++) a[d++] = c[e];
					else
						while (c[e] !== b) a[d++] = c[e++];
					a.length = d;
					return a
				},
				grep: function(a, b, c) {
					var d = [],
						e;
					c = !!c;
					for (var f = 0, g = a.length; f < g; f++) e = !!b(a[f], f), c !== e && d.push(a[f]);
					return d
				},
				map: function(a, c, d) {
					var f, g, h = [],
						i = 0,
						j = a.length,
						k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
					if (k)
						for (; i < j; i++) f = c(a[i], i, d), f != null && (h[h.length] = f);
					else
						for (g in a) f = c(a[g], g, d), f != null && (h[h.length] = f);
					return h.concat.apply([], h)
				},
				guid: 1,
				proxy: function(a, c) {
					if (typeof c == "string") {
						var d = a[c];
						c = a, a = d
					}
					if (!e.isFunction(a)) return b;
					var f = F.call(arguments, 2),
						g = function() {
							return a.apply(c, f.concat(F.call(arguments)))
						};
					g.guid = a.guid = a.guid || g.guid || e.guid++;
					return g
				},
				access: function(a, c, d, f, g, h) {
					var i = a.length;
					if (typeof c == "object") {
						for (var j in c) e.access(a, j, c[j], f, g, d);
						return a
					}
					if (d !== b) {
						f = !h && f && e.isFunction(d);
						for (var k = 0; k < i; k++) g(a[k], c, f ? d.call(a[k], k, g(a[k], c)) : d, h);
						return a
					}
					return i ? g(a[0], c) : b
				},
				now: function() {
					return (new Date).getTime()
				},
				uaMatch: function(a) {
					a = a.toLowerCase();
					var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
					return {
						browser: b[1] || "",
						version: b[2] || "0"
					}
				},
				sub: function() {
					function a(b, c) {
						return new a.fn.init(b, c)
					}
					e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function(d, f) {
						f && f instanceof e && !(f instanceof a) && (f = a(f));
						return e.fn.init.call(this, d, f, b)
					}, a.fn.init.prototype = a.fn;
					var b = a(c);
					return a
				},
				browser: {}
			}), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
				I["[object " + b + "]"] = b.toLowerCase()
			}), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function() {
				c.removeEventListener("DOMContentLoaded", B, !1), e.ready()
			} : c.attachEvent && (B = function() {
				c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready())
			});
			return e
		}(),
		g = {};
	f.Callbacks = function(a) {
		a = a ? g[a] || h(a) : {};
		var c = [],
			d = [],
			e, i, j, k, l, m = function(b) {
				var d, e, g, h, i;
				for (d = 0, e = b.length; d < e; d++) g = b[d], h = f.type(g), h === "array" ? m(g) : h === "function" && (!a.unique || !o.has(g)) && c.push(g)
			},
			n = function(b, f) {
				f = f || [], e = !a.memory || [b, f], i = !0, l = j || 0, j = 0, k = c.length;
				for (; c && l < k; l++)
					if (c[l].apply(b, f) === !1 && a.stopOnFalse) {
						e = !0;
						break
					}
				i = !1, c && (a.once ? e === !0 ? o.disable() : c = [] : d && d.length && (e = d.shift(), o.fireWith(e[0], e[1])))
			},
			o = {
				add: function() {
					if (c) {
						var a = c.length;
						m(arguments), i ? k = c.length : e && e !== !0 && (j = a, n(e[0], e[1]))
					}
					return this
				},
				remove: function() {
					if (c) {
						var b = arguments,
							d = 0,
							e = b.length;
						for (; d < e; d++)
							for (var f = 0; f < c.length; f++)
								if (b[d] === c[f]) {
									i && f <= k && (k--, f <= l && l--), c.splice(f--, 1);
									if (a.unique) break
								}
					}
					return this
				},
				has: function(a) {
					if (c) {
						var b = 0,
							d = c.length;
						for (; b < d; b++)
							if (a === c[b]) return !0
					}
					return !1
				},
				empty: function() {
					c = [];
					return this
				},
				disable: function() {
					c = d = e = b;
					return this
				},
				disabled: function() {
					return !c
				},
				lock: function() {
					d = b, (!e || e === !0) && o.disable();
					return this
				},
				locked: function() {
					return !d
				},
				fireWith: function(b, c) {
					d && (i ? a.once || d.push([b, c]) : (!a.once || !e) && n(b, c));
					return this
				},
				fire: function() {
					o.fireWith(this, arguments);
					return this
				},
				fired: function() {
					return !!e
				}
			};
		return o
	};
	var i = [].slice;
	f.extend({
		Deferred: function(a) {
			var b = f.Callbacks("once memory"),
				c = f.Callbacks("once memory"),
				d = f.Callbacks("memory"),
				e = "pending",
				g = {
					resolve: b,
					reject: c,
					notify: d
				},
				h = {
					done: b.add,
					fail: c.add,
					progress: d.add,
					state: function() {
						return e
					},
					isResolved: b.fired,
					isRejected: c.fired,
					then: function(a, b, c) {
						i.done(a).fail(b).progress(c);
						return this
					},
					always: function() {
						i.done.apply(i, arguments).fail.apply(i, arguments);
						return this
					},
					pipe: function(a, b, c) {
						return f.Deferred(function(d) {
							f.each({
								done: [a, "resolve"],
								fail: [b, "reject"],
								progress: [c, "notify"]
							}, function(a, b) {
								var c = b[0],
									e = b[1],
									g;
								f.isFunction(c) ? i[a](function() {
									g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
								}) : i[a](d[e])
							})
						}).promise()
					},
					promise: function(a) {
						if (a == null) a = h;
						else
							for (var b in h) a[b] = h[b];
						return a
					}
				},
				i = h.promise({}),
				j;
			for (j in g) i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
			i.done(function() {
				e = "resolved"
			}, c.disable, d.lock).fail(function() {
				e = "rejected"
			}, b.disable, d.lock), a && a.call(i, i);
			return i
		},
		when: function(a) {
			function m(a) {
				return function(b) {
					e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e)
				}
			}

			function l(a) {
				return function(c) {
					b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b)
				}
			}
			var b = i.call(arguments, 0),
				c = 0,
				d = b.length,
				e = Array(d),
				g = d,
				h = d,
				j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(),
				k = j.promise();
			if (d > 1) {
				for (; c < d; c++) b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
				g || j.resolveWith(j, b)
			} else j !== a && j.resolveWith(j, d ? [a] : []);
			return k
		}
	}), f.support = function() {
		var b, d, e, g, h, i, j, k, l, m, n, o, p, q = c.createElement("div"),
			r = c.documentElement;
		q.setAttribute("className", "t"), q.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = q.getElementsByTagName("*"), e = q.getElementsByTagName("a")[0];
		if (!d || !d.length || !e) return {};
		g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = q.getElementsByTagName("input")[0], b = {
			leadingWhitespace: q.firstChild.nodeType === 3,
			tbody: !q.getElementsByTagName("tbody").length,
			htmlSerialize: !!q.getElementsByTagName("link").length,
			style: /top/.test(e.getAttribute("style")),
			hrefNormalized: e.getAttribute("href") === "/a",
			opacity: /^0.55/.test(e.style.opacity),
			cssFloat: !!e.style.cssFloat,
			checkOn: i.value === "on",
			optSelected: h.selected,
			getSetAttribute: q.className !== "t",
			enctype: !!c.createElement("form").enctype,
			html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
			submitBubbles: !0,
			changeBubbles: !0,
			focusinBubbles: !1,
			deleteExpando: !0,
			noCloneEvent: !0,
			inlineBlockNeedsLayout: !1,
			shrinkWrapBlocks: !1,
			reliableMarginRight: !0
		}, i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
		try {
			delete q.test
		} catch (s) {
			b.deleteExpando = !1
		}!q.addEventListener && q.attachEvent && q.fireEvent && (q.attachEvent("onclick", function() {
			b.noCloneEvent = !1
		}), q.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), q.appendChild(i), k = c.createDocumentFragment(), k.appendChild(q.lastChild), b.checkClone = k.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, k.removeChild(i), k.appendChild(q), q.innerHTML = "", a.getComputedStyle && (j = c.createElement("div"), j.style.width = "0", j.style.marginRight = "0", q.style.width = "2px", q.appendChild(j), b.reliableMarginRight = (parseInt((a.getComputedStyle(j, null) || {
			marginRight: 0
		}).marginRight, 10) || 0) === 0);
		if (q.attachEvent)
			for (o in {
				submit: 1,
				change: 1,
				focusin: 1
			}) n = "on" + o, p = n in q, p || (q.setAttribute(n, "return;"), p = typeof q[n] == "function"), b[o + "Bubbles"] = p;
		k.removeChild(q), k = g = h = j = q = i = null, f(function() {
			var a, d, e, g, h, i, j, k, m, n, o, r = c.getElementsByTagName("body")[0];
			!r || (j = 1, k = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;", m = "visibility:hidden;border:0;", n = "style='" + k + "border:5px solid #000;padding:0;'", o = "<div " + n + "><div></div></div>" + "<table " + n + " cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", a = c.createElement("div"), a.style.cssText = m + "width:0;height:0;position:static;top:0;margin-top:" + j + "px", r.insertBefore(a, r.firstChild), q = c.createElement("div"), a.appendChild(q), q.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>", l = q.getElementsByTagName("td"), p = l[0].offsetHeight === 0, l[0].style.display = "", l[1].style.display = "none", b.reliableHiddenOffsets = p && l[0].offsetHeight === 0, q.innerHTML = "", q.style.width = q.style.paddingLeft = "1px", f.boxModel = b.boxModel = q.offsetWidth === 2, typeof q.style.zoom != "undefined" && (q.style.display = "inline", q.style.zoom = 1, b.inlineBlockNeedsLayout = q.offsetWidth === 2, q.style.display = "", q.innerHTML = "<div style='width:4px;'></div>", b.shrinkWrapBlocks = q.offsetWidth !== 2), q.style.cssText = k + m, q.innerHTML = o, d = q.firstChild, e = d.firstChild, h = d.nextSibling.firstChild.firstChild, i = {
				doesNotAddBorder: e.offsetTop !== 5,
				doesAddBorderForTableAndCells: h.offsetTop === 5
			}, e.style.position = "fixed", e.style.top = "20px", i.fixedPosition = e.offsetTop === 20 || e.offsetTop === 15, e.style.position = e.style.top = "", d.style.overflow = "hidden", d.style.position = "relative", i.subtractsBorderForOverflowNotVisible = e.offsetTop === -5, i.doesNotIncludeMarginInBodyOffset = r.offsetTop !== j, r.removeChild(a), q = a = null, f.extend(b, i))
		});
		return b
	}();
	var j = /^(?:\{.*\}|\[.*\])$/,
		k = /([A-Z])/g;
	f.extend({
		cache: {},
		uuid: 0,
		expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
		noData: {
			embed: !0,
			object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
			applet: !0
		},
		hasData: function(a) {
			a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
			return !!a && !m(a)
		},
		data: function(a, c, d, e) {
			if (!!f.acceptData(a)) {
				var g, h, i, j = f.expando,
					k = typeof c == "string",
					l = a.nodeType,
					m = l ? f.cache : a,
					n = l ? a[j] : a[j] && j,
					o = c === "events";
				if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) return;
				n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
				if (typeof c == "object" || typeof c == "function") e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
				g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d);
				if (o && !h[c]) return g.events;
				k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h;
				return i
			}
		},
		removeData: function(a, b, c) {
			if (!!f.acceptData(a)) {
				var d, e, g, h = f.expando,
					i = a.nodeType,
					j = i ? f.cache : a,
					k = i ? a[h] : h;
				if (!j[k]) return;
				if (b) {
					d = c ? j[k] : j[k].data;
					if (d) {
						f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
						for (e = 0, g = b.length; e < g; e++) delete d[b[e]];
						if (!(c ? m : f.isEmptyObject)(d)) return
					}
				}
				if (!c) {
					delete j[k].data;
					if (!m(j[k])) return
				}
				f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
			}
		},
		_data: function(a, b, c) {
			return f.data(a, b, c, !0)
		},
		acceptData: function(a) {
			if (a.nodeName) {
				var b = f.noData[a.nodeName.toLowerCase()];
				if (b) return b !== !0 && a.getAttribute("classid") === b
			}
			return !0
		}
	}), f.fn.extend({
		data: function(a, c) {
			var d, e, g, h = null;
			if (typeof a == "undefined") {
				if (this.length) {
					h = f.data(this[0]);
					if (this[0].nodeType === 1 && !f._data(this[0], "parsedAttrs")) {
						e = this[0].attributes;
						for (var i = 0, j = e.length; i < j; i++) g = e[i].name, g.indexOf("data-") === 0 && (g = f.camelCase(g.substring(5)), l(this[0], g, h[g]));
						f._data(this[0], "parsedAttrs", !0)
					}
				}
				return h
			}
			if (typeof a == "object") return this.each(function() {
				f.data(this, a)
			});
			d = a.split("."), d[1] = d[1] ? "." + d[1] : "";
			if (c === b) {
				h = this.triggerHandler("getData" + d[1] + "!", [d[0]]), h === b && this.length && (h = f.data(this[0], a), h = l(this[0], a, h));
				return h === b && d[1] ? this.data(d[0]) : h
			}
			return this.each(function() {
				var b = f(this),
					e = [d[0], c];
				b.triggerHandler("setData" + d[1] + "!", e), f.data(this, a, c), b.triggerHandler("changeData" + d[1] + "!", e)
			})
		},
		removeData: function(a) {
			return this.each(function() {
				f.removeData(this, a)
			})
		}
	}), f.extend({
		_mark: function(a, b) {
			a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1))
		},
		_unmark: function(a, b, c) {
			a !== !0 && (c = b, b = a, a = !1);
			if (b) {
				c = c || "fx";
				var d = c + "mark",
					e = a ? 0 : (f._data(b, d) || 1) - 1;
				e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
			}
		},
		queue: function(a, b, c) {
			var d;
			if (a) {
				b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
				return d || []
			}
		},
		dequeue: function(a, b) {
			b = b || "fx";
			var c = f.queue(a, b),
				d = c.shift(),
				e = {};
			d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function() {
				f.dequeue(a, b)
			}, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
		}
	}), f.fn.extend({
		queue: function(a, c) {
			typeof a != "string" && (c = a, a = "fx");
			if (c === b) return f.queue(this[0], a);
			return this.each(function() {
				var b = f.queue(this, a, c);
				a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
			})
		},
		dequeue: function(a) {
			return this.each(function() {
				f.dequeue(this, a)
			})
		},
		delay: function(a, b) {
			a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx";
			return this.queue(b, function(b, c) {
				var d = setTimeout(b, a);
				c.stop = function() {
					clearTimeout(d)
				}
			})
		},
		clearQueue: function(a) {
			return this.queue(a || "fx", [])
		},
		promise: function(a, c) {
			function m() {
				--h || d.resolveWith(e, [e])
			}
			typeof a != "string" && (c = a, a = b), a = a || "fx";
			var d = f.Deferred(),
				e = this,
				g = e.length,
				h = 1,
				i = a + "defer",
				j = a + "queue",
				k = a + "mark",
				l;
			while (g--)
				if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) h++, l.add(m);
			m();
			return d.promise()
		}
	});
	var o = /[\n\t\r]/g,
		p = /\s+/,
		q = /\r/g,
		r = /^(?:button|input)$/i,
		s = /^(?:button|input|object|select|textarea)$/i,
		t = /^a(?:rea)?$/i,
		u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
		v = f.support.getSetAttribute,
		w, x, y;
	f.fn.extend({
		attr: function(a, b) {
			return f.access(this, a, b, !0, f.attr)
		},
		removeAttr: function(a) {
			return this.each(function() {
				f.removeAttr(this, a)
			})
		},
		prop: function(a, b) {
			return f.access(this, a, b, !0, f.prop)
		},
		removeProp: function(a) {
			a = f.propFix[a] || a;
			return this.each(function() {
				try {
					this[a] = b, delete this[a]
				} catch (c) {}
			})
		},
		addClass: function(a) {
			var b, c, d, e, g, h, i;
			if (f.isFunction(a)) return this.each(function(b) {
				f(this).addClass(a.call(this, b, this.className))
			});
			if (a && typeof a == "string") {
				b = a.split(p);
				for (c = 0, d = this.length; c < d; c++) {
					e = this[c];
					if (e.nodeType === 1)
						if (!e.className && b.length === 1) e.className = a;
						else {
							g = " " + e.className + " ";
							for (h = 0, i = b.length; h < i; h++) ~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
							e.className = f.trim(g)
						}
				}
			}
			return this
		},
		removeClass: function(a) {
			var c, d, e, g, h, i, j;
			if (f.isFunction(a)) return this.each(function(b) {
				f(this).removeClass(a.call(this, b, this.className))
			});
			if (a && typeof a == "string" || a === b) {
				c = (a || "").split(p);
				for (d = 0, e = this.length; d < e; d++) {
					g = this[d];
					if (g.nodeType === 1 && g.className)
						if (a) {
							h = (" " + g.className + " ").replace(o, " ");
							for (i = 0, j = c.length; i < j; i++) h = h.replace(" " + c[i] + " ", " ");
							g.className = f.trim(h)
						} else g.className = ""
				}
			}
			return this
		},
		toggleClass: function(a, b) {
			var c = typeof a,
				d = typeof b == "boolean";
			if (f.isFunction(a)) return this.each(function(c) {
				f(this).toggleClass(a.call(this, c, this.className, b), b)
			});
			return this.each(function() {
				if (c === "string") {
					var e, g = 0,
						h = f(this),
						i = b,
						j = a.split(p);
					while (e = j[g++]) i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e)
				} else if (c === "undefined" || c === "boolean") this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
			})
		},
		hasClass: function(a) {
			var b = " " + a + " ",
				c = 0,
				d = this.length;
			for (; c < d; c++)
				if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) return !0;
			return !1
		},
		val: function(a) {
			var c, d, e, g = this[0]; {
				if (!!arguments.length) {
					e = f.isFunction(a);
					return this.each(function(d) {
						var g = f(this),
							h;
						if (this.nodeType === 1) {
							e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function(a) {
								return a == null ? "" : a + ""
							})), c = f.valHooks[this.nodeName.toLowerCase()] || f.valHooks[this.type];
							if (!c || !("set" in c) || c.set(this, h, "value") === b) this.value = h
						}
					})
				}
				if (g) {
					c = f.valHooks[g.nodeName.toLowerCase()] || f.valHooks[g.type];
					if (c && "get" in c && (d = c.get(g, "value")) !== b) return d;
					d = g.value;
					return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d
				}
			}
		}
	}), f.extend({
		valHooks: {
			option: {
				get: function(a) {
					var b = a.attributes.value;
					return !b || b.specified ? a.value : a.text
				}
			},
			select: {
				get: function(a) {
					var b, c, d, e, g = a.selectedIndex,
						h = [],
						i = a.options,
						j = a.type === "select-one";
					if (g < 0) return null;
					c = j ? g : 0, d = j ? g + 1 : i.length;
					for (; c < d; c++) {
						e = i[c];
						if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
							b = f(e).val();
							if (j) return b;
							h.push(b)
						}
					}
					if (j && !h.length && i.length) return f(i[g]).val();
					return h
				},
				set: function(a, b) {
					var c = f.makeArray(b);
					f(a).find("option").each(function() {
						this.selected = f.inArray(f(this).val(), c) >= 0
					}), c.length || (a.selectedIndex = -1);
					return c
				}
			}
		},
		attrFn: {
			val: !0,
			css: !0,
			html: !0,
			text: !0,
			data: !0,
			width: !0,
			height: !0,
			offset: !0
		},
		attr: function(a, c, d, e) {
			var g, h, i, j = a.nodeType;
			if (!!a && j !== 3 && j !== 8 && j !== 2) {
				if (e && c in f.attrFn) return f(a)[c](d);
				if (typeof a.getAttribute == "undefined") return f.prop(a, c, d);
				i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
				if (d !== b) {
					if (d === null) {
						f.removeAttr(a, c);
						return
					}
					if (h && "set" in h && i && (g = h.set(a, d, c)) !== b) return g;
					a.setAttribute(c, "" + d);
					return d
				}
				if (h && "get" in h && i && (g = h.get(a, c)) !== null) return g;
				g = a.getAttribute(c);
				return g === null ? b : g
			}
		},
		removeAttr: function(a, b) {
			var c, d, e, g, h = 0;
			if (b && a.nodeType === 1) {
				d = b.toLowerCase().split(p), g = d.length;
				for (; h < g; h++) e = d[h], e && (c = f.propFix[e] || e, f.attr(a, e, ""), a.removeAttribute(v ? e : c), u.test(e) && c in a && (a[c] = !1))
			}
		},
		attrHooks: {
			type: {
				set: function(a, b) {
					if (r.test(a.nodeName) && a.parentNode) f.error("type property can't be changed");
					else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
						var c = a.value;
						a.setAttribute("type", b), c && (a.value = c);
						return b
					}
				}
			},
			value: {
				get: function(a, b) {
					if (w && f.nodeName(a, "button")) return w.get(a, b);
					return b in a ? a.value : null
				},
				set: function(a, b, c) {
					if (w && f.nodeName(a, "button")) return w.set(a, b, c);
					a.value = b
				}
			}
		},
		propFix: {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},
		prop: function(a, c, d) {
			var e, g, h, i = a.nodeType;
			if (!!a && i !== 3 && i !== 8 && i !== 2) {
				h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]);
				return d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c]
			}
		},
		propHooks: {
			tabIndex: {
				get: function(a) {
					var c = a.getAttributeNode("tabindex");
					return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
				}
			}
		}
	}), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
		get: function(a, c) {
			var d, e = f.prop(a, c);
			return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
		},
		set: function(a, b, c) {
			var d;
			b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
			return c
		}
	}, v || (y = {
		name: !0,
		id: !0
	}, w = f.valHooks.button = {
		get: function(a, c) {
			var d;
			d = a.getAttributeNode(c);
			return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
		},
		set: function(a, b, d) {
			var e = a.getAttributeNode(d);
			e || (e = c.createAttribute(d), a.setAttributeNode(e));
			return e.nodeValue = b + ""
		}
	}, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function(a, b) {
		f.attrHooks[b] = f.extend(f.attrHooks[b], {
			set: function(a, c) {
				if (c === "") {
					a.setAttribute(b, "auto");
					return c
				}
			}
		})
	}), f.attrHooks.contenteditable = {
		get: w.get,
		set: function(a, b, c) {
			b === "" && (b = "false"), w.set(a, b, c)
		}
	}), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function(a, c) {
		f.attrHooks[c] = f.extend(f.attrHooks[c], {
			get: function(a) {
				var d = a.getAttribute(c, 2);
				return d === null ? b : d
			}
		})
	}), f.support.style || (f.attrHooks.style = {
		get: function(a) {
			return a.style.cssText.toLowerCase() || b
		},
		set: function(a, b) {
			return a.style.cssText = "" + b
		}
	}), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
		get: function(a) {
			var b = a.parentNode;
			b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
			return null
		}
	})), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function() {
		f.valHooks[this] = {
			get: function(a) {
				return a.getAttribute("value") === null ? "on" : a.value
			}
		}
	}), f.each(["radio", "checkbox"], function() {
		f.valHooks[this] = f.extend(f.valHooks[this], {
			set: function(a, b) {
				if (f.isArray(b)) return a.checked = f.inArray(f(a).val(), b) >= 0
			}
		})
	});
	var z = /^(?:textarea|input|select)$/i,
		A = /^([^\.]*)?(?:\.(.+))?$/,
		B = /\bhover(\.\S+)?\b/,
		C = /^key/,
		D = /^(?:mouse|contextmenu)|click/,
		E = /^(?:focusinfocus|focusoutblur)$/,
		F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
		G = function(a) {
			var b = F.exec(a);
			b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
			return b
		},
		H = function(a, b) {
			var c = a.attributes || {};
			return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
		},
		I = function(a) {
			return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
		};
	f.event = {
			add: function(a, c, d, e, g) {
				var h, i, j, k, l, m, n, o, p, q, r, s;
				if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
					d.handler && (p = d, d = p.handler), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function(a) {
						return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
					}, i.elem = a), c = f.trim(I(c)).split(" ");
					for (k = 0; k < c.length; k++) {
						l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
							type: m,
							origType: l[1],
							data: e,
							handler: d,
							guid: d.guid,
							selector: g,
							quick: G(g),
							namespace: n.join(".")
						}, p), r = j[m];
						if (!r) {
							r = j[m] = [], r.delegateCount = 0;
							if (!s.setup || s.setup.call(a, e, n, i) === !1) a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
						}
						s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0
					}
					a = null
				}
			},
			global: {},
			remove: function(a, b, c, d, e) {
				var g = f.hasData(a) && f._data(a),
					h, i, j, k, l, m, n, o, p, q, r, s;
				if (!!g && !!(o = g.events)) {
					b = f.trim(I(b || "")).split(" ");
					for (h = 0; h < b.length; h++) {
						i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
						if (!j) {
							for (j in o) f.event.remove(a, j + b[h], c, d, !0);
							continue
						}
						p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
						for (n = 0; n < r.length; n++) s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
						r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
					}
					f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
				}
			},
			customEvent: {
				getData: !0,
				setData: !0,
				changeData: !0
			},
			trigger: function(c, d, e, g) {
				if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
					var h = c.type || c,
						i = [],
						j, k, l, m, n, o, p, q, r, s;
					if (E.test(h + f.event.triggered)) return;
					h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
					if ((!e || f.event.customEvent[h]) && !f.event.global[h]) return;
					c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
					if (!e) {
						j = f.cache;
						for (l in j) j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
						return
					}
					c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
					if (p.trigger && p.trigger.apply(e, d) === !1) return;
					r = [
						[e, p.bindType || h]
					];
					if (!g && !p.noBubble && !f.isWindow(e)) {
						s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
						for (; m; m = m.parentNode) r.push([m, s]), n = m;
						n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
					}
					for (l = 0; l < r.length && !c.isPropagationStopped(); l++) m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
					c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n));
					return c.result
				}
			},
			dispatch: function(c) {
				c = f.event.fix(c || a.event);
				var d = (f._data(this, "events") || {})[c.type] || [],
					e = d.delegateCount,
					g = [].slice.call(arguments, 0),
					h = !c.exclusive && !c.namespace,
					i = [],
					j, k, l, m, n, o, p, q, r, s, t;
				g[0] = c, c.delegateTarget = this;
				if (e && !c.target.disabled && (!c.button || c.type !== "click")) {
					m = f(this), m.context = this.ownerDocument || this;
					for (l = c.target; l != this; l = l.parentNode || this) {
						o = {}, q = [], m[0] = l;
						for (j = 0; j < e; j++) r = d[j], s = r.selector, o[s] === b && (o[s] = r.quick ? H(l, r.quick) : m.is(s)), o[s] && q.push(r);
						q.length && i.push({
							elem: l,
							matches: q
						})
					}
				}
				d.length > e && i.push({
					elem: this,
					matches: d.slice(e)
				});
				for (j = 0; j < i.length && !c.isPropagationStopped(); j++) {
					p = i[j], c.currentTarget = p.elem;
					for (k = 0; k < p.matches.length && !c.isImmediatePropagationStopped(); k++) {
						r = p.matches[k];
						if (h || !c.namespace && !r.namespace || c.namespace_re && c.namespace_re.test(r.namespace)) c.data = r.data, c.handleObj = r, n = ((f.event.special[r.origType] || {}).handle || r.handler).apply(p.elem, g), n !== b && (c.result = n, n === !1 && (c.preventDefault(), c.stopPropagation()))
					}
				}
				return c.result
			},
			props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
			fixHooks: {},
			keyHooks: {
				props: "char charCode key keyCode".split(" "),
				filter: function(a, b) {
					a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
					return a
				}
			},
			mouseHooks: {
				props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
				filter: function(a, d) {
					var e, f, g, h = d.button,
						i = d.fromElement;
					a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
					return a
				}
			},
			fix: function(a) {
				if (a[f.expando]) return a;
				var d, e, g = a,
					h = f.event.fixHooks[a.type] || {},
					i = h.props ? this.props.concat(h.props) : this.props;
				a = f.Event(g);
				for (d = i.length; d;) e = i[--d], a[e] = g[e];
				a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey);
				return h.filter ? h.filter(a, g) : a
			},
			special: {
				ready: {
					setup: f.bindReady
				},
				load: {
					noBubble: !0
				},
				focus: {
					delegateType: "focusin"
				},
				blur: {
					delegateType: "focusout"
				},
				beforeunload: {
					setup: function(a, b, c) {
						f.isWindow(this) && (this.onbeforeunload = c)
					},
					teardown: function(a, b) {
						this.onbeforeunload === b && (this.onbeforeunload = null)
					}
				}
			},
			simulate: function(a, b, c, d) {
				var e = f.extend(new f.Event, c, {
					type: a,
					isSimulated: !0,
					originalEvent: {}
				});
				d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
			}
		}, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function(a, b, c) {
			a.removeEventListener && a.removeEventListener(b, c, !1)
		} : function(a, b, c) {
			a.detachEvent && a.detachEvent("on" + b, c)
		}, f.Event = function(a, b) {
			if (!(this instanceof f.Event)) return new f.Event(a, b);
			a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0
		}, f.Event.prototype = {
			preventDefault: function() {
				this.isDefaultPrevented = K;
				var a = this.originalEvent;
				!a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
			},
			stopPropagation: function() {
				this.isPropagationStopped = K;
				var a = this.originalEvent;
				!a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
			},
			stopImmediatePropagation: function() {
				this.isImmediatePropagationStopped = K, this.stopPropagation()
			},
			isDefaultPrevented: J,
			isPropagationStopped: J,
			isImmediatePropagationStopped: J
		}, f.each({
			mouseenter: "mouseover",
			mouseleave: "mouseout"
		}, function(a, b) {
			f.event.special[a] = {
				delegateType: b,
				bindType: b,
				handle: function(a) {
					var c = this,
						d = a.relatedTarget,
						e = a.handleObj,
						g = e.selector,
						h;
					if (!d || d !== c && !f.contains(c, d)) a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b;
					return h
				}
			}
		}), f.support.submitBubbles || (f.event.special.submit = {
			setup: function() {
				if (f.nodeName(this, "form")) return !1;
				f.event.add(this, "click._submit keypress._submit", function(a) {
					var c = a.target,
						d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
					d && !d._submit_attached && (f.event.add(d, "submit._submit", function(a) {
						this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0)
					}), d._submit_attached = !0)
				})
			},
			teardown: function() {
				if (f.nodeName(this, "form")) return !1;
				f.event.remove(this, "._submit")
			}
		}), f.support.changeBubbles || (f.event.special.change = {
			setup: function() {
				if (z.test(this.nodeName)) {
					if (this.type === "checkbox" || this.type === "radio") f.event.add(this, "propertychange._change", function(a) {
						a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
					}), f.event.add(this, "click._change", function(a) {
						this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
					});
					return !1
				}
				f.event.add(this, "beforeactivate._change", function(a) {
					var b = a.target;
					z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function(a) {
						this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
					}), b._change_attached = !0)
				})
			},
			handle: function(a) {
				var b = a.target;
				if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments)
			},
			teardown: function() {
				f.event.remove(this, "._change");
				return z.test(this.nodeName)
			}
		}), f.support.focusinBubbles || f.each({
			focus: "focusin",
			blur: "focusout"
		}, function(a, b) {
			var d = 0,
				e = function(a) {
					f.event.simulate(b, a.target, f.event.fix(a), !0)
				};
			f.event.special[b] = {
				setup: function() {
					d++ === 0 && c.addEventListener(a, e, !0)
				},
				teardown: function() {
					--d === 0 && c.removeEventListener(a, e, !0)
				}
			}
		}), f.fn.extend({
			on: function(a, c, d, e, g) {
				var h, i;
				if (typeof a == "object") {
					typeof c != "string" && (d = c, c = b);
					for (i in a) this.on(i, c, d, a[i], g);
					return this
				}
				d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
				if (e === !1) e = J;
				else if (!e) return this;
				g === 1 && (h = e, e = function(a) {
					f().off(a);
					return h.apply(this, arguments)
				}, e.guid = h.guid || (h.guid = f.guid++));
				return this.each(function() {
					f.event.add(this, a, e, d, c)
				})
			},
			one: function(a, b, c, d) {
				return this.on.call(this, a, b, c, d, 1)
			},
			off: function(a, c, d) {
				if (a && a.preventDefault && a.handleObj) {
					var e = a.handleObj;
					f(a.delegateTarget).off(e.namespace ? e.type + "." + e.namespace : e.type, e.selector, e.handler);
					return this
				}
				if (typeof a == "object") {
					for (var g in a) this.off(g, c, a[g]);
					return this
				}
				if (c === !1 || typeof c == "function") d = c, c = b;
				d === !1 && (d = J);
				return this.each(function() {
					f.event.remove(this, a, d, c)
				})
			},
			bind: function(a, b, c) {
				return this.on(a, null, b, c)
			},
			unbind: function(a, b) {
				return this.off(a, null, b)
			},
			live: function(a, b, c) {
				f(this.context).on(a, this.selector, b, c);
				return this
			},
			die: function(a, b) {
				f(this.context).off(a, this.selector || "**", b);
				return this
			},
			delegate: function(a, b, c, d) {
				return this.on(b, a, c, d)
			},
			undelegate: function(a, b, c) {
				return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
			},
			trigger: function(a, b) {
				return this.each(function() {
					f.event.trigger(a, b, this)
				})
			},
			triggerHandler: function(a, b) {
				if (this[0]) return f.event.trigger(a, b, this[0], !0)
			},
			toggle: function(a) {
				var b = arguments,
					c = a.guid || f.guid++,
					d = 0,
					e = function(c) {
						var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
						f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault();
						return b[e].apply(this, arguments) || !1
					};
				e.guid = c;
				while (d < b.length) b[d++].guid = c;
				return this.click(e)
			},
			hover: function(a, b) {
				return this.mouseenter(a).mouseleave(b || a)
			}
		}), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
			f.fn[b] = function(a, c) {
				c == null && (c = a, a = null);
				return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
			}, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
		}),
		function() {
			function x(a, b, c, e, f, g) {
				for (var h = 0, i = e.length; h < i; h++) {
					var j = e[h];
					if (j) {
						var k = !1;
						j = j[a];
						while (j) {
							if (j[d] === c) {
								k = e[j.sizset];
								break
							}
							if (j.nodeType === 1) {
								g || (j[d] = c, j.sizset = h);
								if (typeof b != "string") {
									if (j === b) {
										k = !0;
										break
									}
								} else if (m.filter(b, [j]).length > 0) {
									k = j;
									break
								}
							}
							j = j[a]
						}
						e[h] = k
					}
				}
			}

			function w(a, b, c, e, f, g) {
				for (var h = 0, i = e.length; h < i; h++) {
					var j = e[h];
					if (j) {
						var k = !1;
						j = j[a];
						while (j) {
							if (j[d] === c) {
								k = e[j.sizset];
								break
							}
							j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
							if (j.nodeName.toLowerCase() === b) {
								k = j;
								break
							}
							j = j[a]
						}
						e[h] = k
					}
				}
			}
			var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
				d = "sizcache" + (Math.random() + "").replace(".", ""),
				e = 0,
				g = Object.prototype.toString,
				h = !1,
				i = !0,
				j = /\\/g,
				k = /\r\n/g,
				l = /\W/;
			[0, 0].sort(function() {
				i = !1;
				return 0
			});
			var m = function(b, d, e, f) {
				e = e || [], d = d || c;
				var h = d;
				if (d.nodeType !== 1 && d.nodeType !== 9) return [];
				if (!b || typeof b != "string") return e;
				var i, j, k, l, n, q, r, t, u = !0,
					v = m.isXML(d),
					w = [],
					x = b;
				do {
					a.exec(""), i = a.exec(x);
					if (i) {
						x = i[3], w.push(i[1]);
						if (i[2]) {
							l = i[3];
							break
						}
					}
				} while (i);
				if (w.length > 1 && p.exec(b))
					if (w.length === 2 && o.relative[w[0]]) j = y(w[0] + w[1], d, f);
					else {
						j = o.relative[w[0]] ? [d] : m(w.shift(), d);
						while (w.length) b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f)
					} else {
					!f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
					if (d) {
						n = f ? {
							expr: w.pop(),
							set: s(f)
						} : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
						while (w.length) q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v)
					} else k = w = []
				}
				k || (k = j), k || m.error(q || b);
				if (g.call(k) === "[object Array]")
					if (!u) e.push.apply(e, k);
					else if (d && d.nodeType === 1)
					for (t = 0; k[t] != null; t++) k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]);
				else
					for (t = 0; k[t] != null; t++) k[t] && k[t].nodeType === 1 && e.push(j[t]);
				else s(k, e);
				l && (m(l, h, e, f), m.uniqueSort(e));
				return e
			};
			m.uniqueSort = function(a) {
				if (u) {
					h = i, a.sort(u);
					if (h)
						for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
				}
				return a
			}, m.matches = function(a, b) {
				return m(a, null, null, b)
			}, m.matchesSelector = function(a, b) {
				return m(b, null, null, [a]).length > 0
			}, m.find = function(a, b, c) {
				var d, e, f, g, h, i;
				if (!a) return [];
				for (e = 0, f = o.order.length; e < f; e++) {
					h = o.order[e];
					if (g = o.leftMatch[h].exec(a)) {
						i = g[1], g.splice(1, 1);
						if (i.substr(i.length - 1) !== "\\") {
							g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
							if (d != null) {
								a = a.replace(o.match[h], "");
								break
							}
						}
					}
				}
				d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
				return {
					set: d,
					expr: a
				}
			}, m.filter = function(a, c, d, e) {
				var f, g, h, i, j, k, l, n, p, q = a,
					r = [],
					s = c,
					t = c && c[0] && m.isXML(c[0]);
				while (a && c.length) {
					for (h in o.filter)
						if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
							k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
							if (l.substr(l.length - 1) === "\\") continue;
							s === r && (r = []);
							if (o.preFilter[h]) {
								f = o.preFilter[h](f, s, d, r, e, t);
								if (!f) g = i = !0;
								else if (f === !0) continue
							}
							if (f)
								for (n = 0;
									(j = s[n]) != null; n++) j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
							if (i !== b) {
								d || (s = r), a = a.replace(o.match[h], "");
								if (!g) return [];
								break
							}
						}
					if (a === q)
						if (g == null) m.error(a);
						else break;
					q = a
				}
				return s
			}, m.error = function(a) {
				throw new Error("Syntax error, unrecognized expression: " + a)
			};
			var n = m.getText = function(a) {
					var b, c, d = a.nodeType,
						e = "";
					if (d) {
						if (d === 1 || d === 9) {
							if (typeof a.textContent == "string") return a.textContent;
							if (typeof a.innerText == "string") return a.innerText.replace(k, "");
							for (a = a.firstChild; a; a = a.nextSibling) e += n(a)
						} else if (d === 3 || d === 4) return a.nodeValue
					} else
						for (b = 0; c = a[b]; b++) c.nodeType !== 8 && (e += n(c));
					return e
				},
				o = m.selectors = {
					order: ["ID", "NAME", "TAG"],
					match: {
						ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
						CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
						NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
						ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
						TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
						CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
						POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
						PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
					},
					leftMatch: {},
					attrMap: {
						"class": "className",
						"for": "htmlFor"
					},
					attrHandle: {
						href: function(a) {
							return a.getAttribute("href")
						},
						type: function(a) {
							return a.getAttribute("type")
						}
					},
					relative: {
						"+": function(a, b) {
							var c = typeof b == "string",
								d = c && !l.test(b),
								e = c && !d;
							d && (b = b.toLowerCase());
							for (var f = 0, g = a.length, h; f < g; f++)
								if (h = a[f]) {
									while ((h = h.previousSibling) && h.nodeType !== 1);
									a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
								}
							e && m.filter(b, a, !0)
						},
						">": function(a, b) {
							var c, d = typeof b == "string",
								e = 0,
								f = a.length;
							if (d && !l.test(b)) {
								b = b.toLowerCase();
								for (; e < f; e++) {
									c = a[e];
									if (c) {
										var g = c.parentNode;
										a[e] = g.nodeName.toLowerCase() === b ? g : !1
									}
								}
							} else {
								for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
								d && m.filter(b, a, !0)
							}
						},
						"": function(a, b, c) {
							var d, f = e++,
								g = x;
							typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c)
						},
						"~": function(a, b, c) {
							var d, f = e++,
								g = x;
							typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c)
						}
					},
					find: {
						ID: function(a, b, c) {
							if (typeof b.getElementById != "undefined" && !c) {
								var d = b.getElementById(a[1]);
								return d && d.parentNode ? [d] : []
							}
						},
						NAME: function(a, b) {
							if (typeof b.getElementsByName != "undefined") {
								var c = [],
									d = b.getElementsByName(a[1]);
								for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
								return c.length === 0 ? null : c
							}
						},
						TAG: function(a, b) {
							if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1])
						}
					},
					preFilter: {
						CLASS: function(a, b, c, d, e, f) {
							a = " " + a[1].replace(j, "") + " ";
							if (f) return a;
							for (var g = 0, h;
								(h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
							return !1
						},
						ID: function(a) {
							return a[1].replace(j, "")
						},
						TAG: function(a, b) {
							return a[1].replace(j, "").toLowerCase()
						},
						CHILD: function(a) {
							if (a[1] === "nth") {
								a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
								var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
								a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
							} else a[2] && m.error(a[0]);
							a[0] = e++;
							return a
						},
						ATTR: function(a, b, c, d, e, f) {
							var g = a[1] = a[1].replace(j, "");
							!f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " ");
							return a
						},
						PSEUDO: function(b, c, d, e, f) {
							if (b[1] === "not")
								if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) b[3] = m(b[3], null, null, c);
								else {
									var g = m.filter(b[3], c, d, !0 ^ f);
									d || e.push.apply(e, g);
									return !1
								} else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) return !0;
							return b
						},
						POS: function(a) {
							a.unshift(!0);
							return a
						}
					},
					filters: {
						enabled: function(a) {
							return a.disabled === !1 && a.type !== "hidden"
						},
						disabled: function(a) {
							return a.disabled === !0
						},
						checked: function(a) {
							return a.checked === !0
						},
						selected: function(a) {
							a.parentNode && a.parentNode.selectedIndex;
							return a.selected === !0
						},
						parent: function(a) {
							return !!a.firstChild
						},
						empty: function(a) {
							return !a.firstChild
						},
						has: function(a, b, c) {
							return !!m(c[3], a).length
						},
						header: function(a) {
							return /h\d/i.test(a.nodeName)
						},
						text: function(a) {
							var b = a.getAttribute("type"),
								c = a.type;
							return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
						},
						radio: function(a) {
							return a.nodeName.toLowerCase() === "input" && "radio" === a.type
						},
						checkbox: function(a) {
							return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
						},
						file: function(a) {
							return a.nodeName.toLowerCase() === "input" && "file" === a.type
						},
						password: function(a) {
							return a.nodeName.toLowerCase() === "input" && "password" === a.type
						},
						submit: function(a) {
							var b = a.nodeName.toLowerCase();
							return (b === "input" || b === "button") && "submit" === a.type
						},
						image: function(a) {
							return a.nodeName.toLowerCase() === "input" && "image" === a.type
						},
						reset: function(a) {
							var b = a.nodeName.toLowerCase();
							return (b === "input" || b === "button") && "reset" === a.type
						},
						button: function(a) {
							var b = a.nodeName.toLowerCase();
							return b === "input" && "button" === a.type || b === "button"
						},
						input: function(a) {
							return /input|select|textarea|button/i.test(a.nodeName)
						},
						focus: function(a) {
							return a === a.ownerDocument.activeElement
						}
					},
					setFilters: {
						first: function(a, b) {
							return b === 0
						},
						last: function(a, b, c, d) {
							return b === d.length - 1
						},
						even: function(a, b) {
							return b % 2 === 0
						},
						odd: function(a, b) {
							return b % 2 === 1
						},
						lt: function(a, b, c) {
							return b < c[3] - 0
						},
						gt: function(a, b, c) {
							return b > c[3] - 0
						},
						nth: function(a, b, c) {
							return c[3] - 0 === b
						},
						eq: function(a, b, c) {
							return c[3] - 0 === b
						}
					},
					filter: {
						PSEUDO: function(a, b, c, d) {
							var e = b[1],
								f = o.filters[e];
							if (f) return f(a, c, b, d);
							if (e === "contains") return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
							if (e === "not") {
								var g = b[3];
								for (var h = 0, i = g.length; h < i; h++)
									if (g[h] === a) return !1;
								return !0
							}
							m.error(e)
						},
						CHILD: function(a, b) {
							var c, e, f, g, h, i, j, k = b[1],
								l = a;
							switch (k) {
								case "only":
								case "first":
									while (l = l.previousSibling)
										if (l.nodeType === 1) return !1;
									if (k === "first") return !0;
									l = a;
								case "last":
									while (l = l.nextSibling)
										if (l.nodeType === 1) return !1;
									return !0;
								case "nth":
									c = b[2], e = b[3];
									if (c === 1 && e === 0) return !0;
									f = b[0], g = a.parentNode;
									if (g && (g[d] !== f || !a.nodeIndex)) {
										i = 0;
										for (l = g.firstChild; l; l = l.nextSibling) l.nodeType === 1 && (l.nodeIndex = ++i);
										g[d] = f
									}
									j = a.nodeIndex - e;
									return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
							}
						},
						ID: function(a, b) {
							return a.nodeType === 1 && a.getAttribute("id") === b
						},
						TAG: function(a, b) {
							return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b
						},
						CLASS: function(a, b) {
							return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
						},
						ATTR: function(a, b) {
							var c = b[1],
								d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
								e = d + "",
								f = b[2],
								g = b[4];
							return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
						},
						POS: function(a, b, c, d) {
							var e = b[2],
								f = o.setFilters[e];
							if (f) return f(a, c, b, d)
						}
					}
				},
				p = o.match.POS,
				q = function(a, b) {
					return "\\" + (b - 0 + 1)
				};
			for (var r in o.match) o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
			var s = function(a, b) {
				a = Array.prototype.slice.call(a, 0);
				if (b) {
					b.push.apply(b, a);
					return b
				}
				return a
			};
			try {
				Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
			} catch (t) {
				s = function(a, b) {
					var c = 0,
						d = b || [];
					if (g.call(a) === "[object Array]") Array.prototype.push.apply(d, a);
					else if (typeof a.length == "number")
						for (var e = a.length; c < e; c++) d.push(a[c]);
					else
						for (; a[c]; c++) d.push(a[c]);
					return d
				}
			}
			var u, v;
			c.documentElement.compareDocumentPosition ? u = function(a, b) {
					if (a === b) {
						h = !0;
						return 0
					}
					if (!a.compareDocumentPosition || !b.compareDocumentPosition) return a.compareDocumentPosition ? -1 : 1;
					return a.compareDocumentPosition(b) & 4 ? -1 : 1
				} : (u = function(a, b) {
					if (a === b) {
						h = !0;
						return 0
					}
					if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
					var c, d, e = [],
						f = [],
						g = a.parentNode,
						i = b.parentNode,
						j = g;
					if (g === i) return v(a, b);
					if (!g) return -1;
					if (!i) return 1;
					while (j) e.unshift(j), j = j.parentNode;
					j = i;
					while (j) f.unshift(j), j = j.parentNode;
					c = e.length, d = f.length;
					for (var k = 0; k < c && k < d; k++)
						if (e[k] !== f[k]) return v(e[k], f[k]);
					return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
				}, v = function(a, b, c) {
					if (a === b) return c;
					var d = a.nextSibling;
					while (d) {
						if (d === b) return -1;
						d = d.nextSibling
					}
					return 1
				}),
				function() {
					var a = c.createElement("div"),
						d = "script" + (new Date).getTime(),
						e = c.documentElement;
					a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function(a, c, d) {
						if (typeof c.getElementById != "undefined" && !d) {
							var e = c.getElementById(a[1]);
							return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
						}
					}, o.filter.ID = function(a, b) {
						var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
						return a.nodeType === 1 && c && c.nodeValue === b
					}), e.removeChild(a), e = a = null
				}(),
				function() {
					var a = c.createElement("div");
					a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function(a, b) {
						var c = b.getElementsByTagName(a[1]);
						if (a[1] === "*") {
							var d = [];
							for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
							c = d
						}
						return c
					}), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function(a) {
						return a.getAttribute("href", 2)
					}), a = null
				}(), c.querySelectorAll && function() {
					var a = m,
						b = c.createElement("div"),
						d = "__sizzle__";
					b.innerHTML = "<p class='TEST'></p>";
					if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
						m = function(b, e, f, g) {
							e = e || c;
							if (!g && !m.isXML(e)) {
								var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
								if (h && (e.nodeType === 1 || e.nodeType === 9)) {
									if (h[1]) return s(e.getElementsByTagName(b), f);
									if (h[2] && o.find.CLASS && e.getElementsByClassName) return s(e.getElementsByClassName(h[2]), f)
								}
								if (e.nodeType === 9) {
									if (b === "body" && e.body) return s([e.body], f);
									if (h && h[3]) {
										var i = e.getElementById(h[3]);
										if (!i || !i.parentNode) return s([], f);
										if (i.id === h[3]) return s([i], f)
									}
									try {
										return s(e.querySelectorAll(b), f)
									} catch (j) {}
								} else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
									var k = e,
										l = e.getAttribute("id"),
										n = l || d,
										p = e.parentNode,
										q = /^\s*[+~]/.test(b);
									l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
									try {
										if (!q || p) return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
									} catch (r) {} finally {
										l || k.removeAttribute("id")
									}
								}
							}
							return a(b, e, f, g)
						};
						for (var e in a) m[e] = a[e];
						b = null
					}
				}(),
				function() {
					var a = c.documentElement,
						b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
					if (b) {
						var d = !b.call(c.createElement("div"), "div"),
							e = !1;
						try {
							b.call(c.documentElement, "[test!='']:sizzle")
						} catch (f) {
							e = !0
						}
						m.matchesSelector = function(a, c) {
							c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
							if (!m.isXML(a)) try {
								if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
									var f = b.call(a, c);
									if (f || !d || a.document && a.document.nodeType !== 11) return f
								}
							} catch (g) {}
							return m(c, null, null, [a]).length > 0
						}
					}
				}(),
				function() {
					var a = c.createElement("div");
					a.innerHTML = "<div class='test e'></div><div class='test'></div>";
					if (!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
						a.lastChild.className = "e";
						if (a.getElementsByClassName("e").length === 1) return;
						o.order.splice(1, 0, "CLASS"), o.find.CLASS = function(a, b, c) {
							if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1])
						}, a = null
					}
				}(), c.documentElement.contains ? m.contains = function(a, b) {
					return a !== b && (a.contains ? a.contains(b) : !0)
				} : c.documentElement.compareDocumentPosition ? m.contains = function(a, b) {
					return !!(a.compareDocumentPosition(b) & 16)
				} : m.contains = function() {
					return !1
				}, m.isXML = function(a) {
					var b = (a ? a.ownerDocument || a : 0).documentElement;
					return b ? b.nodeName !== "HTML" : !1
				};
			var y = function(a, b, c) {
				var d, e = [],
					f = "",
					g = b.nodeType ? [b] : b;
				while (d = o.match.PSEUDO.exec(a)) f += d[0], a = a.replace(o.match.PSEUDO, "");
				a = o.relative[a] ? a + "*" : a;
				for (var h = 0, i = g.length; h < i; h++) m(a, g[h], e, c);
				return m.filter(f, e)
			};
			m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains
		}();
	var L = /Until$/,
		M = /^(?:parents|prevUntil|prevAll)/,
		N = /,/,
		O = /^.[^:#\[\.,]*$/,
		P = Array.prototype.slice,
		Q = f.expr.match.POS,
		R = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	f.fn.extend({
		find: function(a) {
			var b = this,
				c, d;
			if (typeof a != "string") return f(a).filter(function() {
				for (c = 0, d = b.length; c < d; c++)
					if (f.contains(b[c], this)) return !0
			});
			var e = this.pushStack("", "find", a),
				g, h, i;
			for (c = 0, d = this.length; c < d; c++) {
				g = e.length, f.find(a, this[c], e);
				if (c > 0)
					for (h = g; h < e.length; h++)
						for (i = 0; i < g; i++)
							if (e[i] === e[h]) {
								e.splice(h--, 1);
								break
							}
			}
			return e
		},
		has: function(a) {
			var b = f(a);
			return this.filter(function() {
				for (var a = 0, c = b.length; a < c; a++)
					if (f.contains(this, b[a])) return !0
			})
		},
		not: function(a) {
			return this.pushStack(T(this, a, !1), "not", a)
		},
		filter: function(a) {
			return this.pushStack(T(this, a, !0), "filter", a)
		},
		is: function(a) {
			return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
		},
		closest: function(a, b) {
			var c = [],
				d, e, g = this[0];
			if (f.isArray(a)) {
				var h = 1;
				while (g && g.ownerDocument && g !== b) {
					for (d = 0; d < a.length; d++) f(g).is(a[d]) && c.push({
						selector: a[d],
						elem: g,
						level: h
					});
					g = g.parentNode, h++
				}
				return c
			}
			var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
			for (d = 0, e = this.length; d < e; d++) {
				g = this[d];
				while (g) {
					if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
						c.push(g);
						break
					}
					g = g.parentNode;
					if (!g || !g.ownerDocument || g === b || g.nodeType === 11) break
				}
			}
			c = c.length > 1 ? f.unique(c) : c;
			return this.pushStack(c, "closest", a)
		},
		index: function(a) {
			if (!a) return this[0] && this[0].parentNode ? this.prevAll().length : -1;
			if (typeof a == "string") return f.inArray(this[0], f(a));
			return f.inArray(a.jquery ? a[0] : a, this)
		},
		add: function(a, b) {
			var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a),
				d = f.merge(this.get(), c);
			return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
		},
		andSelf: function() {
			return this.add(this.prevObject)
		}
	}), f.each({
		parent: function(a) {
			var b = a.parentNode;
			return b && b.nodeType !== 11 ? b : null
		},
		parents: function(a) {
			return f.dir(a, "parentNode")
		},
		parentsUntil: function(a, b, c) {
			return f.dir(a, "parentNode", c)
		},
		next: function(a) {
			return f.nth(a, 2, "nextSibling")
		},
		prev: function(a) {
			return f.nth(a, 2, "previousSibling")
		},
		nextAll: function(a) {
			return f.dir(a, "nextSibling")
		},
		prevAll: function(a) {
			return f.dir(a, "previousSibling")
		},
		nextUntil: function(a, b, c) {
			return f.dir(a, "nextSibling", c)
		},
		prevUntil: function(a, b, c) {
			return f.dir(a, "previousSibling", c)
		},
		siblings: function(a) {
			return f.sibling(a.parentNode.firstChild, a)
		},
		children: function(a) {
			return f.sibling(a.firstChild)
		},
		contents: function(a) {
			return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
		}
	}, function(a, b) {
		f.fn[a] = function(c, d) {
			var e = f.map(this, b, c);
			L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
			return this.pushStack(e, a, P.call(arguments).join(","))
		}
	}), f.extend({
		filter: function(a, b, c) {
			c && (a = ":not(" + a + ")");
			return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
		},
		dir: function(a, c, d) {
			var e = [],
				g = a[c];
			while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) g.nodeType === 1 && e.push(g), g = g[c];
			return e
		},
		nth: function(a, b, c, d) {
			b = b || 1;
			var e = 0;
			for (; a; a = a[c])
				if (a.nodeType === 1 && ++e === b) break;
			return a
		},
		sibling: function(a, b) {
			var c = [];
			for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
			return c
		}
	});
	var V = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		W = / jQuery\d+="(?:\d+|null)"/g,
		X = /^\s+/,
		Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
		Z = /<([\w:]+)/,
		$ = /<tbody/i,
		_ = /<|&#?\w+;/,
		ba = /<(?:script|style)/i,
		bb = /<(?:script|object|embed|option|style)/i,
		bc = new RegExp("<(?:" + V + ")", "i"),
		bd = /checked\s*(?:[^=]|=\s*.checked.)/i,
		be = /\/(java|ecma)script/i,
		bf = /^\s*<!(?:\[CDATA\[|\-\-)/,
		bg = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			area: [1, "<map>", "</map>"],
			_default: [0, "", ""]
		},
		bh = U(c);
	bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]), f.fn.extend({
		text: function(a) {
			if (f.isFunction(a)) return this.each(function(b) {
				var c = f(this);
				c.text(a.call(this, b, c.text()))
			});
			if (typeof a != "object" && a !== b) return this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a));
			return f.text(this)
		},
		wrapAll: function(a) {
			if (f.isFunction(a)) return this.each(function(b) {
				f(this).wrapAll(a.call(this, b))
			});
			if (this[0]) {
				var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
					var a = this;
					while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
					return a
				}).append(this)
			}
			return this
		},
		wrapInner: function(a) {
			if (f.isFunction(a)) return this.each(function(b) {
				f(this).wrapInner(a.call(this, b))
			});
			return this.each(function() {
				var b = f(this),
					c = b.contents();
				c.length ? c.wrapAll(a) : b.append(a)
			})
		},
		wrap: function(a) {
			var b = f.isFunction(a);
			return this.each(function(c) {
				f(this).wrapAll(b ? a.call(this, c) : a)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
			}).end()
		},
		append: function() {
			return this.domManip(arguments, !0, function(a) {
				this.nodeType === 1 && this.appendChild(a)
			})
		},
		prepend: function() {
			return this.domManip(arguments, !0, function(a) {
				this.nodeType === 1 && this.insertBefore(a, this.firstChild)
			})
		},
		before: function() {
			if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
				this.parentNode.insertBefore(a, this)
			});
			if (arguments.length) {
				var a = f.clean(arguments);
				a.push.apply(a, this.toArray());
				return this.pushStack(a, "before", arguments)
			}
		},
		after: function() {
			if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
				this.parentNode.insertBefore(a, this.nextSibling)
			});
			if (arguments.length) {
				var a = this.pushStack(this, "after", arguments);
				a.push.apply(a, f.clean(arguments));
				return a
			}
		},
		remove: function(a, b) {
			for (var c = 0, d;
				(d = this[c]) != null; c++)
				if (!a || f.filter(a, [d]).length) !b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
			return this
		},
		empty: function() {
			for (var a = 0, b;
				(b = this[a]) != null; a++) {
				b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
				while (b.firstChild) b.removeChild(b.firstChild)
			}
			return this
		},
		clone: function(a, b) {
			a = a == null ? !1 : a, b = b == null ? a : b;
			return this.map(function() {
				return f.clone(this, a, b)
			})
		},
		html: function(a) {
			if (a === b) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(W, "") : null;
			if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
				a = a.replace(Y, "<$1></$2>");
				try {
					for (var c = 0, d = this.length; c < d; c++) this[c].nodeType === 1 && (f.cleanData(this[c].getElementsByTagName("*")), this[c].innerHTML = a)
				} catch (e) {
					this.empty().append(a)
				}
			} else f.isFunction(a) ? this.each(function(b) {
				var c = f(this);
				c.html(a.call(this, b, c.html()))
			}) : this.empty().append(a);
			return this
		},
		replaceWith: function(a) {
			if (this[0] && this[0].parentNode) {
				if (f.isFunction(a)) return this.each(function(b) {
					var c = f(this),
						d = c.html();
					c.replaceWith(a.call(this, b, d))
				});
				typeof a != "string" && (a = f(a).detach());
				return this.each(function() {
					var b = this.nextSibling,
						c = this.parentNode;
					f(this).remove(), b ? f(b).before(a) : f(c).append(a)
				})
			}
			return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
		},
		detach: function(a) {
			return this.remove(a, !0)
		},
		domManip: function(a, c, d) {
			var e, g, h, i, j = a[0],
				k = [];
			if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j)) return this.each(function() {
				f(this).domManip(a, c, d, !0)
			});
			if (f.isFunction(j)) return this.each(function(e) {
				var g = f(this);
				a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
			});
			if (this[0]) {
				i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {
					fragment: i
				} : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
				if (g) {
					c = c && f.nodeName(g, "tr");
					for (var l = 0, m = this.length, n = m - 1; l < m; l++) d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
				}
				k.length && f.each(k, bp)
			}
			return this
		}
	}), f.buildFragment = function(a, b, d) {
		var e, g, h, i, j = a[0];
		b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1);
		return {
			fragment: e,
			cacheable: g
		}
	}, f.fragments = {}, f.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(a, b) {
		f.fn[a] = function(c) {
			var d = [],
				e = f(c),
				g = this.length === 1 && this[0].parentNode;
			if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
				e[b](this[0]);
				return this
			}
			for (var h = 0, i = e.length; h < i; h++) {
				var j = (h > 0 ? this.clone(!0) : this).get();
				f(e[h])[b](j), d = d.concat(j)
			}
			return this.pushStack(d, a, e.selector)
		}
	}), f.extend({
		clone: function(a, b, c) {
			var d, e, g, h = f.support.html5Clone || !bc.test("<" + a.nodeName) ? a.cloneNode(!0) : bo(a);
			if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
				bk(a, h), d = bl(a), e = bl(h);
				for (g = 0; d[g]; ++g) e[g] && bk(d[g], e[g])
			}
			if (b) {
				bj(a, h);
				if (c) {
					d = bl(a), e = bl(h);
					for (g = 0; d[g]; ++g) bj(d[g], e[g])
				}
			}
			d = e = null;
			return h
		},
		clean: function(a, b, d, e) {
			var g;
			b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
			var h = [],
				i;
			for (var j = 0, k;
				(k = a[j]) != null; j++) {
				typeof k == "number" && (k += "");
				if (!k) continue;
				if (typeof k == "string")
					if (!_.test(k)) k = b.createTextNode(k);
					else {
						k = k.replace(Y, "<$1></$2>");
						var l = (Z.exec(k) || ["", ""])[1].toLowerCase(),
							m = bg[l] || bg._default,
							n = m[0],
							o = b.createElement("div");
						b === c ? bh.appendChild(o) : U(b).appendChild(o), o.innerHTML = m[1] + k + m[2];
						while (n--) o = o.lastChild;
						if (!f.support.tbody) {
							var p = $.test(k),
								q = l === "table" && !p ? o.firstChild && o.firstChild.childNodes : m[1] === "<table>" && !p ? o.childNodes : [];
							for (i = q.length - 1; i >= 0; --i) f.nodeName(q[i], "tbody") && !q[i].childNodes.length && q[i].parentNode.removeChild(q[i])
						}!f.support.leadingWhitespace && X.test(k) && o.insertBefore(b.createTextNode(X.exec(k)[0]), o.firstChild), k = o.childNodes
					}
				var r;
				if (!f.support.appendChecked)
					if (k[0] && typeof(r = k.length) == "number")
						for (i = 0; i < r; i++) bn(k[i]);
					else bn(k);
				k.nodeType ? h.push(k) : h = f.merge(h, k)
			}
			if (d) {
				g = function(a) {
					return !a.type || be.test(a.type)
				};
				for (j = 0; h[j]; j++)
					if (e && f.nodeName(h[j], "script") && (!h[j].type || h[j].type.toLowerCase() === "text/javascript")) e.push(h[j].parentNode ? h[j].parentNode.removeChild(h[j]) : h[j]);
					else {
						if (h[j].nodeType === 1) {
							var s = f.grep(h[j].getElementsByTagName("script"), g);
							h.splice.apply(h, [j + 1, 0].concat(s))
						}
						d.appendChild(h[j])
					}
			}
			return h
		},
		cleanData: function(a) {
			var b, c, d = f.cache,
				e = f.event.special,
				g = f.support.deleteExpando;
			for (var h = 0, i;
				(i = a[h]) != null; h++) {
				if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) continue;
				c = i[f.expando];
				if (c) {
					b = d[c];
					if (b && b.events) {
						for (var j in b.events) e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
						b.handle && (b.handle.elem = null)
					}
					g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c]
				}
			}
		}
	});
	var bq = /alpha\([^)]*\)/i,
		br = /opacity=([^)]*)/,
		bs = /([A-Z]|^ms)/g,
		bt = /^-?\d+(?:px)?$/i,
		bu = /^-?\d/,
		bv = /^([\-+])=([\-+.\de]+)/,
		bw = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		bx = ["Left", "Right"],
		by = ["Top", "Bottom"],
		bz, bA, bB;
	f.fn.css = function(a, c) {
		if (arguments.length === 2 && c === b) return this;
		return f.access(this, a, c, !0, function(a, c, d) {
			return d !== b ? f.style(a, c, d) : f.css(a, c)
		})
	}, f.extend({
		cssHooks: {
			opacity: {
				get: function(a, b) {
					if (b) {
						var c = bz(a, "opacity", "opacity");
						return c === "" ? "1" : c
					}
					return a.style.opacity
				}
			}
		},
		cssNumber: {
			fillOpacity: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			"float": f.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function(a, c, d, e) {
			if (!!a && a.nodeType !== 3 && a.nodeType !== 8 && !!a.style) {
				var g, h, i = f.camelCase(c),
					j = a.style,
					k = f.cssHooks[i];
				c = f.cssProps[i] || i;
				if (d === b) {
					if (k && "get" in k && (g = k.get(a, !1, e)) !== b) return g;
					return j[c]
				}
				h = typeof d, h === "string" && (g = bv.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
				if (d == null || h === "number" && isNaN(d)) return;
				h === "number" && !f.cssNumber[i] && (d += "px");
				if (!k || !("set" in k) || (d = k.set(a, d)) !== b) try {
					j[c] = d
				} catch (l) {}
			}
		},
		css: function(a, c, d) {
			var e, g;
			c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
			if (g && "get" in g && (e = g.get(a, !0, d)) !== b) return e;
			if (bz) return bz(a, c)
		},
		swap: function(a, b, c) {
			var d = {};
			for (var e in b) d[e] = a.style[e], a.style[e] = b[e];
			c.call(a);
			for (e in b) a.style[e] = d[e]
		}
	}), f.curCSS = f.css, f.each(["height", "width"], function(a, b) {
		f.cssHooks[b] = {
			get: function(a, c, d) {
				var e;
				if (c) {
					if (a.offsetWidth !== 0) return bC(a, b, d);
					f.swap(a, bw, function() {
						e = bC(a, b, d)
					});
					return e
				}
			},
			set: function(a, b) {
				if (!bt.test(b)) return b;
				b = parseFloat(b);
				if (b >= 0) return b + "px"
			}
		}
	}), f.support.opacity || (f.cssHooks.opacity = {
		get: function(a, b) {
			return br.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
		},
		set: function(a, b) {
			var c = a.style,
				d = a.currentStyle,
				e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
				g = d && d.filter || c.filter || "";
			c.zoom = 1;
			if (b >= 1 && f.trim(g.replace(bq, "")) === "") {
				c.removeAttribute("filter");
				if (d && !d.filter) return
			}
			c.filter = bq.test(g) ? g.replace(bq, e) : g + " " + e
		}
	}), f(function() {
		f.support.reliableMarginRight || (f.cssHooks.marginRight = {
			get: function(a, b) {
				var c;
				f.swap(a, {
					display: "inline-block"
				}, function() {
					b ? c = bz(a, "margin-right", "marginRight") : c = a.style.marginRight
				});
				return c
			}
		})
	}), c.defaultView && c.defaultView.getComputedStyle && (bA = function(a, b) {
		var c, d, e;
		b = b.replace(bs, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b)));
		return c
	}), c.documentElement.currentStyle && (bB = function(a, b) {
		var c, d, e, f = a.currentStyle && a.currentStyle[b],
			g = a.style;
		f === null && g && (e = g[b]) && (f = e), !bt.test(f) && bu.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f || 0, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d));
		return f === "" ? "auto" : f
	}), bz = bA || bB, f.expr && f.expr.filters && (f.expr.filters.hidden = function(a) {
		var b = a.offsetWidth,
			c = a.offsetHeight;
		return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
	}, f.expr.filters.visible = function(a) {
		return !f.expr.filters.hidden(a)
	});
	var bD = /%20/g,
		bE = /\[\]$/,
		bF = /\r?\n/g,
		bG = /#.*$/,
		bH = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
		bI = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
		bJ = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
		bK = /^(?:GET|HEAD)$/,
		bL = /^\/\//,
		bM = /\?/,
		bN = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
		bO = /^(?:select|textarea)/i,
		bP = /\s+/,
		bQ = /([?&])_=[^&]*/,
		bR = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
		bS = f.fn.load,
		bT = {},
		bU = {},
		bV, bW, bX = ["*/"] + ["*"];
	try {
		bV = e.href
	} catch (bY) {
		bV = c.createElement("a"), bV.href = "", bV = bV.href
	}
	bW = bR.exec(bV.toLowerCase()) || [], f.fn.extend({
		load: function(a, c, d) {
			if (typeof a != "string" && bS) return bS.apply(this, arguments);
			if (!this.length) return this;
			var e = a.indexOf(" ");
			if (e >= 0) {
				var g = a.slice(e, a.length);
				a = a.slice(0, e)
			}
			var h = "GET";
			c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
			var i = this;
			f.ajax({
				url: a,
				type: h,
				dataType: "html",
				data: c,
				complete: function(a, b, c) {
					c = a.responseText, a.isResolved() && (a.done(function(a) {
						c = a
					}), i.html(g ? f("<div>").append(c.replace(bN, "")).find(g) : c)), d && i.each(d, [c, b, a])
				}
			});
			return this
		},
		serialize: function() {
			return f.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				return this.elements ? f.makeArray(this.elements) : this
			}).filter(function() {
				return this.name && !this.disabled && (this.checked || bO.test(this.nodeName) || bI.test(this.type))
			}).map(function(a, b) {
				var c = f(this).val();
				return c == null ? null : f.isArray(c) ? f.map(c, function(a, c) {
					return {
						name: b.name,
						value: a.replace(bF, "\r\n")
					}
				}) : {
					name: b.name,
					value: c.replace(bF, "\r\n")
				}
			}).get()
		}
	}), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
		f.fn[b] = function(a) {
			return this.on(b, a)
		}
	}), f.each(["get", "post"], function(a, c) {
		f[c] = function(a, d, e, g) {
			f.isFunction(d) && (g = g || e, e = d, d = b);
			return f.ajax({
				type: c,
				url: a,
				data: d,
				success: e,
				dataType: g
			})
		}
	}), f.extend({
		getScript: function(a, c) {
			return f.get(a, b, c, "script")
		},
		getJSON: function(a, b, c) {
			return f.get(a, b, c, "json")
		},
		ajaxSetup: function(a, b) {
			b ? b_(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b_(a, b);
			return a
		},
		ajaxSettings: {
			url: bV,
			isLocal: bJ.test(bW[1]),
			global: !0,
			type: "GET",
			contentType: "application/x-www-form-urlencoded",
			processData: !0,
			async: !0,
			accepts: {
				xml: "application/xml, text/xml",
				html: "text/html",
				text: "text/plain",
				json: "application/json, text/javascript",
				"*": bX
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText"
			},
			converters: {
				"* text": a.String,
				"text html": !0,
				"text json": f.parseJSON,
				"text xml": f.parseXML
			},
			flatOptions: {
				context: !0,
				url: !0
			}
		},
		ajaxPrefilter: bZ(bT),
		ajaxTransport: bZ(bU),
		ajax: function(a, c) {
			function w(a, c, l, m) {
				if (s !== 2) {
					s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
					var o, r, u, w = c,
						x = l ? cb(d, v, l) : b,
						y, z;
					if (a >= 200 && a < 300 || a === 304) {
						if (d.ifModified) {
							if (y = v.getResponseHeader("Last-Modified")) f.lastModified[k] = y;
							if (z = v.getResponseHeader("Etag")) f.etag[k] = z
						}
						if (a === 304) w = "notmodified", o = !0;
						else try {
							r = cc(d, x), w = "success", o = !0
						} catch (A) {
							w = "parsererror", u = A
						}
					} else {
						u = w;
						if (!w || a) w = "error", a < 0 && (a = 0)
					}
					v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
				}
			}
			typeof a == "object" && (c = a, a = b), c = c || {};
			var d = f.ajaxSetup({}, c),
				e = d.context || d,
				g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event,
				h = f.Deferred(),
				i = f.Callbacks("once memory"),
				j = d.statusCode || {},
				k, l = {},
				m = {},
				n, o, p, q, r, s = 0,
				t, u, v = {
					readyState: 0,
					setRequestHeader: function(a, b) {
						if (!s) {
							var c = a.toLowerCase();
							a = m[c] = m[c] || a, l[a] = b
						}
						return this
					},
					getAllResponseHeaders: function() {
						return s === 2 ? n : null
					},
					getResponseHeader: function(a) {
						var c;
						if (s === 2) {
							if (!o) {
								o = {};
								while (c = bH.exec(n)) o[c[1].toLowerCase()] = c[2]
							}
							c = o[a.toLowerCase()]
						}
						return c === b ? null : c
					},
					overrideMimeType: function(a) {
						s || (d.mimeType = a);
						return this
					},
					abort: function(a) {
						a = a || "abort", p && p.abort(a), w(0, a);
						return this
					}
				};
			h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function(a) {
				if (a) {
					var b;
					if (s < 2)
						for (b in a) j[b] = [j[b], a[b]];
					else b = a[v.status], v.then(b, b)
				}
				return this
			}, d.url = ((a || d.url) + "").replace(bG, "").replace(bL, bW[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bP), d.crossDomain == null && (r = bR.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bW[1] && r[2] == bW[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bW[3] || (bW[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), b$(bT, d, c, v);
			if (s === 2) return !1;
			t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bK.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
			if (!d.hasContent) {
				d.data && (d.url += (bM.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
				if (d.cache === !1) {
					var x = f.now(),
						y = d.url.replace(bQ, "$1_=" + x);
					d.url = y + (y === d.url ? (bM.test(d.url) ? "&" : "?") + "_=" + x : "")
				}
			}(d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bX + "; q=0.01" : "") : d.accepts["*"]);
			for (u in d.headers) v.setRequestHeader(u, d.headers[u]);
			if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
				v.abort();
				return !1
			}
			for (u in {
				success: 1,
				error: 1,
				complete: 1
			}) v[u](d[u]);
			p = b$(bU, d, c, v);
			if (!p) w(-1, "No Transport");
			else {
				v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function() {
					v.abort("timeout")
				}, d.timeout));
				try {
					s = 1, p.send(l, w)
				} catch (z) {
					if (s < 2) w(-1, z);
					else throw z
				}
			}
			return v
		},
		param: function(a, c) {
			var d = [],
				e = function(a, b) {
					b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
				};
			c === b && (c = f.ajaxSettings.traditional);
			if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) f.each(a, function() {
				e(this.name, this.value)
			});
			else
				for (var g in a) ca(g, a[g], c, e);
			return d.join("&").replace(bD, "+")
		}
	}), f.extend({
		active: 0,
		lastModified: {},
		etag: {}
	});
	var cd = f.now(),
		ce = /(\=)\?(&|$)|\?\?/i;
	f.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			return f.expando + "_" + cd++
		}
	}), f.ajaxPrefilter("json jsonp", function(b, c, d) {
		var e = b.contentType === "application/x-www-form-urlencoded" && typeof b.data == "string";
		if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (ce.test(b.url) || e && ce.test(b.data))) {
			var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
				i = a[h],
				j = b.url,
				k = b.data,
				l = "$1" + h + "$2";
			b.jsonp !== !1 && (j = j.replace(ce, l), b.url === j && (e && (k = k.replace(ce, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function(a) {
				g = [a]
			}, d.always(function() {
				a[h] = i, g && f.isFunction(i) && a[h](g[0])
			}), b.converters["script json"] = function() {
				g || f.error(h + " was not called");
				return g[0]
			}, b.dataTypes[0] = "json";
			return "script"
		}
	}), f.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /javascript|ecmascript/
		},
		converters: {
			"text script": function(a) {
				f.globalEval(a);
				return a
			}
		}
	}), f.ajaxPrefilter("script", function(a) {
		a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
	}), f.ajaxTransport("script", function(a) {
		if (a.crossDomain) {
			var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
			return {
				send: function(f, g) {
					d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function(a, c) {
						if (c || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
					}, e.insertBefore(d, e.firstChild)
				},
				abort: function() {
					d && d.onload(0, 1)
				}
			}
		}
	});
	var cf = a.ActiveXObject ? function() {
			for (var a in ch) ch[a](0, 1)
		} : !1,
		cg = 0,
		ch;
	f.ajaxSettings.xhr = a.ActiveXObject ? function() {
			return !this.isLocal && ci() || cj()
		} : ci,
		function(a) {
			f.extend(f.support, {
				ajax: !!a,
				cors: !!a && "withCredentials" in a
			})
		}(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function(c) {
			if (!c.crossDomain || f.support.cors) {
				var d;
				return {
					send: function(e, g) {
						var h = c.xhr(),
							i, j;
						c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
						if (c.xhrFields)
							for (j in c.xhrFields) h[j] = c.xhrFields[j];
						c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
						try {
							for (j in e) h.setRequestHeader(j, e[j])
						} catch (k) {}
						h.send(c.hasContent && c.data || null), d = function(a, e) {
							var j, k, l, m, n;
							try {
								if (d && (e || h.readyState === 4)) {
									d = b, i && (h.onreadystatechange = f.noop, cf && delete ch[i]);
									if (e) h.readyState !== 4 && h.abort();
									else {
										j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n), m.text = h.responseText;
										try {
											k = h.statusText
										} catch (o) {
											k = ""
										}!j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
									}
								}
							} catch (p) {
								e || g(-1, p)
							}
							m && g(j, k, m, l)
						}, !c.async || h.readyState === 4 ? d() : (i = ++cg, cf && (ch || (ch = {}, f(a).unload(cf)), ch[i] = d), h.onreadystatechange = d)
					},
					abort: function() {
						d && d(0, 1)
					}
				}
			}
		});
	var ck = {},
		cl, cm, cn = /^(?:toggle|show|hide)$/,
		co = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
		cp, cq = [
			["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
			["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
			["opacity"]
		],
		cr;
	f.fn.extend({
		show: function(a, b, c) {
			var d, e;
			if (a || a === 0) return this.animate(cu("show", 3), a, b, c);
			for (var g = 0, h = this.length; g < h; g++) d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), e === "" && f.css(d, "display") === "none" && f._data(d, "olddisplay", cv(d.nodeName)));
			for (g = 0; g < h; g++) {
				d = this[g];
				if (d.style) {
					e = d.style.display;
					if (e === "" || e === "none") d.style.display = f._data(d, "olddisplay") || ""
				}
			}
			return this
		},
		hide: function(a, b, c) {
			if (a || a === 0) return this.animate(cu("hide", 3), a, b, c);
			var d, e, g = 0,
				h = this.length;
			for (; g < h; g++) d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
			for (g = 0; g < h; g++) this[g].style && (this[g].style.display = "none");
			return this
		},
		_toggle: f.fn.toggle,
		toggle: function(a, b, c) {
			var d = typeof a == "boolean";
			f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function() {
				var b = d ? a : f(this).is(":hidden");
				f(this)[b ? "show" : "hide"]()
			}) : this.animate(cu("toggle", 3), a, b, c);
			return this
		},
		fadeTo: function(a, b, c, d) {
			return this.filter(":hidden").css("opacity", 0).show().end().animate({
				opacity: b
			}, a, c, d)
		},
		animate: function(a, b, c, d) {
			function g() {
				e.queue === !1 && f._mark(this);
				var b = f.extend({}, e),
					c = this.nodeType === 1,
					d = c && f(this).is(":hidden"),
					g, h, i, j, k, l, m, n, o;
				b.animatedProperties = {};
				for (i in a) {
					g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]), h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
					if (h === "hide" && d || h === "show" && !d) return b.complete.call(this);
					c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cv(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
				}
				b.overflow != null && (this.style.overflow = "hidden");
				for (i in a) j = new f.fx(this, b, i), h = a[i], cn.test(h) ? (o = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), o ? (f._data(this, "toggle" + i, o === "show" ? "hide" : "show"), j[o]()) : j[h]()) : (k = co.exec(h), l = j.cur(), k ? (m = parseFloat(k[2]), n = k[3] || (f.cssNumber[i] ? "" : "px"), n !== "px" && (f.style(this, i, (m || 1) + n), l = (m || 1) / j.cur() * l, f.style(this, i, l + n)), k[1] && (m = (k[1] === "-=" ? -1 : 1) * m + l), j.custom(l, m, n)) : j.custom(l, h, ""));
				return !0
			}
			var e = f.speed(b, c, d);
			if (f.isEmptyObject(a)) return this.each(e.complete, [!1]);
			a = f.extend({}, a);
			return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
		},
		stop: function(a, c, d) {
			typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []);
			return this.each(function() {
				function h(a, b, c) {
					var e = b[c];
					f.removeData(a, c, !0), e.stop(d)
				}
				var b, c = !1,
					e = f.timers,
					g = f._data(this);
				d || f._unmark(!0, this);
				if (a == null)
					for (b in g) g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b);
				else g[b = a + ".run"] && g[b].stop && h(this, g, b);
				for (b = e.length; b--;) e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
				(!d || !c) && f.dequeue(this, a)
			})
		}
	}), f.each({
		slideDown: cu("show", 1),
		slideUp: cu("hide", 1),
		slideToggle: cu("toggle", 1),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(a, b) {
		f.fn[a] = function(a, c, d) {
			return this.animate(b, a, c, d)
		}
	}), f.extend({
		speed: function(a, b, c) {
			var d = a && typeof a == "object" ? f.extend({}, a) : {
				complete: c || !c && b || f.isFunction(a) && a,
				duration: a,
				easing: c && b || b && !f.isFunction(b) && b
			};
			d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
			if (d.queue == null || d.queue === !0) d.queue = "fx";
			d.old = d.complete, d.complete = function(a) {
				f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
			};
			return d
		},
		easing: {
			linear: function(a, b, c, d) {
				return c + d * a
			},
			swing: function(a, b, c, d) {
				return (-Math.cos(a * Math.PI) / 2 + .5) * d + c
			}
		},
		timers: [],
		fx: function(a, b, c) {
			this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
		}
	}), f.fx.prototype = {
		update: function() {
			this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this)
		},
		cur: function() {
			if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
			var a, b = f.css(this.elem, this.prop);
			return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
		},
		custom: function(a, c, d) {
			function h(a) {
				return e.step(a)
			}
			var e = this,
				g = f.fx;
			this.startTime = cr || cs(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function() {
				e.options.hide && f._data(e.elem, "fxshow" + e.prop) === b && f._data(e.elem, "fxshow" + e.prop, e.start)
			}, h() && f.timers.push(h) && !cp && (cp = setInterval(g.tick, g.interval))
		},
		show: function() {
			var a = f._data(this.elem, "fxshow" + this.prop);
			this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show()
		},
		hide: function() {
			this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
		},
		step: function(a) {
			var b, c, d, e = cr || cs(),
				g = !0,
				h = this.elem,
				i = this.options;
			if (a || e >= i.duration + this.startTime) {
				this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
				for (b in i.animatedProperties) i.animatedProperties[b] !== !0 && (g = !1);
				if (g) {
					i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function(a, b) {
						h.style["overflow" + b] = i.overflow[a]
					}), i.hide && f(h).hide();
					if (i.hide || i.show)
						for (b in i.animatedProperties) f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
					d = i.complete, d && (i.complete = !1, d.call(h))
				}
				return !1
			}
			i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update();
			return !0
		}
	}, f.extend(f.fx, {
		tick: function() {
			var a, b = f.timers,
				c = 0;
			for (; c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1);
			b.length || f.fx.stop()
		},
		interval: 13,
		stop: function() {
			clearInterval(cp), cp = null
		},
		speeds: {
			slow: 600,
			fast: 200,
			_default: 400
		},
		step: {
			opacity: function(a) {
				f.style(a.elem, "opacity", a.now)
			},
			_default: function(a) {
				a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
			}
		}
	}), f.each(["width", "height"], function(a, b) {
		f.fx.step[b] = function(a) {
			f.style(a.elem, b, Math.max(0, a.now) + a.unit)
		}
	}), f.expr && f.expr.filters && (f.expr.filters.animated = function(a) {
		return f.grep(f.timers, function(b) {
			return a === b.elem
		}).length
	});
	var cw = /^t(?:able|d|h)$/i,
		cx = /^(?:body|html)$/i;
	"getBoundingClientRect" in c.documentElement ? f.fn.offset = function(a) {
		var b = this[0],
			c;
		if (a) return this.each(function(b) {
			f.offset.setOffset(this, a, b)
		});
		if (!b || !b.ownerDocument) return null;
		if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
		try {
			c = b.getBoundingClientRect()
		} catch (d) {}
		var e = b.ownerDocument,
			g = e.documentElement;
		if (!c || !f.contains(g, b)) return c ? {
			top: c.top,
			left: c.left
		} : {
			top: 0,
			left: 0
		};
		var h = e.body,
			i = cy(e),
			j = g.clientTop || h.clientTop || 0,
			k = g.clientLeft || h.clientLeft || 0,
			l = i.pageYOffset || f.support.boxModel && g.scrollTop || h.scrollTop,
			m = i.pageXOffset || f.support.boxModel && g.scrollLeft || h.scrollLeft,
			n = c.top + l - j,
			o = c.left + m - k;
		return {
			top: n,
			left: o
		}
	} : f.fn.offset = function(a) {
		var b = this[0];
		if (a) return this.each(function(b) {
			f.offset.setOffset(this, a, b)
		});
		if (!b || !b.ownerDocument) return null;
		if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
		var c, d = b.offsetParent,
			e = b,
			g = b.ownerDocument,
			h = g.documentElement,
			i = g.body,
			j = g.defaultView,
			k = j ? j.getComputedStyle(b, null) : b.currentStyle,
			l = b.offsetTop,
			m = b.offsetLeft;
		while ((b = b.parentNode) && b !== i && b !== h) {
			if (f.support.fixedPosition && k.position === "fixed") break;
			c = j ? j.getComputedStyle(b, null) : b.currentStyle, l -= b.scrollTop, m -= b.scrollLeft, b === d && (l += b.offsetTop, m += b.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(b.nodeName)) && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), e = d, d = b.offsetParent), f.support.subtractsBorderForOverflowNotVisible && c.overflow !== "visible" && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), k = c
		}
		if (k.position === "relative" || k.position === "static") l += i.offsetTop, m += i.offsetLeft;
		f.support.fixedPosition && k.position === "fixed" && (l += Math.max(h.scrollTop, i.scrollTop), m += Math.max(h.scrollLeft, i.scrollLeft));
		return {
			top: l,
			left: m
		}
	}, f.offset = {
		bodyOffset: function(a) {
			var b = a.offsetTop,
				c = a.offsetLeft;
			f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0);
			return {
				top: b,
				left: c
			}
		},
		setOffset: function(a, b, c) {
			var d = f.css(a, "position");
			d === "static" && (a.style.position = "relative");
			var e = f(a),
				g = e.offset(),
				h = f.css(a, "top"),
				i = f.css(a, "left"),
				j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1,
				k = {},
				l = {},
				m, n;
			j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k)
		}
	}, f.fn.extend({
		position: function() {
			if (!this[0]) return null;
			var a = this[0],
				b = this.offsetParent(),
				c = this.offset(),
				d = cx.test(b[0].nodeName) ? {
					top: 0,
					left: 0
				} : b.offset();
			c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
			return {
				top: c.top - d.top,
				left: c.left - d.left
			}
		},
		offsetParent: function() {
			return this.map(function() {
				var a = this.offsetParent || c.body;
				while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static") a = a.offsetParent;
				return a
			})
		}
	}), f.each(["Left", "Top"], function(a, c) {
		var d = "scroll" + c;
		f.fn[d] = function(c) {
			var e, g;
			if (c === b) {
				e = this[0];
				if (!e) return null;
				g = cy(e);
				return g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : f.support.boxModel && g.document.documentElement[d] || g.document.body[d] : e[d]
			}
			return this.each(function() {
				g = cy(this), g ? g.scrollTo(a ? f(g).scrollLeft() : c, a ? c : f(g).scrollTop()) : this[d] = c
			})
		}
	}), f.each(["Height", "Width"], function(a, c) {
		var d = c.toLowerCase();
		f.fn["inner" + c] = function() {
			var a = this[0];
			return a ? a.style ? parseFloat(f.css(a, d, "padding")) : this[d]() : null
		}, f.fn["outer" + c] = function(a) {
			var b = this[0];
			return b ? b.style ? parseFloat(f.css(b, d, a ? "margin" : "border")) : this[d]() : null
		}, f.fn[d] = function(a) {
			var e = this[0];
			if (!e) return a == null ? null : this;
			if (f.isFunction(a)) return this.each(function(b) {
				var c = f(this);
				c[d](a.call(this, b, c[d]()))
			});
			if (f.isWindow(e)) {
				var g = e.document.documentElement["client" + c],
					h = e.document.body;
				return e.document.compatMode === "CSS1Compat" && g || h && h["client" + c] || g
			}
			if (e.nodeType === 9) return Math.max(e.documentElement["client" + c], e.body["scroll" + c], e.documentElement["scroll" + c], e.body["offset" + c], e.documentElement["offset" + c]);
			if (a === b) {
				var i = f.css(e, d),
					j = parseFloat(i);
				return f.isNumeric(j) ? j : i
			}
			return this.css(d, typeof a == "string" ? a : a + "px")
		}
	}), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function() {
		return f
	})
})(window);
var apex = {};
apex.jQuery = jQuery,
	function($) {
		"use strict";
		apex.gPageContext$ = $(document), apex.gParentPageContext$ = apex.gPageContext$, $(document).on("pagebeforecreate pageshow", function(pEvent) {
			var lNewPageContext$ = $(pEvent.target);
			"dialog" === lNewPageContext$.data("role") ? apex.gPageContext$ = 1 === lNewPageContext$.has("[role='listbox']").length ? apex.gParentPageContext$ : $(pEvent.target) : (apex.gPageContext$ = $(pEvent.target), apex.gParentPageContext$ = apex.gPageContext$)
		}), $(document).on("pageshow", function(pEvent) {
			var lData = $(pEvent.target).data();
			lData.apexPageTransition && ($.mobile.defaultPageTransition = lData.apexPageTransition), lData.apexPopupTransition && ($.mobile.defaultDialogTransition = lData.apexPopupTransition)
		})
	}(apex.jQuery);
apex.debug = {}, apex.debug = function() {
		apex.debug.log.apply(this, arguments)
	},
	function(debug, $) {
		"use strict";
		debug.getLevel = function() {
			var lReturnLevel, lDebugValue = $("#pdebug", apex.gPageContext$).val();
			return lReturnLevel = "YES" === lDebugValue ? 4 : /^LEVEL[0-9]$/.test(lDebugValue) ? parseInt(lDebugValue.substr(5), 10) : 0
		}, debug.log = function() {
			if (debug.getLevel() > 0) try {
				console.log.apply(console, arguments)
			} catch (e) {
				try {
					opera.postError.apply(opera, arguments)
				} catch (e) {}
			}
		}
	}(apex.debug, apex.jQuery);
apex.util = {},
	function(util, $, undefined) {
		util.toArray = function(pValue, pSeparator) {
			var lSeparator, lReturn = [];
			return "string" == typeof pValue ? (lSeparator = pSeparator === undefined ? ":" : pSeparator, lReturn = pValue.split(lSeparator)) : lReturn = $.makeArray(pValue), lReturn
		}, util.escapeHTML = function(pValue) {
			return pValue.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
		}, util.escapeCSS = function(pValue) {
			var lReturn = "";
			return pValue ? pValue.replace(/([:. ,<>"'$#\\])/g, "\\$1") : lReturn
		}
	}(apex.util, apex.jQuery);
apex.storage = {},
	function(storage) {
		"use strict";
		storage.getCookieVal = function(pOffset) {
			var lEndPos = document.cookie.indexOf(";", pOffset);
			return -1 === lEndPos && (lEndPos = document.cookie.length), unescape(document.cookie.substring(pOffset, lEndPos))
		}, storage.getCookie = function(pName) {
			for (var lArg = pName + "=", lArgLength = lArg.length, lCookieLength = document.cookie.length, i = 0; lCookieLength > i;) {
				var j = i + lArgLength;
				if (document.cookie.substring(i, j) === lArg) return storage.getCookieVal(j);
				if (i = document.cookie.indexOf(" ", i) + 1, 0 === i) break
			}
			return null
		}, storage.setCookie = function(pName, pValue) {
			var argv = arguments,
				argc = arguments.length,
				expires = argc > 2 ? argv[2] : null,
				path = argc > 3 ? argv[3] : null,
				domain = argc > 4 ? argv[4] : null,
				secure = argc > 5 ? !0 : !1;
			document.cookie = pName + "=" + escape(pValue) + (null === expires ? "" : "; expires=" + expires.toGMTString()) + (null === path ? "" : "; path=" + path) + (null === domain ? "" : "; domain=" + domain) + (secure === !0 || "https:" === window.location.protocol ? "; secure" : "")
		}
	}(apex.storage, apex.jQuery);
apex.navigation = {},
	function(navigation, $) {
		"use strict";
		navigation.redirect = function(pWhere, pUseAjax) {
			$.mobile && pUseAjax !== !1 && pWhere.substring(0, pWhere.indexOf(":")) === "f?p=" + $v("pFlowId") ? $.mobile.changePage(pWhere, {
				reloadPage: !0
			}) : location.href = pWhere
		}, navigation.popup = function(pOptions) {
			var lOptions = $.extend({
					url: "about:blank",
					name: "_blank",
					width: 600,
					height: 600,
					scroll: "yes",
					resizable: "yes",
					toolbar: "no",
					location: "no",
					statusbar: "no",
					menubar: "no"
				}, pOptions),
				lWindow = window.open(lOptions.url, lOptions.name, "toolbar=" + lOptions.toolbar + ",scrollbars=" + lOptions.scroll + ",location=" + lOptions.location + ",statusbar=" + lOptions.statusbar + ",menubar=" + lOptions.menubar + ",resizable=" + lOptions.resizable + ",width=" + lOptions.width + ",height=" + lOptions.height);
			return null === lWindow.opener && (lWindow.opener = window.self), lWindow.focus(), lWindow
		}, navigation.popup.url = function(pURL) {
			navigation.popup({
				url: pURL,
				name: "winLov",
				width: 800,
				height: 600
			})
		}, navigation.popup.close = function(pItem, pValue) {
			opener.$x_Value(pItem, pValue), window.close()
		}
	}(apex.navigation, apex.jQuery);
apex.event = {},
	function(event, $) {
		"use strict";
		event.gCancelFlag = !1, event.trigger = function(pSelector, pEvent, pData) {
			return event.gCancelFlag = !1, $(pSelector, apex.gPageContext$).trigger(pEvent, pData), event.gCancelFlag
		}
	}(apex.event, apex.jQuery);
apex.server = {}, apex.jQuery.ajaxSettings.traditional = !0, apex.jQuery.ajaxPrefilter("script", function(options) {
		options.cache = !0
	}),
	function(server, $, undefined) {
		"use strict";

		function _call(pRequest, pData, pOptions) {
			var lLoadingIndicator$, lOptions = $.extend({
					dataType: "json",
					type: "post",
					async: !0,
					url: "wwv_flow.show",
					traditional: !0,
					loadingIndicatorPosition: "after"
				}, pOptions),
				lSuccessCallback = lOptions.success,
				lErrorCallback = lOptions.error,
				lData = $.extend({
					p_request: pRequest,
					p_flow_id: $v("pFlowId"),
					p_flow_step_id: $v("pFlowStepId"),
					p_instance: $v("pInstance"),
					p_debug: $v("pdebug"),
					p_arg_names: [],
					p_arg_values: []
				}, pData),
				lLoadingIndicatorTmpl$ = $('<span class="apex-loading-indicator"></span>'),
				lLoadingIndicators$ = $();
			if ($.isArray(lData.pageItems))
				for (var lIdx, lItem, i = 0; i < lData.pageItems.length; i++) lItem = $x(lData.pageItems[i]), lItem && (lIdx = lData.p_arg_names.length, lData.p_arg_names[lIdx] = lItem.id, lData.p_arg_values[lIdx] = $v(lItem));
			else $(lData.pageItems, apex.gPageContext$).each(function() {
				var lIdx = lData.p_arg_names.length;
				lData.p_arg_names[lIdx] = this.id, lData.p_arg_values[lIdx] = $v(this)
			});
			return delete lData.pageItems, apex.event.trigger(lOptions.refreshObject, "apexbeforerefresh", lOptions.refreshObjectData) ? !1 : ($.isFunction(lOptions.clear) && lOptions.clear(), $.isFunction(lOptions.loadingIndicator) ? lLoadingIndicators$ = lOptions.loadingIndicator(lLoadingIndicatorTmpl$) : $(lOptions.loadingIndicator).each(function() {
				lLoadingIndicator$ = lLoadingIndicatorTmpl$.clone(), apex.item(this).callbacks.loadingIndicator !== undefined ? lLoadingIndicator$ = apex.item(this).loadingIndicator(lLoadingIndicator$) : "before" === lOptions.loadingIndicatorPosition ? lLoadingIndicator$ = lLoadingIndicator$.insertBefore($(this, apex.gPageContext$).filter(":not(:hidden)")) : "after" === lOptions.loadingIndicatorPosition ? lLoadingIndicator$ = lLoadingIndicator$.insertAfter($(this, apex.gPageContext$).filter(":not(:hidden)")) : "prepend" === lOptions.loadingIndicatorPosition ? lLoadingIndicator$ = lLoadingIndicator$.prependTo($(this, apex.gPageContext$)) : "append" === lOptions.loadingIndicatorPosition ? lLoadingIndicator$ = lLoadingIndicator$.appendTo($(this, apex.gPageContext$)) : "centered" === lOptions.loadingIndicatorPosition ? alert("Centered Position not yet supported") : "page" === lOptions.loadingIndicatorPosition && alert("Page Position not yet supported"), lLoadingIndicators$ = lLoadingIndicators$.add(lLoadingIndicator$)
			}), delete lOptions.loadingIndicatorPosition, lOptions.data = lData, lOptions.error = function(pjqXHR, pTextStatus, pErrorThrown) {
				_error(pjqXHR, pTextStatus, pErrorThrown, {
					callback: lErrorCallback,
					loadingIndicator: lLoadingIndicators$
				})
			}, lOptions.success = function(pData, pTextStatus, pjqXHR) {
				_success(pData, pTextStatus, pjqXHR, {
					callback: lSuccessCallback,
					errorCallback: lOptions.error,
					loadingIndicator: lLoadingIndicators$,
					refreshObject: lOptions.refreshObject,
					refreshObjectData: lOptions.refreshObjectData
				})
			}, $.ajax(lOptions))
		}

		function _removeLoadingIndicator(pLoadingIndicator) {
			$.isFunction(pLoadingIndicator) ? pLoadingIndicator() : $(pLoadingIndicator, apex.gPageContext$).remove()
		}

		function _success(pData, pTextStatus, pjqXHR, pOptions) {
			var lResult = !0;
			return null !== pData && pData.error ? pOptions.errorCallback(pjqXHR, "APEX", pData.error) : (_removeLoadingIndicator(pOptions.loadingIndicator), $.isFunction(pOptions.callback) && (lResult = pOptions.callback(pData, pTextStatus, pjqXHR)), (lResult || lResult == undefined) && apex.event.trigger(pOptions.refreshObject, "apexafterrefresh", pOptions.refreshObjectData) ? !1 : lResult)
		}

		function _error(pjqXHR, pTextStatus, pErrorThrown, pOptions) {
			var lMsg, lResult = !1;
			return _removeLoadingIndicator(pOptions.loadingIndicator), $.isFunction(pOptions.callback) ? lResult = pOptions.callback(pjqXHR, pTextStatus, pErrorThrown) : 0 !== pjqXHR.status && (lMsg = "APEX" === pTextStatus ? pErrorThrown : "Error: " + pTextStatus + " - " + pErrorThrown, $.isFunction(window.onerror) ? window.onerror(lMsg, null, null) : window.alert(lMsg)), lResult
		}
		server.plugin = function(pAjaxIdentifier, pData, pOptions) {
			return _call("PLUGIN=" + pAjaxIdentifier, pData, pOptions)
		}, server.pluginUrl = function(pAjaxIdentifier, pData) {
			var lUrl = "wwv_flow.show?p_flow_id=" + $v("pFlowId") + "&p_flow_step_id=" + $v("pFlowStepId") + "&p_instance=" + $v("pInstance") + "&p_debug=" + $v("pdebug") + "&p_request=PLUGIN%3D" + pAjaxIdentifier;
			for (var lKey in pData)
				if (pData.hasOwnProperty(lKey))
					if ("pageItems" === lKey)
						if ($.isArray(pData.pageItems))
							for (var lItem, i = 0; i < pData.pageItems.length; i++) lItem = $x(pData.pageItems[i]), lItem && (lUrl = lUrl + "&p_arg_names=" + encodeURIComponent(lItem.id) + "&p_arg_values=" + encodeURIComponent($v(lItem)));
						else $(pData.pageItems, apex.gPageContext$).each(function() {
							lUrl = lUrl + "&p_arg_names=" + encodeURIComponent(this.id) + "&p_arg_values=" + encodeURIComponent($v(this))
						});
			else lUrl = lUrl + "&" + lKey + "=" + encodeURIComponent(pData[lKey]);
			return lUrl
		}, server.process = function(pName, pData, pOptions) {
			return _call("APPLICATION_PROCESS=" + pName, pData, pOptions)
		}, server.widget = function(pName, pData, pOptions) {
			var lData = pData || {};
			return lData.p_widget_name = pName, _call("APXWGT", lData, pOptions)
		}
	}(apex.server, apex.jQuery);
apex.page = {},
	function(page, $, event, undefined) {
		function _getSubmitOptions(pOptions, pMode) {
			var lRequestDefault, lDefaults, lOptions = {};
			switch ("SUBMIT" === pMode ? lRequestDefault = null : "CONFIRM" === pMode && (lRequestDefault = "Delete"), lDefaults = {
				request: lRequestDefault,
				set: null,
				showWait: !1,
				waitMsg: null,
				form: "wwv_flow"
			}, typeof pOptions) {
				case "string":
					lOptions = $.extend(lDefaults, {
						request: pOptions
					});
					break;
				case "object":
					lOptions = $.extend(lDefaults, pOptions);
					break;
				default:
					lOptions = lDefaults
			}
			return lOptions
		}
		page.itemCallbacks = {}, page.submit = function(pOptions) {
			var lKeyCode, lOptions = _getSubmitOptions(pOptions, "SUBMIT"),
				lCancelSubmit = !1;
			if (lOptions.submitIfEnter !== undefined && (lKeyCode = window.event ? window.event.keyCode : lOptions.submitIfEnter.which, 13 !== lKeyCode)) return !0;
			if (lCancelSubmit = event.trigger(apex.gPageContext$, "apexbeforepagesubmit", lOptions.request)) event.gCancelFlag = !1;
			else {
				lOptions.showWait && apex.widget.waitPopup(), lOptions.set && $.each(lOptions.set, function(pId, pValue) {
					pId && pValue !== undefined && $s(pId, pValue)
				}), flowSelectAll(), $("#pRequest", apex.gPageContext$).val(lOptions.request);
				try {
					window.external && "unknown" == typeof window.external.AutoCompleteSaveForm && window.external.AutoCompleteSaveForm($("form[name=" + lOptions.form + "]", apex.gPageContext$).get(0))
				} catch (e) {}
				$("form[name=" + lOptions.form + "]", apex.gPageContext$).trigger("submit")
			}
			return lOptions.submitIfEnter !== undefined ? !1 : void 0
		}, page.confirm = function(pMessage, pOptions) {
			var lMessage, lOptions = _getSubmitOptions(pOptions, "CONFIRM");
			lMessage = pMessage ? pMessage : "Would you like to perform this delete action?", confirm(lMessage) && page.submit(lOptions)
		}, apex.submit = page.submit, apex.confirm = page.confirm
	}(apex.page, apex.jQuery, apex.event);
apex.item = function(pNd, pCallbacks) {
	function init(pNd) {
		try {
			switch (typeof pNd) {
				case "string":
					_self.node = apex.jQuery("#" + apex.util.escapeCSS(pNd), apex.gPageContext$)[0];
					break;
				case "object":
					_self.node = pNd;
					break;
				default:
					_self.node = !1
			}
			_self.node && 1 === _self.node.nodeType || (_self.node = !1)
		} catch (e) {
			_self.node = !1
		}
		if (_self.node) {
			_self.id = _self.node.id, apex.page.itemCallbacks[_self.id] ? _self.callbacks = apex.page.itemCallbacks[_self.id] : apex.jQuery.isEmptyObject(_self.callbacks) || (apex.page.itemCallbacks[_self.id] = _self.callbacks);
			var lNodeType = _self.node.nodeName.toUpperCase(),
				lClass = _self.node.className.toUpperCase();
			if ("FIELDSET" === lNodeType) switch (_self.item_type = lClass, lClass) {
				case "CHECKBOX_GROUP":
				case "RADIO_GROUP":
				case "SHUTTLE":
					break;
				default:
					_self.item_type = !1
			} else if ("INPUT" === lNodeType) switch (_self.item_type = _self.node.type.toUpperCase(), _self.item_type) {
				case "CHECKBOX":
				case "RADIO":
					break;
				case "TEXT":
					var TEXT_TYPE = _self.node.parentNode.className.toUpperCase();
					switch (TEXT_TYPE) {
						case "DATEPICKER":
							_self.item_type = TEXT_TYPE;
							break;
						case "LOV":
							_self.item_type = apex.jQuery("#" + _self.id + "_HIDDENVALUE", apex.gPageContext$).length > 0 ? "POPUP_KEY_LOV" : "POPUP_LOV"
					}
					break;
				case "HIDDEN":
					_self.display_span = $x(_self.id + "_DISPLAY"), _self.display_span && (_self.item_type = "DISPLAY_SAVES_STATE");
					break;
				default:
					_self.item_type = "TEXT"
			} else switch (_self.item_type = lNodeType, _self.item_type) {
				case "TEXTAREA":
					if ("html_editor" === _self.node.parentNode.className && "FIELDSET" === _self.node.parentNode.tagName) _self.item_type = "FCKEDITOR";
					else try {
						CKEDITOR.instances[_self.id] && (_self.item_type = "CKEDITOR3")
					} catch (e) {}
					break;
				case "SELECT":
					break;
				case "SPAN":
					"display_only" === _self.node.className && (_self.item_type = "DISPLAY_ONLY");
					break;
				default:
					_self.item_type = !1
			}
		}
	}

	function getValue() {
		if (!_self.node) return "";
		if (apex.jQuery.isFunction(_self.callbacks.getValue)) return _self.callbacks.getValue.call(_self);
		var oEditor, lRadio$, lArray = !0,
			lReturn = [];
		switch (_self.item_type) {
			case "RADIO_GROUP":
				lRadio$ = apex.jQuery(":checked", _self.node), lReturn = 0 === lRadio$.length ? "" : lRadio$.val();
				break;
			case "CHECKBOX_GROUP":
				apex.jQuery(":checked", _self.node).each(function() {
					lReturn[lReturn.length] = this.value
				});
				break;
			case "SELECT":
				lReturn = apex.jQuery(_self.node).val(), (null === lReturn || void 0 === lReturn) && (lReturn = apex.jQuery(_self.node).attr("multiple") ? [] : "");
				break;
			default:
				lArray = !1
		}
		if (!lArray) switch (_self.item_type) {
			case "CHECKBOX":
				lReturn = _self.node.checked ? _self.node.value : "";
				break;
			case "RADIO":
				lReturn = _self.node.checked ? _self.node.value : "";
				break;
			case "TEXT":
				lReturn = _self.node.value;
				break;
			case "POPUP_LOV":
				lReturn = _self.node.value;
				break;
			case "POPUP_KEY_LOV":
				lReturn = apex.jQuery("#" + _self.node.id + "_HIDDENVALUE", apex.gPageContext$).val();
				break;
			case "DATEPICKER":
				lReturn = _self.node.value;
				break;
			case "HIDDEN":
				lReturn = _self.node.value;
				break;
			case "DISPLAY_SAVES_STATE":
				lReturn = _self.node.value;
				break;
			case "DISPLAY_ONLY":
				lReturn = _self.node.innerHTML;
				break;
			case "TEXTAREA":
				lReturn = _self.node.value;
				break;
			case "FCKEDITOR":
				oEditor = FCKeditorAPI.GetInstance(_self.node.id), lReturn = oEditor.GetHTML();
				break;
			default:
				lReturn = ""
		}
		return lReturn
	}

	function setValue(pValue, pDisplayValue, pSuppressChangeEvent) {
		if (apex.jQuery.isFunction(_self.callbacks.setValue)) _self.callbacks.setValue.call(_self, pValue, pDisplayValue, pSuppressChangeEvent);
		else {
			var lCheck, lOpts = !1,
				lSelf$ = apex.jQuery(_self.node, apex.gPageContext$);
			if (!_self.node) return;
			switch (_self.item_type) {
				case "RADIO_GROUP":
					lOpts = $x_FormItems(_self.node, "RADIO");
					break;
				case "CHECKBOX_GROUP":
					lOpts = $x_FormItems(_self.node, "CHECKBOX");
					break;
				case "POPUP_KEY_LOV":
					apex.jQuery("#" + _self.node.id + "_HIDDENVALUE", apex.gPageContext$).val(pValue), lSelf$.val(pDisplayValue);
					break;
				case "SELECT":
					lOpts = _self.node.options;
					break;
				default:
					lOpts = !1
			}
			if (lOpts)
				for (var i = 0, len = lOpts.length; len > i; i++) lCheck = lOpts[i].value == pValue, "RADIO_GROUP" === _self.item_type || "CHECKBOX_GROUP" === _self.item_type ? lOpts[i].checked = lCheck : lOpts[i].selected = lCheck;
			else switch (_self.item_type) {
				case "CHECKBOX":
				case "RADIO":
					_self.node.value == pValue && (_self.node.checked = !0);
					break;
				case "TEXT":
				case "POPUP_LOV":
				case "DATEPICKER":
				case "PASSWORD":
				case "HIDDEN":
				case "TEXTAREA":
					lSelf$.val(pValue);
					break;
				case "DISPLAY_SAVES_STATE":
					lSelf$.val(pValue), apex.jQuery(_self.display_span, apex.gPageContext$).html(pValue);
					break;
				case "DISPLAY_ONLY":
					lSelf$.html(pValue);
					break;
				case "FCKEDITOR":
					var oEditor = FCKeditorAPI.GetInstance(_self.node.id);
					oEditor.SetHTML(pValue);
					break;
				default:
					_self.node.innerHTML = pValue
			}
		}
		_self.afterModify(), pSuppressChangeEvent || apex.jQuery(_self.node).trigger("change")
	}

	function enable() {
		apex.jQuery.isFunction(_self.callbacks.enable) ? _self.callbacks.enable.call(_self) : (apex.jQuery(_self.node).removeClass("apex_disabled").prop("disabled", !1), !$.mobile || "TEXTAREA" !== _self.item_type && -1 == apex.jQuery.inArray(_self.node.type, ["text", "email", "url", "tel", "search", "number", "password", "time", "date", "month", "week", "datetime", "datetime-local", "color"]) || apex.jQuery(_self.node).textinput("enable")), _self.afterModify()
	}

	function disable() {
		apex.jQuery.isFunction(_self.callbacks.disable) ? _self.callbacks.disable.call(_self) : (apex.jQuery(_self.node).addClass("apex_disabled").prop("disabled", !0), !$.mobile || "TEXTAREA" !== _self.item_type && -1 == apex.jQuery.inArray(_self.node.type, ["text", "email", "url", "tel", "search", "number", "password", "time", "date", "month", "week", "datetime", "datetime-local", "color"]) || apex.jQuery(_self.node).textinput("disable")), _self.afterModify()
	}

	function show(pShowRow) {
		var lNodeDisplay$ = apex.jQuery("#" + _self.node.id + "_CONTAINER", apex.gPageContext$);
		lNodeDisplay$.length > 0 ? lNodeDisplay$.show() : pShowRow ? $x_ItemRow(_self.node, "SHOW") : (apex.jQuery.isFunction(_self.callbacks.show) ? _self.callbacks.show.call(_self) : (lNodeDisplay$ = apex.jQuery("#" + _self.node.id + "_DISPLAY", apex.gPageContext$), lNodeDisplay$.length > 0 ? lNodeDisplay$.show() : apex.jQuery(_self.node).show()), apex.jQuery("label[for=" + _self.node.id + "]", apex.gPageContext$).show())
	}

	function hide(pHideRow) {
		var lNodeDisplay$ = apex.jQuery("#" + _self.node.id + "_CONTAINER", apex.gPageContext$);
		lNodeDisplay$.length > 0 ? lNodeDisplay$.hide() : pHideRow ? $x_ItemRow(_self.node, "HIDE") : (apex.jQuery.isFunction(_self.callbacks.hide) ? _self.callbacks.hide.call(_self) : (lNodeDisplay$ = apex.jQuery("#" + _self.node.id + "_DISPLAY", apex.gPageContext$), lNodeDisplay$.length > 0 ? lNodeDisplay$.hide() : apex.jQuery(_self.node).hide()), apex.jQuery("label[for=" + _self.node.id + "]", apex.gPageContext$).hide())
	}

	function isEmpty() {
		var lItemValue, re, lThis, lOpts, lReturn, lNullValue = "";
		return lItemValue = _self.getValue(), apex.jQuery.isArray(lItemValue) && (lItemValue = lItemValue.join(":")), re = /^\s{1,}$/g, lThis = $x(_self.node), lOpts = !1, "nullValue" in _self.callbacks ? apex.jQuery.isFunction(_self.callbacks.nullValue) ? _self.callbacks.nullValue.call(_self) : 0 === lItemValue.length || null === lItemValue || lItemValue === _self.callbacks.nullValue || lItemValue.search(re) > -1 ? !0 : !1 : ("SELECT" === _self.item_type ? (apex.widget && apex.widget.report && apex.widget.report.tabular && apex.widget.report.tabular.gNullValueList && apex.jQuery.each(apex.widget.report.tabular.gNullValueList, function(pId, pValue) {
			return this.name === lThis.name ? (lNullValue = pValue.value, !1) : void 0
		}), lReturn = lThis.multiple ? 0 === lItemValue.length || lItemValue === lNullValue : lNullValue || "" === lNullValue ? lItemValue === lNullValue : !1) : lReturn = 0 === lItemValue.length || null === lItemValue || lItemValue.search(re) > -1 ? !0 : !1, lReturn)
	}

	function addValue(pValue) {
		apex.jQuery.isFunction(_self.callbacks.addValue) ? _self.callbacks.addValue.call(_self, pValue) : alert("No default handling defined for addValue"), _self.afterModify()
	}

	function removeValue() {
		apex.jQuery.isFunction(_self.callbacks.removeValue) ? _self.callbacks.removeValue.call(_self) : alert("No default handling defined for removeValue"), _self.afterModify()
	}

	function setFocus() {
		var lSetFocusTo$;
		lSetFocusTo$ = "setFocusTo" in _self.callbacks ? apex.jQuery.isFunction(_self.callbacks.setFocusTo) ? _self.callbacks.setFocusTo.call(_self) : apex.jQuery(_self.callbacks.setFocusTo) : apex.jQuery("#" + _self.id, apex.gPageContext$), lSetFocusTo$.focus()
	}

	function setStyle(pPropertyName, pPropertyValue) {
		var lSetStyleTo$;
		lSetStyleTo$ = "setStyleTo" in _self.callbacks ? apex.jQuery.isFunction(_self.callbacks.setStyleTo) ? _self.callbacks.setStyleTo.call(_self) : apex.jQuery(_self.callbacks.setStyleTo) : apex.jQuery("#" + _self.id, apex.gPageContext$), lSetStyleTo$.css(pPropertyName, pPropertyValue), _self.afterModify()
	}

	function afterModify() {
		apex.jQuery.isFunction(_self.callbacks.afterModify) && _self.callbacks.afterModify.call(_self)
	}

	function loadingIndicator(pLoadingIndicator$) {
		var lLoadingIndicator$;
		return "loadingIndicator" in _self.callbacks && apex.jQuery.isFunction(_self.callbacks.loadingIndicator) && (lLoadingIndicator$ = _self.callbacks.loadingIndicator.call(_self, pLoadingIndicator$)), lLoadingIndicator$
	}
	if (!(this instanceof arguments.callee)) return new apex.item(pNd, pCallbacks);
	var _self = this;
	this.node = !1, this.item_type = !1, this.id = !1, this.getValue = getValue, this.init = init, this.setValue = setValue, this.isEmpty = isEmpty, this.enable = enable, this.disable = disable, this.show = show, this.hide = hide, this.addValue = addValue, this.removeValue = removeValue, this.setFocus = setFocus, this.setStyle = setStyle, this.afterModify = afterModify, this.loadingIndicator = loadingIndicator, this.callbacks = pCallbacks ? pCallbacks : {}, this.init(pNd)
};

function $d_LOV_from_JSON() {
	function create(pThis, pJSON, pType, pId, pCheckedValue, pForceNewLine) {
		var myObject = $u_eval("(" + pJSON + ")");
		if ("SHUTTLE" == that.l_Type) {
			var lvar = '<table cellspacing="0" cellpadding="0" border="0" class="ajax_shuttle" summary=""><tbody><tr><td class="shuttleSelect1" id="shuttle1"></td><td align="center" class="shuttleControl"><img title="Reset" alt="Reset" onclick="g_Shuttlep_v01.reset();" src="/i/htmldb/icons/shuttle_reload.png"/><img title="Move All" alt="Move All" onclick="g_Shuttlep_v01.move_all();" src="/i/htmldb/icons/shuttle_last.png"/><img title="Move" alt="Move" onclick="g_Shuttlep_v01.move();" src="/i/htmldb/icons/shuttle_right.png"/><img title="Remove" alt="Remove" onclick="g_Shuttlep_v01.remove();" src="/i/htmldb/icons/shuttle_left.png"/><img title="Remove All" alt="Remove All" onclick="g_Shuttlep_v01.remove_all();" src="/i/htmldb/icons/shuttle_first.png"/></td><td class="shuttleSelect2" id="shuttle2"></td><td class="shuttleSort2"><img title="Top" alt="Top" onclick="g_Shuttlep_v01.sort2(\'T\');" src="/i/htmldb/icons/shuttle_top.png"/><img title="Up" alt="Up" onclick="g_Shuttlep_v01.sort2(\'U\');" src="/i/htmldb/icons/shuttle_up.png"/><img title="Down" alt="Down" onclick="g_Shuttlep_v01.sort2(\'D\');" src="/i/htmldb/icons/shuttle_down.png"/><img title="Bottom" alt="Bottom" onclick="g_Shuttlep_v01.sort2(\'B\');" src="/i/htmldb/icons/shuttle_bottom.png"/></td></tr></tbody></table>';
			$x(pThis).innerHTML = lvar;
			var lSelect = $dom_AddTag("shuttle1", "select"),
				lSelect2 = $dom_AddTag("shuttle2", "select");
			lSelect.multiple = !0, lSelect2.multiple = !0;
			for (var i = 0, len = myObject.row.length; len > i; i++)
				if (myObject.row[i]) {
					var lTest = myObject.row[i].C ? parseInt(myObject.row[i].C) : !1;
					if (lTest) var lOption = $dom_AddTag(lSelect2, "option");
					else var lOption = $dom_AddTag(lSelect, "option");
					lOption.text = myObject.row[i].D, lOption.value = myObject.row[i].R
				}
			if (window.g_Shuttlep_v01 = null, !flowSelectArray) var flowSelectArray = [];
			return flowSelectArray[2] = lSelect, flowSelectArray[1] = lSelect2, window.g_Shuttlep_v01 = new dhtml_ShuttleObject(lSelect, lSelect2), window.g_Shuttlep_v01
		}
		if ("SELECT" == that.l_Type || "MULTISELECT" == that.l_Type) {
			for (var lSelect = $dom_AddTag(pThis, "select"), i = 0, len = myObject.row.length; len > i; i++)
				if (myObject.row[i]) {
					var lOption = $dom_AddTag(lSelect, "option");
					lOption.text = myObject.row[i].D, lOption.value = myObject.row[i].R;
					var lTest = parseInt(myObject.row[i].C);
					lOption.selected = lTest
				}
			return that.l_Dom = lSelect, that
		}
		if ("RADIO" == that.l_Type) {
			for (var ltable = $dom_AddTag(pThis, "table"), i = 0, len = myObject.row.length; len > i; i++)
				if (myObject.row[i]) {
					(i % 10 == 0 || pForceNewLine) && (lrow = $dom_AddTag(ltable, "tr"));
					var lTd = $dom_AddTag(lrow, "td"),
						lTest = !1;
					pCheckedValue && pCheckedValue == myObject.row[i].R && (lTest = !0);
					var lCheck = $dom_AddInput(lTd, "radio", myObject.row[i].R);
					lCheck.checked = lTest, $dom_AddTag(lTd, "span", myObject.row[i].D)
				}
			return that.l_Dom = lSelect, that
		}
		if ("CHECKBOX" == that.l_Type) {
			for (var ltable = $dom_AddTag(pThis, "table"), i = 0, len = myObject.row.length; len > i; i++)
				if (myObject.row[i]) {
					(i % 10 == 0 || pForceNewLine) && (lrow = $dom_AddTag(ltable, "tr"));
					var lTd = $dom_AddTag(lrow, "td"),
						lTest = parseInt(myObject.row[i].C),
						lCheck = $dom_AddInput(lTd, "checkbox", myObject.row[i].R);
					lCheck.checked = lTest, $dom_AddTag(lTd, "span", myObject.row[i].D)
				}
			return that.l_Dom = lSelect, that
		}
		for (var lHolder = $dom_AddTag(pThis, "div"), i = 0, len = myObject.row.length; len > i; i++)
			if (myObject.row[i] && myObject.row[i].R) {
				var l_D = myObject.row[i].D ? myObject.row[i].D : myObject.row[i].R,
					lThis = $dom_AddTag(lHolder, that.l_Type.toUpperCase(), l_D);
				that.l_NewEls[that.l_NewEls.length] = lThis, lThis.id = myObject.row[i].R;
				var lTest = parseInt(myObject.row[i].C);
				lTest && (lThis.className = "checked")
			}
		return that.l_Dom = lHolder, that
	}
	var that = this;
	this.l_Type = !1, this.l_Json = !1, this.l_This = !1, this.l_JSON = !1, this.l_Id = "json_temp", this.l_NewEls = [], this.create = create, this.l_Dom = !1
}

function item_menu(pThis, pColumn) {
	$x_Style("item_menu", "position", "absolute");
	for (var lA = $x("item_menu").getElementsByTagName("a"), i = 0, len = lA.length; len > i; i++) {
		var lHref = lA[i].href;
		lHref = lHref.split(":"), lHref[lHref.length - 1] = pColumn, lA[i].href = $u_ArrayToString(lHref, ":")
	}
	dhtml_ButtonDropDown(pThis, "item_menu"), $x_Show("item_menu")
}

function doMultiple(pNd, pMode) {
	pNd = $u_Carray(pNd);
	for (var i = 0; i < pNd.length; i++) {
		var node = $x(pNd[i]);
		apex.item(node)[pMode]()
	}
	return $u_Narray(pNd)
}

function base_disableItem(pNd, pTest) {
	pTest = !!pTest, $x(pNd) && (pNd = [pNd]);
	for (var i = 0, len = pNd.length; len > i; i++) {
		var node = $x_object(pNd[i]);
		if (node) {
			var l_Dom_Node = node.node;
			"RADIO_GROUP" == node.item_type || "CHECKBOX_GROUP" == node.item_type ? (l_Dom_Node = $x_FormItems(l_Dom_Node, "RADIO_GROUP" == node.item_type ? "RADIO" : "CHECKBOX"), base_disableItem(l_Dom_Node, pTest)) : "radio" == l_Dom_Node.type || "checkbox" == l_Dom_Node.type ? (apex.jQuery(l_Dom_Node).toggleClass("apex_disabled_multi", pTest), l_Dom_Node.disabled = pTest) : (apex.jQuery(l_Dom_Node).toggleClass("apex_disabled", pTest), l_Dom_Node.disabled = pTest)
		}
	}
	return 1 == pNd.length && (pNd = pNd[0]), pNd
}

function htmldb_Get(obj, flow, req, page, instance, proc, queryString) {
	function setNode(id) {
		this.node = $x(id)
	}

	function replaceNode(newNode) {
		var i = 0;
		for (i = this.node.childNodes.length - 1; i >= 0; i--) this.node.removeChild(this.node.childNodes[i]);
		this.node.appendChild(newNode)
	}
	this.obj = $x(obj), this.proc = proc ? proc : "wwv_flow.show", this.flow = flow ? flow : $v("pFlowId"), this.request = req ? req : "", this.page = page ? page : "0", this.queryString = queryString ? queryString : null, this.params = "", this.response = "", this.base = null, this.syncMode = !1, this.addParam = htmldb_Get_addParam, this.add = htmldb_Get_addItem, this.getPartial = htmldb_Get_trimPartialPage, this.getFull = function(obj) {
		var result, node;
		return obj && (this.obj = $x(obj)), this.obj && ("INPUT" == this.obj.nodeName ? this.obj.value = this.response : document.all ? (result = this.response, node = this.obj, setTimeout(function() {
			htmldb_get_WriteResult(node, result)
		}, 100)) : $s(this.obj, this.response)), this.response
	}, this.get = function(mode, startTag, endTag) {
		var p;
		try {
			p = new XMLHttpRequest
		} catch (e) {
			p = new ActiveXObject("Msxml2.XMLHTTP")
		}
		try {
			{
				new Date
			}
			return p.open("POST", this.base, this.syncMode), p.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), p.send(null == this.queryString ? this.params : this.queryString), this.response = p.responseText, this.node && this.replaceNode(p.responseXML), null == mode || "PPR" == mode ? this.getPartial(startTag, endTag) : "XML" == mode ? p.responseXML : this.getFull()
		} catch (e) {
			return
		}
	}, this.url = htmldb_Get_getUrl, this.escape = htmldb_Get_escape, this.clear = htmldb_Get_clear, this.sync = htmldb_Get_sync, this.setNode = setNode, this.replaceNode = replaceNode;
	var u = window.location.href.indexOf("?") > 0 ? window.location.href.substring(0, window.location.href.indexOf("?")) : window.location.href;
	this.base = u.substring(0, u.lastIndexOf("/")), this.proc || (this.proc = u.substring(u.lastIndexOf("/") + 1)), this.base = this.base + "/" + this.proc, this.instance = null == instance || "" == instance ? $v("pInstance") : instance, queryString || (this.addParam("p_request", this.request), this.addParam("p_instance", this.instance), this.addParam("p_flow_id", this.flow), this.addParam("p_flow_step_id", this.page))
}

function htmldb_Get_sync(s) {
	this.syncMode = s
}

function htmldb_Get_clear(val) {
	this.addParam("p_clear_cache", val)
}

function htmldb_Get_getUrl() {
	return null == this.queryString ? this.base + "?" + this.params : this.queryString
}

function htmldb_Get_escape(val) {
	return val += "", val = val.replace(/\%/g, "%25"), val = val.replace(/\+/g, "%2B"), val = val.replace(/\ /g, "%20"), val = val.replace(/\./g, "%2E"), val = val.replace(/\*/g, "%2A"), val = val.replace(/\?/g, "%3F"), val = val.replace(/\\/g, "%5C"), val = val.replace(/\//g, "%2F"), val = val.replace(/\>/g, "%3E"), val = val.replace(/\</g, "%3C"), val = val.replace(/\{/g, "%7B"), val = val.replace(/\}/g, "%7D"), val = val.replace(/\~/g, "%7E"), val = val.replace(/\[/g, "%5B"), val = val.replace(/\]/g, "%5D"), val = val.replace(/\`/g, "%60"), val = val.replace(/\;/g, "%3B"), val = val.replace(/\?/g, "%3F"), val = val.replace(/\@/g, "%40"), val = val.replace(/\&/g, "%26"), val = val.replace(/\#/g, "%23"), val = val.replace(/\|/g, "%7C"), val = val.replace(/\^/g, "%5E"), val = val.replace(/\:/g, "%3A"), val = val.replace(/\=/g, "%3D"), val = val.replace(/\$/g, "%24")
}

function htmldb_Get_addParam(name, val) {
	this.params = "" == this.params ? name + "=" + (null != val ? this.escape(val) : "") : this.params + "&" + name + "=" + (null != val ? this.escape(val) : "")
}

function htmldb_Get_addItem(name, value) {
	this.addParam("p_arg_names", name), this.addParam("p_arg_values", value)
}

function htmldb_Get_trimPartialPage(startTag, endTag, obj) {
	obj && (this.obj = $x(obj)), startTag || (startTag = "<!--START-->"), endTag || (endTag = "<!--END-->");
	var result, node, start = this.response.indexOf(startTag);
	if (start > 0) {
		this.response = this.response.substring(start + startTag.length);
		var end = this.response.indexOf(endTag);
		this.response = this.response.substring(0, end)
	}
	return this.obj && (document.all ? (result = this.response, node = this.obj, setTimeout(function() {
		htmldb_get_WriteResult(node, result)
	}, 100)) : $s(this.obj, this.response)), this.response
}

function htmldb_get_WriteResult(node, result) {
	$s(node, result)
}

function htmldb_ExternalPost(pThis, pRegion, pPostUrl) {
	var pURL = "f?p=" + $x("pFlowId").value + ":" + $x("pFlowStepId").value + ":" + $x("pInstance").value + ":FLOW_FOP_OUTPUT_R" + pRegion;
	document.body.innerHTML = document.body.innerHTML + '<div style="display:none;" id="dbaseSecondForm"><form id="xmlFormPost" action="' + pPostUrl + '?ie=.pdf" method="post" target="pdf"><textarea name="vXML" id="vXML" style="width:500px;height:500px;"></textarea></form></div>';
	var l_El = $x("vXML"),
		get = new htmldb_Get(l_El, null, null, null, null, "f", pURL.substring(2));
	get.get(), get = null, setTimeout('$x("xmlFormPost").submit()', 10)
}

function $xml_Control(pThis) {
	function _CloneAndPlace(pThis, pThat) {
		var lThat = $x(pThat);
		if (document.all) {
			this.xsl_processor.addParameter("xpath", pThis), this.xsl_processor.input = this.xml, this.xsl_processor.transform;
			var newFragment = this.xsl_processor.output
		} else {
			this.xsl_processor.setParameter(null, "xpath", pThis);
			var newFragment = this.xsl_processor.transformToFragment(this.xml, this.ownerDocument)
		}
		return lThat ? (ie ? $s(lThat, newFragment) : ($s(lThat, ""), lThat.appendChild(newFragment)), newFragment) : void 0
	}
	this.xsl_string = '<?xml version="1.0"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:output method="html"/><xsl:param name="xpath" /><xsl:template match="/"><xsl:copy-of select="//*[@id=$xpath]"/></xsl:template></xsl:stylesheet>', document.all ? (this.xsl_object = new ActiveXObject("Msxml2.FreeThreadedDOMDocument.3.0"), this.xsl_object.async = !1, this.xsl_object.loadXML(this.xsl_string), tmp = new ActiveXObject("Msxml2.XSLTemplate.3.0"), tmp.stylesheet = this.xsl_object, this.xsl_processor = tmp.createProcessor()) : (this.xsl_object = (new DOMParser).parseFromString(this.xsl_string, "text/xml"), this.xsl_processor = new XSLTProcessor, this.xsl_processor.importStylesheet(this.xsl_object), this.ownerDocument = document.implementation.createDocument("", "test", null)), this.xml = pThis, this.CloneAndPlace = _CloneAndPlace
}

function $a_PostClob(pThis, pRequest, pPage, pReturnFunction) {
	var get = new htmldb_Get(null, $v("pFlowId"), pRequest, pPage, null, "wwv_flow.accept");
	get.AddArrayClob($x(pThis).value, 1), get.GetAsync(pReturnFunction), get = null
}

function $a_GetClob(pRequest, pPage, pReturnFunction) {
	var get = new htmldb_Get(null, $v("pFlowId"), pRequest, pPage, null, "wwv_flow.accept");
	get.GetAsync(pReturnFunction), get = null, x = null
}

function $s_Split(pString, pLength) {
	var lArray = [];
	if (pString.length <= pLength) lArray[lArray.length] = pString;
	else {
		for (; pString.length > 4e3;) lArray[lArray.length] = pString.substr(0, 4e3), pString = pString.substr(4e3, pString.length - 4e3);
		lArray[lArray.length] = pString.substr(0, 4e3)
	}
	return lArray
}

function json_SetItems(gReturn) {
	gReturn = eval("(" + gReturn + ")");
	for (var j = 0, len = gReturn.item.length; len > j; j++) apex.item(gReturn.item[j].id).setValue(gReturn.item[j].value)
}

function $x(pNd) {
	return apex.item(pNd).node
}

function $x_object(pNd) {
	return apex.item(pNd)
}

function $v(pNd) {
	var lValue = apex.item(pNd).getValue();
	return apex.jQuery.isArray(lValue) ? lValue.join(":") : lValue
}

function $v2(pNd) {
	return apex.item(pNd).getValue()
}

function $s(pNd, pValue, pDisplayValue, pSuppressChangeEvent) {
	return apex.item(pNd).setValue(pValue, pDisplayValue, pSuppressChangeEvent)
}

function $u_Carray(pNd) {
	return $x(pNd) ? [pNd] : pNd
}

function $u_Narray(pNd) {
	return 1 == pNd.length ? pNd[0] : pNd
}

function $nvl(pTest, pDefault) {
	return null != pTest ? pTest : pDefault ? pDefault : ""
}

function $x_Check_For_Compound(pNd) {
	var lNode = $x(pNd);
	return lNode && $x(lNode.id + "_fieldset") ? $x(lNode.id + "_fieldset") : lNode
}

function $x_Style(pNd, pStyle, pString) {
	pNd = $u_Carray(pNd);
	for (var i = 0; i < pNd.length; i++) {
		var node = $x(pNd[i]);
		node ? node.style[pStyle] = pString : null
	}
	return $u_Narray(pNd)
}

function $x_Hide(pNd) {
	return doMultiple(pNd, "hide")
}

function $x_Show(pNd) {
	return doMultiple(pNd, "show")
}

function $x_Show_Hide(pShow, pHide) {
	$x_Hide(pHide), $x_Show(pShow)
}

function $x_Toggle(pNd) {
	var id, node, testNode;
	pNd = $u_Carray(pNd);
	for (var i = 0; i < pNd.length; i++) node = $x(pNd[i]), "string" == typeof pNd[i] ? id = pNd[i] : pNd[i].id && (id = pNd[i].id), id && (testNode = apex.jQuery("#" + id + "_CONTAINER").get(0), testNode || (testNode = apex.jQuery("#" + id + "_DISPLAY").get(0))), testNode || (testNode = node), node && (0 === apex.jQuery(testNode).filter(":visible").length ? $x_Show(node) : $x_Hide(node));
	return $u_Narray(pNd)
}

function $x_Remove(pNd) {
	pNd = $u_Carray(pNd);
	for (var i = 0, len = pNd.length; len > i; i++) {
		var node = $x(pNd[i]),
			lParent = node.parentNode;
		node && lParent && (lParent.removeChild(node), lParent.normalize())
	}
	return $u_Narray(pNd)
}

function $x_Value(pNd, pValue) {
	pNd = $u_Carray(pNd);
	for (var j = 0, len = pNd.length; len > j; j++) {
		var lTemp = $item(pNd[j]);
		lTemp.setValue(pValue)
	}
}

function $x_UpTill(pNd, pToTag, pToClass) {
	var node = $x(pNd);
	if (node) {
		var tPar = node.parentNode;
		if (pToClass)
			for (; tPar && (tPar.nodeName != pToTag || !apex.jQuery(tPar).hasClass(pToClass));) tPar = tPar.parentNode;
		else
			for (; tPar && tPar.nodeName != pToTag;) tPar = tPar.parentNode;
		return tPar || !1
	}
	return !1
}

function $x_ItemRow(pNd, pFunc) {
	var node, lTr;
	pNd = $u_Carray(pNd);
	for (var i = 0; i < pNd.length; i++)
		if (node = $x_Check_For_Compound(pNd[i]), lTr = $x_UpTill(node, "TR")) switch (pFunc) {
			case "TOGGLE":
				$x_Toggle(lTr);
				break;
			case "SHOW":
				$x_Show(lTr);
				break;
			case "HIDE":
				$x_Hide(lTr)
		}
}

function $x_HideItemRow(pNd) {
	$x_ItemRow(pNd, "HIDE")
}

function $x_ShowItemRow(pNd) {
	$x_ItemRow(pNd, "SHOW")
}

function $x_ToggleItemRow(pNd) {
	$x_ItemRow(pNd, "TOGGLE")
}

function $x_HideAllExcept(pNd, pNdArray) {
	var l_Node = $x(pNd);
	return l_Node && ($x_Hide(pNdArray), $x_Show(l_Node)), l_Node
}

function $x_HideSiblings(pNd) {
	var lNode = apex.jQuery($x(pNd));
	return lNode.show().siblings().hide().get()
}

function $x_ShowSiblings(pNd) {
	var lNode = apex.jQuery($x(pNd));
	return lNode.show().siblings().show().get()
}

function $x_Class(pNd, pClass) {
	$x(pNd) && (pNd = [pNd]);
	for (var l = pNd.length, i = 0; l > i; i++) $x(pNd[i]) && ($x(pNd[i]).className = pClass);
	return $u_Narray(pNd)
}

function $x_SetSiblingsClass(pNd, pClass, pNdClass) {
	var l_Node = apex.jQuery($x(pNd));
	return l_Node.siblings().removeClass("").addClass(pClass), pNdClass && l_Node.removeClass("").addClass(pNdClass), l_Node.get()
}

function $x_ByClass(pClass, pNd, pTag) {
	var lClass = pTag ? pTag + "." + pClass : "." + pClass;
	return apex.jQuery(lClass, $x(pNd)).get()
}

function $x_ShowAllByClass(pNd, pClass, pTag) {
	lClass = pTag ? pTag + "." + pClass : "." + pClass, apex.jQuery(lClass, $x(pNd)).show()
}

function $x_ShowChildren(pNd) {
	apex.jQuery($x(pNd)).children().show()
}

function $x_HideChildren(pNd) {
	apex.jQuery($x(pNd)).children().hide()
}

function $x_disableItem(pNd, pTest) {
	var lMode = pTest ? "disable" : "enable";
	return doMultiple(pNd, lMode)
}

function $f_get_emptys(pNd, pClassFail, pClass) {
	var l_temp = [],
		l_temp2 = [];
	$x(pNd) && (pNd = [pNd]);
	for (var i = 0, len = pNd.length; len > i; i++) {
		var node = $x(pNd[i]);
		node && (apex.item(node).isEmpty() ? l_temp[l_temp.length] = node : l_temp2[l_temp2.length] = node)
	}
	return pClassFail && $x_Class(l_temp, pClassFail), pClass && $x_Class(l_temp2, pClass), 0 === l_temp.length ? l_temp = !1 : l_temp[0].focus(), l_temp
}

function $v_Array(pNd) {
	return apex.jQuery.makeArray(apex.item(pNd).getValue())
}

function $f_ReturnChecked(pNd) {
	return $x(pNd) ? $v_Array(pNd) : !1
}

function $d_ClearAndHide(pNd) {
	$x(pNd) && (pNd = [pNd]);
	for (var i = 0, len = pNd.length; len > i; i++) {
		var lNode = $x(pNd[i]);
		lNode && ($x_Hide(lNode).innerHTML = "")
	}
}

function $f_SelectedOptions(pNd) {
	var lSelect = $x(pNd),
		lValue = [];
	if ("SELECT" == lSelect.nodeName) {
		for (var lOpts = lSelect.options, i = 0, len = lOpts.length; len > i; i++) lOpts[i].selected && (lValue[lValue.length] = lOpts[i]);
		return $u_Narray(lValue)
	}
	return !1
}

function $f_SelectValue(pNd) {
	var lValue = $v_Array(pNd);
	return $u_Narray(lValue)
}

function $u_ArrayToString(pArray, pDelim) {
	var lReturn = "";
	pDelim && (pDelim = ":"), pArray = $u_Carray(pArray);
	for (var i = 0, len = pArray.length; len > i; i++) lReturn += pArray[i] ? pArray[i] + pDelim : "" + pDelim;
	return lReturn.substr(0, lReturn.length - 1)
}

function $v_CheckValueAgainst(pThis, pValue) {
	var lTest = !1,
		lArray = [],
		lValue = !1;
	pValue.constructor == Array ? lArray = pValue : lArray[0] = pValue, lValue = $v(pThis);
	for (var i = 0, len = lArray.length; len > i && !(lTest = lValue == lArray[i]); i++);
	return lTest
}

function $f_Hide_On_Value_Item(pThis, pThat, pValue) {
	var lTest = $v_CheckValueAgainst(pThis, pValue);
	return lTest ? $x_Hide(pThat) : $x_Show(pThat), lTest
}

function $f_Show_On_Value_Item(pThis, pThat, pValue) {
	var lTest = $v_CheckValueAgainst(pThis, pValue);
	return lTest ? $x_Show(pThat) : $x_Hide(pThat), lTest
}

function $f_Hide_On_Value_Item_Row(pThis, pThat, pValue) {
	var lTest = $v_CheckValueAgainst(pThis, pValue);
	return lTest ? $x_HideItemRow(pThat) : $x_ShowItemRow(pThat), lTest
}

function $f_Show_On_Value_Item_Row(pThis, pThat, pValue) {
	var lTest = $v_CheckValueAgainst(pThis, pValue);
	return lTest ? $x_ShowItemRow(pThat) : $x_HideItemRow(pThat), lTest
}

function $f_DisableOnValue(pThis, pValue, pThat) {
	var lTest = $v_CheckValueAgainst(pThis, pValue),
		lNd = [];
	if (pThat) {
		if (pThat instanceof Array) lNd = pThat;
		else
			for (var i = 2; i < arguments.length; i++) arguments[i] && (lNd[lNd.length] = arguments[i]);
		$x_disableItem(lNd, lTest)
	}
	return lTest
}

function $x_ClassByClass(pNd, pClass, pTag, pClass2) {
	var l_Els = $x_ByClass(pClass, pNd, pTag);
	return $x_Class(l_Els, pClass2), l_Els
}

function $f_ValuesToArray(pThis, pClass, pTag) {
	for (var lTemp = $x_ByClass(pClass, pThis, pTag), lArray = [], i = 0, len = lTemp.length; len > i; i++) lArray[i] = lTemp[i].value;
	return lArray
}

function $dom_JoinNodeLists(pThis, pThat) {
	var i, len, lArray = [];
	for (i = 0, len = pThis.length; len > i; i++) lArray[i] = pThis[i];
	for (i = 0, len = pThat.length; len > i; i++) lArray[lArray.length] = pThat[i];
	return lArray
}

function $x_FormItems(pNd, pType) {
	var lType = pType ? pType.toUpperCase() : "ALL",
		l_Inputs = [],
		l_Array = [],
		l_This = $x(pNd);
	if (l_This) {
		if ("SELECT" == l_This.nodeName || "INPUT" == l_This.nodeName || "TEXTAREA" == l_This.nodeName) return [l_This];
		if (l_Selects = l_This.getElementsByTagName("SELECT"), l_Inputs = l_This.getElementsByTagName("INPUT"), l_Textarea = l_This.getElementsByTagName("TEXTAREA"), l_Fieldset = l_This.getElementsByTagName("FIELDSET"), "SELECT" == lType ? l_Inputs = l_Selects : "TEXTAREA" == lType ? l_Inputs = l_Textarea : "ALL" == lType && (l_Inputs = $dom_JoinNodeLists(l_Inputs, l_Fieldset), l_Inputs = $dom_JoinNodeLists(l_Inputs, l_Selects), l_Inputs = $dom_JoinNodeLists(l_Inputs, l_Textarea)), "SELECT" == lType || "TEXTAREA" == lType || "ALL" == lType) l_Array = l_Inputs;
		else
			for (var i = 0; i < l_Inputs.length; i++) l_Inputs[i].type.toUpperCase() == pType.toUpperCase() && (l_Array[l_Array.length] = l_Inputs[i]);
		return l_Array
	}
}

function $f_CheckAll(pThis, pCheck, pArray) {
	var l_Inputs;
	l_Inputs = pArray ? pArray : $x_FormItems(pThis, "CHECKBOX");
	for (var i = 0, l = l_Inputs.length; l > i; i++) l_Inputs[i].checked = pCheck
}

function $f_CheckFirstColumn(pNd) {
	for (var lTable = $x_UpTill(pNd, "TABLE"), lArray = [], i = 0, len = lTable.rows.length; len > i; i++) {
		var l_Temp = $x_FormItems(lTable.rows[i], "CHECKBOX")[0];
		l_Temp && (lArray[lArray.length] = l_Temp)
	}
	return $f_CheckAll(!1, pNd.checked, lArray), lArray
}

function $x_ToggleWithImage(pThis, pNd) {
	pThis = $x(pThis), $x_CheckImageSrc(pThis, "plus") ? ($x_Class(pThis, gToggleWithImageI), pThis.src = html_StringReplace(pThis.src, "plus", "minus")) : ($x_Class(pThis, gToggleWithImageA), pThis.src = html_StringReplace(pThis.src, "minus", "plus"));
	var node = $x_Toggle(pNd);
	return node
}

function $x_SwitchImageSrc(pNd, pSearch, pReplace) {
	var lEl = $x(pNd);
	return lEl && "IMG" == lEl.nodeName && -1 != lEl.src.indexOf(pSearch) && (lEl.src = pReplace), lEl
}

function $x_CheckImageSrc(pNd, pSearch) {
	var lEL = $x(pNd),
		lReturn = !1;
	return lEL && "IMG" == lEL.nodeName && (lReturn = $u_SubString(lEL.src, pSearch)), lReturn
}

function $u_SubString(pText, pMatch) {
	return -1 != pText.toString().indexOf(pMatch.toString())
}

function html_RemoveAllChildren(pNd) {
	var lEl = $x(pNd);
	if (lEl && lEl.hasChildNodes && lEl.removeChild)
		for (; lEl.hasChildNodes();) lEl.removeChild(lEl.firstChild)
}

function ajax_Loading(pState) {
	1 == pState ? $x_Show("loader", "wait") : $x_Hide("loader")
}

function html_SetSelectValue(pId, pValue) {
	var lSelect = $x(pId);
	if ("SELECT" == lSelect.nodeName) {
		lSelect.selectedIndex = 0;
		for (var i = 0, l = lSelect.options.length; l > i; i++) lSelect.options[i].value == pValue && (lSelect.options[i].selected = !0)
	}
}

function addLoadEvent(pFunction) {
	apex.jQuery(document).ready(pFunction)
}

function $f_Swap(pThis, pThat) {
	var lThis = $x(pThis);
	lThat = $x(pThat), pThis && pThat && ($x_Value(pThis, lThat.value), $x_Value(pThat, lThis.value))
}

function $f_Enter(e) {
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else {
		if (!e) return !1;
		keycode = e.which
	}
	return 13 == keycode ? !0 : !1
}

function $f_SetValueSequence(pArray, pMultiple) {
	for (var lLength = pArray.length, i = 0; lLength > i; i++) $x_Value(pArray[i], (i + 1) * pMultiple)
}

function $dom_AddTag(pThis, pTag, pText) {
	var lThis = document.createElement(pTag),
		lThat = $x(pThis);
	return lThat && lThat.appendChild(lThis), null != pText && (lThis.innerHTML = pText), lThis
}

function $tr_AddTD(pThis, pText) {
	return $dom_AddTag($x(pThis), "TD", pText)
}

function $tr_AddTH(pThis, pText) {
	return $dom_AddTag($x(pThis), "TH", pText)
}

function $dom_Replace(pThis, pThat) {
	var lThis = $x(pThis),
		lParent = lThis.parentNode;
	return lThat = $dom_AddTag(lParent, pThat), lParent.replaceChild(lThat, lThis)
}

function $dom_AddInput(pThis, pType, pId, pName, pValue) {
	var lThis = $dom_AddTag(!1, "INPUT");
	return lThis.type = pType ? pType : "text", lThis.id = pId ? pId : "", lThis.name = pName ? pName : "", lThis.value = pValue ? pValue : "", pThis && $x(pThis).appendChild(lThis), lThis
}

function $dom_MakeParent(pThis, p_Parent) {
	var l_Node = $x(pThis),
		l_Parent = $x(p_Parent);
	return l_Node && l_Parent && l_Node.parentNode != l_Parent && l_Parent.appendChild(l_Node), l_Node
}

function $x_RowHighlight(pThis, pColor) {
	var lThis = $x(pThis);
	lThis && $x_Style(lThis.getElementsByTagName("TD"), "backgroundColor", pColor), gCurrentRow = lThis
}

function $x_RowHighlightOff(pThis) {
	var lThis = $x(pThis);
	lThis && $x_Style(lThis.getElementsByTagName("TD"), "backgroundColor", "")
}

function $v_Upper(pId) {
	var obj = $x(pId);
	obj && (obj.value = obj.value.toUpperCase())
}

function $d_Find(pThis, pString, pTags) {
	if (pTags || (pTags = "DIV"), pThis = $x(pThis)) {
		var d = pThis.getElementsByTagName(pTags);
		pThis.style.display = "none", gRegex || (gRegex = new RegExp("test")), gRegex.compile(pString, "i");
		for (var i = 0, len = d.length; len > i; i++) d[i].style.display = gRegex.test(d[i].innerHTML) ? "block" : "none";
		pThis.style.display = "block"
	}
}

function $f_First_field(pNd) {
	var lThis = $x(pNd);
	try {
		return lThis && ("hidden" == lThis.type || lThis.disabled || lThis.focus()), !0
	} catch (e) {}
}

function html_StringReplace(string, text, by) {
	by || (by = "");
	var strLength = string.length,
		txtLength = text.length;
	if (0 === strLength || 0 === txtLength) return string;
	var i = string.indexOf(text);
	if (!i && text != string.substring(0, txtLength)) return string;
	if (-1 == i) return string;
	var newstr = string.substring(0, i) + by;
	return strLength > i + txtLength && (newstr += html_StringReplace(string.substring(i + txtLength, strLength), text, by)), newstr
}

function getScrollXY() {
	var scrOfX = 0,
		scrOfY = 0;
	return "number" == typeof window.pageYOffset ? (scrOfY = window.pageYOffset, scrOfX = window.pageXOffset) : document.body && (document.body.scrollLeft || document.body.scrollTop) ? (scrOfY = document.body.scrollTop, scrOfX = document.body.scrollLeft) : document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop) && (scrOfY = document.documentElement.scrollTop, scrOfX = document.documentElement.scrollLeft), [scrOfX, scrOfY]
}

function html_GetTarget(e) {
	var targ;
	return e || (e = window.event), e.target ? targ = e.target : e.srcElement && (targ = e.srcElement), 3 == targ.nodeType && (targ = targ.parentNode), targ
}

function findPosX(obj) {
	var lEl = $x(obj),
		curleft = 0;
	if (lEl.x) return lEl.x;
	if (lEl.offsetParent)
		for (; lEl.offsetParent;) {
			if (lEl.style.left) return curleft += parseInt(lEl.style.left.substring(0, lEl.style.left.length - 2), 10);
			curleft += lEl.offsetLeft, lEl = lEl.offsetParent
		}
	return curleft
}

function findPosY(obj) {
	var lEl = $x(obj),
		curtop = 0;
	if (lEl.y) return lEl.y;
	if (lEl.offsetParent)
		for (; lEl.offsetParent;) {
			if (lEl.style.top) return curtop += parseInt(lEl.style.top.substring(0, lEl.style.top.length - 2), 10);
			curtop += lEl.offsetTop, lEl = lEl.offsetParent
		}
	return curtop
}

function $u_eval(pThis) {
	return eval(pThis)
}

function setSelectionRange(input, selectionStart, selectionEnd) {
	var lInputLength;
	if (input.setSelectionRange) lInputLength = input.value.length, selectionStart > lInputLength && (selectionStart = lInputLength), selectionEnd > lInputLength && (selectionEnd = lInputLength), input.focus(), input.setSelectionRange(selectionStart, selectionEnd);
	else if (input.createTextRange) {
		var range = input.createTextRange();
		range.collapse(!0), range.moveEnd("character", selectionEnd), range.moveStart("character", selectionStart), range.select()
	}
}

function setCaretToPos(input, pos) {
	setSelectionRange(input, pos, pos)
}

function html_ReturnToTextSelection(pText, pThis, pNoSpace) {
	var cmd = $x(pThis),
		lSpace = apex.item(cmd).isEmpty() || pNoSpace ? "" : " ";
	if (document.selection) {
		cmd.focus();
		var sel = document.selection,
			rng = sel.createRange();
		rng.text = rng.text + lSpace + pText
	} else start = cmd.selectionStart, end = cmd.selectionEnd, cmd.value = cmd.value.slice(0, start) + lSpace + pText + cmd.value.slice(end, cmd.value.length), cmd.focus(), setCaretToPos(cmd, end + (pText.length + 2))
}

function setCaretToEnd(input) {
	setSelectionRange(input, input.value.length, input.value.length)
}

function setCaretToBegin(input) {
	setSelectionRange(input, 0, 0)
}

function selectString(input, string) {
	var match = new RegExp(string, "i").exec(input.value);
	match && setSelectionRange(input, match.index, match.index + match[0].length)
}

function ob_PPR_TAB(l_URL) {
	top.gLastTab = l_URL; {
		var lBody = document.body,
			http = new htmldb_Get(lBody, null, null, null, null, "f", l_URL.substring(2));
		http.get(null, '<body  style="padding:10px;">', "</body>")
	}
	if (get = null, document.all) {
		var ie_HACK = "window.parent.obFrameSize()";
		setTimeout(ie_HACK, 100)
	} else window.parent.obFrameSize()
}

function flowSelectAll() {
	var theList, lListLength, i;
	if ("undefined" == typeof flowSelectArray) return !0;
	for (var a = 0, len = flowSelectArray.length; len > a; a++) {
		for (theList = $x(flowSelectArray[a]), lListLength = theList.length, i = 0; lListLength - 1 >= i; i++) theList.options[i].selected = !1;
		for (i = 0; lListLength - 1 >= i; i++) theList.options[i].selected = !0
	}
	return !0
}

function quickLinks(pWhat) {
	apex.jQuery(".eLink").toggleClass("eLinkOn"), apex.storage.setCookie("ORA_WWV_QUICK_EDIT", pWhat), $x_Toggle(["hideEdit", "showEdit"])
}

function htmldb_item_change() {
	htmldb_ch = !0
}

function htmldb_doUpdate(r) {
	htmldb_ch ? (lc_SetChange(), apex.submit(r)) : apex.submit(r)
}

function htmldb_goSubmit(r) {
	htmldb_ch ? (htmldb_ch_message && null !== htmldb_ch_message || (htmldb_ch_message = "Are you sure you want to leave this page without saving? /n Please use translatable string."), window.confirm(htmldb_ch_message) && apex.submit(r)) : apex.submit(r)
}

function $p_DatePicker(p_element_index, p_form_index, p_date_format, p_bgcolor, p_dd, p_hh, p_mi, p_pm, p_yyyy, p_lang, p_application_format, p_application_id, p_security_group_id, p_mm, p_height) {
	var w = open("wwv_flow_utilities.show_as_popup_calendar?p_element_index=" + escape(p_element_index) + "&p_form_index=" + escape(p_form_index) + "&p_date_format=" + escape(p_date_format) + "&p_bgcolor=" + escape(p_bgcolor) + "&p_dd=" + escape(p_dd) + "&p_hh=" + escape(p_hh) + "&p_mi=" + escape(p_mi) + "&p_pm=" + escape(p_pm) + "&p_yyyy=" + escape(p_yyyy) + "&p_lang=" + escape(p_lang) + "&p_application_format=" + escape(p_application_format) + "&p_application_id=" + escape(p_application_id) + "&p_security_group_id=" + escape(p_security_group_id) + "&p_mm=" + escape(p_mm), "winLov", "Scrollbars=no,resizable=yes,width=258,height=" + p_height);
	return null == w.opener && (w.opener = self), w.focus(), w
}

function confirmDelete2(p_Msg, p_Req) {
	var l_req = p_Req ? p_Req : "DELETE",
		l_msg = p_Msg ? p_Msg : "Would you like to perform this delete action?";
	confirm(l_msg) && (apex.submit(l_req), window.close())
}

function lc_SetChange() {
	gChangeCheck && (gChangeCheck.value = 1, gChangeCheck.type = "text")
}

function setValue2(id, val, errorMsg) {
	var obj = $x(id);
	obj && ($x_Value(obj, val), $v(obj) != val && alert(errorMsg))
}

function dhtml_CloseAllSubMenus(pStart) {
	var l_Start = null;
	l_Start = pStart ? pStart : 0;
	for (var i = l_Start; i <= gSubMenuArray.length; i++)
		if (gSubMenuArray[i]) {
			var l_Sm = $x_Hide(gSubMenuArray[i]);
			l_Sm && $x_Hide(l_Sm)
		}
	pStart || (gSubMenuArray.length = 0), htmldb_IE_Select_Item_Fix(!1), $gCurrentAnchorList = apex.jQuery("#" + gCurrentAppMenu).children().children().filter("a[class!=eLink]")
}

function dhtml_CloseAllSubMenusL(pThis) {
	var l_Start = parseInt($x_UpTill(pThis, "UL").getAttribute("htmldb:listlevel"), 10) + 1;
	dhtml_CloseAllSubMenus(l_Start)
}

function app_AppMenuMultiClose() {
	if (gCurrentAppMenu) {
		var lMenu = $x(gCurrentAppMenu);
		gCurrentAppMenuImage.className = g_dhtmlMenu, $x_Hide(lMenu), gCurrentAppMenu = !1, gCurrentAppMenuImage = !1, $gCurrentAnchorList = !1
	}
}

function dhtml_DocMenuCheck(e) {
	for (var tPar = html_GetTarget(e), l_Test = !0;
		"BODY" != tPar.nodeName;) tPar = tPar.parentNode, $u_SubString(tPar.className, "dhtmlMenuLG") && (l_Test = !l_Test);
	l_Test && (app_AppMenuMultiClose(), dhtml_CloseAllSubMenus(), document.onclick = null)
}

function dhtml_ButtonDropDown(pThis, pThat, pDir, pX, pY) {
	dhtml_SingeMenuOpen(pThis, pThat, "Bottom", pX, pY)
}

function dhtml_KeyAction(pEvent) {
	var $lCurrentAnchor, lIndex;
	switch ($lCurrentAnchor = apex.jQuery(pEvent.target), lIndex = $gCurrentAnchorList.index($lCurrentAnchor), pEvent.which) {
		case 40:
			$gCurrentAnchorList.eq(lIndex + 1).focus();
			break;
		case 38:
			$gCurrentAnchorList.eq(lIndex - 1).focus();
			break;
		case 37:
			var $lParent = apex.jQuery("#" + gCurrentAppMenu + " a").filter(function() {
				return 1 == apex.jQuery(this).data("setParent")
			});
			$lParent.length > 0 && (dhtml_CloseAllSubMenusL($lParent[0]), $lParent.focus().data("setParent", !1));
			break;
		case 39:
			($lCurrentAnchor.parent().hasClass("dhtmlSubMenuN") || $lCurrentAnchor.parent().hasClass("dhtmlSubMenuS")) && ($lCurrentAnchor.trigger("mouseover"), $gCurrentAnchorList[0].focus(), $lCurrentAnchor.data("setParent", !0));
			break;
		case 13:
			return
	}
	pEvent.preventDefault()
}

function dhtml_MenuOpen(pThis, pThat, pSub, pDir, pRoot) {
	var lNamespace;
	if ($x(pThat)) {
		if (lNamespace = "menu_keys_" + pThat, document.onclick = dhtml_DocMenuCheck, apex.jQuery(document).unbind("keydown." + lNamespace + "_esc").bind("keydown." + lNamespace + "_esc", function(event) {
			27 === event.which && (app_AppMenuMultiClose(), dhtml_CloseAllSubMenus(), document.onclick = null, pRoot && apex.jQuery(pRoot).focus())
		}), pSub) {
			var l_Level = parseInt($x(pThat).getAttribute("htmldb:listlevel"), 10),
				l_Temp = gSubMenuArray[l_Level];
			l_Temp && $x_Hide(l_Temp), gSubMenuArray[l_Level] = $x(pThat)
		} else dhtml_CloseAllSubMenus(), gCurrentAppMenu = pThat;
		$gCurrentAnchorList = apex.jQuery("#" + pThat).children().children().filter("a[class!=eLink]"), apex.jQuery(document).unbind("keydown." + lNamespace).bind("keydown." + lNamespace, function(event) {
			var lKeyCodes = [40, 38, 37, 39, 13];
			apex.jQuery("#" + pThat + ":visible").filter("ul")[0] && -1 !== apex.jQuery.inArray(event.which, lKeyCodes) && dhtml_KeyAction(event, lNamespace)
		});
		var lMenu = $x(pThat);
		document.body.appendChild(lMenu), pDir && "Right" != pDir ? "Bottom" == pDir ? (lMenu.style.position = "absolute", lMenu.style.top = parseInt(findPosY(pThis), 10) + parseInt(pThis.offsetHeight, 10) + "px", lMenu.style.left = parseInt(findPosX(pThis), 10) + "px") : "BottomRight" == pDir ? (lMenu.style.position = "absolute", lMenu.style.top = parseInt(findPosY(pThis), 10) + parseInt(pThis.offsetHeight, 10) + "px", lMenu.style.left = parseInt(findPosX(pThis), 10) - parseInt(pThis.offsetWidth, 10) + "px") : (lMenu.style.position = "absolute", lMenu.style.top = parseInt(findPosY(pThis), 10) + "px", lMenu.style.left = parseInt(findPosX(pThis), 10) + parseInt(pThis.offsetWidth, 10) + "px") : (lMenu.style.position = "absolute", lMenu.style.top = parseInt(findPosY(pThis), 10) + "px", lMenu.style.left = parseInt(findPosX(pThis), 10) + "px"), $x_Show(lMenu), dhtml_FixLeft(pThis, lMenu, pDir), htmldb_IE_Select_Item_Fix(lMenu)
	}
}

function dhtml_DocMenuSingleCheck(e, force) {
	if (g_Single_Menu_Count > 0) {
		var l_Test = !0;
		if (e)
			for (var tPar = html_GetTarget(e);
				"BODY" != tPar.nodeName && !force;) tPar = tPar.parentNode, tPar == g_Single_Menu && (l_Test = !l_Test);
		(l_Test || force) && ($x_Hide(g_Single_Menu), document.onclick = null)
	} else g_Single_Menu_Count = 1
}

function dhtml_SingeMenuOpen(pThis, pThat, pDir, pX, pY) {
	var lMenu = $x(pThat),
		lThis = $x(pThis);
	lMenu.style.zIndex = 2001, document.body.appendChild(lMenu), pDir && "Right" != pDir ? "Bottom" == pDir ? (lMenu.style.position = "absolute", lMenu.style.top = parseInt(findPosY(lThis), 10) + parseInt(lThis.offsetHeight, 10) + "px", lMenu.style.left = parseInt(findPosX(lThis), 10) + "px") : "BottomRight" == pDir ? (lMenu.style.position = "absolute", lMenu.style.top = parseInt(findPosY(lThis), 10) + parseInt(lThis.offsetHeight, 10) + "px", lMenu.style.left = parseInt(findPosX(lThis), 10) - parseInt(lThis.offsetWidth, 10) + "px") : "Set" == pDir ? (lMenu.style.position = "absolute", lMenu.style.top = parseInt(pY, 10) + "px", lMenu.style.left = parseInt(pX, 10) + "px") : (lMenu.style.position = "absolute", lMenu.style.top = parseInt(findPosY(lThis), 10) + "px", lMenu.style.left = parseInt(findPosX(lThis), 10) + parseInt(lThis.offsetWidth, 10) + "px") : (lMenu.style.position = "absolute", lMenu.style.top = parseInt(findPosY(lThis), 10) + "px", lMenu.style.left = parseInt(findPosX(lThis), 10) + "px"), $x_Show(lMenu), dhtml_FixLeft(lThis, lMenu, pDir), htmldb_IE_Select_Item_Fix(!0), g_Single_Menu_Count = 0, g_Single_Menu = lMenu, document.onclick = dhtml_DocMenuSingleCheck
}

function dhtml_FixLeft(pThis, pMenu, pDir) {
	var l_Width;
	l_Width = document.all ? document.body.clientWidth : window.innerWidth, "Bottom" == pDir ? parseInt(l_Width, 10) < parseInt(findPosX(pThis), 10) + parseInt(pThis.offsetWidth, 10) + parseInt(pMenu.offsetWidth, 10) && (pMenu.style.position = "absolute", pMenu.style.left = parseInt(findPosX(pThis), 10) - parseInt(pMenu.offsetWidth, 10) + parseInt(pThis.offsetWidth, 10) + "px") : parseInt(l_Width, 10) < parseInt(findPosX(pThis), 10) + parseInt(pMenu.offsetWidth, 10) && (pMenu.style.position = "absolute", pMenu.style.left = parseInt(findPosX(pThis), 10) - parseInt(pMenu.offsetWidth, 10) + "px")
}

function htmldb_IE_Select_Item_Fix(pTest) {
	var lSel = document.getElementsByTagName("SELECT").length >= 1;
	document.all && pTest && lSel && pTest.firstChild && "IFRAME" != pTest.firstChild.nodeName && (pTest.innerHTML = '<iframe  src="' + htmldb_Img_Dir + 'blank.html" width="' + pTest.offsetWidth + '" height="' + pTest.offsetHeight + '" style="z-index:-10;position: absolute;left: 0;top: 0;filter: progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0);" scrolling="no" frameborder="0"></iframe>' + pTest.innerHTML)
}

function app_AppMenuMultiOpenBottom(pThis, pThat) {
	$x(pThat);
	if (pThis != gCurrentAppMenuImage) {
		app_AppMenuMultiClose();
		var l_That = pThis.previousSibling.firstChild;
		pThis.className = g_dhtmlMenuOn, dhtml_MenuOpen(l_That, pThat, !1, "Bottom", pThis), gCurrentAppMenuImage = pThis
	} else dhtml_CloseAllSubMenus(), app_AppMenuMultiClose()
}

function app_AppMenuMultiOpenBottom2(pThis, pThat) {
	$x(pThat);
	if (pThis != gCurrentAppMenuImage) {
		app_AppMenuMultiClose();
		var l_That = pThis.parentNode;
		pThis.className = g_dhtmlMenuOn, dhtml_MenuOpen(l_That, pThat, !1, "Bottom", pThis), gCurrentAppMenuImage = pThis
	} else dhtml_CloseAllSubMenus(), app_AppMenuMultiClose()
}

function app_AppMenuMultiOpenBottom3(pThis, pThat, pMenu) {
	$x(pThat);
	if (pThis != gCurrentAppMenuImage) {
		app_AppMenuMultiClose();
		var l_That = $x(pMenu);
		pThis.className = g_dhtmlMenuOn, dhtml_MenuOpen(l_That, pThat, !1, "Bottom", pThis), gCurrentAppMenuImage = pThis
	} else dhtml_CloseAllSubMenus(), app_AppMenuMultiClose()
}

function $u_js_temp_drop() {
	var lTemp = apex.jQuery("#apex_js_temp_drop");
	return lTemp.length > 0 ? lTemp.empty() : lTemp = apex.jQuery('<div id="apex_js_temp_drop"></div>').prependTo(document.body).hide(), lTemp[0]
}

function $u_js_temp_clear() {
	var lThis = $x("apex_js_temp_drop");
	return lThis && (lThis.innerHTML = ""), lThis
}

function ie_RowFixStart(pThis) {
	if (document.all) {
		var l_Items = $x_FormItems(pThis, "checkbox");
		g_CheckedArray_IE = [];
		for (var i = 0, len = l_Items.length; len > i; i++) "checkbox" == l_Items[i].type && (g_CheckedArray_IE[i] = l_Items[i].checked)
	}
}

function ie_RowFixFinish(pThis) {
	if (document.all)
		for (var l_Items = $x_FormItems(pThis, "checkbox"), i = 0, len = l_Items.length; len > i; i++) "checkbox" == l_Items[i].type && (l_Items[i].checked = g_CheckedArray_IE[i])
}

function $tr_RowMoveFollow(pThis, pColorLastRow) {
	gLastRowHighlight && (pColorLastRow && gLastRowMoved && $x_RowHighlightOff(gLastRowMoved), $x_RowHighlight(pThis, gLastRowMovedColor)), gLastRowMoved = pThis
}

function html_RowUp(pThis, pColorLastRow) {
	var l_Row = $x_UpTill(pThis, "TR");
	ie_RowFixStart(l_Row), $tr_RowMoveFollow(l_Row, pColorLastRow);
	for (var l_Table = l_Row.parentNode, l_RowPrev = l_Row.previousSibling; l_RowPrev && 1 != l_RowPrev.nodeType;) l_RowPrev = l_RowPrev.previousSibling;
	return oElement = l_RowPrev && l_RowPrev.firstChild && "TH" != l_RowPrev.firstChild.nodeName && "TR" == l_RowPrev.nodeName ? l_Table.insertBefore(l_Row, l_RowPrev) : l_Table.appendChild(l_Row), ie_RowFixFinish(oElement), oElement
}

function html_RowDown(pThis, pColorLastRow) {
	var l_Row = $x_UpTill(pThis, "TR");
	ie_RowFixStart(l_Row), $tr_RowMoveFollow(l_Row, pColorLastRow);
	for (var l_Table = l_Row.parentNode, l_RowNext = l_Row.nextSibling; l_RowNext && 1 != l_RowNext.nodeType;) l_RowNext = l_RowNext.nextSibling;
	return oElement = l_RowNext && "TR" == l_RowNext.nodeName ? l_Table.insertBefore(l_Row, l_RowNext.nextSibling) : l_Table.insertBefore(l_Row, l_Table.getElementsByTagName("TR")[1]), ie_RowFixFinish(oElement), oElement
}

function toolTip_init() {
	return document && document.body ? (gToolTipContent = $x("gToolTipContent"), gToolTip = $x("dhtmltooltip"), gToolTip || (gToolTip = $dom_AddTag(document.body, "DIV"), gToolTip.id = "dhtmltooltip", gToolTip.className = "htmldbToolTip", gToolTip.style.position = "absolute", gToolTip.style.border = "1px solid black", gToolTip.style.padding = "2px", gToolTip.style.backgroundColor = "", gToolTip.style.visibility = "hidden", gToolTip.style.zIndex = 1e4), gToopTipPointer = $x("dhtmlpointer"), gToopTipPointer || (gToopTipPointer = $dom_AddTag(document.body, "IMG"), gToopTipPointer.id = "dhtmlpointer", gToopTipPointer.src = htmldb_Img_Dir + gToolTipGraphic, gToopTipPointer.style.position = "absolute", gToopTipPointer.style.zIndex = 10001), !0) : !1
}

function toolTip_disable() {
	toolTip_init() && (tt_target = null, gToolTip.style.visibility = "hidden", gToolTip.style.backgroundColor = "", gToolTip.style.width = "", gToopTipPointer.style.visibility = "hidden", gToolTipContent ? gToolTipContent.innerHTML = "" : gToolTip.innerHTML = "")
}

function toolTip_enable(evt, obj, tip, width, color) {
	evt = evt ? evt : window.event ? event : null;
	var target_x = evt.pageX ? evt.pageX : evt.clientX + getScrollXY()[0],
		target_y = evt.pageY ? evt.pageY : evt.clientY + getScrollXY()[1];
	if (toolTip_init()) {
		tt_target = obj, tip || (tip = obj.getAttribute("htmldb:tip")), gToolTipContent ? gToolTipContent.innerHTML = tip : gToolTip.innerHTML = tip, width && (gToolTip.style.width = width + "px"), gToolTip.style.backgroundColor = color ? color : "lightyellow", gToopTipPointer.style.left = 10 + target_x + "px", gToopTipPointer.style.top = 15 + target_y + "px", gToolTip.style.left = 7 + target_x + "px", gToolTip.style.top = 28 + target_y + "px", gToolTip.style.visibility = "visible", gToolTip.style.zIndex = 1e4, gToopTipPointer.style.zIndex = 10001, gToopTipPointer.style.visibility = "visible";
		try {
			obj.addEventListener("mouseout", toolTip_disable, !1)
		} catch (e) {
			obj.attachEvent("onmouseout", toolTip_disable)
		}
	}
	return !1
}

function toolTip_follow(evt) {
	evt = evt ? evt : window.event ? event : null;
	var target_x = evt.pageX ? evt.pageX : evt.clientX + getScrollXY()[0],
		target_y = evt.pageY ? evt.pageY : evt.clientY + getScrollXY()[1];
	return gToolTip && (gToolTip.style.left = 7 + target_x + "px", gToolTip.style.top = 28 + target_y + "px", gToolTip.style.visibility = "visible", gToolTip.style.zIndex = 1e4, gToopTipPointer.style.left = 10 + target_x + "px", gToopTipPointer.style.top = 15 + target_y + "px", gToopTipPointer.style.zIndex = 10001, gToopTipPointer.style.visibility = "visible"), !1
}

function dhtml_ShuttleObject(pThis, pThat) {
	this.Select1 = $x(pThis), this.Select2 = $x(pThat), this.Select1ArrayInit = this.Select1.cloneNode(!0), this.Select2ArrayInit = this.Select2.cloneNode(!0), this.Op1Init = [], this.Op2Init = [], this.Op1Init = this.Select1ArrayInit.options, this.Op2Init = this.Select2ArrayInit.options, this.move = function() {
		var l_A = $f_SelectedOptions(this.Select1);
		$x(l_A) && (l_A = [l_A]);
		for (var l_AL = l_A.length, i = 0; l_AL > i; i++) this.Select2.appendChild(l_A[i])
	}, this.remove = function() {
		var l_A = $f_SelectedOptions(this.Select2);
		$x(l_A) && (l_A = [l_A]);
		for (var l_AL = l_A.length, i = 0; l_AL > i; i++) this.Select1.appendChild(l_A[i])
	}, this.reset = function() {
		this.Select1.options.length = 0, this.Select2.options.length = 0;
		for (var L_Count1 = this.Op1Init.length, i = 0; L_Count1 > i; i++) this.Select1.options[i] = new Option(this.Op1Init[i].text, this.Op1Init[i].value);
		for (var L_Count2 = this.Op2Init.length, i2 = 0; L_Count2 > i2; i2++) this.Select2.options[i2] = new Option(this.Op2Init[i2].text, this.Op2Init[i2].value)
	}, this.move_all = function() {
		for (var i = 0, len = this.Select1.options.length; len > i; i++) this.Select1.options[i].selected = !0;
		this.move()
	}, this.remove_all = function() {
		for (var i = 0, len = this.Select2.options.length; len > i; i++) this.Select2.options[i].selected = !0;
		this.remove()
	}, this.sort = function(pShuttle, pDir) {
		var i, lLength = pShuttle.options.length;
		if ("U" == pDir)
			for (i = 0; lLength > i; i++) pShuttle.options[i].selected && "U" == pDir && i && pShuttle.insertBefore(pShuttle.options[i], pShuttle.options[i - 1]);
		else if ("D" == pDir)
			for (i = lLength - 1; i >= 0; i--) pShuttle.options[i].selected && "D" == pDir && i != lLength - 1 && pShuttle.insertBefore(pShuttle.options[i], pShuttle.options[i + 2]);
		else {
			var l_Opt = [];
			for (i = 0; lLength > i; i++) pShuttle.options[i].selected && (l_Opt[l_Opt.length] = pShuttle.options[i]);
			if ("B" == pDir)
				for (i = 0; i < l_Opt.length; i++) pShuttle.appendChild(l_Opt[i]);
			else if ("T" == pDir)
				for (i = l_Opt.length - 1; i >= 0; i--) pShuttle.insertBefore(l_Opt[i], pShuttle.firstChild)
		}
	}, this.sort1 = function(pDir) {
		this.sort(this.Select1, pDir)
	}, this.sort2 = function(pDir) {
		this.sort(this.Select2, pDir)
	}
}

function hideShow(objectID, imgID, showImg, hideImg) {
	var theImg = $x(imgID),
		theDiv = $x(objectID);
	"none" == theDiv.style.display || "" == theDiv.style.display || null == theDiv.style ? (theImg.src = hideImg, $x(objectID).style.display = "block") : (theImg.src = showImg, $x(objectID).style.display = "none")
}(null === apex.spreadsheet || "object" != typeof apex.spreadsheet) && (apex.spreadsheet = {}), (null === apex.items || "object" != typeof apex.items) && (apex.items = {}), (null === apex.ajax || "object" != typeof apex.ajax) && (apex.ajax = {}), (null === apex.dhtml || "object" != typeof apex.dhtml) && (apex.dhtml = {}), (null === apex.worksheet || "object" != typeof apex.worksheet) && (apex.worksheet = {}), apex.ajax = {
	clob: function(pReturn) {
		function _get() {
			that.ajax.addParam("x05", "GET"), that.ajax.GetAsync(that._return)
		}

		function _set(pValue) {
			that.ajax.addParam("x05", "SET"), that.ajax.AddArrayClob(pValue, 1), that.ajax.GetAsync(that._return)
		}

		function _return() {
			if (1 == p.readyState);
			else if (2 == p.readyState);
			else if (3 != p.readyState) return 4 == p.readyState ? p : !1
		}
		var that = this;
		this.ajax = new htmldb_Get(null, $x("pFlowId").value, "APXWGT", 0), this.ajax.addParam("p_widget_name", "apex_utility"), this.ajax.addParam("x04", "CLOB_CONTENT"), this._get = _get, this._set = _set, this._return = pReturn ? pReturn : _return
	},
	test: function(pReturn) {
		function _get() {
			that.ajax.GetAsync(that._return)
		}

		function _set() {}

		function _return() {}
		var that = this;
		this.ajax = new htmldb_Get(null, $x("pFlowId").value, "APXWGT", 0), this.ajax.addParam("p_widget_name", "apex_utility"), this._get = _get, this._set = _set, this._return = pReturn ? pReturn : _return
	},
	widget: function(pWidget, pReturn) {
		function _get() {
			that.ajax.GetAsync(that._return)
		}

		function _set() {}

		function _return() {}
		var that = this;
		this.ajax = new htmldb_Get(null, $x("pFlowId").value, "APXWGT", 0), this.ajax.addParam("p_widget_name", pWidget), this._get = _get, this._set = _set, this._return = pReturn ? pReturn : _return
	},
	ondemand: function(pWidget, pReturn) {
		function _get() {
			that.ajax.GetAsync(that._return)
		}

		function _set() {}

		function _return() {}
		var that = this;
		this.ajax = new htmldb_Get(null, $x("pFlowId").value, "APPLICATION_PROCESS=" + pWidget, 0), this._get = _get, this._set = _set, this._return = pReturn ? pReturn : _return
	},
	url: function(pUrl, pReturn) {
		function _get() {
			that.ajax.GetAsync(that._return)
		}

		function _set() {}

		function _return() {}
		var that = this;
		this.ajax = new htmldb_Get(null, null, null, null, null, "f", pUrl), this._get = _get, this._set = _set, this._return = pReturn ? pReturn : _return
	}
};
var gResult = null,
	gNode = null;
htmldb_Get.prototype.GetAsync = function(pCallback) {
	var lRequest;
	try {
		lRequest = new XMLHttpRequest
	} catch (e) {
		lRequest = new ActiveXObject("Msxml2.XMLHTTP")
	}
	try {
		{
			new Date
		}
		if (lRequest.open("POST", this.base, !0), lRequest) return lRequest.onreadystatechange = function() {
			p = lRequest, pCallback(lRequest)
		}, lRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), lRequest.send(null == this.queryString ? this.params : this.queryString), lRequest
	} catch (e) {
		return !1
	}
}, htmldb_Get.prototype.AddArray = function(pArray, pFnumber) {
	var lFName = "f";
	pFnumber = $nvl(pFnumber, 1), lFName += 10 > pFnumber ? "0" + pFnumber : pFnumber;
	for (var i = 0, len = pArray.length; len > i; i++) this.addParam(lFName, pArray[i]);
	return this
}, htmldb_Get.prototype.AddArrayItems = function(pArray, pFnumber) {
	var lFName = "f";
	pFnumber = $nvl(pFnumber, 1), lFName += 10 > pFnumber ? "0" + pFnumber : pFnumber;
	for (var i = 0, len = pArray.length; len > i; i++) this.addParam(lFName, $nvl($v(pArray[i])), "");
	return this
}, htmldb_Get.prototype.AddNameValue = function(pName, pValue, pFnumber) {
	var lFName = "f",
		lFName2 = "f";
	return pFnumber = $nvl(pFnumber, 1), pFnumber2 = pFnumber + 1, lFName += 10 > pFnumber ? "0" + pFnumber : pFnumber, lFName2 += 10 > pFnumber2 ? "0" + pFnumber2 : pFnumber2, this.addParam(lFName, pName), this.addParam(lFName2, $nvl(pValue), ""), this
}, htmldb_Get.prototype.AddArrayItems2 = function(pArray, pFnumber, pKey) {
	var lFName = "f",
		lFName2 = "f";
	pFnumber = $nvl(pFnumber, 1), pFnumber2 = pFnumber + 1, lFName += 10 > pFnumber ? "0" + pFnumber : pFnumber, lFName2 += 10 > pFnumber2 ? "0" + pFnumber2 : pFnumber2;
	for (var i = 0, len = pArray.length; len > i; i++) {
		var lTest = $x(pArray[i]);
		lTest && 0 != lTest.id.length && (pKey ? this.addParam(lFName, apex.jQuery(lTest).attr(pKey)) : this.addParam(lFName, lTest.id))
	}
	for (var i = 0, len = pArray.length; len > i; i++) {
		var lTest = $x(pArray[i]);
		lTest && 0 != lTest.id.length && this.addParam(lFName2, $nvl($v(lTest)), "")
	}
	return this
}, htmldb_Get.prototype.AddArrayClob = function(pText, pFnumber) {
	var lArray = $s_Split(pText, 4e3);
	return this.AddArray(lArray, pFnumber), this
}, htmldb_Get.prototype.AddPageItems = function(pArray) {
	for (var i = 0, len = pArray.length; len > i; i++) $x(pArray[i]) && this.add($x(pArray[i]).id, $v(pArray[i]))
}, htmldb_Get.prototype.AddGlobals = function(p_widget_mod, p_widget_action, p_widget_action_mod, p_widget_num_return, x01, x02, x03, x04, x05, x06, x07, x08, x09, x10) {
	return this.addParam("p_widget_mod", p_widget_mod), this.addParam("p_widget_action", p_widget_action), this.addParam("p_widget_action_mod", p_widget_action_mod), this.addParam("p_widget_num_return", p_widget_num_return), this.addParam("x01", x01), this.addParam("x02", x02), this.addParam("x03", x03), this.addParam("x04", x04), this.addParam("x05", x05), this.addParam("x06", x06), this.addParam("x07", x07), this.addParam("x08", x08), this.addParam("x09", x09), this.addParam("x10", x10), this
};
var gDebug = !0,
	gkeyPressTime, gLastTab = !1,
	gRegex = !1,
	ie = document.all ? !0 : !1;
ie && (document.expando = !0);
var gDebugWindow = !1;
$item = $x_object;
var gToggleWithImageA = "pseudoButtonActive",
	gToggleWithImageI = "pseudoButtonInactive",
	gCurrentRow = !1,
	htmldb_ch = !1,
	gChangeCheck = !1,
	gCurrentAppMenu = !1,
	gCurrentAppMenuImage = !1,
	$gCurrentAnchorList = !1,
	gSubMenuArray = [],
	g_Single_Menu = !1,
	g_Single_Menu_Count = 0,
	g_dhtmlMenu = "dhtmlMenu",
	g_dhtmlMenuOn = "dhtmlMenuOn",
	g_CheckedArray_IE, gLastRowMoved = null,
	gLastRowMovedColor = "#CCCCCC",
	gLastRowHighlight = !0,
	tt_target, gToolTipGraphic = "arrow2.gif",
	gToolTip = !1,
	gToopTipPointer = !1,
	gToolTipContent = !1;
apex.security = {},
	function(security, $) {
		security.framebreaker = function(pMode) {
			self != top && (null == pMode || "D" === pMode || "S" === pMode && top.location.host != self.location.host) ? (document.documentElement.style.visibility = "hidden", $(function() {
				document.write("X")
			}), top.location = self.location) : document.documentElement.style.visibility = "visible"
		}
	}(apex.security, apex.jQuery);
apex.widget = {
	waitPopup: function(pContent) {
		var lContent = pContent ? pContent : '<img id="img_progress" src="' + apex_img_dir + 'processing3.gif" alt="">';
		$x("apex_wait_popup") ? apex.jQuery("#apex_wait_popup").html(lContent) : apex.jQuery('<div id="apex_wait_popup" class="apex_wait_popup">' + lContent + '</div><div id="apex_wait_overlay" class="apex_wait_overlay"></div>').prependTo("body"), $x("apex_wait_overlay").style.visibility = "visible", window.setTimeout('apex.jQuery("#apex_wait_popup").html(apex.jQuery("#apex_wait_popup").html());', 100)
	}
}, apex.widget.initPageItem = function(pName, pOptions) {
	apex.item(pName, pOptions)
}, apex.widget.textareaClob = {
	upload: function(pItemName, pRequest) {
		var lClob = new apex.ajax.clob(function() {
			if (1 === p.readyState);
			else if (2 === p.readyState);
			else if (3 === p.readyState);
			else {
				if (4 !== p.readyState) return !1;
				$s(pItemName, ""), apex.submit(pRequest)
			}
		});
		lClob._set($v(pItemName))
	}
};
apex.widget.util = {},
	function(util, $) {
		util.cascadingLov = function(pList, pAjaxIdentifier, pData, pOptions) {
			var lOptions = $.extend({
					optimizeRefresh: !0
				}, pOptions),
				lNullFound = !1,
				lList$ = $(pList, apex.gPageContext$);
			return lOptions.refreshObject || (lOptions.refreshObject = lList$), lOptions.loadingIndicator || (lOptions.loadingIndicator = lList$), lOptions.optimizeRefresh && ($(lOptions.dependingOn, apex.gPageContext$).each(function() {
				return apex.item(this).isEmpty() ? (lNullFound = !0, !1) : void 0
			}), lNullFound) ? (lOptions.refreshObject.trigger("apexbeforerefresh"), $.isFunction(lOptions.clear) && lOptions.clear(), lList$.change(), void lOptions.refreshObject.trigger("apexafterrefresh")) : (pData.pageItems = $(pData.pageItems, apex.gPageContext$).add(lOptions.dependingOn), apex.server.plugin(pAjaxIdentifier, pData, lOptions))
		}, util.callPopupLov = function(pAjaxIdentifier, pData, pOptions) {
			var lUrl, lWindow, lData = pData || {},
				lOptions = pOptions || {};
			return lOptions.filterOutput && (lData.x02 = lOptions.filterValue), lUrl = apex.server.pluginUrl(pAjaxIdentifier, lData), lWindow = open(lUrl, "winLovList", lOptions.windowParameters), null === lWindow.opener && (lWindow.opener = self), lWindow.focus(), !1
		}, util.enableIcon = function($pContainer, pHref, pClickHandler) {
			$pContainer.find("img").css({
				opacity: 1,
				cursor: ""
			}).parent("a").attr("href", pHref), pClickHandler && $pContainer.click(pClickHandler)
		}, util.disableIcon = function($pContainer) {
			$pContainer.find("img").css({
				opacity: .5,
				cursor: "default"
			}).parent("a").removeAttr("href").unbind("click")
		}
	}(apex.widget.util, apex.jQuery);
apex.da = {},
	function(da, $, event) {
		"use strict";
		da.gEventList = [], da.gCancelActions = !1, da.init = function() {
			$(da.gEventList).each(function() {
				var lDefaults, lEvent, lSelector, lLiveSelector$;
				lDefaults = {
					name: null,
					bindDelegateTo: null
				}, lEvent = $.extend(lDefaults, this), lSelector = da.constructSelector({
					elementType: lEvent.triggeringElementType,
					element: lEvent.triggeringElement,
					regionId: lEvent.triggeringRegionId,
					buttonId: lEvent.triggeringButtonId
				}), -1 === $.inArray(lEvent.bindEventType, ["ready", "pageinit"]) && ("bind" === lEvent.bindType ? $(lSelector, apex.gPageContext$).on(lEvent.bindEventType, function(pBrowserEvent, pData) {
					da.actions(this, lEvent, pBrowserEvent, pData)
				}) : "live" === lEvent.bindType ? (lLiveSelector$ = lEvent.bindDelegateTo ? $(lEvent.bindDelegateTo, apex.gPageContext$) : apex.gPageContext$, lLiveSelector$.on(lEvent.bindEventType, lSelector, function(pBrowserEvent, pData) {
					da.actions(this, lEvent, pBrowserEvent, pData)
				})) : "one" === lEvent.bindType && $(lSelector, apex.gPageContext$).one(lEvent.bindEventType, function(pBrowserEvent, pData) {
					da.actions(this, lEvent, pBrowserEvent, pData)
				})), da.actions(lSelector, lEvent, "load")
			})
		}, da.constructSelector = function(pOptions) {
			var lDefaults, lOptions, lSelector = "";
			switch (lDefaults = {
				elementType: null,
				element: null,
				regionId: null,
				buttonId: null,
				triggeringElement: null,
				eventTarget: null
			}, lOptions = $.extend(lDefaults, pOptions), lOptions.elementType) {
				case "ITEM":
					lSelector = "#" + lOptions.element.replace(/,/g, ",#");
					break;
				case "REGION":
					lSelector = "#" + lOptions.regionId;
					break;
				case "BUTTON":
					lSelector = "#" + lOptions.buttonId;
					break;
				case "DOM_OBJECT":
					if (lSelector = "#" + lOptions.element.replace(/,/g, ",#"), !$(lSelector, apex.gPageContext$).length) try {
						lSelector = eval(lOptions.element)
					} catch (err) {
						lSelector = lOptions.element
					}
					break;
				case "JQUERY_SELECTOR":
					lSelector = lOptions.element;
					break;
				case "TRIGGERING_ELEMENT":
					lSelector = lOptions.triggeringElement;
					break;
				case "EVENT_SOURCE":
					lSelector = lOptions.eventTarget;
					break;
				default:
					lSelector = apex.gPageContext$
			}
			return lSelector
		}, da.doAction = function(pTriggeringElement, pSelector, pAction, pBrowserEvent, pData, pDynamicActionName, pResumeCallback) {
			var lContext = {
				triggeringElement: pTriggeringElement,
				affectedElements: $(pSelector, apex.gPageContext$),
				action: pAction,
				browserEvent: pBrowserEvent,
				data: pData,
				resumeCallback: pResumeCallback
			};
			return pAction.javascriptFunction ? (apex.debug.log("Dynamic Action Fired: " + pDynamicActionName + " (" + pAction.action + ")", lContext), pAction.javascriptFunction.call(lContext)) : void 0
		}, da.doActions = function(pEvent, pStartWithAction, pBrowserEvent, pData, pConditionResult, pTriggeringElement) {
			for (var lActionCount = pEvent.actionList.length, lActionIterator = pStartWithAction; lActionCount > lActionIterator; lActionIterator++) {
				var lDefaults, lAction, lSelector, lWaitCallback;
				if (da.gCancelActions) return !1;
				if (lDefaults = {
					eventResult: null,
					executeOnPageInit: !1,
					stopExecutionOnError: !0,
					action: null,
					affectedElementsType: null,
					affectedRegionId: null,
					affectedElements: null,
					javascriptFunction: null,
					ajaxIdentifier: null,
					attribute01: null,
					attribute02: null,
					attribute03: null,
					attribute04: null,
					attribute05: null,
					attribute06: null,
					attribute07: null,
					attribute08: null,
					attribute09: null,
					attribute10: null,
					attribute11: null,
					attribute12: null,
					attribute13: null,
					attribute14: null,
					attribute15: null
				}, lAction = $.extend(lDefaults, pEvent.actionList[lActionIterator]), ("load" !== pBrowserEvent || "load" === pBrowserEvent && (lAction.executeOnPageInit || -1 !== $.inArray(pEvent.bindEventType, ["ready", "pageinit"]))) && lAction.eventResult === pConditionResult && (lSelector = da.constructSelector({
					elementType: lAction.affectedElementsType,
					element: lAction.affectedElements,
					regionId: lAction.affectedRegionId,
					buttonId: lAction.affectedButtonId,
					triggeringElement: pTriggeringElement,
					eventTarget: pBrowserEvent.target
				}), lAction.waitForResult && (lWaitCallback = function(pErrorOccurred) {
					da.gCancelActions = lAction.stopExecutionOnError && pErrorOccurred, da.doActions(pEvent, lActionIterator + 1, pBrowserEvent, pData, pConditionResult, pTriggeringElement)
				}), da.doAction(pTriggeringElement, lSelector, lAction, pBrowserEvent, pData, pEvent.name, lWaitCallback) === !1 && lAction.stopExecutionOnError && (da.gCancelActions = !0), lAction.waitForResult)) return !1
			}
		}, da.actions = function(pSelector, pEvent, pBrowserEvent, pData) {
			function _getConditionResult(pElement) {
				var lConditionResult, lExpressionArray, lTempFunc, lContext, lApexItem = apex.item(pElement.id),
					lValue = lApexItem.getValue();
				switch (pEvent.triggeringConditionType) {
					case "EQUALS":
						$.isArray(lValue) ? (lConditionResult = !1, $.each(lValue, function(index, value) {
							return lConditionResult = value === pEvent.triggeringExpression, lConditionResult ? !1 : void 0
						})) : lConditionResult = lValue === pEvent.triggeringExpression;
						break;
					case "NOT_EQUALS":
						$.isArray(lValue) ? (lConditionResult = !0, $.each(lValue, function(index, value) {
							return lConditionResult = value !== pEvent.triggeringExpression, lConditionResult ? void 0 : !1
						})) : lConditionResult = lValue !== pEvent.triggeringExpression;
						break;
					case "IN_LIST":
						lExpressionArray = pEvent.triggeringExpression.split(","), $.isArray(lValue) ? (lConditionResult = !1, $.each(lValue, function(index, value) {
							return lConditionResult = -1 !== $.inArray(value, lExpressionArray), lConditionResult ? !1 : void 0
						})) : lConditionResult = -1 !== $.inArray(lValue, lExpressionArray);
						break;
					case "NOT_IN_LIST":
						lExpressionArray = pEvent.triggeringExpression.split(","), $.isArray(lValue) ? (lConditionResult = !0, $.each(lValue, function(index, value) {
							return lConditionResult = -1 === $.inArray(value, lExpressionArray), lConditionResult ? void 0 : !1
						})) : lConditionResult = -1 === $.inArray(lValue, lExpressionArray);
						break;
					case "GREATER_THAN":
						$.isArray(lValue) ? (lConditionResult = !0, $.each(lValue, function(index, value) {
							return lConditionResult = value > parseFloat(pEvent.triggeringExpression, 10), lConditionResult ? void 0 : !1
						})) : lConditionResult = lValue > parseFloat(pEvent.triggeringExpression, 10);
						break;
					case "GREATER_THAN_OR_EQUAL":
						$.isArray(lValue) ? (lConditionResult = !0, $.each(lValue, function(index, value) {
							return lConditionResult = value >= parseFloat(pEvent.triggeringExpression, 10), lConditionResult ? void 0 : !1
						})) : lConditionResult = lValue >= parseFloat(pEvent.triggeringExpression, 10);
						break;
					case "LESS_THAN":
						$.isArray(lValue) ? (lConditionResult = !0, $.each(lValue, function(index, value) {
							return lConditionResult = value < parseFloat(pEvent.triggeringExpression, 10), lConditionResult ? void 0 : !1
						})) : lConditionResult = lValue < parseFloat(pEvent.triggeringExpression, 10);
						break;
					case "LESS_THAN_OR_EQUAL":
						$.isArray(lValue) ? (lConditionResult = !0, $.each(lValue, function(index, value) {
							return lConditionResult = value <= parseFloat(pEvent.triggeringExpression, 10), lConditionResult ? void 0 : !1
						})) : lConditionResult = lValue <= parseFloat(pEvent.triggeringExpression, 10);
						break;
					case "NULL":
						lConditionResult = lApexItem.isEmpty();
						break;
					case "NOT_NULL":
						lConditionResult = !lApexItem.isEmpty();
						break;
					case "JAVASCRIPT_EXPRESSION":
						lContext = {
							triggeringElement: pElement,
							browserEvent: pBrowserEvent,
							data: pData
						}, lTempFunc = new Function("return " + pEvent.triggeringExpression), lConditionResult = lTempFunc.call(lContext);
						break;
					default:
						lConditionResult = !0
				}
				return lConditionResult
			}
			event.gCancelFlag = !1, da.gCancelActions = !1, $(pSelector, apex.gPageContext$).each(function() {
				da.doActions(pEvent, 0, pBrowserEvent, pData, _getConditionResult(this), this), da.gCancelActions = !1
			})
		}, da.resume = function(pCallback, pErrorOccurred) {
			$.isFunction(pCallback) && pCallback(pErrorOccurred)
		}, da.handleAjaxErrors = function(pjqXHR, pTextStatus, pErrorThrown, pResumeCallback) {
			var lMsg;
			0 !== pjqXHR.status && (lMsg = "APEX" === pTextStatus ? pErrorThrown : "Error: " + pTextStatus + " - " + pErrorThrown, $.isFunction(window.onerror) ? window.onerror(lMsg, null, null) : window.alert(lMsg)), da.resume(pResumeCallback, !0)
		}
	}(apex.da, apex.jQuery, apex.event);
! function(da, server, item, $) {
	"use strict";
	da.show = function() {
		var lShowRow;
		this.affectedElements && (lShowRow = "Y" === this.action.attribute01, this.affectedElements.each(function() {
			item(this).show(lShowRow)
		}))
	}, da.hide = function() {
		var lHideRow;
		this.affectedElements && (lHideRow = "Y" === this.action.attribute01, this.affectedElements.each(function() {
			item(this).hide(lHideRow)
		}))
	}, da.enable = function() {
		this.affectedElements && this.affectedElements.each(function() {
			item(this).enable()
		})
	}, da.disable = function() {
		this.affectedElements && this.affectedElements.each(function() {
			item(this).disable()
		})
	}, da.setValue = function() {
		function _setValue(pValue) {
			lAffectedElements$.each(function() {
				$s(this, pValue, null, lSuppressChangeEvent)
			}), da.resume(lResumeCallback, !1)
		}

		function _clear() {
			lAffectedElements$.each(function() {
				$s(this, "", null, !0)
			})
		}

		function _success(pData) {
			var lAffectedElementArray, lValue;
			if ("SQL_STATEMENT" === lSetType)
				if ("ITEM" === lAction.affectedElementsType) {
					lAffectedElementArray = lAction.affectedElements.split(",");
					for (var i = 0, len = lAffectedElementArray.length; len > i; i++) lValue = "undefined" != typeof pData.values[i] ? pData.values[i] : "", $s(lAffectedElementArray[i], lValue, null, lSuppressChangeEvent);
					da.resume(lResumeCallback, !1)
				} else _setValue(pData.values[0]);
			else _setValue(pData.value)
		}

		function _error(pjqXHR, pTextStatus, pErrorThrown) {
			da.handleAjaxErrors(pjqXHR, pTextStatus, pErrorThrown, lResumeCallback)
		}
		var lAction = this.action,
			lSetType = lAction.attribute01,
			lStaticAssignment = lAction.attribute02,
			lPageItemsToSubmit = lAction.attribute04,
			lJavaScriptExpression = lAction.attribute05,
			lSuppressChangeEvent = "Y" === lAction.attribute09,
			lAsync = !lAction.waitForResult,
			lAffectedElements$ = this.affectedElements,
			lResumeCallback = this.resumeCallback;
		"STATIC_ASSIGNMENT" === lSetType ? _setValue(lStaticAssignment) : "SQL_STATEMENT" === lSetType || "PLSQL_EXPRESSION" === lSetType || "FUNCTION_BODY" === lSetType ? server.plugin(lAction.ajaxIdentifier, {
			pageItems: lPageItemsToSubmit
		}, {
			loadingIndicator: lAffectedElements$,
			clear: _clear,
			success: _success,
			error: _error,
			async: lAsync
		}) : "JAVASCRIPT_EXPRESSION" === lSetType && _setValue(eval(lJavaScriptExpression))
	}, da.executePlSqlCode = function() {
		function _clear() {
			$(lPageItemsToReturn, apex.gPageContext$).each(function() {
				$s(this, "", null, !0)
			})
		}

		function _success(pData) {
			var lItemCount, lItemArray;
			if (null !== pData) {
				lItemCount = pData.item.length, lItemArray = pData.item;
				for (var lItemIterator = 0; lItemCount > lItemIterator; lItemIterator++) $s(lItemArray[lItemIterator].id, lItemArray[lItemIterator].value, null, lSuppressChangeEvent)
			}
			da.resume(lResumeCallback, !1)
		}

		function _error(pjqXHR, pTextStatus, pErrorThrown) {
			da.handleAjaxErrors(pjqXHR, pTextStatus, pErrorThrown, lResumeCallback)
		}
		var lAction = this.action,
			lPageItemsToSubmit = lAction.attribute01,
			lPageItemsToReturn = lAction.attribute02,
			lSuppressChangeEvent = "Y" === lAction.attribute04,
			lAsync = !lAction.waitForResult,
			lResumeCallback = this.resumeCallback;
		server.plugin(lAction.ajaxIdentifier, {
			pageItems: lPageItemsToSubmit
		}, {
			loadingIndicator: lPageItemsToReturn,
			clear: _clear,
			success: _success,
			error: _error,
			async: lAsync
		})
	}, da.clear = function() {
		this.affectedElements && this.affectedElements.each(function() {
			$s(this, "", "")
		})
	}, da.addClass = function() {
		this.affectedElements && this.affectedElements.addClass(this.action.attribute01)
	}, da.removeClass = function() {
		this.affectedElements && (this.action.attribute01 ? this.affectedElements.removeClass(this.action.attribute01) : this.affectedElements.removeClass())
	}, da.setCSS = function() {
		var lAction = this.action;
		this.affectedElements.each(function() {
			item(this).setStyle(lAction.attribute01, lAction.attribute02)
		})
	}, da.setFocus = function() {
		this.affectedElements.each(function() {
			item(this).setFocus()
		})
	}, da.submitPage = function() {
		var lAction = this.action,
			lRequest = lAction.attribute01,
			lShowProcessing = "Y" === lAction.attribute02;
		apex.submit({
			request: lRequest,
			showWait: lShowProcessing
		})
	}, da.refresh = function() {
		this.affectedElements && this.affectedElements.trigger("apexrefresh")
	}, da.cancelEvent = function() {
		apex.event.gCancelFlag = !0, da.gCancelActions = !0, this.browserEvent.stopImmediatePropagation(), this.browserEvent.preventDefault()
	}, da.showAlert = function() {
		window.alert(this.action.attribute01)
	}, da.askConfirm = function() {
		confirm(this.action.attribute01) || (apex.event.gCancelFlag = !0, da.gCancelActions = !0)
	}
}(apex.da, apex.server, apex.item, apex.jQuery);
/*! jQuery UI - v1.8.22 - 2012-07-24
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.core.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	function c(b, c) {
		var e = b.nodeName.toLowerCase();
		if ("area" === e) {
			var f = b.parentNode,
				g = f.name,
				h;
			return !b.href || !g || f.nodeName.toLowerCase() !== "map" ? !1 : (h = a("img[usemap=#" + g + "]")[0], !!h && d(h))
		}
		return (/input|select|textarea|button|object/.test(e) ? !b.disabled : "a" == e ? b.href || c : c) && d(b)
	}

	function d(b) {
		return !a(b).parents().andSelf().filter(function() {
			return a.curCSS(this, "visibility") === "hidden" || a.expr.filters.hidden(this)
		}).length
	}
	a.ui = a.ui || {};
	if (a.ui.version) return;
	a.extend(a.ui, {
		version: "1.8.22",
		keyCode: {
			ALT: 18,
			BACKSPACE: 8,
			CAPS_LOCK: 20,
			COMMA: 188,
			COMMAND: 91,
			COMMAND_LEFT: 91,
			COMMAND_RIGHT: 93,
			CONTROL: 17,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			INSERT: 45,
			LEFT: 37,
			MENU: 93,
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SHIFT: 16,
			SPACE: 32,
			TAB: 9,
			UP: 38,
			WINDOWS: 91
		}
	}), a.fn.extend({
		propAttr: a.fn.prop || a.fn.attr,
		_focus: a.fn.focus,
		focus: function(b, c) {
			return typeof b == "number" ? this.each(function() {
				var d = this;
				setTimeout(function() {
					a(d).focus(), c && c.call(d)
				}, b)
			}) : this._focus.apply(this, arguments)
		},
		scrollParent: function() {
			var b;
			return a.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? b = this.parents().filter(function() {
				return /(relative|absolute|fixed)/.test(a.curCSS(this, "position", 1)) && /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
			}).eq(0) : b = this.parents().filter(function() {
				return /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
			}).eq(0), /fixed/.test(this.css("position")) || !b.length ? a(document) : b
		},
		zIndex: function(c) {
			if (c !== b) return this.css("zIndex", c);
			if (this.length) {
				var d = a(this[0]),
					e, f;
				while (d.length && d[0] !== document) {
					e = d.css("position");
					if (e === "absolute" || e === "relative" || e === "fixed") {
						f = parseInt(d.css("zIndex"), 10);
						if (!isNaN(f) && f !== 0) return f
					}
					d = d.parent()
				}
			}
			return 0
		},
		disableSelection: function() {
			return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(a) {
				a.preventDefault()
			})
		},
		enableSelection: function() {
			return this.unbind(".ui-disableSelection")
		}
	}), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function(c, d) {
		function h(b, c, d, f) {
			return a.each(e, function() {
				c -= parseFloat(a.curCSS(b, "padding" + this, !0)) || 0, d && (c -= parseFloat(a.curCSS(b, "border" + this + "Width", !0)) || 0), f && (c -= parseFloat(a.curCSS(b, "margin" + this, !0)) || 0)
			}), c
		}
		var e = d === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
			f = d.toLowerCase(),
			g = {
				innerWidth: a.fn.innerWidth,
				innerHeight: a.fn.innerHeight,
				outerWidth: a.fn.outerWidth,
				outerHeight: a.fn.outerHeight
			};
		a.fn["inner" + d] = function(c) {
			return c === b ? g["inner" + d].call(this) : this.each(function() {
				a(this).css(f, h(this, c) + "px")
			})
		}, a.fn["outer" + d] = function(b, c) {
			return typeof b != "number" ? g["outer" + d].call(this, b) : this.each(function() {
				a(this).css(f, h(this, b, !0, c) + "px")
			})
		}
	}), a.extend(a.expr[":"], {
		data: a.expr.createPseudo ? a.expr.createPseudo(function(b) {
			return function(c) {
				return !!a.data(c, b)
			}
		}) : function(b, c, d) {
			return !!a.data(b, d[3])
		},
		focusable: function(b) {
			return c(b, !isNaN(a.attr(b, "tabindex")))
		},
		tabbable: function(b) {
			var d = a.attr(b, "tabindex"),
				e = isNaN(d);
			return (e || d >= 0) && c(b, !e)
		}
	}), a(function() {
		var b = document.body,
			c = b.appendChild(c = document.createElement("div"));
		c.offsetHeight, a.extend(c.style, {
			minHeight: "100px",
			height: "auto",
			padding: 0,
			borderWidth: 0
		}), a.support.minHeight = c.offsetHeight === 100, a.support.selectstart = "onselectstart" in c, b.removeChild(c).style.display = "none"
	}), a.curCSS || (a.curCSS = a.css), a.extend(a.ui, {
		plugin: {
			add: function(b, c, d) {
				var e = a.ui[b].prototype;
				for (var f in d) e.plugins[f] = e.plugins[f] || [], e.plugins[f].push([c, d[f]])
			},
			call: function(a, b, c) {
				var d = a.plugins[b];
				if (!d || !a.element[0].parentNode) return;
				for (var e = 0; e < d.length; e++) a.options[d[e][0]] && d[e][1].apply(a.element, c)
			}
		},
		contains: function(a, b) {
			return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b)
		},
		hasScroll: function(b, c) {
			if (a(b).css("overflow") === "hidden") return !1;
			var d = c && c === "left" ? "scrollLeft" : "scrollTop",
				e = !1;
			return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e)
		},
		isOverAxis: function(a, b, c) {
			return a > b && a < b + c
		},
		isOver: function(b, c, d, e, f, g) {
			return a.ui.isOverAxis(b, d, f) && a.ui.isOverAxis(c, e, g)
		}
	})
})(jQuery);;
/*! jQuery UI - v1.8.22 - 2012-07-24
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.widget.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	if (a.cleanData) {
		var c = a.cleanData;
		a.cleanData = function(b) {
			for (var d = 0, e;
				(e = b[d]) != null; d++) try {
				a(e).triggerHandler("remove")
			} catch (f) {}
			c(b)
		}
	} else {
		var d = a.fn.remove;
		a.fn.remove = function(b, c) {
			return this.each(function() {
				return c || (!b || a.filter(b, [this]).length) && a("*", this).add([this]).each(function() {
					try {
						a(this).triggerHandler("remove")
					} catch (b) {}
				}), d.call(a(this), b, c)
			})
		}
	}
	a.widget = function(b, c, d) {
		var e = b.split(".")[0],
			f;
		b = b.split(".")[1], f = e + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][f] = function(c) {
			return !!a.data(c, b)
		}, a[e] = a[e] || {}, a[e][b] = function(a, b) {
			arguments.length && this._createWidget(a, b)
		};
		var g = new c;
		g.options = a.extend(!0, {}, g.options), a[e][b].prototype = a.extend(!0, g, {
			namespace: e,
			widgetName: b,
			widgetEventPrefix: a[e][b].prototype.widgetEventPrefix || b,
			widgetBaseClass: f
		}, d), a.widget.bridge(b, a[e][b])
	}, a.widget.bridge = function(c, d) {
		a.fn[c] = function(e) {
			var f = typeof e == "string",
				g = Array.prototype.slice.call(arguments, 1),
				h = this;
			return e = !f && g.length ? a.extend.apply(null, [!0, e].concat(g)) : e, f && e.charAt(0) === "_" ? h : (f ? this.each(function() {
				var d = a.data(this, c),
					f = d && a.isFunction(d[e]) ? d[e].apply(d, g) : d;
				if (f !== d && f !== b) return h = f, !1
			}) : this.each(function() {
				var b = a.data(this, c);
				b ? b.option(e || {})._init() : a.data(this, c, new d(e, this))
			}), h)
		}
	}, a.Widget = function(a, b) {
		arguments.length && this._createWidget(a, b)
	}, a.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		options: {
			disabled: !1
		},
		_createWidget: function(b, c) {
			a.data(c, this.widgetName, this), this.element = a(c), this.options = a.extend(!0, {}, this.options, this._getCreateOptions(), b);
			var d = this;
			this.element.bind("remove." + this.widgetName, function() {
				d.destroy()
			}), this._create(), this._trigger("create"), this._init()
		},
		_getCreateOptions: function() {
			return a.metadata && a.metadata.get(this.element[0])[this.widgetName]
		},
		_create: function() {},
		_init: function() {},
		destroy: function() {
			this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled " + "ui-state-disabled")
		},
		widget: function() {
			return this.element
		},
		option: function(c, d) {
			var e = c;
			if (arguments.length === 0) return a.extend({}, this.options);
			if (typeof c == "string") {
				if (d === b) return this.options[c];
				e = {}, e[c] = d
			}
			return this._setOptions(e), this
		},
		_setOptions: function(b) {
			var c = this;
			return a.each(b, function(a, b) {
				c._setOption(a, b)
			}), this
		},
		_setOption: function(a, b) {
			return this.options[a] = b, a === "disabled" && this.widget()[b ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled" + " " + "ui-state-disabled").attr("aria-disabled", b), this
		},
		enable: function() {
			return this._setOption("disabled", !1)
		},
		disable: function() {
			return this._setOption("disabled", !0)
		},
		_trigger: function(b, c, d) {
			var e, f, g = this.options[b];
			d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent;
			if (f)
				for (e in f) e in c || (c[e] = f[e]);
			return this.element.trigger(c, d), !(a.isFunction(g) && g.call(this.element[0], c, d) === !1 || c.isDefaultPrevented())
		}
	}
})(jQuery);;
/*! jQuery UI - v1.8.22 - 2012-07-24
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.mouse.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	var c = !1;
	a(document).mouseup(function(a) {
		c = !1
	}), a.widget("ui.mouse", {
		options: {
			cancel: ":input,option",
			distance: 1,
			delay: 0
		},
		_mouseInit: function() {
			var b = this;
			this.element.bind("mousedown." + this.widgetName, function(a) {
				return b._mouseDown(a)
			}).bind("click." + this.widgetName, function(c) {
				if (!0 === a.data(c.target, b.widgetName + ".preventClickEvent")) return a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1
			}), this.started = !1
		},
		_mouseDestroy: function() {
			this.element.unbind("." + this.widgetName), a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
		},
		_mouseDown: function(b) {
			if (c) return;
			this._mouseStarted && this._mouseUp(b), this._mouseDownEvent = b;
			var d = this,
				e = b.which == 1,
				f = typeof this.options.cancel == "string" && b.target.nodeName ? a(b.target).closest(this.options.cancel).length : !1;
			if (!e || f || !this._mouseCapture(b)) return !0;
			this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
				d.mouseDelayMet = !0
			}, this.options.delay));
			if (this._mouseDistanceMet(b) && this._mouseDelayMet(b)) {
				this._mouseStarted = this._mouseStart(b) !== !1;
				if (!this._mouseStarted) return b.preventDefault(), !0
			}
			return !0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(a) {
				return d._mouseMove(a)
			}, this._mouseUpDelegate = function(a) {
				return d._mouseUp(a)
			}, a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), b.preventDefault(), c = !0, !0
		},
		_mouseMove: function(b) {
			return !a.browser.msie || document.documentMode >= 9 || !!b.button ? this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted) : this._mouseUp(b)
		},
		_mouseUp: function(b) {
			return a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target == this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b)), !1
		},
		_mouseDistanceMet: function(a) {
			return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
		},
		_mouseDelayMet: function(a) {
			return this.mouseDelayMet
		},
		_mouseStart: function(a) {},
		_mouseDrag: function(a) {},
		_mouseStop: function(a) {},
		_mouseCapture: function(a) {
			return !0
		}
	})
})(jQuery);;
/*! jQuery UI - v1.8.22 - 2012-07-24
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.position.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	a.ui = a.ui || {};
	var c = /left|center|right/,
		d = /top|center|bottom/,
		e = "center",
		f = {},
		g = a.fn.position,
		h = a.fn.offset;
	a.fn.position = function(b) {
			if (!b || !b.of) return g.apply(this, arguments);
			b = a.extend({}, b);
			var h = a(b.of),
				i = h[0],
				j = (b.collision || "flip").split(" "),
				k = b.offset ? b.offset.split(" ") : [0, 0],
				l, m, n;
			return i.nodeType === 9 ? (l = h.width(), m = h.height(), n = {
				top: 0,
				left: 0
			}) : i.setTimeout ? (l = h.width(), m = h.height(), n = {
				top: h.scrollTop(),
				left: h.scrollLeft()
			}) : i.preventDefault ? (b.at = "left top", l = m = 0, n = {
				top: b.of.pageY,
				left: b.of.pageX
			}) : (l = h.outerWidth(), m = h.outerHeight(), n = h.offset()), a.each(["my", "at"], function() {
				var a = (b[this] || "").split(" ");
				a.length === 1 && (a = c.test(a[0]) ? a.concat([e]) : d.test(a[0]) ? [e].concat(a) : [e, e]), a[0] = c.test(a[0]) ? a[0] : e, a[1] = d.test(a[1]) ? a[1] : e, b[this] = a
			}), j.length === 1 && (j[1] = j[0]), k[0] = parseInt(k[0], 10) || 0, k.length === 1 && (k[1] = k[0]), k[1] = parseInt(k[1], 10) || 0, b.at[0] === "right" ? n.left += l : b.at[0] === e && (n.left += l / 2), b.at[1] === "bottom" ? n.top += m : b.at[1] === e && (n.top += m / 2), n.left += k[0], n.top += k[1], this.each(function() {
				var c = a(this),
					d = c.outerWidth(),
					g = c.outerHeight(),
					h = parseInt(a.curCSS(this, "marginLeft", !0)) || 0,
					i = parseInt(a.curCSS(this, "marginTop", !0)) || 0,
					o = d + h + (parseInt(a.curCSS(this, "marginRight", !0)) || 0),
					p = g + i + (parseInt(a.curCSS(this, "marginBottom", !0)) || 0),
					q = a.extend({}, n),
					r;
				b.my[0] === "right" ? q.left -= d : b.my[0] === e && (q.left -= d / 2), b.my[1] === "bottom" ? q.top -= g : b.my[1] === e && (q.top -= g / 2), f.fractions || (q.left = Math.round(q.left), q.top = Math.round(q.top)), r = {
					left: q.left - h,
					top: q.top - i
				}, a.each(["left", "top"], function(c, e) {
					a.ui.position[j[c]] && a.ui.position[j[c]][e](q, {
						targetWidth: l,
						targetHeight: m,
						elemWidth: d,
						elemHeight: g,
						collisionPosition: r,
						collisionWidth: o,
						collisionHeight: p,
						offset: k,
						my: b.my,
						at: b.at
					})
				}), a.fn.bgiframe && c.bgiframe(), c.offset(a.extend(q, {
					using: b.using
				}))
			})
		}, a.ui.position = {
			fit: {
				left: function(b, c) {
					var d = a(window),
						e = c.collisionPosition.left + c.collisionWidth - d.width() - d.scrollLeft();
					b.left = e > 0 ? b.left - e : Math.max(b.left - c.collisionPosition.left, b.left)
				},
				top: function(b, c) {
					var d = a(window),
						e = c.collisionPosition.top + c.collisionHeight - d.height() - d.scrollTop();
					b.top = e > 0 ? b.top - e : Math.max(b.top - c.collisionPosition.top, b.top)
				}
			},
			flip: {
				left: function(b, c) {
					if (c.at[0] === e) return;
					var d = a(window),
						f = c.collisionPosition.left + c.collisionWidth - d.width() - d.scrollLeft(),
						g = c.my[0] === "left" ? -c.elemWidth : c.my[0] === "right" ? c.elemWidth : 0,
						h = c.at[0] === "left" ? c.targetWidth : -c.targetWidth,
						i = -2 * c.offset[0];
					b.left += c.collisionPosition.left < 0 ? g + h + i : f > 0 ? g + h + i : 0
				},
				top: function(b, c) {
					if (c.at[1] === e) return;
					var d = a(window),
						f = c.collisionPosition.top + c.collisionHeight - d.height() - d.scrollTop(),
						g = c.my[1] === "top" ? -c.elemHeight : c.my[1] === "bottom" ? c.elemHeight : 0,
						h = c.at[1] === "top" ? c.targetHeight : -c.targetHeight,
						i = -2 * c.offset[1];
					b.top += c.collisionPosition.top < 0 ? g + h + i : f > 0 ? g + h + i : 0
				}
			}
		}, a.offset.setOffset || (a.offset.setOffset = function(b, c) {
			/static/.test(a.curCSS(b, "position")) && (b.style.position = "relative");
			var d = a(b),
				e = d.offset(),
				f = parseInt(a.curCSS(b, "top", !0), 10) || 0,
				g = parseInt(a.curCSS(b, "left", !0), 10) || 0,
				h = {
					top: c.top - e.top + f,
					left: c.left - e.left + g
				};
			"using" in c ? c.using.call(b, h) : d.css(h)
		}, a.fn.offset = function(b) {
			var c = this[0];
			return !c || !c.ownerDocument ? null : b ? a.isFunction(b) ? this.each(function(c) {
				a(this).offset(b.call(this, c, a(this).offset()))
			}) : this.each(function() {
				a.offset.setOffset(this, b)
			}) : h.call(this)
		}),
		function() {
			var b = document.getElementsByTagName("body")[0],
				c = document.createElement("div"),
				d, e, g, h, i;
			d = document.createElement(b ? "div" : "body"), g = {
				visibility: "hidden",
				width: 0,
				height: 0,
				border: 0,
				margin: 0,
				background: "none"
			}, b && a.extend(g, {
				position: "absolute",
				left: "-1000px",
				top: "-1000px"
			});
			for (var j in g) d.style[j] = g[j];
			d.appendChild(c), e = b || document.documentElement, e.insertBefore(d, e.firstChild), c.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;", h = a(c).offset(function(a, b) {
				return b
			}).offset(), d.innerHTML = "", e.removeChild(d), i = h.top + h.left + (b ? 2e3 : 0), f.fractions = i > 21 && i < 22
		}()
})(jQuery);;
/*! jQuery UI - v1.8.22 - 2012-07-24
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.draggable.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	a.widget("ui.draggable", a.ui.mouse, {
		widgetEventPrefix: "drag",
		options: {
			addClasses: !0,
			appendTo: "parent",
			axis: !1,
			connectToSortable: !1,
			containment: !1,
			cursor: "auto",
			cursorAt: !1,
			grid: !1,
			handle: !1,
			helper: "original",
			iframeFix: !1,
			opacity: !1,
			refreshPositions: !1,
			revert: !1,
			revertDuration: 500,
			scope: "default",
			scroll: !0,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			snap: !1,
			snapMode: "both",
			snapTolerance: 20,
			stack: !1,
			zIndex: !1
		},
		_create: function() {
			this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
		},
		destroy: function() {
			if (!this.element.data("draggable")) return;
			return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy(), this
		},
		_mouseCapture: function(b) {
			var c = this.options;
			return this.helper || c.disabled || a(b.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(b), this.handle ? (c.iframeFix && a(c.iframeFix === !0 ? "iframe" : c.iframeFix).each(function() {
				a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
					width: this.offsetWidth + "px",
					height: this.offsetHeight + "px",
					position: "absolute",
					opacity: "0.001",
					zIndex: 1e3
				}).css(a(this).offset()).appendTo("body")
			}), !0) : !1)
		},
		_mouseStart: function(b) {
			var c = this.options;
			return this.helper = this._createHelper(b), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
				top: this.offset.top - this.margins.top,
				left: this.offset.left - this.margins.left
			}, a.extend(this.offset, {
				click: {
					left: b.pageX - this.offset.left,
					top: b.pageY - this.offset.top
				},
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			}), this.originalPosition = this.position = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), c.containment && this._setContainment(), this._trigger("start", b) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0)
		},
		_mouseDrag: function(b, c) {
			this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute");
			if (!c) {
				var d = this._uiHash();
				if (this._trigger("drag", b, d) === !1) return this._mouseUp({}), !1;
				this.position = d.position
			}
			if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
			if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
			return a.ui.ddmanager && a.ui.ddmanager.drag(this, b), !1
		},
		_mouseStop: function(b) {
			var c = !1;
			a.ui.ddmanager && !this.options.dropBehaviour && (c = a.ui.ddmanager.drop(this, b)), this.dropped && (c = this.dropped, this.dropped = !1);
			var d = this.element[0],
				e = !1;
			while (d && (d = d.parentNode)) d == document && (e = !0);
			if (!e && this.options.helper === "original") return !1;
			if (this.options.revert == "invalid" && !c || this.options.revert == "valid" && c || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, c)) {
				var f = this;
				a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
					f._trigger("stop", b) !== !1 && f._clear()
				})
			} else this._trigger("stop", b) !== !1 && this._clear();
			return !1
		},
		_mouseUp: function(b) {
			return this.options.iframeFix === !0 && a("div.ui-draggable-iframeFix").each(function() {
				this.parentNode.removeChild(this)
			}), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b), a.ui.mouse.prototype._mouseUp.call(this, b)
		},
		cancel: function() {
			return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
		},
		_getHandle: function(b) {
			var c = !this.options.handle || !a(this.options.handle, this.element).length ? !0 : !1;
			return a(this.options.handle, this.element).find("*").andSelf().each(function() {
				this == b.target && (c = !0)
			}), c
		},
		_createHelper: function(b) {
			var c = this.options,
				d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b])) : c.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
			return d.parents("body").length || d.appendTo(c.appendTo == "parent" ? this.element[0].parentNode : c.appendTo), d[0] != this.element[0] && !/(fixed|absolute)/.test(d.css("position")) && d.css("position", "absolute"), d
		},
		_adjustOffsetFromHelper: function(b) {
			typeof b == "string" && (b = b.split(" ")), a.isArray(b) && (b = {
				left: +b[0],
				top: +b[1] || 0
			}), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
		},
		_getParentOffset: function() {
			this.offsetParent = this.helper.offsetParent();
			var b = this.offsetParent.offset();
			this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop());
			if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie) b = {
				top: 0,
				left: 0
			};
			return {
				top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function() {
			if (this.cssPosition == "relative") {
				var a = this.element.position();
				return {
					top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				}
			}
			return {
				top: 0,
				left: 0
			}
		},
		_cacheMargins: function() {
			this.margins = {
				left: parseInt(this.element.css("marginLeft"), 10) || 0,
				top: parseInt(this.element.css("marginTop"), 10) || 0,
				right: parseInt(this.element.css("marginRight"), 10) || 0,
				bottom: parseInt(this.element.css("marginBottom"), 10) || 0
			}
		},
		_cacheHelperProportions: function() {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			}
		},
		_setContainment: function() {
			var b = this.options;
			b.containment == "parent" && (b.containment = this.helper[0].parentNode);
			if (b.containment == "document" || b.containment == "window") this.containment = [b.containment == "document" ? 0 : a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, b.containment == "document" ? 0 : a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (b.containment == "document" ? 0 : a(window).scrollLeft()) + a(b.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (b.containment == "document" ? 0 : a(window).scrollTop()) + (a(b.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
			if (!/^(document|window|parent)$/.test(b.containment) && b.containment.constructor != Array) {
				var c = a(b.containment),
					d = c[0];
				if (!d) return;
				var e = c.offset(),
					f = a(d).css("overflow") != "hidden";
				this.containment = [(parseInt(a(d).css("borderLeftWidth"), 10) || 0) + (parseInt(a(d).css("paddingLeft"), 10) || 0), (parseInt(a(d).css("borderTopWidth"), 10) || 0) + (parseInt(a(d).css("paddingTop"), 10) || 0), (f ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css("borderLeftWidth"), 10) || 0) - (parseInt(a(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (f ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css("borderTopWidth"), 10) || 0) - (parseInt(a(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = c
			} else b.containment.constructor == Array && (this.containment = b.containment)
		},
		_convertPositionTo: function(b, c) {
			c || (c = this.position);
			var d = b == "absolute" ? 1 : -1,
				e = this.options,
				f = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
				g = /(html|body)/i.test(f[0].tagName);
			return {
				top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()) * d),
				left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * d)
			}
		},
		_generatePosition: function(b) {
			var c = this.options,
				d = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
				e = /(html|body)/i.test(d[0].tagName),
				f = b.pageX,
				g = b.pageY;
			if (this.originalPosition) {
				var h;
				if (this.containment) {
					if (this.relative_container) {
						var i = this.relative_container.offset();
						h = [this.containment[0] + i.left, this.containment[1] + i.top, this.containment[2] + i.left, this.containment[3] + i.top]
					} else h = this.containment;
					b.pageX - this.offset.click.left < h[0] && (f = h[0] + this.offset.click.left), b.pageY - this.offset.click.top < h[1] && (g = h[1] + this.offset.click.top), b.pageX - this.offset.click.left > h[2] && (f = h[2] + this.offset.click.left), b.pageY - this.offset.click.top > h[3] && (g = h[3] + this.offset.click.top)
				}
				if (c.grid) {
					var j = c.grid[1] ? this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1] : this.originalPageY;
					g = h ? j - this.offset.click.top < h[1] || j - this.offset.click.top > h[3] ? j - this.offset.click.top < h[1] ? j + c.grid[1] : j - c.grid[1] : j : j;
					var k = c.grid[0] ? this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0] : this.originalPageX;
					f = h ? k - this.offset.click.left < h[0] || k - this.offset.click.left > h[2] ? k - this.offset.click.left < h[0] ? k + c.grid[0] : k - c.grid[0] : k : k
				}
			}
			return {
				top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()),
				left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())
			}
		},
		_clear: function() {
			this.helper.removeClass("ui-draggable-dragging"), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
		},
		_trigger: function(b, c, d) {
			return d = d || this._uiHash(), a.ui.plugin.call(this, b, [c, d]), b == "drag" && (this.positionAbs = this._convertPositionTo("absolute")), a.Widget.prototype._trigger.call(this, b, c, d)
		},
		plugins: {},
		_uiHash: function(a) {
			return {
				helper: this.helper,
				position: this.position,
				originalPosition: this.originalPosition,
				offset: this.positionAbs
			}
		}
	}), a.extend(a.ui.draggable, {
		version: "1.8.22"
	}), a.ui.plugin.add("draggable", "connectToSortable", {
		start: function(b, c) {
			var d = a(this).data("draggable"),
				e = d.options,
				f = a.extend({}, c, {
					item: d.element
				});
			d.sortables = [], a(e.connectToSortable).each(function() {
				var c = a.data(this, "sortable");
				c && !c.options.disabled && (d.sortables.push({
					instance: c,
					shouldRevert: c.options.revert
				}), c.refreshPositions(), c._trigger("activate", b, f))
			})
		},
		stop: function(b, c) {
			var d = a(this).data("draggable"),
				e = a.extend({}, c, {
					item: d.element
				});
			a.each(d.sortables, function() {
				this.instance.isOver ? (this.instance.isOver = 0, d.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(b), this.instance.options.helper = this.instance.options._helper, d.options.helper == "original" && this.instance.currentItem.css({
					top: "auto",
					left: "auto"
				})) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", b, e))
			})
		},
		drag: function(b, c) {
			var d = a(this).data("draggable"),
				e = this,
				f = function(b) {
					var c = this.offset.click.top,
						d = this.offset.click.left,
						e = this.positionAbs.top,
						f = this.positionAbs.left,
						g = b.height,
						h = b.width,
						i = b.top,
						j = b.left;
					return a.ui.isOver(e + c, f + d, i, j, g, h)
				};
			a.each(d.sortables, function(f) {
				this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, this.instance.offset.click = d.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
					return c.helper[0]
				}, b.target = this.instance.currentItem[0], this.instance._mouseCapture(b, !0), this.instance._mouseStart(b, !0, !0), this.instance.offset.click.top = d.offset.click.top, this.instance.offset.click.left = d.offset.click.left, this.instance.offset.parent.left -= d.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= d.offset.parent.top - this.instance.offset.parent.top, d._trigger("toSortable", b), d.dropped = this.instance.element, d.currentItem = d.element, this.instance.fromOutside = d), this.instance.currentItem && this.instance._mouseDrag(b)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", b, this.instance._uiHash(this.instance)), this.instance._mouseStop(b, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), d._trigger("fromSortable", b), d.dropped = !1)
			})
		}
	}), a.ui.plugin.add("draggable", "cursor", {
		start: function(b, c) {
			var d = a("body"),
				e = a(this).data("draggable").options;
			d.css("cursor") && (e._cursor = d.css("cursor")), d.css("cursor", e.cursor)
		},
		stop: function(b, c) {
			var d = a(this).data("draggable").options;
			d._cursor && a("body").css("cursor", d._cursor)
		}
	}), a.ui.plugin.add("draggable", "opacity", {
		start: function(b, c) {
			var d = a(c.helper),
				e = a(this).data("draggable").options;
			d.css("opacity") && (e._opacity = d.css("opacity")), d.css("opacity", e.opacity)
		},
		stop: function(b, c) {
			var d = a(this).data("draggable").options;
			d._opacity && a(c.helper).css("opacity", d._opacity)
		}
	}), a.ui.plugin.add("draggable", "scroll", {
		start: function(b, c) {
			var d = a(this).data("draggable");
			d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML" && (d.overflowOffset = d.scrollParent.offset())
		},
		drag: function(b, c) {
			var d = a(this).data("draggable"),
				e = d.options,
				f = !1;
			if (d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML") {
				if (!e.axis || e.axis != "x") d.overflowOffset.top + d.scrollParent[0].offsetHeight - b.pageY < e.scrollSensitivity ? d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop + e.scrollSpeed : b.pageY - d.overflowOffset.top < e.scrollSensitivity && (d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop - e.scrollSpeed);
				if (!e.axis || e.axis != "y") d.overflowOffset.left + d.scrollParent[0].offsetWidth - b.pageX < e.scrollSensitivity ? d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft + e.scrollSpeed : b.pageX - d.overflowOffset.left < e.scrollSensitivity && (d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft - e.scrollSpeed)
			} else {
				if (!e.axis || e.axis != "x") b.pageY - a(document).scrollTop() < e.scrollSensitivity ? f = a(document).scrollTop(a(document).scrollTop() - e.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < e.scrollSensitivity && (f = a(document).scrollTop(a(document).scrollTop() + e.scrollSpeed));
				if (!e.axis || e.axis != "y") b.pageX - a(document).scrollLeft() < e.scrollSensitivity ? f = a(document).scrollLeft(a(document).scrollLeft() - e.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < e.scrollSensitivity && (f = a(document).scrollLeft(a(document).scrollLeft() + e.scrollSpeed))
			}
			f !== !1 && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, b)
		}
	}), a.ui.plugin.add("draggable", "snap", {
		start: function(b, c) {
			var d = a(this).data("draggable"),
				e = d.options;
			d.snapElements = [], a(e.snap.constructor != String ? e.snap.items || ":data(draggable)" : e.snap).each(function() {
				var b = a(this),
					c = b.offset();
				this != d.element[0] && d.snapElements.push({
					item: this,
					width: b.outerWidth(),
					height: b.outerHeight(),
					top: c.top,
					left: c.left
				})
			})
		},
		drag: function(b, c) {
			var d = a(this).data("draggable"),
				e = d.options,
				f = e.snapTolerance,
				g = c.offset.left,
				h = g + d.helperProportions.width,
				i = c.offset.top,
				j = i + d.helperProportions.height;
			for (var k = d.snapElements.length - 1; k >= 0; k--) {
				var l = d.snapElements[k].left,
					m = l + d.snapElements[k].width,
					n = d.snapElements[k].top,
					o = n + d.snapElements[k].height;
				if (!(l - f < g && g < m + f && n - f < i && i < o + f || l - f < g && g < m + f && n - f < j && j < o + f || l - f < h && h < m + f && n - f < i && i < o + f || l - f < h && h < m + f && n - f < j && j < o + f)) {
					d.snapElements[k].snapping && d.options.snap.release && d.options.snap.release.call(d.element, b, a.extend(d._uiHash(), {
						snapItem: d.snapElements[k].item
					})), d.snapElements[k].snapping = !1;
					continue
				}
				if (e.snapMode != "inner") {
					var p = Math.abs(n - j) <= f,
						q = Math.abs(o - i) <= f,
						r = Math.abs(l - h) <= f,
						s = Math.abs(m - g) <= f;
					p && (c.position.top = d._convertPositionTo("relative", {
						top: n - d.helperProportions.height,
						left: 0
					}).top - d.margins.top), q && (c.position.top = d._convertPositionTo("relative", {
						top: o,
						left: 0
					}).top - d.margins.top), r && (c.position.left = d._convertPositionTo("relative", {
						top: 0,
						left: l - d.helperProportions.width
					}).left - d.margins.left), s && (c.position.left = d._convertPositionTo("relative", {
						top: 0,
						left: m
					}).left - d.margins.left)
				}
				var t = p || q || r || s;
				if (e.snapMode != "outer") {
					var p = Math.abs(n - i) <= f,
						q = Math.abs(o - j) <= f,
						r = Math.abs(l - g) <= f,
						s = Math.abs(m - h) <= f;
					p && (c.position.top = d._convertPositionTo("relative", {
						top: n,
						left: 0
					}).top - d.margins.top), q && (c.position.top = d._convertPositionTo("relative", {
						top: o - d.helperProportions.height,
						left: 0
					}).top - d.margins.top), r && (c.position.left = d._convertPositionTo("relative", {
						top: 0,
						left: l
					}).left - d.margins.left), s && (c.position.left = d._convertPositionTo("relative", {
						top: 0,
						left: m - d.helperProportions.width
					}).left - d.margins.left)
				}!d.snapElements[k].snapping && (p || q || r || s || t) && d.options.snap.snap && d.options.snap.snap.call(d.element, b, a.extend(d._uiHash(), {
					snapItem: d.snapElements[k].item
				})), d.snapElements[k].snapping = p || q || r || s || t
			}
		}
	}), a.ui.plugin.add("draggable", "stack", {
		start: function(b, c) {
			var d = a(this).data("draggable").options,
				e = a.makeArray(a(d.stack)).sort(function(b, c) {
					return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0)
				});
			if (!e.length) return;
			var f = parseInt(e[0].style.zIndex) || 0;
			a(e).each(function(a) {
				this.style.zIndex = f + a
			}), this[0].style.zIndex = f + e.length
		}
	}), a.ui.plugin.add("draggable", "zIndex", {
		start: function(b, c) {
			var d = a(c.helper),
				e = a(this).data("draggable").options;
			d.css("zIndex") && (e._zIndex = d.css("zIndex")), d.css("zIndex", e.zIndex)
		},
		stop: function(b, c) {
			var d = a(this).data("draggable").options;
			d._zIndex && a(c.helper).css("zIndex", d._zIndex)
		}
	})
})(jQuery);;
/*! jQuery UI - v1.8.22 - 2012-07-24
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.resizable.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	a.widget("ui.resizable", a.ui.mouse, {
		widgetEventPrefix: "resize",
		options: {
			alsoResize: !1,
			animate: !1,
			animateDuration: "slow",
			animateEasing: "swing",
			aspectRatio: !1,
			autoHide: !1,
			containment: !1,
			ghost: !1,
			grid: !1,
			handles: "e,s,se",
			helper: !1,
			maxHeight: null,
			maxWidth: null,
			minHeight: 10,
			minWidth: 10,
			zIndex: 1e3
		},
		_create: function() {
			var b = this,
				c = this.options;
			this.element.addClass("ui-resizable"), a.extend(this, {
				_aspectRatio: !!c.aspectRatio,
				aspectRatio: c.aspectRatio,
				originalElement: this.element,
				_proportionallyResizeElements: [],
				_helper: c.helper || c.ghost || c.animate ? c.helper || "ui-resizable-helper" : null
			}), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
				position: this.element.css("position"),
				width: this.element.outerWidth(),
				height: this.element.outerHeight(),
				top: this.element.css("top"),
				left: this.element.css("left")
			})), this.element = this.element.parent().data("resizable", this.element.data("resizable")), this.elementIsWrapper = !0, this.element.css({
				marginLeft: this.originalElement.css("marginLeft"),
				marginTop: this.originalElement.css("marginTop"),
				marginRight: this.originalElement.css("marginRight"),
				marginBottom: this.originalElement.css("marginBottom")
			}), this.originalElement.css({
				marginLeft: 0,
				marginTop: 0,
				marginRight: 0,
				marginBottom: 0
			}), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
				position: "static",
				zoom: 1,
				display: "block"
			})), this.originalElement.css({
				margin: this.originalElement.css("margin")
			}), this._proportionallyResize()), this.handles = c.handles || (a(".ui-resizable-handle", this.element).length ? {
				n: ".ui-resizable-n",
				e: ".ui-resizable-e",
				s: ".ui-resizable-s",
				w: ".ui-resizable-w",
				se: ".ui-resizable-se",
				sw: ".ui-resizable-sw",
				ne: ".ui-resizable-ne",
				nw: ".ui-resizable-nw"
			} : "e,s,se");
			if (this.handles.constructor == String) {
				this.handles == "all" && (this.handles = "n,e,s,w,se,sw,ne,nw");
				var d = this.handles.split(",");
				this.handles = {};
				for (var e = 0; e < d.length; e++) {
					var f = a.trim(d[e]),
						g = "ui-resizable-" + f,
						h = a('<div class="ui-resizable-handle ' + g + '"></div>');
					h.css({
						zIndex: c.zIndex
					}), "se" == f && h.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[f] = ".ui-resizable-" + f, this.element.append(h)
				}
			}
			this._renderAxis = function(b) {
				b = b || this.element;
				for (var c in this.handles) {
					this.handles[c].constructor == String && (this.handles[c] = a(this.handles[c], this.element).show());
					if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
						var d = a(this.handles[c], this.element),
							e = 0;
						e = /sw|ne|nw|se|n|s/.test(c) ? d.outerHeight() : d.outerWidth();
						var f = ["padding", /ne|nw|n/.test(c) ? "Top" : /se|sw|s/.test(c) ? "Bottom" : /^e$/.test(c) ? "Right" : "Left"].join("");
						b.css(f, e), this._proportionallyResize()
					}
					if (!a(this.handles[c]).length) continue
				}
			}, this._renderAxis(this.element), this._handles = a(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
				if (!b.resizing) {
					if (this.className) var a = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
					b.axis = a && a[1] ? a[1] : "se"
				}
			}), c.autoHide && (this._handles.hide(), a(this.element).addClass("ui-resizable-autohide").hover(function() {
				if (c.disabled) return;
				a(this).removeClass("ui-resizable-autohide"), b._handles.show()
			}, function() {
				if (c.disabled) return;
				b.resizing || (a(this).addClass("ui-resizable-autohide"), b._handles.hide())
			})), this._mouseInit()
		},
		destroy: function() {
			this._mouseDestroy();
			var b = function(b) {
				a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
			};
			if (this.elementIsWrapper) {
				b(this.element);
				var c = this.element;
				c.after(this.originalElement.css({
					position: c.css("position"),
					width: c.outerWidth(),
					height: c.outerHeight(),
					top: c.css("top"),
					left: c.css("left")
				})).remove()
			}
			return this.originalElement.css("resize", this.originalResizeStyle), b(this.originalElement), this
		},
		_mouseCapture: function(b) {
			var c = !1;
			for (var d in this.handles) a(this.handles[d])[0] == b.target && (c = !0);
			return !this.options.disabled && c
		},
		_mouseStart: function(b) {
			var d = this.options,
				e = this.element.position(),
				f = this.element;
			this.resizing = !0, this.documentScroll = {
				top: a(document).scrollTop(),
				left: a(document).scrollLeft()
			}, (f.is(".ui-draggable") || /absolute/.test(f.css("position"))) && f.css({
				position: "absolute",
				top: e.top,
				left: e.left
			}), this._renderProxy();
			var g = c(this.helper.css("left")),
				h = c(this.helper.css("top"));
			d.containment && (g += a(d.containment).scrollLeft() || 0, h += a(d.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
				left: g,
				top: h
			}, this.size = this._helper ? {
				width: f.outerWidth(),
				height: f.outerHeight()
			} : {
				width: f.width(),
				height: f.height()
			}, this.originalSize = this._helper ? {
				width: f.outerWidth(),
				height: f.outerHeight()
			} : {
				width: f.width(),
				height: f.height()
			}, this.originalPosition = {
				left: g,
				top: h
			}, this.sizeDiff = {
				width: f.outerWidth() - f.width(),
				height: f.outerHeight() - f.height()
			}, this.originalMousePosition = {
				left: b.pageX,
				top: b.pageY
			}, this.aspectRatio = typeof d.aspectRatio == "number" ? d.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
			var i = a(".ui-resizable-" + this.axis).css("cursor");
			return a("body").css("cursor", i == "auto" ? this.axis + "-resize" : i), f.addClass("ui-resizable-resizing"), this._propagate("start", b), !0
		},
		_mouseDrag: function(b) {
			var c = this.helper,
				d = this.options,
				e = {},
				f = this,
				g = this.originalMousePosition,
				h = this.axis,
				i = b.pageX - g.left || 0,
				j = b.pageY - g.top || 0,
				k = this._change[h];
			if (!k) return !1;
			var l = k.apply(this, [b, i, j]),
				m = a.browser.msie && a.browser.version < 7,
				n = this.sizeDiff;
			this._updateVirtualBoundaries(b.shiftKey);
			if (this._aspectRatio || b.shiftKey) l = this._updateRatio(l, b);
			return l = this._respectSize(l, b), this._propagate("resize", b), c.css({
				top: this.position.top + "px",
				left: this.position.left + "px",
				width: this.size.width + "px",
				height: this.size.height + "px"
			}), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), this._updateCache(l), this._trigger("resize", b, this.ui()), !1
		},
		_mouseStop: function(b) {
			this.resizing = !1;
			var c = this.options,
				d = this;
			if (this._helper) {
				var e = this._proportionallyResizeElements,
					f = e.length && /textarea/i.test(e[0].nodeName),
					g = f && a.ui.hasScroll(e[0], "left") ? 0 : d.sizeDiff.height,
					h = f ? 0 : d.sizeDiff.width,
					i = {
						width: d.helper.width() - h,
						height: d.helper.height() - g
					},
					j = parseInt(d.element.css("left"), 10) + (d.position.left - d.originalPosition.left) || null,
					k = parseInt(d.element.css("top"), 10) + (d.position.top - d.originalPosition.top) || null;
				c.animate || this.element.css(a.extend(i, {
					top: k,
					left: j
				})), d.helper.height(d.size.height), d.helper.width(d.size.width), this._helper && !c.animate && this._proportionallyResize()
			}
			return a("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", b), this._helper && this.helper.remove(), !1
		},
		_updateVirtualBoundaries: function(a) {
			var b = this.options,
				c, e, f, g, h;
			h = {
				minWidth: d(b.minWidth) ? b.minWidth : 0,
				maxWidth: d(b.maxWidth) ? b.maxWidth : Infinity,
				minHeight: d(b.minHeight) ? b.minHeight : 0,
				maxHeight: d(b.maxHeight) ? b.maxHeight : Infinity
			};
			if (this._aspectRatio || a) c = h.minHeight * this.aspectRatio, f = h.minWidth / this.aspectRatio, e = h.maxHeight * this.aspectRatio, g = h.maxWidth / this.aspectRatio, c > h.minWidth && (h.minWidth = c), f > h.minHeight && (h.minHeight = f), e < h.maxWidth && (h.maxWidth = e), g < h.maxHeight && (h.maxHeight = g);
			this._vBoundaries = h
		},
		_updateCache: function(a) {
			var b = this.options;
			this.offset = this.helper.offset(), d(a.left) && (this.position.left = a.left), d(a.top) && (this.position.top = a.top), d(a.height) && (this.size.height = a.height), d(a.width) && (this.size.width = a.width)
		},
		_updateRatio: function(a, b) {
			var c = this.options,
				e = this.position,
				f = this.size,
				g = this.axis;
			return d(a.height) ? a.width = a.height * this.aspectRatio : d(a.width) && (a.height = a.width / this.aspectRatio), g == "sw" && (a.left = e.left + (f.width - a.width), a.top = null), g == "nw" && (a.top = e.top + (f.height - a.height), a.left = e.left + (f.width - a.width)), a
		},
		_respectSize: function(a, b) {
			var c = this.helper,
				e = this._vBoundaries,
				f = this._aspectRatio || b.shiftKey,
				g = this.axis,
				h = d(a.width) && e.maxWidth && e.maxWidth < a.width,
				i = d(a.height) && e.maxHeight && e.maxHeight < a.height,
				j = d(a.width) && e.minWidth && e.minWidth > a.width,
				k = d(a.height) && e.minHeight && e.minHeight > a.height;
			j && (a.width = e.minWidth), k && (a.height = e.minHeight), h && (a.width = e.maxWidth), i && (a.height = e.maxHeight);
			var l = this.originalPosition.left + this.originalSize.width,
				m = this.position.top + this.size.height,
				n = /sw|nw|w/.test(g),
				o = /nw|ne|n/.test(g);
			j && n && (a.left = l - e.minWidth), h && n && (a.left = l - e.maxWidth), k && o && (a.top = m - e.minHeight), i && o && (a.top = m - e.maxHeight);
			var p = !a.width && !a.height;
			return p && !a.left && a.top ? a.top = null : p && !a.top && a.left && (a.left = null), a
		},
		_proportionallyResize: function() {
			var b = this.options;
			if (!this._proportionallyResizeElements.length) return;
			var c = this.helper || this.element;
			for (var d = 0; d < this._proportionallyResizeElements.length; d++) {
				var e = this._proportionallyResizeElements[d];
				if (!this.borderDif) {
					var f = [e.css("borderTopWidth"), e.css("borderRightWidth"), e.css("borderBottomWidth"), e.css("borderLeftWidth")],
						g = [e.css("paddingTop"), e.css("paddingRight"), e.css("paddingBottom"), e.css("paddingLeft")];
					this.borderDif = a.map(f, function(a, b) {
						var c = parseInt(a, 10) || 0,
							d = parseInt(g[b], 10) || 0;
						return c + d
					})
				}
				if (!a.browser.msie || !a(c).is(":hidden") && !a(c).parents(":hidden").length) e.css({
					height: c.height() - this.borderDif[0] - this.borderDif[2] || 0,
					width: c.width() - this.borderDif[1] - this.borderDif[3] || 0
				});
				else continue
			}
		},
		_renderProxy: function() {
			var b = this.element,
				c = this.options;
			this.elementOffset = b.offset();
			if (this._helper) {
				this.helper = this.helper || a('<div style="overflow:hidden;"></div>');
				var d = a.browser.msie && a.browser.version < 7,
					e = d ? 1 : 0,
					f = d ? 2 : -1;
				this.helper.addClass(this._helper).css({
					width: this.element.outerWidth() + f,
					height: this.element.outerHeight() + f,
					position: "absolute",
					left: this.elementOffset.left - e + "px",
					top: this.elementOffset.top - e + "px",
					zIndex: ++c.zIndex
				}), this.helper.appendTo("body").disableSelection()
			} else this.helper = this.element
		},
		_change: {
			e: function(a, b, c) {
				return {
					width: this.originalSize.width + b
				}
			},
			w: function(a, b, c) {
				var d = this.options,
					e = this.originalSize,
					f = this.originalPosition;
				return {
					left: f.left + b,
					width: e.width - b
				}
			},
			n: function(a, b, c) {
				var d = this.options,
					e = this.originalSize,
					f = this.originalPosition;
				return {
					top: f.top + c,
					height: e.height - c
				}
			},
			s: function(a, b, c) {
				return {
					height: this.originalSize.height + c
				}
			},
			se: function(b, c, d) {
				return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
			},
			sw: function(b, c, d) {
				return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
			},
			ne: function(b, c, d) {
				return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
			},
			nw: function(b, c, d) {
				return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
			}
		},
		_propagate: function(b, c) {
			a.ui.plugin.call(this, b, [c, this.ui()]), b != "resize" && this._trigger(b, c, this.ui())
		},
		plugins: {},
		ui: function() {
			return {
				originalElement: this.originalElement,
				element: this.element,
				helper: this.helper,
				position: this.position,
				size: this.size,
				originalSize: this.originalSize,
				originalPosition: this.originalPosition
			}
		}
	}), a.extend(a.ui.resizable, {
		version: "1.8.22"
	}), a.ui.plugin.add("resizable", "alsoResize", {
		start: function(b, c) {
			var d = a(this).data("resizable"),
				e = d.options,
				f = function(b) {
					a(b).each(function() {
						var b = a(this);
						b.data("resizable-alsoresize", {
							width: parseInt(b.width(), 10),
							height: parseInt(b.height(), 10),
							left: parseInt(b.css("left"), 10),
							top: parseInt(b.css("top"), 10)
						})
					})
				};
			typeof e.alsoResize == "object" && !e.alsoResize.parentNode ? e.alsoResize.length ? (e.alsoResize = e.alsoResize[0], f(e.alsoResize)) : a.each(e.alsoResize, function(a) {
				f(a)
			}) : f(e.alsoResize)
		},
		resize: function(b, c) {
			var d = a(this).data("resizable"),
				e = d.options,
				f = d.originalSize,
				g = d.originalPosition,
				h = {
					height: d.size.height - f.height || 0,
					width: d.size.width - f.width || 0,
					top: d.position.top - g.top || 0,
					left: d.position.left - g.left || 0
				},
				i = function(b, d) {
					a(b).each(function() {
						var b = a(this),
							e = a(this).data("resizable-alsoresize"),
							f = {},
							g = d && d.length ? d : b.parents(c.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
						a.each(g, function(a, b) {
							var c = (e[b] || 0) + (h[b] || 0);
							c && c >= 0 && (f[b] = c || null)
						}), b.css(f)
					})
				};
			typeof e.alsoResize == "object" && !e.alsoResize.nodeType ? a.each(e.alsoResize, function(a, b) {
				i(a, b)
			}) : i(e.alsoResize)
		},
		stop: function(b, c) {
			a(this).removeData("resizable-alsoresize")
		}
	}), a.ui.plugin.add("resizable", "animate", {
		stop: function(b, c) {
			var d = a(this).data("resizable"),
				e = d.options,
				f = d._proportionallyResizeElements,
				g = f.length && /textarea/i.test(f[0].nodeName),
				h = g && a.ui.hasScroll(f[0], "left") ? 0 : d.sizeDiff.height,
				i = g ? 0 : d.sizeDiff.width,
				j = {
					width: d.size.width - i,
					height: d.size.height - h
				},
				k = parseInt(d.element.css("left"), 10) + (d.position.left - d.originalPosition.left) || null,
				l = parseInt(d.element.css("top"), 10) + (d.position.top - d.originalPosition.top) || null;
			d.element.animate(a.extend(j, l && k ? {
				top: l,
				left: k
			} : {}), {
				duration: e.animateDuration,
				easing: e.animateEasing,
				step: function() {
					var c = {
						width: parseInt(d.element.css("width"), 10),
						height: parseInt(d.element.css("height"), 10),
						top: parseInt(d.element.css("top"), 10),
						left: parseInt(d.element.css("left"), 10)
					};
					f && f.length && a(f[0]).css({
						width: c.width,
						height: c.height
					}), d._updateCache(c), d._propagate("resize", b)
				}
			})
		}
	}), a.ui.plugin.add("resizable", "containment", {
		start: function(b, d) {
			var e = a(this).data("resizable"),
				f = e.options,
				g = e.element,
				h = f.containment,
				i = h instanceof a ? h.get(0) : /parent/.test(h) ? g.parent().get(0) : h;
			if (!i) return;
			e.containerElement = a(i);
			if (/document/.test(h) || h == document) e.containerOffset = {
				left: 0,
				top: 0
			}, e.containerPosition = {
				left: 0,
				top: 0
			}, e.parentData = {
				element: a(document),
				left: 0,
				top: 0,
				width: a(document).width(),
				height: a(document).height() || document.body.parentNode.scrollHeight
			};
			else {
				var j = a(i),
					k = [];
				a(["Top", "Right", "Left", "Bottom"]).each(function(a, b) {
					k[a] = c(j.css("padding" + b))
				}), e.containerOffset = j.offset(), e.containerPosition = j.position(), e.containerSize = {
					height: j.innerHeight() - k[3],
					width: j.innerWidth() - k[1]
				};
				var l = e.containerOffset,
					m = e.containerSize.height,
					n = e.containerSize.width,
					o = a.ui.hasScroll(i, "left") ? i.scrollWidth : n,
					p = a.ui.hasScroll(i) ? i.scrollHeight : m;
				e.parentData = {
					element: i,
					left: l.left,
					top: l.top,
					width: o,
					height: p
				}
			}
		},
		resize: function(b, c) {
			var d = a(this).data("resizable"),
				e = d.options,
				f = d.containerSize,
				g = d.containerOffset,
				h = d.size,
				i = d.position,
				j = d._aspectRatio || b.shiftKey,
				k = {
					top: 0,
					left: 0
				},
				l = d.containerElement;
			l[0] != document && /static/.test(l.css("position")) && (k = g), i.left < (d._helper ? g.left : 0) && (d.size.width = d.size.width + (d._helper ? d.position.left - g.left : d.position.left - k.left), j && (d.size.height = d.size.width / d.aspectRatio), d.position.left = e.helper ? g.left : 0), i.top < (d._helper ? g.top : 0) && (d.size.height = d.size.height + (d._helper ? d.position.top - g.top : d.position.top), j && (d.size.width = d.size.height * d.aspectRatio), d.position.top = d._helper ? g.top : 0), d.offset.left = d.parentData.left + d.position.left, d.offset.top = d.parentData.top + d.position.top;
			var m = Math.abs((d._helper ? d.offset.left - k.left : d.offset.left - k.left) + d.sizeDiff.width),
				n = Math.abs((d._helper ? d.offset.top - k.top : d.offset.top - g.top) + d.sizeDiff.height),
				o = d.containerElement.get(0) == d.element.parent().get(0),
				p = /relative|absolute/.test(d.containerElement.css("position"));
			o && p && (m -= d.parentData.left), m + d.size.width >= d.parentData.width && (d.size.width = d.parentData.width - m, j && (d.size.height = d.size.width / d.aspectRatio)), n + d.size.height >= d.parentData.height && (d.size.height = d.parentData.height - n, j && (d.size.width = d.size.height * d.aspectRatio))
		},
		stop: function(b, c) {
			var d = a(this).data("resizable"),
				e = d.options,
				f = d.position,
				g = d.containerOffset,
				h = d.containerPosition,
				i = d.containerElement,
				j = a(d.helper),
				k = j.offset(),
				l = j.outerWidth() - d.sizeDiff.width,
				m = j.outerHeight() - d.sizeDiff.height;
			d._helper && !e.animate && /relative/.test(i.css("position")) && a(this).css({
				left: k.left - h.left - g.left,
				width: l,
				height: m
			}), d._helper && !e.animate && /static/.test(i.css("position")) && a(this).css({
				left: k.left - h.left - g.left,
				width: l,
				height: m
			})
		}
	}), a.ui.plugin.add("resizable", "ghost", {
		start: function(b, c) {
			var d = a(this).data("resizable"),
				e = d.options,
				f = d.size;
			d.ghost = d.originalElement.clone(), d.ghost.css({
				opacity: .25,
				display: "block",
				position: "relative",
				height: f.height,
				width: f.width,
				margin: 0,
				left: 0,
				top: 0
			}).addClass("ui-resizable-ghost").addClass(typeof e.ghost == "string" ? e.ghost : ""), d.ghost.appendTo(d.helper)
		},
		resize: function(b, c) {
			var d = a(this).data("resizable"),
				e = d.options;
			d.ghost && d.ghost.css({
				position: "relative",
				height: d.size.height,
				width: d.size.width
			})
		},
		stop: function(b, c) {
			var d = a(this).data("resizable"),
				e = d.options;
			d.ghost && d.helper && d.helper.get(0).removeChild(d.ghost.get(0))
		}
	}), a.ui.plugin.add("resizable", "grid", {
		resize: function(b, c) {
			var d = a(this).data("resizable"),
				e = d.options,
				f = d.size,
				g = d.originalSize,
				h = d.originalPosition,
				i = d.axis,
				j = e._aspectRatio || b.shiftKey;
			e.grid = typeof e.grid == "number" ? [e.grid, e.grid] : e.grid;
			var k = Math.round((f.width - g.width) / (e.grid[0] || 1)) * (e.grid[0] || 1),
				l = Math.round((f.height - g.height) / (e.grid[1] || 1)) * (e.grid[1] || 1);
			/^(se|s|e)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l) : /^(ne)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l, d.position.top = h.top - l) : /^(sw)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l, d.position.left = h.left - k) : (d.size.width = g.width + k, d.size.height = g.height + l, d.position.top = h.top - l, d.position.left = h.left - k)
		}
	});
	var c = function(a) {
			return parseInt(a, 10) || 0
		},
		d = function(a) {
			return !isNaN(parseInt(a, 10))
		}
})(jQuery);;
/*! jQuery UI - v1.8.22 - 2012-07-24
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.dialog.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	var c = "ui-dialog ui-widget ui-widget-content ui-corner-all ",
		d = {
			buttons: !0,
			height: !0,
			maxHeight: !0,
			maxWidth: !0,
			minHeight: !0,
			minWidth: !0,
			width: !0
		},
		e = {
			maxHeight: !0,
			maxWidth: !0,
			minHeight: !0,
			minWidth: !0
		},
		f = a.attrFn || {
			val: !0,
			css: !0,
			html: !0,
			text: !0,
			data: !0,
			width: !0,
			height: !0,
			offset: !0,
			click: !0
		};
	a.widget("ui.dialog", {
		options: {
			autoOpen: !0,
			buttons: {},
			closeOnEscape: !0,
			closeText: "close",
			dialogClass: "",
			draggable: !0,
			hide: null,
			height: "auto",
			maxHeight: !1,
			maxWidth: !1,
			minHeight: 150,
			minWidth: 150,
			modal: !1,
			position: {
				my: "center",
				at: "center",
				collision: "fit",
				using: function(b) {
					var c = a(this).css(b).offset().top;
					c < 0 && a(this).css("top", b.top - c)
				}
			},
			resizable: !0,
			show: null,
			stack: !0,
			title: "",
			width: 300,
			zIndex: 1e3
		},
		_create: function() {
			this.originalTitle = this.element.attr("title"), typeof this.originalTitle != "string" && (this.originalTitle = ""), this.options.title = this.options.title || this.originalTitle;
			var b = this,
				d = b.options,
				e = d.title || "&#160;",
				f = a.ui.dialog.getTitleId(b.element),
				g = (b.uiDialog = a("<div></div>")).appendTo(document.body).hide().addClass(c + d.dialogClass).css({
					zIndex: d.zIndex
				}).attr("tabIndex", -1).css("outline", 0).keydown(function(c) {
					d.closeOnEscape && !c.isDefaultPrevented() && c.keyCode && c.keyCode === a.ui.keyCode.ESCAPE && (b.close(c), c.preventDefault())
				}).attr({
					role: "dialog",
					"aria-labelledby": f
				}).mousedown(function(a) {
					b.moveToTop(!1, a)
				}),
				h = b.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g),
				i = (b.uiDialogTitlebar = a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),
				j = a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function() {
					j.addClass("ui-state-hover")
				}, function() {
					j.removeClass("ui-state-hover")
				}).focus(function() {
					j.addClass("ui-state-focus")
				}).blur(function() {
					j.removeClass("ui-state-focus")
				}).click(function(a) {
					return b.close(a), !1
				}).appendTo(i),
				k = (b.uiDialogTitlebarCloseText = a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(d.closeText).appendTo(j),
				l = a("<span></span>").addClass("ui-dialog-title").attr("id", f).html(e).prependTo(i);
			a.isFunction(d.beforeclose) && !a.isFunction(d.beforeClose) && (d.beforeClose = d.beforeclose), i.find("*").add(i).disableSelection(), d.draggable && a.fn.draggable && b._makeDraggable(), d.resizable && a.fn.resizable && b._makeResizable(), b._createButtons(d.buttons), b._isOpen = !1, a.fn.bgiframe && g.bgiframe()
		},
		_init: function() {
			this.options.autoOpen && this.open()
		},
		destroy: function() {
			var a = this;
			return a.overlay && a.overlay.destroy(), a.uiDialog.hide(), a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"), a.uiDialog.remove(), a.originalTitle && a.element.attr("title", a.originalTitle), a
		},
		widget: function() {
			return this.uiDialog
		},
		close: function(b) {
			var c = this,
				d, e;
			if (!1 === c._trigger("beforeClose", b)) return;
			return c.overlay && c.overlay.destroy(), c.uiDialog.unbind("keypress.ui-dialog"), c._isOpen = !1, c.options.hide ? c.uiDialog.hide(c.options.hide, function() {
				c._trigger("close", b)
			}) : (c.uiDialog.hide(), c._trigger("close", b)), a.ui.dialog.overlay.resize(), c.options.modal && (d = 0, a(".ui-dialog").each(function() {
				this !== c.uiDialog[0] && (e = a(this).css("z-index"), isNaN(e) || (d = Math.max(d, e)))
			}), a.ui.dialog.maxZ = d), c
		},
		isOpen: function() {
			return this._isOpen
		},
		moveToTop: function(b, c) {
			var d = this,
				e = d.options,
				f;
			return e.modal && !b || !e.stack && !e.modal ? d._trigger("focus", c) : (e.zIndex > a.ui.dialog.maxZ && (a.ui.dialog.maxZ = e.zIndex), d.overlay && (a.ui.dialog.maxZ += 1, d.overlay.$el.css("z-index", a.ui.dialog.overlay.maxZ = a.ui.dialog.maxZ)), f = {
				scrollTop: d.element.scrollTop(),
				scrollLeft: d.element.scrollLeft()
			}, a.ui.dialog.maxZ += 1, d.uiDialog.css("z-index", a.ui.dialog.maxZ), d.element.attr(f), d._trigger("focus", c), d)
		},
		open: function() {
			if (this._isOpen) return;
			var b = this,
				c = b.options,
				d = b.uiDialog;
			return b.overlay = c.modal ? new a.ui.dialog.overlay(b) : null, b._size(), b._position(c.position), d.show(c.show), b.moveToTop(!0), c.modal && d.bind("keydown.ui-dialog", function(b) {
				if (b.keyCode !== a.ui.keyCode.TAB) return;
				var c = a(":tabbable", this),
					d = c.filter(":first"),
					e = c.filter(":last");
				if (b.target === e[0] && !b.shiftKey) return d.focus(1), !1;
				if (b.target === d[0] && b.shiftKey) return e.focus(1), !1
			}), a(b.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus(), b._isOpen = !0, b._trigger("open"), b
		},
		_createButtons: function(b) {
			var c = this,
				d = !1,
				e = a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
				g = a("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);
			c.uiDialog.find(".ui-dialog-buttonpane").remove(), typeof b == "object" && b !== null && a.each(b, function() {
				return !(d = !0)
			}), d && (a.each(b, function(b, d) {
				d = a.isFunction(d) ? {
					click: d,
					text: b
				} : d;
				var e = a('<button type="button"></button>').click(function() {
					d.click.apply(c.element[0], arguments)
				}).appendTo(g);
				a.each(d, function(a, b) {
					if (a === "click") return;
					a in f ? e[a](b) : e.attr(a, b)
				}), a.fn.button && e.button()
			}), e.appendTo(c.uiDialog))
		},
		_makeDraggable: function() {
			function f(a) {
				return {
					position: a.position,
					offset: a.offset
				}
			}
			var b = this,
				c = b.options,
				d = a(document),
				e;
			b.uiDialog.draggable({
				cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
				handle: ".ui-dialog-titlebar",
				containment: "document",
				start: function(d, g) {
					e = c.height === "auto" ? "auto" : a(this).height(), a(this).height(a(this).height()).addClass("ui-dialog-dragging"), b._trigger("dragStart", d, f(g))
				},
				drag: function(a, c) {
					b._trigger("drag", a, f(c))
				},
				stop: function(g, h) {
					c.position = [h.position.left - d.scrollLeft(), h.position.top - d.scrollTop()], a(this).removeClass("ui-dialog-dragging").height(e), b._trigger("dragStop", g, f(h)), a.ui.dialog.overlay.resize()
				}
			})
		},
		_makeResizable: function(c) {
			function h(a) {
				return {
					originalPosition: a.originalPosition,
					originalSize: a.originalSize,
					position: a.position,
					size: a.size
				}
			}
			c = c === b ? this.options.resizable : c;
			var d = this,
				e = d.options,
				f = d.uiDialog.css("position"),
				g = typeof c == "string" ? c : "n,e,s,w,se,sw,ne,nw";
			d.uiDialog.resizable({
				cancel: ".ui-dialog-content",
				containment: "document",
				alsoResize: d.element,
				maxWidth: e.maxWidth,
				maxHeight: e.maxHeight,
				minWidth: e.minWidth,
				minHeight: d._minHeight(),
				handles: g,
				start: function(b, c) {
					a(this).addClass("ui-dialog-resizing"), d._trigger("resizeStart", b, h(c))
				},
				resize: function(a, b) {
					d._trigger("resize", a, h(b))
				},
				stop: function(b, c) {
					a(this).removeClass("ui-dialog-resizing"), e.height = a(this).height(), e.width = a(this).width(), d._trigger("resizeStop", b, h(c)), a.ui.dialog.overlay.resize()
				}
			}).css("position", f).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
		},
		_minHeight: function() {
			var a = this.options;
			return a.height === "auto" ? a.minHeight : Math.min(a.minHeight, a.height)
		},
		_position: function(b) {
			var c = [],
				d = [0, 0],
				e;
			if (b) {
				if (typeof b == "string" || typeof b == "object" && "0" in b) c = b.split ? b.split(" ") : [b[0], b[1]], c.length === 1 && (c[1] = c[0]), a.each(["left", "top"], function(a, b) {
					+c[a] === c[a] && (d[a] = c[a], c[a] = b)
				}), b = {
					my: c.join(" "),
					at: c.join(" "),
					offset: d.join(" ")
				};
				b = a.extend({}, a.ui.dialog.prototype.options.position, b)
			} else b = a.ui.dialog.prototype.options.position;
			e = this.uiDialog.is(":visible"), e || this.uiDialog.show(), this.uiDialog.css({
				top: 0,
				left: 0
			}).position(a.extend({
				of: window
			}, b)), e || this.uiDialog.hide()
		},
		_setOptions: function(b) {
			var c = this,
				f = {},
				g = !1;
			a.each(b, function(a, b) {
				c._setOption(a, b), a in d && (g = !0), a in e && (f[a] = b)
			}), g && this._size(), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", f)
		},
		_setOption: function(b, d) {
			var e = this,
				f = e.uiDialog;
			switch (b) {
				case "beforeclose":
					b = "beforeClose";
					break;
				case "buttons":
					e._createButtons(d);
					break;
				case "closeText":
					e.uiDialogTitlebarCloseText.text("" + d);
					break;
				case "dialogClass":
					f.removeClass(e.options.dialogClass).addClass(c + d);
					break;
				case "disabled":
					d ? f.addClass("ui-dialog-disabled") : f.removeClass("ui-dialog-disabled");
					break;
				case "draggable":
					var g = f.is(":data(draggable)");
					g && !d && f.draggable("destroy"), !g && d && e._makeDraggable();
					break;
				case "position":
					e._position(d);
					break;
				case "resizable":
					var h = f.is(":data(resizable)");
					h && !d && f.resizable("destroy"), h && typeof d == "string" && f.resizable("option", "handles", d), !h && d !== !1 && e._makeResizable(d);
					break;
				case "title":
					a(".ui-dialog-title", e.uiDialogTitlebar).html("" + (d || "&#160;"))
			}
			a.Widget.prototype._setOption.apply(e, arguments)
		},
		_size: function() {
			var b = this.options,
				c, d, e = this.uiDialog.is(":visible");
			this.element.show().css({
				width: "auto",
				minHeight: 0,
				height: 0
			}), b.minWidth > b.width && (b.width = b.minWidth), c = this.uiDialog.css({
				height: "auto",
				width: b.width
			}).height(), d = Math.max(0, b.minHeight - c);
			if (b.height === "auto")
				if (a.support.minHeight) this.element.css({
					minHeight: d,
					height: "auto"
				});
				else {
					this.uiDialog.show();
					var f = this.element.css("height", "auto").height();
					e || this.uiDialog.hide(), this.element.height(Math.max(f, d))
				} else this.element.height(Math.max(b.height - c, 0));
			this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
		}
	}), a.extend(a.ui.dialog, {
		version: "1.8.22",
		uuid: 0,
		maxZ: 0,
		getTitleId: function(a) {
			var b = a.attr("id");
			return b || (this.uuid += 1, b = this.uuid), "ui-dialog-title-" + b
		},
		overlay: function(b) {
			this.$el = a.ui.dialog.overlay.create(b)
		}
	}), a.extend(a.ui.dialog.overlay, {
		instances: [],
		oldInstances: [],
		maxZ: 0,
		events: a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function(a) {
			return a + ".dialog-overlay"
		}).join(" "),
		create: function(b) {
			this.instances.length === 0 && (setTimeout(function() {
				a.ui.dialog.overlay.instances.length && a(document).bind(a.ui.dialog.overlay.events, function(b) {
					if (a(b.target).zIndex() < a.ui.dialog.overlay.maxZ) return !1
				})
			}, 1), a(document).bind("keydown.dialog-overlay", function(c) {
				b.options.closeOnEscape && !c.isDefaultPrevented() && c.keyCode && c.keyCode === a.ui.keyCode.ESCAPE && (b.close(c), c.preventDefault())
			}), a(window).bind("resize.dialog-overlay", a.ui.dialog.overlay.resize));
			var c = (this.oldInstances.pop() || a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
				width: this.width(),
				height: this.height()
			});
			return a.fn.bgiframe && c.bgiframe(), this.instances.push(c), c
		},
		destroy: function(b) {
			var c = a.inArray(b, this.instances);
			c != -1 && this.oldInstances.push(this.instances.splice(c, 1)[0]), this.instances.length === 0 && a([document, window]).unbind(".dialog-overlay"), b.remove();
			var d = 0;
			a.each(this.instances, function() {
				d = Math.max(d, this.css("z-index"))
			}), this.maxZ = d
		},
		height: function() {
			var b, c;
			return a.browser.msie && a.browser.version < 7 ? (b = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), c = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight), b < c ? a(window).height() + "px" : b + "px") : a(document).height() + "px"
		},
		width: function() {
			var b, c;
			return a.browser.msie ? (b = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), c = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth), b < c ? a(window).width() + "px" : b + "px") : a(document).width() + "px"
		},
		resize: function() {
			var b = a([]);
			a.each(a.ui.dialog.overlay.instances, function() {
				b = b.add(this)
			}), b.css({
				width: 0,
				height: 0
			}).css({
				width: a.ui.dialog.overlay.width(),
				height: a.ui.dialog.overlay.height()
			})
		}
	}), a.extend(a.ui.dialog.overlay.prototype, {
		destroy: function() {
			a.ui.dialog.overlay.destroy(this.$el)
		}
	})
})(jQuery);;
/*! jQuery UI - v1.8.22 - 2012-07-24
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.datepicker.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function($, undefined) {
	function Datepicker() {
		this.debug = !1, this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
			closeText: "Done",
			prevText: "Prev",
			nextText: "Next",
			currentText: "Today",
			monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			weekHeader: "Wk",
			dateFormat: "mm/dd/yy",
			firstDay: 0,
			isRTL: !1,
			showMonthAfterYear: !1,
			yearSuffix: ""
		}, this._defaults = {
			showOn: "focus",
			showAnim: "fadeIn",
			showOptions: {},
			defaultDate: null,
			appendText: "",
			buttonText: "...",
			buttonImage: "",
			buttonImageOnly: !1,
			hideIfNoPrevNext: !1,
			navigationAsDateFormat: !1,
			gotoCurrent: !1,
			changeMonth: !1,
			changeYear: !1,
			yearRange: "c-10:c+10",
			showOtherMonths: !1,
			selectOtherMonths: !1,
			showWeek: !1,
			calculateWeek: this.iso8601Week,
			shortYearCutoff: "+10",
			minDate: null,
			maxDate: null,
			duration: "fast",
			beforeShowDay: null,
			beforeShow: null,
			onSelect: null,
			onChangeMonthYear: null,
			onClose: null,
			numberOfMonths: 1,
			showCurrentAtPos: 0,
			stepMonths: 1,
			stepBigMonths: 12,
			altField: "",
			altFormat: "",
			constrainInput: !0,
			showButtonPanel: !1,
			autoSize: !1,
			disabled: !1
		}, $.extend(this._defaults, this.regional[""]), this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
	}

	function bindHover(a) {
		var b = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
		return a.bind("mouseout", function(a) {
			var c = $(a.target).closest(b);
			if (!c.length) return;
			c.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
		}).bind("mouseover", function(c) {
			var d = $(c.target).closest(b);
			if ($.datepicker._isDisabledDatepicker(instActive.inline ? a.parent()[0] : instActive.input[0]) || !d.length) return;
			d.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), d.addClass("ui-state-hover"), d.hasClass("ui-datepicker-prev") && d.addClass("ui-datepicker-prev-hover"), d.hasClass("ui-datepicker-next") && d.addClass("ui-datepicker-next-hover")
		})
	}

	function extendRemove(a, b) {
		$.extend(a, b);
		for (var c in b)
			if (b[c] == null || b[c] == undefined) a[c] = b[c];
		return a
	}

	function isArray(a) {
		return a && ($.browser.safari && typeof a == "object" && a.length || a.constructor && a.constructor.toString().match(/\Array\(\)/))
	}
	$.extend($.ui, {
		datepicker: {
			version: "1.8.22"
		}
	});
	var PROP_NAME = "datepicker",
		dpuuid = (new Date).getTime(),
		instActive;
	$.extend(Datepicker.prototype, {
		markerClassName: "hasDatepicker",
		maxRows: 4,
		log: function() {
			this.debug && console.log.apply("", arguments)
		},
		_widgetDatepicker: function() {
			return this.dpDiv
		},
		setDefaults: function(a) {
			return extendRemove(this._defaults, a || {}), this
		},
		_attachDatepicker: function(target, settings) {
			var inlineSettings = null;
			for (var attrName in this._defaults) {
				var attrValue = target.getAttribute("date:" + attrName);
				if (attrValue) {
					inlineSettings = inlineSettings || {};
					try {
						inlineSettings[attrName] = eval(attrValue)
					} catch (err) {
						inlineSettings[attrName] = attrValue
					}
				}
			}
			var nodeName = target.nodeName.toLowerCase(),
				inline = nodeName == "div" || nodeName == "span";
			target.id || (this.uuid += 1, target.id = "dp" + this.uuid);
			var inst = this._newInst($(target), inline);
			inst.settings = $.extend({}, settings || {}, inlineSettings || {}), nodeName == "input" ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst)
		},
		_newInst: function(a, b) {
			var c = a[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
			return {
				id: c,
				input: a,
				selectedDay: 0,
				selectedMonth: 0,
				selectedYear: 0,
				drawMonth: 0,
				drawYear: 0,
				inline: b,
				dpDiv: b ? bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) : this.dpDiv
			}
		},
		_connectDatepicker: function(a, b) {
			var c = $(a);
			b.append = $([]), b.trigger = $([]);
			if (c.hasClass(this.markerClassName)) return;
			this._attachments(c, b), c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function(a, c, d) {
				b.settings[c] = d
			}).bind("getData.datepicker", function(a, c) {
				return this._get(b, c)
			}), this._autoSize(b), $.data(a, PROP_NAME, b), b.settings.disabled && this._disableDatepicker(a)
		},
		_attachments: function(a, b) {
			var c = this._get(b, "appendText"),
				d = this._get(b, "isRTL");
			b.append && b.append.remove(), c && (b.append = $('<span class="' + this._appendClass + '">' + c + "</span>"), a[d ? "before" : "after"](b.append)), a.unbind("focus", this._showDatepicker), b.trigger && b.trigger.remove();
			var e = this._get(b, "showOn");
			(e == "focus" || e == "both") && a.focus(this._showDatepicker);
			if (e == "button" || e == "both") {
				var f = this._get(b, "buttonText"),
					g = this._get(b, "buttonImage");
				b.trigger = $(this._get(b, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
					src: g,
					alt: f,
					title: f
				}) : $('<button type="button"></button>').addClass(this._triggerClass).html(g == "" ? f : $("<img/>").attr({
					src: g,
					alt: f,
					title: f
				}))), a[d ? "before" : "after"](b.trigger), b.trigger.click(function() {
					return $.datepicker._datepickerShowing && $.datepicker._lastInput == a[0] ? $.datepicker._hideDatepicker() : $.datepicker._datepickerShowing && $.datepicker._lastInput != a[0] ? ($.datepicker._hideDatepicker(), $.datepicker._showDatepicker(a[0])) : $.datepicker._showDatepicker(a[0]), !1
				})
			}
		},
		_autoSize: function(a) {
			if (this._get(a, "autoSize") && !a.inline) {
				var b = new Date(2009, 11, 20),
					c = this._get(a, "dateFormat");
				if (c.match(/[DM]/)) {
					var d = function(a) {
						var b = 0,
							c = 0;
						for (var d = 0; d < a.length; d++) a[d].length > b && (b = a[d].length, c = d);
						return c
					};
					b.setMonth(d(this._get(a, c.match(/MM/) ? "monthNames" : "monthNamesShort"))), b.setDate(d(this._get(a, c.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - b.getDay())
				}
				a.input.attr("size", this._formatDate(a, b).length)
			}
		},
		_inlineDatepicker: function(a, b) {
			var c = $(a);
			if (c.hasClass(this.markerClassName)) return;
			c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker", function(a, c, d) {
				b.settings[c] = d
			}).bind("getData.datepicker", function(a, c) {
				return this._get(b, c)
			}), $.data(a, PROP_NAME, b), this._setDate(b, this._getDefaultDate(b), !0), this._updateDatepicker(b), this._updateAlternate(b), b.settings.disabled && this._disableDatepicker(a), b.dpDiv.css("display", "block")
		},
		_dialogDatepicker: function(a, b, c, d, e) {
			var f = this._dialogInst;
			if (!f) {
				this.uuid += 1;
				var g = "dp" + this.uuid;
				this._dialogInput = $('<input type="text" id="' + g + '" style="position: absolute; top: -100px; width: 0px;"/>'), this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), f = this._dialogInst = this._newInst(this._dialogInput, !1), f.settings = {}, $.data(this._dialogInput[0], PROP_NAME, f)
			}
			extendRemove(f.settings, d || {}), b = b && b.constructor == Date ? this._formatDate(f, b) : b, this._dialogInput.val(b), this._pos = e ? e.length ? e : [e.pageX, e.pageY] : null;
			if (!this._pos) {
				var h = document.documentElement.clientWidth,
					i = document.documentElement.clientHeight,
					j = document.documentElement.scrollLeft || document.body.scrollLeft,
					k = document.documentElement.scrollTop || document.body.scrollTop;
				this._pos = [h / 2 - 100 + j, i / 2 - 150 + k]
			}
			return this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), f.settings.onSelect = c, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), $.data(this._dialogInput[0], PROP_NAME, f), this
		},
		_destroyDatepicker: function(a) {
			var b = $(a),
				c = $.data(a, PROP_NAME);
			if (!b.hasClass(this.markerClassName)) return;
			var d = a.nodeName.toLowerCase();
			$.removeData(a, PROP_NAME), d == "input" ? (c.append.remove(), c.trigger.remove(), b.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : (d == "div" || d == "span") && b.removeClass(this.markerClassName).empty()
		},
		_enableDatepicker: function(a) {
			var b = $(a),
				c = $.data(a, PROP_NAME);
			if (!b.hasClass(this.markerClassName)) return;
			var d = a.nodeName.toLowerCase();
			if (d == "input") a.disabled = !1, c.trigger.filter("button").each(function() {
				this.disabled = !1
			}).end().filter("img").css({
				opacity: "1.0",
				cursor: ""
			});
			else if (d == "div" || d == "span") {
				var e = b.children("." + this._inlineClass);
				e.children().removeClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
			}
			this._disabledInputs = $.map(this._disabledInputs, function(b) {
				return b == a ? null : b
			})
		},
		_disableDatepicker: function(a) {
			var b = $(a),
				c = $.data(a, PROP_NAME);
			if (!b.hasClass(this.markerClassName)) return;
			var d = a.nodeName.toLowerCase();
			if (d == "input") a.disabled = !0, c.trigger.filter("button").each(function() {
				this.disabled = !0
			}).end().filter("img").css({
				opacity: "0.5",
				cursor: "default"
			});
			else if (d == "div" || d == "span") {
				var e = b.children("." + this._inlineClass);
				e.children().addClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled")
			}
			this._disabledInputs = $.map(this._disabledInputs, function(b) {
				return b == a ? null : b
			}), this._disabledInputs[this._disabledInputs.length] = a
		},
		_isDisabledDatepicker: function(a) {
			if (!a) return !1;
			for (var b = 0; b < this._disabledInputs.length; b++)
				if (this._disabledInputs[b] == a) return !0;
			return !1
		},
		_getInst: function(a) {
			try {
				return $.data(a, PROP_NAME)
			} catch (b) {
				throw "Missing instance data for this datepicker"
			}
		},
		_optionDatepicker: function(a, b, c) {
			var d = this._getInst(a);
			if (arguments.length == 2 && typeof b == "string") return b == "defaults" ? $.extend({}, $.datepicker._defaults) : d ? b == "all" ? $.extend({}, d.settings) : this._get(d, b) : null;
			var e = b || {};
			typeof b == "string" && (e = {}, e[b] = c);
			if (d) {
				this._curInst == d && this._hideDatepicker();
				var f = this._getDateDatepicker(a, !0),
					g = this._getMinMaxDate(d, "min"),
					h = this._getMinMaxDate(d, "max");
				extendRemove(d.settings, e), g !== null && e.dateFormat !== undefined && e.minDate === undefined && (d.settings.minDate = this._formatDate(d, g)), h !== null && e.dateFormat !== undefined && e.maxDate === undefined && (d.settings.maxDate = this._formatDate(d, h)), this._attachments($(a), d), this._autoSize(d), this._setDate(d, f), this._updateAlternate(d), this._updateDatepicker(d)
			}
		},
		_changeDatepicker: function(a, b, c) {
			this._optionDatepicker(a, b, c)
		},
		_refreshDatepicker: function(a) {
			var b = this._getInst(a);
			b && this._updateDatepicker(b)
		},
		_setDateDatepicker: function(a, b) {
			var c = this._getInst(a);
			c && (this._setDate(c, b), this._updateDatepicker(c), this._updateAlternate(c))
		},
		_getDateDatepicker: function(a, b) {
			var c = this._getInst(a);
			return c && !c.inline && this._setDateFromField(c, b), c ? this._getDate(c) : null
		},
		_doKeyDown: function(a) {
			var b = $.datepicker._getInst(a.target),
				c = !0,
				d = b.dpDiv.is(".ui-datepicker-rtl");
			b._keyEvent = !0;
			if ($.datepicker._datepickerShowing) switch (a.keyCode) {
				case 9:
					$.datepicker._hideDatepicker(), c = !1;
					break;
				case 13:
					var e = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", b.dpDiv);
					e[0] && $.datepicker._selectDay(a.target, b.selectedMonth, b.selectedYear, e[0]);
					var f = $.datepicker._get(b, "onSelect");
					if (f) {
						var g = $.datepicker._formatDate(b);
						f.apply(b.input ? b.input[0] : null, [g, b])
					} else $.datepicker._hideDatepicker();
					return !1;
				case 27:
					$.datepicker._hideDatepicker();
					break;
				case 33:
					$.datepicker._adjustDate(a.target, a.ctrlKey ? -$.datepicker._get(b, "stepBigMonths") : -$.datepicker._get(b, "stepMonths"), "M");
					break;
				case 34:
					$.datepicker._adjustDate(a.target, a.ctrlKey ? +$.datepicker._get(b, "stepBigMonths") : +$.datepicker._get(b, "stepMonths"), "M");
					break;
				case 35:
					(a.ctrlKey || a.metaKey) && $.datepicker._clearDate(a.target), c = a.ctrlKey || a.metaKey;
					break;
				case 36:
					(a.ctrlKey || a.metaKey) && $.datepicker._gotoToday(a.target), c = a.ctrlKey || a.metaKey;
					break;
				case 37:
					(a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, d ? 1 : -1, "D"), c = a.ctrlKey || a.metaKey, a.originalEvent.altKey && $.datepicker._adjustDate(a.target, a.ctrlKey ? -$.datepicker._get(b, "stepBigMonths") : -$.datepicker._get(b, "stepMonths"), "M");
					break;
				case 38:
					(a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, -7, "D"), c = a.ctrlKey || a.metaKey;
					break;
				case 39:
					(a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, d ? -1 : 1, "D"), c = a.ctrlKey || a.metaKey, a.originalEvent.altKey && $.datepicker._adjustDate(a.target, a.ctrlKey ? +$.datepicker._get(b, "stepBigMonths") : +$.datepicker._get(b, "stepMonths"), "M");
					break;
				case 40:
					(a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, 7, "D"), c = a.ctrlKey || a.metaKey;
					break;
				default:
					c = !1
			} else a.keyCode == 36 && a.ctrlKey ? $.datepicker._showDatepicker(this) : c = !1;
			c && (a.preventDefault(), a.stopPropagation())
		},
		_doKeyPress: function(a) {
			var b = $.datepicker._getInst(a.target);
			if ($.datepicker._get(b, "constrainInput")) {
				var c = $.datepicker._possibleChars($.datepicker._get(b, "dateFormat")),
					d = String.fromCharCode(a.charCode == undefined ? a.keyCode : a.charCode);
				return a.ctrlKey || a.metaKey || d < " " || !c || c.indexOf(d) > -1
			}
		},
		_doKeyUp: function(a) {
			var b = $.datepicker._getInst(a.target);
			if (b.input.val() != b.lastVal) try {
				var c = $.datepicker.parseDate($.datepicker._get(b, "dateFormat"), b.input ? b.input.val() : null, $.datepicker._getFormatConfig(b));
				c && ($.datepicker._setDateFromField(b), $.datepicker._updateAlternate(b), $.datepicker._updateDatepicker(b))
			} catch (d) {
				$.datepicker.log(d)
			}
			return !0
		},
		_showDatepicker: function(a) {
			a = a.target || a, a.nodeName.toLowerCase() != "input" && (a = $("input", a.parentNode)[0]);
			if ($.datepicker._isDisabledDatepicker(a) || $.datepicker._lastInput == a) return;
			var b = $.datepicker._getInst(a);
			$.datepicker._curInst && $.datepicker._curInst != b && ($.datepicker._curInst.dpDiv.stop(!0, !0), b && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0]));
			var c = $.datepicker._get(b, "beforeShow"),
				d = c ? c.apply(a, [a, b]) : {};
			if (d === !1) return;
			extendRemove(b.settings, d), b.lastVal = null, $.datepicker._lastInput = a, $.datepicker._setDateFromField(b), $.datepicker._inDialog && (a.value = ""), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(a), $.datepicker._pos[1] += a.offsetHeight);
			var e = !1;
			$(a).parents().each(function() {
				return e |= $(this).css("position") == "fixed", !e
			}), e && $.browser.opera && ($.datepicker._pos[0] -= document.documentElement.scrollLeft, $.datepicker._pos[1] -= document.documentElement.scrollTop);
			var f = {
				left: $.datepicker._pos[0],
				top: $.datepicker._pos[1]
			};
			$.datepicker._pos = null, b.dpDiv.empty(), b.dpDiv.css({
				position: "absolute",
				display: "block",
				top: "-1000px"
			}), $.datepicker._updateDatepicker(b), f = $.datepicker._checkOffset(b, f, e), b.dpDiv.css({
				position: $.datepicker._inDialog && $.blockUI ? "static" : e ? "fixed" : "absolute",
				display: "none",
				left: f.left + "px",
				top: f.top + "px"
			});
			if (!b.inline) {
				var g = $.datepicker._get(b, "showAnim"),
					h = $.datepicker._get(b, "duration"),
					i = function() {
						var a = b.dpDiv.find("iframe.ui-datepicker-cover");
						if (!!a.length) {
							var c = $.datepicker._getBorders(b.dpDiv);
							a.css({
								left: -c[0],
								top: -c[1],
								width: b.dpDiv.outerWidth(),
								height: b.dpDiv.outerHeight()
							})
						}
					};
				b.dpDiv.zIndex($(a).zIndex() + 1), $.datepicker._datepickerShowing = !0, $.effects && $.effects[g] ? b.dpDiv.show(g, $.datepicker._get(b, "showOptions"), h, i) : b.dpDiv[g || "show"](g ? h : null, i), (!g || !h) && i(), b.input.is(":visible") && !b.input.is(":disabled") && b.input.focus(), $.datepicker._curInst = b
			}
		},
		_updateDatepicker: function(a) {
			var b = this;
			b.maxRows = 4;
			var c = $.datepicker._getBorders(a.dpDiv);
			instActive = a, a.dpDiv.empty().append(this._generateHTML(a)), this._attachHandlers(a);
			var d = a.dpDiv.find("iframe.ui-datepicker-cover");
			!d.length || d.css({
				left: -c[0],
				top: -c[1],
				width: a.dpDiv.outerWidth(),
				height: a.dpDiv.outerHeight()
			}), a.dpDiv.find("." + this._dayOverClass + " a").mouseover();
			var e = this._getNumberOfMonths(a),
				f = e[1],
				g = 17;
			a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), f > 1 && a.dpDiv.addClass("ui-datepicker-multi-" + f).css("width", g * f + "em"), a.dpDiv[(e[0] != 1 || e[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi"), a.dpDiv[(this._get(a, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), a == $.datepicker._curInst && $.datepicker._datepickerShowing && a.input && a.input.is(":visible") && !a.input.is(":disabled") && a.input[0] != document.activeElement && a.input.focus();
			if (a.yearshtml) {
				var h = a.yearshtml;
				setTimeout(function() {
					h === a.yearshtml && a.yearshtml && a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml), h = a.yearshtml = null
				}, 0)
			}
		},
		_getBorders: function(a) {
			var b = function(a) {
				return {
					thin: 1,
					medium: 2,
					thick: 3
				}[a] || a
			};
			return [parseFloat(b(a.css("border-left-width"))), parseFloat(b(a.css("border-top-width")))]
		},
		_checkOffset: function(a, b, c) {
			var d = a.dpDiv.outerWidth(),
				e = a.dpDiv.outerHeight(),
				f = a.input ? a.input.outerWidth() : 0,
				g = a.input ? a.input.outerHeight() : 0,
				h = document.documentElement.clientWidth + (c ? 0 : $(document).scrollLeft()),
				i = document.documentElement.clientHeight + (c ? 0 : $(document).scrollTop());
			return b.left -= this._get(a, "isRTL") ? d - f : 0, b.left -= c && b.left == a.input.offset().left ? $(document).scrollLeft() : 0, b.top -= c && b.top == a.input.offset().top + g ? $(document).scrollTop() : 0, b.left -= Math.min(b.left, b.left + d > h && h > d ? Math.abs(b.left + d - h) : 0), b.top -= Math.min(b.top, b.top + e > i && i > e ? Math.abs(e + g) : 0), b
		},
		_findPos: function(a) {
			var b = this._getInst(a),
				c = this._get(b, "isRTL");
			while (a && (a.type == "hidden" || a.nodeType != 1 || $.expr.filters.hidden(a))) a = a[c ? "previousSibling" : "nextSibling"];
			var d = $(a).offset();
			return [d.left, d.top]
		},
		_hideDatepicker: function(a) {
			var b = this._curInst;
			if (!b || a && b != $.data(a, PROP_NAME)) return;
			if (this._datepickerShowing) {
				var c = this._get(b, "showAnim"),
					d = this._get(b, "duration"),
					e = function() {
						$.datepicker._tidyDialog(b)
					};
				$.effects && $.effects[c] ? b.dpDiv.hide(c, $.datepicker._get(b, "showOptions"), d, e) : b.dpDiv[c == "slideDown" ? "slideUp" : c == "fadeIn" ? "fadeOut" : "hide"](c ? d : null, e), c || e(), this._datepickerShowing = !1;
				var f = this._get(b, "onClose");
				f && f.apply(b.input ? b.input[0] : null, [b.input ? b.input.val() : "", b]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
					position: "absolute",
					left: "0",
					top: "-100px"
				}), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1
			}
		},
		_tidyDialog: function(a) {
			a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
		},
		_checkExternalClick: function(a) {
			if (!$.datepicker._curInst) return;
			var b = $(a.target),
				c = $.datepicker._getInst(b[0]);
			(b[0].id != $.datepicker._mainDivId && b.parents("#" + $.datepicker._mainDivId).length == 0 && !b.hasClass($.datepicker.markerClassName) && !b.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && (!$.datepicker._inDialog || !$.blockUI) || b.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != c) && $.datepicker._hideDatepicker()
		},
		_adjustDate: function(a, b, c) {
			var d = $(a),
				e = this._getInst(d[0]);
			if (this._isDisabledDatepicker(d[0])) return;
			this._adjustInstDate(e, b + (c == "M" ? this._get(e, "showCurrentAtPos") : 0), c), this._updateDatepicker(e)
		},
		_gotoToday: function(a) {
			var b = $(a),
				c = this._getInst(b[0]);
			if (this._get(c, "gotoCurrent") && c.currentDay) c.selectedDay = c.currentDay, c.drawMonth = c.selectedMonth = c.currentMonth, c.drawYear = c.selectedYear = c.currentYear;
			else {
				var d = new Date;
				c.selectedDay = d.getDate(), c.drawMonth = c.selectedMonth = d.getMonth(), c.drawYear = c.selectedYear = d.getFullYear()
			}
			this._notifyChange(c), this._adjustDate(b)
		},
		_selectMonthYear: function(a, b, c) {
			var d = $(a),
				e = this._getInst(d[0]);
			e["selected" + (c == "M" ? "Month" : "Year")] = e["draw" + (c == "M" ? "Month" : "Year")] = parseInt(b.options[b.selectedIndex].value, 10), this._notifyChange(e), this._adjustDate(d)
		},
		_selectDay: function(a, b, c, d) {
			var e = $(a);
			if ($(d).hasClass(this._unselectableClass) || this._isDisabledDatepicker(e[0])) return;
			var f = this._getInst(e[0]);
			f.selectedDay = f.currentDay = $("a", d).html(), f.selectedMonth = f.currentMonth = b, f.selectedYear = f.currentYear = c, this._selectDate(a, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear))
		},
		_clearDate: function(a) {
			var b = $(a),
				c = this._getInst(b[0]);
			this._selectDate(b, "")
		},
		_selectDate: function(a, b) {
			var c = $(a),
				d = this._getInst(c[0]);
			b = b != null ? b : this._formatDate(d), d.input && d.input.val(b), this._updateAlternate(d);
			var e = this._get(d, "onSelect");
			e ? e.apply(d.input ? d.input[0] : null, [b, d]) : d.input && d.input.trigger("change"), d.inline ? this._updateDatepicker(d) : (this._hideDatepicker(), this._lastInput = d.input[0], typeof d.input[0] != "object" && d.input.focus(), this._lastInput = null)
		},
		_updateAlternate: function(a) {
			var b = this._get(a, "altField");
			if (b) {
				var c = this._get(a, "altFormat") || this._get(a, "dateFormat"),
					d = this._getDate(a),
					e = this.formatDate(c, d, this._getFormatConfig(a));
				$(b).each(function() {
					$(this).val(e)
				})
			}
		},
		noWeekends: function(a) {
			var b = a.getDay();
			return [b > 0 && b < 6, ""]
		},
		iso8601Week: function(a) {
			var b = new Date(a.getTime());
			b.setDate(b.getDate() + 4 - (b.getDay() || 7));
			var c = b.getTime();
			return b.setMonth(0), b.setDate(1), Math.floor(Math.round((c - b) / 864e5) / 7) + 1
		},
		parseDate: function(a, b, c) {
			if (a == null || b == null) throw "Invalid arguments";
			b = typeof b == "object" ? b.toString() : b + "";
			if (b == "") return null;
			var d = (c ? c.shortYearCutoff : null) || this._defaults.shortYearCutoff;
			d = typeof d != "string" ? d : (new Date).getFullYear() % 100 + parseInt(d, 10);
			var e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort,
				f = (c ? c.dayNames : null) || this._defaults.dayNames,
				g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort,
				h = (c ? c.monthNames : null) || this._defaults.monthNames,
				i = -1,
				j = -1,
				k = -1,
				l = -1,
				m = !1,
				n = function(b) {
					var c = s + 1 < a.length && a.charAt(s + 1) == b;
					return c && s++, c
				},
				o = function(a) {
					var c = n(a),
						d = a == "@" ? 14 : a == "!" ? 20 : a == "y" && c ? 4 : a == "o" ? 3 : 2,
						e = new RegExp("^\\d{1," + d + "}"),
						f = b.substring(r).match(e);
					if (!f) throw "Missing number at position " + r;
					return r += f[0].length, parseInt(f[0], 10)
				},
				p = function(a, c, d) {
					var e = $.map(n(a) ? d : c, function(a, b) {
							return [
								[b, a]
							]
						}).sort(function(a, b) {
							return -(a[1].length - b[1].length)
						}),
						f = -1;
					$.each(e, function(a, c) {
						var d = c[1];
						if (b.substr(r, d.length).toLowerCase() == d.toLowerCase()) return f = c[0], r += d.length, !1
					});
					if (f != -1) return f + 1;
					throw "Unknown name at position " + r
				},
				q = function() {
					if (b.charAt(r) != a.charAt(s)) throw "Unexpected literal at position " + r;
					r++
				},
				r = 0;
			for (var s = 0; s < a.length; s++)
				if (m) a.charAt(s) == "'" && !n("'") ? m = !1 : q();
				else switch (a.charAt(s)) {
					case "d":
						k = o("d");
						break;
					case "D":
						p("D", e, f);
						break;
					case "o":
						l = o("o");
						break;
					case "m":
						j = o("m");
						break;
					case "M":
						j = p("M", g, h);
						break;
					case "y":
						i = o("y");
						break;
					case "@":
						var t = new Date(o("@"));
						i = t.getFullYear(), j = t.getMonth() + 1, k = t.getDate();
						break;
					case "!":
						var t = new Date((o("!") - this._ticksTo1970) / 1e4);
						i = t.getFullYear(), j = t.getMonth() + 1, k = t.getDate();
						break;
					case "'":
						n("'") ? q() : m = !0;
						break;
					default:
						q()
				}
				if (r < b.length) throw "Extra/unparsed characters found in date: " + b.substring(r);
			i == -1 ? i = (new Date).getFullYear() : i < 100 && (i += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (i <= d ? 0 : -100));
			if (l > -1) {
				j = 1, k = l;
				do {
					var u = this._getDaysInMonth(i, j - 1);
					if (k <= u) break;
					j++, k -= u
				} while (!0)
			}
			var t = this._daylightSavingAdjust(new Date(i, j - 1, k));
			if (t.getFullYear() != i || t.getMonth() + 1 != j || t.getDate() != k) throw "Invalid date";
			return t
		},
		ATOM: "yy-mm-dd",
		COOKIE: "D, dd M yy",
		ISO_8601: "yy-mm-dd",
		RFC_822: "D, d M y",
		RFC_850: "DD, dd-M-y",
		RFC_1036: "D, d M y",
		RFC_1123: "D, d M yy",
		RFC_2822: "D, d M yy",
		RSS: "D, d M y",
		TICKS: "!",
		TIMESTAMP: "@",
		W3C: "yy-mm-dd",
		_ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 1e7,
		formatDate: function(a, b, c) {
			if (!b) return "";
			var d = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort,
				e = (c ? c.dayNames : null) || this._defaults.dayNames,
				f = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort,
				g = (c ? c.monthNames : null) || this._defaults.monthNames,
				h = function(b) {
					var c = m + 1 < a.length && a.charAt(m + 1) == b;
					return c && m++, c
				},
				i = function(a, b, c) {
					var d = "" + b;
					if (h(a))
						while (d.length < c) d = "0" + d;
					return d
				},
				j = function(a, b, c, d) {
					return h(a) ? d[b] : c[b]
				},
				k = "",
				l = !1;
			if (b)
				for (var m = 0; m < a.length; m++)
					if (l) a.charAt(m) == "'" && !h("'") ? l = !1 : k += a.charAt(m);
					else switch (a.charAt(m)) {
						case "d":
							k += i("d", b.getDate(), 2);
							break;
						case "D":
							k += j("D", b.getDay(), d, e);
							break;
						case "o":
							k += i("o", Math.round(((new Date(b.getFullYear(), b.getMonth(), b.getDate())).getTime() - (new Date(b.getFullYear(), 0, 0)).getTime()) / 864e5), 3);
							break;
						case "m":
							k += i("m", b.getMonth() + 1, 2);
							break;
						case "M":
							k += j("M", b.getMonth(), f, g);
							break;
						case "y":
							k += h("y") ? b.getFullYear() : (b.getYear() % 100 < 10 ? "0" : "") + b.getYear() % 100;
							break;
						case "@":
							k += b.getTime();
							break;
						case "!":
							k += b.getTime() * 1e4 + this._ticksTo1970;
							break;
						case "'":
							h("'") ? k += "'" : l = !0;
							break;
						default:
							k += a.charAt(m)
					}
					return k
		},
		_possibleChars: function(a) {
			var b = "",
				c = !1,
				d = function(b) {
					var c = e + 1 < a.length && a.charAt(e + 1) == b;
					return c && e++, c
				};
			for (var e = 0; e < a.length; e++)
				if (c) a.charAt(e) == "'" && !d("'") ? c = !1 : b += a.charAt(e);
				else switch (a.charAt(e)) {
					case "d":
					case "m":
					case "y":
					case "@":
						b += "0123456789";
						break;
					case "D":
					case "M":
						return null;
					case "'":
						d("'") ? b += "'" : c = !0;
						break;
					default:
						b += a.charAt(e)
				}
				return b
		},
		_get: function(a, b) {
			return a.settings[b] !== undefined ? a.settings[b] : this._defaults[b]
		},
		_setDateFromField: function(a, b) {
			if (a.input.val() == a.lastVal) return;
			var c = this._get(a, "dateFormat"),
				d = a.lastVal = a.input ? a.input.val() : null,
				e, f;
			e = f = this._getDefaultDate(a);
			var g = this._getFormatConfig(a);
			try {
				e = this.parseDate(c, d, g) || f
			} catch (h) {
				this.log(h), d = b ? "" : d
			}
			a.selectedDay = e.getDate(), a.drawMonth = a.selectedMonth = e.getMonth(), a.drawYear = a.selectedYear = e.getFullYear(), a.currentDay = d ? e.getDate() : 0, a.currentMonth = d ? e.getMonth() : 0, a.currentYear = d ? e.getFullYear() : 0, this._adjustInstDate(a)
		},
		_getDefaultDate: function(a) {
			return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
		},
		_determineDate: function(a, b, c) {
			var d = function(a) {
					var b = new Date;
					return b.setDate(b.getDate() + a), b
				},
				e = function(b) {
					try {
						return $.datepicker.parseDate($.datepicker._get(a, "dateFormat"), b, $.datepicker._getFormatConfig(a))
					} catch (c) {}
					var d = (b.toLowerCase().match(/^c/) ? $.datepicker._getDate(a) : null) || new Date,
						e = d.getFullYear(),
						f = d.getMonth(),
						g = d.getDate(),
						h = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
						i = h.exec(b);
					while (i) {
						switch (i[2] || "d") {
							case "d":
							case "D":
								g += parseInt(i[1], 10);
								break;
							case "w":
							case "W":
								g += parseInt(i[1], 10) * 7;
								break;
							case "m":
							case "M":
								f += parseInt(i[1], 10), g = Math.min(g, $.datepicker._getDaysInMonth(e, f));
								break;
							case "y":
							case "Y":
								e += parseInt(i[1], 10), g = Math.min(g, $.datepicker._getDaysInMonth(e, f))
						}
						i = h.exec(b)
					}
					return new Date(e, f, g)
				},
				f = b == null || b === "" ? c : typeof b == "string" ? e(b) : typeof b == "number" ? isNaN(b) ? c : d(b) : new Date(b.getTime());
			return f = f && f.toString() == "Invalid Date" ? c : f, f && (f.setHours(0), f.setMinutes(0), f.setSeconds(0), f.setMilliseconds(0)), this._daylightSavingAdjust(f)
		},
		_daylightSavingAdjust: function(a) {
			return a ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0), a) : null
		},
		_setDate: function(a, b, c) {
			var d = !b,
				e = a.selectedMonth,
				f = a.selectedYear,
				g = this._restrictMinMax(a, this._determineDate(a, b, new Date));
			a.selectedDay = a.currentDay = g.getDate(), a.drawMonth = a.selectedMonth = a.currentMonth = g.getMonth(), a.drawYear = a.selectedYear = a.currentYear = g.getFullYear(), (e != a.selectedMonth || f != a.selectedYear) && !c && this._notifyChange(a), this._adjustInstDate(a), a.input && a.input.val(d ? "" : this._formatDate(a))
		},
		_getDate: function(a) {
			var b = !a.currentYear || a.input && a.input.val() == "" ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
			return b
		},
		_attachHandlers: function(a) {
			var b = this._get(a, "stepMonths"),
				c = "#" + a.id;
			a.dpDiv.find("[data-handler]").map(function() {
				var a = {
					prev: function() {
						window["DP_jQuery_" + dpuuid].datepicker._adjustDate(c, -b, "M")
					},
					next: function() {
						window["DP_jQuery_" + dpuuid].datepicker._adjustDate(c, +b, "M")
					},
					hide: function() {
						window["DP_jQuery_" + dpuuid].datepicker._hideDatepicker()
					},
					today: function() {
						window["DP_jQuery_" + dpuuid].datepicker._gotoToday(c)
					},
					selectDay: function() {
						return window["DP_jQuery_" + dpuuid].datepicker._selectDay(c, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
					},
					selectMonth: function() {
						return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(c, this, "M"), !1
					},
					selectYear: function() {
						return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(c, this, "Y"), !1
					}
				};
				$(this).bind(this.getAttribute("data-event"), a[this.getAttribute("data-handler")])
			})
		},
		_generateHTML: function(a) {
			var b = new Date;
			b = this._daylightSavingAdjust(new Date(b.getFullYear(), b.getMonth(), b.getDate()));
			var c = this._get(a, "isRTL"),
				d = this._get(a, "showButtonPanel"),
				e = this._get(a, "hideIfNoPrevNext"),
				f = this._get(a, "navigationAsDateFormat"),
				g = this._getNumberOfMonths(a),
				h = this._get(a, "showCurrentAtPos"),
				i = this._get(a, "stepMonths"),
				j = g[0] != 1 || g[1] != 1,
				k = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear, a.currentMonth, a.currentDay) : new Date(9999, 9, 9)),
				l = this._getMinMaxDate(a, "min"),
				m = this._getMinMaxDate(a, "max"),
				n = a.drawMonth - h,
				o = a.drawYear;
			n < 0 && (n += 12, o--);
			if (m) {
				var p = this._daylightSavingAdjust(new Date(m.getFullYear(), m.getMonth() - g[0] * g[1] + 1, m.getDate()));
				p = l && p < l ? l : p;
				while (this._daylightSavingAdjust(new Date(o, n, 1)) > p) n--, n < 0 && (n = 11, o--)
			}
			a.drawMonth = n, a.drawYear = o;
			var q = this._get(a, "prevText");
			q = f ? this.formatDate(q, this._daylightSavingAdjust(new Date(o, n - i, 1)), this._getFormatConfig(a)) : q;
			var r = this._canAdjustMonth(a, -1, o, n) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="' + q + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "e" : "w") + '">' + q + "</span></a>" : e ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + q + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "e" : "w") + '">' + q + "</span></a>",
				s = this._get(a, "nextText");
			s = f ? this.formatDate(s, this._daylightSavingAdjust(new Date(o, n + i, 1)), this._getFormatConfig(a)) : s;
			var t = this._canAdjustMonth(a, 1, o, n) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="' + s + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "w" : "e") + '">' + s + "</span></a>" : e ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + s + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "w" : "e") + '">' + s + "</span></a>",
				u = this._get(a, "currentText"),
				v = this._get(a, "gotoCurrent") && a.currentDay ? k : b;
			u = f ? this.formatDate(u, v, this._getFormatConfig(a)) : u;
			var w = a.inline ? "" : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(a, "closeText") + "</button>",
				x = d ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (c ? w : "") + (this._isInRange(a, v) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">' + u + "</button>" : "") + (c ? "" : w) + "</div>" : "",
				y = parseInt(this._get(a, "firstDay"), 10);
			y = isNaN(y) ? 0 : y;
			var z = this._get(a, "showWeek"),
				A = this._get(a, "dayNames"),
				B = this._get(a, "dayNamesShort"),
				C = this._get(a, "dayNamesMin"),
				D = this._get(a, "monthNames"),
				E = this._get(a, "monthNamesShort"),
				F = this._get(a, "beforeShowDay"),
				G = this._get(a, "showOtherMonths"),
				H = this._get(a, "selectOtherMonths"),
				I = this._get(a, "calculateWeek") || this.iso8601Week,
				J = this._getDefaultDate(a),
				K = "";
			for (var L = 0; L < g[0]; L++) {
				var M = "";
				this.maxRows = 4;
				for (var N = 0; N < g[1]; N++) {
					var O = this._daylightSavingAdjust(new Date(o, n, a.selectedDay)),
						P = " ui-corner-all",
						Q = "";
					if (j) {
						Q += '<div class="ui-datepicker-group';
						if (g[1] > 1) switch (N) {
							case 0:
								Q += " ui-datepicker-group-first", P = " ui-corner-" + (c ? "right" : "left");
								break;
							case g[1] - 1:
								Q += " ui-datepicker-group-last", P = " ui-corner-" + (c ? "left" : "right");
								break;
							default:
								Q += " ui-datepicker-group-middle", P = ""
						}
						Q += '">'
					}
					Q += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + P + '">' + (/all|left/.test(P) && L == 0 ? c ? t : r : "") + (/all|right/.test(P) && L == 0 ? c ? r : t : "") + this._generateMonthYearHeader(a, n, o, l, m, L > 0 || N > 0, D, E) + '</div><table class="ui-datepicker-calendar"><thead>' + "<tr>";
					var R = z ? '<th class="ui-datepicker-week-col">' + this._get(a, "weekHeader") + "</th>" : "";
					for (var S = 0; S < 7; S++) {
						var T = (S + y) % 7;
						R += "<th" + ((S + y + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + ">" + '<span title="' + A[T] + '">' + C[T] + "</span></th>"
					}
					Q += R + "</tr></thead><tbody>";
					var U = this._getDaysInMonth(o, n);
					o == a.selectedYear && n == a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, U));
					var V = (this._getFirstDayOfMonth(o, n) - y + 7) % 7,
						W = Math.ceil((V + U) / 7),
						X = j ? this.maxRows > W ? this.maxRows : W : W;
					this.maxRows = X;
					var Y = this._daylightSavingAdjust(new Date(o, n, 1 - V));
					for (var Z = 0; Z < X; Z++) {
						Q += "<tr>";
						var _ = z ? '<td class="ui-datepicker-week-col">' + this._get(a, "calculateWeek")(Y) + "</td>" : "";
						for (var S = 0; S < 7; S++) {
							var ba = F ? F.apply(a.input ? a.input[0] : null, [Y]) : [!0, ""],
								bb = Y.getMonth() != n,
								bc = bb && !H || !ba[0] || l && Y < l || m && Y > m;
							_ += '<td class="' + ((S + y + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (bb ? " ui-datepicker-other-month" : "") + (Y.getTime() == O.getTime() && n == a.selectedMonth && a._keyEvent || J.getTime() == Y.getTime() && J.getTime() == O.getTime() ? " " + this._dayOverClass : "") + (bc ? " " + this._unselectableClass + " ui-state-disabled" : "") + (bb && !G ? "" : " " + ba[1] + (Y.getTime() == k.getTime() ? " " + this._currentClass : "") + (Y.getTime() == b.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!bb || G) && ba[2] ? ' title="' + ba[2] + '"' : "") + (bc ? "" : ' data-handler="selectDay" data-event="click" data-month="' + Y.getMonth() + '" data-year="' + Y.getFullYear() + '"') + ">" + (bb && !G ? "&#xa0;" : bc ? '<span class="ui-state-default">' + Y.getDate() + "</span>" : '<a class="ui-state-default' + (Y.getTime() == b.getTime() ? " ui-state-highlight" : "") + (Y.getTime() == k.getTime() ? " ui-state-active" : "") + (bb ? " ui-priority-secondary" : "") + '" href="#">' + Y.getDate() + "</a>") + "</td>", Y.setDate(Y.getDate() + 1), Y = this._daylightSavingAdjust(Y)
						}
						Q += _ + "</tr>"
					}
					n++, n > 11 && (n = 0, o++), Q += "</tbody></table>" + (j ? "</div>" + (g[0] > 0 && N == g[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : ""), M += Q
				}
				K += M
			}
			return K += x + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !a.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : ""), a._keyEvent = !1, K
		},
		_generateMonthYearHeader: function(a, b, c, d, e, f, g, h) {
			var i = this._get(a, "changeMonth"),
				j = this._get(a, "changeYear"),
				k = this._get(a, "showMonthAfterYear"),
				l = '<div class="ui-datepicker-title">',
				m = "";
			if (f || !i) m += '<span class="ui-datepicker-month">' + g[b] + "</span>";
			else {
				var n = d && d.getFullYear() == c,
					o = e && e.getFullYear() == c;
				m += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
				for (var p = 0; p < 12; p++)(!n || p >= d.getMonth()) && (!o || p <= e.getMonth()) && (m += '<option value="' + p + '"' + (p == b ? ' selected="selected"' : "") + ">" + h[p] + "</option>");
				m += "</select>"
			}
			k || (l += m + (f || !i || !j ? "&#xa0;" : ""));
			if (!a.yearshtml) {
				a.yearshtml = "";
				if (f || !j) l += '<span class="ui-datepicker-year">' + c + "</span>";
				else {
					var q = this._get(a, "yearRange").split(":"),
						r = (new Date).getFullYear(),
						s = function(a) {
							var b = a.match(/c[+-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+-].*/) ? r + parseInt(a, 10) : parseInt(a, 10);
							return isNaN(b) ? r : b
						},
						t = s(q[0]),
						u = Math.max(t, s(q[1] || ""));
					t = d ? Math.max(t, d.getFullYear()) : t, u = e ? Math.min(u, e.getFullYear()) : u, a.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';
					for (; t <= u; t++) a.yearshtml += '<option value="' + t + '"' + (t == c ? ' selected="selected"' : "") + ">" + t + "</option>";
					a.yearshtml += "</select>", l += a.yearshtml, a.yearshtml = null
				}
			}
			return l += this._get(a, "yearSuffix"), k && (l += (f || !i || !j ? "&#xa0;" : "") + m), l += "</div>", l
		},
		_adjustInstDate: function(a, b, c) {
			var d = a.drawYear + (c == "Y" ? b : 0),
				e = a.drawMonth + (c == "M" ? b : 0),
				f = Math.min(a.selectedDay, this._getDaysInMonth(d, e)) + (c == "D" ? b : 0),
				g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d, e, f)));
			a.selectedDay = g.getDate(), a.drawMonth = a.selectedMonth = g.getMonth(), a.drawYear = a.selectedYear = g.getFullYear(), (c == "M" || c == "Y") && this._notifyChange(a)
		},
		_restrictMinMax: function(a, b) {
			var c = this._getMinMaxDate(a, "min"),
				d = this._getMinMaxDate(a, "max"),
				e = c && b < c ? c : b;
			return e = d && e > d ? d : e, e
		},
		_notifyChange: function(a) {
			var b = this._get(a, "onChangeMonthYear");
			b && b.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a])
		},
		_getNumberOfMonths: function(a) {
			var b = this._get(a, "numberOfMonths");
			return b == null ? [1, 1] : typeof b == "number" ? [1, b] : b
		},
		_getMinMaxDate: function(a, b) {
			return this._determineDate(a, this._get(a, b + "Date"), null)
		},
		_getDaysInMonth: function(a, b) {
			return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate()
		},
		_getFirstDayOfMonth: function(a, b) {
			return (new Date(a, b, 1)).getDay()
		},
		_canAdjustMonth: function(a, b, c, d) {
			var e = this._getNumberOfMonths(a),
				f = this._daylightSavingAdjust(new Date(c, d + (b < 0 ? b : e[0] * e[1]), 1));
			return b < 0 && f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth())), this._isInRange(a, f)
		},
		_isInRange: function(a, b) {
			var c = this._getMinMaxDate(a, "min"),
				d = this._getMinMaxDate(a, "max");
			return (!c || b.getTime() >= c.getTime()) && (!d || b.getTime() <= d.getTime())
		},
		_getFormatConfig: function(a) {
			var b = this._get(a, "shortYearCutoff");
			return b = typeof b != "string" ? b : (new Date).getFullYear() % 100 + parseInt(b, 10), {
				shortYearCutoff: b,
				dayNamesShort: this._get(a, "dayNamesShort"),
				dayNames: this._get(a, "dayNames"),
				monthNamesShort: this._get(a, "monthNamesShort"),
				monthNames: this._get(a, "monthNames")
			}
		},
		_formatDate: function(a, b, c, d) {
			b || (a.currentDay = a.selectedDay, a.currentMonth = a.selectedMonth, a.currentYear = a.selectedYear);
			var e = b ? typeof b == "object" ? b : this._daylightSavingAdjust(new Date(d, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
			return this.formatDate(this._get(a, "dateFormat"), e, this._getFormatConfig(a))
		}
	}), $.fn.datepicker = function(a) {
		if (!this.length) return this;
		$.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv), $.datepicker.initialized = !0);
		var b = Array.prototype.slice.call(arguments, 1);
		return typeof a != "string" || a != "isDisabled" && a != "getDate" && a != "widget" ? a == "option" && arguments.length == 2 && typeof arguments[1] == "string" ? $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this[0]].concat(b)) : this.each(function() {
			typeof a == "string" ? $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this].concat(b)) : $.datepicker._attachDatepicker(this, a)
		}) : $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this[0]].concat(b))
	}, $.datepicker = new Datepicker, $.datepicker.initialized = !1, $.datepicker.uuid = (new Date).getTime(), $.datepicker.version = "1.8.22", window["DP_jQuery_" + dpuuid] = $
})(jQuery);;
/*! jQuery UI - v1.8.22 - 2012-07-24
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.core.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
jQuery.effects || function(a, b) {
	function c(b) {
		var c;
		return b && b.constructor == Array && b.length == 3 ? b : (c = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b)) ? [parseInt(c[1], 10), parseInt(c[2], 10), parseInt(c[3], 10)] : (c = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b)) ? [parseFloat(c[1]) * 2.55, parseFloat(c[2]) * 2.55, parseFloat(c[3]) * 2.55] : (c = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b)) ? [parseInt(c[1], 16), parseInt(c[2], 16), parseInt(c[3], 16)] : (c = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(b)) ? [parseInt(c[1] + c[1], 16), parseInt(c[2] + c[2], 16), parseInt(c[3] + c[3], 16)] : (c = /rgba\(0, 0, 0, 0\)/.exec(b)) ? e.transparent : e[a.trim(b).toLowerCase()]
	}

	function d(b, d) {
		var e;
		do {
			e = (a.curCSS || a.css)(b, d);
			if (e != "" && e != "transparent" || a.nodeName(b, "body")) break;
			d = "backgroundColor"
		} while (b = b.parentNode);
		return c(e)
	}

	function h() {
		var a = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
			b = {},
			c, d;
		if (a && a.length && a[0] && a[a[0]]) {
			var e = a.length;
			while (e--) c = a[e], typeof a[c] == "string" && (d = c.replace(/\-(\w)/g, function(a, b) {
				return b.toUpperCase()
			}), b[d] = a[c])
		} else
			for (c in a) typeof a[c] == "string" && (b[c] = a[c]);
		return b
	}

	function i(b) {
		var c, d;
		for (c in b) d = b[c], (d == null || a.isFunction(d) || c in g || /scrollbar/.test(c) || !/color/i.test(c) && isNaN(parseFloat(d))) && delete b[c];
		return b
	}

	function j(a, b) {
		var c = {
				_: 0
			},
			d;
		for (d in b) a[d] != b[d] && (c[d] = b[d]);
		return c
	}

	function k(b, c, d, e) {
		typeof b == "object" && (e = c, d = null, c = b, b = c.effect), a.isFunction(c) && (e = c, d = null, c = {});
		if (typeof c == "number" || a.fx.speeds[c]) e = d, d = c, c = {};
		return a.isFunction(d) && (e = d, d = null), c = c || {}, d = d || c.duration, d = a.fx.off ? 0 : typeof d == "number" ? d : d in a.fx.speeds ? a.fx.speeds[d] : a.fx.speeds._default, e = e || c.complete, [b, c, d, e]
	}

	function l(b) {
		return !b || typeof b == "number" || a.fx.speeds[b] ? !0 : typeof b == "string" && !a.effects[b] ? !0 : !1
	}
	a.effects = {}, a.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"], function(b, e) {
		a.fx.step[e] = function(a) {
			a.colorInit || (a.start = d(a.elem, e), a.end = c(a.end), a.colorInit = !0), a.elem.style[e] = "rgb(" + Math.max(Math.min(parseInt(a.pos * (a.end[0] - a.start[0]) + a.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(a.pos * (a.end[1] - a.start[1]) + a.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(a.pos * (a.end[2] - a.start[2]) + a.start[2], 10), 255), 0) + ")"
		}
	});
	var e = {
			aqua: [0, 255, 255],
			azure: [240, 255, 255],
			beige: [245, 245, 220],
			black: [0, 0, 0],
			blue: [0, 0, 255],
			brown: [165, 42, 42],
			cyan: [0, 255, 255],
			darkblue: [0, 0, 139],
			darkcyan: [0, 139, 139],
			darkgrey: [169, 169, 169],
			darkgreen: [0, 100, 0],
			darkkhaki: [189, 183, 107],
			darkmagenta: [139, 0, 139],
			darkolivegreen: [85, 107, 47],
			darkorange: [255, 140, 0],
			darkorchid: [153, 50, 204],
			darkred: [139, 0, 0],
			darksalmon: [233, 150, 122],
			darkviolet: [148, 0, 211],
			fuchsia: [255, 0, 255],
			gold: [255, 215, 0],
			green: [0, 128, 0],
			indigo: [75, 0, 130],
			khaki: [240, 230, 140],
			lightblue: [173, 216, 230],
			lightcyan: [224, 255, 255],
			lightgreen: [144, 238, 144],
			lightgrey: [211, 211, 211],
			lightpink: [255, 182, 193],
			lightyellow: [255, 255, 224],
			lime: [0, 255, 0],
			magenta: [255, 0, 255],
			maroon: [128, 0, 0],
			navy: [0, 0, 128],
			olive: [128, 128, 0],
			orange: [255, 165, 0],
			pink: [255, 192, 203],
			purple: [128, 0, 128],
			violet: [128, 0, 128],
			red: [255, 0, 0],
			silver: [192, 192, 192],
			white: [255, 255, 255],
			yellow: [255, 255, 0],
			transparent: [255, 255, 255]
		},
		f = ["add", "remove", "toggle"],
		g = {
			border: 1,
			borderBottom: 1,
			borderColor: 1,
			borderLeft: 1,
			borderRight: 1,
			borderTop: 1,
			borderWidth: 1,
			margin: 1,
			padding: 1
		};
	a.effects.animateClass = function(b, c, d, e) {
		return a.isFunction(d) && (e = d, d = null), this.queue(function() {
			var g = a(this),
				k = g.attr("style") || " ",
				l = i(h.call(this)),
				m, n = g.attr("class") || "";
			a.each(f, function(a, c) {
				b[c] && g[c + "Class"](b[c])
			}), m = i(h.call(this)), g.attr("class", n), g.animate(j(l, m), {
				queue: !1,
				duration: c,
				easing: d,
				complete: function() {
					a.each(f, function(a, c) {
						b[c] && g[c + "Class"](b[c])
					}), typeof g.attr("style") == "object" ? (g.attr("style").cssText = "", g.attr("style").cssText = k) : g.attr("style", k), e && e.apply(this, arguments), a.dequeue(this)
				}
			})
		})
	}, a.fn.extend({
		_addClass: a.fn.addClass,
		addClass: function(b, c, d, e) {
			return c ? a.effects.animateClass.apply(this, [{
					add: b
				},
				c, d, e
			]) : this._addClass(b)
		},
		_removeClass: a.fn.removeClass,
		removeClass: function(b, c, d, e) {
			return c ? a.effects.animateClass.apply(this, [{
					remove: b
				},
				c, d, e
			]) : this._removeClass(b)
		},
		_toggleClass: a.fn.toggleClass,
		toggleClass: function(c, d, e, f, g) {
			return typeof d == "boolean" || d === b ? e ? a.effects.animateClass.apply(this, [d ? {
					add: c
				} : {
					remove: c
				},
				e, f, g
			]) : this._toggleClass(c, d) : a.effects.animateClass.apply(this, [{
					toggle: c
				},
				d, e, f
			])
		},
		switchClass: function(b, c, d, e, f) {
			return a.effects.animateClass.apply(this, [{
					add: c,
					remove: b
				},
				d, e, f
			])
		}
	}), a.extend(a.effects, {
		version: "1.8.22",
		save: function(a, b) {
			for (var c = 0; c < b.length; c++) b[c] !== null && a.data("ec.storage." + b[c], a[0].style[b[c]])
		},
		restore: function(a, b) {
			for (var c = 0; c < b.length; c++) b[c] !== null && a.css(b[c], a.data("ec.storage." + b[c]))
		},
		setMode: function(a, b) {
			return b == "toggle" && (b = a.is(":hidden") ? "show" : "hide"), b
		},
		getBaseline: function(a, b) {
			var c, d;
			switch (a[0]) {
				case "top":
					c = 0;
					break;
				case "middle":
					c = .5;
					break;
				case "bottom":
					c = 1;
					break;
				default:
					c = a[0] / b.height
			}
			switch (a[1]) {
				case "left":
					d = 0;
					break;
				case "center":
					d = .5;
					break;
				case "right":
					d = 1;
					break;
				default:
					d = a[1] / b.width
			}
			return {
				x: d,
				y: c
			}
		},
		createWrapper: function(b) {
			if (b.parent().is(".ui-effects-wrapper")) return b.parent();
			var c = {
					width: b.outerWidth(!0),
					height: b.outerHeight(!0),
					"float": b.css("float")
				},
				d = a("<div></div>").addClass("ui-effects-wrapper").css({
					fontSize: "100%",
					background: "transparent",
					border: "none",
					margin: 0,
					padding: 0
				}),
				e = document.activeElement;
			try {
				e.id
			} catch (f) {
				e = document.body
			}
			return b.wrap(d), (b[0] === e || a.contains(b[0], e)) && a(e).focus(), d = b.parent(), b.css("position") == "static" ? (d.css({
				position: "relative"
			}), b.css({
				position: "relative"
			})) : (a.extend(c, {
				position: b.css("position"),
				zIndex: b.css("z-index")
			}), a.each(["top", "left", "bottom", "right"], function(a, d) {
				c[d] = b.css(d), isNaN(parseInt(c[d], 10)) && (c[d] = "auto")
			}), b.css({
				position: "relative",
				top: 0,
				left: 0,
				right: "auto",
				bottom: "auto"
			})), d.css(c).show()
		},
		removeWrapper: function(b) {
			var c, d = document.activeElement;
			return b.parent().is(".ui-effects-wrapper") ? (c = b.parent().replaceWith(b), (b[0] === d || a.contains(b[0], d)) && a(d).focus(), c) : b
		},
		setTransition: function(b, c, d, e) {
			return e = e || {}, a.each(c, function(a, c) {
				var f = b.cssUnit(c);
				f[0] > 0 && (e[c] = f[0] * d + f[1])
			}), e
		}
	}), a.fn.extend({
		effect: function(b, c, d, e) {
			var f = k.apply(this, arguments),
				g = {
					options: f[1],
					duration: f[2],
					callback: f[3]
				},
				h = g.options.mode,
				i = a.effects[b];
			return a.fx.off || !i ? h ? this[h](g.duration, g.callback) : this.each(function() {
				g.callback && g.callback.call(this)
			}) : i.call(this, g)
		},
		_show: a.fn.show,
		show: function(a) {
			if (l(a)) return this._show.apply(this, arguments);
			var b = k.apply(this, arguments);
			return b[1].mode = "show", this.effect.apply(this, b)
		},
		_hide: a.fn.hide,
		hide: function(a) {
			if (l(a)) return this._hide.apply(this, arguments);
			var b = k.apply(this, arguments);
			return b[1].mode = "hide", this.effect.apply(this, b)
		},
		__toggle: a.fn.toggle,
		toggle: function(b) {
			if (l(b) || typeof b == "boolean" || a.isFunction(b)) return this.__toggle.apply(this, arguments);
			var c = k.apply(this, arguments);
			return c[1].mode = "toggle", this.effect.apply(this, c)
		},
		cssUnit: function(b) {
			var c = this.css(b),
				d = [];
			return a.each(["em", "px", "%", "pt"], function(a, b) {
				c.indexOf(b) > 0 && (d = [parseFloat(c), b])
			}), d
		}
	}), a.easing.jswing = a.easing.swing, a.extend(a.easing, {
		def: "easeOutQuad",
		swing: function(b, c, d, e, f) {
			return a.easing[a.easing.def](b, c, d, e, f)
		},
		easeInQuad: function(a, b, c, d, e) {
			return d * (b /= e) * b + c
		},
		easeOutQuad: function(a, b, c, d, e) {
			return -d * (b /= e) * (b - 2) + c
		},
		easeInOutQuad: function(a, b, c, d, e) {
			return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
		},
		easeInCubic: function(a, b, c, d, e) {
			return d * (b /= e) * b * b + c
		},
		easeOutCubic: function(a, b, c, d, e) {
			return d * ((b = b / e - 1) * b * b + 1) + c
		},
		easeInOutCubic: function(a, b, c, d, e) {
			return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
		},
		easeInQuart: function(a, b, c, d, e) {
			return d * (b /= e) * b * b * b + c
		},
		easeOutQuart: function(a, b, c, d, e) {
			return -d * ((b = b / e - 1) * b * b * b - 1) + c
		},
		easeInOutQuart: function(a, b, c, d, e) {
			return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
		},
		easeInQuint: function(a, b, c, d, e) {
			return d * (b /= e) * b * b * b * b + c
		},
		easeOutQuint: function(a, b, c, d, e) {
			return d * ((b = b / e - 1) * b * b * b * b + 1) + c
		},
		easeInOutQuint: function(a, b, c, d, e) {
			return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c
		},
		easeInSine: function(a, b, c, d, e) {
			return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
		},
		easeOutSine: function(a, b, c, d, e) {
			return d * Math.sin(b / e * (Math.PI / 2)) + c
		},
		easeInOutSine: function(a, b, c, d, e) {
			return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
		},
		easeInExpo: function(a, b, c, d, e) {
			return b == 0 ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
		},
		easeOutExpo: function(a, b, c, d, e) {
			return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
		},
		easeInOutExpo: function(a, b, c, d, e) {
			return b == 0 ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
		},
		easeInCirc: function(a, b, c, d, e) {
			return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
		},
		easeOutCirc: function(a, b, c, d, e) {
			return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
		},
		easeInOutCirc: function(a, b, c, d, e) {
			return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
		},
		easeInElastic: function(a, b, c, d, e) {
			var f = 1.70158,
				g = 0,
				h = d;
			if (b == 0) return c;
			if ((b /= e) == 1) return c + d;
			g || (g = e * .3);
			if (h < Math.abs(d)) {
				h = d;
				var f = g / 4
			} else var f = g / (2 * Math.PI) * Math.asin(d / h);
			return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g)) + c
		},
		easeOutElastic: function(a, b, c, d, e) {
			var f = 1.70158,
				g = 0,
				h = d;
			if (b == 0) return c;
			if ((b /= e) == 1) return c + d;
			g || (g = e * .3);
			if (h < Math.abs(d)) {
				h = d;
				var f = g / 4
			} else var f = g / (2 * Math.PI) * Math.asin(d / h);
			return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c
		},
		easeInOutElastic: function(a, b, c, d, e) {
			var f = 1.70158,
				g = 0,
				h = d;
			if (b == 0) return c;
			if ((b /= e / 2) == 2) return c + d;
			g || (g = e * .3 * 1.5);
			if (h < Math.abs(d)) {
				h = d;
				var f = g / 4
			} else var f = g / (2 * Math.PI) * Math.asin(d / h);
			return b < 1 ? -0.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) * .5 + d + c
		},
		easeInBack: function(a, c, d, e, f, g) {
			return g == b && (g = 1.70158), e * (c /= f) * c * ((g + 1) * c - g) + d
		},
		easeOutBack: function(a, c, d, e, f, g) {
			return g == b && (g = 1.70158), e * ((c = c / f - 1) * c * ((g + 1) * c + g) + 1) + d
		},
		easeInOutBack: function(a, c, d, e, f, g) {
			return g == b && (g = 1.70158), (c /= f / 2) < 1 ? e / 2 * c * c * (((g *= 1.525) + 1) * c - g) + d : e / 2 * ((c -= 2) * c * (((g *= 1.525) + 1) * c + g) + 2) + d
		},
		easeInBounce: function(b, c, d, e, f) {
			return e - a.easing.easeOutBounce(b, f - c, 0, e, f) + d
		},
		easeOutBounce: function(a, b, c, d, e) {
			return (b /= e) < 1 / 2.75 ? d * 7.5625 * b * b + c : b < 2 / 2.75 ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : b < 2.5 / 2.75 ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
		},
		easeInOutBounce: function(b, c, d, e, f) {
			return c < f / 2 ? a.easing.easeInBounce(b, c * 2, 0, e, f) * .5 + d : a.easing.easeOutBounce(b, c * 2 - f, 0, e, f) * .5 + e * .5 + d
		}
	})
}(jQuery);;
/*! jQuery UI - v1.8.22 - 2012-07-24
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.effects.drop.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
	a.effects.drop = function(b) {
		return this.queue(function() {
			var c = a(this),
				d = ["position", "top", "bottom", "left", "right", "opacity"],
				e = a.effects.setMode(c, b.options.mode || "hide"),
				f = b.options.direction || "left";
			a.effects.save(c, d), c.show(), a.effects.createWrapper(c);
			var g = f == "up" || f == "down" ? "top" : "left",
				h = f == "up" || f == "left" ? "pos" : "neg",
				i = b.options.distance || (g == "top" ? c.outerHeight(!0) / 2 : c.outerWidth(!0) / 2);
			e == "show" && c.css("opacity", 0).css(g, h == "pos" ? -i : i);
			var j = {
				opacity: e == "show" ? 1 : 0
			};
			j[g] = (e == "show" ? h == "pos" ? "+=" : "-=" : h == "pos" ? "-=" : "+=") + i, c.animate(j, {
				queue: !1,
				duration: b.duration,
				easing: b.options.easing,
				complete: function() {
					e == "hide" && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments), c.dequeue()
				}
			})
		})
	}
})(jQuery);;
apex.theme = {},
	function(theme, navigation, $) {
		"use strict";
		theme.popupFieldHelpClassic = function(pItemId, pSessionId) {
			navigation.popup({
				url: "wwv_flow_item_help.show_help?p_item_id=" + pItemId + "&p_session=" + pSessionId + "&p_output_format=HTML",
				name: "Help",
				width: 500,
				height: 350
			})
		}, theme.popupFieldHelp = function(pItemId, pSessionId) {
			$x("pScreenReaderMode") ? theme.popupFieldHelpClassic(pItemId, pSessionId) : $.getJSON("wwv_flow_item_help.show_help?p_item_id=" + pItemId + "&p_session=" + pSessionId + "&p_output_format=JSON", function(pData) {
				var lDialog = $("#apex_popup_field_help");
				0 === lDialog.length ? (lDialog = $('<div id="apex_popup_field_help">' + pData.helpText + "</div>"), lDialog.dialog({
					title: pData.title,
					bgiframe: !0,
					width: 500,
					height: 350,
					show: "drop",
					hide: "drop"
				})) : lDialog.html(pData.helpText).dialog("option", "title", pData.title).dialog("open")
			})
		}
	}(apex.theme, apex.navigation, apex.jQuery);