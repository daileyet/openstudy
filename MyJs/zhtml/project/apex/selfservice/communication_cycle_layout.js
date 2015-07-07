/**
 * self service communication email layout
 * @author dailey.dai@oracle.com
 * @date 2015/4/15
 */
Graph.Layout.SSC = function(graph) {
	this.graph = graph;
	this.maxColumn = 3;
	this.elementRadius = 50;
	this.line = 1;
	this.layout();
};
Graph.Layout.SSC.categorys = function() {
	return [
		'SYS_INIT_SEND',
		'CUST_REPLY',
		'SYS_RETRY_SEND',
		'SYS_CONFIRM',
		'SYS_REMINDER_CUST',
		'SYS_INTERNAL_SEND',
		'INTERNAL_REPLY',
		'SYS_TRYOUT_SEND'
	];
}
Graph.Layout.SSC.categoryMap = function() {
	var map = {};
	var keys = Graph.Layout.SSC.categorys();
	for (var i in keys) {
		map[keys[i]] = [];
	}
	return map;
}

Graph.Layout.SSC.prototype = {
	layout: function() {
		this.layoutPrepare();
		this.layoutCalcShips();
		this.layoutCalcBounds();
	},
	absoulteSize: function() {
		return {
			width: this.maxColumn * this.elementRadius * 2,
			height: this.line * this.elementRadius * 2
		};
	},
	layoutPrepare: function() {
		var nodes = this.graph.nodes;
		var maxLine = 1;
		var categorys = Graph.Layout.SSC.categorys();
		for (var i in nodes) {
			var node = nodes[i];
			var pos = [1, 1];
			switch (node.buz) {
				case 'SYS_INIT_SEND':
					pos = [1, 1];
					break;
				case 'CUST_REPLY':
					pos = [2, 1];
					break;
				case 'SYS_RETRY_SEND':
					pos = [2, 2];
					break;
				case 'SYS_CONFIRM':
					pos = [3, 1];
					break;
				case 'SYS_REMINDER_CUST':
					pos = [1, 2];
					break;
				case 'SYS_INTERNAL_SEND':
					pos = [1, 3];
					break;
				case 'INTERNAL_REPLY':
					pos = [2, 3];
					break;
				case 'SYS_TRYOUT_SEND':
					pos = [3, 1];
					break;
				default:
					break;
			}
			node.layoutPosX = pos[0];
			node.layoutPosY = pos[1];
			if (pos[1] > maxLine) {
				maxLine = pos[1];
			}
		}
		this.line = maxLine;
	},
	layoutCalcShips: function() {
		var ships = Graph.Layout.SSC.categoryMap();
		var nodes = this.graph.nodes;
		for (var i in nodes) {
			var node = nodes[i];
			ships[node.buz].push(node);
		}
		// 1. build ship for SYS_INIT_SEND and CUST_REPLY , SYS_REMINDER_CUST
		for (var i in ships['SYS_INIT_SEND']) {
			var begin = ships['SYS_INIT_SEND'][i];
			begin.nextEdges = begin.nextEdges || [];
			for (var j in ships['CUST_REPLY']) {
				var end = ships['CUST_REPLY'][j];
//				begin.nextEdges.push(end.id);
				this.graph.addEdge(begin.id, end.id, {
					directed: true
				});
			}
			for (var j in ships['SYS_REMINDER_CUST']) {
				var end = ships['SYS_REMINDER_CUST'][j];
//				begin.nextEdges.push(end.id);
				this.graph.addEdge(begin.id, end.id, {
					directed: true
				});
			}
		}
		// 2. build ship for CUST_REPLY and SYS_CONFIRM, SYS_RETRY_SEND,SYS_TRYOUT_SEND
		for (var i in ships['CUST_REPLY']) {
			var begin = ships['CUST_REPLY'][i];
			begin.nextEdges = begin.nextEdges || [];
			for (var j in ships['SYS_RETRY_SEND']) {
				var end = ships['SYS_RETRY_SEND'][j];
//				begin.nextEdges.push(end.id);
				this.graph.addEdge(begin.id, end.id, {
					directed: true
				});
				this.graph.addEdge(end.id, begin.id, {
					directed: true
				});
			}

			for (var j in ships['SYS_CONFIRM']) {
				var end = ships['SYS_CONFIRM'][j];
//				begin.nextEdges.push(end.id);
				this.graph.addEdge(begin.id, end.id, {
					directed: true
				});
			}

			for (var j in ships['SYS_TRYOUT_SEND']) {
				var end = ships['SYS_TRYOUT_SEND'][j];
//				begin.nextEdges.push(end.id);
				this.graph.addEdge(begin.id, end.id, {
					directed: true
				});
			}
		}
		// 3. build ship for SYS_REMINDER_CUST and SYS_INTERNAL_SEND
		for (var i in ships['SYS_REMINDER_CUST']) {
			var begin = ships['SYS_REMINDER_CUST'][i];
			begin.nextEdges = begin.nextEdges || [];
			for (var j in ships['SYS_INTERNAL_SEND']) {
				var end = ships['SYS_INTERNAL_SEND'][j];
//				begin.nextEdges.push(end.id);
				this.graph.addEdge(begin.id, end.id, {
					directed: true
				});
			}
		}
		// 4. build ship for SYS_INTERNAL_SEND and INTERNAL_REPLY
		for (var i in ships['SYS_INTERNAL_SEND']) {
			var begin = ships['SYS_INTERNAL_SEND'][i];
			begin.nextEdges = begin.nextEdges || [];
			for (var j in ships['INTERNAL_REPLY']) {
				var end = ships['INTERNAL_REPLY'][j];
//				begin.nextEdges.push(end.id);
				this.graph.addEdge(begin.id, end.id, {
					directed: true
				});
			}
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
		if (this.graph.layoutMaxX < this.maxColumn) { //fix columns
			this.graph.layoutMaxX = this.maxColumn;
		}
		this.graph.layoutMinX = 1;
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












Graph.Layout.Customized = function(graph, maxColumn) {
	this.graph = graph;
	this.maxColumn = maxColumn;
	this.elementRadius = 50;
	this.layout();
};
Graph.Layout.Customized.prototype = {
	layout: function() {
		this.layoutPrepare();
		this.layoutCalcBounds();
	},

	absoulteSize: function() {
		var line = Math.floor((this.nodeCount() - 1) / this.maxColumn) + 1;
		return {
			width: this.maxColumn * this.elementRadius * 2,
			height: line * this.elementRadius * 2
		};
	},

	nodeCount: function() {
		var counter = 0;
		for (i in this.graph.nodes) {
			counter++;
		}
		return counter;
	},

	layoutPrepare: function() {
		for (var i in this.graph.nodes) {
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
			node.layoutPosX = column + 1;
			node.layoutPosY = line + 1;
			counter++;
		}
	},
	layoutCalcShips: function(_arrayData) {
		var arrayData = _arrayData || [];
		var i = 0,j = arrayData.length;
		for (; i < j - 1; i++) {
			var b = arrayData[i];
			var e = arrayData[i + 1];
			this.graph.addEdge(b.id, e.id,{directed:true});
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