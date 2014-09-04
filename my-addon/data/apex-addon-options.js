var apex_addon_options = {
	data : {
	},
	renderUI : function() {
		$('li.workspace-dev-li,li.workspace-dev-li-new').remove();
		if (apex_addon_options.data.items == undefined)
			apex_addon_options.data.items = [];
		if (apex_addon_options.data.sso == undefined) {
			apex_addon_options.data.sso = {
				username : '',
				password : ''
			}
		}
		for (var i = 0; i < apex_addon_options.data.items.length; i++) {
			var item = apex_addon_options.data.items[i];
			$('<li class="workspace-dev-li" data-key1="' + item.workspace + '" data-key2="' + item.type + '"><a href="javascript:void(0);" class="apex-addon-options-workspaces-dev-link first-line">' + item.workspace + '</a></li>').insertBefore('li.blank');
		}
		$('#sso_pass').val(apex_addon_options.data.sso.password);
		$('#sso_name').val(apex_addon_options.data.sso.username);

		$('a.apex-addon-options-workspaces-dev-link').unbind('click').click(function() {
			var $li = $(this).parent('li');
			apex_addon_options.checkNewItem();
			apex_addon_options.itemClick($li);
		});

		$('li.blank').unbind('click').click(function() {
			apex_addon_options.checkNewItem();
			var $li_new = $('<li data-key1="" data-key2="" class="workspace-dev-li-new"><input name="ws_name" id="ws_name" placeholder="Workspace name" type="text" class="first-line"/></li>').insertBefore('li.blank');
			apex_addon_options.itemClick($li_new);
		});

		if ($('.apex-addon-options-workspaces-dev').length == 0) {
			$('<div class="apex-addon-options-workspaces-dev" style="display:none">' + '<div>' + '<input name="ws_dev_name" id="ws_dev_name" placeholder="Dev name" type="text"/> ' + '<input name="ws_dev_pass" id="ws_dev_pass" placeholder="Dev password" type="password"/>' + '</div>' + '<div>' + '<input name="ws_type" id="ws_type_1" type="radio" checked="yes" value="oraclecorp"/>oraclecorp' + '<input name="ws_type" id="ws_type_2" type="radio" value="oracle"/>oracle' + '<span class="apex-addon-options-workspaces-btns">' + '<button class="apex-addon-options-workspaces-save"></button> ' + '<button class="apex-addon-options-workspaces-del"></button> </span>' + '</div>' + '</div>').appendTo('li.blank');
		}

		$('.apex-addon-options-workspaces-save').unbind('click').click(function() {
			//save change
			var $li = $(this).parents('li');
			apex_addon_options.doSave($li);
		});
		$('.apex-addon-options-workspaces-del').unbind('click').click(function() {
			var $li = $(this).parents('li');
			apex_addon_options.doRemove($li);
		});

		$('#sso_name').change(function() {
			var sVal = $('#sso_name').val();
			apex_addon_options.data.sso.username = sVal.trim();
			apex_addon_options.persist();
		});

		$('#sso_pass').change(function() {
			var sVal = $('#sso_pass').val();
			apex_addon_options.data.sso.password = sVal.trim();
			apex_addon_options.persist();
		});

	},

	itemClick : function(liObj) {
		var $li = liObj;
		$('li.highlight').removeClass('highlight');
		$li.addClass('highlight');

		var sKey1 = $li.data('key1'), sKey2 = $li.data('key2');
		var arr = jQuery.grep(apex_addon_options.data.items, function(item, index) {
			return item.workspace == sKey1 && item.type == sKey2;
		});
		if (arr.length == 0)
			arr.push({
				workspace : '',
				username : '',
				password : '',
				type : 'oraclecorp'
			});
		for (var i in arr) {
			var item = arr[i];
			$("#ws_dev_name").val(item.username);
			$("#ws_dev_pass").val(item.password);
			var isOracle = item.type == 'oracle';
			$("#ws_type_1").prop('checked', !isOracle);
			$("#ws_type_2").prop('checked', isOracle);
			$(':radio').prop('disabled', item.username != '');
		}
		$('.apex-addon-options-workspaces-dev').appendTo($li).show();
	},

	checkNewItem : function() {
		$('li.workspace-dev-li-new').each(function() {
			var $li = $(this);
			if ($li.data('key1').toString().trim() == '') {
				$('.apex-addon-options-workspaces-dev').appendTo('li.blank').hide();
				$li.remove();
			}
		});
	},

	doSave : function(liObj) {
		var $li = liObj;
		var isNew = $li.data('key1').toString().trim() == '' ? true : false;
		if (isNew && $("#ws_name").val().trim() == '') {
			$("#ws_name").addClass('input-error');
			return false;
		} else {
			$("#ws_name").removeClass('input-error');
		}
		if ($("#ws_dev_name").val().trim() == '') {
			$("#ws_dev_name").addClass('input-error');
			return false;
		} else {
			$("#ws_dev_name").removeClass('input-error');
		}
		var sWorkspaceName = isNew ? $("#ws_name").val() : $li.data('key1');
		var sType = isNew ? $('input:checked').val() : $li.data('key2');
		if (isNew) {
			apex_addon_options.data.items.push({
				workspace : sWorkspaceName,
				username : $("#ws_dev_name").val().trim(),
				password : $("#ws_dev_pass").val().trim(),
				type : sType
			});
		} else {
			$.each(apex_addon_options.data.items, function(index, item) {
				if (item.workspace == sWorkspaceName && item.type == sType) {
					apex_addon_options.data.items[index].username = $("#ws_dev_name").val().trim();
					apex_addon_options.data.items[index].password = $("#ws_dev_pass").val().trim();
					return false;
				}
			});
		}
		apex_addon_options.persist();
		apex_addon_options.renderUI();
		return true;
	},
	doRemove : function(liObj) {
		var $li = liObj;
		var isNew = $li.data('key1').toString().trim() == '' ? true : false;
		if (!isNew) {
			var sWorkspaceName = $li.data('key1');
			var sType = $li.data('key2');
			$.each(apex_addon_options.data.items, function(index, item) {
				if (item.workspace == sWorkspaceName && item.type == sType) {
					apex_addon_options.data.items.splice(index, 1);
					return false;
				}
			});
		}
		apex_addon_options.persist();
		apex_addon_options.renderUI();

	},
	persist : function() {
		self.port.emit('persist-prefs', apex_addon_options.data);
	}
}

$(document).ready(function() {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	};
	self.port.on('options-data', function(prefs) {
		apex_addon_options.data = prefs;
		apex_addon_options.renderUI();
	});
});
