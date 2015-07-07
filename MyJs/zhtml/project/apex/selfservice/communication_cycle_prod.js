/**
 * communication email cycle overview graph
 * @author dailey.dai@oracle.com
 * @since 2014/11/10
 * @modified 2014/11/27
 */
(function(b, a) {
	b.fn.emailCycle = function(f) {
		var d = b(this);
		var c = f || {};
		var e = {
			url: "",
			maxCols: 7,
			autoCalcMaxCols: false,
			params: {},
			cycleNodeRender: function(m, j) {
				var g = j.color || Raphael.getColor();
				var h = m.ellipse(0, 0, 30, 20).attr({
					fill: g,
					stroke: g,
					"stroke-width": 2,
					cursor: "move"
				});
				h.node.id = j.id || j.label;
				var l = m.text(0, 30, j.label || j.id).attr({
					"font-weight": "bold",
					"font-size": "11px"
				});
				if (j.href) {
					l.attr("href", j.href)
				}
				if (j.target) {
					l.attr("target", j.target)
				}
				var k = m.text(0, 0, j.date).attr({
					opacity: 0,
					cursor: "move"
				});
				shape = m.set().push(h).push(l).push(k);
				k.hover(function() {
					k.animate({
						opacity: 1,
						"fill-opacity": 1
					}, 500)
				}, function() {
					k.animate({
						opacity: 0,
						"fill-opacity": 0
					}, 1000)
				});
				return shape
			},
			width: (d.width()),
			height: d.height(),
			cycleRender: function(p) {
				var o = new Graph();
				var m = 0;
				var l = p.length;
				if (l == 0) {} else {
					if (l == 1) {
						var n = p[0];
						n.render = e.cycleNodeRender;
						o.addNode(n.id, n)
					} else {
						for (; m < l - 1; m++) {
							var n = p[m];
							var k = p[m + 1];
							n.render = e.cycleNodeRender;
							k.render = e.cycleNodeRender;
							o.addNode(n.id, n);
							o.addNode(k.id, k);
							o.addEdge(n.id, k.id, {
								directed: true
							})
						}
					}
				}
				var q = new Graph.Layout.Customized(o, e.maxCols);
				d.css("height", q.absoulteSize().height);
				var h = new Graph.Renderer.Raphael(d.attr("id"), o, d.width(), d.height());
				h.draw();
				b(window).resize(function() {
					if (q.absoulteSize().width < d.width()) {
						h.resize(d.width(), d.height());
						h.draw()
					}
				})
			}
		};
		b.extend(true, e, c);
		if (e.data) {
			e.cycleRender(e.data)
		} else {
			if (e.url !== "") {
				b.get(e.url, e.params, function(g) {
					e.cycleRender(g)
				}, "json")
			}
		}
	}
})(jQuery || apex.jQuery, {});
Graph.Layout.Customized = function(b, a) {
	this.graph = b;
	this.maxColumn = a;
	this.elementRadius = 50;
	this.layout()
};
Graph.Layout.Customized.prototype = {
	layout: function() {
		this.layoutPrepare();
		this.layoutCalcBounds()
	},
	absoulteSize: function() {
		var a = Math.floor((this.nodeCount() - 1) / this.maxColumn) + 1;
		console.log(a);
		return {
			width: this.maxColumn * this.elementRadius * 2,
			height: a * this.elementRadius * 2
		}
	},
	nodeCount: function() {
		var a = 0;
		for (i in this.graph.nodes) {
			a++
		}
		return a
	},
	layoutPrepare: function() {
		for (i in this.graph.nodes) {
			var d = this.graph.nodes[i];
			d.layoutPosX = 0;
			d.layoutPosY = 0
		}
		var b = 0;
		for (i in this.graph.nodes) {
			var d = this.graph.nodes[i];
			var a = Math.floor(b / this.maxColumn);
			var c = b % (this.maxColumn);
			if (a % 2 != 0) {
				c = (this.maxColumn - c - 1)
			}
			d.layoutPosX = c + 1;
			d.layoutPosY = a + 1;
			b++
		}
	},
	layoutCalcBounds: function() {
		var c = Infinity,
			e = -Infinity,
			b = Infinity,
			d = -Infinity;
		for (i in this.graph.nodes) {
			var a = this.graph.nodes[i].layoutPosX;
			var f = this.graph.nodes[i].layoutPosY;
			if (a > e) {
				e = a
			}
			if (a < c) {
				c = a
			}
			if (f > d) {
				d = f
			}
			if (f < b) {
				b = f
			}
		}
		this.graph.layoutMinX = c;
		this.graph.layoutMaxX = e;
		this.graph.layoutMinY = b;
		this.graph.layoutMaxY = d;
		if (c == e) {
			this.graph.layoutMaxX = 2 * c
		}
		if (b == d) {
			this.graph.layoutMaxY = 2 * b
		}
	}
};