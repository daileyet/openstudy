//** Open details info in oracle Apex
//** Author: dailey.dai@oracle.com
//** Current version 1.0 (Mar 22th, 14)

var openeditor = {

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
	//config.$current_invoker       jquery object   internal
	//config.debug			        boolean						false	this.action.attribute07
	//config.update_template        string			option				this.action.attribute08
	//config.delete_template        string			option				this.action.attribute09
	//config.affectedElements		jquery object   					this.affectedElements
	install:function(){
		var config={};		
		//////////////////////////////////////////////////////////////////////////////////////		
		config.invoker_class=this.action.attribute01;
		config.query_template=this.action.attribute02;
		config.plugin_name=this.action.attribute03;
		config.width=this.action.attribute04;
		config.ajax_process=this.action.attribute05;
		config.title=this.action.attribute06;
		config.debug=this.action.attribute07;
		config.update_template=this.action.attribute08;
		config.delete_template=this.action.attribute09;
		//config.load_url=this.action.load_url;
  		config.ajax_identifier=this.action.ajaxIdentifier;
  		//config.css=this.action.css;
		config.affectedElements=this.affectedElements;// bind affectedElements
		////////////////////////////////////////////////////////////////////////////////////////
		openeditor.setup(config);
	},
	setup : function(config) {
		
		jQuery(document).ready(function() {
			config.$invoker = jQuery("." + config.invoker_class);
			openeditor.init(config);
			openeditor.addEvent(config);
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
			addSheetFile(config.css,'open-editor-css');
		}
		if(config.debug && config.debug=='N'){
			config.debug=false;
		}else{
			config.debug=true;
		}
		config.log=function(str){
			if(config.debug){
				console.log(str);
			}			
		};
		config.width = parseInt(config.width);
		config.container_name = "open-details-container" + config.plugin_name;
		config.loading_name = "open-details-loading" + config.plugin_name;
		openeditor.build(config);
		config.$container = jQuery("#" + config.container_name);
		config.$loading = jQuery("#" + config.loading_name);
	},

	build : function(config) {
		config.log("\n>> Set up >> init >> build");
		if (jQuery("#" + config.container_name).length == 0) {
			var sdiv = "<div id='" + config.container_name + "' title='"+config.title+"'></div>";
			jQuery(sdiv).appendTo(jQuery("body"));
		};
		if (jQuery("#" + config.loading_name)) {
			var sdiv = "<img id='" + config.loading_name + "' src='"+config.load_url +"' style='display:none'/>";
			jQuery(sdiv).appendTo(jQuery("body"));
		};
	},


	parse:function(invoker,template,param_prefix){
		var r = new RegExp("{\\s*\\d+\\s*}", "gi");
		var r2 = new RegExp("\\d+");
		var str = template;
		//console.log("\nquery_template  = "+config.query_template);
		var match = str.match(r);
		var query_params = [];
		var index = 0;
		if (match != null) {
			for (var i = 0, j = match.length; i < j; i++) {
				var m = match[i];
				var match2 = m.match(r2);
				if (match2 != null && match2.length > 0) {
					query_params[index] = param_prefix + match2[0];
					//console.log("\nquery_params "+index+" = "+query_params[index]);
					index++;
				}
			}
		}
		for (var i = 0, j = query_params.length; i < j; i++) {
			var dataAttr = query_params[i];
			var dataVal = invoker.data(dataAttr);
			var data_number = dataAttr.substr(param_prefix.length);
			
			var r = new RegExp("{\\s*" + data_number + "\\s*}", "gi");
			str = str.replace(r, "'" + dataVal + "'");
		}
		return str;
	},

	parseQuery : function(invoker, config) {
		config.log("\n>> Set up >> addEvent >> onClick >> parse");
		var str=openeditor.parse(invoker,config.query_template,config.query_param_prefix);
		
		config.log("\nquery  = "+str);
		return str;
	},
	
	

	parseUpdate:function(config){
		config.log("\n>> Set up >> addEvent >> onClick >> parseUpdate");
		var sql=openeditor.parse(config.$current_invoker,config.update_template,config.query_param_prefix);
		var r=new RegExp("#\[\\w,\\s\]*#","gi");
		var match = sql.match(r);
		var column_names = [];
		if(match!=null){
			for(var i=0,j=match.length;i<j;i++){
				var m=match[i];
				column_names[i]=m.substring(1,m.length-1);
			}
			for(var i=0,j=column_names.length; i<j; i++){
			  var $input=$("input[name='ot_item_"+column_names[i]+"']");
			  var sNewVal=$input.val();
			  var r2 = new RegExp("#" + column_names[i] + "#", "gi");
			  if(sNewVal=='' || sNewVal==null){
			  	sql = sql.replace(r2, "NULL");
			  }else{
			  	sql = sql.replace(r2, "'" + sNewVal + "'");
			  }
			  
			};
		}
		config.log("\n update sql = "+sql);
		return sql;
	},

	addEvent : function(config) {
		config.$invoker.click(function(event) {
			config.log("\n>> Set up >> addEvent >> onClick");
			config.$current_invoker=jQuery(this);
			var jsEvent = event;
			if (!jsEvent) {
				jsEvent = window.event;
			}
			config.$container.css("display", "none");
			config.$loading.css("display", "block").css("position", "absolute").css("left", jsEvent.pageX + 'px').css("top", jsEvent.pageY + 'px');

			var sql = openeditor.parseQuery(jQuery(this), config);
    
			//use page Ajax process
	        if(config.ajax_process && '' != config.ajax_process.trim()){
				apex.server.process(config.ajax_process, {
					"x01" : sql,
				}, {
					"dataType" : "html",
					"success" : function(data) {
						config.$loading.css("display", "none");
						config.$container.html(data);
						config.$container.dialog({
							//position : [jsEvent.pageX, jsEvent.pageY],
							width : config.width,
							modal:true,
							buttons:{
								Cancel:function(){$( this ).dialog( "close" );},
								Delete:function(){openeditor.doDelete(config);},
								Apply:function(){openeditor.doSave(config);}
							}
						});
					}
				});
			}else{// use inner default Ajax function 
				apex.server.plugin(config.ajax_identifier, {
					"x01" : sql,
				}, {
					"dataType" : "html",
					"success" : function(data) {
						config.$loading.css("display", "none");
						config.$container.html(data);
						config.$container.dialog({
							//position : [jsEvent.pageX, jsEvent.pageY],
							width : config.width,
							modal:true,
							buttons:{
								Cancel:function(){jQuery( this ).dialog( "close" );},
								Delete:function(){openeditor.doDelete(config);},
								Apply:function(){openeditor.doSave(config);}
							}
						});
					}
				});
			}

		});
	},
	
	refreshRegion:function(config){
		config.log("\n>> Set up >> refreshRegion");
		config.log("\n>> AffectedElements = "+config.affectedElements);
		config.affectedElements&&config.affectedElements.trigger("apexrefresh");
	},
	
	doSave:function(config){
		config.log("\n>> Set up >> addEvent >> doSave");
		config.log("\n>> Update Template:"+config.update_template);
		var sql = openeditor.parseUpdate(config);
		
		apex.server.plugin(config.ajax_identifier, {
			"x01" : sql,
			"x02" : "U"
		}, {
			"dataType" : "html",
			"success" : function(data) {
				config.log("\n>> Set up >> addEvent >> doSave >> success");
				var $labelTd=jQuery(data).find("td[name='ot_label_AJAX_SUCCESS_IDENTIFIER']");
				if($labelTd.length>0){
					var sMsg=$labelTd.next().text();
					config.log("\n Success message = "+sMsg);
					jQuery('div.go-editor-result').remove();
					jQuery('<div class="go-editor-result go-editor-result-success"><span class="ui-icon ui-icon-info" style="float:left; margin:0 7px 50px 0;"></span>The record has updated successfully.</div>')
					.css("display","none")
					.insertBefore(jQuery('table.print-columns-table').parent())
					.fadeIn(function(){
						openeditor.refreshRegion(config);
						setTimeout(function(){jQuery('div.go-editor-result').fadeOut('3000');},3000);
					});
				}else{
					$labelTd=jQuery(data).find("td[name='ot_label_AJAX_FAIL_IDENTIFIER']");
					var sMsg=$labelTd.next().text();
					config.log("\n Error message = "+sMsg);
					jQuery('div.go-editor-result').remove();
					jQuery('<div class="go-editor-result go-editor-result-error"><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 50px 0;"></span>'+sMsg+'</div>')
					.css("display","none")
					.insertBefore(jQuery('table.print-columns-table').parent())
					.fadeIn(function(){
						//setTimeout(function(){jQuery('div.go-editor-result').fadeOut('3000');},5000);
					});
				}
			}
		}); 

	},
	
	doDelete:function(config){
		config.log("\n>> Set up >> addEvent >> doDelete");
		config.log("\n>> Delete Template:"+config.delete_template);
		var sql=openeditor.parse(config.$current_invoker,config.delete_template,config.query_param_prefix);
		apex.server.plugin(config.ajax_identifier, {
			"x01" : sql,
			"x02" : "D"
		}, {
			"dataType" : "html",
			"success" : function(data) {
				config.log("\n>> Set up >> addEvent >> doDelete >> success");
				var $labelTd=jQuery(data).find("td[name='ot_label_AJAX_SUCCESS_IDENTIFIER']");
				if($labelTd.length>0){
					var sMsg=$labelTd.next().text();
					config.log("\n Success message = "+sMsg);
					jQuery('div.go-editor-result').remove();
					jQuery('<div class="go-editor-result go-editor-result-success"><span class="ui-icon ui-icon-info" style="float:left; margin:0 7px 50px 0;"></span>The record has removed successfully.</div>')
					.css("display","none")
					.insertBefore(jQuery('table.print-columns-table').parent())
					.fadeIn(function(){
						openeditor.refreshRegion(config);
						setTimeout(function(){jQuery('div.go-editor-result').fadeOut('3000');},3000);
					});
				}else{
					$labelTd=jQuery(data).find("td[name='ot_label_AJAX_FAIL_IDENTIFIER']");
					var sMsg=$labelTd.next().text();
					config.log("\n Error message = "+sMsg);
					jQuery('div.go-editor-result').remove();
					jQuery('<div class="go-editor-result go-editor-result-error"><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 50px 0;"></span>'+sMsg+'</div>')
					.css("display","none")
					.insertBefore(jQuery('table.print-columns-table').parent())
					.fadeIn(function(){
						//setTimeout(function(){jQuery('div.go-editor-result').fadeOut('3000');},5000);
					});
				}
			}
		}); 
	}
};
