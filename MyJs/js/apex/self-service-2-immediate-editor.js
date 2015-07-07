/**
 * plugin for immediate editor
 * @desc:immediate edit controller defintion
 * @author:dailey.dai@oracle.com
 * @date:2015/06/18
 * @param win window 
 * @param $ jQuery 
 */
(function(win, $) {
	// define parent class ImmediateController
	var ImmediateController = Class.create();
	classes['ImmediateController'] = ImmediateController;
	// define static factory method 
	ImmediateController.register=function(elementType,controllerClass){
		if(!ImmediateController._staticMap){
			ImmediateController._staticMap = {};
		}
		ImmediateController._staticMap[elementType]=controllerClass;
	}
	ImmediateController.create=function(element,$cell,$trigger){
		if(!ImmediateController._staticMap){
			ImmediateController._staticMap = {};
		}
		var controllerClass =  ImmediateController;
		try{
			controllerClass = ImmediateController._staticMap[element.controller];
		}catch(e){}
		if(!controllerClass){
			controllerClass =  ImmediateController;
		}
		var controllerObj = new controllerClass(element,$cell,$trigger);
		return controllerObj;
	}
	
	// define method and property
	ImmediateController.prototype = {
		type: "ImmediateController.Class",
		init: function(element,$cell,$trigger) {
			this._element = element;
			this._$cell = $cell;
			this._$trigger = $trigger;
			this._dataModel = {
				oldVal:{},
				newVal:{},
				rowid:''
			};
		},
		refreshDataModel:function(){
			this._dataModel.oldVal = this.getOldVal(); // update oldVal in model
			// update oldVal in model
			try{
				this._dataModel.newVal = this.getNewVal(); 
			}catch(e){}
			this._dataModel.rowid  = this.getRowId(); // update oldVal in model
			return this;
		},
		getOldVal:function(){
			var el = this._element,$CELL = this._$cell,$oldVal = $(el.oldValSelector,$CELL);
			var oldValue = $oldVal.data('immediate-oldval-value'),
				oldDisplay = $oldVal.data('immediate-oldval-display');
			oldDisplay = (oldDisplay=="" || oldDisplay==undefined )?$oldVal.text():oldDisplay;
			oldValue = (oldValue=="" || oldValue==undefined )?oldDisplay:oldValue;
			return {
				display:oldDisplay,
				value:oldValue
			};
		},
		getNewVal:function(){
			var $CELL = this._$cell,newValue = $CELL.find('.immediate-controller').val();
			return {
				display:newValue,
				value:newValue
			};
		},
		getRowId:function(){
			var el = this._element,$CELL = this._$cell,$triggerElement = this._$trigger,
					$oldVal = $(el.oldValSelector,$CELL),rowid = $oldVal.data('immediate-id');
			rowid = (rowid==undefined || rowid=="")? $triggerElement.data('immediate-id') :rowid;
			return rowid;
		},
		updateView:function(){
			var el = this._element,$CELL = this._$cell,$oldVal = $(el.oldValSelector,$CELL),data=this._dataModel;
			if($oldVal.data('immediate-oldval-value')){
				$oldVal.data('immediate-oldval-value',data['newVal']['value']);
			}
			if($oldVal.data('immediate-oldval-display')){
				$oldVal.data('immediate-oldval-display',data['newVal']['display']);
			}
			$oldVal.text(data['newVal']['display']);
			return this;
		},
		render: function() {
			var controlHtml = '<input type="text" class="immediate-controller"/>';
			return controlHtml;
		},
		actionHander:function(){
			var _this = this,el = _this._element,$CELL = _this._$cell,$triggerElement = _this._$trigger;
			_this.refreshDataModel();
			if(_this._dataModel['newVal'] == _this._dataModel['oldVal']){
				return;
			}
			apex.server.process(
				el.processName,
				{
					'x01': _this._dataModel['rowid'],
					'x02': _this._dataModel['newVal']['value'],
					'x03': el.db_column
				},
				{
					dataType:'json',
					success:function(ajax_data){
						var callback = el.processCallback || {'success':function(){},'fail':function(){}};
						var callback_function = "fail";
						if(ajax_data.type=="SUCCESS"){
							callback_function = "success";
							_this.updateView();
						}
						callback[callback_function]({
							'$cell':$CELL,
							'data':_this._dataModel
						});//end of invoker callback
						$CELL.find(".immediate-wrapper").toggleClass('immediate-hiden');
						$CELL.find(".immediate-place").toggleClass('immediate-hiden');
					}
				}
			);
		},
		events:function(){
			var _this = this;
			return {
				blur:_this.actionHander
			};
		},
		active:function(){
			//*********************************************************************
			// render immediate element
			var element=this._element,$CELL = this._$cell,
				$immediate = $CELL.find(".immediate-place"),$wrapper = $CELL.find(".immediate-wrapper");
			if($immediate.length > 0 ){
				$immediate.toggleClass('immediate-hiden');
				$wrapper.toggleClass('immediate-hiden');
				return true;
			}
			//wrapper original place
			var str_origianl = "<div class='immediate-wrapper immediate-hiden'>"+$CELL.html()+"</div>";
			$CELL.empty();$(str_origianl).appendTo($CELL);
			// create immediate place and controller
			var str_immediate = "<div class='immediate-place'>"
			+ this.render()
			+"</div>";
			$(str_immediate).appendTo($CELL);
			//*********************************************************************
			// attach immediate event
			var events = this.events(),$controller = $('.immediate-controller',$CELL);
			var _this = this;
			for(var event_name in events){
				var hander = events[event_name];
				$controller.unbind(event_name).bind(event_name,{},function(event){
					hander.call(_this);
				})
			}
			return this;
		}
	}; 
	// end of define parent class ImmediateController

	// define sub controller class select 
	var ImmediateController_Select = Class.extend(ImmediateController, {
		render: function() {
			var oldVal = this.getOldVal();
			var controlHtml = '<select class="immediate-controller">' 
			+ (function(options) {
				var str_options = "";
				var j, k;
				for (j = 0, k = options.length; j < k; j++) {
					var option = options[j];
					var str_display = option.display == "" ? option.value : option.display;
					var str_option = "<option value='" + option.value + "'>" + str_display + "</option>";
					if (oldVal['value'] == option.value || oldVal['display'] == option.display) {
						str_option = "<option value='" + option.value + "' selected >" + str_display + "</option>";
					}
					str_options = str_options + str_option;
				}
				return str_options;
			})(this._element.data || []) 
			+ '</select>';
			return controlHtml;
		},
		type: "ImmediateController_Select.ImmediateController.Class",
		events:function(){
			var _this = this;
			return {
				change:_this.actionHander
			};
		},
		getNewVal:function(){
			var $CELL = this._$cell;
			var $controller = $CELL.find('.immediate-controller');
			var newValue = $controller.val();
			var newDisplay = $controller[0].selectedOptions[0].text;
			return {
				display:newDisplay,
				value:newValue
			};
		}
	});
	classes['ImmediateController_Select'] = ImmediateController_Select;
	ImmediateController.register('select',ImmediateController_Select);

})(window, jQuery || apex.jQuery);