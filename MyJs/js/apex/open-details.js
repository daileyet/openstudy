//** Open details info in oracle Apex
//** Author: dailey.dai@oracle.com
//** Current version 1.0 (Mar 22th, 14)
String.prototype.trim= function(){  
    return this.replace(/(^\s*)|(\s*$)/g, "");  
}
var opendetails = {

	//config.invoker_class 			string								this.action.attribute01	
	//config.plugin_name			string 			option				this.action.attribute03
	//config.$target      			jquery object	internal
	//config.query_template			string								this.action.attribute02
	//config.query_param_prefix		string 			option				
	//config.width					number 			option				this.action.attribute04
	//config.ajax_process			string 							    this.action.attribute05
	//config.load_url    			string 			option				
	//config.ajax_identifier        string                              
	//config.title			        string                              this.action.attribute06
	//config.css			        string                              
	setup : function(config) {
		jQuery(document).ready(function() {
			config.$invoker = jQuery("." + config.invoker_class);
			opendetails.init(config);
			opendetails.addEvent(config);
		});
	},

	init : function(config) {
		if (!config.width)
			config.plugin_name = "400";
		if (!config.plugin_name)
			config.plugin_name = "";
		if (!config.query_param_prefix) {
			config.query_param_prefix = "param";
		}
		if(!config.title || ""==config.title.trim()){
			config.title="Details Information";
		}
		if(config.css){
			//$("<link rel='stylesheet' href='"+config.css+"'/>").append($("head"));
		}
		config.width = parseInt(config.width);
		config.container_name = "open-details-container" + config.plugin_name;
		config.loading_name = "open-details-loading" + config.plugin_name;
		opendetails.build(config);
		config.$container = jQuery("#" + config.container_name);
		config.$loading = jQuery("#" + config.loading_name);
	},

	build : function(config) {
		if (jQuery("#" + config.container_name).length == 0) {
			var sdiv = "<div id='" + config.container_name + "' title='"+config.title+"'></div>";
			jQuery(sdiv).appendTo(jQuery("body"));
		};
		if (jQuery("#" + config.loading_name)) {
			var sdiv = "<img id='" + config.loading_name + "' src='"+config.load_url +"' style='display:none'/>";
			jQuery(sdiv).appendTo(jQuery("body"));
		};
	},

	parse : function(invoker, config) {
		var r = new RegExp("{\\s*\\d+\\s*}", "gi");
		var r2 = new RegExp("\\d+");
		var str = config.query_template;
		//console.log("\nquery_template  = "+config.query_template);
		var match = str.match(r);
		var query_params = [];
		var index = 0;
		if (match != null) {
			for (var i = 0, j = match.length; i < j; i++) {
				var m = match[i];
				var match2 = m.match(r2);
				if (match2 != null && match2.length > 0) {
					query_params[index] = config.query_param_prefix + match2[0];
					//console.log("\nquery_params "+index+" = "+query_params[index]);
					index++;
				}
			}
		}
		for (var i = 0, j = query_params.length; i < j; i++) {
			var dataAttr = query_params[i];
			var dataVal = invoker.data(dataAttr);
			var data_number = dataAttr.substr(config.query_param_prefix.length);
			
			var r = new RegExp("{\\s*" + data_number + "\\s*}", "gi");
			str = str.replace(r, "'" + dataVal + "'");
			//console.log("\ndata attr = "+dataAttr + ", data val = "+dataVal+" , data number = "+data_number);
		}

		return str;
	},

	addEvent : function(config) {
		config.$invoker.click(function(event) {
			var jsEvent = event;
			if (!jsEvent) {
				jsEvent = window.event;
			}
			config.$container.css("display", "none");
			config.$loading.css("display", "block").css("position", "absolute").css("left", jsEvent.pageX + 'px').css("top", jsEvent.pageY + 'px');

			var sql = opendetails.parse(jQuery(this), config);
    
			//use page Ajax process
	        if(config.ajax_process && '' != config.ajax_process.trim()){
				apex.server.process(config.ajax_process, {
					"x01" : sql,
				}, {
					"dataType" : "html",
					"success" : function(data) {
						config.$loading.css("display", "none")
						config.$container.html(data);
						config.$container.dialog({
							position : [jsEvent.pageX, jsEvent.pageY],
							width : config.width
						});
					}
				});
			}else{// use inner default Ajax function 
				apex.server.plugin(config.ajax_identifier, {
					"x01" : sql,
				}, {
					"dataType" : "html",
					"success" : function(data) {
						config.$loading.css("display", "none")
						config.$container.html(data);
						config.$container.dialog({
							position : [jsEvent.pageX, jsEvent.pageY],
							width : config.width
						});
					}
				});
			}

		});
	}
};
