//** Open editor info in oracle Apex
//** Author: dailey.dai@oracle.com
//** Current version 1.0 (May 14th, 14)

var openeditor = {

	//config.invoker_selector			string								this.action.attribute01
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
	//config.actions		        string			option				this.action.attribute08
	//config.update_template        string			option				this.action.attribute09
	//config.delete_template        string			option				this.action.attribute10
	//config.affectedElements		jquery object   					this.affectedElements

	setup : function(config) {

		jQuery(document).ready(function() {
			config.$invoker = jQuery(config.invoker_selector);
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
		if (!config.title || "" == config.title.trim()) {
			config.title = "Quick Entry";
		}
		if (config.css) {
			addSheetFile(config.css, 'open-editor-css');
		}
		if (config.debug && config.debug == 'N') {
			config.debug = false;
		} else {
			config.debug = true;
		}
		config.log = function(str) {
			if (config.debug) {
				console.log(str);
			}
		};
		config.width = parseInt(config.width);
		config.container_name = "open-editor-container" + config.plugin_name;
		config.loading_name = "open-editor-loading" + config.plugin_name;
		openeditor.build(config);
		config.$container = jQuery("#" + config.container_name);
		config.$loading = jQuery("#" + config.loading_name);

	},

	build : function(config) {
		config.log("\n>> Set up >> init >> build");
		if (jQuery("#" + config.container_name).length == 0) {
			var sdiv = "<div id='" + config.container_name + "' title='" + config.title + "'></div>";
			jQuery(sdiv).appendTo(jQuery("body"));
		};
		if (jQuery("#" + config.loading_name)) {
			var sdiv = "<img id='" + config.loading_name + "' src='" + config.load_url + "' style='display:none'/>";
			jQuery(sdiv).appendTo(jQuery("body"));
		};
	},

	parse : function(invoker, template, param_prefix) {
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
		var str = openeditor.parse(invoker, config.query_template, config.query_param_prefix);

		config.log("\nquery  = " + str);
		return str;
	},

	parseUpdate : function(config) {
		config.log("\n>> Set up >> addEvent >> onClick >> parseUpdate");
		var sql = openeditor.parse(config.$current_invoker, config.update_template, config.query_param_prefix);
		var r = new RegExp("#\[\\w,\\s\]*#", "gi");
		var match = sql.match(r);
		var column_names = [];
		if (match != null) {
			for (var i = 0, j = match.length; i < j; i++) {
				var m = match[i];
				column_names[i] = m.substring(1, m.length - 1);
			}
			for (var i = 0, j = column_names.length; i < j; i++) {
				var $input = $("input[name='ot_item_" + column_names[i] + "']",config.$container);
				var sNewVal = $input.val();
				var r2 = new RegExp("#" + column_names[i] + "#", "gi");
				if (sNewVal == '' || sNewVal == null) {
					sql = sql.replace(r2, "NULL");
				} else {
					sql = sql.replace(r2, "'" + sNewVal + "'");
				}

			};
		}
		config.log("\n update sql = " + sql);
		return sql;
	},

	addEvent : function(config) {
		config.$invoker.click(function(event) {
			config.log("\n>> Set up >> addEvent >> onClick");
			config.$current_invoker = jQuery(this);
			var jsEvent = event;
			if (!jsEvent) {
				jsEvent = window.event;
			}
			config.$container.css("display", "none");
			config.$loading.css("display", "block").css("position", "absolute").css("left", jsEvent.pageX + 'px').css("top", jsEvent.pageY + 'px');

			var sql = openeditor.parseQuery(jQuery(this), config);

			//buttons
			if (config.buttons == undefined) {
				config.buttons = [];
				config.buttons.push({
					text : 'Cancel',
					click : function() {
						config.$container.dialog("close");
					}
				});
				if (config.actions) {
					var actAry = config.actions.split(':');
					for (var i = 0, j = actAry.length; i < j; i++) {
						if (actAry[i] === 'UPDATE') {
							config.buttons.push({
								text : 'Apply',
								click : function() {
									openeditor.doSave(config);
								}
							});
						} else if (actAry[i] === 'DELETE') {
							config.buttons.push({
								text : 'Delete',
								click : function() {
									openeditor.doDelete(config);
								}
							});
						}
					};

				}
			}//end of buttons config

			//use page Ajax process
			if (config.ajax_process && '' != config.ajax_process.trim()) {
				apex.server.process(config.ajax_process, {
					"x01" : sql
				}, {
					"dataType" : "html",
					"success" : function(data) {
						config.$loading.css("display", "none");
						config.$container.html(data);
						config.$container.dialog({
							//position : [jsEvent.pageX, jsEvent.pageY],
							width : config.width,
							modal : true,
							buttons : config.buttons,
							open : function(event, ui) {
								jQuery('div.go-editor-result').remove();
							}
						});
					}
				});
			} else {// use inner default Ajax function
				apex.server.plugin(config.ajax_identifier, {
					"x01" : sql
				}, {
					"dataType" : "html",
					"success" : function(data) {
						config.$loading.css("display", "none");
						config.$container.html(data);
						config.$container.dialog({
							//position : [jsEvent.pageX, jsEvent.pageY],
							width : config.width,
							modal : true,
							buttons : config.buttons,
							open : function(event, ui) {
								config.log("\n Set up >> addEvent >> onClick >> Dialog Open");
								config.log("\n Actions = " + config.actions);
								jQuery('div.go-editor-result').remove();
							}
						});
					}
				});
			}

		});
	},

	refreshRegion : function(config) {
		config.log("\n>> Set up >> refreshRegion");
		config.log("\n>> AffectedElements = " + config.affectedElements);
		if (config.affectedElements && config.affectedElements.length > 0)
			refreshReport(config.affectedElements);
	},

	/**
	 *
	 * @param {Object} typeClzz  go-editor-result-success	go-editor-result-success
	 * @param {Object} iconClzz  ui-icon-info	ui-icon-alert
	 * @param {Object} msg
	 * @param {Object} callback		fadeIn complete callback
	 */
	showNotification : function(typeClzz, iconClzz, msg, callback) {
		if (callback == undefined)
			callback = function() {
				setTimeout(function() {
					jQuery('div.go-editor-result').fadeOut('3000');
				}, 3000);
			};
		jQuery('div.go-editor-result').remove();
		jQuery('<div class="go-editor-result ' + typeClzz + '"><span class="ui-icon ' + iconClzz + '" style="float:left; margin:0 7px 50px 0;"></span>' + msg + '</div>')
		.css("display", "none")
		.insertBefore(jQuery('table.print-columns-table').parent())
		.fadeIn(callback);
	},
	
	doSave : function(config) {
		config.log("\n>> Set up >> addEvent >> doSave");
		config.log("\n>> Update Template:" + config.update_template);
		if(config.update_template.trim()==''){
			openeditor.showNotification('go-editor-result-error','ui-icon-alert','Please provider update statement template sql for this plug-in.',function(){});
			return;
		}
		var sql = openeditor.parseUpdate(config);
		apex.server.plugin(config.ajax_identifier, {
			"x01" : sql,
			"x02" : "U"
		}, {
			"dataType" : "html",
			"success" : function(data) {
				config.log("\n>> Set up >> addEvent >> doSave >> success");
				var $labelTd = jQuery(data).find("td[name='ot_label_AJAX_SUCCESS_IDENTIFIER']");
				if ($labelTd.length > 0) {
					var sMsg = $labelTd.next().text();
					config.log("\n Success message = " + sMsg);
					openeditor.showNotification('go-editor-result-success','ui-icon-info','The record has updated successfully.',function(){
						openeditor.refreshRegion(config);
						setTimeout(function() {
							jQuery('div.go-editor-result').fadeOut('3000');
						}, 3000);
					});
				} else {
					$labelTd = jQuery(data).find("td[name='ot_label_AJAX_FAIL_IDENTIFIER']");
					var sMsg = $labelTd.next().text();
					config.log("\n Error message = " + sMsg);
					openeditor.showNotification('go-editor-result-error','ui-icon-alert',sMsg,function(){});
				}
			}
		});

	},

	doDelete : function(config) {
		config.log("\n>> Set up >> addEvent >> doDelete");
		config.log("\n>> Delete Template:" + config.delete_template);
		if(config.delete_template.trim()==''){
			openeditor.showNotification('go-editor-result-error','ui-icon-alert','Please provider delete statement template sql for this plug-in.',function(){});
			return;
		}
		var sql = openeditor.parse(config.$current_invoker, config.delete_template, config.query_param_prefix);
		apex.server.plugin(config.ajax_identifier, {
			"x01" : sql,
			"x02" : "D"
		}, {
			"dataType" : "html",
			"success" : function(data) {
				config.log("\n>> Set up >> addEvent >> doDelete >> success");
				var $labelTd = jQuery(data).find("td[name='ot_label_AJAX_SUCCESS_IDENTIFIER']");
				if ($labelTd.length > 0) {
					var sMsg = $labelTd.next().text();
					config.log("\n Success message = " + sMsg);
					
					openeditor.showNotification('go-editor-result-success','ui-icon-info','The record has removed successfully.',function(){
						openeditor.refreshRegion(config);
						config.$container.dialog("close");
					});
				} else {
					$labelTd = jQuery(data).find("td[name='ot_label_AJAX_FAIL_IDENTIFIER']");
					var sMsg = $labelTd.next().text();
					config.log("\n Error message = " + sMsg);
					openeditor.showNotification('go-editor-result-error','ui-icon-alert',sMsg,function(){});
				}
			}
		});
	}
};
