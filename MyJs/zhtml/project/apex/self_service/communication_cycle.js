(function($, options) {
	$.fn.emailCycle = function(cycleOptions) {
		var $svg = $(this);
		var cycleOps = cycleOptions || {};
		var defOps = {
			url: '',
			//data:{}
			maxCols:7,
			autoCalcMaxCols:false,
			params: {},
			cycleNodeRender: function(paper, node) {
				/* the default node drawing */
				var color = Raphael.getColor();
				var ellipse = paper.ellipse(0, 0, 30, 20).attr({
					fill: color,
					stroke: color,
					"stroke-width": 2,
					cursor: "move"
				});
				/* set DOM node ID */
				ellipse.node.id = node.id || node.label;
				var text = paper.text(0, 30, node.label || node.id).attr({
					'font-weight': 'bold',
					'font-size': '11px'
				});
				if (node.href) {
					text.attr("href", node.href);
				}
				if (node.target) {
					text.attr("target", node.target);
				}

				var tooltip = paper.text(0, 0, node.date).attr({
					opacity: 0,
					cursor: "move"
				});

				shape = paper.set().
				push(ellipse)
					.push(text)
					.push(tooltip);

				tooltip.hover(function() {
					tooltip.animate({
						opacity: 1,
						"fill-opacity": 1
					}, 500);
				},function() {
					tooltip.animate({
						opacity: 0,
						"fill-opacity": 0
					}, 1000);
				});
				
				return shape;
			},
			width: ($svg.width()),
			height: $svg.height(),
			cycleRender: function(data) {
				var g = new Graph();
				var i = 0;
				var j = data.length;
				if (j == 0) {} else if (j == 1) {
					var begin = data[0];
					begin.render = defOps.cycleNodeRender;
					g.addNode(begin.id, begin);
				} else {
					for (; i < j - 1; i++) {
						var begin = data[i];
						var end = data[i + 1];
						begin.render = defOps.cycleNodeRender;
						end.render = defOps.cycleNodeRender;
						g.addNode(begin.id, begin);
						g.addNode(end.id, end);
						g.addEdge(begin.id, end.id, {
							directed: true
						})
					}
				}
				var layouter = new Graph.Layout.Customized(g, defOps.maxCols);
				$svg.css("height",layouter.absoulteSize().height);
				/* layout the graph using the Spring layout implementation */
				var drender = new Graph.Renderer.Raphael($svg.attr('id'), g, $svg.width(), $svg.height());
				drender.draw();
				
				$(window).resize(function(){
					console.log(layouter.absoulteSize().width+'<=>'+$svg.width());
					if(layouter.absoulteSize().width < $svg.width()){
						drender.resize($svg.width(), $svg.height());
						drender.draw();
					}
					
				});
			}

		};
		$.extend(true, defOps, cycleOps);

		if (defOps.data) {
			defOps.cycleRender(defOps.data);
		} else if (defOps.url !== '') {
			$.get(defOps.url, defOps.params, function(data) {
				defOps.cycleRender(data);
			}, 'json');
		}

	}


})(jQuery, {})

Graph.Layout.Customized = function(graph, maxColumn) {
	this.graph = graph;
	this.maxColumn = maxColumn;
	this.elementRadius=50;
	this.layout();
};
Graph.Layout.Customized.prototype = {
	layout: function() {
		this.layoutPrepare();
		this.layoutCalcBounds();
	},

	absoulteSize:function(){
		var line=Math.floor((this.nodeCount()-1) / this.maxColumn)+1;
		return {
			width :this.maxColumn*this.elementRadius*2,
			height:line*this.elementRadius*2
		};
	},
	
	nodeCount:function(){
		var counter = 0;
		for (i in this.graph.nodes) {
			counter++;
		}
		return counter;
	},

	layoutPrepare: function() {
		for (i in this.graph.nodes) {
			var node = this.graph.nodes[i];
			node.layoutPosX = 0;
			node.layoutPosY = 0;
		}
		var counter = 0;
		for (i in this.graph.nodes) {
			var node = this.graph.nodes[i];

			var line = Math.floor(counter / this.maxColumn); // line number
			var column = counter % (this.maxColumn);
			if (line % 2 != 0) {
				column = (this.maxColumn - column - 1);
			}

			node.layoutPosX = column+1;
			node.layoutPosY = line+1;
			counter++;
		}
	},

	layoutCalcBounds: function() {
		var minx = Infinity,
			maxx = -Infinity,
			miny = Infinity,
			maxy = -Infinity;

		for (i in this.graph.nodes) {
			var x = this.graph.nodes[i].layoutPosX;
			var y = this.graph.nodes[i].layoutPosY;

			if (x > maxx) maxx = x;
			if (x < minx) minx = x;
			if (y > maxy) maxy = y;
			if (y < miny) miny = y;
		}

		this.graph.layoutMinX = minx;
		this.graph.layoutMaxX = maxx;

		this.graph.layoutMinY = miny;
		this.graph.layoutMaxY = maxy;

		/**
		 * fix layout when only one node in graph
		 */
		if (minx == maxx) {
			this.graph.layoutMaxX = 2 * minx;
		}
		if (miny == maxy) {
			this.graph.layoutMaxY = 2 * miny;
		}
	}
};