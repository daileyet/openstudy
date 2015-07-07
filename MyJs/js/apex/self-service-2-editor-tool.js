/**
 * @author dailey.dai@oracle.com
 * @desc unit sql editor & toolbars; used CodeMirror as code editor
 * @date 2015/4/10
 */
(function($) {
	function SqlEditor(el, config) {
		this.options = {
			mode: 'text/x-plsql',
			indentWithTabs: true,
			smartIndent: true,
			lineNumbers: true,
			matchBrackets: true,
			autofocus: true,
			extraKeys: {
				"Ctrl-Space": "autocomplete",
				"F11": function(cm) {
					cm.setOption("fullScreen", !cm.getOption("fullScreen"));
				},
				"Esc": function(cm) {
					if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
				}
			}
		};
		$.extend(true, this.options, config || {});
		var cm = CodeMirror.fromTextArea(el, this.options);
		var editorObj = {
			type: "SEND",
			instance: cm
		};
		return editorObj;
	}

	$.fn.sqleditor = function(editor_type,config) {
		window.sqleditors = window.sqleditors || {};
		if (window.sqleditors[editor_type]) {
			//nothing to do
		} else {
			var editorInstance = new SqlEditor($(this)[0], config || {});
			editorInstance.type = editor_type;
			window.sqleditors[editor_type] = editorInstance;
		}
	}///////////////////////////////////////////////////////////////////////////////////////////////////

	function SqlEditorWraper($wrapedobj, editor_type) {
		this.middleObj = $wrapedobj;
		this.type = editor_type;
		this.createAll = function(sPre_code, sEnd_code) {
			var sHtml_header = '<div class="sqleditor-header">' + '</div>';
			var $header = $(sHtml_header);
			var sHtml_bar = '<div class="sqleditor-toolbar">' 
			+ '<a href="javascript:void(0)" class="toggle-default-code"><i class="" title="Show/hide default code">Show/hide default code</i></a>' 
			+ '<a href="javascript:void(0)" class="check-code"><i class="" title="Validation">Validation</i></a>' 
			+ '<a href="javascript:void(0)" class="help"><i class="" title="Information">Help</i></a>' 
			+ '</div>';
			var $bar = $(sHtml_bar);
			var sHtml_pre_code = '<div class="pre-code"></div>';
			var $precode = $(sHtml_pre_code);
			$header.append($bar).append($precode);
			var sHtml_footer = '<div class="sqleditor-footer"><div class="end-code"></div></div>';
			var $footer = $(sHtml_footer);
			var sHtml_body = '<div class="sql-editor-body"></div>'
			var $editor_body = $(sHtml_body);
			var $wraper = $('<div class="sqleditor-wraper" data-type="' + this.type + '"></div>');
			$wraper.append($header).append($editor_body).append($footer);
			$wraper.insertBefore($wrapedobj);
			$wrapedobj.appendTo($editor_body);
			var preCodeConfig = {
				value: sPre_code || '',
				mode: 'text/x-plsql',
				indentWithTabs: true,
				smartIndent: true,
				lineNumbers: false,
				matchBrackets: true,
				autofocus: false,
				readOnly: 'nocursor',
				viewportMargin: Infinity
			};
			CodeMirror($precode[0], preCodeConfig);
			var endCodeConfig = preCodeConfig;
			endCodeConfig.value = sEnd_code || '';
			CodeMirror($('.end-code', $footer)[0], endCodeConfig);
			this.bindEvent();
		}
		this.bindEvent = function() {
			var _this = this;
			var $wrapper = $('.sqleditor-wraper[data-type="' + _this.type + '"]');
			$('.toggle-default-code', $wrapper).unbind('click').click(function() {
				$('.sqleditor-header .pre-code',$wrapper).toggleClass("code-hiden");
				$('.sqleditor-footer .end-code',$wrapper).toggleClass("code-hiden");
			});
			$('.check-code', $wrapper).unbind('click').click(function() {
				_this.check();
			});
			$('.sqleditor-header .pre-code', $wrapper).toggleClass("code-hiden");
			$('.sqleditor-footer .end-code', $wrapper).toggleClass("code-hiden");
		}

		this.check = function() { //check sql compile success or not
				var code_content = "";
				if(window.sqleditors[this.type]){
					code_content = window.sqleditors[this.type].instance.doc.getValue();
				}
				var code_type = this.type || 'SEND';
				apex.server.process(
					'UNIT_CODE_CHECKER', {
						x01: code_content,
						x02: code_type
					}, {
						dataType: 'xml',
						success: function(data) {
							var xml = $(data);
							var type = xml.find('type').text();
							if (type == 'SUCESS') {
								buildNotifyMsg('Validation ok.', 'success');
							} else {
								buildNotifyMsg('Compilation error:' + xml.find('msg').text(), 'warning');
							}
						}
					}
				);
			} //end of check
	}
	$.fn.sqleditorwrap = function(editor_type, pre_code, end_code) {
		window.sqleditorwrapers = window.sqleditorwrapers || {};
		if (window.sqleditorwrapers[editor_type]) {} else {
			var wrapper = new SqlEditorWraper($(this), editor_type);
			wrapper.createAll(pre_code, end_code);
			window.sqleditorwrapers[editor_type] = wrapper;
		}
	}

})(jQuery || apex.jQuery)